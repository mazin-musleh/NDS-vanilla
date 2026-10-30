# Part sizes — plan (v2.0.0)

Status (2026-10-30): step 0 committed (`41132f0f`, `161831bf`); step 1 built and checked, waiting on its commit.

## Why

A part's size (avatar, featured icon, stars, ring, chip, date tile, tag, meta, button) is set three ways today, and each part answers to a different "who wins":

- Avatar, featured icon, stars, ring: a size class on the part beats a knob on a parent.
- Date tile, tag: a knob on a parent beats the size class.
- Chip, button: a knob on a parent never reaches the part (the part writes its knob on itself).

A developer or an agent who copies the wrong neighbour gets the wrong behaviour, and nothing flags it. The List's size step (`plans/list.md`) had to work around all three. Two reviews (2026-10-30) found the List change right in direction but carrying the split, a hand-kept reset list, and a button whose label steps while its height does not.

## Decided (owner, 2026-10-30)

**Rule A: a knob always wins.** For every part, in this order:

1. The part's knob (`--avatar-size`), set anywhere: on the part, or on any parent.
2. The part's own size class (`nds-sm`, `nds-lg`).
3. A parent's step (a List's size, a Persona, a Drawer row, a section).
4. The part's default.

One mechanism carries 2 and 3: **NDS CSS never writes a public size knob.** A size class and a parent's step both write the private `--_x-base`; the part reads `var(--x, var(--_x-base, default))`. On the part itself, the size class is nearer than a parent's step, so it wins by inheritance; MD resets `--_x-base` to `initial`. This is the tag's pattern today.

`-base` keeps one meaning: the system's value under the knob, whether the part sets it on itself (a status tag's colour, a card variant) or a parent sets it for the parts within.

**Breaking (Migration):** a knob on a wrapper now beats a part's own size class (avatar, featured icon, stars, ring, button, chip), and a knob on a wrapper now reaches chips and buttons. No page in the repo sets a part size knob in markup (grep, 2026-10-30), so this hits consumer CSS only.

## Step 0 — land what is built

The working tree holds the List size steps through `-base` (two reviews done) and the List doc wording. Commit both (owner approves the messages) so this plan starts clean:

- `docs(list): a box class on an item mixes with the list's`
- `refactor(list): a list's size reaches its parts by inheritance`

## Step 1 — small parts (S/M)

For avatar, featured icon, rating, progress ring, chip, date tile, meta (tag already follows it):

- The size mixins write `--_x-base` only. `step-knob()` and every `$base` parameter go: one mixin per step, shared by the size class and a parent, as AGENTS.md asks.
- An `x-md` mixin resets the `-base` values; `.nds-md` includes it: avatar, featured icon, chip, date tile, meta, tag. The ring and the stars have no class at their default size, so no reset.
- Chip: the bare chip stops writing `--chip-size`; its MD values are written once (the reviewer found them twice, `_chips.scss:90`).
- Featured icon: `nds-subtle` (`_featured-icon.scss:93`) repeats the fallback chain; left as is (a new private for one line buys nothing).
- Parent writes become `-base` (each checked: on the part, or on a parent):

| File | Line | Writes |
|---|---|---|
| `_persona.scss` | 21, 93, 103 | `--avatar-size` |
| `layout/_section-layout.scss` | 144, 278, 281 | `--featuredicon-size`, `--avatar-size` |
| `_stepper.scss` | 215, 691, 784 | `--featuredicon-size`, `--progress-size` |
| `_main-nav.scss` | 199 | `--avatar-size` |
| `_buttons.scss` | 696 | `--avatar-size` |
| `_drawer.scss` | 219–221 | `--tag-height`, `--tag-fs`, `--tag-padding-inline` |
| `_filter.scss` | 81–82 | `--tag-fs`, `--tag-height` |
| `_accessibility.scss` | 69, 230 | `--tag-fs`, the button spinner's ring (the a11y sheet loads later, so it still wins a tie) |
| `_upload.scss`, `_buttons.scss` | 161, 743 | the ring's inner size, written straight to `--_progress-size`: a size class on it was lost; now `-base` |

- One naming: the inherited card steps without a knob (`--_card-value-*`, `--_card-rating-text-*`, `--_metric-*`) take the `-base` suffix too.

## Step 2 — button (M/L, the risky one)

The button sizes 50 lines in 14 files and reads `--btn-size` / `--btn-indicator-size` bare in 22 places. Each line is classified by hand before it changes:

- **On the button** (a component restyling its own buttons: `.nds-tabs.nds-sm .nds-btn`): becomes `-base`. Against a size class on the same element, specificity decides, as today.
- **On a container**, read by the container's own layout (pagination `:203`, tabs `:269`, `:309`, date picker `:132`, `:174`): becomes the container's own private (`--_pagination-btn-size`). A public write there would now reach every button inside, and beat its class.
- **On a container, meant to size the buttons inside:** becomes `-base`. Today these reach nothing (the button writes its own), so each one is a behaviour change to look at.

Then:

- The bare `.nds-btn` writes no public knob; `btn-base` reads `--_btn-size: var(--btn-size, var(--_btn-size-base, 40px))`, and gap and indicator alike. Bare reads on a button switch to the private (`--_btn-size`).
- `.nds-sm` and `.nds-md` write `-base`; `.nds-lg` resets it.
- **The label follows the height.** A parent's step writes no `--_btn-FS-base` / `--_btn-LH-base`: the label size comes from the button size. Fixes the reviewer's risk 1 (a 48px button in a small list had a 14px label). Cost: a list's small buttons take a 21px line, not 20px, in the same 32px button.

Files: `_buttons.scss`, `_mixins.scss` (`btn-md`, `btn-base`, `btn-indicator`), `_accessibility.scss`, `_accordion.scss`, `_date-picker.scss`, `_drawer.scss`, `_fab.scss`, `_form.scss`, `_main-nav.scss`, `_pagination.scss`, `_panel.scss`, `_sidemenu.scss`, `_table.scss`, `_tabs.scss`, `_topbar.scss`.

## Step 3 — checks (S)

- `check-css.py` fails when NDS CSS writes a public size knob (the list of knobs sits in the script). It makes rule A hold after this plan.
- `check-css.py` fails when a List step drifts: every property `card-sm`, `card-lg` or the narrow step writes is either one Card sets on itself, one every list item sets, or one `card-steps-reset` clears. Closes the reviewer's risk 2.
- `scripts/check-part-sizes.mjs`: the fixtures from `tmp/list-review/` as one check (nested lists, a knob on the list, a size class kept, a button's label against its height), Chrome and WebKit, on the fast-and-loud model. A line in AGENTS.md Commands. One case is the Library's (`_includes/library-list.html`): a list with no size class whose tags carry `nds-xs` keeps them XS (20px), as today.

## Step 4 — audit tidy-ups (S)

From the Sass audit (2026-10-30, `tmp/sass-audit/`):

- **Stepper specificity:** `stepper-is()` (`_stepper.scss:17`) wraps its exclusions in `:where(:not(…))`, so a phone or tablet layout rule weighs what the layout class weighs. A consumer override stops losing on phones. Check: stepper at sm, md, lg, all layouts, old vs new.
- **Select caret:** inline `%select-caret-after` (one user, `_form.scss:415`; its comment names a date picker that no longer extends it), and its `@include ltr` becomes `inset-inline-end`. Check RTL and LTR: the caret stays on the same side.
- **Single-use mixins move home:** `btn-base` to `_buttons.scss`, `progress-circle-base` and `-text` to `_progress.scss`, `autofill-reset` to `_reset.scss`, `reset-section-style` to `_section.scss`. `_mixins.scss` keeps what two or more files share. Built CSS identical.

Not done (audit, measured): merging duplicate rules (gzip grows), the `ltr`/`dark`/`@media` repeats (required, or a cascade reorder for ~300 B), the loading skeleton (needs a markup hook).

## Step 5 — verify (M)

- `check-css.py`, `check-data-state-tails.py`, the new `check-part-sizes.mjs`, `js_processor.rb` (audit bundle, if a class or Requires line moved).
- Every page, old CSS vs new, 1280 and 390 (`tmp/list-review/ab-parts.mjs`, keyed by DOM path; rerun a page before calling a difference real). Expected: no change, but where step 2 found a container write meant for its buttons; each listed with its reason.
- `check-form-interact.mjs` and `check-form-speed.mjs` (BASE = step 0's commit): the button is in every field.
- `check-a11y.mjs` on the changed components' pages; Chrome and WebKit.
- CSS size, gzip, before and after (step 0's build was 66,541 B).

## Step 6 — docs, one pass (M)

- AGENTS.md "Design Tokens", the knob paragraph: rule A and the `-base` mechanism in two lines; "A narrow component reflows before it shrinks": the child's step mixin writes `-base`.
- Each part's page (Avatar, Featured Icon, Rating, Progress, Chips, Date Tile, Meta, Tag, Button): the knob table says a knob beats the size class, and reaches from a parent. `last_edit` and `updated`.
- List page: the size rows and Best Practices still hold; check the knob rows.
- CHANGELOG [Unreleased]: Changed (rule A, per part) and the Migration note (a wrapper's knob now beats a size class; it now reaches chips and buttons).
- NDS IQ: grep the draft for knob and size-class wording; any edit goes through the `nds-iq-eval` skill.
- `nds-css-audit` skill: rule A as a review point.

## Commits

One per step: 1, 2, 3, 4, then 6 (docs, CHANGELOG, Migration). Each message proposed to the owner first.

## Open

- `_accessibility.scss:41–50` and `:69`: the a11y panel's sizes. If a mode must beat a size class, it keeps a public knob, and the check in step 3 names it as an exception with the reason.
