# SCSS and design tokens

Read before you edit anything under `_sass/`; the root AGENTS.md keeps the RTL/LTR and Using Components rules.

## SCSS Standards

**Every component file must start with** `@use '../mixins' as *;`

**Use `nds-` prefix** for all class names.

**Responsive/accessibility mixins** — see `_sass/_mixins.scss`.

**Every dropmenu menu carries a `.nds-{component}-menu` identifier.** The open menu shows in the browser's top layer (`popover`) but stays inside its wrapper, so rules and hooks scoped under the component reach it.
- **Identify the menu by default.** Give every component's `.nds-dropmenu-menu` a `.nds-{component}-menu` class (suffix `-menu`), whether or not it needs custom styling today. It names the instance — a stable hook we and consumers can opt into. Stamp it wherever a component owns or drives the menu: in the generator string (editor/pagination/breadcrumb/custom-select), or at init via `classList.add` for an authored menu the component drives (multiselect/filter/share) — use an own-descendant check when the component may nest sub-menus. Only a truly generic `.nds-dropmenu` with NO owning component (pagination's `data-per-page-target` per-page picker, a standalone menu) is skipped — that one's the consumer's to identify. Models: `.nds-theme-menu`, `.nds-autocomplete-menu`.
- **Default styling: the shared `.nds-dropmenu-menu` covers it.** Most menus add nothing beyond the identifier.
- **Custom styling is opt-in and must be justified** — first confirm the shared styling genuinely falls short. When warranted, anchor it on the menu (the `.nds-{component}-menu` class, or a generic modifier like `.nds-center`).
- **Knobs stay on the wrapper** (`--dropmenu-min-width`, …) — the menu inherits them. A `%` width resolves against the wrapper: Dropmenu converts it to px on open, since the top layer would read it against the viewport.
- **Never fix clipping with `overflow` or `z-index`.** Nothing clips the top layer. Page scroll carries an open menu, over the sticky nav; it closes when its trigger leaves view.

**`data-state` styles its host — never a generic descendant.** Chrome keys attribute invalidation by attribute NAME, so every `[data-state~="x"] Y` rule in every sheet puts `Y` into ONE shared set, and any `data-state` write anywhere then restyles every matching descendant of the written element (one table-wrapper write restyled 21,008 cells through `tr[data-state~="selected"] td`, 2026-09-05). After a `[data-state…]` compound write nothing, a pseudo-element, or a class the component owns — never a tag, a shared class (`.nds-btn`, `.nds-label`, `.nds-icon`, `.nds-form-control`), `*`, or `:is(tag, …)`. A descendant that must change with the state reads an inherited custom property the host sets: `tr[data-state~="selected"] { --_row-bg: … }` and `td { background: var(--_row-bg, …) }`. **Only on a small host** — a row, a field, a button, a toggle: any inherited property a rule flips (a custom property, `color`) recalcs every descendant, 7–9 µs each whether or not anything reads it (22 ms on a 300-card list, 188 ms on a 3,000-row table, 2026-09-05), while a non-inherited property on the host costs nothing. A flag on a big container whose content does not change look is an own attribute, `data-{component}-{part}` (`data-nds-scroll-lock`). A token whose CSS must reach descendants of a big or often-flipping host (`loading`'s `> *`, `has-more`'s divider, `always-open`, `dropbox`, `hidden`) is mirrored to a class by core's `MIRRORS` map in `_js/nds-core.js`: CSS keys the descendant rule on the class, whose invalidation set only that class touches, and JS and markup keep the token. The same applies to `data-status`, and to every flag the JS writes on `<html>` or `<body>`, whose descendants are the whole page (`[data-fab-tucked] .nds-fab-dock > *` restyled 1,157 elements per flip, 2026-10-16). `python scripts/check-data-state-tails.py` fails the release on any tag, attribute, universal or shared-class tail after `[data-state]`, `[data-status]` or a page flag (found in `_js/`; the ones that restyle the page on purpose, like `data-theme`, sit in its `PAGE_WIDE`); component-owned class tails pass, and the few accepted exceptions live in the script with their reasons. The CSS audit runs it too.

**No `!important` on `transform`, `opacity` or `filter`.** Chrome runs an animation on an `!important` property on the main thread only: the Panel slide stuttered on phones until its open rule won on specificity instead (2026-10-16). `python scripts/check-css.py` fails on it; a fixed value nothing animates goes in its `IMPORTANT_OK` with the reason.

**A narrow component reflows before it shrinks, and the parent decides.** Phones are where it shows, but the ruler is the component's own width, not the screen: the root or row is a named container (`container: nds-drawer-row / inline-size`) with one width point, named in its doc.
- **Reflow first.** Wrap or stack the parts. Shrink only what still squeezes the text after that.
- **Shrink boxes, never reading text.** A tile, icon, avatar, padding or gap may step down. A title, description or meta wraps: body-size text is already at its floor, and the user's font scale enlarges it on purpose. Display text has the `--typo-display-clamp-*` tokens; a short value inside a box (the date tile's day) steps with its box.
- **Down one step, never up.** Default to SM and stop, so the wide layout never changes.
- **The child offers the step, the parent applies it.** The child's SM values live in a mixin in `_mixins.scss` (`date-tile-sm`) that its `.nds-sm` and the parent's container rule both include: a container query cannot add a class. The mixin writes the `--_x-base` values, so a knob still wins (below).
- **Only the default steps.** A size class the author wrote (`.nds-sm`, `.nds-lg`) is kept as written; anything past that is the developer's own tweak.
- **Nothing tappable under 24px.**

## Design Tokens (CRITICAL)

**Four tiers, one file each — light block first, `:root[data-theme~="dark"]` block at the bottom of the same file** (+ knobs):
1. **Palette** `--colors-*` (`themes/_dga.scss` — vendored, DO NOT MODIFY, except the NDS-added `neutral-750`/`-850` dark steps a re-vendor must keep; runtime ramps in `themes/_register.scss`): raw values, zero meaning.
2. **Primitives** (`tokens/_primitives.scss`): dimension vocabulary — direct values on the size names (`--spacing-md`, `--radius-sm`, typo ladders, app-shell dims, transition + font knobs). No numeric rungs, no color.
3. **Semantic** (`tokens/_semantic.scss`, critical bundle): ONE name per meaning, system-wide (e.g. `--background-overlay`, `--text-oncolor-primary`). Its dark block matches `themes/_register.scss` on specificity, so crit `@use`s it AFTER register — keep that order.
4. **Component** (`tokens/_components.scss`, main bundle): `--{component}-{property}-{variant}-{state}` — a per-component dial.

**Dark areas:** `data-theme="dark"` on any element renders its subtree in dark mode. Both blocks of the semantic and component tiers (and the high-contrast overlay) also list `[data-theme~="dark"]:not(:root)`: the light block too, because an alias token resolves where it is declared. Keep the selector on both blocks when you edit them, and write a hand-made dark rule as `@include dark`, never a bare `:root[data-theme~="dark"]`, so it reaches dark areas. The mixin matches the element that carries `data-theme` and everything inside it (`$dark-area` in `_mixins.scss`).

Rule-level dark tweaks (not tokens) stay next to the rule they modify via `@include dark`. `_variables-a11y.scss` is a separate `[data-a11y]` overlay in the accessibility bundle, not a tier.

**Knobs** (`--btn-size`, `--section-*`, `--hero-*`) are NOT tokens: per-instance styling the consumer sets on the element, undefined by default, resolved via the `--_x: var(--x, default)` private pattern. Tokens theme the system; knobs style one element.

**A size knob always wins.** A part (avatar, featured icon, stars, ring, chip, date tile, tag, button) reads `var(--x, var(--_x-base, default))`. Its size class and a parent's step (a List, a Persona) write only the `--_x-base`, so the nearer one wins and a knob beats both. NDS never writes a public size knob: `check-css.py` fails on one. A button's size knobs stop at the button (`:where(.nds-btn)` resets them), because a wrapper's `--btn-size` would resize other components' buttons. `plans/part-sizes.md` holds the reasons.

**Global token or component knob? A value goes global (`:root`) only if something must REACH it from `:root` — stop at the first yes:**
1. A **mode layer re-binds it** — dark, `[data-a11y]`, or a brand. They all write at `:root[…]` and cannot reach a value declared on a component selector.
2. **Another component reads it** — a cross-component contract needs one name both sides see.
3. You are **promising consumers a per-component dial** — real only if design would retune this component alone (the DGA sheet names it, or design asked). Inventing the promise is how rename-only layers get minted.

Otherwise it is a knob: declare it on the component, `--_x: var(--x, default)`. **Promote a knob to a token the moment 1 or 2 becomes true** — custom properties resolve by inheritance proximity, not specificity, so a declaration on the component root beats EVERY `:root` override (dark, a11y, consumer sheet), no matter how many attributes that selector carries.

**Invariant: a component file never re-binds a global token — it sets its own knobs.** Token dark lives in the tier file's dark block; knob dark lives in the component file next to the knob (`@include dark`). The two never collide, and that is checkable: no name set inside an `@include dark` block may appear in `_sass/tokens/`.

**Authoring test — when a component needs a value, stop at the first hit:**
1. A semantic token with the same MEANING exists (and behaves right in dark) → consume it.
2. The component needs its own dial — design retunes just this component, or the DGA sheet defines it → mint the component token (STRICT bar: dial-or-DGA-mandate only) and route its VALUE by meaning (below).
3. No meaning match, no dial needed → palette-direct `--colors-*`, whole family as a unit. Raw hex: never.

**Naming grammar:**
- Semantic: `--{property}-{role}-{modifier}-{state}`; property ∈ `background/text/border/icon/shadow/focus/controls` (one owner-kept exception: `--divider-color`, for readability); modifiers are words with ONE fixed meaning (`light` = tinted wash, `strong` = deep emphasis, `oncolor` = on colored fill — always spelled `oncolor`, never `on-color`, placed last before state).
- States: `default/hovered/pressed/selected/focused/disabled` (token `pressed` feeds the `-active` knob — established precedent).
- NO color names, NO shade numbers in semantic names; one name per meaning (no synonyms); no rename-only layers.
- Element widths are meaning-named knobs/tokens (`--nds-sidemenu-width`), never scale rungs; breakpoints stay literals (CSS forbids `var()` in `@media`).
- One-off alphas: `color-mix(in srgb, var(--token) N%, transparent)` at point of use — alpha ramp families never grow.

**Family rules:** families ship complete or not at all — all four status hues, FS/LH pairs, the states the component implements. A member is justified by its family; a whole family with no consumers and no design mandate gets removed. Every public token appears in a doc reference table; token removals/renames land in the release Migration section.

**Routing a component token's VALUE — go by meaning:**
1. A semantic token with matching **meaning** AND correct both-mode behavior exists → alias it (dark/HC/re-tints come free).
2. Value must flip in dark but no semantic meaning-match → palette-direct + own dark re-bind; promote the mapping to semantic once ≥2 components share it.
3. Mode-invariant by design → palette-direct with no dark line (comment it if non-obvious).
- **Never route through a value-coincidence** (e.g. a border token feeding a background) — same hex today ≠ same meaning tomorrow.
- **Route families as a unit (states AND variants)** — if only some rungs have a semantic twin, keep the whole family palette-direct. E.g. `--button-background-primary-default` ↔ `--background-primary` (hovered/pressed/selected have no twins) or `--tag-background-{error,info}` ↔ `--background-{error,info}` (success/warning deliberately sit at 700). Splitting a family couples its members to different override surfaces and can invert the ladder under a semantic re-tint.
- Smell test: a dark re-bind that merely replicates an existing semantic token's flip = the token is on the wrong path; re-route and delete the re-bind.
