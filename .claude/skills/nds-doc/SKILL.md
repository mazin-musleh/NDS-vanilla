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
| `ui-shell/topbar.md` | a shell page: a part canon framed with `data-preview="page"`, a Parts table |
| `layout/grid.md` | a reference page: one `Example` group of whole examples |
| `core/refresh.md` | an info page: a `Usage` section of code-only canons, no preview |

---

## Phase 1: Resolve

1. Glob for `$0.md` in `components/`, `ui-shell/`, `layout/`, `utilities/`, `core/`. Found: use it. Not found: a new page (default `components/`).
2. Find the source files. **Never assume file names:** `sidemenu` → `_js/nds-sideMenu.js`, `truncate-text` → `_sass/_utilities.scss`, grid → `_sass/_grid.scss`. Try the exact name, then partial matches in `_sass/components/`, `_sass/layout/`, `_sass/` and `_js/`, then grep the root class (`.nds-$0`). The component's entry in `_js/nds-loader.js` names its namespace and init.
3. Pick the page type:

| Type | Pages | Builder |
|---|---|---|
| Component | most of `components/`, `utilities/` | options you combine: Structure plus modifier groups |
| Shell | `ui-shell/` (mainnav, footer, topbar, sidemenu, hero) | a part canon in a frame (`data-preview="page"`), at every screen size |
| Reference | `layout/` (grid) | one `Example` group of whole examples, never mixed toggles. A layout whose options combine freely (flex: direction, gap, align) is a Component builder |
| Info | `core/`, `ui-shell/header` | none. Explains how something works: a `Usage` section with code-only canons (`data-preview="none"`). A page that only composes parts with their own pages (the header) shows each part's root with a comment linking that page, never the parts' markup again |

---

## Phase 2: Read

**The source is the truth. The old page is only a checklist.** Old pages drift: never copy a fact from one without finding it in the source.

Read every time:
- **`EDITORIAL.md`.**
- **The SCSS, whole:** every class, modifier, knob (`--x` and its `var()` fallback), state selector, media rule, and the accessibility mixins.
- **The JS, whole:** init, every public method, every event and its `detail`, keyboard handling, every `data-*` it reads, every state it writes. The banner at the top of the file is the public surface.
- **The shared files it rides, banner only:** `_js/nds-forms.js` and `_sass/components/_forms.scss` for fields, `_js/nds-core.js` for `NDS.State` and `NDS.Status`. Read further only for a fact the banner does not answer: each JS file is ~86 KB.
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
| Behavior (optional) | `nds-doc-behavior` | one entry per structure or option that behaves differently, for people |
| Examples (optional) | `nds-doc-examples` | real uses of a layout component, each with a preview and its code |
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
  - **JS:** `data-lang="js"`. `data-js="{id}"` on the base names its JS twin: the same component as one `create()` call, shown in a JS tab. `data-tab-label` on either canon renames its tab, and a twin with no `data-lang` shows as HTML (the head's Head and JS Library tabs). A JS-only structure (a toast) previews as a Run button that runs the code shown.
  - **Code-only:** `data-preview="none"`, for `<head>` and JS examples.
  - **CSS twin:** a builder whose `data-js` twin is `data-lang="css"` shows that CSS alone as its code, and each Structure (or `Pack`) canon shows its own twin. The preview is a picture of the code (the token packs, `components/tokens.md`).
  - **Generated:** `data-generated`, for a canon whose body is build output: one Liquid output tag, such as `{{ site.data.tokens.packs.spacing.html }}`. `check-docs.py` allows the Liquid there.
  - **Run:** `data-preview="run"`, for markup that leaves the card (a FAB docks at the screen edge). The card holds Run (`data-run-label` renames it), which adds a copy of the code shown, and Clear. A choice rebuilds the last copy added.
  - **Panel:** `data-preview="panel"`, for markup that needs a page around it (a TOC over a long article, a shell). The card holds Preview (`data-run-label` renames it), which opens a tall, resizable bottom panel with the code shown mounted in it. The panel body zeroes `--nds-nav-height`, so sticky parts pin to its top. Add `data-preview-flush` when the markup brings its own padding (a section): the body gets `nds-flush`. Closing it removes the copy.
  - **Page:** `data-preview="page"`, for a canon that is a whole `<body>` (Page Layout), or a page part that must not share the doc page (the top bar: its ids would clash with the page's own). The preview is a page of its own in a frame, Desktop at 1280px wide scaled to fit, with the header and footer left out. Desktop is a plain frame with no device around it; Tablet and Phone show a device. A whole-body canon's rows can target `body`. A part's code is the part alone. `data-preview-height="360"` (page px at 1280 wide) sets its Desktop frame height, 800 without it: make it fit the tallest open state (a menu, a panel).
  - **JS-started:** `data-preview="js"` with `data-js`, for a component with no `init()` (Sort). The preview runs the JS tab after each render. A Structure canon may reuse the base's root id, since the one call names it.
  - **Demo-only:** `data-code="none"`, a Behavior demo in a preview card with no code. Its wiring `<script>` sits after the canon, never in it. Mark it `data-demo-script` to run it in each screen too: it then runs before the runtime, so its top level only binds listeners.
- **A canon never holds `</script>`:** the first one ends it. Code with a `<script>` tag inside is written as plain HTML in a Liquid `capture`, and the canon holds `{{ x | strip | escape }}` with `data-escaped`, so the build does not escape it twice (`ui-shell/head.md`).
- **Screen widths:** every preview card has Desktop, Tablet and Phone buttons beside Dark mode. Tablet and Phone show the preview in a device screen 768×720 or 390×720 at full size (a card too narrow for one hides its button, and a phone reader gets none; the first button, no frame, names the reader's own device), so a breakpoint class (`nds-vertical-sm`) shows on a desktop too and a popup has a real screen to open in. The screen pads its content by the template's page gutter (`--nds-viewport-padding`: 32px, 16px on a phone); `data-preview-flush` on the base canon drops it, for markup that brings its own padding (a section). A Panel card has none. A Run card's screen holds its own Run and Clear, and its copies open in that screen. `data-screens="none"` on a canon drops them, for a preview that drives the real page (Themes: a toggle in a screen would theme the frame, not the page).
- **Preview width:** `data-demo-width="300px"` on the base canon fixes the preview's width, for a field that would otherwise shrink or stretch to its content. Preview only: the code never shows it. `data-demo-size="32px"` sets the preview's font-size, for parts that size in em (icons).
- **Light frame:** `data-preview-light` on a page canon keeps the frame light on a dark site, so a dark area shows against a light page (Themes' Dark Areas). On Desktop the frame takes the card's width and its content's height, like a plain preview; `data-preview-height` is only its height before it loads. Tablet and Phone show the usual screens. The card's own Dark toggle still darkens it.
- **Preview style:** `data-preview-style="…"` on a page canon (`data-preview="page"`) adds CSS to the preview frame only, for a demo that needs a size the markup must not carry (the side info's column grows to 500px with Beside the title). Key it on the option's own class, so it shows only with that option.
- **Form fields** whose validation is worth trying add `data-harness="form"` to the base canon: the preview sits in a real `form.nds-form`, with Validate and Reset buttons that show only while a rule can fail (required, min and max checked, pattern, length). A pass shows an inline success alert: fields carry errors only. The code never shows the form. Make rules that can combine (at least, at most) a combo row, not separate exclusive options. Skip it where a field can fail only one way that the builder already shows (radio: only when nothing is chosen).
- **A stepper** adds `data-harness="stepper"`: Back and Next buttons under the preview move the canon's root id. The code never shows them.
- **A form that is the component's own markup** (user feedback validates the form it sits in) stays in the canon: add `data-form` to the canon script, and `check-docs.py` allows the `<form>`. Never use it for a demo wrapper.
- **Dark mode:** every preview card gets Dark mode and Grid lines toggles in its top corner, builder or not. On a builder card, Dark writes `data-theme="dark"` on the markup's outer element, so the copied code carries it; on a plain card it darkens the card only. Dark hides while the site itself is dark: NDS has no light area to switch to. Never add a Dark option to the Variants table. Grid lines changes only the card, never the code.
- **Shell pages** preview in a frame, Desktop included: `data-preview="page"` with the shell part as the canon (no `<body>`). The frame keeps the part's ids and scripts apart from the doc page's own shell, which has the same ids.
- **Options placement:** up to 3 rows sit inline above the preview; 4 or more open in a bottom panel, so the preview stays in view. `data-options="inline"` or `"panel"` on the base canon overrides it. A panel or fab doc needs `inline`: its demo's own panel closes the options panel.
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
- `Group (any)` (Validation (any)) is a row of on/off chips: each turns on and off by itself, so any mix stacks with no combo rows. Use it for parts that add up (password rules). The row label drops `(any)`.
- **A default part:** a `(default)` row whose Markup is `canon #part` says the canon carries a copy of that part. The builder takes the copy out (found by its markup, so write the part exactly as the canon has it) and puts every part that is on back in table order, so any mix keeps one order. Its ids may repeat the base's. With `(any)`, parts toggle one by one (the top bar's widgets).
- **Two rows with the same Group and Option are one choice** that makes both changes. Tell agents to write both.
- `Structure` (or `Example` on a reference page, `Pack` on the tokens page) rows swap the whole markup: `canon #id` and `—` in On element.
- **Option markers:** `(hint: text)` is the chip's tooltip. `(limit: 2 widgets)` caps the chips that share it: once two are on, the others stay off and their tooltip says "Up to 2 widgets" (the top bar's DGA limit). A limit of 1 makes the chips exclusive, and the tooltip names the other one: "Not with Desktop: Start side". `(demo: + size-sm)` also turns on the row marked `(id: size-sm)`, for a demo that only shows with it. It goes by id, never by name, so a translated page keeps working. Mark every row of that choice with the id. A row can carry several `demo` markers. `(not: home, minimal)` turns the option off while a Structure row marked `(id: home)` or `(id: minimal)` is chosen: use it when that structure has no class of its own for a `:not()` target, and when its canon already carries the option (`check-docs.py` then allows it). `A + B` is a combo row: its group becomes multi-select, and both chips on use the combo's markup.

**Markup cell** (CSS selector syntax):
- `.cls` class · `[attr]` bare attribute · `[attr="v"]` attribute · `[data-state~="t"]` a token
- `--prop: value` a custom property in `style` · `prop: value;` a CSS property in `style` (the `;` tells it from a `create()` option) · `.prop = value` a JS property (checkbox `indeterminate`)
- `canon #id` in Structure: swap the markup; elsewhere: insert that part
- `remove` deletes the On element · `key: value` sets a `create()` option, and `key.sub: value` one key inside an object option, so chips that share it stack · `—` no change

**On element cell:**
- A selector for the element the change goes on. A row whose element is not in the current markup is disabled, and its row label says why ("Needs Structure: Group", "Not on Structure: Progress").
- **Prefer a target on one element:** a tag, classes, pseudo-classes, `:not(.cls)`, `:not(:has(…))`, or an `#id`. A descendant target (`.a > .b`) is read loosely: `.b` must be in the markup and `.a` anywhere in it. When a choice also has a one-element target, the build and the browser ignore its descendant targets, so a descendant row is best as the second row of a choice.
- **One item of a repeated set** (the first radio in a group): target it by its canon id (`#radio-1`), or by `:first-of-type` / `:first-child` on the element itself. Say in the paragraph above the table that the option goes on the item the user means.
- A `(default)` row with `—` in Markup and a target in On element is disabled where the target is missing: `Click (default)` on `.nds-tooltip:not(.nds-btn)` is off on the Button structure. Pair it with a `demo` marker on that structure so it starts on its own default.
- `(start)`, `(after)`: where a part is inserted. The default is the end.
- `:not(.cls)` disables an option where it does not fit: `.nds-btn:not(.nds-progress)`, `.nds-btn:not(.nds-btn-group > .nds-btn)`. **Use it for every combination the component cannot style.** When the fix belongs in the component, fix the SCSS instead: the docs never paper over a component gap.
- `create()`, `create({ key: value })`, `create():not({ key: value })`: a row on the JS twin.

**Use cell:** when to pick it, one or two sentences, and what not to combine it with.

**Not in the builder:** state that a script sets for a moment (a button's `data-status` flash) goes in the API table, not the Variants table. Field states shared with every field are one reference row that links to Forms, with `—` in Markup and On element, so it gets no chip: `| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |`.

### Behavior

Only for a component whose structures or options change what it DOES, not only how it looks: a picker, a search box, a portal, a lazy menu (dropmenu, pagination, filter, tables, the form fields). A page of looks only (tags, cards, link) has no Behavior section.

- Written for people, who never see the Variants table. It explains; it never copies a Use cell.
- One `### Name` heading per entry (a noun), then 2 to 4 sentences: what it does, when to pick it, how it behaves, and the attribute or class that turns it on.
- Facts that a table holds (every attribute, every key) stay in the API and are not repeated.
- **Behavior or Built-in Features?** A fact that a structure or an option turns on goes to Behavior. A fact that happens with no option goes to Built-in Features. It never goes in both.

### Examples

Only for a layout component whose builder shows placeholders, not a real use (toolbar). The builder teaches the layout; each example is one real use of it that an agent can copy whole.

- One `### Name` heading per example (a noun, "Table Bar"), one sentence on what it shows, then one canon. The canon renders a preview and its code.
- Copy a real use from `examples/` or from a component that builds the layout itself. Do not invent a use no page has.
- An example has no options: it is one fixed use. The layout options stay in the builder.
- A component that builds the layout itself (the editor's toolbar) is a visual example: a preview only, `data-code="none"`, and one short line that links its page. Do not explain how it builds the layout.

### Built-in Features

The component's showcase: its highlights and what they give the developer. An existing list is kept, with its titles and icons: improve the wording, fix a claim the source disproves, and add a highlight the source supports that the list misses.

- Wrapper: `<div class="nds-definition-list nds-divided nds-grid">` inside the section. The build sets the columns: no inline style, no extra class.
- Item markup comes from a model page. Title: a short noun phrase. Description: one or two sentences.
- RTL and dark mode are project features, not a component's: leave them out.
- Only what happens with no option. What an option turns on goes to Behavior.
- A structure or a part (a status tag's dot, a group) is not a feature: the Markup section shows it.
- Usually 4 to 8 items.

### Best Practices

Do and don't bullets, one instruction each, with the reason when it is not obvious: when to pick an option, what not to combine, content limits, accessibility the developer must write (a label, an `aria-label`). Usually 5 to 10.

### API

In this order, each only when the source has it:
1. **Classes** or **Other Classes:** classes the builder does not show. Class \| Element \| Effect.
2. **Data Attributes:** Attribute \| Element \| Effect. Skip internal init stamps.
3. **CSS Custom Properties:** Property \| Default \| Controls. Say where to set them when that matters.
4. **Tokens:** the component's group in `_sass/tokens/_components.scss` gets `### Tokens` with `{{ site.data.tokens.components.<name>.html }}`, the generated Token \| Preview \| Value table. Never hand-written. A line above it names the source, since an agent reading the `.md` sees only the Liquid tag: `Source: the \`<name>\` group in \`_sass/tokens/_components.scss\`.` A knob whose default is a token names it in its Default cell: that is not a duplicate.
5. **JavaScript:** a Method \| Effect table, an Option \| Default \| Effect table for `create()`, an Event \| Fired on \| Detail table, then one `data-lang="js"` canon example, then "The full API is in the banner of `_js/nds-x.js`."

The Effect, Controls, Holds, Detail and Use columns keep 320px on a phone: the build sets it from those header names, so use those names for a prose column.

**The Data Attributes table needs its own pass: it drifts on almost every rewrite.** Build it from the JS, not the old page. Grep every read and write of each attribute (`getAttribute`, `setAttribute`, `removeAttribute`, `NDS.State.add` / `remove`, `dataset`, selectors in `querySelector`), and write each row from those hits:
- **Group rows by element**, in the order a reader builds the markup: the owner or container, then its parts, then the items. The rows of one element sit together.
- **One attribute on two kinds of element is two rows.** Each Element cell names its element so the two cannot be confused: "an `input.nds-check`" and "any element except a checkbox", never "the element" twice.
- **A state row says who writes it and every way it goes:** "The script sets it when…, and removes it when…". Name each method that also writes it (`clear()` removes it). Say "Set it yourself" for the case the script leaves to the page.
- **A value the page writes at load is stated exactly:** "Write the count at page load in it (usually `0`)", never "a starting number" or "so it reads right".
- **Fact, not benefit.** No "so the line needs no X": say what the attribute does, and what another attribute does instead.
- **No undefined term.** A word the page has not defined ("slot", "host") is replaced with the element it means.

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

Build the page only from NDS components. If the page looks wrong, the gap is in a component: fix its SCSS. The only doc styling is what `_plugins/docs_canon.rb` writes: the features grid knobs, the Variants table width, the preview frame, the Preview divider, the form harness's alert gap, the token catalog's swatches, the prose column width, and the Dark mode toggle hidden on a dark site.

### Registration (new pages only)

1. Add the page to `_data/sidemenu/sidemenu.yml`.
2. Add its catalog entry to the matching `_data/content/*.yml`, copying a neighbor entry's keys.
3. Set the breadcrumb for its category.

---

## Phase 6: Verify

**Steps 1, 2 and 3 (and 6, once approved) run in one sonnet agent**, not in the main session: the build, check and screenshot loop is most of a page's turns, and every turn re-sends the whole session. Give it the page path and these steps; it fixes what the page owns (canons, Variants rows) and reports back only its findings, the fixes it made, and any component bug it did not fix. A component SCSS fix comes back to the main session.

1. **Build:** `bundle exec jekyll build`. Restart `jekyll serve` after a change to `_plugins/`.
2. **Check the page:** `python scripts/check-docs.py <page>`. It checks the section order, the canons (no Liquid, escaping, `<form>` or `demo-` id), unique ids, every canon the Variants table names, and that no canon already carries an option it can turn off.
3. **Inspect the built options:** list the chips in the built HTML and confirm the defaults and the disabled chips are right.
4. **Cold read:** a sonnet agent reads ONLY the `.md` and writes 3 or 4 copy tasks ("a disabled large switch", "a vertical group of three medium buttons with the second chosen"). Every answer must be right. Fix the page where the agent guessed.
5. **Parity:** a sonnet agent lists every fact in the old page (`git show HEAD:<page>`) as KEPT, CHANGED, LOST or CONTRADICTION against the new one. Check each LOST, CHANGED and CONTRADICTION item in the source: restore the true ones, and name the ones the source disproves in the commit message.
6. **Browser check — only on the owner's go-ahead.** The owner checks most changes in the browser; a run on every small edit wastes time and tokens (owner call 2026-09-27). After a change, say what to look at and offer the run in one line. Run it only after a yes. This covers builder changes in `_plugins/docs_canon.rb` and `_js/nds-docs.js` too. `node scripts/doc-check.mjs <page>` clicks every builder option and prints findings: console errors, an empty preview, a small component stretched to full width, a disabled icon that differs from its label. It writes one contact sheet per theme to `tmp/doc-check/`: look at both. The preview frame centers its content, so a part meant to fill its container that shows shrunk (or spilling out) there has a real bug: fix the component, then compare that part's size on every page against the old build. A finding in a component is fixed in its SCSS, in its own commit. The owner still reviews the page last.
   **What to offer it for:** a change to a canon, a Variants row, the component's CSS or the builder. A prose edit does not change what it clicks, so never offer it for one. It tries one option at a time, so a bug that needs two options (an icon and More, Vertical and Loading) passes it. Check such a pair with a short script that picks both.

   **Compact before the owner tests.** Once the first pass of steps 1 to 6 is clean, stop and tell the user to run `/compact keep the page path, the old claims the source disproves, and the open items`. The owner's test rounds (drop a chip, rename a structure, fix a default) come next, and each round re-sends the whole session: the source, the old page and the model page read in Phase 2 would ride along on every one (measured 2026-09-27: one page cost 3% of the weekly limit, mostly in those rounds). Re-read a file after the compact only when a round needs it.

7. **Text review:** read the page's prose top to bottom against `EDITORIAL.md`, the Variants and API cells included: one word for one thing, sentences under ~25 words, no semicolon joining two instructions, no fact said twice, no claim you did not check. The owner asks for this before every commit.

**Checklist**
- [ ] Every class, attribute, knob, method and event in the source is on the page.
- [ ] Every claim was checked against the source.
- [ ] The Data Attributes table was rebuilt from a grep of the JS, per its rules under API.
- [ ] Sections in skeleton order, each with its class; Variants is `hidden`.
- [ ] Canons: no Liquid, no escaping, no demo-only parts, unique ids, 2-space indent.
- [ ] Every combination the component cannot style is disabled with `:not()`, or fixed in the SCSS.
- [ ] Every icon name was verified.
- [ ] The page passes the `EDITORIAL.md` checklist.
- [ ] `since`, `updated`, `last_edit` set per the rules.
- [ ] The commit names every old claim the source disproved.

**One page per session.** After the commit, tell the user to `/clear` before the next page: a session that runs page after page re-sends every earlier page's history on each turn (160–560 M cached tokens per session, measured 2026-09-27).
