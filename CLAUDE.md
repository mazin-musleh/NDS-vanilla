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

- **NEVER read** `assets/css/hgi-stroke-rounded.css` (large icon font)
- **NEVER read** any `.min.js` or `.min.css` files (minified output)

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.
**Prefer CSS Logical Properties** (`margin-inline-start`, `padding-inline`, `inset-inline-start`, `text-align: start`) — they auto-adapt to text direction.
**Use `@include ltr` ONLY** for transforms, gradients, or properties logical props don't cover.

## SCSS Standards

**Every component file must start with** `@use '../mixins' as *;`

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

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`
3. Add to `_includes/` if reusable across pages
4. Use `nds-` prefix for all class names
5. Use `playground.md` to test new components
6. Add documentation page: `components/[name].md` — use `/doc-page [name]` skill after testing
7. Add to `_data/sidemenu/sidemenu.yml` under Components children

## Content Skills

Four skills handle all content creation and quality assurance:

| Skill | Purpose |
|-------|---------|
| `/doc-page [name]` | Create, refine, or audit documentation pages (`components/`, `ui-shell/`, `layout/`, `utilities/`) |
| `/example-page [name]` | Create, refine, or brainstorm example and promotional pages (`examples/`, homepage) |
| `/demo-content [name]` | Create YAML demo data files in `_data/content/` on demand |
| `/content-review [audit\|icons\|coverage]` | Site-wide health checks — broken icons, placeholder text, undocumented components, sidemenu coherence |

Each skill's `SKILL.md` has full usage details. All four are independent — use any without the others.

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages