---
name: example-page
description: Create, refine, audit, or brainstorm example and promotional pages that showcase NDS components working together. Covers examples/ pages (dashboards, service listings, registration flows), homepage, and promotional/landing pages. Use this skill for any multi-component composed page, page ideas, or showcase content.
argument-hint: "[name or 'plan'] [optional: specific task]"
---

# NDS Example Page

Apply this skill to: `$ARGUMENTS`

## Modes

**Mode detection** — based on the argument:

- `plan` or `ideas` → **Plan Mode** — brainstorm example page ideas
- Path to existing page (e.g., `dashboard-demo`) → **Refine Mode** — update and improve
- New name with a brief (e.g., `hr-portal using cards, tables, stepper`) → **Create Mode** — build from scratch
- `audit` → **Audit Mode** — check all example pages for health issues

## Scope

This skill handles **composed pages** — full pages that use multiple NDS components together to create realistic interfaces:

| Type | Location | Examples |
|------|----------|----------|
| Example pages | `examples/` | Service listings, dashboards, registration flows, faculty profiles |
| Promotional pages | root or custom dirs | Homepage (`index.md`), landing pages |

These are fundamentally different from doc pages (which demonstrate one component at a time with demo cards and code tabs).

---

## Plan Mode

Brainstorm example page ideas based on available NDS components.

### Steps

1. **Inventory available components** — list all component SCSS files in `_sass/components/` to understand what building blocks exist
2. **Review existing examples** — list all `.md` files in `examples/` to avoid duplication
3. **Identify gaps** — what common government digital patterns are NOT yet represented?
4. **Propose 3-5 new example pages** with:
   - Page name and purpose
   - Which NDS components it would showcase
   - Content type (what `_data/content/` YAML it would use or need)
   - Language/direction (most examples should be English LTR, but some Arabic RTL examples are valuable)

### Output

Present ideas as a prioritized list, noting which would showcase the most underused components. Then use `/grill-me` to stress-test the proposals — resolve questions about scope, component choices, content needs, and layout decisions before committing to building any page.

---

## Create Mode

Build a new example or promotional page from a brief.

### Before Starting

1. **Read reference files**:
   - `layout/section.md` — section hierarchy and grid structure
   - `standard-page.md` — front matter template
   - `examples/services-list.md` — reference for Liquid data loops + filter/search composition
   - `examples/dashboard-demo.md` — reference for multi-component dashboard composition
   - `examples/registration.md` — reference for Arabic RTL form flows with `minimal` layout
   - `examples/faculty.md` — reference for profile/detail page with `nds-cardView` and `sidemenu_mode: top`
2. **Read the SCSS** for each NDS component the page will use — verify class names and available variants
3. **Check `_data/content/`** for available YAML data — use existing data via Liquid loops where applicable
4. **Look up icons**: grep each name against `_sass/_hgiRoundedStroke.scss`. **NEVER guess.** Use `<i class="hgi hgi-stroke hgi-NAME">` for content/demo icons (font); only use `<i class="nds-icon nds-hgi-NAME" aria-hidden="true">` if NAME is in `UI_ICONS` of `scripts/generate-icons-scss.mjs`.

### Front Matter Conventions

Example pages vary in layout. Choose based on page type:

| Page type | Layout | Key front matter |
|-----------|--------|------------------|
| Full page with sidemenu | `page` | standard breadcrumb |
| Full-width page | `page` | `body_class: fullWidth`, `layout_class: nds-content-wrapper nds-toEdge` |
| Standalone (no chrome) | `minimal` | `layout_class: nds-middle`, `exclude_showcase: true` |
| Detail/profile page | `page` | `layout_class: nds-cardView`, `sidemenu_mode: top` |
| Hidden from sidemenu | any | `sidemenu_mode: false` |

All example pages set `lang` and `direction` based on content language (English LTR or Arabic RTL).

### Content Principles

- **Realistic Saudi-context content** — Saudi names (Ahmed, Fatima, Khalid), gov.sa domains, SAR currency, Saudi cities
- **No placeholder text** — every heading, description, and data point must be meaningful
- **Use `_data/content/` YAML** via Liquid loops when listing repeated items (services, users, etc.)
- **Verified icons only** — every `hgi-*` class must exist in `_sass/_hgiRoundedStroke.scss`
- **The page itself is a showcase** — it demonstrates how NDS components compose together in a real interface

### Page Structure

Example pages use NDS section hierarchy (`nds-content-section` → `nds-section-wrapper` → `nds-section-head` + `nds-section-body`) but do NOT use demo cards or code tabs. The page IS the demo.

### Registration Checklist

1. Add to `_data/sidemenu/sidemenu.yml` under Examples (if it should appear in nav)
2. Set appropriate breadcrumb (e.g., `["Examples"]` or `["Examples", "/examples"]`)
3. Build test: `bundle exec jekyll build`
4. If the page needs YAML content that doesn't exist yet, use `/demo-content` to create it

---

## Refine Mode

Update an existing example page.

### Steps

1. **Read the existing page** (`examples/$0.md` or resolve from argument)
2. **Read SCSS** for every NDS component used on the page — check for renamed/removed classes, new variants
3. **Check content quality**:
   - No placeholder text (Lorem ipsum, "Sample", "Test", "Tag 1", "Tag 2")
   - Icons verified against `_sass/_hgiRoundedStroke.scss`
   - Content is realistic and Saudi-context appropriate
4. **Check component usage**:
   - All NDS class names still exist in current SCSS
   - HTML structure matches current component patterns (compare against doc pages in `components/`)
   - No deprecated patterns or removed attributes
5. **Apply improvements** — fix issues found, update to current patterns, improve content quality

---

## Audit Mode

Check all example pages for health issues. Read-only — report findings without modifying files.

### Steps

1. List all `.md` files in `examples/` and any promotional pages (homepage, etc.)
2. For each page, check:
   - **Component classes**: grep all `nds-*` classes used, verify each exists in `_sass/components/` or `_sass/layout/`
   - **Icons**: grep all `hgi-*` classes, verify against `_sass/_hgiRoundedStroke.scss`
   - **Placeholder text**: scan for Lorem ipsum, "Sample", "Test", generic "Tag 1/2/3"
   - **Content sourcing**: check if page uses `site.data.content.*` Liquid loops or hardcodes repeated data
   - **Front matter**: has `lang`, `direction`, `breadcrumb`

### Output

Summary table sorted by severity:

```
## Example Pages — Audit Report

| Page | Status | Issues |
|------|--------|--------|
| services-list | Good | All checks pass |
| dashboard-demo | Needs Work | 2 icons not in font, hardcoded data |
| registration | Good | All checks pass |

### Priority Fixes
1. dashboard-demo — fix broken icons, consider Liquid data loops
```
