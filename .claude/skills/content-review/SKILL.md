---
name: content-review
description: Site-wide health auditor for the NDS project. Runs lightweight checks on any single page or bulk-scans all directories for broken icons, placeholder text, undocumented components, and sidemenu coherence. Use this skill to audit site health, validate icons, check coverage, or find stale/broken content anywhere in the project.
argument-hint: "[page-path | 'audit' | 'icons' | 'coverage']"
---

# Content Review — Site Health Auditor

Apply this skill to: `$ARGUMENTS`

**Mode detection** — based on the argument:
- A page path (e.g., `components/accordion.md`, `examples/dashboard-demo.md`) → **Page Health Check**
- `audit` → **Full Site Audit**
- `icons` → **Icon Validation**
- `coverage` → **Coverage Report**

This skill is **read-only** — it reports issues but does NOT modify files. It directs users to the appropriate skill for fixes:
- Doc pages → `/doc-page`
- Example/promotional pages → `/example-page`
- YAML content data → `/demo-content`

---

## Page Health Check

Lightweight health check on any single page. Does NOT run Smart Merge (that's `/doc-page`'s job). Checks structural health only.

### Steps

1. **Read the target page**
2. **Icon validation**: grep all `hgi-*` and `nds-hgi-*` classes on the page. Verify each `hgi-NAME` (content icon) exists in `_sass/_hgiRoundedStroke.scss` (font glyphs the shipped woff2 actually contains) and each `nds-hgi-NAME` (UI icon) exists in `UI_ICONS` of `scripts/generate-icons-scss.mjs`
3. **Placeholder text detection**: scan for Lorem ipsum, "Sample", "Test", generic "Tag 1/2/3", "Content coming soon"
4. **Component class validation**: grep all `nds-*` classes used, verify each exists in `_sass/components/` or `_sass/layout/`
5. **Sidemenu registration**: check that the page has an entry in `_data/sidemenu/sidemenu.yml`
6. **Front matter**: verify `lang`, `direction`, `breadcrumb` are set

### Output

```
## {Page Name} — Health Check

**Overall**: Healthy / Issues Found

### Checks
- Icons: ✓ | ✗ (list broken icons)
- Placeholder text: ✓ | ✗ (list occurrences)
- Component classes: ✓ | ✗ (list unknown classes)
- Sidemenu: ✓ | ✗
- Front matter: ✓ | ✗ (list missing fields)

### Recommendation
Run `/doc-page {name}` or `/example-page {name}` to fix.
```

---

## Full Site Audit

Scan ALL documentation and example pages across the project. Produces a prioritized health summary.

### Directories Scanned

- `components/` — component documentation
- `ui-shell/` — UI Shell documentation
- `layout/` — layout documentation
- `utilities/` — utility documentation
- `examples/` — example and promotional pages

### Steps

1. **List all `.md` files** across all five directories
2. **For each page**, run lightweight checks:
   - **Front matter**: has `lang` and `direction`?
   - **Icons**: any `hgi-*` classes that don't exist in the font?
   - **Placeholder text**: any Lorem ipsum, "Sample", "Test", "Content coming soon"?
   - **Usage Guidelines** (doc pages only): has `nds-block` with Built-in Features, When to Use?
   - **JS API** (doc pages only): if component has a JS file in `_js/`, does the page document the JS API?
   - **Code tabs** (doc pages only): does each `nds-demo-card` have a `demo-code` section?
   - **Component classes** (example pages): do all `nds-*` classes still exist in SCSS?
3. **Run Coverage Report** (see below) as part of the audit
4. **Run Sidemenu Coherence Check**:
   - Every page in the scanned directories has a sidemenu entry
   - Every sidemenu entry points to a page that exists

### Output

```
## Site Health Audit

### Doc Pages
| Page | Category | Status | Issues |
|------|----------|--------|--------|
| accordion | Component | Good | — |
| expandable-content | Utility | Needs Work | Placeholder text (Lorem ipsum) |
| header | UI Shell | Outdated | "Content coming soon" stub |

### Example Pages
| Page | Status | Issues |
|------|--------|--------|
| services-list | Good | — |
| dashboard-demo | Needs Work | 2 broken icons |

### Coverage Gaps
(see Coverage Report output)

### Sidemenu Coherence
- Missing entries: [pages without sidemenu registration]
- Dead links: [sidemenu entries pointing to non-existent pages]

### Priority Order
1. header — run `/doc-page header` (stub page)
2. expandable-content — run `/doc-page expandable-content` (placeholder text)
3. dashboard-demo — run `/example-page dashboard-demo` (broken icons)
```

---

## Icon Validation

Scan all `.md` files and `_data/` YAML files for `hgi-*` icon classes and validate against the font.

### Steps

1. **Grep all files** for `hgi-` class patterns:
   - All `.md` files in `components/`, `ui-shell/`, `layout/`, `utilities/`, `examples/`, and root
   - All `.yml` files in `_data/`
2. **Extract unique icon class names** (e.g., `hgi-search-01`, `nds-hgi-award-03`)
3. **Verify each**:
   - `hgi-NAME` (content icon — font-rendered): check NAME exists in `_sass/_hgiRoundedStroke.scss`
   - `nds-hgi-NAME` (UI icon — mask-rendered): check NAME is in `UI_ICONS` of `scripts/generate-icons-scss.mjs`
4. **Report broken icons** with file locations and which mechanism the file expects

### Output

```
## Icon Validation Report

**Total unique icons used**: 85
**Valid**: 82
**Broken**: 3

### Broken Icons
| Icon class | Files using it |
|------------|----------------|
| hgi-old-icon | examples/dashboard-demo.md (line 45) |
| hgi-removed | _data/content/services.yml (line 12) |
```

---

## Coverage Report

Cross-reference SCSS component files and JS files against existing documentation pages to find undocumented components.

### Steps

1. **List all SCSS files** in `_sass/components/`
2. **List all JS files** in `_js/` that are component files (exclude `nds-core.js`, `nds-loader.js`, `nds-showcase.js`, `nds-fontLoading.js`)
3. **List all doc pages** across `components/`, `ui-shell/`, `layout/`, `utilities/`
4. **Cross-reference** using the name-mapping table from `/doc-page` SKILL.md:
   - Which SCSS files have NO matching doc page?
   - Which JS files have NO matching doc page?
   - Which doc pages have NO matching SCSS file? (orphaned docs)

### Output

```
## Coverage Report

**SCSS components**: 43 | **Documented**: 33 | **Coverage**: 77%

### Undocumented Components (have SCSS but no doc page)
| SCSS file | JS file | Suggested action |
|-----------|---------|------------------|
| _autocomplete.scss | nds-autocomplete.js | `/doc-page autocomplete` |
| _cookie.scss | nds-cookies.js | `/doc-page cookie` |
| _user-feedback.scss | nds-user-feedback.js | `/doc-page user-feedback` |
| _hero.scss | — | Internal (hero section styling) — may not need docs |
| _backdrop.scss | nds-backdrop.js | Internal (used by modal/drawer) — may not need docs |
| _DGAdigitalStamp.scss | — | Internal (DGA compliance badge) — may not need docs |

### JS-only modules (no SCSS, no doc page)
| JS file | Purpose | Suggested action |
|---------|---------|------------------|
| nds-theme.js | Theme switching | Consider utility doc page |
| nds-share.js | Share functionality | Consider utility doc page |
| nds-cookies.js | Cookie consent | `/doc-page cookie` |
```
