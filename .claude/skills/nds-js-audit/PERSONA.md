# NDS JS Code Persona

The project's chosen conventions for `_js/nds-*.js` component files, documented as concrete canonical forms backed by principle reasoning. Consulted by `nds-js-audit` so JSD-15 ("cross-file pattern consistency") works in single-file mode and so the audit measures code against deliberate choices instead of against the loudest accidental majority.

**Scope:** the component files under `_js/nds-*.js`. Excludes `nds-core.js` (publishes the shared utility surface, different conventions), `nds-loader.js` (orchestration shape), `nds-docs.js` (docs-site builder). Exception: entry 7 (public-surface banner) uses its own wider scope — the `SCOPE` array in `scripts/check-banners.mjs`, which includes `nds-core.js` and `nds-loader.js`. Entry 11 (layers) covers `nds-core.js`, the bases and the loader as well. Entry 12 (every name has a rule) covers the whole of `_js/`.

---

## How this document is structured

Each entry has four fields, each doing one job:

- **Canonical** — the concrete form the audit checks against. A literal string, attribute name, method name, or shape. Greppable.
- **Why (and rejected alternatives)** — the principle defending the choice, plus the rejected forms with their cost, so a future contributor can argue from data rather than revert from inattention. Not load-bearing for the audit itself.
- **Carve-outs (NOT divergence)** — concept-different cases that share surface vocabulary but follow a different principle. The audit must NOT flag these. Cite a symbol (file + identifier) when possible.
- **Audit behavior** — the literal check `nds-js-audit` performs. A yes/no test, not a judgment call.

If the canonical and the corpus disagree, the audit flags the divergent files as migration targets. The canonical changes only through Phase 7 EVOLVE, which surfaces a revision candidate when the divergent file's cited reasoning clears the evolve quality bar — applied only on the user's explicit `evolve` go and recorded in the `## Catalog evolved (applied)` block. Raw adoption counts or "the corpus changed" never trigger a revision — those are migration targets; the canonical is the deliberate choice, and the corpus catches up. Citation hygiene (expiring a resolved motivating finding, healing a drifted symbol-anchored citation) needs no quality bar — it is reported under `Bookkeeping reconciled` so the change is never silent, and it too lands only on the explicit `evolve` go (concurrent audit sessions share this file).

*(No maturity ladder, no adoption tallies, no counting ledger — divergence detection, not counting, is what the persona is for. Do not add one: cross-run counting depends on a report trail the skill does not keep — reports live in-conversation only, git is the archive.)*

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

- **Secondary controllers** that scope a sub-concern, named for what they scope: `this.fetchAbortController` (`_js/nds-filter.js`, `_js/nds-autocomplete.js` — each paired with the primary `this.abortController`, aborting one in-flight request without touching listeners) and `this.renderAbortController` (`_js/nds-chart.js`, scopes one render cycle).
- **Per-element AbortControllers** are scoped to the element's lifetime, not the instance's. They live in a module `WeakMap` keyed by the element, never on the element (entry 12 rule 14), and the map is named for what it holds, ending in `AbortControllers` (`filterAbortControllers`).
- The `_` rule (entry 12 rule 11) leaves these names plain: the reason above holds, and the banner, not the mark, is the contract.

**Audit behavior**

Flag any `this.<name> = new AbortController()` where `<name>` is neither `abortController` nor ends in `AbortController` — that covers ≤4-character names, `_ac` / `_ctrl` / `_fp`, `controller`, and mixed-case abbreviations like `_docAC`. Secondary controllers with domain-named full words (any name containing `AbortController` as a suffix) pass. Flag a `WeakMap` that holds AbortControllers and whose name does not end in `AbortControllers`.

---

### 2. Instance teardown method

**Canonical**

`destroy()` is the public method that releases everything the instance owns.

```js
destroy() {
    this.abortController.abort();
    this._offDomAdds.forEach(off => off());
    this._root.removeAttribute('data-nds-<name>-initialized');
}
```

**Why (and rejected alternatives)**

`destroy()` is what the widget libraries a consumer already uses call it (Swiper, Chart.js, Choices.js, flatpickr, Splide, Tippy), so consumers writing `instance.destroy()` never have to ask "is it destroy, teardown, cleanup, or dispose?" — project-local lifecycle vocabulary is friction for every consumer. Rejected: `cleanup()` — too generic, reads as per-action tidy-up and collides with the legitimate per-cycle use (carve-out below); `teardown()` — test-framework-flavored; `dispose()` — Bootstrap 5's name, but every NDS release already ships `destroy()`, so a switch breaks every consumer for no gain.

**Carve-outs (NOT divergence)**

- **Two-phase lifecycle** where `cleanup()` releases per-open-cycle handlers and `destroy()` releases instance-lifetime handlers + invokes `cleanup()` first. Exemplar: `_js/nds-date-picker.js`. The principle: per-cycle release uses `cleanup()`; instance release uses `destroy()`. They coexist.

**Audit behavior**

Flag any component that exposes `teardown()` or `dispose()` as the public instance-lifetime teardown, OR exposes only `cleanup()` without the two-phase shape detectable in the file (i.e., no separate `destroy()` declared AND no separate-subset teardown structure where `cleanup()` removes some handlers and other code removes the rest). Files exposing both `cleanup()` and `destroy()` for the documented two-phase shape are NOT flagged.

---

### 3. Lifecycle pair naming

The verb pair encodes the concept, not the DOM mutation. Two components making an element visible may need different verbs if the user mental models differ. Four concept buckets, each with its own canonical:

#### 3.1 Modal-like persistent overlays → `open()` / `close()`

**Canonical:** `open()` / `close()` as the public lifecycle pair.

**Concept:** singleton-open: the surface is the one open at a time, and opening it closes or covers any other. Opening is a state transition for the whole page. The strongest form also traps focus and dims the page: a `<dialog>` opened with `showModal()`, or `NDS.trapFocus` with `NDS.Backdrop.show`. A menu or tooltip that closes the others on open is the light form.

**Discriminator** (mechanically checkable): file invokes `showModal()`, `NDS.trapFocus` OR `NDS.Backdrop.show`, OR enforces singleton-open another way — delegating its lifecycle to `NDS.Dropmenu` (`NDS.Dropmenu.create` + `open()`/`close()` passthrough: `_js/nds-autocomplete.js`) or to `NDS.Panel`, whose `<dialog>` owns the page's attention (`_js/nds-accessibility.js` `NDS.Panel?.open`), or closing every other open instance on open (`_js/nds-dropmenu.js` `openDropmenus`, `_js/nds-tooltip.js` `openTooltip`).

**Examples:** `_js/nds-modal.js`, `_js/nds-ipv.js`, `_js/nds-dropmenu.js`, `_js/nds-tooltip.js`, `_js/nds-autocomplete.js`, `_js/nds-accessibility.js`.

#### 3.2 Per-section toggleable → `show()` / `hide()`

**Canonical:** `show()` / `hide()` when the method acts on the surface the instance IS. When the method instead takes an index or a child reference and acts on one item WITHIN a container instance, the verb follows the state vocabulary that item's markup already carries — `openItem(i)` / `closeItem(i)` against `data-state="open"` + `aria-expanded`, `showX` / `hideX` against a visibility flip. The suffix names the target; the verb matches the attribute a reader will inspect in devtools.

**Concept:** multiple instances can be visible simultaneously (sections within a single component, submenus within a drawer). No focus trap; no backdrop; no attention capture. The mutation is a per-instance visibility flip, not a singleton state transition.

**Discriminator:** multi-instance simultaneous visibility AND file does NOT invoke `showModal()`, `NDS.trapFocus` / `NDS.Backdrop.show`. Then: does the method act on the instance's own surface (bare `show()`/`hide()`) or on an addressed child (suffixed pair, verb from the child's state vocabulary)?

**Examples:** `_js/nds-accordion.js` — `openItem(i)` / `closeItem(i)` / `toggleItem(i)` on the container instance; the item's markup contract is `data-state="open"` plus `aria-expanded`, so `open`/`close` is the verb a reader can verify against the DOM. `_js/nds-drawer.js` `showSubmenu` / `hideSubmenu` — module-private functions, not a public instance pair; cited for the naming shape only.

**Why the verb follows the markup.** It is what a consumer inspects while debugging and what CSS selects on. The events follow it too (entry 8): Accordion's `nds:accordion:shown` / `hidden` became `opened` / `closed` in 2.0.0, so the markup, the methods and the events all say `open`.

#### 3.3 Transient self-dismissing surfaces → `create({...})` + `dismiss(target)`

**Canonical:** factory `create({...})` for the constructor entry, `dismiss(target)` for the explicit close. No symmetric `open()` — the factory call IS the open.

**Concept:** finite lifetime, constructed on demand by consumer, auto-dismisses on timer or user action. Consumer doesn't hold a long-lived reference to open/close.

**Discriminator:** module exposes `NDS.<Name>.create({...})` AND `NDS.<Name>.dismiss(target)` (or `dismissAll(scope)`) AND the created surface has a finite lifetime independent of the API caller.

**Examples:** `_js/nds-alert.js`, `_js/nds-feedback.js`.

#### 3.4 Binary toggle with symmetric setup → `toggle()` only

**Canonical:** a single `toggle()` method; no separate `open()` / `close()`.

**Concept:** state is fully binary (light/dark, expanded/collapsed). Flipping in either direction is the same operation with a different result. No asymmetric setup work.

**Discriminator:** component exposes `toggle()` AND does NOT expose distinct `open()` / `close()` / `show()` / `hide()` for the same state axis.

**Examples:** `_js/nds-theme.js`.

**Why (and rejected alternatives — whole entry)**

The pair reads as the concept reads. `open` evokes a doorway; `show` evokes revealing what was hidden; `dismiss` evokes a temporary visitor leaving; `toggle` evokes a binary flip. Forcing one pair onto all concepts loses information at the call site — a reader seeing `widget.show()` shouldn't have to know component context to figure out whether a modal is opening, a toast is being created, or a section is revealing. Rejected: one universal pair across all concepts — destroys concept information at the call site (vocabulary specificity is information; uniformity-for-its-own-sake erases it); pair invented per file — defeats the persona's purpose, a new contributor would have to learn N vocabularies for N components.

**Carve-outs (NOT divergence)**

- **Components that compose multiple concepts** can expose multiple pairs. Dropmenu has `toggle()` (entry point from trigger click) + `open()` / `close()` (the lifecycle). Both are honest. NOT divergence.

**Audit behavior**

For each component file:
1. Apply the discriminators (`showModal()` / `NDS.trapFocus` / `NDS.Backdrop.show` invocation → 3.1; multi-instance no-backdrop → 3.2; factory-create with finite lifetime → 3.3; `toggle()`-only → 3.4).
2. Check the file's exposed lifecycle pair against the bucket's canonical.
3. If the file's concept is ambiguous (multiple discriminators match, or none match), record it as an open question in the report rather than flagging a finding — ambiguity does not clear the evolve bar, so nothing auto-changes.

---

### 4. Component console output prefix

**Canonical**

`'NDS <PascalCaseName>: <message>'` — `'NDS '`, then the component's PascalCase namespace name, then `': '`, then the human-readable message.

```js
console.warn('NDS Filter: target container not found');
console.error('NDS Modal: .nds-modal must be a <dialog>.', modal);
```

**Why (and rejected alternatives)**

Component-emitted diagnostics carry the component's identity at the start of the message so a developer can grep `NDS Filter` and find every diagnostic the filter component produced. The PascalCase form matches the JS-side namespace identity (`NDS.Filter`, `NDS.Modal`) rather than the CSS-class form, and the colon-space separator breaks prefix from message at a scannable point. Rejected: no prefix — un-greppable, loses identity in a noisy console; `[NDS.Filter]` bracket form — correct for API-namespace internals (core's `[NDS.i18n]`, loader's `[NDS:init]`) but implies sub-API identity components don't have; lowercase `nds-filter:` — matches the CSS class form, not the JS namespace identity.

**Carve-outs (NOT divergence)**

- `_js/nds-core.js` and `_js/nds-loader.js` use the bracket form `[NDS.<api>]` / `[NDS]` / `[NDS:init]` because they're API namespaces and orchestration, not components. Out of scope of this entry.
- **A base** (entry 11: `NDS.field`, `NDS.validation`, `NDS.dialog`) is an API namespace too and logs `[NDS.<name>] …`.
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

#### 5.2 Singleton modules → module-scope `initDone` closure flag

**Canonical**

```js
let initDone = false;
function init() {
    if (initDone) return;
    initDone = true;
    // wire body/document listeners, attach singleton observers
}
```

**Why (and rejected alternatives — whole entry)**

A factory creates per-element instances; the guard must distinguish "this specific element is initialized" from "any element of this type was once initialized," so the marker belongs on the element. A singleton has no per-element target to mark; pinning an attribute to `document.body` would pollute a shared namespace and force unrelated singletons to coordinate names. The guard's location should match the guard's scope. Rejected: factory using a closure flag — can't distinguish per-element state, re-init scans become impossible; singleton using a `document.body` attribute — namespace pollution; `window.nds<Name>Initialized` global flag — leaks state into the window namespace, and a second copy of the bundle is already stopped by the build (entry 12 rule 17).

**Carve-outs (NOT divergence)**

Each shape below matches its form to what it actually guards, so none is divergence:

- **Per-element scope, non-attribute form.** The marker lives on the element without being an attribute when the structure justifies it: a module `WeakSet` of the elements a document-sweeping controller has wired (`_js/nds-field.js`, `_js/nds-form.js`) — per-element, just not CSS-selectable, so re-sweeps check inline (never a JS property on the element: entry 12 rule 14); the instance expando where `create(el)` is idempotent through the back-ref (`_js/nds-date-picker.js` `ndsDatePicker`) — the instance IS the init state and a parallel attribute channel could drift, so it must be gated on successful construction (JSD-18); or init's own DOM mutation as the marker (`_js/nds-custom-select.js` `build()` checks the `.nds-dropmenu` class it stamps). A *registered* factory with a per-instance selector still prefers the attribute form so loader rescans can selector-filter — see Audit behavior step 7.
- **Resource scope, no flag at all.** When init is idempotent or deliberately re-armable, the resource IS the guard: `_js/nds-selection.js` `controller` (nulled by `destroy()` so `init()` re-arms by design — a one-way flag would break the cycle), `_js/nds-share.js` `init()` (documented abort-and-rebind of its own `abortController`).
- **Sub-concern latch, named for what it latches.** A guard gating one arm of init — narrower than the module's own guard, so it carries a descriptive name instead of `initDone`. Three shapes: one-time page-level setup inside a factory (document delegation, singleton observers, a body-appended sentinel) — `runtimeSet` guarding `setupRuntime` (`_js/nds-fab.js` ~L195), `togglesBound` guarding `addToggleListeners` (`_js/nds-panel.js` ~L462), both files carrying the canonical attribute for their own init; and per-branch latches in a singleton wiring independently-present widgets — `_js/nds-time-date.js` `dateInitDone` / `clockInitDone`, whose declaration documents the reasoning ("The date and clock topbar widgets can appear independently, so the latches are separate — a page that ships only one widget can still wire the other if it's injected later"). One shared `initDone` would latch on the first widget and strand the second. A singleton whose `init()` re-runs on purpose has no module-wide latch at all, only its arms': `_js/nds-theme.js` `wired` (listeners) / `reconciled` (saved-palette restore) — its `init()` comment: "the sync runs every time, the restore and the listeners once", so `mount()` / `refresh()` reach a later view's toggles. And the attribute form of the same idea — a second `data-nds-<sub-mode>-initialized` on the SAME element beside the component's canonical guard, gating an init arm the canonical one doesn't cover: `_js/nds-pagination.js` `data-nds-auto-pagination-initialized` (guards `setupAutoContainer`, while `data-nds-pagination-initialized` guards the manual sweep) and `_js/nds-table.js` `data-nds-columns-initialized` (guards the column-toggle arm beside `data-nds-table-initialized`). Discriminator for the attribute shape: the component's canonical guard is present on the element, and the second attribute names an init path it does not cover. Step 5's name check governs a singleton module's OWN guard only, and step 6's `data-nds-<name>-initialized` check governs the component's OWN guard only — neither fires on these.
- **CSS-contract reveal stamp on a foreign element.** An attribute a component writes on an element it does not own, consumed by critical CSS as a paint-release hook, is not that component's init guard — it names the region being revealed, so step 6's `data-nds-<name>-initialized` check must not fire on it. Cite: `_js/nds-pagination.js` `data-paged-initialized`, stamped on the paged CONTENT container (file header documents the crit-CSS hold it releases) while the component's own canonical `data-nds-pagination-initialized` stays on the nav. Discriminator: the attribute is written to a different element than the one the sweep guard reads.

**Audit behavior**

1. Classify the file via init pattern: iterates `querySelectorAll(...)` over content elements → factory (expect 5.1); binds only to `document.body` / `document.documentElement` / module-level state → singleton (expect 5.2).
2. Factory using `initDone` or `window.<flag>` → flag.
3. Singleton using `data-nds-<name>-initialized` → flag.
4. A component flag on `window` → flag: the build's once-per-page guard (entry 12 rule 17) stops a second copy of the bundle, so a module latch does the job.
5. Singleton using a module-scope closure flag NOT named `initDone` (e.g. `installed`, `ready`) → flag as a name divergence; migrate to `initDone` or open a Phase 7 revision.
6. Factory whose per-element guard IS a DOM attribute but does NOT match `data-nds-<name>-initialized` (e.g. missing the `nds-` infix, like `data-swiper-initialized`) → flag as a name divergence; migrate or open a Phase 7 revision. Does NOT apply to the non-attribute carve-out above.
7. *Registered* factory with a per-instance selector using a `WeakSet` guard where the attribute form would let loader rescans selector-filter → flag as a form divergence; migrate to `data-nds-<name>-initialized` or open a Phase 7 revision. A JS-property guard on the element (`el._ndsXxxInitialized`) → flag (entry 12 rule 14).
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

- **Per-element AbortControllers** in a module `WeakMap` (entry 1) scope a different lifetime (the element's, not the instance's). Out of scope.
- **Pooled-handle abort bridge.** `signal.addEventListener('abort', off)` that releases an `NDS.on*` unsubscribe handle is the canonical way to tie a pooled subscription to the same teardown as the signal's listeners — the pooled helpers take no `signal`, so there is no native alternative to strip it in favour of. Exemplars: the `offResize` bridges in `_js/nds-panel.js` (~L161) and `_js/nds-accessibility.js` (~L581, ~L1492). Discriminator vs Audit behavior #5: that shape wraps a plain `removeEventListener` which `{ signal }` covers natively; this one has no `{ signal }` route at all.

**Audit behavior**

Flag any of these signal-less shapes:
1. `this.handlers.<key> = fn` map stores with teardown enumeration.
2. Instance-property handler stores + straight-line `removeEventListener` teardown.
3. Raw paired `addEventListener`/`removeEventListener` with no AbortController anywhere in the instance.
4. `cloneNode(true)` + `replaceWith` listener-nuking teardown. It destroys consumer-attached listeners along with the component's own, and the clone inherits the init-guard attribute while losing every expando — leaving an element that is stamped, instance-less, and permanently ineligible for re-init.
5. Manual removal bookkeeping inside a `signal.addEventListener('abort', …)` callback where passing `{ signal }` to the original `addEventListener` would do it natively.

**Two-controller split.** A subset of listeners with a genuinely shorter lifetime than the instance (one open, one drag) takes a second domain-named controller, never per-handler bookkeeping — both lifetimes stay atomic. Cite: `_js/nds-modal.js` `openAbortController`, re-armed on every open / aborted in `close()` and `destroy()`, alongside the init-lifetime `initAbortController`. `_js/nds-date-picker.js` `panelAbortController` is the same split: re-armed per open, aborted by `cleanup()`, beside the instance-lifetime `instanceAbortController`.

---

### 7. Public-surface banner

**Canonical**

Every in-scope file opens with a banner comment — the first lines of the file, before any code and before any other prose — enumerating the file's public surface in five fixed sections, always in this order, every label always present (`(none)` entries when a section is empty):

```js
/* NDS.Stepper — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Stepper.init() / .reinit()   scan + initialize steppers
 * Events:
 *   nds:stepper:change   detail {step, stepper}
 * Hooks:
 *   (none)
 * Gotchas:
 *   (none)
 */
```

- **Rides** — edges point UP only: a rider names its base(s) plus the surface it inherits, in parentheses — `Rides: nds-dropmenu (portal, positioning, search, auto-close knobs) · nds-forms (validation)`; soft edges append `(soft — works without it)`; bases declare `Rides: (none — base component)`. A base never enumerates its riders.
- **Requires** (optional, after Rides) — markup the script needs to work and skips with no warning, one per line: `<host> needs|needs one X per Y|sits in|sits outside|is|with|points at X via <attr> <selector> — <what breaks>`. `js_processor.rb` bakes it into the audit's `required-part` rule and fails the build on a line it cannot parse. A part that warns when missing, an optional part, a design choice, or a value a JS method can supply instead stays out.
- **Methods** — the `NDS.<Name>.*` surface, one per line with a short tail description; instance methods are labeled as such.
- **Events** — full event name plus its `detail {…}` shape.
- **Hooks** — consumer-facing `data-*` attributes and action roles, hand-enumerated. Excludes init sentinels (`data-nds-*-initialized`) and base-owned attributes — a rider restating a base's hooks (e.g. `data-anchor` in a dropmenu-rider's Hooks) is a violation.
- **Gotchas** — one-liners, only what THIS file owns.

No version stamps inside banners. Scaled-down banners (~6–10 lines) are the norm for tiny surfaces. Tooling: `node scripts/check-banners.mjs --generate <file>` prints a skeleton (Methods/Events pre-filled, Hooks grep candidates); `--verify <file>` / `--all` checks presence, section order, and Methods/Events drift. The `SCOPE` array in that script is the single source of truth for which files carry a banner.

**Why (and rejected alternatives)**

The banner is the knowledge surface a consumer agent (and human reader) greps before wiring the component — it ships verbatim in the template zip's `_source/_js/`, travels with the code, and costs zero production bytes (Terser strips all comments). Methods and Events are mechanically verified, so the contract cannot silently drift from the code. Rejected: doc-page front matter as the banner's home — it does not travel with the source, has no home for core/loader (no doc page) or many-to-many mappings (forms/tables), and hides from human readers; version stamps inside banners — churn every release with no reader value (the zip is versioned as a whole); riders restating base surface — two copies of one contract drift apart, and the Rides parenthetical already names what is inherited.

**Carve-outs (NOT divergence)**

- Files outside the `SCOPE` array (`nds-docs.js`, `nds-theme-foundation-day.js`, `nds-theme-hajj.js`) carry no banner.
- `(none)` entries are information, not omission — `Hooks: (none)` tells the reader there is nothing to wire; a tiny banner is conformant, not lazy.
- WHY-prose surviving BELOW the banner (bundle/crit headers, usage notes) is not part of the banner and is not judged by this entry — JSA-16 governs it as usual.
- The banner itself is never comment noise: JSA-16 explicitly exempts it (see its carve-out list in `RULES-JSA.md`); JSD-20 owns its conformance.

**Audit behavior**

Run (or mirror) `node scripts/check-banners.mjs --verify <file>`: missing banner, or a missing/misordered section label → LOW. Methods/Events drift against the file's actual `NDS.<Name>` surface and dispatch literals → MEDIUM. A rider restating base-owned surface, or a base enumerating riders (downward edge) → LOW. Full rule: JSD-20 in `RULES-JSD.md`.

---

### 8. Event names

**Canonical**

`nds:{component}:{action}`, every segment lowercase kebab: `^nds:[a-z]+(-[a-z]+)*:[a-z]+(-[a-z]+)*$`.

- **Component** — the component's class root without `nds-`: `nds-digital-stamp` → `digital-stamp`, `nds-taginput` → `taginput`, `nds-user-feedback` → `user-feedback`. An event a shared module fires for another component takes that component's name (`nds:checkbox:indeterminate`, whichever file fires it).
- **Action** — the tense says when it fires. The first that fits:
  1. `change` for a new value — the DOM's word (`nds:tabs:change`, `nds:otp:change`).
  2. A past participle only when the component's state change is already done, from the entry-3 verb that caused it: `open()` → `opened`/`closed`, `showSubmenu()` → `shown`/`hidden`, `expand()` → `expanded`/`collapsed`, `create()` → `created` (the message is in place).
  3. A present verb for anything that fires before the change, can be cancelled, asks for something, or reports an act at the moment it happens: `prepare`, `submit`, `start`, `request`, `select`, `clear`, `tick`, `end`, `complete`, `dismiss` (Feedback fires it before the message leaves the page).
  4. A result word for an outcome: `ready`, `success`/`error`, `valid`/`invalid`, `progress`, `status`.

**Why (and rejected alternatives)**

One grammar lets a consumer guess an event from the component and what happened, and grep every event a component fires with one prefix. Kebab matches the class names, so the component segment reads the same in CSS, markup and listeners. Tense carries meaning: past says the state is already there, present says the step is now or still cancelable. Rejected: camelCase (`nds:formValid`, `nds:upload:beforeUpload`), which the 2.0.0 sweep removed like the camelCase classes; a `before-`/`after-` prefix, which repeats what the tense says; one tense for everything, which loses whether the state has already changed.

**Carve-outs (NOT divergence)**

- `nds:session:*` names what ends, not the Session Timeout component, which has no class root of its own (its dialogs are `.nds-modal`).
- `nds:cookies:consent` is fired by the consent store, a base (`NDS.consent` from 2.0.0), for the Cookies component, by the rule above.

**Audit behavior**

Flag any dispatched `nds:` literal (a `new CustomEvent(` name or a string passed to a component's dispatch helper) that does not match the regex → MEDIUM. `scripts/check-banners.mjs` runs the same regex and fails the release. Flag a tense against the rules above → LOW, as a migration target for the next major: a rename is a breaking change.

---

### 9. One name per component

**Canonical**

A component has one singular kebab name `x`, taken from its root class `.nds-x`, and every surface uses it:

| Surface | Form | Example (`.nds-user-feedback`) |
|---|---|---|
| JS file | `_js/nds-x.js` | `nds-user-feedback.js` |
| SCSS partial | `_sass/components/_x.scss` | `_user-feedback.scss` |
| Doc page | `<shelf>/x.md` | `components/user-feedback.md` |
| Init stamp | `data-nds-x-initialized` | `data-nds-user-feedback-initialized` |
| Events | `nds:x:{action}` (entry 8) | `nds:user-feedback:submit` |
| Namespace | `NDS.X`: `x` split at its hyphens, each part capitalized | `NDS.UserFeedback` |
| Instance | `el.ndsX`, for a component with one instance per element | `el.ndsUserFeedback` |

A component with one instance per page (Main Nav, Digital Stamp, Backdrop, Image Popup Viewer) keeps it private and exposes namespace methods (`NDS.Ipv.open(img)`), never a `window` global. A component without one of these surfaces skips it. A part of a component stamps and names its own part (`data-nds-columns-initialized`, `data-paged-initialized`). An acronym is one word: `.nds-otp` → `NDS.Otp`, `el.ndsIpv`.

**The case tells the layer** (entry 11). A component, which has a root class or a loader entry, is PascalCase, named from its class; one with a loader entry and no root class takes its registry name (`NDS.Sort`, `NDS.Print`). Every other namespace is lowercase: a core module, a helper set, a base, the loader's API (`NDS.state`, `NDS.aria`, `NDS.dialog`, `NDS.init`). A function on `NDS` is camelCase per entry 10 (`NDS.buildChip`, `NDS.debounce`), whatever it builds.

**Why (and rejected alternatives)**

The class is in every consumer page, so it is the costliest name to change and the one the others follow. With one name, a reader or an agent who knows the class can work out the file, the events and the namespace without the docs. Rejected: the namespace from the JS file alone (`8c139004`, then `999997de`), which let the file, class and events drift apart (`nds-tables.js`, `.nds-table`, `NDS.Tables`); acronyms in capitals (`NDS.OTP`, `toCSV`), which need a list of what counts as an acronym; a hyphen in the namespace, which a JS property cannot hold. The case says which layer a name belongs to before anyone opens the file, and a script can check it. Rejected for the case: "PascalCase for one with its own UI or lifecycle" (`96425c4e`), which nobody could check, so `State`, `Status` and `Init` kept PascalCase under it; a doc page as the test, since the `core/` shelf documents modules.

**Carve-outs (NOT divergence)**

- `.nds-btn` is the Button component (an abbreviation on every page).
- Numbers keeps its registry name over its class (`.nds-number-format`).
- A type part (Checkbox, Radio, Switch) has no `init()` and no loader entry: it registers with `NDS.field` at load (entry 11). It is still a component, with one name across its class, file, doc page and namespace.
- A part's property is named for the part (`el.ndsTableControls`, `el.ndsColumnToggle`, `el.ndsCounter`).
- `foundations/themes.md` documents theming, not the Theme switch.

**Audit behavior**

For each loader-registered component: the JS file suffix, the registry `name` turned back into kebab case, the SCSS partial and doc page when they exist, the event segment and the init stamp must all be the same name → MEDIUM on any mismatch. `scripts/check-banners.mjs --all` checks the file, namespace, SCSS class prefix and doc page, and that every stamp and banner event names a real component, and fails the release. Flag a namespace whose case breaks the rule above → MEDIUM.

---

### 10. Method names

**Canonical** — for namespace methods (`NDS.X.method`) and instance methods (`el.ndsX.method`) alike. Rules 1–3 apply to every function, public or not; internal functions add the table under "Internal functions" below.

1. camelCase, verb first. A true/false value starts with `is` or `has`. A class exposed on a namespace is PascalCase (`DatePicker.Calendar`). Which names take `_` is entry 12's rules 11–13.
2. The noun after the verb names what the method acts on, never the namespace: `Form.validate`, not `validateForm`. Leave it out for the component itself (`Modal.open()`); name the part for a child (`openItem(i)`, `addFile`).
3. An acronym is one word (`toCsv`, `isIban`), as in entry 9.
4. One verb per meaning. The table names the meanings that had rival verbs; a meaning it does not name takes any verb-first whole word, and only a listed synonym is flagged:

| Meaning | Verb |
|---|---|
| Wire every element / wire one / undo | `init()` / `create(el, opts?)` / `destroy(el?)` |
| Something changed: read or measure again | `refresh(el?)` — the component does what it needs, so a caller never tells a content change from a size change |
| Open and close | entry 3 |
| A value | `getValue` / `setValue` / `clear`; several values `getValues`; anything else `getX` / `setX` |
| On and off | `enable()` / `disable()` (Bootstrap, Swiper, Choices.js) |
| Items in a list | `addX` / `removeX` |
| Find an instance / wait for one | `getInstance(elOrSelOrId)` → the instance or `null` (Bootstrap) / `whenReady(el, cb)` (as `customElements.whenDefined`) |
| Move | `goTo(i)`, `next()`, `prev()` (Bootstrap's carousel has `next`/`prev`; its `to(i)` is not verb first, so `goTo`) |
| Check | `validate(el)` → `{ valid, … }` |

5. Arguments: the element first, then the values, then one options object. More than two values go in the options object; a callback is not a value and takes its own place, as in `addEventListener(type, listener, options)`. A name used in two places takes the same arguments in both (`Form.setStatus(el, status, opts)`, `UserFeedback.setStatus(el, status)`, `NDS.status.set(el, status)`).
6. A namespace method and its instance method use the same verb; the namespace one takes the element first (`NDS.Rating.enable(el)` mirrors `el.ndsRating.enable()`).
7. `create` returns the instance (entry 3.3's `create({...})` returns the surface it inserted: the call is the open), `getInstance` the instance or `null`, a check its result, and a method that waits a Promise.
8. Whole words for function and member names (`formatValue`, not `fmtVal`; `closeButton`, not `closeBtn`). Locals and parameters may use this list and no other short word: `el`, `e`, `i`, `j`, `x`, `y`, `fn`, `opts`, `btn`. One compound, one spelling (`fileName` or `filename`, not both).

#### Internal functions

The table is a ban list, like the one above: it names the meanings that had rival verbs. Any other verb-first whole word passes (`setX`, `scheduleX`, `placeX`), and the platform's own verbs stay (`format` as in `Intl`, `parse` as in `JSON`).

| Meaning | Verb | Replaces |
|---|---|---|
| Make new nodes and return them | `buildX` | `createX` for DOM, `generateX`, a `…Dom` suffix |
| Make a node exist, once | `ensureX` | — |
| Put built nodes into a container, replacing its children | `renderX` | `populateX` |
| Make existing nodes match state (attributes, properties, classes; no new nodes, no input) | `syncX` | `updateX()` and `applyX()` with no input, `paintX`, an internal `refreshX`, `recheckX` |
| Take a value and write it in | `setX(value)` | `updateX(value)`, `applyX(value)` |
| Add listeners | `addXListeners` | `bindX`, `wireX`, `attachX` |
| One-time wiring of a part, and its undo | `setupX` / `cleanupX` | `initializeX`, `initX`; `teardownX`, `unwireX` |
| A listener function | `handleX` | `onX`, `xHandler` |
| The handle `NDS.on*` returns | `offX` (entry 6) | `unsubX`, `stopX` |
| Fire an event | `dispatchX` | `emitX` |
| A value as held: stored or computed | `getX` | a noun name (`pageBounds`, `labelFor`, `navOf`) |
| A string (attribute, URL, storage) parsed into a typed value, and back | `readX` / `writeX` | — |
| Search the DOM, may return `null` | `findX` | — |
| Turn an argument (id, selector, element) into the thing | `resolveX` | — |
| Convert | `toX` / `fromX` | — |
| True/false | `isX` / `hasX`, or the DOM's `matches` / `contains` | `inX`, `xExists`, `itemMatchesX` |

Every row comes from a canonical here, the platform or a library, by entry 12's pick order: `create` returns an instance (rule 7); `render` is React's, Vue's and Lit's; `update` meant two things (`Chart.update(newOpts)` takes input, `Toc.update()` does not) and `apply` is `Function.prototype.apply`; `addEventListener` and `dispatchEvent` are the DOM's, and `bind` is `Function.prototype.bind`; a React effect is a setup function that returns a cleanup, and `init` already names the loader hook; `handleX` for the listener and `onX` for subscribing are React's; `Clipboard.readText` / `writeText`, `Array.prototype.find`, `Promise.resolve`, `toString` and `Array.from` name the rest. `ensureX` is the one decision with no outside name: it says the call is safe to repeat.

**Why (and rejected alternatives)**

A name a reader or an agent can guess from another component, or from the DOM and Bootstrap, is a name nobody looks up. The verbs come from the libraries people already know, so a guess lands. Rejected: `measure()` for a size change (no library uses it; a caller should not have to know which kind of change it made); `setDisabled(bool)` (the common pair is `enable()` / `disable()`); `previous()` (the common pair is `next()` / `prev()`); acronyms in capitals (`toCSV`), which need a list of what counts as one. An acronym as one word follows Google's camelCase rule (`loadHttpUrl`); the DOM is mixed (`innerHTML`, `getElementById`), so it gives no answer. Rule 8 follows entry 1's reason: the characters an abbreviation saves are paid back at every read.

**Carve-outs (NOT divergence)**

- `Print.print` and `Export.export`: the verb is the module.
- `Filter.getByTarget(id)` takes a different key from `getInstance`; `Dropmenu.from(el)` returns an element, not an instance.
- A loader-hook name (`init`, `reinit`, `refresh`, `destroy`) keeps the loader's meaning.
- A markup value is not a method: `data-stepper-control="previous"` stays.
- `NDS.init` is the loader's namespace (entry 9), not the `init()` verb; its methods keep the loader-hook meanings (`mount`, `refresh`, `destroy`). Its `initialize()` runs the full pass: `init.init()` would repeat the namespace (rule 2).
- `NDS.validation.check(el)`: `validation.validate` would repeat the namespace (rule 2).
- `setupX` is for internal functions only; a public method uses the first table's verbs.
- `initX()` on a namespace runs `init()` for one part only (`Numbers.initCounters`, `Pagination.initAuto`): `init` already means "wire every element", and no other verb says "the same, for this part".
- A public callback key keeps `onX`: an option a caller passes (`onClick`, `onRemove`, `onChange`) and a part key `NDS.field.addType` reads. React passes a `handleX` function as an `onX` prop; the `handleX` row names the function only.
- Single-letter axis names (`X`, `Y` in `renderXLabels`) are not acronyms.

**Audit behavior**

Flag a public method whose verb is a synonym the table replaces (`recheck…`, `recount`, `checkOverflow`, `setDisabled`, `previous`, `switchTo`, `slideTo`, `initialize…`, `setup…`), a name that repeats its namespace, or two public names that call the same code → LOW, as a migration target for the next major. `check-js-rules.mjs --names` (rule ids `P10.<rule>`), for every function: a verb the internal table replaces → finding; a first word it does not know → verify; an acronym in capitals → finding; a short word outside rule 8's list → finding. Each is LOW; an internal rename needs no Migration line.

---

### 11. Layers: where shared code lives

**Canonical**

Shared code sits in one of three layers, and a lower layer never names a higher one: core ← base ← component. The loader sits beside core and names components only through its registry.

| Layer | What it is | Name (entry 9) | Bundle | Example |
|---|---|---|---|---|
| core | a page-wide utility that knows no component | lowercase | main | `NDS.debounce`, `NDS.aria` |
| base | one job a family shares, no UI of its own | lowercase | its callers' bundle when they all share one, else main; listed before every file in that bundle that names it | `NDS.dialog` (Modal, Panel, all in delegated) |
| component | has a root class or a loader entry | PascalCase | its own | `NDS.Modal` |

- A base creates no markup and shows no message. It may write state and attributes (`NDS.dialog` writes `inert` and `data-nds-modal`), but it returns data, and the component that called it renders.
- A base serves its users through arguments, callbacks and registries of functions. A registry holds functions and selectors, never elements.
- Where a shared piece goes, first yes wins: (1) one component's contract → that component's API, if it loads no later than every caller; (2) a family's job with no UI → a base; (3) it knows no component, two or more files call it and it passes JSD-05's body gate → core; (4) otherwise keep the copies.
- A namespace in main is never guarded. A call between two injected bundles ignores or awaits its result, or carries the one-line stub check with its comment.
- What `create()` stamps on an element that outlives the instance, `destroy()` removes, and only that.

**Why (and rejected alternatives)**

Direction keeps a change local: a base that knows no user changes without breaking one, and a component that adds a rule or a type touches only its own file. A base lives with its callers because a stub cannot answer a synchronous call and every property of a stub is truthy: in its callers' own bundle no caller ever meets the stub, and main is where callers in different bundles meet. The two failed bundle splits of 2026-05 each grew a chain of late edges until main held almost everything, and the delegated tier worked once the shared dependencies stayed in main. Rejected: every base in main (the owner's first call, 2026-10-20), which would add `NDS.dialog`'s 2.4 KB to the bundle that gates the reveal, for callers that all load later. Rejected: Form validating other components' markup (it knew ten, and seven called it back); a base that renders, which would have to name the component that renders it; a component split into an eager shell and a lazy half (removed 2026-06-04, AGENTS.md); a component split into plain files by doc page, which scatters code that runs together and adds a `document` listener per file (the Checkbox, Radio and Switch study, 2026-10-20); `?.` guards on main namespaces, which never fire.

**Carve-outs (NOT divergence)**

- The loader's registry names every component: the one place allowed to, as data, never as code.
- The two cross-bundle sync reads with a commented stub check: `isPanelOpen` in `nds-accessibility.js`, `isSelected` in `nds-export.js`.
- An opt-out bundle (accessibility, cookies) is guarded by its callers.

**Audit behavior**

`check-js-rules.mjs` (built in `plans/shared-logic.md` step 2): a guard on a main namespace → finding; a call from one injected bundle into another → verify; core or a base naming a component namespace → finding. `js_processor.rb` fails the build on a base away from a caller's bundle, or listed after a file in its bundle that names it. Until the plan lands, today's tree diverges in known ways (Form validates other components): migration targets, not revisions.

---

### 12. Every name has a rule

Scope: the whole of `_js/`, core, the loader, docs and the event packs included. A new kind of name gets a row here before it ships.

**How a name is picked.** When two names mean the same thing, the first rule that decides wins:
1. A canonical in this file already gives that meaning a name (a canonical, not a symbol an entry cites), if its Why is true and it passes every other entry. If not, fix the entry first (Update workflow).
2. The web platform's name (DOM, ECMAScript).
3. The name well-known libraries use (Bootstrap, React, Vue).
4. A name that already means something else, in NDS or in JavaScript, loses.

Use counts never decide. A meaning these four leave open is a new decision here, with its reason.

| Kind | Rule |
|---|---|
| Component: file, namespace, instance, init stamp, doc page | entry 9 |
| Public methods, and every function's verb | entry 10 |
| `_` members, module-scope names, per-element data | this entry, rules 11–16 |
| Events | entry 8 |
| Console prefix | entry 4 |
| AbortControllers | entry 1 |
| Init guards and latches | entry 5 |
| CSS classes, menu identifiers, tokens, knobs | AGENTS.md (SCSS Standards, Design Tokens) |
| i18n keys | the English word is the key (`scripts/check-i18n.mjs`) |
| Bundle files | the build (`@bundles` in `_plugins/js_processor.rb`) |
| Everything below | this entry |

**Canonical**

1. **A global NDS writes on `window`**: `window.NDS` is the public namespace, the one name consumers call; everything else is internal and is `__NDS_{NAME}`, upper snake case (`__NDS_BUNDLES`, `__NDS_THEME_ACTIVE`). Never a component global (entry 9).
2. **A global the consumer sets for NDS to read** is `NDS_{NAME}` (`NDS_ASSETS_PATH`, `NDS_I18N_PATH`): a public setting, so no underscores in front.
3. **A storage or cookie key** is `nds-{name}[-{part}]`, kebab, with `{name}` the component's name (entry 9) or the core module's; a key per item adds `:{id}` (`nds-scroll:/path`, `nds-cache:weather`).
4. **A URL parameter** is kebab whole words named for the value, with no prefix (`page`, `per-page`, `theme`): it is part of the site's own URL. A component that writes one takes the name from its hook when the page gives one.
5. **A `data-*` hook** is kebab whole words. On the component's own element (its root, or a part its doc names) it is named for what it sets (`data-position` on `.nds-alert`). On any other element it starts with the component's name (`data-ipv-gallery` on an `<img>`). A hook that turns off a default starts with `no-` (`data-no-auto-close`).
6. **A `data-state` or `data-status` token** is kebab and names a state, not an action: an adjective or past participle (`open`, `selected`, `loading`, `has-more`). One token per meaning across components.
7. **An internal JS class** is `Nds{Name}`, PascalCase, with entry 9's name (`NdsTable`, `NdsIpv`); a class for a part adds the part (`NdsDatePickerCalendar`). An acronym is one word.
8. **A module-level constant** is upper snake case when it is a primitive or frozen value that is never reassigned (`INIT_ATTR`, `SEL`); everything else is camelCase (functions, elements, `Map`, `WeakMap`, objects that change).
9. **A true/false value**: a public property or method is `isX` / `hasX` (entry 10 rule 1); a latch is named for what it latched, as a past participle (`initDone`, `wired`; entry 5).
10. **An event `detail` key** is camelCase whole words: the instance under the component's name (`detail.stepper`), a new value under `value`.

The underscore and private data:

11. **Public means on the banner** (entry 7). A class or namespace-object member that is not on its file's banner takes `_`, which means "reachable from outside, not API".
12. **Only the file that defines a `_` name reads or writes it.** Another file that needs it gets a public name, or the value moves to a base or core (entry 11).
13. **A module-scope name (IIFE or ES module) takes no `_`**, a flag a public namespace needs included: nothing outside can reach it, so the mark says nothing.
14. **Private data per element lives in a module `WeakMap` keyed by the element, never on the element.** Only its own file can reach it, so rule 12 holds by construction. A `WeakMap` never holds the instance: the instance stays `el.nds{Name}` (entry 9), the backref `NDS.init.destroy(view)` walks. An entry is not freed by itself while a live AbortController or `NDS.on*` handle keeps the element reachable, so what `create()` stores, `destroy()` deletes, as with a stamp (entry 11).
15. **A `WeakMap` or `WeakSet` is named for what it holds** (`perPageDefaults`, `wiredInputs`); one holding AbortControllers ends in `AbortControllers` (entry 1).
16. **No `#private`.** `_` is the one mark.
17. **A bundle runs once per page.** `js_processor.rb` wraps each bundle in a check of `window.__NDS_LOADED_{BUNDLE}`: a second copy (the tag written twice, Turbo or pjax re-running body scripts, a view adding the tag on mount) runs nothing and warns. No component carries its own defence. Ceiling: two different versions on one page, the first wins.

**Why (and rejected alternatives)**

A name an agent can guess from its kind is a name nobody looks up, and a kind with no rule grows one spelling per author (`cookieConsent` beside `nds-theme`; `NDSTables` beside `NDS.Table`). Rule 1: one plain public global and double underscores on the internal ones is what libraries do (`Vue` and `__VUE__`, `jQuery`, `bootstrap`, `__NEXT_DATA__`), and a single `_` already means an internal member. Rule 3: the key shows in devtools beside the class it belongs to, so it carries the same name. Rule 5 follows HTML, which names an attribute per element (`min` on `<input>`): a hook on its own component cannot clash, and only one on a foreign element needs the component's name. Rule 8 is Google's JavaScript style. Rejected: Bootstrap's prefix on every hook (`data-bs-*`), which would rename 135 hooks in every consumer page to prevent clashes that element scoping already prevents; a bare class name (`class Table`), which can shadow a browser global (`Selection`, `Image`) and needs a list of exceptions; `nds_` with an underscore for keys, which no other NDS surface uses.

Rule 11 makes the banner the one contract. Rejected: "a plain name is public", which made every plain instance field (`this.dropmenu`, `this.box`) a promise, each rename a breaking change. Airbnb bans a leading `_` everywhere because it hides nothing; Bootstrap 5, Lodash and most DOM libraries use it anyway, and NDS has no other mark that works on an object literal (rule 16). Rule 13 matches Airbnb (22.4) and Google: no underscore on a name nothing outside can reach. Rule 14 is how Bootstrap 5 keeps its per-element data (its `Data` module), and the page can neither see the data nor clash with it. Rule 16: `#` works only inside a `class`, and most NDS namespaces are object literals, which cannot hold it. Rule 17: a second copy resets every module latch and wires every singleton again; Stripe.js and Alpine.js skip it and warn, and one check per bundle replaces a defence in every component. CSS already uses the same mark: `--_x` is a private knob.

**Carve-outs (NOT divergence)**

- `data-state` and `data-status` are core's shared hooks (`NDS.state`, `NDS.status`), not a component's.
- A field's hook that mirrors an HTML attribute keeps the HTML word (`data-required`, `data-min-checked`).
- `NDS.cache` keys carry the caller's id after `nds-cache:`.
- A key that already starts with `nds-` keeps its name (`nds-a11y`, `nds-palette`): a renamed key loses the visitor's saved choice, and the prefix already prevents a clash. Only a key without the prefix is renamed.
- Entry 1's AbortController names stay plain under rule 11.
- `el.nds{Name}` and a part's `el.nds{Part}` (entry 9) are the instance backref, not private data (rule 14).

**Audit behavior**

`check-js-rules.mjs --names` (rule ids `P12.<rule>`): a member missing from its banner without `_` → finding; a `_` name read or written outside the file that declares it → finding; a binding with `_` → finding; a property written on an element other than `nds{Name}` → finding; a `#` member → finding; a `window.` write other than `__NDS_*` or `NDS` → finding; a storage or cookie key literal that does not start with `nds-` → finding; a class not named `Nds[A-Z]…` → finding; an event `detail` key that is not camelCase → finding; an upper-case constant holding a non-primitive, or a camelCase one holding a primitive literal → verify; rules 5 and 6 (whether a hook sits on the component's own element, whether a token names a state) are read, not checked. Each is LOW, a migration target. A storage key, hook, token or `detail` key is observable, so its rename ships in a major with a Migration line (AGENTS.md, Framework Hosts).

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
- **An entry breaks another, or its Why cites a source wrongly.** A canonical example must pass every other entry, and a cited library or platform name must be true. Fix the entry before anything is picked from it: a corrected reason or example lands as bookkeeping; a changed outcome is a user decision.

**What never triggers a canonical revision:** raw adoption counts ("11 new files used `_ac`") or "the corpus changed" — those are migration targets, not canonical revisions. The canonical is the deliberate choice; the corpus catches up.
