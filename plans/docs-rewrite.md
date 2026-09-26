# Docs rewrite: one page, two readers

The page tracker lives in `TODO.md` (Docs rewrite item). Update it and the Status below after every page commit.

**Status (2026-09-26, end of session):** Phases 0, 1 and 2 DONE. Phase 3 (page-by-page rewrite) STARTED.

- **Pilots done (Phase 1):** switch, cards, alert, footer (shell), button, grid (reference: one `Example` group of whole examples, never mixed toggles).
- **Standard locked (Phase 2):** `/nds-doc` skill rewritten (f93e59df and later); `scripts/check-docs.py` (1e697ac4); `scripts/doc-check.mjs` (4f14be0c, owner-approved browser check: clicks every builder option in both themes, flags console errors / empty previews / stretched small parts / mismatched disabled colors, writes contact sheets to `tmp/doc-check/`; overlays are shot closed — add opening them on the first overlay page).
- **Phase 3 done:** radio (527a6540), checkbox (a4017098), chips (115b7de1), tags, featured-icons, link (with the link default flipped to primary, 3a1d126b), definition-list, tabs. Component fixes found on the way: readonly checkbox/radio/switch keyboard guard + disabled label color (66d6f349), button width fit-content (34310c9f), button group/progress/status (1ecd2ab4), chip width + disabled icon + no opacity (d132f059), tag width + ghost text on color (ee19e26e), card nds-center moved the card (5db40482), on-color button progress ring (17af2c0c), featured-icon dark style vs parent status + neutral fill (6f050226), definition-list md/sm titles on phones (fe2cf2bb), tabs card padding + RTL Home/End + centered column + vertical divided icon order (9fbe52c5).
- **Parked with their own plans:** tokens.md (full UX rework, LAST), head.md (top priority for agents; careful plan), and forms, themes, icons, accessibility, section, filter, tables, chart.
- **Process for Phase 3 (owner, 2026-09-26, revised same day):** ONE page at a time, no rush. Accuracy and quality beat speed, and each page doubles as a bug hunt on its component. For each page: read the source, write it via `/nds-doc`, run `check-docs.py`, run `doc-check.mjs` and look at both sheets, run a sonnet cold-read and parity agent, fix. Component bugs found on the way are fixed in the component, in their own commit. Then the owner reviews the page (the contact sheets help), and it is committed alone. No parallel agent drafting. Design calls the owner makes become skill rules.
- **Next page:** scroll-more. Order is by reuse (owner, 2026-09-26): tier 1 base components, then tier 2 built on them, then tier 3 form fields and complex; see the tracker in TODO.md.
- **Open, owner's calls:** the Neutral button is nearly black on the dark card in dark mode (tokens). On color turns a status tag's dot white, so every status looks the same (page says so today).
- **Settled on the way:** Overview = a paragraph + "Pick another component when:"; Built-in Features = the component's showcase: keep the original list, fix wording and false facts, never list RTL/dark; Variants rows target one element the build can read (`#id`, `:first-child`, `:not(.x)`); options apply to every item except a one-per-set state (checked radio); combinable rules are combo rows; a JS-only property (indeterminate) is not a builder option; a script-set state (button `data-status`) is documented in the API, not the builder; form fields get `data-harness="form"` only when a rule can fail two or more ways (Validate/Reset show only while a rule is on; a pass shows an inline success alert).

## Context

The 91 doc pages (59K lines, 4.07 MB) in `components/`, `ui-shell/`, `layout/`, `utilities/` and `core/` have two readers:
- **People** browse them on the site.
- **Consumer AI agents** read them through NDS IQ, today from both the `_source/…md` file and the built `_site/…html` twin.

Neither reader is served well today.

**People get:**
- Docs-only showcase chrome (`_sass/_showcase.scss`): a card inside a card inside a section, which wastes space on a phone.
- A different structure from page to page. Built-in Features, When to Use and Events appear on some pages only.
- Toggles on some pages and static demo galleries on others.

**Agents get:**
- **Two copies of the markup that drift.** The live demo and the escaped code tab (`&lt;`) are both written by hand. The Checkbox demo already differs from its code tab.
- **Options that only JS knows about.** In `cards.md`, the expandable, selectable, avatar and interactive markup exists only in `nds-showcase.js` (2,772 lines) or as `hidden` markup.
- **Demo-only noise.** `demo-` ids, `<form>` plus Submit wrappers, and about 100 "Remove bg" toggles.
- **Two reads per component.** Today agents read the `.md` and then the HTML twin.

**Why the last attempt failed.** The `demo.html` include, parked 2026-09-24, was bolted onto pages not written for it. Demo-only parts leaked into the canon, and agents had to decode Liquid capture calls to find the markup. This plan starts from goals, not from the current structure.

## Owner constraints (2026-09-24)

- **Not started yet.** Work begins later: a spike first, then pilot pages to review and improve before any mass rewrite.
- **Doc changes break nothing downstream,** so the structure is free to change completely. Work runs on `main`, page by page, with no branch.
- **The docs invent no UI.** `_sass/_showcase.scss` is retired, and the docs use only existing NDS components. A real gap is fixed in the component itself, as canon.
- **NDS IQ must keep working on every template version.** Its rules cover the old format and the new format alike, and name no version. NDS IQ is parked until the last phase.
- **The nds-doc skill is part of this rework** and becomes the tool the rewrite runs on.
- **Some pages get their own plan** (see "Own-plan pages").

## Goals

| # | Goal | Serves |
|---|---|---|
| G1 | **Each fact lives in one place on the page**, in a form both readers can use | both |
| G2 | **The canon is one exact copy of plain HTML**: not escaped, not generated, no demo-only parts, no Liquid around it | both |
| G3 | **Complete as text.** Every class, attribute and structural option is written on the page; nothing exists only in JS | agents |
| G4 | **The `.md` is enough on its own.** An agent reads only `_source/<folder>/<name>.md` and never needs the HTML twin for markup, options or rules | agents |
| G5 | **A builder:** try combinations, compare them, copy ready-made code | people |
| G6 | **Built-in Features and Best Practices kept**, rewritten short and direct | both |
| G7 | **One skeleton per page type.** Sections are optional by rule and never reordered | both |
| G8 | **Lean:** fewer bytes to read, full width on a phone, no docs-only CSS | both |
| G9 | **Nothing can drift.** Preview, code, builder and Variants table all come from the same source | both |

## Core design: a starting point the pilot loop will refine

### 1. Canon block: plain HTML inside `<script type="text/html">`

```html
<script type="text/html" id="switch-base" data-canon>
<div class="nds-form-container nds-switch-container">
  …exact markup, written once…
</div>
</script>
```

**Why this container:**
- **The build keeps it byte-exact.** kramdown copies the body of a `<script>` verbatim (`kramdown-2.5.1/lib/kramdown/parser/html.rb:101`) and re-parses every other tag. A `<template>` would reach the built page as `data-x=""`.
- **Browsers neither render nor run it.**
- **Agents read it straight from the `.md`:** plain HTML, one copy, no Liquid, no params (G2, G4).

**Canon rules:**
- Written once.
- No `demo-` ids and no test-only wrappers.
- No attributes that a toggle adds.
- Ids are unique across the canons on a page.
- Text, images and URLs are sample content; the structure is the canon.
- URLs are page-relative with no Liquid: `../assets/img/x.webp`, `href="#"`. Doc pages sit one folder deep, so these resolve on Pages and in the release zip.

**Canon variants:**
- **Code-only canon** adds `data-preview="none"`. It is for shells, `<head>` and JS.
- **JS canon** adds `data-lang="js"`.
- **Structure canon:** any canon named in a `Structure` row of the Variants table. It gets no preview or code block of its own; people reach it only through the builder. No attribute needed — the table says it.

### 2. Rendering: at build time, JS only for the builder (settled by the spike)

**A Jekyll `post_render` hook (`_plugins/docs_canon.rb`) writes the preview, the code block and the builder toolbar into the built HTML**, right after each canon block. The canon block itself stays in the page as the builder's source. `nds-docs.js` only wires the toolbar clicks; it inserts nothing on load.

**Why build time, not a JS stamp (measured 2026-09-24):**
- The fold gate paints page content before deferred scripts run. A JS stamp therefore inserted the preview after first paint: **0.46 CLS on a cold load** (warm loads were fine). Build-time output measured ~0.003, the same as today's switch page.
- The built HTML twin carries real preview markup, so an agent or a person reading the HTML sees it.
- `nds-docs.js` no longer has to load before `nds-main.min.js`; wiring takes under 1 ms.
- Build cost: ~0.9 ms per canon page, ~0.09 ms to skip a page without canons; a full build did not measurably slow.
- Pages builds through `.github/workflows/jekyll.yml` (Actions), so custom plugins run there and in `mkrelease.py`. Switching Pages back to "Deploy from a branch" would silently drop every preview.
- Dev note: Jekyll loads plugin code once at `serve` start — restart the server after editing `_plugins/`.

**The canon renders in one of two modes:**
- **Plain:** a live preview plus a code block. The code block follows the canonical markup in `components/code.md`, escaped by the build, so no hand-escaping is needed.
- **Builder:** a canon with `data-variants="switchVariants"`. The build writes an `nds-toolbar` generated from that table, then a divider, then the preview. Each choice changes the live preview, and it also changes a **pristine** canon clone that is serialized into the code block (then re-highlighted with `NDS.Code.reprocessCodeElement`).
  - The serializer dedents the markup.
  - It keeps bare attributes bare, so the output does not read `data-x=""`.
  - A structure swap calls `NDS.Init.destroy` on the old preview and `NDS.Init.mount` on the new one (spike: a swapped-in dropmenu initialized and opened).

**Builder chrome (owner calls 2026-09-24):**
- Toolbar buttons and the dropmenu trigger are `nds-md`. The toolbar lists every dropmenu first, then every toggle, each in table order. A dropmenu trigger reads `Group: Option` ("Meta: None", "Color: Blue"), so several menus showing "None" stay tellable apart.
- After the toolbar: `<div class="nds-divider nds-4xl" style="--divider-line-start: 24px;">Preview</div>`.
- Preview: `<div class="nds-block nds-card" style="--card-width: 100%; --card-radius: var(--radius-md);">`.
- When the preview holds any `.nds-oncolor`, the card adds `--card-bg: var(--background-primary-strong)` — at build for the default state, live when a builder choice adds or removes it. This replaces every green/dark-bg toggle (all 8 in today's docs are paired with an on-color option). Tags' "Black" background toggle is dropped.

**Options sheet (owner call 2026-09-25, supersedes the chip toolbar below):** the bar holds only Options and Reset at every width; every choice, Structure included, lives in a bottom `nds-panel` sheet (no backdrop, `--panel-height: 45svh`): one `nds-divider nds-3xl` label (line start 24px) per group over a row of `nds-chip nds-neutral nds-rounded` chips, single options last under "More"; a single-row `(default)` group starts selected (so cards' Style became Stroke (default) and Shadow). A row whose chips do not apply says why in its label (`· Needs …` / `Not on …`), since touch has no hover. `(hint: text)` in the Option cell is the chip's title tooltip. A group whose default row is `None` shows no None chip: tapping the chosen chip again returns to None. A combo row (Option `A + B`, e.g. cards' `Tags + Rating` → `canon #card-meta`) makes its group multi-select: A and B toggle on their own, and both on use the combo's markup; the combo gets no chip. Markup `remove` deletes the On element (alert's No close on `.nds-alert-close`); On element takes `:not(.cls)` for HTML and `create():not({ key: value })` for JS (alert's Color, off for Inline). Tried and dropped the same day: radios + switches, a group on/off switch, and an accordion per group — cramped and inconsistent on small pages. `data-hidden="lg"` now means 960px and up (was 960–1279), shipped with this work.

**Toolbar UX (owner-approved 2026-09-25):** toggles are `nds-chip nds-neutral nds-rounded` (dark when on); a control that does not apply stays in place **disabled**, its wrapper carrying `data-needs` ("Needs Actions", derived at build from which structure/part canon holds its target) shown as a hover title; a Reset button ends the row. A base canon with `data-js="id"` gets an HTML | JS tabbed code block (canonical `nds-tabs nds-code`), both computed from the same choices; a JS-only structure hides the HTML tab and previews as a Run button. A `(default)` row is never applied (the canon already holds it); a default part insert is removed when another option in its group is picked. Next to try: a bottom `nds-panel` for the options on phones (owner wants to see it before choosing phone-only vs everywhere).

**The builder is the base demo, not a second copy.** People see one demo. Agents see one canon block and have nothing to skip.

**Harness (built 2026-09-26, radio).** A form field's base canon carries `data-harness="form"`: `docs_canon.rb` wraps the preview (never the code) in `<form class="nds-form" data-ajax>` with a `[data-demo-slot]` for the field and a Validate submit button; `nds-docs.js` re-renders only the slot. Forms' own submit listener runs the validation.

**Actions.** Toast, FAB, cookies, upload and progress call the JS API. A JS canon block carries `data-action="toast"`, and the script adds a Run button that fires the matching entry in the `DEMO_ACTIONS` registry, which is moved over from `nds-showcase.js`. The pilot on alert.md tests this.

**Structural variants** are separate canon blocks, not JS. A `Structure` row in the Variants table lets the builder swap to one of them. This removes:
- cards' `rebuildCardCode` and the `data-card-*` handlers
- the stepper and `formFix*` handlers
- the rating and quote handlers

### 3. Variants table: agents read it, and the builder is generated from it

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | SM (default) | — | `.nds-switch-container` | … |
| Size | LG | `.nds-lg` | `.nds-switch-container` | … |
| State | Disabled | `[data-state~="disabled"]` | `.nds-form-container` | … |
| Structure | Expandable | canon `#card-expandable` | — | … |

**How the builder reads it:**
- Rows that share a Group become a dropmenu; `(default)` in the Option marks the pre-selected one.
- **A `(default)` row describes the canon as written.** Its Markup may name what the canon already has (cards: `Stroke (default) | .nds-stroke`); picking another option in that group removes it first (Shadow → no stroke; Plain → neither). A default row with `—` means the canon has nothing for that group.
- **`(demo: + Other)` in the Option also turns on option "Other"** when this one is picked (owner call 2026-09-24) — a demo aid, not markup: `Neutral (demo: + Checked)` turns on Checked, because the neutral color shows only when the switch is on. The `demo:` prefix is there because a cold-read agent, though it answered correctly with the bare `(+ Checked)`, flagged that a reader skimming the Option column could read it as "add checked too". The code shows `checked` only because the Checked button is now on; the row's Markup stays `.nds-neutral` alone, and its Use text says why the demo turns Checked on. The toolbar label drops the marker.
- A Group with a single choice becomes an on/off toggle.
- **The Markup cell uses CSS selector syntax**, so it reads as markup and parses without ambiguity:
  - `.cls` → class · `[attr]` → bare attribute · `[attr="v"]` → attribute · `[data-state~="t"]` → `data-state` token
  - `--prop: value` → inline custom property · `.prop = value` → JS property (checkbox `indeterminate`)
  - `canon #id` → in the Structure group, swap the whole markup; in any other group, **insert that part block** into "On element", at its end, at its start when On element reads `(start)`, or right after it with `(after)` (owner call 2026-09-24, cards pilot: the price goes after `.nds-card-text`, before the meta). Part blocks are small canons reached only through the builder; the insert matches the siblings' indentation. A group can list exclusive part combos (cards' Meta: None / Tags / Rating / Tags and rating, because `.nds-card-meta` wraps tags only when a rating sits beside them)
  - `—` → no change
- **A control shows only when its "On element" is in the current markup** (owner call 2026-09-24): "Row" targets `.nds-switch-group`, so it hides for Single and shows for Group. The build hides it for the default structure; the script re-checks on each swap. A group whose rows all read `—` (e.g. "Field states → Forms") is reference only and gets no control.
- **Two rows with the same Group + Option are one choice** that changes both. This replaces explicit `data-toggler` for the 76 multi-step toggles (fab, modal, upload, truncate…).
- Coverage, measured over all 963 toggles in today's docs: everything fits except chart's 21 (chart-only operation → chart gets its own plan) and chips' 3 icon inserts (→ a structure canon).

**The Variants table is a blueprint, not reading (owner rule 2026-09-25).** It exists to build the toolbar and for agents to read in the `.md`; people learn the options by clicking the builder, and its terse Use cells lack the context a person needs. So the Variants section ships `hidden` (the builder and the build still read it from the page, and it stays in the HTML twin). Anything a person needs from it is written for people in another section — Best Practices, Overview, or a new section when that reads better — as advice with its reason, not a copy of the row.

**What it means for the page:**
- The toolbar and the table can never disagree.
- Invalid combinations are not enforced in JS. The Use column says what not to combine.

### 4. No docs-only CSS

The docs are built only from existing NDS components:
- `nds-toolbar` and `nds-dropmenu` for the controls
- `nds-block` + `nds-card` (knobs only) and `nds-divider` for the preview frame
- `nds-code` for code
- `nds-definition-list` for the features
- `nds-table` for the tables

If the pilot shows a gap, such as the dropmenu lacking a selected-item style, it is fixed in that component's SCSS.

**One exception, knobs only (owner call 2026-09-24):** `docs_canon.rb` writes one `<style>` into `<head>` of each canon page: `.nds-doc-features .nds-definition-list{--max-col:2;--mid-col:1;--min-col:1;--dl-icon-size:24px;--row-gap:24px;--col-gap:32px}`. It replaces the showcase rule `.nds-definition-list.nds-doc-features` (79 old pages) and the inline knobs some pages repeat. Build time, not JS, so the grid paints in its final columns. New pages carry no knobs or class on the list itself. The same `<style>` also sets `.nds-doc-variants .nds-table{--min-width:900px}` (owner call): the 5-column Variants table scrolls inside its wrapper on a phone or tablet rather than squeezing its Use column.

### 5. Open pilot experiment: markdown for prose and tables

HTML tables and section chrome make up much of what an agent reads. The pilot tries **markdown for prose and tables** inside the section body: `markdown="1"` on the body, with the kramdown IAL `{: #id .nds-table}` for classes. It keeps whichever renders correctly with the fewer bytes. The Variants table parse has to work with either form.

**Spike results:** the markdown table and prose render correctly. Two catches:
- Inside a `markdown="1"` body, any line indented 4+ spaces is a code block — an indented closing `</div>` became escaped text and broke the page. Closing tags after markdown go at column 0–3.
- Backtick code renders as `<code class="language-plaintext highlighter-rouge">`, without the NDS inline-code style. **Settled (pilot):** `docs_canon.rb` rewrites it to `nds-inline-code lang-html`, so pages write plain backticks. In a table cell, multi-part code stays ONE `<code>` (one value to any reader of the HTML twin) with `white-space:normal`, and each space-separated part is a `<span style="white-space:nowrap">`: table code is `nowrap` (`2bab9b31`, never split at a hyphen), and this lets `.a ~ * .b` wrap at its spaces instead of widening its column. (A first version split it into one `<code>` per part; an agent reading the HTML could take that as several values.)

## Page skeletons (the pilot refines them)

### Component page

```
Hero            hero_description = the one "what it is" sentence (not repeated below)
Overview        when to use it, when to pick something else
Markup          base canon (builder mode when it has variants) + one canon per structural variant
Variants        the table — section `hidden`: builder + agent blueprint only
Features        Built-in Features: short facts, no pitch
Best Practices  direct do/don't bullets, one clause each
API             Data Attributes · CSS Custom Properties · JavaScript (methods + events tables,
                1 example, pointer to the banner) · Keyboard/ARIA only if non-standard
Related         the examples/templates that use it
```

**Each skeleton section carries its own class** on the `<section>` (owner call 2026-09-24): `nds-doc-overview`, `nds-doc-markup`, `nds-doc-variants`, `nds-doc-features`, `nds-doc-practices`, `nds-doc-api`, `nds-doc-related`. Shared doc knobs scope to them (see §4), and `check-docs.py` can read the section order from them.

People never see `components.yml`, so the overview is written on the page. The catalog keeps its own short `use_when` for routing.

### Shell page

This covers header, mainnav, footer, topbar, sidemenu, hero and page-shell.
- **Overview.**
- **Markup:** one full code-only canon, replacing the ASCII trees.
- **Live pointer:** "the live copy is this page's own footer", plus links to the example pages.
- **Parts table:** Part class | Holds | Required.
- **Then:** Variants, Best Practices and API.

A shell never nests inside the page. Its variants, such as sidemenu modes or mainnav minimal, may toggle the page's own real shell. The 5 nested live heroes become code-only canons, each linked to an example page that shows it.

### Reference page

This covers helpers, grid, flex, prose, refresh and request. The page is an Overview, then sections pairing canons (with a preview where it helps) with their tables, then Best Practices.

## Dedup across pages

- **Shared field states** (label, info, feedback, required, disabled, readonly) are documented once, in `components/forms.md`. checkbox, radio, switch, password, date-picker, time-picker and multiselect link to it with one Variants row: "Field states → Forms".
- **The page's JavaScript tables are the reference for people. The `_js/nds-x.js` banner is the reference for code.** `check-docs.py` flags a method or event named in one and missing from the other.
- **The old demo chrome goes:** card, tabs, `.state-demo` and "Remove bg". The preview frame is the builder chrome in §2. Dark mode is checked with the topbar theme toggle, because dark cannot be scoped to one block (tokens resolve at `:root`).

## Phases

### Phase 0: spike (throwaway, commit nothing)

Build one canon block and one builder on a scratch page. Prove each of these, measured:
1. The canon survives `jekyll build`, `baseurl_cleaner.rb` and `html_compressor.rb` byte-exact. The release pipeline runs all three. `baseurl_cleaner.rb` shields only `<code>` today (`CODE_RE`, `:34`), so add the canon `<script type="text/html">` to that shield first. If it still does not survive, test `<textarea hidden>`, which kramdown also keeps raw.
2. `nds-docs.js`, deferred before main.js, stamps in time. Components initialize on the stamped markup, there is no CLS, and the reveal time does not move (checked with `nds-perf`).
3. Builder previews re-initialize after a structural swap via `NDS.Init.mount(el)`.
4. The table parse covers every operation today's togglers use: class, attr, `data-state`, style and prop.
5. The markdown-in-section experiment renders correctly.

**Stop rule:** if a proof fails and its named fallback fails too, stop and bring the result to the owner. No pilot page starts on an unproven base.

**Results (2026-09-24, headless Chrome, 16/16 builder checks pass):**
1. ✅ Jekyll keeps every canon byte-exact. `baseurl_cleaner.rb` rewrote canon links until the shield was added; `html_compressor.rb` adds a uniform indent, which dedent removes — equal after dedent, and every built code block matches its canon.
2. ✅ after a design change: the JS stamp failed (0.46 cold-load CLS), so rendering moved to build time (§2). Cold-load CLS ~0.003. The `nds-perf` reveal check moves to the first pilot page — nothing new runs before the reveal (wiring < 1 ms).
3. ✅ a swapped-in dropmenu initialized and opened after `destroy` + `mount`.
4. ✅ 939 of 963 toggles fit the table (§3); chart → own plan, chips icon → structure canon.
5. ✅ with the two catches in §5.

### Phase 1: pilot pages, then review, improve and repeat

Each page is written fresh, one per page type:
1. `components/switch.md`: simple, and it proves the Forms dedup link.
2. `components/cards.md`: the builder, and it proves that structural canons replace the JS-only markup.
3. `components/alert.md`: actions and the JS API section.
4. `ui-shell/footer.md`: the shell skeleton.
5. `components/button.md`: many demos and structures in one builder (added 2026-09-25).
6. `utilities/truncate-text.md` or `layout/grid.md`: the reference skeleton.

**The loop:**
1. **Owner review:** desktop and 375px, RTL and LTR, light and dark.
2. **Cold read by an agent.** A sonnet agent reads **only the `.md`** and answers 2–3 copy tasks per page, for example "a disabled large switch" or "an expandable card". Every answer must be right without the HTML twin (G4).
3. **Byte count:** the `.md` and the built page, old against new.
4. **Source inventory + parity check** (see Phase 3): every fact traced to SCSS/JS, every old fact accounted for.
5. **Fix and repeat** until the owner calls the structure settled.

**The nds-doc skill is drafted alongside the pilot,** so each round also tests the skill's instructions.

### Phase 2: lock the standard

- **Rewrite `.claude/skills/nds-doc/SKILL.md` end to end:**
  - the skeletons, canon rules, table format, builder, harness, actions, dedup links and prose rules;
  - Analyze statuses that flag an old-format page, so `/nds-doc <name>` rewrites any page;
  - the pilot pages as its model pages, replacing the alert.md-only reference.
- **Add `scripts/check-docs.py`** (about 80 lines). It runs on the `.md` source, the canon (G4), with no build needed, and checks:
  - skeleton section order
  - no `demo-` id or `<form` inside a canon
  - no canon already carries a class or attribute that a **non-default** Variants row adds on the same element (switch's Group canon shipped `checked` on one switch, so the Checked toggle could never turn it off); a `(default)` row naming canon markup is the exception
  - ids unique across canons
  - every `data-variants` and every `Structure` row resolves
  - the JS tables match the banner, reusing the banner parser in `scripts/check-banners.mjs` rather than a second one
  - after Phase 3, no `nds-demo-card` or `demo-toggle-btn` is left
- **List it under Commands in AGENTS.md.**

### Phase 3: rewrite, page by page

This is a rewrite, not a conversion. Each page is written fresh from its SCSS, its JS banner and the current page.

**The source is the truth; the old page is only a checklist** (owner call 2026-09-24). Old docs drift: switch.md's old page said the mobile gaps grow "touch-friendly" (they shrink) and that `--nds-input-size` sets the ripple baseline (it sets label line height only). So every page runs:
1. **Re-inventory the component from source:** its SCSS (classes, modifiers, knobs and defaults, states, media rules), its JS and banner (methods, events and payloads, hooks, init), and the shared files it rides (e.g. `nds-forms.js`, `_forms.scss` for fields).
2. **Write the page from that inventory.** Never copy a fact from the old page without finding it in the source.
3. **Parity check:** a sonnet agent lists every fact in the old page (`git show HEAD:<page>`) as KEPT / CHANGED / LOST / NEW-ONLY / CONTRADICTION against the new one.
4. **Verify each LOST, CHANGED and CONTRADICTION item against source:** restore the true ones; leave out the ones the source disproves, and name them in the commit message so the drop is on record.
- **Who:** the session writes each page through `/nds-doc`; sonnet agents only do the cold-read and parity check.
- **Order:**
  1. simple components
  2. static components
  3. the remaining builder pages (stepper, rating, quote), deleting their handlers in the same commit
  4. reference pages
  5. shells
- **Commits:** one page per commit, after the owner reviews it; component fixes go in their own commit before it.
- **Front matter:** bump `last_edit` only. `updated` moves only if the component itself changes.

### Own-plan pages (outside the batches)

- `components/tokens.md` — **PARKED, LAST (owner 2026-09-26): full UI/UX rework with its own plan.** Today it is generic and not useful enough. Its token list is generated at build by `_plugins/tokens_data.rb` from the four token SCSS files, so the `.md` holds no token names (clashes with G4).
- `components/forms.md`: 148 KB, and the shared home for field states.
- `components/themes.md`, `components/icons.md` and `components/accessibility.md`.
- `ui-shell/head.md` — **PARKED, needs a careful own plan (owner 2026-09-26): one of the most important docs, above all for AI agents; optimize and format it for them.** Constraints found: its code holds `<script>` and `<style>` tags (the first `</script>` would end a `<script type="text/html">` canon, so it needs another container or stays hand-escaped); its code holds `{{ site.latest_release }}` Liquid; `mkrelease.py verify()` reads the `panel-setup-html` / `panel-setup-js` tabs and fails the release when their `<style>` block drifts from the served gate; NDS IQ routes agents to copy the head from `_site/index.html` with `ui-shell/head.html` as the reference.
- `layout/section.md`: 112 KB with 58 toggles.
- `components/filter.md` and `components/tables.md`: the largest pages.
- `components/chart.md`: 21 chart-only toggles (`['', '#demo-bar', 'chartBarDL', 'chart']`) that no Markup cell expresses.

### Phase 4: NDS IQ (parked, last)

**Constraint:** the rules must work on every template version and name no version.

**No release before this phase.** NDS IQ lands after the structure settles, and the new NDS IQ and the template ship in the same release. A release in the middle of Phase 3 would ship new-format pages to rules that still point at the HTML code tab.

- **Copy the canon's body, never its wrapper** (pilot cold-read 2026-09-24: Sonnet, reading only `switch.md`, got both HTML tasks right but shipped its JS inside `<script type="text/html" data-canon data-lang="js">`, so the code would never run). The rule #3 wording must say the `<script type="text/html" data-canon>` tag is doc packaging.
- **Rule #3** (`_includes/NDS-IQ.md:76`) covers both formats. Draft, to be settled at this phase: "Copy the doc's canonical markup: the `data-canon` blocks where the page has them, otherwise its HTML code tab. Never copy the live demo. A Variants table, where present, lists every option and its element."
- **The HTML twin:**
  - On a new-format page, the `.md` alone is enough, so there is no second read.
  - On an old-format page, the twin stays the fallback.
  - It stays the visual spec on every page.
- **Related wording:** the Modifier row (`:84`) names the Variants table, and the `llms.txt` intro drops "lang-html code block".
- **Eval material:** update the fixtures in `.claude/skills/nds-iq-eval/fixtures/mini-root/` and scenarios S16, S36, S38, S39, S53 and S91, keeping old-format fixtures so both paths stay tested.
- **Gates:** the floor gate for each new sentence, then one `nds-iq-eval` gate.
- **Housekeeping:** update the "Docs rewrite" item in TODO.md.

### Phase 5: cleanup

Once the last page is migrated:
- Delete `_js/nds-showcase.js`, `_sass/_showcase.scss` and `docs-assets/css/nds-showcase.min.scss`.
- Remove the showcase `<link>` from `_includes/head.html:55` and the showcase `<script>` tags from `_layouts/default.html`, `minimal.html` and `shell.html`.
- Remove the `exclude_showcase` flag.
- Run `ruby _plugins/js_processor.rb`.
- **Review the inline-code language guess** (owner call 2026-09-25, f835e790): `docs_canon.rb` `code_lang` picks `lang-html/js/css` for backtick code by its shape, and a Method/Option/Event/Action key (JS) or Property (CSS) table sets the default for its name and value columns. A bare JS word in prose (`duration` in Best Practices) still reads as HTML. Decide: keep the guess, add an explicit `{: .lang-x}` marker, or both.

## Critical files

| File | Change |
|---|---|
| `_plugins/docs_canon.rb` (new) | build-time preview, code block, builder toolbar (spike: `_plugins/spike_canon.rb`) |
| `_js/nds-docs.js` (new) | builder wiring, harness, actions (spike: `docs-assets/js/spike-docs.js`) |
| `_layouts/default.html`, `minimal.html`, `shell.html` | load `nds-docs.min.js` deferred (order vs `nds-main` no longer matters) |
| `_plugins/js_processor.rb` | build the new docs bundle |
| `_plugins/baseurl_cleaner.rb` | shield the canon `<script type="text/html">` body in `CODE_RE` |
| `scripts/check-banners.mjs` | add `nds-docs.js` to `EXCLUDED` (its `--all` fails on any unlisted `_js/` file) |
| `_js/nds-showcase.js`, `_sass/_showcase.scss` | serve old pages during the migration, deleted in Phase 5 |
| `.claude/skills/nds-doc/SKILL.md` | rewritten |
| `scripts/check-docs.py` (new) | structure checks on the `.md` |
| `_includes/NDS-IQ.md`, `llms.txt` | Phase 4 only |

**Reused:**
- `NDS.Init.mount` and `NDS.Init.refresh` (`_js/nds-loader.js`)
- the `nds-toolbar`, `nds-dropmenu`, `nds-code` and `nds-table` components
- the `DEMO_ACTIONS` registry and the `data-toggler` operation parser (`_js/nds-showcase.js:322`), both moved

## Verification

| When | Checks |
|---|---|
| Every phase | `bundle exec jekyll build`; `node scripts/run-audit.mjs` on changed pages; `node scripts/check-init-destroy.mjs`; the `mkrelease.py` verify path; `python scripts/check-release-guards.py`; `node scripts/check-banners.mjs --all` |
| Phase 0 | the five spike proofs, measured — done 2026-09-24 |
| Phase 1 | `nds-perf` reveal timing on the first pilot page vs today's page (carried from proof 2); every toggle changes both preview and code; builder output pasted into a blank page renders the same; the cold-read agent passes; byte counts; owner visual review |
| Phase 3 | `check-docs.py` passes on every rewritten page; `git diff --numstat` shows LF only |
| Phase 4 | the single `nds-iq-eval` gate, old-format and new-format fixtures |
| Phase 5 | full rebuild, all checks green |

No browser is opened without asking first. Visual confirmation is the owner's.
