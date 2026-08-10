# Field triage — 2026-08-10

Two consumer `NDS-REPORT.md` files against NDS 1.7.0 / NDS IQ v7 (11 findings total: report A had 3, report B had 8). Each finding verified against current source before triage.

- **File state verified:** `_includes/NDS-IQ.md` at 2026-08-10 working tree; `_js/nds-accordion.js`, `_js/nds-loader.js`, `_js/nds-filter.js` at working tree; `CHANGELOG.md` L42
- **Verdict:** 11/11 findings CONFIRMED against source or reasonable design gaps. Zero already-fixed, zero misread.

## Source bugs — fix in NDS source

### R2.1 · `NDS.Accordion.destroy()` leaves container un-recreatable

- **File:** `_js/nds-accordion.js:322-329`
- **Verified:** `destroy()` aborts controller + clears `_ndsAcc` on buttons, but does not clear `container.ndsAccordion` (set at :372) or `data-nds-accordion-initialized` (set at :374). Line 388 `create()` and line 346 `initializeAccordions()` both short-circuit on those stamps, handing back a dead controller. Repro in consumer report is exact.
- **Fix:** 2 lines in `destroy()` — `delete this.accordionContainer.ndsAccordion; this.accordionContainer.removeAttribute('data-nds-accordion-initialized');`
- **Wider audit:** Any factory component with `.destroy()` + container backref shares the shape. Candidates: Filter, Pagination, Modal, Autocomplete, Upload.

### R2.7 · `NDS.Init.refresh(container)` coverage gap — two axes

- **File:** `_js/nds-loader.js`, `_js/nds-filter.js`, `_js/nds-pagination.js`, `_js/nds-selection.js`
- **Verified axis 1 (missing registrations):** Only Selection (`_js/nds-loader.js:283`) and Filter (:431) register `refresh` hooks. Forms, Tables (column visibility), Accordion, Autocomplete, Upload — the components consumers most often re-init after `innerHTML =` — do not participate.
- **Verified axis 2 (registered hooks are client-side gated):** For a server-driven page — the common admin-CRUD shape — the hooks that DO exist collapse to a near-no-op:
  - `Filter.refresh` skips AJAX-mode instances by design (`_js/nds-filter.js:11-15` banner: *"regenerate auto filters for every CLIENT-SIDE instance… AJAX-mode filters are skipped: the server owns their result set"*).
  - `Pagination.refresh` is auto-pagination only (`_js/nds-pagination.js:7` banner: *"recompute an auto-pagination"*; body at :1352-1353). Data-driven navs use `setTotalPages`/`setPage`; refresh is a no-op.
  - `Selection.refresh` is a client-side recount (`_js/nds-selection.js:134`).
- **Consumer effect:** The CHANGELOG frames `NDS.Init.refresh` as "the one call after your JS adds, removes or replaces rows or cards." On a server-driven page it walks past most components silently AND no-ops on the ones it does hit.
- **Fix:** Register `refresh` hooks on Forms, Tables, Accordion, Autocomplete, Upload. Also extend Filter/Pagination refresh to a server-driven code path (e.g. re-resolve items + re-emit change on AJAX-mode Filter; reset per-page counters on data-driven Pagination). Until both axes land, temper CHANGELOG/doc framing to name which components participate and which modes they cover.
- **Ties:** R2.1 fix is a precondition for Accordion's refresh hook to be `destroy() → create()` without consumer intervention.

## Rules-file gaps (`_includes/NDS-IQ.md`)

### R1.1 · CSP nonce/hash for head script — no mention

- **Verified:** Grep for `CSP|nonce|Content-Security` returns zero matches in NDS-IQ.md. Head has two inline scripts (`_includes/head.html:63,72`). CHANGELOG L42 documents the 1.7.0 design intent ("a nonce or hash can grant the head script"). Design exists, routing to it doesn't.
- **Consumer effect:** Silent-fail install on any project with `script-src 'self'` (theme guard doesn't run, defer loader doesn't run, page renders unstyled behind visibility:hidden guards).
- **Suggested addition** — one line in "Include on every page" under the head bullet:
  > *If your CSP restricts `script-src` (no `'unsafe-inline'`), grant the head's inline `<script>` via nonce or hash — the head is designed for this. Without the grant, the theme guard and defer loader don't run and the page renders as unstyled HTML.*

### R1.2 · Upgrade step 3 sweeps Migrating only

- **Verified:** L230 reads `### Migrating from` sections only. Skips `### Added` (adoptable capabilities), `### Changed` (silent behavior shifts to re-verify), `### Fixed` (dead workarounds to retire).
- **Consumer effect:** Every upgrade delivers the compliance quarter, leaves 3/4 on the table. Multi-release drift accumulates silently.
- **Suggested addition** — new step 3b (or extension of 3):
  > *Also read the `### Added`, `### Changed`, and `### Fixed` sections between the two banners, and score each against the project's plan rows and existing code. `### Added` surfaces adoptable capabilities; `### Changed` surfaces silent behavior shifts that need re-verification even where nothing broke; `### Fixed` surfaces workarounds the project may be carrying against a resolved bug. All three land in `NDS-PLAN.md` under an adoption-opportunities table with the rows they touch. Regressions must be fixed; the other three are the dev's call, but they must be seen to be called on.*

### R2.4 · `nds-toolbar` list-with-controls rule missing

- **Verified:** L46 mentions `.nds-toolbar` only in the wrapper-preservation context ("lifting a child out of `.nds-toolbar` is inventing structure"). No rule that names it as the canonical wrapper for list controls (search + filter + sort + pagination-count).
- **Consumer effect:** Copying a bare search-box snippet has no cue that the toolbar wrapper is expected.
- **Suggested addition:** One-line rule under chrome discipline: *"Any list of records that carries controls (search, filter, sort, per-page picker, records counter) puts them inside `nds-toolbar` above the content."* Cross-reference from search-box, filter, and pagination doc pages.

### R2.6 · `NDS.request` as a rule, not a preference — PARTIAL

- **Verified:** L203 says "prefer those helpers over hand-rolled equivalents" and "before you hand-write a network call... check the core banner. Writing fetch in page JS is a claim that core ships no wrapper; it does." Close, but softer than a mandate.
- **Consumer effect:** Reads as "one valid path, not the required path."
- **Suggested wording harden:** *"All consumer AJAX goes through `NDS.request` (aborts, size caps, non-OK throws, JSON-branch decisions); never raw `fetch` / `XHR` / `jQuery.ajax` in NDS-facing code."* Same location, replaces the "prefer" phrasing.

### R1.3c · Canonical > minimum-diff tiebreaker — design call

- **Verified:** Rule #3's "copy verbatim, only these sanctioned edits" implies this. A one-line explicit tiebreaker would collapse ambiguity when the two principles trade off.
- **Suggested wording:** *"For NDS work, canonical wins over minimum-diff. YAGNI applies to features and code paths, never to markup shape or to canonical component wiring the plan calls out."*

## Banner gaps (knowledge at the point of copy)

Per the cause-removal ladder (source → mechanism → knowledge at point of copy → block text), these belong in the component's own banner, not the rules file.

### R1.3a · Manual markup must mirror auto-mode DOM shape

- **Verified:** `_js/nds-filter.js:2151` `_buildFilterInput` emits `nds-form-container.nds-radio-container > nds-form-header > nds-form-control`. Filter banner (L32-54) lists attributes but no Gotcha names the manual-mirror discipline. A plausible `<label><input class="nds-radio">` reads as canonical and initializes silently as inert.
- **Fix location:** New Gotcha in the filter banner: *"Manual markup MUST match the DOM shape `_buildFilterInput` emits — check the method before hand-writing filter inputs."* Same pattern for `nds-tables.js` columns/sort.

### R1.3b · `data-filter-submit` form-mode unnamed in banner

- **Verified:** `nds-filter.js:35` lists `data-filter-submit` in Hooks. Line 142 uses it: `<form data-filter-target="X" data-filter-submit>`. No Method or Gotcha explains the server-paged native-submit pattern.
- **Fix location:** Filter banner — add a Method or Gotcha naming form-mode alongside AJAX-filter, with a two-line example.

## Docs gaps (component pages, no rules-file change)

These lift ambiguity at the specific point consumers hit it. No NDS-IQ edit needed.

- **R2.2** — Add `_source/examples/manage-records-server.md` (or a "Server-driven" variant section in `components/pagination.md`) with end-to-end wiring: canonical container/item markers + `nds:pagination:change` handler + `NDS.Pagination.setTotalPages/updateRecords` + records counter stamping.
- **R2.3** — One clarifying line in `components/pagination.md`: *"The `nds-paged-content` container and `nds-page-item` items are the canonical shape for both auto and data-driven modes. `data-auto-pagination` on the nav is what triggers client-side slicing; without it, the markers are semantic (records counter, empty state, filter target)."*
- **R2.5** — Cross-reference `nds-empty` / `data-empty-message` from `components/pagination.md`'s Server pagination section. Reserve `NDS.Alert` for filter-narrowed no-results banners.
- **R2.8** — Replace-and-reinit recipe. Lands well once R2.7 registers refresh hooks universally; until then, per-component pointer noting `refresh()` vs `destroy()` + `create()` vs `NDS.Init.refresh()`.

## Recommended fix order

1. **R2.1 accordion `destroy()`** — 2-line source fix, silent-fail elimination
2. **R2.7 Init.refresh hooks** — register on missing components; retire the workaround pattern
3. **R1.1 CSP head bullet** — one line, prevents install-time silent fail
4. **R1.2 upgrade step 3b** — one paragraph, unlocks 3/4 of every release
5. **R1.3a + R1.3b** — Filter banner extensions
6. **R2.4 + R2.6 + R1.3c** — NDS-IQ text hardening; per skill process, **draft eval scenarios first** so the sentences are gated by measurement, not opinion
7. **R2.2/2.3/2.5/2.8** — docs pages, batch with next release's doc pass

## Notes for the scenarios sweep

The rules-text changes (R1.1, R1.2, R2.4, R2.6, R1.3c) each need a scenario before the sentence lands, per the growth-control rule in AGENTS.md: *"Every field incident becomes a scenario first — the sentence it spawns is negotiable later, the scenario never is."* Suggested new scenarios to draft:

- **S43 install-strict-csp** — dev states `script-src 'self'`; runner must warn about the head script's grant requirement before proposing the head-copy step.
- **S44 upgrade-Added-sweep** — 1.6.0 → 1.7.0 upgrade; runner must land the Added/Changed/Fixed sweep alongside Migrating.
- **S45 list-with-controls-toolbar** — dev asks for a list with search + filter; runner must wrap controls in `nds-toolbar` without a copy source showing it.
- **S46 raw-fetch-refusal** — dev asks for a hand-written `fetch`; runner must refuse and route to `NDS.request`.
- **S47 canonical-vs-minimum-diff** — situation where the two conflict; runner must pick canonical.

Existing S30 (script-canon-edit-not-rewrite) already covers the canonical-over-minimum-diff principle in one narrow domain (script rewrites); S47 would generalize.
