# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleaned 2026-10-25: finished items and their release notes left (all in `CHANGELOG.md` Unreleased); git history holds the investigation notes.

## Open

### v2.0.0 release

- **NDS IQ v4.0 on release day** (plan and status in `plans/iq-v4.md`; `IQv3.2` is already tagged and pushed, off main). [ ] `python scripts/publish-iq.py --apply` BEFORE the build and `mkrelease.py` (`verify()` checks the published copy and the guides' v4.0 render), `git push origin main IQv4.0`. Eval done 2026-11-06 (133 scenarios, none failed; `last-evaluated.md` matches the draft): a rules edit before publish needs a `scoped` run and `evolve`. [ ] Optional, owner go: the S101 behavior run.
- **Content that shrinks after load keeps its open height (field report, rc.6): fixed, uncommitted.** No section is a size container now: a `nds-breakout` body pulls out by the section's gutter capped at one page gutter (none beside a side menu), and its Swiper pads by the same value, and `.nds-content` stretches again (`93bfae23`'s start + `min-height: 100%` stuck tall in Safari). `check-footer-overrun.mjs` has the Show less step. Known Chrome bug left: `nds-cq` by hand on a Side Info section, as the only section, with content that grows (the same in 1.12). `min-height: stretch` is no fix: Safari sticks tall.

### Parked features (owner calls; after v2.0.0 unless noted)

- **Chat component (2026-10-16), later.** Found in the Student Portal with Date Tile and Meta, which shipped. Think it through first: the real uses, how it fits with other components, and what it replaces. The portal's support panel (`dialog#support-panel` in `examples/student-portal.md`) is where it would land.
- **Editable table cells (rig 4, 2026-11-03).** No canon for a field in a table cell (its label, its size). The row alignment is done: `nds-baseline` keeps a row's cells in line when a field's message grows the row, and `form-row-align` names it (2026-11-04).
- **File Upload image preview for a photo picker.** The old catalog card promised one; it never existed.
  - **Selection: a pick limit.** None today; Multiselect's `data-max-checked` only checks on submit. Owner call.
  - Parked: URL state for Multiselect and Tabs, Tabs hash sync (a framework router owns the URL); a compare pattern (an example, not a component).
- **PDF in the image viewer** (phone browsers do not show a PDF inside a page: iPhone shows the first page, Android downloads it) and **QR code** (an encoder is ~300 lines and NDS has no libraries; scanning needs a large decoder outside Chrome on Android).
- **NDS.audit `practice` tips: pilot of 9 shipped 2026-10-10; grow only if a behavior run shows agents act on them.** Candidates from the Best Practices sort (36 checkable of 827; generic accessibility left to axe and Lighthouse): `-FS` without its `-LH`; `tel:`/`mailto:` links in RTL text without `dir="ltr"`; `nds-paged-content` on a wrapper instead of the `tbody`; `nds-page-item` inside a `.nds-pagination`; password rule chips without `data-permanent`; a persona photo with a non-empty `alt`; inline `--progress-value` without `data-value`; `aside.nds-card` on the side info; `.nds-ipv-thumbnail` without `data-ipv-full`; mixed `data-sort-mode` on one list; a counter with `data-currency` or `data-unit` but no `nds-number-format`; a Copy item in a menu without `data-no-auto-close`; a tag input with no `data-taginput-name`; a topbar widget without `data-hidden`, or more than two; a second `body > header`, or the main nav before the topbar; `.nds-block` inside `.nds-block`; a grid mixing `-col` and `-track` values; a `--gap` that is not a spacing token; a check group that is not a `fieldset` with a `legend`; an empty `data-nds-audit-ignore`. Near-misses: `lang-*` on every `<code>`, `aria-pressed` on selected chips, hex colors in site CSS, later swiper slides without `data-src`.
