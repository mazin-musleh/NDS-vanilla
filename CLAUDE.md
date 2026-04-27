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

## Content Skills

Use `/nds-doc [name]` to create, refine, or audit documentation pages under `components/`, `ui-shell/`, `layout/`, and `utilities/`. See its `SKILL.md` for full usage.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages
- Always propose the commit message and wait for explicit user approval before running `git commit` — never commit unreviewed
- Keep commit messages brief and to the point — short subject line, body only when the "why" isn't obvious from the diff