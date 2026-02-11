# NDS Section Structure Reference

> For projects using the National Design System (NDS).
> This document describes the section component architecture, HTML patterns, and customization tokens.

---

## SCSS Architecture (3 Files)

| File | Role | Contains |
|------|------|----------|
| `_sass/components/_section.scss` | **Component base** | Visual tokens, shared typography tokens, head, title, description, meta, tags, rating, action, readMore, section-content |
| `_sass/layout/_sectionLayout.scss` | **Layout overrides** | Wrapper (container queries), cardView overrides, 404, sideInfo, last-edit, horizontal layout, section striping |
| `_sass/layout/_contentLayout.scss` | **Page layout** | CSS Grid system (full-width / breakout / content), `.nds-content-layout` variants, content-container, side menu, mobile |

**Import order** (in `nds.critical.min.scss`):
```scss
@use 'components/section';       // 1. Shared section base
@use 'layout/contentLayout';     // 2. Page grid + layout
@use 'layout/sectionLayout';     // 3. Section layout overrides
@use 'components/hero';          // 4. Hero component
```

---

## Section Hierarchy

```
section.nds-content-section          ← CSS Grid (full-width | breakout | content columns)
│
├── div.nds-section-wrapper          ← Flex row + container queries
│   ├── div.nds-section-image        ← Optional (img, avatar, icon)
│   ├── div.nds-section-head         ← flex:1 (title + desc + meta ONLY)
│   │   ├── h2.nds-section-title
│   │   ├── div.nds-section-meta     ← tags, rating
│   │   └── p.nds-section-description
│   ├── div.nds-section-action       ← Optional (buttons, auto width)
│   └── div.nds-section-content      ← Full row below (flex: 1 1 100%)
│
└── div.nds-section-content.nds-full-width  ← Alternative: outside wrapper for breakout
```

**Key rules:**
- `.nds-section-action` is always a **sibling** of `.nds-section-head`, never nested inside it
- `.nds-section-wrapper` uses `container-type: inline-size` for width-based responsive behavior
- `.nds-section-head` gets `margin-bottom` only when followed by `.nds-section-content` (via `:has(~ .nds-section-content)`)
- Inside wrapper, head margin is reset to `0` — wrapper gap handles spacing

---

## Progressive Usage Tiers

### Tier 1 — Minimal (no wrapper)

For simple sections with just title, description, and content. Direct children of the grid.

```html
<section class="nds-content-section">
    <h2 class="nds-section-title">Section Title</h2>
    <p class="nds-section-description">Section description text.</p>
    <div class="nds-section-content">
        <!-- Content here -->
    </div>
</section>
```

### Tier 2 — Standard (with wrapper)

Wrapper groups head and content with consistent gap spacing.

```html
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Section description text.</p>
        </div>
        <div class="nds-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
```

### Tier 3 — With action

Action sits beside head on wide screens, drops below on narrow.

```html
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Section description text.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">Action</span>
            </a>
        </div>
        <div class="nds-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
```

### Tier 4 — With image

Image, head, and action form a flex row. Content takes full row below.

```html
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-image">
            <img src="image.jpg" alt="Section image" />
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Section description text.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">Action</span>
            </a>
        </div>
        <div class="nds-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
```

### Tier 5 — Full-width content (outside wrapper)

Content breaks out of the content column into full-width. Wrapper holds head + action only.

```html
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Section description text.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">View All</span>
            </a>
        </div>
    </div>
    <div class="nds-section-content nds-full-width">
        <!-- Full-width content (e.g., card carousel) -->
    </div>
</section>
```

---

## CSS Grid Columns

Every `nds-content-section` is a CSS Grid with named columns:

```
[full-width] | [breakout] | [content] | [breakout] | [full-width]
```

Direct children placement:
- **Default** → `content` column
- `.nds-breakout` → `breakout` column (slightly wider)
- `.nds-full-width` → `full-width` column (edge to edge)

---

## Wrapper Container Queries

The `.nds-section-wrapper` uses CSS Container Queries based on its own width:

| Wrapper width | Action behavior |
|---------------|----------------|
| `≤ 768px` | Action goes full row (`flex: 1 0 100%`), horizontal direction (`flex-direction: row`) |
| `≥ 769px` | Action stretches vertically (`align-items: stretch`), buttons take full width |

```scss
// In _sectionLayout.scss
.nds-section-wrapper {
    container-type: inline-size;

    @container (max-width: 768px) {
        .nds-section-action {
            flex: 1 0 100%;
            flex-direction: row;
        }
    }

    @container (min-width: 769px) {
        .nds-section-action {
            align-items: stretch;
            --btn-width: 100%;
        }
    }
}
```

---

## Customization Tokens

### Section visual tokens (set on `.nds-content-section`)

| Token | Default | Description |
|-------|---------|-------------|
| `--section-bg` | `var(--background-white)` | Section background color |
| `--section-shadow` | `none` | Section box shadow |
| `--section-border` | `none` | Section border |
| `--section-border-radius` | `0` | Section border radius |

### Section typography tokens (set on `.nds-content-section` or `.nds-hero-section`)

| Token | Default | Description |
|-------|---------|-------------|
| `--section-title-FS` | `clamp(24px, 3vw, 36px)` | Title font size |
| `--section-title-LH` | `clamp(30px, 3.67vw, 44px)` | Title line height |
| `--section-title-MB` | `clamp(7.5px, 0.9175vw, 11px)` | Title margin bottom |
| `--section-description-FS` | `clamp(16px, 1.5vw, 18px)` | Description font size |
| `--section-description-LH` | `clamp(24px, 2.17vw, 26px)` | Description line height |
| `--section-description-MB` | `var(--spacing-2xl, 20px)` | Description margin bottom |

### Wrapper tokens (set on `.nds-section-wrapper`)

| Token | Default | Description |
|-------|---------|-------------|
| `--section-col-gap` | `var(--spacing-xl, 16px)` | Column gap between wrapper children |
| `--section-row-gap` | `var(--spacing-xl, 16px)` | Row gap between wrapper children |

---

## Color Variants

Apply on `.nds-content-section`:

| Class | Background | Use case |
|-------|-----------|----------|
| *(none)* | White | Default section |
| `.nds-blue` | Blue 950 | Dark blue featured sections |
| `.nds-green` | Green 900 | Success / nature themed |
| `.nds-neutral` | Neutral 900 | Dark neutral sections |
| `.nds-brand` | Brand light | Subtle brand highlight |
| `.nds-ghost` / `.noBg` | Transparent | No background, no shadow |

---

## Spacing Logic

### Head margin-bottom
- **Standalone head** (no wrapper): `margin-bottom: var(--spacing-4xl)` when followed by `.nds-section-content` (uses `:has(~ .nds-section-content)`)
- **Head inside wrapper**: `margin-bottom: 0` — wrapper's `row-gap` handles spacing

### Wrapper margin-bottom
- When wrapper is **not the last child**: `margin-bottom: var(--spacing-4xl)` — creates space before content outside wrapper
- In **cardView** layout: reduced to `var(--spacing-2xl)`

### Title and description
- Both use `&:not(:last-child)` for conditional `margin-bottom`
- Title: `margin-bottom: var(--section-title-MB)` when not last child
- Description: `margin-bottom: var(--section-description-MB)` when not last child

---

## Hero Section

The hero uses the same section tokens and structure. Sub hero wraps head + action in a wrapper:

```html
<section class="nds-hero-section sub">
    <nav class="nds-breadcrumb-nav">...</nav>
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h1 class="nds-section-title">Page Title</h1>
            <div class="nds-section-meta">
                <div class="nds-section-tags">...</div>
            </div>
            <p class="nds-section-description">Page description.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">Primary Action</span>
            </a>
        </div>
    </div>
</section>
```

Hero-specific token overrides:
- **Main hero**: larger title (`--nds-display-clamp-lg-*`)
- **Sub hero**: medium title (`--nds-display-clamp-md-*`)

---

## Layout Modifiers

| Modifier | Scope | Effect |
|----------|-------|--------|
| `.nds-horizontal` | Section | Switches wrapper to `grid-template-columns: auto 1fr` on desktop |
| `.cardView` | Content layout | Sections get shadow, border-radius, smaller spacing |
| `.wSideMenu` | Content layout | Adds side menu, sections get shadow |
| `.noBg` / `.nds-ghost` | Section | Transparent background, no shadow |
| `.nds-full-width` | Section child | Spans full grid width |
| `.nds-breakout` | Section child | Spans breakout grid width |

---

## Section Striping

Alternating section backgrounds are automatically applied via `_sectionLayout.scss`:

- **Without side menu**: Even sections get reset (transparent)
- **With hero**: Odd sections get reset instead (since hero takes first visual slot)
- **With side menu**: Striping applies only on tablet and below
- **cardView**: No striping (each section is a card)
