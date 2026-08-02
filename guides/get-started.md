---
layout: page
title: Get Started
since: "1.5.x"
updated: "1.5.x"
last_edit: "02/08/2026 - 10:36 AM"
lang: en
direction: ltr
hero_title: Get Started with NDS
hero_tags:
  - label: Beta
    style: nds-yellow
hero_description: "Everything needed to adopt NDS in a project: download the template, install the agent instructions, build the UI page by page, and stay current with upgrades."
breadcrumb: ["Guides"]
layout_class: nds-wSideInfo
sidemenu_mode: false
---

<section id="getStartedGuide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-md nds-sticky nds-top" aria-label="On this page">
            <nav class="nds-toc" aria-label="Table of contents"
                data-toc-source="#getStartedGuide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                    <span class="nds-label">On this page</span>
                    <h2 class="nds-toc-title nds-truncate">Adoption Path</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>
        <div class="nds-info-content">
            <article>

                <h2 id="overview" class="nds-section-title">Overview</h2>
                <p class="nds-section-description">What the agent-driven workflow delivers, and how its instruction system was built.</p>

                <p>The canonical way to build with NDS is through an AI coding agent. NDS ships everything an agent needs to do that work properly: canonical markup to copy, machine-readable catalogs to search, readable source behind every bundle, and an instruction block that encodes the rules of the system.</p>
                <p><strong>The instruction block</strong> was engineered from the components' internal logic outward: init lifecycles, event surfaces, state cascades, dependency graphs. It was then hardened by running real migrations with AI agents and encoding every point of failure they surfaced.</p>
                <p><strong>It gives the agent:</strong></p>
                <ul>
                    <li>Seven hard rules covering markup, styling, libraries, and porting.</li>
                    <li>A workflow to follow: inventory, plan, build, verify.</li>
                    <li>A plan file (<code class="nds-inline-code lang-html">NDS-PLAN.md</code>) that records decisions, page status, and open questions across sessions.</li>
                    <li>A source reference so canonical markup gets copied, not invented.</li>
                </ul>
                <div class="nds-block">
                    <div class="nds-alert nds-card nds-color" data-status="info" role="alert">
                        <span class="nds-feedback nds-alert-icon nds-outline">
                            <span class="nds-feedback-icon">
                                <i class="nds-icon" aria-hidden="true"></i>
                            </span>
                        </span>
                        <div class="nds-alert-content">
                            <div class="nds-alert-text">
                                <span class="nds-alert-title">Tested with Claude Code</span>
                                <p class="nds-alert-description">This guide was built and tested end to end with Claude Code. The instructions are agent-agnostic and should work with any capable local agent, but other agents have not been exercised against the full workflow; their behavior may vary.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p><strong>The system rests on two permanent inputs:</strong></p>
                <ol>
                    <li><strong>The NDS template</strong>: stored locally as a read-only reference the agent copies from.</li>
                    <li><strong>The NDS instructions</strong>: installed once in the agent's instruction file.</li>
                </ol>
                <p>Both are configured a single time. After that, development proceeds gate by gate by default, with progress tracked in an <code class="nds-inline-code lang-html">NDS-PLAN.md</code> file at the project root, so any session can continue where the last one stopped without relying on conversation history.</p>

                <div class="nds-block">
                    <div class="nds-alert nds-card" data-status="info" role="alert">
                        <span class="nds-feedback nds-alert-icon nds-outline">
                            <span class="nds-feedback-icon">
                                <i class="nds-icon" aria-hidden="true"></i>
                            </span>
                        </span>
                        <div class="nds-alert-content">
                            <div class="nds-alert-text">
                                <span class="nds-alert-title">Prerequisite</span>
                                <p class="nds-alert-description">This workflow requires a local CLI or IDE agent with filesystem access, such as Claude Code, Cursor, or Codex. Browser-based assistants (claude.ai, ChatGPT Web) cannot read local template directories or write to your project.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 id="template" class="nds-section-title">1. The Template</h2>
                <p class="nds-section-description">The authoritative source for components, markup, design tokens, and runtime assets. Treat it as read-only: copy files out of it, never modify it, and replace the entire folder when upgrading.</p>

                <div class="nds-block">
                    <h3 id="download" class="nds-block-title">Download &amp; Extraction</h3>
                    <ol>
                        <li><strong>Download</strong> <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                        <li><strong>Extract</strong> the archive anywhere the agent can access: a sibling directory, a folder inside your repository, or a shared development location.</li>
                        <li><strong>Record</strong> this path. It becomes your <code class="nds-inline-code lang-html">NDS_ROOT</code>.</li>
                    </ol>
                </div>
                <div class="nds-block">
                    <h3 id="structure" class="nds-block-title">Template Structure</h3>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-markdown">
README.md       - Overview and entry-point documentation
_site/          - Compiled documentation site and runtime assets
_source/        - Uncompiled JS/SCSS source and machine-readable catalogs
CHANGELOG.md    - Release history and migration notes
LICENSE         - License terms
                        </code>
                    </div>
                    <p>The <code class="nds-inline-code lang-html">_site/</code> directory serves two roles:</p>
                    <ul>
                        <li><strong>Reference documentation</strong>: component pages at <code class="nds-inline-code lang-html">_site/components/*.html</code> containing the canonical markup the agent copies.</li>
                        <li><strong>Runtime assets</strong>: static CSS, JavaScript, fonts, and icons at <code class="nds-inline-code lang-html">_site/assets/</code> to be copied into your project.</li>
                    </ul>
                </div>

                <h2 id="rules" class="nds-section-title">2. Rules &amp; Instructions</h2>
                <p class="nds-section-description">The agent loads its instruction file at the beginning of every session. Install the NDS instructions once and they apply automatically to every future session.</p>

                <div class="nds-block">
                    <h3 id="instructions-block" class="nds-block-title">Instruction Block</h3>
                    <p>Copy the block below into the agent's instruction file at the project root; create the file if it does not exist, or append the block to the end of an existing one as its own section:</p>
                    <ul>
                        <li><strong>Claude Code</strong>: <code class="nds-inline-code lang-html">CLAUDE.md</code></li>
                        <li><strong>Cursor / Codex</strong>: <code class="nds-inline-code lang-html">AGENTS.md</code></li>
                    </ul>
<!-- ═══════════════════════ COPY START ═══════════════════════ -->
            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy instructions block">
                        <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-markdown">
## Design system: NDS Vanilla

This project uses the National Design System (NDS) for UI. Two paths configure everything below:

- `NDS_ROOT` = `/path/to/nds-vanilla-template/`: the NDS template folder, a read-only reference. Do NOT edit anything under it; copy what you need OUT of it into this project.
- `NDS_ASSETS` = `/path/to/your-project/public/assets/`: the folder INSIDE THIS PROJECT that the NDS runtime assets get copied to. The `public/assets/` here is an example suffix; use the project's real static root (`wwwroot/`, `static/`, …). Never a path under `NDS_ROOT`. It is a filesystem path; the `&lt;link&gt;` and `&lt;script&gt;` tags need the URL that folder is served at. Derive that URL from the stack's static-file convention (`public/assets/` → `/assets/`, `wwwroot/` → `/`) and confirm it with the dev before writing the first tag: a wrong prefix breaks every asset on every page.

If either path still looks like a placeholder (`/path/to/…`), or `NDS_ROOT` does not exist on disk, **stop and ask the dev to set it**. A missing `NDS_ASSETS` folder is not a blocker: create it at the first asset copy.

- **While blocked:** project-side work that needs no NDS path (the Workflow section's step 1 inventory, below) may proceed; nothing NDS-side may. Never write guessed NDS targets into `NDS-PLAN.md`; a blocked path leaves the plan's NDS Target column reading `blocked on NDS_ROOT` until you can read the real catalogs.
- **Never adopt a likely folder yourself.** A plausible candidate (an old extract, a different version, a sibling project) silently wires the whole project to the wrong template or copies assets into the wrong place. Enumerating candidates for the dev to choose from is fine: read each one's `Version:` banner per rule #2. The choice stays the dev's.
- **When the dev supplies or changes a path, update the two declaration lines above in the same session. Not optional.** Chat answers don't survive the session; these two lines are what every future session reads.

### Seven hard rules

1. **Never edit anything under `NDS_ROOT`.** It is a read-only reference. If the dev needs to change NDS itself, flag it and stop; that's a separate conversation.

2. **Never read `*.min.js` or `*.min.css`.** They are opaque. Read the matching file in `NDS_ROOT/_source/` instead. One exception: the `Version:` banner in a bundle's first lines. Read just those lines for the upgrade check.

3. **Copy canonical markup verbatim. Never invent it.** Every component page at `NDS_ROOT/_site/components/&lt;name&gt;.html` has a `lang-html` code block with the exact HTML to copy. Class names, nesting, `data-*` attributes, and ARIA roles all matter; inferring markup from memory breaks the component.
    - "Verbatim" covers structure, classes, `data-*`, and ARIA.
    - Two kinds of value edits are sanctioned, and only these. Asset URLs (`href`/`src` pointing into the template's assets) get rewritten to `NDS_ASSETS` (see "Asset references in copied markup" below).
    - Content swap includes attribute values: link `href`s, `alt` text, and `aria-label`s are content too. Audit them against the target page's language and routes, or dead docs-site links and wrong-language labels ride along silently.
    - Layout-coupled components read wrong in isolation: side info, side menu, a form's stepper, and heroes only work inside their page wrapper chain, which the component doc's standalone block does not show. Copy these from a full page that uses them (a template or example, found via the catalogs), and use the doc page to understand what you copied. Same rule as the document head: real page as the copy source, doc page as the explainer.
    - Inherited markup is under this rule too. The cascade has you copy whole pages, so most `.nds-*` you ship is markup you never chose; treat it exactly like markup you looked up. If you keep a wrapper, you keep its children: lifting a child out (a result count or filter chips out of `.nds-toolbar`) is inventing structure and silently forfeits behavior wired to that nesting. A wrapper's internal arrangement is often flexible; what lives inside it is not.

4. **All page content lives inside sections, laid out with NDS primitives.**
    - Wrap every content block in `&lt;section class="nds-content-section"&gt;`. Its internals come in tiers: minimal (title, description, and `.nds-section-body` as direct children, no wrapper), standard (adds `.nds-section-wrapper` + `.nds-section-head`, the common case), plus action and image variants. Take the tier that fits from `section.html` below; do not default to one.
    - Every section lives inside `.nds-content-layout &gt; .nds-main-content`.
    - Inside a section body, compose with NDS layout primitives: `nds-grid` (responsive columns), `nds-flex` (ad-hoc alignment), `nds-block` (titled sub-groupings). No Bootstrap columns, no custom `display:flex` wrappers.
    - Spacing between stacked elements comes from the primitives too, never from hand-rolled margins. Both carry a `--gap` knob: `nds-flex` defaults it to `--spacing-xl`, `nds-grid` to its own larger ladder; `.nds-section-body` provides no gap of its own, so unwrapped stacked siblings render flush. Tune with `--gap`. Note `.nds-flex` defaults to `align-items: stretch`: a standalone button in a column goes full width, so give it its own `nds-flex` row.
    - Read `NDS_ROOT/_site/layout/section.html` before authoring any page: it defines tiers, action placement, image slots, and full-width breakout options.

5. **Style via knobs and tokens first; reach for `.nds-*` overrides only as a last resort.** Every NDS component exposes CSS custom properties for tuning. Use them in this order:
    - **Component knobs** on individual elements, for per-instance tuning (`--btn-size`, `--section-*`, `--hero-*`, etc.). Set inline (`style="--btn-size: 40px"`) or via your own scoped class. Read `NDS_ROOT/_source/_sass/components/_&lt;name&gt;.scss` to see what knobs each component exposes (search for `var(--` lines).
    - **Design tokens** at `:root`, for whole-system re-theming (change primary color everywhere). Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`. Full set in `NDS_ROOT/_source/_sass/tokens/_semantic.scss`.
    - **`.nds-*` selector overrides**: only when the above genuinely don't cover the need. Keep the override scoped (nested under your own class or `[data-*]`) and document why the knob/token path wasn't enough. Be aware: `.nds-*` class names are internals and may shift between releases, and overrides fight NDS's own state cascade (`data-state`, `:hover`, dark mode, RTL). Bugs from that often surface only on specific states, not on first render.

6. **No legacy libraries: build clean on NDS + vanilla JS.** NDS already covers what they do:
    - Select2 → autocomplete, multiselect
    - Summernote / TinyMCE → editor
    - jTables / DataTables → table + sort + filter + pagination + export
    - Font Awesome → the HGI icon set
    - Bootstrap → the layout primitives in rule #4
    - jQuery → plain vanilla JS (no `$`; see `NDS_ROOT/_source/_js/nds-*.js` for the shape)

    Do not mix them in. Dual class systems fight each other's cascade (`.btn` vs `.nds-btn`), dual JS event models double-fire, and duplicate icon fonts waste bytes and paint slots.

    **Removing a legacy library from a host project is invasive: always get explicit approval from the dev first.** The replacement work touches unrelated pages and often surfaces hidden dependencies.

7. **Replacing an existing UI? Propose a porting strategy and get the dev's approval before file #1.** The naming pattern has to fit their build tooling, routing, and deploy pipeline; getting it wrong on file #1 costs the same rename on every file after it.
    - **Default proposal: parallel files.** For every page or partial you port, a NEW file alongside the original, either an `NDS/` subfolder (uppercase, e.g. `Views/Home/NDS/Index.cshtml` beside the legacy `Views/Home/Index.cshtml`) or a `.nds` filename segment (lowercase, e.g. `home.nds.cshtml`), whichever fits the host project's convention, routed through a new controller action, URL, or feature flag. Name the benefit when proposing it: both UIs serve side by side, and the untouched legacy file stays a working reference for teammates and the instant rollback path.
    - **Score candidate strategies on four things, in order, and show the dev the comparison.** They approve by checking it, not by knowing the stack better than you:
        1. NDS markup lives in markup files. The stack's own page/template format qualifies; what breaks verbatim copying is markup embedded in code string literals.
        2. Fewest edits to existing files: zero is the mark to beat.
        3. Side-by-side serving with cheap rollback.
        4. Page JS co-location.
    - **Poor fit for parallel files? Propose what fits instead.** Editing a legacy file in place happens only under a strategy the dev approved, and deleting one always needs their explicit say-so. When there's no legacy file to sit beside, write pages wherever the stack's own convention puts them.
    - **Co-locate page-scoped JS with its page where the stack allows** (e.g. `Views/Home/NDS/index.js` next to `Views/Home/NDS/Index.cshtml`), so one page's JS never leaks into another's. Some stacks (Rails asset pipeline, ASP.NET `wwwroot/`, Next.js `public/`) enforce a separate JS root: follow the project's convention rather than fighting it. And load page JS after the chrome's script tags: deferred scripts execute in document order, so a page script placed earlier in the document runs before `nds-main.min.js` and will not see `NDS`. This hides well; code that only touches `NDS` inside a `.then()` or an event handler works by accident.

### Workflow

NDS is a UI layer. It does not choose a stack, define routes, or scaffold an app; expect the project to already exist and serve. If it doesn't, say so and stop. That is the dev's design work, not yours.

1. **Inventory first.** List the project's routes, layouts, shared partials, existing pages, and any legacy UI libraries. Map each existing page to a target via the composition cascade below (DGA template / example / custom).
    - Structurally identical pages (the list/create/edit families repeated across entities: services, products, users) get mapped once. Pick one archetype per family and mark each sibling's NDS Target "same as &lt;archetype&gt;". Rows stay separate so status tracking stays per page.
    - Replacing existing UI? Propose a porting strategy for the dev's approval (rule #7) before porting file #1.
    - If this project's instruction file carries rules that conflict with this block (a mandated legacy library, a competing styling system), flag the conflict with the plan; don't silently obey either side.
    - Write the result to `NDS-PLAN.md` as a table (page, route, legacy libraries, NDS target, status), then stop for the dev's review. Build nothing until they approve it.
    - The review raises project-wide decisions only: asset URL prefix, porting strategy, direction/locale, and the build pacing (gate-by-gate approval, or the whole plan in one run). Page-scoped decisions (template variant, section shape, content fit) wait for that page's build session; front-loading them buries the dev on a big project. Note the open question in the page's plan row and ask when you get there.
2. **Copy the assets in** (next section) so pages have a runtime to load.
3. **Build the chrome** (adoption order below) and verify it renders before touching inner content.
4. **Build pages one at a time** via the composition cascade, opening with the page's noted plan-row questions (they were deferred to now). Verify each in the browser before starting the next, in two passes:
    - **Behavioral pass**: load the page; NDS init warnings are `NDS`-prefixed in the console, so component errors are attributable. Then run `NDS.Init.audit()` in the console: it reports the silent failures a clean console misses, unregistered inline icons and filter/pagination containers no component claimed. (Setting `window.NDSInitConfig = { enableLogging: true }` in a script tag before the NDS scripts makes the audit run automatically and adds per-component init logging, useful while a page is under active work.) If the window will not resize for mobile checks, load the page in a same-origin iframe at mobile width; media queries evaluate against the iframe's own viewport.
    - **Visual pass**: a clean console proves nothing about layout; unregistered icons, mis-nested wrappers, and missing gaps all render silently. Look at the page at desktop and mobile width: nothing flush that should be spaced, every icon a glyph rather than a filled box, sticky and width-constrained elements actually behaving, dark mode correct on the page content, and the page reading as one design rather than assembled parts. Measured is not seen: scroll-width probes and presence checks are a useful sweep, but they do not satisfy this pass. A width you only measured is reported as measured, never as visually verified.
    - Never report a page verified from reading its code alone. Cannot see the page? Say so and emit a checklist for the dev instead, naming the page and adding any check it specifically needs:

    [VERIFICATION CHECKLIST FOR DEV]
    - [ ] Check console for `NDS`-prefixed warnings.
    - [ ] Test layout responsiveness at &lt; 768px viewports.
    - [ ] No elements flush against each other that should be spaced.
    - [ ] Every icon renders as a glyph, not a solid box.
    - [ ] Dark mode on the page content, not just the chrome.

5. **Replacing an existing UI? Legacy-library removal is the dev's call, not yours.** Under rule #7's parallel files the legacy pages stay live, and they still need their libraries. Never remove one yourself; at most report when no ported page depends on it anymore, and leave the decision to the dev (rule #6).

`NDS-PLAN.md` at the project root is the project's memory between sessions. No plan file = you are in step 1: plan and write it. Plan exists = read it before starting, update the rows you touch.

- **It tracks UI work, not project scope.** It covers what existed when it was written and gains a row when the dev names a new page. Never re-plan the project on your own.
- **The two paths never live in it.** They are read from this block's declaration lines only; a copy in the plan goes stale on upgrade and contradicts the declaration. The plan records the project-wide decisions with no other home: asset URL prefix, locale/direction, porting strategy, build pacing.
- **Status values are exactly** `Planned`, `In Progress`, `Awaiting Verification`, `Built and Verified`. No others; completion stays machine-checkable across sessions. Built but not browser-verified = `Awaiting Verification` + emit the checklist; only the dev's confirmation makes `Built and Verified`. Update at a full-section, page, or session boundary, not after individual line edits.
- **The plan drives the pacing.** When a step or page completes, propose the next one from the plan and wait for the dev's go. No pasted prompt is needed in a continuing session, and a fresh session needs only "continue the NDS work". Which part comes next is the dev's call.
- **The dev sets the pace, asked once at plan review**: gate-by-gate approval (default), or the whole plan in one run. One run means don't stop at the gates: resolve open questions by the defaults in this block (existing shape, data scale, hero rules), verify each page as you build it, and deliver one report at the end. Rows you verified yourself sit at `Awaiting Verification` until the dev clears that report; their confirmation, not your browser pass, makes `Built and Verified`. Update each row as its page completes, not in one batch at the end: a dropped session then resumes from the last finished page (a row still `In Progress` on resume means a half-built page: rebuild it), and the report covers every row awaiting the dev. Anything decided by default or left unverified goes in the plan and the report, never silently.

### What to copy INTO this project

- **Assets**: copy the contents of `NDS_ROOT/_site/assets/` into `NDS_ASSETS`, whole and as-is, so `NDS_ASSETS/css/`, `NDS_ASSETS/js/`, `NDS_ASSETS/i18n/`, and the rest sit directly under it: every subfolder ships, internal layout unchanged. The lazy-loaded bundles (`nds-delegated.min.js`, `nds-extras.min.js`) and the runtime-fetched i18n JSON files (`i18n/&lt;component&gt;/&lt;lang&gt;.json`, used by the accessibility panel and bilingual components) must be reachable at the same relative paths the main script assumes.
- **Never copy `NDS_ROOT/_site/docs-assets/`.** It holds what only the documentation site loads: the showcase demo layer, the event theme skins, and the sample JSON the doc demos fetch. `assets/` is the runtime; `docs-assets/` is the showroom. A `/docs-assets/…` path in markup you copied is demo content, not a component dependency: point it at your own data or image and move on. (The one case for reaching in: you actually want an event skin, in which case copy that single `docs-assets/events/&lt;event&gt;/` folder and load its one script tag.)
- **Include on every page**: the document head, copied as a unit from a real page (`NDS_ROOT/_site/index.html`) with its asset references pointed at your `NDS_ASSETS` URLs. It sequences the stylesheets, preloads, theme guard, and deferred icon loader; `NDS_ROOT/_site/ui-shell/head.html` documents every file in it and when it loads, so read it before changing anything. Do not reduce the set or reorder it. Never hand-add `nds-delegated.min.js` or `nds-extras.min.js`: the main script's loader injects those on demand. The favicon it references is a placeholder that ships in `assets/` so the copied head renders; replace the file with the project's own icon.
- **Asset references in copied markup**: every page or partial copied out of `NDS_ROOT` references assets relative to its own location inside the template folder. A straight copy ships broken references: rewrite them to your `NDS_ASSETS` URLs as you go.

### Adoption order: chrome first, inner components second

Build the outer page skeleton before any inner content:

1. **Document head**: copy verbatim from `NDS_ROOT/_site/index.html`, then rewrite its asset references to `NDS_ASSETS` URLs; `NDS_ROOT/_site/ui-shell/head.html` explains each entry. Load-bearing: preloads, FOUC guards, main script tag, icon-load gate.
2. **Master layout**: `&lt;html&gt;`/`&lt;body&gt;` skeleton with `&lt;header&gt;`, `&lt;main&gt;`, `&lt;footer&gt;` slots. Inside `&lt;main&gt;`, wrap page content in `&lt;div class="nds-content-layout"&gt;&lt;div class="nds-main-content"&gt;…&lt;/div&gt;&lt;/div&gt;`. Set `&lt;html dir&gt;` and `lang` from the project's locale logic: a multilingual project keeps its existing locale mechanism and stamps the two attributes per rendered page; don't force a single-language choice on it. NDS derives everything live from those two attributes (`NDS.lang`, `NDS.isRTL`), region subtags like `en-US`/`ar-SA` normalize to the base language, and any non-Arabic locale falls back to English for built-in component labels.
3. **Topbar + main navigation**: `NDS_ROOT/_site/ui-shell/topbar.html` + the mainnav section of `NDS_ROOT/_site/ui-shell/header.html`. The brand slot defaults to the project's logo image only: swap the real logo onto `.nds-brand-logo` and remove the `nds-brand-name` text span, since most production logos already carry the wordmark. Keep the text span only when the logo is a bare mark with no name in it.
4. **Footer**: `NDS_ROOT/_site/ui-shell/footer.html`.
5. **Accessibility panel + cookie popup**: copy from `NDS_ROOT/_site/index.html`.
6. **Sub-hero / page hero**: `NDS_ROOT/_site/ui-shell/hero.html`, when the page carries one.
7. **Only then** start on inner components.

Why: `&lt;html dir&gt;` and body class shape how every component paints (RTL/LTR + dark). Dropmenus, modals, and drawers portal to `&lt;body&gt;` and expect chrome class chains present. Pasting a component into a page with a broken shell means every rendering bug is ambiguously "component or chrome?", impossible to attribute cleanly.

### Composition cascade: for any page

Inside `.nds-content-layout &gt; .nds-main-content` every NDS page is composed the same way: sections built from the primitives in rule #4. What varies is the wrapper around it: modifier classes (side-info vs side-menu layout, hero variant) and how much chrome the page carries. Most pages take the full chrome from the adoption order; standalone pages carry none (`NDS_ROOT/_site/examples/registration.html` has no topbar, header, or footer).

Admin consoles, back-office, and internal tools run edge-to-edge from one class: `nds-full-width` on `&lt;body&gt;` widens the chrome and the content layout together, no per-layout modifier. They also move the hero INSIDE `.nds-main-content` so it sits beside the side menu instead of spanning above it; see `NDS_ROOT/_site/examples/console-demo.html`.

So choosing a starting page is about matching content structure, not markup: adjust modifiers and swap content rather than rebuilding. **The porting principle: content, flow, and data structure follow the legacy app; NDS improves the UI/UX.** What NDS adds is interaction and presentation quality: sorting, filtering, export, result counts, validation chrome, responsive behavior. These are defaults to apply, not questions to ask the dev:

- A legacy page with no hero still gets `nds-sub`, the standard title area on every content page. `nds-flat` joins it on heavy-text article and post pages where a gradient would compete with reading. The main hero slider stays reserved for home and hub pages.
- When the closest template or example presents the content differently than the legacy page (cards where the legacy page is a table), the existing shape wins: take the example's structure and wiring, keep the legacy presentation.
- Forms are the one exception to shape-following: default to TWO steps, the form itself and a review step before submit (the DGA service-form pattern), even when the legacy form was single-step. Add more steps only where the legacy flow already has them; never ship the template's full step count for content that doesn't exist.
- The principle cuts both ways. Never fabricate content or data to fill a template's empty sections, and never strip legitimate UI quality (result counts, placeholders, notices, confirmation feedback) in the name of parity: shape follows the legacy, quality comes from NDS.

Prefer official over custom, in this order:

1. **Match a DGA page template?** Use it as-is. `NDS_ROOT/_source/_data/content/templates.yml` catalogs DGA-official full-page templates (Service, Form, Contact, Content, Help &amp; Support, About Entity, FAQ, e-Participation, and more, every entry tagged `DGA`). Copy the whole page from `NDS_ROOT/_site/templates/&lt;name&gt;.html`, swap only the placeholder content. Never re-compose your own version: the templates encode structural decisions (side-info placement, breadcrumb slots, hero variant, tab layout) a hand-composed page will get subtly wrong. This applies especially when the template is bigger than the page you need: trimming sections or steps is still swapping content; rebuilding the skeleton around kept fields is not.
2. **No DGA match?** Check `NDS_ROOT/_source/_data/content/examples.yml` + `NDS_ROOT/_site/examples/*.html` for a closest-fit composition: dashboards, service listings, editorial hubs, patterns DGA doesn't cover.
3. **Nothing matches?** Scaffold custom, but stay inside rule #4's structure. Study the DGA templates and examples for wiring patterns to reuse: how side-info wires to breadcrumbs, how forms space grouped fields, how `nds-block` sub-groups compose. Recognizable NDS structure beats invented structure.

One tier outranks all three once it exists: a page family's own built-and-verified archetype. When the first list page ships, its siblings copy that page and swap entity content; re-deriving each sibling from the cascade invites drift between pages that must stay identical.

For individual components, always check `NDS_ROOT/_source/_data/content/components.yml` first: ~90 components ship. Use a close variant even when its name doesn't obviously match what the dev asked for.

### Replacing a legacy library: the method

Rule #6 names common libraries, but the method works for any:

1. **Name the capability, not the library**: "async searchable select", "rich text editor", "sortable table fed by server data".
2. **Search `NDS_ROOT/_source/_data/content/components.yml` for that capability** (titles, descriptions, tags). A close variant almost always exists even when no name matches.
3. **No single-component match? It's likely a composition.** A data-grid plugin maps to table + filter + pagination + export working together. Check `examples.yml` and `NDS_ROOT/_site/examples/` for a composed pattern before concluding NDS lacks it.
4. **Port options and callbacks through NDS events and methods** (JS integration below); never wrap NDS to emulate the old library's API shape.
5. **Truly no NDS coverage?** Build it vanilla inside rule #4's structure with rule #5's styling order; don't pull the legacy library back in for one widget.

### JS integration: go through the API, not around it

Many NDS components ship rich programmatic APIs and DOM events. **Wire your code THROUGH them, not around them.** Consumers who hand-write listeners on `.nds-*` elements or mutate their state directly reimplement (badly) what NDS already ships, and drift on every upgrade.

**Rule:** before adding any `addEventListener` on a `.nds-*` element, or mutating any `data-state="…"` on a NDS component, grep the component's source in `NDS_ROOT/_source/_js/nds-&lt;name&gt;.js` for:
- `NDS.&lt;Name&gt; = {`: the public surface (methods to call).
- `dispatchEvent(new CustomEvent('nds:`: the events to listen for.

There's almost certainly a documented method or event to hook into instead.

**Concrete examples that make the rule real:**

- **AJAX filter →** listen for `nds:filter:change` on the filter's representative element; fire your fetch off `event.detail.criteria` (not off individual form inputs; they race with async-populated `&lt;select&gt;`s). The criteria are nested: named filters live under `criteria.filters`, the search string under `criteria.search`; reading `criteria.&lt;name&gt;` at the top level silently yields `undefined`. Use `NDS.Filter.whenReady(container, cb)` to bind safely, because the filter can initialize before your listener attaches.
- **Promise-grammar containers →** declare `data-filter-items` only where a live filter exists on the page: the pre-init skeleton holds such a container as grey placeholders until a filter instance initializes it, with no console warning. `.nds-paged-content` and the `data-paged-*` count slots are the same kind of promise, owed to a pagination nav. Reducing a paged archetype to a list with no pagination means swapping grammars: plain container, count via `data-filter-count`.
- **Server-driven pagination →** don't rebuild the nav after each AJAX response. Call `NDS.Pagination.updateRecords(listId, { from, to, count })`, the same slot grammar auto-mode uses. The nav re-renders itself.
- **Programmatic form-field writes →** setting `input.value = …` from JS does NOT fire `input`/`change`, so the clear button, validation chrome, and radio-group paint go stale. Call `NDS.Forms.syncState(input)` after any programmatic write. Never call `form.reset()`: nothing in NDS listens for the native reset event, so clear per field and `syncState` each. And after swapping a whole form region's HTML, call `NDS.Forms.initializeContainer(el)` or the new inputs stay inert.
- **Forms: NDS owns `submit` on every `.nds-form` →** `NDS.Forms.initForm` attaches its own submit listener, validates, then dispatches `nds:formValid` or `nds:formInvalid`. Never add your own `submit` listener; it races NDS's and yours runs first. Gate a custom control (a stepper's Next button) with `NDS.Forms.validateForm(form)`, which returns `{ valid, errors }` synchronously; hook post-submit work to `nds:formValid`; add `data-ajax` to the form and NDS calls `preventDefault()` for you.
- **Fetches →** use `NDS.request(url, { json: true })` over raw `fetch`: a wrapper with a 15s default timeout, a response-size cap, and errors carrying `.status`, `.url`, and a capped `.body`. Documented at `NDS_ROOT/_site/utilities/request.html`.
- **Bilingual JS →** read `NDS.isRTL` and `NDS.lang`; don't parse `&lt;html dir&gt;` yourself. Media queries: `NDS.breakpoints.desktop` / `.mobile` are the exact strings NDS uses. For string tables, `NDS.i18n.load('componentName', scope)` + `data-i18n="key"` works for your own bilingual widgets too.

**Client- or server-driven data? Judge by scale, then by growth.** Under ~500 rows, client-side wins: fetch the set once and let table, filter, sort, and export work the full data, more capability with zero backend work. Above that, or when the dataset is small today but expected to grow, go server-driven (`NDS.Pagination.updateRecords` and re-fetching sort/filter). When the better choice needs a backend change (a clean list endpoint, a sort parameter, a count field), propose it to the dev and make it with their approval; don't contort the page to avoid touching the server.

**Reinitialization** (after any dynamic DOM change that adds NDS markup): call `NDS.&lt;Component&gt;.reinit()`. It rescans the page for that component and skips anything already initialized, so it is safe to call repeatedly; this is the one to reach for. `NDS.&lt;Component&gt;.create(el)` builds a single instance from a specific element and constructs unconditionally, with no such guard: run it on an already-initialized element and you bind a second set of listeners (a double-constructed accordion closes again on the first click). Use it only for an element you know is fresh. Not every namespace ships `reinit()`: `NDS.Tables.reinit()` is what rebuilds sorting (Sort has none of its own), and forms use `initializeContainer`. A `typeof` check cannot detect absence, because a lazily loaded namespace is a Proxy stub that returns a function for any key; grep the component's source in `NDS_ROOT/_source/_js/` for its real surface.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. Clear those keys from DevTools when debugging a stale render (bad date, wrong theme).

### Upgrading NDS: after the dev swaps the template folder

1. **Compare versions**: read the `Version:` banner (first lines only) of `NDS_ROOT/_site/assets/js/nds-main.min.js` and `NDS_ASSETS/js/nds-main.min.js`. If they differ, the project runtime is stale.
2. **Replace the runtime**: copy the new `NDS_ROOT/_site/assets/` over `NDS_ASSETS`, overwriting NDS files in place. Leave files the project added under `NDS_ASSETS` untouched; get dev approval before deleting anything.
3. **Sweep your pages**: read the `### Migrating from` sections in `NDS_ROOT/CHANGELOG.md` covering every version between the two banners, and update every page built from NDS markup for the breaking changes they list. Report every change you make.

### Reference index: where to look inside `NDS_ROOT`

- `_site/components/*.html`: one doc page per component. Canonical `lang-html` markup + `data-*` tables + ARIA notes. **Single source of truth for how to write a component.**
- `_site/ui-shell/*.html`: chrome docs. `head.html`, `header.html`, `topbar.html`, `footer.html`, `hero.html`, `sidemenu.html`, `sideinfo.html`.
- `_site/layout/*.html`: layout primitive docs. `section.html`, `grid.html`, `flex.html`, `block.html`.
- `_site/templates/*.html` + `_site/examples/*.html`: full-page templates + composed real-world pages.
- `_source/_data/content/*.yml`: machine-readable catalogs. `components.yml`, `templates.yml`, `examples.yml`, `icons.yml`.
- `_source/_js/nds-&lt;name&gt;.js`: readable component behavior source (behind the minified bundles).
- `_source/_sass/components/_&lt;name&gt;.scss`: readable component styling source.
- `_source/_sass/tokens/`: three of the four design-token tiers, one file each (primitives, semantic, components); the fourth tier, the palette, lives in `_source/_sass/themes/_dga.scss`. Dark rebinds sit at the bottom of each tier file, under `:root[data-theme~="dark"]`.
- `_source/_sass/_mixins.scss`: shared mixins.

### Facts the docs assume

- **RTL is the default.** `&lt;html dir="rtl" lang="ar"&gt;` for Arabic, `&lt;html dir="ltr" lang="en"&gt;` for LTR. Styles use CSS logical properties: direction flips from that single attribute, no separate stylesheet.
- **Dark mode** flips via `data-theme~="dark"` on `&lt;html&gt;`. No rebuild.
- **Two icon systems, not interchangeable.** `.nds-icon.nds-hgi-&lt;name&gt;` is the registered inline set the default chrome uses: masks that paint before any font loads, so UI icons never flash. The set is small by design; a name outside `NDS_ROOT/_source/_data/content/icons.yml` paints as a solid box, silently. For any glyph beyond it, search the full HGI library and use the font class instead: `&lt;i class="hgi hgi-stroke hgi-&lt;name&gt;"&gt;`, already loaded by the head unit. Before calling any page done, extract every `nds-hgi-*` token it ships, from page JS as well as HTML, and check each against `icons.yml`: the console never warns about an unregistered glyph.

### Design tokens (in `NDS_ROOT/_source/_sass/`)

Four tiers. Tiers 2–4 live in `tokens/`, one file each, with the light block at the top and the `:root[data-theme~="dark"]` block at the bottom of the same file.

1. **Palette** (`themes/_dga.scss`, vendored, do not modify): raw color ramps, no meaning. Its dark ramps are generated at runtime by `themes/_register.scss`, not held in the file itself.
2. **Primitives** (`tokens/_primitives.scss`): dimension vocabulary (`--spacing-md`, `--radius-sm`, typography rungs).
3. **Semantic** (`tokens/_semantic.scss`): one name per meaning (`--background-primary`, `--text-oncolor-primary`). Rule #5 rebinds these at `:root` for whole-system theming.
4. **Component** (`tokens/_components.scss`): per-component dials, `--{component}-{property}-{variant}-{state}`.
                    </code>
                </div>
            </div>
<!-- ═══════════════════════ COPY END ═══════════════════════ -->
                </div>
                <div class="nds-block">
                    <h3 id="paths" class="nds-block-title">Path Configuration</h3>
                    <p>Set the two paths on the declaration lines at the top of the instruction block you just copied into the agent's file. <strong>Edit those two lines only</strong>; the <code class="nds-inline-code lang-html">/path/to/…</code> appearing further down the block is part of the agent's own instructions and stays as-is. Windows paths work with forward slashes (<code class="nds-inline-code lang-html">C:/projects/…</code>):</p>
                    <table class="nds-table nds-responsive">
                        <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory from step 1.</td></tr>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where your application serves static assets (e.g. <code class="nds-inline-code lang-html">public/assets/</code>, <code class="nds-inline-code lang-html">wwwroot/</code>). If it does not exist, the agent creates it during the first asset copy.</td></tr>
                        </tbody>
                    </table>
                    <p>Save the file. Future sessions load it automatically at start; the current session already has the block in context from pasting it.</p>
                </div>
                <h2 id="sessions" class="nds-section-title">3. Build Flow</h2>
                <p class="nds-section-description">AI sessions do not share memory: the planning prompt creates <code class="nds-inline-code lang-html">NDS-PLAN.md</code> at the project root, and every session after reads and updates it before changing anything. The plan, not a schedule of sessions, drives the work.</p>

                <div class="nds-block">
                    <h3 id="planning" class="nds-block-title">Start: the Planning Prompt</h3>
                    <ul>
                        <li><strong>Prerequisite</strong>: your application must already exist and render at least one page. NDS provides the UI layer; it does not scaffold an application.</li>
                        <li><strong>Claude Code tip</strong>: this prompt runs well in <strong>plan mode</strong>. The agent inventories read-only, surfaces the project-wide decisions as structured questions, and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> only after you approve (a harmless reorder of the workflow's write-then-review: same gate, the file just lands post-approval).</li>
                    </ul>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Inventory this project: identify routes, layout components, shared partials, existing pages, and current UI libraries. Map every existing page to an NDS target using the composition cascade (DGA template, example, or custom). If replacing an existing UI, propose a porting strategy appropriate for this stack (rule #7).

Output the results into NDS-PLAN.md at the project root as a markdown table with the columns: Page, Route, Legacy Libraries, NDS Target, Status.

Then stop for my review. Build nothing until I approve the plan. Raise only project-wide decisions with the plan (asset URL prefix, porting strategy, direction/locale, build pacing); note page-scoped questions in the page's row instead, to be asked when that page is built.
                        </code>
                    </div>
                    <p>Review the plan before continuing: the agent will not build anything until you approve it.</p>
                </div>
                <div class="nds-block">
                    <h3 id="agent-drives" class="nds-block-title">After Approval: the Agent Drives</h3>
                    <p>No more prompts to paste. The plan is the itinerary and your replies are the throttle: the agent proposes, you approve, correct, or redirect. Pacing is one of the decisions raised at plan review, with two options:</p>
                    <ul>
                        <li><strong>Gate by gate (default)</strong>: when a step completes, the agent proposes the next one from the plan's build order: assets, then chrome, then pages one at a time. A page gate runs a fixed loop: open with the page-scoped questions parked in that page's plan row, build, verify in the browser, update the row's status, stop for your go.</li>
                        <li><strong>One continuous run</strong>: the agent answers its own questions from the guide's defaults (existing shape, data scale, hero rules), verifies each page as it builds, and delivers a single report at the end. Every decision made by default and every check it could not run is listed there, not buried.</li>
                    </ul>
                    <p><strong>Whichever pace, hold it to these:</strong></p>
                    <ul>
                        <li>The chrome renders and verifies before any page is built: NDS styling in place, icons visible, no unstyled flash on load, and a console clean of errors and <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                        <li>Every page is verified in the browser before the next one starts. A page the agent could not verify is handed to you as a checklist, never claimed.</li>
                        <li>Row statuses move only through the four exact values, and only your confirmation makes a row <code class="nds-inline-code lang-html">Built and Verified</code>.</li>
                    </ul>
                </div>
                <div class="nds-block">
                    <h3 id="resuming" class="nds-block-title">Resuming in a Fresh Session</h3>
                    <p>A new session has no chat memory and needs one line; the plan's statuses tell it where things stand:</p>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Continue the NDS work: read NDS-PLAN.md and propose the next step.
                        </code>
                    </div>
                    <p>Implementation is complete when every entry in <code class="nds-inline-code lang-html">NDS-PLAN.md</code> is marked <code class="nds-inline-code lang-html">Built and Verified</code>. Rows left at <code class="nds-inline-code lang-html">Awaiting Verification</code> are yours to clear: either the agent had no browser and emitted a checklist, or it verified the page itself during a one-continuous run and your review of its report is the missing confirmation.</p>
                </div>
                <div class="nds-block">
                    <h3 id="legacy-cleanup" class="nds-block-title">Retiring Legacy Libraries</h3>
                    <p>If you replaced an existing UI via parallel files, the legacy pages remain live and still need their libraries. Removing a legacy library is invasive and is your decision, not the agent's. The agent reports when no ported page depends on a library anymore, and you approve its removal (rules #6 and #7).</p>
                </div>

                <h2 id="upgrade" class="nds-section-title">4. Upgrades &amp; Maintenance</h2>
                <p class="nds-section-description">When a new version of NDS is published, replace the template folder and let the agent apply the migration.</p>

                <ol>
                    <li>Download and extract the latest release, replacing your existing <code class="nds-inline-code lang-html">NDS_ROOT</code> folder (as in section 1).</li>
                    <li>If the directory path changed due to versioning, update <code class="nds-inline-code lang-html">NDS_ROOT</code> in your instruction file (<code class="nds-inline-code lang-html">CLAUDE.md</code> / <code class="nds-inline-code lang-html">AGENTS.md</code>), or just tell the agent the new path; the instructions require it to update the declaration lines itself.</li>
                    <li>Run the upgrade prompt below.</li>
                </ol>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
The NDS template folder has been replaced with a new release. Run the upgrade workflow from the NDS instructions: compare the two version banners, replace the runtime under NDS_ASSETS, read the Migrating sections in NDS_ROOT/CHANGELOG.md between the two versions, and sweep the NDS pages for the breaking changes they list. Report every change you make.
                        </code>
                    </div>

            </article>
        </div>
    </div>
</section>
