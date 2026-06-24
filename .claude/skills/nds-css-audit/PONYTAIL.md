# NDS CSS Audit — Ponytail Overlay

A cross-cutting **over-engineering lens**, applied AFTER the rule catalog (SEL / DEAD / DUPE / PERF / TOK) runs, **within the same resolved scope** (single-file → that file + repo cross-ref; full-tree → the cross-file shapes). It does NOT replace the catalog; it asks the upstream question the byte/selector/token rules never ask: *does this need to exist at all?*

Same contracts as everything else in this skill: **suggest-only**, numbered replies, severity-ranked, session-scoped EVOLVE. The lens applies nothing.

**Source of truth — auto-follows the plugin; degrades gracefully without it.** The ladder and the tag *definitions* come from the **active ponytail persona**, injected into the session and audit subagents by the ponytail plugin's hooks when ponytail mode is on. Lean on that live version so plugin updates flow in for free — never hand-sync a copy of the plugin's philosophy here. The legend below is a **self-contained mirror**: if a clone has no ponytail plugin (or mode is off), this lens still runs from the legend — the audit just loses the global *mode*, not the overlay. Only the NDS-specific parts of this file — the tag→rule mapping, `PONY-*` gap rules, and carve-outs — are authored here, and they track the repo, not the plugin.

Tag legend (mirror of the plugin's tags — fallback, not authority):

- `delete:` dead code / unused flexibility / speculative rule. Replacement: nothing.
- `native:` SCSS hand-rolling what CSS does at runtime. Name the feature.
- `yagni:` an abstraction with one consumer, a knob nobody sets.
- `shrink:` same compiled output, fewer source/selector bytes.
- `stdlib:` (rare in CSS) a Sass reimplementation of a built-in.

---

## Step 1 — Re-tag (overlay, no new detection, no double-report)

Label each finding **already produced this run** with one ponytail tag, so the report can be read cut-first. This creates nothing and dedups against itself — it's a label on an existing row:

| Existing rule hit | Ponytail tag |
|---|---|
| DEAD-*, TOK-02 (dead token), TOK-07 (dangling ref) | `delete:` |
| SEL-*, DUPE-* | `shrink:` |
| TOK-01/03 (hardcoded → token), TOK-04/06 (asymmetry) | `shrink:` or `yagni:` (per finding) |
| a Sass math/`@if` ladder a native CSS fn replaces | `native:` |

## Step 2 — Gap-hunt (net-new `PONY-*`, scoped to the run's files)

Only what the catalog does NOT already cover. Each finding: `file:line`, the cut, the replacement, and **qualitative** impact (source clarity / dead surface — usually NOT compiled bytes; say so), severity (LOW unless it removes real output bytes).

- **`PONY-NAT`** `native:` — a value/branch computed in Sass that CSS resolves natively: a `@if`/`@else` size ladder where `clamp()`/`min()`/`max()` fits; a hardcoded LTR/RTL pair where a logical property auto-adapts; a hand-mixed shade where `color-mix()` / a token does it. Replacement names the CSS feature.
- **`PONY-YAG`** `yagni:` — a `@mixin` / `%placeholder` / partial with **exactly one** `@include`/`@extend` consumer that just inlines → fold into the caller (only when folding is *clearly* simpler). A knob trio (`--x-min/-mid/-max`, a `$slides-*` set) where only one rung is ever set. A `data-*` styling hook with no markup that uses it (cross-ref `_includes/`, `*.md`, `_js/`).
- **`PONY-DEL`** `delete:` — a whole rule block / utility class / state selector with zero matching markup repo-wide; a `@if $flag` branch for a config value never set.

---

## Carve-outs — NEVER flag (deliberate architecture; reuse the skill's tier/exclusion lists)

A design system **ships flexibility consumers use** — do not YAGNI the public token/utility surface the way you'd YAGNI app code. Specifically off-limits:

- **Critical CSS**: `_fold.scss` / `_skeleton.scss` / `_base.scss`, the hero-only `:where(){visibility:visible}` reveal, `content-visibility` section gating. Already-tuned; never propose trimming or restructuring it (`crit_css_already_tuned`, `skeleton_hero_reveal_only`).
- **Token tiers + routing**: component→semantic→colors, meaning-routed aliases, deliberately-asymmetric state/variant families (CLAUDE.md), dark/HC re-binds in `*-dark.scss` / `_variables-a11y.scss`. TOK-02/04 already own real dead/asymmetry — the lens does not second-guess a complete family.
- **Per-file conventions**: `@use '../mixins' as *;` at every component top (required, not redundant); RTL-default + logical properties; `@include ltr` for transforms/gradients only.
- **Single-consumer mixins/placeholders that exist for reuse** — dark/HC/theme variants, the OKLCH ramp engine, or a documented public authoring surface. One consumer *today* ≠ YAGNI when the second is a mode override or a consumer of the shipped system.
- **Rejected-before patterns** (don't re-propose): `:has()` for anything (`no_has_selector`), `@for` enumeration of open-ended consumer values (`no_scss_enumeration`), mass static→`clamp()` (`fluid_typo`), per-component asset splitting (`modular_assets_rejected`).
- **Tier-1 files** (generated icon font, `_showcase.scss`, vendored `_dga.scss`, `*.min.*`) — never targets.

**Verify before any `delete:` / `PONY-DEL` / zero-consumer `PONY-YAG`:** grep the whole repo (incl. `_includes/`, `*.md`, `_js/`) for users — *locally-unused ≠ unused* (`check_dependents_before_stripping`).

---

## Report + scope integration

- PONY findings fold into the Phase 4 report under their severity; the rule cell is `PONY-NAT` / `PONY-YAG` / `PONY-DEL`, the finding prefixed with its tag. Re-tagged catalog rows just gain the tag — they are NOT relisted.
- Add ONE line below the canonical header: `Ponytail: <N> cuts (<D> delete / <S> shrink / <Y> yagni / <Nat> native)` — or `Ponytail: none` on a clean lens pass (a clean pass is a real result; say so).
- Phase 5 APPLY, accept-and-annotate, and Phase 6 EVOLVE treat PONY findings exactly like any rule (suggest-only; a recurring PONY gap is an EVOLVE promotion candidate into a real rule).
- **Suppress** with a `no-pony` token in `$2` when the user wants a pure catalog run; the lens is otherwise on for every analyze pass.
