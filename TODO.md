# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleaned 2026-10-25: finished items and their release notes left (all in `CHANGELOG.md` Unreleased); git history holds the investigation notes.

## Open

### Next session (handoff 2026-10-26)

- **Autocomplete: one aborted request, once.** A screenshot run logged `docs-assets/data/appointment-services.json` as `ERR_ABORTED` on the first click. A trace showed one request that finishes, and two reruns were clean. Watch for it.

### JS audit hotspots (full-tree `architecture` run, 2026-10-29)

Suspected, not confirmed: one session each, best value first. Pagination, Drawer, Main Nav and Digital Stamp are done. Prove a behavior fix on your own `:4010` server, old bundles vs new.

- [ ] `/nds-js-audit table,selection,export architecture`: a direct `NDS.Export.export*()` never starts Selection, so `scope: 'selected'` may export every row (`nds-export.js` `init`); `getRowToggles` may stamp a nested table's toggles (`nds-table.js`); a nested loop in a page-wide walk (`nds-selection.js` ~L120).
- [ ] `/nds-js-audit nds-dropmenu.js architecture`: `_setupSearch` is 162 lines.
- [ ] `/nds-js-audit form,otp,typing architecture`: `NDS.Form.setState(el, 'required')` walks every input in the container unguarded (`nds-form.js`); OTP `setValue`/`clear` on a group never set up; the `masks` map in `nds-typing.js` may only grow.
- [ ] `/nds-js-audit nds-accessibility.js architecture`: four repeated-block pairs (~L1248–1343); likely LOW.
- [ ] `/nds-js-audit nds-copy.js architecture`, `nds-countdown.js`: a module map that may only grow (`controllers`, `unitFormats`); likely a bounded cache.
- **Smaller finds, not fixed:** Pagination `setPage()` takes a page out of range, and `setRecords()` puts the list id into a selector without `CSS.escape`. Drawer: the slide ignores the OS reduced-motion setting (CSS), and `destroy()` leaves the `nds-menu-btn` class `create()` added. Main Nav: a mode flip during a menu's open animation can still leave `opened`; `destroy()` leaves an open menu stamped open, and `reinit()` on a swapped nav skips `destroy()`.

### v2.0.0 release

- **NDS IQ v4.0 on release day** (plan and status in `plans/iq-v4.md`; `IQv3.2` is already tagged and pushed, off main). [ ] `python scripts/publish-iq.py --apply` BEFORE the build and `mkrelease.py` (`verify()` checks the published copy and the guides' v4.0 render), `git push origin main IQv4.0`, then `nds-iq-eval` `evolve`. [ ] Optional, owner go: the S101 behavior run.
- **v2.0.0 is the window for breaking improvements.** A major is the one time a wrong name or a split API can be fixed rather than aliased. For each find: add a sub-item here with the problem, the fix and its migration line, then decide build or drop with the owner. Every landed break gets a Migrating entry in `CHANGELOG.md`.

### Parked features (owner calls; after v2.0.0 unless noted)

- **Chat component (2026-10-16), later.** Found in the Student Portal mockup (https://seu-exam-support.netlify.app/) with Date Tile and Meta, which shipped. Think it through first: the real uses, how it fits with other components, and what it replaces. The portal's support panel (`dialog#support-panel` in `examples/student-portal.md`) is where it would land.
- **File Upload image preview for a photo picker.** The old catalog card promised one; it never existed.
- **Rig asks, checked against the docs 2026-10-27.** The rest were already covered or dropped (shop parts are off-mission).
  - **Selection: a pick limit.** None today; Multiselect's `data-max-checked` only checks on submit. Owner call.
  - Parked: URL state for Multiselect and Tabs, Tabs hash sync (a framework router owns the URL); a compare pattern (an example, not a component).
- **PDF in the image viewer** (phone browsers do not show a PDF inside a page: iPhone shows the first page, Android downloads it) and **QR code** (an encoder is ~300 lines and NDS has no libraries; scanning needs a large decoder outside Chrome on Android).
- **NDS.audit `practice` tips: pilot of 9 shipped 2026-10-10; grow only if a behavior run shows agents act on them.** Candidates from the Best Practices sort (36 checkable of 827; generic accessibility left to axe and Lighthouse): `-FS` without its `-LH`; `tel:`/`mailto:` links in RTL text without `nds-ltr`; `nds-paged-content` on a wrapper instead of the `tbody`; `nds-page-item` inside a `.nds-pagination`; password rule chips without `data-permanent`; a persona photo with a non-empty `alt`; inline `--progress-value` without `data-value`; `aside.nds-card` on the side info; `.nds-ipv-thumbnail` without `data-ipv-full`; mixed `data-sort-mode` on one list; a counter with `data-currency` or `data-unit` but no `nds-number-format`; a Copy item in a menu without `data-no-auto-close`; a tag input with no `data-taginput-name`; a topbar widget without `data-hidden`, or more than two; a second `body > header`, or the main nav before the topbar; `.nds-block` inside `.nds-block`; a grid mixing `-col` and `-track` values; a `--gap` that is not a spacing token; a check group that is not a `fieldset` with a `legend`; an empty `data-nds-audit-ignore`. Near-misses: `lang-*` on every `<code>`, `aria-pressed` on selected chips, hex colors in site CSS, later swiper slides without `data-src`.
