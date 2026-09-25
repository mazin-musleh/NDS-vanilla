---
name: nds-doc
description: Work with NDS documentation pages — create new pages, rewrite old-format pages into the one-source format (data-canon blocks, a generated builder, a hidden Variants table), refine or audit existing ones, rewrite their prose in plain English. Covers components/*.md, ui-shell/*.md, layout/*.md, utilities/*.md, and core/*.md. Use for any task on canon markup, builder options, Variants tables, reference tables, Built-in Features, Best Practices, or doc-page wording ("rewrite this doc", "simplify this doc", "add an option to the builder").
argument-hint: "[name] [optional: specific task]"
---

# NDS Documentation Page

Apply this skill to: `$ARGUMENTS`

A doc page has two readers. **People** browse it, try options in the builder and copy code. **AI coding agents** read its `.md` source and copy the canon. So each fact lives once on the page, in a form both can use, and every fact matches the SCSS and JS source.

| Concern | Source |
|---|---|
| Facts: classes, attributes, knobs, states, APIs, events | the component's SCSS and JS |
| Page format | this skill, and the model pages below |
| Words: sentences, terms, claims, tone | `EDITORIAL.md` |

**Model pages** (read the one that fits before you write):

| Page | Shows |
|---|---|
| `components/switch.md` | a simple component, a JS event table, the Forms dedup link |
| `components/cards.md` | structure canons, part inserts, combo rows, many groups |
| `components/alert.md` | a JS twin (`data-js`), `create()` rows, a JS-only structure with a Run button |
| `components/button.md` | many structures, `:not()` targets that disable bad combinations |
| `ui-shell/footer.md` | a shell page: code-only canon, `data-live`, a Parts table |
| `layout/grid.md` | a reference page: one `Example` group of whole examples |

**Parked, never convert without their own plan:** `components/tokens.md`, `ui-shell/head.md`, `components/forms.md`, `components/themes.md`, `components/icons.md`, `components/accessibility.md`, `layout/section.md`, `components/filter.md`, `components/tables.md`, `components/chart.md`.

---

## Phase 1: Resolve

1. Glob for `$0.md` in `components/`, `ui-shell/`, `layout/`, `utilities/`, `core/`. Found: use it. Not found: a new page (default `components/`).
2. Find the source files. **Never assume file names:** `sidemenu` → `_js/nds-sideMenu.js`, `truncate-text` → `_sass/_utilities.scss`, grid → `_sass/_grid.scss`. Try the exact name, then partial matches in `_sass/components/`, `_sass/layout/`, `_sass/` and `_js/`, then grep the root class (`.nds-$0`). The component's entry in `_js/nds-loader.js` names its namespace and init.
3. Pick the page type:

| Type | Pages | Builder |
|---|---|---|
| Component | most of `components/`, `utilities/` | options you combine: Structure plus modifier groups |
| Shell | `ui-shell/` (header, mainnav, footer, topbar, sidemenu, hero, page-shell) | code-only canon; `data-live` changes the page's own copy |
| Reference | `layout/` (grid, flex), `core/` | one `Example` group of whole examples, never mixed toggles |

---

## Phase 2: Read

**The source is the truth. The old page is only a checklist.** Old pages drift: never copy a fact from one without finding it in the source.

Read every time:
- **`EDITORIAL.md`.**
- **The SCSS, whole:** every class, modifier, knob (`--x` and its `var()` fallback), state selector, media rule, and the accessibility mixins.
- **The JS, whole:** init, every public method, every event and its `detail`, keyboard handling, every `data-*` it reads, every state it writes. The banner at the top of the file is the public surface.
- **The shared files it rides:** `_js/nds-forms.js` and `_sass/components/_forms.scss` for fields, `_js/nds-core.js` for `NDS.State` and `NDS.Status`.
- **`_data/sidemenu/sidemenu.yml`:** confirm every part you link exists.
- **The page's entry in `_data/content/*.yml`:** its catalog card must agree with the hero description.
- **The model page** for this page type.

**Delegated components** (loaded after first paint, e.g. accordion) ship their first-paint state in the canon: a default-open accordion item has `data-state="open"` on both the toggle and the collapse.

---

## Phase 3: Analyze (existing pages)

**Old format:** the page has `nds-demo-card`, `demo-toggle-btn`, `data-toggler` or hand-escaped code tabs (`&lt;`). Status: **REWRITE**. Skip the section-by-section check: inventory the source, list the old page's facts, and go to Phase 4.

**New format:** check each section twice, for structure (this skill) and content (the source). Give it one status:

| Status | Meaning | Action |
|---|---|---|
| CURRENT | structure, content and prose pass | leave it |
| PROSE | the wording fails the `EDITORIAL.md` checklist | rewrite the prose only |
| INCOMPLETE | the source defines items the page lacks | add them |
| OUTDATED | a claim the source contradicts, or a structure break | fix it |
| MISSING | a skeleton section is absent | create it |

---

## Phase 4: Report

**Stop. Show the report and wait for approval before any edit.**

```
## {Name} — Doc Report

### Source Inventory
- SCSS: [classes, modifiers, knobs, states]
- JS: [methods, events, keyboard, data attributes]

### Status
- REWRITE (old format), or per section: CURRENT | PROSE | INCOMPLETE | OUTDATED | MISSING

### Planned
- Structures and groups for the builder, one line each
- Old claims the source disproves (these are dropped, and named in the commit)
```

New pages and targeted edits skip Phases 3 and 4.

**Timing:** while a component's markup or API is still changing, do not edit its page. Do one pass once the design settles.

---

## Phase 5: Build

### Front Matter

- `lang: en`, `direction: ltr`. Copy `standard-page.md` for a new page.
- `title`: the component name. `hero_title`: `{Name} - National Design System`.
- `hero_description`: one sentence on what it is. Not repeated in the Overview.
- `since`: set once. `updated`: bump only when the COMPONENT changed (source, markup, API), to `version` in `_config.yml` without `-dev`. `last_edit`: bump on any content change, from the local `date` (`DD/MM/YYYY - HH:MM AM/PM`, Riyadh time).

### Skeleton

Sections in this order. Each `<section>` carries its class. A section the component does not need is left out, never reordered.

| Section | Class | Holds |
|---|---|---|
| Overview | `nds-doc-overview` | a paragraph on what it is and its parts, then "Pick another component when:" and a list |
| Markup | `nds-doc-markup nds-demo-section` | the base canon (the builder), then its structure, part and JS canons |
| Parts (shell only) | `nds-doc-parts` | Part \| Holds \| Required |
| Variants | `nds-doc-variants`, with `hidden` | the builder's table |
| Built-in Features | `nds-doc-features` | the component's highlights |
| Best Practices | `nds-doc-practices` | do and don't bullets |
| API | `nds-doc-api` | reference tables and one JS example |
| Related | `nds-doc-related` | the examples and templates that use it |

Section ids are `{name}{Section}`: `btnOverview`, `gridApi`.

**Markdown bodies.** Prose and tables are markdown: the section body gets `markdown="1"` (and `nds-prose` for text). A table takes the IAL `{: .nds-table .nds-responsive}`. Inside a `markdown="1"` body, a line indented 4 or more spaces is a code block, so the closing `</div>` tags after markdown start at column 0 to 3. Headings inside the API section are `### Title` then `{: .nds-block-title}`.

**Inline code is plain backticks.** The build gives it the NDS look and picks `lang-html`, `lang-js` or `lang-css` from its shape and its table. Hand-written HTML (the features list) writes `<code class="nds-inline-code lang-…">` itself.

### Overview

A short paragraph: what the component is and what it is made of. Then `Pick another component when:` and a list, each item `condition: [Component](../path)`. A shell page ends with a sentence that names where the other navigation lives instead. Rules go to Best Practices. A fact the page states elsewhere is not repeated here.

### Canon Blocks

The canon is the one copy of the markup. Both readers use it: the build renders the preview and the code from it, and an agent copies it from the `.md`.

```html
<script type="text/html" id="switch-single" data-canon data-variants="switchVariantsTable">
<div class="nds-form-container nds-switch-container">
  …
</div>
</script>
```

- **Written once, plain HTML.** No Liquid, no escaping, no demo-only parts: no `demo-` ids, no `<form>` or Submit wrapper, no attribute that a builder option adds.
- **Ids are unique across the page's canons.** Text, images and URLs are sample content; the structure is the canon.
- **URLs are page-relative:** `../assets/img/x.webp`, `href="#"`.
- **Indent with 2 spaces.** Write each element that a part is inserted into on its own lines, so the insert lands indented.
- **Kinds of canon:**
  - **Base:** carries `data-variants="{table id}"`. It is the builder.
  - **Structure:** named by a `Structure` (or `Example`) row. Reached only through the builder.
  - **Part:** a small block that a row inserts, such as an icon or an actions row.
  - **JS:** `data-lang="js"`. `data-js="{id}"` on the base names its JS twin: the same component as one `create()` call, shown in a JS tab. A JS-only structure (a toast) previews as a Run button that runs the code shown.
  - **Code-only:** `data-preview="none"`, for shells, `<head>` and JS examples.
- **A canon never holds `</script>`.** Code with a `<script>` tag inside stays out of the canon format for now (see `ui-shell/head.md`).
- **Shell pages** add `data-live="footer.nds-footer"` to change the page's own copy, and `data-sheet="top"` to slide the options from the top.
- **Reference pages:** each example canon opens with an HTML comment that says what it does: `<!-- 3 columns on desktop, 2 on tablets, 1 on phones -->`.

### Variants Table

The builder is generated from this table, and agents read it as the list of every option. People never see it: the section ships `hidden`, so anything a person needs goes to Best Practices, the Overview, or a feature.

```
| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | SM (default) | — | — | … |
| Size | LG | `.nds-lg` | `.nds-switch-container` | … |
{: #switchVariantsTable .nds-table .nds-responsive}
```

A short paragraph above the table explains any target that is not obvious (what `:first-child` or `create()` means on this page).

**Groups and options**
- Rows that share a Group are one set of chips. `(default)` marks the one the canon already shows. A group whose default is `None` shows no None chip: a second tap on the chosen chip turns it off.
- A Group with one row is an on/off chip in the "More" row.
- **Two rows with the same Group and Option are one choice** that makes both changes. Tell agents to write both.
- `Structure` (or `Example` on a reference page) rows swap the whole markup: `canon #id` and `—` in On element.
- **Option markers:** `(hint: text)` is the chip's tooltip. `(demo: + Other)` also turns on option Other, for a demo that only shows with it. `A + B` is a combo row: its group becomes multi-select, and both chips on use the combo's markup.

**Markup cell** (CSS selector syntax):
- `.cls` class · `[attr]` bare attribute · `[attr="v"]` attribute · `[data-state~="t"]` a token
- `--prop: value` a custom property in `style` · `.prop = value` a JS property (checkbox `indeterminate`)
- `canon #id` in Structure: swap the markup; elsewhere: insert that part
- `remove` deletes the On element · `key: value` sets a `create()` option · `—` no change

**On element cell:**
- A selector for the element the change goes on. A row whose element is not in the current markup is disabled, and its row label says why ("Needs Structure: Group", "Not on Structure: Progress").
- `(start)`, `(after)`: where a part is inserted. The default is the end.
- `:not(.cls)` disables an option where it does not fit: `.nds-btn:not(.nds-progress)`, `.nds-btn:not(.nds-btn-group > .nds-btn)`. **Use it for every combination the component cannot style.** When the fix belongs in the component, fix the SCSS instead: the docs never paper over a component gap.
- `create()`, `create({ key: value })`, `create():not({ key: value })`: a row on the JS twin.

**Use cell:** when to pick it, one or two sentences, and what not to combine it with.

**Not in the builder:** state that a script sets for a moment (a button's `data-status` flash) goes in the API table, not the Variants table. Field states shared with every field are one reference row that links to Forms, with `—` in Markup and On element, so it gets no chip: `| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |`.

### Built-in Features

The component's showcase: its highlights and what they give the developer. An existing list is kept, with its titles and icons: improve the wording, fix a claim the source disproves, and add a highlight the source supports that the list misses.

- Wrapper: `<div class="nds-definition-list nds-divided nds-grid">` inside the section. The build sets the columns: no inline style, no extra class.
- Item markup comes from a model page. Title: a short noun phrase. Description: one or two sentences.
- RTL and dark mode are project features, not a component's: leave them out.
- Usually 4 to 8 items.

### Best Practices

Do and don't bullets, one instruction each, with the reason when it is not obvious: when to pick an option, what not to combine, content limits, accessibility the developer must write (a label, an `aria-label`). Usually 5 to 10.

### API

In this order, each only when the source has it:
1. **Classes** or **Other Classes:** classes the builder does not show. Class \| Element \| Effect.
2. **Data Attributes:** Attribute \| Element \| Effect. Skip internal init stamps.
3. **CSS Custom Properties:** Property \| Default \| Controls. Say where to set them when that matters.
4. **JavaScript:** a Method \| Effect table, an Option \| Default \| Effect table for `create()`, an Event \| Fired on \| Detail table, then one `data-lang="js"` canon example, then "The full API is in the banner of `_js/nds-x.js`."

The Effect, Controls, Holds, Detail and Use columns keep 320px on a phone: the build sets it from those header names, so use those names for a prose column.

### Related

Links to the examples and templates that use the component, each with what it shows there.

### Links, Icons and Languages

- **Links are page-relative:** `[Modal](../components/modal)` in markdown, `href="../components/modal"` in HTML. No Liquid.
- **Never guess an icon name.** A feature icon is `<i class="hgi hgi-stroke hgi-NAME"></i>`. Verify every name with one anchored grep before you write it:
  ```bash
  grep -E "\.hgi-(name1|name2):" _sass/_hgiRoundedStroke.scss
  ```
  UI icons in a canon (`nds-icon nds-hgi-NAME`) come from `_data/content/icons.yml`.
- **Demo languages** follow `EDITORIAL.md` section 7.

### No Docs CSS

Build the page only from NDS components. If the page looks wrong, the gap is in a component: fix its SCSS. The only doc styling is what `_plugins/docs_canon.rb` writes: the features grid knobs, the Variants table width, the preview frame, the Preview divider, and the prose column width.

### Registration (new pages only)

1. Add the page to `_data/sidemenu/sidemenu.yml`.
2. Add its catalog entry to the matching `_data/content/*.yml`, copying a neighbor entry's keys.
3. Set the breadcrumb for its category.

---

## Phase 6: Verify

1. **Build:** `bundle exec jekyll build`. Restart `jekyll serve` after a change to `_plugins/`.
2. **Check the page:** `python scripts/check-docs.py <page>`. It checks the section order, the canons (no Liquid, escaping, `<form>` or `demo-` id), unique ids, every canon the Variants table names, and that no canon already carries an option it can turn off.
3. **Inspect the built sheet:** list the chips in the built HTML and confirm the defaults and the disabled chips are right.
4. **Cold read:** a sonnet agent reads ONLY the `.md` and writes 3 or 4 copy tasks ("a disabled large switch", "a vertical group of three medium buttons with the second chosen"). Every answer must be right. Fix the page where the agent guessed.
5. **Parity:** a sonnet agent lists every fact in the old page (`git show HEAD:<page>`) as KEPT, CHANGED, LOST or CONTRADICTION against the new one. Check each LOST, CHANGED and CONTRADICTION item in the source: restore the true ones, and name the ones the source disproves in the commit message.
6. **No browser** unless the owner asks. Visual confirmation is the owner's.

**Checklist**
- [ ] Every class, attribute, knob, method and event in the source is on the page.
- [ ] Every claim was checked against the source.
- [ ] Sections in skeleton order, each with its class; Variants is `hidden`.
- [ ] Canons: no Liquid, no escaping, no demo-only parts, unique ids, 2-space indent.
- [ ] Every combination the component cannot style is disabled with `:not()`, or fixed in the SCSS.
- [ ] Every icon name was verified.
- [ ] The page passes the `EDITORIAL.md` checklist.
- [ ] `since`, `updated`, `last_edit` set per the rules.
- [ ] The commit names every old claim the source disproved.
