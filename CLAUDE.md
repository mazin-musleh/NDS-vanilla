# CLAUDE.md

## Project Overview

**National Design System for Saudi Arabia** — Jekyll static site documenting a government design system.
RTL (Arabic) by default, with LTR (English) support. Font: IBM Plex Sans Arabic. Icons: HGI Stroke Rounded.

## Commands

```bash
bundle exec jekyll serve      # Dev server (port 4002, auto-displays network IP)
ruby _plugins/js_processor.rb # REQUIRED after any _js/ changes (bundles & minifies → assets/js/*.min.js)
```

## Files to Ignore

- **NEVER read** any `.min.js` or `.min.css` files (minified output)

## Tool Restrictions

- **NEVER use `sed`** for file edits — it rewrites every file it opens even with no match, polluting git diffs.
- **For mass/bulk edits** — write a targeted script (Python, Ruby, etc.) that reads each file, checks for a match, and only writes back files that actually changed.

## Using Components (CRITICAL)

**NEVER guess a component's markup structure.** Before placing any NDS component on a page, open its doc page at `components/[name].md` and copy the canonical markup from the `<code class="lang-html code">` block (or the live demo above it). Class names, element nesting, required modifier classes, `data-*` attributes, and ARIA roles must match the doc exactly. Also check `examples/*.md` for real-world usage patterns. If the doc is missing or unclear, read the component's SCSS in `_sass/components/_[name].scss` — do not invent structure from memory.

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.
**Prefer CSS Logical Properties** (`margin-inline-start`, `padding-inline`, `inset-inline-start`, `text-align: start`) — they auto-adapt to text direction.
**Use `@include ltr` ONLY** for transforms, gradients, or properties logical props don't cover.

## SCSS Standards

**Every component file must start with** `@use '../mixins' as *;`

**Use `nds-` prefix** for all class names.

**Responsive/accessibility mixins** — see `_sass/_mixins.scss`.

## Design Tokens (CRITICAL)

**Four tiers** (+ knobs):
1. **Palette** `--colors-*` (`themes/_dga.scss` — vendored, DO NOT MODIFY; runtime theme ramps): raw values, zero meaning.
2. **Primitives** (`tokens/_primitives.scss`): dimension vocabulary — direct values on the size names (`--spacing-md`, `--radius-sm`, typo ladders). No numeric rungs.
3. **Semantic** (`tokens/_semantic.scss`): ONE name per meaning, system-wide (e.g. `--background-overlay`, `--text-oncolor-primary`). Dark rebinds in `_variables-dark.scss`.
4. **Component** (`tokens/_components.scss`, dark in `tokens/_components-dark.scss`): `--{component}-{property}-{variant}-{state}` — a per-component dial.

**Knobs** (`--btn-size`, `--section-*`, `--hero-*`) are NOT tokens: per-instance styling the consumer sets on the element, undefined by default, resolved via the `--_x: var(--x, default)` private pattern. Tokens theme the system; knobs style one element.

**Authoring test — when a component needs a value, stop at the first hit:**
1. A semantic token with the same MEANING exists (and behaves right in dark) → consume it.
2. The component needs its own dial — design retunes just this component, or the DGA sheet defines it → mint the component token (STRICT bar: dial-or-DGA-mandate only) and route its VALUE by meaning (below).
3. No meaning match, no dial needed → palette-direct `--colors-*`, whole family as a unit. Raw hex: never.

**Naming grammar:**
- Semantic: `--{property}-{role}-{modifier}-{state}`; property ∈ `background/text/border/icon/shadow/focus/controls`; modifiers are words with ONE fixed meaning (`light` = tinted wash, `strong` = deep emphasis, `oncolor` = on colored fill — always spelled `oncolor`, never `on-color`, placed last before state).
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
- `standard-page.md` — regular pages (uses `page`/`post`/`empty`/`minimal` layouts with sub hero)
- `subsite.md` — subsite home pages (uses `home` layout with hero slider)

## Adding New Components

**Phase 1: Build & test** — verify behavior in `playground.md` before registering anywhere.

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`
3. Add JS in `_js/nds-[name].js` if needed — follow the canonicals in `.claude/skills/nds-js-audit/PERSONA.md` (controller naming, `destroy()` teardown, lifecycle pair by concept, console prefix, init sentinel, `{ signal }` listeners) — then run `ruby _plugins/js_processor.rb`
4. Test the component in `playground.md` until behavior is correct

**Phase 2: Document & register** — only after Phase 1 verifies behavior.

5. Add documentation page: `components/[name].md` — use the `/nds-doc [name]` skill
6. Add to `_data/sidemenu/sidemenu.yml` under Components children
7. Add to the matching index data file so the page appears on its landing grid. Match an existing neighbor entry's keys (title, description, icon, category, tags, url) exactly rather than guessing the schema:
   - `components/` → `_data/content/components.yml`
   - `layout/` → `_data/content/layouts.yml` (if present)
   - `utilities/` → `_data/content/utilities.yml` (if present)
   - `examples/` → `_data/content/examples.yml`
   - `templates/` → `_data/content/templates.yml`
   Whenever you create a new doc page, check for a sibling YAML in `_data/content/` and add the entry there too.

## JS Bundles & Shrinking the Critical Bundle

**Three bundles, location owned by the build** (`@bundles` in `_plugins/js_processor.rb`): `nds-main.min.js` (a `<script defer>` — **gates the page reveal, keep lean**), `nds-delegated.min.js` + `nds-extras.min.js` (loader-INJECTED *after* the reveal, never gate it). The loader reads `window.__NDS_BUNDLES` (namespace→bundle, build-generated) — **never hardcode bundle membership in JS**. Run `ruby _plugins/js_processor.rb` after any `@bundles` or `_js/` change.

**To move init-unnecessary code off the reveal-gating path — de-criticalize + move (wholesale).** For a component that is *delegate-safe*: markup + always-loaded CSS paint it correctly with JS deleted (JS owns behavior, not first paint). Public usage (`NDS.X.method()`) stays unchanged via the loader's lazy proxy stub.
- Server-render any state JS stamps at first paint (e.g. accordion default-open ships `data-state="open"` on the button **and** the collapse so CSS paints it expanded — no JS, no CLS).
- Drop `critical: true` from its `_js/nds-loader.js` registry entry.
- Move its file from the main list to the delegated list in `@bundles`.
- Clicks in the pre-bundle gap no-op and recover on the next click (the Tabs/Tables pattern). Precedents: **Accordion**; **Filter + Pagination** (2026-06-11).
- State that only exists at runtime (e.g. filter URL params) can't be server-rendered — hold the region in blocking crit instead, the `data-nds-loaded` pattern per container: a crit rule keeps each `[data-filter-items]`/`.nds-paged-content` region `visibility: hidden` until **its own** init stamp lands (`data-nds-filter-initialized`/`data-paged-initialized`). Self-releasing, zero JS beyond the stamp the component already writes.
- Pre-init layout reservations belong in the component's **own main CSS**, keyed on its init stamp (e.g. pagination's empty-nav `min-height` until `data-paged-initialized`) — never mirrored into crit (the old crit skeleton doubled crit doing exactly that; see `_sass/_skeleton-bkp.bak`).

**Don't split a component into eager-shell + lazy-behavior halves.** A per-component split (a `nds-X__delegated.js` half grafted onto an eager shell via `_installBehavior`/trap stubs + `loadSplit`) was built for Filter/Mainnav/Stepper/Pagination and **removed 2026-06-04**: it saved only ~3 KB gz off main — which the reveal isn't byte-bound on — at the cost of a pre-attach promise-vs-sync gap and ~330 lines of mechanism + build guards + docs. If a `critical` component has init-unnecessary behavior, keep it in main and run that behavior **on interaction with cold-init** (cheap registration at init, no forced layout); wholesale-defer instead only if it's genuinely delegate-safe.

**Build guard fails on violation** — a `critical` component's code can't ship in an injected bundle (`assert_no_critical_in_injected!`): fix by dropping `critical: true` or moving the file back to the main list.

**Keep EAGER (never defer):** anything affecting first paint (CLS-prevention state stamps, FOUC-guard removal), the component's PRIMARY interaction, or a synchronous cross-component API (e.g. `NDS.Forms.validateForm` is read synchronously at submit). Defer only secondary/late paths.

## Content Skills

Use `/nds-doc [name]` to create, refine, or audit documentation pages under `components/`, `ui-shell/`, `layout/`, and `utilities/`. See its `SKILL.md` for full usage.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages
- Always propose the commit message and wait for explicit user approval before running `git commit` — never commit unreviewed
- Keep commit messages brief and to the point — short subject line, body only when the "why" isn't obvious from the diff