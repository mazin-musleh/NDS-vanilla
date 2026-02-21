# CLAUDE.md

## Project Overview

**National Design System for Saudi Arabia** — Jekyll 4.4.1 static site documenting a government design system.
RTL (Arabic) by default, with LTR (English) support. Font: IBM Plex Sans Arabic. Icons: HGI Stroke Rounded.

## Commands

```bash
bundle exec jekyll serve      # Dev server (port 4002, auto-displays network IP)
npm start                     # Alternative
bundle exec jekyll build      # Production build → _site/
ruby _plugins/js_processor.rb # REQUIRED after any _js/ changes (bundles & minifies → assets/js/*.min.js)
ruby _plugins/baseurl_cleaner.rb      # Strip /_site baseurl prefix for root-domain deploys
ruby _plugins/baseurl_cleaner.rb dry  # Dry run
```

## Project Structure

```
_layouts/          Page templates (default, page, home, post, minimal, empty)
_includes/         Reusable HTML components (hero, mainNav, sideMenu, footer, etc.)
_sass/
  _variables.scss  Design tokens (component, semantic, color)
  _mixins.scss     Responsive, LTR, accessibility mixins
  _base.scss       Foundations
  _animations.scss Keyframe animations
  components/      Component SCSS files
  layout/          Layout SCSS files (contentLayout, section, sectionLayout)
assets/
  css/             Compiled CSS (nds.critical.min, nds-main.min, nds-showcase.min)
  js/              Compiled JS (nds-main.min, nds-showcase.min)
  fonts/           Web fonts
  img/             Images
_js/               JS source files (process with js_processor before deploy)
_data/             Data files organized by category:
  mainnav/           Main navigation + branding overrides
  sidemenu/          Side navigation menus
  footer/            Footer content
  footerlogos/       Footer logos
  hero/              Hero sliders & hero actions
  content/           Page content data (services, etc.)
_plugins/          Build scripts (js_processor.rb, baseurl_cleaner.rb)
_site/             Generated output (gitignored)
```

## Files to Ignore

- **NEVER read** `assets/css/hgi-stroke-rounded.css` (large icon font)
- **NEVER read** any `.min.js` or `.min.css` files (minified output)

## RTL/LTR Support (CRITICAL)

**RTL is the default.** There is NO `@include rtl` mixin. Write base styles for RTL.

**Prefer CSS Logical Properties** — they auto-adapt to text direction:
```scss
// GOOD — automatic RTL/LTR
margin-inline-start: var(--spacing-md);  padding-inline: var(--spacing-sm);
border-inline-start: 1px solid;          text-align: start;
inset-inline-start: 0;

// AVOID — physical properties need manual LTR overrides
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
- `@include mobile` — max: 600px
- `@include tablet` — 601px–960px | `tablet(min)` — 601px+ | `tablet(max)` — max: 960px
- `@include desktop` — 961px–1280px | `desktop(min)` — 961px+ | `desktop(max)` — max: 1280px
- `@include large-desktop` — 1344px+ | `large-desktop(max)` — max: 1920px

**Accessibility mixins:**
- `@include high-contrast` — `prefers-contrast: high`
- `@include reduced-motion` — `prefers-reduced-motion: reduce`
- `@include print-media` — print styles

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
// CORRECT
background-color: var(--component-background-primary-default);
&:hover { background-color: var(--component-background-primary-hovered); }

// NEVER use hex colors or --colors-* tokens directly in components
```

**Existing token patterns:**
- Buttons: `--button-background-{variant}-{state}`, `--button-label-{variant}-{state}`
- Tags: `--tag-background-{variant}`, `--tag-text-{variant}`, `--tag-border-{variant}`
- Chips: `--chip-background-{variant}-{state}`, `--chip-text-{variant}-{state}`

**New component tokens** → add to `_variables.scss`, include all states: default, hovered, pressed, selected, focused, disabled. Add on-color variants for dark backgrounds.

**Typography:**
- Font weight: use numbers directly (`400`, `500`, `600`, `700`) — never tokens or keywords
- Font size: use `--nds-text-{xs|sm|md|lg|xl}-FS` and matching `-LH` for line-height

## Section & Grid Structure (CRITICAL)

All page content is built from sections. Every section follows this nesting:

```html
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Optional description.</p>
        </div>
        <div class="nds-section-action">
            <!-- optional action buttons -->
        </div>
        <div class="nds-section-content">
            <!-- all content goes here -->
        </div>
    </div>
</section>
```

**Nesting rules:**
- `nds-content-section` — grid container (auto-centers content, max-width `--nds-content-MaxWidth: 1280px`)
- `nds-section-wrapper` — flex wrap container (`--section-col-gap`, `--section-row-gap`)
- `nds-section-head` — title + description (flex: 1)
- `nds-section-action` — buttons area (flex: 1, full-width on mobile)
- `nds-section-content` — all content (flex: 1 1 100%). Children (p, ul, ol, tables, tabs, code) get automatic `margin-block-end: 1rem`

**Section variants:**
- `.nds-blue`, `.nds-green`, `.nds-neutral`, `.nds-brand` — color backgrounds
- `.noBg` or `.nds-ghost` — remove background
- `.nds-horizontal` — side-by-side layout (grid, desktop only)
- Use `nds-full-width` on a direct child to break out to full viewport width

**Content blocks** (for text, guidelines, docs inside `nds-section-content`):
```html
<div class="nds-content-block">
    <h3 class="nds-block-title">Title</h3>
    <p>Content goes directly here — no extra wrappers.</p>
</div>
```
- `nds-block-title` is optional — blocks work without a title
- Title tokens: `--block-title-FS`, `--block-title-LH`, `--block-title-FW`, `--block-title-MB`, `--block-title-color`
- Use for guidelines, accessibility info, and any titled content sections — **do NOT use** `guidelines-grid`, `guideline-item`, `accessibility-info`, or `comparison-item`

**Grid utility** (`nds-grid`) for multi-column layouts inside `nds-section-content`:
```html
<div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>
```
- Default: 12-column grid with `--gap: --spacing-2xl`
- Custom properties: `--max-col` (desktop), `--mid-col` (tablet), `--min-col` (mobile)
- Column span classes: `.col-1` through `.col-12`, `.col-full` (responsive: `.col-md-*`, `.col-lg-*`, `.col-xl-*`)

**Layout modifiers** (set via `layout_class` front matter):
- `cardView` — card styling on sections (shadow, border-radius, smaller padding/titles)
- `topSubMenu` — sub-navigation above content
- `nds-middle` — vertically centered content
- `toEdge` — full-width, no max-width constraint

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

**Two base templates** — copy the appropriate one and fill in your values:
- `standard-page.md` — for regular pages (components, docs, utilities). Uses `page`/`post`/`empty`/`minimal` layouts with sub hero.
- `subsite.md` — for subsite home pages (universities, ministries). Uses `home` layout with hero slider.

**Data overrides:** Pages specify which data file to use via front matter keys (`mainnav`, `sidemenu`, `footer`, `footerlogos`, `heroaction`, `herosliders`). Includes look up `site.data.{category}[key]` — e.g. `mainnav: mainnav-alumni` loads `_data/mainnav/mainnav-alumni.yml`. Defaults come from `_config.yml`.

**Hero actions** (`_data/hero/heroaction*.yml`) — controls hero section buttons and share placement:
- `tags` — tag badges below the hero title
- `actions` — standard CTA buttons (sibling of `nds-section-head`)
- `float_actions` — float action buttons (first child of `nds-section-head`, floats inline-end)
- `share` keyword in either array renders the share dropmenu at that position; omit to hide

`float_actions` supports two formats:
```yaml
# Simple array
float_actions:
  - share

# Object with class modifier
float_actions:
  class: "nds-minimal"
  items:
    - share
    - label: "Bookmark"
      url: "#"
      icon: "hgi-bookmark-01"
```
Float action class modifiers: `nds-minimal` (hides labels on mobile, icon-only), `nds-wrap` (allow wrapping).

Resolution: `page.hero_float_actions` → `hero_data.float_actions` → none. Same for `actions` and `tags`.

## Adding New Components

1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`
3. Add documentation page: `components/[name].md` with `breadcrumb: ["Components"]`
4. Add to `_data/sidemenu/sidemenu.yml` under Components children
5. Add to `_includes/` if reusable across pages
6. Use `nds-` prefix for all class names

## Git Commits

- Do NOT add `Co-Authored-By` lines to commit messages

## JavaScript

- Source: `_js/` directory → processed by `ruby _plugins/js_processor.rb` (Terser) → `assets/js/*.min.js`
- **Always run the processor manually** after JS changes
- Bundles: `nds-main.min.js` (core — 34 files bundled), standalone files processed individually (e.g. `nds-showcase.min.js`)

## CSS Architecture

Three CSS layers loaded in order:
1. `nds.critical.min.css` — Above-the-fold styles (fonts, base, hero, breadcrumb, sideMenu, contentLayout, buttons, avatar)
2. `nds-main.min.css` — All remaining component styles
3. `nds-showcase.min.css` — Demo/showcase styles (excluded with `exclude_showcase: true`)

## Figma MCP Integration

MCP server: `claude mcp add --transport sse figma http://127.0.0.1:3845/sse`

**Tools:** `mcp__figma__get_metadata` → `mcp__figma__get_code` / `mcp__figma__get_image` / `mcp__figma__get_variable_defs`

Always pass `clientFrameworks: "jekyll"`, `clientLanguages: "html,css,scss,javascript"`.
Figma outputs React/Tailwind — convert to NDS Jekyll patterns (`nds-` naming, existing SCSS variables, RTL support).
