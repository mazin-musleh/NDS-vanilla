# On-color surfaces — plan

Status: **design, not started** (2026-11-18). Opened by the side menu colors work, which is parked until this lands.

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

**Copies to retire.** `_footer.scss:211-235` (brand footer) hand-copies the on-color button knob set
(its own comment: "DUPE-02 intentional"). `_buttons.scss:107` has `btn-oncolor-fill`.

## The idea

`data-theme="oncolor"` on any element: an **on-color area**, the sibling of the dark area.

- Mostly the dark values: text, icons, borders flip to light.
- Some are its own, mostly alphas and white: field fill, selected / active wash, subtle-button states,
  indicators, dividers (`alpha-white-10`), focus ring.
- Its parts never paint an opaque grey surface; they veil the fill underneath, so one set works on any brand
  color and on a gradient.

`.nds-oncolor` on one component stays as is (public API; markup is a contract). The area is the new layer
above it: one attribute instead of a class per part.

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

Built 2026-11-18, parked on the local branch `wip/sidemenu-colors` (this machine only, never pushed);
resume by rebasing it on main. Files: `_sass/components/_sidemenu.scss`
(`--_sidemenu-bg-base` / `--sidemenu-bg` knob, `background` shorthand so the knob takes a gradient, three color
classes, top-bar drop-down reads the same var), `_sass/_variables-a11y.scss` (HC flattens `--sidemenu-bg`),
`ui-shell/sidemenu.md` (Color rows + knob rows, `updated`/`last_edit` bumped), `CHANGELOG.md` (one Added line).
The knob and the class scaffolding stay; `data-theme="dark"` becomes `data-theme="oncolor"` once it exists.

## Facts checked (don't redo)

- DGA's SA ramp matches `_sass/themes/_dga.scss:17-28` exactly; SA 900 = `#104631` = `.nds-primary`'s fill.
- `#074D31` is Figma's status `green-900`. DGA's own code (`platforms_code/css/nds-vars.css:431`,
  `platformscode-core-main/css/main.css:185`) says `#074c30`, as NDS has since its first commit. DGA hard-codes
  `#074D31` only in `.pfc-secondary-nav`, `.pfc-header__sub-menu--bg-brand`, `.pfc-footer--dark`. Not our gap.
