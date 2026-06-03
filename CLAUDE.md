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

**Token hierarchy** — always prefer higher levels:
1. **Component tokens**: `--{component}-{property}-{variant}-{state}` (e.g. `--button-background-primary-default`)
2. **Semantic tokens**: `--background-{variant}-{shade}`, `--border-{variant}-{state}`, `--text-{variant}-{state}`
3. **Color tokens**: `--colors-*` — only referenced indirectly through component tokens

**NEVER** use hex colors or `--colors-*` tokens directly in components.
**New component tokens** → add to `_variables.scss`, include all states: default, hovered, pressed, selected, focused, disabled. Add on-color variants for dark backgrounds.

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
3. Add JS in `_js/nds-[name].js` if needed, then run `ruby _plugins/js_processor.rb`
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

**Two levers move init-unnecessary code off the reveal-gating path** (both keep public usage — `NDS.X.method()` — unchanged):

**1. De-criticalize + move (wholesale)** — for a component that is *delegate-safe*: markup + always-loaded CSS paint it correctly with JS deleted (JS owns behavior, not first paint).
- Server-render any state JS stamps at first paint (e.g. accordion default-open ships `data-state="open"` on the button **and** the collapse so CSS paints it expanded — no JS, no CLS).
- Drop `critical: true` from its `_js/nds-loader.js` registry entry.
- Move its file from the main list to the delegated list in `@bundles`.
- Clicks in the pre-bundle gap no-op and recover on the next click (the Tabs/Tables pattern). Precedent: **Accordion**.

**2. Split (eager shell + lazy behavior)** — for a `critical: true` component that must keep a first-paint shell but has init-unnecessary behavior.
- `nds-X.js` (eager shell, **stays in main**): owns/creates `NDS.X`, does first-paint work, wires listeners, exposes the public API. For each deferred entry-point, add a *trap* method that queues the call, calls `NDS.loadSplit('X')`, and replays on attach.
- `nds-X__delegated.js` (behavior half, **add to the delegated `@bundles` list**): its own IIFE; calls `NDS.X._installBehavior(factory)` and **NEVER reassigns `NDS.X`**. `_installBehavior` grafts the methods (onto the class prototype or a shared methods object) and replays queued calls; it is idempotent.
- The half is invisible to `__NDS_BUNDLES` (the build skips `*__delegated.js` when scanning namespaces); only `window.__NDS_SPLIT` routes `loadSplit` to it. Precedent: **Filter** (AJAX form-submission cluster).
- **Announce the split in BOTH files.** Start each with a `// SPLIT COMPONENT — EAGER SHELL` / `// LAZY BEHAVIOR HALF` header stating its bundle, what it owns vs defers, the `_installBehavior`/trap contract, and a pointer back here — so a maintainer or AI opening either file sees the boundary and rules immediately.

**The build guard fails on violation** (`assert_no_critical_in_injected!` / `assert_splits_valid!`): a `critical` component's MAIN code can't ship in an injected bundle; a `*__delegated.js` half's eager shell must be in main, the half must not reassign `NDS.X`, and `X` must be a registry entry.

**Keep EAGER (never defer):** anything affecting first paint (CLS-prevention state stamps, FOUC-guard removal), the component's PRIMARY interaction, or a synchronous cross-component API (e.g. `NDS.Forms.validateForm` is read synchronously at submit). Defer only secondary/late paths.

## Content Skills

Use `/nds-doc [name]` to create, refine, or audit documentation pages under `components/`, `ui-shell/`, `layout/`, and `utilities/`. See its `SKILL.md` for full usage.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages
- Always propose the commit message and wait for explicit user approval before running `git commit` — never commit unreviewed
- Keep commit messages brief and to the point — short subject line, body only when the "why" isn't obvious from the diff