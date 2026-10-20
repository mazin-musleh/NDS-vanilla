# Shared logic: one architecture for v2

Status: DESIGN AGREED 2026-10-20; reviewed by a fresh Opus pass the same day (section 7); rules landed in
AGENTS.md and PERSONA entries 9–11. Every owner decision taken (section 4). Facts measured on `main` at `9fd54151`.

**Resume here.** Order steps 1–2 are done, and so are changes #1 (1, 1b, 1c, 1d), #2 and #4 (#3 was dropped; the "Landed" notes
under section 3's Mechanical checks). Change #4b is done (owner, 2026-10-20: every gap in its inventory note fixed, one commit each), and so are #5 and #6.
**Next: change #7**, `NDS.gridLastRow` → `_js/nds-grid.js`, `NDS.Grid`.

## Goal

One rule set says where shared code lives, what it may know, which bundle carries it and what it is
called, so a reader or an agent can work it out without asking. v2 is a major, so today's structure
changes where the rules give a simpler, more consistent result (as the naming refactor `4181dc65` …
`bbfc89b0` did). `check-js-rules.mjs` JSD-05a lists the copies; these rules decide what a "yes" turns into.

## 1. What the tree does today

### Three layers exist, unnamed

| Layer | Today | Bundle |
|---|---|---|
| Core: page-wide utilities | `nds-core.js` (~50 members on `NDS`) | main |
| Base: one job a family shares, no UI | `NDS.dialog` (Modal + Panel), `NDS.date` (`nds-date.js`) | delegated; main |
| Component: siblings call its API | `NDS.Form` (13 files call it; `setStatus` 5 of them), `NDS.Dropmenu.create` (8), `NDS.Feedback` (4), `NDS.CustomSelect` (time-picker) | its own |
| Loader: orchestration | `nds-loader.js`: the registry names every component | main |

### Load order (the loader, `js_processor.rb`)

- Main runs first, always, as one concatenated script with the loader last. Every other bundle is
  injected after it.
- The injected bundles load **in parallel, in no order** (`nds-loader.js:807`).
- Before its bundle lands, `NDS.X` is a stub: a method call returns a Promise, and every property is
  truthy (`:557-575`), so `NDS.X?.y` does not detect it. A failed bundle leaves its stub for good (`:536-541`).
- An injected group inits after `NDS.i18n.settled` (up to 3 s, `:755`): between a bundle's eval and its
  init, the namespace is real but its components have not run.

### Calls between files (all 25 namespaces another file calls)

- **Into main from anywhere: safe.** Most traffic (Form, Dropmenu, Feedback, Backdrop, date, CustomSelect).
- **Inside one injected bundle: safe.** Modal and Panel on dialog, Filter on Alert/Slider/Numbers/Sort,
  Session Timeout on Modal/Countdown, Share on Copy.
- **Across two injected bundles: each caller solved it alone.** accessibility → Panel, cookie-consent → Panel,
  export → Selection, upload → Tooltip, editor → Tooltip/Upload. Two sync reads carry a hand-written stub
  check (`nds-accessibility.js:957`, `nds-export.js:72`); the rest are fire-and-forget.
- **Guards on main namespaces.** `NDS.Form?.` in date-picker (1), time-picker (5), taginput (4), editor (5),
  drawer, dropmenu, pagination (1 each); `NDS.Dropmenu?.` and `NDS.Link?.` in editor. Main always loads
  first and no doc offers a way to drop a main file, so these never fire. Voice-input, otp and filter call
  `NDS.Form` bare.

### Dependency direction

- `NDS.dialog` knows nothing about Modal or Panel. This is the model.
- **Form knows its users:** `validateMultiselect`, `validateTaginput`, `validateOtpGroup`,
  `initMultiselectValidation`, Upload's rows, Autocomplete's `data-strict`, the Custom Select and
  dropmenu-picker carriers, Rating, Time Picker boxes. Several call Form back. Date Picker, Time Picker
  (field mode) and Password report through `setCustomValidity` instead.

### Core

- Mostly right: utilities that know no component.
- **A component inside core:** `NDS.gridLastRow` is the behaviour of `.nds-divided.nds-grid`, which has its
  own doc page (`layout/grid.md`) and no JS file. Published in core's banner (`nds-core.js:29`).
- **In core for a reason, keep:** `buildChip` and `badge` build CSS-only components that have no JS owner;
  `cellText` serves table (delegated) and export (extras), two injected bundles.

### Names

- PERSONA entry 9 lists the non-component modules but not the rule. The plan that made it (`96425c4e`) said
  "PascalCase for one with its own UI or lifecycle, lowercase for a set of helpers"; that reason was lost.
- The `core/` shelf mixes both: `date`, `i18n`, `request` are lowercase, `Init` and `Audit` PascalCase.
- Several PascalCase namespaces have no root class: Sort (`[data-sort-target]`), Print, Selection, Theme,
  SessionTimeout, Numbers (`.nds-number-format`), CookieConsent, Accessibility. All are loader-registered.

## 2. The architecture

| Layer | What it is | Name | Bundle | May use |
|---|---|---|---|---|
| core | page-wide utility, knows no component | lowercase (`NDS.debounce`, `NDS.aria`) | main | nothing above it |
| base | one job a family shares, no UI of its own | lowercase (`NDS.dialog`, `NDS.field`) | its callers' bundle when they all share one, else main (owner, 2026-10-20) | core |
| loader | orchestration | `NDS.init` (A7) | main | names components only through its registry, never in code |
| component | wires markup on the page: has a root class or a loader entry (decision 5) | PascalCase, from its class (entry 9) | as perf decides | core, bases, siblings that load no later |

A doc page does not make a component: the `core/` shelf documents `date`, `i18n`, `request`, `init` and
`audit`, which are modules.

### A1. Direction

core ← base ← component. A lower layer never names a higher one. A base serves its users through
arguments, events and callbacks, as `NDS.dialog` does. **A base creates no markup and shows no message:**
it may write state and attributes (as `NDS.dialog` writes `inert` and `data-nds-modal`), but it returns
data, and the component that called it renders. A base that rendered a message would have to name the
component that renders it.

### A2. Where a shared piece goes (stop at the first yes)

1. **It is one component's contract** (its attributes, markup or status) → that component's API,
   provided the component loads no later than every caller. If not, go to 2 or 3.
2. **A family shares one job and it has no UI** → a base.
3. **It knows no component, two or more files call it, and it passes JSD-05's body gate** → core.
   This bar decides what is promoted into core, not what is evicted from it.
4. **Otherwise** keep the copies. A JSD-05a `verify` line is answered "no".

Names follow PERSONA entry 10: a new job takes a verb from its table before a new verb is invented
(`create(el, opts)` before `adoptField`).

### A3. Bundles

- **Core lives in main; a base lives with its callers:** in their bundle when they all share one, else in
  main. No caller ever meets a base's stub, so none guards it or waits for it. (First call, every base in
  main, was revised the same day: `NDS.dialog` would add 2.4 KB to the reveal path for callers that all
  load later.)
- A base is listed before every file in its bundle that names it: a bundle is one script, and one
  TypeError at eval stops it (in main, the loader and the reveal).
- A callee loads no later than every caller that uses its result synchronously. The injected bundles have
  no order among themselves: a call between two of them is allowed only if its result is unused or
  awaited, or it carries the one-line stub check with its comment (today's two sites).
- Build guards in `js_processor.rb`, beside `assert_no_critical_in_injected!`: a base away from a caller's
  bundle fails; a file listed before a base it names fails; `scan_namespaces` reads lowercase namespaces too (`:144` matches
  `[A-Z]` only today, so a lowercase namespace in an injected bundle gets no manifest row and no stub).

### A4. Guards

- A namespace in main is always present: never guard it (JSD-08's reason for core, JSD-12's for a sibling).
- An opt-out bundle (accessibility, cookie-consent) is guarded by its callers.
- A namespace in another injected bundle: per A3.

### A5. Undo

What `create()` stamps on an element that outlives the instance, `destroy()` removes, and only that
(Framework Hosts). Stamps on the view's own nodes leave with them.

### A6. Field validity protocol

A field component reports its own validity; the validation base reads it and names no component.

- **The native pass** covers a field whose own input holds the value: plain fields, and the components
  that stamp `setCustomValidity` on it (Date Picker, Time Picker field mode, Password, national ID and IBAN).
- **A rule** covers every other component: `NDS.validation.addRule(selector, fn, { on })`, where
  `fn(el) → { valid, message, empty, focus, … }` and `on` lists the events after which a field that shows
  an error is checked again. Registered at load, one object write. The registry holds functions and
  selectors, never elements, so it outlives no view (JSA-23).
- **Each rule is also the component's public check**, PERSONA entry 10's `validate(el)`:
  `NDS.Checkbox.validate(group, opts)` returns what `NDS.Form.validateCheckboxGroup` returns today
  (`{ valid, checked, min, max, message }`, `{ showMessage }`), `NDS.Radio.validate(group)` what
  `validateRadioGroup` does, and the same for Multiselect, Taginput and OTP. One function, two callers.
- **`NDS.Form.validate(el)` keeps its meaning and shape:** it checks `el.closest('.nds-form')` (a stepper's
  step div is a `.nds-form`, which is why), returns `{ valid, invalidFields, errors: [{ field, input,
  message }] }`, and the `nds:form:validate` / `invalid` details keep that shape. The base returns the same
  shape; Form places each message, sets `aria-invalid` and moves focus (A1).
- **The base applies the shared parts once:** `data-error-message` when a result is `empty`, and **a
  disabled field never fails**, as in native constraint validation. (Today a required disabled Custom
  Select, dropmenu picker or Upload still fails: a Migration line.)
- **A field whose component has not run yet.** Today Form answers from markup alone for Rating, Upload,
  Autocomplete and Time Picker boxes before their bundles land; a rule registered by that bundle is absent
  until then. `NDS.init.pending(field)` answers: does this field hold a registry entry flagged as having a
  rule whose init stamp is missing. Keyed on the init stamp, so the eval-to-init gap counts as pending; only
  flagged entries count, so a Tooltip or Copy inside a field never blocks it; a bundle that failed to load
  is not pending (the field answers as it does with no rule, so it is never blocked for good); a lazy
  component is not flagged. A **required** pending field blocks the submit with a "still loading" message,
  and Form calls `NDS.init.mount(form)`. Each new outcome is a Migration line.
- Messages move into each component's own `strings` section; each moved key is a Migration line, since a
  consumer pack served from `NDS_I18N_PATH` falls back to English for it (`check-i18n.mjs`).

| Component | Path | Rule or stamp | Re-check on | Focus and anchor (unchanged) |
|---|---|---|---|---|
| Checkbox group | rule | checked count against `data-min-checked` / `data-max-checked` / required | `change` | first box; the group |
| Radio group | rule | one picked, when required | `change` | first radio; the group |
| Multiselect | rule | checked count against `data-min-checked` / `data-max-checked` / required | `nds:multiselect:change` | trigger; the `.nds-multiselect` container |
| Taginput | rule | tag count, required; adds the `data-max-tags` check at submit (a Migration line) | its change event | typing input; its container |
| Upload | rule | rows not in error, required; a row still uploading blocks | `nds:upload:select`, `success`, `error`, `removed` | browse button; its container |
| Custom Select | rule | `.nds-select-value` not blank | `change` on the carrier | display input; `.nds-select` |
| Dropmenu picker | rule | its carrier not blank | `nds:dropmenu:select` (no re-check today) | trigger; the field that holds it |
| Autocomplete `data-strict` | rule | text equals the picked value; empty text passes | `input` | the text input; its container |
| OTP | rule | every box filled, when the group is required | `input` | first box; the group |
| Rating | rule | value above 0, required | `nds:rating:change` | first star; the group |
| Time Picker boxes | rule | its stamp on the hour box, plus required-and-empty | its own sync | hour box; the group |

Time Picker boxes are a rule, not the native pass: they sit in a `.nds-form-group`, which the container
pass skips (`nds-form.js:723`). Known edge, kept: a dropmenu picker in a phone field's prefix shares the
text input's container, so their two messages replace each other (as today).

### A7. Names (entry 9's reasoning, no exceptions)

A component is PascalCase; anything else (a core module, a helper set, a base, the loader) is lowercase.
Renames: `State` → `state`, `Status` → `status`, `Init` → `init`, `Audit` → `audit`, and `date` → `Date`
(decision 5: the loader registers it to fill `<time>` elements). Classes (decision 4):
`.nds-check-container` → `.nds-checkbox`, `.nds-radio-container` → `.nds-radio`, each part class checked
against entry 9 in the same pass (`kind: class` rows, which `migrations.yml` and the audit already handle).

- **Occurrences** (Opus count, 2026-10-20): `_js` 424; `scripts` 110 in 16 files; `.claude` 81;
  `components` 55, `core` 45, `ui-shell` 9, `examples` 7, `templates` 4, `utilities` 3, `guides` 2, `layout` 1,
  `foundations` 1; `AGENTS.md` 5, `NDS-INDEX.md` 3, `TODO.md` 1, `_plugins` 2; the published
  `_includes/NDS-IQ.md` 5 (only `publish-iq.py` writes it).
- **The rename script skips** `CHANGELOG.md`, `_data/migrations.yml`'s old names, `guides/migration.md` and
  `plans/`. It also catches the bare strings a `NDS\.State` regex misses: `check-banners.mjs:32,62`,
  `check-js-rules.mjs:231-234`, `run-audit.mjs:24` (the `[NDS.Audit]` console prefix).
- **Two scripts run against older builds** and probe both names: `run-audit.mjs` and the shipped
  `release-template/nds-verify.mjs` (`:210,293`).
- **The manifest:** `scan_namespaces` must read lowercase names first (A3), or `audit` loses its stub and
  `NDS.init.audit()` throws. A build test asserts `audit` is in the manifest.
- **Migration:** the audit cannot see a JS call (`nds-audit.js:28-29`), and `_data/migrations.yml` has no
  kind for one. Add a docs-only `kind: api`: its schema line, its exclusion in `migrations_js`
  (`js_processor.rb:228`), a label in `nds-audit.js:452`, and the filter in `guides/migration.md`. No alias
  and no warning getter (v2 renames take no aliases).
- `NDS.init` reuses the loader-hook verb `init`: entry 10's carve-out names it.

## 3. Applied to today's tree, in order

| # | Change | Rule | Check |
|---|---|---|---|
| 1 | Build guards and `scan_namespaces` (A3), then the renames (A7) by script, with `kind: api` rows; `NDS.date` → `NDS.Date` with them | A3, A7 | build, the manifest test, `check-banners.mjs --all`, `run-audit.mjs` |
| 1b | The class renames `.nds-check-container` → `.nds-checkbox`, `.nds-radio-container` → `.nds-radio`: markup in every page, SCSS, JS (Multiselect's options included), the audit's canon names, `kind: class` rows | A7, entry 9 | build, `check-css.py`, `run-audit.mjs`, the checkbox, radio and multiselect demos |
| 1c | Session Timeout's dialogs carry `.nds-session-timeout` (decision 6) | A7 | the session-timeout demo |
| 1d | Cookies names (decision 7): the UI → `NDS.Cookies`, the store → `NDS.consent`, cookie read and write → core `NDS.cookie`, `show()` removed, the bundle renamed | A1, A2, A7 | the cookies demo, a first-visit and a stored-choice load, `check-banners.mjs --all` |
| 2 | The state mechanism in core (S1) and the field's disabled / readonly effects (S2); core's mirrors, Multiselect, Taginput, Editor and Form's `FIELD_STATES` move onto it | A2.3 | `check-data-state-tails.py`, form, multiselect, taginput and editor demos |
| 3 | (dropped 2026-10-20: `nds-dialog.js` stays in delegated with Modal and Panel, per A3) | | |
| 4 | Date Picker + Time Picker: `NDS.Dropmenu.create(fc, opts)` stamps the field flags and menu class; `destroy()` removes them. Check Custom Select and Autocomplete against the same options | A2.1, A5, entry 10 | `check-menus-in-modal.mjs`, the picker docs |
| 4b | Every component that rides another (Dropmenu, Form, Custom Select, Modal …): a `create(el)` has its `destroy(el)`, and that `destroy` takes down the inner instances it built and every stamp, its own and theirs. Inventory first, then one fix per component | A5, entry 10, Framework Hosts | `NDS.init.destroy` + re-mount per component, `check-menus-in-modal.mjs` |
| 5 | Form `dismissOwn` → Feedback `dismissAll(container, opts)` with an ownership option | A2.1 | `check-form-reset.mjs` |
| 6 | The chip-removal focus handoff (Multiselect, Taginput) → core, beside `buildChip` | A2.3 | a11y Tab walk on both docs |
| 7 | `NDS.gridLastRow` → `_js/nds-grid.js`, `NDS.Grid`, in main (a late mark flashes the last row's border); `update(container)` → `refresh(el)`; its catalog `js:` row; a Migration line | A2.1, A7 | the grid doc page |
| 8 | `NDS.init.pending(el)` and the registry's "has a rule" flag | A6 | a fixture: a field before its bundle, after a failed bundle |
| 9 | The field and validation bases, the Form split, each component's rule (section 5); the dead `NDS.Form?.` guards go with it | A1, A4, A6, P1–P4 | section 5 targets |
| 10 | Dead guards on the other main namespaces (`NDS.Dropmenu?.`, `NDS.Link?.`) | A4 | build + a smoke run |

### Mechanical checks

The bundle map comes from `js_processor.rb`; the call graph that `tmp/xgraph.mjs` drew moves into
`scripts/` (tmp is disposable).
- `check-js-rules.mjs`: a `?.` or `if (NDS.X)` guard on a main namespace → finding (A4); a call from one
  injected bundle into another → verify, "its result must be unused or awaited" (A3); core or a base naming
  a component namespace → finding (A1); a `State.onAdd` / `onRemove` pair that runs one effect → verify,
  "register it as a state effect (S1)".
- `check-banners.mjs`: each catalog component's `js:` file exists and its banner names the component,
  loader-registered or not; a namespace's case matches A7.
- `js_processor.rb`: the A3 guards.

**Landed 2026-10-20 (step 2):** the main-guard, cross-bundle and base-names-a-component rules in
`check-js-rules.mjs` (31 dead guards and 7 cross-bundle calls reported on today's tree); the case rule
(`CASE_PENDING` lists the names a step still renames) and the catalog `js:` check in `check-banners.mjs`;
`assert_layers!` and lowercase `scan_namespaces` in `js_processor.rb` (today's tree passes: `NDS.dialog`
sits with Modal and Panel). Held back: the `state.onAdd` / `onRemove` pair check lands with S1
(change #2), since it would point at an API that does not exist yet.

**Landed 2026-10-20 (change #1):** the five A7 renames, five `kind: api` rows, the manifest's `audit`
test. Once the names were lowercase, `assert_layers!` and JSD-15 caught two cases the rules did not
foresee, now exempt with a reason: the loader (main's last file, called at runtime) and the audit (an
on-demand module, not a base). The audit label for `kind: api` was skipped: those rows never reach the
audit. Left on the old names: `.claude/skills/nds-iq-eval/` (scenarios and fixtures run against the
1.x templates; its SKILL.md notes the rename if the old-template check is dropped) and the published
`_includes/NDS-IQ.md`.

**Landed 2026-10-20 (change #1b):** `.nds-radio` was already the radio input's class, so the inputs took
part names, as Switch's `.nds-switch-input` already is: `.nds-check` → `.nds-checkbox-input`, `.nds-radio` → `.nds-radio-input`, and
`.nds-check-group` → `.nds-checkbox-group`, with the two container renames. The old `nds-radio` row is
scoped `&input`, so the audit never flags the new container. Switch followed, decided 2026-10-20: `.nds-switch-container` → `.nds-switch`, and the widget that held
the input and track → `.nds-switch-toggle` (its old row is scoped `&:not(.nds-form-container)`). `nds:switch:change`
still fires from the widget and bubbles through the field.

**Landed 2026-10-20 (change #1c):** both modals carry `.nds-session-timeout`; `CASE_PENDING` is empty.

**Landed 2026-10-20 (change #1d):** `nds-cookies.js` → `nds-consent.js` (`NDS.consent`: `get`, `allowed`,
`save`), `nds-cookie-consent.js` → `nds-cookies.js` (`NDS.Cookies`: `init`, `open`, `close`, bundle
`nds-cookies.min.js`), core `NDS.cookie`. The stored cookie names stay, so no visitor is asked again.
The bundle's new name needed a docs-only `kind: file` in `migrations.yml`.

**Landed 2026-10-20 (change #2):** `NDS.state.effect(token, scope, fn, cls)` in core; `cls` is a class that
spells the token too (Form's `nds-loading`). Core's mirrors, Form's field states and its `target` sync (S4's
effect, still in Form until #9), Multiselect, Taginput and Editor run on it. `apply()` re-runs the effects, so
Multiselect and Taginput call it after each chip render, and the field's disabled effect reaches `button.nds-chip`.
New: a field that ships `data-state="disabled"` in markup, or is mounted with it, now disables its inputs.
JSD-01 (d) flags an `onAdd` / `onRemove` pair on one token (it found all 5 old sites).

**Landed 2026-10-20 (change #4):** `NDS.Dropmenu.create(el, {menu, menuClass, click, keys, anchor})` writes the
wrapper class, the menu classes and the `data-dropmenu-no-*` / `data-anchor` flags, skipping any the author wrote;
`destroy()` takes back only those. Date Picker, Time Picker, Autocomplete and Custom Select pass options instead of
stamping by hand. Multiselect keeps its own `data-anchor` write: its authored wrapper may already be built by the sweep,
and `create()` on a live instance writes nothing. Custom Select gained `destroy(el)` (entry 10's pair): its build
leaves `formControl.ndsCustomSelect`, so `NDS.init.destroy` reaches it too, and Time Picker's unit selects use it.

**#4b inventory, 2026-10-20 (Sonnet, read-only; line numbers as of `e035b198`).** Each gap is checked in a browser
before it is fixed. Base first: Dropmenu's fix reaches every component that rides it.
- Base: Dropmenu `destroy()` leaves ~~`aria-haspopup`, `aria-expanded`, `role=menu`, `role=menuitem` (`:497-500, 512`)~~ (fixed),
  ~~the select-mode hidden input and trigger label (`:411-414, 473-475`), and the lazy-template once-listener (`:1285-1296`)~~
  (fixed: the pick stays on its item; the arm has a backref).
- Visible after a re-create: ~~Filter and Table column toggle leave `data-delay="500"` (`filter:1450`, `table:492`)~~
  (fixed; a re-create set it again, so nothing showed); ~~the column toggle builds a second Reset footer (`table:478`)~~ (fixed); ~~Side Menu's toggle stays shown and
  dead (`sidemenu:212`)~~ (fixed); ~~Taginput's chips still drive the dead instance (`taginput:307`)~~ (fixed: `NDS.buildChip` takes the owner's `signal`); ~~Filter's `_ndsFilterObserver`
  stays true, so later options are never wired (`filter:1690`)~~ (fixed); ~~Session Timeout reuses its dialogs with the old links
  (`session-timeout:95`)~~ (fixed); ~~Date Picker may keep its error and block the form (`date-picker:605`)~~ (confirmed, fixed).
- Leaks: ~~Pagination's ellipsis Dropmenu is not destroyed and `el.ndsPagination` has no `destroy()`; its stamps survive~~
  (fixed; `data-paged-initialized` stays, it releases the crit hold) —
  (`pagination:156-178, 271, 340-368, 450`); ~~Multiselect's destroy leaves its Dropmenu live and its stamps
  (`multiselect:79, 93, 139, 350`)~~ (fixed; the checkbox names stay, they carry the value); ~~User Feedback has no backref, so `NDS.init.destroy` misses it~~ (fixed; its message stays: it is the result, and a re-create shows it again)
  (`user-feedback:253, 320`); ~~Upload's per-file tooltips are not destroyed (`upload:675`)~~ (confirmed on every list redraw, fixed).
- Leftovers: ~~Date Picker `data-picker-mode` (`:517`)~~ (fixed); ~~Autocomplete forces `autocomplete="on"` and strips authored
  role/aria (`:671`)~~ (fixed; "on" is right, it is what the builder matches); ~~Tooltip leaves its built trigger, balloon, `aria-describedby`, `tabindex`, `role`, the stripped
  `title` (`:432`)~~ (fixed: the markup comes back as authored); ~~Table leaves `data-selection-target` and `tbody.id` (`:100`)~~ (fixed, with the wrapper it built); ~~Sort leaves `aria-sort`/`aria-pressed`,
  states and the trigger icon class, and nulls its backref (`:477`)~~ (backref fixed; the sort states stay: they are the rows' order, and a re-create seeds from them); ~~Scroll More leaves `data-axis` and its states
  (`:216`)~~ (fixed, with a backref and the divider it built); ~~an empty TOC gets no backref (`toc:57`)~~ (fixed: the sweep keys on the
  instance, so a later refresh builds it; destroy clears the active mark).
- API pairs: ~~a namespace `destroy(el)` is missing on Autocomplete, Breadcrumb, Filter, Sort, Table, Tabs, Tooltip,
  Upload; Progress has no destroy at all~~ (fixed, with Rating, Stepper, Chart, Accordion, Expandable; `Chart.create(el)`
  with no options now reads its data-chart-*); Form's goes with #9. Panel, Slider and Drawer reach `NDS.init.destroy`
  through the loader's `destroyEach`: no backref needed. Alert and Feedback build new elements: no destroy needed.

**Landed 2026-10-20 (change #5):** `NDS.Feedback.dismissAll(container, {own: true})` leaves the messages of fields
nested in the container, by the same field rule `create()` already used for replacing (one `FIELD` constant). Form's
`dismissOwn` is gone; its two callers pass `own`.

**Landed 2026-10-20 (change #6):** core `NDS.keepChipFocus(chips, render, fallback)`, beside `buildChip`; Taginput
and Multiselect pass their chip list, their re-render and their own control.

## 4. Owner decisions

1. **A7 renames: all four, decided 2026-10-20.** One naming pattern with no exceptions lets an agent guess a
   name and a script check it.
2. **Form: refactor to this architecture in v2, decided 2026-10-20.** It stays a component; validation and
   the field engine become bases beside it. Section 5.
3. **Main files are never dropped by a consumer, decided 2026-10-20:** NDS serves its bundles as built, so
   A4 removes the guards.
4. **Checkbox and Radio take their doc pages' names, decided 2026-10-20:** the classes are renamed to
   `.nds-checkbox` and `.nds-radio` (A7), so the files are `nds-checkbox.js` and `nds-radio.js`.
5. **A component has a root class or a loader entry, decided 2026-10-20.** That covers every registered
   namespace with no exception, and renames `NDS.date` to `NDS.Date`.
6. **Session Timeout gets a root class, decided 2026-10-20.** A check of every namespace against decision 5
   found `NDS.SessionTimeout` with no root class and no loader entry (a page script calls `init(options)`;
   it builds two `.nds-modal` dialogs). Its dialogs now carry `.nds-session-timeout`: no rename, and a
   styling hook as well. Every other namespace passes; `NDS.badge` is a function, which entry 10 names.
7. **Cookies: the names follow the class, decided 2026-10-20.** The 2026-09-30 split stays (a store in main,
   a lazy UI); only the names move. `NDS.Cookies` passed decision 5 by accident: `.nds-cookies` is the
   panel's class, and the panel is `NDS.CookieConsent`'s; the store's `show()` opened the UI, a base naming a
   component (A1).
   - The panel UI becomes `NDS.Cookies` (`nds-cookies.js`, its own lazy bundle), so its class, doc page
     (`ui-shell/cookies.md`), SCSS, `data-cookies-*` hooks, `nds:cookies:*` event and i18n section share one name.
   - The store becomes a base, `NDS.consent` (`nds-consent.js`, main): `get()`, `allowed()`, `save()`, the
     gtag signals and tracker clearing. It fires `nds:cookies:consent` for the Cookies component (entry 8).
   - The plain cookie read and write moves to core as `NDS.cookie` (`get`, `set`, `delete`), beside
     `NDS.cache`: Tables and User Feedback call it, and it knows no component.
   - `show()` goes; `NDS.Cookies.open()` replaces it.
   - Migration lines: every `NDS.Cookies.*` and `NDS.CookieConsent.*` method, and the lazy bundle's file
     name, which a site that self-hosts its bundles under a strict CSP lists by hand (`ui-shell/head.md`).

## 5. Form under the architecture

### Today (`_js/nds-form.js`, 1,937 lines)

| Concern | Lines (about) | Whose markup |
|---|---|---|
| Field chrome: states, loading, clear, password toggle, switch, number stepper, native select, digits, auto-fill | 560 | Form's own |
| Status display: `setStatus` / `clearStatus` / `getStatus`, feedback placement | 190 | Form's own container, through Feedback |
| Validation: native pass, its own groups, national ID and IBAN | about 320 | Form's own |
| Validation for other components (A6 table) | about 200 | **theirs** |
| Submit wiring: `<form class="nds-form">`, `data-ajax`, pending, `nds:form:*` | 140 | Form's own |
| Banner, strings, init, API | 220 | |

- It has no instance and no `destroy()`. Most listeners are delegated on `document`; the per-element ones
  (switch, number buttons, clear, password toggle, native select, the per-form submit, the group change,
  the Multiselect change, auto-fill clicks) carry no signal.
- The group methods (`validateCheckboxGroup` …) are public: in doc tables and examples
  (`checkbox.md:260-285`, `radio.md:228-236`, `otp.md:257`, `form.md:674-679`). No JS file calls them.

### Why the refactor

Structure first: Form knows no component, every part has one name, state has one mechanism. Speed is a
guard, not the goal.

**Speed, measured and not yet reconciled** (phone, CPU x6.6):
- 2026-06-02, isolated `initializeContainer` on cloned controls: ~4.8 ms at 100 controls, cold (no forced
  layout), "no perf edit clears the bar" (memory `project_forms_init_cold_cheap`).
- 2026-10-20, the loader's own timing (`trace-busy.mjs INITS=1`): 27 ms of 41 ms on
  `examples/registration.html`, 14 ms on `components/form.html`; a CPU profile of the same load says 12 ms.
  The file grew from ~1,300 to 1,937 lines, and the methods time different spans.
- Re-measure with June's method (20 / 50 / 100 controls) before claiming any speed gain.

### Target: a field base with type hooks

**Plain files do not split it.** Cut by doc page into plain files, Checkbox, Radio and Switch break two
ways: the code scatters (the radio-group repaint must reach back into Form, because `refresh(input)` fires
no event), and each file adds its own `document` listeners. **A field base with type hooks does.** One base
owns the listeners and calls each part through a hook it registered, so the parts stay whole, Form names
none of them, and an event runs one handler.

**Files** (all in main; bases first, A3)

| File | Layer | Holds | Size (about) |
|---|---|---|---|
| `nds-field.js` → `NDS.field` | base | the delegated listeners; resolves the target's field (today's `ownControl` / `ownField` rule, so a nested Editor field never answers for its outer one); field states; the first-paint pass; reset and back-forward re-sync; the type registry | 450 |
| `nds-validation.js` → `NDS.validation` | base | the native pass, the rule registry, messages; returns results | 350 |
| `nds-form.js` → `NDS.Form` | component | status display (through Feedback); `validate(el)`; `<form class="nds-form">` submit; the text-field types: text, number stepper, native select, password toggle, clear, digits, phone, national ID and IBAN, auto-fill; the loading shell | 700 |
| `nds-checkbox.js` → `NDS.Checkbox` | component | its type (indeterminate clears on a pick), `setIndeterminate` (moved from Form; Selection calls it), its rule and `validate` | 80 |
| `nds-radio.js` → `NDS.Radio` | component | its type (repaints its name group on change and on refresh), its rule and `validate` | 50 |
| `nds-switch.js` → `NDS.Switch` | component | its type (track press, keys), `nds:switch:change` | 90 |

**The type hook** (internal; on the base's banner):
`NDS.field.addType(name, { match, on: { <event>: fn }, refresh })`.
- `match(input, control)` says whether the type serves this field (`input.type === 'radio'`, `.nds-switch`).
- `on` maps any event the type needs to its handler. The base adds one delegated `document` listener per
  event name, the first time any type asks for it, and never a second. Non-bubbling events use their
  bubbling twin (`pointerleave` → `pointerout`, `focus` → `focusin`). Today's set: focusin, focusout,
  mousedown, mouseup, mouseout, keydown, paste, beforeinput, input, change, click, submit, reset,
  pointerdown, pointerup, pointerout.
- The base runs its own sync first, then the matching type's handler. The order lives in one place.
- **The knot:** `NDS.Form.refresh(input)` → the base re-syncs the field and calls the type's `refresh`.
  Radio repaints its group there. No event, and Form never names Radio.
- `refresh(el)` takes any element (entry 10, the loader hook): an input re-syncs its field, a container
  every field inside it. `create(el)` runs the first-paint pass over `el`.
- The type registry holds functions, never elements (JSA-23).
- Checkbox, Radio and Switch have no `init()` and no loader entry: JSD-07 and PERSONA entry 9 get a
  "type part" carve-out, and `check-banners.mjs` checks them through their catalog `js:` row.

**Public API (entry 10).** `NDS.Form` keeps `init`, `create`, `validate(el)`, `setStatus`, `clearStatus`,
`getStatus`, `setState`, `isNationalId`, `isIban`; `syncState(input)` → `refresh(el)`. Moved:
`setIndeterminate` → Checkbox; the group checks → each component's `validate` (A6). Each move is a
Migration line. The dead `NDS.Form?.` guards in callers go (A4).

**Performance rules**
- P1. **No per-field wiring at init.** Every listener is delegated (the submit and group change included).
  No element holds a listener of its own, which also settles JSA-23.
- P2. **The first-paint pass stays eager, one batched pass, every read then every write.** It holds what
  today's init tail does before the reveal: required stamping (`required`, `aria-required`), the disabled /
  readonly / filled container stamps, `novalidate` on each `<form class="nds-form">`, the national ID and
  IBAN stamps (an untouched pre-filled bad value must fail the submit), the autofocus restore, and un-hiding
  the `[hidden]` wrappers, the loader's stated reason Form is critical.
- P3. **One listener per event name**, whatever the page holds.
- P4. **Parts and rules do no DOM work at load.** Registering is one object write. Validation runs only on
  a submit, a blur or a re-check event.

**Targets** (interleaved A/B, median of 3):
- Form's init: no slower than today, by June's method and by `trace-busy.mjs INITS=1`.
- One tap and one keystroke in a field (`trace-click.mjs`): no slower than today.
- `check-form-reset.mjs` (with `OLD_JS=`), `check-a11y.mjs` on the form pages; `doc-check.mjs` on `form.md`,
  `checkbox.md`, `radio.md`, `switch.md` after the owner's go-ahead (AGENTS.md).

### State: one mechanism in core

**Today the same mechanism is built six times.** "A `data-state` token on an element drives an effect,
applied once, whoever wrote the token":

| Where | Tokens | Effect | Hears |
|---|---|---|---|
| core `MIRRORS` (`nds-core.js:871`) | loading, hidden, has-more, always-open, dropbox | a class, plus `aria-busy` for loading; remembers what it wrote | NDS.State, bare attribute, markup at load, added markup (microtask) |
| Form `FIELD_STATES` (`nds-form.js:221`) | disabled, readonly, loading | inputs' `disabled` / `readOnly`, action buttons, the loading shell; remembers what it applied | NDS.State (sync, on purpose, `:216-218`), bare attribute and `class` (its own filter) |
| Form `syncTarget` (`nds-form.js:1089`) | focus, active | `target` on the field's control | NDS.State |
| Multiselect (`nds-multiselect.js:59`) | disabled | its chips' `disabled` | NDS.State; `State.apply` after `init()` builds the chips (`:94-95`) |
| Taginput (`nds-taginput.js:60`) | disabled | its chips' `disabled` | NDS.State only |
| Editor (`nds-editor.js:661`) | disabled, readonly | its editable and toolbar | NDS.State only |

Not in the census, on purpose: Drawer (`:257`), Side Menu (`:215`) and FAB (`:233`) observe `data-state` to
react to a sibling, not to run an effect for a token.

**Target**
- S1. **One core mechanism** on `NDS.state`: register an effect for a token and a scope, `fn(el, on)`, fired
  once per real change. Writes through `NDS.state` fire it synchronously (Form relies on that); a bare
  attribute, markup at load and added markup fire it in the existing microtask. It remembers per element
  what it applied, so an author's own `disabled` or `aria-busy` stays theirs. A registration after load (an
  injected bundle) scans once for its token. `onAdd` / `onRemove` stay public; the mechanism uses them.
  Watch one cost: each registered token joins the pooled `onDOMAdd` selector.
- S2. **The field's disabled and readonly effects reach every control in the field** (inputs, buttons,
  chips), registered once by the field base. A component that renders controls into a field after load
  (Multiselect and Taginput chips, at init and on every `setValue`) re-applies the field's effects after it
  renders, as Multiselect does today; then their chip hooks go. Editor keeps its own effect for the
  editable and toolbar. Verify that no button in a field must stay live when the field is disabled.
- S3. **The loading look keeps its JS shell.** A CSS-only spinner was considered and dropped: the shell is
  a `<button>` with a translated `aria-label`, `aria-busy` is set only on the token path, the
  `data-loading-slot` hook is public, a descendant rule would reach nested fields, and a field with no
  action slot needs one built. So `class` stays in the attribute filter for the authored `nds-loading`
  spelling; measure its cost before acting on it. (Slider adds `class` only on pages with a slider.)
- S4. `focus`, `active`, `typing` and filled come from input events and stay in the field base; the
  `target` derivation becomes a field-base effect.

### Before building

- Each component's rule lands with that component, with a fixture that submits it empty, filled, disabled,
  before its bundle runs and after a failed bundle.
- `_custom-select.scss`: `.nds-select` is also the native select's container (`form.md:555`,
  `_form.scss:161-173, 376-410`), so only Custom Select's own rules move; the new partial gets its line in
  `nds-main.min.scss`.

## 6. Where the rules land

- AGENTS.md: a "Shared Logic" section, one line per rule A1–A5.
- PERSONA.md: entry 9 gets the naming rule, its reason and the "type part" carve-out; a new entry 11 holds
  the layers (A1–A3) with the rejected alternatives (the doc-page split, a base that renders, the CSS-only
  loading look). Entry 8's example "`nds-form.js` fires `nds:switch:change`" and its Cookies carve-out are
  corrected. Entry 10 names `NDS.init` beside the loader hooks. Through the `evolve` gate.
- RULES-JSD.md: JSD-05's `verify` judgment points at A2; JSD-08 and JSD-12 at A4; JSD-07 gets the type-part
  carve-out.
- `NDS-INDEX.md` (3 old names), `core/init.md` (`pending`), `_data/migrations.yml` (`kind: api`).
- `_includes/NDS-IQ-draft.md`: check whether the consumer rules need the naming pattern (it has no naming
  line today); load `nds-iq-eval` first.
- The CHANGELOG is written at release.

## 7. Fresh review, 2026-10-20 (Opus)

26 findings, each checked against the code before it was taken. All are folded in above; the ones that
changed the design:
- Lowercase namespaces get no manifest row (`js_processor.rb:144`), so the `Audit` rename would have
  broken the audit (A3, A7).
- `pending` as first written blocked fields that hold a Tooltip, and blocked a failed bundle's field for
  good; now keyed on a flagged entry's init stamp (A6).
- The group methods are public and return more than `validate(el)`; they become each component's
  `validate` (A6).
- The audit cannot see JS renames and `migrations.yml` has no kind for them: `kind: api` (A7).
- Deleting the chip hooks would leave late-built chips enabled: S2 re-applies after a render.
- The CSS-only loading look lost the spinner's accessible name and more: dropped (S3).
- "A base draws nothing" contradicted `NDS.dialog`: now "creates no markup and shows no message" (A1).
- The loader has its own layer; the hook list covers every event Form uses; P2 lists the whole init tail;
  Time Picker boxes are a rule; the change order puts the state mechanism before the Form split.

## Order

1. Rules land (section 6), one commit.
2. The mechanical checks, with self-test cases, one commit.
3. Section 3 in its order.
4. Code commits carry their banners and catalog rows (`check-banners.mjs` fails otherwise). Doc pages get
   one pass per area once its shape has settled.
5. The section 5 targets, measured A/B, before Form is called done.
