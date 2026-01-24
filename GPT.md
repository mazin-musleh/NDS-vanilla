# GPT.md — Guidance for GPT Assistants in this Repo

This document orients GPT-based coding assistants when working in this repository. It summarizes the stack, workflows, and conventions so future sessions can be productive immediately.

## Project Overview

- National Design System (NDS) documentation site built with Jekyll 4.4.1
- Vanilla JS modules compiled into a single minified bundle
- SCSS architecture with componentized partials and design tokens
- Arabic and English support, accessibility-focused components and demos

## Quick Start

Prereqs: Ruby (with Bundler), Node.js (with `npx`). On Windows, `wdm` is used for faster watch.

Commands:

```bash
# Install Ruby gems
bundle install

# Install JS tools (for Terser via npx)
npm install

# Build/serve Jekyll (port configured in _config.yml)
bundle exec jekyll build
bundle exec jekyll serve

# Build JS bundle once or watch for changes
ruby _plugins/js_processor.rb
ruby _plugins/js_processor.rb watch
```

Key configs:

- `_config.yml` — site metadata, port `4002`, Sass settings, exclude lists
- `package.json` — scripts for Jekyll build/serve, devDependency on `terser`
- `Gemfile` — Jekyll core gems and Windows helpers

## Repository Structure

- Content: `index.md`, `components/` (component docs/demos)
- Jekyll: `_layouts/`, `_includes/`, `_data/`
- Styles: `_sass/` partials; entry at `assets/css/nds-main.min.scss`
- JavaScript: source in `_js/`; bundled to `assets/js/`
- Build helper: `_plugins/js_processor.rb` (bundles + minifies with Terser)

## JavaScript Workflow

- Source files live in `_js/`
- Bundling/minification performed by `_plugins/js_processor.rb`
  - Output bundle: `assets/js/nds-main.min.js`
  - Requires Node + `npx terser` (install via `npm install`)
  - Watch mode available: `ruby _plugins/js_processor.rb watch`
- Pages include the bundle from `_layouts/default.html`

### Unified Initialization (`_js/nds-loader.js`)

The site uses a single orchestrator to initialize components based on DOM presence.

API:

```js
window.NDSInit.initialize();           // run (auto on DOM ready)
window.NDSInit.reinitialize();         // rerun detection + init
window.NDSInit.initializeComponent('tabs');
console.table(window.NDSInit.getStatus());
// config: window.NDSInit.config.enableLogging, enableTiming, staggerDelay
```

Registry entries have shape:

```js
{
  name: 'tabs',              // unique id
  priority: 3,               // lower runs earlier
  selector: '.nds-tabs',     // CSS to detect presence (omit if universal)
  init: () => window.NDSTabs?.init?.(),
  // universal: true         // optional: always run
}
```

When adding a component:

1) Expose a global with an `init()` (idempotent) in its source file, e.g. `window.NDSTooltip = { init() { … } }`.
2) Add an entry in `_js/nds-loader.js` with a sensible `priority` and `selector`.
3) Avoid separate `DOMContentLoaded` listeners or scattered timeouts in component files; let the orchestrator control order and batching.
4) Keep `init()` safe to run multiple times; prefer feature-detection and guard flags where appropriate.

## SCSS/CSS Guidelines

- Entry file: `assets/css/nds-main.min.scss` imports all partials under `_sass/`
- Add new component partials under `_sass/components/` and import from the entry file
- Use the existing tokens in `_sass/_variables.scss` and mixins in `_sass/_mixins.scss`
- Maintain the `.nds-` naming and current style conventions

Example partial header:

```scss
/**
 * NDS Component Name — SCSS
 */
@use '../mixins' as *;

.nds-component { /* styles */ }
```

To wire a new component stylesheet:

```scss
// in assets/css/nds-main.min.scss
@use 'components/your-component';
```

### Mixins and Breakpoints (from CLAUDE.md)

- Responsive mixins: `@include mobile`, `@include tablet(min|max)`, `@include desktop(min|max)`, `@include large-desktop(min|max)`
- Direction mixins: `@include rtl` and `@include ltr`
- Keep responsive styles mobile-first; override progressively at larger breakpoints

## Component Docs Pattern

- Author new docs under `components/`
- Follow the interactive demo pattern used in `components/tags.md`
- Prefer a single demo card with toggles over many near-identical examples
- Ensure code examples are wrapped in `code` blocks so the init system filters them out

Demo toggles (reference):

- State: `"selected"`, `"pressed"`, `"focused"`, `"disabled"`
- Style: `"nds-neutral"`, `"nds-primary"`, etc.
- Size: `"nds-sm"`, `"nds-md"`, `"nds-lg"`
- Icons: inject/remove HTML for leading/trailing icons
- Backgrounds: `"noBg"`, `"darkBg"`, `"containerBg"`

Data syntax examples:

- Class toggle: `data-toggler='["className", "targetSelector", "toggleGroup"]'`
- Content injection: `data-toggler='["<i class=\"hgi hgi-stroke hgi-icon icon\"></i>", ".nds-component", "components", "content-prepend"]'`

## Conventions & Quality

- JavaScript: vanilla ES6+, optional chaining allowed; keep modules strict and expose clean globals under `window.NDS*`
- Initialization: no per-file DOMContentLoaded; rely on `_js/nds-loader.js`
- Accessibility: ensure ARIA roles and keyboard support in interactive components
- Performance: avoid repeated DOM queries; the init system already batches lookups
- Logging: keep logs concise; use the orchestrator’s config flags to toggle

### Assistant Notes (Keep It Simple & DRY)

- Simplicity first: choose the simplest working approach; avoid over‑engineering.
- DRY: remove duplication and centralize repeated logic/selectors where possible.
- Be surgical: keep changes minimal and focused on the task scope.
- Prefer clear, readable code over cleverness; document intent only when necessary.
- Always use design tokens from `_sass/_variables.scss` for colors, spacing, typography, sizing, shadows, and z-index where defined. Do not hardcode values; if a token is missing, add it there first.

Typography & Icons:

- Primary font: IBM Plex Sans Arabic (served from `assets/fonts`)
- Icon system: HGI Stroke/Rounded families (CSS at `assets/css/hgi-*.css`)

## Troubleshooting

- `jekyll serve` requires gems: run `bundle install`; Windows uses `webrick`, `wdm`
- JS bundling errors mentioning Terser: run `npm install` to ensure `terser` is available to `npx`
- If pages render without JS behavior, confirm `assets/js/nds-main.min.js` is present and `_layouts/default.html` includes it
- If a new component isn’t initializing, check `window.NDSInit.getStatus()` for presence and availability

## Common Tasks (Recipes)

Add a JS component:

1) Create `_js/nds-yourFeature.js` and expose `window.NDSYourFeature.init()`
2) Register it in `_js/nds-loader.js` with selector/priority
3) Rebuild bundle: `ruby _plugins/js_processor.rb`

Add a component page:

1) Create `components/your-component.md` with front matter using `layout: page`
2) Use the demo card + toggles pattern
3) Serve locally and verify

Ship a style addition:

1) Add `_sass/components/_your-component.scss`
2) Import it from `assets/css/nds-main.min.scss`
3) Rebuild site and verify

## Notes

- `_config.yml` sets `port: 4002`; update if needed locally
- `baseurl` is configured for the current deployment expectations; change with care as it affects asset URLs
- This file (`GPT.md`) is excluded from site output in `_config.yml`

Additional reference from `_layouts/default.html`:

- Scripts included: `assets/js/nds-main.min.js` (core) and `assets/js/nds-showcase.min.js` (demos/toggles)
