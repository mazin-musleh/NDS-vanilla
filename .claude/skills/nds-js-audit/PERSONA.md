# NDS JS Code Persona

The project's chosen conventions for `_js/nds-*.js` component files, documented as concrete canonical forms backed by principle reasoning. Consulted by `nds-js-audit` so JSD-15 ("cross-file pattern consistency") works in single-file mode and so the audit measures code against deliberate choices instead of against the loudest accidental majority.

**Scope:** the component files under `_js/nds-*.js`. Excludes `nds-core.js` (publishes the shared utility surface, different conventions), `nds-loader.js` (orchestration shape), `nds-docs.js` (docs-site builder). Exception: entry 7 (public-surface banner) uses its own wider scope — the `SCOPE` array in `scripts/check-banners.mjs`, which includes `nds-core.js` and `nds-loader.js`. Entry 11 (layers) covers `nds-core.js`, the bases and the loader as well.

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
- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC` in `_js/nds-filter.js`) are scoped to the element's lifetime, not the instance's. Structurally different shape; the leading underscore IS correct here because the property is on a foreign element.

**Audit behavior**

Flag any `this.<name> = new AbortController()` where `<name>` is neither `abortController` nor ends in `AbortController` — that covers ≤4-character names, `_ac` / `_ctrl` / `_fp`, `controller`, and mixed-case abbreviations like `_docAC`. Secondary controllers with domain-named full words (any name containing `AbortController` as a suffix) pass.

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

**Concept:** the surface fully captures attention. Singleton-open. Focus-trapped and dimmed: a `<dialog>` opened with `showModal()`, or `NDS.trapFocus` with `NDS.Backdrop.show`. Opening is a state transition for the whole page.

**Discriminator** (mechanically checkable): file invokes `showModal()`, `NDS.trapFocus` OR `NDS.Backdrop.show`, OR enforces singleton-open another way — delegating its lifecycle to `NDS.Dropmenu` (`NDS.Dropmenu.create` + `open()`/`close()` passthrough: `_js/nds-autocomplete.js`) or to `NDS.Panel`, whose `<dialog>` owns the page's attention (`_js/nds-accessibility.js` `NDS.Panel?.open`), or closing every other open instance on open (`_js/nds-dropmenu.js` `_openDropmenus`, `_js/nds-tooltip.js` `_openTooltip`).

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

A factory creates per-element instances; the guard must distinguish "this specific element is initialized" from "any element of this type was once initialized," so the marker belongs on the element. A singleton has no per-element target to mark; pinning an attribute to `document.body` would pollute a shared namespace and force unrelated singletons to coordinate names. The guard's location should match the guard's scope. Rejected: factory using a closure flag — can't distinguish per-element state, re-init scans become impossible; singleton using a `document.body` attribute — namespace pollution; `window.nds<Name>Initialized` global flag — leaks state into the window namespace; acceptable only for a listener wired at bundle scope (carve-out below).

**Carve-outs (NOT divergence)**

Each shape below matches its form to what it actually guards, so none is divergence:

- **Per-element scope, non-attribute form.** The marker lives on the element without being an attribute when the structure justifies it: a JS property on a document-sweeping controller (`_js/nds-form.js` `_ndsInitialized` / `_ndsFormInitialized` / `_switchInitialized`) — per-element, just not CSS-selectable, so re-sweeps check inline; the instance expando where `create(el)` is idempotent through the back-ref (`_js/nds-date-picker.js` `ndsDatePicker`) — the instance IS the init state and a parallel attribute channel could drift, so it must be gated on successful construction (JSD-18); or init's own DOM mutation as the marker (`_js/nds-custom-select.js` `build()` checks the `.nds-dropmenu` class it stamps). A *registered* factory with a per-instance selector still prefers the attribute form so loader rescans can selector-filter — see Audit behavior step 7.
- **Resource scope, no flag at all.** When init is idempotent or deliberately re-armable, the resource IS the guard: `_js/nds-selection.js` `_controller` (nulled by `destroy()` so `init()` re-arms by design — a one-way flag would break the cycle), `_js/nds-share.js` `init()` (documented abort-and-rebind of its own `_abortController`).
- **Bundle-scope listener, window flag.** A document listener wired at module eval has no per-element target, and a module-scope flag resets if a second copy of the bundle evaluates; the flag that stops a second listener belongs on `window`: `_js/nds-table.js` `window.ndsTableSubHandlerInitialized` (~L835), covering the document-delegated sub-row toggle (independent of the sort/checkbox-gated `NDSTables` instance). Requires the inline comment named in Audit behavior step 4.
- **Sub-concern latch, named for what it latches.** A guard gating one arm of init — narrower than the module's own guard, so it carries a descriptive name instead of `_initDone`. Three shapes: one-time page-level setup inside a factory (document delegation, singleton observers, a body-appended sentinel) — `runtimeSet` guarding `setupRuntime` (`_js/nds-fab.js` ~L195), `togglesBound` guarding `bindToggles` (`_js/nds-panel.js` ~L462), both files carrying the canonical attribute for their own init; and per-branch latches in a singleton wiring independently-present widgets — `_js/nds-time-date.js` `_dateInitDone` / `_clockInitDone`, whose declaration documents the reasoning ("The date and clock topbar widgets can appear independently, so the latches are separate — a page that ships only one widget can still wire the other if it's injected later"). One shared `_initDone` would latch on the first widget and strand the second. A singleton whose `init()` re-runs on purpose has no module-wide latch at all, only its arms': `_js/nds-theme.js` `_wired` (listeners) / `_reconciled` (saved-palette restore) — its `init()` comment: "the sync runs every time, the restore and the listeners once", so `mount()` / `refresh()` reach a later view's toggles. And the attribute form of the same idea — a second `data-nds-<sub-mode>-initialized` on the SAME element beside the component's canonical guard, gating an init arm the canonical one doesn't cover: `_js/nds-pagination.js` `data-nds-auto-pagination-initialized` (guards `setupAutoContainer`, while `data-nds-pagination-initialized` guards the manual sweep) and `_js/nds-table.js` `data-nds-columns-initialized` (guards the column-toggle arm beside `data-nds-table-initialized`). Discriminator for the attribute shape: the component's canonical guard is present on the element, and the second attribute names an init path it does not cover. Step 5's name check governs a singleton module's OWN guard only, and step 6's `data-nds-<name>-initialized` check governs the component's OWN guard only — neither fires on these.
- **CSS-contract reveal stamp on a foreign element.** An attribute a component writes on an element it does not own, consumed by critical CSS as a paint-release hook, is not that component's init guard — it names the region being revealed, so step 6's `data-nds-<name>-initialized` check must not fire on it. Cite: `_js/nds-pagination.js` `data-paged-initialized`, stamped on the paged CONTENT container (file header documents the crit-CSS hold it releases) while the component's own canonical `data-nds-pagination-initialized` stays on the nav. Discriminator: the attribute is written to a different element than the one the sweep guard reads.

**Audit behavior**

1. Classify the file via init pattern: iterates `querySelectorAll(...)` over content elements → factory (expect 5.1); binds only to `document.body` / `document.documentElement` / module-level state → singleton (expect 5.2).
2. Factory using `_initDone` or `window.<flag>` → flag.
3. Singleton using `data-nds-<name>-initialized` → flag.
4. Window-global flag requires an inline comment within 3 lines naming why it lives on `window` (a second copy of the bundle must not add a second listener); otherwise flag.
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

- **Per-element AbortControllers stored on the element** (`el._ndsFilterAC`) scope a different lifetime (the element's, not the instance's). Out of scope.
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

No version stamps inside banners. Scaled-down banners (~6–10 lines) are the norm for tiny surfaces. Tooling: `node scripts/check-banners.mjs --generate <file>` prints a skeleton (Methods/Events pre-filled, Hooks grep candidates); `--verify <file>` / `--all` checks presence, section order, and Methods/Events drift. The `SCOPE` array in that script (57 files: 53 components + core, loader, accessibility, theme) is the single source of truth for which files carry a banner.

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

**The case tells the layer** (entry 11). A component, which has a root class or a loader entry, is PascalCase, named from its class; one with a loader entry and no root class takes its registry name (`NDS.Sort`, `NDS.Print`). Every other namespace is lowercase: a core module, a helper set, a base, the loader's API (`NDS.state`, `NDS.aria`, `NDS.dialog`, `NDS.init`). A function on `NDS` is camelCase per entry 10 (`NDS.badge`, `NDS.debounce`), whatever it builds.

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

**Canonical** — for namespace methods (`NDS.X.method`) and instance methods (`el.ndsX.method`) alike:

1. camelCase, verb first. A true/false value starts with `is` or `has`. A class exposed on a namespace is PascalCase (`DatePicker.Calendar`). A name starting with `_` is internal.
2. The noun after the verb names what the method acts on, never the namespace: `Form.validate`, not `validateForm`. Leave it out for the component itself (`Modal.open()`); name the part for a child (`openItem(i)`, `addFile`).
3. An acronym is one word (`toCsv`, `isIban`), as in entry 9.
4. One verb per meaning:

| Meaning | Verb |
|---|---|
| Wire every element / wire one / undo | `init()` / `create(el, opts?)` / `destroy(el?)` |
| Something changed: read or measure again | `refresh(el?)` — the component does what it needs, so a caller never tells a content change from a size change |
| Open and close | entry 3 |
| A value | `getValue` / `setValue` / `clear`; several values `getValues`; anything else `getX` / `setX` |
| On and off | `enable()` / `disable()` (Bootstrap, Swiper, Choices.js) |
| Items in a list | `addX` / `removeX` |
| Find an instance / wait for one | `getInstance(elOrSelOrId)` → the instance or `null` (Bootstrap) / `whenReady(el, cb)` (as `customElements.whenDefined`) |
| Move | `goTo(i)`, `next()`, `prev()` (Bootstrap's carousel) |
| Check | `validate(el)` → `{ valid, … }` |

5. Arguments: the element first, then the values, then one options object. More than two values go in the options object. A name used in two places takes the same arguments in both (`Form.setStatus(el, status, opts)`, `UserFeedback.setStatus(el, status)`, `NDS.status.set(el, status)`).
6. A namespace method and its instance method use the same verb; the namespace one takes the element first (`NDS.Rating.enable(el)` mirrors `el.ndsRating.enable()`).
7. `create` returns the instance, `getInstance` the instance or `null`, a check its result, and a method that waits a Promise.

**Why (and rejected alternatives)**

A name a reader or an agent can guess from another component, or from the DOM and Bootstrap, is a name nobody looks up. The verbs come from the libraries people already know, so a guess lands. Rejected: `measure()` for a size change (no library uses it; a caller should not have to know which kind of change it made); `setDisabled(bool)` (the common pair is `enable()` / `disable()`); `previous()` (the common pair is `next()` / `prev()`); acronyms in capitals (`toCSV`), which need a list of what counts as one.

**Carve-outs (NOT divergence)**

- `Print.print` and `Export.export`: the verb is the module.
- `Filter.getByTarget(id)` takes a different key from `getInstance`; `Dropmenu.from(el)` returns an element, not an instance.
- A loader-hook name (`init`, `reinit`, `refresh`, `destroy`) keeps the loader's meaning.
- A markup value is not a method: `data-stepper-control="previous"` stays.
- `NDS.init` is the loader's namespace (entry 9), not the `init()` verb; its methods keep the loader-hook meanings (`mount`, `refresh`, `destroy`).

**Audit behavior**

Flag a public method whose verb is a synonym the table replaces (`recheck…`, `recount`, `checkOverflow`, `setDisabled`, `previous`, `switchTo`, `slideTo`, `initialize…`, `setup…`), a name that repeats its namespace, or two public names that call the same code → LOW, as a migration target for the next major.

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
- The two cross-bundle sync reads with a commented stub check: `panelIsOpen` in `nds-accessibility.js`, `isSelected` in `nds-export.js`.
- An opt-out bundle (accessibility, cookies) is guarded by its callers.

**Audit behavior**

`check-js-rules.mjs` (built in `plans/shared-logic.md` step 2): a guard on a main namespace → finding; a call from one injected bundle into another → verify; core or a base naming a component namespace → finding. `js_processor.rb` fails the build on a base away from a caller's bundle, or listed after a file in its bundle that names it. Until the plan lands, today's tree diverges in known ways (Form validates other components): migration targets, not revisions.

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
