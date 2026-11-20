# Area themes — plan

Status: **built** (2026-11-20), docs done. Follows `plans/oncolor-surface.md` (phases 1-3 built, unreleased).

## Goal

One attribute makes any element a colored surface: `data-theme` names the mode, the fill and the shape, and the
parts inside follow. Adding a fill color later is one registry entry; every selector, the audit and the docs follow.

## Owner calls (2026-11-20) — these override the text below

- **Look and fill stay separate.** `dark` and `oncolor` are the look and reach every part. `primary`, `neutral`,
  `gradient` only paint the surface, as the classes do today. `primary` does **not** imply `oncolor`.
  Markup: `dark oncolor primary`, `dark oncolor primary gradient`, `dark neutral`.
- **`dark` required** (A2): a fill word without `dark` does nothing; the audit says so.
- **No neutral gradient** (B1): `gradient: false` on neutral.
- So `$oncolor-host` is unchanged, the registry has no `oncolor` key, and review fix 10 is dropped.
  The audit adds a hint: `primary` without `oncolor` (parts take the dark look on a primary fill).

## Vocabulary (words in `data-theme`, on any element but `<html>`)

| Kind | Words | Job |
|---|---|---|
| Mode | `dark` | Dark tokens. **Always written**: site CSS keys dark areas on it (`[data-theme~="dark"]:not(:root)`, themes doc Override Scope), and print drops it |
| Look | `oncolor` | Parts take their on-color looks. Written alone only on a fill NDS does not paint (own color, photo, hero image) |
| Fill | `primary`, `neutral` | Paints the surface. `primary` implies `oncolor`; `neutral` does not (a dark grey reads right as a dark area) |
| Shape | `gradient` | With a fill word: a gradient from the fill's deep shade to its lighter one. Alone: nothing |

| Markup | Result |
|---|---|
| `data-theme="dark primary"` | deep primary fill, on-color look |
| `data-theme="dark primary gradient"` | primary gradient, on-color look |
| `data-theme="dark neutral"` | neutral-900 fill, dark look |
| `data-theme="dark neutral gradient"` | neutral-900 → neutral-700, dark look |
| `data-theme="dark oncolor"` | own fill, on-color look (unchanged) |

**Every area word needs `dark`.** Print drops `dark`, so the fill and the look drop with it: a colored area prints
light, like a dark area does today. One rule for the audit and the docs.

## Mechanism

**Registry** (`_mixins.scss`), the one place a color is added:

```scss
// Area fills: data-theme words that paint a surface. A new color is one entry; every area selector follows.
$area-fills: (
  primary: (start: var(--background-primary-strong), end: var(--background-primary), oncolor: true),
  neutral: (start: var(--colors-neutral-900), end: var(--colors-neutral-700), oncolor: false),
);
```

Derived selectors (functions over the map, closed input):
- `$fill-host`: `[data-theme~="dark"]:is([data-theme~="primary"], [data-theme~="neutral"]):not(:root)`
- `$fill-words`: `[data-theme~="primary"], [data-theme~="neutral"]` (for `:not()` exclusion lists)
- `$oncolor-host`: `[data-theme~="dark"]:is([data-theme~="oncolor"], [data-theme~="primary"]):not(:root)`.
  Specificity stays (0,3,0), so every existing `$oncolor-host` / `$oncolor-popup` / `$oncolor-area` /
  `@include oncolor` use follows with no edit.

**Host vars** (new `_sass/_areas.scss` in the main bundle, generated from the map). System vars, read by surfaces:
- `--nds-area-color`: the fill's deep shade.
- `--nds-area-image`: `none`, or with `gradient` the `linear-gradient(var(--_area-angle), start, end)`.
  `--_area-angle: var(--gradient-angle, -45deg)`, `45deg` on LTR (the existing public knob).
- Generic paint at zero specificity: `:where(#{$fill-host}) { background-color: var(--nds-area-color); background-image: var(--nds-area-image); }`.
  Any element gets the fill; a component that paints its own background wins and maps the vars below.

**Surfaces that paint their own background map the vars** (`&:where(#{$fill-host})`, zero added specificity):
- Section + hero (`_section.scss`, one shared block): `--_section-bg-base: var(--nds-area-color)`,
  `background-image: var(--nds-area-image)`, on-color text knobs (joins the existing `:is(.nds-primary, …)` text rule).
  The `--section-bg` knob still wins on solid fills; on a gradient the image wins, as `.nds-gradient-primary` does today.
- Side menu: `--_sidemenu-bg-base: var(--nds-area-image) var(--nds-area-color)` (shorthand). **Drops its
  `.nds-primary` / `.nds-gradient-primary` / `.nds-neutral`** (never released). The neutral search fix moves to the tokens (below).
- Card: `--_card-bg-base: var(--nds-area-color)` + image. A card that is itself an area.

**Neutral fill = darker field fill.** In a neutral area, `--form-field-background-darker` is the area's own fill.
Token block in `_components.scss` keyed on the neutral word: `--form-field-background-darker: var(--colors-neutral-700)`.
Replaces the side menu's scoped fix, so a neutral section gets it too.

**Section classes stay** (shipped in v2; markup is a contract). `.nds-primary`, `.nds-gradient-primary`,
`.nds-neutral` on a section keep their rules untouched until v3. Docs show the word form first.
**Owner call (2026-11-20): deprecated, removed in v3** — a `DEPRECATIONS.md` row for each, on `.nds-content-section`
(and the hero, which shares the block), replacement the matching `data-theme` words.

## Review fixes (Opus, 2026-11-20) — apply in the build

1. **Mapping must beat each component's own `$oncolor-area` block**, which matches the host too. Card: map with
   `.nds-card:is(#{$fill-host})` after `_card.scss:770`, both `--_card-bg-base` and `--_card-bg-hover-base`
   (hover = `color-mix` over `var(--nds-area-color)`). Same rule for every surface that has an on-color block.
2. **Sub hero**: `.nds-sub` paints `--background-sub-hero` at (0,2,0) (`_hero.scss:90`). Add
   `.nds-hero-section.nds-sub:is(#{$fill-host})`. Photos live in wrappers / `::before`, so the image mapping is safe;
   `.nds-flat`'s `!important` still wins.
3. **No `_areas.scss` in main.** Hero and the token blocks are critical; main is deferred. Host vars + generic paint go
   right after the dark-area paint in `_semantic.scss:310-313` (zero specificity, already sets `color`).
4. **Audit `dark-nested`** (`nds-audit.js:1095`) must skip inner elements that carry an area word
   (`:not([data-theme~="oncolor"], <fill words>)`), or it tells users to delete a nested area's `dark`.
5. **High contrast flattens the vars**, not `background`: `:root[data-a11y~="high-contrast"] #{$fill-host} { --nds-area-color: var(--_hc-bg); --nds-area-image: none; }`.
   Keep `_variables-a11y.scss:240, :258`; `:252` → `:is(#{$oncolor-host}, .nds-oncolor)`.
6. **Section text rule**: add the area as a separate `&:where(#{$fill-host})`, not inside the class `:is()`
   (which would lift the class form to (0,4,0)).
7. **Every fill host sets `--nds-area-image: none`**; the gradient comes from a `fill-host[data-theme~="gradient"]`
   rule, so a nested solid area never inherits an outer gradient. LTR angle in the side menu's form
   (`--_area-angle: var(--gradient-angle, 45deg)`), never writing the public knob.
8. **Neutral token block is wider than the menu fix**: `darker` is every field's active fill (`_form.scss:125`), so
   focused fields in a neutral area go `neutral-700` too. Accepted. Key it on `$fill-host`'s neutral form (needs
   `dark`, so print drops it), placed before the on-color block at `_components.scss:490`.
9. **Popups**: `$oncolor-popup` → `:is(#{$oncolor-host}, #{$fill-host}) [popover]`, so a neutral area's token block
   does not reach its popups.
10. **`$oncolor-host` built from the map** (`oncolor: true` entries), not a literal. Audit also flags two fill words
    on one element.
11. **Owner call: `neutral gradient`** — no design exists and neutral-700 parts are unmeasured. Map key
    `gradient: false` on neutral (the word does nothing there) unless the owner wants it designed and measured.

## Touch list

SCSS
- `_mixins.scss` — registry, `$fill-host`, `$fill-words`, `$oncolor-host` rewrite, comment (print, `primary` implies `oncolor`).
- `tokens/_semantic.scss` — host vars + generic paint after the dark-area paint (review fix 3).
- `components/_hero.scss` — sub hero mapping (review fix 2).
- `layout/_section.scss` — fill mapping beside the class rules.
- `components/_sidemenu.scss` — mapping; remove the three color classes and the scoped neutral search rule.
- `components/_card.scss` — mapping.
- `tokens/_components.scss` — neutral darker-field token block.
- `layout/_content-layout.scss:220, :259`, `themes/events/_foundation-day.scss:86`, `_hajj.scss:58`,
  `_national-day-96.scss:169` — add `#{$fill-words}` to the `:not()` lists (gutter, striping). Event packs:
  rebuild with `python scripts/mkevent.py <event>`.
- `_variables-a11y.scss` — HC: `:252` literal `[data-theme~="oncolor"]` → `$oncolor-host`-based; flatten
  `:where(#{$fill-host})` (`background: var(--_hc-bg)`), as `:247` does for the gradient section.

JS
- `nds-audit.js` — rule `oncolor-no-dark` → `area-no-dark` (any area word without `dark`; unreleased, rename is free),
  plus `gradient` without a fill word. Word list mirrors the registry (`ponytail:` line: SCSS map + JS list, two places).
- `nds-docs.js` / `docs_canon.rb` — unchanged: the On color toggle writes `dark oncolor` on the copied markup (the
  look, not a fill) and paints the preview card through `--card-bg`. Revisit only if the card mapping changes it.
- `nds-print.js` — unchanged: dropping `dark` drops every area word's effect.
- `ruby _plugins/js_processor.rb` after; audit bundle rebuilt in the same commit.

Docs (one pass at the end)
- `foundations/themes.md` — On-color Areas becomes the area vocabulary (anchor `#oncolor-areas` kept), canon to
  `data-theme="dark primary"`, API rows, Best Practices.
- `layout/section.md` — Variants rows (word form; class form noted), paragraphs `:226`, `:308`, `--gradient-angle` row.
- `ui-shell/sidemenu.md` — Variants rows `:522-527` to words, `--gradient-angle` row.
- `layout/page-layout.md:505, :527` — the fill words beside the classes.
- `core/audit.md:306` — rule row.
- Component pages that say `data-theme="dark oncolor"` stay true (own fill); themes.md links cover `primary`.
- `CHANGELOG.md` `[Unreleased]` lines 10, 13, 14, 19.
- `plans/oncolor-surface.md` — status, point here.

Not in scope
- Footer: **component built** (2026-11-20): `data-theme="dark oncolor primary"` on `.nds-footer`, deep primary in both
  modes (owner pick), `.nds-brand` deprecated. The site footer and the page-layout skeletons switched too (2026-11-20),
  with the `_data/migrations.yml` row: push `main` only with the release tag.
- More fill colors: the registry is ready; none added now.

## Contrast (2026-11-20, `scripts/check-area-contrast.mjs`)

Neutral: all pass. Deep primary: 8 fails, all on-color button states (pressed white wash 3.5; destructive
secondary 3.4-4.46; transparent destructive pressed 3.88). Gradient light end (primary-600): 48 fails, plain text
included (3.64); ending at 700 leaves 40, at 800 leaves 25. **Owner call: keep both as they are** — the button colors
stay, the gradient stays 900 → 600; some parts are not meant for the gradient. Don't reopen.

## Checks

- `python scripts/check-css.py`, `python scripts/check-data-state-tails.py --report` (new `[data-theme]` rules are not
  data-state, but run it), `ruby _plugins/js_processor.rb`, build.
- Browser, light + dark page, LTR + RTL: section and side menu in each of the five markups; a plain `div`
  with `dark primary`; a card with `dark neutral gradient`; print preview of a `dark primary` section (prints light);
  HC flattens all of them; a section `.nds-primary` (class form) unchanged.
