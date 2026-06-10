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

If the canonical and the corpus disagree, the audit flags the divergent files as migration targets. The canonical changes only through Phase 7 EVOLVE, which auto-applies a revision only when the divergent file's cited reasoning clears the evolve quality bar and records it in the `## Catalog evolved` block. Raw adoption counts or "the corpus changed" never trigger a revision — those are migration targets; the canonical is the deliberate choice, and the corpus catches up. Citation hygiene (expiring a resolved motivating finding, healing a drifted symbol-anchored citation) needs no quality bar — it is reported under `Bookkeeping reconciled` so the change is never silent.

*(The former maturity ladder and per-entry adoption tallies were removed 2026-06-10: the corpus had converged — every entry sat at full adoption — and the `settled` rung depended on a saved-report trail the skill never recommends creating. Divergence detection, not counting, is what the persona is for; the CSS audit retired its MATURITY.md ledger for the same reason. Do not re-add a counting ledger.)*

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

- **Secondary controllers** that scope a sub-concern, named for what they scope: `this.fetchAbortController` (`_js/nds-filter.js`, paired with the primary `this.abortController`), `this.renderAbortController` (`_js/nds-chart.js`, scopes one render cycle), `this.instanceAbortController` (`_js/nds-ipv.js`).
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
- **Locally-scoped `function cleanup()` declarations** inside transitionend handlers (`_js/nds-accessibility.js`, `_js/nds-drawer.js`, `_js/nds-dropmenu.js`, `_js/nds-sidemenu.js`) are closure utilities, not public teardown methods. They share the word but not the meaning.

**Audit behavior**

Flag any component that exposes `teardown()` or `dispose()` as the public instance-lifetime teardown, OR exposes only `cleanup()` without the two-phase shape detectable in the file (i.e., no separate `destroy()` declared AND no separate-subset teardown structure where `cleanup()` removes some handlers and other code removes the rest). Files exposing both `cleanup()` and `destroy()` for the documented two-phase shape are NOT flagged.

---

### 3. Lifecycle pair naming

The verb pair encodes the concept, not the DOM mutation. Two components making an element visible may need different verbs if the user mental models differ. Four concept buckets, each with its own canonical:

#### 3.1 Modal-like persistent overlays → `open()` / `close()`

**Canonical:** `open()` / `close()` as the public lifecycle pair.

**Concept:** the surface fully captures attention. Singleton-open. Focus-trapped (`NDS.trapFocus`) and typically backdrop-paired (`NDS.Backdrop.show`). Opening is a state transition for the whole page.

**Discriminator** (mechanically checkable): file invokes `NDS.trapFocus` OR `NDS.Backdrop.show`.

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
- **Programmatic-API-namespace modules** whose public surface is invoked as `NDS.<Name>.<method>(...)` (a sub-API, not a DOM-attached per-element component instance) may use the bracket form `[NDS.<Name>]` — same shape as core's `[NDS.i18n]`. Cite: `_js/nds-export.js` — `NDS.Export` (`export`/`csv`/`xls`/`pdf`/`collect`) is a stateless library/API namespace, so it emits `[NDS.Export] …`. (This carve-out tends to coincide with JSD-07's "declarative-delegation library" exemption — a module that is an API namespace there is usually one here too.)

**Audit behavior**

Flag any component-file `console.warn(...)` or `console.error(...)` whose first string argument does not match `/^NDS [A-Z][A-Za-z]*: /`. Files using the bracket form for component output (e.g. `'[NDS Filter] ...'`) are flagged for migration. **Exception:** a module that is a programmatic-API namespace (public surface invoked as `NDS.<Name>.<method>(...)`, not a per-element DOM component — confirm via the carve-out) may use the bracket form `[NDS.<Name>]` and is NOT flagged.

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

**Why (and rejected alternatives — whole entry)**

A factory creates per-element instances; the guard must distinguish "this specific element is initialized" from "any element of this type was once initialized," so the marker belongs on the element. A singleton has no per-element target to mark; pinning an attribute to `document.body` would pollute a shared namespace and force unrelated singletons to coordinate names. The guard's location should match the guard's scope. Rejected: factory using a closure flag — can't distinguish per-element state, re-init scans become impossible; singleton using a `document.body` attribute — namespace pollution; `window.nds<Name>Initialized` global flag — leaks state into the window namespace; acceptable only when the guard is genuinely cross-module (carve-out below).

**Carve-outs (NOT divergence)**

- **Window-scope flags for tree-wide observers.** `_js/nds-tables.js` (`window.ndsTableClassObserverInitialized` ~L394, `window.ndsTabChangeHandlerInitialized` ~L407) coordinates two cross-module observers (responsive-table class mutations, tab-change events). The window flag is the right shape for that specific concern because there's no per-element target AND the guard needs to coordinate with sibling modules. Not divergence.
- **JS-property per-element guards on document-sweeping controllers.** A factory-style controller that sweeps the whole document (rather than a registered per-instance selector) MAY mark each visited element with a JS property (`el._ndsXxxInitialized`) instead of the canonical attribute. The property IS on the element (satisfying 5.1's principle) and distinguishes per-element init; it just isn't CSS-selectable, so re-sweeps check the flag inline rather than filtering via `:not([data-…-initialized])`. Exemplar: `_js/nds-forms.js` (`_ndsInitialized` / `_ndsFormInitialized` / `_switchInitialized` markers). Not divergence. (A *registered* factory with a per-instance selector should still prefer the attribute form so the loader's rescan can selector-filter.)

**Audit behavior**

1. Classify the file via init pattern: iterates `querySelectorAll(...)` over content elements → factory (expect 5.1); binds only to `document.body` / `document.documentElement` / module-level state → singleton (expect 5.2).
2. Factory using `_initDone` or `window.<flag>` → flag.
3. Singleton using `data-nds-<name>-initialized` → flag.
4. Window-global flag requires an inline comment within 3 lines naming the cross-module observer concern; otherwise flag.
5. Singleton using a module-scope closure flag NOT named `_initDone` (e.g. `_installed`, `_wired`, `_ready`) → flag as a name divergence; migrate to `_initDone` or open a Phase 7 revision. Resolved (was the motivating finding): `_js/nds-voice-input.js` migrated `var _installed` → `var _initDone`.
6. Factory whose per-element guard IS a DOM attribute but does NOT match `data-nds-<name>-initialized` (e.g. missing the `nds-` infix, like `data-swiper-initialized`) → flag as a name divergence; migrate or open a Phase 7 revision. Does NOT apply to the JS-property carve-out above. Resolved (was the motivating finding): `_js/nds-swiper.js` migrated `data-swiper-initialized` → `data-nds-swiper-initialized`.

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

- **Two-phase lifecycle with subset cleanup.** When a component genuinely needs to release a strict subset of listeners (per-open-cycle handlers) while keeping others alive, AbortController is structurally wrong — `.abort()` releases everything. Per-handler storage is correct because partial release is the requirement. Exemplar: `_js/nds-date-picker.js` (handler stores around `bindNavigationEvents` / `bindActionButtons`; partial removal in `cleanup()`, full removal in `destroy()`).
- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC`) scope a different lifetime (the element's, not the instance's). Out of scope.

**Audit behavior**

Flag any `this.handlers.<key> = fn` pattern in a file where the component does NOT have a detectable two-phase lifecycle (i.e., does NOT have a `cleanup()` method removing a subset of `this.handlers.<key>` keys, paired with a `destroy()` removing the rest). Files with the documented two-phase shape pass.

---

### 7. No split components (prohibition; mechanism removed 2026-06-04)

**Canonical**

NDS does not use per-component eager-shell + lazy-behavior splits. Full rationale and the chosen alternatives (cold-init in main; wholesale de-criticalization for delegate-safe components) live in `CLAUDE.md` → "JS Bundles & Shrinking the Critical Bundle" and SKILL.md Phase 2 → "Split components were removed".

**Discriminator** (mechanically checkable): any `_js/nds-X__delegated.js` file, or any reference to `_installBehavior`, `_deferBehavior`, `NDS.loadSplit`, `window.__NDS_SPLIT`, or a `// SPLIT COMPONENT` banner.

**Audit behavior**

Flag any discriminator match as a regression — the split pattern is deliberately retired; reintroducing it contradicts CLAUDE.md. Route the fix to cold-init-in-main, or to wholesale de-criticalization if the component is delegate-safe (drop `critical: true` + move the whole file to the delegated `@bundles` list, Accordion-style — that is NOT a split and remains valid).

---

## Audit integration

When `nds-js-audit` runs:

- **Single-file `dry`:** reads PERSONA.md and runs JSD-15 against the canonicals via each entry's "Audit behavior" check (no skip banner). A finding looks like: *"L227 uses `this._ac` against entry 1's canonical `this.abortController`. Migrate, or revise the canonical (Phase 7)."*
- **Full-tree `dry`:** same checks across every file. Corpus-wide divergence can additionally surface as a Phase 7 persona-drift refinement.
- **Phase 7 EVOLVE:** persona drift is the third refinement source (alongside "Gaps observed" and "Dead-rule candidates"), surfaced when (a) the corpus has diverged from a canonical and a migration is now a meaningful refactor, OR (b) new evidence suggests revising the canonical itself. Gated by the evolve quality bar. Citation hygiene (expiring resolved motivating findings, healing drifted citations by their symbol) is applied without a bar and reported under `Bookkeeping reconciled`.

Persona edits are never silent — every edit lands in the report's `## Catalog evolved` block. The user reverts via git if they disagree.

---

## Update workflow

- **Audit flags a divergent file.** Either the file is wrong → a fix batch migrates it (canonical unchanged), or the canonical is wrong/incomplete → Phase 7 auto-revises it when the file's cited reasoning clears the bar (otherwise the file is the migration target).
- **Audit surfaces an unanticipated concept.** Phase 7 adds a new entry or a carve-out, with motivating findings cited.
- **User makes a deliberate decision** (e.g. "switch entry 3.2 to `expand()`/`collapse()`"). The edit lands directly per instruction.
- **A motivating finding's file gets migrated.** The rule stays; Phase 7 expires the stale "Motivating finding:" pointer (rewrites it to "Resolved (was the motivating finding): …") on the next run that observes zero divergence. Precedent: voice-input `_installed`→`_initDone` and swiper `data-swiper-initialized`→`data-nds-swiper-initialized`.
- **A cited symbol drifts.** Phase 7 heals it by the symbol, not the line: citations are symbol-anchored (the greppable identifier/token is authoritative, the line number a decaying hint). Symbol moved → rewrite the line hint; symbol gone → flag the citation expired rather than silently trusting it. New citations must name a symbol, never a bare line.

**What never triggers a canonical revision:** raw adoption counts ("11 new files used `_ac`") or "the corpus changed" — those are migration targets, not canonical revisions. The canonical is the deliberate choice; the corpus catches up.
