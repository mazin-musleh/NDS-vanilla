# NDS JS Audit — Ponytail Overlay

A cross-cutting **over-engineering lens**, applied AFTER the rule catalog (JSP / JSD / JSS / JSA) runs, **within the same resolved scope** (single-file → that file + repo cross-ref; full-tree → the greppable shapes). It does NOT replace the catalog; it asks the upstream question the perf/DRY/security/architecture rules never ask head-on: *does this need to exist at all?*

Same contracts as the rest of the skill: **suggest-only**, numbered replies, severity-ranked, Phase 7 EVOLVE on an explicit go. The lens applies nothing.

**Source of truth — auto-follows the plugin; degrades gracefully without it.** The ladder and the tag *definitions* come from the **active ponytail persona**, injected into the session and audit subagents by the ponytail plugin's hooks when ponytail mode is on. Lean on that live version so plugin updates flow in for free — never hand-sync a copy of the plugin's philosophy here. The legend below is a **self-contained mirror**: if a clone has no ponytail plugin (or mode is off), this lens still runs from the legend — the audit just loses the global *mode*, not the overlay. Only the NDS-specific parts of this file — the tag→rule mapping, `PONY-*` gap rules, and carve-outs — are authored here, and they track the repo, not the plugin.

Tag legend (mirror of the plugin's tags — fallback, not authority):

- `delete:` dead code / unused flexibility / speculative feature. Replacement: nothing.
- `stdlib:` a hand-rolled thing JS stdlib ships. Name the function.
- `native:` code doing what the browser platform already does. Name the feature.
- `yagni:` an abstraction with one implementation, config nobody sets, a layer with one caller.
- `shrink:` same logic, fewer lines.

---

## Step 1 — Re-tag (overlay, no new detection, no double-report)

Label each finding **already produced this run** with one ponytail tag, so the report reads cut-first. Creates nothing, dedups against itself — a label on an existing row:

| Existing rule hit | Ponytail tag |
|---|---|
| JSD dead-helper, JSA dead-guard, dead flag | `delete:` |
| JSD-05 (promote to core), JSD reinvented helper | `stdlib:` |
| JSA in-file duplication, KISS / mixed-concern split | `shrink:` |
| JSA single-impl abstraction, unbounded-but-trivial | `yagni:` |
| a shim for a now-native feature | `native:` |

## Step 2 — Gap-hunt (net-new `PONY-*`, scoped to the run's files)

Only what the catalog does NOT already cover. Each finding: `file:line`, the cut, the replacement (**name** the stdlib/native feature), severity (LOW by default; HIGH only when the reimplementation is a real correctness risk).

- **`PONY-STD`** `stdlib:` — a genuine stdlib reimplementation: hand-rolled `Array.from`/`flat`/`at`, manual deep clone where `structuredClone` fits, hand-rolled UUID/clamp/range. (Distinct from JSD-05, which promotes an *NDS* helper to core — `PONY-STD` is "the language already ships this.")
- **`PONY-NAT`** `native:` — a shim/polyfill for an evergreen-native feature (a `requestIdleCallback` fallback that's no longer needed, `closest`/`matches` polyfill, smooth-scroll shim), or manual work the platform does (`AbortController`, `URLSearchParams`, `Intl`, `navigator.clipboard`).
- **`PONY-YAG`** `yagni:` — an abstraction with ONE implementation (a strategy/registry map with one entry, a factory for one product, a wrapper that only delegates, an options object every caller passes identically), a config/flag no caller sets to a non-default, **a public method with zero readers**.
- **`PONY-DEL`** `delete:` — a dead file/export/flag, a code path nothing reaches.

---

## Carve-outs — NEVER flag (deliberate architecture; reuse the skill's + PERSONA.md guardrails)

A design system **ships a public API consumers use** — do not YAGNI the documented surface the way you'd YAGNI app code. Specifically off-limits:

- **3-bundle architecture**: main / delegated / extras, the loader's lazy Proxy stubs, the `critical:`/`deferred` classification, the build guard. **Loader-owned scheduling** (eager/idle/yield) — components must NOT self-schedule; the centralization is deliberate (`loader_owns_scheduling`).
- **Pooled core helpers** (`NDS.onResize` / `onIntersect` / `onElementResize` / `onDOMAdd` / `onAttrChange` / `debounce` / `State` / `Status` / `breakpoints`): calling them is correct, and their single-listener fan-out design is the point — not duplication.
- **Lifecycle canon**: `init()`/`reinit()`/`destroy()` pairs, `{ signal }` teardown, console prefixes, init-sentinel attributes, **cold-init** (cheap registration, measure in a ResizeObserver callback). These are required, not boilerplate.
- **Deliberate fidelity shims**, NOT removable polyfills: the `requestIdleCallback`→timeout fallback, `scheduler.yield`→MessageChannel, IntersectionObserver/ResizeObserver `typeof` guards — kept for older Safari on purpose. Don't flag as `native:`.
- **Markup is a production contract** (`markup_is_production_contract`): never propose a change that requires consumers to edit existing markup. A manual focus-trap is NOT `native:`-swappable to `inert`/`<dialog>` unless the markup already supports it (the drawer/IPV focus traps mirror the modal deliberately).
- **No marginal changes to contract-critical files** (`forms`/`core`/`loader`): a verified-safe but sub-perceptible edit isn't worth touching them (`no_marginal_changes`). Measured-lean inits don't get perf cuts (`forms_init_cold_cheap`).

**Verify before any `delete:` / `PONY-DEL` / zero-reader `PONY-YAG`:** grep the WHOLE repo — sibling components, `nds-showcase.js`, the component's `.md` doc — for readers. *Locally-unused ≠ unused.* (The `getFallback` lesson: it looked dead but `nds-showcase.js` reads `NDS.Stepper.getFallback`. The `upload` "speculative" methods are documented contract. `StatusTypes` WAS genuinely zero-reader — the grep is what tells them apart.)

---

## Report + scope integration

- PONY findings fold into the Phase 4 report under their severity; the rule cell is `PONY-STD` / `PONY-NAT` / `PONY-YAG` / `PONY-DEL`, the finding prefixed with its tag. Re-tagged catalog rows just gain the tag — they are NOT relisted.
- Add ONE line below the Summary block: `Ponytail: <N> cuts (<D> delete / <St> stdlib / <Nat> native / <Y> yagni)` — or `Ponytail: none` on a clean lens pass (a clean pass is a real result; say so).
- The single-file deep-read agent (Phase 3) also runs this lens — paste these carve-outs into its brief; it returns `PONY-*` rows tagged `(deep-read agent)`.
- Phase 5 FIX, auto-advance, and Phase 7 EVOLVE treat PONY findings exactly like any rule (suggest-only; a recurring PONY gap is an EVOLVE promotion candidate into a real rule, or a PERSONA carve-out when it's a deliberate-architecture false-positive).
- **Suppress** with a `no-pony` token in the rule-group slot when the user wants a pure catalog run; the lens is otherwise on for every analyze pass.
