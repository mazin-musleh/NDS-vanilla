---
name: doc-page
description: Work with NDS component/page documentation — create new pages, refine existing ones, add sections, fix code tabs, update guidelines, or any task involving doc pages. Use this skill whenever the task involves a component documentation page (components/*.md), demo cards, code examples, toggle controls, or usage guidelines sections.
argument-hint: "[component-name] [optional: specific task]"
---

# NDS Documentation Page

Apply this skill to: `$ARGUMENTS`

If the arguments specify a component name only (e.g., `modal`), create or fully refine the page. If the arguments include a specific task (e.g., `modal add JS API section` or `accordion fix code tabs`), do only that task — read the relevant sections of this skill for the patterns, then apply the targeted change.

## Before Starting

1. **Read the reference files** to understand current patterns:
   - `layout/section.md` — MOST IMPORTANT: understand the section hierarchy, tiers, and content layout
   - `components/alert.md` — BASE STANDARD for page structure and demo cards
   - `components/tags.md` — reference for interactive demo toggles
   - `standard-page.md` — front matter template
2. **Read the existing page** (`components/$0.md`) if it exists — when refining an existing page, preserve working content and focus on what needs improvement. Compare it against the patterns in this skill and fix any gaps (missing toggles, wrong code tab usage, missing guidelines sections, etc.)
3. **Read the component's SCSS** file if it exists (`_sass/components/_$0.scss`) to understand all variants, sizes, and states
4. **Read the component's JS** file if it exists (`_js/$0.js` or similar) to understand its API — constructors, methods, events, and options. This determines whether demos need custom JS (see "Custom JS Showcase" section)
5. **Check `playground.md`** for existing demo HTML — use it as the authoritative HTML structure for the component
6. **Check `_data/sidemenu/sidemenu.yml`** to see if the page is already registered

## Front Matter

```yaml
---
layout: page
title: Component Name
hero_title: Component Name - National Design System
hero_description: Brief description of the component and its purpose
breadcrumb: ["Components"]
lang: en
direction: ltr
---
```

- Do NOT use `layout_class: cardView` or `topSubMenu` — these were tests and are not standard for doc pages
- For non-component pages (utilities, layout), adjust `breadcrumb` accordingly

## Page Structure

Every documentation page follows this pattern:

```
Section 1: Overview / Main Demo
  └─ Demo cards showing the component with toggle controls
Section 2: Variants (if applicable)
  └─ Demo cards per variant or toggle-based switching
Section 3: Sizes (if applicable)
Section 4: States (if applicable)
Section 5: Usage Guidelines
  └─ Content blocks with do/don't guidance
```

### Section Template

```html
<section id="sectionId" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Description of this section</p>
        </div>
        <div class="nds-section-content">
            <!-- Demo cards or content blocks go here -->
        </div>
    </div>
</section>
```

### Demo Card Template

```html
<div class="nds-showcase">
    <div class="nds-demo-card">
        <div class="demo-header">
            <div class="demo-label">Demo Title</div>
            <div class="demo-action">
                <!-- Toggle buttons here -->
                <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                    data-toggler='["nds-outline", ".nds-component","styleToggle"]'>
                    <span class="label">Outline</span>
                </button>
            </div>
        </div>
        <div class="demo-container">
            <div class="state-demo">
                <!-- Live component demo here -->
            </div>
        </div>
        <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
                <div class="nds-tab-list-container">
                    <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                            aria-controls="panel-id-1" id="tab-id-1">
                            <span class="nds-tab-label">HTML</span>
                        </button>
                    </nav>
                </div>
                <div class="nds-tab-content">
                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-id-1"
                        aria-labelledby="tab-id-1">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-html code">
<!-- RAW HTML here, NOT entities. Write <div> not &lt;div&gt; -->
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Toggle System

Use demo action toggles instead of separate demo cards per variation. Toggles are powered by `nds-showcase.js` which handles mutual exclusion, live code sync, and DOM updates automatically.

### Format

```
Single:  data-toggler='["value", ".target", "toggleGroup", "operation", "action"]'
Multi:   data-toggler='[["value", ".target", "group", "op", "action"], [...]]'
```

**Parameters:**
1. **value** — class names (space-separated), attribute string (`attr=val`), or HTML content
2. **target** — CSS selector, scoped to `.demo-container` + `.code-example` within the same `.nds-demo-card`
3. **toggleGroup** — mutual exclusion key (only one button selected per group in same card)
4. **operation** — `class` (default), `attr`, `data-state`, `prop`, `content-prepend`, `content-append`
5. **action** — `add`, `remove`, or omit for toggle behavior (only for `class` operation)

### Operations

| Operation | What it does | Example |
|-----------|-------------|---------|
| `class` (default) | Toggle CSS classes on target | `'["nds-outline", ".nds-tag", "styleToggle"]'` |
| `attr` | Toggle HTML attributes | `'["data-status=success", ".nds-alert", "alertVariant", "attr"]'` |
| `data-state` | Toggle space-separated values in `data-state` | `'["disabled", ".nds-form-container", "stateToggle", "data-state"]'` |
| `prop` | Toggle JS boolean properties | `'["indeterminate", ".nds-checkbox", "propToggle", "prop"]'` |
| `content-prepend` | Insert/remove HTML as first child | `'["<i class=\"hgi ...\"></i>", ".nds-tag", "iconToggle", "content-prepend"]'` |
| `content-append` | Insert/remove HTML as last child | `'["<span>badge</span>", ".nds-btn", "badgeToggle", "content-append"]'` |

### Class action: add/remove

When using `class` operation, the 5th param overrides toggle behavior:
```html
<!-- Adds nds-oncolor when selected, removes when deselected -->
data-toggler='["nds-oncolor", ".nds-btn", "colorToggle", "add"]'

<!-- Multi-op: toggle one class AND add another -->
data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'
```

### Common toggle patterns

| Purpose | Example |
|---------|---------|
| Style variant | `'["nds-outline", ".nds-tag", "styleToggle"]'` |
| Size | `'["nds-sm", ".nds-tag", "sizeToggle"]'` |
| Icon prepend | `'["<i class=\"hgi hgi-stroke hgi-icon icon\"></i>", ".nds-tag", "iconToggle", "content-prepend"]'` |
| Remove bg | `'["noBg", ".demo-container", "containerBg"]'` |
| Dark bg | `'["darkBg", ".demo-container", "containerBg"]'` |
| Combined bg+oncolor | `'[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'` |

### How it works

- Buttons scoped to their parent `.nds-demo-card` — no cross-card interference
- **Mutual exclusion**: clicking a button deselects others in the same `toggleGroup` and reverses their effects
- **Code sync**: class, attribute, and content changes auto-update the `<code>` block in the same demo card
- Button gets `.selected` class when active

## Code Examples

Code tabs in demo cards are for **copy-paste implementation code** — the developer copies this to use the component in their project. They are NOT for documentation, explanation, or API reference. Keep code minimal and ready to use.

- **HTML tab**: the markup needed to render the component
- **JS tab** (when needed): the JS call to initialize or create the component (e.g., `NDSModal.open('id')`, `NDSChart.create('#el', {...})`)
- Any documentation, event listeners, advanced usage, or explanation belongs in the **Usage Guidelines** section as content blocks — not in code tabs

Additional rules:
- Use **raw HTML** inside `<code class="lang-html code">` — never HTML entities
- Write `<div class="nds-btn">` not `&lt;div class="nds-btn"&gt;`
- Indent code with 2 spaces inside `<code>` blocks
- Show clean, minimal code — omit demo-specific wrappers
- For long code blocks (>15 lines), add `nds-expandable` to the tab panel and wrap the `<code>` in `<div class="nds-expandable-content">`:
  ```html
  <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" ...>
      <div class="nds-code-action">...</div>
      <div class="nds-expandable-content">
          <code class="lang-html code">
  <!-- long code here -->
          </code>
      </div>
  </div>
  ```

## Overlay & Trigger Components

Components like modal, drawer, and dropmenu need a **trigger button** inside `.state-demo` to open them. The actual component markup (hidden by default) also lives inside `.state-demo`:

```html
<div class="state-demo">
    <!-- Trigger button -->
    <button class="nds-btn nds-primary nds-lg" data-modal-target="modal-demo-id">
        <span class="label">Open Modal</span>
    </button>
    <!-- The overlay component (hidden until triggered) -->
    <div id="modal-demo-id" class="nds-modal nds-card nds-stroke" role="dialog"
        aria-labelledby="modal-title" aria-hidden="true" hidden>
        <!-- component content -->
    </div>
</div>
```

Check the component's JS file for the trigger attribute name (e.g., `data-modal-target` for modal, `data-drawer-target` for drawer). The toggle buttons in `.demo-action` (size, style) still work via `data-toggler` — they modify the component's classes/attributes while it stays hidden until the trigger button opens it.

## Custom JS Showcase

Some components need JavaScript beyond what `data-toggler` can handle — initialization, API demos, or custom toggle logic. There are several patterns; pick the one that fits.

### Pattern 1: Page-level init script

For components that need JS initialization (charts, complex widgets), add a `<script>` block **at the very end of the page** (after the last `</section>`). Wrap in `DOMContentLoaded`:

```html
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {
    NDSChart.create('#demo-bar', {
        type: 'bar',
        series: [{ name: 'Downloads', data: [28, 45, 62] }],
        labels: ['Mon', 'Tue', 'Wed'],
    });
});
</script>
```

Use this when demos reference elements by ID that must exist before JS runs. Check the component's JS file (`_js/`) for the API — call the real constructor/factory, don't invent one.

**Important:** Any JS that powers demo interactions (init calls, toggle handlers, action buttons) goes into `_js/nds-showcase.js` — NOT into the component's own JS file. Component JS files are for the reusable component logic; showcase JS is for doc page demo wiring only.

### Pattern 2: Inline demo-card script

For custom toggle buttons that need JS logic (not just class/attr toggling), place a `<script>` **inside the demo card**, right after the `demo-header`. The button uses `onclick` instead of `data-toggler`:

```html
<div class="demo-header">
    <div class="demo-label">Interactive Demo</div>
    <div class="demo-action">
        <!-- Standard toggles still use data-toggler -->
        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
            data-toggler='["nds-lg", ".nds-rating", "sizeToggle"]'>
            <span class="label">Large</span>
        </button>
        <!-- Custom JS toggle uses onclick -->
        <button class="nds-btn nds-sm nds-subtle" onclick="toggleDisabled(this)">
            <span class="label">Disable</span>
        </button>
    </div>
</div>
<script>
    function toggleDisabled(button) {
        const component = button.closest('.nds-demo-card').querySelector('.nds-component');
        const codeEl = button.closest('.nds-demo-card').querySelector('code');
        // Toggle state using component API
        // Update button.classList (add/remove 'selected')
        // Update code block to reflect new state
    }
</script>
```

Key conventions:
- Scope queries with `button.closest('.nds-demo-card')` — never use global selectors
- Toggle the `selected` class on the button to match `data-toggler` button behavior
- Update the `<code>` block innerHTML to keep code examples in sync with the live demo

### Pattern 3: API demo with action buttons

For components with a JS API (create/dismiss/show/hide), use action buttons in the demo area. These go inside `.state-demo`, not in `.demo-action`:

```html
<div class="demo-container">
    <div class="state-demo" style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
        <button class="nds-btn nds-primary nds-lg demo-action-btn" data-action="alert-create">
            <span class="label">Create Alert</span>
        </button>
        <button class="nds-btn nds-subtle nds-md"
            onclick="NDSAlert.dismissAll('#demo-container')">
            <span class="label">Clear All</span>
        </button>
        <div id="demo-container" class="nds-alert-container" style="width:100%;"></div>
    </div>
</div>
```

### Pattern 4: Multi-tab code (HTML + JS)

When a demo needs both HTML and JavaScript code examples, add a second tab to the code section:

```html
<div class="demo-code">
    <div class="nds-tabs nds-code nds-divided" hidden>
        <div class="nds-tab-list-container">
            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-demo-html" id="tab-demo-html">
                    <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                    aria-controls="panel-demo-js" id="tab-demo-js">
                    <span class="nds-tab-label">JavaScript</span>
                </button>
            </nav>
        </div>
        <div class="nds-tab-content">
            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-demo-html"
                aria-labelledby="tab-demo-html">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-html code">
<!-- HTML markup here -->
                </code>
            </div>
            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-demo-js"
                aria-labelledby="tab-demo-js" hidden>
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript code">
// JavaScript API usage here
                </code>
            </div>
        </div>
    </div>
</div>
```

Use this **only** when JS is required to create or initialize the component — the developer cannot use it without calling JS. Examples: `NDSChart.create()` (chart needs JS to render), `NDSAlert.create()` (programmatic alert creation). Do NOT add a JS tab for components where JS is just an optional/alternative way to trigger something that already works via HTML attributes (e.g., modal uses `data-modal-target` in HTML — `NDSModal.open()` is optional, so no JS tab). Document optional JS APIs in the Usage Guidelines section instead.

### When to use which pattern

- **Component needs JS to exist** (chart, programmatic alerts) → Pattern 1 (page-level init) + Pattern 4 (multi-tab code with HTML + JS)
- **Toggle button needs logic beyond class/attr** (disable/enable via API, complex state) → Pattern 2 (inline script)
- **Demonstrating a JS action API** (alert dismiss, toast create) → Pattern 3 (action buttons)
- **Component has optional JS control** (modal open/close, drawer toggle) → Document in Usage Guidelines as a standalone `nds-code` block, NOT in demo card tabs
- **Standard visual toggles** (size, style, color, icon) → stick with `data-toggler`, no custom JS needed

## Content Blocks (Usage Guidelines section)

Use content blocks for text-based guidance: when to use, structure, accessibility, best practices.

```html
<div class="nds-content-block">
    <h3 class="nds-block-title">When to Use</h3>
    <p>Use this component when...</p>
</div>
```

For JS API documentation, use a standalone `nds-code` block (not inside demo card tabs) with inline comments explaining each method:

```html
<div class="nds-content-block">
    <h3 class="nds-block-title">JavaScript API</h3>
    <p>Brief description of how the component is controlled.</p>
    <div class="nds-code nds-expandable">
        <div class="nds-code-action">
            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
            </button>
        </div>
        <div class="nds-expandable-content">
            <code class="lang-javascript">
// Commented code showing methods, events, and usage
            </code>
        </div>
    </div>
</div>
```

Rules:
- Do NOT use `guidelines-grid`, `guideline-item`, `accessibility-info`, or `comparison-item`
- Do NOT use inline `<code>` tags in descriptions — only in code blocks

## Registration Checklist

**For new components** (skip if component SCSS already exists):
1. Create `_sass/components/_[name].scss` (with `@use '../mixins' as *;`)
2. Add `@use 'components/[name]';` to `assets/css/nds-main.min.scss`

**For all doc pages:**
1. **Sidemenu** — Add to `_data/sidemenu/sidemenu.yml` under the correct parent:
   ```yaml
   - label: Component Name
     href: /components/component-name.html
   ```
2. **Build test** — Run `bundle exec jekyll build` to verify no errors
3. **Liquid formatting** — Use `{%- -%}` whitespace trimming if Liquid tags are used (run `/clean-liquid` if needed)

## Tab/Panel ID Convention

Use unique, descriptive IDs for tab panels to avoid conflicts:
- Pattern: `panel-{component}-{variant}-{number}` / `tab-{component}-{variant}-{number}`
- Example: `panel-alert-success-1` / `tab-alert-success-1`
