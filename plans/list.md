# List — plan (v2.0.0)

Status (2026-10-30): done. Steps 1 to 5 and the flex mode (3b) committed; what is left is under Later.

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
3. **Size covers every card part** (done): each part steps one rung from its default, and only with no size class of its own. Part mixins beside `date-tile-sm` (`featured-icon-*`, `avatar-*`, `date-tile-lg`, `progress-circle-md`, `rating-*`, `tag-sm`, `chip-*`; `btn-md` and `meta-*` existed), and each part's own size class includes its mixin. A knob part (icon, avatar, ring, stars, tag) takes the step from the item by inheritance; a part that sets its default on itself (date tile, chip, meta, button) takes it through `X:not(.nds-sm, .nds-md, .nds-lg)`, as Drawer does. The card's number and row image read `--_card-number-FS-base` and `--_card-image-width-base`. Later the same day: the subtitle, the price line (price, unit, struck price), the rating text (LG only: 12px is its floor) and a metric's value and trend step too (`metric-sm`, `metric-lg`). No step past a part's ends: no LG for a button or tag, no SM for a ring. An avatar in a list is XL by default (the list sets it, as the card canon writes `nds-xl`): SM steps it to LG, LG to 2XL (owner). A tag in a list is SM: XS and MD (owner; the tag gained `nds-md` to keep 32px). Stars too, as the card canon writes `nds-sm` (owner); the rating has no MD class. Our list pages lost their avatar and tag size classes (`tmp/list-tag-classes.py`, 56 tags in 9 files), but the Library keeps `nds-xs`: its items hold many tags (owner). A status tag in `.nds-card-corner` keeps `nds-xs` at every list size (owner): the team directory and the Examples and Templates indexes got theirs back. Narrow step: icon, avatar (to LG), date tile, gap. Checked: `check-css.py`, `check-data-state-tails.py`, 151 pages old CSS vs new at 1280 and 390 (no change: today's sized lists hold only icons), and a fixture of every part in a bare, SM, LG and narrow list (`tmp/list-step3-sizes.mjs`; 20 failures on the old CSS, none on the new, Chrome and WebKit).
3b. **Flex mode** (built, not committed; owner decides after seeing the playground): see "Flex mode" below. Checked: `check-css.py`, `check-data-state-tails.py`; the playground's eight cases at 1280, 800 and 390, the same in Chrome and WebKit (`tmp/flex-mode-measure.mjs`); 151 pages old CSS vs new, no change but the playground; the team directory as a flex list, paged and filtered, in both engines (`tmp/flex-paged-check.mjs`); the audit warning (`tmp/flex-audit-check.mjs`). A lone last item fills its row: 5 items at a tablet's width give 2, 2, 1.
4. **Docs in one pass** (done: the catalog routes a set of items to List (List, Cards, Grid, Flex, Definition List, Persona, About Entity, Sort); the List page covers any set of cards, with an Items row (Icon, Person, Course) that swaps each item's parts through part inserts, so it combines with Grid and Flex (owner); Card gains Flat; Grid and Flex point to List; the audit warns on a box class on a list item; CHANGELOG. A consumer-agent run (catalog and docs only) picked List for services, people, courses and numbers, a Grid for link tiles and a Definition List for pairs) (`/nds-doc list`): `components/list.md` (renamed from `feature-list.md` already; reword it for any set of items, the In list as builder groups), Card (`nds-flat`, "for a set of cards, use List"), Grid, the catalog rules (Card, Definition List, Training Academy; "features" stays a word in List's `use_when`), the `nds-doc` skill's features canon, the audit warning, CHANGELOG (Added: List; Card's new classes; Feature List never shipped, so it is not named).
5. **Checks** (done: `js_processor.rb`, `check-docs.py` (103 pages), `check-css.py`, `check-data-state-tails.py`, `check-i18n.mjs`; `check-a11y.mjs` on 17 list pages, LTR and RTL, Chrome (3410 tab stops) and WebKit (1242), 0 findings; `run-audit.mjs` on 14, 0 warnings; `doc-check.mjs components/list.md` desktop and phone, light and dark, no findings; WebKit dark screenshots of the team directory and the services list, desktop and phone): `js_processor.rb`, `check-docs.py`, `check-css.py`, `check-data-state-tails.py`, `check-a11y.mjs`, `doc-check.mjs`, `run-audit.mjs`; Chrome and WebKit, light and dark, desktop and phone.

## Flex mode (plan, 2026-10-30; owner: plan it with item knobs, structures first)

Decided (owner): a bare flex list fills its rows (`--grow: 1`); on a list, `nds-center` is an item look only, and `--justify: center` centers the rows.

A list lays its items out in a grid (default) or in a flex row that wraps. Grid: equal columns, rows that line up, lines between items, a count per screen. Flex: rows that fill (the short last row too), a featured item, items at their own width.

### Structures (canons to review before any code)

```html
<!-- 1. Rows that fill: each item starts at --card-width and grows; the last row fills too -->
<ul class="nds-list nds-flex nds-stroke" style="--card-width: 320px;">
  <li class="nds-card">…header, content…</li>
</ul>

<!-- 2. Fill up to a cap: the last row stops at the cap and centers -->
<ul class="nds-list nds-flex nds-stroke" style="--card-width: 320px; --card-width-max: 420px; --justify: center;">
  <li class="nds-card">…</li>
</ul>

<!-- 3. A featured item: twice the start width and twice the growth -->
<ul class="nds-list nds-flex nds-stroke" style="--card-width: 220px;">
  <li class="nds-card" style="--card-width: 440px; --grow: 2;">…</li>
  <li class="nds-card">…</li>
</ul>

<!-- 4. Items at their content's width that grow to fill the row (quick links). Stacked cards only -->
<ul class="nds-list nds-flex nds-stroke nds-center nds-sm" style="--card-width: auto; --gap: var(--spacing-md);">
  <li class="nds-card">…icon header, title only…</li>
</ul>

<!-- 5. Items at their own width, rows centered (logos, numbers) -->
<ul class="nds-list nds-flex nds-flat nds-center" style="--card-width: 160px; --grow: 0; --justify: center;">
  <li class="nds-card">…</li>
</ul>
```

### Knobs (on the list for every item, or on one item)

| Knob | In a flex list | Default |
|---|---|---|
| `--card-width` | The width an item starts at, before it grows. `auto`: its content's width | `320px`: 3 a row in a 1216px list, 2 in a tablet's, 1 on a phone |
| `--card-width-max` | The widest an item grows | none (the card's 360px cap is off) |
| `--grow` (new) | How much an item grows: `0` stays at `--card-width`, `2` grows twice as fast as `1` | `1` |
| `--justify`, `--align`, `--gap` | Flex's own: where a short row sits, how items line up across a row, the space between | Flex's |

### Rules

- `nds-flex` on a list always wraps: a list row that does not wrap squeezes its items.
- Every list sets `width: 100%`, as Grid does: it measures itself, so in a centering parent (the doc preview frame) a flex list had no width and drew at 0px.
- In the List builder, Featured item excludes Fill with a cap and Own width: the cap holds it to the others' width, and with Own width it alone grows.
- On a list, `nds-center`, `nds-middle` and `nds-reverse` are item looks only. Flex's three rules skip a list (`:not(.nds-list)`); the layout takes `--justify` and `--align`.
- A row card (`nds-horizontal`) needs a set `--card-width`: it measures its width from its parent, so `auto` squeezes it.
- A lone last item fills its row; `--card-width-max` stops it.
- No lines and no `nds-col` on a flex list: they are Grid's (a one-column list is Grid's default). The audit warns on `nds-col`, `nds-nowrap`, `nds-divided` and `nds-divided-rows` with `nds-flex` on a list.
- A list in a card resets `--grow` with the card knobs, so a nested list does not take its outer item's growth.

### CSS (sketch)

```scss
// _list.scss
.nds-list.nds-flex {
  flex-wrap: wrap;

  > .nds-card {
    flex: var(--grow, 1) 1 var(--card-width, 320px);
    width: auto;
    max-width: var(--card-width-max, none);
  }
}

// _flex.scss: the three rules gain :not(.nds-list)
.nds-flex.nds-center:not(.nds-list) { … }
.nds-flex.nds-middle:not(.nds-list) { … }
:is(.nds-flex, .nds-row).nds-reverse:not(.nds-col, .nds-list) { … }
```

### Steps

1. CSS as above, `--grow` in the nested-list reset.
2. Audit: the four warnings.
3. Playground: cases 1 to 10 on the knobs alone, with no page CSS.
4. Checks: a fixture of the five structures at 1280, 800 and 390 in Chrome and WebKit (item widths per row); every page's grid lists old CSS vs new (no change); a paged and a filtered flex list (the pre-init hold and the skeleton); the narrow step.
5. Docs, in the step 4 pass: List's Layout group (Grid, Flex) and knob rows, Flex's page (on a list, its three classes are item looks), Best Practices (pick Grid or Flex; a featured item; a row card's width).

## Flex list study (2026-10-30)

Keep `nds-list` apart from its layout class: a merged grid list would have to undo `display: grid` to become a flex list. The question is whether `ul.nds-list.nds-flex` ships in v2.

- **What flex gives that Grid cannot:** items at their own width, in rows that wrap ragged, and a short last row centered (`--justify: center`). Grid fills each row's columns and starts a short last row at the start.
- **Use cases:** a centered set of box cards (5 services, 3 then 2), a strip of logos or quick-link pills. In our pages, none: flex holds button rows, the tag group and two page layouts (`tmp/flex-sets.py`). Of 50 lists with a short last row at 1280, 49 are Built-in Features lists, where the text lines up at the start; one set of box cards (About Entity, 11 in 3 columns) could center it (`tmp/list-lastrow.mjs`).
- **What works today** (`tmp/list-flex-probe.mjs`): `nds-flex nds-wrap` wraps the cards at the card's 360px cap; with `--card-width: 280px` and `--justify: center` the last row centers. The narrow step works.
- **What breaks:** `nds-reverse`, `nds-center` and `nds-middle` are Flex's classes and the list's item looks at once: a flex list with `nds-reverse` reverses the item order and every card. A row with no `nds-wrap` squeezes the cards (78px each at 390). `nds-flex nds-col` caps the cards at 360px; Grid's one column fills. No lines: `nds-divided` and the last-row script are Grid's. An item at its content's width (`--card-width: auto`) works for a stacked card, but not a row card: `nds-horizontal` makes the card an inline-size container, so it has no content width and squeezes (playground, case 3).
- **`flex` on the items, the strongest gain** (playground cases 6 to 10, with `--card-width-max: none`): `flex: 1 1 320px` fills every row, the short last row too (3 then 2 wider); with a `max-width` and `--justify: center` the last row stops growing and centers; `flex: 2` on one item makes it twice the others in its row; `flex: 1 1 auto` grows content-width links until the row is full. Grid fills a row only through spans the author counts. The catch: a lone last item takes the whole row. Today it takes page CSS on `> li`: a mode needs list knobs (an item basis, a grow) read by `.nds-list.nds-flex > *`.
- **Cost to ship one mode, Wrap:** Flex's three shared classes skip a list (`:not(.nds-list)`), so on a list they are item looks and the layout takes the knobs (`--justify`, `--align`); a flex list wraps by default; the doc gives the item width (`--card-width`); the audit warns on `nds-col` or `nds-divided` with `nds-flex`; Chrome and WebKit across the looks.

## Later (own plans, after the list settles)

- Links in a list: dropped (owner, 2026-10-30). A set of rows (links, notices, dated items) stays a Drawer: it is complete, and a List of button rows would add a second copy of its rows for no gain. A Sonnet and a Haiku agent, given only the catalog and docs, picked Drawer for links, notices and dated rows. A card stretched by its title link was tried and dropped: it read as a card, not a link. The gaps they hit are in the docs: Drawer columns (`ul.nds-drawer-list.nds-grid`), a button row that opens a panel, one rule for linked items with a line, two small conflicts.
- Link cards: keep for a plain grid, or retire in v2.
