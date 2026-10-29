# Feature List — plan (v2.0.0)

Status: planned 2026-10-29, not built. Owner picked "Metric-style": a thin layer over Card + Grid.

## Why

An icon + title + line item had three builds (Definition List feature list, a plain card, a DL item with the card look), and the only rule between them was "lighter than cards". Agents find things by name, so a set of features gets a name: **Feature List**. The rule becomes: a name and its value → Definition List; a set of features → Feature List; one rich item → Card.

## Already landed (uncommitted, 2026-10-29)

- `.nds-card.nds-flush` also drops the fill and the shadow (`_card.scss`).
- `nds-divided-rows` on a grid: row lines only. Row lines are drawn by the items (a line in the middle of the gap), so they show in every browser; the Grid script marks the last row. Column lines stay gap decorations (new Chrome only).
- A divided grid's default gap doubles (`--_gap-scale`), since the line halves it.
- A divided Definition List in a grid uses the grid's line; its own border lines stay for lists outside a grid.
- `index.md`: Who It's For and Architecture are cards in a grid (the pilots).

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

Names are placeholders: check each against existing classes before use (`nds-sm` on a grid root, an `nds-icon-*` collision).

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

0. **Done 2026-10-29** (`2b254aec`; Migration lines, `migrations.yml` rows and the new knobs' doc rows wait for the docs pass). Knob fixes 1–4: rename in `_card.scss` and by script in every page and doc that sets the old names; Migration lines and `_data/migrations.yml` rows. Card and every featured icon host (card, drawer, metric, stepper) must render the same: screenshot before and after.
1. ~~Card mixins~~ — dropped 2026-10-29: layout and box stay the card's own classes (see Switches).
2. **Done 2026-10-29** (uncommitted). `_sass/components/_feature-list.scss` + `@use` in `nds-main.min.scss`; four cases in `playground.md` (default, row + `nds-sm` + `nds-circle`, `nds-lg` + status + a boxed and a knob-tuned item, inside prose), Chrome and WebKit.
3. Pilot: index Who It's For and Architecture, and one doc page's Built-in Features. Compare with today's screenshots; settle the defaults.
4. Migrate by script: 105 Built-in Features blocks, index Development Environment, `examples/training-academy.md`, and the pilots.
5. Retire the DL feature list (above).
6. Docs in one pass: `components/feature-list.md` (`/nds-doc`), catalog entry + sidemenu, the rule in the Card and Definition List `use_when` and Best Practices, the Grid doc (`nds-divided-rows`, the gaps, which browsers draw column lines), helpers (`nds-flush` on a card), changelog + Migrating.
7. Checks: `check-css.py`, `check-data-state-tails.py`, `check-a11y.mjs`, `run-audit.mjs` on the changed pages, Chrome and `ENGINE=webkit` screenshots, light and dark, desktop and phone.

## Decided (owner, 2026-10-29)

- Default box: none, the look of today's feature list.
- Description: muted gray.
- Name: `nds-feature-list` (a list of features; "featured", as in `nds-featured-icon`, means highlighted).
- Today's work stays: it is the base (row lines, `nds-divided-rows`, gaps, `nds-flush` on a card, the DL on the grid line).
