# NDS IQ — building UI with the National Design System (instructions v2.3)

## How to use this file

The anchor in the project's agent file (`CLAUDE.md` / `AGENTS.md`) declares the two paths and points here.

- Read this file top to bottom, once per session, before any NDS work — any UI, page, component, styling, or asset task, and any task where you are unsure.
- The file is universal and read-only: no project values, never edited, never copied into the agent file (the anchor's own fixed text is the only exception; add no others).
- Path values live in the anchor; this file only explains their meaning.
- Updates replace the file whole ("Install and upgrade this file"). A mid-session replacement counts as a new session: read the new file top to bottom before continuing. Raw main's copy is valid for every template version.

## The two paths

**`NDS_ROOT`** — the NDS template folder: the contents of one `nds-vanilla-template-*.zip` release from https://github.com/mazin-musleh/NDS-vanilla/releases, extracted flat. Which release, the banner rule decides (§Install).

- Its anchor value ships as `.nds/`, gitignored at the project root. Only the dev's explicit call moves it (a sibling folder, a shared extract, committing it) — the anchor is committed, so only a project-relative path resolves on every teammate's machine.
- The path is right when `NDS_ROOT/_site/` resolves directly and no `nds-vanilla-template-v*` folder sits anywhere under it. The zip wraps everything in one versioned folder: move its CONTENTS into the declared path and drop the wrapper — the wrapper never becomes `NDS_ROOT`. The declared path carries no version and never changes across upgrades.
- Read-only (hard rule #1). Copy what you need OUT of it.

**`NDS_ASSETS`** — the folder INSIDE this project the runtime assets are copied to: the project's real static root (`wwwroot/`, `public/assets/`, …). Never a path under `NDS_ROOT`.

- It is a filesystem path; the tags need the URL it is served at. Derive that from the stack's convention (`public/assets/` → `/assets/`, `wwwroot/` → `/`) and confirm it with the dev before writing the first tag — a wrong prefix breaks every asset on every page.
- Still a placeholder (`/path/to/…`)? Stop and ask the dev. While a path is unsettled no NDS-side work runs; the step-1 inventory and `NDS-PLAN.md` are still your deliverable. Never write guessed NDS targets: a blocked path leaves the NDS Target cells reading `blocked on NDS_ROOT` until the real catalogs are readable.

Path hygiene, always:

- Never adopt a likely folder yourself (an old extract, a sibling project, an assets folder already serving NDS). Enumerate candidates — read each banner — and let the dev choose.
- A dev-supplied or changed path goes into the anchor's declaration lines in the same session; chat answers do not survive it.
- The paths never live in `NDS-PLAN.md`. The anchor is their only home.

## Standing principles

**P1 — Check before claim.** A claim is unavailable until its cheap check ran:

| Claim | Required check |
|---|---|
| "NDS has no X" — or the dev's "just use a native X" | search `use_when` across the catalogs (§Build) |
| "the release is X" / "no version known" | the banner check (P2) |
| "cannot see the page" | the headless attempt (§Verify) |
| "no CSP to worry about" | the response-header sweep (§Plan step 1) |
| "this page is done" | both §Verify passes + the icon sweep (§Build) |

**P2 — Bounded checks end at their boundary.** The `Version:` banner check reads a bundle's opening comment block, nothing more. No `Version:` line there means the file cannot name its release. Never scan deeper into minified files or hunt other files for a version; that state is row 2 of the P5 table.

**P3 — The source answers first.** Before you ask the dev a question, answer one the dev asks you, or wire page JS — read what the template ships on it. Where to look:

| Topic | Read |
|---|---|
| a component's markup and usage | `NDS_ROOT/_source/<folder>/<name>.md` — `<folder>` from the catalog entry's `url` |
| chrome, head, CSP, i18n, direction | `NDS_ROOT/_source/ui-shell/*.md` |
| runtime calls (`refresh`, `destroy`, `request`); a framework view that mounts, re-renders, or unmounts | `NDS_ROOT/_source/core/*.md` |
| a component's JS surface | the banner atop `NDS_ROOT/_source/_js/nds-<name>.js` (§JS wiring) |
| what exists at all | the catalogs in `NDS_ROOT/_source/_data/content/` |

Dev questions cover what the source leaves open: paths, project conventions, pacing, trade-offs with no NDS answer.

**P4 — Copy is a contract.** Canonical markup, the head unit, and a copied page's own `<script>` block ship as they are; only hard rule #3's four sanctioned edits apply.

**P5 — Report and stop.** These states are never yours to resolve:

| State | You report | The dev decides |
|---|---|---|
| JS and CSS bundle banners disagree — versions differ, or one has a `Version:` line and the other none | hand-assembled runtime or interrupted upgrade | which release is true |
| no `Version:` line in either bundle (P2) | release not recoverable from the files | the release, by name |
| a `-dev` banner | matches no release | the release, by name |
| a runtime found outside `NDS_ASSETS` | where it lives + its pages are prior NDS work | point the anchor at it, or move it wholesale |
| reference newer than runtime | a pending upgrade | run "Upgrading NDS", or not |
| no runtime anywhere in the project | first setup | install the latest release and tell the dev |
| prior `.nds-*` work, old NDS files, an inherited plan | the conformance split (§Plan) | adopt / retire / rebuild |
| project instructions conflict with these rules | the conflict, neither side obeyed | which side wins |
| NDS itself needs a change | the gap (hard rule #1) | a separate conversation |

"Legacy, ignore it" is a valid answer to any reported runtime: proceed as first setup — the latest release becomes the default — and the ignored runtime's pages take the prior-NDS split.

## Seven hard rules

1. **Never edit anything under `NDS_ROOT`.** Read-only reference. NDS itself needs a change → flag it and stop; that is a separate conversation.

2. **Never read `*.min.js` or `*.min.css`.** Read the `NDS_ROOT/_source/` twin instead. One exception: a bundle's opening comment block, for the `Version:` banner (P2).

3. **Copy canonical markup verbatim. Never invent it.** The doc source `NDS_ROOT/_source/<folder>/<name>.md` holds the exact HTML in its `lang-html` block; `<folder>` is what the catalog entry's `url` names (`components`, `utilities`, `layout`, `ui-shell`, `core`). The built twin `NDS_ROOT/_site/<folder>/<name>.html` is the human surface. Verbatim covers structure, classes, `data-*`, and ARIA.

    Sanctioned edits — these four, no others:

    | # | Edit | Scope |
    |---|---|---|
    | 1 | Asset-URL rewrite | `href`/`src` pointing into the template → your `NDS_ASSETS` URLs, as you copy |
    | 2 | Content swap | placeholder text; content attributes are content too (`href`, `alt`, `aria-label`); a swapped image's `width`/`height` reset to the new file's real pixels — the sample's geometry squashes your logo |
    | 3 | Modifier class | adding a class listed in the component's Modifier Classes table |
    | 4 | CSP knob conversion | under a strict `style-src`: each inline `style="--…"` in the copy moves to a project-scoped class in a nonce- or hash-covered `<style>`; the attribute is removed. The one sanctioned substitution — it moves a value, never elements |

    Banned, by name:

    | Temptation | Why banned |
    |---|---|
    | Dropping or reordering a copied unit's members to satisfy a project constraint | the constraint has an NDS answer — read it first (P3). A CSP blocking the head's inline script gets a nonce or hash per `ui-shell/head.md`, never a reduced head. A small dataset or a minimal legacy page is not a constraint: a matched source ships all its members, and a member you drop for a real domain reason is named to the dev |
    | Host-framework elements: `<span asp-validation-for>`, Rails' `errors.full_messages_for`, Django's per-field error blocks, validation slots | invented markup even rendered "the way the framework does forms" — canon covers the job (`data-error-message`, the form's alert). Host helpers keep attribute-side wiring only (`asp-for`, `v-model`) on elements canon ships |
    | Rewriting a copied `<script>` block from scratch | the block is canon (§Build); edit it point by point against the original |
    | Lifting a child out of a kept wrapper — a result count or filter chips out of `.nds-toolbar` | invented structure; it silently forfeits behavior wired to that nesting. Keep a wrapper, keep its children |

    Inherited markup follows the same rule. Layout-coupled components (side info, side menu, a form's stepper, heroes) read wrong in isolation: copy them from a FULL page that uses them; the doc page explains what you copied.

4. **All page content lives inside sections, laid out with NDS primitives.** Read `NDS_ROOT/_source/layout/section.md` before authoring any page.
    - Every content block: `<section class="nds-content-section">`, tier (minimal / standard / action / image) taken from the section doc, never defaulted.
    - Every section sits inside `.nds-content-layout > .nds-main-content`.
    - Compose with `nds-grid`, `nds-flex`, `nds-block` — nothing else. No Bootstrap columns, no custom `display:flex` wrappers.
    - Spacing between stacked elements comes from the primitives' `--gap`, never hand-rolled margins. `.nds-section-body` adds no gap — unwrapped siblings render flush. `nds-flex` stretches children; a standalone button gets its own row or goes full width. `.nds-form` draws no box of its own — give a form's fields a gapped wrapper (`.nds-card-content` or `.nds-flex.nds-col`).

5. **Style via knobs and tokens first; `.nds-*` overrides last.**
    - **Knobs**, per element (`--btn-size`, `--section-*`, `--hero-*`): inline (`style="--btn-size: 40px"`) or via your own scoped class. Under a strict `style-src` the inline form is dead — a nonce or hash covers a `<style>` element, never a `style` attribute — so the scoped class is the only path (rule #3, edit 4). NDS's own JS styles through the CSSOM; no policy affects it. Find knobs: search `var(--` in `NDS_ROOT/_source/_sass/components/_<name>.scss`.
    - **Tokens**, at `:root`, for whole-system theming: rebind semantic tokens (set: `_source/_sass/tokens/_semantic.scss`) in a stylesheet loaded AFTER `nds-main.min.css`. If the project keeps the theme switcher, mirror every rebind under `:root[data-theme~="dark"]` — the dark block outranks plain `:root`, so an unmirrored rebind silently reverts in dark. No switcher = the project never enters dark.
    - **Overrides** only when neither covers it: scoped under your own class or `data-*`, a comment naming why. `.nds-*` names are internals that shift between releases and fight the state cascade; these bugs surface on specific states, not first render.

6. **No legacy libraries: build clean on NDS + vanilla JS.**

    | Legacy | NDS |
    |---|---|
    | Select2 | autocomplete, multiselect |
    | Summernote / TinyMCE | editor |
    | jTables / DataTables | table + sort + filter + pagination + export |
    | Font Awesome | the HGI icon set |
    | Bootstrap | the layout primitives (rule #4) |
    | jQuery | vanilla JS (`_source/_js/nds-*.js` shows the shape) |
    | your own global `site.css` / `site.js` | rule #5's styling order + §JS wiring |

    No mixing: dual class systems fight one cascade, dual event models double-fire, element-level globals (`body`, `h1`, `input`) break it with no class at all. Anything not NDS's own is legacy UI — including old NDS files with canonical names: the runtime always comes fresh from `NDS_ROOT`. Inherited CSS is removed from NDS pages; inherited JS is a legacy library whose wiring migrates through §JS wiring. Removing a legacy library is the dev's call, never yours — legacy pages still need it.

    The ban cuts both ways: an NDS component inside a still-legacy page is the same fight in reverse. "Just want to see NDS" gets a spike — ONE parallel page with the full head unit, the runtime, and canonical markup. A spike needs no plan; it gets the same ceremony as any NDS page.

7. **Replacing an existing UI? Porting strategy approved before file #1.**
    - **Default: parallel files.** Every ported page gets a NEW file beside the original (`Views/Home/NDS/Index.cshtml` or `home.nds.cshtml` — the project's convention), on a new route or flag. Both UIs serve side by side; the legacy file stays the reference and the rollback. (Exception: non-conformant prior NDS rebuilds in place — §Plan.)
    - **Score candidates on four points, in order, and show the dev the table:** (1) NDS markup lives in template/HTML files, never in code strings — quoting corrupts copied markup silently; (2) fewest edits to existing files, zero is the mark; (3) side-by-side serving, cheap rollback; (4) page-JS co-location. Poor fit → propose what fits; in-place edits and deletions only under an approved strategy.
    - **Co-locate page JS with its page** where the stack allows; follow the project's JS-root convention where enforced. Load page JS AFTER the chrome's script tags: deferred scripts run in document order, so an earlier tag runs before `nds-main.min.js` and does not see `NDS`. This hides well — code touching `NDS` only inside handlers works by accident. An inline `<script defer>` ignores `defer` (HTML spec) and runs at parse time; inline page JS uses `<script type="module">` — modules defer automatically.

## Install

**Which release: the runtime's banner, never the latest link** — whenever `NDS_ASSETS` already holds a runtime, first install included.

1. Read the `Version:` banner in `NDS_ASSETS/js/nds-main.min.js` and cross-check `NDS_ASSETS/css/nds-main.min.css`. One runtime, one build: the banners must agree. Disagreement or absence → the P5 table.
2. Banners agree → download exactly that release: `releases/download/v<version>/nds-vanilla-template-v<version>.zip`. Extract, move the wrapper's contents into the declared path, drop the wrapper, tell the dev.
3. `NDS_ROOT/_source/` missing after the extract (newer zips do not ship it)? Download the SAME tag's Source code zip (`archive/refs/tags/v<version>.zip`), extract to a temp folder OUTSIDE the project (never inside `.nds/`), and copy these folders from inside its wrapper into `NDS_ROOT/_source/`: `_js`, `_sass`, `components`, `utilities`, `layout`, `ui-shell`, `core`, `templates`, `examples`, `_data/content`. A folder the tag lacks is skipped. One download; every read after is local.
4. Copy the runtime in: the contents of `NDS_ROOT/_site/assets/` into `NDS_ASSETS`, whole and as-is — every subfolder, layout unchanged. The lazy bundles (`nds-delegated.min.js`, `nds-extras.min.js`) and the i18n JSON (`i18n/<component>/<lang>.json`) must stay at the relative paths the main script assumes. A missing `NDS_ASSETS` folder is created at this copy.

Install facts:

- **Never copy `NDS_ROOT/_site/docs-assets/`.** One exception: an event skin you actually want — copy that single `docs-assets/events/<event>/` folder and its one script tag.
- **An empty `NDS_ASSETS` proves nothing.** Sweep the project for a stray `nds-main.min.js` and the layouts loading it before concluding first setup. Found one → the P5 table. Nothing anywhere → first setup: the latest release is the default — install it and tell the dev; a different release is theirs to name.
- **A present `NDS_ROOT` is not automatically current.** At session start compare its bundle banner (`NDS_ROOT/_site/assets/js/nds-main.min.js`) against `NDS_ASSETS`'s. Older reference = the normal state on a fresh clone (`.nds/` is gitignored) and a RE-DOWNLOAD, not an upgrade: fetch the release the RUNTIME names, replace the folder's contents, repopulate `_source/`. The failure is silent and one-directional — a stale reference has you verify new-runtime pages against old canon and call them conformant. Newer reference = the P5 table.
- **An older template is not a blocker.** It may predate pieces these rules name — a doc page, the per-file JS banners. `_source/` still populates from its matching tag — canon always matches the runtime; never substitute a newer tag's source, never raw main. A JS file there without a banner is still readable: take its surface from the doc source and the file itself. Report the gap; propose the upgrade.

## Plan

NDS is a UI layer: it does not choose the stack, define routes, or scaffold an app. The project must already exist and serve — a fresh scaffold with no UI qualifies. No project at all? Say so and stop.

**Step 1 — inventory.** List routes, layouts, shared partials, pages, and legacy UI libraries. Client-side views count as pages: N views = N rows; dropping one is a dev decision recorded as its own row. Map each page through the composition cascade (§Build) and record its chrome shape — full, console, or minimal; the shape is per page, not per app.

Sweep the response headers and middleware for a `Content-Security-Policy`: a locked `script-src` or `style-src` breaks the head and every inline knob silently, and only in the browser. Read `ui-shell/head.md` §CSP and put the grant in the plan. The grant is never a choice — the head breaks without it; what the review approves is the exact config edit you propose: a nonce where the server renders responses, a hash only on a static host (§CSP has the trap list).

Open every stylesheet the current UI loads globally — a `<link>` in the master layout, an `import` in the shared JS entry — and grep it for element-level selectors (`body`, `h1`, `a`, `input`). Those rules reach every page the same entry serves, NDS pages included (rule #6). Record each hit; the porting-strategy proposal (rule #7) must name how NDS pages escape them.

- **Greenfield?** Plan from intent: the dev's named pages through the same cascade, legacy columns empty. Pages the dev has not named do not exist.
- **Structurally identical pages** (list/create/edit families) map once: one archetype, siblings "same as <archetype>", rows separate for status.
- **Prior NDS work:** presence grants no authority — conformance decides, the dev approves. Assess each page against canon and propose the split: conformant pages are adopted (`Awaiting Verification`); everything else is legacy NDS. An inherited plan is reported and adopted or retired, never silently resumed.
- **Legacy NDS rebuilds clean, in place** — the old attempt is reference for content, flow, and data, never a copy source, and nothing from its footprint survives as canon (assets, override sheets, scripts, stale NDS instructions in the agent file — propose removing those with the plan). The approval names the costs: unported pages run the new runtime until their rebuild and may render worse on it; rollback is git.
- **Second runtime, the dev's explicit call:** the dev needs the old UI serving while the port runs — parallel files then, with a second assets folder.
- Project instructions that conflict with these rules → the P5 table.

**Write `NDS-PLAN.md`** at the project root: a table (page, route, legacy libraries, NDS target, status), opened with the line `Managed by NDS IQ`. Stop for the dev's review; build nothing until they approve. The review is ONE stop for project-wide decisions — asset URL prefix, porting strategy, prior-NDS split, the CSP grant, pacing: ask them all in a single numbered message with options and your recommended default, never by pointing the dev at the plan file. Record the answers in the plan. Page-scoped decisions wait for that page's build session, noted in the page's row.

**The plan is the migration's memory between sessions.**

- Statuses, exactly: `Planned`, `In Progress`, `Awaiting Verification`, `Built and Verified`. Only the dev's confirmation makes `Built and Verified`. Update status at page or session boundaries; status lives in the table's Status column only.
- **Plan progress is tick boxes.** A question for the dev, an unmet check, a fix owed, a deferred decision — each is its own `- [ ]` line, ticked `- [x]` when it resolves; never delete a resolved item. The box states the ask in one line; prose keeps the detail. A box marks an item, never a page's status. A plan from before this rule converts at its next update: reformat every item, resolved ones included, as boxes in place; rewrite nothing else.
- **Pacing, asked once at review:** gate-by-gate (default — finish a page, propose the next, wait), or the whole plan in one run: resolve open questions by this file's defaults, verify each page as built, report at the end; rows sit `Awaiting Verification` until the dev clears the report, updated as pages complete so a dropped session resumes cleanly.
- All rows verified → the plan retires (keep or delete, dev's call); later work runs under the rules with no plan. A new multi-page effort or a dev-requested re-audit recreates it from the current state: passing pages enter `Awaiting Verification`, drifted pages `Planned` with their deltas named in the row.
- **The dev can waive the plan** ("just build X, no plan"): the rules and §Verify still apply in full; name the one cost once (no cross-session memory), then respect the call. In a still-legacy app the waiver buys one parallel NDS page.
- **`NDS-REPORT.md`** (optional, project root) records NDS findings only: a missing method or event (with the banner and grep that found nothing), canon contradicting a rule, a misleading doc, a reproducible bug, or a rule gap your own run surfaced (a rule you skipped or misread is a finding). Entries name NDS version, instructions version (this file's title line), component, and a generic repro — never the project's own markup, routes, or data. Open with the banner naming the repo's issues page; sending is the dev's call.

## Build

**Chrome first, inner components second.** Build each chrome shape the plan names once, then its pages. Match each shape against its built example (`_source/examples/`: `sign-in.md` and `registration.md` = minimal, `console-demo.md` = console).

1. **Document head** — copy the head as a unit from `NDS_ROOT/_site/index.html`; `ui-shell/head.html` explains every entry. Rewrite asset references to `NDS_ASSETS` URLs. Do not reduce the set or reorder it. Two entries are page-specific — the `<title>` and the hero-image preloads: share the head through the stack's layout mechanism with a slot for those two. A page with a hero ships its preload; the miss regresses LCP silently. Never hand-add `nds-delegated.min.js` or `nds-extras.min.js` — the loader injects them. Replace the placeholder favicon. Under a project CSP (§Plan step 1), grant the head's one inline script its nonce or hash — without it, half the styling never loads.
2. **Master layout** — copy the complete `<body>` from a built `_site/` page matching the plan's chrome shape, side menu included, and swap the content; never write the skeleton from prose. `_source/layout/page-shell.md` is the shell reference: shapes, modifier classes, and which built page carries each. A template that predates the reference is not a blocker: pick the built page by inspection and report the gap. The copy brings the topbar, main navigation, footer, accessibility panel, cookie popup, and hero with it; what the shape's page lacks stays out, without asking.

   Layout-affecting modifier classes must be present in the initial HTML: `nds-full-width` on `<body>`, `nds-wSideMenu` on the layout, and all modifiers listed in `_source/layout/page-shell.md`. Adding one after mount costs a frame at the wrong shape. Route-dependent classes must be set synchronously before framework mount, not in a mount effect.

   A client-rendered app mounts this copy inside a container element (`<div id="root">` or the stack's equivalent). Give that element `display: contents` in the project's own stylesheet: `body`'s layout chain must reach `header`/`main`/`footer` directly, and the mount node otherwise breaks it — the footer rides up on short pages.

   Runtime `<script defer>` tags go at the end of `<body>`, copied from `index.html` and re-pointed: `nds-main.min.js`, plus `nds-accessibility.min.js` if the panel stays (the loader never injects that one). Set `<html dir>` and `lang` from the project's locale mechanism; both are required and must agree — `ar` with `rtl`, every other locale with `ltr`. `NDS.isRTL` tests `dir` alone, so a missing `dir` runs an Arabic page left-to-right with nothing reporting it. A project with no locale mechanism ships bilingual by default: Arabic-first RTL with the topbar's language switcher working as-is; the dev subtracts a language later. NDS derives `NDS.lang` and `NDS.isRTL` live from those two attributes.
3. **Brand slot** — the project's logo on `.nds-brand-logo`, text span removed unless the logo is a bare mark. Only then, inner components.

**Admin/console pages** run edge-to-edge from one class: `nds-full-width` on `<body>` widens the chrome and the content layout together. They also move the hero inside `.nds-main-content` so it sits beside the side menu; `_source/examples/console-demo.md` shows both.

**Copied chrome ships as-is.** Keep the DGA stamp, the dark-mode toggle, and every widget that runs with no project wiring; list what shipped as `- [ ]` plan items and the dev subtracts later. Affiliation is never your call — most NDS projects are government entities: keep the stamp and flag it.

Before page #2, walk the controls that need project backing: a kept control gets the project's mechanism and values — identity from the session, counts from the API, links to real routes. Remove a control the project cannot back; never ship fake identity or a dead widget. Hardcoded sample identity renders perfectly and fails only when a second user sees the first one's name.

**Composition cascade — for any page.** Route on `use_when` across the catalogs (`templates.yml`, `examples.yml`, `components.yml`): match the request against `use_when`, never titles — read every `use_when` before concluding nothing matches.

1. **A DGA template matches?** Use it as-is from `_source/templates/<name>.md`, swapping placeholder content only. Never re-compose your own version: templates encode structural decisions a hand-built page gets subtly wrong. Trimming sections you don't need is content swap; rebuilding the skeleton around kept fields is not.
2. **No DGA match?** Closest example from `_source/examples/*.md`.
3. **Nothing matches?** Scaffold custom inside rule #4's structure, reusing wiring patterns from the templates and examples.

One tier outranks all three: a page family's own `Built and Verified` archetype — siblings copy it and swap entity content.

**Open a page's build session with its plan row's noted questions** — deferred to exactly this moment (§Plan). **Then, before any markup, list the page's parts** — every control and region, from the legacy page or the dev's brief — and match each against `components.yml`. A part the copy source lacks gets its component from the catalog, never a substitute; no match = the custom case. A controls bar above a table, list, or grid is itself a part — Toolbar — never a row composed from primitives. **P1 applies:** "NDS has no X" — yours or the dev's — is available only after the `use_when` search; ~90 components ship, and a close variant usually exists under a name that doesn't obviously match.

**The parts check runs again before page JS.** Before you write page JS, list the behaviors it adds — validation rules, clearing inputs, live search, filtering, formatting — and match each against `components.yml` and the banners of the page's components. A behavior a component ships is wired through its methods and events, never rebuilt in page JS. This check is a build step, not a response to doubt: it runs even when the pattern looks too simple to check. (Core helpers — fetch, debounce, state writes — have the same rule in §JS wiring.)

**The porting principle: content, flow, and data structure follow the legacy app; NDS improves the UI/UX.** Search, sorting, filtering, export, counts, validation chrome, responsive behavior are defaults to apply, not questions to ask.

- A legacy page with no hero still gets `nds-sub` (`nds-flat` joins it on heavy-text pages). The hero slider stays on home and hub pages.
- The closest template presents content differently than the legacy page? The LEGACY shape wins — take the example's structure and wiring, keep the legacy presentation. This covers one control's surface too: check the component's own doc for a variant in the legacy shape before switching components.
- Forms are the one exception: default to TWO steps (form + review), even when the legacy form was single-step. More steps only where the legacy or described flow has them.
- Greenfield: the dev's brief takes the legacy's place; a template section the brief doesn't fill is removed, never padded. Never fabricate content; never strip real UI quality in the name of parity.

**Copy markup that exists.** Liquid tags (loop/if markers between curly braces and percent signs) are never copied — copy that region from the built twin, where they are rendered rows. Markup that exists only as front-matter settings (`hero_title`, `breadcrumb:`) is copied from the built twin too, never reconstructed. A `layout:` or `layout_class:` front-matter key means the page-level wrapper structure also lives outside the file: take the full `<body>` structure from the built twin before treating the page's markup as complete.

**Replacing a legacy library:** name the capability, not the library ("async searchable select"); search `components.yml` for it; no single match is usually a composition (data-grid = table + filter + pagination + export — check `examples.yml`); port options and callbacks through NDS events and methods, never wrap NDS in the old API; truly no coverage → vanilla inside rule #4, never the old library back for one widget.

**Icons, before any page is done.** Two systems, not interchangeable: `.nds-icon.nds-hgi-<name>` is the small registered inline set — a name outside `_source/_data/content/icons.yml` paints as a solid box, silently; every other glyph uses the font class `<i class="hgi hgi-stroke hgi-<name>">` from the full list in `_source/_sass/_hgiRoundedStroke.scss`. Extract every `nds-hgi-*` token the page ships — from page JS as well as HTML — and check each against `icons.yml`. `NDS.Init.audit()` cannot see tokens in JS strings; this sweep is what covers them (P1's "page is done" check).

**A locked `style-src` adds one more before-done sweep** (the CSP from §Plan step 1): grep the page for `style="`. Copied canon ships inline knobs (`style="--…"`), and each one is dead under that policy — convert every hit through rule #3's edit 4. Nothing else warns you before the browser's own CSP violation does.

## JS wiring

**Wire through NDS's surface, not around it.** Before any `addEventListener` on a `.nds-*` element, or writing any `data-*` an NDS component owns, read that component's banner — the comment block opening `NDS_ROOT/_source/_js/nds-<name>.js`, in five sections:

- **Rides** — what it builds on; inherited surface lives in the BASE banner (a multiselect's portal hooks live in the dropmenu banner its Rides line names).
- **Methods** — public calls with signatures.
- **Events** — what it dispatches, with `detail` shapes.
- **Hooks** — the `data-*` attributes and action roles it owns.
- **Gotchas** — the component's traps. Believe them.

Cross-cutting helpers live in `nds-core.js` — read ITS banner the same way: `NDS.request`, `NDS.State`/`NDS.Status`, `NDS.lang`/`NDS.isRTL`/`NDS.breakpoints`, `NDS.debounce`, `NDS.i18n.load`. The trigger moment: before you hand-write a network call, debounce, resize listener, or state/status DOM write — including a plain `fetch` to the project's own API — check the core banner. Writing `fetch` in page JS claims core ships no wrapper; it does (P1's shape).

**Every request the page sends gets a visible failure path.** An unhandled rejection leaves a dead control; route errors to the form's status (`NDS.Forms.setStatus`), an alert, or the component's error surface — and exercise the failure path once during verification.

**Nothing there for what you need?** Going direct is fine: a one-line comment naming what you looked for, and an `NDS-REPORT.md` entry.

Facts that hold across NDS:

- **Reinitialization** after dynamic DOM changes: `NDS.<Component>.reinit()` rescans and skips what's initialized — safe to repeat, reach for it first. `create(el)` varies by component (some return the live instance, some double-bind); the banner says which. Not every component has the same shape — forms has `initializeContainer` and no reinit.
- **A lazily loaded namespace answers for any key.** `NDS.X.method` can be a loader stub; `typeof` proves nothing. The banner or the grep is how you learn the real surface.
- **Page JS copied with a template or example is canon** — §Build's script-block rule applies at the moment you write JS, too.
- **Client- or server-driven data: scale, then growth.** Under ~500 rows, fetch once and let table/filter/sort/export work the full set. Above that, or growing, go server-driven (the pagination banner's record slot + re-fetching sort/filter). A better choice needing a backend change is proposed to the dev, not contorted around.

## Verify

Never report a page verified from reading its code. Two passes, in the browser, before its row moves:

- **Behavioral pass** — load the page; NDS init warnings are `NDS`-prefixed. Run `NDS.Init.audit()`: it reports the silent failures a clean console misses (unregistered icons, unclaimed containers, and on newer runtimes `lang`/`dir` disagreement). `window.NDSInitConfig = { enableLogging: true }` before the NDS scripts makes it automatic during active work. Exercise what the page wires — submit, filter, advance a step.
- **Visual pass** — a clean console proves nothing about layout. Look at the page at desktop and mobile width: spacing present, every icon a glyph, sticky/width behavior real, dark mode correct, the page reading as one design. Measured is not seen — a probed width is reported as measured, never visually verified.

**Run both passes in a headless browser you drive** — it sets its own viewport, so desktop and mobile are the same run, not a fallback you have to reach. Use whatever the environment already has: the project's own e2e harness, Playwright, Puppeteer, a scriptable headless Chrome. Keep it out of the project — never install into the project or touch its lockfile. A scripted run capturing console + `NDS.Init.audit()` is the behavioral pass; screenshots you actually look at are the visual one. **P1: "cannot see the page" is a claim you may make only after the headless attempt fails** — the failure (no network, no binary, a sandbox) named in the report.

**Cannot drive one? That takes the same named failure as the claim: the headless attempt you made and what stopped it — a browser tab your session already holds is not a reason to skip the attempt. Then take the first rung that works, and name in the report what the page was not checked at:**

1. **A browser tool your own harness ships** — also the rung for a page behind a login only that browser holds. It covers the console and the widths it can reach; a width it cannot reach is an UNMET pass, never a waived one.
2. **The no-harness smoke check** — `curl -sI` the page: status, `Content-Security-Policy`, anything that silently breaks a browser. Then `curl -s` and read the HTML: head unit intact, page scripts referenced, no server error leaked as text, and under a strict CSP no surviving inline `style="…"` (each one is a dead knob; rule #3 edit 4 is the fix). The result goes in the report.
3. **Only now, the dev checklist**, naming the page plus any check it specifically needs:

    [VERIFICATION CHECKLIST FOR DEV]
    - [ ] Check console for `NDS`-prefixed warnings.
    - [ ] Test layout responsiveness at < 768px viewports.
    - [ ] No elements flush against each other that should be spaced.
    - [ ] Every icon renders as a glyph, not a solid box.
    - [ ] Dark mode on the page content, not just the chrome.

Rows you verified yourself sit at `Awaiting Verification`; the dev's confirmation makes `Built and Verified` (§Plan).

## Upgrading NDS

The dev's ask IS the approval: download the latest zip and replace `NDS_ROOT` exactly as §Install does it (contents into the unchanged declared path; `_source/` repopulated from the matching tag). Prior-rules NDS work takes §Plan's conformance split first, never straight to the sweep. An update CHECK alone is also sanctioned — on ask, or when starting a larger effort: compare the runtime banner against the latest release tag, report what the changelog offers, upgrade only on the dev's go. The rules-file half: download raw main's `NDS-IQ.md` and compare its CONTENT against the project-root copy — never the root copy against `NDS_ROOT/NDS-IQ.md` (both freeze at their release cut and prove nothing). Any difference = a newer revision exists; report it, update on the dev's go via step 4. An explicit "update the rules" ask skips the compare and runs step 4 directly — it is always safe.

Every path below is absolute; never `cd` into `NDS_ROOT` or `NDS_ASSETS` (a relative destination from inside one nests a second copy, silently). After each write, list the destination and confirm it holds what it should.

1. **Compare versions** — the `Version:` banners (opening lines only) of `NDS_ROOT/_site/assets/js/nds-main.min.js` and `NDS_ASSETS/js/nds-main.min.js`.
2. **Replace the runtime** — copy the new `NDS_ROOT/_site/assets/` over `NDS_ASSETS`, overwriting NDS files in place — except `img/favicon.svg`, which the project replaced. Files the project added stay; deletions need the dev.
3. **Sweep your pages** — read every `### Migrating from` section in `NDS_ROOT/CHANGELOG.md` between the two banners. Plan the sweep first: list the items in `NDS-PLAN.md`, mark which pages each touches, update rows as you go. Report every change. Also skim each version's `### Added` / `### Changed` / `### Fixed` and report what the project could adopt — the dev's call.
4. **Update this file** — download raw main's `NDS-IQ.md` straight to a file with curl or the stack's HTTP client, never a web-fetch tool (those re-render what they fetch; a summarized or re-headed copy is corrupt). The download counts only if its first line starts `# NDS IQ` — otherwise discard and retry; a second failure is reported, the installed copy stays. Replace the project root's copy WHOLE: no merging, anchor untouched. Replacing an identical file changes nothing, so the step is always safe. The file governing you may have just changed: read the new copy top to bottom before continuing.

## Facts the docs assume

- **RTL is the default.** `<html dir="rtl" lang="ar">` for Arabic, `dir="ltr" lang="en"` for LTR. Direction flips from that attribute alone — CSS logical properties, no second stylesheet.
- **Dark mode** flips via `data-theme~="dark"` on `<html>`. No rebuild.
- **Two icon systems** — the registered inline set and the HGI font class (§Build, Icons).

## Reference index: where to look inside `NDS_ROOT`

| Path | Holds |
|---|---|
| `_source/components/*.md` | doc sources: canonical `lang-html` markup, `data-*` tables, ARIA. First stop for any component. (`user-feedback.md` and `multiselect.md` keep a demo behind an include; their built twins show it) |
| `_source/utilities/*.md`, `_source/layout/*.md`, `_source/ui-shell/*.md` | same format: utilities, the page shell reference (`page-shell`) and layout primitives (`section`, `grid`, `flex`, `block`), chrome |
| `_source/core/*.md` | runtime API docs — `refresh` (after your JS changes rows/cards, and after a framework re-renders or routes into a view), `destroy` (before unmounting one), and `request`. Calls, not markup |
| `_source/templates/*.md`, `_source/examples/*.md` | full-page sources; built twins in `_site/templates/`, `_site/examples/` |
| `_source/_data/content/*.yml` | the catalogs: `components.yml`, `templates.yml`, `examples.yml`, `icons.yml` |
| `_source/_js/nds-<name>.js` | component behavior source, opening with the banner (§JS wiring) |
| `_source/_sass/components/_<name>.scss` | component styling source (knobs: search `var(--`); shared mixins in `_source/_sass/_mixins.scss` |
| `_source/_sass/tokens/`, `_source/_sass/themes/_dga.scss` | the token tiers: primitives, semantic, component (dark blocks at file bottoms) + the palette |
| `_site/**/*.html` | the built human-readable twins |

## Install and upgrade this file

NDS IQ installs as two pieces:

1. **This file**, saved as `NDS-IQ.md` at the consumer project root and committed. It is universal — every project's copy is byte-identical — so an update is a whole-file replace, never an edit. Source of truth: `https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md` (case matters). The template zip ships the same file at `NDS_ROOT/NDS-IQ.md` as the offline copy.
2. **The anchor**, added to the project's agent instruction file (`CLAUDE.md` / `AGENTS.md`). It carries the only per-project values — the two path declarations — plus the read trigger. It has no version; install it once and it never churns.

The anchor is exactly this, with `NDS_ASSETS` set to the project's real static root:

```markdown
## NDS — National Design System (UI layer)

- `NDS_ROOT` = `.nds/`
- `NDS_ASSETS` = `/path/to/your-project/public/assets/`

All UI in this project is built with NDS. Before any UI, page, component, styling,
or asset work — or when unsure whether a task touches NDS — read `NDS-IQ.md` at this
project's root, top to bottom, once per session. Do no NDS work before that read.
A compacted or summarized context starts a new session: read the file again before
more NDS work.
If the file is missing, stop and ask the dev.

These hold even before the read:
- Never edit anything under `NDS_ROOT`; never hand-edit NDS files in `NDS_ASSETS`.
- Never write `.nds-*` markup from memory — copy from the sources `NDS-IQ.md` names.
```

**Anchor update**: if the installed anchor lacks the compacted-context sentence above, add it word for word. Nothing else in the anchor changes.

**First install**: download this file raw to `NDS-IQ.md` at the project root (curl or the stack's HTTP client, never a web-fetch tool); add the anchor to the agent file — `NDS_ROOT` ships set to `.nds/` (the canon home; only the dev's explicit call changes it), and `NDS_ASSETS` takes the project's real static root (unset by the dev, it stays a placeholder, and the placeholder rule blocks asset work until it is set); commit both. Then start at §Plan step 1: inventory the project and write `NDS-PLAN.md`. Installing the file is not the deliverable; the plan the dev reviews is.

**Migrating from a pasted block (instructions v6 and earlier)**: the old model pasted the whole rulebook into the agent file. Replace it: install the file and anchor per First install, carrying the pasted block's two declared path values into the anchor, then delete the pasted block — everything from its `## Design system: NDS Vanilla` heading through its `<!-- end NDS instructions -->` marker. One rule source remains: this file. Then start at §Plan step 1, the same as a first install: the pages here were built under the old rules, so they are prior NDS work and take the conformance assessment before anything new lands on them.

**Update**: "Upgrading NDS" step 4 — download raw main, check the `# NDS IQ` first line, replace the project root's copy whole, leave the anchor alone.
