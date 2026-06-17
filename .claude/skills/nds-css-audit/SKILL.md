---
name: nds-css-audit
description: Audit NDS source SCSS for measurable CSS-output improvements — selector compaction (combine `:hover`/`:focus-visible` blocks with `:is()`, fold chained `:not()` calls), dead declarations (shorthand-after-longhand overrides, duplicate property/custom-property keys, `@include ltr` blocks that re-state RTL defaults), duplicate rule bodies (in-file and cross-file mixin candidates), selector performance/complexity (unanchored `*`, unanchored `[attr]`, ID selectors in components, deep/compound selector chains), and token-usage consistency (hardcoded numeric values where a token exists, dead component tokens, semantic-token use where a more specific component-level token wraps the same value, asymmetric component-token state coverage). Use for "audit the CSS", "shrink the CSS output", "optimize selectors", "find dead CSS", "combine state blocks with :is()", "find duplicate rule bodies", "find selectors that are too expensive", "check token consistency", "find hardcoded values that should be tokens", "find dead tokens", "find dangling token references" (a `var(--x)` defined nowhere). NOT for JS audits (use `nds-js-audit`), doc-page audits (use `nds-doc`), accessibility/contrast checks, specificity-conflict resolution, unused-selector detection, or anything that requires the rendered DOM.
argument-hint: "[target] [optional: rule-group]"
---

# NDS CSS Audit

Apply this skill to: `$ARGUMENTS`

This skill audits NDS SCSS source — files in `_sass/` — for measurable improvements to the compiled CSS: smaller output bytes, cheaper selectors, more consistent token usage. It reports findings with proposed rewrites inline; it does NOT apply fixes automatically. Companion to `nds-js-audit` (which audits JavaScript) and `nds-doc` (which audits doc pages).

> **Scope this skill narrowly.** Full-tree runs read every file under `_sass/components/` and re-parse the token table from the token-source files (Phase 2 list). Single-file runs are several times cheaper and are the default fit.
> - `/nds-css-audit _sass/components/_<name>.scss [rule-group]` — single-file audit. Omit the rule-group to run all five groups. The cheap mode; best fit before merging a new or refactored component.
> - `/nds-css-audit full-tree <rule-group>` — cross-file rules only. Costs several single-file passes. Best fit for cross-file consistency sweeps (DUPE-02, TOK-01, TOK-02, TOK-04, TOK-05, TOK-06).

---

## Methodology — SCSS source in, compiled CSS judgment out

**Critical framing for every rule in this catalog.** The audit READS SCSS source files; every JUDGMENT it makes — what matches a rule, what byte savings a fix yields, what selectors will collide — is about the **compiled, minified CSS** the user's browser actually receives, NOT about the SCSS source text.

This means the audit does the following inference for every finding before deciding:

1. **Resolve `&` chains.** A nested `&:hover` under `.nds-card .nds-card-header` is judged as the compiled selector `.nds-card .nds-card-header:hover` — never as the source token `&:hover`.
2. **Expand `@include` calls.** When evaluating a rule body, mixin-emitted declarations are merged in (per the Phase 3 "Mixin resolution" step); selector-wrapping mixins (`@include ltr`, `@include dark`, `@include mobile`, etc.) are folded into the resolved selector chain.
3. **Resolve `@each` / `@for` loops** to their emitted set of rules — N variants in source = N compiled rules to judge.
4. **Resolve `@extend %placeholder`** to the collapsed selector list it produces.
5. **Strip Sass-only syntax** that doesn't reach output — comments, Sass variables (`$name`), `@if` branches not taken.
6. **Apply minification rules** when estimating bytes — strip whitespace, drop the space after `:`, drop the trailing semicolon on the last declaration in a block, etc.

**What the audit canNOT do without compiling**: catch issues that only emerge AFTER Sass runs. Specifically:
- Two different `@include` calls that happen to emit byte-identical bodies (the SCSS-side names differ; the compiled output collapses them)
- `@each` loop bodies that contain a hidden duplication only visible in expanded output
- Cascade conflicts whose specificity comes from compile-time expansion in ways the static estimator misjudges
- Anything dependent on `@if` branches taken at compile time based on Sass-side configuration

**Ground-truth fallback.** When an estimate or recommendation could plausibly be wrong because of compile-step subtlety, the user can ground-truth it via the Phase 5 Verification footer — snapshot `wc -c _site/assets/css/nds-main.min.css` before applying, run `bundle exec jekyll build`, diff. Estimated vs actual delta divergence > 30% signals the static estimator was wrong for one of the rules involved and the catalog needs refinement (Phase 6 EVOLVE gap entry).

**Why this framing matters for every finding's recommendation:** "Compiled bytes saved" lines reflect estimates of compiled output. Per-finding `Cross-component reach` reflects compiled-selector visibility, not source-text co-occurrence. Size > Perf is the priority because compiled bytes hit the wire and parse cost; SCSS-source size doesn't matter. The audit's recommendations are always in service of the compiled output, even though its detection operates on source.

---

## Mindset

Audit like a perf engineer reading the compiled CSS bundle. Every finding either saves bytes, cuts selector cost, or removes drift. Findings that don't are not findings. Where the win is a byte-count, cite the byte delta; where it's qualitative (selector cost, token consistency), say so. If a finding can't be explained in one sentence with a specific rewrite, it's not a finding.

CSS edits cascade. The skill **suggests, never auto-applies**. Each finding ends with a proposed rewrite the user accepts or skips. Phase 5 APPLY exists but runs ONLY when the user explicitly chooses a numbered action or `apply` filter.

The rule catalog is a living document — Phase 3 tracks gaps and SKIPs during the audit; Phase 6 EVOLVE reconciles them at the end of the run (session-scoped — it reads no persisted ledger), surfaces promotion/refinement candidates, and flags citation drift so the catalog sharpens rather than silently shrinks. It writes nothing to the repo — a rule's lifecycle and the catalog's lessons live inline in the committed `RULES-*.md` files.

---

## Response style

Reports are scannable, not prose.

- **Recommendation-first.** Open the report with ONE line: `<N HIGH / N MED / N LOW or "Clean">  →  Compiled CSS bytes saved (est): <N>  →  Recommended: <action>`. Never bury the recommendation.
- **Findings sorted by impact, not taxonomy.** Top section: SEL/DEAD/DUPE findings ordered by byte-delta (largest first). Middle section: PERF findings by severity. Bottom section: TOK findings.
- **Per-finding block format.** `### {file}` then `- L{n} [{rule}] {one-line description}` with indented `Snippet:` / `Rewrite:` / `Saves: ~{N}B` lines. Tables only for the per-group summary at the top.
- **One-line disclosures.** `Skipped: DUPE-02, TOK-01/02/04/05/06 (full-tree only, single-file mode).` No banner blocks.
- **Omit empty sections.** No "Gaps observed: none" headers.
- **End with a numbered Next Step** where item 1 IS the recommended action. Close with "Reply with a number."
- **Numbered-reply discipline** — applies to **EVERY block that offers the user a choice**: the no-args menu, the Phase 4 Next Step, AND any closing "open / optional / your call" block (authorizing an evolve candidate, committing, running a verification, etc.). **If you offer even ONE actionable option, present the options as a NUMBERED list — never as prose bullets or a "your call" list** (that prose-bullet closing is the exact failure mode this rule kills). Every primary acceptance path gets a number, *including the recommended action itself* — never demote it to an un-numbered header on the grounds the user already sees it as the recommendation. Renumber to drop no-op options. Literal `apply <rule-id>` / `apply <file>:<line>` / `save` filters sit below the numbered block, not inside it. Never close with "reply with the literal action or a number" — the numbers ARE the apply triggers (suggest-only contract).

Target: a report a reader skims in ~15 seconds with the decision obvious.

---

## Auto-drive

Default to advancing, not asking. Run the audit and emit the report. Pause ONLY at:

1. **Before applying any code edit** — this skill suggests rewrites; it does NOT auto-edit. To apply a finding's rewrite, the user replies with the finding's number or `apply <rule-id>` / `apply <file>:<line>`. The skill then opens the target file, makes the edit, and reports back.
2. **On a regression** — if a user-requested edit breaks the build (Jekyll/Sass error), revert and stop.
3. **Before a git commit** — never auto-commit. Propose the message and wait.

Read-only / reversible steps (running the audit, emitting the report, `save`-ing it on request) take the recommended action without extra confirmation. `save` is never the recommendation — offer it as a clause when it would pay off, let the user decide.

Phase 6 EVOLVE writes NOTHING to the repo — it is session-scoped. It surfaces catalog-change candidates (gap→rule promotions, rule refinements, resolved-example regression-guard annotations, citation drift) in a `## Catalog evolved` section of the report; the user makes any edit to `RULES-*.md` / `SKILL.md` directly. Nothing is auto-applied, so there is nothing to revert. The user is the only one who adds, removes, or rewrites rules.

---

## Phase 1: RESOLVE

Parse `$ARGUMENTS` into a target scope and (optionally) a rule-group filter.

### No arguments — show menu and stop

If `$ARGUMENTS` is empty, **do not run the audit**. Print this menu and wait:

```
NDS CSS Audit — for best results target a single file or run one group at a time:

  Single-file (default — fastest):
    /nds-css-audit _sass/components/_<name>.scss                (all five groups)
    /nds-css-audit _sass/components/_<name>.scss SEL            (one group)

  Full-tree (cross-file rules only):
    1  full-tree DUPE     Cross-file duplicate rule bodies (mixin candidates)
    2  full-tree TOK      Token-consistency (hardcoded values, dead tokens, asymmetric states)
    0  exit

Reply with a number, or type the scope directly.
```

Accept `0` or `exit` as "end here, nothing runs".

### Mode selection (first argument)

| `$1` | Files in scope | Rule groups run |
|---|---|---|
| **filename** (e.g. `_sass/components/_buttons.scss`, `_buttons.scss`, `buttons`) | One file: the resolved target | A rule-group filter (`SEL` / `DEAD` / `DUPE` / `PERF` / `TOK`), or `all`. **When omitted, default to `all`** — single-file `all` is cheap. Full-tree-only rules (DUPE-02, TOK-01, TOK-02, TOK-04, TOK-05, TOK-06) are skipped with a one-line banner. |
| `full-tree` | All `_sass/components/*.scss` (plus `_variables*.scss` and `_mixins.scss` for reference) | Must be paired with a rule-group filter that contains cross-file rules — only `DUPE` and `TOK`. Other groups rejected in full-tree mode. |

**File resolution.** When `$1` doesn't match `full-tree`, treat as a filename and try in order: (1) literal `$1` if it includes a path separator and exists; (2) `_sass/components/$1` if it ends in `.scss`; (3) `_sass/components/_$1.scss` if it starts with `_`; (4) `_sass/components/_$1.scss` for the bare name. Stop at the first match. If none exist, reply: *"Couldn't resolve `<filename>`. Tried: `_sass/components/_<X>.scss`. Pass the filename as it appears in `_sass/components/`."* — and if the target ends in `.js` or names a component that exists only under `_js/`, add: *"For JS behavior, use `/nds-js-audit nds-<name>.js` — this skill audits SCSS only."* Then stop.

**File-tier scoping (THREE tiers):**

**Tier 1 — NEVER audited, no override** (generated output, demo/showcase, reference-only spec layers, minified output):

| File | Reason for hard exclusion |
|---|---|
| `_sass/_hgiRoundedStroke.scss` | Generated icon-font CSS — output of the `nds-hgi-font-update` skill, not hand-authored. Findings against it would be noise. |
| `_sass/_showcase.scss` | Demo-page only wiring; not a shipped component. Same pattern as `_js/nds-showcase.js` in the JS audit. |
| `_sass/themes/_dga.scss` | Vendored DGA palette mirror — headered "DO NOT MODIFY · changes come from upstream." READ as a token source for TOK reference, but never an edit target (findings against it would diverge from upstream and reappear on the next sync). |
| Any `*.min.scss` / `*.min.css` | Minified output, never authored directly. |

If a user explicitly targets a Tier 1 file, reply: *"`<file>` is hard-excluded from audits — see the SKILL.md Tier 1 exclusion list for why (generated output / demo / reference-only / minified). No partial audit available."* and stop.

**Tier 2 — Excluded from default scanning; auditable only when explicitly path-named** (componentless files with their own rules-of-engagement):

| Files | Why Tier 2 (not Tier 1, not Tier 3) |
|---|---|
| `_sass/_base.scss`, `_sass/_grid.scss`, `_sass/_skeleton.scss`, `_sass/_typography.scss` | Foundation layers — some rules apply (DEAD, SEL-01, DUPE-01) but others have file-specific carve-outs. |
| `_sass/_reset.scss`, `_sass/_fonts.scss`, `_sass/_icons.scss` | Foundation — `*`, `[hidden]`, raw hex are by design here. PERF-01/PERF-02/TOK-01 don't apply. |
| `_sass/_utilities.scss` | Utility classes — `!important` and high specificity are intentional. DEAD rules apply with caution. |
| `_sass/_mixins.scss` | Mixin definitions — `@include ltr` body, `!important` autofill resets, etc. are intentional. Some DEAD/DUPE rules still apply to mixin bodies. |
| `_sass/_variables.scss` (thin barrel over `_sass/tokens/`), `_sass/tokens/_primitives.scss`, `_sass/tokens/_semantic.scss`, `_sass/tokens/_components.scss`, `_sass/_variables-critical.scss` | Token-source files. TOK-02 (dead tokens) and DEAD-02/-03/-05 are valid; SEL/PERF rules don't apply (no real selectors). |
| `_sass/_variables-dark.scss`, `_sass/tokens/_components-dark.scss`, `_sass/_variables-a11y.scss` | Mode override files — re-bind existing tokens for a mode. Same rule profile as Tier 2 token-source files. |
| `_sass/themes/_register.scss`, `_sass/themes/_oklch-template.scss`, `_sass/themes/_foundation-day.scss` | Theme system — seed maps + OKLCH ramp engine + predefined-theme tokens. Component SEL/PERF/TOK rules don't apply (generated ramps, no component selectors); DEAD/DUPE apply with caution when explicitly path-named. |
| `_sass/_animations.scss` | Animation definitions — keyframes, transition timings. DEAD/DUPE apply; SEL/PERF rules don't. |

To audit a Tier 2 file, the user must pass the explicit path: `/nds-css-audit _sass/_utilities.scss`. Resolving from a bare name (`utilities`) WILL NOT route to a Tier 2 file — it tries `_sass/components/_utilities.scss` first and fails over to nothing. This intentional friction prevents accidental Tier 2 audits.

When Tier 2 IS explicitly named, the audit applies **file-specific carve-outs** (in addition to the rule's own carve-outs):

- **`_reset.scss`**: PERF-01 (universal `*`) is EXEMPT — that's the file's purpose. PERF-02 (`[hidden]` etc.) is EXEMPT — global attribute resets are intentional.
- **`_grid.scss` / `_base.scss`**: PERF-03 (ID selectors like `#main`, `#header`, `#skip-link`) is EXEMPT for the known global-anchor IDs.
- **`_utilities.scss`**: `!important` count threshold disabled. DEAD rules that suggest `!important` removal must be skipped unless the `!important` is provably redundant.
- **`_mixins.scss`**: `!important` in `autofill-reset` is EXEMPT. `@include ltr` body declarations are by design — DEAD-04 must not flag the mixin's own definition.
- **Token-source files**: TOK-02 (dead token) detection runs cross-file; SEL/PERF rules don't apply (the file has no real selectors beyond `:root`). DEAD-02/-03 (duplicate property keys within `:root`) still applies.
- **Mode override files**: only TOK-02 applies (dead override binding for a non-existent token). DEAD-02/-03 also apply within the `:root[data-theme=...]` scope.

**Tier-2 reduced-catalog advisory (coverage honesty).** A Tier-2 audit runs a *reduced* catalog — the carve-outs above suppress whole rules (PERF-01/-02 on `_reset.scss`, TOK-01 on `_fonts.scss`/`_icons.scss`, the `!important` threshold on `_utilities.scss`, SEL/PERF on token-source files). A clean Tier-2 report would otherwise read as a full all-clear when it isn't. So whenever the resolved target is a Tier-2 file, print ONE advisory line above the Phase 4 header: *"Auditing Tier-2 file `<name>` directly — reduced catalog: its carve-outs suppress `<the rules exempted for this file>`, so 'Clean' here means clean WITHIN those carve-outs, not a full audit."* This is the CSS analog of the JS audit's direct-named core/loader advisory — a coverage banner that converts a misleading "Clean" into honest disclosure.

**Tier 3 — Default audit scope** (`_sass/components/*.scss`): all rules apply per their normal definitions and carve-outs. This is the natural target — bare-name resolution (e.g., `cards`) maps here.

**Anything outside `_sass/`** (e.g., `assets/css/nds-main.min.scss` entry, Jekyll page styles in `_includes/`) is also Tier 1-hard-excluded — they're build entrypoints or page wiring, not authored component code. (For a `_js/` source file, point the user at the sibling skill: `/nds-js-audit nds-<name>.js` — this skill suggests CSS rewrites only and cannot apply JS fixes.) The token table from `_variables*.scss` is READ for reference during component audits regardless of tier (it's the source-of-truth for TOK / DEAD-05).

### Rule-group filter (second argument)

`$2` selects which group runs:

| `$2` | Rule group | Mode |
|---|---|---|
| `SEL` | Selector compaction (3 rules) | single-file only |
| `DEAD` | Dead declarations (7 rules — DEAD-07 browser-confirmed) | single-file only |
| `DUPE` | Duplicate rule bodies (3 rules — DUPE-02 full-tree) | single-file + DUPE-02 full-tree |
| `PERF` | Selector performance/complexity (4 rules) | single-file only |
| `TOK` | Token consistency (7 rules — TOK-01/02/04/05/06 full-tree, +TOK-07 dangling refs single-file+full-tree) | single-file + TOK-01/02/04/05/06 full-tree |
| `all` (**single-file only**) | SEL + DEAD + DUPE + PERF + TOK against one file → one consolidated report | single-file only |

**If `$2` is missing:** single-file mode defaults to `all`. Full-tree mode has no default — show the Phase 1 menu and wait.

**Full-tree restriction.** Only DUPE-02 (cross-file duplicate rule bodies), TOK-01 (cross-file hardcoded-value duplication), TOK-02 (dead component tokens), TOK-04 (asymmetric state coverage), TOK-05 (cross-file duplicate keys / upstream-value duplication), and TOK-06 (cross-sibling indirection-token asymmetry) work cross-file. If the user passes `full-tree SEL` / `full-tree DEAD` / `full-tree PERF`, reject: *"`SEL`/`DEAD`/`PERF` rules are per-file — full-tree mode applies only to `DUPE` and `TOK`. Run single-file (`/nds-css-audit _sass/components/_<name>.scss <group>`) instead."*

## Phase 2: READ

Source files are the single source of truth. Read fully, not by skimming.

### MUST read every run

- **The rule catalog for THIS run's scope** — `RULES-SEL.md` (`SEL`), `RULES-DEAD.md` (`DEAD`), `RULES-DUPE.md` (`DUPE`), `RULES-PERF.md` (`PERF`), `RULES-TOK.md` (`TOK`). A run with no rule-group filter reads all five. Read only what the scope needs.
- **No maturity ledger to read.** A rule's lifecycle — its motivating example, and whether that example was resolved into a regression guard — lives inline in its `RULES-*.md` row, already read as part of the rule catalog above. There is no separate maturity file and no cross-run trail the audit depends on. (A prior saved report in `.claude/audit-reports/` is read ONLY when the user asks for a `Diff vs. Run (N−1)` — an optional comparison export, never an input to detection or EVOLVE.)
- **The token-source files** — the canonical token table lives in `_sass/tokens/` (`_variables.scss` is a thin barrel that only `@use`s the component tier; there is no `_variables-dga.scss`): `_sass/tokens/_primitives.scss` (spacing/width/radius scales), `_sass/tokens/_semantic.scss` (background/text/border/icon/controls/shadow), `_sass/tokens/_components.scss` (`--{component}-*` tier), `_sass/themes/_dga.scss` (the `--colors-*` palette — vendored DGA mirror, DO NOT MODIFY), and `_sass/_variables-critical.scss` (critical-path foundation tokens). **DEAD-05** and the **TOK rules** all reference them; this list is the canonical one (RULES-TOK.md restates it with per-file detail). The mode variants (`_variables-dark.scss`, `_sass/tokens/_components-dark.scss`, `_variables-a11y.scss`) are mode overrides, NOT token sources — they re-bind existing tokens for a different mode. Do not read them as token definitions; consult them only when checking DEAD-05 carve-outs (mode-conditional token availability) and TOK-02 dead-token analysis (mode-override binding counts as a use).

  **Pre-parse the token map** (symmetric to the mixin map in `_mixins.scss` below). Build ONE keyed structure capturing, per token: (a) its resolved concrete value (chasing `var()` aliases down to a literal), (b) which mode-override files re-bind it, (c) whether it's *unconditionally* defined (top-level `:root`, not under `@media` / `@supports` / a mode selector). TOK-01 (value→token lookup), TOK-02 (dead-token), TOK-03 (alias graph), and DEAD-05 (unconditionally-defined check) then READ this one map instead of each re-parsing the source files — their per-rule detection steps consume it rather than re-deriving it. The list above is exemplars for orientation; the map is rebuilt from the current token files each run.
- **`_sass/_mixins.scss`** — every mixin in the project. **Required for every run** because mixin resolution affects what every rule detects.

  Pre-parse the file and build a **mixin map** keyed by mixin name. For each mixin, capture:
  - **Emitted selectors** — does the mixin wrap its `@content` in a selector (like `@mixin ltr { :is(html[dir="ltr"], .ltr) #{&} { @content; } }`), or does it just emit declarations into the calling rule's body? Selector-wrapping mixins (`ltr`, `dark`, `mobile`, `tablet`, `desktop`, `large-desktop`, `reduced-motion`, `high-contrast`, `print-media`) change the compiled selector chain.
  - **Emitted declarations** — the property/value pairs the mixin emits into the calling rule. For declaration-emitting mixins (`btn-base`, `btn-focus`, `btn-indicator`, `btn-indicator-styles`, `progress-circle-base/text/progress`, `reset-section-style`, `autofill-reset`, `label-hidden`), capture the full declaration set.

  Why this matters across rules:
  - **DEAD-02 / DEAD-03**: a literal `color: red` AND an `@include btn-base` that emits `color: var(--btn-color)` in the same rule body are a property duplicate. The audit must resolve the mixin to detect it.
  - **DEAD-04**: the `@include ltr` rule depends on knowing the mixin wraps with `:is(html[dir="ltr"], .ltr) <selector>`. Same shape applies to any other direction/mode-wrapping mixin you might add later.
  - **DEAD-05**: if a mixin's body contains `var(--token, <literal>)`, the mixin DEFINITION carries the redundant fallback — every call site inherits it. Surface the finding on the mixin file once instead of N times on call sites.
  - **DUPE-01 / DUPE-02**: when proposing extraction of a duplicated rule body, FIRST check whether the body already matches an existing mixin's emitted declarations. If `_mixins.scss` already has `btn-focus` and the duplicated body matches it, recommend `@include btn-focus` instead of inventing a new mixin.
  - **SEL-01**: state pseudo-class blocks calling the same `@include btn-focus` are still mergeable; the merge needs to know the mixin's effective body to compute byte savings.
  - **PERF-04**: when computing compound count and descendant depth, expand `@include` calls that inject selectors (`ltr`, `dark`, `mobile`, etc.) into the resolved selector chain.

  Mode-wrapping mixins in this project (from `_sass/_mixins.scss`):
  - `@include ltr` → `:is(html[dir="ltr"], .ltr) <selector> { @content; }` (wraps with a 2-class selector list, adds ~32B to the compiled selector chain per emit point)
  - `@include dark` → `:root[data-theme~="dark"] <selector> { @content; }` (token-matched `~=` since the themes migration — verify against the current file; ~31B added)
  - `@include mobile` / `tablet` / `desktop` / `large-desktop` → wraps `@content` in an `@media` query (no compiled selector cost, but its own `@media` block in output)
  - `@include reduced-motion` / `high-contrast` / `print-media` → wraps in an `@media (prefers-*)` query
  - `@include label-hidden` → emits visually-hidden declarations directly (no selector wrap)

  Declaration-emitting mixins:
  - `@include btn-base` / `btn-focus` / `btn-focus-oncolor` / `btn-indicator` / `btn-indicator-styles` — button system primitives
  - `@include progress-circle-base` / `progress-circle-text` — progress component primitives
  - `@include reset-section-style` — clears section background/shadow/border
  - `@include autofill-reset` — autofill state-resetting with `!important` overrides

  If a new mixin is added to `_mixins.scss` after this skill was last reviewed, the catalog DOES NOT need updating — the audit re-parses the file at the start of every run and discovers all mixins. The lists above are exemplars for orientation, not a closed set.

### MUST read every target file

Read each target file top-to-bottom before running the catalog. Nested rules and parent-selector chains (`&`) mean line-level grep can mis-attribute findings; a full read gets the structure right.

### Good-pattern exemplars

`_sass/components/_buttons.scss` is the reference component for what "clean" looks like — cite these with `file:line` in proposed rewrites so the user copies a working pattern instead of inventing one. Exemplars for orientation, not a closed set:

- **SEL-01** (`:is()` state-merge): `_buttons.scss:42` — `&:is(:hover, [data-state~="hover"])` groups a pseudo-class with its JS-stamped `data-state` twin in one block.
- **SEL-02** (collapsed `:not()` list, done right): `_buttons.scss:19` — `&:not(button, a)` already in the single-`:not()` comma-list form SEL-02 targets; cite it as the resolved-state reference.
- **DUPE-01 / DUPE-02** (`@extend %placeholder` byte win): `%select-caret-after` at `_sass/_mixins.scss:476`, consumed via `@extend` at `_forms.scss:368` and `_date-picker.scss:28` — the placeholder form that dedupes compiled output (the `@include` form would not).
- **DEAD-04** (`@include ltr` for transforms only): `_buttons.scss:560` and `:571` — direction-asymmetric transforms logical properties can't express, NOT a re-statement of an RTL default.
- **TOK-03** (component-level token consumption): button state blocks consume `--button-*` component tokens rather than reaching for semantic tokens directly.

---

## Phase 3: ANALYZE

Run the rule catalog (the per-group `RULES-*.md` file(s) read in Phase 2) file-by-file. Each match is recorded as: file, line, rule ID, offending snippet (≤120 characters), proposed rewrite, byte-delta estimate (SEL/DEAD/DUPE) or qualitative impact note (PERF/TOK). Dedupe overlapping findings so the same block isn't double-flagged.

### Component relationships (preprocessing step)

NDS components form a dependency graph. A fix that looks local can ripple across the graph. Before recommending any fix that touches shared surface, the audit checks the graph for downstream impact.

**Known relationship pairs and clusters** (audit reads the related files when a finding affects shared surface):

| Cluster / pair | Files | Why they're related |
|---|---|---|
| **Status-colored surface** | `_cards.scss`, `_alert.scss`, `_toast.scss`, `_chip.scss` | Share variant tokens (`--*-bg`, `--*-border`, `--*-title`), icon slot patterns, color-by-status conventions. |
| **Off-canvas surfaces** | `_drawer.scss`, `_sidemenu.scss`, `_modal.scss` | Share overlay patterns, backdrop tokens, focus-trap conventions, RTL transform handling. |
| **Navigation surfaces** | `_breadcrumb.scss`, `_pagination.scss`, `_mainnav.scss`, `_stepper.scss`, `_tabs.scss` | Share link-state styling, separator patterns, focus rings. |
| **Identity surfaces** | `_persona.scss`, `_avatar.scss` | Share sizing tokens and image-frame conventions. |
| **Form surfaces** | `_forms.scss`, `_buttons.scss` | Heavy compositional reuse — buttons appear in forms, form-control states share with input states defined inside `_forms.scss`. |
| **Base components consumed by many** | `_buttons.scss`, `_icons.scss`, `_typography.scss` | High-fan-in. Any change ripples to every consuming component. Cross-component reach = HIGH. |
| **Foundation files (shared by all)** | `_variables.scss` + the `_sass/tokens/` partials, `_sass/themes/_dga.scss`, `_variables-critical.scss`, `_mixins.scss` | Token + mixin sources. Any change is global. Treat as highest-blast-radius surface. |

This table is illustrative, not exhaustive. The audit discovers relationships at run-time by scanning for shared tokens / mixins / classes — the table is a hint of where the clusters live.

**Cross-component scan procedure** (pre-recommendation step):

For each candidate finding, before recommending:

1. **If the finding affects a token** (TOK-02 dead-token deletion, TOK-03 swap, DEAD-05 fallback removal, or any rule that proposes a token change): grep `var(--<name>` across **all `_sass/**/*.scss` (Tier 2 AND Tier 3 — foundation files consume tokens too)**, plus `_includes/`, `_layouts/`, and `assets/css/*.scss`, **AND grep the token NAME as a string across `_js/`** — components read tokens via `getComputedStyle(...).getPropertyValue('--name')`, which a CSS-only grep misses (the TOK-02 `--nds-minimal-nav-bp` lesson). Skip Tier 1 files (`_hgiRoundedStroke.scss`, `_showcase.scss`, the DGA mirror, `*.min.*`) — Tier 1 doesn't get to vote. List every consumer in the finding's "Cross-component reach:" line. If reach > 0, the cost axis goes to MEDIUM/HIGH and the Verification footer adds a check-every-consumer step.
2. **If the finding affects a mixin** (DUPE-02 extraction, DEAD-04 wrapper, any rule that proposes adding or modifying a mixin in `_mixins.scss`): grep `@include <name>` across all `_sass/**/*.scss` (Tier 2 + Tier 3). The fix may require updating every call site.
3. **If the finding affects a class name** (SEL-03 dropping a tag qualifier, PERF-03 ID→class conversion, any selector restructuring): grep `\.<class-name>` across Tier 2 + Tier 3 SCSS AND across `_includes/` and `_layouts/` for HTML usage. If the class is consumed by other components, the cascade change may surface there.
4. **If the audited file is a base component** (`_buttons.scss`, `_icons.scss`, `_typography.scss`, or any file in the "consumed by many" cluster): elevate every finding's cross-component cost by one tier. Verification spot-checks must cover the top dependent components, not just the audited one.
5. **If the audited file is Tier 2** (`_mixins.scss`, `_utilities.scss`, a token-source file, etc.): every finding is automatically HIGH cross-component reach by definition. The audit MUST list dependents and downgrade recommendations from "apply" to "coordinated change."

The "Cross-component reach:" line is REQUIRED on every finding where reach > 0. Format:

```
Cross-component reach: 4 consumers detected — _alert.scss (L67, L142), _toast.scss (L34), _chip.scss (L89), _includes/icon.html (line 12).
Cost axis: MEDIUM — verify each consumer in the build before merging.
```

**When cross-component reach is HIGH, the recommendation flips:** the audit must surface that fact prominently and DOWNGRADE the recommendation from "apply" to "tradeoff — coordinate change across consumers first." Even a clean LOW-cost finding becomes a coordinated PR when its reach is broad.

### Mixin resolution (preprocessing step)

Before running any rule's detection, expand `@include` calls inline against the mixin map built in Phase 2. For each rule body being analyzed:

1. Find every `@include <name>` (and `@include <name>(args)`).
2. Look up `<name>` in the mixin map.
3. **If the mixin wraps `@content` in a selector** (mode/direction-wrapping mixin): treat the rule body as TWO logical bodies — the unwrapped declarations at the original selector, AND the wrapped declarations at the mixin's emitted selector. Both bodies are analyzed independently. The PERF-04 compound count uses the wrapped selector when applicable.
4. **If the mixin emits declarations directly** (declaration-emitting mixin): merge the mixin's declaration set INTO the rule body for DEAD-02/-03 / DUPE-01/-02 / SEL-01 detection. The byte-delta for any finding that touches a mixin-emitted declaration is computed against the *expanded* compiled output.
5. **Recursive expansion**: if a mixin's body contains `@include` of another mixin, expand transitively. Cap at depth 5 to prevent runaway resolution; if a deeper chain is hit, log a SKIP with "mixin chain too deep" and don't false-flag.
6. **Mixin-side findings**: if the expansion reveals a finding that lives *inside the mixin's definition* (e.g., DEAD-05 fallback inside `@include btn-focus`'s body), file the finding against `_sass/_mixins.scss:<line>` once, not against each call site. Cite call sites in the finding's note.

The expanded view is what every rule's detection operates on. The source view is only used for the proposed rewrite (so the user edits the file they wrote, not the expansion).

### Single-file deep-read pass (dedicated agent)

**Single-file mode only** — the `all` run, or any run that includes a whole-file rule (DUPE-01 / DUPE-03 / PERF-04). After the inline catalog pass completes, spawn ONE dedicated deep-read agent (`Agent` tool, `general-purpose` subagent) that re-reads the target file end-to-end with fresh context and hunts the rules that reward undivided attention. The inline pass owns the fast, mechanically-greppable single-rule hits (most SEL/DEAD matches, single-selector PERF); the agent owns the cross-cutting reads. This is what makes single-file the deepest mode — and it stays read-only, so it never touches the suggest-never-apply contract (it only returns findings the main thread merges into the Phase 4 report).

**Full-tree mode does NOT spawn this agent** — its budget is committed to breadth (cross-file DUPE-02 / TOK hashing IS its whole job), and a second whole-tree re-read would double the most expensive pass.

**Deep-read scope for the agent:**
- **DUPE-01** — whole-file non-adjacent body-hash matching (a top-of-file rule and a bottom-of-file rule sharing a body but differing in selector root — the case a line-local scan misses).
- **DUPE-03** — the same fully-resolved selector emitted twice in the file with no intervening cascade-relevant rule.
- **Transitive mixin expansion** — the depth-5 `@include`-chain resolution from "Mixin resolution" above, where a finding may live inside a mixin definition rather than the call site.
- **PERF-04** — compound-count / descendant-depth / cascade reasoning on deep variant grids.
- **Cross-component reach** — the dependency-graph scan (Component relationships, above): list every consumer of a touched token/mixin/class so the recommendation can downgrade to "coordinate first."

**Skip guard.** When the run's only in-scope rules are mechanically-greppable single-rule groups with no whole-file rule (e.g. a lone `SEL` or `PERF` run), skip the agent entirely — there is nothing for it to deep-read.

**Brief template** (self-contained — the agent has no audit context):
1. **Target** — the resolved `_sass/components/_<name>.scss` path. "Read it top-to-bottom before judging; `&`-chain resolution and nested rules mean line-local matching mis-attributes findings."
2. **Inputs** — the Phase 2 mixin map and the token map built from the token-source files (Phase 2 list), so byte-deltas and `@extend`/`@include` decisions resolve correctly.
3. **Rules to apply** — name the in-scope rule IDs from the deep-read scope above and direct the agent to **Read the relevant `RULES-*.md` file(s) itself** (`.claude/skills/nds-css-audit/RULES-DUPE.md` / `RULES-PERF.md`, as scoped), applying ONLY the named IDs. Do NOT paste the rows into the brief — pasting re-emits multi-KB rows as expensive output and loses carve-out fidelity if compressed; the file is the full-fidelity source. Paste verbatim ONLY the "record a GAP, not a finding, when in doubt" discipline and the annotation-exemption convention — those live in this file, which the agent does not read.
4. **Output contract** — return ONLY a findings table (`file:line`, rule ID, ≤120-char snippet, proposed rewrite, byte-delta estimate) plus a short "Gaps observed" list. No prose; two-to-five findings is typical, ten+ signals padding.

**Merge.** Fold the agent's findings into the Phase 4 report, deduped against the inline pass (inline keeps the greppable single-rule hits; the agent owns the whole-file / cross-component rows). Tag agent-sourced rows with a trailing `(deep-read agent)` marker on the location cell so the merge is auditable. If the agent returns nothing, say so — a clean deep-read pass is a real result.

### Recommendation framework: weigh tradeoff vs benefit on every finding

**Findings are not recommendations.** Detection identifies a pattern; the recommendation decision is a separate step that weighs the benefit of applying the fix against ALL the costs — not just size vs perf, and not just byte deltas. **The audit must never recommend a fix mechanically because the rule matched. It must justify the recommendation against this framework.**

For every finding, compute:

**Benefits to weigh:**
- **Size savings** (compiled bytes, Brotli-discounted for repeated patterns)
- **Cascade safety** (does the fix reduce specificity ladders / `!important` reliance?)
- **Design-system integrity** (does the fix bring code closer to the token hierarchy / RTL contract / `_mixins.scss` conventions?)
- **Source clarity** (does the fix make intent more obvious to a future reader?)
- **Perf** (reported, but a small input — see "Size > Perf" below)

**Costs to weigh:**
- **Maintainability**: does the rewrite add code that future devs must understand to make a change?
- **Debuggability**: does it add an indirection hop to "where is this value set?" trace?
- **Idiom-breaking**: does it depart from a recognized pattern (variant grids, BEM, state classes, etc.) that designers and contributors recognize at a glance?
- **Cascade-flow risk**: does it change CSS resolution order, specificity, or precedence in ways consumers might depend on?
- **Source growth**: does the SCSS source file grow even if the compiled output shrinks?
- **Regression risk**: how many visual states / variants / media queries does the affected code path touch?
- **Cross-component reach**: does the fix touch surface that OTHER component files consume — shared tokens in `_variables*.scss`, shared mixins in `_mixins.scss`, shared classes used inside other components (e.g., `.nds-icon` inside `.nds-card`/`.nds-alert`), or compositional patterns (cards extending alert patterns, drawer ↔ sidemenu)? Local-to-file fixes are LOW cost on this axis; fixes that ripple to ≥1 other component are MEDIUM; fixes on base components consumed by many (`_buttons.scss`, `_icons.scss`, `_mixins.scss`, `_variables.scss`) are HIGH.

**Net recommendation decision matrix:**

| Benefit | Cost | Recommendation |
|---|---|---|
| HIGH | LOW | **Apply.** Top recommendations. |
| LOW | LOW | **Apply.** Cheap maintenance wins. (E.g., DEAD-05 redundant `var()` fallback.) |
| HIGH | MEDIUM | **Apply, with the cost noted.** User accepts the cost knowingly. |
| MEDIUM | HIGH | **Surface as tradeoff; do not push.** User's call. |
| LOW | HIGH | **DO NOT recommend.** Even if it's a "size win" on paper. The rewrite costs more than it saves. |
| Any | UNKNOWN | **Surface as gap, not a finding.** When the cost can't be assessed without more context (e.g., consumer impact across repos), the audit doesn't have enough information to recommend. |

**Anti-pattern: chasing bytes blindly.** A 30B size saving that introduces a 2-step cascade indirection and breaks an idiom is a NET LOSS, not a win. The audit must catch itself before recommending it. This is the lesson from the deleted DUPE-04 rule: pre-compression bytes looked good (~−300B); honest accounting (post-Brotli ~50–100B wire savings, source bytes grew, dark mode duplication didn't collapse, cascade-flow risk, idiom break) showed it was a net loss.

### Size > Perf — applies when size and perf are the only two axes in conflict

**Within the framework above, when a finding's *only* tension is "size grows but perf improves" (or vice versa), choose the size-preserving path.** This is a narrower rule than "size always wins" — it applies only to the size-vs-perf sub-question.

Why: CSS perf wins on selector restructuring are usually theoretical (browser matchers are heavily optimized; sub-millisecond compound-count savings don't show up on real INP/LCP measurements), while CSS size is concrete (network transfer, parse cost, memory). The Saudi government design system serves users on cellular / low-bandwidth networks where every compiled byte matters.

But this rule **does not** override the broader tradeoff-vs-benefit framework — a "pure size win" that breaks an idiom or adds debugging cost still needs to pass the cost-benefit check.

**Every finding has TWO impact dimensions (size, perf) PLUS the cost axes above. The audit must report all of them.**

For each finding, the report MUST emit both lines:

- **Size impact:** `−N B compiled` (fix shrinks output) / `±0 B` (no-op for size) / `+N B compiled` (fix grows output).
- **Perf impact:** `improves` / `neutral` / `regresses` — with a one-sentence reason citing the actual mechanism (compound count, descendant depth, selector specificity, match cost, etc.).

**Typical rule profiles** (each finding inherits its rule's baseline; specific findings may differ — the rule footer states the typical case):

| Rule | Size impact | Perf impact |
|---|---|---|
| **SEL-01** (`:is()` merge) | raw ↓ but **wire ≈** (duplicated body gzip-back-referenced) | perf ↑ — one fewer compiled rule to parse/match. **Primary win is structural, not bytes.** |
| **SEL-02** (`:not()` list) | **wire ~0** (`:not(` recurs → gzip-discounted) | perf ↑ — one `:not()` to evaluate, not a chain. |
| **SEL-03** (drop tag qualifier) | **wire ~tag-length once** (repeats gzip-back-referenced) | perf ↑ — lower specificity + one less segment per compound. |
| **DEAD-01 / -02 / -03 / -05** | size ↓ | perf ↑ — one less declaration the cascade evaluates. |
| **DEAD-04** (empty LTR wrapper) | size ↓ (large) | perf ↑ — one less compiled rule for the matcher. |
| **DEAD-07** (effective-redundancy, browser-confirmed) | size ↓ (small) | neutral — one less declaration; finding status requires a computed-style diff to confirm. |
| **DUPE-01 / -03** (selector-list merge) | size ↓ | neutral — selector lists are evaluated efficiently. |
| **DUPE-02** (`@extend %placeholder`) | size ↓ | neutral (selector-list growth). |
| **DUPE-02** (`@include mixin`) | ±0 | ±0 — source-organization only. |
| **PERF-01** (anchor universal `*`) | size ↑ slightly (anchor class added) | perf ↑↑ — universal-match cost eliminated. **Classic tradeoff.** |
| **PERF-02** (anchor attribute) | size ↑ slightly | perf ↑ — attribute search bounded by class. |
| **PERF-03** (ID → class) | ±0 | perf ↑ — lower specificity, easier overrides. |
| **PERF-04 Solution A** (collapse axis into single class) | size ↑ — N new class definitions added | perf ↑ — compound count drops by 1+. **Classic tradeoff.** |
| **PERF-04 Solution B** (flatten nesting) | ±0 (same compiled selectors) | perf ↑ — descendant-chain depth drops; specificity often lowers too. |
| **PERF-04 accept and annotate** | ±0 | ±0 — comment only. |
| **TOK-01** (literal → token) | size ↑ — `var(--name)` is wider than typical literals (`var(--spacing-md)` ~ 18B vs `16px` ~ 4B) | ±0 — runtime lookup is cheap. **Hidden size tradeoff** — design-system consistency win, output-bytes loss. |
| **TOK-02** (delete dead token) | size ↓ | ±0. |
| **TOK-03** (more-specific token) | size variable (token names differ) | ±0. |

**Recommendation logic** — every finding goes through the cost-vs-benefit decision matrix first; the size/perf classification only determines what gets fed into "benefit":

1. **Size-saving findings with LOW cost** (most DEAD rules, most DUPE-01 selector-list merges, DEAD-05 fallback removal — these remove *unique* content gzip can't reconstruct, so they're real wire wins; SEL-02 `:not()` collapse rides along here as a cleanliness / match-cost win that's gzip-neutral on bytes): **Apply by default.** Sort by size-delta descending within this band. Standard cost factors apply — the recommendation flips to "do not push" if the specific finding turns out to have a hidden maintenance cost.
2. **Size-saving findings with MEDIUM cost** (DUPE-01 with `@extend %placeholder` extraction; SEL-01 deep merges and SEL-03 tag-qualifier drops — note these two are structural / specificity wins that are gzip-neutral on bytes, not real wire savings): **Apply with the cost stated explicitly.** User accepts the cost knowingly.
3. **Pure perf wins that are size-neutral and idiom-preserving** (PERF-04 Solution B flatten-nesting, PERF-03 ID→class): recommended. Sub-cost: very low.
4. **Size-grows-but-perf-improves tradeoffs** (size ↑ AND perf ↑): **DO NOT RECOMMEND** per the size > perf sub-rule. Surface that they exist; recommendation is "skip unless you've measured a real perf bottleneck." Hits PERF-04 Solution A, PERF-01/-02 edge cases.
5. **Findings where the cost exceeds the benefit** even on the size axis: **DO NOT RECOMMEND.** Catch these before they ship in the report. The benefit isn't worth the maintainability/debuggability/idiom cost. The deleted DUPE-04 rule is the canonical example — `~−50–100B` Brotli-discounted size win for indirection layer + source growth + cascade-flow risk = net loss.
6. **Pure losses with a third-axis benefit** (TOK-01 literal → token: grows bytes for design-system consistency): valid findings, tagged "size-grower: kept for design-system consistency, not bundle savings" so the user accepts knowingly.
7. **Neutral on both size and perf** (PERF-04 accept-and-annotate, DUPE-02 `@include` form): valid only when they close a recurring carry-over (annotation stops the rule from re-firing) or document an intent. Cost: near-zero. Benefit: process / future-audit hygiene.

**Accept-and-annotate close-out (generalizes PERF-04's pattern to ANY de-recommended finding).** When the matrix DE-RECOMMENDS a finding (bands 4–6 above: size-grows-perf-improves tradeoffs, cost-exceeds-benefit, or a TOK-01 consistency size-grower the user declines) AND the matched rule already defines a `// <RULE> <reason>` exemption comment (every rule does — see each `RULES-*.md` "Explicitly NOT a finding" carve-out), the finding's per-finding block offers **`accept and annotate`** as the resolution verb: apply the rule's own exemption comment so detection skips it next run. Without this, a de-recommended finding re-surfaces every run and trains skim-past behavior (the JS audit's "lint dump" risk). A report with a de-recommended band therefore carries an `annotate accepted tradeoffs` Next Step action; once the user applies the exemption comment, the rule's detection carve-out keeps it from re-firing, and Phase 6 surfaces it as a resolved/regression-guard annotation candidate rather than re-reporting it.

**Report ordering:** sort by impact band — pure size wins → pure perf wins (size-neutral) → neutral-on-both (annotation-style) → tradeoff findings (de-recommended) → TOK-01 size-growers (consistency-driven). Within each band, sort by size-delta magnitude.

**Header line** leads with size, mentions perf as secondary:

```
N HIGH / N MED / N LOW  →  Size: −N B compiled (W wins, T tradeoffs DE-RECOMMENDED, G growers)  |  Perf: N wins, N tradeoffs, N neutral  →  Cross-component reach: N  →  Recommended: <action>
```

Group findings in the report by **profile band** (pure wins → tradeoffs → neutral) rather than by rule group alone. Within each band, sort by impact magnitude on the band's leading axis.

### Byte-delta estimation — **compiled minified CSS, not SCSS source**

**SCSS source bytes are irrelevant to this audit.** What hits the user's browser is the compiled, minified `.min.css` output. Every byte-delta the report emits must estimate compiled-CSS savings, not source-character counts.

The audit doesn't run the compiler — it estimates compiled bytes from source by applying these rules. Round to the nearest 10B. Total at the end of the report.

**Count compiled emissions, not source occurrences.** Sass re-prints the full parent chain for every nested rule, so an edit to a parent selector (an added `:is()` arm, a collapsed `:not()` chain, a widened selector list) lands once per compiled child block — nested children, mixin-emitted blocks, and per-breakpoint arms included. Multiply the per-occurrence delta by that emission count before reporting: a +30B `:is()` arm on a parent with 7 nested rules costs ~+210B compiled, and a −6B `:not()` collapse on a parent that wraps a large variant mixin saves −6B × every rule the mixin emits. Estimates that count source lines instead of emissions miss by 3-7× in either direction.

**For each finding, compute compiled-byte savings as follows:**

- **SEL-01** (`:is()` merge of adjacent state pseudo-classes) — the *raw* delta is `(resolved chain + body) × (N−1) − :is() overhead`, but report the **gzip-discounted wire** figure: the duplicated body and repeated chain are already back-referenced by gzip, so the wire saving is a small fraction of the raw number (≈ the removed back-reference overhead). Lead the finding with the structural win — one fewer compiled rule — not the byte figure. (See the RULES-SEL.md gzip preamble.)

- **SEL-02** (chained `:not()` → list) — raw ~6B per collapsed `:not(`, but `:not(` recurs across the sheet so gzip back-references it → **wire ~0**. Report the selector match-cost win, not bytes.

- **SEL-03** (over-qualified type selector) — raw = tag-length × occurrences, but gzip back-references the repeated `<tag>.nds-name` after the first occurrence → **wire ≈ tag-length once** (`button.nds-btn` ×5 ≈ 6B wire, not 30B). The win is the specificity drop, not bytes.

- **DEAD-01 / DEAD-02 / DEAD-03 / DEAD-05** — the dead declaration's **minified** form (strip leading whitespace, strip the space after `:`, keep the semicolon). `--icon-color: initial;` source = ~25B; minified = `--icon-color:initial;` = ~22B. For DEAD-05, the saved chunk is just `, <literal>` minified (no space) — `, 16px` → `,16px` = 6B.

- **DEAD-04** (`@include ltr` re-stating RTL default) — for each dead declaration inside the block, count the minified declaration as above. **If the block becomes empty AND the minifier strips empty rules, also subtract the compiled wrapper**: `@include ltr` compiles to `:is(html[dir="ltr"], .ltr) <resolved-selector>{...}`. The empty wrapper post-minification disappears entirely, saving `~30B + resolved-selector-length` (the `:is(html[dir="ltr"], .ltr)` prefix + the resolved parent chain + `{}` braces). This is often **larger than the per-declaration savings**.

- **DUPE-01** (in-file duplicate rule bodies) — **the rewrite shape determines the compiled savings, and the audit MUST distinguish them per finding**:
  - **Option A — selector-list merge** (`.a, .b { body }`): compiled output has one rule block instead of N. Savings = `(body + N selector chains) − (1 body + comma-joined selector list)`. Typically `body-size × (N−1)` minus the selector-list overhead.
  - **Option B — `@extend %placeholder`**: `%placeholder` emits no CSS by itself; `@extend` collapses all sites into a single selector list in compiled output. **Same compiled savings as Option A.**
  - **Option B' — `@include mixin`**: the mixin body inlines at each `@include` site. **ZERO compiled-byte savings** — only source-readability changes. The audit MUST NOT propose this as a compiled-byte win.
  Report each option separately with its own savings number; if a user picks `@include`, the byte-delta is zero.

- **DUPE-02** (cross-file mixin candidate, full-tree) — same Option A/B/B' distinction as DUPE-01. Cross-file `@extend %placeholder` is the compiled win; cross-file `@include` is source-organization only and emits the same `.min.css`.

- **DUPE-03** (same selector twice in file) — the smaller of the two selector+braces overheads. Typically `selector-chain-length + 4B` (the duplicate `{}`).

**Negative cases — explicitly report zero or near-zero savings instead of inflating:**

- A SEL-01 merge whose `:is(...)` overhead exceeds the duplicated body. Don't flag.
- A DUPE-01 finding where the only viable rewrite is `@include` (the bodies use file-local custom properties that resolve differently per occurrence). Report savings as 0; surface as a source-readability suggestion only.
- A DEAD-04 where the wrapper doesn't become empty post-edit (other declarations remain). Only the per-declaration savings apply.

**Verification (optional, on user request):**

For the user to ground-truth a batch of findings, the skill can offer to:
1. Snapshot `_site/assets/css/nds-main.min.css` (or the bundle the audited file feeds into) byte-count BEFORE applying.
2. Run `bundle exec jekyll build` to recompile.
3. Re-count AFTER, report the actual delta vs the estimated delta.

This is opt-in — not part of the default Phase 5 flow. Estimates are usually close enough for prioritization; ground truth is for batch-validation when the estimate is large enough to want confidence.

### Track observations for Phase 6 EVOLVE

While analyzing, keep a parallel log:

- **GAP**: a pattern that looks like a real violation (duplicated, dead, expensive selector) but doesn't match any rule. Record: file, line, snippet, one-sentence description, the group it would belong to.
- **SKIP**: a rule match where the proposed rewrite doesn't apply in context (e.g., SEL-01 matched two adjacent `:hover`/`:focus-visible` blocks but their declarations differ in a subtle way the parser missed). Record: rule ID, file, line, one-line reason.

These feed the Phase 4 report's "Gaps observed" section AND Phase 6 EVOLVE — within a full-tree run, a gap recurring across ≥3 files is a promotion candidate, and a SKIP reason recurring across the run's files is a refinement candidate. Recurrence is counted within the run (and, within one session, across the files you audit) — there is no persisted cross-run ledger.

### Rule catalog

| Group | File | Covers | Rules |
|---|---|---|---|
| SEL | `RULES-SEL.md` | Selector compaction — `:is()` grouping, `:not()` lists, over-qualified type selectors | 3 |
| DEAD | `RULES-DEAD.md` | Dead declarations — shorthand/longhand override, duplicate keys, `@include ltr` re-statements, redundant `var()` token fallbacks, inert companion declarations, effectively-redundant cascade/default duplicates (browser-confirmed) | 7 |
| DUPE | `RULES-DUPE.md` | Duplicate rule bodies — in-file merge, cross-file mixin candidates, in-file selector splits | 3 |
| PERF | `RULES-PERF.md` | Selector cost/complexity — unanchored `*`/`[attr]`, ID selectors, deep chains | 4 |
| TOK | `RULES-TOK.md` | Token consistency — hardcoded values, dead tokens, hierarchy direction, state symmetry, cross-file duplicate keys / upstream-hex, cross-sibling indirection symmetry, dangling token references | 7 |

Severity (HIGH / MEDIUM / LOW) drives display order within each section; byte-delta drives display order across SEL/DEAD/DUPE.

**Annotation-exemption convention (every rule).** Each rule defines a `// <RULE> <reason>` exemption comment (named in its row); a site annotated with a real, specific reason is skipped by detection — vague reasons don't qualify. This is what powers the accept-and-annotate close-out above, and Phase 6 surfaces applied annotations as regression-guard candidates. The deep-read agent brief must restate this convention — the agent doesn't read this file.

---

## Phase 4: REPORT

One scannable report. Sections in this order:

**(Tier-2 advisory, if applicable.)** When the audited file is a Tier-2 foundation file, the one-line reduced-catalog advisory (Phase 1) prints here, ABOVE the header — so the reader sees the coverage caveat before the "Clean"/findings verdict.

1. **Header**: `<N HIGH / N MED / N LOW or "Clean">  →  Compiled CSS bytes saved (est): <N>  →  Recommended: <action>`
2. **Per-group summary table** — one row per group: count of findings + total bytes saved (for SEL/DEAD/DUPE) or qualitative note (for PERF/TOK). Skip if all groups are clean.
3. **Output-size findings (SEL + DEAD + DUPE)** — sorted by byte-delta descending. Per-finding block:
   ```
   ### _sass/components/_<file>.scss
   - L42 [SEL-01] Merge :hover and :focus-visible blocks (identical body, 3 declarations)
     Snippet:
       &:hover { color: var(--x); background: var(--y); border-color: var(--z); }
       &:focus-visible { color: var(--x); background: var(--y); border-color: var(--z); }
     Rewrite:
       &:is(:hover, :focus-visible) { color: var(--x); background: var(--y); border-color: var(--z); }
     Saves: ~110B
   ```
4. **Selector performance (PERF)** — sorted by severity. Per-finding block (no byte-delta; qualitative impact note instead).
5. **Token consistency (TOK)** — sorted by severity. Per-finding block.
6. **One-line disclosures** — `Skipped: DUPE-02, TOK-01/02/04/05/06 (full-tree only, single-file mode).`
7. **Gaps observed** — one line each, only if non-empty.
8. **Next step** — numbered list. Item 1 IS the recommended action; renumber to drop options that are no-ops on this run. `save` is NOT a numbered item — it's a literal command that sits below the numbered block as a filter:
   ```
   1. Apply the top 5 byte-saving findings (estimated ~640B saved). Reply `1` to apply each in turn.
   2. Apply all SEL findings (selector compaction only).
   3. Apply all DEAD findings (dead declarations only).
   4. Review TOK findings interactively (token swaps need design judgment).
   5. Annotate accepted tradeoffs — emit each de-recommended finding's `// <RULE> <reason>` exemption comment so it stops re-firing next run.
   0. Exit.

   Filters: apply <rule-id> / apply <file>:<line> / save
   ```

Follow **Numbered-reply discipline** (see Response style): the recommended action is itself numbered, renumber to drop no-ops, and `apply <rule-id>` / `apply <file>:<line>` / `save` stay below the numbered block as filters.

Close with "Reply with a number; `apply` / `save` filters sit below the numbered block. Any apply action ends with a Verification footer (build status, actual compiled-byte delta, per-finding spot-checks)."

### Recommending `save`

`save` is never the headline recommendation. It is optional and exists purely for cross-run comparison (the "Diff vs. Run (N−1)" diff) — a user-facing export, NOT a mechanism input. Phase 6 EVOLVE is session-scoped and does not read saved reports, so skipping `save` costs nothing but the optional diff. After the recommendation reason, add a short `save` clause only when it would pay off:

- If a prior saved run for this exact scope exists (a same-`{scope}` file in `.claude/audit-reports/`): "; `save` to extend the comparison trail (Diff vs. Run N−1)."
- Else (no prior saved run): "; `save` if you want a baseline to diff future runs against."

Never frame `save` as something the user *should* do — it is the user's call.

### Saving the report (optional, user-approved)

**What save is for.** A saved report is a comparison artifact, not a requirement. Its payoff is *across* runs: the "Diff vs. Run (N−1)" section that makes multi-run refinement legible. Within a single session, applying fixes does not depend on a saved file. So never push `save`; offer it, and let the user decide whether the comparison trail is worth keeping.

When the user replies `save` — alone, or combined with another action like `apply 1 then save` — write the current report verbatim to `.claude/audit-reports/` under one of these patterns:

**Full-tree filename:** `YYYY-MM-DD-nds-css-{group}-audit-run-N.md`
**Single-file filename:** `YYYY-MM-DD-nds-css-{component}-{group}-audit-run-N.md`

- `YYYY-MM-DD` is the run date (today, unless the audit is being re-saved later).
- `{group}` is the rule-group filter the run used, lowercased: `sel` / `dead` / `dupe` / `perf` / `tok` / `all`. The Phase 1 rule-group filter maps 1:1 to this slug.
- `{component}` (single-file mode only) is the resolved target's stem with the leading `_` stripped and the `.scss` extension removed: `_sass/components/_buttons.scss` → `buttons`. Lowercased, hyphens preserved (`_sass/components/_cooldown-button.scss` → `cooldown-button`).
- `N` is the **per-scope save-order index**:
  - **Full-tree:** `(count of existing files matching `*-nds-css-{group}-audit-run-*.md` in `.claude/audit-reports/`) + 1`.
  - **Single-file:** `(count of existing files matching `*-nds-css-{component}-{group}-audit-run-*.md` in `.claude/audit-reports/`) + 1`. Indexed per-(component, group) so "Run 2 vs Run 1 of buttons SEL" stays diffable independently of any full-tree run that landed between them.
- Index is per-scope, not global — comparing apples to apples is what makes "Diff vs. Run (N−1)" useful. Do NOT count `/nds-css-audit` invocations from the conversation that didn't get saved; the index reflects persisted artifacts only.

**Always include a frontmatter-style header** in the saved file so later audits can be diffed meaningfully:

```markdown
# CSS Audit — {scope-line} — Run N

**Date:** YYYY-MM-DD
**Rule catalog:** {single group e.g. "SEL" | combined e.g. "SEL + DEAD + DUPE + PERF + TOK"}
**Invocation:** `/nds-css-audit {args}`

## Summary
…
```

`{scope-line}` is `` `full-tree` `` for full-tree runs, or `` `_sass/components/_buttons.scss` `` (use the actual file path) for single-file runs.

**Diff-vs-prior section.** If `N ≥ 2`, append a "Diff vs. Run (N−1)" section at the bottom listing what changed since the last saved one: new findings, closed findings, re-classified findings (severity changes), and any catalog notes (rule narrowing / gap proposals applied between runs). This is what makes multi-run refinement legible across time. For diffing, locate the prior file via `ls .claude/audit-reports/ | grep -E '<pattern>'` filtering on the same scope, sort by `-N`, pick the highest-numbered existing entry.

**Never overwrite.** Before writing, `ls .claude/audit-reports/` to confirm the target filename doesn't exist. If it does (e.g., two saves on the same day), bump the `-N` index.

**Writes go only to `.claude/audit-reports/`.** Never save reports inside `_sass/`, `assets/`, the project root, or other Jekyll-tracked directories — the `.claude/` tree is outside the site build. If the `.claude/audit-reports/` directory doesn't exist, create it before the first save.

### Single-file `all` — consolidated report

Run each group's Phase 3 analysis against the one file, then emit ONE Phase 4 report. The per-group summary table covers all five groups. Findings merge into the three sections (output-size / PERF / TOK). The full-tree-only skip banner is shown once at the end.

---

## Phase 5: APPLY (on user request only — read APPLY.md first)

Only entered when the user replies with a Next Step number or an `apply <rule-id>` / `apply <file>:<line>` filter. **Before applying anything, read `APPLY.md` (sibling file) and follow it** — it owns the apply loop (re-read target, snippet-drift check, `Edit`-only changes) and the REQUIRED post-batch Verification footer: the serve-active vs explicit-build branch, byte-delta ground-truth, the TOK-02 consumer re-grep gate, the automatic cascade-flip review agent, per-finding spot-check lines, and the optional user-elected `verify in browser` tier. Never auto-apply — the explicit reply is the gate.

---
## Phase 6: EVOLVE (session-scoped — surface candidates at run end)

After Phase 4 REPORT (and Phase 5 APPLY, if it ran), Phase 6 reconciles the catalog against THIS run's findings, gaps, and SKIPs and **surfaces** what it learns in the report. It is **session-scoped** — it reads no persisted ledger and writes nothing to the repo. (This matches the JS audit's *rule-refinement* track, which is likewise same-session — see "Where lifecycle state lives" below for where CSS deliberately goes leaner than JS.)

**Where rule lifecycle lives.** A rule's lifecycle is an **inline annotation in its `RULES-*.md` row**, not a computed cross-run ladder:
- A rule with a live motivating example is proven and active.
- When the user applies the fix for a rule's motivating example, the rule's row is annotated `Motivating example (resolved) — stands as a regression guard` (the user makes that one-line edit; Phase 6 surfaces it as a candidate). The rule is NOT deleted — a resolved example means the rule now guards against regression, which is its job.
- The catalog's deleted-rule and declined-pattern lessons live in each group file's "Deleted rules & declined patterns" section (e.g. the DUPE-04 anti-pattern in `RULES-DUPE.md`).

That inline, committed annotation is the durable lifecycle signal — no separate maturity file, no trail to read.

**Two kinds of output, different gates** (mirrors the JS audit's Phase 7, likewise suggest-only — concurrent audit sessions share the skill files, so neither skill writes them mid-run; JS additionally surfaces persona-bookkeeping candidates, which the CSS skill, with no persona file, does not):
- **Observations** (what this run saw — gaps, SKIPs, a resolved motivating example): reported only. Nothing written to the repo.
- **Catalog change** (judgments — add / delete / narrow a rule, or annotate a resolved example): NEVER auto-applied. Surfaced as candidates in the report's `## Catalog evolved` section; the user makes the edit to `RULES-*.md` / `SKILL.md`.

### Catalog-change candidates (surface for user approval)

From THIS run's gap and SKIP logs (Phase 3), surface — never auto-apply:

- **Gap → rule promotion:** a gap pattern recurring across ≥3 files in a full-tree run (the strongest signal, fully visible within one run) → a promotion candidate with a draft detection sketch + severity guess. Within one session spanning several single-file runs, a gap seen in ≥2 of them is also a candidate. There is no cross-session counter — if you notice a gap recurring across separate sessions, promote it on sight.
- **Rule refinement:** a SKIP reason recurring across the run's files → a proposed carve-out.
- **Resolved motivating example:** a rule whose `RULES-*.md` motivating example was fixed this session → surface the one-line "annotate as regression guard" edit.
- **Dead-rule candidate:** a rule with NO motivating example in its `RULES-*.md` row that also did not fire here → a *soft* "consider narrowing or removing" note. No hard counter (that needed a cross-run ledger) — narrow before deleting, and only on a clear pattern.
- **Citation drift:** spot-check each rule's motivating-example citation in its `RULES-*.md` row **by its symbol, not its line** — citations are symbol-anchored (the greppable selector / token / mixin name / quoted snippet is authoritative; the line number is a decaying hint). Symbol moved → note the new line; symbol gone because the fix was applied → surface the regression-guard annotation above. Candidate citations a user adds to `RULES-*.md` must name a symbol, never a bare `file:line`.

Append a `## Catalog evolved` section to the report when any candidate exists — each line names the candidate + the action the user takes (e.g. "Add DEAD-06 per the draft above" / "Annotate DEAD-03 row: motivating example resolved → regression guard"). The candidates are SUGGESTIONS — Phase 6 never auto-edits the catalog. Omit the section when there are none.

### Where lifecycle state lives

The catalog's only cross-session memory is the committed `RULES-*.md` itself — rules, carve-outs, regression-guard annotations, and each group's "Deleted rules & declined patterns" lessons. Durable judgments live there, inline. Volatile cross-run bookkeeping (match counts, maturity ladders, reconciliation logs) is deliberately NOT kept — anything worth keeping is promoted to a committed rule row instead; do not introduce a committed bookkeeping ledger or any file Phase 6 rewrites per run. Saved reports remain a **purely optional export** (a `Diff vs. Run (N−1)` for users who choose to save), never a mechanism input to detection or EVOLVE.

### Writing guardrails (for the edits the user applies)

Candidates are drafted — and, once the user applies them, written — under the same hygiene rules the JS audit's `EVOLVE.md` uses:

- **Present-tense, no backstory.** New rules, carve-outs, and lessons read as current rules — no dates, no "was/previously/removed on", no narration of what the catalog used to say. A deleted rule gets at most one line in its group's "Deleted rules & declined patterns" section stating the anti-pattern and why it loses; git history holds the rest.
- **Carve-outs retire.** A carve-out whose anchoring symbol is gone from the corpus (citation-drift check above) → surface a carve-out DELETION candidate, not merely an expired-citation note.
- **Condense before appending.** A candidate that would push a rule row past ~25 source lines or add a fourth carve-out → surface a CONDENSE candidate for that row alongside it, rather than appending another exception to an already-encyclopedic row.

---


## Out of scope

The audit does NOT check, and the report should mention this so the user knows what to NOT expect:

- **Specificity conflicts** — full cascade-winner modeling is out of scope; DEAD-07 covers only the narrow browser-confirmed *effective-redundancy* subset (a declaration whose removal leaves computed styles unchanged), not specificity-winner resolution
- **Color contrast (WCAG)** — needs resolved color values + rendering
- **Unused selectors** — needs HTML corpus scan
- **Token discipline (form-violation)** — raw hex colors, raw `--colors-*` references in components, `nds-` prefix, missing `@use 'mixins' as *;`. Already enforced in this codebase per `CLAUDE.md`; the audit doesn't re-check what CLAUDE.md already governs. NOTE: token *consistency* (hardcoded values where a token exists, dead tokens, hierarchy direction, asymmetric state coverage) IS audited via TOK-01/-02/-03/-04. Discipline ≠ consistency.
- **RTL physical-property checks** — except where DEAD-04 catches the inverse (LTR block re-stating RTL default)
- **Accessibility** — `@include reduced-motion` coverage, focus-visible coverage on interactive elements
- **Z-index ladder**
- **Dark mode parity**
- **Vendor prefixes** — needs target-browser doc first
- **Bundle membership / orphan partials**
