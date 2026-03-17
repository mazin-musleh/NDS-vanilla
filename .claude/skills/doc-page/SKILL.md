---
name: doc-page
description: Work with NDS component/page documentation — create new pages, refine existing ones, add sections, fix code tabs, update guidelines, or any task involving doc pages. Use this skill whenever the task involves a component documentation page (components/*.md), demo cards, code examples, toggle controls, or usage guidelines sections.
argument-hint: "[component-name] [optional: specific task]"
---

# NDS Documentation Page

Apply this skill to: `$ARGUMENTS`

**Creating a new page**: if the arguments specify a component name only, create the full page.
**Refining an existing page**: if `components/$0.md` exists, preserve working content and fix gaps against this skill's patterns. Do not rewrite sections that already follow the patterns correctly.
**Targeted edit**: if the arguments include a specific task (e.g., `modal add JS API section`), do only that task using the relevant patterns below.

## Core Principles

- Every code example must **work immediately** when copy-pasted — no missing dependencies, no placeholder text
- Use **plain language** in descriptions — avoid design-system jargon
- Consistent, predictable page structure across all component pages
- Pages serve as a **copy-paste library** — cover all component variants and states with real, working examples

## Before Starting

1. **Read reference files** for current patterns:
   - `layout/section.md` — section hierarchy, tiers, content layout
   - `components/alert.md` — BASE STANDARD for page structure and demo cards
   - `components/tags.md` — reference for interactive demo toggles
   - `standard-page.md` — front matter template
2. **Read the existing page** (`components/$0.md`) if it exists — preserve working content, fix gaps against this skill's patterns
3. **Read the component's SCSS** (`_sass/components/_$0.scss`) — extract every variant class, size, state, and accessibility feature (`@include reduced-motion`, `@include high-contrast`, `@include print-media`). The page must document all of these.
4. **Read the component's JS** (`_js/nds-$0.js` or search `_js/` for matching file) — extract every public API method on `window.NDS*` and on the instance (e.g., `destroy()`, `getOpenItems()`), every custom event and its `detail` shape, how to access an existing instance from the DOM (e.g., `element.ndsAccordionInstance`), and every key in `handleKeyDown`. The page must document all of these.
5. **Check `playground.md`** for existing demo HTML (if available) — use as authoritative HTML structure
6. **Check `_data/sidemenu/sidemenu.yml`** for registration
7. **Look up icons** in `_sass/_hgiRoundedStroke.scss` — search for contextually appropriate icon names (e.g., warning for alerts, search for search bars). **NEVER guess icon class names.**

## Front Matter

All documentation pages are **English, LTR**. Always set `lang: en` and `direction: ltr` in front matter.

Use `standard-page.md` as template. Do NOT use `layout_class: cardView` or `topSubMenu`.

## Page Structure

```
Section 1: Overview / Main Demo → demo cards with toggle controls
Section 2: Variants (if applicable)
Section 3: Sizes (if applicable)
Section 4: States (if applicable)
Section 5: Usage Guidelines → content blocks with guidance + JS API (if applicable)
```

Get section, demo card, and code tab HTML structure from `components/alert.md`.

### Variant organization

- **Simple class-based variants** (style, size): use `data-toggler` buttons within a single demo card
- **Structurally different variants** (different HTML structure): separate demo cards with their own code examples
- Cover **all** component variants and states — every variant the SCSS defines should appear on the page

## Toggle System

Use `data-toggler` on demo action buttons instead of separate demo cards per variation. Get the HTML pattern from `components/tags.md`.

### Format

```
Single:  data-toggler='["value", ".target", "toggleGroup", "operation", "action"]'
Multi:   data-toggler='[["value", ".target", "group", "op", "action"], [...]]'
```

**Parameters:**
1. **value** — class names, attribute string (`attr=val`), or HTML content
2. **target** — CSS selector, scoped to `.demo-container` + `.code-example` within same `.nds-demo-card`
3. **toggleGroup** — mutual exclusion key (one active per group per card)
4. **operation** — `class` (default), `attr`, `data-state`, `prop`, `content-prepend`, `content-append`
5. **action** — `add`, `remove`, or omit for toggle (only for `class` operation)

### Common patterns

| Purpose | Example |
|---------|---------|
| Style variant | `'["nds-outline", ".nds-tag", "styleToggle"]'` |
| Size | `'["nds-sm", ".nds-tag", "sizeToggle"]'` |
| Icon prepend | `'["<i class=\"hgi hgi-stroke hgi-icon icon\"></i>", ".nds-tag", "iconToggle", "content-prepend"]'` |
| Attribute toggle | `'["data-status=success", ".nds-alert", "alertVariant", "attr"]'` |
| Boolean prop | `'["indeterminate", ".nds-checkbox", "propToggle", "prop"]'` |

Buttons auto-scope to parent `.nds-demo-card`, handle mutual exclusion, and sync `<code>` blocks automatically.

## Demo Content

Use curated content from `_data/content/` YAML files for demo text, titles, descriptions, and icons. This ensures demos look polished with real, verified content instead of ad-hoc placeholders.

- **Check existing files** in `_data/content/` first (e.g., `services.yml` has titles, icons, descriptions)
- **Create new YAML files** in `_data/content/` when a component needs content that doesn't exist yet (e.g., `notifications.yml`, `users.yml`, `table-rows.yml`)
- Follow the same structure as `services.yml` — each entry should have contextually appropriate fields and verified icon classes
- Reference content directly in demo HTML — do not invent placeholder text like "Lorem ipsum" or "Sample title"

## Code Examples

Code tabs in demo cards are for **copy-paste implementation code only** — NOT documentation or API reference.

- **Code must be production-ready markup** — what users would actually write in their project (no demo wrappers, no showcase classes)
- **Code must reflect the demo** — same component structure, classes, and attributes as the rendered demo
- **Use unique IDs** per demo card: `{component}-{variant}-{number}` (e.g., `modal-default-1`, `alert-success-2`) to avoid conflicts when users copy multiple examples
- **HTML tab**: markup to render the component
- **JS tab**: only when JS is **required** to create/initialize the component (e.g., `NDSChart.create()`, `NDSAlert.create()`). Do NOT add a JS tab for optional JS — document it in Usage Guidelines instead
- For long code (>15 lines), add `nds-expandable` to the tab panel and wrap `<code>` in `<div class="nds-expandable-content">`

## Overlay & Trigger Components

Modal, drawer, dropmenu need a **trigger button** + hidden component markup inside `.state-demo`. Check the component's JS for trigger attribute (e.g., `data-modal-target`, `data-drawer-target`). Toggle buttons in `.demo-action` still work via `data-toggler` on the hidden component. See `components/modal.md` for the pattern.

## Custom JS Showcase

For demos needing JS beyond `data-toggler`. Any demo-wiring JS goes in `_js/nds-showcase.js` — NOT the component's own JS file.

### When to use which pattern

| Scenario | Approach |
|----------|----------|
| Component needs JS to exist (chart, programmatic alerts) | Page-level `<script>` at end of page + multi-tab code (HTML + JS tabs) |
| Toggle needs logic beyond class/attr | Inline `<script>` inside demo card, button uses `onclick`, scope with `button.closest('.nds-demo-card')` |
| JS action API demo (dismiss, create) | Action buttons inside `.state-demo` with `onclick` or `data-action` |
| Optional JS control (modal open/close) | Document in Usage Guidelines as standalone `nds-code` block, NOT in demo tabs |
| Standard visual toggles | `data-toggler` only, no custom JS |

For page-level scripts, wrap in `DOMContentLoaded`. For inline scripts, toggle `selected` class on button and update `<code>` innerHTML to keep code in sync.

## JS Initialization & API Documentation

### How auto-init works

`nds-loader.js` manages all component initialization automatically. It maintains a registry of components — each entry maps a CSS selector (e.g., `.nds-accordion`) to an init function (e.g., `window.NDSAccordion.init()`). On DOMContentLoaded, the loader scans the page for matching selectors and calls each component's init function if its elements exist. Components are initialized in priority order with a small stagger delay between them.

This means **users never need to call init manually** — just adding the correct HTML markup is enough. The loader handles everything.

For dynamically added content, each component exposes a `reinit()` method to re-scan and initialize new instances. There is also a global `NDSInit.reinitialize()` that re-runs all components, and `NDSInit.initializeComponent('name')` to target a specific one.

### Tiered documentation approach

1. **Read the component's JS file** (`_js/nds-$0.js`) and look for `window.NDS*` exports — these are the public APIs
2. **All components with JS**: add a note in Usage Guidelines explaining that the component initializes automatically when the HTML is on the page — no script tags or init calls needed. For dynamic content, mention `reinit()`
3. **Components with a public API** (methods like `open()`, `close()`, `create()`, or custom events): add a full JS API section in Usage Guidelines with a standalone `nds-code nds-expandable` block. Use inline comments to explain methods and events. See `components/modal.md` for an example

## Content Blocks (Usage Guidelines)

Use `nds-content-block` with `nds-block-title` for text guidance. Get HTML structure from `components/alert.md`.

Every component page must include these blocks in this order:

1. **Built-in Features** — what the component gives you out of the box (animations, keyboard nav, auto-init, accessibility, print support, events, etc.). Derived from the SCSS and JS source files. This sells the component. For components with JS, state that the component auto-initializes when the loader detects the component's root selector on the page (e.g., "Auto-initializes when `.nds-accordion` is on the page — no JavaScript setup required").
2. **When to Use** — decision guidance: when to pick this component vs alternatives, what it's good for, what to avoid using it for, and any content tips (e.g., keep titles scannable).
3. **JavaScript API** (if the component has JS) — auto-init note + expandable code block with full API.

Do NOT document things the user already gets from copying the code examples (ARIA attributes, semantic structure) or from the live demo toggles (configuration classes, sizes). Focus on what users can't see — the component's capabilities and decision guidance.

Rules:
- Use raw HTML inside `<code>` blocks — never HTML entities
- Do NOT use inline `<code>` tags in descriptions

## Dark Mode

Do NOT add custom background classes (`.dark-bg`, `.green-bg`, `.black-bg`) to demo containers. Design tokens handle light/dark mode automatically via the global `data-theme` toggle. Do not add demo-specific style overrides — use existing components and token-based styling only.

## Registration Checklist

1. **New components only**: create SCSS file, add `@use` to `assets/css/nds-main.min.scss` (skip for existing components)
2. **Sidemenu**: add to `_data/sidemenu/sidemenu.yml` under correct parent
3. **Build test**: run `bundle exec jekyll build`
4. **Tab/Panel IDs**: use `panel-{component}-{variant}-{number}` / `tab-{component}-{variant}-{number}` pattern
