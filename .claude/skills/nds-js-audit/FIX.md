# nds-js-audit — Phase 5: FIX & Phase 6: VERIFY (read on demand)

Loaded from SKILL.md only when the user issues an explicit fix go (`fix …` / `promote <api-name>` / `apply solution` / a Next Step number). SKILL.md's contracts govern here — Response style, Auto-drive pause points, numbered-reply discipline; this file adds the fix/verify procedure only.

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
- Fix batches MAY ALSO edit `_sass/**/*.scss` when a JSA finding's `Fix:` recommendation routes there — the canonical case is JSA-15 (JS work CSS expresses natively). The SCSS edit MUST be named specifically in the `Fix:` line (which file, which selector, what to add or change) and stay narrowly bounded to the migration the rule called out. Respect the SCSS conventions in CLAUDE.md: `@use '../mixins' as *;` at the top of new files, `nds-` prefix on new classes, CSS Logical Properties for direction-aware properties (`margin-inline-start`, `inset-inline-start`, `text-align: start`, etc.), design tokens only (no raw hex or `--colors-*` references). The per-file summary MUST list every `.scss` file edited under `Cross-file edits` — the user must never be surprised by an SCSS change. Do NOT make incidental SCSS edits outside a finding's recommendation, and do NOT generalize this carve-out into a license to audit SCSS: SCSS *auditing* (running rules against `.scss` files) remains out of scope per Non-goals; only SCSS *editing as part of a JSA fix* is permitted here. SCSS edits have no per-fix rebundle step (no equivalent of `js_processor.rb`) — Jekyll re-processes SCSS automatically when the dev server is running.
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
- **Agent review** — see "Agent review" below: the static review auto-runs after rebundle and gates the per-file summary; the browser drive is user-elected only. Wait for the static report before emitting the summary; on a real regression, stop — do not produce a clean summary or advance.

### Agent review (static automatic; live behavior verification is the user's choice)

After rebundle succeeds, spawn a review agent (`Agent` tool, `general-purpose` subagent) for the **static review** — it catches silent failures the rule catalog can't see (semantic drift, typos in injected setup, call-site breakage, escape-context mismatches). The static review is mandatory, cheap (read-only), and runs without asking.

**Puppeteer is never auto-run.** Live behavior verification is always presented as a choice for the user — the skill never decides to drive the browser on its own:
- `verify in browser` — the skill drives the fixed component in headless Chrome per `PUPPETEER.md`, reproducing the per-rule scenario(s) from "Behavior regression verification (per rule)" below and asserting no console errors.
- **manual review (the user)** — the user exercises the change themselves; the skill hands them the exact per-rule checklist rows so they know precisely what to exercise. Some changes are quicker or more meaningful for the user to eyeball than to automate (a visual variant, a hover/focus nuance, a real-data interaction).

**The skill states a recommendation; the user decides.** Use the risk signal to recommend a path — but NEVER auto-drive the browser:
- **Recommend a behavior check** when the change has runtime behavior a static read can't fully settle: event wiring / teardown (JSP-05 / JSP-06 / JSP-08, JSD-09), DOM construction or structure change (JSS-01, JSA-12, JSA-11), state-machine transitions (JSD-01), navigation / URL / postMessage (JSS-04 / JSS-05), first-paint / CLS / reveal-timing, async / fetch, or any **Medium+** finding in the per-rule table below. Phrase it: *"Recommended: a behavior check for this {risk} change — reply `verify in browser` to have me drive it, or review it manually yourself."*
- **Recommend proceeding (static-only is enough)** when the change is mechanically equivalent AND the static review confirms it: in-file DRY/reduction (JSA-09, JSA-12 actionable), a CSS rule replacing an inline style (JSA-15), dead-guard removal (JSD-08), breakpoint-token swap (JSD-03), comment/naming-only — i.e. **Low** on the per-rule table with no DOM-structure or wiring change. Still list the option: *"Recommended: proceed — static review + compile confirm equivalence; reply `verify in browser` if you'd rather drive it."*

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
| JSA-* (generic architectural change) | **Medium-High** — JSA fixes are architectural (extract function, replace innerHTML structure, add LRU disposal, reroute scheduling primitive). Regression surface is the affected component as a whole, not just the pattern site. A structural refactor can shift call-site semantics, drop whitespace nodes, change initialization order, or alter event-binding timing in ways the rule's catalog signature doesn't reveal. | Exercise every primary interaction and visible variant of the component. For DOM-structure changes (JSA-12): inspect the rendered DOM in devtools and compare class names, ARIA attributes, child ordering, and text content against the pre-fix version. For caching/disposal fixes (JSA-03): exercise the create→destroy→create cycle 20+ times and confirm no memory growth in devtools Memory panel. For function extraction (JSA-11): confirm every extracted sub-method is reachable on the orchestrator's primary code path; nothing is dead-code'd by the split. |
| JSA-12 (innerHTML → replaceChildren) | **Medium-High** — same risk profile as JSS-01: swapping the DOM-construction path can change whitespace handling, child-element ordering, and event-listener attachment points. The browser's HTML parser normalizes whitespace and creates implicit nodes (e.g., text nodes around block elements) that `createElement` does not. | Inspect the rendered DOM in devtools before and after the fix. Confirm class names, ARIA attributes, child node count, and text content match. If the original template inlined event-listener attributes (`onclick=`), confirm event-binding still fires — `replaceChildren` does not run inline-attribute event handlers the way `innerHTML` parsing does. |
| JSA-11 (mixed-concern function extraction) | **Medium-High** — extracting sub-methods from a >80-line function changes the call graph. A typo in one of the new method names throws at runtime; a missed `this` rebind in an extracted method silently breaks state mutation. The orchestrator's outer flow must still drive every concern in the right order. | Exercise the component's primary interaction that flows through the extracted function end-to-end. Confirm each extracted sub-method is invoked on the right code path (set a breakpoint in each `_render()` / `_persistState()` / etc. and confirm they all hit). Then exercise an edge-case path (error branch, empty state, hidden state) and confirm the same orchestrator flow still works — extraction can accidentally remove a guard or a side effect that was implicit in the straight-line code. |

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

**Closing offer — always NUMBERED (this is exactly where the discipline slips).** After the batch summary, any open follow-on action the user can take — authorizing the surfaced Phase 7 candidates (`evolve` — skill-file edits happen ONLY on this go), committing, running a behavior check — is presented as a numbered list, never as prose bullets or an "open / optional / your call" block. Even ONE open action gets a number, and the recommended one is itself numbered:

```
Open items — reply with a number:

1. `evolve` — apply the surfaced catalog/persona candidates (`evolve <RULE>` for one, e.g. heal the stale `RULES-JSP.md` exemplar). [recommended]
2. commit — I'll propose the message and wait; I never commit unprompted.
0. done — nothing further.
```

