# On-color surfaces — plan

Status: **Phase 1 and 2 built** (2026-11-20; owner picks in the Mapping table). Opened by the side menu colors work, a test parked until this lands.

## Goal

One reusable way to make any area a colored surface (deep primary, gradient, neutral) where every part inside —
text, links, buttons, button indicators, form fields, tags, chips, dividers — reads right, with no per-component
copies. Sections, the side menu, the footer brand, the hero and a card on a photo all use the same switch.

## Why now

The side menu colors (`.nds-primary` / `.nds-neutral` / `.nds-gradient-primary`, built and paused, see below)
leaned on `data-theme="dark"`. That works for text, but dark is the wrong model for a colored fill:

- Dark mode swaps surfaces for dark greys. On a green fill, a field or a search box turns near-black
  (`#111927`), not a white-alpha wash.
- A dark-mode active / selected wash (`alpha-white-30`) scored **4.40** on `#074D31`, **4.60** on primary-900,
  **~2.9** at the light end of the gradient (`#1B8354`). Plain links pass everywhere (4.75–9.9).
- The menu's selected indicator should be the on-color subtle button, not the dark one.
- Forms have **no** on-color look at all (`_form.scss`, `_search-box.scss`, `_multiselect.scss`, `_taginput.scss`).

## What exists today (inventory, 2026-11-18)

**Dark area.** `data-theme="dark"` on any element re-lists the semantic and component tokens with dark values
(`tokens/_semantic.scss:14`, `:183`, `:306`; `tokens/_components.scss:10`, `:332`), plus the `$dark-area`
selector and `@mixin dark` (`_mixins.scss:118-132`). A few files hard-code the attribute: `_buttons.scss:431`,
`_skeleton.scss:274`, `_variables-a11y.scss`, `_content-switcher.scss:122`.

**`.nds-oncolor` class**, per component (count of uses): swiper 6, stepper 6, content-switcher 6, main-nav 4,
footer 3, card 3, buttons 3, drawer 2, chips 2, tag 1, loading 1, link 1. Each is opted in one element at a time.

**On-color tokens already minted:** `--text-oncolor-{primary,secondary,tertiary}`, `--text-default-oncolor-disabled`,
`--icon-oncolor`, `--icon-default-oncolor-disabled`, `--border-oncolor`, `--background-surface-oncolor`,
`--featuredicons-icon-oncolor`, `--link-oncolor-*`, `--button-background-oncolor-*`,
`--button-label-transparent-oncolor-*`, `--button-*-danger-*-oncolor-*`, `--chip-*-oncolor-*`, `--tag-*-oncolor`,
`--swiper-bullet-*-oncolor`. Most are alpha-white or plain white: mode-free.

**Forms route through tokens.** No form part paints its own grey. The field family reads 13 shared
`--form-field-*` tokens (`tokens/_components.scss:168-180`, dark `:385-391`), so re-binding them covers the
text field, search box, select, OTP, date / time fields and the editor at once. Checkbox, radio, switch,
slider and rating read their own families (`--checkbox-*`, `--radio-*`, `--switch-*`, `--controls-*`,
`--slider-*`, `--rating-star-*`): each is separate work.

**Copies to retire.** `_footer.scss:211-235` (brand footer) hand-copies the on-color button knob set
(its own comment: "DUPE-02 intentional"). `_buttons.scss:107` has `btn-oncolor-fill`.

## The idea

`data-theme="oncolor"` on any element: an **on-color area**, the sibling of the dark area.

**Rule 1: inside the area, every part takes its existing on-color look.** The design system already
answers most cases: a primary button on a primary fill is the on-color button (white fill, black label),
not a green one and not the dark one. Same for links, chips, tags, cards, loading, stepper, swiper,
content switcher, fab, focus (`btn-focus-oncolor`). The area reuses those looks; it does not invent new ones
from dark values or from contrast numbers. Contrast is the check, not the driver.

**Rule 2: a gap gets a look in the same language.** DGA's on-color answer: a filled part turns white with
dark content (button, chip); an unfilled part goes white or white-alpha (link, subtle, outline, tag). A part
with no on-color look (forms, checked controls, drawer indicator) follows that, not dark mode.

**Scope (owner call 2026-11-20): on-color is for a primary fill only** (Primary, Gradient). A neutral fill is a dark grey, so a dark area (`data-theme="dark"`) already reads right there.

**Rule 3: dark values only where neither applies** (plain text inks take the `--text-oncolor-*` set first).

`.nds-oncolor` on one component stays as is (public API; markup is a contract). The area is the new layer
above it: one attribute instead of a class per part.

### What DGA has on color (checked 2026-11-20, `platformscode-core-main/css/main.css`)

| Has an on-color look | No on-color look |
|---|---|
| button (all kinds, close), chip, tag (+ outlined), link, loading, radial stepper, content switcher, fab, header sub-menu link | input, textarea, search box, select (only `--darker` / `--lighter` fills), checkbox, radio, switch (only `--brand`), slider, rating, drawer / side menu indicator |

So the right column is NDS's own design, under Rule 2.

### Mapping (draft)

| Part in the area | Takes |
|---|---|
| Button primary / neutral | `btn-oncolor-fill` (white, black label) |
| Button secondary / outline / subtle / transparent | their `.nds-oncolor` looks (alpha washes, white label) |
| Button destructive | `danger-*-oncolor` |
| Link | `link-colors(oncolor)` (white) — today a dark area gives `#54c08a`, 2.1 on the gradient end |
| Chip / tag / card / loading / swiper / stepper / content switcher | their `.nds-oncolor` |
| Text | `--text-oncolor-primary / secondary / tertiary` |
| Focus | `btn-focus-oncolor` (white ring, black inset) |
| Form field | **see-through** (owner pick 2026-11-20, over Rule 2's white field): white-alpha fill, white text, `--border-oncolor` |
| Checkbox / radio / switch / slider / rating, checked | white fill (owner pick 2026-11-20, Rule 2); the mark is `--background-primary` on the primary look, black on `.nds-neutral` |
| Field message: error | text, field border and icon take the on-color danger red, `--colors-red-200`, as the destructive on-color button already does (`--button-label-danger-oncolor-default`, `--button-border-danger-oncolor`): Rule 1. 7.62 on primary-900, 6.03 on 800, **3.35 on the gradient's light end** |
| Field message: help | `--text-oncolor-secondary` text, white icon |
| Feedback elsewhere in the area (success / warning / info) | phase 1: white text, the status shown by its icon; green-on-green success is the hard one |
| Drawer / side menu: active / current item | the primary button's indicator, `--button-indicator-primary` (owner pick 2026-11-20, over white), white label; the folded rail's white button keeps the same mark. Today `--background-primary` mark and `--text-primary-strong` label (`_drawer.scss:150-170`): green on green. Drawer and Main Nav already skip the primary mark on `.nds-oncolor`, so this is Rule 1 |
| Rail, folded: active icon | the primary button's on-color variant, `btn-oncolor-fill` (white, black icon), owner-confirmed 2026-11-20. Today the primary button (`_sidemenu.scss` `rail-settled`) |
| Rail toggle inside the menu | `btn-oncolor-fill`; its `--button-indicator-primary` mark goes with it |
| Popups (select list, calendar, dropmenu, tooltip) | page values, not the area's |

**Mechanism follows Rule 1.** The on-color looks live as component rules (`.nds-btn.nds-oncolor`), not as
tokens. So the area is an `@mixin oncolor` / `$oncolor-area` selector beside `$dark-area`, added to each
component's existing `.nds-oncolor` block: one source per look, the class and the area both reach it.

## Questions for the design pass

1. **Token shape.** Re-list the tokens on `[data-theme~="oncolor"]` like dark (a third block per tier file),
   or an on-color block that starts from the dark values and overrides the few that differ? Count how many
   differ before choosing. sass.md's rule holds: a mode layer re-binds tokens, a component never does.
2. **Combine with dark?** On a dark page, is an on-color area just on-color (alphas work on any fill)?
   Test whether `data-theme="dark oncolor"` is ever needed. `~=` already allows more than one value.
3. **Contrast floor.** Which fills must pass AA for every part: primary-900, primary-800, neutral-900, both
   gradient ends? If the gradient's light end (primary-600) cannot hold an active wash at 4.5, end the gradient
   darker, or drop it from surfaces that show an active state.
4. **Forms.** Field fill, border, placeholder, focus, error, disabled on a colored fill. Error red on green
   is the hard one: check it.
5. **Button indicator** (drawer / side menu selected item): the on-color subtle button's states.
6. **What becomes an area.** Section Primary / Gradient / Neutral (today `data-theme="dark"`), footer brand
   (today the hand copy), hero, side menu, Side Info, a card on a photo. Does sections' `data-theme="dark"`
   move to `oncolor`? That changes the doc and `layout/section.md`'s Variants rows, not consumer markup
   that already works — keep `dark` working there.
7. **Audit.** `core/audit.md` has `dark-nested` and `dark-selector`; add the on-color twins.
8. **High contrast.** `_variables-a11y.scss` flattens colored sections; an on-color area must flatten the same way.
9. **Popups reset.** A select's list, the date picker's calendar, a dropmenu, a tooltip sit on their own
   opaque panel. The area's alphas must not reach them: the panel goes back to page (light or dark) values.
   Portaled ones leave the subtree already; the in-place ones need the reset. Which mechanism?
10. **Checked controls.** Checkbox, radio, switch, slider, rating fill with primary when on: 1.0 against a
    primary fill. They need an on-color look (white fill, primary mark?).
11. **Focus ring.** Primary ring on a primary fill disappears. Its own contrast check (3:1 against the fill).
12. **Field messages.** Helper text, error message, required mark, character count, not just the field box.
13. **Rail.** The folded rail's active icon is a primary button: it blends on Primary / Gradient. Belongs with 5.

## Design pass findings

**Inventory (2026-11-20).** Throwaway script `tmp/oncolor/inventory.py`: every color token resolved as a
dark area sees it, measured on four fills. Parts that sit on their own fill (button labels, chips, menus,
tooltips, the calendar) are left out. On-area tokens: 51 text, 52 icon, 47 border.

| Fill | Text under 4.5 | Icon under 3 | Border under 3 |
|---|---|---|---|
| primary-900 `#104631` | 10 | 18 | 11 |
| primary-800 `#14573a` | 21 | 20 | 15 |
| primary-600 `#1b8354` (gradient light end) | 47 | 36 | 40 |
| neutral-900 `#111927` | 2 | 15 | 8 |

Failing on primary-900, the real ones: secondary / placeholder / disabled text `#9da4ae` (4.3), error text
`#f97066` (3.88), visited primary link (2.79), field border `#6c727e` (2.24), `--border-primary` (2.28),
`--border-error` (2.88). Most icon fails are decorative rings and featured-icon washes (no 3:1 needed).
Opaque grey fills a colored area would show: ~60, of which the form-field trio, card / default surface,
neutral and secondary button fills, and every checked-control family.

**Q1 answer: component looks first, tokens second** (see Rule 1 and Mechanism). The contrast count above
only says how far dark mode is from right: ~90 of ~370 tokens. It is not the design input. The tier files
still need an on-color block for the plain inks and the forms, but buttons, links, chips and the rest come
from their `.nds-oncolor` rules.

**Owner call (2026-11-20): the fills stay as they are**, gradient included. The problem to fix is the
primary marks (drawer active / current) and the rail's active button, not the background colors. The
numbers below stay as reference only.

**Q3 lead (reference): the gradient's light end cannot hold parts.** On primary-600, 47 of 51 text tokens fail. Options:
end the gradient darker, or allow only plain text on it. The lightest fill sets the bar for every on-color
value. White text: 10.81 on 900, 8.56 on 800, 6.6 on 700, 4.75 on 600, so at 600 there is no room for
secondary or disabled text. Today's dark tokens on primary-700 fail 26 text / 31 icon / 31 border.

## Phase 1 build notes (2026-11-20, uncommitted on `wip/sidemenu-colors`)

- **Markup: `data-theme="dark oncolor"`.** The area is a dark area plus the `oncolor` token, so dark
  infra (audit, print, docs dark toggle) works unchanged, and a print, which drops `dark`, drops on-color too.
- `_mixins.scss`: `$oncolor-host`, `$oncolor-popups`, `$oncolor-area`, `@mixin oncolor`; `btn-oncolor-fill`
  moved here from `_buttons.scss` so the side menu can use it.
- Tier files: an on-color block after each dark block; popups inside the area re-list the dark blocks.
- Component rules: buttons (primary / neutral → on-color fill; destructive → on-color destructive), chip and
  tag (their `.nds-oncolor` looks), checkbox / radio / switch (see-through when empty, white with a dark
  mark when checked), feedback (dark symbol on the light discs), drawer marks, rail active button and toggle.
- **Status colors: every status steps to its 200 shade** (text, border, icon, disc), the same rule as the
  error red, so the four stay one family.
- Test page: `playground.md` (temporary; original in `tmp/asset-backups/playground.md`), `?fill=primary|gradient|neutral`
  colors the side menu. Shots: `tmp/oncolor/*.png`.
- Open: the drawer's search field uses the `darker` field fill, which is a dark wash on color; high contrast,
  docs, audit rules, sections / footer move to Phase 2.

## Phase 2 build notes (2026-11-20)

- **Docs:** `foundations/themes.md` On-color Areas (canon `theme-oncolor-area`, API row, Best Practices, Related);
  `layout/section.md` and `ui-shell/sidemenu.md` Primary / Gradient rows write `dark oncolor`, Neutral `dark`;
  chips, divider, link, tag Best Practices point to the area. Divider joined the area (Rule 1).
- **High contrast:** the area already flattens as a dark area; the primary marks (checkbox, radio, switch) read
  `--background-primary`, which HC turns white, so the a11y overlay sets them to `--_hc-bg` inside an area.
  Radio moved to private mark / surface variables like the checkbox and switch.
- **Audit:** `oncolor-no-dark` (structure, warn).
- **Doc toggle:** On color beside Dark on every preview card (`docs_canon.rb`, `nds-docs.js`); hidden on page
  previews, which bring their own surfaces. Dark and On color switch each other off.
- **Not done, needs a major:** the footer brand. Retiring its hand copy means `data-theme="dark oncolor"` in the
  footer markup, a consumer markup change (markup is a contract). Hero and Side Info have no primary fill.

## Phase 3 build notes (2026-11-20)

- Card (and Countdown), Stepper (and Timeline), Content Switcher, Loading, Swiper, Drawer: each `.nds-oncolor` rule also
  matches `#{$oncolor-area}`. A guard that skips on-color (`.nds-card:not(.nds-oncolor, …)`, the stepper's dark
  current icon) adds `:not(:where(#{$oncolor-area}))`: zero specificity, so the cascade outside the area is unchanged.
- Size: main +17 KB raw, +0.6 KB gzip (the stepper block repeats the area selector).
- `$oncolor-area` also matches `.nds-oncolor *`: a part inside an on-color part takes its look (owner ask: the
  card's avatar, progress, status icons broke on `.nds-card.nds-oncolor` too). Avatar, status rings and feedback
  discs re-bind in a `.nds-oncolor, #{$oncolor-host}` token block; progress, filled featured icons, feedback
  symbol and the shared button looks follow the area selector. Card / Countdown / Drawer / Swiper docs updated.
- Open: a card that must stay solid inside an area has no opt-out yet (`data-theme` has no light word); design it if asked.

## Phases

- **Phase 1:** the area, forms, controls, buttons, focus ring, popup reset, on a test page that shows every
  part on each fill, in light and dark mode; `nds-verify` checks the contrast.
- **Phase 2:** side menu, footer brand, sections, hero, Side Info, docs, audit rules, and an **On color**
  toggle on every doc demo preview, beside Dark (`_js/nds-docs.js`): a deep primary card and
  `data-theme="dark oncolor"` on the markup, so the copied code carries it. Reuses the card's existing
  `.nds-oncolor` path; covers fields and controls, which have no `.nds-oncolor` class.

## Steps (after the design pass is approved)

1. Inventory: every dark token whose dark value is an opaque grey that a colored fill would show (the list the
   on-color block must override). Script it; don't eyeball.
2. Token blocks for the area in the tier files + `$oncolor-area` / `@mixin oncolor` beside the dark ones.
3. Forms on-color look; subtle-button on-color states; drawer indicator.
4. Contrast sweep on every fill from Question 3 (all parts, rest / hover / selected / focus / disabled).
5. Move the footer brand onto the area; delete its hand copy.
6. Side menu colors on the area (resume the parked work below).
7. Sections: decide Question 6.
8. Docs: `foundations/themes.md` (a sibling of Dark Areas), each surface's Variants rows, CHANGELOG, audit rules.

## Parked side menu work

A test, built 2026-11-18 on the branch `wip/sidemenu-colors` (also on origin); rebased on main 2026-11-20.
Rebase again before resuming. Files: `_sass/components/_sidemenu.scss`
(`--_sidemenu-bg-base` / `--sidemenu-bg` knob, `background` shorthand so the knob takes a gradient, three color
classes, top-bar drop-down reads the same var), `_sass/_variables-a11y.scss` (HC flattens `--sidemenu-bg`),
`ui-shell/sidemenu.md` (Color rows + knob rows, `updated`/`last_edit` bumped), `CHANGELOG.md` (one Added line).
The knob and the class scaffolding stay; `data-theme="dark"` becomes `data-theme="oncolor"` once it exists.

## Facts checked (don't redo)

- DGA's SA ramp matches `_sass/themes/_dga.scss:17-28` exactly; SA 900 = `#104631` = `.nds-primary`'s fill.
- `#074D31` is Figma's status `green-900`. DGA's own code (`platforms_code/css/nds-vars.css:431`,
  `platformscode-core-main/css/main.css:185`) says `#074c30`, as NDS has since its first commit. DGA hard-codes
  `#074D31` only in `.pfc-secondary-nav`, `.pfc-header__sub-menu--bg-brand`, `.pfc-footer--dark`. Not our gap.
