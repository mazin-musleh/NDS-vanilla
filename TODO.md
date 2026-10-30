# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleaned 2026-10-25: finished items and their release notes left (all in `CHANGELOG.md` Unreleased); git history holds the investigation notes.

## Open

### Next session (handoff 2026-10-26)

- **Autocomplete: one aborted request, once.** A screenshot run logged `docs-assets/data/appointment-services.json` as `ERR_ABORTED` on the first click. A trace showed one request that finishes, and two reruns were clean. Watch for it.
- **Event pages: a link in muted text fails axe `link-in-text-block` (serious).** The Built-in Features description links on `events/hajj.md`, `foundation-day.md` and `national-day-96.md`, before and after the Feature List move (old build A/B, 2026-10-29). A plain `<a>` fails there too while the same link passes on doc pages, so the cause is shared by the event pages (likely their link styling), not the link class. Find it in the event pack CSS or the page.

### v2.0.0 release

- **NDS IQ v4.0 on release day** (plan and status in `plans/iq-v4.md`; `IQv3.2` is already tagged and pushed, off main). [ ] `python scripts/publish-iq.py --apply` BEFORE the build and `mkrelease.py` (`verify()` checks the published copy and the guides' v4.0 render), `git push origin main IQv4.0`, then `nds-iq-eval` `evolve`. [ ] Optional, owner go: the S101 behavior run.
- **v2.0.0 is the window for breaking improvements.** A major is the one time a wrong name or a split API can be fixed rather than aliased. For each find: add a sub-item here with the problem, the fix and its migration line, then decide build or drop with the owner. Every landed break gets a Migrating entry in `CHANGELOG.md`.
  - **List (v2), plan and status in `plans/list.md`** (it renames the Feature List of `plans/feature-list.md`). A name and its value is a Definition List; a set of items is a List (`ul.nds-list.nds-grid > li.nds-card`); one rich item is a Card. The card owns the code of every look; the list picks one look for all its items (`nds-stroke`, `nds-shadow`, `nds-flat`, `nds-horizontal`, `nds-reverse`, `nds-middle`, `nds-center`, through `&:is(.nds-x, :where(.nds-list.nds-x) > *)` in `_card.scss`), its size (`nds-sm`, `nds-lg`, card mixins) and a narrow step under 400px. Color stays on each icon or card. `nds-card` on a list or its items is a borrowed look: keep it.
    - [x] Feature List built, migrated and documented (`2b254aec`, `11ae7f18`, `2719b656`, `538128b3`, `f85654e6`, `03b09e50`).
    - [x] List step 1: renamed to List, the card owns each look, 110 lists carry their shared look class (`9d881e9e`); the doc builder's chips that rule each other out swap (`3ba7717c`).
    - [x] List step 2: 30 card sets on our pages are Lists, 11 of them Liquid loops; prose skips a List; `--min-width` in the style lifts the one-column default (the step 2 commit).
    - [ ] List step 3, next session: the list's size steps every card part (avatar, image, date tile, tags, buttons, rating, number). Start with an inventory of each part's sizes today; each part offers an SM and LG mixin beside `date-tile-sm`. Then step 4, the docs pass (`components/list.md` is renamed; its wording, Card's `nds-flat`, CHANGELOG), and step 5, the checks. Restart the dev server first if it still runs the old `docs_canon.rb` (changed in `3ba7717c`).
    - [ ] Not part of the break: the `#dl-actions` Copy button has no `nds-copy` + `data-copy-target` (see `utilities/copy.md`); "With actions" is an add-on to Details, not a Structure row.

### Parked features (owner calls; after v2.0.0 unless noted)

- **Chat component (2026-10-16), later.** Found in the Student Portal mockup (https://seu-exam-support.netlify.app/) with Date Tile and Meta, which shipped. Think it through first: the real uses, how it fits with other components, and what it replaces. The portal's support panel (`dialog#support-panel` in `examples/student-portal.md`) is where it would land.
- **File Upload image preview for a photo picker.** The old catalog card promised one; it never existed.
- **Rig asks, checked against the docs 2026-10-27.** The rest were already covered or dropped (shop parts are off-mission).
  - **Selection: a pick limit.** None today; Multiselect's `data-max-checked` only checks on submit. Owner call.
  - Parked: URL state for Multiselect and Tabs, Tabs hash sync (a framework router owns the URL); a compare pattern (an example, not a component).
- **PDF in the image viewer** (phone browsers do not show a PDF inside a page: iPhone shows the first page, Android downloads it) and **QR code** (an encoder is ~300 lines and NDS has no libraries; scanning needs a large decoder outside Chrome on Android).
- **NDS.audit `practice` tips: pilot of 9 shipped 2026-10-10; grow only if a behavior run shows agents act on them.** Candidates from the Best Practices sort (36 checkable of 827; generic accessibility left to axe and Lighthouse): `-FS` without its `-LH`; `tel:`/`mailto:` links in RTL text without `nds-ltr`; `nds-paged-content` on a wrapper instead of the `tbody`; `nds-page-item` inside a `.nds-pagination`; password rule chips without `data-permanent`; a persona photo with a non-empty `alt`; inline `--progress-value` without `data-value`; `aside.nds-card` on the side info; `.nds-ipv-thumbnail` without `data-ipv-full`; mixed `data-sort-mode` on one list; a counter with `data-currency` or `data-unit` but no `nds-number-format`; a Copy item in a menu without `data-no-auto-close`; a tag input with no `data-taginput-name`; a topbar widget without `data-hidden`, or more than two; a second `body > header`, or the main nav before the topbar; `.nds-block` inside `.nds-block`; a grid mixing `-col` and `-track` values; a `--gap` that is not a spacing token; a check group that is not a `fieldset` with a `legend`; an empty `data-nds-audit-ignore`. Near-misses: `lang-*` on every `<code>`, `aria-pressed` on selected chips, hex colors in site CSS, later swiper slides without `data-src`.
