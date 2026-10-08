# Deprecations — remove at the next major

Classes, attributes and JS APIs that still ship, only so work already written against them
keeps running. Each one is dead weight in the bundle and a second way to say the same thing,
which is how docs and agents drift. Remove the whole list in one major release, and put
every line in that release's Migrating section.

This file is build-excluded (`_config.yml`). It is not cleared at a release the way
`TODO.md` is — an entry leaves only when the class is actually gone.

**A second spelling is not debt.** Plenty of components answer to a class *and* an
attribute, or to a colour name *and* a semantic one — tags and featured icons both do, and
that dual API is a convenience worth keeping. A name earns a row here only when it is
**wrong**: it says something the component no longer does, or names a fixed colour for a
surface the theme controls. Count spellings and you will deprecate half the system.

## Confirmed — the source says deprecated

| Class | Replacement | Deprecated in | Declared at |
|---|---|---|---|
| `slides-max`, `slides-mid`, `slides-min`, `peek` **attributes on `.nds-swiper`** | inline `--max-slides`, `--mid-slides`, `--min-slides`, `--peek` (`style="…"` on the same element) | 1.12.0 | `_js/nds-swiper.js` (constructor knob read), `_js/nds-loader.js` (presetSwipers) |
| HGI content icons renamed upstream: `hgi-arrange-by-numbers-1-9`, `-9-1`, `hgi-cplusplus`, `hgi-go-backward-5-sec`, `hgi-go-forward-5-sec`, `hgi-layout-2-column`, `-2-row`, `-3-column`, `-3-row`, `hgi-mp-3-01`, `-3-02`, `hgi-mp-4-01`, `-4-02`, `hgi-ski-dice-faces-01`, `hgi-sorting-1-9`, `-9-1` | the hugeicons.com names: digits spelled out (`hgi-layout-three-column`, `hgi-mp-three-01`, `hgi-sorting-nine-1`, …), `hgi-cpp`, `hgi-ski` | 1.12.x | `_sass/_hgiRoundedStroke.scss` (alias block at the end) |
| `.nds-full-width` **on `.nds-card`** | `.nds-full` — inside a section, `.nds-full-width` is the full-bleed breakout (`_skeleton.scss`), so the card breaks out of its container instead of filling it | 1.12.x | `_sass/components/_cards.scss` (`:is(.nds-full-width, .nds-full)`) |
| `data-free` **on `.nds-number-format`** | leave out `data-currency` and write the label (`Free`) — the attribute only hid the symbol, and a template that checks for zero can leave the symbol out itself | 1.12.x | `_sass/_utilities.scss` (`&[data-free]::after`) |
| `.nds-statistic` **on `.nds-card`** | `.nds-center` — the number's style moved to `.nds-card-number` in any card, and the two render the same on every statistic card in the docs (measured 1280 and 390 px) | 1.12.x | `_sass/components/_cards.scss` (`:is(.nds-center, .nds-statistic)` and the statistic block) |
| `.nds-counter-value` **with `data-target`** | `data-counter="<end value>"` — `data-target` is a generic name Forms and Voice Input read too | 1.12.x | `_js/nds-numbers.js` (`COUNTER`, `count`), `_js/nds-loader.js` (Numbers selector) |
| `data-start`, `data-duration` **on a counter** | `data-counter-start`, `data-counter-duration` | 1.12.x | `_js/nds-numbers.js` (`attr`) |
| `.nds-counter-value`, `.nds-number-format` **styled as the number in a statistic card** (with no `.nds-card-number`) | `.nds-card-number` — the Numbers classes are behaviour; the number's look is the card's | 1.12.x | `_sass/components/_cards.scss` (the card-number rule's second selector) |
| `.nds-card-price` | `.nds-card-value` | 1.11.0 | `_sass/components/_cards.scss` (value line) |
| `[data-loading]` **on `.nds-slider-container`** | `.nds-loading` (or the `loading` token from JS) | 1.12.0 | `_sass/components/_slider.scss` (skeleton rule) |
| `.nds-filter-bar` | `.nds-toolbar` — predates the toolbar, undocumented, nothing in this repo uses it | 1.4.0 | `_sass/components/_toolbar.scss` (`:is(.nds-toolbar, .nds-filter-bar, …)`) |
| `.nds-green` **on a section or footer** | `.nds-primary` / `.nds-brand` | before 1.9 | `_sass/layout/_section.scss`, `_sass/components/_footer.scss` |
| `.nds-gradient-green` | `.nds-gradient-primary` | before 1.9 | `_sass/layout/_section.scss`, `_sass/_variables-a11y.scss` |
| `.nds-focus`, `.focus` | none — the field styles its own focus | before 1.9 | `_sass/components/_forms.scss` ("Legacy class support") |
| `data-filter="tags"` **reading `.nds-card-tags` labels** (an item with no `tags` mark) | a `data-filter="tags"` mark on each tag label | before 1.9 | `_js/nds-filter.js` `collectFilterValues`, `_buildItemCache` (marked "Legacy .nds-card-tags fallback") |
| `NDS.Filter` instance method `setSelectedTags(tags)` | `setFilterValues('tags', tags)` | before 1.9 | `_js/nds-filter.js` (marked "Legacy API for backward compatibility") |
| `data-open-on` **on a `.nds-drawer` or its `<li>`** | `data-state="open"` on the `<li>` and its `<ul>`, with `aria-expanded="true"` on the button | 1.12.x | `_js/nds-drawer.js` `getOpenOnValue`, `handleResize` |
| `data-always-open-on` **on a `.nds-drawer`** | `data-state="always-open"` on the drawer (several submenus open at once; nothing locks) | 1.12.x | `_js/nds-drawer.js` `shouldBeAlwaysOpen`, `_sass/components/_drawer.scss` `[data-drawer-locked]` rules |
| `NDS.Drawer.initDrawer(drawer)` | `NDS.Drawer.create(drawer)` — the same function | before 1.9 | `_js/nds-drawer.js` (banner: "the same function under its older name") |
| `open` **class on a `.nds-drawer` item** | `data-state="open"` on the `<li>` and its `<ul>`, with `aria-expanded="true"` on the button | 1.0.0 | `_js/nds-drawer.js` `getOpenOnValue` (marked "Fallback … backward compatibility") |

**`.nds-{color}` is canon, and only the brand surface is not.** Tags take colour names as
their public API — `.nds-gray`, `.nds-green`, `.nds-blue`, `.nds-yellow`, `.nds-red`, each
paired with a `[data-status]` twin. Those stay. What is deprecated is `.nds-green` as a name
for the *brand* surface on a section or footer, where the surface is the theme colour and
never a fixed green — that is what `.nds-primary` / `.nds-brand` say.

So the removal is selector-scoped, not repo-wide: strip the alias from the section, footer
and a11y selectors only. All 67 documented uses of `nds-green` sit on tags and must survive.
Grep with the component in the pattern, never the bare class name.

## Grandfathered names — rename at the same time

`AGENTS.md` fixes the menu identifier as `.nds-{component}-menu`. Two predate the rule and
are exempt by name, not by design:

| Current | Should be | Declared at |
|---|---|---|
| `.nds-rating-dropmenu` | `.nds-rating-menu` | `_sass/components/_rating.scss` |
| `.nds-date-picker-dropdown` | `.nds-date-picker-menu` | `_sass/components/_date-picker.scss` |

## Needs an owner call — two live names for one thing

Neither is marked deprecated, and the docs use both. Pick the survivor before the major,
then the loser moves to the table above.

- **What each status component answers to.** All of these work and none misleads, so this
  is a consistency question, not deprecation — but a dev who learns one component guesses
  wrong at the next.

  | Component | Colour classes | Neutral spelled | `[data-status]` | From an ancestor |
  |---|---|---|---|---|
  | Tags | blue green red yellow | `.nds-gray` | 6 values | no |
  | Alert | blue green red yellow | `.nds-neutral` | 6 values | no |
  | Cards | blue green red yellow | `.nds-neutral` | 6 values | no |
  | Featured icons | blue green red yellow | `.nds-neutral` | 6 values | no |
  | Chips | green | `.nds-neutral`, `.nds-gray` | **none** | no |
  | Feedback icons | — | — | 7 values | **yes** |
  | Progress | — | `.nds-neutral` | 2 values | no |

  **Settled 2026-08-24: the neutral hue answers to both `.nds-gray` and `.nds-neutral`**
  everywhere it exists — tags, alert, cards, featured icons and chips. Widening an `:is()`
  costs nothing, so the fix was to accept both spellings rather than rename one away.
  Featured icons also moved to colour classes as canon, matching tags.

  **Still open: chips has no `[data-status]` support at all**, so the attribute a dev
  learned on every other component silently does nothing there. A gap to fill, not a name
  to remove. And leave feedback icons alone: attribute-only, and the only one that reads
  the status off an ancestor, which is what lets a status section paint the chip inside it.
- **`.nds-full` vs `.nds-full-width`** on cards (`_sass/components/_cards.scss`). Note
  `body.nds-full-width` is a different switch in `_reset.scss` — check before renaming.
- **Filter's unprefixed and implicit hooks** (`_js/nds-filter.js`). `.filter-btn` is matched beside `.nds-filter-btn` and `[data-filter-btn]` (`_resolveFilterBtn`): no `nds-` prefix. `setupResetButton` also makes any button in `.nds-filter` with a class containing `refresh`, or holding a `nds-hgi-refresh` / `nds-hgi-refresh-ccw-02` icon, a reset button, where `data-filter-action="reset"` is the documented hook. Neither is marked legacy; decide whether both go at the major.

## Finding the next one

An alias pair shows up as a bare two-class `:is()` — the old name and the new one routed
to the same rule. Scan for `:is()` groups whose parts are all bare `.nds-` classes, then
read the ones where both names mean the same thing. That is how the chips and footer
sites above were found after the section ones.

## History — where the earlier renames are recorded

Two map files documented the big renames and were deleted after the work landed. They are
the best record of what was converted and what the canonical spelling became, so read them
before declaring any older name dead:

```
git show 5173b215^:class-rename-map.txt      # un-prefixed -> nds-, and the semantic -> colour pass
git show 5173b215^:hidden-removal-map.txt    # [hidden] FOUC guards -> the universal hide primitive
```

The colour pass is the one to read carefully: on tags it moved `.nds-neutral`,
`.nds-success`, `.nds-info`, `.nds-warning` and `.nds-error` to colour names, while
buttons, checkboxes and sections keep the semantic names as canon. So the same class name
means different things in different components, and a component that still answers to the
old spelling is usually being generous, not stale. Read the component before you judge it.

## Removal checklist

1. Delete the alias from the selector, not the whole rule — the canonical name stays.
2. `grep` the repo for the dead name: `_sass`, `_js`, `_includes`, `_layouts`, doc pages,
   `examples/`, `templates/`, `_data/`.
3. Rebuild and confirm the name appears in no bundle.
4. Add one Migrating line per class: the dead name, the replacement, and where the
   canonical markup lives.
