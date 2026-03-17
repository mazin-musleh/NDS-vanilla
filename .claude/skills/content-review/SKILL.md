---
name: content-review
description: Audit and improve content quality on any .md page in the project. For component doc pages (components/*.md), audits against doc-page skill standards and reports gaps. For all other pages, writes and refines polished English promotional/informational content. Use this skill for homepage polish, writing new promotional pages, auditing doc page quality, or any content writing task.
argument-hint: "[page-path or 'audit' for bulk doc page audit]"
---

# Content Review

Apply this skill to: `$ARGUMENTS`

**Mode detection** — based on the argument:
- Path starting with `components/` → **Doc Audit Mode**
- The word `audit` → **Bulk Audit Mode**
- Any other path → **Content Writing Mode**

---

## Doc Audit Mode

Audit a single component doc page against `/doc-page` skill standards.

### Steps

1. **Read the page** (`components/{name}.md`)
2. **Read the component's SCSS** (`_sass/components/_{name}.scss`) — extract all variant classes, sizes, states, layout modifiers, accessibility features
3. **Read the component's JS** (search `_js/` for matching file) — extract public API methods, events, keyboard handling, auto-init selector
4. **Build Source Inventory vs Page Inventory** — same as the doc-page Smart Merge process
5. **Classify each section** as CURRENT, INCOMPLETE, OUTDATED, or MISSING

### Output

Report as a structured list:

```
## {Component Name} — Audit Report

**Overall**: Good / Needs Work / Outdated

### Section Status
- Overview: CURRENT | INCOMPLETE (missing: nds-compact variant) | OUTDATED (old toggle pattern) | MISSING
- Variants: ...
- Layout Variants: ...
- States: ...
- Usage Guidelines > Built-in Features: ...
- Usage Guidelines > When to Use: ...
- Usage Guidelines > JavaScript API: ...

### Front Matter
- lang/direction: ✓ | ✗
- breadcrumb: ✓ | ✗

### Code Quality
- Tab/panel IDs follow pattern: ✓ | ✗
- Code matches demo HTML: ✓ | ✗
- No placeholder text: ✓ | ✗

### Recommendation
Run `/doc-page {name}` to fix these issues.
```

Do NOT modify the page — only report. Direct the user to `/doc-page` for fixes.

---

## Bulk Audit Mode

Scan all component doc pages and produce a prioritized summary.

### Steps

1. List all `.md` files in `components/`
2. For each page, perform a lightweight check:
   - **Front matter**: has `lang: en` and `direction: ltr`?
   - **Usage Guidelines**: has `nds-content-block` with Built-in Features, When to Use?
   - **JS API**: if component has a JS file in `_js/`, does the page document the JS API?
   - **Code tabs**: does each `nds-demo-card` have a `demo-code` section with tabs?
   - **Demo content**: uses real content (not "Lorem ipsum", "Sample", "Test")?
3. For components with SCSS, check if the number of variant demo cards roughly matches the number of variants in SCSS

### Output

Summary table sorted by severity (worst first):

```
## Doc Page Audit — All Components

| Component | Status | Issues |
|-----------|--------|--------|
| checkbox  | Outdated | No Usage Guidelines, missing JS API, placeholder text |
| stepper   | Needs Work | Missing Built-in Features block, 2 variants not demoed |
| alert     | Good | All sections present and current |
| ...       | ...    | ... |

### Priority Order
1. checkbox — run `/doc-page checkbox`
2. stepper — run `/doc-page stepper`
...
```

---

## Content Writing Mode

Write or refine content for any non-component page (homepage, examples, getting-started, etc.).

### Before Starting

1. **Read the target page** if it exists
2. **Read `layout/section.md`** for section hierarchy and structure patterns
3. **Read `standard-page.md`** or `subsite.md` for front matter template
4. **Check `_sass/_hgiRoundedStroke.scss`** — verify every icon class used on the page exists

### Content Principles

- **Two audiences**: developers (want technical specifics, code examples, API docs) and decision-makers (want value propositions, capabilities, scope)
- **Concrete over generic**: "33 production-ready components with dark mode, RTL support, and WCAG 2.1 AA compliance" beats "A comprehensive design system"
- **No placeholder text**: every heading, description, and list item should be meaningful and specific
- **Verified icons only**: grep every `hgi-*` class against `_sass/_hgiRoundedStroke.scss` — broken icons are worse than no icons
- **NDS components in the page**: promotional pages should use real NDS components (cards, grids, sections, buttons) — the page itself is a live showcase
- **Professional English**: clear, concise, Saudi government context. All content is fictional for demo purposes.

### For Existing Pages — Audit and Fix

1. Check for broken icons (grep against `_hgiRoundedStroke.scss`)
2. Check for placeholder or generic copy
3. Check section structure matches `layout/section.md` patterns
4. Check that NDS components are used correctly (proper class names, attributes)
5. Rewrite weak sections with concrete, specific content

### For New Pages

1. Use `standard-page.md` front matter template
2. Set `lang: en`, `direction: ltr`
3. Build page using NDS section hierarchy from `layout/section.md`
4. Register in `_data/sidemenu/sidemenu.yml`
5. Verify build: `bundle exec jekyll build`

---

## Related Skills

- `/doc-page` — creates and refines component documentation pages (the skill this audit mode measures against)
- `/demo-content` — manages `_data/content/` YAML files for demo data
