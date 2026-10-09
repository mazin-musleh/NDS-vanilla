# NDS IQ — building UI with the National Design System (instructions v4.0)

## Start here

The project's agent file (`CLAUDE.md` / `AGENTS.md`) holds the anchor: the values of `NDS_ROOT` and `NDS_ASSETS`, and the trigger that sent you here.

- Read this file top to bottom once per session, before any NDS or UI work, and when unsure. Read it again after it is replaced or your context is compacted. At each phase boundary, reread that phase's gates.
- It is universal and read-only: no project values, no edits. Path values live only in the anchor.
- **This file holds rules, not facts.** It names no NDS file, class or API, because each release can change them. The template carries the facts:
  - `NDS_ROOT/NDS-INDEX.md` maps every need to that release's files. Read it first, once per session.
  - The docs it names hold every fact: markup, options, APIs, layout and styling rules.
  - The template's audit checks a live page. The index names how to run it.
- **No `NDS-INDEX.md` in `NDS_ROOT`?** The template predates this revision. Replace the project-root `NDS-IQ.md` with the revision that serves it, https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/tags/IQv3.1/_includes/NDS-IQ.md, read it, and tell the dev that rules updates stay on it until the template is upgraded.
- An older release may lack a doc or feature a newer one has: use what it ships, report the gap, and propose the upgrade as the dev's call. A missing route never blocks.

**`NDS_ROOT`**: the flat contents of one template release from https://github.com/mazin-musleh/NDS-vanilla/releases. Default `.nds/` at the project root, gitignored, read-only. It is correct when `NDS_ROOT/NDS-INDEX.md` resolves directly; never keep the zip's versioned wrapper folder.

**`NDS_ASSETS`**: the project's static folder for the NDS runtime; never under `NDS_ROOT`.

- Derive its served URL from the stack and confirm it with the dev before the first asset tag.
- Placeholder path? Stop NDS-side work and ask the dev. Inventory and plan work may continue; NDS targets stay `blocked on NDS_ROOT` until the sources resolve.
- Never adopt a candidate path yourself: list the candidates, read their version banners, and let the dev choose. Write a dev-supplied path into the anchor that session, never into `NDS-PLAN.md`.

## Red lines

1. **Never edit `NDS_ROOT`; never hand-edit NDS files in `NDS_ASSETS`.** If NDS itself needs a change, report it and stop.

2. **Never read minified JS or CSS.** Read the sources the index names. The one exception is a bundle's opening comment, read for its `Version:` banner.

3. **Copy canonical markup verbatim. Never invent it.** The index says where a doc keeps its canon and how to read it. Never copy a live demo or a built page: the docs are the only copy source. Preserve structure, classes, `data-*` attributes, and ARIA. Only these edits are allowed:

   | Edit | Allowed change |
   |---|---|
   | Asset URL | Rewrite `href`/`src` to `NDS_ASSETS` URLs |
   | Content | Replace placeholder text and content attributes; reset a replaced image's `width`/`height` to its real size |
   | Option | Add an option the doc lists, on the element it names |
   | CSP | The conversion the docs give for a strict Content Security Policy |

   - Keep every canonical part, in order. A small dataset or a minimal existing page is no reason to remove one. A matched source ships every part; name any domain-required removal to the dev before the page is done.
   - Put host-framework bindings on canonical elements as attributes. Never insert framework-generated UI elements.
   - Edit a copied script point by point against its source; never rewrite it.
   - Keep canonical wrappers with their children; never lift a child out.
   - Inherited markup follows the same rule.

4. **All page content uses the NDS page structure and layout primitives** the docs describe. No other framework's layout, no custom wrappers, no spacing the primitives do not set.

5. **Style in this order: documented knobs → tokens → scoped overrides.** Rebind tokens in a project stylesheet loaded after the NDS stylesheet, the way the tokens doc shows: every state of a family, in light and dark mode. An override is the last resort: scope it under a project class or `data-*`, comment why, and never restyle NDS internals.

6. **No legacy UI libraries: NDS and vanilla JS only.** The index maps each legacy library to its NDS replacement. Never mix NDS and legacy UI on one page: NDS pages load the NDS runtime, exclude inherited legacy CSS, and migrate inherited JS through §JS wiring. Removing legacy libraries project-wide is the dev's decision. An NDS spike is ONE parallel page with the full head, runtime, and canonical markup; it needs no plan, and every other rule applies.

7. **Replacing existing UI needs an approved porting strategy before file #1.**
   - **Default: parallel files.** Each NDS page goes beside its legacy page on a separate route or flag; legacy stays as reference and rollback. Prior non-conformant NDS rebuilds in place (§Plan).
   - **Score the strategy:** (1) NDS markup stays in templates/HTML, never in code strings; (2) fewest edits to existing files; (3) side-by-side serving and rollback survive; (4) page JS sits beside its page. Show the dev the comparison; in-place edits and deletions need approval.
   - **Page JS** loads after the NDS scripts. Inline page JS is a module script.

## Checks before claims

Read the source before you ask or answer an NDS question or wire page JS. A claim needs its check first:
- "NDS has no X" (yours, or the dev's "just use native X") → search the catalogs' `use_when` lines (the index names them).
- "I cannot see the page" → a failed headless attempt (§Verify).
- "The page is done" → both browser passes and a clean audit (§Verify).

Ask the dev only what NDS does not answer: project paths and conventions, pacing, unresolved trade-offs.

## Stop and ask

**Banner checks are bounded.** Read only a bundle's opening comment for `Version:`; absent means the release is unknown. Never scan deeper or infer the version elsewhere.

Report and stop when the dev must decide:

| State | Report | Dev decides |
|---|---|---|
| JS/CSS banners disagree | hand-assembled runtime or interrupted upgrade | release |
| both lack `Version:` | release unknown | release |
| `-dev` banner | no matching release | release |
| runtime outside `NDS_ASSETS` | location + affected pages | point the anchor there / move it |
| reference newer than runtime | pending upgrade | upgrade or not |
| no runtime anywhere | first setup | install latest and report |
| prior NDS work / inherited plan | conformance split (§Plan) | adopt / retire / rebuild |
| project rules conflict | conflict | which rules win |
| NDS itself needs changes | gap | separate conversation |

If the dev says a found runtime is legacy, treat setup as new, with the latest release as default, and assess its pages as prior NDS work.

## Setup

**The existing runtime version wins: never follow `latest` when `NDS_ASSETS` already has a runtime.**

1. Read the opening `Version:` banners of the main NDS script and stylesheet in `NDS_ASSETS`. They must agree; otherwise stop and ask.
2. Download that exact release's template zip from the release page and extract its contents flat into `NDS_ROOT`.
3. Follow the Install section of `NDS_ROOT/NDS-INDEX.md`: it names the sources to add and what to copy into `NDS_ASSETS`.

- An empty `NDS_ASSETS` proves nothing: search the project for NDS runtime files and the layouts that load them. Found → stop and ask. None → install the latest release and report it.
- At session start, compare the runtime banner in `NDS_ROOT` with `NDS_ASSETS`. Older reference → download the runtime's release again; newer reference → stop and ask.
- Older releases stay valid canon. Take every source from the release that matches the runtime, never from a newer one or from raw main.

## Plan

NDS is a UI layer; the host project (frontend and backend) serves it. NDS IQ never chooses or scaffolds the stack.

| Project state | Workflow | Plan |
|---|---|---|
| No host project | Stop NDS work; set the project up outside NDS IQ and resume once it serves. | None yet |
| Host serves; no UI | Greenfield: the dev brief gives pages and content, NDS canon gives structure and behavior. | Required for several pages; the dev may waive it for one |
| Existing non-NDS UI | Port: keep requirements and project contracts; replace UI structure with NDS canon. | Required; an explicit waiver permits one parallel page |
| Conformant NDS; one new page | Extend: its verified family archetype, then the composition cascade. | None; Build and Verify gates apply |
| Conformant NDS; several new pages | Inventory the named pages and their shared shapes. | Required |
| Prior NDS conformance unknown | Assess the current pages first. | Required |

**Plan entry gate.** Choose the work mode first. When a plan applies, list routes, layouts, shared partials, pages and views (one row per client-side view), and legacy UI libraries; map every page through the §Build cascade and record its page shape. Greenfield lists only the pages the dev named. No-plan work inspects only the named page, its shared layout, its global files, and the project contracts.

Check response headers and middleware for a Content Security Policy once, project-wide, and record the result. None → record `no CSP`; this closes the question: skip this file's CSP rules and ask the dev nothing about CSP. Found → read the docs' CSP guidance and record what the head needs.

Inspect every globally loaded stylesheet for element selectors (`body`, `h1`, `a`, `input`, …): each hit reaches every NDS page served through that entry. Record its isolation.

- **Repeated families:** map one archetype; sibling rows read `same as <archetype>`.
- **Prior NDS:** assess each page against current canon: conformant → `Awaiting Verification`; non-conformant → rebuild. Never silently resume an inherited plan.
- **Rebuild** clean, in place. Old work is a content, flow, and data reference, never a copy source. Remove its NDS footprint through the approved plan; rollback is git. The approval names the cost: unported pages run on the new runtime before their rebuild and may render worse.
- **Second runtime:** only by explicit dev decision, with parallel files and a second assets folder, accepting the cost.

When a plan is required, create `NDS-PLAN.md` at the project root, starting with `Managed by NDS IQ`, with columns for page, route, legacy libraries, NDS target, and status. Stop before building. Ask every project-wide decision in ONE numbered review message (asset URL prefix, porting strategy, prior-NDS split, CSP grant only when a CSP was found, pacing), each with options and a recommended default, and record the answers in the plan. Page-specific questions wait for that page's session. In every phase, the conversation asks and the plan records.

**The plan is cross-session memory.**

- Statuses, in the Status column only: `Planned`, `In Progress`, `Awaiting Verification`, `Built and Verified`. Only dev confirmation sets `Built and Verified`.
- `Awaiting Verification` means every agent-owned check passed with its evidence recorded. An unmet required check keeps the row `In Progress` with an open checkbox.
- Every open question, check, fix, or deferred decision is a `- [ ]` item, resolved as `- [x]`, never deleted. Checkboxes are not status.
- **Pacing:** `gate-by-gate` (default) or `whole plan`, which takes this file's defaults, verifies each page, and leaves rows `Awaiting Verification` until the dev confirms.
- When every row is verified, retire the plan. A new multi-page effort or a dev-requested re-audit recreates it from current state: passing pages `Awaiting Verification`, drifted pages `Planned` with their deltas named.
- **No-plan work** covers one named page: state its source paths and open questions first; the final report carries the verification evidence and any unmet check. If the dev waived a required plan, note once that cross-session memory is lost.
- **`NDS-REPORT.md`** (optional) holds NDS findings only: a missing API or event, a canon/rule/doc contradiction, a reproducible bug, a rule gap. Give the NDS version, instruction version, component, and a generic repro; never project markup, routes, or data.

## Build

**Build entry gate.** Reopen the page's plan row. Before markup, record the work mode, the chosen archetype, template, example, or custom case, and the doc sources (no-plan work states them). Resolve every open source or path question first.

**Chrome first.** Build each required page shape once, then its pages. The index names where the head, the page shapes, and the chrome parts are documented.

1. **Head:** copy the head canon as a unit. Rewrite asset URLs only; never remove or reorder entries. Keep the page title and hero preloads page-specific. Replace the favicon. Under a CSP, apply the docs' CSP guidance to the head.
2. **Page shape:** copy the shape's canon and swap the content; never recreate it from prose.
   - Layout state (the shape's classes) is in the first HTML the browser paints. One app serving two shapes (public pages and a console admin) sets each route's classes for that route only, before the framework mounts; never in a mount effect, never on every route.
   - A client-rendered app follows the page layout doc's framework rules for its mount element.
   - Set both `<html lang>` and `dir`: Arabic → `ar`/`rtl`; others → `ltr`. With no locale mechanism, ship Arabic-first bilingual with the language switcher.
3. **Brand:** the project logo replaces the template's; drop the brand text when the logo already carries the name.

**Copied chrome ships as-is:** the top bar, main navigation, footer, accessibility panel and its button, cookie notice, digital stamp, and dark-mode switch. Record removable items as plan checkboxes only the dev ticks; never infer affiliation. Before page #2, wire project-backed controls to real session, API, or route data; remove what the project cannot back. Never ship a fake identity or a dead widget.

### Composition cascade

Match by `use_when` across the template, example, and component catalogs, never by title:

1. A matching template → copy it.
2. No template → the closest example.
3. No match → a custom scaffold inside red line #4, reusing canonical wiring patterns.

Keep the matched source's structure and put the project's content into every part; never rebuild it. It is a floor, not a ceiling: add the sections the project needs, matched through the catalogs. A family's `Built and Verified` archetype outranks the cascade for its siblings.

At each page start, resolve its recorded questions, list every UI part, and match each against the component catalog. A missing part comes from its canonical component; no match → custom case.

### Authority by concern

The existing UI means the screens being replaced, never a separate app.

| Concern | Authority |
|---|---|
| Required content, fields, order, business outcomes | Existing UI; the dev brief when there is none |
| Routes, views, client state, asset paths, load order | Project frontend |
| APIs, authentication, permissions, validation, data rules | Project backend |
| Page structure, component markup, classes, ARIA, `data-*`, component interactions | NDS canonical sources |

A conflict between the existing UI and a backend contract is the dev's decision: report it, never guess.

### Design choices

**NDS UI outranks the legacy UI.** The existing UI sets the content, fields, order, and outcomes a page carries, never how they are presented, and never a component's feature set: a legacy page that lacked a control is missing a default, not drawing a scope boundary. Search, sorting, filtering, export, counts, validation chrome, and responsive behavior are NDS defaults, not questions; they never change business rules or backend contracts.

Map every part a matched source ships to the project's data: a two-state field is a single-choice facet, a numeric field a range. Legacy filtering by one thing is no reason to ship one facet.

- An existing page without a hero gets the sub hero; a heavy-text page gets its flat variant. The hero slider stays on home and hub pages.
- A different required presentation picks a documented NDS variant first; it never changes a component's canonical anatomy.
- Forms default to TWO input steps, form and review; add more only when the flow needs them. A terminal confirmation is not an input step: keep the success step the source ships.
- Greenfield only: remove a template section the brief does not cover; never invent content to fill one.
- Data scale follows the existing API: an endpoint that returns the full set → fetch once and let the NDS components filter, sort, page, and export in the browser; an endpoint that pages, sorts, or filters on the server → wire the NDS controls to its parameters. A shape that misfits the data → report it; backend changes are the dev's.

**Replacing a legacy library:** name the capability, search the catalogs, compose NDS components if needed, and port its callbacks through NDS methods and events. Truly uncovered → vanilla JS inside red line #4; never the legacy library for one widget.

### JS wiring

Before listening on NDS elements or writing NDS-owned attributes, read the component's JS API (the index names where). If NDS ships a behavior, use its methods and events; never rebuild it. Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names.

- Every request needs a visible failure path (form or component status, or an alert), exercised in §Verify.
- Markup that changes after load (added rows, fetched HTML, views that mount or unmount) follows the docs' guidance for content that changes after load. A lazy namespace's existence proves nothing.
- If NDS has no surface you need, direct code is allowed: comment what you checked and add the finding to `NDS-REPORT.md`.

**Build exit gate.** Before §Verify:

- Name the canonical page source and the doc sources used.
- Confirm every part and behavior was matched through the catalogs and the docs.
- List the matched source's facets, controls, and columns beside the page's: equal counts, or each difference named.
- Confirm every structural change is one of red line #3's allowed edits.
- Check every icon name in the page HTML and its JS against the icon catalog: the audit cannot see names inside JS strings.
- Under a strict style policy, find every inline style the copied markup carries and convert it as the docs show.

Record the evidence under the plan row (no-plan: in the final report). An unmet check stays open: the row stays `In Progress`.

## Verify

**Verify entry gate.** The §Build exit evidence is recorded. Open the built reference page that matches yours (the index names where built pages are and how to serve them).

Never verify from code inspection. A page needs both browser passes:

- **Behavioral:** load it, run the template's audit, and fix or name every finding. Exercise the wired behavior, including one request failure path. Submit every required field type empty, one by one: each type validates through its own code, so one passing proves nothing about the next.
- **Visual:** compare your page with the built reference page at desktop and mobile widths, both served over HTTP (never `file://`, which floods the console with false errors). **The built page is the visual spec:** a difference you chose is a content swap; one you didn't is a bug. Inspect spacing, icons, width and sticky behavior, dark mode, and overall coherence. Measurements alone are not visual verification.

**Drive both passes headlessly** with a browser your own tool loop controls. Keep temporary tooling outside the project; never change its lockfile. Behavioral proof is the console plus the audit; visual proof is screenshots you inspect at both widths.

**Set the viewport, never the window.** OS window minimums clamp small widths while screenshots still crop to the requested size, faking a responsive failure. Use Puppeteer `page.setViewport()`, a Playwright context `viewport`, or CDP `Emulation.setDeviceMetricsOverride`; never `--window-size` or a window resize. No CDP-capable tool? Set one up: `puppeteer-core` or Playwright in a scratch folder outside the project, pointed at the installed Chrome. The viewport is unmet only after that attempt fails. Before trusting a screenshot, read `window.innerWidth`: it must equal the target, or the viewport is wrong, not the page.

Claim "cannot see the page" only after the headless attempt fails, and report the failure. Then take the first available fallback and report what stays unverified:

1. An existing browser tool or harness, authenticated sessions included. An unreachable viewport stays unmet.
2. A smoke check: `curl -sI` for status and CSP; `curl -s` for an intact head and scripts, server errors, and forbidden inline styles under a strict CSP.
3. The dev checklist:

   [VERIFICATION CHECKLIST FOR DEV]
   - [ ] Check the console for NDS warnings and the audit's findings.
   - [ ] Test responsiveness below 768px.
   - [ ] Check expected spacing.
   - [ ] Check every icon renders as a glyph.
   - [ ] Check dark mode on page content.

**Verify exit gate.** Record under the plan row (no-plan: in the final report):

- the audit result, exercised behavior, and failure-path result;
- the built reference page and the inspected desktop screenshot;
- the mobile target width, the equal `window.innerWidth`, and the inspected mobile screenshot;
- the icon, dark-mode, and strict-CSP results that apply;
- every unmet item.

An unmet item keeps the row `In Progress`; no-plan work reports the page unverified. With every agent-owned check passed, a row may move to `Awaiting Verification` (no-plan: report that it awaits the dev). Only dev confirmation makes a page `Built and Verified`.

## Upgrade

An explicit upgrade request is approval. A request to update the rules or instructions is not an upgrade: it runs only §This file's Update. An update check compares the runtime banner with the latest release and reports relevant changelog entries; upgrade only on dev approval. Write with absolute paths, never `cd` into `NDS_ROOT` or `NDS_ASSETS`, and inspect each destination after writing.

1. **Compare versions:** the runtime banners in `NDS_ROOT` and `NDS_ASSETS`.
2. **Replace the runtime:** replace `NDS_ROOT` with the latest release as in §Setup, then refresh `NDS_ASSETS` as its index says. Keep the project's favicon and every project-added file; deletions need dev approval. Work done under earlier rules passes §Plan's conformance check first.
3. **Sweep the pages:** follow the Upgrade section of the new `NDS-INDEX.md`: read the migration notes between the two versions and run the audit's migration check on every page, not only the ones you touched. Add the affected work to `NDS-PLAN.md`, map it to pages, execute, and report. Also report useful new and changed features for the dev to choose.
4. **Update this file** (below).

## This file

Two pieces: **`NDS-IQ.md`** at the project root, committed and replaced whole on update, from `https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md`; and **the anchor** in `CLAUDE.md` / `AGENTS.md`, holding the only project paths and the read trigger, installed once.

**Update:** compare raw main's content with the project-root copy; any difference is a newer revision, installed on dev approval (an explicit update request is approval). Download with curl or the stack's HTTP client, never a web-fetch tool. Accept it only if line 1 starts `# NDS IQ`; otherwise discard and retry once, and after a second failure report it and keep the installed copy. Replace the root copy whole (no merging, anchor untouched), then read it again before continuing.

**First install:** download the raw file to the project root, add the anchor with `NDS_ROOT=.nds/` and the real `NDS_ASSETS` path, commit both, then run the §Plan inventory and create `NDS-PLAN.md`.

The anchor, with `NDS_ASSETS` set to the project's real static root:

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
