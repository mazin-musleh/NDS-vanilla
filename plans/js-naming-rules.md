# Naming: the underscore and internal function names

Status: IN PROGRESS, step 3 of section 7. Design agreed 2026-10-20; PERSONA landed 2026-10-21.

## Progress (read this first)

**Done, on `main` (2026-10-21):**
| Commit | What |
|---|---|
| `a654d432` | Step 1: PERSONA entries 1, 2, 5, 6, 10, 12 per section 4; JSA-23(a), JSD-18, JSP-06, JSP-09 |
| `9d582268` | Step 1: once-per-page bundle guard (`js_processor.rb`, entry 12 rule 17), `scripts/check-bundle-once.mjs`; table window flag gone |
| `9d014bcb` | Step 2: `check-js-rules.mjs --names` (the pass is `scripts/lib/js-names.mjs`) |
| `57aafd6d` | Step 3: no `_` on bindings (P12.13), `scripts/rename-bindings.mjs` |
| `c5a9a143` | Step 3: classes `Nds{Name}[Part]` (P12.7), PascalCase module objects camelCase |
| `621b9846` | Step 3: UPPER_CASE only for a primitive (P12.8); loader registry is `components` |
| `7433f0d7` | Step 3: verbs, acronyms, whole words on every binding, 1,979 renames (P10.4 / P10.3 / P10.8 / P10.0) |
| next commit | Step 3: class members, 520 renames in 25 files (P12.11 + their verbs and words); 58 public members onto 13 banners; `scripts/rename-members.mjs` |

**Where the work list stands** (`node scripts/check-js-rules.mjs --names`, a count per rule on the last lines):
94 findings, 121 to verify. P12.11 0; P10.4 22, P10.3 2, P10.8 4, all on a banner but `Sort.opts` (public: section 3);
P12.14 element data 50 (+49 verify); P12.12 cross-file `_` 12 (+4); P12.3 storage keys 4; P10.0 57 verify. Lines tagged
"on the banner" are public: section 3, step 4, not step 3.

**Public members the step found, for section 3** (names that fail entry 10): `Dropmenu.applyPosition` → `syncPosition`,
`applySelection` → `setSelection`; `Filter.updateUrlParams` → `syncUrlParams`, `applyFilters` → `syncFilters`,
`populateFilter` → `renderFilter`; `Table.recheckWidth` (responsive) → `syncWidth`; `Multiselect.apply` (no rule fits:
`commit`?); `Sort.opts` → `options`; `Swiper.updateState` → `syncState` (the national-day-96 pack overrides it on the
instance: rename both in one step); `Toc.update` (already listed). Checks read internals as public API
(`TimePicker.elements` / `isPanelCreated`, Filter's `criteria` / `queryAll` …): the plan's rule made them banner lines.

**How the member step was made:** `node scripts/rename-members.mjs <map.json>` (header: `at`, `not`, `foreign`,
`--sites`, `--comments`), batches per component family to Sonnet with a brief (the BRIEF lived in `tmp/members/`:
the rules of section 2, a cross-file table so one meaning gets one name: `setupEventListeners` / `bindEvents` →
`_addEventListeners`, `emitEvent` → `_dispatchEvent`, `handleKeydown` → `_handleKeyDown`, `valid` → `_valid`). Traps met:
`check-banners.mjs` matched `emitEvent(` (now `_dispatchEvent(`); JSD-19 matched `.valid` (now `._?valid`); the names
check skipped the words of a `_` field (now checked); the rule files cite members (RULES-JSA/JSD/JSP/JSS).

**After members:** P12.12 cross-file `_` (each break names its home first, section 1 "Breaks today"); the WeakMap
move (P12.14, entry 12 rule 14, browser checks); then step 4, public renames with Migration rows (section 3,
including the names the check added below it, the storage keys and `window.NDSInitConfig`); step 5 speed; step 6
the checks fail the release.

**How the step-3 commits were made** (`tmp/` is disposable, so the method lives here):
- Work list per file: grep the `--names` lines for the rules, drop "on the banner"; pack the files into batches of
  about 280 lines; one Sonnet subagent per batch writes `{ "file.js": { "name": "new", "c@123": "cell" } }` after
  reading the code, with the verb table (entry 10) and the short-word list (rule 8) as its brief, and fixes every
  `skip` the dry run prints. A name keyed `name@line` renames one binding; a bare name renames every binding of it.
- Review the function renames (bare keys) by hand: one name per meaning across files (`fieldCheck` → `checkField`
  everywhere), and a local behind a public key takes the name section 3 gives the key.
- `node scripts/rename-bindings.mjs --map <json>` dry run, then `--apply`; `ruby _plugins/js_processor.rb`; a binding
  rename leaves the bundles byte-identical or changes only Terser's choices (read every changed token). Event packs:
  `bundle exec jekyll build`, `python scripts/mkevent.py`; a pack that differs only in line endings and zip times is
  restored with `git checkout -- docs-assets/events`.
- Diff `node scripts/check-js-rules.mjs` before and after (line numbers stripped), `--self-test`, `node
  scripts/check-banners.mjs --all`, `node scripts/check-audit-citations.mjs`, `node scripts/check-bundle-once.mjs`.

**Traps met so far** (section 6 has the rest):
- Scripts read `_js/` by name: `js_processor.rb`'s registry regex (`const components = [`), `check-i18n.mjs`
  markers (`'const isPm ='`), `check-js-rules.mjs` FULL_TAG and ALLOW. Search every old name over all tracked files
  with Python: a `git grep -E` alternation of hundreds of names fails silently and prints nothing.
- A whole-name rename rewrites comments, but never for a plain word (`active`): such a comment keeps the old name.
- A shorthand `{ old }` becomes `{ old: new }`, so a public key never moves in step 3.

**Gates:** start each step on a clean tree; another session may work in this repo, so stage files by name and
leave its changes alone; bulk renames go to subagents (Sonnet), the decisions and the review stay here; each
commit message goes to the owner first; no push; the speed check of step 5 includes the input click (owner).

**Owner directives (2026-10-20), do not reopen:**
- Every name is decided by the rules in this plan, never by an owner A/B. A meaning the rules leave open
  becomes a new PERSONA decision with its reason, decided by the planner.
- Use counts never decide (PERSONA's own principle).
- Full scope in v2: internal and public names, the whole tree, not file by file later.
- Checked against Google's and Airbnb's guides, the DOM and Bootstrap/React/Vue (sections 1 and 2 say
  where each rule stands).
- v2 renames take no aliases (`plans/shared-logic.md`, Migration).

**Scope: the whole tree, in v2 (owner, 2026-10-20).** Every rename lands now, internal and public, not
file by file later: a major is the one window for public renames, and a tree that already follows the
rules is what lets `check-js-rules.mjs` and `nds-js-audit` fail on drift instead of listing it. Entry 12
states this scope itself: PERSONA's header leaves core, the loader and docs out, so the entry widens it the
way entries 7 and 11 do.

## Goal

Every name follows a rule, so an agent can guess a name and a script can check it, with no owner call
per case. PERSONA entries 9 and 10 already cover component names and PUBLIC methods. This plan covers
what they leave open: what `_` means, and how INTERNAL functions are named.

**How a pick is made.** When two names mean the same thing, the first rule that decides wins:
1. A PERSONA canonical already gives that meaning a name (a canonical, not a symbol an entry cites), if
   its Why is true and it passes every other entry. If not, fix the entry first (PERSONA's update workflow).
2. The web platform's name (DOM, ECMAScript).
3. The name well-known libraries use (Bootstrap, React, Vue), as entry 10's "Why" argues.
4. A name that already means something else, in NDS or in JavaScript, loses.

Use counts never decide: PERSONA measures code "against deliberate choices instead of against the
loudest accidental majority", and "raw adoption counts" never set a canonical. A meaning these four
leave open is a new PERSONA decision with its reason written down, not a vote. **This order moves into
entry 12** with the rules: once the plan is history, it is how the next row gets added.

## 0. PERSONA fixes first (landed 2026-10-21)

Pick rule 1 trusts PERSONA, so the entries were checked first. Each fix keeps the outcome:
- Entry 2: the Why cited Web Components, Vue, React classes and Backbone, none of which says `destroy`;
  now Swiper, Chart.js, Choices.js, flatpickr, Splide, Tippy, and `dispose` (Bootstrap 5) is rejected because
  every release ships `destroy`. The canonical block's `_offDOMAdds` → `_offDomAdds` (entry 10 rule 3).
- Entry 3.1: the concept said "focus-trapped and dimmed", but its discriminator admits Dropmenu and
  Tooltip; now "singleton-open", with trap and dim as the strongest form.
- Entry 4: a base logs `[NDS.<name>]`.
- Entry 5: `_ndsInitialized` cited in `nds-field.js`; `_switchInitialized` no longer exists.
- Entry 7: the file count dropped (`SCOPE` is the source).
- Entry 9: its camelCase example was `NDS.badge`, a noun; now `NDS.buildChip`.
- Entry 10: rule 4 says the table names rival meanings only, any other verb-first whole word passes;
  rule 5 says a callback is not a value (`addEventListener(type, listener, options)`); rule 7 adds 3.3's
  `create` returning its surface; `goTo` credited honestly (Bootstrap's `to(i)` is not verb first); carve-outs
  for `NDS.init.initialize()` and `NDS.validation.check`, where the table's verb would repeat the namespace.
- Update workflow: an entry that breaks another, or cites a source wrongly, is fixed before anything is
  picked from it.

Also landed: entry 12, a map from every kind of name to its rule, with rules for the ten kinds that had
none (`window` globals, consumer settings, storage and cookie keys, URL parameters, `data-*` hooks, state
tokens, internal classes, module constants, true/false values, event `detail` keys). Section 3 lists what they
break.

Left for section 4 because it changes an outcome: entry 1's carve-out approves `el._ndsFilterAC`, an
abbreviation its own audit flags (`_docAC`).

## 1. The underscore

### Today

| Where | Count | State |
|---|---|---|
| `this._x` on classes, `_x()` on namespace objects | 126 `this._x`, 162 plain `this.x` | entry 10 says `_` = internal, not the reverse |
| Data stored on a page element (`el._ndsFilterAC`) | ~40 names | 19 have no `nds` in the name |
| Names inside the file's IIFE (`let _initDone`) | 33 files | mixed: most files use plain names; `nds-pagination.js` has 57 `_` and 31 plain |
| `window.__NDS_*` | 4 | `BUNDLES` (build), `EVENT_CSS`, `THEME_ACTIVE`, `THEME_HOOKS` (packs and Theme) |

### Rule (PERSONA entry 12)

1. **Public means on the banner** (entry 7, which `check-banners.mjs` already checks). Every class or
   namespace-object member not on the banner takes `_`, which means "reachable from outside, not API".
   Carve-out: entry 1's AbortController names stay plain; its reason holds, and the banner, not the mark, is
   the contract. Rejected: "a plain name is public", which made 162 instance fields (`this.dropmenu`,
   `this.box`) promises, each rename a breaking change (AGENTS.md, Framework Hosts).
2. **Only the file that defines a `_` name reads or writes it.** Another file that needs it gets a public
   name, or the value moves to a base or core (entry 11). Each break below names its home before the rename.
3. **Module-scope names (IIFE or ES module) take no `_`.** They cannot be reached, so the mark says
   nothing. This includes entry 5's `_initDone` → `initDone` (11 files); entry 5's text changes with it.
4. **Private data per element lives in a module `WeakMap` keyed by the element, never on the element.**
   The page cannot see or clash with it, and only its own file can reach it, so rule 2 holds by
   construction. 15 files already do this (`nds-core.js`, `nds-pagination.js`, `nds-drawer.js` …);
   Bootstrap 5 keeps its per-element data the same way (its `Data` module). Entry 1's `el._ndsFilterAC`
   example changes with it. Two limits:
   - **A WeakMap never holds the instance.** The instance stays `el.nds{Name}` (entry 9), the backref
     `NDS.init.destroy(view)` walks; a WeakMap of instances is JSA-23(a)'s registry.
   - **It is not freed by itself.** A live AbortController or `NDS.on*` handle keeps the element reachable
     through its listener, so the entry lives until `destroy()`, reached through the backref, releases the
     resource and deletes the entry, as with a stamp (AGENTS.md "Undo"). JSA-23(a)'s text, which names only
     the `_nds` key form of unreachable state, gains the WeakMap form.
5. **A WeakMap is named for what it holds** (`abortControllers`, `perPageDefaults`); one holding
   AbortControllers ends in `AbortController(s)`, as entry 1 requires on an instance.
6. **No `#private`.** `#` works only inside a `class`; most NDS namespaces are object literals, which
   cannot hold it, so `_` is the one mark both shapes take. Bootstrap 5 uses the same `_` mark.
7. **No `_` flag on a public namespace.** It is a module-scope variable (rule 3).
8. **Every property NDS writes on `window` is `__NDS_{NAME}`** (landed as entry 12 rule 1), as the build
   and inline-script bridges already are. `window.NDS` is the public namespace, not an internal global. Entry 9 bars a component global; this covers
   the rest (`__NDS_LOADED_{BUNDLE}`, rule 9; entry 5's `window.ndsTableSubHandlerInitialized` is deleted by it).
9. **A bundle runs once per page** (decided 2026-10-21). A page can load one twice: the tag written twice,
   Turbo or pjax re-running body scripts, a framework view adding the tag on mount. Today the second copy
   resets every module latch and wires every singleton again, and only the table guards against it, for one
   listener. `js_processor.rb` wraps each bundle: `if (window.__NDS_LOADED_{BUNDLE}) { console.warn(…) } else
   { window.__NDS_LOADED_{BUNDLE} = true; … }`, so the second copy runs nothing and says so. Stripe.js and
   Alpine.js do the same (skip and warn). One check per bundle, so no component carries its own defence: the
   table's window flag goes, and the init guards move to a module `WeakSet` (rule 4). Ceiling: two different
   versions on one page, the first wins.

CSS already uses the same meaning: `--_x` is a private knob.

**Against the common guides.** Rule 3 matches Airbnb (22.4) and Google: no underscore on names nothing
outside can reach. Rule 1 does not follow Airbnb, which bans a leading `_` everywhere because it hides
nothing. Bootstrap, Lodash and most DOM libraries use it anyway, and NDS has no other mark that works
on an object literal (rule 6). The ES standard mark, `#`, is not used for the reason in rule 6.

### Breaks today (hints: re-measure)

- Rule 2, each with the home it moves to (decide per name before the rename): `NDS.i18n._lang()` called
  from `nds-date.js` and `nds-audit.js` (the audit also reads `NDS.i18n._files`); `nds-date-picker.js`
  writes Dropmenu's `_lastClickX`; `nds-loader.js` writes Pagination's `_ndsPerPageDefault` (also a loader
  naming a component, entry 11); `_ndsScrollStop` shared by `nds-code.js` and `nds-scroll-more.js`;
  `nds-docs.js` writes Tooltip's `_hoverDelay` (docs-only file). A module WeakMap cannot be shared between
  files, so the two shared ones need core, a base or a public name.
- Rule 4: every `el._nds*` expando (~40 names, `_ndsFilterAC`, `_ndsPerPage`, `_ndsScrollStop` …), and
  the ones without the prefix: `panel._modal` `_noFocus` `_opener` `_silent` `_openAC` `_panelAC` `_cancelAnim` `_cancelResize`,
  `feedback._onDismiss` `_hiddenPermanent` `_targetWasHidden`, `wrapper._content` `_abortController`
  `_offResizeObs`, `btn._cooldownAC`, `container._sliderOffResize`, `target._lastSize`.
- Rule 5: today's AbortController names mix `AC`, `Abort` and `_abortController`; they become WeakMap
  names under rule 4.
- Rule 1: every member missing from its banner and lacking `_` (the check lists them).

None of these is on a banner, so no Migration rows.

## 2. Internal function names

Entry 10 names public methods. 1,513 function names in `_js/` (docs and showcase left out) use six
verbs for "wire up", three for "make DOM", four for "make the DOM match state". Rule: **entry 10's rules
1–3 apply to every function, public or not** (verb first, `is`/`has` for true/false, acronym = one word),
plus this table. **The table is a ban list, like entry 10's:** it names the meanings that had rival verbs.
Any other verb-first whole word passes (`setX`, `scheduleX`, `placeX`), and the platform's own verbs stay
(`format` as in `Intl`, `parse` as in `JSON`). The check flags a replaced verb as a finding and a first word
it does not know as `verify`.

| Meaning | Verb | Replaces (uses) | Rule that decided |
|---|---|---|---|
| Make new nodes and return them | `buildX` | `createX` for DOM (17), `generateX` (5), `…DOM` suffix | 1: entry 10 rule 7, `create` returns an instance or a 3.3 surface |
| Make a node exist, once | `ensureX` | — | new decision: no platform or library name; "ensure" says the call is safe to repeat |
| Put built nodes into a container, replacing its children | `renderX` | `populateX` (3) | 3: React, Vue, Lit |
| Make existing nodes match state: attributes, properties, classes; no new nodes, no input | `syncX` | `update…()` with no input, `applyX()` with no input (`applyFilters`, `applyPosition`), `paintX`, internal `refreshX`, `recheckX` | 4: `update` means two things today (`Chart.update(newOpts)` takes input, `Toc.update()` does not); `apply` is `Function.prototype.apply` |
| Take a value and write it in | `setX(value)` | `update…(value)`, `applyX(value)` | 1: entry 10 (`getX` / `setX`); `apply` loses on 4 |
| Add listeners | `addXListeners` | `bindX` (27), `wireX` (15), `attachX` (6) | 2: `addEventListener`; `bind` also loses on 4 (`Function.prototype.bind`) |
| One-time wiring of a part (internal only), and its undo | `setupX` / `cleanupX` | `initializeX` (30), `initX` (29); `teardownX`, `unwire` | 3: React's effect is a setup function returning a cleanup; `init` loses on 4 (the loader hook). Entry 10 still bars `setup…` on a public method |
| Undo one open cycle | `cleanup` | — | 1: entry 2 |
| A listener function | `handleX` | `onX` (34), `xHandler` | 3: React; `on` loses on 4 (`NDS.on*` subscribes) |
| The handle `NDS.on*` returns | `offX` | `unsubX`, `stopX` | 1: entry 6 (`offResize`) |
| Fire an event | `dispatchX` (12) | `emitX` (5) | 2: `dispatchEvent` |
| A value as held: stored or computed | `getX` | noun names (`pageBounds`, `labelFor`, `listOf`, `navOf`, `realChildAt`) | 1: verb first |
| A string source (attribute, URL, storage) parsed into a typed value / back | `readX` / `writeX` | — | 2: `Clipboard.readText` / `writeText`; `getX` returns a value as held, `readX` parses |
| Search the DOM, may return `null` | `findX` | — | 2: `Array.prototype.find` (returns `undefined` when nothing matches) |
| Turn an argument (id, selector, element) into the thing | `resolveX` | — | 2: `Promise.resolve` (a value or a thenable becomes a promise) |
| Convert | `toX` / `fromX` | — | 2: `toString`, `Array.from` |
| True/false | `isX` / `hasX`, or the DOM's `matches` / `contains` | `inX` (5), `xExists`, `itemMatchesX` | 1, 2 |

**Carve-out: public callback keys keep `onX`.** An option a caller passes (`onClick`, `onRemove`,
`onComplete`, `onChange` …) and a part key `NDS.field.addType` reads are public names, and React's own
rule is a `handleX` function passed as an `onX` prop. The `handleX` row renames listener functions only.

**Against the common guides.** `handleX` for a listener and `onX` for subscribing follow React's docs;
`dispatch`, `matches`, `contains`, `toX` / `fromX` are the DOM's and ECMAScript's own names; `is` / `has`
and verb-first are in Google's and Airbnb's guides. An acronym as one word (`toCsv`) follows Google's
camelCase rule (`loadHttpUrl`); the DOM itself is mixed (`innerHTML`, but `getElementById`), so it gives
no answer. Every row is decided by a canonical, the platform or a library, except `ensureX`, a decision
with its reason; none by a count.

**Whole words** for function and member names, as entry 1 argues: `fmtVal`, `normSeries`, `resolveOpts`,
`pageLi`, `pageLiM`, `dockPos`, `closeBtn` get full words. Locals and parameters may use a fixed short list,
no other: `el`, `e`, `i`, `j`, `x`, `y`, `fn`, `opts`, `btn` (entry 9's own carve-out for `.nds-btn`).
Same compound, same spelling: `sanitizeFileName` / `sanitizeFilename` → one.
Acronyms: `toCSV`, `toXLSHtml`, `createDropdownDOM`, `syncUI`, `isPM`, `initializeIPV`,
`_renderXLabels`… → `toCsv`, `buildDropdownDom`, `syncUi` (single-letter axis names `X`/`Y` are not acronyms).

## 3. Public names the rules reach

v2 is the major. **A name on a banner is public** (entry 7: banners ship in the template zip, and consumer
agents read them) and gets a Migration row when a released template shipped it (check against the last
`v1.x` tag with `git grep`). A name born in v2 needs no row. No aliases.

**Shipped in v1.12.0, a row each in `_data/migrations.yml` (`kind: api`):**
- `NDS.onDOMAdd`, `onDOMRemove` → `onDomAdd`, `onDomRemove` (entry 10 rule 3).
- `Toc.update()` → `refresh()` (entry 10's verb for "read again"; banner `nds-toc.js`, doc `components/toc.md`).
- `Chart.update(newOpts)` → `setOptions(newOpts)` (entry 10: "anything else `getX` / `setX`"; banner
  `nds-chart.js`, doc `components/chart.md`).
- `NDS.state.apply(el, ...tokens)` → `refresh(el, ...tokens)`: it re-runs the effects after a render, entry
  10's "read again"; `apply` is `Function.prototype.apply`.
- `NDS.badge(el, count)` → `setBadge(el, count)` (rule 1: verb first).

**Found by the check (2026-10-21), to decide by the pick order before step 4** (`--names`, lines tagged "on the
banner"): `NDS.isRTL` (acronym), `NDS.onAttrChange` and `NDS.resolveEl` (short words), `Multiselect.populate`,
`Pagination.updateRecords`, `Sort.apply`, `Upload.refreshUI` (replaced verbs), `Table.createResponsive` /
`createColumnToggle` (DOM or instance?), and noun-first names: core's `strings`, `safeMerge`, `rafThrottle`,
`afterPaint`, `latinDigits`, `uniqueId`, `cellText`, `ownParts`, `ownItems`, `safeUrl`, `stickyHeaderBottom`,
`viewportPadding`, `visibleBox`, `homeOf`, `topLayer`; `Dropmenu.menuOf`; `Export.csv` / `xls` / `pdf`; the
loader's `audit` and `owns`; Accessibility's `state`; `NDS.DatePicker.CalendarConfig`, an object in PascalCase (rule 8: camelCase). The consumer setting
`window.NDSInitConfig` (rule 2: `NDS_{NAME}`). Shorthand namespaces the check first missed: `TimeDate.updateDate` /
`updateClock`, `CityWeather.updateCity` / `updateWeather`, `Date.calendarFor` / `monthNames` / `weekdayNames` / `today`,
`Fab.resolvePos` / `dock`, `Numbers.initCounters`, `Pagination.initAuto`, `Selection.selected`, `Table.row`,
`Copy.bind`, `dialog.top`, `consent.allowed`, `field.control`, `Stepper.control`, `audit.rule`. Run `--names` and
read the lines tagged "on the banner" for the whole list. Each shipped in v1.12.0 gets a Migration row.

**Born in v2 (shared-logic), no row:**

| Name | Rule | Becomes |
|---|---|---|
| `NDS.init.pending(el)` → true/false | 10.1 | `isPending(el)` |
| `NDS.state.effect(token, scope, fn, cls)` | 10.1 noun; 10.5 `cls` is a third value | `onToggle(token, scope, fn, { className })`, beside `onAdd` / `onRemove` (`toggle` is the DOM's event) |
| `NDS.Form.validateField(el, opts, check)` | 10.5 options last | `validateField(el, check, opts)` |
| `NDS.field` part keys `init(input, control)` / `create(el)` | 10 carve-out: `init` keeps the loader's meaning; here it wires one input | `setupInput(input, control)` / `create(el)` |
| part key `readonlyActive(input)` | 10.1 | `isReadonlyActive(input)` |
| `NDS.field.control(target)`, `ownControl(container)`, `ownInput(container)`, may return `null` | 10.1 noun | `findControl`, `findOwnControl`, `findOwnInput` |
| `NDS.validation.message(input)` | 10.1 noun | `getMessage(input)` |
| `NDS.validation.owns(container)` → true/false | 10.1 | `isOwned(container)` (the rule option `owns` stays: a key) |
| `NDS.validation.checkedCount(field, boxes)` | 10.1 noun | `checkCount(field, boxes)` |
| `NDS.validation.run(form, opts)` | 10.4 one verb per meaning (`check` is the namespace's verb) | `checkAll(form, opts)` |
| `NDS.consent.allowed(category)` → true/false | 10.1 | `isAllowed(category)` |
| `NDS.consent.save(categories)` | 10.4: pairs with `get` | `set(categories)` |

Rule 5 passes `NDS.state.onAdd(token, scope, fn)` and `NDS.keepChipFocus(chips, render, fallback)` (a
callback is not a value).

### Entry 12's kinds (landed in PERSONA 2026-10-21): what breaks today

- **Storage and cookie keys** (rule 3), observable, a row each: `cookieConsent` → `nds-consent`
  (`nds-consent.js`, `nds-loader.js`), `cookieConsentDismissed` → `nds-cookies-dismissed` (`nds-cookies.js`,
  `nds-loader.js`), `NDS.cache`'s `nds_` prefix → `nds-cache:` (`nds-core.js`). Cost, accepted for the major:
  a visitor sees the consent notice once more after the upgrade (a generic `cookieConsent` can clash with
  another consent script on the same site), and old cache entries refill. Keys already on `nds-` stay (carve-out).
- **Internal classes** (rule 7), no row: 27 classes, `NDSAccordion` … → `NdsAccordion` …; with the wrong
  name too: `NDSTables` → `NdsTable`, `NDSImagePopupViewer` → `NdsIpv`, `NDSSideInfo` → `NdsSideinfo`,
  `NDSTagInput` → `NdsTaginput`, `NDSChartInstance` → `NdsChart`, `TimeFields` / `TimePicker` →
  `NdsTimeFields` / `NdsTimePicker`, `DatePickerCalendar` → `NdsDatePickerCalendar` (`DatePicker.Calendar`
  stays public).
- **`window`** (rule 1): `window.ndsTableSubHandlerInitialized` (deleted by rule 9). Consumer settings
  (rule 2) all conform.
- **Hooks, tokens, constants, `detail` keys** (rules 5, 6, 8, 10): the check lists them (135 hooks on banners
  carry no component name; most sit on their own component and pass). Each hook or token rename is a row.

## 4. What this changes in PERSONA (landed 2026-10-21)

Plan rules 1–7 and 9 are entry 12 rules 11–17 (rule 7 folded into 13); section 2's table and whole-words rule
are entry 10's "Internal functions" and rule 8.

Each rule lands in PERSONA's own four fields (Canonical, Why, Carve-outs, Audit behavior with severities).
The owner's go on this plan is PERSONA's "user makes a deliberate decision" path, so the edits land
directly, not through Phase 7.

| Entry | Today | Becomes |
|---|---|---|
| 1 | `el._ndsFilterAC`: "the leading underscore IS correct here" | a module WeakMap of AbortControllers (rules 4–5) |
| 2 | `this._offDomAdds` | unchanged; the code follows it (`nds-filter.js`) |
| 5 | canonical `_initDone`; sub-latches `_dateInitDone`, `_wired`, `_reconciled`; audit step 5 "migrate to `_initDone`" | `initDone`, `dateInitDone`, `wired`, `reconciled` (rule 3) |
| 5 | JS-property guards `_ndsInitialized`, `_ndsFormInitialized`; audit step 7 `el._ndsXxxInitialized` | a module `WeakSet` (rules 4, 9); the attribute form is untouched |
| 5 | carve-out "Bundle-scope listener, window flag" (`window.ndsTableSubHandlerInitialized`); Why's "a second copy of the bundle" | deleted: the build guard covers it (rule 9); a module latch does the job |
| 6 | `el._ndsFilterAC` named as out of scope | the WeakMap form |
| 10 | rule 1: "a name starting with `_` is internal" | points to entry 12; the internal-verb table, its ban-list line and the `setup…` carve-out join it |
| 12 | the name map and its ten kinds (landed 2026-10-21) | section 1's rules and the pick order join it; its map row for internal names then points to itself |
| RULES-JSA, JSA-23(a) | names only the `_nds` key form of unreachable per-element state | adds the WeakMap form (rule 4) |

Cited symbols in entry 3 (`_openDropmenus`, `_openTooltip`) and entry 5 (`_controller`, `_abortController`)
are module-scope names: their citations follow the rename (PERSONA's "a cited symbol drifts" step).

## 5. Files

- **`_js/`: nearly every file**, the 3 event packs in `_js/events/` among them. Per rule: module-scope `_`
  ~36 files, element data → WeakMap ~26, function verbs ~63, acronyms and short words ~13, cross-file `_` 5,
  window flag 1 (`nds-table.js`, deleted), the bundle guard in `_plugins/js_processor.rb`. Then `ruby _plugins/js_processor.rb`, and `scripts/mkevent.py` for the 3 packs.
- **Rules and checks:** `.claude/skills/nds-js-audit/PERSONA.md`, `RULES-JSA.md`, `RULES-JSD.md`,
  `RULES-JSP.md`, `FIX.md`, `PONYTAIL.md`, `SKILL.md` (they cite `_initDone`, `_nds*`, `_wire*` and
  `onDOMAdd`); `scripts/check-js-rules.mjs` (the new checks, and the names it matches: section 6).
- **Scripts that read an old name:** `scripts/check-mount-timing.mjs`, `check-refresh.mjs`,
  `check-sort-api.mjs`, `scripts/check-banners.mjs`, `scripts/release-template/nds-verify.mjs`,
  `.claude/skills/nds-perf/measure-lcp.mjs` and its `SKILL.md`.
- **Public renames:** `components/toc.md`, `components/chart.md`, and the pages that show the other names in
  section 3; the rows in `_data/migrations.yml`. A doc edit moves that page's `last_edit`; the source change
  bumps `updated`. `NDS-INDEX.md` if a renamed name is in it.
- **Plans that cite old names** (`plans/shared-logic.md`, `plans/i18n-markers.md`): left as written, they are history.

## 6. Traps for the rename script

- **Public names are out of the verb sweep.** Section 2 renames internal functions only. A name on a
  banner's Methods or Hooks list (`check-banners.mjs` reads them), the loader hooks
  (`init`/`reinit`/`refresh`/`destroy`), entry 10's public verbs and public `onX` option and part keys stay
  unless section 3 names them. `initX` → `setupX` must not touch `init`.
- **The checkers match today's names, and their self-tests use them too.** A rename that a check stops
  seeing looks like a pass. Known: `check-js-rules.mjs` finds guards by `_nds\w*Initialized` and
  `._nds\w+ = true` (two places), matches `onDOMAdd` / `onDOMRemove` literally (three places), and lists
  `apply`, `wire`, `paint`, `update` in `GENERIC`; `check-banners.mjs` finds dispatches by `emitEvent(`;
  JSA-23's text greps `_wire*`. In each rename commit: change the regex and its self-test fixtures, run the
  full check before and after, diff the two finding lists, and explain every finding that disappears.
- **Dropping `_` can collide** with a plain name already in the same scope (`_open` and `open`). The script
  checks the target name is free first.
- **Property names survive minifying, and some are strings.** `'_ndsPerPageDefault' in picker`
  (`nds-loader.js`) and `delete panel._modal` are easy to miss: grep each old name as a bare word,
  in quotes and after `delete`, across `_js/` and `scripts/`, before and after.
- **A WeakMap entry is undone like a stamp** (rule 4): what `create()` stores for an element, `destroy()`
  deletes, or a framework host that reuses the node meets stale data.
- **Same name, different files.** `_sync`, `_open`, `_render` exist in many classes: rename per file,
  never tree-wide by text.
- **Event packs** (`_js/events/`) rebuild only through `python scripts/mkevent.py <event>` (AGENTS.md
  "Event Theme Packs").
- **Gates:** each commit message goes to the owner first; `git add` by name only; no push.

## 7. Order

1. PERSONA per section 4. The once-per-page guard in `js_processor.rb` (rule 9) with a check that loads
   `nds-main.min.js` twice and sees one click run once; then the table flag goes.
2. `scripts/check-js-rules.mjs`: checks for rules 1.1–1.8 and the section 2 verbs (a replaced verb →
   finding, an unknown first word → verify, capitals acronyms, `_` on a module-scope name, a short word
   outside the locals list), and entry 12's Audit behavior. Its `--self-test` also runs PERSONA's `js` code blocks through the rules, so a
   canonical example that breaks another entry fails. Run it before renaming: its list is the work list.
3. Renames by script, one commit per rule. After each: `ruby _plugins/js_processor.rb`,
   `node scripts/check-js-rules.mjs --self-test` and a full run diffed against the run before (section 6),
   `node scripts/check-banners.mjs --all`, `bundle exec jekyll build`, `node scripts/run-audit.mjs`, and the
   browser checks for the files the rule touched (e.g. `check-dialogs.mjs` for Panel,
   `check-pagination-data.mjs` for Pagination).
4. Public renames last (section 3), with their Migration rows and doc edits.
5. Speed, once, at the end: the WeakMap reads on hot paths (table rows, form fields, `NDS.field`'s
   delegated handlers), interleaved, medians.
   Also the input click speed (owner, 2026-10-21): `node scripts/check-form-speed.mjs` (its one click and one
   keystroke, `BASE=` the commit before step 3), since the renames and the WeakMap move touch `NDS.field`'s click path.
6. Make the new checks fail the release, not just report.
