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
- Items are plain cards with no variant classes. The root's switches style them; a class or knob on one card or one icon still wins.

## Switches (on the root)

A set chosen for lists, not every card option. Anything else: the card's or the icon's own class or knob on that item.

| Switch | Classes | Default | Sets |
|---|---|---|---|
| Layout | `nds-horizontal`, `nds-center` | stacked | the card's row or centered rules |
| Box | `nds-stroke`, `nds-shadow` | none: no fill, no padding, no border. Saves space and sets the list apart from a grid of cards | card knobs (`--card-bg`, `--card-padding`), the card's stroke/shadow rules |
| Description | — | muted (`--text-secondary-paragraph`), as the Definition List feature list | `--card-text-color` |
| Size | `nds-sm`, `nds-lg` | md | icon size, title and description size, card gap |
| Icon | `nds-icon-circle`, `nds-icon-subtle` | rounded square | the featured icon's radius knob, or its subtle rules |
| Color | `data-status` | brand | already cascades to every featured icon |
| Columns, gap, lines | Grid's knobs and `nds-divided`, `nds-divided-rows` | — | Grid, unchanged |

Names are placeholders: check each against existing classes before use (`nds-sm` on a grid root, an `nds-icon-*` collision).

## Knob fixes (v2 breaks, Migration lines, no aliases)

Today two things stop a parent's knob from reaching a card or an icon, and some card knob names do not say what they set. A major is the time to fix both.

1. **Card resets its public knobs on every card** (`:where(.nds-card) { --card-*: initial }`), so no parent can set them. The reset exists so a card's knobs do not leak into a card nested inside it: scope it to that case, `:where(.nds-card .nds-card)`. Then a knob on the list root (or any wrapper) reaches its cards.
2. **The featured icon writes its own size knob** (`&.nds-md, & { --featuredicon-size: 40px }`), so a parent's size never arrives. Drop the bare `&`: the private fallback already defaults to 40px, and the size classes still set the knob on the icon, so they still win.
3. **Card knob names say the property**, as Quote and Persona already do (`--quote-title-color`, `--quote-title-FS`): `--card-title` → `--card-title-color`, `--card-subtitle` → `--card-subtitle-color`, `--card-text` → `--card-text-color`, `--card-number` → `--card-number-color`, `--card-rating` → `--card-rating-color`, `--card-border` (and `-hover`, `-active`) → `--card-border-color` (and its states). `--card-bg` keeps its name. Grep each new name before use (knob/token collision).
4. **New card knobs for text size**, FS with its LH: `--card-title-FS`/`-LH`, `--card-description-FS`/`-LH`. The text-size classes then set these knobs, and the list's Size switch sets the same ones.

Other components' knob names are not this plan's scope.

## How the switches reach the items

1. **A knob exists → the list sets it on its root** and it inherits (after fix 1 and 2): padding, fill, description color, text sizes, icon size and radius. A knob or class on one card or icon wins, because it sits closer.
2. **Only a class exists (row, center, stroke, shadow, subtle icon) → the child offers a mixin, the parent includes it** (the `date-tile-sm` precedent in `_mixins.scss`). Card's `&.nds-horizontal { … }` body moves into `@mixin card-horizontal`; `.nds-card.nds-horizontal` and `.nds-feature-list.nds-horizontal > .nds-card` both include it. Card's CSS never names Feature List.

Override order, lowest to highest: Card/Icon defaults → the list's switches → a class or knob on one card or icon → an inline style.

## Retire (v2 break)

- The Definition List feature list: the `#dl-feature-list` canon, its Structure row, the `nds-item-title`/`nds-item-desc` selectors (`_definition-list.scss`, `_sideinfo.scss`). Migration: "A feature list (`nds-item-title`, `nds-item-desc`) → `nds-feature-list`." Plus a `_data/migrations.yml` row.
- Keep: a Definition List item with the card look (a borrowed look on pairs, `faculty-cv`).

## Steps

0. **Done 2026-10-29** (uncommitted; Migration lines, `migrations.yml` rows and the new knobs' doc rows wait for the docs pass). Knob fixes 1–4: rename in `_card.scss` and by script in every page and doc that sets the old names; Migration lines and `_data/migrations.yml` rows. Card and every featured icon host (card, drawer, metric, stepper) must render the same: screenshot before and after.
1. Card mixins: move the row, center and stroke/shadow bodies into mixins; Card's rendering must not change (screenshot every card canon before and after).
2. `_sass/components/_feature-list.scss` + `@use` in `nds-main.min.scss`. Build it in `playground.md`.
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
