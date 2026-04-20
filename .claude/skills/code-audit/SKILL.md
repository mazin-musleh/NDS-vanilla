---
name: code-audit
description: Audit NDS source JS for DRY/KISS violations, scalability and maintainability risks, performance issues, client-side security risks, and cross-file pattern consistency. Covers listener/observer pooling via nds-core.js (NDS.onResize, NDS.onIntersect, NDS.onElementResize, NDS.onDOMAdd, NDS.onAttrChange, NDS.debounce), throttling of scroll/resize handlers, NDS.State and NDS.Status reuse, NDS.breakpoints reuse, cross-file detection of repeated helper functions that should be promoted to nds-core.js, component contract conformance (factory vs singleton shape via NDS.{Name}.init/reinit/create), dead defensive guards inside loader-registered components, and common web-security sinks (innerHTML XSS, eval/new Function, target="_blank" tabnabbing, postMessage origin checks, untrusted URLs). Use this skill for "audit the JS", "audit performance", "audit security", "optimize listeners", "check nds-core usage", "find functions that should live in core", "find unthrottled scroll handlers", "find XSS risks", "make all components follow the same pattern", "check component consistency", or any JS source-code quality pass on `_js/`. NOT for SCSS/CSS audits, documentation page audits (use doc-page), content/icon/sidemenu audits (use content-review), or UX copy review.
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
| `js` or empty | All `_js/nds-*.js` except `nds-core.js`, `nds-loader.js`, `nds-showcase.js` | JSP + JSD + JSS |
| `<filename>` or `<relative/path>` | Single JS file under `_js/` | JSP + JSD + JSS |

**SCSS is not supported.** If the user passes `scss`, `all`, or any path ending in `.scss`, stop and reply: *"SCSS audit coverage was removed from this skill. Refactor SCSS manually — see `CLAUDE.md` for token, RTL, and scaffold conventions."* Do not run partial rules on an SCSS file.

**Strict scope constraint.** Only JSP, JSD, and JSS rules run. No SCSS-scoped rule groups exist in this catalog.

### Rule-group filter (optional second argument)

If `$2` is present, restrict the run to a subset of rule groups:

| `$2` | Rule groups included |
|---|---|
| `performance` | JSP |
| `dry` | JSD |
| `security` | JSS |

Without `$2`, JSP + JSD + JSS all run.

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

- **`_js/nds-core.js`** — the full shared-utility surface. Re-read every run so the rule catalog reflects the current `NDS.*` API (names, arities, return values). Rules JSP-01 through JSP-08, JSD-01 through JSD-04, and JSS fixes that cite helpers (e.g., `NDS.escapeHtml` if/when promoted) all reference specific functions here; if core gains a utility, the skill's recommendation should route to it instead of flagging the pattern as unresolved.
- **At least one JS good-pattern exemplar** — `_js/nds-scroll-more.js` for RAF-throttled scroll + pooled ResizeObserver, `_js/nds-drawer.js` for NDS.State destructuring + reads-before-writes, `_js/nds-modal.js` for NDS.State and backdrop API usage. Recommendations cite these with `file:line` so the user can copy a working pattern rather than invent one.

### MUST read every target file

Read each target file top-to-bottom before running the catalog. Pattern-matching alone misses context (a `setTimeout` inside a `NDS.debounce` callback is not a JSP-07 violation). A full read is what separates this skill from a grep script.

---

## Phase 3: ANALYZE

Run the rule catalog file-by-file. Each match is recorded as: file, line, rule ID, offending snippet (≤120 characters), suggested fix pointing to the exact `NDS.*` call. Dedupe findings whose line ranges overlap so the same handler is not triple-flagged.

### Track observations for Phase 7

While analyzing, keep a parallel log of two meta-observations so Phase 7 has data to propose catalog edits from:

- **GAP**: a pattern in the current file that looks like a real violation (duplicated across files, obviously inefficient, breaks a CLAUDE.md convention, or opens a web-security sink) but does not match any existing rule ID. Record: file, line, snippet, one-sentence description of what looks wrong, and the rule group it would belong to (JSP, JSD, or JSS) if it existed.
- **SKIP**: a rule match that had to be discarded because the recommended fix does not apply in context. Record: rule ID, file, line, why the fix failed (e.g., "JSP-02 matched but the handler is already RAF-batched via an imported helper"). One-line rationale per skip — do not silently drop.

These logs are additive across the run and feed into the "Gaps observed" and "Dead-rule candidates" sections of the report.

### Rule catalog

Severity drives the order in which fixes are applied during Phase 5: HIGH (correctness and performance first), then MEDIUM, then LOW.

#### JS Performance (JSP)

| ID | What to detect | Severity | Fix |
|---|---|---|---|
| JSP-01 | `addEventListener(['"']resize['"']` on `window` | HIGH | Replace with `NDS.onResize(handler)` — it already debounces at 150ms and pools subscribers. |
| JSP-02 | `addEventListener(['"']scroll['"']` where the handler body does NOT contain any of `requestAnimationFrame(`, `NDS.debounce(`, `NDS.rafThrottle(`, `NDS.onResize(` within ~10 lines of the handler's opening brace. Custom `throttle()` wrappers do not count as throttled unless they themselves use one of these primitives — trace into the wrapper to confirm.<br><br>**Explicitly NOT throttled** (these are findings, not passes):<br>- bare `setTimeout` inside the handler, even with a `clearTimeout`+rebind debounce shape — for scroll, that's JSP-07's job, not "throttled" for JSP-02.<br>- a custom `throttle()` / `rafThrottle()` wrapper whose implementation uses bare `setTimeout` instead of `requestAnimationFrame`.<br>- a handler-body early-return guard on scroll position (e.g., `if (window.scrollY < 200) return;`) — that's a threshold, not a rate limit; the handler still fires on every scroll event above the threshold.<br>- `requestIdleCallback` — it does not help scroll responsiveness and is not on the approved list.<br>- the `passive: true` flag on the listener — that improves scrolling smoothness but does not throttle the handler.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Scroll handlers that remove their own listener as part of their work — detectable by a `removeEventListener` reference in the handler body, or in any function the handler calls within ~20 lines of traced call tree. These are single-shot dismiss handlers (e.g., close-on-external-scroll), not hot loops. RAF-throttling adds dismissal latency with no throughput benefit.<br><br>If none of the approved primitives are present in the handler (tracing wrappers where needed), emit the finding. Do not rationalize. | HIGH | Wrap in RAF throttle using `NDS.rafThrottle(fn)`. Copy the pattern from `_js/nds-scroll-more.js:143`. |
| JSP-03 | `new IntersectionObserver`. **Not exempt**: singleton usage, single-element observation, proper `disconnect()`/`unobserve()` disposal, or manual pooling do NOT make this compliant. The rule is about routing through the shared `NDS.onIntersect` pool so observers are grouped by threshold/rootMargin across the whole app — not about leak prevention. A well-disposed bare `new IntersectionObserver` is still a finding. | MEDIUM | Replace with `NDS.onIntersect(el, handler, { threshold, rootMargin })`. Core pools observers by threshold/rootMargin automatically. Store the returned unsubscribe handle. |
| JSP-04 | `new ResizeObserver`. **Not exempt**: singleton usage, single-element observation, or local `disconnect()` do NOT make this compliant. The rule routes through the shared `NDS.onElementResize` pool; a local pool replicating the same logic is a duplication, not a pass. | MEDIUM | Replace with `NDS.onElementResize(el, handler)`. Returns an unsubscribe function; store it for teardown. |
| JSP-05 | `new MutationObserver`.<br><br>**Not exempt**: observing a single element, attaching once at setup, or `observer.disconnect()` on teardown do NOT make this compliant. One MutationObserver per component scales linearly with component count; the NDS pool keeps one observer per configuration and dispatches by selector.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- MutationObserver instances preceded (within 3 lines above the `new MutationObserver` line) by an inline comment that explicitly rationalizes why the shared `NDS.onDOMAdd` / `NDS.onDOMRemove` / `NDS.onAttrChange` pool does not cover the use case — e.g., content-mutation semantics (`characterData`, text-node observation), cross-frame observation, or other mutation types not in the pool's API.<br>- A bare "// MutationObserver" or unrelated contextual comment does NOT count — the comment must reference the pool's limitation and explain why the local observer is necessary. This is an escape hatch for cases the pool genuinely doesn't cover; it is not an opt-out for "I didn't bother". | MEDIUM | Replace with `NDS.onDOMAdd(selector, handler)`, `NDS.onDOMRemove(selector, handler)`, or `NDS.onAttrChange(selector, attrs, handler)` depending on mutation type. |
| JSP-06 | `addEventListener` without a matching `removeEventListener` or a stored unsubscribe returned by `NDS.on*`. **(a) Loop pattern**: when a component attaches listeners per-element inside `forEach`/`map`/`for` with `addEventListener` inside, and the loop has no `AbortController` or stored-handle bookkeeping, flag the whole loop as a single finding with the listener count (not one finding per line). **(b) Dynamic re-attach pattern**: when that loop sits inside a function called from event handlers, re-init paths, or other re-entrant contexts AND the function does NOT detach prior listeners before re-attaching, flag it as a dynamic re-attach leak — listeners stack on every invocation, scaling memory and CPU with usage rather than leaking just once. **(c) Per-instance document/window listener**: a single `document.addEventListener(...)` or `window.addEventListener(...)` inside a constructor, an `init()`/`setup*()` method called from the constructor, or any method invoked once per instance, where the handler is NOT wrapped with `{ signal }` from an AbortController AND no stored reference enables a later `removeEventListener`. This scales O(n) with component count just like the loop pattern — N swipers install N document keydown handlers — and leaks per reinit because `destroy()` has no handle to remove.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- forEach/for loops whose parent container is cleared via `innerHTML = ''` or `replaceChildren()` earlier in the same function chain before the loop runs. Removed DOM takes its listeners with it — no leak possible regardless of re-invocation frequency. Typical pattern: `container.innerHTML = '';` followed by a render loop that `appendChild`s fresh elements with click handlers. The container-reset is the atomic teardown.<br>- Sub-shape (c) when the attachment sits inside a module-level IIFE / singleton-bootstrap block guarded by a `window.ndsXxxInitialized` flag or equivalent one-shot latch (see `_js/nds-tables.js:578, 591` for the pattern). Those are genuinely one-per-page listeners, not one-per-instance, and the init guard prevents stacking. | MEDIUM | Sub-shapes (a) and (b): store the unsubscribe handle on the instance (e.g., `wrapper._offResize = NDS.onResize(...)`) or attach an `AbortController.signal` to every listener in the loop so `.abort()` cleans them up atomically. For the dynamic re-attach case, abort the previous controller at the top of the function before creating a new one, or use delegated listeners on a stable parent so no per-call re-attachment is needed. Sub-shape (c): add `this._ac = new AbortController()` to the constructor, pass `{ signal: this._ac.signal }` to the document/window listener, and call `this._ac.abort()` in `destroy()`. See `_js/nds-tabs.js:42, 127, 320` for the pattern. |
| JSP-07 | Inline `setTimeout` / `clearTimeout` debounce patterns | LOW | Use `NDS.debounce(fn, ms)`. |
| JSP-08 | **MutationObserver without disconnect on lifecycle boundary.** A local `new MutationObserver(...)` bound to a specific element (per-element lifecycle, not `document.body` / `document.documentElement`) where EITHER (a) the owning component has a `cleanup()` / `destroy()` / `reinit()` / `teardown()` path that does NOT invoke `.disconnect()` on the observer, OR (b) the component has no teardown path at all — so the observer's lifetime is effectively unbounded despite its element binding. Complements JSP-05: JSP-05 covers pool-routing (is a local observer justified at all?); JSP-08 covers teardown hygiene (once local, is it cleaned up?).<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Observers stored in an instance array (e.g., `this.observers.push(observer)`) AND disconnected in the teardown path via a loop over that array.<br>- Observers on `document.body` or `document.documentElement` that are intentionally process-lifetime (singleton bootstrap in core or a root-level utility) — not tied to an element that can be re-rendered.<br>- Observers whose JSP-05 exemption comment additionally states that the observer must outlive the element (rare; require explicit rationale, not just absence of disconnect). | MEDIUM | Store the observer handle on the instance (e.g., `this.observers.push(observer)`) and invoke `.disconnect()` in the teardown path. If the owning component lacks a teardown path but creates observers per element, either add the teardown path or re-evaluate whether the observer should be pool-routed via `NDS.onAttrChange` / `NDS.onDOMAdd` / `NDS.onDOMRemove`. |

#### JS DRY/KISS (JSD)

| ID | What to detect | Severity | Fix |
|---|---|---|---|
| JSD-01 | `setAttribute('data-state'`, `getAttribute('data-state')`, or assignment to `dataset.state` | HIGH | Use `NDS.State.add/remove/has/get/set/clear/apply`. The helpers handle space-separated values correctly. |
| JSD-02 | Same pattern on `data-status` | HIGH | Use `NDS.Status.set/get/clear`. Status is a single value, not a set. |
| JSD-03 | Hardcoded layout pixels bypassing the token layer, in two sub-shapes: **(a) viewport comparisons** — any integer literal in `[400, 2000]` compared (`<`, `<=`, `>`, `>=`, `===`, `!==`) against `window.innerWidth`, `document.documentElement.clientWidth`, or `document.body.clientWidth`. The range captures the realistic viewport-breakpoint space while excluding unrelated small/large magic numbers (counts, sizes, timeouts). Off-by-one literals like `958` (near-desktop) or `1439` (near-large-desktop) are the main reason for widening beyond the canonical 768/1024/1280/1440 list; **(b) fallback literals** — the canonical breakpoint values (768/1024/1280/1440) used as the right-hand side of `\|\|` after `getComputedStyle().getPropertyValue(...)` parses a CSS variable (e.g., `parseInt(styles.getPropertyValue('--nds-...')) \|\| 1280`). Both shapes hardcode the token into JS; (b) also hides a missing-CSS-var bug when the fallback silently takes over.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Numeric literals on the right-hand side of a module-scope `const` declaration whose identifier is SCREAMING_SNAKE_CASE (e.g., `CONTENT_MAX_WIDTH_FALLBACK`, `SLIDES_MAX_WIDTH`) AND which has a rationale comment within 3 lines above explaining why JS needs the numeric value. This IS the fix for sub-shape (b); re-flagging it on every audit run is noise. The detection fires on raw literals in comparisons or fallback positions, not on named-constant declarations that encode the token-layer shim.<br>- Integer comparisons against viewport width where the literal is OUTSIDE `[400, 2000]` — those are genuinely not breakpoint logic (thresholds for tiny embed widths, very-wide ultra-monitor layouts, etc.) and should be judged case-by-case rather than swept up by this rule. | MEDIUM | Viewport comparisons → use `window.matchMedia(NDS.breakpoints.mobile/tablet/desktop/'large-desktop').matches`. If the specific pixel threshold isn't in `NDS.breakpoints`, either add it to core or align the component to the closest existing token (e.g., `958` → `'desktop'` at 960px). Fallback literals → ensure the CSS variable is always defined in base styles so the fallback never fires, or extract the literal to a SCREAMING_SNAKE_CASE module-scope constant with a rationale comment explaining why JS needs the value. |
| JSD-04 | Re-implemented locale/direction check that duplicates `NDS.lang` / `NDS.isRTL` / `NDS.isArabic`. Two sub-shapes:<br><br>**(a) Direction/RTL checks:** `document.dir`, `document.documentElement.dir === 'rtl'`, `getAttribute('dir')` on `document.documentElement` or `document.body`, or equivalent reads of the `dir` attribute to derive RTL-ness.<br><br>**(b) Language checks:** `document.documentElement.lang`, `document.lang`, `document.documentElement.getAttribute('lang')`, or derivations that lowercase / prefix-split / compare-against-`'ar'` those values to produce a lang code (e.g., `(document.documentElement.lang \|\| 'en').split('-')[0].toLowerCase()`, `document.documentElement.lang.startsWith('ar')`).<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- `NDS.lang` / `NDS.isRTL` / `NDS.isArabic` definitions inside `nds-core.js` — that's the source of truth, not a duplicate.<br>- Per-element `lang` reads: `el.getAttribute('lang')` / `el.lang` where `el` is NOT `document.documentElement` / `document.body`. Component code may legitimately read per-element language overrides (e.g., a widget switching mid-page); that's not a duplication of the document-level `NDS.lang`. | MEDIUM | Use `NDS.isRTL` (live getter) or `NDS.lang` / `NDS.isArabic`. |
| JSD-05 | **Promotion candidate.** A helper function with near-identical signature and body appears in two or more component files and has no equivalent in `nds-core.js`. | MEDIUM | Propose an `NDS.*` API name and list every call site. Typical candidates: focus-trap, scroll-lock, `getComputedStyle` readers, `matches()` / `closest()` helpers, RAF batchers, event-delegation factories, z-index stackers, `aria-expanded` toggles. Do NOT edit `nds-core.js` — surface the candidate and let the user decide. |
| JSD-06 | DOM read after write in the same frame (e.g., `setProperty` then `getBoundingClientRect` in a loop).<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Standalone forced-reflow triggers (`void el.offsetHeight;` or `el.offsetHeight;` as the sole statement on its line) are deliberate transition-start patterns, not thrashing.<br>- Staged-measurement patterns: a write to `style.cssText` / `style.visibility` / `style.position` that puts an element into a measurable off-screen state, followed by `offsetHeight` / `offsetWidth` / `getBoundingClientRect()` reads. The read semantically depends on the write (the element must be staged before it can be measured), so "batch reads before writes" does not apply. Require an inline comment near the write confirming the staging intent to earn this exemption — otherwise it's indistinguishable from a thrash loop.<br><br>Thrashing is a LOOP pattern (N writes × N reads within one synchronous block). One-shot write-then-read sequences are not thrashing. | LOW | Batch reads before writes. See the pattern in `_js/nds-drawer.js:77-99`. |
| JSD-07 | **Component contract conformance.** A `_js/nds-{name}.js` file whose public surface does not match one of the two shapes the loader expects. Factory components must expose `NDS.{Name}.init()`, `NDS.{Name}.reinit()`, and `NDS.{Name}.create(el)`. Singletons must expose `NDS.{Name}.init()` plus their component-specific methods. The namespace `{Name}` must be the PascalCase form of the filename suffix. | MEDIUM | Restructure the module to match the shape of the closest peer (factory example: `_js/nds-modal.js`; singleton example: `_js/nds-theme.js`). Inconsistent shapes force every reader to relearn the API per component and block the loader from treating components uniformly. |
| JSD-08 | **Dead defensive guards.** Inside a component registered with `nds-loader.js`, checks like `typeof NDS !== 'undefined'`, `typeof NDS.X !== 'undefined'`, `NDS && NDS.X`, OR the `window.`-prefixed variants (`window.NDS && window.NDS.X`, `window.NDS && NDS.X`, any mix) used as preconditions before calling core APIs. Detection covers both bare-`NDS` and `window.NDS` forms — earlier drafts of this rule only caught the bare form and missed fully-prefixed guards that appear in defensive consumer-style code. The loader guarantees `NDS` and every registered namespace exist before any component's `init()` runs, so these guards are dead code that implies uncertainty the loader contract explicitly denies. Multi-part guards where ONLY the final method-existence check is load-bearing (e.g., `NDS && NDS.Forms && NDS.Forms.validateForm`) collapse to just the final call when the API is unconditionally assigned — verify by grepping `NDS.{Namespace} = {` in the owner module to see if the method lives inside an always-present object literal.<br><br>**Explicitly NOT a finding** (do NOT flag these as JSD-08):<br>- `typeof window !== 'undefined'` — this is a runtime-environment guard protecting against SSR/Node execution, not a loader-contract guard. Whether it's actually dead depends on the project's SSR posture, which is a separate architectural decision outside this rule's scope.<br>- `typeof document !== 'undefined'` — same reasoning.<br>- `NDS.Alert` / `NDS.X` checks in code that runs BEFORE the loader (module top level, or in a bootstrap script) — for those, the loader contract has not yet fired, so the guard is load-bearing.<br><br>Scope is deliberately narrow: only loader-contract-redundant guards inside method/function bodies called after the component's `init()` runs. | LOW | Remove the guard. If the call site truly cannot assume the dependency (e.g., code that runs before the loader or outside the component lifecycle), route it through the loader or defer the call — do not hedge at the call site. |
| JSD-09 | **Teardown references handler names never stored.** Inside any teardown path (function named `cleanup` / `destroy` / `teardown`, or any function containing `removeEventListener(..., this.handlers[name])` — either in a loop over named keys OR as straight-line `removeEventListener` calls referencing `this.handlers.{name}` directly), every handler key referenced must have a matching assignment `this.handlers.{name} = ...` somewhere else in the same file. A teardown that dereferences `this.handlers.foo` when `foo` was never stored is dead-code-pretending-to-clean-up: the `removeEventListener` call receives `undefined` and silently does nothing. Current behavior is a noop; the real risk is that a future refactor re-invokes the binder after teardown, and listeners stack because the removal path never worked.<br><br>Detection: for each `this.handlers.{name}` or `this.handlers[name]` reference inside a teardown path, grep the file for `this.handlers.{name} =` or `this.handlers[{name-literal}] =`. If no assignment exists, emit the finding with both the teardown line and the binder-that-should-have-stored-it (nearest `addEventListener` call on the same element).<br><br>**Explicitly NOT a finding**: teardown keys assigned via destructuring (`const { foo } = this.handlers`) or assigned in a branch the detector can't statically see (e.g., conditionally stored inside a framework callback). When in doubt, confirm the binder's shape first — don't emit a false positive on dynamic code. | LOW | Mirror the correct binder in the same file (e.g., `bindNavigationEvents` in `_js/nds-date-picker.js` uses `this.handlers.prevBtn = function...; element.addEventListener('click', this.handlers.prevBtn);`) so the teardown loop actually finds a stored function to remove. Alternatively, delete the teardown entry if the listener's lifetime is managed differently (AbortController, innerHTML reset, component destruction). |
| JSD-10 | **File-local helper shadows an existing `NDS.*` utility.** The natural counterpart to JSD-05: JSD-05 watches for *promotion* candidates (duplicates across ≥2 component files with no equivalent in core); JSD-10 watches for *demotion* candidates (a single component file defines a helper that core already exposes). Once a helper is promoted to core, every file-local copy becomes dead duplication — each one is a correctness hazard because future bug fixes to the core implementation won't propagate to the shadowed version.<br><br>Detection: for any `function name(...)` or class-method `name(...)` declared inside a component file (NOT at module top level of core), whitespace-normalize its body and compare against the body of `NDS.<name>` (read from `_js/nds-core.js`). Fire the finding when EITHER (1) OR (2) holds:<br><br>**(1) Overlap path** — ≥65% token overlap AND comparable argument shapes. The lowered threshold (was 90% in the first draft of this rule) catches unhardened variants of a core helper: a local copy that lacks the null guard, the `String(...)` coerce, or other hardening lines core adds. Those hardening lines are typically the first 25–35% of core's body, so a strict 90% gate rejected exactly the cleanup targets the rule existed for.<br><br>**(2) Canonical-idiom path** — both bodies match the same canonical DOM idiom AND the signatures are comparable (same argument count, same return type). This path catches divergent implementations of the same pattern — e.g., one file uses `.textContent = x`, another uses `.appendChild(document.createTextNode(x))`, both produce identical output for string inputs but share <50% token overlap. Canonical idioms currently recognized:<br>- **HTML escape**: `createElement(tag)` → text-safe content assignment (`.textContent = x` OR `.appendChild(document.createTextNode(x))`) → read `.innerHTML`<br>- **Clamp**: `Math.min(Math.max(v, lo), hi)` (any argument order)<br>- **Debounce/throttle**: a stored timer/flag + `setTimeout`/`requestAnimationFrame` + inner function call<br><br>Canonical-idiom recognition can be extended as audit runs reveal new duplicate-with-divergent-syntax patterns (record as a gap observation when a pattern recurs in 3+ files).<br><br>Record both locations (component helper + core helper) in the finding so the user can verify the overlap visually before deleting.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Helpers with the same name as a core utility but meaningfully different behavior — e.g., a component `escapeHtml` that strips tags rather than encoding them, or one that additionally trims whitespace. Name collision alone is not grounds for a finding; body equivalence is the gate.<br>- Helpers where core's version has a different arity or return type (e.g., core returns a Promise, component version is synchronous). Swapping would break callers — surface it as a gap, not a finding.<br>- Intentional forks of a core helper that a comment within 3 lines above explicitly justifies (e.g., `// Local copy with IE11 workaround; core version assumes modern API`). The annotation-exemption pattern mirrors JSS-01 / JSP-05.<br><br>JSD-10 fires at LOW severity because file-local duplicates are not dangerous on their own — they're cruft that grows confusing over time as core evolves and the forks diverge silently. | LOW | Delete the file-local helper definition. Rewrite every call site in the same file from `helperName(...)` / `this.helperName(...)` to `NDS.<helperName>(...)`. See `_js/nds-core.js` for the authoritative definition. If callers relied on a different method shape (e.g., instance-bound `this.helperName`), replace with the core call at the site and let the instance reference fall out of scope. |

JSD-05 is the most qualitative rule: require ≥2 distinct files with substantially-overlapping bodies (same shape, same side effects) before flagging, and name the proposed API naturally (`NDS.trapFocus(el)`, not `NDS.helperFn7`).

#### JS Security (JSS)

Web-security sinks that commonly appear in vanilla-JS component code. Severity is calibrated to exploitability in a Jekyll static-site context: a reflected XSS through an NDS component is HIGH because the component ships everywhere; a same-origin `window.open` with a developer-controlled `data-*` attribute is MEDIUM. Each JSS finding must name the untrusted-input source in plain language — "this `${title}` comes from `NDSAlert.create()` options, which callers can fill with arbitrary strings" — so the fix cost is visible alongside the risk.

| ID | What to detect | Severity | Fix |
|---|---|---|---|
| JSS-01 | Direct HTML-sink assignment where the right-hand side is a template literal or `+` concatenation containing at least one non-literal substitution: `el.innerHTML = X`, `el.outerHTML = X`, or `el.insertAdjacentHTML(pos, X)`. Classic XSS: any caller passing user-controlled text gets script execution for free. Focus on sinks that interpolate caller-supplied arguments (component-options objects, `dataset` reads, API response fields, `getAttribute` values), not sinks where every substitution is compile-time-known.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Template literals where every `${}` substitution matches the numeric/boolean allowlist. A substitution is numeric/boolean when — and only when — its expression is one of: (a) an identifier from a visible `for`-loop counter (`i`, `j`, `k`, `n`, `index`, `idx`, or the loop's explicitly-declared counter name); (b) a call expression of shape `parseInt(...)`, `parseFloat(...)`, `Number(...)`, `Math.<anyMethod>(...)`, OR a method call `.toString()` / `.padStart(n, '0')` / `.padEnd(n, '0')` / `.toFixed(n)` / `.toLocaleString(...)` on a receiver that is itself numeric-by-allowlist — these methods only return string representations of digits (optionally with decimal points, commas, or padding chars) and cannot introduce HTML metacharacters when the receiver is a number; (c) a numeric literal (`42`, `3.14`, `0xFF`); (d) the `.length` property of any expression; (e) a boolean literal (`true`, `false`); (f) an arithmetic/bitwise/comparison/logical expression (`+`, `-`, `*`, `/`, `%`, `**`, `<`, `>`, `&`, `|`, `&&`, `||`) whose operands all independently match (a)–(e) or (f) recursively; (g) a variable whose most recent assignment in the same function scope resolves to (a)–(f) OR is a template literal whose every `${}` substitution independently matches (a)–(i). The template-literal sub-case covers values like `const time = \`${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}\`;` — each substitution is exempt via (b)/(f)/(h), the literal-string segments between them contain no HTML metacharacters, so the composed string cannot carry XSS. If even one substitution falls outside (a)–(i), the whole variable forfeits this exemption; (h) a ternary expression `cond ? A : B` where BOTH `A` and `B` are string literals that themselves contain no `${}` substitutions — the substituted value is guaranteed to be one of two compile-time-known strings, so no runtime input can reach the parser regardless of what `cond` evaluates to; (i) a reference to (or property access on) a module-scope `const` declared in the same file, where the initializer is a compile-time-known literal. Three sub-shapes:<br>  **(i.1)** direct reference `${CONST}` where CONST's initializer is a single string or number literal (e.g., `const ELLIPSIS_SVG = '<svg ...></svg>'; ...innerHTML = \`${ELLIPSIS_SVG}\``). The value IS the literal — no property access needed.<br>  **(i.2)** property access `${CONST.key}` or `${CONST[expr]}` where CONST's initializer is an object literal whose every leaf value is a string or number literal (recursively — nested objects count as long as their leaves are literals). The lookup resolves to a compile-time-known scalar regardless of what `expr` evaluates to. Example: `const LABELS = { en: { showMore: 'Show More' }, ar: { showMore: 'عرض المزيد' } }; ...innerHTML = \`<span>${LABELS[lang].showMore}</span>\``.<br>  **(i.3)** element access `${CONST[i]}` where CONST's initializer is an array literal whose every element is a string or number literal.<br>  All three sub-shapes share the same requirement: every reachable value is statically known at parse time. If the initializer has any non-literal leaf (function call, dynamic import, template literal with substitutions, reference to another variable), the exemption does NOT apply. Anything else — object-property lookups, function-call results from non-allowlisted functions, `getAttribute` reads, ternaries where either branch is a non-literal, string concatenations with non-literal operands — is NOT numeric/safe and does NOT earn this exemption.<br>- Interpolations wrapped in the file's own escape helper (`${escapeHtml(x)}`, `${encodeEntities(x)}`, or an equivalent function defined in the same file).<br>- Sinks where the RHS is a static string with no `${}` substitutions (e.g., `el.innerHTML = '<span class="nds-label"></span>'`) — no user input can reach the parser.<br>- Annotation exemption: an inline comment within 3 lines above the sink that names the specific source of the value and why it is safe (e.g., `// XSS-safe: icon class comes from TYPE_DEFAULTS keys, not user input`). Vague "// safe" comments without a specific rationale do NOT qualify.<br>- Sinks on freshly-created elements where the value was already `.textContent`-assigned elsewhere — handled as a combined read, not two separate findings. | HIGH | **Primary fix:** wrap every caller-supplied substitution in `${NDS.escapeHtml(x)}` — the core helper at `_js/nds-core.js` escapes via the browser's textContent serializer, so it catches every edge case (quotes, backticks, entities, attribute-context bypasses) that a regex escape would miss. One-line change per substitution; no DOM restructuring. **Attribute-context values** still need `setAttribute` rather than string interpolation — `escapeHtml` alone doesn't close quote-breakout vectors when the substitution lands inside an HTML attribute value; lift those values out of the template. **Secondary fix (for mixed-chrome templates or when you want to avoid innerHTML entirely):** build DOM nodes via `document.createElement` and assign dynamic values through `.textContent` / `.setAttribute` so the browser never parses the value as HTML. Use this path for templates where the static chrome is small and the DOM structure reads more clearly as imperative node construction. **Never use regex-based escapes.** |
| JSS-02 | Dynamic code execution sinks: `eval(x)`, `new Function(...args, body)`, `setTimeout(x, ...)` / `setInterval(x, ...)` where the first argument is a string literal or a string-valued variable (not a function reference, arrow, or function expression). The browser will parse and execute the argument as JavaScript, bypassing every escape upstream and skating past any CSP `script-src` restriction that doesn't include `'unsafe-eval'`. There is no legitimate use case for any of these in NDS component code. | HIGH | Replace with a direct function call. `setTimeout('foo()', 100)` → `setTimeout(foo, 100)`. For dynamic dispatch (action name → handler), use a lookup object: `({ next: goNext, prev: goPrev }[action] ?? noop)()`. If you genuinely need to parse user-supplied expressions (extremely rare for UI code), sandbox it in a Worker with a dedicated parser — not in the main realm via `eval`. |
| JSS-03 | Anchor element with `target="_blank"` (or a template-literal expression that could resolve to `_blank` at runtime) and NO `rel="noopener"` or `rel="noreferrer"`, in three sub-shapes: **(a)** HTML string literals containing `<a ... target="_blank" ...>` where no `rel=` attribute in the same tag includes `noopener` or `noreferrer`; **(b)** DOM construction — `document.createElement('a')` followed by `.target = '_blank'` or `.setAttribute('target', '_blank')` with no matching `.rel =` / `setAttribute('rel', ...)` in the same setup block; **(c)** HTML string templates where the `target` attribute value is set via any `${...}` substitution — including conditional spread patterns like `${cond ? \` target="${value}"\` : ''}` — with no `rel=` attribute (literal or interpolated) emitted in the same tag. Sub-shape (c) exists because callers routinely pass `target: '_blank'` through component-options APIs; without a paired `rel` interpolation the template stays vulnerable whenever the condition is true. Without `noopener`, the new tab can reach back through `window.opener` and redirect the original page (reverse-tabnabbing).<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- `window.open(url, '_blank', featureString)` — when a feature string is passed, modern browsers treat the new window as noopener by default; this is a different API from the `<a target="_blank">` attribute pattern.<br>- Anchors whose `href` is a static same-origin path (starts with `/`, `#`, `./`, or the current origin) AND is visible at the rule-detection site (i.e., not a template-literal `${url}` whose destination is dynamic). Same-origin known-safe destinations don't grant cross-origin capability to the new tab.<br>- `rel="noreferrer"` alone is sufficient (it implies `noopener` in the modern spec). | MEDIUM | Add `rel="noopener noreferrer"` to every `target="_blank"` anchor. HTML strings: `<a href="..." target="_blank" rel="noopener noreferrer">`. DOM construction: after setting `target`, also set `link.rel = 'noopener noreferrer';`. Making this the project-wide default in a link-factory helper is ideal. |
| JSS-04 | `addEventListener('message', handler)` on `window`, `self`, or any EventTarget where the handler body does NOT read `event.origin` (destructured `origin` also counts) and compare it against an expected value before touching `event.data`. Any frame on the page — including an attacker-controlled one in an iframe or a tab that holds a window reference — can send a forged `postMessage` with data that drives the handler's actions. | HIGH | Validate origin as the first check in the handler. For a fixed-origin setup: `if (event.origin !== 'https://trusted.example') return;`. For an allowlist: keep a `Set` of allowed origins and early-return on miss. Never compare against `'*'` (no-op), never rely on `event.source` alone (it proves the sender, not the origin), and never skip the check for same-origin-only deployments — same-site subdomains and intermediary frames still cross the origin boundary. |
| JSS-05 | Navigation sinks where the destination is an expression, not a literal: `window.open(x, ...)` / `window.location = x` / `location.href = x` / `location.assign(x)` / `location.replace(x)` / `a.href = x` (when `a` is a newly-created anchor) where `x` is a variable, template literal, or expression whose value at runtime can come from any of these sources: `getAttribute('data-*')`, `dataset.*`, URL query parameters, form-input values, server-response fields, `postMessage` data. Without scheme validation, a `data-share-url="javascript:alert(1)"` attribute becomes script execution when the user clicks.<br><br>**Explicitly NOT a finding** (do NOT flag):<br>- Navigation to `window.location.href` / `location.pathname` / `location.origin` composed with static paths (e.g., `window.location.origin + '/contact'`). Those values are browser-managed; they can't be injected with `javascript:`.<br>- Values already passed through `encodeURIComponent` for use as query-string parameters (the scheme is whatever the base URL sets, not what the encoded component is). | MEDIUM | Validate the URL's scheme before navigating. Compact form: `try { const u = new URL(x, location.href); if (!['http:', 'https:', 'mailto:', 'tel:'].includes(u.protocol)) return; window.open(u.href, '_blank', 'noopener'); } catch { return; }`. For internal navigation, assert the value begins with `/` or `#` before assigning. For share/copy flows (see `_js/nds-share.js:52–61`), apply the scheme check inside the URL-reading helper so every caller benefits. |

JSS-01 is the highest-false-positive rule in the catalog — static-analysis can't prove that a component-options value is safe at the caller level. When the codebase legitimately trusts a value (e.g., icon class names resolved from a `TYPE_DEFAULTS` enum in the same file), prefer the annotation-exemption comment over widening the rule's numeric/helper allowlist. If the same "safe by construction" rationale repeats across three or more sites, that is a JSD-05 promotion candidate (the rationale becomes a typed enum or helper).

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
Reply with a number OR the literal command:

1. `fix all` — apply every finding in the report (except JSD-05 promotion candidates — those require manual core edits).
2. `evolve` — apply the proposed rule-catalog edits to SKILL.md (Phase 7). Only listed if the report has "Gaps observed" or "Dead-rule candidates" entries.
3. `save` — persist this report to `.claude/audit-reports/` (see "Saving the report" subsection below).
4. `save and evolve` — save the report first, then apply the catalog edits. Use when you want both the pre-evolution report snapshot AND the sharper rules for the next run.
5. `skip` — end the audit here; nothing is written, nothing is changed.

Finer-grained fix filters (type the literal, no number):
- `fix HIGH` / `fix MEDIUM` / `fix LOW` — by severity
- `fix JSP` / `fix JSD` / `fix JSS` — by rule group
- `fix <file>` (e.g., `fix _js/nds-alert.js`) — one file only
```

When emitting the Next Step block at the end of a real report, adapt the numbered list to only include options that are actually available for THIS run: omit item 2 if there are no gap/dead-rule proposals; adjust item 4 accordingly. The user reading the report should never see a choice that is a no-op on the current state.

### Saving the report (optional, user-approved)

When the user replies `save` — alone, or combined with another action like `save and evolve` or `fix HIGH then save` — write the current report verbatim to `.claude/audit-reports/` under this pattern:

**Filename:** `YYYY-MM-DD-code-audit-js-run-N.md`
- `YYYY-MM-DD` is today's date (the run date, not the save date — they're the same in 99% of cases, but use the date of the audit if they diverge).
- `N` is the **save-order index**: `(count of existing `run-*.md` files in `.claude/audit-reports/`) + 1`. Do NOT count `/code-audit` invocations from the conversation that didn't get saved; the index reflects persisted artifacts only.
- No scope suffixes (`-baseline`, `-security`, etc.) in the filename. The distinction lives inside the report itself via the "Rule catalog version" line at the top of the file — that's enough signal for any later reader to tell which rule groups were active.

**Always include a frontmatter-style header** in the saved file so later audits can be diffed meaningfully:

```markdown
# Code Audit — `_js/` (js mode) — Run N

**Date:** YYYY-MM-DD
**Rule catalog version:** {JSP + JSD | JSP + JSD + JSS} (note any post-evolution refinements: "post-evolution: JSD-03 [400,2000] range, JSS-01 allowlist v3")
**Invocation:** `/code-audit {args}`

## Summary
…
```

**Diff-vs-prior section.** If `N ≥ 2`, append a "Diff vs. Run (N−1)" section at the bottom of the file listing what changed between this run and the last saved one: new findings, closed findings, re-classified findings, and any rule evolutions applied between runs. This is what makes multi-run refinement legible across time.

**Never overwrite.** Before writing, `ls .claude/audit-reports/` to confirm the target filename doesn't exist. If it does (e.g., two saves on the same day), bump the `-N` index.

**Writes go only to `.claude/audit-reports/`.** Never save reports inside `_js/`, the project root, or other Jekyll-tracked directories — the `.claude/` tree is outside the site build.

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
- **Agent review (mandatory):** after rebundle succeeds, spawn a review agent via the Agent tool with a self-contained brief. See the "Agent review" subsection below for the brief template. Wait for its report before emitting the per-file closing summary. Fold the result into the summary. If the agent flags a real regression, stop — do not produce a clean summary or advance to the next file.

### Agent review (mandatory per-file step)

After rebundle succeeds but before the per-file closing summary, spawn a review agent (`Agent` tool, `general-purpose` subagent). Purpose: catch silent failures (semantic drift, typos in injected setup, call-site breakage, escape semantics that don't match the sink context) that re-running the rule catalog cannot see. This step is mandatory per fix batch — even for one-line changes, because one-line changes are where typos hide best.

**Brief template — always include these sections:**

1. **What changed** — concise before/after snippets or a one-paragraph description of the refactor. Include exact file paths and line numbers.
2. **Reference anchors** — cite `_js/nds-core.js:<line>` for any core helper invoked (e.g., `NDS.escapeHtml` at 303–312).
3. **What to verify (under 200 words)** — 3–5 specific questions tailored to the fix. Some or all of:
   - Semantic equivalence (does the new DOM / behavior match the pre-fix shape?)
   - Call-site impact (grep repo for callers that might break)
   - Edge cases (null / empty / missing options / unusual inputs)
   - Escape / boundary semantics (does the escape helper match the sink context? does the breakpoint condition match the intended token?)
   - Typos / scope issues (wrong identifier, missing declaration, stale reference)
   - One catch-all: "anything else wrong — one line max, or say 'clean'"
4. **Response format** — ask for direct, quoted `file:line` references and an under-200-word cap. Never accept vague "looks fine" without specifics.

**When the agent reports:**
- If **clean** (no regressions): add the recap to the per-file closing summary under an "Agent review" line. One sentence is enough unless the agent raised a non-blocking note worth preserving.
- If **regression found**: do NOT emit a clean closing summary and do NOT proceed to the next file. Report the agent's finding to the user verbatim, propose either a follow-up fix or a revert, and wait for direction. This overrides the auto-`next` rhythm.

Do not ask the user whether to spawn an agent — always do it. The user opted in once at the catalog level; asking per-file turns the step into a friction point.

**Follow-up fixes after agent review.** If the agent flags a concern and the follow-up is **executable code** (source, not comment) — e.g., a guard clause added, an identifier renamed, a logic branch re-ordered — re-run the agent review with a diff-focused brief on the new change. If the follow-up is **documentation only** (comment, docstring, naming-in-comments, reformatting with no behavior delta), skip the re-test. Comment changes cannot introduce behavior regressions, and an infinite "test after every reword" cycle kills the rhythm. In the per-file summary's `Agent review:` line, note the follow-up briefly (e.g., "clean after one docstring correction"); if there was an executable follow-up, name both rounds' outcomes.

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
| JSP-08 (observer teardown) | **Medium** — injecting `.disconnect()` into a teardown path is usually safe, but placement matters: disconnecting BEFORE the rest of teardown runs can race with synchronous DOM reads that depend on observer-driven state. | Re-init or destroy the owning component at least 10x while watching for retained-memory growth in devtools (Performance/Memory tab). Confirm the component still reacts to its observed mutations BEFORE teardown runs (e.g., for a forms msgElement observer, type into the field and verify the success/error placeholder still toggles). |
| JSD-09 (teardown handler storage) | **Low-Medium** — the fix adds new `this.handlers.{name} = ...` assignments; a typo in the key name silently re-creates the same dead-teardown shape. | Confirm the key used in teardown's array EXACTLY matches the key assigned in the binder (copy-paste safe). Exercise the listener's action at least once (click the button, fire the event) and confirm it still fires. Then destroy/re-init the component and confirm the old listener is actually removed (devtools Event Listeners panel). |
| JSD-01 (NDS.State) | **Medium** — `dataset.state = 'open'` clobbers other tokens; `NDS.State.add('open')` merges with existing tokens. Wrong helper silently breaks multi-state components | Exercise every state transition on the demo page (default → hover → pressed → disabled, open → closed → focused, etc.). Confirm the `data-state` attribute holds the right token set at each step (inspect in devtools). Keyboard and pointer paths both. |
| JSD-02 (NDS.Status) | Low — single-value attribute, helper is a direct replacement | Trigger the status-changing action (copy button, form submit); status pill/indicator appears and clears on the expected timeline. |
| JSD-03 (NDS.breakpoints) | Low — pixel values match the tokens | Resize across all breakpoints (mobile / tablet / desktop / large-desktop); responsive behavior switches at the same viewport widths. |
| JSD-04 (NDS.isRTL / NDS.lang) | **Medium** — live getter vs cached read. If a component cached the value and relied on cache, switching to `NDS.isRTL` makes it reactive, which may be the intent or an unintended change | Toggle the direction switcher on a page that uses the component; confirm layout flips cleanly and does not leak into other direction-unrelated features. |
| JSD-05 (promotion candidate) | N/A — skill does not auto-apply | Promotion is manual; once the user promotes to `nds-core.js`, audit the call sites with a follow-up `/code-audit js`. |
| JSD-06 (batch reads-before-writes) | Low — refactor preserves behavior when done correctly, but easy to get wrong | Component's animated transitions and measurements must still be visually correct: height animations expand to the right size, position calculations land in the right place. Compare before/after with reduced-motion on and off. |
| JSD-07 (component contract) | **Medium** — refactoring the public shape can break doc-page JS tabs and consumer integrations | Open the component's doc page and exercise every snippet in the "JS API" tab. Confirm `NDS.{Name}.init()`, `.reinit()`, `.create(el)` all work as documented. |
| JSD-08 (dead defensive guards) | Low — removing `typeof NDS !== 'undefined'` hedges only prunes dead code since the loader guarantees NDS exists. Risk is a missed case where the component actually runs before the loader (module top-level code). | Confirm the guard you removed was inside a method or function invoked after init — not at module top level. Then load any page using the component; no ReferenceError should appear in devtools console. |
| JSS-01 (innerHTML XSS) | **Medium-High** — replacing `innerHTML = template` with `createElement` + `textContent` changes the DOM-construction path. Whitespace inside templates disappears; child-element structure can subtly reorder; event-listener attachment points move. | Exercise every visual variant the affected component supports — every `variant`/`status`/`display` option in one of its factory methods (e.g., `NDS.Alert.create({ variant: 'success' | 'error' | ... })`). Inspect the rendered DOM in devtools and confirm class names, aria attributes, and text content all match the pre-fix version. Then paste an XSS probe string (`<img src=x onerror=alert(1)>`) as the user-facing value: it must render as literal text, not execute. |
| JSS-02 (eval/Function removal) | Low — dynamic code paths are rare in UI; replacements should behave identically. | Trigger the code path that previously built the string: call the feature from the browser console with both a typical value and an unusual one (symbols, empty string, very long string). No syntax errors, no silent noops. |
| JSS-03 (target="_blank" + rel="noopener") | Low — pure attribute addition; no behavior change. | Click the affected link, confirm new tab still opens. In devtools, inspect the rendered `<a>` — the `rel` attribute must contain both `noopener` and `noreferrer`. Open the new tab from the console: `console.log(window.opener)` must return `null`. |
| JSS-04 (postMessage origin check) | **Medium** — if the expected origin list is wrong, legitimate messages get dropped silently. | Identify every page/iframe that sends messages to this handler and confirm its origin is in the allowlist. Trigger one known-good message and verify the handler fires. Then send a message from a different origin (open devtools on a different site and `window.postMessage(...)` to this page) — it must be silently dropped. |
| JSS-05 (URL scheme validation) | **Medium** — wrapping `window.open`/`location.assign` in scheme checks can reject URLs the user legitimately expected to work if the allowlist is too narrow. | Test every share/navigate path the component supports (`http`, `https`, `mailto`, `tel` if applicable) end-to-end. Then try `javascript:alert(1)` as the `data-*` attribute — it must be silently dropped with no script execution and no alert. Confirm no console errors for the blocked case. |

Include only rows for rules that fired in this fix batch. Do not dump the whole table every time — that trains the user to skip it.

### Per-file closing summary

After each file's fixes are applied and the catalog is re-run, emit this and STOP:

```
## {file} — applied {N} fixes
- Findings resolved: {list rule IDs with line numbers}
- Findings remaining in this file: {M} (list rule IDs, or "none")
- Regressions introduced: 0 (or list them)
- Rebundle: ran `ruby _plugins/js_processor.rb` — {bundle size line from output}
- Agent review: {one-line recap — "clean" OR concise summary of any non-blocking notes; if a regression was found this block wouldn't be emitted at all}

## Behavior checks for this file
Rules fixed: {JSP-02, JSD-01}
Verify in your environment (however you normally exercise this component — doc page, playground, real page consumers, devtools):
- JSP-02: {copy the "What to verify in the browser" cell for JSP-02 from the catalog above}
- JSD-01: {copy the "What to verify in the browser" cell for JSD-01}

Reply with a number OR the literal command:

1. `next` — move on to the next file in the batch.
2. `regression in {file}` (type the literal with what broke) — pause, revert with your IDE's undo/local-history (not git), and re-examine the finding together.
3. `stop` — end the batch here; remaining files keep their existing findings unfixed.
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

For each proposal the user accepts, edit this file (`.claude/skills/code-audit/SKILL.md`) — and only this file — to apply the change:

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
- Self-editing any file other than this `SKILL.md` and `.claude/audit-reports/*.md`. Phase 7 may revise the rule catalog in this file after explicit user approval on each proposal. The Phase 4 "Saving the report" step may write new (never overwrite) report files in `.claude/audit-reports/`. Nothing else.
