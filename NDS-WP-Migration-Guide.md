# NDS-vanilla → WordPress Block Theme: Migration Guide

**Source:** `NDS-vanilla` (National Design System — DGA design system, vanilla HTML/CSS/JS on Jekyll), v1.5.x-dev / latest release 1.5.0
**Target:** A WordPress Block Theme (theme.json v3, block templates, block patterns, custom blocks), WP 6.6+ floor (Details 6.3+, Breadcrumbs 6.6+, Block Hooks 6.6+)
**Audit confirmation (Step 1):** This guide is written against the verified repository inventory — 62 component docs, 7 ui-shell docs, 4 layout, 10 utilities, 13 templates, 6 examples, 3 events, 61 `_js` modules, 67 `_sass/components` files, 19 `_data` YAML collections, 28 `_includes`, 8 `_layouts`, 4-tier token system, 3 JS bundle outputs (`nds-main` / `nds-delegated` / `nds-extras`), 5 CSS bundles, and the loader registry with `critical: true` flags. All structural claims below trace to that inventory.

---

## 0. Migration philosophy

Three principles govern every decision in this guide:

1. **The design system is the asset, not the pages.** The token system, the component markup contracts, the performance discipline, and the RTL-first accessibility posture must survive the migration intact. Page content is replaced by CMS-managed content; the system is encoded in `theme.json`, block styles, patterns, and custom blocks.
2. **WordPress-native mechanics replace custom tooling.** Jekyll's YAML data → WP content types and menus; the custom JS loader → per-block `viewScript`/`viewScriptModule`; `_config.yml` → `functions.php` + `theme.json`; Liquid includes → template parts; Liquid loops over `_data` → `WP_Query`/block bindings.
3. **Nothing ships unless it loads.** The source's "critical vs. deferred" bundle discipline maps to WP's per-block asset loading. A page must download only the JS/CSS its blocks actually use, mirroring the loader registry (e.g., `Forms`, `Sidemenu`, `Drawer`, `Toc`, `ScrollMore` are `critical: true`; `Tabs`, `Tables`, `Accordion`, `Swiper`, `DatePicker`, `Chart` are deferred).

---

## 1. Required file structure

```
nds-theme/                                  # installable WP theme (zip root)
├── style.css                               # Theme header ONLY (Name: NDS, Theme URI, Author, Text Domain: nds-theme, Requires at least: 6.6, License…). No CSS rules here.
├── readme.txt                              # WP-style readme: description, install, changelog, credits, license
├── screenshot.png                          # 1200×900 homepage capture (the DGA-default front page)
├── theme.json                              # GLOBAL CONFIG — tokens, presets, layouts, block defaults, style variations (v3 schema)
├── functions.php                           # Setup: supports, menus, textdomain, enqueues, CPTs, block registration, patterns, block hooks, admin features
├── inc/
│   ├── setup.php                           # after_setup_theme: supports, menus, image sizes, editor styles
│   ├── enqueue.php                         # critical inline CSS, deferred main CSS, theme chrome JS, font preloads
│   ├── blocks.php                          # block.json discovery, block pattern registration, block style registration
│   ├── content-types.php                   # CPTs + taxonomies (nds_component, nds_template, nds_service…)
│   ├── menus.php                           # register_nav_menus: primary, actions, footer, sidemenu; fallbacks
│   ├── admin.php                           # permission/audit system (Step 4), dashboard columns, meta boxes
│   ├── api.php                             # REST endpoints for feedback/voting/consultation, nonce helpers
│   ├── i18n.php                            # load_theme_textdomain, wp_set_script_translations, RTL helpers
│   └── performance.php                     # preloads, fetchpriority rules, content-visibility CSS, defer logic
├── templates/                              # BLOCK TEMPLATES (HTML)
│   ├── index.html                          # fallback: header / query loop / pagination / footer
│   ├── front-page.html                     # homepage: hero-slider + patterns (About, Features, Gallery…)
│   ├── home.html                           # posts index
│   ├── page.html                           # sub-hero + content layout (optional sidemenu) + feedback
│   ├── single.html                         # article + sideinfo (TOC, meta, share)
│   ├── archive.html                        # CPT/term archives: card grid + toolbar
│   ├── search.html                         # search input + results query loop
│   ├── 404.html                            # NDS 404 pattern
│   └── (custom templates per theme.json `customTemplates`)
│       ├── template-service.html           # service page
│       ├── template-faq.html               # FAQ page
│       ├── template-contact.html           # contact page
│       ├── template-form.html              # multi-step form page
│       ├── template-kpis.html              # dashboard page
│       ├── template-help.html              # help & support hub
│       ├── template-about.html             # about entity
│       ├── template-e-participation.html   # consultations
│       ├── template-social.html            # social media hub
│       └── template-search.html            # search landing
├── parts/                                  # TEMPLATE PARTS (HTML)
│   ├── header.html                         # topbar part + mainnav part composed
│   ├── topbar.html                         # digital stamp, widgets, theme/brand switchers
│   ├── mainnav.html                        # brand + core Navigation + actions
│   ├── footer.html                         # footer patterns (columns, bottom bar, logos)
│   ├── cookie-popup.html                   # consent widget
│   ├── accessibility.html                  # FAB + a11y panel
│   ├── user-feedback.html                  # feedback widget
│   └── post-meta.html                      # since/updated/last-edit meta
├── patterns/                               # BLOCK PATTERNS (PHP-registered; auto-registered by dir in 6.6+)
│   ├── nds-hero-sub.php
│   ├── nds-section-head.php
│   ├── nds-feature-grid.php
│   ├── nds-alert.php
│   ├── nds-card.php
│   ├── nds-card-grid.php
│   ├── nds-cta-band.php
│   ├── nds-faq.php
│   ├── nds-share.php
│   ├── nds-quote.php
│   ├── nds-metric.php
│   ├── nds-stepper.php
│   ├── nds-cookie-popup.php
│   ├── nds-footer-columns.php
│   ├── nds-footer-bottom.php
│   └── nds-template-*.php                  # 12 DGA page templates as full-page patterns
├── styles/                                 # STYLE VARIATIONS
│   ├── default.json                        # DGA default (light)
│   ├── dark.json                           # explicit dark palette
│   ├── foundation-day.json                 # event pack (token overrides)
│   └── hajj.json                           # event pack
├── assets/
│   ├── css/                                # compiled: nds-critical.min.css, nds-main.min.css, nds-editor.min.css
│   ├── scss/                               # sources per Part-2 guides (tokens, mixins, components, themes)
│   ├── js/                                 # nds-theme.min.js (chrome), nds-a11y.min.js, nds-cookies.min.js
│   ├── fonts/                              # IBM Plex Sans Arabic (+Latin), Cairo, Readex Pro, OpenDyslexic woff2
│   ├── img/                                # hero images, 404.svg, logos, avatars
│   └── data/                               # saudi-cities.json, services-autocomplete.json (migrated as-is)
├── src/blocks/                             # CUSTOM BLOCKS (block.json + edit/save/view)
│   ├── hero-slider/        block.json, edit.js, view.js, render.php
│   ├── swiper/             block.json, edit.js, view.js
│   ├── tabs/               block.json, edit.js, view.js
│   ├── modal/              block.json, edit.js, view.js
│   ├── chart/              block.json, edit.js, view.js
│   ├── toc/                block.json, edit.js, render.php
│   ├── component-gallery/  block.json, edit.js, view.js, render.php
│   ├── sidemenu/           block.json, edit.js, render.php
│   ├── mega-menu/          block.json, edit.js, render.php
│   ├── digital-stamp/      block.json, edit.js, view.js
│   ├── date-picker/        block.json, edit.js, view.js
│   └── autocomplete/       block.json, edit.js, view.js
├── languages/
│   ├── nds-theme.pot                       # + ar.po/ar.mo (RTL)
│   └── nds-theme-nds_theme-*.json          # wp_set_script_translations outputs
├── package.json                            # wp-scripts build/bundle, sass watch
└── build/ (gitignored)                     # compiled output
```

**Classic-template leftovers (`index.php`, `header.php`, `footer.php`):** A pure block theme does **not** ship these. If a fallback is needed for edge hosts, a minimal `index.php` (calling `get_header()`/`the_content()`/`get_footer()`) can be included, but the block templates in `templates/` take precedence and are the intended path. `style.css` carries only the header comment; all styling lives in `theme.json` + `assets/css/`.

---

## 2. Converting existing code components into blocks and theme parts

### 2.1 Mapping table (component → WP mechanism)

| Source artifact | WP mechanism | Notes |
|---|---|---|
| `_includes/topbar.html` + `nds-topbar` SCSS | **Template part** `parts/topbar.html` + theme chrome JS | Digital-stamp block (`nds/digital-stamp`), date/clock widgets via one small theme script; theme/brand switcher buttons in the part, behavior in `assets/js/nds-theme.min.js` with the pre-paint inline guard |
| `_includes/mainnav*.html`, `_data/mainnav/*.yml`, `nds-mainnav.js` | **Core Navigation block** + `nds/mega-menu` block + menu locations | Primary items = menu; mega-menu columns = `nds/mega-menu` (renders assigned menu subtree with `nds-colView`/`nds-rowView`); actions (search/notifications/login) = `nds/action-nav` block or core buttons in the part; `data-state="current"` via `wp_nav_menu` current classes |
| `_includes/hero-main.html` + `nds-swiper.js` | **Custom block** `nds/hero-slider` (inner `nds/hero-slide`) | Attributes: slides, overlay, object-position; view.js ports scroll-snap/nav/pagination/keyboard from `nds-swiper.js`; first slide `fetchpriority="high"` |
| `_includes/hero-sub.html`, `hero.md` | **Pattern** `nds/hero-sub` + core Breadcrumbs | Composes breadcrumbs (6.6+), heading, brief, description, tags, actions, share |
| `_includes/sidemenu.html` + `nds-sidemenu.js` | **Custom block** `nds/sidemenu` (server-rendered from a menu location) | Accordion groups, counts, `data-state="active"`; view.js ports drawer/toggle/scroll-more |
| `_includes/footer.html`, `_data/footer/*.yml`, `_data/footerlogos/*.yml` | **Template part** `parts/footer.html` + patterns | `nds/footer-columns`, `nds/footer-bottom`; content editable in Site Editor; social icons + app SVGs inline |
| `_includes/cookie-popup.html` + `nds-cookies.js` | **Template part** + **Block Hook** | Auto-inserted after body open via block hooks; removable in Site Editor |
| `_includes/accessibility-panel.html` + `nds-accessibility.js` | **Template part** + theme chrome JS | FAB + panel; presets as `[data-a11y]` CSS + localStorage; pre-paint guard |
| `_includes/user-feedback.html` | **Template part** + REST | Thumbs up/down + comment; `admin-post.php`/REST with nonce; success replaces widget |
| `_includes/breadcrumb-jsonld.html`, `website-jsonld.html` | **`wp_head` filters** | Emit Organization/WebSite/BreadcrumbList JSON-LD |
| `_includes/last-edit.html`, `since.html` | **Post meta + pattern** | `nds/post-meta` part bound to CPT meta via block bindings |
| `index.md` sections (About, Who It's For, Compliance swiper, Examples swiper, Events swiper, Components gallery, Architecture, Dev Environment, Get Started) | **`front-page.html` + patterns + blocks** | Each section = pattern instance; swipers = `nds/swiper`; gallery = `nds/component-gallery` |
| `_sass/tokens/*`, `_sass/themes/_dga.scss` | **`theme.json`** `settings.color.palette` (light-dark aware), `settings.typography.fontSizes` (fluid), `settings.spacing`, `settings.layout` (contentSize 1280px) | See §3.3 mapping; `settings.custom` for semantic tokens (`--wp--custom--nds--*`) |
| `_sass/components/*.scss` (67 files) | **Block styles** (`is-style-nds-*`) + `assets/css/nds-main.min.css` | Scoped under `body.nds-theme`; block styles registered via `register_block_style` |
| `_js/nds-*.js` (61 modules) | **Per-block `viewScript`** + one theme chrome script | §4 table |
| `assets/data/*.json` | **`assets/data/`** copied as-is + `wp_localize_script` | saudi-cities.json, services/users autocomplete |
| `assets/i18n/**/*.json` | **`wp.i18n` + `languages/`** | Strings via `__()`/`esc_html__`; JS via `wp_set_script_translations` |
| `_data/themes.yml` + `_sass/themes/_register.scss` | **Style variations** (`styles/*.json`) + theme chrome JS | Event packs = variations; switcher applies variation + optional JS/CSS |
| `events/*.md` + asset packs | **Variation assets** | Loaded only when the variation is active (conditional enqueue) |

### 2.2 Component → block conversion procedure (per component)

1. **Take the canonical markup** from the component's doc page (the markup contract per CLAUDE.md — never guess structure).
2. **Decide the WP mechanism** using the priority ladder: core block with block style → pattern → custom block → theme part/chrome JS. Custom blocks only where core cannot express the interaction (slider, swiper, tabs, modal, chart, gallery, sidemenu, mega-menu, digital-stamp, date-picker, autocomplete).
3. **Encode the markup** as the block's `save` output (or `render.php` for dynamic blocks) exactly as documented: class names, `data-*` attributes, ARIA roles.
4. **Move behavior** into the block's `view.js` (port of the corresponding `nds-*.js`), with `wp.domReady`/delegation, `{ signal }` teardown, and `data-nds-<name>-initialized` guards preserved.
5. **Register styles** as block styles (`register_block_style`) so the editor shows them; keep the SCSS compiled into `nds-main.min.css` scoped under `body.nds-theme`.
6. **Give the editor a real experience** — `example` property, `edit.js` using core components, palette/typography from `theme.json`.
7. **Run the acceptance gates** (see §6): a11y walkthrough, RTL/LTR check, perf budget, editor save/render parity.

### 2.3 Converting the four UI-shell pieces (worked examples)

**Header (topbar + mainnav + digital stamp).** `parts/header.html` = `<!-- wp:template-part {"slug":"topbar"} /-->` + `<!-- wp:template-part {"slug":"mainnav"} /-->`. The topbar part renders the digital-stamp trigger (`nds/digital-stamp` block), the date/clock spans (`data-calendar`, `data-hidden`), and the theme/brand switcher buttons. The mainnav part renders brand (`wp:site-logo`-style image + name + slogan from Customizer/Site Editor), a `wp:navigation` block for primary items, `nds/mega-menu` for dropdown columns, and the actions row. Mobile collapse behavior ships in the chrome script (`nds-theme.min.js`), preserving `--nds-minimal-nav-bp` handling.

**Hero.** `front-page.html` opens with `nds/hero-slider`; every other template opens with the `nds/hero-sub` pattern (breadcrumbs via core Breadcrumbs block, heading from `wp:post-title` on singular templates, description/actions editable). `nds-aside`/`nds-flat` become block styles on the hero group.

**Footer.** `parts/footer.html` = `nds/footer-columns` pattern + separator + `nds/footer-bottom` pattern. Columns map to a `wp:navigation`-backed link list or editable Link blocks; social/app icons are inline SVG in the pattern; `nds-brand` becomes a block style on the footer group.

**Sidemenu + sideinfo.** `page.html` uses a 3-column layout group: sidemenu (`nds/sidemenu` block, `--wp--custom--nds--sidemenu-width`), main content, sideinfo (group with `is-style-nds-sideinfo` + `nds/toc`). Below 960px the layout stacks (CSS in the block styles), matching the source's responsive contract.

---

## 3. Transforming data structures into WordPress-compatible queries and loops

### 3.1 Data-source mapping (YAML → WP)

| Jekyll source | WP destination | Notes |
|---|---|---|
| `_data/content/components.yml` (components directory) | CPT `nds_component` + taxonomies `nds_category`, `nds_tech`, `nds_since` | Migrate via WP-CLI script; the gallery block queries it |
| `_data/content/templates.yml` | CPT `nds_template` | Directory page |
| `_data/content/examples.yml` | CPT `nds_example` (or pages) | Directory page + homepage swiper |
| `_data/content/events.yml` | CPT `nds_event` + variation meta | Event swiper |
| `_data/content/services.yml` | CPT `nds_service` | Service template + services-list example |
| `_data/content/faqs.yml` | CPT `nds_faq` (or a repeating group in patterns) | FAQ template; searchable via gallery-style query |
| `_data/content/notifications.yml` | Post type `nds_notification` (or transient) | Notification dropdown |
| `_data/content/users.yml` | WP users + `nds_persona` CPT for profiles | Persona blocks |
| `_data/content/search-results.yml`, `transactions.yml` | Demo fixtures → example content | Console example |
| `_data/mainnav/mainnav.yml` | WP menus (`primary`, `actions`) | `wp_nav_menu`/Navigation block |
| `_data/sidemenu/sidemenu.yml` | WP menu (`sidemenu`) | `nds/sidemenu` renders it |
| `_data/footer/footer.yml` | Site Editor content + menus | Footer patterns |
| `_data/hero/herosliders.yml` | Homepage pattern content (hero-slider inner blocks) | Editable in editor |
| `_data/themes.yml` | `styles/*.json` variations + PHP registry | Switcher |
| `_config.yml` (brand, hero, social) | `theme.json` `custom` + Customizer/Options + `get_theme_mod` | Single source: an `nds_settings` option array |
| Front matter (`hero_*`, `breadcrumb`, `since/updated/last_edit`) | Post meta (`_nds_hero_*`, `_nds_since`, `_nds_updated`, `_nds_last_edit`) + block bindings | Field groups via `register_post_meta` |
| `assets/data/*.json` | Copied assets + `wp_localize_script` | Autocomplete/cities |

### 3.2 Query and loop strategies

**Prefer block bindings over hard-coded loops.** In block templates, use `wp:query` (Query Loop block) with `postType`, `perPage`, `order`, and taxonomy filters; the `nds/component-gallery` block wraps this for the directory pages (search + facets + pagination over the server-rendered first page, then client-side filtering — a direct port of `nds-filter.js`/`nds-pagination.js`).

**Dynamic blocks with `render.php`** handle the cases a Query Loop can't express:

- `nds/sidemenu` → `wp_get_nav_menu_items('sidemenu')`, walk with `wp_list_pages`-style recursion, emit `data-state="active"` via `get_queried_object_id()`.
- `nds/digital-stamp` → reads the `nds_settings` option (registration number, texts).
- `nds/toc` → parses the post content headings (or a `[heading-ids]` meta), emits the anchor list.
- `nds/component-gallery` → `WP_Query` with facet args; server-renders page 1; `view.js` does client filtering over `data-*` facets (same contract as the source).

**Pagination** uses `the_posts_pagination()`-equivalent block markup (`wp:query-pagination`) with NDS styles; `aria-current="page"` preserved.

**Permalinks/URLs.** The source's `{{ 'path' | relative_url }}` becomes `esc_url( get_permalink() )` / `home_url('/path/')`; keep a redirect map from the old Jekyll URLs (`/components/accordion.html` → `/components/accordion/`) to preserve SEO and the source's live-doc links.

### 3.3 theme.json token mapping (condensed)

| NDS token | theme.json |
|---|---|
| `--colors-{primary,secondary,tertiary,neutral}-*` (DGA ramps) | `settings.color.palette` (light-dark pairs via `light-dark()`), `settings.color.defaultPalette: false` |
| `--background-*`, `--text-*`, `--border-*`, `--shadow-*` (semantic) | `settings.custom` → `--wp--custom--nds--*`; consumed by block styles |
| `--spacing-{xs…11xl}` (4px grid) | `settings.spacing.spacingScale` (0–11 over 4px) + named `spacingSizes` |
| `--typo-*-clamp-*` (fluid type) | `settings.typography.fluid: true` + `fontSizes` presets (min/max mirroring clamps) |
| IBM Plex Sans Arabic (+Cairo/Readex Pro) | `settings.typography.fontFamilies` with `fontFace` (`file:./assets/fonts/…`, unicode-range subsets) |
| `--nds-content-MaxWidth: 1280px` | `settings.layout.contentSize: 1280px`, `wideSize: 1600px` |
| `--nds-nav-height`, `--nds-sidemenu-width`, `--nds-sideinfo-width` | `settings.custom` (`--wp--custom--nds--*`) |
| Dark mode (`:root[data-theme~="dark"]`) | `styles.css: :root { color-scheme: light dark; }` + `light-dark()` palette + `styles/dark.json` variation |
| Component knobs (`--btn-*`, `--section-*`) | Block-style CSS variables, undefined by default, `--_x: var(--x, default)` pattern |

---

## 4. JavaScript migration table (61 modules → WP assets)

| Source module(s) | WP disposition |
|---|---|
| `nds-core.js`, `nds-loader.js`, `nds-fontLoading.js` | **Superseded** — WP asset system + theme chrome script; keep the `NDS` namespace only as a guarded util namespace exposed via the chrome script |
| `nds-swiper.js` | `nds/hero-slider` + `nds/swiper` view scripts |
| `nds-tabs.js`, `nds-accordion.js` | Tabs → `nds/tabs` view; accordion → core Details + optional exclusivity enhancer |
| `nds-modal.js`, `nds-backdrop.js`, `nds-drawer.js`, `nds-panels.js`, `nds-fab.js`, `nds-dropmenu.js`, `nds-tooltip.js` | Theme chrome module (data-attribute-driven) + `nds/modal` view |
| `nds-mainnav.js`, `nds-sidemenu.js`, `nds-scroll-more.js` | Theme chrome module |
| `nds-breadcrumb.js` | Superseded by core Breadcrumbs |
| `nds-share.js`, `nds-copy.js`, `nds-rating.js` | Theme chrome module + REST for votes |
| `nds-filter.js`, `nds-pagination.js`, `nds-sort.js` | `nds/component-gallery` view |
| `nds-progress.js`, `nds-stepper.js`, `nds-cooldown-button.js`, `nds-numbers.js`, `nds-chart.js`, `nds-toc.js` | Respective custom-block views |
| `nds-forms.js` + control modules | Styled core Form/plugin controls + validation ported to the chosen form solution |
| `nds-customselect.js`, `nds-multiselect.js`, `nds-taginput.js`, `nds-autocomplete.js`, `nds-date-picker.js`, `nds-otp.js`, `nds-upload.js`, `nds-voice-input.js`, `nds-ipv.js` | Styled core/plugin controls; `nds/date-picker` + `nds/autocomplete` custom blocks; OTP/upload/voice as enhanced patterns with theme JS |
| `nds-cookies.js`, `nds-user-feedback.js`, `nds-feedback.js`, `nds-selection.js`, `nds-link.js`, `nds-export.js`, `nds-empty.js`, `nds-alert.js` | Theme chrome data-attribute behaviors |
| `nds-theme.js` + event theme JS | Theme chrome + style-variation JS |
| `nds-accessibility.js` | Theme chrome (a11y panel) |
| `nds-digitalStamp.js`, `nds-timeDate.js`, `nds-cityWeather.js` | Theme chrome (stamp modal, Hijri date/clock, weather with cached fetch) |
| `nds-code.js`, `nds-tables.js`, `nds-showcase.js` | Theme CSS + small chrome enhancements (code copy, sortable tables); showcase not ported (demo-only) |

**Enqueue contract:** `wp_enqueue_script` with `strategy: 'defer'`; block scripts via `block.json` `viewScript`/`viewScriptModule` (load only when the block renders); no raw inline `<script>` in templates; pre-paint guards via `wp_add_inline_script` (static content only); `wp_localize_script` for settings data; `wp_set_script_translations` for i18n.

---

## 5. Block patterns and custom blocks catalog (from the Part-2 guide set)

**Patterns (file-based, `patterns/`):** hero-sub, section-head, feature-grid, alert (5 status variants), cta-band, card, card-grid, faq, share, quote, metric, stepper, cookie-popup, footer-columns, footer-bottom, digital-stamp, and the 12 `nds-template-*` full-page patterns.

**Custom blocks (block.json, in priority order):** P1 — `nds/hero-slider` (+ `nds/hero-slide`), `nds/swiper`, `nds/tabs` (+ `nds/tab`), `nds/modal`, `nds/component-gallery`. P2 — `nds/chart`, `nds/toc`, `nds/sidemenu`, `nds/digital-stamp`, `nds/mega-menu`, `nds/date-picker`, `nds/autocomplete`. P3 (optional) — `nds/rating`, `nds/progress`, `nds/stepper`, `nds/cooldown-button`.

**Editor parity:** every block ships an `example`, an `edit.js` with core components, palette/typography wired from `theme.json`, and `render.php` where dynamic; every pattern is registered with `categories`, `keywords`, and translatable strings.

---

## 6. Migration execution plan & acceptance gates

**Phase 0 — Scaffold:** theme skeleton, `theme.json` (tokens, fonts, layout), build pipeline (`wp-scripts` + sass), enqueue shell (critical inline CSS, deferred main CSS, chrome JS). Gate: blank page passes LCP/FCP/CLS budget.

**Phase 1 — Shell:** header (topbar/mainnav), footer, breadcrumbs, cookie/accessibility/feedback parts via block hooks; `index/page/single/404/search/archive` templates. Gate: parity walkthrough on 4 pages (RTL + LTR).

**Phase 2 — Blocks & patterns:** P1 custom blocks + block styles + full pattern library. Gate: every component doc's live demo reproduces via a pattern/block in the editor.

**Phase 3 — Homepage & content model:** `front-page.html`, CPTs, `nds/component-gallery`, WP-CLI data migration. Gate: directories filter/sort/paginate identically to source.

**Phase 4 — Advanced:** P2 blocks, forms strategy, style variations (dark + events), REST endpoints (feedback/voting/consultation), permission system (§ admin.php).

**Phase 5 — Hardening:** perf budget pass (`nds-perf` equivalent: throttled Chrome), a11y audit (axe + keyboard + screen reader), RTL/LTR regression, translation audit, editor save/render parity sweep, redirect map verification.

**Acceptance gates (every phase):**
- Build clean (wp-scripts + no PHP notices), `theme check` warnings resolved.
- Token discipline: no raw hex in block styles; dark mode verified for every accent.
- Performance: home LCP < 2.5s mobile (throttled), CLS 0, no JS on the page without a consuming block.
- Accessibility: WCAG 2.1 AA (same manual suite as the source), reduced-motion, keyboard paths.
- Content: all migrated CPT entries render in the gallery with correct facets; old URLs redirect.

---

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Editor/canvas fidelity for complex CSS (container queries, custom props) | Editor stylesheet imports token + component CSS; per-block canvas testing; iframe-safe scoping (`body.nds-theme`) |
| Script conflicts with plugins | Data-attribute behaviors scoped and delegable; `data-nds-ignore` escape hatch; no jQuery dependency |
| Dark-mode representation in the editor | `light-dark()` verified per WP version; explicit `dark.json` variation as fallback |
| Forms: core Form block vs. plugin | Decision gate in Phase 4; NDS styling via block styles either way; validation ported to the chosen solution's hooks |
| Legal/branding (DGA identity exclusive to Saudi gov entities) | Neutral fallback brand + documented swap; default ships DGA per source license with disclaimer |
| Large gallery datasets | Server-side pagination default; client filtering only over the rendered page (source parity) |
| Translation drift | POT + language packs in CI; `wp_set_script_translations` for JS strings; ar (RTL) is the default locale |
