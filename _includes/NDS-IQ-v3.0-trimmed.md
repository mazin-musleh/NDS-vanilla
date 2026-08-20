# NDS IQ — building UI with the National Design System (instructions v3.0)

## How to use this file

The project's agent file (`CLAUDE.md` / `AGENTS.md`) declares `NDS_ROOT` and `NDS_ASSETS` and points here.

- Read this file top to bottom once per session before any NDS/UI work or when unsure.
- This file is universal and read-only: no project values and no edits.
- Path values live only in the anchor.
- Updates replace this file whole. After any replacement or context compaction, reread it before continuing.

## The two paths

**`NDS_ROOT`** — the flat contents of one NDS template release from https://github.com/mazin-musleh/NDS-vanilla/releases. Default: `.nds/` at project root, gitignored. The path is correct when `NDS_ROOT/_site/` resolves directly; never keep the zip's versioned wrapper. Read-only.

**`NDS_ASSETS`** — the project's static folder receiving NDS runtime assets; never under `NDS_ROOT`.

- Derive its served URL from the stack and confirm it before the first asset tag.
- Placeholder path? Stop NDS-side work and ask the dev. Inventory/plan work may continue; NDS targets stay `blocked on NDS_ROOT` until sources resolve.
- Never adopt candidate paths yourself. Enumerate candidates, read their banners, and let the dev choose.
- Persist any dev-supplied path in the anchor that session. Never store paths in `NDS-PLAN.md`.

## Standing principles

**P1 — Check before claim.**

| Claim | Required check |
|---|---|
| "NDS has no X" — yours or the dev's "use native X" | search catalog `use_when` (§Build) |
| release known / unknown | banner check (P2) |
| cannot see page | headless attempt (§Verify) |
| no CSP concern | response-header sweep (§Plan) |
| page done | both browser passes (§Verify) |

**P2 — Banner checks are bounded.** Read only a bundle's opening comment for `Version:`. If absent, the release is unknown. Never scan deeper into minified files or infer the version elsewhere → P5.

**P3 — Source first.** Before asking/answering an NDS question or wiring page JS, read the relevant source:

| Need | Read |
|---|---|
| component markup/usage | `_source/<folder>/<name>.md` (`folder` from catalog `url`) |
| chrome, head, CSP, locale | `_source/ui-shell/*.md` |
| runtime/framework lifecycle APIs | `_source/core/*.md` |
| component JS API | `_source/_js/nds-<name>.js` banner |
| available UI | `_source/_data/content/*.yml` |
| styling knobs/tokens | `_source/_sass/components/*.scss`, `_source/_sass/tokens/` |
| built visual twin | `_site/**/*.html` |

Ask the dev only what NDS does not answer: project paths/conventions, pacing, or unresolved trade-offs.

**P4 — Copy is a contract.** Canonical markup, the head, and copied page scripts stay canonical. Only hard rule #3's four edit types are allowed.

**P5 — Report and stop** when a dev decision is required:

| State | Report | Dev decides |
|---|---|---|
| JS/CSS banners disagree | inconsistent runtime | release |
| both lack `Version:` | release unknown | release |
| `-dev` banner | no matching release | release |
| runtime outside `NDS_ASSETS` | location + affected pages | point anchor there / move it |
| reference newer than runtime | pending upgrade | upgrade or not |
| no runtime anywhere | first setup | install latest and report |
| prior NDS work / inherited plan | conformance split (§Plan) | adopt / retire / rebuild |
| project rules conflict | conflict | which rules win |
| NDS itself needs changes | gap | separate conversation |

If the dev says a found runtime is legacy, ignore it: treat setup as new — the latest release becomes the default — and assess its pages as prior NDS work.

## Seven hard rules

1. **Never edit `NDS_ROOT`.** It is read-only. If NDS itself needs a change, report it and stop.

2. **Never read minified JS/CSS.** Use the `NDS_ROOT/_source/` twin. Exception: read only a bundle's opening comment for the `Version:` banner (P2).

3. **Copy canonical markup verbatim. Never invent it.** Copy the `lang-html` block from `_source/<folder>/<name>.md`; use `_site/<folder>/<name>.html` as the built reference. Preserve structure, classes, `data-*`, and ARIA.

   Only these edits are allowed:

   | Edit | Allowed change |
   |---|---|
   | Asset URL | Rewrite template `href`/`src` to `NDS_ASSETS` URLs |
   | Content | Replace placeholder text/content attributes; reset replaced-image `width`/`height` to real dimensions |
   | Modifier | Add classes listed in the component's Modifier Classes table |
   | CSP knob | Under strict `style-src`, move inline `style="--…"` values to a project-scoped class in an allowed `<style>`; nonce/hash covers `<style>`, never the attribute |

   Never drop/reorder canonical members to satisfy project constraints; add host-framework UI markup; rewrite copied scripts from scratch; or move children out of canonical wrappers. Framework helpers may add attributes to canonical elements only. If a real domain reason requires removing a member, tell the dev.

   Inherited markup follows the same rule. Copy layout-coupled components (side menu/info, steppers, heroes) from a FULL page that uses them.

4. **All page content uses NDS sections and layout primitives.** Read `_source/layout/section.md` first.
   - Every content block uses `<section class="nds-content-section">` with the documented tier.
   - Every section lives inside `.nds-content-layout > .nds-main-content`.
   - Compose only with `nds-grid`, `nds-flex`, and `nds-block`; no Bootstrap layout or custom flex wrappers.
   - Use primitive `--gap` for spacing, not margins. `.nds-section-body` adds no gap. Give standalone buttons their own row/full width; wrap `.nds-form` fields in a gapped container.

5. **Style in this order: knobs → tokens → scoped overrides.**
   - **Knobs:** use documented CSS variables. Find them via `var(--` in `_source/_sass/components/_<name>.scss`. Under strict `style-src`, use rule #3's CSP conversion.
   - **Tokens:** rebind semantic tokens from `_source/_sass/tokens/_semantic.scss` after `nds-main.min.css`. If dark mode remains, mirror rebinds under `:root[data-theme~="dark"]`.
   - **Overrides:** only when neither works; scope under a project class/`data-*` and comment why. Do not override `.nds-*` internals directly.

6. **No legacy UI libraries: NDS + vanilla JS only.**

   | Legacy | Use |
   |---|---|
   | Select2 | autocomplete / multiselect |
   | Summernote / TinyMCE | editor |
   | jTables / DataTables | table + sort + filter + pagination + export |
   | Font Awesome | HGI icons |
   | Bootstrap | NDS layout primitives |
   | jQuery | vanilla JS / NDS APIs |
   | global `site.css` / `site.js` | rule #5 + §JS wiring |

   Do not mix NDS and legacy UI on the same page. NDS pages use the runtime from `NDS_ROOT`, exclude inherited legacy CSS, and migrate inherited JS through §JS wiring. Removing legacy libraries project-wide is the dev's decision.

   An NDS spike is ONE parallel page with the full head, runtime, and canonical markup. No plan required; all other rules apply.

7. **Replacing existing UI requires an approved porting strategy before file #1.**
   - **Default: parallel files.** Create each NDS page beside the legacy page on a separate route/flag; keep legacy as reference and rollback. Prior non-conformant NDS rebuilds in place (§Plan).
   - **Score the strategy:** (1) NDS markup stays in templates/HTML, never code strings; (2) minimize existing-file edits; (3) preserve side-by-side serving/rollback; (4) co-locate page JS. Show the dev the comparison; in-place edits/deletions require approval.
   - **Page JS:** co-locate where possible and load after the chrome scripts. Inline page JS uses `<script type="module">`; never rely on inline `<script defer>`.

## Install

**Existing runtime version wins; never follow `latest` when `NDS_ASSETS` already has one.**

1. Read the opening `Version:` banners in `NDS_ASSETS/js/nds-main.min.js` and `NDS_ASSETS/css/nds-main.min.css`. They must agree; otherwise → P5.
2. Download that exact release: `releases/download/v<version>/nds-vanilla-template-v<version>.zip`. Extract its contents flat into `NDS_ROOT`.
3. If `NDS_ROOT/_source/` is absent (newer zips do not ship it), download the SAME tag's source zip to a temp folder outside the project and copy available `_js`, `_sass`, `components`, `utilities`, `layout`, `ui-shell`, `core`, `templates`, `examples`, `_data/content` into `NDS_ROOT/_source/`.
4. Copy all of `NDS_ROOT/_site/assets/` into `NDS_ASSETS` unchanged. Preserve lazy-bundle and `i18n/<component>/<lang>.json` paths.

- Never copy `_site/docs-assets/`, except one explicitly wanted event skin and its script.
- Empty `NDS_ASSETS` is not proof of first setup: search the project for `nds-main.min.js` and its loading layouts. Found → P5. None → install latest and report it.
- At session start compare the `NDS_ROOT` runtime banner with `NDS_ASSETS`. Older reference → re-download the runtime's release and repopulate `_source/`; newer reference → P5.
- Older releases remain valid canon. Populate `_source/` from the matching tag only; never substitute newer source, never raw main. Report the gap; propose the upgrade as the dev's call.

## Plan

NDS is a UI layer; the project must already exist and serve. A fresh scaffold qualifies. No project → report and stop.

**Inventory first.** List routes, layouts, shared partials, pages/views, and legacy UI libraries. Each client-side view gets its own row. Map every page through the §Build composition cascade and record its per-page chrome shape (`full`, `console`, `minimal`). Greenfield: only pages the dev named; legacy columns empty.

Check response headers/middleware for CSP. Read `ui-shell/head.md` §CSP and plan the required nonce (server-rendered) or hash (static host).

Inspect every globally loaded stylesheet for element selectors (`body`, `h1`, `a`, `input`, etc.). Treat each hit as affecting every NDS page served through that entry; record how the porting strategy isolates NDS pages.

- **Repeated families:** map one archetype; keep sibling rows as `same as <archetype>`.
- **Prior NDS:** assess each page against current canon. Conformant → `Awaiting Verification`; non-conformant → legacy NDS. Never silently resume an inherited plan.
- **Legacy NDS:** rebuild clean in place; old work is content/flow/data reference only, never a copy source. Remove its NDS footprint through the approved plan; rollback is git. The approval names the costs: unported pages run the new runtime until their rebuild and may render worse on it.
- **Second runtime:** only by explicit dev decision; use parallel files plus a second assets folder, accepting the two-runtime cost.
- Project-rule conflict → P5.

Create root `NDS-PLAN.md`, starting with `Managed by NDS IQ`, with columns: page, route, legacy libraries, NDS target, status. Stop before building and ask all project-wide decisions in ONE numbered review message, each with options and a recommended default: asset URL prefix, porting strategy, prior-NDS split, CSP grant, pacing. Record answers in the plan. Defer page-specific questions to that page's build session.

**The plan is cross-session memory.**

- Statuses only: `Planned`, `In Progress`, `Awaiting Verification`, `Built and Verified`. Only dev confirmation sets `Built and Verified`; status lives only in the Status column.
- Every open question/check/fix/deferred decision is a `- [ ]` item; resolve as `- [x]`, never delete. Checkboxes are not page status.
- **Pacing:** `gate-by-gate` (default) or `whole plan`. Whole-plan mode uses file defaults, verifies each page, updates rows as pages complete, and leaves them `Awaiting Verification` until dev confirmation.
- When all rows are verified, retire the plan. A new multi-page effort or a dev-requested re-audit recreates it from current state: passing pages enter `Awaiting Verification`, drifted pages `Planned` with their deltas named.
- **Plan waiver:** if the dev says `just build X, no plan`, note the loss of cross-session memory once; all rules/verification still apply. In a legacy app, this permits one parallel NDS page.
- Optional `NDS-REPORT.md` records NDS findings only: missing APIs/events, canon/rule/doc contradictions, reproducible bugs, or rule gaps. Include NDS version, instruction version, component, generic repro; never project markup/routes/data.

## Build

**Chrome first, components second.** Build each planned chrome shape once, then its pages. Shape references: `_source/examples/sign-in.md` / `registration.md` = minimal; `console-demo.md` = console.

1. **Head** — copy the head from `NDS_ROOT/_site/index.html` as a unit; use `ui-shell/head.html` as reference. Rewrite asset URLs only; do not remove/reorder entries. Keep `<title>` and hero preloads page-specific. Never add `nds-delegated.min.js` or `nds-extras.min.js` manually. Replace the favicon. Under CSP, authorize the head's inline script.
2. **Master layout** — copy the complete `<body>` from a built `_site/` page matching the planned shape and swap the content; never recreate it from prose. Use `_source/layout/page-shell.md` for shapes/modifiers. Older templates: choose the matching built page by inspection and report the missing reference.
   - Layout-affecting modifiers (`nds-full-width`, `nds-wSideMenu`, and all `page-shell.md` modifiers) must exist in initial HTML. Route-dependent modifiers are set synchronously before framework mount, never in a mount effect.
   - Client-rendered apps mount the copied shell inside `#root`/equivalent with `display: contents` in project CSS.
   - Put copied runtime `<script defer>` tags at the end of `<body>`: `nds-main.min.js`, plus `nds-accessibility.min.js` when its panel remains.
   - Set both `<html lang>` and `dir`: Arabic → `ar`/`rtl`; others → `ltr`. With no locale mechanism, ship Arabic-first bilingual with the existing switcher.
3. **Brand** — put the project logo on `.nds-brand-logo`; remove its text span unless the logo is a bare mark. Then build inner components.

**Admin/console:** add `nds-full-width` to `<body>` and place the hero inside `.nds-main-content` beside the side menu (`console-demo.md`).

**Copied chrome ships as-is.** Chrome means the topbar, main navigation, footer, accessibility panel and its FAB, cookie popup, DGA stamp, and dark-mode toggle. Keep every self-contained piece; record removable items as plan checkboxes. Only the dev ticks them. Never infer affiliation.

Before page #2, wire project-backed controls to real session/API/route data. Remove controls the project cannot back; never ship fake identity or dead widgets.

### Composition cascade

Search `use_when` across `templates.yml`, `examples.yml`, and `components.yml`; match by `use_when`, never title.

1. Matching DGA template → copy `_source/templates/<name>.md` as-is; swap content only; never rebuild its structure.
2. No template → closest `_source/examples/*.md`.
3. No match → custom scaffold inside hard rule #4, reusing canonical wiring patterns.

A page family's `Built and Verified` archetype outranks the cascade; siblings copy it and swap entity content.

At each page start, resolve its plan-row questions, list every UI part, and match each against `components.yml`. Missing parts come from their canonical component; no match → custom case. A controls bar above a table/list/grid is the Toolbar component. P1 applies before claiming NDS lacks anything.

Before page JS, list every intended behavior and check the component catalogs/banners. If NDS ships the behavior, use its methods/events; do not rebuild it. Apply the same rule to core helpers (§JS wiring).

**Port content, flow, and data structure; improve UI/UX with NDS defaults.**
- Legacy pages without heroes get `nds-sub`; heavy-text pages also get `nds-flat`. Hero sliders stay on home/hub pages.
- Legacy presentation beats a template's alternate presentation; use the component's matching variant first.
- Forms default to TWO steps: form + review. Add more only when the flow requires them.
- Greenfield uses the dev brief. Remove unfilled template sections; never fabricate content.

**Copy rendered markup when source markup is generated.** Do not copy Liquid tags. For front-matter-generated regions or page wrappers, copy the built twin's rendered HTML/full `<body>`.

**Replacing a legacy library:** name the capability, search the catalogs, compose NDS components if needed, and port callbacks through NDS methods/events. Truly uncovered → vanilla inside hard rule #4; never reintroduce the legacy library for one widget.

**Icons:** §Verify's behavioral pass checks every `nds-hgi-*` token. Other glyphs use `<i class="hgi hgi-stroke hgi-<name>">` from `_source/_sass/_hgiRoundedStroke.scss`.

**Strict `style-src`:** before done, grep the page for `style="` and convert every canonical inline knob through hard rule #3's CSP edit.

## JS wiring

**Use NDS APIs before direct DOM wiring.** Before adding listeners to `.nds-*` elements or writing NDS-owned `data-*`, read the component banner in `_source/_js/nds-<name>.js`:

- **Rides** — base component/inherited surface.
- **Methods** — public calls.
- **Events** — dispatched events and `detail`.
- **Hooks** — owned `data-*` / action roles.
- **Gotchas** — required traps/constraints.

Before hand-writing fetch, debounce, resize, or state/status DOM logic, read `nds-core.js` for `NDS.request`, `NDS.State`/`NDS.Status`, `NDS.lang`/`NDS.isRTL`/`NDS.breakpoints`, `NDS.debounce`, `NDS.i18n.load`.

Every request needs a visible failure path through the form/component status or an alert; exercise it during verification.

If NDS has no needed surface, direct code is allowed; comment what was checked and create/add the finding to `NDS-REPORT.md`.

- After dynamic DOM changes, prefer `NDS.<Component>.reinit()`; check the banner because component lifecycle APIs differ.
- Lazy namespace existence proves nothing; use the banner/grep to confirm methods.
- Copied template/example page JS is canonical and follows hard rule #3.
- Data scale: under ~500 rows, fetch once and use client-side table/filter/sort/export; above that or growing, use server-driven pagination/sort/filter. Backend changes are proposed to the dev.

## Verify

Never verify from code inspection. A page needs both browser passes:

- **Behavioral:** load it, run `NDS.Init.audit()`, inspect NDS warnings, and exercise wired behavior including one request failure path. Also check every `nds-hgi-*` token in the page HTML and its page JS against `_source/_data/content/icons.yml`: `NDS.Init.audit()` does not see icon names inside JS strings. Submit every required field type empty, one by one: the types share one required mark but each validates through different code, so one passing field proves nothing about the next. During active work, `window.NDSInitConfig = { enableLogging: true }` may be set before NDS scripts.
- **Visual:** serve `NDS_ROOT/_site` over HTTP (a quick static server — never `file://`, which floods the console with false errors) and compare your page against the matching built page at desktop and mobile widths. **The built twin is the visual spec:** a difference you chose is a content swap; a difference you didn't is a bug. Also inspect spacing, icons, width/sticky behavior, dark mode, and overall coherence. Measurements alone are not visual verification.

**Drive both passes headlessly** with existing tooling (project e2e harness, Playwright, Puppeteer, or headless Chrome); never install browser tooling into the project or change its lockfile. Behavioral = console + audit; visual = screenshots you inspect at desktop and mobile widths. Claim "cannot see the page" only after this fails; report the failure. An unreachable viewport remains unmet.

If the attempt fails, use the first available fallback and report what remains unverified:

1. Existing browser tool/harness, including authenticated sessions. Any unreachable viewport remains unmet.
2. Smoke check: `curl -sI` for status/CSP; `curl -s` for intact head/scripts, server errors, and forbidden inline styles under strict CSP.
3. Dev checklist:

   [VERIFICATION CHECKLIST FOR DEV]
   - [ ] Check console for `NDS`-prefixed warnings.
   - [ ] Test responsiveness below 768px.
   - [ ] Check expected spacing.
   - [ ] Check every icon renders as a glyph.
   - [ ] Check dark mode on page content.

Under strict `style-src`, confirm §Build's `style=` grep ran on this page; run it if not.

Self-verified rows remain `Awaiting Verification`; only dev confirmation makes `Built and Verified`.

## Upgrading NDS

An explicit upgrade request is approval. Download latest and replace `NDS_ROOT` exactly as §Install; prior-rules work takes §Plan conformance first.

For an update check, compare the runtime banner with the latest release and report relevant changelog changes; upgrade only on dev approval.

For rules updates, compare raw main `NDS-IQ.md` content with the project-root copy, never `NDS_ROOT/NDS-IQ.md`. Any difference means a newer revision; install only on dev approval. An explicit update request runs step 4 directly.

Use absolute paths for writes; never `cd` into `NDS_ROOT`/`NDS_ASSETS`. After each write, inspect the destination.

1. **Compare versions** — opening `Version:` banners in `NDS_ROOT/_site/assets/js/nds-main.min.js` and `NDS_ASSETS/js/nds-main.min.js`.
2. **Replace runtime** — copy new `_site/assets/` over `NDS_ASSETS`; preserve project `img/favicon.svg`. Keep project-added files; deletions require dev approval.
3. **Sweep pages** — read every `### Migrating from` section in `CHANGELOG.md` between the two banners; add affected work to `NDS-PLAN.md`, map it to pages, execute, and report. Also report useful `Added` / `Changed` / `Fixed` items for dev choice.
4. **Update this file** — download raw main `NDS-IQ.md` with curl/the stack HTTP client, not a web-fetch tool. Accept only if line 1 starts `# NDS IQ`; otherwise discard and retry once — a second failure is reported and the installed copy stays. Replace the project-root copy whole — no merging, anchor untouched — then reread the file before continuing.

## Install and upgrade this file

NDS IQ has two pieces:

1. **`NDS-IQ.md`** at project root, committed and replaced whole on update. Source: `https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md`. `NDS_ROOT/NDS-IQ.md` is only the release's offline copy.
2. **Anchor** in `CLAUDE.md` / `AGENTS.md`: the only project-specific path values plus the read trigger. Install once.

Use this anchor, setting `NDS_ASSETS` to the project's real static root:

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

**Anchor update:** if the compacted-context sentence is missing, add it exactly; change nothing else.

**First install:** download raw `NDS-IQ.md` to project root; add the anchor with `NDS_ROOT=.nds/` and the real `NDS_ASSETS` path; commit both; then run §Plan inventory and create `NDS-PLAN.md`.

**Migrating from pasted instructions (v6 and earlier):** install this file + anchor, carry over the two path values, delete the old pasted instruction block — everything from its `## Design system: NDS Vanilla` heading through its `<!-- end NDS instructions -->` marker — then run §Plan conformance as prior NDS work.

**Update:** use §Upgrading NDS step 4.
