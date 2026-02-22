---
name: doc-page
description: Create or update NDS component/page documentation with proper structure, demo cards, code examples, and sidemenu registration
argument-hint: "[component-name or file-path]"
disable-model-invocation: true
---

# NDS Documentation Page

Create or update a documentation page for `$ARGUMENTS`.

## Before Starting

1. **Read the reference files** to understand current patterns:
   - `layout/section.md` — MOST IMPORTANT: understand the section hierarchy, tiers, and content layout
   - `components/alert.md` — BASE STANDARD for page structure and demo cards
   - `components/tags.md` — reference for interactive demo toggles
   - `standard-page.md` — front matter template
2. **Read the component's SCSS** file if it exists (`_sass/components/_$0.scss`) to understand all variants, sizes, and states
3. **Check `_data/sidemenu/sidemenu.yml`** to see if the page is already registered

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

- Use **raw HTML** inside `<code class="lang-html code">` — never HTML entities
- Write `<div class="nds-btn">` not `&lt;div class="nds-btn"&gt;`
- Indent code with 2 spaces inside `<code>` blocks
- Show clean, minimal code — omit demo-specific wrappers

## Content Blocks (for guidelines/docs)

```html
<div class="nds-content-block">
    <h3 class="nds-block-title">When to Use</h3>
    <p>Use this component when...</p>
</div>
```

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
