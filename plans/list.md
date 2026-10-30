# List — plan (v2.0.0)

Status (2026-10-30): steps 1 to 3 done (`9d881e9e`, `91c0945b`, and step 3); next, step 4. Grows out of `plans/feature-list.md` (Feature List: committed, never shipped).

## Why

A set of items is the most common thing on a page, and today it has no name an agent can find: a `div.nds-grid` of cards, a Feature List, Drawer rows. The list gives it one, **List** (`nds-list`), and three things:

1. **A name** an agent finds for "a set of items".
2. **A real list:** `ul`/`li`, so a screen reader hears "list, N items".
3. **One look for every item, set once:** box, size and inner layout on the list, so the items cannot drift apart.

## Decided (owner, 2026-10-30)

- **Items are cards** (`li.nds-card`): the card is the vessel. It already holds an icon, an image, a date tile, tags, actions, a row or a stack.
- **One owner per job.** The card owns the code of every look. The list owns where the items sit, and which look they all share.
- **The list takes a card modifier only when mixed values break the list's look.** In: `nds-stroke`, `nds-shadow`, `nds-flat`, `nds-sm`, `nds-lg`, `nds-horizontal`, `nds-reverse`, `nds-middle`, `nds-center`. Out, per card: color, status, `nds-full`, the content. A new card modifier stays out unless it passes the rule.
- **Same names on the list and on the card.** `nds-card` never goes on the list (Grid's `display: grid` and Card's flex fight; no page does it), so the names cannot clash. An outer card wraps the list: `div.nds-card > ul.nds-list`.
- **A preset on the list wins over the same kind of class on a card.** No preset: each card styles its own box. The audit warns on a card box class under a list preset.
- **Any card knob on the list reaches every item** (`--card-bg`, `--card-padding`, …): custom properties inherit. Color stays per card: a color or status card keeps its own tint over an inherited knob.
- **`nds-flat` is new on the card too:** no fill, no padding, a muted description. `nds-flush` stays a general utility; on the list it would also hit the `<ul>`.
- **Size is the list's only, not a card class:** on `nds-modal nds-card`, `nds-sm`/`nds-lg` are the modal's width. The card offers its steps as mixins (`card-sm`, `card-lg`, `card-sm-box`); a single card has its text sizes on `.nds-card-text`.
- **Icons are styled per icon** (`nds-subtle` on each `.nds-featured-icon`); `nds-icons-*` is dropped.
- **The narrow step stays on the list** (AGENTS.md "the parent decides"): below 400px, the items of a list with no size class take `card-sm-box` (icon and gap, never the text).
- **Size covers every card part** (owner): the list's SM and LG step every part a card holds, not only the icon, text and gap: avatar, image, date tile, tags, buttons, rating, number. Each part offers its step as a mixin (as `date-tile-sm` does); `card-sm` and `card-lg` include them, and the narrow step takes the box parts only.
- **A list fills its parent's width** (owner): it measures itself for the narrow step, so it cannot size a box that sizes to its content (an inline block, a table cell, a centering flex row). There the author gives it a width; the doc says so.
- Feature List is renamed to List before v2 ships: no Migration row. A plain grid of cards keeps working.
- Link cards stay out of the list. Links in a list and Drawer's role come later, once the list settles.

## Shape

```html
<ul class="nds-list nds-grid nds-stroke nds-horizontal" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
  <li class="nds-card">
    <div class="nds-card-header">…featured icon, image, avatar or date tile…</div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">…</span>
        <p class="nds-card-description">…</p>
      </div>
    </div>
  </li>
</ul>
```

Features (the Built-in Features lists): `ul.nds-list.nds-grid.nds-flat.nds-horizontal.nds-divided-rows`, `nds-subtle` on each icon.

The root is a grid: columns, gaps, lines (`nds-divided`, `nds-divided-rows`) and the last-row script are Grid's. One column until the author sets `--max-col`, or writes `--min-width` in the list's `style` (CSS cannot see a knob set in a stylesheet: there, write `--max-col: auto-fit` with it). No new JS.

## How the CSS works

Each In modifier is one rule in `_card.scss` that answers to the card's own class or its list's:

```scss
&:is(.nds-horizontal, :where(.nds-list.nds-horizontal) > *) { … }
```

`:where()` keeps the list part at zero specificity, so every card rule keeps today's strength and order. A `:not(.nds-x)` rule becomes `:not(.nds-x, :where(.nds-list.nds-x) > *)`. No mixin copies, no list-side card CSS.

`_list.scss` keeps only the list's own: the `<ul>` reset, `container: nds-list / inline-size`, `--max-col: 1` (not with `--min-width` in the style), the narrow step, and the nested-card boundary below.

**In a card:** the nested-card reset (`:where(.nds-card .nds-card)`) would stop the list's knobs at its items. A list inside a card resets every card knob on itself (the outer card's stop there) and its items inherit them back (the list's pass). One `$card-knobs` list in `_mixins.scss` feeds Card's reset and both list rules.

**Color over an inherited knob:** a `.nds-color` card (and a status card, for what status sets) resets the knobs its color sets, at zero specificity: an inherited `--card-bg` stops there, and one written on the card still wins.

## Future-proof

- The title is styled by class, not tag, so a later link item makes it an `<a class="nds-card-title">` with no other change.
- No list rule keys on a tag. A later item type answers to the same list classes by adding its own `:where(.nds-list.nds-x) > *` arm.

## Inventory (2026-10-30, 77 card sets in the source)

- Move to `ul.nds-list`: 53 `div.nds-grid` of cards (13 paged, 1 Scroll More) and 4 `div.nds-flex.nds-col`.
- Renamed (step 1, done): 119 lists, each `nds-list nds-grid nds-flat …`, icon classes per icon.
- Stay: 13 Swipers (the slide needs `.nds-swiper-slide`), 2 link-card sets, 2 `label.nds-card` selection sets, the Definition List with the card look (`faculty-cv`), Countdown, cards nested in a card.
- Pagination and Filter find items by class (`.nds-page-item`, `data-filter-items`), so `li` items work: confirm on one paged and one filtered page.
- Loop-made sets sit in Liquid (`_includes/library-list.html`, the index pages): change the template.
- Card box classes in use: `nds-stroke` 309, `nds-shadow` 61, both 28.

## Steps

1. **Rename and rebuild** (done, `9d881e9e`): `_list.scss` keeps only the list's own; `_card.scss`: the In modifiers answer to the list (the `:where` pattern), `nds-flat`, the `card-knobs` mixin, the color reset; `_mixins.scss`: `card-knobs`, `card-sm`, `card-lg`, `card-sm-box`. The 110 lists with a look class shared by every item carry it on the list (`tmp/list-hoist.py`): 109 `nds-horizontal`; the home page's flat list of shadow cards is a shadow list now (its description is no longer muted). Checked: `check-css.py`, `check-data-state-tails.py`, 18 playground claims in Chrome and WebKit, every page with cards old vs new at 1280 and 390 (`tmp/ab-css.mjs`).
2. **Migrate our pages** (done): `tmp/to-list2.py` moved 30 sets, 19 written out and 11 built by Liquid loops (the Library, Events, Examples, Templates, Services and Search lists, the life journey lists, the team directory), and `tmp/list-hoist.py` moved their shared look classes to the list. Stay grids: page layout (sign-in, registration), dashboard panels (student portal, console, the KPI charts), and the Grid, Block, Themes and Expandable pages' own demos. Fixed on the way: a list that is also `nds-block` keeps the block's gap; the list's `nds-center` centers its items' text; the one-column default skips a list with `--min-width` in its style; the Sort demos take the full width. Checked: 25 pages, the last commit's build vs this one (`tmp/ab-html.mjs`), 1280 and 390: the same, but the narrow step on phones (4px less gap; the faculty CV's icons 40 to 32).
3. **Size covers every card part** (done): each part steps one rung from its default, and only with no size class of its own. Part mixins beside `date-tile-sm` (`featured-icon-*`, `avatar-*`, `date-tile-lg`, `progress-circle-md`, `rating-*`, `tag-sm`, `chip-*`; `btn-md` and `meta-*` existed), and each part's own size class includes its mixin. A knob part (icon, avatar, ring, stars, tag) takes the step from the item by inheritance; a part that sets its default on itself (date tile, chip, meta, button) takes it through `X:not(.nds-sm, .nds-md, .nds-lg)`, as Drawer does. The card's number and row image read `--_card-number-FS-base` and `--_card-image-width-base`. No step past a part's ends: no LG for a button or tag, no SM for a ring. An avatar in a list is XL by default (the list sets it, as the card canon writes `nds-xl`): SM steps it to LG, LG to 2XL (owner). A tag in a list is SM: XS and MD (owner; the tag gained `nds-md` to keep 32px). Stars too, as the card canon writes `nds-sm` (owner); the rating has no MD class. Our list pages lost their avatar and tag size classes (`tmp/list-tag-classes.py`, 56 tags in 9 files), but the Library keeps `nds-xs`: its items hold many tags (owner). Narrow step: icon, avatar (to LG), date tile, gap. Checked: `check-css.py`, `check-data-state-tails.py`, 151 pages old CSS vs new at 1280 and 390 (no change: today's sized lists hold only icons), and a fixture of every part in a bare, SM, LG and narrow list (`tmp/list-step3-sizes.mjs`; 20 failures on the old CSS, none on the new, Chrome and WebKit).
4. **Docs in one pass** (`/nds-doc list`): `components/list.md` (renamed from `feature-list.md` already; reword it for any set of items, the In list as builder groups), Card (`nds-flat`, "for a set of cards, use List"), Grid, the catalog rules (Card, Definition List, Training Academy; "features" stays a word in List's `use_when`), the `nds-doc` skill's features canon, the audit warning, CHANGELOG (Added: List; Card's new classes; Feature List never shipped, so it is not named).
5. **Checks:** `js_processor.rb`, `check-docs.py`, `check-css.py`, `check-data-state-tails.py`, `check-a11y.mjs`, `doc-check.mjs`, `run-audit.mjs`; Chrome and WebKit, light and dark, desktop and phone.

## Later (own plans, after the list settles)

- Links in a list (recommended: the title as the link, stretched over the item, an end arrow; a linked item holds no other link or button).
- Drawer back to menus only; quick links, notifications and dated rows move to the list.
- Link cards: keep for a plain grid, or retire in v2.
