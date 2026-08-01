---
layout: page
title: AI Integration
lang: en
direction: ltr
hero_title: Integrate NDS with Your AI Coding Agent
hero_description: "NDS markup is designed to be copied, not written from scratch. Point your local AI agent at the NDS template and install the NDS instructions once — every session after that follows the same automated workflow."
breadcrumb: ["Guides"]
layout_class: nds-wSideInfo
sidemenu_mode: false
---

<section id="aiIntegrationGuide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-md nds-sticky nds-top" aria-label="On this page">
            <nav class="nds-toc" aria-label="Table of contents"
                data-toc-source="#aiIntegrationGuide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                    <span class="nds-label">On this page</span>
                    <h2 class="nds-toc-title nds-truncate">Setup Steps</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>
        <div class="nds-info-content">
            <article>

                <h2 id="overview" class="nds-section-title">Overview</h2>
                <p class="nds-section-description">Configuring an AI coding agent to build applications with NDS.</p>

                <p>NDS integrates with AI coding agents through two permanent inputs:</p>
                <ol>
                    <li><strong>The NDS template</strong> &mdash; stored locally as a read-only reference the agent copies from.</li>
                    <li><strong>The NDS instructions</strong> &mdash; installed once in your agent's instruction file.</li>
                </ol>
                <p>Both are configured a single time. After that, development proceeds session by session, with progress tracked in an <code class="nds-inline-code lang-html">NDS-PLAN.md</code> file at the project root &mdash; so sessions can continue where the last one stopped without relying on conversation history.</p>

                <h2 id="template" class="nds-section-title">1. The Template</h2>
                <p class="nds-section-description">The authoritative source for components, markup, design tokens, and runtime assets. Treat it as read-only: copy files out of it, never modify it, and replace the entire folder when upgrading.</p>

                <div class="nds-block">
                    <h3 id="download" class="nds-block-title">Download &amp; Extraction</h3>
                    <ol>
                        <li>Download <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                        <li>Extract the archive anywhere your agent can access &mdash; a sibling directory, a folder inside your repository, or a shared development location.</li>
                        <li>Record this path. It becomes your <code class="nds-inline-code lang-html">NDS_ROOT</code>.</li>
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
                        </code>
                    </div>
                    <p>The <code class="nds-inline-code lang-html">_site/</code> directory serves two roles:</p>
                    <ul>
                        <li><strong>Reference documentation</strong> &mdash; component pages at <code class="nds-inline-code lang-html">_site/components/*.html</code> containing the canonical markup the agent copies.</li>
                        <li><strong>Runtime assets</strong> &mdash; static CSS, JavaScript, fonts, and icons at <code class="nds-inline-code lang-html">_site/assets/</code> to be copied into your project.</li>
                    </ul>
                </div>

                <h2 id="rules" class="nds-section-title">2. Rules &amp; Instructions</h2>
                <p class="nds-section-description">Your agent loads its instruction file at the beginning of every session. Install the NDS instructions once and they apply automatically to every future session.</p>

                <p><strong>Prerequisite:</strong> this workflow requires a local CLI or IDE agent with filesystem access, such as Claude Code, Cursor, Codex, or Aider. Browser-based assistants (claude.ai, ChatGPT Web) cannot read local template directories or write to your project.</p>

                <div class="nds-block">
                    <h3 id="instructions-block" class="nds-block-title">Instruction Block</h3>
                    <p>Copy the block below into your agent's instruction file at the project root &mdash; create the file if it does not exist:</p>
                    <ul>
                        <li><strong>Claude Code</strong> &mdash; <code class="nds-inline-code lang-html">CLAUDE.md</code></li>
                        <li><strong>Cursor / Codex / Aider</strong> &mdash; <code class="nds-inline-code lang-html">AGENTS.md</code></li>
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
## Design system — NDS Vanilla

This project uses the National Design System (NDS) for UI. Two paths configure everything below:

- `NDS_ROOT` = `/path/to/nds-vanilla-template/` — the NDS template folder, a read-only reference. Do NOT edit anything under it; copy what you need OUT of it into this project.
- `NDS_ASSETS` = `/path/to/your-project/public/assets/` — the folder INSIDE THIS PROJECT that the NDS runtime assets get copied to. Never a path under `NDS_ROOT`. It is a filesystem path; the `&lt;link&gt;` and `&lt;script&gt;` tags need the URL that folder is served at. Derive that URL from the stack's static-file convention (`public/assets/` → `/assets/`, `wwwroot/` → `/`) and confirm it with the dev before writing the first tag — a wrong prefix breaks every asset on every page.

If either path still looks like a placeholder (`/path/to/…`) or does not exist on disk, **stop and ask the dev to set it** before doing anything else.

### Seven hard rules

1. **Never edit anything under `NDS_ROOT`.** It is a read-only reference. If the dev needs to change NDS itself, flag it and stop — that's a separate conversation.

2. **Never read `*.min.js` or `*.min.css`.** They are opaque. Read the matching file in `NDS_ROOT/_source/` instead. One exception: the `Version:` banner in a bundle's first lines — read just those lines for the upgrade check.

3. **Copy canonical markup verbatim — never invent it.** Every component page at `NDS_ROOT/_site/components/&lt;name&gt;.html` has a `lang-html` code block with the exact HTML to copy. Class names, nesting, `data-*` attributes, and ARIA roles all matter — inferring markup from memory breaks the component. "Verbatim" covers structure, classes, `data-*`, and ARIA; asset URLs (`href`/`src`) are the one deliberate exception — rewrite those to `NDS_ASSETS` (see "Asset references in copied markup" below).

4. **All page content lives inside sections, laid out with NDS primitives.**
    - Wrap every content block in `&lt;section class="nds-content-section"&gt;`. Its internals come in tiers — minimal (title, description, and `.nds-section-body` as direct children, no wrapper), standard (adds `.nds-section-wrapper` + `.nds-section-head`, the common case), plus action and image variants. Take the tier that fits from `section.html` below; do not default to one.
    - Every section lives inside `.nds-content-layout &gt; .nds-main-content`.
    - Inside a section body, compose with NDS layout primitives — `nds-grid` (responsive columns), `nds-flex` (ad-hoc alignment), `nds-block` (titled sub-groupings). No Bootstrap columns, no custom `display:flex` wrappers.
    - Read `NDS_ROOT/_site/layout/section.html` before authoring any page — it defines tiers, action placement, image slots, and full-width breakout options.

5. **Style via knobs and tokens first — reach for `.nds-*` overrides only as a last resort.** Every NDS component exposes CSS custom properties for tuning. Use them in this order:
    - **Component knobs** on individual elements — for per-instance tuning (`--btn-size`, `--section-*`, `--hero-*`, etc.). Set inline (`style="--btn-size: 40px"`) or via your own scoped class. Read `NDS_ROOT/_source/_sass/components/_&lt;name&gt;.scss` to see what knobs each component exposes (search for `var(--` lines).
    - **Design tokens** at `:root` — for whole-system re-theming (change primary color everywhere). Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`. Full set in `NDS_ROOT/_source/_sass/tokens/_semantic.scss`.
    - **`.nds-*` selector overrides** — only when the above genuinely don't cover the need. Keep the override scoped (nested under your own class or `[data-*]`) and document why the knob/token path wasn't enough. Be aware: `.nds-*` class names are internals and may shift between releases, and overrides fight NDS's own state cascade (`data-state`, `:hover`, dark mode, RTL). Bugs from that often surface only on specific states, not on first render.

6. **No legacy libraries — build clean on NDS + vanilla JS.** NDS already covers what they do:
    - Select2 → autocomplete, multiselect
    - Summernote / TinyMCE → editor
    - jTables / DataTables → table + sort + filter + pagination + export
    - Font Awesome → the HGI icon set
    - Bootstrap → the layout primitives in rule #4
    - jQuery → plain vanilla JS (no `$`; see `NDS_ROOT/_source/_js/nds-*.js` for the shape)

    Do not mix them in. Dual class systems fight each other's cascade (`.btn` vs `.nds-btn`), dual JS event models double-fire, and duplicate icon fonts waste bytes and paint slots.

    **Removing a legacy library from a host project is invasive — always get explicit approval from the dev first.** The replacement work touches unrelated pages and often surfaces hidden dependencies.

7. **Port to parallel files — never edit legacy files in place, never delete them.** Applies only where you're replacing an existing UI; with nothing to port beside, write pages wherever the stack's own convention puts them. For every page or partial you port, create a NEW file alongside the original: either an `NDS/` subfolder (uppercase, e.g. `Views/Home/NDS/Index.cshtml` beside the legacy `Views/Home/Index.cshtml`) or a `.nds` filename segment (lowercase, e.g. `home.nds.cshtml`), whichever fits the host project's convention. Route the NDS version through a new controller action, URL, or feature flag so both can be served side by side.
    - **Leave the legacy file untouched.** It stays the reference for teammates during migration, and the rollback path if something regresses.
    - **Agree the layout with the dev before porting file #1.** The naming pattern has to fit their build tooling, routing, and deploy pipeline, and getting it wrong on file #1 costs the same rename on every file after it.
    - **Co-locate page-scoped JS with its page where the stack allows** (e.g. `Views/Home/NDS/index.js` next to `Views/Home/NDS/Index.cshtml`), so one page's JS never leaks into another's. Some stacks (Rails asset pipeline, ASP.NET `wwwroot/`, Next.js `public/`) enforce a separate JS root — follow the project's convention rather than fighting it.

### Workflow

NDS is a UI layer. It does not choose a stack, define routes, or scaffold an app — expect the project to already exist and serve. If it doesn't, say so and stop; that is the dev's design work, not yours.

1. **Inventory first.** List the project's routes, layouts, shared partials, existing pages, and any legacy UI libraries. Map each existing page to a target via the composition cascade below (DGA template / example / custom). If there is existing UI to replace, agree the parallel-file layout with the dev (rule #7) before porting file #1. Write the result to `NDS-PLAN.md` as a table — page, route, legacy libraries, NDS target, status — then stop for the dev's review. Build nothing until they approve it.
2. **Copy the assets in** (next section) so pages have a runtime to load.
3. **Build the chrome** (adoption order below) and verify it renders before touching inner content.
4. **Build pages one at a time** via the composition cascade. Verify each in the browser before starting the next — NDS init warnings are `NDS`-prefixed in the console, so component errors are attributable. Never report a page verified on inspection alone. No browser available to you? Emit a checklist for the dev instead, naming the page and adding any check it specifically needs (RTL/LTR, dark mode, a component's interactive state):

    [VERIFICATION CHECKLIST FOR DEV]
    - [ ] Check console for `NDS`-prefixed warnings.
    - [ ] Test layout responsiveness at &lt; 768px viewports.
    
5. **Replacing an existing UI? Legacy-library removal is the dev's call, not yours.** Rule #7's parallel files keep the legacy pages live, and they still need their libraries. Never remove one yourself; at most report when no ported page depends on it anymore, and leave the decision to the dev (rule #6).

`NDS-PLAN.md` at the project root is the project's memory between sessions. It tracks UI work, not project scope: it covers what existed when it was written, and gains a row when the dev names a new page. Never re-plan the project on your own. If it doesn't exist, you are in step 1: plan and write it. If it does, read it before you start and update the rows you touch. Status values are exactly `Planned`, `In Progress`, `Awaiting Verification`, `Built and Verified` — use no others, so completion is machine-checkable across sessions. If you built a page but could not verify it in a browser (step 4), write `Awaiting Verification` and emit the checklist; only the dev's confirmation moves a row to `Built and Verified`. Update status only upon completing a full section, page, or session boundary — not after individual line edits. Which part to work on next is the dev's call — follow the plan's order or take whatever they name.

### What to copy INTO this project

- **Assets** — copy the full `NDS_ROOT/_site/assets/` folder to `NDS_ASSETS`, preserving the internal `css/`, `js/`, `fonts/`, `icon/`, `img/`, `i18n/`, `data/` layout. The lazy-loaded bundles (`nds-delegated.min.js`, `nds-extras.min.js`) and the runtime-fetched i18n JSON files (`i18n/&lt;component&gt;/&lt;lang&gt;.json`, used by the accessibility panel and bilingual components) must be reachable at the same relative paths the main script assumes.
- **Include on every page** — the document head from `NDS_ROOT/_site/ui-shell/head.html`, copied as a unit with its asset references pointed at your `NDS_ASSETS` URLs. It sequences the stylesheets, preloads, theme guard, and deferred icon loader, and that page documents every file and when it loads. Do not reduce the set or reorder it. Never hand-add `nds-delegated.min.js` or `nds-extras.min.js` — the main script's loader injects those on demand.
- **Asset references in copied markup** — every page or partial copied out of `NDS_ROOT` references assets relative to its own location inside the template folder. A straight copy ships broken references: rewrite them to your `NDS_ASSETS` URLs as you go.

### Adoption order — chrome first, inner components second

Build the outer page skeleton before any inner content:

1. **Document head** — copy verbatim from `NDS_ROOT/_site/index.html` (or read `NDS_ROOT/_site/ui-shell/head.html`), then rewrite its asset references to `NDS_ASSETS` URLs. Load-bearing: preloads, FOUC guards, main script tag, icon-load gate.
2. **Master layout** — `&lt;html&gt;`/`&lt;body&gt;` skeleton with `&lt;header&gt;`, `&lt;main&gt;`, `&lt;footer&gt;` slots. Inside `&lt;main&gt;`, wrap page content in `&lt;div class="nds-content-layout"&gt;&lt;div class="nds-main-content"&gt;…&lt;/div&gt;&lt;/div&gt;`. Set `&lt;html dir&gt;` and `lang` from your project's locale.
3. **Topbar + main navigation** — `NDS_ROOT/_site/ui-shell/topbar.html` + the mainnav section of `NDS_ROOT/_site/ui-shell/header.html`.
4. **Footer** — `NDS_ROOT/_site/ui-shell/footer.html`.
5. **Accessibility panel + cookie popup** — copy from `NDS_ROOT/_site/index.html`.
6. **Sub-hero / page hero** — `NDS_ROOT/_site/ui-shell/hero.html`, when the page carries one.
7. **Only then** start on inner components.

Why: `&lt;html dir&gt;` and body class shape how every component paints (RTL/LTR + dark). Dropmenus, modals, and drawers portal to `&lt;body&gt;` and expect chrome class chains present. Pasting a component into a page with a broken shell means every rendering bug is ambiguously "component or chrome?" — impossible to attribute cleanly.

### Composition cascade — for any page

Inside `.nds-content-layout &gt; .nds-main-content` every NDS page is composed the same way — sections built from the primitives in rule #4. What varies is the wrapper around it: modifier classes (side-info vs side-menu layout, hero variant) and how much chrome the page carries. Most pages take the full chrome from the adoption order; standalone pages carry none — `NDS_ROOT/_site/examples/registration.html` has no topbar, header, or footer. Admin consoles, back-office, and internal tools run edge-to-edge from one class: `nds-full-width` on `&lt;body&gt;` widens the chrome and the content layout together — no per-layout modifier. They also move the hero INSIDE `.nds-main-content` so it sits beside the side menu instead of spanning above it; see `NDS_ROOT/_site/examples/console-demo.html`. So choosing a starting page is about matching content structure, not markup: adjust modifiers and swap content rather than rebuilding. Prefer official over custom, in this order:

1. **Match a DGA page template?** Use it as-is. `NDS_ROOT/_source/_data/content/templates.yml` catalogs DGA-official full-page templates (Service, Form, Contact, Content, Help &amp; Support, About Entity, FAQ, e-Participation, and more — every entry tagged `DGA`). Copy the whole page from `NDS_ROOT/_site/templates/&lt;name&gt;.html`, swap only the placeholder content. Never re-compose your own version — the templates encode structural decisions (side-info placement, breadcrumb slots, hero variant, tab layout) a hand-composed page will get subtly wrong.
2. **No DGA match?** Check `NDS_ROOT/_source/_data/content/examples.yml` + `NDS_ROOT/_site/examples/*.html` for a closest-fit composition — dashboards, service listings, editorial hubs, patterns DGA doesn't cover.
3. **Nothing matches?** Scaffold custom, but stay inside rule #4's structure. Study the DGA templates and examples for wiring patterns to reuse — how side-info wires to breadcrumbs, how forms space grouped fields, how `nds-block` sub-groups compose. Recognizable NDS structure beats invented structure.

For individual components, always check `NDS_ROOT/_source/_data/content/components.yml` first — ~90 components ship. Use a close variant even when its name doesn't obviously match what the dev asked for.

### Replacing a legacy library — the method

Rule #6 names common libraries, but the method works for any:

1. **Name the capability, not the library** — "async searchable select", "rich text editor", "sortable table fed by server data".
2. **Search `NDS_ROOT/_source/_data/content/components.yml` for that capability** (titles, descriptions, tags). A close variant almost always exists even when no name matches.
3. **No single-component match? It's likely a composition** — a data-grid plugin maps to table + filter + pagination + export working together. Check `examples.yml` and `NDS_ROOT/_site/examples/` for a composed pattern before concluding NDS lacks it.
4. **Port options and callbacks through NDS events and methods** (JS integration below) — never wrap NDS to emulate the old library's API shape.
5. **Truly no NDS coverage?** Build it vanilla inside rule #4's structure with rule #5's styling order — don't pull the legacy library back in for one widget.

### JS integration — go through the API, not around it

Many NDS components ship rich programmatic APIs and DOM events. **Wire your code THROUGH them, not around them.** Consumers who hand-write listeners on `.nds-*` elements or mutate their state directly reimplement (badly) what NDS already ships — and drift on every upgrade.

**Rule:** before adding any `addEventListener` on a `.nds-*` element, or mutating any `data-state="…"` on a NDS component, grep the component's source in `NDS_ROOT/_source/_js/nds-&lt;name&gt;.js` for:
- `NDS.&lt;Name&gt; = {` — the public surface (methods to call).
- `dispatchEvent(new CustomEvent('nds:` — the events to listen for.

There's almost certainly a documented method or event to hook into instead.

**Concrete examples that make the rule real:**

- **AJAX filter →** listen for `nds:filter:change` on the filter's representative element; fire your fetch off `event.detail.criteria` (not off individual form inputs — they race with async-populated `&lt;select&gt;`s). Use `NDS.Filter.whenReady(container, cb)` to bind safely, because the filter can initialize before your listener attaches.
- **Server-driven pagination →** don't rebuild the nav after each AJAX response. Call `NDS.Pagination.updateRecords(listId, { from, to, count })` — the same slot grammar auto-mode uses. The nav re-renders itself.
- **Programmatic form-field writes →** setting `input.value = …` from JS does NOT fire `input`/`change`, so the clear button, validation chrome, and radio-group paint go stale. Call `NDS.Forms.syncState(input)` after any programmatic write. And after swapping a whole form region's HTML, call `NDS.Forms.initializeContainer(el)` or the new inputs stay inert.
- **Custom submit gate →** `NDS.Forms.validateForm(form)` runs the full validation synchronously and returns `{ valid, errors }`. Call it from your own submit handler to short-circuit an AJAX submit when invalid.
- **Bilingual JS →** read `NDS.isRTL` and `NDS.lang` — don't parse `&lt;html dir&gt;` yourself. Media queries: `NDS.breakpoints.desktop` / `.mobile` are the exact strings NDS uses. For string tables, `NDS.i18n.load('componentName', scope)` + `data-i18n="key"` works for your own bilingual widgets too.

**Reinitialization** (after any dynamic DOM change that adds NDS markup): call `NDS.&lt;Component&gt;.reinit()`. It rescans the page for that component and skips anything already initialized, so it is safe to call repeatedly — this is the one to reach for. `NDS.&lt;Component&gt;.create(el)` builds a single instance from a specific element and constructs unconditionally, with no such guard: run it on an already-initialized element and you bind a second set of listeners (a double-constructed accordion closes again on the first click). Use it only for an element you know is fresh.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. Clear those keys from DevTools when debugging a stale render (bad date, wrong theme).

### Upgrading NDS — after the dev swaps the template folder

1. **Compare versions** — read the `Version:` banner (first lines only) of `NDS_ROOT/_site/assets/js/nds-main.min.js` and `NDS_ASSETS/js/nds-main.min.js`. If they differ, the project runtime is stale.
2. **Replace the runtime** — copy the new `NDS_ROOT/_site/assets/` over `NDS_ASSETS`, overwriting NDS files in place. Leave files the project added under `NDS_ASSETS` untouched; get dev approval before deleting anything.
3. **Sweep your pages** — read the `### Migrating from` sections in `NDS_ROOT/CHANGELOG.md` covering every version between the two banners, and update every page built from NDS markup for the breaking changes they list. Report every change you make.

### Reference index — where to look inside `NDS_ROOT`

- `_site/components/*.html` — one doc page per component. Canonical `lang-html` markup + `data-*` tables + ARIA notes. **Single source of truth for how to write a component.**
- `_site/ui-shell/*.html` — chrome docs: `head.html`, `header.html`, `topbar.html`, `footer.html`, `hero.html`, `sidemenu.html`, `sideinfo.html`.
- `_site/layout/*.html` — layout primitive docs: `section.html`, `grid.html`, `flex.html`, `block.html`.
- `_site/templates/*.html` + `_site/examples/*.html` — full-page templates + composed real-world pages.
- `_source/_data/content/*.yml` — machine-readable catalogs: `components.yml`, `templates.yml`, `examples.yml`, `icons.yml`.
- `_source/_js/nds-&lt;name&gt;.js` — readable component behavior source (behind the minified bundles).
- `_source/_sass/components/_&lt;name&gt;.scss` — readable component styling source.
- `_source/_sass/tokens/` — four design-token tier files (palette, primitives, semantic, components). Dark rebinds live at the bottom of each file, under `:root[data-theme~="dark"]`.
- `_source/_sass/_mixins.scss` — shared mixins.

### Facts the docs assume

- **RTL is the default.** `&lt;html dir="rtl" lang="ar"&gt;` for Arabic, `&lt;html dir="ltr" lang="en"&gt;` for LTR. Styles use CSS logical properties — direction flips from that single attribute, no separate stylesheet.
- **Dark mode** flips via `data-theme~="dark"` on `&lt;html&gt;`. No rebuild.

### Design tokens (in `NDS_ROOT/_source/_sass/`)

Four tiers. Tiers 2–4 live in `tokens/`, one file each, with the light block at the top and the `:root[data-theme~="dark"]` block at the bottom of the same file.

1. **Palette** (`themes/_dga.scss`, vendored — do not modify) — raw color ramps, no meaning. Its dark ramps are generated at runtime by `themes/_register.scss`, not held in the file itself.
2. **Primitives** (`tokens/_primitives.scss`) — dimension vocabulary: `--spacing-md`, `--radius-sm`, typography rungs.
3. **Semantic** (`tokens/_semantic.scss`) — one name per meaning: `--background-primary`, `--text-oncolor-primary`. Rule #5 rebinds these at `:root` for whole-system theming.
4. **Component** (`tokens/_components.scss`) — per-component dials: `--{component}-{property}-{variant}-{state}`.
                    </code>
                </div>
            </div>
<!-- ═══════════════════════ COPY END ═══════════════════════ -->
                </div>
                <div class="nds-block">
                    <h3 id="paths" class="nds-block-title">Path Configuration</h3>
                    <table class="nds-table nds-responsive">
                        <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory from step 1.</td></tr>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where your application serves static assets (e.g. <code class="nds-inline-code lang-html">public/assets/</code>, <code class="nds-inline-code lang-html">wwwroot/</code>). If it does not exist, the agent creates it during the first asset copy.</td></tr>
                        </tbody>
                    </table>
                    <p>After saving, start a new agent session &mdash; instruction files are loaded only when a session begins.</p>
                </div>
                <div class="nds-block">
                    <div class="nds-alert nds-card" data-status="neutral" role="alert">
                        <span class="nds-feedback nds-alert-icon nds-outline">
                            <span class="nds-feedback-icon">
                                <i class="nds-icon" aria-hidden="true"></i>
                            </span>
                        </span>
                        <div class="nds-alert-content">
                            <div class="nds-alert-text">
                                <span class="nds-alert-title">Verification</span>
                                <p class="nds-alert-description">In the new session, ask: <em>what is <code class="nds-inline-code lang-html">NDS_ROOT</code> set to?</em></p>
                                <ul class="nds-alert-description">
                                    <li><strong>Loaded correctly</strong> &mdash; the agent answers with the path immediately, without searching files.</li>
                                    <li><strong>Not loaded</strong> &mdash; the agent begins scanning your repository. Check the instruction file location and restart the session.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 id="sessions" class="nds-section-title">3. Build Sessions</h2>
                <p class="nds-section-description">AI sessions do not share memory. Session 1 creates <code class="nds-inline-code lang-html">NDS-PLAN.md</code> at the project root to track pages, routes, target components, and status. Every later session reads and updates this file before making changes.</p>

                <p>Run the sessions in order, one prompt per session.</p>

                <div class="nds-block">
                    <h3 id="session-1" class="nds-block-title">Session 1: Planning &amp; Discovery</h3>
                    <p><strong>Prerequisite:</strong> your application must already exist and serve &mdash; working routes, a shared layout, and at least one rendering page. NDS provides the UI layer; it does not scaffold an application.</p>
                    <p>Whether you are building new pages or replacing an existing interface, the planning process is the same.</p>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Inventory this project: identify routes, layout components, shared partials, existing pages, and current UI libraries. Map every existing page to an NDS target using the composition cascade (DGA template, example, or custom). If replacing an existing UI, propose a parallel-file strategy appropriate for this stack (rule #7).

Output the results into NDS-PLAN.md at the project root as a markdown table with the columns: Page, Route, Legacy Libraries, NDS Target, Status.

Then stop for my review &mdash; build nothing until I approve the plan.
                        </code>
                    </div>
                    <p>Review the plan before continuing &mdash; the agent will not build anything until you approve it.</p>
                </div>
                <div class="nds-block">
                    <h3 id="session-2" class="nds-block-title">Session 2: Assets &amp; Shared Chrome</h3>
                    <p>This session copies the runtime assets into your project and builds the global page chrome.</p>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Read NDS-PLAN.md. Copy the NDS assets from NDS_ROOT into NDS_ASSETS. Then build the global page chrome following the standard adoption order:

1. head elements
2. Master layout
3. Topbar and main navigation
4. Footer
5. Accessibility panel and cookie popup
6. Sub-hero / page hero

Verify visual rendering in the browser, then update NDS-PLAN.md.
                        </code>
                    </div>
                    <ul>
                        <li>The page renders with NDS styling &mdash; chrome in place, icons visible, no unstyled flash on load.</li>
                        <li>The console is clean &mdash; no errors, and no <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                    </ul>
                </div>
                <div class="nds-block">
                    <h3 id="session-3" class="nds-block-title">Session 3+: One Page per Session</h3>
                    <p>Each remaining session builds a single page. Run this prompt once per page until the plan is complete.</p>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Read NDS-PLAN.md. Select the next uncompleted page (or the page specified below) and build it following the NDS workflow. Verify rendering in the browser, then update its status in NDS-PLAN.md.

Target page: [optional - insert page name]
                        </code>
                    </div>
                    <p>Implementation is complete when every entry in <code class="nds-inline-code lang-html">NDS-PLAN.md</code> is marked <code class="nds-inline-code lang-html">Built and Verified</code>. Rows left at <code class="nds-inline-code lang-html">Awaiting Verification</code> are yours to clear: the agent built the page but had no browser, so it emitted a checklist instead of claiming the check.</p>
                    <p><strong>If you replaced an existing UI:</strong> the parallel legacy files remain live and still need their libraries. Removing a legacy library is invasive and is your decision, not the agent's &mdash; the agent reports when no ported page depends on a library anymore, and you approve its removal (rules #6 and #7).</p>
                </div>

                <h2 id="upgrade" class="nds-section-title">4. Upgrades &amp; Maintenance</h2>
                <p class="nds-section-description">When a new version of NDS is published, replace the template folder and let the agent apply the migration.</p>

                <ol>
                    <li>Download and extract the latest release, replacing your existing <code class="nds-inline-code lang-html">NDS_ROOT</code> folder (as in step 1).</li>
                    <li>If the directory path changed due to versioning, update <code class="nds-inline-code lang-html">NDS_ROOT</code> in your instruction file (<code class="nds-inline-code lang-html">CLAUDE.md</code> / <code class="nds-inline-code lang-html">AGENTS.md</code>).</li>
                    <li>Run the upgrade prompt below.</li>
                </ol>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
The NDS template directory has been updated with a new release. Execute the upgrade workflow:

1. Compare the version banners of NDS_ROOT/_site/assets/js/nds-main.min.js and NDS_ASSETS/js/nds-main.min.js.
2. Overwrite the runtime assets under NDS_ASSETS with the updated files from NDS_ROOT.
3. Read the migration notes in CHANGELOG.md covering every version between the two.
4. Audit application pages for breaking changes and refactor as needed.

Provide a summary report detailing all changes made.
                        </code>
                    </div>

            </article>
        </div>
    </div>
</section>
