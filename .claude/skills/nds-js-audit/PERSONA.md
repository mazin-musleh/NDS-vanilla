# NDS JS Code Persona

The project's chosen conventions for `_js/nds-*.js` component files, documented as concrete canonical forms backed by principle reasoning. Consulted by `nds-js-audit` so JSD-15 ("cross-file pattern consistency") works in single-file mode and so the audit measures code against deliberate choices instead of against the loudest accidental majority.

**Scope:** the component files under `_js/nds-*.js`. Excludes `nds-core.js` (publishes the shared utility surface, different conventions), `nds-loader.js` (orchestration shape), `nds-showcase.js` (demo-page wiring).

---

## How this document is structured

Each entry has four fields, each doing one job:

- **Canonical** — the concrete form the audit checks against. A literal string, attribute name, method name, or shape. Greppable.
- **Why (and rejected alternatives)** — the principle defending the choice, plus the rejected forms with their cost, so a future contributor can argue from data rather than revert from inattention. Not load-bearing for the audit itself.
- **Carve-outs (NOT divergence)** — concept-different cases that share surface vocabulary but follow a different principle. The audit must NOT flag these. Cite a symbol (file + identifier) when possible.
- **Audit behavior** — the literal check `nds-js-audit` performs. A yes/no test, not a judgment call.

If the canonical and the corpus disagree, the audit flags the divergent files as migration targets. The canonical changes only through Phase 7 EVOLVE, which surfaces a revision candidate when the divergent file's cited reasoning clears the evolve quality bar — applied only on the user's explicit `evolve` go and recorded in the `## Catalog evolved (applied)` block. Raw adoption counts or "the corpus changed" never trigger a revision — those are migration targets; the canonical is the deliberate choice, and the corpus catches up. Citation hygiene (expiring a resolved motivating finding, healing a drifted symbol-anchored citation) needs no quality bar — it is reported under `Bookkeeping reconciled` so the change is never silent, and it too lands only on the explicit `evolve` go (concurrent audit sessions share this file).

*(No maturity ladder, no adoption tallies, no counting ledger — divergence detection, not counting, is what the persona is for. Do not add one: cross-run counting depends on a saved-report trail the skill never recommends creating.)*

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

**Why (and rejected alternatives)**

Clarity beats brevity for fields read during teardown work and code review: a reader scanning a class for "where does teardown happen?" must spot the controller without parsing abbreviations, and the characters an abbreviation saves are paid back at every read. Rejected: `this._ac` / `this._ctrl` / `this.ac` — vocabulary tax, and the leading underscore misclassifies a lifecycle field as an implementation detail (lifecycle naming should be searchable, not hidden); `this.controller` — ambiguous when a component has more than one controller (fetch, render, animation).

**Carve-outs (NOT divergence)**

- **Secondary controllers** that scope a sub-concern, named for what they scope: `this.fetchAbortController` (`_js/nds-filter.js`, `_js/nds-autocomplete.js` — each paired with the primary `this.abortController`, aborting one in-flight request without touching listeners), `this.renderAbortController` (`_js/nds-chart.js`, scopes one render cycle), `this.dragAbortController` (`_js/nds-upload.js`, re-armed per dropbox cycle).
- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC` in `_js/nds-filter.js`) are scoped to the element's lifetime, not the instance's. Structurally different shape; the leading underscore IS correct here because the property is on a foreign element.

**Audit behavior**

Flag any `this.<name> = new AbortController()` where `<name>` matches one of: ≤4 characters, OR begins with `_` followed by ≤3 lowercase letters (`_ac`, `_ctrl`, `_fp`), OR equals `controller`. Secondary controllers with domain-named full words (any name containing `AbortController` as a suffix) pass.

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

**Why (and rejected alternatives)**

`destroy()` matches the JS-component ecosystem (Web Components pairings, Vue/React class lifecycles, Backbone), so consumers writing `instance.destroy()` never have to ask "is it destroy, teardown, cleanup, or dispose?" — project-local lifecycle vocabulary is friction for every consumer. Rejected: `cleanup()` — too generic, reads as per-action tidy-up and collides with the legitimate per-cycle use (carve-out below); `teardown()` — test-framework-flavored; `dispose()` — C#/IDisposable-flavored, foreign vocabulary with no upside.

**Carve-outs (NOT divergence)**

- **Two-phase lifecycle** where `cleanup()` releases per-open-cycle handlers and `destroy()` releases instance-lifetime handlers + invokes `cleanup()` first. Exemplar: `_js/nds-date-picker.js`. The principle: per-cycle release uses `cleanup()`; instance release uses `destroy()`. They coexist.

**Audit behavior**

Flag any component that exposes `teardown()` or `dispose()` as the public instance-lifetime teardown, OR exposes only `cleanup()` without the two-phase shape detectable in the file (i.e., no separate `destroy()` declared AND no separate-subset teardown structure where `cleanup()` removes some handlers and other code removes the rest). Files exposing both `cleanup()` and `destroy()` for the documented two-phase shape are NOT flagged.

---

### 3. Lifecycle pair naming

The verb pair encodes the concept, not the DOM mutation. Two components making an element visible may need different verbs if the user mental models differ. Four concept buckets, each with its own canonical:

#### 3.1 Modal-like persistent overlays → `open()` / `close()`

**Canonical:** `open()` / `close()` as the public lifecycle pair.

**Concept:** the surface fully captures attention. Singleton-open. Focus-trapped (`NDS.trapFocus`) and typically backdrop-paired (`NDS.Backdrop.show`). Opening is a state transition for the whole page.

**Discriminator** (mechanically checkable): file invokes `NDS.trapFocus` OR `NDS.Backdrop.show`, OR enforces singleton-open another way — delegating its lifecycle to `NDS.Dropmenu` (`NDS.Dropmenu.create` + `open()`/`close()` passthrough: `_js/nds-tooltip.js`, `_js/nds-autocomplete.js`), closing every other open instance on open (`_js/nds-dropmenu.js` `_openDropmenus`), or a deliberate no-trap disclosure panel that still owns the page's attention (`_js/nds-accessibility.js`, `"No inert / no backdrop"` comment).

**Examples:** `_js/nds-modal.js`, `_js/nds-ipv.js`, `_js/nds-dropmenu.js`, `_js/nds-tooltip.js`, `_js/nds-autocomplete.js`, `_js/nds-accessibility.js`.

#### 3.2 Per-section toggleable → `show()` / `hide()`

**Canonical:** `show()` / `hide()` as the public lifecycle pair.

**Concept:** multiple instances can be visible simultaneously (sections within a single component, submenus within a drawer). No focus trap; no backdrop; no attention capture. The mutation is a per-instance visibility flip, not a singleton state transition.

**Discriminator:** multi-instance simultaneous visibility AND file does NOT invoke `NDS.trapFocus` / `NDS.Backdrop.show`.

**Examples:** `_js/nds-accordion.js`, `_js/nds-drawer.js` (`showSubmenu` / `hideSubmenu`).

#### 3.3 Transient self-dismissing surfaces → `create({...})` + `dismiss(target)`

**Canonical:** factory `create({...})` for the constructor entry, `dismiss(target)` for the explicit close. No symmetric `open()` — the factory call IS the open.

**Concept:** finite lifetime, constructed on demand by consumer, auto-dismisses on timer or user action. Consumer doesn't hold a long-lived reference to open/close.

**Discriminator:** module exposes `NDS.<Name>.create({...})` AND `NDS.<Name>.dismiss(target)` (or `dismissAll(scope)`) AND the created surface has a finite lifetime independent of the API caller.

**Examples:** `_js/nds-alert.js`, `_js/nds-feedback.js`.

#### 3.4 Binary toggle with symmetric setup → `toggle()` only

**Canonical:** a single `toggle()` method; no separate `open()` / `close()`.

**Concept:** state is fully binary (light/dark, expanded/collapsed). Flipping in either direction is the same operation with a different result. No asymmetric setup work.

**Discriminator:** component exposes `toggle()` AND does NOT expose distinct `open()` / `close()` / `show()` / `hide()` for the same state axis.

**Examples:** `_js/nds-theme.js`, `_js/nds-expandable.js`, `_js/nds-mainnav.js` (`toggleDropdown`).

**Why (and rejected alternatives — whole entry)**

The pair reads as the concept reads. `open` evokes a doorway; `show` evokes revealing what was hidden; `dismiss` evokes a temporary visitor leaving; `toggle` evokes a binary flip. Forcing one pair onto all concepts loses information at the call site — a reader seeing `widget.show()` shouldn't have to know component context to figure out whether a modal is opening, a toast is being created, or a section is revealing. Rejected: one universal pair across all concepts — destroys concept information at the call site (vocabulary specificity is information; uniformity-for-its-own-sake erases it); pair invented per file — defeats the persona's purpose, a new contributor would have to learn N vocabularies for N components.

**Carve-outs (NOT divergence)**

- **Components that compose multiple concepts** can expose multiple pairs. Dropmenu has `toggle()` (entry point from trigger click) + `open()` / `close()` (the lifecycle). Both are honest. NOT divergence.

**Audit behavior**

For each component file:
1. Apply the discriminators (`NDS.trapFocus` / `NDS.Backdrop.show` invocation → 3.1; multi-instance no-backdrop → 3.2; factory-create with finite lifetime → 3.3; `toggle()`-only → 3.4).
2. Check the file's exposed lifecycle pair against the bucket's canonical.
3. If the file's concept is ambiguous (multiple discriminators match, or none match), record it as an open question in the report rather than flagging a finding — ambiguity does not clear the evolve bar, so nothing auto-changes.

---

### 4. Component console output prefix

**Canonical**

`'NDS <PascalCaseName>: <message>'` — `'NDS '`, then the component's PascalCase namespace name, then `': '`, then the human-readable message.

```js
console.warn('NDS Filter: target container not found');
console.error('NDS Modal: requires NDSBackdrop API. Please include nds-backdrop.js first.');
```

**Why (and rejected alternatives)**

Component-emitted diagnostics carry the component's identity at the start of the message so a developer can grep `NDS Filter` and find every diagnostic the filter component produced. The PascalCase form matches the JS-side namespace identity (`NDS.Filter`, `NDS.Modal`) rather than the CSS-class form, and the colon-space separator breaks prefix from message at a scannable point. Rejected: no prefix — un-greppable, loses identity in a noisy console; `[NDS.Filter]` bracket form — correct for API-namespace internals (core's `[NDS.i18n]`, loader's `[NDS:init]`) but implies sub-API identity components don't have; lowercase `nds-filter:` — matches the CSS class form, not the JS namespace identity.

**Carve-outs (NOT divergence)**

- `_js/nds-core.js` and `_js/nds-loader.js` use the bracket form `[NDS.<api>]` / `[NDS]` / `[NDS:init]` because they're API namespaces and orchestration, not components. Out of scope of this entry.
- **Programmatic-API-namespace modules** whose public surface is invoked as `NDS.<Name>.<method>(...)` (a sub-API, not a DOM-attached per-element component instance) may use the bracket form `[NDS.<Name>]` — same shape as core's `[NDS.i18n]`. Cite: `_js/nds-export.js` — `NDS.Export` (`export`/`csv`/`xls`/`pdf`/`collect`) is a stateless library/API namespace (loader-registered for detection only), so it emits `[NDS.Export] …`.

**Audit behavior**

Flag any component-file `console.warn(...)` or `console.error(...)` whose first string argument does not match `/^NDS [A-Z][A-Za-z]*: /`. Files using the bracket form for component output (e.g. `'[NDS Filter] ...'`) are flagged for migration. **Exception:** a module that is a programmatic-API namespace (public surface invoked as `NDS.<Name>.<method>(...)`, not a per-element DOM component — confirm via the carve-out) may use the bracket form `[NDS.<Name>]` and is NOT flagged.

---

### 5. Init guard sentinel

The guard's form follows the guard's scope. Two canonical shapes, and a set of scope-matched carve-outs below:

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

**Why (and rejected alternatives — whole entry)**

A factory creates per-element instances; the guard must distinguish "this specific element is initialized" from "any element of this type was once initialized," so the marker belongs on the element. A singleton has no per-element target to mark; pinning an attribute to `document.body` would pollute a shared namespace and force unrelated singletons to coordinate names. The guard's location should match the guard's scope. Rejected: factory using a closure flag — can't distinguish per-element state, re-init scans become impossible; singleton using a `document.body` attribute — namespace pollution; `window.nds<Name>Initialized` global flag — leaks state into the window namespace; acceptable only when the guard is genuinely cross-module (carve-out below).

**Carve-outs (NOT divergence)**

Each shape below matches its form to what it actually guards, so none is divergence:

- **Per-element scope, non-attribute form.** The marker lives on the element without being an attribute when the structure justifies it: a JS property on a document-sweeping controller (`_js/nds-forms.js` `_ndsInitialized` / `_ndsFormInitialized` / `_switchInitialized`) — per-element, just not CSS-selectable, so re-sweeps check inline; the instance expando where `create(el)` is idempotent through the back-ref (`_js/nds-date-picker.js` `_ndsDatePicker`) — the instance IS the init state and a parallel attribute channel could drift, so it must be gated on successful construction (JSD-18); or init's own DOM mutation as the marker (`_js/nds-customselect.js` `build()` checks the `.nds-dropmenu` class it stamps). A *registered* factory with a per-instance selector still prefers the attribute form so loader rescans can selector-filter — see Audit behavior step 7.
- **Resource scope, no flag at all.** When init is idempotent or deliberately re-armable, the resource IS the guard: `_js/nds-selection.js` `_controller` (nulled by `destroy()` so `init()` re-arms by design — a one-way flag would break the cycle), `_js/nds-share.js` `init()` (documented abort-and-rebind of its own `_abortController`), `_js/nds-fontLoading.js` `fontStates` (per-item dedup).
- **Cross-module scope, window flag.** A guard that must coordinate with sibling modules has no per-element target and belongs on `window`: `_js/nds-tables.js` `window.ndsTableClassObserverInitialized` (~L639), `window.ndsTabChangeHandlerInitialized` (~L652) and `window.ndsTableSubHandlerInitialized` (~L938), covering responsive-table class mutations, tab-change events, and the document-delegated sub-row toggle (independent of the sort/checkbox-gated `NDSTables` instance). Requires the inline comment named in Audit behavior step 4.
- **Sub-concern latch, named for what it latches.** A guard gating one arm of init — narrower than the module's own guard, so it carries a descriptive name instead of `_initDone`. Three shapes: one-time page-level setup inside a factory (document delegation, singleton observers, a body-appended sentinel) — `runtimeSet` guarding `setupRuntime` (`_js/nds-fab.js` ~L154), `togglesBound` guarding `bindToggles` (`_js/nds-panels.js` ~L287), both files carrying the canonical attribute for their own init; and per-branch latches in a singleton wiring independently-present widgets — `_js/nds-timeDate.js` `_dateInitDone` / `_clockInitDone`, whose declaration documents the reasoning ("The date and clock topbar widgets can appear independently, so the latches are separate — a page that ships only one widget can still wire the other if it's injected later"). One shared `_initDone` would latch on the first widget and strand the second. And the attribute form of the same idea — a second `data-nds-<sub-mode>-initialized` on the SAME element beside the component's canonical guard, gating an init arm the canonical one doesn't cover: `_js/nds-pagination.js` `data-nds-auto-pagination-initialized` (guards `setupAutoContainer`, while `data-nds-pagination-initialized` guards the manual sweep) and `_js/nds-tables.js` `data-nds-columns-initialized` (guards the column-toggle arm beside `data-nds-tables-initialized`). Discriminator for the attribute shape: the component's canonical guard is present on the element, and the second attribute names an init path it does not cover. Step 5's name check governs a singleton module's OWN guard only, and step 6's `data-nds-<name>-initialized` check governs the component's OWN guard only — neither fires on these.
- **CSS-contract reveal stamp on a foreign element.** An attribute a component writes on an element it does not own, consumed by critical CSS as a paint-release hook, is not that component's init guard — it names the region being revealed, so step 6's `data-nds-<name>-initialized` check must not fire on it. Cite: `_js/nds-pagination.js` `data-paged-initialized`, stamped on the paged CONTENT container (file header documents the crit-CSS hold it releases) while the component's own canonical `data-nds-pagination-initialized` stays on the nav. Discriminator: the attribute is written to a different element than the one the sweep guard reads.

**Audit behavior**

1. Classify the file via init pattern: iterates `querySelectorAll(...)` over content elements → factory (expect 5.1); binds only to `document.body` / `document.documentElement` / module-level state → singleton (expect 5.2).
2. Factory using `_initDone` or `window.<flag>` → flag.
3. Singleton using `data-nds-<name>-initialized` → flag.
4. Window-global flag requires an inline comment within 3 lines naming the cross-module observer concern; otherwise flag.
5. Singleton using a module-scope closure flag NOT named `_initDone` (e.g. `_installed`, `_wired`, `_ready`) → flag as a name divergence; migrate to `_initDone` or open a Phase 7 revision.
6. Factory whose per-element guard IS a DOM attribute but does NOT match `data-nds-<name>-initialized` (e.g. missing the `nds-` infix, like `data-swiper-initialized`) → flag as a name divergence; migrate or open a Phase 7 revision. Does NOT apply to the non-attribute carve-out above.
7. *Registered* factory with a per-instance selector using a JS-property guard (`el._ndsXxxInitialized`) where the attribute form would let loader rescans selector-filter → flag as a form divergence; migrate to `data-nds-<name>-initialized` or open a Phase 7 revision.
8. Singleton `init()` that arms listeners/observers/timers with NO guard at all — no flag, no resource-presence check, none of the repeat-safe shapes in the carve-outs — → flag (a re-run stacks or re-schedules work).

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

**Why (and rejected alternatives)**

Listener teardown should be atomic by default: one `.abort()` releases every listener attached with the same signal — no per-listener bookkeeping, no enumeration loop, no typo-induced silent leaks. Rejected: `this.handlers.<key> = fn` + teardown enumeration — every key must round-trip exactly; a missed key looks identical to working code at write time and only fails as a production leak (JSD-09 exists because these shapes routinely drift); raw paired `addEventListener` / `removeEventListener` — requires the same function reference at both sites, easy to drift when handlers are re-bound.

**Carve-outs (NOT divergence)**

- **Two-phase lifecycle with subset cleanup.** When a component genuinely needs to release a strict subset of listeners (per-open-cycle handlers) while keeping others alive, AbortController is structurally wrong — `.abort()` releases everything. Per-handler storage is correct because partial release is the requirement. Exemplar: `_js/nds-date-picker.js` (handler stores around `bindNavigationEvents` / `bindActionEvents`; partial removal in `cleanup()`, full removal in `destroy()`).
- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC`) scope a different lifetime (the element's, not the instance's). Out of scope.
- **Pooled-handle abort bridge.** `signal.addEventListener('abort', off)` that releases an `NDS.on*` unsubscribe handle is the canonical way to tie a pooled subscription to the same teardown as the signal's listeners — the pooled helpers take no `signal`, so there is no native alternative to strip it in favour of. Exemplars: the `offResize` bridges in `_js/nds-panels.js` `_open` (~L89) and `_js/nds-accessibility.js` (~L480, ~L1042). Discriminator vs Audit behavior #5: that shape wraps a plain `removeEventListener` which `{ signal }` covers natively; this one has no `{ signal }` route at all.

**Audit behavior**

Flag any of these signal-less shapes in a file WITHOUT the documented two-phase-subset need (no `cleanup()` removing a subset of stored handlers paired with a `destroy()` removing the rest):
1. `this.handlers.<key> = fn` map stores with teardown enumeration.
2. Instance-property handler stores + straight-line `removeEventListener` teardown.
3. Raw paired `addEventListener`/`removeEventListener` with no AbortController anywhere in the instance.
4. `cloneNode(true)` + `replaceWith` listener-nuking teardown. It destroys consumer-attached listeners along with the component's own, and the clone inherits the init-guard attribute while losing every expando — leaving an element that is stamped, instance-less, and permanently ineligible for re-init.
5. Manual removal bookkeeping inside a `signal.addEventListener('abort', …)` callback where passing `{ signal }` to the original `addEventListener` would do it natively.

Files with the documented two-phase shape pass.

**Two-controller split, not a two-phase carve-out.** When a subset of listeners has a genuinely shorter lifetime than the instance, prefer a second domain-named controller over per-handler bookkeeping — both lifetimes stay atomic. Cite: `_js/nds-upload.js` `dragAbortController`, re-armed by `_initDragAndDrop` / aborted by `_removeDragAndDrop` on every `dropbox` state toggle, alongside the instance-lifetime `abortController`. The entry-2 `cleanup()`+`destroy()` carve-out remains for the case a split can't serve — `_js/nds-date-picker.js`, where the two phases share individual handlers rather than partitioning cleanly.

---

## Audit integration

When `nds-js-audit` runs:

- **Single-file `dry`:** reads PERSONA.md and runs JSD-15 against the canonicals via each entry's "Audit behavior" check (no skip banner). A finding looks like: *"L227 uses `this._ac` against entry 1's canonical `this.abortController`. Migrate, or revise the canonical (Phase 7)."*
- **Full-tree `dry`:** same checks across every file. Corpus-wide divergence can additionally surface as a Phase 7 persona-drift refinement.
- **Phase 7 EVOLVE:** persona drift is the third refinement source (alongside "Gaps observed" and "Dead-rule candidates"), surfaced when (a) the corpus has diverged from a canonical and a migration is now a meaningful refactor, OR (b) new evidence suggests revising the canonical itself. Gated by the evolve quality bar. Citation hygiene (expiring resolved motivating findings, healing drifted citations by their symbol) becomes a candidate without a bar and is reported under `Bookkeeping reconciled`.

Persona edits are never silent and never unprompted — every candidate lands in the report's `## Catalog evolved — candidates` block, and this file is edited only on the user's explicit `evolve` go.

---

## Update workflow

- **Audit flags a divergent file.** Either the file is wrong → a fix batch migrates it (canonical unchanged), or the canonical is wrong/incomplete → Phase 7 auto-revises it when the file's cited reasoning clears the bar (otherwise the file is the migration target).
- **Audit surfaces an unanticipated concept.** Phase 7 adds a new entry or a carve-out, with motivating findings cited.
- **User makes a deliberate decision** (e.g. "switch entry 3.2 to `expand()`/`collapse()`"). The edit lands directly per instruction.
- **A motivating finding's file gets migrated.** The rule stays; Phase 7 **deletes** the stale "Motivating finding:" pointer on the next run that observes zero divergence — it does not rewrite it into a "Resolved (was …)" note. Every entry here is read on every run, so a resolved example is pure carrying cost against a rule that already states what to detect.
- **A cited symbol drifts.** Phase 7 heals it by the symbol, not the line: citations are symbol-anchored (the greppable identifier/token is authoritative, the line number a decaying hint). Symbol moved → rewrite the line hint; symbol gone → flag the citation expired rather than silently trusting it. New citations must name a symbol, never a bare line.

**What never triggers a canonical revision:** raw adoption counts ("11 new files used `_ac`") or "the corpus changed" — those are migration targets, not canonical revisions. The canonical is the deliberate choice; the corpus catches up.
