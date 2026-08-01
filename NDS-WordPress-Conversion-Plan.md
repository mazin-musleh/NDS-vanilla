# NDS-vanilla → WordPress Block Theme: Conversion Plan

**Source repository:** `NDS-vanilla` (National Design System — vanilla HTML/CSS/JS implementation of Saudi Arabia's DGA design system, built on Jekyll)
**Target:** A block-based WordPress theme (WP 6.6+, theme.json v3)
**Date:** 2026-08-01
**Scope:** Full design, layout, and interactive functionality translation using WordPress-native block architecture.

---

## 0. Executive Summary

NDS-vanilla is a **design system**, not just a website: it ships ~85 UI components, a 4-tier design-token system (palette → primitives → semantic → component), a responsive layout system, a UI shell (topbar, main navigation, heroes, footer, side menu, side-info), 12 DGA-compliant page templates, 61 vanilla-JS interaction modules, full RTL/Arabic-first bilingual support, light/dark theming, runtime brand re-theming, and a performance-first asset pipeline (critical-CSS split + a smart component loader).

Converting it to a WordPress block theme is a **design-system packaging job**, not a page-porting job. The recommended strategy:

1. **Migrate the design tokens into `theme.json`** (colors, typography, spacing, fluid sizes) so the block editor, front end, and block styles all share one source of truth.
2. **Recreate the component library as block styles, block patterns, and a small set of custom blocks.** The vast majority of NDS components map onto core blocks (group, cover, columns, buttons, details, query loop, navigation, breadcrumbs) with theme-defined styles and patterns. Only genuinely interactive/complex components (hero slider, generic swiper carousel, tabs, modal, chart, docs component gallery) need custom blocks, each built with `block.json` + a `view.js` so WP's asset system replaces NDS's custom loader.
3. **Port the vanilla JS as properly enqueued, dependency-aware theme/block scripts** — never as raw inline `<script>` tags. Each interactive block declares its own `viewScript`, giving WordPress-native "load only what's on the page" behavior that mirrors (and improves on) NDS's smart loader.
4. **Preserve the performance contract** (100 PageSpeed, Web Vitals passing) using WP's own levers: per-block script loading, `defer`/module strategies, `fetchpriority` attributes, lazy loading, `content-visibility` CSS, and inlined critical CSS.
5. **Keep RTL-first and bilingual architecture intact** using CSS logical properties (already used throughout NDS) plus core translation tooling.

The remainder of this document is the detailed, actionable plan.

---

## 1. Repository Analysis Summary (what we're translating)

### 1.1 Tech stack of the source

| Layer | Source implementation | WP equivalent |
|---|---|---|
| Static site generator | Jekyll + Liquid templates, `_data/*.yml` flat-file content | Block editor + templates/patterns + CPTs |
| Styling | SCSS → 4 compiled bundles (critical, main, icons, accessibility), CSS custom properties for all tokens | SCSS → compiled CSS, `theme.json` for presets, enqueued stylesheets |
| Behavior | 61 vanilla JS modules driven by a smart DOM-sweep loader, tiered bundles (core/delegated/extras) | `block.json` `viewScript`s + one small theme-chrome script |
| Content | Markdown pages + YAML data files | Pages/posts/CPT + block markup |
| Build | Jekyll (Ruby), Terser via Ruby plugin | `@wordpress/scripts` (wp-scripts build) + PHP `wp_enqueue_*` |

### 1.2 Architecture principles to preserve

- **Token-driven styling**: every value flows from CSS custom properties; components expose "dials" (`--_component-*`). → Map to `theme.json` presets + CSS variables.
- **RTL/LTR native**: all layout uses CSS logical properties; direction switches via a single `dir` attribute, no separate stylesheet. → Preserve; drive `dir` from `language_attributes()`.
- **Dark mode + runtime theming**: `[data-theme]` attribute on `<html>`, localStorage persistence, pre-paint FOUC guard, brand switcher (OKLCH seeds / stylesheet themes / seasonal event packs). → `light-dark()` palette strategy + small theme JS; optional style variations.
- **Performance-first**: critical CSS inline/blocking, main CSS deferred, JS loaded per-component, LCP preload, `content-visibility` on off-screen sections, lazy images. → WP-native equivalents (see §5.4, §6.5).
- **Accessibility baked in**: focus-visible rings, ARIA patterns, reduced-motion support, an opt-in accessibility panel (font scaling via `--user-font-scale`, dyslexia font, contrast modes). → Port as theme CSS + chrome script (§6.4).

### 1.3 Design tokens (the core asset)

- **Palette (DGA):** primary green ramp (`#1b8354` = 600, `#104631` = 900/strong surface, `#092a1e` = 950), secondary gold ramp, tertiary purple ramp, neutral gray ramp (25→950), status blue/green/yellow/red ramps, base white/black, alpha white/black ramps. Brand slots (primary/secondary/tertiary/neutral) are the re-branding surface; status + base are fixed.
- **Primitives:** 4px spacing grid (`--spacing-xs: 4px` … `--spacing-11xl: 160px`), radii (2/4/8/16/24/full), fluid clamp typography (display 2xl→xs, text xl→2xs, all with `calc(... * var(--user-font-scale,1))` for the a11y scale), shadow scale, transition knobs, app-shell dimensions (nav 72px, sidemenu 260px, sideinfo 400px, content max-width 1280px, base viewport padding 32px).
- **Semantic:** background/text/border/icon role tokens (e.g. `--background-default`, `--text-display`, `--border-neutral-primary`) with a full dark block.
- **Component:** per-component dials (`--_btn-*`, `--_card-*`, …) resolving against semantic tokens.
- **Breakpoints:** mobile ≤599px, tablet 600–959px, desktop ≥960px, large ≥1280px.

### 1.4 Key markup patterns

- Section model: `.nds-content-section` → `.nds-section-wrapper` → `.nds-section-head` (title/description/actions) + `.nds-section-body`; visual variants `.nds-primary` (deep brand surface), `.nds-gradient-primary`, `.nds-brand` (light brand tint), `.nds-neutral`, `.nds-ghost`.
- Responsive grid: `.nds-grid` with `--max-col: n; --mid-col: n; --min-col: n` (auto-fit repeat), optional container queries (`.nds-cq`).
- Content layout: `.nds-content-layout.nds-wSideMenu` + `.nds-main-content` + `.nds-sidemenu` (drawer) + `.nds-sideinfo` (sticky companion column).
- Card anatomy: `.nds-card` → header (image | featured icon) → content (title, description, tags) → actions.
- Button variants: `nds-primary`, `nds-secondary`, `nds-secondary-outline`, `nds-neutral`, `nds-subtle`, `nds-danger`, `nds-oncolor`, sizes `nds-sm/md/lg/xl`, icon-only.
- Tags/chips, alerts (neutral/info/success/warning/error), definition lists, toolbars (search + filter + pagination), pagination, progress circles, ratings, steppers, dropmenus, panels/drawers, modals, tooltips, FAB, cookie popup, user-feedback widget, accessibility panel.

### 1.5 Homepage (front page) sections — the canonical demo of the system

1. Hero slider (full-width image slides, overlay, content + CTAs, prev/next + pagination)
2. About the Project (section head + copy + neutral alert)
3. Who It's For (4 feature cards w/ HGI icons in a 2-col grid + warning alert)
4. Compliance Ready (swiper of template cards, 3/2/1 slides + peek)
5. Real-World Examples (swiper of example cards with category tags)
6. Event Themes (swiper of themed cards with Preview/Details actions)
7. Components (toolbar: search box + filter dropmenu + applied-filter chips; paged grid of 6/page, client-side filter/sort/pagination over YAML data)
8. Architecture & Performance (progress circle + 10 feature items)
9. Development Environment (6 feature items)
10. Get Started (3 CTA cards) + footer

### 1.6 UI shell components

- **Topbar:** digital-stamp button (Saudi gov verification modal), Hijri date + real-time clock, version tag, theme switcher (light/dark), brand switcher (runtime re-theme).
- **Main nav:** brand (logo + name + slogan), primary nav items incl. mega-menu dropdowns (column view, row list, notification/mail rows), actions nav (search, notifications w/ badge, user w/ avatar, login, language toggle), mobile minimal nav (hamburger + collapse).
- **Hero:** *main* (image slider) and *sub* (breadcrumbs + title + brief + tags + rating + actions + share dropmenu; background image variant).
- **Sidemenu:** collapsible drawer navigation with grouped children + counts, mobile toggle.
- **Footer:** 4 link columns, merged social/mobile-app icon column, divider, bottom links, copyright/legal, partner logos row.
- **Overlays/widgets:** cookie popup (accept/reject, localStorage), accessibility FAB + panel (font size steps, dyslexia font, contrast, text spacing), user-feedback widget, last-edit meta, breadcrumb JSON-LD, WebSite/Organization JSON-LD.

### 1.7 Page templates (12) and examples (6)

404, about-entity, contact-us, content, e-participation, faq, form, help-support, kpis, search, service, social-media; examples: admin console, faculty, program, registration, services-list.

### 1.8 Theming / events

Seasonal packs (Foundation Day, Hajj) that re-skin the whole site from one attribute; theme registry in `_data/themes.yml` + `_sass/themes/_register.scss` (seed themes via `[data-theme]`, stylesheet themes via `data-theme-css/js`).

---

## 2. Identified Core Components (catalog for translation)

### A. Page chrome
| # | Component | Source artifact |
|---|---|---|
| A1 | Topbar (digital stamp, Hijri date/clock, version, theme/brand switchers) | `_includes/topbar.html`, `_js/nds-digitalStamp.js`, `nds-timeDate.js`, `nds-theme.js` |
| A2 | Main navigation (brand + primary + actions + mega dropdowns + mobile) | `_includes/mainnav*.html`, `_js/nds-mainnav.js`, `nds-dropmenu.js` |
| A3 | Hero — main slider | `_includes/hero-main.html`, `_js/nds-swiper.js` |
| A4 | Hero — sub (breadcrumb, title, tags, actions, share, rating) | `_includes/hero-sub.html`, `_js/nds-share.js`, `nds-rating.js`, `nds-breadcrumb.js` |
| A5 | Sidemenu drawer | `_includes/sidemenu.html`, `_js/nds-sidemenu.js`, `nds-drawer.js` |
| A6 | Side-info column | `ui-shell/sideinfo.md`, `_js/nds-sideinfo.js` |
| A7 | Footer (columns, social, bottom, logos) | `_includes/footer.html`, `_data/footer/*.yml` |
| A8 | Cookie popup | `_includes/cookie-popup.html`, `_js/nds-cookies.js` |
| A9 | Accessibility panel + FAB | `_includes/accessibility-panel.html`, `_js/nds-accessibility.js` |
| A10 | User feedback widget | `_includes/user-feedback.html`, `_js/nds-user-feedback.js` |
| A11 | Breadcrumbs (+ JSON-LD) | `_includes/breadcrumb-jsonld.html` |
| A12 | Last-edit meta, since/updated version tags | `_includes/last-edit.html`, `since.html` |

### B. Layout primitives
| # | Component | Source artifact |
|---|---|---|
| B1 | Section model + variants | `_sass/layout/_section*.scss` |
| B2 | Responsive grid | `_sass/_grid.scss` |
| B3 | Content layout (main + sidemenu + sideinfo) | `_sass/layout/_content-layout.scss` |
| B4 | Flex utilities, container queries | `_sass/layout/_flex.scss`, `.nds-cq` |

### C. Content & media components (map to core blocks)
| # | Component | Source artifact |
|---|---|---|
| C1 | Buttons (variants/sizes/icons) | `_sass/components/_buttons.scss` |
| C2 | Cards (image/icon header, tags, actions) | `_sass/components/_cards.scss` |
| C3 | Alerts / notices | `_sass/components/_alert.scss` |
| C4 | Tags / chips / badges | `_sass/components/_tags.scss`, `_chips.scss` |
| C5 | Definition list / feature items | `_sass/components/_definition-list.scss` |
| C6 | Featured icons, feedback icons, avatars, persona | `_sass/components/_featured-icons.scss`, `_avatar.scss`, `_persona.scss` |
| C7 | Quote | `_includes/quote.html`, `_sass/components/_quote.scss` |
| C8 | Tables | `_sass/components/_tables.scss`, `_js/nds-tables.js` |
| C9 | Code blocks / inline code / syntax highlight | `_sass/components/_code.scss`, `_js/nds-code.js` |
| C10 | Metric / KPI stat | `_sass/components/_metric.scss` |
| C11 | Toolbar (search + filter + pagination) | `_sass/components/_toolbar.scss`, `_search-box.scss`, `_js/nds-filter.js`, `nds-pagination.js`, `nds-sort.js` |
| C12 | Progress circle / stepper / timeline | `_sass/components/_progress.scss`, `_stepper.scss`, `_js/nds-progress.js`, `nds-stepper.js` |
| C13 | Divider, expandable content, copy/truncate helpers | `_base.scss`, `utilities/*`, `_js/nds-copy.js`, `nds-expandable.js` |

### D. Interactive/overlay components (custom-block or JS territory)
| # | Component | Source artifact |
|---|---|---|
| D1 | Swiper/slider (hero + card carousels, scroll-snap CSS-first) | `_js/nds-swiper.js`, `_slider.scss`, `_swiper.scss` |
| D2 | Tabs | `_js/nds-tabs.js`, `_tabs.scss` |
| D3 | Accordion / expandable | `_js/nds-accordion.js`, `_accordion.scss` |
| D4 | Modal | `_js/nds-modal.js`, `_modal.scss` |
| D5 | Dropmenu (context menus, share, theme switcher) | `_js/nds-dropmenu.js`, `_dropmenu.scss` |
| D6 | Drawer / panel / backdrop / FAB | `_js/nds-drawer.js`, `nds-panels.js`, `nds-backdrop.js`, `nds-fab.js` |
| D7 | Tooltip | `_js/nds-tooltip.js`, `_tooltip.scss` |
| D8 | Chart | `_js/nds-chart.js`, `_chart.scss` |
| D9 | Share buttons + copy-link | `_js/nds-share.js`, `_share.scss` |
| D10 | Rating | `_js/nds-rating.js`, `_rating.scss` |
| D11 | Cooldown button, scroll-more, TOC, selection popup | `_js/nds-cooldown-button.js`, `nds-scroll-more.js`, `nds-toc.js`, `nds-selection.js` |

### E. Forms & inputs (complex; plugin or custom-block territory)
| # | Component | Source artifact |
|---|---|---|
| E1 | Form controls + validation + feedback | `_js/nds-forms.js`, `_forms.scss` |
| E2 | Custom select, multiselect, tag input, autocomplete | `_js/nds-customselect.js`, `nds-multiselect.js`, `nds-taginput.js`, `nds-autocomplete.js` |
| E3 | Date picker (Gregorian + Hijri), OTP, upload, voice input, IPv validation | `_js/nds-date-picker.js`, `nds-otp.js`, `nds-upload.js`, `nds-voice-input.js`, `nds-ipv.js` |
| E4 | Search box (client-side filtering) | `_search-box.scss`, `_js/nds-filter.js` |

### F. Data-driven docs-site features
| # | Component | Source artifact |
|---|---|---|
| F1 | Components directory (search + filter + pagination over YAML) | `_data/content/components.yml`, `index.md` §Components |
| F2 | Templates directory | `templates/*.md`, `_data/content/templates.yml` |
| F3 | Examples directory | `examples/*.md`, `_data/content/examples.yml` |
| F4 | i18n strings (ar/en JSON) | `assets/i18n/**` |

### G. Theming & accessibility
| # | Component | Source artifact |
|---|---|---|
| G1 | Light/dark mode + theme/brand switcher + pre-paint guard | `_js/nds-theme.js`, `_sass/themes/_register.scss` |
| G2 | Event theme packs (Foundation Day, Hajj) | `_sass/themes/_foundation-day.scss`, `_hajj.scss` + asset packs |
| G3 | Accessibility modes (font scale, dyslexia, contrast, spacing) | `_js/nds-accessibility.js`, `_sass/_variables-a11y.scss` |
| G4 | Fonts (IBM Plex Sans Arabic, Cairo, Readex Pro, OpenDyslexic) | `_sass/_fonts.scss`, `assets/fonts/*.woff2` |

---

## 3. Proposed WordPress Block Equivalents / Strategies

**Guiding rule:** use core blocks + patterns + block styles for everything that is presentational; invest custom blocks only where core blocks cannot express the interaction or markup (carousels, tabs, modal, chart, mega-nav, docs gallery). This keeps the theme lightweight and fully editable.

### 3.1 Global mapping table

| NDS component | WP strategy | Details |
|---|---|---|
| **A1 Topbar** | Template part `parts/topbar.html` + theme chrome JS + patterns | Built from core blocks (site logo, social links, buttons) plus a custom "NDS Digital Stamp" block for the verification modal; Hijri clock/date via one small theme script. Theme/brand switcher buttons rendered in the part, behavior in theme JS (localStorage + pre-paint inline guard). |
| **A2 Main nav** | Core **Navigation block** + block style "NDS Mega Menu" + custom "NDS Mega Menu Column" pattern; mobile behavior via `wp-block-navigation` responsive styles + theme JS | Primary items = nav menu items; mega-menu children rendered by a custom `nds/mega-menu` block (or a Navigation block variation) that wraps a rich-content column pattern. Actions (search, user, notifications, language) = separate small custom blocks or theme-rendered buttons in the template part. |
| **A3 Hero slider** | **Custom block `nds/hero-slider`** (block.json + view.js) | Inner blocks: `nds/hero-slide` (cover image + heading/paragraph/buttons + overlay + position). view.js ports the scroll-snap + navigation + pagination + lazy-slide logic from `nds-swiper.js`. Attributes: slides, overlay, object-position, autoplay off (a11y). |
| **A4 Hero sub** | **Block pattern `nds/hero-sub`** + core Breadcrumbs block | Pattern composes core breadcrumbs (WP 6.6+), heading, paragraph, tags (paragraph with inline styles), buttons, share row. Share = `nds/share` pattern + theme JS. |
| **A5 Sidemenu** | Custom block **`nds/sidemenu`** (server-rendered from a WP menu or nav block markup) OR core Navigation block with drawer block style | Recommend custom dynamic block rendering the assigned sidemenu menu (register a second menu location) with collapsible groups + counts + active state; view.js ports drawer/toggle behavior. |
| **A6 Side-info** | Core **Group** with `position: sticky` block style (`is-style-nds-sideinfo`) | Pattern composes TOC (custom block), progress, contact card, etc. |
| **A7 Footer** | Template part `parts/footer.html` composed of patterns | `nds/footer-columns` pattern (columns of links + social icons + logos) + bottom bar pattern. Content editable in Site Editor; optionally block-bound to menus via Block Bindings. |
| **A8 Cookie popup** | **Hooked block** (block hooks, WP 6.6+) or template part + `nds/cookie-popup` pattern + theme JS | Injected after `body` open via `blockHooks` (anchor) or simply included in `parts/footer.html`; theme script handles accept/reject + localStorage (mirrors `nds-cookies.js`). |
| **A9 Accessibility panel** | Template part + theme chrome JS (or custom block) | FAB + panel markup in a template part; behavior ported to a small module with `wp.i18n` strings; CSS variables drive modes (`--user-font-scale`, dyslexia font stack, contrast overrides). |
| **A10 User feedback** | Pattern + theme JS | Thumbs up/down + optional textarea; `admin-post.php`/REST submission or comment-posting via core; keep it front-end only by default. |
| **A11 Breadcrumbs** | Core **Breadcrumbs block** (WP 6.6+) with NDS block style | JSON-LD BreadcrumbList via `wp_head` filter or block's schema output. |
| **A12 Last-edit / version tags** | Core **post date** block + pattern; version tags as inline spans in patterns | Since/updated tags are docs-site metadata → render from CPT meta/custom fields via `post-meta` binding or a tiny dynamic block. |
| **B1 Sections** | Core **Group** with block styles `nds-section`, `nds-section--primary`, `--gradient`, `--brand`, `--neutral`, `--ghost` + **layout constraints** | Section head = pattern; body = inner blocks; block styles carry the visual token wiring. Use theme.json `layout` (contentSize/wideSize) to reproduce 1280px wrapper. |
| **B2 Grid** | theme.json `layout` defaults + core **Group "grid" block style** | Block style `is-style-nds-grid` on Group reproduces `.nds-grid` (repeat auto-fit + column presets via inline `style` custom props set by a block style's CSS `--nds-max-col` custom properties); also `core/columns` for simple cases. |
| **B3 Content layout** | Templates: `page.html` grid layout (header part / main group with sidemenu + content / sideinfo group) | Recreate `.nds-content-layout` using core group with `display:flex` layout attribute; responsive collapse via CSS. |
| **C1 Buttons** | Core **Button** block with block styles per variant + color/layout presets from theme.json | Styles: `nds-primary`, `nds-secondary`, `nds-secondary-outline`, `nds-neutral`, `nds-subtle`, `nds-danger`, `nds-oncolor`; sizes via theme.json font/size presets; icon support via `Icon` attribute or pattern markup. |
| **C2 Cards** | Core **Group** block style `nds-card` (or `core/post-template` inside Query Loop) + pattern `nds/card` | Header image = core cover/image; content = heading+paragraph+tags; actions = buttons. Query Loop variant `is-style-nds-card` for dynamic listings. |
| **C3 Alerts** | Core **Group** block style `nds-alert` (variants neutral/info/success/warning/error) + pattern | Style sets icon slot via CSS `::before` (NDS feedback icon) and semantic colors; content editable. |
| **C4 Tags/chips** | Core **Paragraph** or **Buttons** with `is-style-nds-tag` / `is-style-nds-chip`; badges via `is-style-nds-badge` | Alternatively small `nds/tags` dynamic block bound to post taxonomies (used by docs gallery). |
| **C5 Definition list / features** | Pattern `nds/feature-grid` (group grid of icon + title + text) | Uses `is-style-nds-grid` + core group + inline SVG icons (port HGI subset as SVG; see §3.4). |
| **C6 Featured icons / avatars** | Block style on image/group + inline SVG icon library | Port required HGI icons as an SVG sprite/`<svg>` in patterns; avatars = core image with `is-style-nds-avatar`. |
| **C7 Quote** | Core **Quote** block with `is-style-nds-quote` | |
| **C8 Tables** | Core **Table** block with NDS styles | Responsive behavior (scroll) via CSS; sorting optional via theme JS applied to `table` with `data-nds-sortable`. |
| **C9 Code** | Core **Code** block with `is-style-nds-code` + Prism/theme JS for highlighting | Copy button via theme JS (port `nds-copy.js`). |
| **C10 Metric/KPI** | Pattern `nds/metric` (progress circle + number + label) + `nds/numbers` JS for animated counting | |
| **C11 Toolbar (search/filter/pagination)** | **Custom block `nds/component-gallery`** for the docs directory (see F1); for generic listings use core Query Loop + Query Pagination | Filter/search/pagination client logic ported into the gallery block's view.js. |
| **C12 Progress/stepper** | Custom block **`nds/progress`** (animated circle/bar) + pattern `nds/stepper` | view.js animates on scroll into view (port `nds-progress.js`). |
| **C13 Divider/copy/expand** | Core **Separator** block styled; copy via theme JS `data-nds-copy`; expandable = core Details block style | |
| **D1 Swiper/slider** | **Custom block `nds/swiper`** (generic carousel wrapping inner blocks) | Port `nds-swiper.js`: scroll-snap CSS, prev/next, pagination, keyboard, slides-per-view breakpoints (attributes slides-max/mid/min, peek), lazy slide rendering. Used by Compliance/Examples/Events sections. |
| **D2 Tabs** | **Custom block `nds/tabs`** (`nds/tab` inner blocks) | view.js ports `nds-tabs.js` (ARIA tabs pattern, keyboard nav, orientation, RTL). |
| **D3 Accordion** | Core **Details** block (WP 6.3+) with `is-style-nds-accordion` | `<details>/<summary>` is native and accessible; style to NDS. For exclusive-accordion behavior add tiny theme JS (optional). |
| **D4 Modal** | **Custom block `nds/modal`** (trigger + content) | view.js ports `nds-modal.js` + `nds-backdrop.js` (focus trap, ESC, scroll lock, portal). |
| **D5 Dropmenu** | Theme JS behavior `data-nds-dropmenu` (port of `nds-dropmenu.js`) applied to button+menu markup in patterns | Keep as progressive enhancement; used by share, theme switcher, filters. |
| **D6 Drawer/panel/FAB** | Custom block **`nds/drawer`** (or reuse modal infra) + theme JS for FAB/panels | Panels (side sheet) used by accessibility panel, notifications. |
| **D7 Tooltip** | CSS-only tooltip block style + tiny theme JS (port `nds-tooltip.js`) | |
| **D8 Chart** | **Custom block `nds/chart`** | Port `nds-chart.js` (canvas/SVG), data entered in editor (JSON or inner rows), responsive + RTL-aware. |
| **D9 Share** | Pattern `nds/share` + theme JS (port `nds-share.js`) | X/LinkedIn/WhatsApp/copy-link; uses REST/permalink. |
| **D10 Rating** | Pattern + theme JS (port `nds-rating.js`) | Display-only in front-end patterns; voting optional via REST. |
| **D11 Misc interactive** | Theme JS data-attribute behaviors | cooldown button, scroll-more, TOC (custom block), text-selection popup — all small `data-*` behaviors in one theme module. |
| **E1 Forms** | Core **Form block** if available in the target WP version, otherwise a forms plugin (e.g., WPForms/Gravity) or a custom `nds/form` block | NDS form styling applied via block styles + theme.json `elements.form`/field styles; validation behavior from `nds-forms.js` ported to the chosen form solution's hooks or a small front-end script. |
| **E2 Selects/autocomplete/date/OTP/upload/voice** | Custom blocks only for date-picker + autocomplete if required by the site; otherwise form-plugin territory | Pragmatic cut: ship NDS-styled core/plugin controls; build `nds/date-picker` (Gregorian+Hijri) and `nds/autocomplete` as custom blocks only if the client site actually uses them. Each with view.js ports. |
| **F1 Components directory** | **Custom block `nds/component-gallery`** (dynamic, server-rendered) + CPT `nds_component` (+ taxonomies category/tech/since) | view.js ports search/filter/pagination/sort from `nds-filter.js`/`nds-pagination.js`/`nds-sort.js`; editor sees a placeholder + settings; data entered as CPT posts (replaces `_data/content/components.yml`). |
| **F2/F3 Templates & examples dirs** | CPT `nds_template` + patterns; examples as ordinary pages using patterns | Directory pages built with Query Loop + `nds/component-gallery`-style filters if desired. |
| **F4 i18n** | `wp.i18n` (`__()`), `.pot` file, `load_theme_textdomain`; JS strings via `wp_set_script_translations` | Port `assets/i18n/*/en|ar.json` strings into the theme's translation files. |
| **G1 Theme/brand switcher** | Theme JS module `nds-theme` + pre-paint inline guard + CSS `light-dark()`/`[data-theme]` overrides | Persist `data-theme`/`data-brand` in localStorage; inline pre-paint script emitted via `wp_head` (static, no user data → safe). Optionally expose as style variations in the editor. |
| **G2 Event packs** | Registered **style variations** (`styles/foundation-day.json`, `styles/hajj.json`) + optional per-variation JS/asset load via `wp_enqueue_scripts` when variation active | Matches NDS "drop-in re-skin" concept using WP's native variation switcher. |
| **G3 Accessibility modes** | Theme JS `nds-accessibility` + CSS vars (port `_variables-a11y.scss`) | Modes stored in localStorage; apply classes/attrs on `documentElement`. |
| **G4 Fonts** | theme.json `fontFamilies` with local `fontFace` (`file:./assets/fonts/...`) | IBM Plex Sans Arabic (400/500/600/700 with unicode-range subsets) + optional Cairo/Readex Pro alternates; OpenDyslexic for the a11y dyslexia mode. |

### 3.2 Custom blocks — priority list & specifications

Build with `@wordpress/create-block`-style structure (each block: `block.json`, `edit.js`, `save.js`/dynamic render, `view.js`). Blocks marked **P1** are required for the theme's identity; **P2** are docs-site/demo features; **P3** optional.

| Priority | Block | Inner blocks / attributes (outline) | Rendering | view.js (ported from) |
|---|---|---|---|---|
| P1 | `nds/hero-slider` | Inner: `nds/hero-slide` (cover background, heading, paragraph, buttons, overlay, object-position). Attrs: slide count, arrows on/off, pagination on/off. | Save markup; slides lazy-render | `nds-swiper.js` (scroll-snap, nav, pagination, keyboard, RTL) |
| P1 | `nds/swiper` | Wraps arbitrary inner blocks; attrs: slides-max/mid/min, peek, arrows, pagination, loop | Save markup | `nds-swiper.js` |
| P1 | `nds/tabs` | Inner: `nds/tab` (title + content); attrs: orientation, active tab | Save markup + ARIA | `nds-tabs.js` |
| P1 | `nds/modal` | Attrs: trigger label/icon/variant, modal title; inner: modal content; portal support | Save markup; portals via view | `nds-modal.js`, `nds-backdrop.js` |
| P1 | `nds/component-gallery` | Dynamic: query args (taxonomy filters, per-page); toolbar attrs (search on/off, filter facets); inner: Query Loop markup as template | Server-rendered (render.php) | `nds-filter.js`, `nds-pagination.js`, `nds-sort.js` (client-side over server-rendered list) |
| P2 | `nds/chart` | Attrs: type (line/bar/donut…), data JSON, colors; RTL flip | Render canvas/svg | `nds-chart.js` |
| P2 | `nds/toc` | Auto-generates from heading levels in the page/group | Server-rendered + view | `nds-toc.js` |
| P2 | `nds/date-picker` | Attrs: calendar (gregorian/hijri), min/max; input binding | Save markup | `nds-date-picker.js` |
| P2 | `nds/sidemenu` | Server-rendered from assigned menu; attrs: menu id, groups, counts, toggle label | render.php | `nds-sidemenu.js`, `nds-drawer.js`, `nds-scroll-more.js` |
| P2 | `nds/digital-stamp` | Attrs: entity, domain, verifier text; inner: notices | Save markup | `nds-digitalStamp.js` |
| P3 | `nds/autocomplete`, `nds/rating`, `nds/progress`, `nds/stepper`, `nds/cooldown-button`, `nds/mega-menu` | — | — | respective `nds-*.js` |

**Conventions for every custom block:**
- `block.json` declares `viewScriptModule` (or `viewScript` with `defer`) so assets load only when the block is present — this **is** the WP-native replacement for NDS's smart loader.
- `supports`: `color`, `typography`, `spacing`, `align` where meaningful, so theme.json presets apply.
- Editor preview: `example` property + `edit` using core components so the block is authorable without knowing NDS classes.
- All strings via `wp.i18n`; RTL handled with logical CSS + `:dir()` where needed.
- A11y contract ported from the source: focus management, `aria-*`, `prefers-reduced-motion` gates.

### 3.3 Block patterns catalog

File-based patterns in `patterns/` (auto-registered; translatable via `translate` property where needed):

| Pattern slug | Purpose | Composed from |
|---|---|---|
| `nds/hero-sub` | Sub-hero: breadcrumbs + title + brief + tags + actions + share | core breadcrumbs, heading, paragraph, buttons, tags, share row |
| `nds/section-head` | Reusable section header (title + description + optional action) | heading + paragraph + buttons |
| `nds/feature-grid` | "Who It's For" style grid (icon + title + text cards) | group(grid) × cards |
| `nds/alert` (+ variants) | Notices: neutral/info/success/warning/error | group style nds-alert |
| `nds/cta-band` | Brand/gradient full-width call-to-action | group with `is-style-nds-section--gradient` + heading + buttons |
| `nds/card` | Standard card (icon/image header + title + desc + tags + actions) | group style nds-card |
| `nds/card-grid` | Responsive card grid with section head | feature-grid + card |
| `nds/faq` | FAQ list (details accordion) | core details × n |
| `nds/share` | Share dropmenu row | buttons + dropmenu data-attrs |
| `nds/cookie-popup` | Cookie consent card | card + buttons (used in template part) |
| `nds/digital-stamp` | Gov verification stamp block + modal | custom block + text |
| `nds/footer-columns` | Footer link columns + social + logos | columns + links + social icons |
| `nds/footer-bottom` | Bottom bar: links, copyright, policy | paragraph + links |
| `nds/quote`, `nds/metric`, `nds/stepper`, `nds/tags`, `nds/divider` | Content building blocks | core quote/group/separator + styles |
| `nds/template-service`, `nds/template-faq`, `nds/template-contact`, `nds/template-form`, `nds/template-kpis`, `nds/template-search`, `nds/template-help`, `nds/template-about`, `nds/template-e-participation`, `nds/template-social` | The 12 DGA page templates as full-page patterns | composed from the patterns above |
| `nds/404` | 404 content (illustration + title + back-home) | image + heading + button |

### 3.4 Icon strategy

- Port the HGI (Huge Icons) subset actually used by the theme as **inline SVGs** inside patterns (stroke-based, currentColor) — no icon font dependency.
- Keep NDS's mask-image icon technique (`--nds-icon-*` custom props) only if an icon stylesheet is needed for dynamic content; otherwise inline SVG is lighter and editor-friendly.
- Editor-side icon picker: an `nds/icon` UI component in the custom blocks' edit.js using the same SVG set.

### 3.5 Content model (docs-site features)

- Register CPT `nds_component` (title, description, category/tech/since taxonomies or meta) + CPT `nds_template`; or (lighter) store component cards as a JSON file loaded by a dynamic block. **Recommendation:** CPTs for the "Components directory" so content is editable in WP and the gallery block can Query them; pages for everything else.
- The homepage sections (Compliance/Examples/Events swipers) become **pattern instances** in `front-page.html` with their card content as editable inner blocks (Query Loop for Examples if CPT-backed).

---

## 4. Styling Implementation Plan

### 4.1 `theme.json` (single source of truth)

| NDS token layer | theme.json mapping |
|---|---|
| DGA palette (primary/secondary/tertiary/neutral/status/base) | `settings.color.palette` — register the key stops (25/50/100/200/300/400/500/600/700/800/900/950 for the 4 brand slots; full status ramps; white/black). Slugs: `primary-600`, `neutral-900`, `status-success-600`, etc. **Dark-mode-aware entries** use the CSS `light-dark()` function + `styles.css: :root { color-scheme: light dark; }` so browsers flip automatically and the editor can represent both schemes (per WP 6.6+ guidance). |
| Semantic tokens | `settings.custom` (e.g. `--wp--custom--nds--background-default`) — expose as CSS vars under `--wp--custom--*`; not palette entries (they're roles, not user-facing colors). |
| Primitives spacing (4px grid) | `settings.spacing.spacingScale` (steps 0–11 over 4px base) + `settings.spacing.spacingSizes` for named presets (xs…11xl). |
| Radius | `settings.spacing` isn't for radius; expose via `settings.custom` + block style CSS; buttons/cards/inputs get their radii from component CSS. |
| Fluid typography | `settings.typography.fluid: true`; `fontSizes` presets mirroring NDS: display-2xl…xs and text-xl…2xs with `fluid: {min, max}` matching the clamp values. |
| Fonts | `settings.typography.fontFamilies` — "IBM Plex Sans Arabic" with `fontFace` (file: woff2, weights 400/500/600/700, unicode-range subsets ported from `_fonts.scss`); "Cairo", "Readex Pro" as alternates; "OpenDyslexic" for a11y mode (loaded on demand, not in theme.json). |
| Layout | `settings.layout.contentSize: 1280px` (matches `--nds-content-MaxWidth`), `wideSize: 1600px`; `settings.layout.allowEditing` on. |
| App shell dims | `settings.custom` (`--wp--custom--nds--nav-height` 72px, `--wp--custom--nds--sidemenu-width` 260px, `--wp--custom--nds--sideinfo-width` 400px, base padding 32px). |
| Block defaults | `styles.blocks.*`: default button/card/heading/paragraph styles so content matches NDS without per-instance classes. |
| Editor parity | `styles.css` + editor-specific rules so the iframe editor shows the NDS look (import component CSS into editor styles). |

### 4.2 SCSS architecture (adapted from source)

Keep the source's proven modular layout, re-scoped to the theme:

```
assets/scss/
  _tokens/           # primitives.scss, palette.scss (DGA), semantic.scss, components.scss
                     # → mostly consumed by theme.json/custom vars; kept as the var source
  _mixins.scss       # breakpoints (mobile/tablet/desktop/large), ltr/rtl/dark mixins
  _base.scss         # reset, dividers, links, mark, scrollbar
  _grid.scss         # .nds-grid port → block-style class .is-style-nds-grid
  _section.scss      # section model + variants (as block-style classes)
  _layout/           # content-layout, flex, block
  components/        # one file per NDS component, scoped under .wp-site-nds or block classes
  _a11y.scss         # variables-a11y + panel
  _icons.scss        # mask-image icon tokens (if kept) or SVG helpers
  themes/            # dga (default), register, foundation-day, hajj (→ style variations)
assets/css/
  nds-critical.min.css   # fold: tokens, base, nav, hero, section (inlined in <head>)
  nds-main.min.css       # everything else (deferred)
  nds-editor.min.css     # editor-only rules (includes tokens + component basics)
```

- Build with `@wordpress/scripts` (`wp-scripts build` handles SCSS) or `sass` + `postcss`/autoprefixer; keep the Jekyll-era philosophy: compressed output, source maps in dev.
- Class scoping: NDS classes are global by design; in WP, scope to a wrapper class on `body` (e.g. `body.nds-theme`) to avoid clobbering admin/editor/plugin styles, **or** translate class names to block-style namespacing (`is-style-nds-card`). Pragmatic hybrid: block styles/patterns emit NDS classes, component SCSS kept as-is under the theme namespace.
- Editor styles: register via `add_editor_style`/theme.json `styles` so patterns and blocks render faithfully inside the Site Editor canvas.

### 4.3 Dark mode & theming

1. **Default:** `theme.json` `styles.css` sets `:root { color-scheme: light dark; }`; palette entries use `light-dark(#light, #dark)` so dark mode is automatic and editor-aware.
2. **Manual toggle (parity with NDS):** theme JS sets `document.documentElement.dataset.theme = 'dark'|'light'` + `style.colorScheme = 'dark'`, persisted in localStorage with a pre-paint inline guard in `wp_head` (mirrors `head-inline-scripts.html`).
3. **Brand/event re-theming:** style variations (`styles/foundation-day.json`, `styles/hajj.json`) override the palette — native WP mechanism; a small script can apply a variation on click for the "Preview" demo buttons.
4. **Reduced motion & a11y overrides:** CSS `@media (prefers-reduced-motion)` + `[data-nds-a11y]` attribute selectors, ported from `_variables-a11y.scss`.

### 4.4 Performance-oriented CSS delivery

| Asset | Loading strategy |
|---|---|
| Critical CSS (~10 KB) | Inlined in `wp_head` (read compiled file, `wp_style_engine`/`wp_add_inline_style`) — same rationale as NDS's critical bundle |
| Main CSS | Enqueued with `wp_enqueue_style`; loaded with `media="print" onload` trick or `preload` + `onload` (port of the deferred pattern), with `noscript` fallback |
| Block CSS | Per-block via `block.json` `style`/`viewScript` (only loads when block used) |
| Fonts | `font-display: swap` in `fontFace`; preload the LCP-critical subset (Arabic Regular + Bold) via `wp_enqueue_style` preload links only on the front page hero |
| Images | `fetchpriority="high"` on first hero slide (port of the LCP preload logic), `loading="lazy"` + `decoding="async"` elsewhere, `srcset`/`sizes` from core image blocks |
| Sections | `content-visibility: auto` + `contain-intrinsic-size` on `.wp-site-nds .is-style-nds-section` below the fold (port of `_section.scss` reveal logic), dropped after load |
| Icons | Inline SVG (no font request) or deferred icon CSS |

### 4.5 Responsive strategy

- Keep NDS breakpoints (599/960/1280) in `_mixins.scss`; block styles implement the responsive collapse (e.g., sidemenu hidden < 960px with toggle, grids reduce columns via container queries).
- Use container queries (`.nds-cq` port) for embedded component grids so cards reflow inside the editor canvas too.
- Test matrix: mobile ≤599, tablet 600–959, desktop 960–1279, large ≥1280; both RTL and LTR.

### 4.6 RTL

- All component CSS uses logical properties already — keep them (no RTL stylesheet needed).
- `language_attributes()` renders `lang`/`dir` per locale; `is_rtl()` used only where PHP-side decisions are needed.
- Arabic-first typography (IBM Plex Sans Arabic) is the default family; Latin subset via unicode-range — matches source.

---

## 5. Functionality Adaptation Plan

### 5.1 The loader → WordPress asset system

NDS ships a custom DOM-sweep loader that initializes only the components present. WordPress already provides this: **each block's `viewScript`/`viewScriptModule` loads only when the block renders.** The mapping:

| NDS loader tier | WP equivalent |
|---|---|
| Core (every page: mainnav, dropmenu, modal, tooltip, loader, theme) | Theme chrome script `nds-theme.min.js` enqueued globally with `defer` + `wp_localize_script` config |
| Deferred/extras (component modules) | Per-block `viewScript` (custom blocks); data-attribute behaviors in the chrome script for pattern-only components |
| Page-specific | Per-template enqueue via `wp_enqueue_scripts` conditions or block presence |

### 5.2 Module-by-module disposition (61 modules)

| Source module(s) | Disposition |
|---|---|
| `nds-core.js`, `nds-loader.js`, `nds-fontLoading.js` | **Superseded** by WP asset system + theme chrome script (keep `NDS` namespace only for shared utils, exposed via `wp_localize_script` data or a small `@wordpress/interactivity` store) |
| `nds-swiper.js` | Port → `nds/hero-slider` + `nds/swiper` view scripts (P1) |
| `nds-tabs.js`, `nds-accordion.js` | Tabs → `nds/tabs` view script; accordion → native core Details + optional tiny exclusivity enhancer |
| `nds-modal.js`, `nds-backdrop.js`, `nds-drawer.js`, `nds-panels.js`, `nds-fab.js`, `nds-dropmenu.js`, `nds-tooltip.js` | Port → theme chrome module (one `data-*`-driven controller) + `nds/modal` block view |
| `nds-mainnav.js`, `nds-sidemenu.js`, `nds-scroll-more.js` | Port → chrome module (mega-menu, drawer, mobile collapse, scroll-more) |
| `nds-breadcrumb.js` | Superseded by core Breadcrumbs block (CSS-only enhancement stays) |
| `nds-share.js`, `nds-copy.js`, `nds-rating.js` | Port → chrome module (share/copy/rating patterns) |
| `nds-filter.js`, `nds-pagination.js`, `nds-sort.js`, `nds-search-box` | Port → `nds/component-gallery` view script |
| `nds-progress.js`, `nds-stepper.js`, `nds-cooldown-button.js`, `nds-numbers.js`, `nds-chart.js`, `nds-toc.js` | Port → respective custom block view scripts (P2/P3) |
| `nds-forms.js`, `nds-customselect.js`, `nds-multiselect.js`, `nds-taginput.js`, `nds-autocomplete.js`, `nds-date-picker.js`, `nds-otp.js`, `nds-upload.js`, `nds-voice-input.js`, `nds-ipv.js`, `nds-editor.js` | Strategy per §3.1 E1/E2: NDS-styled core/plugin forms + custom blocks only where the site needs them (P2/P3); port validation logic to the form solution's client hooks |
| `nds-cookies.js`, `nds-user-feedback.js`, `nds-feedback.js`, `nds-selection.js`, `nds-link.js`, `nds-export.js`, `nds-empty.js`, `nds-alert.js` | Port → chrome module data-attribute behaviors (cookie consent, feedback widget, selection popup, external-link icon, empty state) |
| `nds-theme.js`, `nds-theme-foundation-day.js`, `nds-theme-hajj.js` | Port → theme chrome module + style variations |
| `nds-accessibility.js` | Port → chrome module (a11y panel: font scale, dyslexia, contrast, spacing) |
| `nds-digitalStamp.js`, `nds-timeDate.js`, `nds-cityWeather.js` | Port → chrome module (Hijri date/clock, digital-stamp modal, optional weather) |
| `nds-code.js`, `nds-tables.js`, `nds-showcase.js` | Port → theme CSS + small chrome enhancements (syntax highlight on `pre`, sortable tables) |
| `nds-ipv.js` etc. | Only if used |

### 5.3 Integration rules (WordPress-compatible JavaScript)

1. **No raw inline `<script>` in templates.** All behavior goes through `wp_enqueue_script` (theme/block) with `strategy: 'defer'`; tiny pre-paint guards (theme/brand stamp) are emitted via `wp_head`/`wp_add_inline_script` with static content only.
2. **No global `window` collisions** — wrap modules in IIFEs, expose `window.NDS` deliberately (namespace + version check), honor `noConflict` style guards when plugins extend.
3. **Dependencies:** declare `wp`, `wp-dom-ready` (or `wp-dom-ready` alternative — modern: `DOMContentLoaded` guard inside module), `wp-i18n`, `wp-api-fetch` where needed; never `jquery` (keep zero-dependency promise).
4. **i18n:** JS strings through `wp_set_script_translations` / `wp.i18n.__`; port the `assets/i18n/{ar,en}.json` catalogs into `languages/` pot/po files.
5. **Lifecycle:** use `wp.domReady`/`DOMContentLoaded` + `document.body` delegation for data-attribute behaviors so future-inserted blocks (e.g., via AJAX load-more) work — mirrors NDS's delegation approach.
6. **Interactivity API option:** for the most interactive blocks (hero slider, tabs, modal), consider `@wordpress/interactivity` (stable in current core) so state stays client-side declarative; fallback to plain view.js if team prefers vanilla port fidelity. Either way, behavior must degrade to static content without JS.
7. **REST/forms:** user feedback, ratings, votes, and form submissions via core REST API or `admin-post.php`, with nonce + capability checks; nothing persists client-side only (except cosmetic prefs: theme, a11y, cookies).
8. **Event packs:** enqueue variation-specific CSS/JS conditionally (e.g., when the active style variation is `hajj`).

### 5.4 Key interaction ports (detail)

- **Hero slider & swipers:** CSS scroll-snap first (as in source); JS only for nav buttons, pagination, keyboard (Arrow/Home/End), lazy-rendering of non-first slides, breakpoint-driven slides-per-view. Respect `prefers-reduced-motion` (disable autoplay — source has none by default; keep it that way).
- **Tabs:** full ARIA tabs pattern (tablist/tab/tabpanel, roving tabindex, arrow keys, orientation) — direct port of `nds-tabs.js`.
- **Modal/drawer:** focus trap, ESC close, `aria-modal`, scroll lock, backdrop click, optional portal; `hidden` attribute as default state so no-JS users never see an unusable overlay.
- **Theme/brand switcher:** localStorage keys (`nds-theme`, `nds-brand`), pre-paint guard script, `data-theme`/`data-brand` attributes consumed by CSS; brand registry from a PHP array (replaces `_data/themes.yml`) exposed via `wp_localize_script`.
- **Cookie popup:** localStorage (`nds-cookies`), accept/reject buttons, close; rendered in a template part with block hooks so it can be removed/reordered in the Site Editor.
- **A11y panel:** font-step ladder (`--user-font-scale` on `:root`), dyslexia font swap (`--nds-font-brand` override), contrast modes (CSS attribute selectors), text spacing; persisted + pre-paint guard.
- **Component gallery:** server-rendered initial page (SEO-safe) + client-side instant filtering/search/pagination over the rendered list (progressive enhancement), exactly matching source UX (search box, filter dropmenu with facets, applied-filter chips, pagination).

### 5.5 What NOT to port

- Jekyll/Liquid templating, YAML data files, Ruby plugins — replaced by WP templating + CPTs.
- The custom asset pipeline (Jekyll asset_ver, Terser plugin) — replaced by `wp-scripts` + `wp_enqueue_*` versioning (`filemtime` or `wp_get_theme()->get('Version')`).
- The digital-stamp "verify" authenticity logic (server-side gov verification) — out of scope for a theme; keep as presentational block with a link, and note the legal caveat (see §8).

---

## 6. Theme Structure Outline

### 6.1 File tree

```
nds-theme/
├── style.css                     # Theme header (Name: NDS, Text Domain: nds-theme, …)
├── readme.txt                    # Theme metadata, install notes, credits
├── screenshot.png                # 1200×900 homepage screenshot
├── theme.json                    # Global settings/styles (v3) — §4.1
├── functions.php                 # Setup, enqueues, CPTs, menus, patterns registration, i18n, RTL
├── inc/
│   ├── setup.php                 # theme supports, menus, image sizes, editor styles
│   ├── enqueue.php               # critical inline CSS, main CSS, chrome JS, fonts preload
│   ├── blocks.php                # block registration (block.json discovery), block patterns registration
│   ├── content-types.php         # CPTs nds_component / nds_template + taxonomies (category, tech, since)
│   ├── menus.php                 # nav locations (primary, actions, footer, sidemenu) + fallbacks
│   ├── a11y.php                  # skip links, body class hooks
│   └── i18n.php                  # textdomain, RTL helpers, wp_set_script_translations
├── templates/
│   ├── index.html                # fallback: header / post-content loop (Query Loop) / footer
│   ├── front-page.html           # homepage: hero slider + patterns (§1.5)
│   ├── home.html                 # posts index (NDS-styled)
│   ├── page.html                 # sub-hero + content layout (optional sidemenu) + feedback
│   ├── single.html               # article with side-info (TOC, meta)
│   ├── archive.html              # CPT/term archives (card grid)
│   ├── search.html               # NDS search results with core Search block
│   ├── 404.html                  # NDS 404 (§3.3 pattern)
│   └── (customTemplates in theme.json)
│       ├── template-service.html # service page: hero-sub + steps + service actions + related
│       ├── template-faq.html     # FAQ via core details
│       ├── template-contact.html # contact info + NDS form
│       ├── template-form.html    # form page (core Form / plugin)
│       ├── template-kpis.html    # KPI metric cards + progress
│       ├── template-help.html    # help/support: search + categories
│       ├── template-about.html   # entity intro + org chart patterns
│       ├── template-e-participation.html
│       ├── template-social.html  # social feeds pattern
│       └── template-search.html  # site search landing
├── parts/
│   ├── header.html               # topbar (part) + mainnav (part) composition
│   ├── topbar.html               # digital stamp, clock, theme/brand switcher
│   ├── mainnav.html              # brand + Navigation block + actions row
│   ├── footer.html               # footer patterns (columns, bottom)
│   ├── cookie-popup.html         # A8
│   ├── accessibility.html        # A9 FAB + panel
│   └── user-feedback.html        # A10
├── patterns/                     # §3.3 — PHP-registered or file-based patterns
│   ├── nds-hero-sub.php
│   ├── nds-feature-grid.php
│   ├── nds-alert.php
│   ├── nds-card-grid.php
│   ├── nds-cta-band.php
│   ├── nds-faq.php
│   ├── nds-share.php
│   ├── nds-cookie-popup.php
│   ├── nds-footer-columns.php
│   ├── nds-footer-bottom.php
│   └── nds-template-*.php        # 12 DGA templates
├── styles/                       # Style variations (§4.3)
│   ├── default.json              # (optional explicit light)
│   ├── dark.json                 # explicit dark palette
│   ├── foundation-day.json
│   └── hajj.json
├── assets/
│   ├── css/                      # compiled: nds-critical.min.css, nds-main.min.css, nds-editor.min.css
│   ├── scss/                     # sources (§4.2)
│   ├── fonts/                    # IBM Plex Sans Arabic (+Latin), Cairo, Readex Pro, OpenDyslexic woff2
│   ├── js/                       # nds-theme.min.js (chrome), nds-a11y.min.js, nds-cookies.min.js
│   └── img/                      # hero images, 404.svg, logos, avatar set
├── src/blocks/
│   ├── hero-slider/  block.json + edit.js + view.js + render.php
│   ├── swiper/       block.json + edit.js + view.js
│   ├── tabs/         block.json + edit.js + view.js
│   ├── modal/        block.json + edit.js + view.js
│   ├── chart/        block.json + edit.js + view.js
│   ├── toc/          block.json + edit.js + render.php
│   ├── component-gallery/ block.json + edit.js + view.js + render.php
│   ├── sidemenu/     block.json + edit.js + render.php
│   └── digital-stamp/ block.json + edit.js + view.js
├── languages/
│   ├── nds-theme.pot               # + ar.po/ar.mo, en (source)
│   └── nds-theme-js-*.json         # wp_set_script_translations outputs
├── package.json                    # wp-scripts build/bundle, sass watch
└── build/ (gitignored)             # compiled output
```

### 6.2 Template roles & key content

| Template | Purpose | Blocks used |
|---|---|---|
| `index.html` | Fallback/catch-all | header part, Query Loop (NDS card grid), pagination, footer part |
| `front-page.html` | Homepage §1.5 | hero-slider, section patterns, component-gallery, ctas, footer |
| `page.html` | Static pages | sub-hero pattern, content-layout (sidemenu optional), last-edit, user feedback |
| `single.html` | Blog/news articles | sub-hero, post-content, side-info (TOC, meta), share |
| `archive.html` | CPT/term archives | Query Loop card grid + pagination + toolbar |
| `search.html` | Search results | core Search, Query Loop on search results, pagination |
| `404.html` | Not found | NDS 404 pattern |
| customTemplates | The 12 DGA templates | pattern stacks per §3.3 |

### 6.3 Template parts & block hooks

- `header` (topbar + mainnav), `footer`, `cookie-popup`, `accessibility`, `user-feedback`.
- Use **block hooks** (WP 6.6+) to auto-insert `cookie-popup`, `accessibility`, and `user-feedback` parts after `header`/before `footer` in all templates while keeping them user-removable in the Site Editor.

### 6.4 Bilingual (AR/EN) strategy

- Theme is fully translation-ready: `load_theme_textdomain('nds-theme', …)`, all template-part/pattern strings via `__()`/`esc_html__`, `.pot` + `ar` locale files.
- Direction: `language_attributes()` emits `dir="rtl"` for Arabic; all CSS logical — no RTL stylesheet.
- Language switch UI: a nav item/language block linking to translated equivalents (compatible with Polylang/WPML); the source's demo "flip dir in place" behavior is **not** replicated (it doesn't translate content).
- JS strings: `wp_set_script_translations('nds-theme', 'nds-theme', …)` + `.json` language packs.

### 6.5 Performance & SEO checklist (parity targets)

- Inlined critical CSS; deferred main CSS; per-block JS/CSS. Target: LCP from hero image (preloaded, `fetchpriority=high`), zero layout shift (fixed dims on images), INP-safe (delegated listeners, passive scroll).
- `content-visibility` for below-fold sections.
- Schema: Organization/WebSite JSON-LD via `wp_head` (port `website-jsonld.html`); BreadcrumbList from the core Breadcrumbs block or a `wp_head` filter.
- Sitemap/robots: rely on core SEO plugins or core sitemaps; port `robots.txt` semantics.
- Accessibility: skip-to-content link, `:focus-visible` rings, ARIA from ported components, WCAG 2.1 AA test matrix (same manual suite as source; optional axe scan in CI).

---

## 7. Implementation Roadmap

### Phase 0 — Foundation (est. 1 sprint)
- Scaffold theme (`wp-scripts` + create-block structure); `style.css`, `readme.txt`, `functions.php` shell, `package.json` build pipeline.
- Port design tokens → `theme.json` (colors with `light-dark()`, fluid type presets, spacing scale, layout widths); compile critical + main SCSS from `_sass` sources scoped to the theme; set up fonts.
- Enqueue pipeline: inline critical CSS, deferred main CSS, chrome JS (defer), preloads. Validate PageSpeed on a blank page.

### Phase 1 — UI shell (1–2 sprints)
- Template parts: header (topbar + mainnav), footer; core Navigation + menu locations; mega-menu block/style; digital-stamp block; theme/brand switcher JS + pre-paint guard; cookie popup + a11y panel + user feedback via block hooks; breadcrumbs.
- Templates: `index`, `page`, `single`, `404`, `search`, `archive` with NDS layout (sidemenu on `page`).

### Phase 2 — Core blocks & patterns (2 sprints)
- P1 custom blocks: hero-slider, swiper, tabs, modal (+ view.js ports).
- Block styles for group (section/card/alert/grid), buttons, details, quote, table, code, separator, breadcrumbs.
- Pattern library (§3.3) incl. homepage sections.

### Phase 3 — Homepage & content model (1–2 sprints)
- `front-page.html` composed from patterns + hero slider + component-gallery.
- CPTs (`nds_component`, `nds_template`) + taxonomies; migrate `_data/content/*.yml` → CPT entries (or JSON-driven gallery block if lighter).

### Phase 4 — Advanced interactions (1–2 sprints)
- P2 blocks: chart, toc, sidemenu, date-picker, digital-stamp verification UI, event-pack style variations.
- Forms strategy decision (core Form vs plugin) + NDS styling + validation port.
- A11y panel full parity; RTL pass; editor experience polish (edit.js previews).

### Phase 5 — Hardening & launch
- Performance budget pass (LCP < 2.5 s on Moto G4 emulation; CLS 0; INP < 200 ms), a11y audit (axe + keyboard walkthrough), cross-browser (last 2 Chrome/FF/Safari/Edge + mobile), RTL/LTR regression, translation file audit.
- Packaging: `nds-theme.zip` via `wp-scripts build` + zip; `readme.txt` install/upgrade notes; style variations screenshot pass.

---

## 8. Decisions, Risks & Open Questions

### Legal / branding (inherited from source — must not be lost)
- The default DGA visual identity (colors, logo, digital stamp, palm-swords emblem) is **exclusive to Saudi government entities** (per source README/`index.md` disclaimer). The theme must ship with a neutral fallback brand and document the swap procedure; the DGA palette remains the default per source licensing.

### Key decisions made in this plan
1. **Patterns + block styles first; custom blocks only for irreducible interactions** (P1 set: hero-slider, swiper, tabs, modal, component-gallery).
2. **CPTs over YAML** for the docs directory; pages + patterns for everything else.
3. **`light-dark()` palette + `color-scheme`** for dark mode (editor-representable, browser-native), plus manual toggle parity.
4. **Style variations** for event packs/brands (native WP) with optional JS-driven switching.
5. **Core Details for accordions**, core Breadcrumbs, core Navigation — maximum core-block adoption.

### Open questions for the client/stakeholders
1. **Form strategy:** native core Form block (version-dependent), a forms plugin (which?), or custom `nds/form` block? This drives Phase 4 scope.
2. **Docs-site scope:** is the full documentation site (components/templates/examples directories with search/filter/pagination) in scope, or only the design system as a theme for the client's actual site? Affects CPT/gallery work.
3. **Digital stamp:** is real government verification integration required, or presentational only?
4. **Event packs:** ship Foundation Day/Hajj variations now, or later?
5. **Weather/city widget** (commented out in source topbar): include?
6. **WP version floor:** 6.6 (Breadcrumbs, block hooks) vs 6.8+ (newer features) — sets minimum required WP for install.

### Risks
- **Editor fidelity:** complex CSS (container queries, custom props) must render inside the block editor iframe; mitigate with editor styles + editor-canvas testing per component.
- **Script conflicts:** theme data-attribute behaviors must never touch elements marked `data-nds-ignore`; scope selectors under `body.nds-theme`.
- **Performance regressions from plugins:** document the budget and monitor in CI (Lighthouse CI).
- **Dark-mode editor representation:** `light-dark()` support in the editor canvas must be verified per WP version; fallback to explicit palette without `light-dark()` if canvas issues arise.

---

## 9. Appendix — Token Translation Reference (NDS var → WP preset)

| NDS CSS variable | theme.json destination |
|---|---|
| `--colors-primary-600` (#1b8354) | `settings.color.palette` slug `primary-600` (light-dark aware) |
| `--colors-primary-900` (#104631) | palette `primary-900` |
| `--colors-primary-950` (#092a1e) | palette `primary-950` |
| `--colors-secondary-600` (#dba102) | palette `secondary-600` |
| `--colors-tertiary-600` (#6d428f) | palette `tertiary-600` |
| `--colors-neutral-{25..950}` | palette `neutral-*` (subset: 50,100,200,300,400,500,600,700,800,900) |
| `--colors-blue/green/yellow/red-*` | palette `status-*` |
| `--colors-base-white/black` | palette `white`, `black` |
| `--spacing-xs…11xl` (4px grid) | `settings.spacing.spacingScale` + `spacingSizes` |
| `--typo-display-clamp-*-FS/LH` | `settings.typography.fontSizes` fluid presets |
| `--typo-text-*-FS/LH` | `settings.typography.fontSizes` (smaller presets) |
| `--nds-font-family` (IBM Plex Sans Arabic) | `settings.typography.fontFamilies[0]` + `fontFace` |
| `--nds-content-MaxWidth: 1280px` | `settings.layout.contentSize` |
| `--nds-viewport-padding: 32px` | `settings.layout` + `styles.spacing.padding` |
| `--background-*`, `--text-*`, `--border-*` (semantic) | `settings.custom` (`--wp--custom--nds--*`) |
| `--shadow-*` | `settings.custom` + block-style CSS |
| Breakpoints 599/960/1280 | SCSS mixins (unchanged) |

---

*Plan prepared from direct analysis of the `NDS-vanilla` repository (layouts, includes, SCSS token tiers, 61 JS modules, YAML data files, page templates, and homepage sections). Version references: WordPress core blocks (Details 6.3+, Breadcrumbs 6.6+, block hooks 6.6+, Interactivity API 6.5+) — verify against the target install before implementation.*
