# List — plan (v2.0.0)

Status (2026-10-30): agreed, nothing built. Grows out of `plans/feature-list.md` (Feature List: committed, never shipped).

## Why

A set of items is the most common thing on a page, and today it has no name an agent can find: a `div.nds-grid` of cards, a Feature List, Drawer rows. The list gives it one, **List** (`nds-list`), and three things:

1. **A name** an agent finds for "a set of items".
2. **A real list:** `ul`/`li`, so a screen reader hears "list, N items".
3. **Easy defaults:** one column, a flat look and one size, set once for every item.

## Decided (owner, 2026-10-30)

- **Items are cards** (`li.nds-card`). A card already holds an icon, an image, a date tile, tags, actions, a row or a stacked layout, a box or none.
- **Card styling goes on each card**, with the card's own classes (`nds-horizontal`, `nds-center`, `nds-stroke`, `nds-shadow`, `nds-green`, …). No list-level copy of card classes, and no Card changes for the list.
- **Icons are styled per icon**, like cards per card: a card may hold a featured icon, an avatar, an image, a date tile, or no header. `nds-icons-*` is dropped; the Built-in Features lists get `nds-subtle` on each icon. The `featured-icon-*` mixins stay (the icon's own classes use them).
- **Size stays on the list** (owner): it is item-agnostic (text, gaps, and the icon only where there is one), keeps the items in sync, and is the list's responsive hook. Per AGENTS.md ("A narrow component reflows before it shrinks, and the parent decides"), the list is a named container with one width point: below it, a list with no size class steps its items down to SM; `nds-sm`/`nds-lg` written by the author stay as written. Pick the width point in step 1.
- **The list keeps only what Feature List already does through knobs:** size (`nds-sm`, `nds-lg`) and `nds-flat` (no fill, no padding, a muted description). Without `nds-flat`, the items are normal cards: 72 of 77 card sets in the repo are boxed. A modifier's name means what it does on its own component: the hero's `nds-flat` is not a contract for the list's.
- Feature List is renamed to List before v2 ships: no Migration row. A plain grid of cards keeps working.
- Link cards stay out of the list. Links in a list and Drawer's role come later, once the list settles.

## Shape

```html
<ul class="nds-list nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
  <li class="nds-card nds-stroke">
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

Features (today's Feature List): `ul.nds-list.nds-grid.nds-flat`, often with `nds-horizontal` on each card and `nds-subtle` on each icon.

The root is a grid: columns, gaps, lines (`nds-divided`, `nds-divided-rows`) and the last-row script are Grid's. One column until the author sets `--max-col`. No new JS.

## Future-proof

- The title is styled by class, not tag, so a later link item makes it an `<a class="nds-card-title">` with no other change.
- No list rule keys on a tag or on a card class the author writes: a later need adds rules and changes none.

## Inventory (2026-10-30, 77 card sets in the source)

- Move to `ul.nds-list`: 53 `div.nds-grid` of cards (13 paged, 1 Scroll More) and 4 `div.nds-flex.nds-col`.
- Rename: 5 Feature Lists, and the 103 Built-in Features lists on the doc pages (`nds-flat`).
- Stay: 13 Swipers (the slide needs `.nds-swiper-slide`), 2 link-card sets, 2 `label.nds-card` selection sets, the Definition List with the card look (`faculty-cv`), Countdown, cards nested in a card.
- Pagination and Filter find items by class (`.nds-page-item`, `data-filter-items`), so `li` items work: confirm on one paged and one filtered page.
- Loop-made sets sit in Liquid (`_includes/library-list.html`, the index pages): change the template.

## Steps

1. **Rename** `nds-feature-list` → `nds-list`: `_sass/components/_feature-list.scss` → `_list.scss` and its `@use`, every list in pages and docs, `docs_canon.rb` DOC_STYLE, catalog, sidemenu, the `nds-doc` skill, CHANGELOG, `playground.md`. Move today's root defaults (fill, padding, description color) under `nds-flat`; every renamed list gets `nds-flat`. Drop `nds-icons-*`: each list that has one gets the icon's own class on every icon (`nds-icons-subtle` → `nds-subtle`). Check in the playground: a list with and without `nds-flat`, in a card, Chrome and WebKit.
2. **Migrate our pages:** the 57 sets, by a script in `tmp/`; Liquid templates by hand. A/B each page old vs new (boxes, sizes, columns); check one paged and one filtered page.
3. **Docs in one pass** (`/nds-doc list`): `components/feature-list.md` → `components/list.md` (Structures: cards, flat), Card ("for a set of cards, use List"), Grid, the catalog rules (Card, Definition List, Training Academy; "features" stays a word in List's `use_when`), CHANGELOG (Added: List; Feature List never shipped, so it is not named).
4. **Checks:** `js_processor.rb`, `check-docs.py`, `check-css.py`, `check-data-state-tails.py`, `check-a11y.mjs`, `doc-check.mjs`, `run-audit.mjs`; Chrome and WebKit, light and dark, desktop and phone.

## Later (own plans, after the list settles)

- Links in a list (recommended: the title as the link, stretched over the item, an end arrow; a linked item holds no other link or button).
- Drawer back to menus only; quick links, notifications and dated rows move to the list.
- Link cards: keep for a plain grid, or retire in v2.
