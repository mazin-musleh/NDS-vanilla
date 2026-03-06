---
name: doc-page
description: Work with NDS component/page documentation — create new pages, refine existing ones, add sections, fix code tabs, update guidelines, or any task involving doc pages. Use this skill whenever the task involves a component documentation page (components/*.md), demo cards, code examples, toggle controls, or usage guidelines sections.
argument-hint: "[component-name] [optional: specific task]"
---

# NDS Documentation Page

Apply this skill to: `$ARGUMENTS`

If the arguments specify a component name only, create or fully refine the page. If they include a specific task (e.g., `modal add JS API section`), do only that task using the relevant patterns below.

## Before Starting

1. **Read reference files** for current patterns:
   - `layout/section.md` — section hierarchy, tiers, content layout
   - `components/alert.md` — BASE STANDARD for page structure and demo cards
   - `components/tags.md` — reference for interactive demo toggles
   - `standard-page.md` — front matter template
2. **Read the existing page** (`components/$0.md`) if it exists — preserve working content, fix gaps against this skill's patterns
3. **Read the component's SCSS** (`_sass/components/_$0.scss`) for variants, sizes, states
4. **Read the component's JS** (`_js/$0.js` or similar) for API, methods, events — determines if demos need custom JS
5. **Check `playground.md`** for existing demo HTML — use as authoritative HTML structure
6. **Check `_data/sidemenu/sidemenu.yml`** for registration

## Front Matter

Use `standard-page.md` as template. Do NOT use `layout_class: cardView` or `topSubMenu`.

## Page Structure

```
Section 1: Overview / Main Demo → demo cards with toggle controls
Section 2: Variants (if applicable)
Section 3: Sizes (if applicable)
Section 4: States (if applicable)
Section 5: Usage Guidelines → content blocks with guidance
```

Get section, demo card, and code tab HTML structure from `components/alert.md`.

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
| Dark bg + oncolor | `'[["darkBg", ".demo-container", "containerBg"], ["nds-oncolor", ".nds-btn", "containerBg", "class", "add"]]'` |
| Attribute toggle | `'["data-status=success", ".nds-alert", "alertVariant", "attr"]'` |
| Boolean prop | `'["indeterminate", ".nds-checkbox", "propToggle", "prop"]'` |

Buttons auto-scope to parent `.nds-demo-card`, handle mutual exclusion, and sync `<code>` blocks automatically.

## Code Examples

Code tabs in demo cards are for **copy-paste implementation code only** — NOT documentation or API reference.

- **HTML tab**: markup to render the component
- **JS tab**: only when JS is **required** to create/initialize the component (e.g., `NDSChart.create()`, `NDSAlert.create()`). Do NOT add a JS tab for optional JS (e.g., modal works via `data-modal-target` — `NDSModal.open()` is optional, document it in Usage Guidelines instead)
- For long code (>15 lines), add `nds-expandable` to the tab panel and wrap `<code>` in `<div class="nds-expandable-content">`

## Overlay & Trigger Components

Modal, drawer, dropmenu need a **trigger button** + hidden component markup inside `.state-demo`. Check the component's JS for trigger attribute (e.g., `data-modal-target`, `data-drawer-target`). Toggle buttons in `.demo-action` still work via `data-toggler` on the hidden component.

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

## Content Blocks (Usage Guidelines)

Use `nds-content-block` with `nds-block-title` for text guidance. Get HTML structure from `components/alert.md`.

For JS API documentation, use a standalone `nds-code nds-expandable` block (NOT inside demo card tabs) with inline comments explaining methods/events. See `components/modal.md` for an example.

Rules:
- Use raw HTML inside `<code>` blocks — never HTML entities
- Do NOT use inline `<code>` tags in descriptions

## Registration Checklist

1. **New components**: create SCSS file, add `@use` to `assets/css/nds-main.min.scss`
2. **Sidemenu**: add to `_data/sidemenu/sidemenu.yml` under correct parent
3. **Build test**: run `bundle exec jekyll build`
4. **Tab/Panel IDs**: use `panel-{component}-{variant}-{number}` / `tab-{component}-{variant}-{number}` pattern
