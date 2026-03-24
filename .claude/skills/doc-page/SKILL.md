---
name: doc-page
description: Work with NDS documentation pages — create new pages, refine existing ones, add sections, fix code tabs, update guidelines. Covers all doc page categories: components (components/*.md), UI Shell (ui-shell/*.md), layout (layout/*.md), and utilities (utilities/*.md). Use this skill for any task involving demo cards, code examples, toggle controls, or usage guidelines sections.
argument-hint: "[name] [optional: specific task]"
---

# NDS Documentation Page

Apply this skill to: `$ARGUMENTS`

This skill builds documentation pages that serve as a **component inventory**. Developers browse the live demos, configure options with toggle controls, then copy the production-ready code. Every page must be a complete, accurate representation of what the SCSS and JS source files actually define.

---

## Phase 1: RESOLVE

Determine the target page and locate its source files.

### Page Resolution

1. Glob for `$0.md` across `components/`, `ui-shell/`, `layout/`, `utilities/`
2. If found: use that path and its category
3. If not found: creating a new page (default to `components/`)

| Category | Directory | SCSS source | Example |
|----------|-----------|-------------|---------|
| Components | `components/` | `_sass/components/` | `accordion`, `modal`, `tags` |
| UI Shell | `ui-shell/` | `_sass/components/` | `header`, `side-nav`, `footer` |
| Layout | `layout/` | `_sass/layout/` | `grid`, `section`, `content-grid` |
| Utilities | `utilities/` | `_sass/` or `_sass/layout/` | `expandable-content`, `numbers`, `truncate-text` |

### Source File Discovery

Page names don't always match SCSS/JS filenames (e.g., `side-nav` maps to `nds-sideMenu.js`, `truncate-text` maps to `_truncateText.scss`). **NEVER assume filenames.** Search broadly: try exact match first, then partial/wildcard matches across `_sass/components/`, `_sass/layout/`, and `_js/`. If no direct match, grep for the component's root class (`.nds-$0`) to locate the defining file.

Some components share JS files rather than having their own (e.g., form controls live in `_js/nds-forms.js`). Check `_js/nds-loader.js` for the component's registry entry to find which init function and namespace it uses.

### Category Adaptation

- **Components / UI Shell / Utilities**: full treatment with variants, sizes, states, JS API, usage guidelines
- **Layout**: lighter treatment. Skip Variants/States. Focus on CSS custom properties, grid demos, responsive behavior

---

## Phase 2: READ

Read source files to build a complete understanding of the component. **The source files are the single source of truth. The existing page is suspect until validated.**

### MUST read every time

- **`components/alert.md`**: the base standard for all page patterns. Extract from it:
  - Demo card skeleton (`.nds-demo-card` with `demo-header`, `demo-container`, `demo-code`)
  - Code tab structure (`.nds-tabs .nds-code` with HTML and JS API panels)
  - Toggle controls (dropmenu pattern for selection groups, flat buttons for on/off)
  - Built-in Features section (`.nds-definition-list` grid with icons)
  - Usage Guidelines section (`nds-content-block` with `nds-block-title`)
  - JS API documentation block (expandable code with inline comments)

### MUST read when they exist

- **SCSS source file**: read the entire file. Understand every variant class, size class, state, modifier, layout mode, and accessibility feature (`@include reduced-motion`, `@include high-contrast`, `@include print-media`). The page must document all of these.
- **JS source file**: read the entire file **deeply**. Do not skim. Understand the full logic:
  - How the component initializes and what triggers it
  - Every public method exposed on the `NDS.*` namespace and on instances
  - Every custom event dispatched (`CustomEvent`) and its `detail` shape
  - Every keyboard interaction handled
  - Every data attribute the JS reads for configuration
  - Every state the JS manages (open/close, active/inactive, validation, etc.)
  - How instances are accessed from the DOM
  - The page must document all of these.
- **Existing page** (if refining): read it but do NOT trust it. You will validate it against source files in Phase 3.

### Read when relevant

- `standard-page.md`: front matter template (new pages)
- `layout/section.md`: section hierarchy and tiers (new pages or adding sections)
- `playground.md`: existing demo HTML if available
- `_data/sidemenu/sidemenu.yml`: registration check (new pages)
- `_sass/_hgiRoundedStroke.scss`: icon class lookup. **NEVER guess icon class names.**
- **Additional reference pages** for complex components: `components/chart.md` (API-heavy with options reference), `components/cards.md` (builder-style multi-dropmenu demos). Judge whether the component's complexity warrants reading these.

---

## Phase 3: ANALYZE (Existing Pages Only)

Compare the existing page against what the source files actually define. Approach with fresh eyes. Do not assume the existing page is correct.

### Build Understanding

Thoroughly analyze the SCSS and JS source files from Phase 2. Build a complete mental model of what the component supports: every variant, size, state, modifier, layout mode, public method, event, keyboard interaction, and accessibility feature.

### Validate the Existing Page

For each section of the existing page, check two things:

1. **Structure**: does the HTML skeleton match `alert.md` patterns? (demo card layout, code tab structure, toggle controls, bottom sections)
2. **Content**: does it accurately and completely reflect what the source files define? Are all variants/methods/events/states covered?

### Classify Each Section

- **CURRENT**: both structure and content match. Leave untouched.
- **INCOMPLETE**: structure is correct but content is missing items the source defines (undocumented variants, missing API methods, missing events). Add what is missing.
- **OUTDATED**: structure doesn't match `alert.md` patterns, OR content contradicts/misrepresents the source files, OR contains placeholder text. Rebuild the section using `alert.md` patterns, preserving any valid content/text.
- **MISSING**: a section that should exist but doesn't. Create it.

---

## Phase 4: REPORT

**STOP. Present the classification report to the user before making any edits.**

```
## {Name} — Smart Merge Report

### Source Inventory
- SCSS: [list key variants, sizes, states, modifiers found]
- JS: [list key methods, events, keyboard handling found]

### Section Status
- [Section name]: CURRENT | INCOMPLETE (missing: ...) | OUTDATED (reason: ...) | MISSING
- ...repeat for each section...

### Actions Planned
- CURRENT sections: skip (no changes)
- INCOMPLETE sections: add [specific items]
- OUTDATED sections: rebuild [specific sections], preserving [valid content]
- MISSING sections: create [specific sections]
```

Wait for user approval, then proceed to Phase 5.

For **new pages** and **targeted edits**: skip Phases 3-4 and go directly to Phase 5.

---

## Phase 5: BUILD

Apply changes following the patterns extracted from `alert.md`. All HTML structure must match those patterns.

### Front Matter

All documentation pages are **English, LTR**. Always set `lang: en` and `direction: ltr`. Use `standard-page.md` as template for new pages. Do NOT use `layout_class: cardView` or `topSubMenu`.

### Naming

- **Page title** (`title` in front matter): component name only
- **Hero title**: `{Name} - National Design System`
- **Section titles**: descriptive and SEO-friendly. Including the component name is fine
- **Section descriptions**: add context the title doesn't cover. Do not restate the title.
- Each demo card gets its own section. The section title describes the variant or mode shown (e.g., "Standard", "With Leading Icons", "Inline", "Toast Notifications"), not generic labels like "Overview"

### Page Structure

```
Section 1: Overview / Main Demo (demo cards with toggle controls)
Section 2: Variants (if applicable)
Section 3: Sizes (if applicable)
Section 4: States (if applicable)
Section 5: Built-in Features (definition-list grid with icons, its own section)
Section 6: Usage Guidelines (content blocks: When to Use + JS API + additional blocks as needed)
```

Components with distinct **display modes** (e.g., default/inline/toast for alerts) get a separate section per mode rather than forcing them into the Variants/Sizes/States structure.

Complex components may need additional sections beyond this baseline (e.g., API Reference for chart, builder demos for cards). Judge based on source file complexity.

### Variant Organization

- **Simple class-based variants** (style, size): use `data-toggler` buttons within a single demo card
- **Structurally different variants** (different HTML structure): separate demo cards with their own code examples
- MUST cover **all** variants and states the SCSS defines

### Demo Actions

Get the exact HTML patterns from `alert.md`:
- **Selection groups** (one-of-many): dropmenu with `.demo-toggle-menu`. Place these first.
- **On/off toggles** (independent): flat buttons with `.demo-toggle-btn`. Place these after dropmenus.
- Add `selected` class to the button/item matching the demo's default state

### Code Examples

Code tabs are for **production-ready, copy-paste markup only**.

- **Write the live demo HTML first, then derive the code tab from it**: same structure, classes, and attributes. Remove demo-only wrappers. The code tab is what the developer copies into their project.
- MUST be production-ready: no demo wrappers, no showcase classes, no placeholder content
- **Use unique IDs** per demo card: `{component}-{variant}-{number}` (e.g., `modal-default-1`)
- **HTML tab**: markup to render the component
- **JS API tab** (label: "JS API"): only when the component has a **programmatic creation API** (e.g., `NDS.Alert.create()`, `NDS.Chart.create()`). This is the JS alternative to the HTML tab. Do NOT add a JS tab for event listeners or method calls.
- For long code (>15 lines), add `nds-expandable` to the tab panel and wrap `<code>` in `<div class="nds-expandable-content">`
- **Tab/Panel IDs**: use `panel-{component}-{variant}-{number}` / `tab-{component}-{variant}-{number}` pattern

### Overlay Components

Modal, drawer, and dropmenu need a **trigger button** + hidden component markup inside `.state-demo`. Check the component's JS for the trigger attribute. See `components/modal.md` for the pattern.

### Custom JS in Demos

Demo-wiring JS goes in `_js/nds-showcase.js`, NOT the component's own JS file. For components that require JS to render (charts, programmatic alerts), use a page-level `<script>` wrapped in `DOMContentLoaded`. For toggle logic beyond class/attr swapping, use inline `<script>` inside the demo card.

### Built-in Features Section

Its own section (NOT inside Usage Guidelines). Uses `nds-definition-list` grid with icons. Get the HTML pattern from `alert.md`.

- Derived from SCSS and JS source analysis. This sells the component's capabilities.
- Look up icons in `_sass/_hgiRoundedStroke.scss`. **NEVER guess.**
- Aim for an **even number** of items (4, 6, 8) for the 2-column grid
- For components with JS: include "Auto-initialization" and "JavaScript API" items

### Usage Guidelines Section

Required content blocks:

1. **When to Use**: decision guidance. When to pick this component vs alternatives, what it's good for, what to avoid. Based on your deep understanding of the component's capabilities from the source files.
2. **JavaScript API** (if the component has JS): auto-init note + expandable code block documenting the full API with inline comments. See `alert.md` for format.

Additional blocks based on component needs (only when genuinely warranted):
- Accessibility, Responsive Behavior, Content Guidelines, Performance, API Reference (for complex option-heavy components like charts)

Do NOT document things the developer already gets from copying the code examples (ARIA attributes, semantic structure) or from the demo toggles (configuration classes). Focus on capabilities and decision guidance.

### Content Rules

- **NEVER use em dashes** in any generated content. Use colons, commas, periods, or restructure instead.
- Write code examples as raw HTML, not entity-encoded. Escape HTML tags meant to display as text (e.g., `&lt;a&gt;` in a JS comment).
- Use `<code class="nds-inline-code lang-html">` for HTML references. Use `<code class="nds-inline-code lang-js">` for JS references. Do NOT use plain `<code>` or the `nds-code` wrapper for inline text.

### Registration (New Pages Only)

1. Create SCSS file if needed, add `@use` to `assets/css/nds-main.min.scss`
2. Add to `_data/sidemenu/sidemenu.yml` under correct parent
3. Set breadcrumb to match the category
4. Run `bundle exec jekyll build` to verify

---

## Phase 6: VERIFY

Before finishing, validate your work against this checklist. Every item MUST pass.

### Source Completeness
- [ ] Every variant class from the SCSS source is demoed on the page
- [ ] Every size class from the SCSS source is demoed on the page
- [ ] Every state from the SCSS source is represented
- [ ] Every public JS method is documented (in code block or Usage Guidelines)
- [ ] Every custom event and its `detail` shape is documented
- [ ] Every keyboard interaction is documented
- [ ] Accessibility features from SCSS (`reduced-motion`, `high-contrast`, `print-media`) are mentioned in Built-in Features

### Structure and Patterns
- [ ] All demo card HTML structure matches `alert.md` patterns
- [ ] All code tabs contain production-ready, copy-paste markup
- [ ] Code tab markup matches the live demo (same structure, classes, attributes)
- [ ] All icons verified against `_sass/_hgiRoundedStroke.scss` (none guessed)
- [ ] Built-in Features section exists with even number of items
- [ ] Usage Guidelines has "When to Use" block
- [ ] Usage Guidelines has "JS API" block (if component has JS)
- [ ] Additional Usage Guidelines blocks exist where the component warrants them (API Reference for option-heavy components, Accessibility for keyboard-managed components, etc.)

### Formatting
- [ ] No em dashes anywhere in the page
- [ ] Front matter has `lang: en` and `direction: ltr`
- [ ] Unique IDs on all tabs/panels (no conflicts across demo cards)
- [ ] Registered in `sidemenu.yml` (new pages only)

If any item fails, fix it before presenting the result.
