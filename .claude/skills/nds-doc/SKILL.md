---
name: nds-doc
description: Work with NDS documentation pages — create new pages, refine or audit existing ones, rewrite their prose in plain English, add sections, fix code tabs, update guidelines. Covers components/*.md, ui-shell/*.md, layout/*.md, utilities/*.md, and core/*.md. Use for any task on demo cards, code examples, toggle controls, reference tables, usage guidelines, or doc-page wording ("simplify this doc", "rewrite the prose", "make it easier to read").
argument-hint: "[name] [optional: specific task]"
---

# NDS Documentation Page

Apply this skill to: `$ARGUMENTS`

A doc page is a **component inventory**. Developers browse the live demos, set options with toggle controls, and copy production-ready code. AI coding agents copy the same code as canon. So every page must match what the SCSS and JS source actually define.

Three sources decide a page, each for its own concern:

| Concern | Source |
|---|---|
| Facts: variants, states, APIs, events, attributes | the component's SCSS and JS |
| Structure: demo cards, code tabs, sections | `components/alert.md` |
| Words: sentences, terms, claims, tone | `EDITORIAL.md` |

---

## Phase 1: Resolve

Find the target page and its source files.

1. Glob for `$0.md` in `components/`, `ui-shell/`, `layout/`, `utilities/`, `core/`.
2. Found: use that path and its category. Not found: this is a new page (default `components/`).

| Category | Directory | SCSS | Example |
|---|---|---|---|
| Components | `components/` | `_sass/components/` | `accordion`, `modal`, `tags` |
| UI Shell | `ui-shell/` | `_sass/components/` | `header`, `sidemenu`, `footer` |
| Layout | `layout/` | `_sass/layout/` | `grid`, `section` |
| Utilities | `utilities/` | `_sass/` or `_sass/layout/` | `numbers`, `truncate-text` |
| Core | `core/` | none | `refresh`, `request` |

**Never assume file names.** Page names do not always match source names (`sidemenu` → `_js/nds-sideMenu.js`; `truncate-text` lives in `_sass/_utilities.scss`). Try the exact name, then partial matches in `_sass/components/`, `_sass/layout/`, and `_js/`. If nothing matches, grep for the root class (`.nds-$0`). Some components share a JS file (form controls live in `_js/nds-forms.js`); the component's entry in `_js/nds-loader.js` names its init function and namespace. Core pages document `_js/nds-core.js` and `_js/nds-loader.js` APIs.

**Treatment by category:** components, UI shell, and utilities get the full page (variants, sizes, states, JS API, usage guidelines). Layout and core pages are lighter: skip Variants and States, and focus on custom properties, demos, and behavior.

---

## Phase 2: Read

**The source files are the truth. The existing page is suspect until checked.**

Read every time:

- **`EDITORIAL.md`**: how every sentence on the page reads.
- **`components/alert.md`**: the structure standard. Take from it the demo card skeleton (`.nds-demo-card` with `demo-header`, `demo-container`, `demo-code`), the code tabs (`.nds-tabs .nds-code`), the toggle controls, the Built-in Features grid (`.nds-definition-list.nds-divided.nds-grid.nds-doc-features`), the Usage Guidelines blocks, and the JS API block.
- **The SCSS file, whole:** every variant, size, state, modifier, layout mode, and accessibility mixin (`reduced-motion`, `high-contrast`, `print-media`).
- **The JS file, whole and deeply:** init trigger, every public method (namespace and instance), every `CustomEvent` and its `detail`, every keyboard interaction, every `data-*` it reads, every state it manages, and how instances are reached.
- **`_data/sidemenu/sidemenu.yml`**: the map of the system. Use it to name related parts, link them, and confirm that any part you mention exists.
- **The page's entry in `_data/content/*.yml`**: its catalog card. Its description must agree with the page's hero description.

Read when relevant:

- `standard-page.md` (front matter for a new page), `layout/section.md` (section tiers), `playground.md` (demo HTML).
- `components/chart.md` (API-heavy), `components/cards.md` (builder demos), `components/modal.md` (overlay trigger pattern) for complex parts.

**Delegated components** (moved out of the main bundle, e.g. accordion) load their JS after first paint. Any state the JS used to stamp must ship in the canonical markup: the live demo AND the code tab carry it (a default-open accordion item has `data-state="open"` on both the toggle button and `.nds-accordion-collapse`), and the Data Attributes table lists it. Markup without it flashes on load.

---

## Phase 3: Analyze (existing pages)

Build a full model of what the source supports, then check each section of the page twice:

1. **Structure:** does it match `alert.md`? Code tabs must hold entity-encoded markup (`&lt;div&gt;`); raw HTML inside `<code class="lang-html code">` is OUTDATED.
2. **Content:** does it match the source, completely? **Check every claim in the prose too:** counts, names, defaults, behavior. A wrong claim is OUTDATED, however well it reads.

Give each section one status:

| Status | Meaning | Action |
|---|---|---|
| CURRENT | structure, content, and prose all pass | leave it |
| PROSE | structure and content pass; the wording fails the `EDITORIAL.md` checklist | rewrite the prose only |
| INCOMPLETE | structure passes; the source defines items the page lacks | add them |
| OUTDATED | wrong structure, a claim the source contradicts, or placeholder text | rebuild; keep valid text |
| MISSING | a needed section does not exist | create it |

---

## Phase 4: Report

**Stop. Show the report and wait for approval before any edit.**

```
## {Name} — Doc Report

### Source Inventory
- SCSS: [variants, sizes, states, modifiers]
- JS: [methods, events, keyboard, data attributes]

### Section Status
- [Section]: CURRENT | PROSE (n sentences) | INCOMPLETE (missing: …) | OUTDATED (wrong: … per source file:line) | MISSING

### Actions Planned
- per status, one line each
```

New pages and targeted edits skip Phases 3 and 4.

**Timing:** while a component's behavior, markup, or API is still changing, do not edit its doc page. Do one accurate pass once the design settles.

---

## Phase 5: Build

### Front Matter

- Doc pages are English and LTR: `lang: en`, `direction: ltr`. Copy `standard-page.md` for a new page. Never use `layout_class: nds-cardView` or `sidemenu_mode: top`.
- `since`: the version the page first shipped. Set once.
- `updated`: bump only when the COMPONENT changed (source, markup, or API). Value: `version` in `_config.yml` without `-dev`.
- `last_edit`: bump on any content change, including a prose-only rewrite. Format `DD/MM/YYYY - HH:MM AM/PM`, Riyadh time (the local `date`).

### Naming

- `title`: the component name only.
- `hero_title`: `{Name} - National Design System`.
- `hero_description`: one sentence on what the part is and what it is for, covering every use the demos show. No feature list. Keep the catalog card's description in agreement.
- Section titles: nouns that name the variant or mode ("Inline", "Toast Notifications"), never "Overview".
- Section descriptions: one or two sentences on when to pick this variant. Not how it works inside.

### Page Structure

```
1. Main demo (demo cards with toggle controls)
2. Variants (if any)
3. Sizes (if any)
4. States (if any)
5. Built-in Features (its own section)
6. Usage Guidelines (Best Practices, reference tables, JS API)
```

A component with distinct display modes (default, inline, toast) gets one section per mode. Complex parts may add sections (an API Reference, builder demos) when the source warrants it.

### Demos

- **Class-only variants** (style, size): `data-toggler` buttons in one demo card. **Structurally different variants:** separate demo cards. Cover every variant and state the SCSS defines.
- **Toggle controls** (patterns in `alert.md`): one-of-many groups use a dropmenu with `.demo-toggle-menu`, placed first. On/off switches use flat `.demo-toggle-btn` buttons, placed after. Mark the default with `selected`.
- **A card with no toggles** gets a `<div class="demo-label">` inside `.demo-header`.
- **Loading state** is a toggle, not a section: a `.demo-toggle-btn` with `data-toggler='["nds-loading", "<root selector>", "loadingState"]'` on every demo card that has the standard action bar. The Modifier Classes and Data Attributes tables still list `nds-loading`.
- **Overlays** (modal, drawer, dropmenu) need a trigger button plus the hidden component inside `.state-demo`. See `components/modal.md`.
- **Demo-wiring JS** goes in `_js/nds-showcase.js`, never in the component's JS. A part that needs JS to render (charts, `NDS.Alert.create()`) uses a page-level `<script>` inside `DOMContentLoaded`.
- **Demo languages:** follow `EDITORIAL.md` section 7 (no Arabic short vowel marks; Persian or Urdu, never Hebrew).

### Code Tabs

Code tabs hold **production-ready, copy-paste markup only**.

- **A code tab is a direct copy of its live demo.** Take the markup from `.state-demo`, drop the demo-only wrappers (`.state-demo`, `.demo-container`), and fix the indentation. Never shorten it, cut items, or use placeholders ("Item title", `<!-- more items -->`).
- **Entity-encode it:** `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`. Live demo markup stays raw HTML.
- Unique IDs per card: `{component}-{variant}-{n}`. Tabs and panels: `tab-{component}-{variant}-{n}`, `panel-{component}-{variant}-{n}`.
- **JS API tab** only when the part has a programmatic creation API (`NDS.Alert.create()`, `NDS.Chart.create()`). Not for event listeners or method calls.
- Code longer than ~15 lines: add `nds-expandable` to the panel and wrap `<code>` in `<div class="nds-expandable-content">`.
- **A code block with no live demo** (a structure tree, a reference snippet) sits directly in its `.nds-block`, with no `.nds-showcase` / `.nds-demo-card` wrapper.

### Page Markup

- An `nds-block` holding bare `<p>`, `<ul>`, or `<ol>` gets `nds-prose`. A block of only components (tables, definition lists, demo cards) stays plain `nds-block`.
- Titles that stay out of the heading outline use `<span>` (with `display: block` in their style rule). A card title in a grid of tiles is a `<span>`; a standalone card that is a page section gets a real heading one level below the nearest heading above it.
- Inline code: `<code class="nds-inline-code lang-html">` for HTML, `lang-js` for JS. Never plain `<code>`.
- Links: `<a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a>`. Never an absolute path.

### Icons

**Never guess an icon name.** Plausible names often do not exist.

- A doc page authors **content icons only**: `<i class="hgi hgi-stroke hgi-NAME">`. Verify every name in one anchored grep before you write the HTML:
  ```bash
  grep -E "\.hgi-(name1|name2|name3):" _sass/_hgiRoundedStroke.scss
  ```
  A name the command does not print does not exist. Browse replacements with `grep -E "\.hgi-TOPIC" _sass/_hgiRoundedStroke.scss | head -20`. Never use an unanchored grep; it matches fragments.
- **UI icons** (`nds-icon nds-hgi-NAME`) appear only inside a code tab that copies a component's own live demo. Their names are in `_data/content/icons.yml` (source: `_sass/_icons.scss`).

### Built-in Features

Its own section, not inside Usage Guidelines. Wrapper: `<div class="nds-definition-list nds-divided nds-grid nds-doc-features">`; the `.nds-doc-features` modifier sets the columns, gaps, and icon size, so add no inline `style`. Item markup comes from `alert.md`.

- Each item names a capability the developer gets with the component, stated as fact.
- **Title:** a short, specific noun phrase ("Active Page Tracking", not "State Management").
- **Description:** one sentence on what the developer sees or controls. Interaction patterns are fine (collapsible, responsive). Internal mechanisms are not (`:has()`, fixed positioning, DOM detection). Name an attribute only when the developer writes it (`data-state="active"`), never one JS applies (`aria-expanded`).
- An even number of items (4, 6, 8) for the two-column grid.
- A JS component starts with "Auto-initialization" and ends with "Programmatic Control".
- Mention the SCSS accessibility mixins the component uses (reduced motion, high contrast, print).

### Usage Guidelines

1. **Best Practices:** as many bullets as the component needs, usually 5 to 10. Never pad. Cover: when to use it (specific scenarios), when not to and what to use instead (only parts that exist in `sidemenu.yml`), how to pick a variant when the demos do not make it obvious, and practical tips (item counts, grouping, content).
2. **Modifier Classes** (if the part has class variants, sizes, or modes): a `nds-table nds-responsive` of every modifier class from the SCSS, with what it does.
3. **Data Attributes** (if the JS reads `data-*` for configuration): each attribute, where it goes, and its values. Find them via `dataset` and `getAttribute('data-`. Skip internal ones (`data-initialized`).
4. **CSS Custom Properties** (if the SCSS exposes `--component-*` knobs or `var()` fallbacks): property, default, description.
5. **JavaScript API** (if the part has JS): the auto-init note plus an expandable code block of the full API with inline comments, as in `alert.md`.

Add Accessibility, Responsive Behavior, or Performance blocks only when the component genuinely needs them. Do not document what the reader already gets from the code (ARIA, semantic structure) or the demo toggles.

### Prose

All wording follows `EDITORIAL.md`. On doc pages specifically:

- Write for the developer who uses the system, never its maintainers: no repo scripts, build steps, or SCSS internals.
- A section description is one or two sentences, a feature description one sentence, a Best Practices bullet one clause.

**Prose-only rewrite (PROSE status):** change only the sentences. Leave the live demos, code tabs, table values that name classes or attributes, `id`s, and heading anchors exactly as they are. Bump `last_edit`, never `updated`.

### Registration (new pages only)

1. If needed, create the SCSS file and add `@use` to `assets/css/nds-main.min.scss`.
2. Add the page to `_data/sidemenu/sidemenu.yml` under its parent.
3. Add its catalog entry to the matching `_data/content/*.yml`, copying a neighbor entry's keys exactly.
4. Set the breadcrumb for its category.
5. Run `bundle exec jekyll build` to verify.

---

## Phase 6: Verify

Every item must pass. Fix any failure before you present the result.

**Source**
- [ ] Every variant, size, and state in the SCSS is demoed.
- [ ] Every public method, event (with `detail`), and keyboard interaction in the JS is documented.
- [ ] Every reference-table row comes from the source, not memory.
- [ ] Every claim in the prose was checked against the source.

**Structure**
- [ ] Demo cards match `alert.md`.
- [ ] Each code tab is an entity-encoded, full copy of its live demo.
- [ ] Unique IDs on all tabs and panels.
- [ ] Every icon name was verified with the anchored grep; content icons only outside copied demos.
- [ ] Built-in Features has an even number of items.
- [ ] Usage Guidelines has Best Practices, the reference tables the source calls for, and the JS API block (if the part has JS).

**Words**
- [ ] The page passes the `EDITORIAL.md` checklist.
- [ ] The hero description covers every use in the demos and agrees with the catalog card.
- [ ] No maintainer mechanics anywhere on the page.

**Front matter and registration**
- [ ] `lang: en`, `direction: ltr`; `since` / `updated` / `last_edit` set per the rules above.
- [ ] New pages: in `sidemenu.yml` and in the `_data/content/*.yml` catalog.
