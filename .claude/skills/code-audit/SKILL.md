---
name: code-audit
description: Audit NDS source JS for DRY/KISS violations, scalability and maintainability risks, performance issues, and cross-file pattern consistency. Covers listener/observer pooling via nds-core.js (NDS.onResize, NDS.onIntersect, NDS.onElementResize, NDS.onDOMAdd, NDS.onAttrChange, NDS.debounce), throttling of scroll/resize handlers, NDS.State and NDS.Status reuse, NDS.breakpoints reuse, cross-file detection of repeated helper functions that should be promoted to nds-core.js, component contract conformance (factory vs singleton shape via NDS.{Name}.init/reinit/create), and dead defensive guards inside loader-registered components. Use this skill for "audit the JS", "audit performance", "optimize listeners", "check nds-core usage", "find functions that should live in core", "find unthrottled scroll handlers", "make all components follow the same pattern", "check component consistency", or any JS source-code quality pass on `_js/`. NOT for SCSS/CSS audits, documentation page audits (use doc-page), content/icon/sidemenu audits (use content-review), or UX copy review.
argument-hint: "[target] [optional: rule-group]"
---

# NDS Code Audit

Apply this skill to: `$ARGUMENTS`

This skill audits the NDS JavaScript source — the files in `_js/` — against the conventions already codified in `CLAUDE.md` and the shared-utility contract published by `_js/nds-core.js`. It reports real duplication, real performance risk, and real maintainability drag, then applies fixes only after the user approves the report. It is the code-quality counterpart to `doc-page` (which audits documentation) and `content-review` (which audits content/icons/sidemenu coverage).

---

## Mindset

Audit like a staff engineer doing code review before a release. Favor concrete, actionable findings over theoretical cleanliness. Flag real duplication and real performance risk; do not manufacture issues to pad the report. When a rule is qualitative (JSD-05 promotion candidates), require at least two call sites and meaningful body overlap before flagging. If a finding cannot be explained in one sentence with a specific fix, it is not a finding. Prefer the highest-leverage recommendation over the longest list.

The goal is a report a developer can act on in the next hour, not a lint dump they will close and forget.

The rule catalog is a living document — surface gaps and dead rules during the audit (Phase 3 tracks them, Phase 7 applies catalog edits) so the skill sharpens rather than silently shrinks.

---

## Phase 1: RESOLVE

Parse `$ARGUMENTS` into a mode and (optionally) a rule-group filter.

### Mode selection (first argument)

| `$1` | Files in scope | Rule groups run |
|---|---|---|
| `js` or empty | All `_js/nds-*.js` except `nds-core.js`, `nds-loader.js`, `nds-showcase.js` | JSP + JSD |
| `<filename>` or `<relative/path>` | Single JS file under `_js/` | JSP + JSD |

**SCSS is not supported.** If the user passes `scss`, `all`, or any path ending in `.scss`, stop and reply: *"SCSS audit coverage was removed from this skill. Refactor SCSS manually — see `CLAUDE.md` for token, RTL, and scaffold conventions."* Do not run partial rules on an SCSS file.

**Strict scope constraint.** Only JSP and JSD rules run. No SCSS-scoped rule groups exist in this catalog.

### Rule-group filter (optional second argument)

If `$2` is present, restrict the run to a subset of rule groups:

| `$2` | Rule groups included |
|---|---|
| `performance` | JSP |
| `dry` | JSD |

Without `$2`, both JSP and JSD run.

### Excluded files (always)

- `_js/nds-core.js` — defines the conventions the skill enforces; never audit or modify it.
- `_js/nds-loader.js` — init registry with its own ordering rules; outside the scope.
- `_js/nds-showcase.js` — demo-page wiring, not a shipped component.
- Any `.min.js` file.

If the user names an excluded file in single-file mode, stop and explain why rather than running partial rules.

---

## Phase 2: READ

Source files are the single source of truth. Read them fully, not by skimming.

### MUST read every run

- **`_js/nds-core.js`** — the full shared-utility surface. Re-read every run so the rule catalog reflects the current `NDS.*` API (names, arities, return values). Rules JSP-01 through JSP-07 and JSD-01 through JSD-04 all reference specific functions here; if core gains a utility, the skill's recommendation should route to it instead of flagging the pattern as unresolved.
- **At least one JS good-pattern exemplar** — `_js/nds-scroll-more.js` for RAF-throttled scroll + pooled ResizeObserver, `_js/nds-drawer.js` for NDS.State destructuring + reads-before-writes, `_js/nds-modal.js` for NDS.State and backdrop API usage. Recommendations cite these with `file:line` so the user can copy a working pattern rather than invent one.

### MUST read every target file

Read each target file top-to-bottom before running the catalog. Pattern-matching alone misses context (a `setTimeout` inside a `NDS.debounce` callback is not a JSP-07 violation). A full read is what separates this skill from a grep script.

---

## Phase 3: ANALYZE

Run the rule catalog file-by-file. Each match is recorded as: file, line, rule ID, offending snippet (≤120 characters), suggested fix pointing to the exact `NDS.*` call. Dedupe findings whose line ranges overlap so the same handler is not triple-flagged.

### Track observations for Phase 7

While analyzing, keep a parallel log of two meta-observations so Phase 7 has data to propose catalog edits from:

- **GAP**: a pattern in the current file that looks like a real violation (duplicated across files, obviously inefficient, breaks a CLAUDE.md convention) but does not match any existing rule ID. Record: file, line, snippet, one-sentence description of what looks wrong, and the rule group it would belong to (JSP or JSD) if it existed.
- **SKIP**: a rule match that had to be discarded because the recommended fix does not apply in context. Record: rule ID, file, line, why the fix failed (e.g., "JSP-02 matched but the handler is already RAF-batched via an imported helper"). One-line rationale per skip — do not silently drop.

These logs are additive across the run and feed into the "Gaps observed" and "Dead-rule candidates" sections of the report.

### Rule catalog

Severity drives the order in which fixes are applied during Phase 5: HIGH (correctness and performance first), then MEDIUM, then LOW.

#### JS Performance (JSP)

| ID | What to detect | Severity | Fix |
|---|---|---|---|
| JSP-01 | `addEventListener(['"']resize['"']` on `window` | HIGH | Replace with `NDS.onResize(handler)` — it already debounces at 150ms and pools subscribers. |
| JSP-02 | `addEventListener(['"']scroll['"']` where the handler body does NOT contain any of `requestAnimationFrame(`, `NDS.debounce(`, `NDS.onResize(` within ~10 lines of the handler's opening brace. Custom `throttle()` wrappers do not count as throttled unless they themselves use one of these primitives — trace into the wrapper to confirm.<br><br>**Explicitly NOT throttled** (these are findings, not passes):<br>- bare `setTimeout` inside the handler, even with a `clearTimeout`+rebind debounce shape — for scroll, that's JSP-07's job, not "throttled" for JSP-02.<br>- a custom `throttle()` / `rafThrottle()` wrapper whose implementation uses bare `setTimeout` instead of `requestAnimationFrame`.<br>- a handler-body early-return guard on scroll position (e.g., `if (window.scrollY < 200) return;`) — that's a threshold, not a rate limit; the handler still fires on every scroll event above the threshold.<br>- `requestIdleCallback` — it does not help scroll responsiveness and is not on the approved list.<br>- the `passive: true` flag on the listener — that improves scrolling smoothness but does not throttle the handler.<br><br>If none of the approved primitives are present in the handler (tracing wrappers where needed), emit the finding. Do not rationalize. | HIGH | Wrap in RAF throttle. Copy the pattern from `_js/nds-scroll-more.js:140-157`. |
| JSP-03 | `new IntersectionObserver`. **Not exempt**: singleton usage, single-element observation, proper `disconnect()`/`unobserve()` disposal, or manual pooling do NOT make this compliant. The rule is about routing through the shared `NDS.onIntersect` pool so observers are grouped by threshold/rootMargin across the whole app — not about leak prevention. A well-disposed bare `new IntersectionObserver` is still a finding. | MEDIUM | Replace with `NDS.onIntersect(el, handler, { threshold, rootMargin })`. Core pools observers by threshold/rootMargin automatically. Store the returned unsubscribe handle. |
| JSP-04 | `new ResizeObserver`. **Not exempt**: singleton usage, single-element observation, or local `disconnect()` do NOT make this compliant. The rule routes through the shared `NDS.onElementResize` pool; a local pool replicating the same logic is a duplication, not a pass. | MEDIUM | Replace with `NDS.onElementResize(el, handler)`. Returns an unsubscribe function; store it for teardown. |
| JSP-05 | `new MutationObserver`.<br><br>**Not exempt**: observing a single element, attaching once at setup, or `observer.disconnect()` on teardown do NOT make this compliant. One MutationObserver per component scales linearly with component count; the NDS pool keeps one observer per configuration and dispatches by selector.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- MutationObserver instances preceded (within 3 lines above the `new MutationObserver` line) by an inline comment that explicitly rationalizes why the shared `NDS.onDOMAdd` / `NDS.onDOMRemove` / `NDS.onAttrChange` pool does not cover the use case — e.g., content-mutation semantics (`characterData`, text-node observation), cross-frame observation, or other mutation types not in the pool's API.<br>- A bare "// MutationObserver" or unrelated contextual comment does NOT count — the comment must reference the pool's limitation and explain why the local observer is necessary. This is an escape hatch for cases the pool genuinely doesn't cover; it is not an opt-out for "I didn't bother". | MEDIUM | Replace with `NDS.onDOMAdd(selector, handler)`, `NDS.onDOMRemove(selector, handler)`, or `NDS.onAttrChange(selector, attrs, handler)` depending on mutation type. |
| JSP-06 | `addEventListener` without a matching `removeEventListener` or a stored unsubscribe returned by `NDS.on*`. **Loop pattern**: when a component attaches listeners per-element inside `forEach`/`map`/`for` with `addEventListener` inside, and the loop has no `AbortController` or stored-handle bookkeeping, flag the whole loop as a single finding with the listener count (not one finding per line). **Dynamic re-attach pattern**: when that loop sits inside a function called from event handlers, re-init paths, or other re-entrant contexts AND the function does NOT detach prior listeners before re-attaching, flag it as a dynamic re-attach leak — listeners stack on every invocation, scaling memory and CPU with usage rather than leaking just once. | MEDIUM | Store the unsubscribe handle on the instance (e.g., `wrapper._offResize = NDS.onResize(...)`) or attach an `AbortController.signal` to every listener in the loop so `.abort()` cleans them up atomically. For the dynamic re-attach case, abort the previous controller at the top of the function before creating a new one, or use delegated listeners on a stable parent so no per-call re-attachment is needed. |
| JSP-07 | Inline `setTimeout` / `clearTimeout` debounce patterns | LOW | Use `NDS.debounce(fn, ms)`. |

#### JS DRY/KISS (JSD)

| ID | What to detect | Severity | Fix |
|---|---|---|---|
| JSD-01 | `setAttribute('data-state'`, `getAttribute('data-state')`, or assignment to `dataset.state` | HIGH | Use `NDS.State.add/remove/has/get/set/clear/apply`. The helpers handle space-separated values correctly. |
| JSD-02 | Same pattern on `data-status` | HIGH | Use `NDS.Status.set/get/clear`. Status is a single value, not a set. |
| JSD-03 | Hardcoded layout pixels bypassing the token layer, in two sub-shapes: **(a) viewport comparisons** — `768`/`1024`/`1280`/`1440` compared against viewport width; **(b) fallback literals** — the same values used as the right-hand side of `\|\|` after `getComputedStyle().getPropertyValue(...)` parses a CSS variable (e.g., `parseInt(styles.getPropertyValue('--nds-...')) \|\| 1280`). Both shapes hardcode the token into JS; (b) also hides a missing-CSS-var bug when the fallback silently takes over.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Numeric literals on the right-hand side of a module-scope `const` declaration whose identifier is SCREAMING_SNAKE_CASE (e.g., `CONTENT_MAX_WIDTH_FALLBACK`, `SLIDES_MAX_WIDTH`) AND which has a rationale comment within 3 lines above explaining why JS needs the numeric value. This IS the fix for sub-shape (b); re-flagging it on every audit run is noise. The detection fires on raw literals in comparisons or fallback positions, not on named-constant declarations that encode the token-layer shim. | MEDIUM | Viewport comparisons → use `NDS.breakpoints.mobile/tablet/desktop/largeDesktop`. Fallback literals → ensure the CSS variable is always defined in base styles so the fallback never fires, or extract the literal to a SCREAMING_SNAKE_CASE module-scope constant with a rationale comment explaining why JS needs the value. |
| JSD-04 | Re-implemented RTL check (`document.dir`, `document.documentElement.dir === 'rtl'`, `getAttribute('dir')`) | MEDIUM | Use `NDS.isRTL` (live getter) or `NDS.lang`. |
| JSD-05 | **Promotion candidate.** A helper function with near-identical signature and body appears in two or more component files and has no equivalent in `nds-core.js`. | MEDIUM | Propose an `NDS.*` API name and list every call site. Typical candidates: focus-trap, scroll-lock, `getComputedStyle` readers, `matches()` / `closest()` helpers, RAF batchers, event-delegation factories, z-index stackers, `aria-expanded` toggles. Do NOT edit `nds-core.js` — surface the candidate and let the user decide. |
| JSD-06 | DOM read after write in the same frame (e.g., `setProperty` then `getBoundingClientRect` in a loop).<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Standalone forced-reflow triggers (`void el.offsetHeight;` or `el.offsetHeight;` as the sole statement on its line) are deliberate transition-start patterns, not thrashing.<br>- Staged-measurement patterns: a write to `style.cssText` / `style.visibility` / `style.position` that puts an element into a measurable off-screen state, followed by `offsetHeight` / `offsetWidth` / `getBoundingClientRect()` reads. The read semantically depends on the write (the element must be staged before it can be measured), so "batch reads before writes" does not apply. Require an inline comment near the write confirming the staging intent to earn this exemption — otherwise it's indistinguishable from a thrash loop.<br><br>Thrashing is a LOOP pattern (N writes × N reads within one synchronous block). One-shot write-then-read sequences are not thrashing. | LOW | Batch reads before writes. See the pattern in `_js/nds-drawer.js:77-99`. |
| JSD-07 | **Component contract conformance.** A `_js/nds-{name}.js` file whose public surface does not match one of the two shapes the loader expects. Factory components must expose `NDS.{Name}.init()`, `NDS.{Name}.reinit()`, and `NDS.{Name}.create(el)`. Singletons must expose `NDS.{Name}.init()` plus their component-specific methods. The namespace `{Name}` must be the PascalCase form of the filename suffix. | MEDIUM | Restructure the module to match the shape of the closest peer (factory example: `_js/nds-modal.js`; singleton example: `_js/nds-theme.js`). Inconsistent shapes force every reader to relearn the API per component and block the loader from treating components uniformly. |
| JSD-08 | **Dead defensive guards.** Inside a component registered with `nds-loader.js`, checks like `typeof NDS !== 'undefined'`, `typeof NDS.X !== 'undefined'`, or `NDS && NDS.X` used as preconditions before calling core APIs. The loader guarantees `NDS` and every registered namespace exist before any component's `init()` runs, so these guards are dead code that implies uncertainty the loader contract explicitly denies.<br><br>**Explicitly NOT a finding** (do NOT flag these as JSD-08):<br>- `typeof window !== 'undefined'` — this is a runtime-environment guard protecting against SSR/Node execution, not a loader-contract guard. Whether it's actually dead depends on the project's SSR posture, which is a separate architectural decision outside this rule's scope.<br>- `typeof document !== 'undefined'` — same reasoning.<br>- `NDS.Alert` / `NDS.X` checks in code that runs BEFORE the loader (module top level, or in a bootstrap script) — for those, the loader contract has not yet fired, so the guard is load-bearing.<br><br>Scope is deliberately narrow: only loader-contract-redundant guards inside method/function bodies called after the component's `init()` runs. | LOW | Remove the guard. If the call site truly cannot assume the dependency (e.g., code that runs before the loader or outside the component lifecycle), route it through the loader or defer the call — do not hedge at the call site. |

JSD-05 is the most qualitative rule: require ≥2 distinct files with substantially-overlapping bodies (same shape, same side effects) before flagging, and name the proposed API naturally (`NDS.trapFocus(el)`, not `NDS.helperFn7`).

---

## Phase 4: REPORT

**STOP. Emit the report. Do not edit any files yet.**

Use this structure verbatim:

```
# Code Audit — {target} ({mode})

## Summary
- Files scanned: N
- Findings: X HIGH / Y MEDIUM / Z LOW
- Rule groups hit: JSP, JSD

## HIGH
### _js/nds-alert.js
- L219 [JSP-01] Raw window scroll listener
  Fix: Replace with RAF-throttled handler; store unsubscribe. See _js/nds-scroll-more.js:140-157.

### _js/nds-accordion.js
- L42 [JSD-01] dataset.state assignment clobbers other state tokens
  Fix: Use NDS.State.set/add/clear instead.

## MEDIUM
(same grouping)

## LOW
(same grouping)

## Promotion candidates (JSD-05)
- NDS.trapFocus(el, opts)
  Sites: _js/nds-modal.js:42-88, _js/nds-drawer.js:131-177
  Rationale: both files implement focus containment with near-identical logic; a shared helper would remove ~90 lines of duplication and let future components opt in trivially.

## Gaps observed (no rule matched)
- {file-a}:{line} — {short description of the pattern that looks wrong}. The same shape also appears at {file-b}:{line} and {file-c}:{line}. No existing rule covers it. Proposed: new rule {group}-{next-id} "{short rule name}".
- {file}:{line} — {different gap}. Proposed: {extension of existing rule or brand-new rule}.

## Dead-rule candidates (rule matched but fix did not apply)
- {rule-id} — N matches in {file(s)}, all skipped because {specific reason the recommended fix does not apply in context}. Proposed: {narrow the detection / add an allowlist / delete the rule}.
- {rule-id} — N matches where {different context the rule did not account for}. Proposed: {concrete refinement}.

## Next Step
Reply "fix HIGH", "fix JSP", "fix _js/nds-alert.js", or "fix all" to apply code fixes.
Reply "evolve" to apply the proposed rule-catalog edits to SKILL.md (Phase 7).
Reply "skip" or take no action to end the audit here.
```

The "Gaps observed" and "Dead-rule candidates" sections are omitted when both logs are empty. Each proposal must be concrete: a specific rule ID to add/narrow/remove, with at least one example finding that motivates it. Hand-wavy proposals ("maybe add a rule for ...") do not belong here.

Findings are grouped by severity first (action priority), then by file (navigation), then by line. Rule IDs in brackets enable filter commands like "fix JSP".

If the run surfaces zero findings in a rule group, omit that section rather than printing an empty header.

---

## Phase 5: FIX (optional, user-approved)

Only enter this phase when the user replies with an explicit fix instruction. Recognized forms:

- `fix HIGH` / `fix MEDIUM` / `fix LOW` — by severity
- `fix JSP` / `fix JSD` — by rule group
- `fix <file>` — every finding in one file
- `fix all` — the entire report except Promotion candidates
- `fix JSD-05` is **not** auto-applied. JSD-05 requires adding a utility to `nds-core.js`, which is explicitly out of scope. When the user asks to act on a promotion candidate, confirm the proposed API name and signature, then ask them to add it to `nds-core.js` themselves; the skill will not modify core.

### Before applying (safety checkpoint)

Automated refactors carry regression risk. Before starting the first fix batch, tell the user:

> Recommended: create a git checkpoint now so any fix batch can be reverted cleanly — for example `git add -A && git commit -m "checkpoint before code-audit fixes"`. The skill will NOT run git commands; this is your call.

The skill never runs git itself. The reminder is one sentence, not a lecture. If the user declines or ignores it, proceed — they know their workflow.

### Application order (file-by-file with checkpoints)

Apply fixes **one file at a time**, not one rule group at a time. For each file in the user's batch:

1. Apply every in-scope finding in that file (respecting any severity or rule-group filter the user passed). HIGH within the file before MEDIUM before LOW.
2. Re-run Phase 3 on that file only: confirm every targeted finding is resolved and no new findings appeared.
3. Emit the Phase 6 per-file report: what changed, which rules apply to the regression checklist, build-reminder line.
4. **STOP.** Wait for the user to verify and commit. The user replies `next` (move to the next file), `regression in {file}` (revert and re-examine), or `stop` (end the batch).
5. Only when `next` arrives, proceed to the next file.

This rhythm exists so the user can checkpoint per component, test that component fully in their own environment, and roll back a single file without disturbing anything already committed. Batching across files defeats the rollback grain.

Filters (`fix HIGH`, `fix JSP`, etc.) decide which findings count as in-scope per file; the file-by-file rhythm and the pause between files are the same in every case.

### Out-of-scope modifications

- Do not edit `_js/nds-core.js`.
- Do not run `bundle exec jekyll build` or `bundle exec jekyll serve` unless the user explicitly asks.
- Do not reformat code, adjust whitespace, or rename unrelated identifiers. Keep diffs minimal so the user can verify each change at a glance.

### Auto-rebundle after each file

Run `ruby _plugins/js_processor.rb` automatically at the end of each file fix — the bundler is documented in `CLAUDE.md` as required after any `_js/` change, it regenerates local `.min.js` artifacts only, and without it the user can't test the fix in the browser. Surface any rebundle errors (failed terser minify, missing file, etc.) directly in the per-file summary; do not silently swallow them. If the bundler fails, do NOT proceed to the next file — stop and let the user see the failure. Rebundle is a per-file operation to match the file-by-file fix rhythm; running it once at end-of-batch would force the user to wait through the whole batch before they can test anything.

---

## Phase 6: VERIFY

After every file's fixes land, confirm the following on that file before emitting the per-file summary:

- Phase 3 re-runs clean: every targeted finding is gone and no new findings appeared.
- Structural invariants hold: every new `NDS.on*` call stores its unsubscribe handle where teardown can reach it, and the loader registration still works.
- Identifier sanity: any fix that INJECTS new setup code (`new AbortController()`, new variable declarations, observer scaffolding) must use identifiers that actually exist in the enclosing scope. A typo like `selectElement._ac` instead of `selectInput._ac` throws at runtime, and because the throw happens before the listener attachments that follow, NO listeners attach — the component appears to work (earlier code still ran) but half its interactions silently stop responding. After inserting such a block, mentally (or via grep) verify every identifier against the function's parameter list and the closest enclosing `const`/`let`/`var` declarations.
- Rebundle: run `ruby _plugins/js_processor.rb` automatically. Surface its output (bundle sizes or errors) in the per-file summary. If rebundle fails, stop the batch — do not proceed to the next file.

### Behavior regression verification (per rule)

Re-running the rule catalog proves the offending pattern is gone. It does NOT prove the component still works. NDS has no JS unit-test suite, so behavior verification is a human step. The skill's job is to tell the user exactly *what to look for* — not where to look. Many NDS components (UI-shell pieces like `header`, `footer`, `mainnav`, theme, font-loading, etc.) have no dedicated demo page, and the user knows their own environment better than any mapping the skill could hardcode. Don't prescribe URLs or file paths for verification; the user picks the surface.

For every rule ID that fired in the current file, emit the matching checklist row below.

| Rule | Regression risk | What to verify in the browser |
|---|---|---|
| JSP-01 (pooled resize) | Low — `NDS.onResize` is a transparent wrapper over window resize | Resize the window across breakpoints; the component must still adapt (layout mode switches, recomputed widths, etc.). |
| JSP-02 (RAF scroll throttle) | Low — RAF wrapping is idempotent when the handler is pure | Scroll fast with keyboard and wheel; confirm sticky/reveal behavior still triggers at the right scroll position with no visible lag or missed frames. |
| JSP-03 (NDS.onIntersect) | Low-Medium — pool groups by threshold/rootMargin; behavior is identical for same config | Scroll the element into and out of the viewport at different speeds; the intersection-driven action (counter animation, lazy-reveal, etc.) fires once and does not re-trigger on minor movements. |
| JSP-04 (NDS.onElementResize) | Low-Medium — pooled ResizeObserver fires on same events | Resize the host container (drag splitter, toggle sidebar, rotate device emulator); layout recalculates consistently. |
| JSP-05 (NDS.onDOMAdd/Remove/AttrChange) | **Medium-High** — MutationObserver semantics differ subtly when selector-scoped; fire timing may change | Dynamically add/remove/mutate the observed selector in devtools or via component API (add row to table, inject option into select, toggle attribute); the handler must fire exactly as before. Test edge cases: bulk insertions, removal during iteration. |
| JSP-06 (stored unsubscribe / AbortController) | **Medium** — this rule's fixes INJECT new setup code (`new AbortController()`, per-element guards, etc.) BEFORE the existing `addEventListener` loop. A typo in the injected setup (wrong identifier, wrong property name) throws at runtime and silently detaches nothing — but all subsequent `addEventListener` calls in that function are skipped, and the component's click/keyboard handlers never bind. Symptom: the component opens/closes normally (earlier listeners still work) but keyboard navigation or click-handled actions stop responding. | Two-part check. **(1) Functional smoke test**: exercise at least one primary interaction that flows through the loop — click one of the listener-attached elements AND press one key the handler listens for. If either silently does nothing, open devtools console and look for a `ReferenceError`/`TypeError` thrown during init. **(2) Leak test**: open and close/destroy the component repeatedly (open-close a modal 20x, navigate away and back); no listener leaks (check devtools Memory or listener count in Event Listeners panel). Part 1 catches silent-throw regressions in the injected setup; Part 2 catches the original pooling/teardown bug. |
| JSP-07 (NDS.debounce) | Low — exact delay preserved | Trigger the debounced event rapidly (type fast in a search field, resize rapidly); final callback fires once after the debounce window. |
| JSD-01 (NDS.State) | **Medium** — `dataset.state = 'open'` clobbers other tokens; `NDS.State.add('open')` merges with existing tokens. Wrong helper silently breaks multi-state components | Exercise every state transition on the demo page (default → hover → pressed → disabled, open → closed → focused, etc.). Confirm the `data-state` attribute holds the right token set at each step (inspect in devtools). Keyboard and pointer paths both. |
| JSD-02 (NDS.Status) | Low — single-value attribute, helper is a direct replacement | Trigger the status-changing action (copy button, form submit); status pill/indicator appears and clears on the expected timeline. |
| JSD-03 (NDS.breakpoints) | Low — pixel values match the tokens | Resize across all breakpoints (mobile / tablet / desktop / large-desktop); responsive behavior switches at the same viewport widths. |
| JSD-04 (NDS.isRTL / NDS.lang) | **Medium** — live getter vs cached read. If a component cached the value and relied on cache, switching to `NDS.isRTL` makes it reactive, which may be the intent or an unintended change | Toggle the direction switcher on a page that uses the component; confirm layout flips cleanly and does not leak into other direction-unrelated features. |
| JSD-05 (promotion candidate) | N/A — skill does not auto-apply | Promotion is manual; once the user promotes to `nds-core.js`, audit the call sites with a follow-up `/code-audit js`. |
| JSD-06 (batch reads-before-writes) | Low — refactor preserves behavior when done correctly, but easy to get wrong | Component's animated transitions and measurements must still be visually correct: height animations expand to the right size, position calculations land in the right place. Compare before/after with reduced-motion on and off. |
| JSD-07 (component contract) | **Medium** — refactoring the public shape can break doc-page JS tabs and consumer integrations | Open the component's doc page and exercise every snippet in the "JS API" tab. Confirm `NDS.{Name}.init()`, `.reinit()`, `.create(el)` all work as documented. |
| JSD-08 (dead defensive guards) | Low — removing `typeof NDS !== 'undefined'` hedges only prunes dead code since the loader guarantees NDS exists. Risk is a missed case where the component actually runs before the loader (module top-level code). | Confirm the guard you removed was inside a method or function invoked after init — not at module top level. Then load any page using the component; no ReferenceError should appear in devtools console. |

Include only rows for rules that fired in this fix batch. Do not dump the whole table every time — that trains the user to skip it.

### Per-file closing summary

After each file's fixes are applied and the catalog is re-run, emit this and STOP:

```
## {file} — applied {N} fixes
- Findings resolved: {list rule IDs with line numbers}
- Findings remaining in this file: {M} (list rule IDs, or "none")
- Regressions introduced: 0 (or list them)
- Rebundle: ran `ruby _plugins/js_processor.rb` — {bundle size line from output}

## Behavior checks for this file
Rules fixed: {JSP-02, JSD-01}
Verify in your environment (however you normally exercise this component — doc page, playground, real page consumers, devtools):
- JSP-02: {copy the "What to verify in the browser" cell for JSP-02 from the catalog above}
- JSD-01: {copy the "What to verify in the browser" cell for JSD-01}

Reply:
- `next` — move on to the next file in the batch
- `regression in {file}` with what broke — pause, revert with git, and re-examine
- `stop` — end the batch here (remaining files keep their existing findings)
```

Do NOT chain into the next file automatically. The pause is the whole point of the file-by-file rhythm — it is the user's checkpoint-and-commit window. If the user reports a regression, do not try to patch around the broken fix. Ask them to revert the file using whichever workflow they use (their IDE's local-history or undo stack, not `git checkout`/`git restore` — their editor version can differ from HEAD), then re-examine the finding together before retrying.

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

---

## Phase 7: EVOLVE (optional, user-approved)

Enter this phase only when the user replies `evolve` or `update rules`. It turns the "Gaps observed" and "Dead-rule candidates" sections from Phase 4 into concrete edits to this SKILL.md.

### What an evolution proposal looks like

For each proposed edit, present the exact change before applying:

```
Proposal 1 of N: ADD rule
  Group: JSP
  ID: JSP-08 (next free ID in group)
  Severity: MEDIUM
  Detect: IntersectionObserver created with `root: null` via a locally-pooled helper — duplicates NDS.onIntersect's viewport pool
  Fix: Route through NDS.onIntersect with matching threshold/rootMargin
  Motivating finding: _js/nds-foo.js:88 and _js/nds-bar.js:142 both wrap viewport IntersectionObservers in a local helper
```

```
Proposal 2 of N: NARROW rule
  ID: JSD-08
  Change: Exempt methods that run at module top level (before the loader lifecycle fires)
  Reason: 5 consecutive skips in _js/nds-foo.js — the guards protect bootstrap code that genuinely runs before nds-loader.js. Keeping the rule as-is trains the skill to ignore JSD-08 wholesale.
```

```
Proposal 3 of N: DELETE rule
  ID: (example) JSD-06
  Reason: Zero true-positive matches across the last 5 audits; read-after-write pattern is already caught by browser devtools performance panel and does not warrant its own rule.
```

### Application

For each proposal the user accepts, edit this file (`c:\Projects\NDS-dev\.claude\skills\code-audit\SKILL.md`) — and only this file — to apply the change:

- **ADD**: insert the new rule in the correct rule-group table, keeping IDs sequential.
- **NARROW / REFINE**: edit the "What to detect" column, not the rule's identity. Do not change its ID.
- **DELETE**: remove the row and renumber the remaining rules in the group. If JSD-06 is deleted, JSD-07 becomes JSD-06 across the file (update the Phase 4 example references accordingly).
- **SEVERITY CHANGE**: update the Severity column only; do not touch detection or fix text.

After applying, summarize the diff in one block:

```
## SKILL.md updated
- Added: JSP-08 "viewport IntersectionObserver duplication" (MEDIUM)
- Narrowed: JSD-08 now exempts module-top-level bootstrap
- No deletions this round
Next audit run will use the updated rules.
```

### Guardrails

- Never apply an evolution proposal without the user's explicit approval on that specific proposal. Batch approval ("apply all") is fine; silent self-edits are not.
- Never edit other files during Phase 7. Phase 5 handles source-code fixes; Phase 7 handles the rule catalog only.
- If a proposed evolution would conflict with the conventions in `CLAUDE.md` (e.g., "weaken JSP-01 to allow raw window resize listeners"), reject the proposal and explain why. `CLAUDE.md` is upstream of this skill.
- Keep the same structure: frontmatter, mindset, phases, rule tables, report format, non-goals. Don't invent new top-level sections during an evolution.

---

## Non-goals

This skill deliberately does not cover:

- SCSS audits. SCSS coverage was removed because refactor blast radius (specificity, nesting, state/variant cascade) and token-family gaps made automated fixes too risky. Refactor SCSS manually against the conventions in `CLAUDE.md`.
- Documentation page audits — use `doc-page`.
- Icon, placeholder-text, or sidemenu coverage — use `content-review`.
- `_data/content/` YAML demo data — use `demo-content`.
- UX copy, hero descriptions, or visual design review.
- Replacing eslint. No lint config is authored; the rules are NDS-specific conventions enforced through an agent loop.
- Modifying `_js/nds-core.js` — it defines the convention; JSD-05 surfaces candidates but never edits core.
- Running Jekyll unless the user explicitly asks. `ruby _plugins/js_processor.rb` IS run automatically per-file as part of Phase 5/6.
- Self-editing any file other than this `SKILL.md`. Phase 7 may revise the rule catalog in this file after explicit user approval on each proposal, and nothing else.
