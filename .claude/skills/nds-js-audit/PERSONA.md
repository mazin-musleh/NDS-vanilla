# NDS JS Code Persona

The project's chosen conventions for `_js/nds-*.js` component files, documented as concrete canonical forms backed by principle reasoning. Consulted by `nds-js-audit` so JSD-15 ("cross-file pattern consistency") works in single-file mode and so the audit measures code against deliberate choices instead of against the loudest accidental majority.

**Scope:** the 47 component files under `_js/nds-*.js`. Excludes `nds-core.js` (publishes the shared utility surface, different conventions), `nds-loader.js` (orchestration shape), `nds-showcase.js` (demo-page wiring).

---

## How this document is structured

Each entry has six fields, each doing one job:

- **Canonical** — the concrete form the audit checks against. A literal string, attribute name, method name, or shape. Greppable.
- **Why this canonical (principle)** — the reasoning. Defends the choice against future revert attempts; not load-bearing for the audit itself.
- **Why not the alternatives** — rejected forms with their cost. Documents what was considered and ruled out, so a future contributor can argue from data rather than revert from inattention.
- **Carve-outs (NOT divergence)** — concept-different cases that share surface vocabulary but follow a different principle. The audit must NOT flag these. Cite file:line when possible.
- **Audit behavior** — the literal check `nds-js-audit` performs. A yes/no test, not a judgment call.
- **Current adoption** — informational dashboard. Refactor-progress signal. Never the source of the canonical; the canonical is the canonical even when adoption is 30%.

If the canonical and the corpus disagree, the audit flags the divergent files as migration targets. The canonical changes only through Phase 7 EVOLVE, with explicit user approval.

---

## Entries

### 1. Instance-lifetime AbortController

**Canonical**

`this.abortController` for the primary instance-lifetime controller. Secondary controllers that scope a sub-concern carry full domain names: `this.fetchAbortController`, `this.renderAbortController`, `this.instanceAbortController`.

```js
// constructor
this.abortController = new AbortController();
// destroy()
this.abortController.abort();
```

**Why this canonical (principle)**

Clarity beats brevity for fields read during teardown work and code review. A reader scanning a class to answer "where does teardown happen?" must spot the controller without parsing abbreviations. The 12 characters saved by an abbreviation are paid back at every read by every reader who has to learn the instance-local vocabulary.

**Why not the alternatives**

- `this._ac` / `this._ctrl` / `this.ac` — vocabulary tax. The leading underscore additionally misclassifies the field: `_xxx` signals "implementation detail, don't read from outside the class," but the controller's identity documents lifecycle, not implementation. Lifecycle naming should be searchable, not hidden.
- `this.controller` — ambiguous when a component has more than one controller (fetch, render, animation). The field name should answer "what kind of controller?" without context.

**Carve-outs (NOT divergence)**

- **Secondary controllers** that scope a sub-concern, named for what they scope:
  - `this.fetchAbortController` ([_js/nds-filter.js:324](_js/nds-filter.js#L324)) — scopes in-flight fetch aborts, paired with the primary `this.abortController` at L98.
  - `this.renderAbortController` ([_js/nds-chart.js:392](_js/nds-chart.js#L392)) — scopes one render cycle, paired with the primary at L122.
  - `this.instanceAbortController` ([_js/nds-ipv.js:44](_js/nds-ipv.js#L44)) — secondary to instance teardown.
- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC = new AbortController()` at [_js/nds-filter.js:1334](_js/nds-filter.js#L1334)) are scoped to the element's lifetime, not the instance's. Structurally different shape; the leading underscore IS correct here because the property is on a foreign element.

**Audit behavior**

Flag any `this.<name> = new AbortController()` where `<name>` matches one of: ≤4 characters, OR begins with `_` followed by ≤3 lowercase letters (`_ac`, `_ctrl`, `_fp`), OR equals `controller`. Secondary controllers with domain-named full words (any name containing `AbortController` as a suffix) pass.

**Current adoption:** 13/13 component files using a primary controller use `this.abortController`. Tallied 2026-05-28.

---

### 2. Instance teardown method

**Canonical**

`destroy()` is the public method that releases everything the instance owns.

```js
destroy() {
    this.abortController.abort();
    this._offDOMAdds.forEach(off => off());
    this.root.removeAttribute('data-nds-<name>-initialized');
}
```

**Why this canonical (principle)**

`destroy()` matches the JS-component ecosystem (Web Components' `disconnectedCallback` pairs with explicit `destroy()` patterns; Vue, React class lifecycle; Backbone) so consumers writing `instance.destroy()` never have to ask "is it destroy, teardown, cleanup, or dispose?" Project-local vocabulary on lifecycle methods produces friction for every consumer.

**Why not the alternatives**

- `cleanup()` — too generic; reads as "tidy up after some action" rather than "instance lifetime is over." Conflicts with the legitimate per-cycle internal use (see carve-out below).
- `teardown()` — test-framework-flavored (Mocha, JUnit). Reads as "this is a test fixture" not "this is a UI component."
- `dispose()` — C#/IDisposable-flavored. Unusual in JS-component ecosystems; forces consumers to learn a foreign vocabulary that has no upside.

**Carve-outs (NOT divergence)**

- **Two-phase lifecycle** where `cleanup()` releases per-open-cycle handlers and `destroy()` releases instance-lifetime handlers + invokes `cleanup()` first. Exemplar: [_js/nds-date-picker.js](_js/nds-date-picker.js) (declarations at L638, L1999). The principle: per-cycle release uses `cleanup()`; instance release uses `destroy()`. They coexist.
- **Locally-scoped `function cleanup()` declarations** inside transitionend handlers ([_js/nds-accessibility.js:916](_js/nds-accessibility.js#L916), [_js/nds-drawer.js:143](_js/nds-drawer.js#L143), [_js/nds-dropmenu.js:627](_js/nds-dropmenu.js#L627), [_js/nds-sidemenu.js:159](_js/nds-sidemenu.js#L159)) are closure utilities, not public teardown methods. They share the word but not the meaning.

**Audit behavior**

Flag any component that exposes `teardown()` or `dispose()` as the public instance-lifetime teardown, OR exposes only `cleanup()` without the two-phase shape detectable in the file (i.e., no separate `destroy()` declared AND no separate-subset teardown structure where `cleanup()` removes some handlers and other code removes the rest). Files exposing both `cleanup()` and `destroy()` for the documented two-phase shape are NOT flagged.

**Current adoption:** 22/22 component files with a public teardown method use `destroy()`. Tallied 2026-05-28.

---

### 3. Lifecycle pair naming

The verb pair encodes the concept, not the DOM mutation. Two components making an element visible may need different verbs if the user mental models differ. Four concept buckets, each with its own canonical:

#### 3.1 Modal-like persistent overlays → `open()` / `close()`

**Canonical:** `open()` / `close()` as the public lifecycle pair.

**Concept:** the surface fully captures attention. Singleton-open. Focus-trapped (`NDS.trapFocus`) and typically backdrop-paired (`NDS.Backdrop.show`). Opening is a state transition for the whole page.

**Discriminator** (mechanically checkable): file invokes `NDS.trapFocus` OR `NDS.Backdrop.show`.

**Examples:** [_js/nds-modal.js:26-69](_js/nds-modal.js#L26), [_js/nds-ipv.js:313-336](_js/nds-ipv.js#L313), [_js/nds-dropmenu.js:519-583](_js/nds-dropmenu.js#L519), [_js/nds-tooltip.js:168-202](_js/nds-tooltip.js#L168), [_js/nds-autocomplete.js:402-412](_js/nds-autocomplete.js#L402), [_js/nds-accessibility.js:862-896](_js/nds-accessibility.js#L862).

#### 3.2 Per-section toggleable → `show()` / `hide()`

**Canonical:** `show()` / `hide()` as the public lifecycle pair.

**Concept:** multiple instances can be visible simultaneously (sections within a single component, submenus within a drawer). No focus trap; no backdrop; no attention capture. The mutation is a per-instance visibility flip, not a singleton state transition.

**Discriminator:** multi-instance simultaneous visibility AND file does NOT invoke `NDS.trapFocus` / `NDS.Backdrop.show`.

**Examples:** [_js/nds-accordion.js:144-180](_js/nds-accordion.js#L144), [_js/nds-drawer.js:126-147](_js/nds-drawer.js#L126) (`showSubmenu` / `hideSubmenu`).

#### 3.3 Transient self-dismissing surfaces → `create({...})` + `dismiss(target)`

**Canonical:** factory `create({...})` for the constructor entry, `dismiss(target)` for the explicit close. No symmetric `open()` — the factory call IS the open.

**Concept:** finite lifetime, constructed on demand by consumer, auto-dismisses on timer or user action. Consumer doesn't hold a long-lived reference to open/close.

**Discriminator:** module exposes `NDS.<Name>.create({...})` AND `NDS.<Name>.dismiss(target)` (or `dismissAll(scope)`) AND the created surface has a finite lifetime independent of the API caller.

**Examples:** [_js/nds-alert.js:254](_js/nds-alert.js#L254), [_js/nds-feedback.js:144](_js/nds-feedback.js#L144).

#### 3.4 Binary toggle with symmetric setup → `toggle()` only

**Canonical:** a single `toggle()` method; no separate `open()` / `close()`.

**Concept:** state is fully binary (light/dark, expanded/collapsed). Flipping in either direction is the same operation with a different result. No asymmetric setup work.

**Discriminator:** component exposes `toggle()` AND does NOT expose distinct `open()` / `close()` / `show()` / `hide()` for the same state axis.

**Examples:** [_js/nds-theme.js:40](_js/nds-theme.js#L40), [_js/nds-expandable.js:96](_js/nds-expandable.js#L96), [_js/nds-mainnav.js:702](_js/nds-mainnav.js#L702) (`toggleDropdown`).

**Why this canonical (principle, whole entry)**

The pair reads as the concept reads. `open` evokes a doorway; `show` evokes revealing what was hidden; `dismiss` evokes a temporary visitor leaving; `toggle` evokes a binary flip. Forcing one pair onto all concepts loses information at the call site — a reader seeing `widget.show()` shouldn't have to know component context to figure out whether a modal is opening, a toast is being created, or a section is revealing.

**Why not the alternatives**

- **One universal pair across all concepts** — destroys concept information at the call site. Vocabulary specificity is information; uniformity-for-its-own-sake erases it.
- **Pair invented per file** — defeats the persona's purpose. A new contributor would have to learn N vocabularies for N components.

**Carve-outs (NOT divergence)**

- **Components that compose multiple concepts** can expose multiple pairs. Dropmenu has `toggle()` (entry point from trigger click) + `open()` / `close()` (the lifecycle). Both are honest. NOT divergence.

**Audit behavior**

For each component file:
1. Apply the discriminators (`NDS.trapFocus` / `NDS.Backdrop.show` invocation → 3.1; multi-instance no-backdrop → 3.2; factory-create with finite lifetime → 3.3; `toggle()`-only → 3.4).
2. Check the file's exposed lifecycle pair against the bucket's canonical.
3. If the file's concept is ambiguous (multiple discriminators match, or none match), surface as a Phase 7 question rather than flagging.

**Current adoption:**
- 3.1 (modal-like): 6/6 use `open()` / `close()`
- 3.2 (per-section): 2/2 use `show()` / `hide()`
- 3.3 (transient): 2/2 use `create({...})` + `dismiss(target)`
- 3.4 (toggle-only): 3/3 use `toggle()` only

Tallied 2026-05-28.

---

### 4. Component console output prefix

**Canonical**

`'NDS <PascalCaseName>: <message>'` — `'NDS '`, then the component's PascalCase namespace name, then `': '`, then the human-readable message.

```js
console.warn('NDS Filter: target container not found');
console.error('NDS Modal: requires NDSBackdrop API. Please include nds-backdrop.js first.');
```

**Why this canonical (principle)**

Component-emitted diagnostics carry the component's identity at the start of the message so a developer can grep `NDS Filter` and find every diagnostic the filter component produced. The PascalCase form matches the JS-side namespace identity (`NDS.Filter`, `NDS.Modal`) rather than the CSS-class form. The colon-space separator breaks the prefix from the message at a visually scannable point.

**Why not the alternatives**

- No prefix — un-greppable; loses identity in a noisy console. A diagnostic from an unidentified source is barely better than no diagnostic.
- `[NDS.Filter]` bracket form — correct for API-namespace internals (core's `[NDS.i18n]`, loader's `[NDS:init]`) where the source IS a sub-API. Wrong shape for component messages because it implies sub-API identity that components don't have.
- Lowercase `nds-filter:` — matches the CSS class form but not the JS namespace identity. JS-side diagnostics should match JS-side identity.

**Carve-outs (NOT divergence)**

- `_js/nds-core.js` and `_js/nds-loader.js` use the bracket form `[NDS.<api>]` / `[NDS]` / `[NDS:init]` because they're API namespaces and orchestration, not components. Out of scope of this entry.

**Audit behavior**

Flag any component-file `console.warn(...)` or `console.error(...)` whose first string argument does not match `/^NDS [A-Z][A-Za-z]*: /`. Files using the bracket form for component output (e.g. `'[NDS Filter] ...'`) are flagged for migration.

**Current adoption:** 21+ component warns/errors use this exact form across the corpus. Zero component-level divergence post commit `1a194e4`. Tallied 2026-05-28.

---

### 5. Init guard sentinel

The sentinel form follows the component's structural shape — different shapes for different shapes:

#### 5.1 Factory components → `data-nds-<name>-initialized` (DOM attribute)

**Canonical**

```js
// in init / setup
container.setAttribute('data-nds-<name>-initialized', 'true');
// in destroy()
container.removeAttribute('data-nds-<name>-initialized');
// in re-init scans
if (!el.hasAttribute('data-nds-<name>-initialized')) { /* init */ }
```

`<name>` is the kebab-case form of the component (matches the file suffix: `filter`, `dropmenu`, `cooldown-button`).

#### 5.2 Singleton modules → module-scope `_initDone` closure flag

**Canonical**

```js
let _initDone = false;
function init() {
    if (_initDone) return;
    _initDone = true;
    // wire body/document listeners, attach singleton observers
}
```

**Why this canonical (principle, whole entry)**

A factory creates per-element instances; the guard must distinguish "this specific element is initialized" from "any element of this type was once initialized," so the marker belongs on the element. A singleton has no per-element target to mark; pinning a `data-nds-<name>-initialized` attribute to `document.body` would pollute a shared attribute namespace and force every singleton to coordinate names that don't need to coexist in the DOM. The guard's location should match the guard's scope.

**Why not the alternatives**

- Factory using a closure flag — can't distinguish per-element initialization state. Re-init scans become impossible.
- Singleton using a DOM attribute on `document.body` — namespace pollution; coordination cost between unrelated singletons.
- `window.nds<Name>Initialized` global flag — leaks state into the window namespace where it can be tampered with or accidentally collided. Acceptable only when the guard is genuinely cross-module (a tree-wide observer multiple components depend on existing exactly once).

**Carve-outs (NOT divergence)**

- **Window-scope flags for tree-wide observers.** [_js/nds-tables.js:414](_js/nds-tables.js#L414) (`window.ndsTableClassObserverInitialized`) and [_js/nds-tables.js:427](_js/nds-tables.js#L427) (`window.ndsTabChangeHandlerInitialized`) coordinate two cross-module observers (responsive-table class mutations, tab-change events). The window flag is the right shape for that specific concern because there's no per-element target AND the guard needs to coordinate with sibling modules. Not divergence.

**Audit behavior**

1. Classify the file via init pattern: iterates `querySelectorAll(...)` over content elements → factory (expect 5.1); binds only to `document.body` / `document.documentElement` / module-level state → singleton (expect 5.2).
2. Factory using `_initDone` or `window.<flag>` → flag.
3. Singleton using `data-nds-<name>-initialized` → flag.
4. Window-global flag requires an inline comment within 3 lines naming the cross-module observer concern; otherwise flag.

**Current adoption:** 16/16 factory components use the DOM attribute form; 4/4 singleton modules (accessibility, empty, cityWeather, theme) use `_initDone`. Tallied 2026-05-28.

---

### 6. Listener attachment shape

**Canonical**

`addEventListener(..., { signal })` from an AbortController, in either form:

```js
// Long form
el.addEventListener('click', handler, { signal: this.abortController.signal });

// Short form (when one method attaches multiple listeners)
const { signal } = this.abortController;
el.addEventListener('click', handler, { signal });
el.addEventListener('keydown', handler, { signal });
```

Either form is acceptable; the choice between them is local readability.

**Why this canonical (principle)**

Listener teardown should be atomic by default. One `.abort()` releases every listener attached with the same signal — no per-listener bookkeeping, no enumeration loop, no chance of typo-induced silent leaks. The cost of per-handler storage (`this.handlers.<key> = fn`) is fragility: a missed key during teardown looks identical to working code at write time and only fails as a production leak. The JSD-09 rule exists specifically because per-handler shapes routinely drift between bind site and teardown site.

**Why not the alternatives**

- `this.handlers.<key> = fn; el.addEventListener('click', this.handlers.<key>)` then `destroy()` enumerates handlers — requires every key to round-trip exactly. Typos produce silent leaks.
- Raw paired `addEventListener` / `removeEventListener` — requires the same function reference at both sites. Easy to drift when handlers are re-bound or recreated.

**Carve-outs (NOT divergence)**

- **Two-phase lifecycle with subset cleanup.** When a component genuinely needs to release a strict subset of listeners (per-open-cycle handlers) while keeping others alive (instance-lifetime handlers), AbortController is structurally wrong — `.abort()` releases everything. Per-handler storage is correct because partial release is the requirement. Exemplar: [_js/nds-date-picker.js](_js/nds-date-picker.js) (handler stores around `bindNavigationEvents` / `bindActionButtons`, partial removal in `cleanup()` at L638, full removal in `destroy()` at L1999).
- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC`) scope a different lifetime (the element's, not the instance's). Out of scope.

**Audit behavior**

Flag any `this.handlers.<key> = fn` pattern in a file where the component does NOT have a detectable two-phase lifecycle (i.e., does NOT have a `cleanup()` method removing a subset of `this.handlers.<key>` keys, paired with a `destroy()` removing the rest). Files with the documented two-phase shape pass.

**Current adoption:** 15/16 files using listener-attachment patterns use the `{ signal }` shape; 1 file (date-picker) uses `this.handlers.<key>` with documented two-phase rationale. Tallied 2026-05-28.

---

## Audit integration

When `nds-js-audit` runs:

- **Single-file `dry`:** reads PERSONA.md, runs JSD-15 against the canonicals via each entry's "Audit behavior" check. The skip banner ("JSD-15 skipped in single-file mode") goes away. A finding looks like: *"L227 uses `this._ac` against entry 1's canonical `this.abortController` ([SKILL.md PERSONA.md entry 1](.claude/skills/nds-js-audit/PERSONA.md)). Migrate, or open a Phase 7 EVOLVE proposal to revise."*
- **Full-tree `dry`:** runs the same checks across every file. Output additionally reports the per-entry "current adoption" — a refactor-progress signal. Adoption drift surfaces as a Phase 7 EVOLVE proposal: "Entry N adoption dropped from X/Y to (X−2)/Y; new files in `_js/nds-foo.js`, `_js/nds-bar.js` diverge. Migrate or revise?"
- **Phase 7 EVOLVE:** third proposal source (alongside "Gaps observed" and "Dead-rule candidates"). Persona drift surfaces when (a) the corpus has diverged from a canonical and a migration is now a meaningful refactor, OR (b) new evidence suggests revising the canonical itself.

The persona never silently changes. Edits go through Phase 7 with explicit user approval, same as catalog rule changes.

---

## Update workflow

PERSONA.md updates flow through four patterns:

**Pattern A — audit flags a divergent file.** Two outcomes, user picks per file:
- File is wrong → fix batch migrates. Canonical unchanged.
- Canonical is wrong/incomplete → Phase 7 EVOLVE proposes a revision. The proposal includes the file's reasoning ("here's why this code chose differently") so the user can argue from data. Accept = canonical revised; reject = file gets migrated.

**Pattern B — audit surfaces a concept the persona doesn't anticipate.** New entry needed, or existing entry needs a new carve-out. Phase 7 EVOLVE proposes the addition with motivating findings cited inline.

**Pattern C — user makes a deliberate decision.** User explicitly directs an edit (e.g., "switch entry 3.2 canonical from `show()`/`hide()` to `expand()`/`collapse()`"). The edit lands directly per the user's instruction; the audit-report trail records when and why.

**Pattern D — tree-wide refactor lands.** A future commit migrates files to match a canonical. Persona unchanged — the canonical was already the target. The "Current adoption" lines update on the next full-tree run; no PERSONA.md edit needed.

**What never triggers an update:**
- "11 new files used `_ac`" — migration target, not canonical revision. The canonical doesn't track adoption percentages.
- "The corpus changed" — would chase noise. The canonical is the deliberate choice; the corpus catches up.

The audit-report trail in `.claude/audit-reports/` is the history. Each saved report is a marker: "as of this commit, the codebase looked like X against the persona." Diff-vs-Run-N sections record convergence (or drift) over time.
