---
layout: page
title: Get Started
lang: en
direction: ltr
hero_title: Get Started with NDS
hero_description: "Adopt NDS in any codebase: download the template, wire your AI agent, and migrate page by page."
breadcrumb: ["Guides"]
---

<!-- Download -->
<section id="getStartedDownload" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">1. Download the Template</h2>
            <p class="nds-section-description">One zip from GitHub Releases: the built docs, all assets, and readable source.</p>
        </div>
        <div class="nds-section-body">
            <p>NDS ships as a pre-built, framework-free template: plain HTML, CSS, and JS with no build step. RTL (Arabic) is the default with full LTR (English) support, and light/dark plus brand re-theming flip from a single <code class="nds-inline-code lang-html">data-theme</code> attribute. It sits beside any stack (Rails, Next, Django, Laravel, ASP.NET, plain PHP, a static site generator) as a read-only reference: you copy markup, tokens, and assets out of it into your own codebase, and your LLM never edits it.</p>
            <div class="nds-block">
                <h3 class="nds-block-title">Get the Zip</h3>
                <p>Download the latest <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a>.</p>
                <p>Unzip it anywhere your project can reach: a sibling directory, a folder inside your repo, or a shared location. That path becomes <code class="nds-inline-code lang-html">NDS_ROOT</code> in the next step.</p>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">What's Inside</h3>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
README.md      what this folder is and where to start
_site/         the built documentation site + all assets
_source/       readable JS/SCSS source + machine-readable catalogs
CHANGELOG.md   release history
                    </code>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Wire Your AI Agent -->
<section id="getStartedWire" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">2. Wire Your AI Agent</h2>
            <p class="nds-section-description">Paste one block into your project's agent instructions and set two paths. That is the whole configuration.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Setup Steps</h3>
                <ol>
                    <li>Append the instructions block below to your project's <code class="nds-inline-code lang-html">AGENTS.md</code> (Cursor / Aider / Codex) or <code class="nds-inline-code lang-html">CLAUDE.md</code> (Claude Code). Create the file at your project root if it doesn't exist yet.</li>
                    <li>Set the two paths at the top of the block: <code class="nds-inline-code lang-html">NDS_ROOT</code> (where you unzipped the template) and <code class="nds-inline-code lang-html">NDS_ASSETS</code> (your project's public assets folder).</li>
                </ol>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">The Instructions Block</h3>
                <p>This is not a prompt. Paste it once and your agent reads it at the start of every session. The prompts you type per session come next, in the playbook.</p>
                <p>What the block covers:</p>
                <ul>
                    <li>Seven hard rules: what the agent must never do to your codebase or to the template.</li>
                    <li>The migration workflow, and the cascade it follows to pick a target for each page.</li>
                    <li>Setup: which files to copy into your project, and the two tags every page needs.</li>
                    <li>The NDS JavaScript API to wire your own code through, instead of around.</li>
                    <li>Where to look inside the template for markup, source, and tokens.</li>
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
- `NDS_ASSETS` = `/path/to/your-project/public/assets/` — the folder INSIDE THIS PROJECT that the NDS runtime assets get copied to. Never a path under `NDS_ROOT`. It is a filesystem path; the `&lt;link&gt;` and `&lt;script&gt;` tags need the URL it is served at.

### Seven hard rules

1. **Never edit anything under `NDS_ROOT`.** It is a read-only reference. If the dev needs to change NDS itself, flag it and stop — that's a separate conversation.

2. **Never read `*.min.js` or `*.min.css`.** They are opaque. Read the matching file in `NDS_ROOT/_source/` instead. One exception: the `Version:` banner in a bundle's first lines — read just those lines for the upgrade check.

3. **Copy canonical markup verbatim — never invent it.** Every component page at `NDS_ROOT/_site/components/&lt;name&gt;.html` has a `lang-html` code block with the exact HTML to copy. Class names, nesting, `data-*` attributes, and ARIA roles all matter — inferring markup from memory breaks the component.

4. **All page content lives inside sections, laid out with NDS primitives.**
    - Wrap every content block in `&lt;section class="nds-content-section"&gt;` (with its `.nds-section-wrapper` / `.nds-section-head` / `.nds-section-body` structure).
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

7. **Port to parallel files — never edit legacy files in place, never delete them.** For every page or partial you port, create a NEW file alongside the original: either an `NDS/` subfolder (uppercase, e.g. `Views/Home/NDS/Index.cshtml` beside the legacy `Views/Home/Index.cshtml`) or a `.nds` filename segment (lowercase, e.g. `home.nds.cshtml`), whichever fits the host project's convention. Route the NDS version through a new controller action, URL, or feature flag so both can be served side by side.
    - **Leave the legacy file untouched.** It stays the reference for teammates during migration, and the rollback path if something regresses.
    - **Agree the layout with the dev before porting file #1.** The naming pattern has to fit their build tooling, routing, and deploy pipeline, and getting it wrong on file #1 costs the same rename on every file after it.
    - **Co-locate page-scoped JS with its page where the stack allows** (e.g. `Views/Home/NDS/index.js` next to `Views/Home/NDS/Index.cshtml`), so one page's JS never leaks into another's. Some stacks (Rails asset pipeline, ASP.NET `wwwroot/`, Next.js `public/`) enforce a separate JS root — follow the project's convention rather than fighting it.

### Migration workflow — porting an existing system

1. **Inventory first.** List the host project's pages, layouts, shared partials, and legacy libraries. Map every page to a target via the composition cascade below (DGA template / example / custom).
2. **Agree the parallel-file layout** with the dev (rule #7) before porting file #1.
3. **Copy the assets in** (next section) so ported pages have a runtime to load.
4. **Port the chrome** (adoption order below) and verify it renders before touching inner content.
5. **Port pages one at a time** via the composition cascade. Verify each in the browser before starting the next — NDS init warnings are `NDS`-prefixed in the console, so component errors are attributable.
6. **Legacy-library removal is the dev's call — not yours.** Rule #7's parallel files keep the legacy pages live, and they still need their libraries. Never remove one yourself; at most report when no ported page depends on it anymore, and leave the decision to the dev (rule #6).

Migration state lives in `NDS-MIGRATION.md` at the project root — created in the first planning session. If it exists, read it before porting and update its status column after; it is the migration's memory between AI sessions.

### What to copy INTO this project

- **Assets** — copy the full `NDS_ROOT/_site/assets/` folder to `NDS_ASSETS`, preserving the internal `css/`, `js/`, `fonts/`, `icon/`, `img/`, `i18n/`, `data/` layout. The lazy-loaded bundles (`nds-delegated.min.js`, `nds-extras.min.js`) and the runtime-fetched i18n JSON files (`i18n/&lt;component&gt;/&lt;lang&gt;.json`, used by the accessibility panel and bilingual components) must be reachable at the same relative paths the main script assumes.
- **Include on every page** — one stylesheet and one script, nothing else. Written below as `NDS_ASSETS`; use the URL that folder is served at.
    - `&lt;link rel="stylesheet" href="NDS_ASSETS/css/nds-main.min.css"&gt;`
    - `&lt;script defer src="NDS_ASSETS/js/nds-main.min.js"&gt;&lt;/script&gt;`
    - The main script embeds `window.__NDS_BUNDLES` — its loader lazy-injects `nds-delegated.min.js` and `nds-extras.min.js` on demand. Do not hand-add either. Do not preload `nds-icons.min.css` or the icon-font stylesheet — they're gated behind an FOUC guard that lifts when the loader stamps `data-nds-icons-loaded` on `&lt;html&gt;`; preloading trips the gate.
- **Asset references in ported markup** — every page or partial copied out of `NDS_ROOT` references assets relative to its own location inside the template folder. A straight copy ships broken references: rewrite them to your `NDS_ASSETS` URLs as you port.

### Adoption order — chrome first, inner components second

Port the outer page skeleton before any inner content:

1. **Document head** — copy verbatim from `NDS_ROOT/_site/index.html` (or read `NDS_ROOT/_site/ui-shell/head.html`), then rewrite its asset references to `NDS_ASSETS` URLs. Load-bearing: preloads, FOUC guards, main script tag, icon-load gate.
2. **Master layout** — `&lt;html&gt;`/`&lt;body&gt;` skeleton with `&lt;header&gt;`, `&lt;main&gt;`, `&lt;footer&gt;` slots. Inside `&lt;main&gt;`, wrap page content in `&lt;div class="nds-content-layout"&gt;&lt;div class="nds-main-content"&gt;…&lt;/div&gt;&lt;/div&gt;`. Set `&lt;html dir&gt;` and `lang` from your project's locale.
3. **Topbar + main navigation** — `NDS_ROOT/_site/ui-shell/topbar.html` + the mainnav section of `NDS_ROOT/_site/ui-shell/header.html`.
4. **Footer** — `NDS_ROOT/_site/ui-shell/footer.html`.
5. **Accessibility panel + cookie popup** — copy from `NDS_ROOT/_site/index.html`.
6. **Sub-hero / page hero** — `NDS_ROOT/_site/ui-shell/hero.html`, when the page carries one.
7. **Only then** start porting inner components.

Why: `&lt;html dir&gt;` and body class shape how every component paints (RTL/LTR + dark). Dropmenus, modals, and drawers portal to `&lt;body&gt;` and expect chrome class chains present. Pasting a component into a page with a broken shell means every rendering bug is ambiguously "component or chrome?" — impossible to attribute cleanly.

### Composition cascade — for any page

Prefer official over custom, in this order:

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

**Reinitialization** (after any dynamic DOM change that adds NDS markup): `NDS.&lt;Component&gt;.reinit()` (whole-page rescan for that component) or `NDS.&lt;Component&gt;.create(el)` (single instance from a specific element). Both idempotent.

`NDS.cache` writes to `localStorage` with the `nds_` prefix. Clear those keys from DevTools when debugging a stale render (bad date, wrong theme).

### Upgrading NDS — after the dev swaps the template folder

1. **Compare versions** — read the `Version:` banner (first lines only) of `NDS_ROOT/_site/assets/js/nds-main.min.js` and `NDS_ASSETS/js/nds-main.min.js`. If they differ, the project runtime is stale.
2. **Replace the runtime** — copy the new `NDS_ROOT/_site/assets/` over `NDS_ASSETS`, overwriting NDS files in place. Leave files the project added under `NDS_ASSETS` untouched; get dev approval before deleting anything.
3. **Sweep ported markup** — read the `### Migrating from` sections in `NDS_ROOT/CHANGELOG.md` covering every version between the two banners, and update ported pages for the breaking changes they list. Report every change you make.

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

### Design tokens (in `NDS_ROOT/_source/_sass/tokens/`)

Four tiers, one file each. Light block at top, `:root[data-theme~="dark"]` block at bottom of the same file.

1. **Palette** (`themes/_dga.scss`, vendored) — raw color ramps, no meaning.
2. **Primitives** (`_primitives.scss`) — dimension vocabulary: `--spacing-md`, `--radius-sm`, typography rungs.
3. **Semantic** (`_semantic.scss`) — one name per meaning: `--background-primary`, `--text-oncolor-primary`. Rule #5 rebinds these at `:root` for whole-system theming.
4. **Component** (`_components.scss`) — per-component dials: `--{component}-{property}-{variant}-{state}`.
                    </code>
                </div>
            </div>
<!-- ═══════════════════════ COPY END ═══════════════════════ -->
                <p>Block pasted and both paths set: open your AI tool and start the first session below.</p>
            </div>
        </div>
    </div>
</section>

<!-- Session Playbook -->
<section id="getStartedPlaybook" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">3. Run the Migration</h2>
            <p class="nds-section-description">AI sessions forget. NDS-MIGRATION.md is the memory between them: the first session writes it, every later one reads it and updates it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">First Session: Plan, Don't Port</h3>
                <p>Produces the tracker and the parallel-file decision, with nothing ported yet.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
Inventory this project: pages, routes, layouts, shared partials, and legacy libraries. Map every page to an NDS target via the composition cascade (DGA template / example / custom). Propose the parallel-file layout for this stack (rule #7). Write the result to NDS-MIGRATION.md at the project root as a table: page, route, legacy libraries, NDS target, status. Then stop for my review. Do not port anything yet.
                    </code>
                </div>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Second Session: Assets and Chrome</h3>
                <p>Copies the runtime in and ports the shared page skeleton every later page depends on.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
Read NDS-MIGRATION.md. Copy the NDS assets into this project, then port the page chrome following the adoption order: head, master layout, topbar and navigation, footer, accessibility panel, sub-hero. Verify it renders in the browser, then update the tracker.
                    </code>
                </div>
                <p>Confirm NDS is live before going further: open a ported page, and in the browser console check that <code class="nds-inline-code lang-html">window.NDS</code> is defined and no <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings appear.</p>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Later Sessions: One Page Each</h3>
                <p>Scoped sessions beat marathons: one page per session keeps the AI's context sharp, and the tracker keeps continuity.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
Read NDS-MIGRATION.md. Port the next unported page (or name one) following the migration workflow. Verify it in the browser before finishing, then update its status.
                    </code>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Upgrading -->
<section id="getStartedUpgrading" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">4. Upgrade</h2>
            <p class="nds-section-description">Swap the folder and paste one prompt. Nothing changes for your users until the assets are replaced.</p>
        </div>
        <div class="nds-section-body">
            <p>The template folder is a development-time reference, not a runtime dependency: your pages load NDS from the assets copied into your own project.</p>
            <ol>
                <li>Replace the reference folder with the new release.</li>
                <li>If the folder name carries the version, update the <code class="nds-inline-code lang-html">NDS_ROOT</code> line in your agent instructions to match.</li>
                <li>Paste the prompt below.</li>
            </ol>
            <div class="nds-code">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                        <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-markdown">
I replaced the NDS template folder with a new release. Follow the "Upgrading NDS" steps: compare the Version banners of NDS_ROOT/_site/assets/js/nds-main.min.js and NDS_ASSETS/js/nds-main.min.js, replace the NDS assets under NDS_ASSETS with the new ones, then read the CHANGELOG "Migrating from" sections between the two versions and sweep ported pages for the breaking changes. Report every change you make.
                </code>
            </div>
        </div>
    </div>
</section>
