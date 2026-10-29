# Feature List — plan (v2.0.0)

Status (2026-10-29, end of session): steps 0–5 built and committed; step 6 (docs) and 7 (checks) are next. Owner picked "Metric-style": a thin layer over Card + Grid.

## Why

An icon + title + line item had three builds (Definition List feature list, a plain card, a DL item with the card look), and the only rule between them was "lighter than cards". Agents find things by name, so a set of features gets a name: **Feature List**. The rule becomes: a name and its value → Definition List; a set of features → Feature List; one rich item → Card.

## Commits

- `2b254aec` — Grid row lines drawn by items in every browser, `nds-divided-rows`, divided gap doubles, the DL on the grid line, `.nds-card.nds-flush` drops fill and shadow; step 0 knob fixes.
- `11ae7f18` — `_feature-list.scss`, the `featured-icon-*` mixins, `nds-icons-*`, subtle one size down, the Card status self-cycle fix.
- `2719b656` — the migration: 105 lists to Feature List, `docs_canon.rb` DOC_STYLE, event pages' columns.
- The commit after `2719b656` (`refactor!: retire the Definition List feature list`) — step 5 (retire the DL feature list, `migrations.yml` rows, Empty demo, items `inherit` in a card), the one-column default, and this plan's handoff:

  ```
  refactor!: retire the Definition List feature list

  nds-item-title and nds-item-desc are gone: a list of features is a
  Feature List. Its items keep the list's knobs inside a card (the
  nested-card reset dropped them), and it stacks in one column until the
  author sets --max-col. The Empty demo is a Feature List; migrations.yml
  lists both classes and the card knob renames.
  ```

- `playground.md` holds the Feature List test cases (`#fl-default`, `#fl-row-sm-circle`, `#fl-lg-status-mixed`, `#fl-in-prose`, `#fl-icons-subtle`, `#fl-icons-dark-circle`, `#fl-icons-outline`, `#fl-in-card`); never committed, on purpose. Restore it with `git checkout playground.md` once the doc page has its own demos.

## Shape

```html
<ul class="nds-feature-list nds-grid nds-divided-rows" style="--max-col: 2; --min-col: 1;">
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Zero Dependencies</span>
        <p class="nds-card-description">Plain HTML, CSS and JavaScript.</p>
      </div>
    </div>
  </li>
</ul>
```

- The root is a grid as well: columns, gaps and lines are Grid's, and the Grid script already watches it. No new JS.
- `ul` / `li`: a screen reader hears "list, N items". The list resets its bullets and padding.
- Items are real cards. The root sets their defaults through knobs; each card and icon keeps its whole API (classes and knobs), so an item can differ from the others: that is the author's choice, not drift.

## Switches (on the root) — knobs only

A set chosen for lists, not every card option. Each switch sets card or icon knobs on the root, and they inherit.

| Switch | Classes | Default | Sets |
|---|---|---|---|
| Box | — | none: no fill, no padding. Saves space and sets the list apart from a grid of cards | `--card-bg`, `--card-padding` |
| Description | — | muted (`--text-secondary-paragraph`), as the Definition List feature list | `--card-text-color` |
| Size | `nds-sm`, `nds-lg` | md | `--card-title-FS`/`-LH`, `--card-description-FS`/`-LH`, `--featuredicon-size`, `--card-gap` |
| Icons | `nds-icons-circle`, `nds-icons-dark`, `nds-icons-outline`, `nds-icons-subtle` (the icon's own names; they combine as its classes do) | tinted rounded square | the icon's looks, shared as `featured-icon-*` mixins in `_mixins.scss`; an icon's own class wins |
| Color | `data-status` | brand | already cascades to every featured icon |
| Columns, gap, lines | Grid's knobs and `nds-divided`, `nds-divided-rows` | — | Grid, unchanged |

On each card or icon, as the card's own classes: row (`nds-horizontal`), centered (`nds-center`), middle, stroke, shadow, the subtle icon. The canon writes the common one on every item.

Columns: one by default (`:where(.nds-feature-list) { --max-col: 1 }`); with `--min-width`, also write `--max-col: auto-fit`.

**Why not root switches for row, centered, stroke, shadow (decided 2026-10-29):** Card builds on those classes with "not" rules (`&:not(.nds-horizontal) … .nds-card-corner`, `&:not(.nds-center) .nds-card-featured-icon`), and other components key on them (Countdown `.nds-card.nds-horizontal`/`.nds-center`, Definition List and Stepper `.nds-card:not(.nds-stroke)`, Swiper `:has(.nds-card.nds-shadow)`). A parent-applied copy would make a list card differ from a real card, and every future rule would have to answer to both. ponytail: when container style queries reach every browser, Card can key its layout on a knob (`@container style(--card-layout: row)`), and the root gets a layout switch for free.

## Knob fixes (v2 breaks, Migration lines, no aliases)

Today two things stop a parent's knob from reaching a card or an icon, and some card knob names do not say what they set. A major is the time to fix both.

1. **Card resets its public knobs on every card** (`:where(.nds-card) { --card-*: initial }`), so no parent can set them. The reset exists so a card's knobs do not leak into a card nested inside it: scope it to that case, `:where(.nds-card .nds-card)`. Then a knob on the list root (or any wrapper) reaches its cards.
2. **The featured icon writes its own size knob** (`&.nds-md, & { --featuredicon-size: 40px }`), so a parent's size never arrives. Drop the bare `&`: the private fallback already defaults to 40px, and the size classes still set the knob on the icon, so they still win.
3. **Card knob names say the property**, as Quote and Persona already do (`--quote-title-color`, `--quote-title-FS`): `--card-title` → `--card-title-color`, `--card-subtitle` → `--card-subtitle-color`, `--card-text` → `--card-text-color`, `--card-number` → `--card-number-color`, `--card-rating` → `--card-rating-color`, `--card-border` (and `-hover`, `-active`) → `--card-border-color` (and its states). `--card-bg` keeps its name. Grep each new name before use (knob/token collision).
4. **New card knobs for text size**, FS with its LH: `--card-title-FS`/`-LH`, `--card-description-FS`/`-LH`. The text-size classes then set these knobs, and the list's Size switch sets the same ones.

5. **Done with step 2: a status above a card reaches its icons.** Card forwarded `--featuredicon-color: var(--_card-icon)` while `--_card-icon` read `--featuredicon-color` (the old `--icon-color` forward from `c804e7c9`, made a self-cycle by a rename), so every card dropped an inherited status and its icons fell back to brand. The forward is gone; a scan of all 150 built pages found no card under an outer status or color class but the playground's, and the 88-view A/B shows no change.

Other components' knob names are not this plan's scope.

## How the switches reach the items

The list sets knobs on its root and they inherit (after fixes 1 and 2): padding, fill, description color, text sizes, icon size and radius.

Override order, lowest to highest: Card/Icon defaults → the list's switches → a knob on one card or icon (closer), or an icon's own size class → an inline style. A card's text-size class loses to the list's Size knobs, as every card class loses to a card knob; on one card, set the knob.

## Retire (v2 break)

- The Definition List feature list: the `#dl-feature-list` canon, its Structure row, the `nds-item-title`/`nds-item-desc` selectors (`_definition-list.scss`, `_sideinfo.scss`). Migration: "A feature list (`nds-item-title`, `nds-item-desc`) → `nds-feature-list`." Plus a `_data/migrations.yml` row.
- Keep: a Definition List item with the card look (a borrowed look on pairs, `faculty-cv`).

## Steps

0. **Done 2026-10-29** (`2b254aec`; the `migrations.yml` rows landed with step 5; the CHANGELOG Migrating lines and the new knobs' doc rows wait for step 6). Knob fixes 1–4: rename in `_card.scss` and by script in every page and doc that sets the old names; Migration lines and `_data/migrations.yml` rows. Card and every featured icon host (card, drawer, metric, stepper) must render the same: screenshot before and after.
1. ~~Card mixins~~ — dropped 2026-10-29: layout and box stay the card's own classes (see Switches).
2. **Done 2026-10-29** (`11ae7f18`). `_sass/components/_feature-list.scss` + `@use` in `nds-main.min.scss`; the cases in `playground.md` (default, row + `nds-sm` + `nds-icons-circle`, `nds-lg` + status + a boxed and a knob-tuned item, inside prose), Chrome and WebKit.
3. **Done 2026-10-29.** Pilot: index Who It's For and Architecture (`nds-icons-circle`), Accordion's Built-in Features. Docs' Built-in Features settled on the default size + `nds-icons-subtle` + row cards (the description is reading text: no `nds-sm`). `docs_canon.rb` DOC_STYLE gives `.nds-doc-features .nds-feature-list` the 2-1-1 columns.
4. **Done 2026-10-29** (`2719b656`). `tmp/migrate-feature-lists.py`: 103 Built-in Features blocks, index Development Environment, `examples/training-academy.md`; no skips. The three event pages are not doc-canon pages (no DOC_STYLE), so their lists carry the columns inline and `nds-doc-features` moved to their section (their old list squeezed every item into one row: A/B on the old build). Checked on 106 pages × 2 widths: columns, last-row marks, sizes, no overflow; axe on all 106 (only the event pages' old link finding, in TODO); audits 0 except Themes' old duplicate id.
5. **Done 2026-10-29** (committed with the handoff). Retired: the `#dl-feature-list` canon, its Structure row and Best Practices line; `nds-item-title`/`nds-item-desc` out of `_definition-list.scss` and `_sideinfo.scss` (selectors now `dt`/`dd`: 48 views A/B identical, color and weight included); the DL page's own Built-in Features moved; `migrations.yml` rows for both classes and the step 0 knob renames. The Empty demo is a Feature List in a card (a `dl` failed axe: Empty's `div` placeholder is not a dt/dd group). That exposed a bug, fixed: in a card, the items are nested cards and the reset dropped the list's knobs, so the items take them back (`inherit`, after Card's sheet). Left alone: the `nakheel-clinics` eval rig (an `nds-iq-eval` fixture). **Default one column** (owner, 2026-10-29): `:where(.nds-feature-list) { --max-col: 1 }`, after Grid's sheet; a bare grid put every item in one row (the doc pages, the event pages, the Empty demo). With `--min-width`, write `--max-col: auto-fit`.
6. **Docs in one pass — next session.** Follow `EDITORIAL.md` and the `nds-doc` skill. Front matter: `since`/`updated` "2.0.0" (`version` in `_config.yml`, minus `-dev`); `last_edit` in GMT+3 from the local `date`.
   - **New `components/feature-list.md`** (`/nds-doc feature-list`, one-source format: `data-canon` blocks, builder, hidden Variants table, Built-in Features (itself a Feature List), Best Practices, API). Canons: stacked (default) and row (`nds-horizontal` on each item). Variants: Icons (`nds-icons-circle`/`-dark`/`-outline`/`-subtle`, combinable), Size (`nds-sm`, `nds-lg`), Lines (`nds-divided-rows`, `nds-divided`), Status (`data-status`), a boxed item (`nds-stroke`/`nds-shadow`/`nds-color` gets its box back). API: the classes; the knobs the list sets (`--card-bg`, `--card-padding`, `--card-text-color`, the size FS/LH, `--featuredicon-size`, `--card-gap`); columns (one by default, `--max-col`; `--min-width` needs `--max-col: auto-fit`). Practices: a name and its value is a Definition List, one rich item is a Card; per item, the card's own classes and knobs win; it works inside a card.
   - **Register it:** `_data/sidemenu/sidemenu.yml` (Components, beside Definition List) and `_data/catalog.yml` (match a neighbor's keys: title, description, use_when, category, tags, url, scss).
   - **Catalog rule:** Card `use_when` (`_data/catalog.yml:499`: "For an icon, a title and one line per item, a Definition List is lighter" becomes Feature List); Definition List `use_when` (~532: drop "Also a light list of items … (the Feature list structure)"); Training Academy (~1131: "An icon, a title and one line: a Definition List in a grid" becomes a Feature List; its tags list "Definition List"); `examples/training-academy.md:19`, the opening comment with the same rule.
   - **Definition List doc:** the Overview's "Pick another component when" gets a Feature List bullet (link it once the page exists); a divided list in a grid takes the grid's row lines; the `nds-last-row` row still holds for a list outside a grid.
   - **Card doc:** the CSS Custom Properties table has the renamed color knobs already (script); add `--card-title-FS`/`-LH`, `--card-subtitle-FS`/`-LH`, `--card-description-FS`/`-LH`; "Set these on `.nds-card`" becomes: on the card or any parent, and a card inside a card keeps its own; `nds-flush` on a card drops fill and shadow; a status above a card colors its icons; a Feature List pointer in Best Practices.
   - **Featured Icon doc:** a parent's `--featuredicon-size` now reaches the icon (the doc already promised it); `nds-subtle` is one size smaller than the tiled sizes (24/32/40/48).
   - **Grid doc** (`layout/grid.md`): `nds-divided-rows` (Variants and API rows); a divided grid's default gap doubles; row lines show in every browser (the script marks the last row), column lines only in new Chrome (replace "Safari 26 draws no lines"); `nds-last-row`: "the grid's row lines read it", not Definition List.
   - **Helpers doc:** `nds-flush` on a card also drops its fill and shadow.
   - **Empty doc:** the live demo is a Feature List in a card (`last_edit` only).
   - **CHANGELOG `[Unreleased]`:** Added (Feature List; `nds-divided-rows`; card FS/LH knobs; parent knobs reach cards and icons). Changed (divided grids draw row lines in every browser and double the gap; a subtle featured icon is one size smaller; Metric's title through the card size knobs). Fixed, only bugs in a released tag (check each with `git show v1.12.0:<file>`): a status above a card did not reach its icons (`c804e7c9`); the event pages' Built-in Features in one row. Migrating: the 8 card knob renames; `nds-item-title`/`nds-item-desc` to Feature List; the DL `#dl-feature-list` canon removed.
   - **Not in this pass:** the `nakheel-clinics` rig (`.claude/skills/nds-iq-eval/rigs/`) still uses the old classes; the `nds-iq-eval` skill owns it. The NDS-IQ draft and `NDS-INDEX.md` name no feature-list markup (checked 2026-10-29).
7. Checks: `ruby _plugins/js_processor.rb` (the audit bundle embeds the doc names), `check-docs.py`, `check-css.py`, `check-data-state-tails.py`, `check-a11y.mjs`, `run-audit.mjs` on the changed pages, Chrome and `ENGINE=webkit` screenshots, light and dark, desktop and phone.

## Next session: how to pick up

- **The owner's dev server** (port 4002, a VS Code terminal) needs one restart for `docs_canon.rb`: Jekyll does not reload plugins, so until then doc pages miss the Feature List columns. Never restart it yourself.
- **Check on your own build instead:** `bundle exec jekyll build -d tmp/site-check/NDS-vanilla` (about 8 s), then serve it with `python -m http.server 4010 --bind 127.0.0.1 --directory tmp/site-check` as a background task. Stop its python process by PID afterwards: `TaskStop` leaves it running. Keep parallel pages at 2: the python server drops requests under more, and a page that loads without CSS reads as a false failure.
- **`tmp/` is disposable**, so these may be gone: `migrate-feature-lists.py` (the converter, done), `fl-check-all.mjs` (every Feature List: columns, last-row marks, sizes, overflow, at 1280 and 390), `ab-boxes.mjs` + `ab-boxes-diff.mjs` (element box, font, color and border A/B, old vs new), `ab-pages.mjs` (full-page pixel A/B with a frozen clock). If a check is needed again, rebuild it from this description, or promote it to `scripts/` first.
- **Known, not ours:** the event pages' `link-in-text-block` (in `TODO.md`); the Themes page's duplicate `id="theme-menu"`; WebKit's `ResizeObserver loop` on doc pages at phone width (main nav, Scroll More, the doc frame).

## Decided (owner, 2026-10-29)

- Default box: none, the look of today's feature list.
- Description: muted gray.
- Name: `nds-feature-list` (a list of features; "featured", as in `nds-featured-icon`, means highlighted).
- Today's work stays: it is the base (row lines, `nds-divided-rows`, gaps, `nds-flush` on a card, the DL on the grid line).
