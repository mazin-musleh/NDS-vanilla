# CLAUDE.md

## Project Overview

**National Design System for Saudi Arabia** — Jekyll 4.4.1 static site documenting a government design system.
RTL (Arabic) by default, with LTR (English) support. Font: IBM Plex Sans Arabic. Icons: HGI Stroke Rounded.

## Commands

```bash
bundle exec jekyll serve      # Dev server (port 4002, auto-displays network IP for mobile testing)
npm start                     # Alternative
bundle exec jekyll build      # Production build → _site/
ruby _plugins/js_processor.rb # REQUIRED after any _js/ changes (bundles & minifies → assets/js/*.min.js)
ruby _plugins/baseurl_cleaner.rb      # Strip /_site baseurl prefix for root-domain deploys
ruby _plugins/baseurl_cleaner.rb dry  # Dry run
```

## Key Directories

- `_layouts/` — Page templates | `_includes/` — Reusable HTML components
- `_sass/` — SCSS source (`_variables.scss` tokens, `_base.scss` foundations, `_mixins.scss`, `components/`)
- `assets/` — CSS, fonts, images, JS | `_js/` — JS source files (process before deploy)
- `_data/sidemenu.yml` — Side navigation config | `_site/` — Generated output (gitignored)

## Files to Ignore

- **NEVER read** `assets/css/hgi-stroke-rounded.css` (large icon font)
- **NEVER read** any `.min.js` or `.min.css` files (minified output)

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.

**Prefer CSS Logical Properties** — they auto-adapt to text direction:
```scss
// ✅ GOOD — automatic RTL/LTR
margin-inline-start: var(--spacing-md);  padding-inline: var(--spacing-sm);
border-inline-start: 1px solid;          text-align: start;
inset-inline-start: 0;

// ❌ AVOID — physical properties need manual LTR overrides
margin-left: var(--spacing-md);  text-align: right;
```

**Use `@include ltr` ONLY** for transforms, gradients, or properties logical props don't cover:
```scss
.nds-component {
    transform: translateX(10px); // RTL default
    @include ltr { transform: translateX(-10px); }
}
```

## SCSS Standards

**Every component file must start with:**
```scss
@use '../mixins' as *;
```

**Responsive mixins** (`_sass/_mixins.scss`):
- `@include mobile` (max: 599px) | `@include tablet(min|max)` (600–959px)
- `@include desktop(min|max)` (960–1279px) | `@include large-desktop(min|max)` (1280px+)
- `@include ltr` — LTR overrides only (see above)

**Standard component structure:**
```scss
@use '../mixins' as *;
.nds-component { /* base styles, logical properties */ }
.nds-sm { }  .nds-md, .nds-component { }  .nds-lg { }  // Sizes
.nds-primary { }  .nds-neutral { }                       // Variants
@include mobile { .nds-component { } }                    // Responsive
```

## Design Tokens (CRITICAL)

**Token hierarchy** — always prefer higher levels:
1. **Component tokens**: `--{component}-{property}-{variant}-{state}` (e.g. `--button-background-primary-default`)
2. **Semantic tokens**: `--background-{variant}-{shade}`, `--border-{variant}-{state}`, `--text-{variant}-{state}`
3. **Color tokens**: `--colors-*` — only referenced indirectly through component tokens

```scss
// ✅ CORRECT
background-color: var(--component-background-primary-default);
&:hover { background-color: var(--component-background-primary-hovered); }

// ❌ NEVER use hex colors or --colors-* tokens directly in components
```

**Existing token patterns:**
- Buttons: `--button-background-{variant}-{state}`, `--button-label-{variant}-{state}`
- Tags: `--tag-background-{variant}`, `--tag-text-{variant}`, `--tag-border-{variant}`
- Chips: `--chip-background-{variant}-{state}`, `--chip-text-{variant}-{state}`

**New component tokens** → add to `_variables.scss`, include all states: default, hovered, pressed, selected, focused, disabled. Add on-color variants for dark backgrounds.

**Typography:**
- Font weight: use numbers directly (`400`, `500`, `600`, `700`) — never tokens or keywords
- Font size: use `--nds-text-{xs|sm|md|lg|xl}-FS` and matching `-LH` for line-height

## Component HTML Patterns

**Button structure:**
```html
<button class="nds-btn nds-primary nds-lg">
    <i class="hgi hgi-stroke hgi-plus-sign"></i>  <!-- optional icon -->
    <span class="label">Button Text</span>
</button>
```
- Trailing icon: add `nds-trail-icon` class
- Dark backgrounds: add `nds-oncolor` | Destructive: add `nds-destructive`
- Icon-only: include proper ARIA labels

**Section content block structure:**
```html
<div class="nds-section-content">
    <div class="nds-content-block">
        <h3 class="nds-block-title">Title</h3>
        <p>Content goes directly here — no extra wrappers.</p>
    </div>
</div>
```
- `nds-content-block` groups content inside `nds-section-content` (paragraphs, lists, media get automatic styling)
- `nds-block-title` is optional — blocks work without a title
- Title tokens: `--block-title-FS`, `--block-title-LH`, `--block-title-FW`, `--block-title-MB`, `--block-title-color`
- Use for guidelines, accessibility info, and any titled content sections — **do NOT use** `guidelines-grid`, `guideline-item`, `accessibility-info`, or `comparison-item`

**Multi-language front matter:**
```yaml
lang: en
direction: ltr
```

## Component Demo Standards

**Use `components/alert.md` as the BASE STANDARD** for creating documentation pages. It is the best example of page structure, demo cards, and code examples.

**Use `components/tags.md` as the reference** for interactive demo toggles. Use demo action toggles instead of separate demo cards per variation.

**Toggle syntax:** `data-toggler='["value", "targetSelector", "toggleGroup"]'`
- Class toggle: `'["selected", ".nds-tag", "tagState"]'`
- Content injection: `'["<i class=\"hgi ...\"></i>", ".nds-tag", "icons", "content-prepend"]'`
- Toggle groups prevent conflicts (e.g. only one size active)

**Toggle categories:** State (`selected`, `disabled`), Style (`nds-neutral`), Size (`nds-sm`, `nds-lg`), Icon (content-prepend), Background (`noBg`, `darkBg`)

**NEVER use inline `<code>` tags** inside table cells or descriptions for small words. Only use `<code class="lang-html code">` blocks for actual copyable code examples.

**Code examples use raw HTML** inside `.nds-code <code>` blocks — never use HTML entities (`&lt;`, `&gt;`). Write `<div>` not `&lt;div&gt;`. Entities are still needed outside code blocks (e.g. `&lt;nav&gt;` in text labels).

**Demo card structure** — see `components/tags.md` for full reference. Key classes: `.nds-demo-card` > `.demo-header` + `.demo-container` > `.state-demo`, with `.nds-tabs.nds-code` for code examples.

## Creating New Pages

**Use `standard.md` as the base template** — it contains all available front matter variables with example values and inline comments. Copy it and fill in your values.

## Adding New Components

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Import in main stylesheet
3. Add documentation page: `components/[name].md` with `breadcrumb: ["Components", "Name"]`
4. Add to `_data/sidemenu.yml` under Components children
5. Add to `_includes/` if reusable across pages
6. Use `nds-` prefix for all class names

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages

## JavaScript

- Source: `_js/` directory → processed by `ruby _plugins/js_processor.rb` (Terser) → `assets/js/*.min.js`
- **Always run the processor manually** after JS changes
- Output bundles: `nds-main.min.js` (core), `nds-showcase.min.js` (demos)

## Figma MCP Integration

MCP server: `claude mcp add --transport sse figma http://127.0.0.1:3845/sse`

**Tools:** `mcp__figma__get_metadata` → `mcp__figma__get_code` / `mcp__figma__get_image` / `mcp__figma__get_variable_defs`

Always pass `clientFrameworks: "jekyll"`, `clientLanguages: "html,css,scss,javascript"`.
Figma outputs React/Tailwind — convert to NDS Jekyll patterns (`nds-` naming, existing SCSS variables, RTL support).
