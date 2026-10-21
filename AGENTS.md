# AGENTS.md

## Project Overview

**National Design System for Saudi Arabia** — Jekyll static site documenting a government design system.
RTL (Arabic) by default, with LTR (English) support. Font: IBM Plex Sans Arabic. Icons: HGI Stroke Rounded.

## Commands

```bash
bundle exec jekyll serve      # Dev server (port 4002, auto-displays network IP)
ruby _plugins/js_processor.rb # REQUIRED after any _js/ changes (bundles & minifies → assets/js/*.min.js)
python scripts/optimize-assets.py <path>        # shrink SVG/PNG/JPG — dry-run report; add --apply to write
node scripts/svg-render-diff.mjs <path>         # REQUIRED after an SVG --apply: proves the render is unchanged
python scripts/check-data-state-tails.py        # after any [data-state]/[data-status] rule change, or a rule on a flag the JS writes on <html>/<body> — --report lists every tail
python scripts/check-css.py [--report|--unused] # built CSS: dangling var(), dead fallbacks, duplicate decls, global token in a component dark block, !important on transform/opacity/filter, anything after a pseudo-element (`::after > *`); --unused = rules no page/JS uses
node scripts/encode-webp.mjs <master>           # WebP at set widths, lowest quality above a PSNR floor — always from the master
node scripts/run-audit.mjs [page.html]          # print a built page's NDS.init.audit() warnings
node scripts/check-js-rules.mjs [file …]        # nds-js-audit's mechanical half: `finding` = decided, `verify` = left to read (rules in its header); --self-test; --names = the naming rules (PERSONA 1, 10, 12)
bundle exec ruby scripts/surface-history.rb     # names every release had that today's code lacks → tmp/surface/candidates.json; new rows go in _data/migrations.yml
node scripts/find-unused-icons.mjs              # UI icons nothing references
python scripts/hgi-font-slices.py               # HGI content font → 25-icon slices in assets/fonts/hgi/ + their @font-face list (hgi-font-update.py --apply runs it)
node scripts/check-date.mjs                     # NDS.Date vs Intl: every day 2018–2037 round-trips gregory ↔ hijri; ENGINE=webkit for Safari
node scripts/check-i18n.mjs [--build]           # every _i18n/ pack holds each English word (JS defaults + markers), markers match it, no Arabic in _js/; --build writes assets/i18n/ + _data/i18n.json (js_processor.rb runs it)
python scripts/check-docs.py [page.md]          # one-source doc pages vs the nds-doc rules (no build needed)
python scripts/publish-iq.py [--apply]          # NDS IQ draft → the file installs download: dry run; --apply commits + tags IQvX.Y, never pushes
python scripts/rig.py new|stage|reset ...       # field rigs: a legacy app a fresh agent ports with the draft rules — guide in .claude/skills/nds-iq-eval/RIGS.md
node scripts/doc-check.mjs <page.md>            # clicks every builder option: findings + one contact sheet per theme in tmp/doc-check/ — owner's go-ahead first
node scripts/check-menus-in-modal.mjs           # six menu components in a scrolling Modal: place, follow, close, pick; PHONE=1, ENGINE=webkit
node scripts/check-ipv.mjs                      # Image Popup Viewer: NDS.Ipv methods, no window global, data-ipv-gallery grouping, rebuild after destroy
node scripts/check-dialogs.mjs                  # Modal + Panel on <dialog>: plain/static/modal, stacking, Escape, outside click, lazy panels; ENGINE=webkit, NO_POPOVER=1 (Safari < 17)
node scripts/check-bundle-once.mjs              # a bundle loaded twice runs once: no error, no extra listener, a warning; JS=<dir> for other bundles
node scripts/check-a11y.mjs [page.html …]       # axe (WCAG A/AA) + a Tab walk (visible stop, focus ring, no trap) on every built page, LTR and RTL; --dir, --no-keys, ENGINE=webkit
node scripts/check-form-reset.mjs               # every form field's doc canon: a reset puts it back (value, message, chips, status), a cancelled one keeps the change; ENGINE=webkit, OLD_JS=<dir of old bundles> for an A/B
node scripts/check-pagination-data.mjs          # data-driven Pagination in a server flow: focus kept, 0/1 page hides, placeholder releases, data-active-page + ?page= current, ?per-page= read before the split; ENGINE=webkit, OLD_JS=<dir>
node scripts/check-mainnav.mjs                  # Main Navigation: menu placement, swap, scroll, outside click, phone drawer; ENGINE=webkit, TIMING=1
node scripts/trace-click.mjs [page] [runs]      # one plain tap traced: every listener on pointer/mouse/click with its cost, and the other main-thread work; TAP=1
node scripts/trace-busy.mjs [page …]            # long frames from load to quiet, with their scripts (LoAF); INITS=1 adds each component's init time
node scripts/check-form-speed.mjs                # Form speed, a past commit (BASE=, default HEAD) vs today, interleaved: init on real pages, create() × 20/50/100, one keystroke and one click; RUNS=, CPU=
node scripts/check-form-validate.mjs             # what NDS.Form.validate says for every field canon in four states (written, required, filled, disabled), a past commit (BASE=) vs today; ONLY=<page>, DUMP=1
node scripts/check-form-interact.mjs             # how every field canon reacts to real clicks and keys (focus, typing, clear, number buttons and hold, password toggle, select, boxes, switch, submit, reset), a past commit (BASE=) vs today; a difference counts only when a rerun repeats it
node scripts/profile-load.mjs [page] [ms]       # V8 CPU profile of a page load: self/total time per function in the NDS bundles
node scripts/release-template/nds-verify.mjs <config.json>  # consumer verify tool, shipped at the zip root: every page and state, both widths, light and dark, audit + console + a sheet beside the reference; to try it here, NDS_SITE=<a release zip's _site>
```

**Browser checks launch through `scripts/lib/browser.mjs` (Playwright)** — `ENGINE=webkit node scripts/<check>.mjs` runs one as Safari. The root ships `playwright-core` only (no browser download; Chromium is your installed Chrome); WebKit lives in Playwright's per-user cache and downloads itself on the first Safari run. CDP calls (throttling, touch, traces) are Chromium-only.

**A new script or check is fast and fails loud, never silent.** Log each step with its elapsed time; give every await a short limit (~10 s) that fails with the step's name, not a library default (30 s, or 180 s for a Chrome launch); print failed requests and page errors as they happen; run independent pages in parallel; wait on a condition (a count that holds across two readings), never a fixed sleep. Then run it once on a broken input and see it stop quickly with a line that names the cause. Import `step()`, `log()` and `STEP_MS` from `scripts/lib/browser.mjs`; model: `scripts/check-bundle-once.mjs`. On 2026-10-21 its first draft sat 30 s on a wrong path with no clue.

**Judge an SVG by its GZIP size, not its bytes on disk** — Pages serves SVG compressed, so a 331 KB Figma export is 113 KB on the wire and disk numbers send you optimizing the wrong file. `optimize-assets.py` reports both. It also always encodes raster BOTH lossless and lossy and keeps whichever is smaller: flat-colour artwork (logos, UI graphics, hard edges) goes smaller AND pixel-perfect lossless, while photos and gradients want lossy — a 201 KB PNG here landed at 74 KB lossless vs 102 KB at q95. Never pick from the file extension.

**After optimizing any SVG, run `svg-render-diff.mjs` — byte checks cannot replace it.** It rasterizes the new file against its `tmp/asset-backups/` copy in headless Chrome at 64/256/1024px and erodes the diff mask by 1px: hairline outlines are anti-aliasing and vanish, a colour shift or moved shape survives as `solid`. On 2026-08-28 `dga-logo-icon.svg` passed every static check — viewBox identical, no dangling `url(#…)`, every gradient and mask kept — yet rendered 3.5% of its pixels differently at every size (mean ink `[48,136,179] → [90,156,192]`); it was reverted. SVGO rewrites a file completely, so only a render comparison proves the drawing survived. Whatever tests this, **make the SVG fill its test box (`width:100%`, never `max-width`)** — a file with intrinsic `width`/`height` otherwise paints at native size in every box and the large runs silently test nothing. That flaw gave a false all-clear on the very run that missed the regression above; identical pixel counts across sizes is the tell.

**After editing `_sass/_fold.scss` or `_includes/head-inline-scripts.html`** — copy the rendered `<style>` and head `<script>` from a built page into the `head_code` capture in `ui-shell/head.md`. That block is canonical markup a consumer copies into their own `<head>`, and it is a hand-maintained copy of what `_includes/critical-inline.html` compiles, so it drifts silently: `61763016` added the dark-mode brand rule to the fold and the doc went five weeks without it. `verify()` compares both and fails the release when they diverge.

## Files to Ignore

- **NEVER read** any `.min.js` or `.min.css` files (minified output) — grepping or size-checking the built output is fine, just don't Read the blob into context. (`.min.scss` files are Sass source, not covered.)

## Tool Restrictions

- **NEVER use `sed`** for file edits — it rewrites every file it opens even with no match, polluting git diffs.
- **For mass/bulk edits** — write a targeted script (Python, Ruby, etc.) that reads each file, checks for a match, and only writes back files that actually changed. Preserve existing line endings (write LF, not CRLF) and check `git diff --numstat` after — the repo is `autocrlf=true` with no `.gitattributes`, so a script that re-encodes line endings pollutes the diff.

## Event Theme Packs

A seasonal skin applied by one `<script>` tag. Source is split three ways: the pack
JS in `_js/events/`, its SCSS in `_sass/themes/events/`, and the images plus built
output in `docs-assets/events/<folder>/` (whose `.min.scss` is the Jekyll build
entry). Registered in `_data/themes.yml` (drives the topbar switcher),
`_data/catalog.yml` and `_data/sidemenu/sidemenu.yml`.

**Rebuild the pack after changing its JS, SCSS or images** — `bundle exec jekyll build`,
then `python scripts/mkevent.py <event>`, then build again to publish. `mkevent.py` owns the
pack end to end: it minifies the JS, inlines the compiled CSS, and writes the zip.
`js_processor.rb` skips `_js/events/` on purpose (building packs there blanked their inlined
CSS). Nothing else rebuilds a pack, so it goes stale silently. It verifies what actually breaks a pack:
every CSS `url()` and JS asset default resolves, and each file's magic bytes match
its extension (this caught a PNG named `.svg` and another named `.jpg`).

**The pack runs synchronously in `<head>` on purpose.** It injects the hero slide
during parse, so the slide is in the first paint. Do not defer it into a bundle:
`nds-main.min.js` gates the reveal and the delegated/extras bundles load *after*
it, so a late-injected slide swaps in visibly.

## Scratch Files

**Anything temporary goes in the repo's `tmp/`, and `tmp/` is disposable** — it may be
emptied at any time, so nothing in it is ever the only copy of anything. It holds
backups before an overwrite (git holds the original once the change is committed),
throwaway fixtures and harness output, intermediate data, one-off comparison builds.
Mirror the source tree under it when the file shadows a real one
(`tmp/asset-backups/docs-assets/events/Hajj/hayyakom.svg`), so same-named files
from different folders cannot collide.

What must outlive the task does not go in `tmp/`: an image master or other source
material is committed, and a reusable harness lives in `scripts/` — only its
*output* belongs in `tmp/`. Not a sibling `.orig/`/`.bak` next to the original
either: those folders ship, so the scratch file reaches `_site`, a pack zip and the
release zip.

`tmp/` needs BOTH guards to stay invisible, and it had only one until 2026-08-28:
`/tmp/` in `.gitignore` AND `tmp` in `_config.yml` `exclude:`. Without the second,
Jekyll copies it into the build — it looked safe only because the folder was
empty. Check both when adding any new scratch directory.

## Code Comments

**Brief and to the point.** A comment states the WHY in one line — the reason the code is
not the obvious thing. Match the density of the file you are in; do not out-comment it.

- No paragraph explaining a one-line change. If the explanation is longer than the code, cut it.
- No restating what the code says. No comments on removed code.
- A shortcut with a known ceiling gets a `ponytail:` line naming the ceiling and the upgrade path.
- Component banners are the exception in FORM, not in length: they stay structured
  (Rides/Requires/Methods/Events/Hooks/Gotchas; Requires is optional and feeds the audit) and each Gotcha is still as short as it can be.

## Model Usage

**Delegate to a subagent whenever the work calls for one — on every session, not just Fable — and pick the lowest tier that can do the job.** A subagent's tool output never enters the main context, so both the delegation and the tier choice are real token savings. Route mechanical and easy work — bulk edits, file writes, routine lookups, boilerplate, broad searches — to `haiku` or `sonnet` via the Agent tool's `model` override, and reserve `opus` for subagent work that genuinely needs it. Keep the session's own model for complex tasks, decision-making, and review of the subagents' output.

**A skill that mandates an agent gets one.** Several skills (`nds-js-audit` Phase 3 and Phase 6, among others) require a subagent as a review gate. If a session-level rule blocks the Agent tool, say so and ask — never silently run an inline pass in place of the gate.

## Using Components (CRITICAL)

**NEVER guess a component's markup structure.** Before placing any NDS component on a page, open its doc page at `components/[name].md` and copy the canonical markup from its code block (or the live demo above it). Class names, element nesting, required modifier classes, `data-*` attributes, and ARIA roles must match the doc exactly. Also check `examples/*.md` for real-world usage patterns. If the doc is missing or unclear, read the component's SCSS in `_sass/components/_[name].scss` — do not invent structure from memory.

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.
**Prefer CSS Logical Properties** (`margin-inline-start`, `padding-inline`, `inset-inline-start`, `text-align: start`) — they auto-adapt to text direction.
**Use `@include ltr` ONLY** for transforms, gradients, or properties logical props don't cover.

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
- **The child offers the step, the parent applies it.** The child's SM values live in a mixin in `_mixins.scss` (`date-tile-sm`) that its `.nds-sm` and the parent's container rule both include: a container query cannot add a class.
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

## Section & Grid

All page content is built from sections. Read `layout/section.md` before creating content.

## Creating New Pages

**Two base templates** — copy and fill in your values:
- `standard-page.md` — regular pages (uses `page`/`minimal` layouts with sub hero)
- `subsite.md` — subsite home pages (uses `home` layout with hero slider)

## Liquid Whitespace (`_includes/`, `_layouts/`)

`{%-` eats whitespace BEFORE the tag, `-%}` eats it AFTER. Eat both sides of a silent-tag run and the neighbouring markup jams onto one line (`</title><meta …>`) — the built HTML consumers read, since CI never runs `html_compressor.rb`.

- **Output tags take no dashes** — `{% include x.html %}`. A leading dash eats the newline that belongs before the include's output; a trailing one eats the newline after it.
- **Silent own-line tags take a leading dash only** — `{%- assign … %}`, `{%- if … %}`. The leading dash removes the tag's own line; a trailing dash steals the NEXT line's break. Stacked runs still emit nothing — each tag's leading dash eats the previous one's newline.
- **Keep the dashes** inside a `{% capture %}` body (emitted inline later, so a restored newline renders as a space) and on lines sharing markup with a tag (`{%- if a %}<div>{% endif -%}`).

Verify a whitespace change by rendered text, not by eyeballing: build before/after, strip tags, collapse whitespace runs to one space, and diff. Identical text = formatting-only.

## Server Calls in Components

**A component is UI plus an event API; a built-in server call is an optional shortcut.** It is fine when it is simple and never limits usage: the events and methods must do everything the call does, so a developer with CSRF, custom headers or their own client skips it (Session Timeout: `data-session-extend` is the shortcut; `nds:session:extend` + `end()`/`reset()` is the full path). A bug in the call is a bug to fix, not a reason to remove it.

## Framework Hosts

**NDS is plain HTML, CSS and JS, and a consumer can integrate it into any stack: a plain page, a server-rendered app, or a framework such as React, Vue or Angular. Judge every component and API change against all of them, never against how this repo's own pages use it.** A framework host mounts and unmounts views, rebuilds nodes, and keeps state in its own code. `core/init.md` → Framework Views is the contract the consumer follows: `NDS.init.mount(view)` after mount, `NDS.init.destroy(view)` before unmount.

- **The instance lives on the element.** `el.nds{Name}`, with a `destroy()` that drops its stamps: `NDS.init.destroy()` finds instances by that backref. No module-level registry keyed by id or selector. It outlives an unmounted node, and a reused id resolves to the dead instance.
- **`create(el)` stands alone.** A view mounted after load gets everything `init()` wires (document listeners, observers), not just an instance.
- **State round-trips.** What a component reports in its events can be written back through its `data-*` hooks and restores the same look after a re-mount (Stepper: `currentStep` ↔ `data-current`).
- **A change to an observable value is breaking** (event detail, return value, a `data-*` the script writes), even when every page here still works. It ships in a major with a Migration line, or takes an additive path. Before changing one, `git log -S` the code and read why it is that way.

`nds-js-audit` checks the first three as JSA-23 (the first two in full-tree runs too) and gates the fourth in its shared rule conventions.

## Shared Logic

**Shared JS sits in one of three layers, and a lower layer never names a higher one: core ← base ← component.** PERSONA entry 11 holds the reasons; `plans/shared-logic.md` migrates today's tree.

- **Core** (`nds-core.js`): page-wide utilities that know no component.
- **Base**: one job a family shares, with no UI of its own (`NDS.dialog` serves Modal and Panel). **It lives with its callers:** in their bundle when they all share one, else in main, so no caller ever meets its stub; and it is listed before every file in its bundle that names it. **A base creates no markup and shows no message:** it may write state and attributes, but it returns data, and the component that called it renders.
- **Component**: has a root class or a loader entry. The loader sits beside core and names components only through its registry.
- **Where a shared piece goes, first yes wins:** one component's contract → that component's API, if it loads no later than every caller; a family's job with no UI → a base; it knows no component, two or more files call it and it passes JSD-05's body gate → core; otherwise keep the copies. The two-caller bar is for promotion into core, never for eviction from it.
- **Bundles.** Main runs first. The injected bundles land in parallel, in no order, and before one lands `NDS.X` is a stub whose every property is truthy, so `?.` cannot see it. A callee loads no later than every caller that uses its result synchronously; a call between two injected bundles ignores or awaits its result, or carries the one-line stub check with its comment.
- **Guards.** Never guard a namespace in main: NDS serves its bundles as built, so it is always there. Only an opt-out bundle (accessibility, cookies) is guarded by its callers.
- **Undo.** What `create()` stamps on an element that outlives the instance, `destroy()` removes, and only that.

## Adding New Components

**Phase 1: Build & test** — verify behavior in `playground.md` before registering anywhere.

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`
3. Add JS in `_js/nds-[name].js` if needed — follow the canonicals in `.claude/skills/nds-js-audit/PERSONA.md` (controller naming, `destroy()` teardown, lifecycle pair by concept, console prefix, init sentinel, `{ signal }` listeners) — then run `ruby _plugins/js_processor.rb`
4. Test the component in `playground.md` until behavior is correct

**Phase 2: Document & register** — only after Phase 1 verifies behavior.

5. Add documentation page in its shelf's folder — the placement rule heads `_data/catalog.yml` (most pages: `components/[name].md`) — following `.claude/skills/nds-doc/SKILL.md` (Claude Code invokes it as `/nds-doc [name]`)
6. Add to `_data/sidemenu/sidemenu.yml` under its shelf (and group, for Components)
7. Add its entry to `_data/catalog.yml`, in its shelf's block, so the page appears on the Library grid, in `llms.txt`, and in the agents' catalog. Match a neighbor entry's keys (title, description, use_when, category, tags, url, js, scss; templates, examples and events add icon) rather than guessing the schema. Templates, examples and event packs go in the same file, in their own blocks.
   **A page that moves keeps its file name** — the 404 page forwards an old URL by file name.

## Component Doc Front Matter

Every component/utility/layout doc page in `foundations/`, `components/`, `layout/`, `utilities/`, `ui-shell/` carries three tracking fields alongside the usual `layout/title/hero_*/breadcrumb/lang/direction`:

```yaml
since: "1.0.0"                                    # version the doc first shipped (never changes)
updated: "1.4.0"                                  # version of the most recent COMPONENT change (source/markup/API; not doc-only edits)
last_edit: "15/07/2026 - 02:35 PM"  # timestamp of the most recent doc content edit (GMT+3)
```

**When to update:**
- `since` — set once at creation, never touched again.
- `updated` — bump when the COMPONENT changes: its source (SCSS/JS), markup, or public API. A doc-only edit does NOT bump it (rewording, a new demo card, a corrected path in a sample); that moves `last_edit` alone. Value = current `version` in `_config.yml` (strip `-dev`).
- `last_edit` — refresh ONLY when the doc's content changes (typo fix, new demo card, table row, wording tweak). A source fix that visibly changes what the doc page RENDERS (e.g. a demo now displaying correctly) counts as a content change — bump it. A version-tag-only bump (`updated`/`since`) does NOT — leave `last_edit` untouched, no sync needed. Format: `DD/MM/YYYY - HH:MM AM/PM` in GMT+3 (Asia/Riyadh). The environment's `date` command is unreliable for this — ask the user for the current time if unsure, or use `date -u '+%d/%m/%Y'` for the date and manually add 3 hours to the UTC time.

**Reference implementation:** `components/multiselect.md`, `components/date-picker.md`.

## JS Bundles & Shrinking the Critical Bundle

**Bundles, location owned by the build** (`@bundles` in `_plugins/js_processor.rb`): `nds-main.min.js` (a `<script defer>` — **gates the page reveal, keep lean**), `nds-delegated.min.js` + `nds-extras.min.js` + single-component chunks for big leaves nothing calls (`nds-editor`, `nds-chart`, `nds-code`) — all loader-INJECTED *after* the reveal, never gating it, and `nds-audit.min.js` (never auto-injected at all — pulled by the `enableLogging` sweep or the first `NDS.init.audit()` call, so a production page ships zero audit bytes). The loader reads `window.__NDS_BUNDLES` (namespace→bundle, build-generated) — **never hardcode bundle membership in JS**. Run `ruby _plugins/js_processor.rb` after any `@bundles` or `_js/` change.

**To move init-unnecessary code off the reveal-gating path — de-criticalize + move (wholesale).** For a component that is *delegate-safe*: markup + always-loaded CSS paint it correctly with JS deleted (JS owns behavior, not first paint). Public usage (`NDS.X.method()`) stays unchanged via the loader's lazy proxy stub.
- Server-render any state JS stamps at first paint (e.g. accordion default-open ships `data-state="open"` on the button **and** the collapse so CSS paints it expanded — no JS, no CLS).
- Drop `critical: true` from its `_js/nds-loader.js` registry entry.
- Move its file from the main list to the delegated list in `@bundles`.
- Clicks in the pre-bundle gap no-op and recover on the next click (the Tabs/Tables pattern). Precedents: **Accordion**; **Filter + Pagination** (2026-06-11).
- State that only exists at runtime (e.g. filter URL params) can't be server-rendered — hold the region in blocking crit instead, the `data-nds-loaded` pattern per container: a crit rule keeps each `[data-filter-items]`/`.nds-paged-content` region `visibility: hidden` until **its own** init stamp lands (`data-nds-filter-initialized`/`data-paged-initialized`). Self-releasing, zero JS beyond the stamp the component already writes.
- Pre-init layout reservations belong in the component's **own main CSS**, keyed on its init stamp (e.g. pagination's empty-nav `min-height` until `data-paged-initialized`) — never mirrored into crit (the old crit skeleton doubled crit doing exactly that; read it at `git show 3b8fb0a5^:_sass/_skeleton.scss`, the commit that deleted it).

**Don't split a component into eager-shell + lazy-behavior halves.** A per-component split (a `nds-X__delegated.js` half grafted onto an eager shell via `_installBehavior`/trap stubs + `loadSplit`) was built for Filter/Mainnav/Stepper/Pagination and **removed 2026-06-04**: it saved only ~3 KB gz off main — which the reveal isn't byte-bound on — at the cost of a pre-attach promise-vs-sync gap and ~330 lines of mechanism + build guards + docs. If a `critical` component has init-unnecessary behavior, keep it in main and run that behavior **on interaction with cold-init** (cheap registration at init, no forced layout); wholesale-defer instead only if it's genuinely delegate-safe.

**Build guard fails on violation** — a `critical` component's code can't ship in an injected bundle (`assert_no_critical_in_injected!`): fix by dropping `critical: true` or moving the file back to the main list.

**Keep EAGER (never defer):** anything affecting first paint (CLS-prevention state stamps, FOUC-guard removal), the component's PRIMARY interaction, or a synchronous cross-component API (e.g. `NDS.Form.validate` is read synchronously at submit). Defer only secondary/late paths.

## Content Skills

Documentation pages under `foundations/`, `components/`, `ui-shell/`, `layout/`, `utilities/`, and `core/` are created, refined, and audited per `.claude/skills/nds-doc/SKILL.md` — Claude Code invokes it as `/nds-doc [name]`; other agents follow the SKILL.md workflow directly.

## Writing

**All user-facing prose follows `EDITORIAL.md`: sentences, terms, claims, and tone per surface.** Read it before you write or rewrite any doc page, guide, alert, demo copy, README, changelog entry, or `_includes/NDS-IQ-draft.md`. The `ste100-writer` skill, if installed, adds an approved-word check on top.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages
- Always propose the commit message and wait for explicit user approval before running `git commit` — never commit unreviewed
- Approval to commit is not approval to tag, push, or publish a release — each needs its own explicit go-ahead
- Keep commit messages brief and to the point — short subject line, body only when the "why" isn't obvious from the diff

## Deprecations

**Found something kept only for compatibility? Put it in `DEPRECATIONS.md` before you move on.** A source comment alone does not survive — nobody greps for "legacy" at major-release time, and the name silently ships forever. The ledger is build-excluded, covers classes, attributes and JS APIs alike, and is cleared only by a major.

The tells: a bare two-name `:is(.nds-old, .nds-new)` routing both to one rule, a `// legacy` or `// deprecated` comment, a method kept as a thin wrapper over its replacement. **A second spelling is not automatically debt** — a component that answers to both a class and an attribute, or to a colour name and a semantic one, is being generous, and tags and featured icons do exactly that on purpose. A name is debt when it is WRONG: it describes behaviour the component dropped, or it names a fixed colour for a surface the theme controls. Judge the name, not the count.

**Name the selector context, not the bare class.** The same name can be dead in one place and canon in another: `.nds-green` is a deprecated brand-surface alias on a section, and the public API on a tag. Verify which before you write the row, and grep with the component in the pattern.

A row carries the dead name, its replacement, when it was deprecated, and where it is declared. If picking the survivor is not your call — two live names, neither marked — file it under the owner-call heading instead of guessing. Never remove an alias outside a major.

## Releases

**Releases, release notes and the changelog follow the `nds-release` skill.** Never hand-roll the template zip — `python scripts/mkrelease.py` builds it.

**`NDS-INDEX.md` maps a consumer agent's needs to this release's files; the rules name none.** It ships at the template zip root. A commit that moves a doc page, changes the canon format, or changes a chrome shape's page updates it in the same commit. `verify()` fails the release on any path it names that is missing.

**`_includes/NDS-IQ-draft.md` is where the consumer rules (NDS IQ) are written. Load the `nds-iq-eval` skill before editing it** — it holds the versioning, growth-control and floor-gate policy.

**Raw main's `_includes/NDS-IQ.md` is what every install downloads, so only `python scripts/publish-iq.py` writes it.** Edit the draft and push it any time. The script checks the draft, copies it over the published file, commits and tags `IQvX.Y`; pushing stays a separate step. The live site takes the rules and `guides/integration-quality.md` from the `IQv` tag that matches the published file, so drafts and history rows on main stay off it. `scripts/hooks/pre-push` blocks a main push whose published file differs from the newest `IQv` tag in main's history (an off-main tag such as `IQv3.2` never counts) — install it once per clone: `git config core.hooksPath scripts/hooks`.

**HARD CONSTRAINT: the rules file may never contain literal Liquid delimiters** (curly-brace-percent or double-curly). The published copy is a Jekyll include — the footer and both guides render it — so the build parses them and dies pointing at the footer. Write around them; `check_rules()` guards the draft at publish and the published copy at release.

**The rules file names no template version** — `check_rules()` fails on any `x.y.z` literal in it.
