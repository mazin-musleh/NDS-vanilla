# Naming: the underscore and internal function names

Status: PARKED 2026-10-21, design agreed, nothing changed yet. Facts measured on `main` at `e035b198`.
Starts only after `plans/shared-logic.md` is finished: that work edits PERSONA.md and nearly every JS
file, so running both at once conflicts.

**Resume here.** 1) Confirm shared-logic is done (its "Resume here" line). 2) Re-measure: shared-logic
renames files and symbols, so every count, file and line below is a hint, not the work list. The check
built in section 6 step 2 gives the real list. 3) Follow section 6 in order, minding section 5.

**Owner directives (2026-10-20), do not reopen:**
- Every name is decided by the rules in this plan, never by an owner A/B. A meaning the rules leave open
  becomes a new PERSONA decision with its reason, decided by the planner.
- Use counts never decide (PERSONA's own principle).
- Full scope in v2: internal and public names, the whole tree, not file by file later.
- Checked against Google's and Airbnb's guides, the DOM and Bootstrap/React/Vue (sections 1 and 2 say
  where each rule stands).

**Scope: the whole tree, in v2 (owner, 2026-10-20).** Every rename lands now, internal and public, not
file by file later: a major is the one window for public renames, and a tree that already follows the
rules is what lets `check-js-rules.mjs` and `nds-js-audit` fail on drift instead of listing it.

## Goal

Every name follows a rule, so an agent can guess a name and a script can check it, with no owner call
per case. PERSONA entries 9 and 10 already cover component names and PUBLIC methods. This plan covers
what they leave open: what `_` means, and how INTERNAL functions are named.

**How a pick is made.** When two names mean the same thing, the first rule that decides wins:
1. A PERSONA canonical already gives that meaning a name (a canonical, not a symbol an entry cites).
2. The web platform's name (DOM, ECMAScript).
3. The name well-known libraries use (Bootstrap, React, Vue), as entry 10's "Why" argues.
4. A name that already means something else, in NDS or in JavaScript, loses.

Use counts never decide: PERSONA measures code "against deliberate choices instead of against the
loudest accidental majority", and "raw adoption counts" never set a canonical. A meaning these four
leave open is a new PERSONA decision with its reason written down, not a vote.

## 1. The underscore

### Today

| Where | Count | State |
|---|---|---|
| `this._x` on classes, `_x()` on namespace objects | ~400 names | entry 10 already says `_` = internal |
| Data stored on a page element (`el._ndsFilterAC`) | ~40 names | 19 have no `nds` in the name |
| Names inside the file's IIFE (`let _initDone`) | 33 files | mixed: most files use plain names; `nds-pagination.js` has 57 `_` and 31 plain |
| `window.__NDS_*` | 3 | build and inline-script bridge |

### Rule (PERSONA entry 12, or a part of entry 10)

1. **`_x` means "reachable from outside, not API."** Class members and namespace-object members only.
   A plain name on those is public.
2. **Only the file that defines a `_` name reads or writes it.** Another file that needs it gets a public
   name, or the value moves to a base or core (entry 11).
3. **IIFE names take no `_`.** They cannot be reached, so the mark says nothing. This includes entry 5's
   `_initDone` → `initDone` (11 files); entry 5's text changes with it.
4. **Private data per element lives in a module `WeakMap` keyed by the element, never on the element.**
   The public instance stays `el.nds{Name}` (entry 9). A WeakMap is freed with the element, the page
   cannot see or clash with it, and only its own file can reach it, so rule 2 holds by construction.
   11 files already do this (`nds-core.js`, `nds-pagination.js`, `nds-drawer.js` …); Bootstrap 5 keeps
   its per-element data the same way (its `Data` module). Entry 1's `el._ndsFilterAC` example changes with it.
5. **A WeakMap is named for what it holds** (`abortControllers`, `perPageDefaults`); one holding
   AbortControllers ends in `AbortController(s)`, as entry 1 requires on an instance.
6. **No `#private`.** `#` works only inside a `class`; most NDS namespaces are object literals, which
   cannot hold it, so `_` is the one mark both shapes take. Bootstrap 5 uses the same `_` mark.
7. **No `_` flag on a public namespace.** It is an IIFE variable (rule 3).
8. **Every property NDS writes on `window` is `__NDS_{NAME}`**, as the build and inline-script bridges
   already are. Entry 9 bars a component global; this covers the rest (entry 5's
   `window.ndsTableSubHandlerInitialized` → `__NDS_TABLE_SUB_HANDLER`).

CSS already uses the same meaning: `--_x` is a private knob.

**Against the common guides.** Rule 3 matches Airbnb (22.4) and Google: no underscore on names nothing
outside can reach. Rule 1 does not follow Airbnb, which bans a leading `_` everywhere because it hides
nothing. Bootstrap, Lodash and most DOM libraries use it anyway, and NDS has no other mark that works
on an object literal (rule 6). The ES standard mark, `#`, is not used for the reason in rule 6.

### Breaks today

- Rule 2: `NDS.i18n._lang()` called from `nds-date.js:105` and `nds-audit.js:300` (the audit also reads
  `NDS.i18n._files`); `nds-date-picker.js:287` writes Dropmenu's `_lastClickX`; `nds-loader.js:584`
  writes Pagination's `_ndsPerPageDefault` (also a loader naming a component, entry 11);
  `_ndsScrollStop` shared by `nds-code.js:88` and `nds-scroll-more.js:84`; `nds-docs.js:369` writes
  Tooltip's `_hoverDelay` (docs-only file).
- Rule 4: every `el._nds*` expando (~40 names, `_ndsFilterAC`, `_ndsPerPage`, `_ndsScrollStop` …), and
  the ones without the prefix: `panel._modal` `_noFocus` `_opener` `_silent` `_openAC` `_panelAC` `_cancelAnim` `_cancelResize`,
  `feedback._onDismiss` `_hiddenPermanent` `_targetWasHidden`, `wrapper._content` `_abortController`
  `_offResizeObs`, `btn._cooldownAC`, `container._sliderOffResize`, `target._lastSize`.
- Rule 5: today's AbortController names mix `AC`, `Abort` and `_abortController`; they become WeakMap
  names under rule 4.
- Rule 7: `NDS.Form._dynamicObserver` (`nds-form.js:1723`).

None of these is documented for site builders, so no Migration rows (only names template users wrote get one).

## 2. Internal function names

Entry 10 names public methods. 1,513 function names in `_js/` (docs and showcase left out) use six
verbs for "wire up", three for "make DOM", four for "make the DOM match state". Rule: **entry 10's rules
1–3 apply to every function, public or not** (verb first, `is`/`has` for true/false, acronym = one word),
plus this table.

| Meaning | Verb | Replaces (uses) | Rule that decided |
|---|---|---|---|
| Make new nodes and return them | `buildX` | `createX` for DOM (17), `generateX` (5), `…DOM` suffix | 1: entry 10 rule 7, `create` returns an instance |
| Make a node exist, once | `ensureX` | — | — |
| Draw state into a container | `renderX` | `populateX` (3) | 3: React, Vue, Lit |
| Write current state to DOM / attributes, no new input | `syncX` | `update…()` with no input, `paintX`, internal `refreshX`, `recheckX` | 4: `update` means two things today (`Chart.update(newOpts)` takes input, `Toc.update()` does not) |
| Take an input and write it in | `applyX(value)` | `update…(value)` | 4, as above |
| Add listeners | `addXListeners` | `bindX` (27), `wireX` (15), `attachX` (6) | 2: `addEventListener`; `bind` also loses on 4 (`Function.prototype.bind`) |
| One-time wiring of a part (internal only) | `setupX` | `initializeX` (30), `initX` (29) | 3: Vue `setup()`; `init` loses on 4 (the loader hook). Entry 10 still bars `setup…` on a public method |
| A listener function | `handleX` | `onX` (34), `xHandler` | 3: React; `on` loses on 4 (`NDS.on*` subscribes) |
| Fire an event | `dispatchX` (12) | `emitX` (5) | 2: `dispatchEvent` |
| A stored or computed value | `getX` | noun names (`pageBounds`, `labelFor`, `listOf`, `navOf`, `realChildAt`) | 1: verb first |
| A value from markup, URL or storage / back | `readX` / `writeX` | — | — |
| Search the DOM, may return `null` | `findX` | — | — |
| Turn an argument (id, selector, element) into the thing | `resolveX` | — | — |
| Undo one open cycle | `cleanup` | `teardownX`, `unwire` | 1: entry 2 |
| Convert | `toX` / `fromX` | — | 2: `toString`, `Array.from` |
| True/false | `isX` / `hasX`, or the DOM's `matches` / `contains` | `inX` (5), `xExists`, `itemMatchesX` | 1, 2 |

**Against the common guides.** `handleX` for a listener and `onX` for subscribing follow React's docs;
`dispatch`, `matches`, `contains`, `toX` / `fromX` are the DOM's and ECMAScript's own names; `is` / `has`
and verb-first are in Google's and Airbnb's guides. An acronym as one word (`toCsv`) follows Google's
camelCase rule (`loadHttpUrl`); the DOM itself is mixed (`innerHTML`, but `getElementById`), so it gives
no answer. Every row is decided by a canonical, the platform or a library; none by a count.

Whole words, as entry 1 argues: `fmtVal`, `normSeries`, `resolveOpts`, `pageLi`, `pageLiM`, `dockPos`,
`closeBtn` get full words. Same compound, same spelling: `sanitizeFileName` / `sanitizeFilename` → one.
Acronyms: `toCSV`, `toXLSHtml`, `createDropdownDOM`, `syncUI`, `isPM`, `initializeIPV`,
`_renderXLabels`… → `toCsv`, `buildDropdownDom`, `syncUi` (single-letter axis names `X`/`Y` are not acronyms).

### Public names the rules also reach (v2 is the major, so each gets a Migration row)

- `NDS.onDOMAdd`, `onDOMRemove` → `onDomAdd`, `onDomRemove` (entry 10 rule 3).
- `Toc.update()` → `refresh()` (entry 10's verb for "read again"; banner `nds-toc.js:12`, doc
  `components/toc.md:288`).
- `Chart.update(newOpts)` → `setOptions(newOpts)` (entry 10: "anything else `getX` / `setX`"; banner
  `nds-chart.js:10`, doc `components/chart.md:318` and `:334`).

## 3. What this changes in PERSONA

Each rule lands in PERSONA's own four fields (Canonical, Why, Carve-outs, Audit behavior). The owner's
go on this plan is PERSONA's "user makes a deliberate decision" path, so the edits land directly, not
through Phase 7.

| Entry | Today | Becomes |
|---|---|---|
| 1 | `el._ndsFilterAC`: "the leading underscore IS correct here" | a module WeakMap of AbortControllers (rules 4–5) |
| 5 | canonical `_initDone`; sub-latches `_dateInitDone`, `_wired`, `_reconciled`; audit step 5 "migrate to `_initDone`" | `initDone`, `dateInitDone`, `wired`, `reconciled` (rule 3) |
| 5 | JS-property guards `_ndsInitialized`, `_ndsFormInitialized`, `_switchInitialized`; audit step 7 `el._ndsXxxInitialized` | a module `WeakSet` (rule 4); the attribute form is untouched |
| 5 | `window.ndsTableSubHandlerInitialized` | `window.__NDS_TABLE_SUB_HANDLER` (rule 8) |
| 6 | `el._ndsFilterAC` named as out of scope | the WeakMap form |
| 10 | rule 1: "a name starting with `_` is internal" | points to entry 12; the internal-verb table and the `setup…` carve-out join it |
| 12 (new) | — | section 1's rules |

Cited symbols in entry 3 (`_openDropmenus`, `_openTooltip`) and entry 5 (`_controller`, `_abortController`)
are IIFE names: their citations follow the rename (PERSONA's "a cited symbol drifts" step).

## 4. Files

- **`_js/`: 67 of 70 files**, the 3 event packs in `_js/events/` among them. Per rule: IIFE `_` 36 files,
  element data → WeakMap 26, function verbs 63, acronyms and short words 13, cross-file `_` 8, window flag 1
  (`nds-table.js`). Then `ruby _plugins/js_processor.rb`, and `scripts/mkevent.py` for the 3 packs.
- **Rules and checks:** `.claude/skills/nds-js-audit/PERSONA.md`, `RULES-JSA.md`, `RULES-JSD.md`,
  `RULES-JSP.md`, `FIX.md`, `PONYTAIL.md`, `SKILL.md` (they cite `_initDone`, `_nds*` and `onDOMAdd`);
  `scripts/check-js-rules.mjs` (the new checks).
- **Scripts that read an old name:** `scripts/check-mount-timing.mjs`, `check-refresh.mjs`,
  `check-sort-api.mjs`, `scripts/release-template/nds-verify.mjs`, `.claude/skills/nds-perf/measure-lcp.mjs`
  and its `SKILL.md`.
- **Public renames:** `components/toc.md`, `components/chart.md`, and a row each in
  `_data/migrations.yml` (`onDOMAdd`, `onDOMRemove`, `Toc.update`, `Chart.update`). A doc edit moves
  that page's `last_edit`; the source change bumps `updated`.
- **Plans that cite old names** (`plans/shared-logic.md`, `plans/i18n-markers.md`): left as written, they are history.

## 5. Traps for the rename script

- **Public names are out of the verb sweep.** Section 2 renames internal functions only. A name in a
  banner's Methods or Hooks list (`check-banners.mjs` reads them), the loader hooks
  (`init`/`reinit`/`refresh`/`destroy`) and entry 10's public verbs stay unless section 2's public list
  names them. `initX` → `setupX` must not touch `init`.
- **Property names survive minifying, and some are strings.** `'_ndsPerPageDefault' in picker`
  (`nds-loader.js:583`) and `delete panel._modal` are easy to miss: grep each old name as a bare word,
  in quotes and after `delete`, across `_js/` and `scripts/`, before and after.
- **A WeakMap entry is undone like a stamp.** AGENTS.md "Undo": what `create()` stores for an element,
  `destroy()` deletes, or a framework host that reuses the node meets stale data.
- **Same name, different files.** `_sync`, `_open`, `_render` exist in many classes: rename per file,
  never tree-wide by text.
- **Event packs** (`_js/events/`) rebuild only through `python scripts/mkevent.py <event>` (AGENTS.md
  "Event Theme Packs").
- **Gates:** each commit message goes to the owner first; `git add` by name only; no push.

## 6. Order

1. PERSONA per section 3. Wait until shared-logic stops editing PERSONA.
2. `scripts/check-js-rules.mjs`: checks for rules 1.2–1.7 and the section 2 verbs (a name starting with
   a replaced verb, a noun-first function name, capitals acronyms, `_` on an IIFE name). Run it before
   renaming: its list is the work list.
3. Renames by script, one commit per rule. After each: `ruby _plugins/js_processor.rb`,
   `node scripts/check-js-rules.mjs --self-test` and a full run, `node scripts/check-banners.mjs --all`,
   `bundle exec jekyll build`, `node scripts/run-audit.mjs`, and the browser checks for the files the rule
   touched (e.g. `check-dialogs.mjs` for Panel, `check-pagination-data.mjs` for Pagination).
4. Public renames last, with their Migration rows and doc edits.
5. Make the new checks fail the release, not just report.
