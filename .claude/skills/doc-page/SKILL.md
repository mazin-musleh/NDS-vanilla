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
| Layout | `layout/` | `_sass/layout/` | `grid`, `section` |
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

### MUST read for context

- **`_data/sidemenu/sidemenu.yml`**: read this every time. It is your map of the entire design system: every component, layout, utility, UI shell element, and example page. Use it to:
  - Know what related components exist when writing Best Practices ("don't use" alternatives, "use X with Y" suggestions)
  - Link to related pages with `{{ 'path' | relative_url }}`
  - Verify any component you mention by name actually exists
  - Understand where the current component fits in the system

### Read when relevant

- `standard-page.md`: front matter template (new pages)
- `layout/section.md`: section hierarchy and tiers (new pages or adding sections)
- `playground.md`: existing demo HTML if available
- Icon class lookup: **NEVER guess icon class names.** Two icon mechanisms exist — pick the right one per usage:
  - **Content icons (font)** (`<i class="hgi hgi-stroke hgi-NAME">`): renders via the local HGI font (loaded when `use_hgi_font: true`). Verify each NAME exists in `_sass/_hgiRoundedStroke.scss` — that is the authoritative list of glyphs the shipped font actually contains.
  - **UI icons (mask)** (`<i class="nds-icon nds-hgi-NAME" aria-hidden="true">`): only for names in `UI_ICONS` of `scripts/generate-icons-scss.mjs`. Used by chrome, pseudo-elements, JS-injected. To add a new UI icon, run `/add-nds-icon NAME`.
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

All documentation pages are **English, LTR**. Always set `lang: en` and `direction: ltr`. Use `standard-page.md` as template for new pages. Do NOT use `layout_class: nds-cardView` or `sidemenu_mode: top`.

### Naming

- **Page title** (`title` in front matter): component name only
- **Hero title**: `{Name} - National Design System`
- **Hero description**: one sentence answering "What is this component and what does it do for me?" Study ALL demos on the page before writing this. Components often serve multiple purposes beyond what their name suggests. Do NOT list internal features ("smart positioning, keyboard navigation, accessibility support"). Do NOT narrow the component to one use case. Instead, state its purpose covering the full range of what the demos show. Example: "A toggle-activated menu for presenting actions, navigation links, or filter controls in a compact overlay."
- **Section titles**: descriptive and SEO-friendly. Including the component name is fine
- **Section descriptions**: orient the developer on what they are looking at and when they would pick this variant over other sections on the page. Do not restate the title. Do not describe internal mechanisms. Good: "A condensed layout for contextual messages placed near the content they relate to." Bad: "Compact single-line layout with bottom stripe and solid icon."
- Each demo card gets its own section. The section title describes the variant or mode shown (e.g., "Standard", "With Leading Icons", "Inline", "Toast Notifications"), not generic labels like "Overview"

### Page Structure

```
Section 1: Overview / Main Demo (demo cards with toggle controls)
Section 2: Variants (if applicable)
Section 3: Sizes (if applicable)
Section 4: States (if applicable)
Section 5: Built-in Features (definition-list grid with icons, its own section)
Section 6: Usage Guidelines (content blocks: Best Practices + Modifier Classes + Data Attributes + CSS Custom Properties + JS API)
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
- **Demo cards with no actions**: add a `<div class="demo-label">` inside `.demo-header` with a short descriptive title. Only demo cards that have toggle controls (dropmenus or buttons) omit the label.

### Code Examples

Code tabs are for **production-ready, copy-paste markup only**.

- **The code tab MUST be a direct copy of the live demo HTML.** Copy the markup from `.state-demo`, remove demo-only wrappers (`.state-demo`, `.demo-container`), and clean indentation. Do NOT simplify, abbreviate, reduce items, or use placeholder text like "Item title" or "<!-- more items -->". The developer copies what they see in the live demo.
- MUST be production-ready: no demo wrappers, no showcase classes
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

- **Sells the component's capabilities.** Each item should make a developer think "I get that for free just by using this component."
- **Titles**: short, concrete noun phrases that name the capability. Prefer specific names over abstract ones ("Active Page Tracking" over "State Management", "Programmatic Control" over "JavaScript API").
- **Descriptions**: one flowing sentence per item. Lead with what the developer sees or controls, not how it works internally.
  - **Interaction patterns are fine**: accordion, collapsible, toggle, responsive. These describe how the developer experiences it.
  - **Internal mechanisms are not**: CSS selectors (`:has()`), DOM detection techniques, CSS positioning strategies (`fixed positioning`), internal state tracking. The developer never touches these.
  - **Mention code references only when the developer writes or calls them**: `data-state="active"` (developer sets this in HTML) is useful. `aria-expanded` (auto-applied by JS) is noise.
  - Example shift: "Automatically detects viewport boundaries and adjusts positioning" becomes "Menus stay fully visible regardless of trigger position, flipping direction near screen edges."
- Verify icon names against `_sass/_hgiRoundedStroke.scss` (font glyphs). **NEVER guess.** Use `<i class="hgi hgi-stroke hgi-NAME">` for content icons; use `<i class="nds-icon nds-hgi-NAME" aria-hidden="true">` only if NAME is in `UI_ICONS` of `scripts/generate-icons-scss.mjs`.
- Aim for an **even number** of items (4, 6, 8) for the 2-column grid
- For components with JS: include "Auto-initialization" (first item) and "Programmatic Control" (last item)

### Usage Guidelines Section

Required content blocks:

1. **Best Practices**: 7-12 bullets mixing decision guidance and practical tips:
   - **Primary use cases** (2-3 bullets): when to reach for this component. Go beyond the obvious. Add value by explaining specific scenarios.
   - **"Don't use" guidance** (1-2 bullets): when this is the wrong choice and what to use instead. Only suggest alternatives that exist in NDS. Check `_data/sidemenu/sidemenu.yml` to verify before naming any component as an alternative.
   - **Variant selection** (1-2 bullets): how to choose between variants/sizes/modes when it's not obvious from the demos.
   - **Practical tips** (2-3 bullets): recommended item counts, grouping strategies, icon usage, content guidelines. These help developers who already chose the component build it well.
2. **Modifier Classes** (when the component has class-based variants, sizes, or modes): a compact `nds-table nds-responsive` listing every modifier class with what it does. Developers should not need to click through demo toggles to discover available options. Extract these from the SCSS source. Example format:

```html
<table class="nds-table nds-responsive">
    <thead><tr><th>Class</th><th>Description</th></tr></thead>
    <tbody>
        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Compact size with reduced padding and font size</td></tr>
        <tr><td><code class="nds-inline-code lang-html">nds-divided</code></td><td>Adds separator lines between list items</td></tr>
    </tbody>
</table>
```

Skip this block if the component has no modifier classes beyond its base.

3. **Data Attributes** (when the component's JS reads `data-*` attributes for configuration): a table listing each attribute, where to place it, and valid values. These are the knobs a developer turns without writing JS. Extract from the JS source by searching for `dataset` or `getAttribute('data-`. Example:

```html
<table class="nds-table nds-responsive">
    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
    <tbody>
        <tr><td><code class="nds-inline-code lang-html">data-state="active"</code></td><td>Set on <code class="nds-inline-code lang-html">&lt;li&gt;</code> to mark the current page. Parent menus expand automatically.</td></tr>
    </tbody>
</table>
```

Skip if the component has no developer-facing data attributes (ignore internal ones like `data-initialized`).

4. **CSS Custom Properties** (when the SCSS defines `--component-*` variables or exposes tokens via `var()` fallbacks): a table of overridable properties with their defaults. Developers use these to customize without touching SCSS. Search the SCSS for custom property definitions. Example:

```html
<table class="nds-table nds-responsive">
    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
        <tr><td><code class="nds-inline-code lang-html">--drawer-max-height</code></td><td>none</td><td>Maximum height before scroll overflow activates</td></tr>
    </tbody>
</table>
```

Skip if the component exposes no custom properties.

5. **JavaScript API** (if the component has JS): auto-init note + expandable code block documenting the full API with inline comments. See `alert.md` for format.

Additional blocks based on component needs (only when genuinely warranted):
- Accessibility, Responsive Behavior, Content Guidelines, Performance

Do NOT document things the developer already gets from copying the code examples (ARIA attributes, semantic structure) or from the demo toggles (configuration classes). Focus on capabilities and decision guidance.

### Content Rules

- **NEVER use em dashes** in any generated content. Use colons, commas, periods, or restructure instead.
- Write code examples as raw HTML, not entity-encoded. Escape HTML tags meant to display as text (e.g., `&lt;a&gt;` in a JS comment).
- Use `<code class="nds-inline-code lang-html">` for HTML references. Use `<code class="nds-inline-code lang-js">` for JS references. Do NOT use plain `<code>` or the `nds-code` wrapper for inline text.
- **Links to other pages**: always use Jekyll's `relative_url` filter with `nds-color` class. Example: `<a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a>`. Never use absolute paths like `/components/stepper`.

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
- [ ] Code tab markup is a direct copy of the live demo (same structure, classes, attributes, content, number of items. No abbreviation or placeholders)
- [ ] All icons verified against `_sass/_hgiRoundedStroke.scss` (content-icon names) or `UI_ICONS` in `scripts/generate-icons-scss.mjs` (UI-icon names) — none guessed; chosen mechanism (`nds-hgi-` for UI vs `hgi hgi-stroke hgi-` for content) matches the usage context
- [ ] Built-in Features section exists with even number of items
- [ ] Usage Guidelines has "Best Practices" block
- [ ] Usage Guidelines has "JS API" block (if component has JS)
- [ ] Additional Usage Guidelines blocks exist where the component warrants them (API Reference for option-heavy components, Accessibility for keyboard-managed components, etc.)

### Content Quality
- [ ] Hero description states what the component does for the developer, not a list of internal features
- [ ] Hero description covers the full range of use cases shown in the demos
- [ ] Section descriptions orient the developer on when/why to pick this variant, not how it works internally
- [ ] Built-in Features descriptions lead with outcomes, not internal mechanisms
- [ ] Best Practices has at least 7 bullets including "don't use" guidance and practical tips
- [ ] Best Practices covers both when to use/not use AND how to use well
- [ ] Alternative components mentioned in "don't use" bullets actually exist in NDS

### Reference Tables
- [ ] Modifier Classes table exists (if component has class-based variants/sizes/modes)
- [ ] Data Attributes table exists (if component JS reads data-* for configuration)
- [ ] CSS Custom Properties table exists (if SCSS exposes overridable custom properties)
- [ ] All table entries extracted from source files, not guessed

### Formatting
- [ ] No em dashes anywhere in the page
- [ ] Front matter has `lang: en` and `direction: ltr`
- [ ] Unique IDs on all tabs/panels (no conflicts across demo cards)
- [ ] Registered in `sidemenu.yml` (new pages only)

If any item fails, fix it before presenting the result.
