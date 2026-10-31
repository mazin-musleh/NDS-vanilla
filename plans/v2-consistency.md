# v2 consistency pass: markup, attributes, public API

Written 2026-10-31 from five read-only sweeps (class names, data attributes, structure, families, public JS API), spot-checked by hand. Nothing is built yet: each row waits for an owner pick.

**The rule that sorts this list:** only a *rename or removal* needs the major. A fix that makes NDS accept both the old and the new form is additive and can ship in any 2.x. So the v2 deadline applies to section 3 only.

"New in v2" = the name is not in v1.12.0, so a rename costs no Migration row.

**Owner pick (2026-10-31): option B**, sections 1 to 3 including 3b, with care for hidden side effects.

## Opus review (2026-10-31): what changed

A fresh Opus pass checked the plan against the code; the top claims were hand-checked after. Rows below are updated to match.

**Cut** (each would break silently, or reuse a name):
- **3.27** always-fire `change`: the documented Pagination rollback (`pagination.md:621`) calls `setPage` inside its own `change` listener, so it would loop.
- **2.6** Dropmenu `isOpen()`: `dd.isOpen` is read in ~25 places (Autocomplete, Date Picker, Dialog, Editor, a check); as a method every one is always true, and a rename script cannot see it (same token).
- **3.5 slider half**: `.nds-slider` would move from the input to the root; Filter builds `nds-slider` on range inputs (`nds-filter.js:2051`). Adding `.nds-autocomplete` stays.
- **3.8**: `data-paged-target` already means "a record counter": a nav carrying it gets stamped and read aloud on each page change (`nds-pagination.js:1235`).
- **3.24 markup**: the stepper root also holds the progress circle and its CSS uses `>` combinators. JS `aria-current="step"` stays, additive.
- **3.14 hide half**: `syncState`, `goToFull`, `toRealIndex` are public on purpose, the National Day 96 pack calls them (`plans/js-naming-rules.md:36`). Document only.
- **3.19, 3.21**: document instead. A Metric `data-status="success"` would pick up the card's status colours.

**Changed:**
- **3.1 cut: the two words mean two things** (owner, 2026-10-31). Main Nav's `current` swaps the link to the primary button style with all its own states (hover, pressed, indicator), as DGA's nav does (`_main-nav.scss:408`). `active` in Drawer, Side Menu and Pagination is one state of the same button. Only 2.1 stays: write `aria-current` (TOC's scroll-spy is not a page, so not `"page"` there).
- **2.2, 3.9:** a flag is on when present and not `"false"`. A page that prints `data-auto-upload="false"` stays off.
- **3.9:** the loader logs one console warning when an old switch (`data-nds-auto-init`, `data-nds-disable-all`, `data-cookies="false"`) is present: dropping one fails open (auto-init during hydration, a cookie popup on a kiosk).
- **3.7 is additive:** add `data-alert-close`; keep the close classes (CSS and Editor read them). Cookies keeps `data-panel-close` (it is a Panel).
- **3.11:** rename the toast's `variant` only, never an action's button `variant`; a removed key warns.
- **3.13:** point every internal `reinit` caller (`nds-loader.js:77` route refresh, `nds-filter.js:2108`) at the restart first; add a route case to `check-frameworks.mjs`.
- **3.26:** `detail.rating` stays the number; `element` and `value` are added beside it.
- **2.5** moves to a gated JS batch (it touches ~24 files). Modal keeps `fromTemplate`.
- **Free after all:** 2.3 (`data-upload-timeout`, countdown warn) and 3.22 (Calendar is new in v2: make it opt-in like Pagination); `time-picker-toggle` in 3.2.
- **Fact fixes:** 3.2 is ~26 uses, not 49; 3.18 is not read by the audit.

## Batch 1, checked against the code (2026-10-31)

| Row | Do | Migration row |
|---|---|---|
| 1.1 | `<time data-date-calendar>` → `data-calendar`. It stays the opt-in on the `<time>`; once opted in, the calendar comes from the time or its nearest ancestor (`NDS.Date.getCalendar`). Selector in `nds-date.js:333` and `nds-loader.js:192`. | no, new in v2 |
| 1.4 | Swiper bullet and spotlight slide `data-status` → `data-state`. | yes, the bullet shipped in 1.12 |
| 1.5 | Chart `--` classes → `data-state` (`active`, `spotlight`, `visible`, `dots`) and `data-axis="x|y"`. 11 JS sites, 7 Sass `&--` nests. | no, never documented |
| 1.6 | Editor `.is-source` → `data-state~="source"` (root already carries `data-state`), `.is-empty` → `data-state~="empty"`; password toggle `.show` → `data-state~="shown"`. | yes, `.show` (documented) |
| 1.7 | Remove voice `data-target`, tabs bare `.center`, dead `.nds-active` in the btn-group mixin. | yes, the first two |
| 2.3 | `data-upload-timeout` in ms, like every other time attribute (new in v2). `data-countdown-warn` stays seconds: all of Countdown speaks seconds. | no, new in v2 |

**Kept on the owner's call (2026-10-31):** page layout `nds-compact` stays (the edges that contain the content make the page feel smaller). Revisit if a better name comes up; it is unreleased, so a rename stays free until v2 ships. Tracked in `TODO.md`.

**Dropped after the check:**
- 1.3 `data-panel-size`: the Panel JS writes it on every resize; it is state, and a class for state is what NDS avoids.
- `.nds-required`: one of the deliberate class-or-attribute pairs, read by ~15 files.
- `.nds-results-count`: its source says "stays a permanent alias" (`_toolbar.scss:103`).
- 3.22: Filter and Calendar keep the URL always on; Pagination stays opt-in (it shipped that way, and turning it on would put `?page=` in URLs with no warning). Documented on each page.
- `time-picker-toggle` moves to batch 3, beside `date-picker-toggle`.

**Checks written first** (`scripts/check-v2-batch1.mjs`, outcome-based so they pass on old and new): a `<time>` opted into Hijri renders a Hijri date, also under an ancestor; swiper bullet and spotlight slide styled after a move; ND-96 card state; chart hover shows the tooltip and grows the dot; editor source view toggles and the placeholder shows when empty; password toggle shows and hides the text and resets on submit; voice input finds its target.

## How we stay safe

1. **Baseline first, made stable.** Build today's `HEAD` into `tmp/ab/base/`. `scripts/ab-pages.mjs` diffs base against head, with the clock frozen, animations and swiper autoplay off, fonts loaded:
   - pixels: every page, Chrome, 1280 and 390, light and dark;
   - the accessibility tree (`ariaSnapshot`) and a normalized DOM dump after init, with the batch's rename map applied to the base: catches `aria-current`, button vs link, and every class or attribute the JS writes;
   - each doc page's Variants hashes, and the touched components opened (menus, drawers, toasts, the phone nav, built rows);
   - one pass with JS off (first paint keys on some renamed names), an LTR subset, print emulation on the swiper, accordion and chart pages.
   The diff must be zero outside the rows the batch means to change.
2. **A scoped rename map.** Each entry names its selector context, never a bare global word (`active`, `nds-minimal`, `nds-stacked`, `nds-dark`, `data-name`, `variant` stay manual). Match with `(?<![\w-])name(?![\w-])`. Also rename the camelCase `dataset` reads and option keys, the names the JS builds by concatenation (listed per batch by hand), and tokens that contain the name. Update the `use:` chains of existing rows in `_data/migrations.yml`.
   **Never touched:** `_includes/NDS-IQ.md` (only `publish-iq.py` writes it), `CHANGELOG-v1.md`, released CHANGELOG sections, `DEPRECATIONS.md`, `plans/`, and the IQ fixtures that are old on purpose (`fixtures/mini-root/`, `states/spa-old-runtime/`). Rig fixtures: one by one.
3. **Every rename a user wrote gets a `_data/migrations.yml` row**, so `NDS.audit` flags it. Proof per batch: a fixture page with every old name; the audit finds each one. (The audit skips event-pack CSS.)
4. **No reused name.** A rename never gives an existing name a new meaning.
5. **Behaviour, not only looks** (owner, 2026-10-31: "screenshots show the looks, not the behavior").
   - **Baseline the behaviour suite before batch 1:** every `scripts/check-*.mjs` that drives a page, run on today's code, pass/fail recorded in `tmp/ab/behaviour-base.txt`. A check that already fails is noted, not blamed on a batch.
   - **Check first, then change:** before a row changes a name that JS reads or writes, it gets a check that drives the behaviour (click, type, open, page, resize) and passes on today's code. The same check must pass after. Where an owning script exists (`check-mainnav`, `check-dialogs`, `check-form-*`, `check-pagination-data`, `check-swiper-loop`, `check-time-picker`, `check-sort-api`, `check-filter-*`), the case goes there; otherwise a small `scripts/check-v2-<batch>.mjs`.
   - **After each batch:** the owning checks; after each JS batch, the whole suite. JS rows also get a "no change loop" case.
6. **Checks per batch:** `check-css.py`, `check-docs.py`, `check-data-state-tails.py`, `js_processor.rb`, `run-audit.mjs`, then the browser checks that own the touched parts (`check-a11y`, `check-init-destroy`, `check-frameworks`, `check-set-value`, `check-mainnav`, `doc-check`), Chrome and WebKit for structure.
7. **`_js/` batches follow `nds-js-audit` PERSONA**, each with its review agent as the gate.
8. **Event packs are out of scope** (owner, 2026-10-31: "ignore events").
9. **One commit per batch**: code, docs, `[Unreleased]` and Migrating lines, migration rows. Message proposed first.

## Batches

| Batch | Rows | Risk |
|---|---|---|
| 0 | baseline + `scripts/ab-pages.mjs` (pixels, a11y tree, DOM, variants, no-JS, LTR, print) | none |
| 1 | section 1, 2.3, 3.22, `time-picker-toggle` | low: new or internal |
| 2 | 2.1 + `aria-current="step"`; 2.2, 2.4, 2.8; 3.7 additive; `.nds-autocomplete` | low to medium |
| 3 | class renames 3.2, 3.3, 3.4, 3.6, 3.10, 3.16, 3.17, 3.18 | medium: mechanical, wide |
| 4 | attribute renames 2.7, 3.9, 3.20 | medium: JS readers change |
| 5 | structure 3.23 (Main Nav triggers to `<button>`) | medium: both engines |
| 6a | JS additive: 2.5, 3.25, 2.10 | medium |
| 6b | JS: 2.9, 3.11, 3.12, 3.13 | high |
| 6c | JS: 3.26 (additive form), 3.28, 3.14 docs | medium |
| 7 | docs sweep, `NDS-INDEX.md`, IQ draft check | low |

**3.15 cut down:** Tabs, Switcher and OTP sit one rung above the button on purpose (`_tabs.scss:238`). Shifting their names (`nds-sm` → `nds-md`) would make an existing `nds-md` on tabs silently shrink from 40 to 32px, a break the audit cannot see. So: keep the ladders, document the rung in each page. The Switch default stays MD (a default change restyles every switch with no markup to flag).

## 1. Free: new in v2 or internal, no Migration row

| # | What | Fix |
|---|---|---|
| 1.1 | `<time>` reads `data-date-calendar`; every other date part reads `data-calendar` (`nds-date.js:333`). New in v2. | `time[data-calendar]`, nearest ancestor wins |
| 1.2 | `nds-compact` on the content layout means *raised* (shadows); on a table it means dense rows. New in v2 (`e73c7cbd`). | layout class → `nds-raised` |
| 1.3 | Panel size is `data-panel-size`; Modal size is `.nds-sm/.nds-lg`. New in v2. | Panel takes the size classes |
| 1.4 | Swiper writes `data-status="active"` (status is the colour word everywhere else). JS-written. | `data-state` |
| 1.5 | Chart writes BEM `--` classes (`nds-chart-dot--active`…), never in a canon. | `data-state` |
| 1.6 | Editor `.is-empty`, `.is-source`; form `.show` on the password toggle. Bare state classes. | `data-state` (`.show` is documented: one Migration row) |
| 1.7 | Second spellings with 0 uses: voice `data-target`, `.nds-required`, toolbar `.nds-results-count`, tabs bare `.center`, dead `.nds-active` in the btn-group mixin. | remove, one Migration row each (or ledger them in `DEPRECATIONS.md`) |

## 2. Silent traps: write it, nothing happens, no error

Most of these are additive fixes (accept both forms). Fix anyway before v2 because they hurt today.

| # | Trap | Fix | Breaking? |
|---|---|---|---|
| 2.1 | **Side Menu, Drawer, TOC never write `aria-current`.** Screen readers get no current page (checked: no `aria-current` in their JS). | JS writes `aria-current="page"` on the marked link | no |
| 2.2 | `data-auto-upload` works only as `="true"` (`nds-upload.js:195`); every other flag is presence-only. Same for `data-editor-upload-auto-upload`. | read presence | no |
| 2.3 | `data-upload-timeout` is seconds; `data-counter-duration`, `data-delay`, tooltip hover are ms. `30000` = 8 hours. | rename to `…-seconds` (like `data-countdown-seconds`); same for `data-countdown-warn` | yes |
| 2.4 | List values: comma in some attrs, space in others, two kinds on one root (Date Picker, Editor). | every reader splits on space or comma | no |
| 2.5 | First argument: ~9 components use `NDS.resolveElement`, ~24 need the element. `NDS.Tabs.destroy('#t')` and `NDS.Modal.open('#m')` do nothing. | every `create/destroy/getInstance/open` resolves first | no |
| 2.6 | `isOpen` is a method on Modal/Panel, a property on Dropmenu (`if (NDS.Modal.isOpen)` is always true). | `isX()` always a method | yes, Dropmenu |
| 2.7 | Autocomplete `data-name` = the result key to show; form and voice read `data-name` as a field name. | `data-display-field` | yes, 4 uses |
| 2.8 | No `data-status`: Alert shows info, Feedback error, Status Section and Modal success, Tag neutral. | every canon writes `data-status` (docs only) | no |
| 2.9 | `create(el, opts)` on a started element: Chart replaces, Upload merges, Sort/Dropmenu/Pagination ignore opts. | idempotent; options through `setOptions()` | yes, Chart |
| 2.10 | Stub returns a Promise until the bundle loads, so `Modal.isOpen()` can be a Promise. Only some pages warn. | one stock line on each delegated page | no |

## 3. Renames: v2 or never (owner picks)

Sorted by value against cost. "Uses" = repo hits of the side that changes.

### 3a. Recommended

| # | Inconsistency | Proposed | Uses |
|---|---|---|---|
| 3.1 | Current page: Main Nav `data-state="current"`; Side Menu, Drawer, Pagination `data-state="active"`. `active` also means pressed, sort and scroll-spy. | `current` for page and step (matches `aria-current` and Stepper); `active` stays for scroll-spy and sort | ~15 |
| 3.2 | `.date-picker-toggle`, `.time-picker-toggle`: the only canon hooks without `nds-`. | `nds-date-picker-toggle`, `nds-time-picker-toggle` | 49, JS + docs only |
| 3.3 | `nds-persona-desc`; everyone else spells `-description`. | `nds-persona-description` | 7 |
| 3.4 | Definition List leftovers `nds-item-action`, `nds-highlight-value` (their siblings were renamed in v2). | `nds-definition-action`, `nds-definition-highlight` | 25 |
| 3.5 | Slider root `.nds-slider-container`, input `.nds-slider` (other fields: root `.nds-x`, input `.nds-x-input`). Autocomplete has no root class (found by `.nds-form-container[data-url]`). | `.nds-slider` + `.nds-slider-input`; add `.nds-autocomplete` | ~15 |
| 3.6 | Upload parts mix five prefixes; `nds-drop-hint` sits next to `nds-upload-hint`. | `nds-upload-input/-browse/-drop-hint/-remove/-error`; keep `nds-file-*` rows | ~36, JS reads |
| 3.7 | Close hooks: Alert class only, Modal class or attribute, Panel/Cookies attribute only. | `data-{x}-close` everywhere (Alert gains it; drop the classes) | ~27 |
| 3.8 | `data-auto-pagination` is a target named like a flag; siblings say `data-paged-target`. | `data-paged-target` on the nav too (empty value still = previous sibling) | ~65 |
| 3.9 | Page switches use the reserved `data-nds-` prefix and string booleans: `data-nds-auto-init="false"`, `data-nds-disable-all="true"`, `data-cookies="false"`. | presence: `data-no-auto-init`, `data-no-init-all`, `data-cookies-no-auto-open` | ~16 |
| 3.10 | Solid look: Tag `.nds-inverted`, Featured Icon/Stepper/List `.nds-dark`. | `.nds-dark` (or a neutral word if "dark" reads as dark mode) | few |
| 3.11 | Alert `create({variant, description, position})`, Feedback `create({status, message, position})`; `position` means two things. | Alert `status`; toast corner → `placement` | ~30 |
| 3.12 | `clear` vs `reset`: Multiselect `reset()` empties; Sort `reset()` restores. | `clear` empties, `reset` restores; Multiselect → `clear` | 0 external |
| 3.13 | `reinit` means alias, restart, tabindex pass or list resync. | `reinit()` = `init()`; Selection's → `refresh()`; restart = `destroy` + `create` | ~12 |
| 3.14 | Undocumented banner-public names (Dropmenu `setSelection`, Filter `queryAll`…, Swiper `goToFull`…, `NDS.Backdrop`, `field`, `typing`…). | document or move behind `_` now, before v2 locks them | 0 |

### 3b. Worth it, owner call

| # | Inconsistency | Proposed | Uses |
|---|---|---|---|
| 3.15 | Size ladder: Tabs/Switcher/OTP `nds-sm` = 32px = Button `nds-md`. Switch defaults to MD, Checkbox/Radio/Slider to SM. | one ladder (visual change) | few markup, every unclassed switch |
| 3.16 | `nds-minimal`: accordion look, section-action icon-only on phones, and a nav state the JS toggles. | nav → `data-state`; section action → new name | ~10 |
| 3.17 | `nds-stacked`: avatar overlap, card actions column, label above. Button Group uses `.nds-vertical` for a column. | card actions → `.nds-vertical` | 14 |
| 3.18 | `nds-max-width` pulls a section body *out* to the edges. | `nds-bleed` | 33, audit reads |
| 3.19 | `nds-sticky-md` is cumulative (phones too); every other `-md` is a band. | rename or document | 13, JS reads |
| 3.20 | `data-fab-pos` vs `data-panel-side` (same values, abbreviation). | `data-fab-side`, `data-fab-dock-side` | ~42 |
| 3.21 | Metric `data-status="positive|negative"` vs `success|error`. | `success|error`, or document the exception | 10 |
| 3.22 | `-param`: Calendar URL sync is always on (param renames); Pagination is opt-in (param turns it on). | one meaning | 23 |
| 3.23 | Main Nav menu triggers are `<a href="#">`; every other trigger is a `<button>`. | `<button type="button">` | 1 include + 3 blocks |
| 3.24 | Stepper steps are `div`s; no `aria-current="step"`. | `ol > li` + JS `aria-current` | 55 |
| 3.25 | Value API: static on Otp/TimePicker/CustomSelect, instance-only on Rating/Taginput/Multiselect, none on DatePicker/Slider. `getSelected` vs `getValues`. | instance `setValue/getValue/clear` + namespace mirror; refused set returns `false` | mostly additive |
| 3.26 | Event detail back-reference: `{accordion}` style mostly; Rating `{rating: value}`, Switch `{input}`, Upload/Editor `{instance}`. Filter ready detail *is* the instance. | `detail.{component}` = host element; ready = `{instance}`; values in `value` | low |
| 3.27 | Programmatic writes: most fire `change`; `Pagination.setPage` and `Multiselect.renderOptions` stay silent. | always fire, `{silent: true}` to opt out | 2 |
| 3.28 | Positional booleans: `selectAll(list, on, scope)`, `goTo(i, animate)`, `setColumnHidden(t, i, bool)`. | values, then one options object | ~10 |

### 3c. Probably leave

- Table `nds-col-header`, `nds-col-actions` (~55 uses, breaks only the prefix rule).
- `nds-tags`/`nds-chips` plural vs `-group` (chips is read by Filter).
- `div.nds-card-featured-icon` wrapper (819 uses): make optional, never remove.
- Noun-stem part names (`nds-date-input`, `nds-select-*`, `nds-tab-panel`): keep, and write the rule down.
- `data-select-name` family on Dropmenu (36 uses).

## 4. Additive, any 2.x

- `button.md` teaches a label span on icon-only buttons; 374 of 403 use `aria-label`. Fix the doc.
- 41 canon buttons lack `type="button"` (Side Menu, Accessibility, Page Layout, Main Nav, Alert, Topbar…).
- Tabs and Accordion canons make authors write ids and `aria-controls` the JS never reads: stamp them in JS, as Dropmenu does.
- Show More: Expandable builds its button, Scroll More/Tabs/Side Menu/Code need it authored. Scroll More can stamp it.
- Panel names itself with `aria-label` next to a visible title; Modal uses `aria-labelledby`.
- Dropmenu takes a bare `<template>`; Modal/Panel take `.nds-x-template`. Accept `.nds-dropmenu-template` too.
- Accordion: three nested divs, heading fixed at `h3` in the docs.
- Progress ring and Stepper make the author write the ring SVG.
- Featured Icon glyph: `hgi` in 815 places, `nds-icon` in 32 (the subset renders blank for other glyphs).
- Drawer needs `nds-menu-btn` on parent buttons; Side Menu draws the arrow without it.
- Chips have no `[data-status]` (already in `DEPRECATIONS.md`).
- `refresh()` scope, `destroy()` targets and null safety: unify additively.

## Dropped

- `data-export-target` and `data-copy-target` take a selector: decided in `plans/target-convention.md`.
