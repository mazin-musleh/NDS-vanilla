# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleaned 2026-10-25: finished items and their release notes left (all in `CHANGELOG.md` Unreleased); git history holds the investigation notes.

## Open

### Next session (handoff 2026-10-26)

- **Autocomplete: one aborted request, once.** A screenshot run logged `docs-assets/data/appointment-services.json` as `ERR_ABORTED` on the first click. A trace showed one request that finishes, and two reruns were clean. Watch for it.

### v2.0.0 release

- **NDS IQ v4.0 on release day** (plan and status in `plans/iq-v4.md`; `IQv3.2` is already tagged and pushed, off main). [ ] `python scripts/publish-iq.py --apply` BEFORE the build and `mkrelease.py` (`verify()` checks the published copy and the guides' v4.0 render), `git push origin main IQv4.0`, then `nds-iq-eval` `evolve`. [ ] Optional, owner go: the S101 behavior run.
- **v2.0.0 is the window for breaking improvements.** A major is the one time a wrong name or a split API can be fixed rather than aliased. For each find: add a sub-item here with the problem, the fix and its migration line, then decide build or drop with the owner. Every landed break gets a Migrating entry in `CHANGELOG.md`.
  - **Filter server mode sends two key shapes.** The request carries generated options as `filter-type=a&filter-type=b` (`nds-filter.js` `filter-${filterName}`), the address bar writes `type=a,b`, and a reload or shared link sends that to the server, so a backend parses both. Fix: generated options submit under the URL key and shape (observable request change: major only). If dropped, `components/filter.md` server section names both shapes.
- **NDS IQ Update rule downgrades during an rc**. v4.0's §This file Update treats "any difference" from raw main as newer; main serves v3.1 until release day, so an rc install's update replaces v4.0 with v3.1. Fix in the draft: compare line 1's `instructions vX.Y` and install only a higher revision. Land before the next rc.
- **rc → rc changes are recorded nowhere.** An rc.1 → rc.2 upgrade finds only "Migrating from v1.12.0" in `CHANGELOG.md`; `migrations.yml` rows say `since: "2.0.0"`, so an agent cannot tell which rows are new since its rc (the `--overlay` → `--hero-overlay-opacity` hero rename landed between rc.1 and rc.2). Decide: a per-prerelease changelog section, or `since` naming the rc that changed it.

### Filter and Dropmenu gaps

Checked against the source 2026-10-27. Related: the Update rule and the key-shape items under v2.0.0 above.

- **Filter: a menu without Apply never applies.** The draft-on-close (`_addMenuDraftListeners`, `66d22888`) was written for menus with Apply; a one-group dropdown with no footer drops every pick on close. Fix: draft only in a menu holding `[data-filter-action="apply"]`; elsewhere a pick commits on change (`_commitCriteriaChange` already coalesces form submits). No new attribute. Per-surface badge: skip.
- **Dropmenu `data-search="N"` never shows on a filter-built group.** `_setupSearch` counts rows once at setup, before Filter builds them. Fix: below the threshold, recount on open and inject then.
- **Server-mode sort has no canon.** `components/filter.md` ("put a `<select name="sort">` in the form") prescribes a bare native select, against Custom Select and NDS IQ. Canon: a Dropmenu picker (`data-select-name="sort"`) in the filter form, submitted on pick; the pick also goes to the address bar (today the filter writes only its own keys, so a reload loses the sort). Verify the request carries `sort=`.
- **Dropmenu search can't reach a collapsed filter group** (`data-search` + `data-filter-accordion`). Fix: Dropmenu fires one event after it filters; Filter opens its collapsed groups holding matches and closes them when the query clears. Fallback: a doc line that the two do not combine.
- Minor: the server-mode example (`filter.md` `#services-results`) shows no empty state: `nds-empty` on a wrapper that also holds the pagination never shows. One line: `nds-empty` goes on the item grid.

### Parked features (owner calls; after v2.0.0 unless noted)

- **Calendar: a home for an example.** An example page where a calendar replaces a list instead of adding one (`plans/calendar.md` step 6).
- **Chat component (2026-10-16), later.** Found in the Student Portal mockup (https://seu-exam-support.netlify.app/) with Date Tile and Meta, which shipped. Think it through first: the real uses, how it fits with other components, and what it replaces. The portal's support panel (`dialog#support-panel` in `examples/student-portal.md`) is where it would land.
- **File Upload image preview for a photo picker.** The old catalog card promised one; it never existed.
- **Rig asks, checked against the docs 2026-10-27.** The rest were already covered or dropped (shop parts are off-mission).
  - **Selection: a pick limit.** None today; Multiselect's `data-max-checked` only checks on submit. Owner call.
  - Parked: URL state for Multiselect and Tabs, Tabs hash sync (a framework router owns the URL); a compare pattern (an example, not a component).
- **PDF in the image viewer** (phone browsers do not show a PDF inside a page: iPhone shows the first page, Android downloads it) and **QR code** (an encoder is ~300 lines and NDS has no libraries; scanning needs a large decoder outside Chrome on Android).
- **NDS.audit `practice` tips: pilot of 9 shipped 2026-10-10; grow only if a behavior run shows agents act on them.** Candidates from the Best Practices sort (36 checkable of 827; generic accessibility left to axe and Lighthouse): `-FS` without its `-LH`; `tel:`/`mailto:` links in RTL text without `nds-ltr`; `nds-paged-content` on a wrapper instead of the `tbody`; `nds-page-item` inside a `.nds-pagination`; password rule chips without `data-permanent`; a persona photo with a non-empty `alt`; inline `--progress-value` without `data-value`; `aside.nds-card` on the side info; `.nds-ipv-thumbnail` without `data-ipv-full`; mixed `data-sort-mode` on one list; a counter with `data-currency` or `data-unit` but no `nds-number-format`; a Copy item in a menu without `data-no-auto-close`; a tag input with no `data-taginput-name`; a topbar widget without `data-hidden`, or more than two; a second `body > header`, or the main nav before the topbar; `.nds-block` inside `.nds-block`; a grid mixing `-col` and `-track` values; a `--gap` that is not a spacing token; a check group that is not a `fieldset` with a `legend`; an empty `data-nds-audit-ignore`. Near-misses: `lang-*` on every `<code>`, `aria-pressed` on selected chips, hex colors in site CSS, later swiper slides without `data-src`.
