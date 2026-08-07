# NDS Component Build Skill Guides

**Site:** NDS (National Design System) — vanilla HTML/CSS/JS implementation of Saudi Arabia's DGA design system
**Purpose:** Precise, step-by-step build guides for every major component of the site structure, with data-input questions for the implementing institution and Green Architecture / brand-identity guidance.
**Companion documents:** `ui-shell/*.md` (canonical markup), `components/*.md` (component inventories), `.claude/skills/` (build, doc, audit, and perf skills), `CLAUDE.md` (project conventions).

---

## How to read these guides

### Site structure these guides cover

| Site layer | Component guides |
|---|---|
| Main pages (home / hub) | Hero (main slider), Swiper / Card Carousels, Section & Grid, Card & Feature Grid, Alerts, Toolbar / Gallery, CTA content |
| Sub-pages (content, service, FAQ, contact, KPIs, search…) | Hero (sub), Breadcrumb, Side Menu, Side Info, Tabs, Accordion/FAQ, Forms, KPI / Progress / Stepper |
| Page chrome (every page) | Top Bar, Header / Main Navigation, Footer, Share Widget, Consent & Feedback Widgets |

### Non-negotiable build rules (from CLAUDE.md + the skills)

1. **Never guess markup.** Open the component's canonical doc page (`ui-shell/*.md` or `components/*.md`) and copy the structure verbatim — class names, nesting, `data-*` attributes, ARIA roles. The live demo + code tab are the contract.
2. **Verify every icon before writing it.** Anchored grep against `_sass/_hgiRoundedStroke.scss` (content icons) or `UI_ICONS` in `scripts/generate-icons-scss.mjs` (UI icons). Never invent an icon name.
3. **RTL-first, logical properties only.** Base styles are RTL; `@include ltr` exists only for transforms/gradients logical properties cannot express.
4. **Tokens, never raw values.** No raw hex in components. Consume semantic tokens; mint a component token only when design retunes just that component (strict bar).
5. **Everything is registered.** New pages/patterns go into `_data/sidemenu/sidemenu.yml` and the matching `_data/content/*.yml`; new docs are created with the `/nds-doc` skill; new behavior ships through the loader registry and `_js/` with lifecycle canon (`init`/`reinit`/`create`, `{ signal }` teardown, `data-nds-<name>-initialized` guards).
6. **Audit before merging.** `/nds-css-audit <file>` and `/nds-js-audit <file>` on new/changed source; `/nds-perf <path>` on any page that changes the critical path.

### The Green Architecture principle (system level)

The design as shipped is the optimal baseline. Institutional customization must **enhance, not replace**. The entire system is built on a four-tier token architecture, and that is the *only* sanctioned re-branding surface:

| Token tier | What it holds | Institutional change allowed? |
|---|---|---|
| Palette (`--colors-*`, `_sass/themes/_dga.scss` + `_register.scss`) | Raw DGA color ramps | Re-point the **brand slots only** (`primary` / `secondary` / `tertiary` / `neutral`) to your institution's palette — via a registered theme (OKLCH seed or stylesheet theme), never by editing the vendored DGA file |
| Primitives | Spacing, radii, typography, shell dims | No — dimension vocabulary stays untouched |
| Semantic | Background/text/border/icon roles | No edits needed — re-resolves automatically from the palette slots (light **and** dark) |
| Component | Per-component dials | No edits — consumers override via `--component-*` knobs only where the design genuinely calls for one element to differ |

**Proportionate application rule (the "don't repaint everything" rule):** your institutional color (say, a government blue at 600-level) should appear on the elements that *carry identity*: primary buttons, active/current indicators, links, focus rings, the digital stamp accent, progress current-step, pagination active bullet. It must **not** appear on: page backgrounds, body text, cards, neutrals, status colors (success/info/warning/error stay fixed), or large decorative surfaces. When a tint is needed (icon chips, section washes), use the 50/100 rungs of the brand ramp — never full saturation. Preserve dark-mode behavior: every accent you add must resolve in both schemes (the token system does this for you when you go through the palette slots).

**Fixed palette (never re-branded):** base white/black, alpha ramps, and all status hues.

---

## Guide 01 — Top Bar

**Component Name:** Top Bar

**1. Component Description:**
A slim utility bar above the main navigation that establishes government identity. It carries the DGA digital-stamp trigger (mandatory on Saudi government properties), up to two optional live widgets (Hijri/Gregorian date, real-time clock, city + weather), and the dark-mode toggle, which is part of the accessibility baseline and must not be removed.

**2. Build Skill Guide:**
1. Open the canonical markup: `ui-shell/topbar.md` (and `_includes/topbar.html` for the full stamp panel).
2. Build the shell: `<div class="nds-topbar nds-content-wrapper" role="region" aria-label="Top bar utilities">` containing:
   - **Digital stamp trigger** — `<button class="nds-btn nds-menu-btn nds-digitalStamp-tab" aria-expanded="false" aria-controls="nds-digitalStamp">` with `img.nds-flag` (20×14, lazy, alt = flag description), `span.nds-digitalStamp-lg-text`, `span.nds-digitalStamp-sm-text`, and `#nds-digitalStamp-verify-text` ("How you know?" link).
   - **Widget cluster** — `<div class="nds-topbar-info">` holding `#nds-date`, `#nds-realTimeClock`, `#nds-cityName` + `#nds-weatherInfo` (see data questions — **max two widgets** per DGA compliance), and the theme toggle `<button class="nds-btn nds-subtle nds-theme-toggle-wrap" data-theme-toggle aria-label="Toggle dark mode">` with a moon UI icon.
3. Add the hidden stamp panel: `<div id="nds-digitalStamp" role="region" aria-label="Digital government stamp" hidden>` with `.nds-digitalStamp-notices.nds-grid` of `.nds-digitalStamp-card` items (icon, content, heading, registration block).
4. Stamp `data-hidden` on every widget so the bar degrades deliberately on small screens (recommended: date and city `"sm md"`, clock and weather `"sm"`).
5. Verify widget icons/IDs (`#nds-date`, `#nds-realTimeClock`, `#nds-cityName`, `#nds-weatherInfo`) match what `NDS.TimeDate` / `NDS.CityWeather` initialize, and the moon icon exists in the UI-icon set.
6. Set widget data attributes: `data-calendar="hijri"` (or `gregorian`), `data-city`/`data-city-en`, `data-latitude`/`data-longitude`.
7. Run the build; verify with `/nds-perf` that the bar adds no layout shift (the critical CSS reserves 40px topbar height).

**3. Data Input & Customization Questions (for User):**
- **Digital stamp content:** What is your entity's official name, its DGA registration number, and the two verification texts (full desktop label + short tablet label)? What URL or action should "How you know?" link to?
- **Widget selection:** Which two widgets serve your audience — date + clock (time-sensitive services: appointments, deadlines), or date + city/weather (portals, citizen services)? Should the date render Hijri (Arabic audiences / Saudi government default) or Gregorian?
- **City/weather data:** If you use the weather widget, what city name (Arabic and English) and coordinates should be hard-set via `data-city` / `data-latitude` / `data-longitude` so no third-party geocode is called?
- **Responsive behavior:** At which breakpoints should each widget hide (`data-hidden`), so the digital stamp never gets crowded on phones?
- **Version/status info:** Do you display a version tag or release badge next to the widgets, and what text should it carry?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Keep the bar on its neutral surface (`--background-topbar`). The identity elements that may take your institutional color: the "How you know?" verify link (text link color) and the stamp trigger's hover/focus indicator. The stamp icon itself keeps the national-flag/neutral treatment. Do **not** colorize the whole bar, the date/clock text, or the theme toggle — these are utility elements, not identity carriers.
- **Sustainability Considerations:** The flag is an SVG (no bitmap). All three widgets are text-only spans — no images, no fonts beyond the system stack. Hijri/weather data is cached locally (24h / 15 min) to minimize API calls; hard-setting `data-city` removes the rate-limited Nominatim reverse-geocode entirely. Keep stamp copy short — truncation is a responsive behavior, not a content strategy.
- **Accessibility Notes:** `aria-label` on the region; `aria-expanded`/`aria-controls` on the stamp trigger; descriptive `alt` on the flag; theme toggle has an accessible name; `data-hidden` tokens such as `sr` keep content available to screen readers when visually hidden; the stamp panel must be keyboard-reachable and close on Escape.

---

## Guide 02 — Header / Main Navigation

**Component Name:** Header / Main Navigation

**1. Component Description:**
The site header combines the top bar and a sticky main navigation bar: brand block (logo + name + slogan), 3–8 primary links with optional single-level dropdown mega-menus, an overflow ("show more") affordance, and a secondary actions cluster (search, user, notifications, language) that persists across breakpoints as icon-only buttons. On mobile it collapses behind a hamburger toggle.

**2. Build Skill Guide:**
1. Read the canonical structure: `ui-shell/header.md` (structure tree + nav-bar markup) and `_includes/mainnav.html` (data-driven variant).
2. Build `nav.nds-main-nav.nds-content-wrapper` → `div.nds-nav-container` with:
   - `a.nds-brand` → `img.nds-brand-logo` (**explicit width/height to prevent CLS**) + `span.nds-brand-name` (+ optional `span.nds-brand-slogan`).
   - `ul.nds-nav-minimal[hidden]` with the hamburger `li.nds-mainNav-toggler` (aria-expanded/aria-controls → `#ndsNavCollapse`).
   - `div.nds-collapse#ndsNavCollapse[hidden]` → `.nds-collapse-content` → `ul.nds-nav-primary` (items: `li.nds-nav-item` → `a.nds-nav-link.nds-btn.nds-subtle.nds-indicator`), the `.nds-nav-item.nds-show-more` overflow button, and `ul.nds-nav-actions`.
3. Dropdowns: add `nds-dropdown` to a nav item and give the panel `.nds-dropdown-menu[hidden]` → `.nds-dropdown-content.nds-content-wrapper`; organize content with `nds-colView` (category columns), `nds-rowView` (flat lists), or `nds-multi-column-list` (3-column grid). **One level of nesting only.**
4. Mark behavior classes: `nds-CTA` (promoted action), `nds-icon-only` (icon button at all widths), `nds-PAB` (persists on mobile minimal bar), `data-state="current"` on the active link, `data-hidden="sm md sr"` on action labels that collapse to icons.
5. Populate the menu from `_data/mainnav/mainnav.yml` (primary_nav / actions_nav) or your CMS equivalent; keep the brand fields (logo path, width/height, name, slogan, colors) in one place.
6. Auto-init is `NDS.Mainnav` (delegated clicks; `NDS.Mainnav.init()` re-runs layout/overflow/PAB after DOM changes). No inline `onclick` anywhere.
7. Verify nav icons with the anchored icon grep; audit the file with `/nds-js-audit nds-mainnav.js` and `/nds-css-audit _sass/components/_mainnav.scss` before merge.

**3. Data Input & Customization Questions (for User):**
- **Primary navigation:** What are your 3–8 top-level items (label + destination), and which items open dropdowns vs. link directly? What is the order that matches your information architecture?
- **Dropdown content:** For each dropdown, what content columns/categories (titles + links) belong in it? Is a flat list or a categorized column layout truer to your services structure?
- **Secondary actions:** Which utility actions does your institution need — search (target URL or search endpoint), notifications (source feed), user/login (URL), language toggle (which language pairs, and their URLs)? Do any carry badges/counts (e.g., unread notifications)?
- **Brand block:** What is your entity's name, slogan (if any), and logo asset (format, dimensions)? What text should the brand name display in Arabic and English?
- **Call to action:** Is there a primary CTA that should be promoted in the nav (e.g., "Start Service", "Login"), and what is its destination?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The nav bar stays white/neutral (`--background-nav`). Identity-color elements, used sparingly: the **active link indicator** (`data-state="current"` underline), the **CTA item** (primary button), and the **hover state** of nav links. The brand name may take the text-display color (neutral, not brand color) — reserve full brand color for the CTA and the active marker. Dropdowns remain neutral surfaces.
- **Sustainability Considerations:** Brand logo as SVG or a single small webp (explicit width/height = no CLS). Icons are mask-image UI icons (no icon-font request on the critical path). Mobile collapse content is hidden via attribute, not duplicated DOM. Navigation is text — negligible weight; keep labels concise (2–3 words) for both energy and usability.
- **Accessibility Notes:** `aria-label` on the nav; hamburger `aria-expanded`/`aria-controls`; dropdown triggers announce expansion state and are keyboard-operable (single-level keeps this simple); `data-hidden="sm md sr"` keeps accessible names for icon-only buttons; `data-state="current"` orients screen-reader and sighted users; focus-visible rings must use the brand token in both light/dark.

---

## Guide 03 — Hero

**Component Name:** Hero

**1. Component Description:**
The page's entry banner, in two variants: the **sub hero** (breadcrumb + title + brief + description + optional tags/actions/share, with flat and aside modes) used on content pages, and the **main hero slider** (full-width image slides with overlay, content, and pagination) used on home/hub pages. The main hero's first-slide image is the Largest Contentful Paint element on home pages.

**2. Build Skill Guide:**
1. Read `ui-shell/hero.md` — both variants, all modifiers, and the front-matter table.
2. **Sub hero:** `section.nds-hero-section.nds-sub` → `nav.nds-breadcrumb-nav` (`ol.nds-breadcrumb`, `aria-current="page"` on the last `li`) → `div.nds-section-wrapper` → `div.nds-section-head` with, in order: float `div.nds-section-action` (share/context tools, `nds-minimal` on mobile), `h1.nds-section-title`, optional `p.nds-section-brief`, `p.nds-section-description`, optional `div.nds-section-meta` (tags + rating), then the standard `div.nds-section-action` (CTAs).
3. Sub-hero modifiers: `nds-flat` (neutral, no gradient) or `nds-aside` (narrow content to leave room for a Side Info column); background image via inline `style="--hero_image: url('…')"` (CSS mask fades it, direction-aware).
4. **Main hero:** `section.nds-hero-section` → `div.nds-swiper.nds-hero.nds-oncolor.nds-full-width` with `style="--total: N"` → `.nds-swiper-wrapper` of `.nds-swiper-slide.nds-content-wrapper` slides. First slide: `<picture>` with `<source media="(max-width: 768px)">` + `<img class="nds-hero-image" fetchpriority="high">`; later slides `hidden` with `data-src` (lazy). Each slide: `.nds-hero-image-wrapper` (`style="--overlay: …"`) + `.nds-section-body` (title, description, on-color buttons).
5. Add `.nds-swiper-navigation[hidden]` with prev/next icon buttons (`aria-label="Previous slide"` / "Next slide") and `.nds-swiper-pagination`.
6. Preload the first slide's image in `<head>` (desktop + mobile variants) — the pattern lives in `_includes/head.html`.
7. Verify with `/nds-perf` (home page must keep image-LCP, no CLS) and `/nds-css-audit _sass/components/_hero.scss`.

**3. Data Input & Customization Questions (for User):**
- **Page copy:** For each page, what is the hero title, one-sentence description, and optional brief lead-in? (Titles should be the page's own name; descriptions say what the page does for the visitor.)
- **Breadcrumb trail:** What is the correct breadcrumb path (root → section → current) for each page, in Arabic and English, with the right links?
- **Hero imagery:** Which background image per page/entity — with a clear subject on the start edge (right in RTL, left in LTR)? Do you have a mobile-cropped variant (≤768px), and what overlay value (0.4–0.8) fits the image's brightness?
- **Actions:** Which CTAs does this page need (label + URL), and should the share dropmenu appear (or be suppressed with `hide_share_page`)? Any meta tags (category, status, "since vX.Y") to display?
- **Slider (home only):** Which slides (image + title + description + CTA) belong in the home hero, and in what order? Keep to 2–4 slides.

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The sub hero's deep brand surface (or brand gradient) *is* the identity statement — your institutional palette slot re-resolves it automatically, so no per-element work is needed. Proportionate accents: the **primary CTA button** and the **share trigger hover** carry the brand color; the breadcrumb current item stays neutral. On the main slider, the overlay uses the brand 950 tone (`--img-overlay-color`) — keep it, and let white on-color text carry the contrast. Do not add extra colored shapes over hero imagery.
- **Sustainability Considerations:** webp/avif hero images with a dedicated mobile crop via `<source media>`; `fetchpriority="high"` on the **first slide only**; `data-src` lazy-loads later slides (and non-first card carousel slides); no autoplay, no video backgrounds (energy + bandwidth); concise hero copy (title ≤ 12 words, description ≤ 25 words) keeps the LCP text small and fast.
- **Accessibility Notes:** Background images are decorative → `alt=""`; all real content (headings, CTAs) lives in markup, never baked into the image. On-color text must hold WCAG AA on the overlay at every slide's `--overlay` value. Slider controls are labeled buttons; the slider respects `prefers-reduced-motion` (no autoplay by design) and supports keyboard/`Home`/`End` navigation.

---

## Guide 04 — Breadcrumb

**Component Name:** Breadcrumb

**1. Component Description:**
A location path rendered inside the sub hero (and available as a standalone element) that shows the page's position in the site hierarchy, with the current page marked and `aria-current="page"`. It is the primary orientation aid for deep sub-pages.

**2. Build Skill Guide:**
1. Read the pattern in `ui-shell/hero.md` (sub-hero breadcrumb block) and `_includes/breadcrumb-jsonld.html` (schema).
2. Markup: `<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">` → `<ol class="nds-breadcrumb">` with `<li><a>` for each ancestor (root label "الرئيسية" / "Home") and the final `<li class="nds-truncate" aria-current="page">` for the current title.
3. Drive the trail from page metadata (front matter `breadcrumb` array or CMS equivalent) so every page's path is declared once.
4. Emit BreadcrumbList JSON-LD alongside (via `_includes/breadcrumb-jsonld.html`) for search engines.
5. Long current titles truncate (`.nds-truncate`) — no manual shortening.

**3. Data Input & Customization Questions (for User):**
- **Trail definition:** For each section of your site, what is the canonical path (e.g., Home → Services → Service Page)? Which pages are section roots?
- **Labels:** What are the Arabic and English labels for each level (including your institution's root/home label)?
- **Root behavior:** Should the home link point to your portal root, and should it be omitted on any page type (e.g., marketing landing pages)?
- **Dynamic contexts:** For dynamic pages (service detail, search results, user dashboards), how is the trail derived — from the content type, category, or a manually set parent?
- **Information messages:** Is there a "you are here" convention (e.g., current item styling) your institution wants preserved from the design, or is the default sufficient?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Links in the trail may use the institutional link color — links are identity elements and the trail is one of the few places a colored inline link is proportionate. The current page stays neutral text. Do not color the breadcrumb background or separators.
- **Sustainability Considerations:** Pure text — zero asset weight. Concise level labels (1–2 words) keep the trail short and the DOM light; `nds-truncate` handles overflow without extra content.
- **Accessibility Notes:** `aria-label="Breadcrumb"` on the nav; `aria-current="page"` on the current item; proper `ol`/`li` semantics for screen readers; link text must describe the destination (never "click here"); JSON-LD mirrors the visible trail.

---

## Guide 05 — Side Menu

**Component Name:** Side Menu

**1. Component Description:**
A persistent sidebar for section-level navigation on hierarchical sites (documentation, admin consoles, multi-step workflows). It supports flat links, collapsible accordion groups up to three levels, active-page tracking, and two responsive modes: a slide-in drawer (default) and a top dropdown bar (`nds-top`) for short lists.

**2. Build Skill Guide:**
1. Read the canonical structure and markup in `ui-shell/sidemenu.md`.
2. Wrap with the content layout: `.nds-content-layout.nds-wSideMenu` → `aside.nds-sidemenu` + `.nds-main-content` (hide entirely with `sidemenu_mode: false`; choose `nds-top` mode via `sidemenu_mode: top`).
3. Build `aside.nds-sidemenu` → `button.nds-sidemenu-toggle.nds-btn.nds-peek` (aria-label, hidden on desktop) → `nav.nds-drawer.nds-divided.nds-full-height` → `div.nds-scroll-more.nds-divided` → `ul.nds-drawer-list.nds-scroll-more-content`.
4. Items: flat `<li data-state="active">` → `a.nds-btn.nds-subtle.nds-indicator`; accordion group `<li>` → `<button aria-expanded="false">` (label + optional `span.nds-tag` count) → nested `<ul>`; third level via `li.nds-drawer-group` inside a submenu. End with the `nds-show-more` overflow button.
5. Mark the current page: `data-state="active"` on its `<li>` — parent accordion groups auto-expand on init (`NDS.Drawer`).
6. Data source: `_data/sidemenu/sidemenu.yml` (or CMS nav) mirroring the site tree; keep it in sync with the main nav's section roots.
7. `NDS.Sidemenu.init()` auto-runs; call again after injecting new markup. The toggle uses `NDS.Backdrop` (body scroll unlocked in slider mode, locked in top mode).

**3. Data Input & Customization Questions (for User):**
- **Site tree:** What is your section-level hierarchy (2–3 levels)? Which branches justify accordion grouping vs. flat links, and what are the group labels?
- **Counts:** Which groups should display item counts (e.g., "Components (85)") and where do the numbers come from (static or computed from the content source)?
- **Mode choice:** Do your navigation lists exceed ~10 items (→ slider mode) or stay short with a need for full-width mobile content (→ `nds-top` mode)?
- **Page exclusions:** Which pages should suppress the side menu entirely (landing pages, full-width dashboards) — how is that decision encoded per page?
- **Current-page data:** How is the active page detected (URL match, page metadata) so `data-state="active"` is always correct, including on dynamic pages?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The drawer stays on its neutral surface. Identity elements: the **active item indicator** (thin marker/background tint at brand-50/100, not full saturation) and the **hover state**. Count tags stay gray. `nds-cardView` rounding and `nds-divided` separators are structural, not identity — leave them neutral.
- **Sustainability Considerations:** Navigation is text-only — negligible weight. No images, no fonts beyond the stack. The scroll-more affordance is CSS/JS-on-demand; off-screen menu content isn't rendered until the drawer opens (deferred bundle). Keep labels to 1–3 words.
- **Accessibility Notes:** `aria-label` on the aside and nav; accordion buttons carry `aria-expanded` (managed by JS); `data-state="active"` orients screen-reader users; the mobile toggle is a labeled button with Escape/outside-click/backdrop close; focus moves into the opened drawer; sticky/fixed positioning never traps keyboard focus.

---

## Guide 06 — Side Info

**Component Name:** Side Info

**1. Component Description:**
A companion column beside the main article for supporting context that should stay visible while reading: service metadata (fee, duration, beneficiaries), a table of contents, progress/steppers, or quick actions. It collapses to a full-width block below 960px, with optional sticky behavior and hero-aside alignment.

**2. Build Skill Guide:**
1. Read `ui-shell/sideinfo.md` (structure, standard demo, sizes, modifiers).
2. Structure: within a section body, a flex row of `.nds-info-content` (the article) + `aside.nds-sideinfo.nds-sticky.nds-card` (add `nds-stroke`/`nds-shadow` to separate it).
3. Choose a size: `nds-sm` (200px — nav rails, link lists, TOC), `nds-md` (300px — moderate content), `nds-lg` (400px, default — rich cards, steppers).
4. Modifiers: `nds-sticky` (pins beside the article; auto-disables when taller than the viewport), `nds-top` (above article on mobile — progress trackers), `nds-reverse` (flip to the inline-start side).
5. Hero alignment: set `hero_style: "nds-aside"` on the page so the column lifts into the hero's reserved slot; `NDS.Sideinfo` computes `--nds-sideinfo-top` automatically.
6. Populate with companion content: `dl.nds-definition-list` (label/value pairs with leading icons), a TOC block, or a stepper — never long paragraphs.
7. JS: `NDS.Sideinfo.init()` auto-runs on DOMContentLoaded; `reinit()` after DOM changes; `create(aside)` for single instances.

**3. Data Input & Customization Questions (for User):**
- **Companion content:** What context genuinely supports your article pages — service metadata (fee, duration, beneficiaries), a table of contents, step progress, or emergency contact info? (Nothing unrelated: no ads, no cross-promotion.)
- **Data values:** For each metadata row, what is the label and its authoritative value (e.g., fee "Free" / "SAR 50", duration "Immediately" / "5 working days"), and from which system does it come?
- **TOC:** If the column hosts a table of contents, from which headings should it generate (level range, heading IDs)?
- **Size & behavior:** Which size fits your content (link list → sm/md; rich card → lg)? Should it be sticky, and should it move above the article on mobile (`nds-top`)?
- **Hero alignment:** Which pages should use the hero-aside alignment (the card represents the whole page's context — service details, contact card) vs. article-scoped placement?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The card stays white with `nds-stroke`/`nds-shadow` (its separation is structural). Identity elements: **definition-list icons** and the **current TOC/progress step** may take the institutional color; values and labels stay neutral. The column is a context carrier, not an identity banner.
- **Sustainability Considerations:** Text-only, icon-font-free (UI icons via mask or inline SVG). Definition lists keep rows to one line. Sticky positioning is CSS — no continuous scroll listeners (positioning recalculations are pooled via `NDS.onElementResize`/`NDS.onResize`).
- **Accessibility Notes:** `aria-label="Side information"` on the aside; definition-list semantics (`dl`/`dt`/`dd`); sticky auto-disable when taller than the viewport so content is never unreachable; TOC links have descriptive text and visible focus; the flex row stacks predictably below 960px.

---

## Guide 07 — Footer

**Component Name:** Footer

**1. Component Description:**
The site-wide footer: up to six link columns, a merged social + mobile-app icons column, a divider, and a bottom bar with general links, legal block (copyright + policy links), and a partner/government logo strip. It provides secondary navigation and legal grounding on every page.

**2. Build Skill Guide:**
1. Read `ui-shell/footer.md` (structure tree + column, social, apps, and bottom-bar demos) and `_includes/footer.html` (data-driven rendering).
2. Build `footer.nds-footer.nds-content-wrapper` (`role="contentinfo"`, `aria-label="Site Footer"`) → `nav.nds-footer-content` (`aria-label="Footer navigation"`):
   - **Link columns** — `div.nds-footer-column` → `span.nds-footer-heading` + `ul.nds-footer-list` → `li > a.nds-link.nds-footer-link` (+ optional leading `i.nds-icon` for contact rows). Max 6 columns.
   - **Merged icons column** — `div.nds-footer-column.nds-footer-icons` with `div.nds-footer-icon-group`s: social `a.nds-btn.nds-secondary-outline.nds-icon-only` (target `_blank`, `rel="noopener noreferrer"`, aria-label) and app-store links as `nds-btn.nds-secondary-outline.nds-xl.nds-icon-only` containing **inline SVG brand marks** (Apple/Google Play/Huawei — never icon fonts).
3. Add `hr.nds-divider.nds-lg`, then `div.nds-footer-bottom` → `div.nds-footer-meta` (`.nds-footer-links` top row, `.nds-footer-legal` → `.nds-footer-copyright` + `.nds-footer-policy`) + `div.nds-footer-logos` (linked `img` with explicit width/height, `nds-oncolor` on logos that must invert on dark).
4. Variant: add `nds-brand` to the footer element for the dark-green surface with white text — the component rewires button/link/divider tokens to on-color equivalents automatically.
5. Data source: `_data/footer/footer.yml` (columns, social, apps, bottom links, logos).
6. Always include minimum legal links: privacy policy, terms and conditions, accessibility statement (government compliance).

**3. Data Input & Customization Questions (for User):**
- **Link columns:** Which 4–6 groups of secondary links belong in the footer (e.g., Main Links, Services, Contact & Support)? Provide each heading and its links (label + URL). Do not duplicate primary-nav items.
- **Contact data:** What are your official address, phone (with `tel:` link), and email (with `mailto:`)? Which leading icons accompany them?
- **Social & apps:** Which social profiles (URLs) and which app stores does your institution publish on? Provide the app-store URLs and confirm the inline SVG brand marks (Apple, Google Play, Huawei) match.
- **Legal & policy:** What is the exact copyright line (entity name + year), and which policy/terms/accessibility links belong in the bottom bar?
- **Partner logos:** Which partner/government logo images (file, alt text, dimensions) belong in the logo strip, and which must invert to white on dark backgrounds (`nds-oncolor`)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The footer is a low-key identity surface. Keep the default light-neutral (dark-mode aware) or the `nds-brand` deep-surface variant as shipped. Proportionate accents: **link hover color** and **social icon hover** may use the institutional color; the heading, body links, and legal text stay neutral (or on-color white in the brand variant). Partner logos keep their original colors unless the dark surface requires inversion.
- **Sustainability Considerations:** SVG logos and inline-SVG brand marks (no bitmap icons, no icon-font payload). Partner logos compressed and served with explicit dimensions (no CLS). Columns are text links — negligible weight. External links use `noopener` (security = no tabnabbing, no extra cost).
- **Accessibility Notes:** `role="contentinfo"` + `aria-label`; social/app links carry descriptive `aria-label`s; logo images have `alt` text; external-link affordance is visible; brand-variant text holds AA contrast on the deep surface; heading/`ul` semantics preserved for screen readers.

---

## Guide 08 — Section & Grid (Page Composition)

**Component Name:** Section & Grid

**1. Component Description:**
The page-composition model: every content region is a `section` with a wrapper, an optional head (title/description/actions) and a body, plus visual variants; a responsive grid with per-breakpoint column counts lays out cards and features inside. This is the layer that gives every page its rhythm.

**2. Build Skill Guide:**
1. Read `layout/section.md` (required before creating content, per CLAUDE.md) and the grid patterns in `index.md`/`layout/grid.md`.
2. Section: `section.nds-content-section` → `div.nds-section-wrapper` → `div.nds-section-head` (`h2.nds-section-title` + `p.nds-section-description` + optional `div.nds-section-action`) → `div.nds-section-body`.
3. Visual variants (choose deliberately, ~one dark surface per page): `nds-primary` (deep brand surface), `nds-gradient-primary` (brand gradient), `nds-brand` (light brand tint — "Get Started"-style closing sections), `nds-neutral` (near-black), `nds-ghost`/`nds-noBg`.
4. Grid: `.nds-grid` with inline knobs `--max-col: N; --mid-col: N; --min-col: N` (e.g., 3/2/1 for feature grids); nested grids inside grid cells work automatically. Add `.nds-cq` on a container to opt into container-query reflow.
5. Keep headings hierarchical (one `h1` per page in the hero; sections start at `h2`).
6. The section system already gates off-screen sections with `content-visibility` — do not add manual reveal scripts.

**3. Data Input & Customization Questions (for User):**
- **Page structure:** What sections make up each page type (introduction, feature grid, compliance, gallery, CTA), and in what order? What heading + description does each section head carry?
- **Grid content:** Which content blocks belong in grids, and how many columns should they span on desktop/tablet/mobile (e.g., 4 cards → 4/2/1)?
- **Section variants:** Which sections warrant the brand/gradient treatment (typically the closing CTA band) vs. plain white or tinted surfaces — based on content weight, not decoration?
- **Data sources:** Do any sections pull dynamic content (service lists, KPIs, team members) from a backend or CMS, and what is the item schema (title, description, icon, link)?
- **Empty states:** What copy should a section/grid show when its data source is empty (e.g., "No services available yet")?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** This is where proportionate identity is decided at page level: **one** deep brand surface per page (the final CTA band), light brand tints for secondary emphasis, plain neutrals everywhere else. The section title color and the accent action button may carry the institutional color; body text and descriptions stay neutral. Do not make every other section brand-colored — the contrast between one brand moment and quiet neutrals *is* the design.
- **Sustainability Considerations:** `content-visibility` keeps off-screen sections cheap; no background imagery unless content demands it; section copy kept tight (title ≤ 8 words, description ≤ 20 words); grids reuse the same card markup (no duplicated DOM).
- **Accessibility Notes:** Proper heading hierarchy per page; landmark semantics (`main`, `nav`, `contentinfo`) intact; brand-variant sections must hold AA contrast for on-color text (the token system re-resolves it); grid items remain keyboard-navigable in DOM order.

---

## Guide 09 — Card & Feature Grid

**Component Name:** Card & Feature Grid

**1. Component Description:**
The workhorse content unit: a card with an optional image or featured icon header, title, one-line description, tags, and action buttons; arranged in responsive grids. A feature-grid variant (icon + title + description, via the definition-list pattern) is used for "who it's for" / capability lists.

**2. Build Skill Guide:**
1. Read `components/cards.md` (canonical card markup + builder demos) and the feature-grid usage in `index.md` ("Who It's For", "Architecture & Performance").
2. Card: `div.nds-card.nds-stroke.nds-shadow` → header (`.nds-card-header` with `.nds-card-image` or `.nds-card-featured-icon` → `span.nds-featured-icon.nds-circle.nds-xl` + icon) → `.nds-card-content` → `.nds-card-text` (`span.nds-card-title` + `p.nds-card-description`) + `.nds-card-tags` (`span.nds-tag.nds-blue.nds-sm`, gray tags) → `.nds-card-actions` (primary/secondary buttons).
3. Feature item: `.nds-definition-item.nds-card.nds-shadow` → `span.nds-item-title` (icon + label) + `p.nds-item-desc`; group in `.nds-definition-list.nds-divided.nds-grid` with the shared `.nds-doc-features` modifier for docs pages (or explicit `--max-col` knobs elsewhere).
4. Icons: verify every name with the anchored grep; feature icons are content icons (`hgi hgi-stroke hgi-*`); decorative icons `aria-hidden="true"`.
5. Images: webp/avif, explicit width/height, `loading="lazy"` (they are never LCP), descriptive `alt`.
6. Register card collections in `_data/content/*.yml` so they render on their landing grids.

**3. Data Input & Customization Questions (for User):**
- **Card content:** For each card, what is the title, one-line description, and destination link (or "View Docs"/"View Page" action)? What icon represents it (from the verified HGI set)?
- **Tags:** Which category/status tags does each card carry (e.g., "Components", "HTML+CSS+JS", "v1.0")? Are tags data-driven from the content source?
- **Imagery:** Which cards need images vs. icon headers? Provide the image files (webp preferred), alt text, and aspect/dimensions — images should add meaning, not decoration.
- **Grid composition:** How many cards per grid and per row at each breakpoint? Is the grid populated from a CMS/API (then what is the item schema) or static?
- **Empty/edge states:** What should a card show when data is missing (no image, no description) — graceful fallbacks without placeholder lorem?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Cards stay white with stroke/shadow (their separation is structural). Identity elements: the **featured-icon circle** may take a brand tint (background brand-50/100 with the brand-600 icon — a wash, not full saturation) and the **primary action button** on the most important card. The title, description, tags, and secondary buttons remain neutral.
- **Sustainability Considerations:** Lazy-loaded, compressed images with fixed dimensions (no CLS); SVG icons (no bitmap glyphs); one-line descriptions keep cards short and the DOM light; card grids reuse shared markup; pagination (see Guide 13) prevents rendering hundreds of cards at once.
- **Accessibility Notes:** `alt` text on every meaningful image; link/button text describes the destination; tag text must not be the sole carrier of meaning (cards remain understandable without tags); focus-visible rings on interactive card elements; heading semantics inside cards start at `h3` (below the section `h2`).

---

## Guide 10 — Alerts / Notices

**Component Name:** Alerts / Notices

**1. Component Description:**
Contextual message banners (neutral, info, success, warning, error) used for disclaimers, important notices, and status feedback. The status color carries the meaning; the card keeps the rest neutral.

**2. Build Skill Guide:**
1. Read `components/alert.md` (the base standard for all demo patterns — also the reference for doc-page skeletons).
2. Markup: `div.nds-alert.nds-card.nds-inline.nds-block` with `data-status="neutral|info|success|warning|error"` → `span.nds-feedback.nds-alert-icon` (icon slot, `aria-hidden`) → `div.nds-alert-content` → `div.nds-alert-text` (`span.nds-alert-title` + `p.nds-alert-description`) + optional `div.nds-alert-actions` (links/buttons).
3. Choose status by meaning, not decoration: neutral for context, warning for caution, error for blockers, success for confirmations, info for guidance.
4. Icon slot: the component's CSS supplies the status icon — do not hand-pick per-instance icons.
5. For dynamic feedback (form errors, save confirmations), the alert should be announced: `role="alert"` for errors, `role="status"` (or `aria-live="polite"`) for success.
6. Audit the SCSS with `/nds-css-audit _sass/components/_alert.scss` (it sits in the status-colored cluster with cards/chips/toasts — cross-component reach matters).

**3. Data Input & Customization Questions (for User):**
- **Message copy:** For each notice, what is the title and one-two sentence description? (e.g., the DGA identity disclaimer, cookie explanation, service-status notices.)
- **Placement:** On which pages/sections does each alert appear, and is it persistent content or triggered by an event (form error, API failure)?
- **Actions:** Which alerts carry an action link (e.g., "Theming guide", "Learn more"), and to which destination?
- **Dynamic sources:** Do any alerts reflect live data (service outages, version updates)? What is the data source and refresh policy?
- **Tone guidance:** What messaging tone does your institution require for warnings/errors (direct and specific vs. softened), and who approves the copy?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Status colors are **fixed** — never recolor the alert stripe/icon to the institutional brand (a blue "error" would be a usability defect). The only brand element: the action link inside the alert, if one exists. The card body stays neutral.
- **Sustainability Considerations:** Text-only, no imagery. Concise copy (title ≤ 6 words, description ≤ 2 sentences) keeps weight near zero and the message scannable. Static alerts are server-rendered; dynamic alerts reuse the same markup without duplication.
- **Accessibility Notes:** `role="alert"` / `aria-live` only where the alert appears dynamically (static alerts need neither); icon is `aria-hidden` (the status is in the text); status color is never the sole differentiator — titles/text carry the meaning; AA contrast for status text on its tinted background (the token system's status ramps are tuned for this).

---

## Guide 11 — Swiper / Card Carousels

**Component Name:** Swiper / Card Carousels

**1. Component Description:**
A scroll-snap-first carousel for card collections (templates, examples, event themes) that shows a configurable number of slides per breakpoint with optional "peek" of the next slide, prev/next controls, and pagination. It is also the engine behind the main hero slider (Guide 03).

**2. Build Skill Guide:**
1. Read `components/swiper.md` (markup, attributes) and see usage in `index.md` (Compliance Ready / Real-World Examples / Event Themes sections).
2. Markup: `div.nds-swiper` with `slides-max="3" slides-mid="2" slides-min="1" peek="40"` (per content type) → `.nds-swiper-wrapper` of `.nds-swiper-slide` (each holding a card from Guide 09) → `.nds-swiper-navigation[hidden]` with `.nds-swiper-buttons` (`button.nds-btn.nds-primary.nds-icon-only.nds-circle.nds-md.nds-prev` / `.nds-next`, aria-labels) + `.nds-swiper-pagination`.
3. The component is CSS scroll-snap first: with JS deleted, slides still scroll; JS adds nav/pagination/keyboard sync. `NDS.Swiper` auto-initializes when `.nds-swiper` is present — no manual wiring.
4. Lazy content: images inside non-first slides use `data-src` so they load only when the slide is about to appear.
5. No autoplay (energy + accessibility). If an institution insists, it must pause on hover/focus and respect `prefers-reduced-motion`.

**3. Data Input & Customization Questions (for User):**
- **Slide items:** Which content items belong in each carousel (templates, examples, events)? Provide per-slide card data (title, description, icon/image, tags, action links) from your content source.
- **Per-view configuration:** How many slides per view on desktop/tablet/mobile and what peek value suits each content type (cards with long titles may want 2/2/1 with less peek)?
- **Imagery:** Which slides carry images vs. icon headers? Provide webp files, alt text, and dimensions (400×200-class thumbnails).
- **Ordering:** What order do slides follow (manual, alphabetical, newest-first), and is it data-driven?
- **Empty state:** What does the carousel show when fewer items exist than one view (it should degrade gracefully, not duplicate items)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Slides are plain cards (Guide 09's rules apply). The carousel chrome is the identity surface, used sparingly: the **prev/next circular buttons** (primary buttons) and the **active pagination bullet** may take the institutional color; inactive bullets and the track stay neutral.
- **Sustainability Considerations:** Scroll-snap CSS does the heavy lifting — JS only syncs controls, keeping the bundle small and the interaction cheap. `data-src` lazy-loads off-view slides; images are compressed webps with fixed dimensions (no CLS); no autoplay (saves bandwidth, battery, and CPU on low-end devices).
- **Accessibility Notes:** Labeled prev/next buttons; keyboard support (arrows, Home/End) with focus containment while a slide has focus; pagination reflects current position; `prefers-reduced-motion` disables any animation; slides remain reachable and scrollable without JS (progressive enhancement).

---

## Guide 12 — Tabs & Accordion (FAQ)

**Component Name:** Tabs & Accordion (FAQ)

**1. Component Description:**
Two content-organization components: tabs switch between panels of related content (ARIA tabs pattern with keyboard navigation), and the accordion expands/collapses sections (used for FAQs and grouped content). Both keep content present in the DOM and accessible.

**2. Build Skill Guide:**
1. Read `components/tabs.md` and `components/accordion.md` for canonical markup (the doc pages themselves are built with these — see `ui-shell/head.md` or any component page for the tab skeleton).
2. **Tabs:** `div.nds-tabs` → `.nds-tab-list-container.nds-scroll-more` → `nav.nds-tab-list[role="tablist"]` of `button.nds-btn.nds-subtle.nds-tab[role="tab"]` (`aria-selected`, `aria-controls`, `id`) → `.nds-tab-content` of `.nds-tab-panel[role="tabpanel"]` (`id`, `aria-labelledby`, `hidden` on inactive). Use the documented ID pattern: `tab-{component}-{n}` / `panel-{component}-{n}`.
3. **Accordion (FAQ):** use the NDS accordion component; server-render any default-open state (`data-state="open"` on both the toggle and the collapse) so first paint is correct with JS deferred — no CLS.
4. Structure content semantically: each FAQ item = question (button/summary) + answer (panel); group related questions; optional search within FAQ lists.
5. Keyboard: tabs support arrow-key roving + Home/End; accordion toggles are buttons with `aria-expanded`.

**3. Data Input & Customization Questions (for User):**
- **Content inventory:** What are your FAQ question/answer pairs (or tab panels) and their categories? Provide the authoritative copy — answers concise (≤ 3 sentences) and current.
- **Organization:** Which items group under which tab/category? Is grouping by audience, topic, or service type — what fits your information architecture?
- **Default state:** Should any accordion group start open (e.g., the most common question) or all collapsed? Which tab is default-active?
- **Dynamic content:** Do FAQs come from a CMS/knowledge base? What is the item schema and update cadence?
- **Actions:** Do any answers need related links ("Apply", "More details") and to where?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Identity elements: the **active tab underline/indicator** and the **accordion open-state indicator** (chevron or bar) take the institutional color; inactive tabs and collapsed items stay neutral. Do not color all tab labels or answers.
- **Sustainability Considerations:** Text-only, zero media weight. The accordion uses native expand/collapse primitives (no animation libraries; reduced-motion respected). Deferred JS: tabs/accordion behavior ships in the delegated bundle and initializes only when the component is present. Concise answers keep the DOM light.
- **Accessibility Notes:** Full ARIA tabs pattern (tablist/tab/tabpanel, `aria-selected`, keyboard roving, `aria-controls`); accordion buttons have `aria-expanded` and the panel is programmatically associated; content remains readable without JS (panels/answers in DOM, hidden only when JS is available); heading structure preserved (question text as `h3`-level within the section `h2`).

---

## Guide 13 — Toolbar / Gallery (Search + Filter + Pagination)

**Component Name:** Toolbar / Gallery (Search + Filter + Pagination)

**1. Component Description:**
The discovery surface for item directories (components, templates, examples): a search box, a filter dropmenu with facet checkboxes, applied-filter chips, a paged grid, and pagination. Content is server-rendered; search/filter/pagination operate client-side over the rendered list — fast, accessible, and SEO-safe.

**2. Build Skill Guide:**
1. See the canonical composition in `index.md` §Components (toolbar → search box → filter → applied chips → `#components_list` grid → pagination).
2. Toolbar: `div.nds-toolbar` containing:
   - `div.nds-form-container.nds-search-box` with `data-filter-target="{list_id}"` → `div.nds-search-content` → `div.nds-form-control` (search icon + `input.nds-search-input` + clear button in `.nds-form-action`) + `button.nds-btn.nds-primary.nds-search-btn`.
   - `div.nds-dropmenu.nds-filter` (same `data-filter-target`) → trigger `nds-btn.nds-neutral.nds-menu-btn.nds-filter-btn.nds-dropmenu-trigger` → menu with facet containers `[data-filter="category"]` (checkbox facets, `data-filter-legend`), divider, `[data-filter="tech"]`, footer with Reset (`data-filter-action="clear"`) / Apply (`data-filter-action="apply"`).
   - `div.nds-filter-applied[hidden]` → label + `div.nds-chips`.
3. Grid: `div#components_list.nds-paged-content.nds-grid` with `style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;"` of `.nds-page-item` cards; tag spans carry `data-filter="category|tech|since"` facet values.
4. Pagination: `nav.nds-pagination[data-auto-pagination="{list_id}"]` — empty nav reserves height in main CSS until `data-paged-initialized` (no CLS).
5. Data: item catalog in `_data/content/*.yml` (or a CPT in the WordPress port) — title, description, icon, category, tech tags, since/version, url.
6. Behavior (filter/search/pagination) ships via the delegated bundle (`nds-filter.js`, `nds-pagination.js`, `nds-sort.js`) — audited with `/nds-js-audit` (JSA-01's visible-control and pre-activated-path tradeoffs apply here by design).

**3. Data Input & Customization Questions (for User):**
- **Item catalog:** What is the full item list for the directory (title, one-line description, url)? What is the authoritative source (YAML, CMS, API)?
- **Facets:** Which filter facets serve your catalog (category, technology, version/date)? What are the exact facet values per item (these power the checkboxes and chips)?
- **Per-page & ordering:** How many items per page (e.g., 6/9/12), and what default sort (alphabetical, newest)?
- **Search behavior:** What fields should search match (title, description, tags)? Any synonyms or Arabic/English cross-matching needs?
- **Empty states:** What copy and recovery action show when a search/filter combination returns zero results?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The toolbar is a utility surface — neutral search input and filter trigger. Identity elements: the **primary Search button** and **Apply/Reset emphasis** (primary/secondary buttons). Applied-filter chips and the active pagination page may take the brand tint; the grid cards follow Guide 09.
- **Sustainability Considerations:** Server-rendered first page (no blank-load flash, no extra requests); client-side filtering over the already-rendered list (zero network cost per filter change); pagination caps DOM at one page of items (memory-friendly); results are text + tiny SVG icons — negligible weight.
- **Accessibility Notes:** Search input has an associated label; filter trigger announces expansion (`aria-expanded`) and the menu is keyboard-navigable; applied-filter chips are announced (live region) and individually removable; pagination is a labeled nav with `aria-current` on the active page; empty-state results are announced.

---

## Guide 14 — Forms / Contact

**Component Name:** Forms / Contact

**1. Component Description:**
Data-entry surfaces (contact, service applications, feedback) built from NDS form controls with client-side validation and clear success/error feedback. The component handles field structure, validation messaging, and submission state — integration (email, API, CRM) is the institution's data decision.

**2. Build Skill Guide:**
1. Read `components/forms.md` for canonical control markup (`.nds-form-container`, `.nds-form-control`, inputs/selects with labels and hints) and the validation API (`NDS.Forms.validateForm`).
2. Structure each field: label (visually associated via `for`/`id`), control, optional hint (`aria-describedby`), and error message slot.
3. Group related fields; choose layout (single column default; two-column only where data pairs naturally — name fields, dates).
4. Wire validation: required markers, expected formats (email, phone, national ID), length limits; server-side validation is mandatory regardless of client checks.
5. Submission state: disable the submit button and show progress during submit; surface success (role="status") or errors (role="alert" + focus the first invalid field).
6. Add a honeypot or equivalent anti-spam measure; privacy notice next to the submit action.
7. Audit with `/nds-js-audit nds-forms.js` (it is contract-critical — JSD-08 sibling-guards and JSA tradeoffs apply; no marginal changes).

**3. Data Input & Customization Questions (for User):**
- **Field inventory:** Which fields does your form need (name, email, phone, subject, message, entity type…)? For each: label, required/optional, and expected format.
- **Validation rules:** What are the precise rules — email regex, phone pattern (e.g., Saudi `05xxxxxxxx` or +966), ID format, message length limits (min/max characters)?
- **Destination:** Where do submissions go (email inbox, CRM, government service API)? What is the success behavior (confirmation page, success alert, email receipt)?
- **Placeholder/hint copy:** What hint text clarifies each field (e.g., "Format: 05XXXXXXXX")? What are the exact required-field and error messages in Arabic and English?
- **Compliance messaging:** What privacy/consent statement accompanies the form, and does your institution require a CAPTCHA or national-ID verification?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Form controls stay neutral (borders, backgrounds). Identity elements: the **primary submit button** and the **focus ring** take the institutional color; validation error states keep the fixed red status tokens — never recolor errors to brand.
- **Sustainability Considerations:** No media in forms; concise hint/error copy; client-side validation prevents wasted server round-trips (fewer requests = less energy); avoid heavy third-party CAPTCHA scripts if a lighter honeypot satisfies your threat model; server-rendered initial form (no JS framework needed to render).
- **Accessibility Notes:** Every control has a programmatically associated label; hints and errors use `aria-describedby`; errors announce via `role="alert"` and focus moves to the first invalid field; submit shows visible progress/disabled state; keyboard-only completion is fully possible; contrast on focus rings and error text meets AA.

---

## Guide 15 — Share Widget

**Component Name:** Share Widget

**1. Component Description:**
A compact dropmenu that shares the current page on X, LinkedIn, WhatsApp, or via copy-link. It appears in the sub-hero action slot (or floats inline-end) and is suppressed on pages where sharing is inappropriate.

**2. Build Skill Guide:**
1. Read the share pattern in `ui-shell/hero.md` (flat variant demo) and `components/share.md`; see `_js/nds-share.js` behavior.
2. Markup: `div.nds-share.nds-dropmenu` → trigger `button.nds-btn.nds-secondary-outline.nds-dropmenu-trigger` (share icon + "Share Page" label) → `.nds-dropmenu-menu[hidden]` with items: `button.nds-btn.nds-subtle.nds-dropmenu-item.nds-share-x` (X icon), `.nds-share-linkedin`, `.nds-share-whatsapp`, and `.nds-share-copy` (copy-link, `data-label="Link Copied!" data-message="Page link copied to clipboard" data-no-auto-close`).
3. Placement: in `hero_actions` as the string `"share"`, or in `hero_float_actions` with `class: nds-minimal` for icon-only on mobile; suppress with `hide_share_page: true`.
4. Security: URL handling goes through scheme validation (allow `http`/`https` only) before `window.open` — the JSS-05 pattern; copy uses the clipboard API with fallback.
5. Verify share icons exist (anchored grep); audit with `/nds-js-audit nds-share.js` (JSS-05 is the known motivating example — the scheme check must live in the shared URL-reading helper).

**3. Data Input & Customization Questions (for User):**
- **Network set:** Which networks does your institution want (X, LinkedIn, WhatsApp, copy-link) — and are any excluded (e.g., no WhatsApp on official government pages)?
- **Page metadata:** What canonical URL, Open Graph title/description/image should the share payload use per page type (the design reads from the page itself — confirm your OG defaults)?
- **Placement policy:** On which page types should share appear (content pages yes, transactional/application pages no)? Should it float inline-end or sit in the standard action row?
- **Copy-label text:** What "Link Copied!" confirmation and tooltip copy should the copy-link item show, in Arabic and English?
- **Analytics:** Do you need share-click tracking (which destination, from which page) and where should events be sent?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The trigger stays `nds-secondary-outline` (neutral outline). Identity element: the **hover/active state** of the trigger and menu items may take the institutional color; the network icons remain monochrome/neutral. The widget is a utility, not an identity banner.
- **Sustainability Considerations:** Zero images — icons are mask/SVG; share payloads are URLs + short metadata (no page snapshots, no server-side rendering cost). No third-party share scripts (each would be a request + tracker); the dropmenu behavior ships in the shared bundle.
- **Accessibility Notes:** Trigger and items have `aria-label`s; menu toggles with `aria-expanded`; copy-link announces success via the feedback mechanism (`data-message`, live region); focus moves into the open menu and returns to the trigger on close; keyboard-operable end to end.

---

## Guide 16 — Consent & Feedback Widgets (Cookie Popup, User Feedback)

**Component Name:** Consent & Feedback Widgets

**1. Component Description:**
Two optional overlays: the cookie-consent popup (accept / reject non-essential, with links to terms and privacy) and the user-feedback widget (thumbs up/down with optional comment) that ships on content pages. Both are progressive enhancements — hidden until needed, unobtrusive when dismissed.

**2. Build Skill Guide:**
1. Read `_includes/cookie-popup.html` and `_includes/user-feedback.html`; see `components/cookies.md` and `components/user-feedback.md`.
2. **Cookie popup:** `div.nds-cookie-popup.nds-card#ndsCookiesPopup[hidden]` → header (featured cookie icon + close button) → content (`span.nds-card-title` + `p.nds-card-description` + links row: Terms & Conditions, Privacy Policy) → actions: `button.nds-btn.nds-primary.nds-full` (Accept, with `data-accept-title`/`data-accept-message`) + `button.nds-btn.nds-secondary.nds-full` (Reject Non-Essential, `data-decline-*`).
3. Behavior: `NDS.Cookies` persists the choice in localStorage, hides on later visits, and never blocks the page (it is `hidden` markup, not a pre-paint gate).
4. **User feedback:** thumbs up/down + optional short comment; submission via the theme's REST/admin endpoint with nonce; success message replaces the widget; "last edit" meta sits alongside.
5. Ensure both widgets are removable/reorderable at the template level (template parts in the WP port; includes here) — consent UX is an institutional decision.

**3. Data Input & Customization Questions (for User):**
- **Consent copy:** What is your cookie notice text (what cookies, why, who)? What are the exact Accept and Reject labels, and do you need a granular preferences tier beyond accept/reject?
- **Policy links:** Which URLs are your Terms & Conditions and Privacy Policy, and are they available in Arabic and English?
- **Consent scope:** What does "Reject Non-Essential" actually disable on your site (analytics, personalization), and is that behavior actually wired to your tag manager/cookies?
- **Feedback question:** What is the exact feedback prompt (e.g., "Was this page helpful?") and the optional comment field's label, limits, and privacy note?
- **Feedback destination:** Where do responses go (email, analytics event, CRM ticket), and what confirmation message appears after submission?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Both widgets are white cards on the neutral surface. Identity element: the **Accept (primary) button** only. The close, reject, and thumb controls stay neutral; the widget must never compete with page content for attention.
- **Sustainability Considerations:** Hidden until needed — zero paint cost on first load (`hidden` markup, not injected after load); no media assets; consent stored locally (no server round-trip per visit); feedback is a single small POST; keep consent copy short (fewer bytes, faster read).
- **Accessibility Notes:** The popup is focus-managed while open (focus trap, Escape to close, return focus on close); the feedback control has labels/aria-labels; success/failure announcements via live regions; buttons are keyboard-operable and meet AA contrast; dismissing is possible without JS (links remain available).

---

## Guide 17 — KPI / Metric / Progress & Stepper

**Component Name:** KPI / Metric / Progress & Stepper

**1. Component Description:**
Data-visualization and process components: KPI/metric cards (label + animated value + optional unit/icon), progress indicators (circle/bar with a target), and steppers for multi-step flows (with completed/current/upcoming states). Used by the KPIs template, service pages, and multi-step forms.

**2. Build Skill Guide:**
1. Read `components/metric.md`, `components/progress.md`, and `components/stepper.md` for canonical markup; see the progress-circle usage in `index.md` §Architecture and the stepper in the form/sideinfo templates.
2. **KPI/metric:** `div.nds-metric` (or a card) with label, `span.nds-progress-number`-style value, unit/currency via `nds-number-format` (`data-currency="SAR"` for riyal), optional icon; values are real text in the DOM (never canvas-only).
3. **Progress:** `div.nds-progress-circle.nds-lg` with `data-num`/`data-max` → SVG circles (`.nds-progress-bg`, `.nds-progress-track`) + `.nds-progress-info` (number, "of", text). The count-up runs once on intersection (`NDS.Numbers`/`NDS.onIntersect`) and respects `prefers-reduced-motion` (renders final value instantly).
4. **Stepper:** ordered list of steps with completed (`data-state`-marked), current, and upcoming states; used inline (form header) or in a sideinfo column (desktop) / radial (mobile).
5. Values are server-rendered; JS only animates. If a value changes (live KPIs), update via the component's API without re-rendering the page.
6. Audit with `/nds-js-audit nds-numbers.js` / `nds-progress.js` / `nds-stepper.js`.

**3. Data Input & Customization Questions (for User):**
- **KPI set:** Which metrics does your institution report on each dashboard/KPI page (label + current value + unit)? What is the data source (database, API, manual) and refresh cadence?
- **Formatting:** What number/currency formatting applies (Arabic-Indic vs Western digits, "SAR" vs "﷼", thousands separators, decimal places)?
- **Progress targets:** For progress indicators, what is the current value, the max/target, and the label (e.g., "Performance 100/100")? Does it reflect real completion or a static statement?
- **Stepper flow:** For multi-step processes (applications, forms), what are the step names in order, which step is current for a given state, and how is state derived (URL param, session, API)?
- **Accessibility of data:** Which values need supplementary text (e.g., "100 out of 100") so meaning survives without the graphic?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Identity elements: the **current stepper step** and the **progress track fill** take the institutional color; completed steps may use a muted brand tint, upcoming steps stay neutral/gray. Metric icons (featured-icon circles) follow Guide 09's tint rule. Value text stays neutral — the number itself is data, not decoration.
- **Sustainability Considerations:** Values are text (no chart images, no heavy chart libraries for simple metrics); the count-up runs once on intersection and honors reduced motion (no idle animation = no battery/CPU waste); steppers are semantic lists (no images); KPI pages server-render numbers — no data-fetch waterfall.
- **Accessibility Notes:** Values are real text (screen-reader readable, selectable); progress/stepper states carry `aria-valuenow`/`aria-valuemax` (or equivalent text) and visible current-step marking; color is never the only state indicator (checkmarks/"current" text accompany); count-up animation is disabled under `prefers-reduced-motion`.

---

## Appendices

### A. Skills to invoke while building

| Stage | Skill | When |
|---|---|---|
| Markup authority | Read `ui-shell/*.md` / `components/*.md` | Before building any component (never guess) |
| Icons | Anchored grep (`_sass/_hgiRoundedStroke.scss`, `UI_ICONS`) | Before writing any `<i>` |
| Docs | `/nds-doc [name]` | Creating/refining a component doc page |
| CSS quality | `/nds-css-audit <file>` | New/changed SCSS (5 rule groups; token discipline is CLAUDE.md-governed) |
| JS quality | `/nds-js-audit <file>` | New/changed `_js/` (persona canonicals in `PERSONA.md`) |
| Performance | `/nds-perf <path>` | Any page on the critical path (home LCP, gallery, hero) |
| Registration | `_data/sidemenu/sidemenu.yml` + `_data/content/*.yml` | New pages/collections |

### B. Green Architecture checklist (apply to every component)

- [ ] Institutional color used on **identity elements only** (primary buttons, active indicators, links, focus rings, current-step markers) — never on backgrounds, body text, cards, or status colors.
- [ ] Tints used at brand-50/100; full saturation only on small interactive elements; dark mode re-resolves every accent.
- [ ] Images: webp/avif, explicit dimensions, `loading="lazy"` except the single LCP element; `data-src` for carousel/hero slides beyond the first.
- [ ] Icons: SVG/mask — no bitmap glyphs, no icon-font request on the critical path.
- [ ] Text kept concise (titles ≤ 8–12 words, descriptions ≤ 20–25 words) — every byte counts on low-bandwidth networks.
- [ ] Behavior ships per-component via the bundle/loader system — a page loads only the JS it uses.
- [ ] No autoplay media; animations honor `prefers-reduced-motion`; off-screen content is gated (`content-visibility`, hidden attributes).
- [ ] Accessibility: labels, `aria-*`, keyboard paths, AA contrast, and text alternatives are part of the component's data contract, not an afterthought.

---

# PART 2 — THE ENTIRE REPOSITORY

This part completes coverage: every component, layout primitive, utility, page template, example, and event pack in the repository, following the canonical map in `_data/sidemenu/sidemenu.yml`. Guides delivered in Part 1 are cross-referenced (not repeated). All entries keep the same four-part structure.

## Coverage index (Part 1 ↔ Part 2)

| Sidemenu category | Covered in Part 1 | Covered in Part 2 |
|---|---|---|
| Foundations | — | Tokens, Icons, Themes (18–20) |
| UI Shell | Top Bar (01), Header/Main Nav (02), Hero (03), Breadcrumb (04), Side Menu (05), Side Info (06), Footer (07) | — |
| Layout | Section & Grid (08) | Block (21), Flex (22) |
| UI | Cards & Feature Grid (09), Alerts (10), Swiper (11), Tabs & Accordion (12), Toolbar/Gallery (13), KPI/Progress/Stepper (17) | Avatar, Buttons, Chips, Code, Content Switcher, Cooldown Button, Definition List, Drawer, Dropmenu, Empty, Featured Icons, Feedback Icons, FAB, IPV, Link, Loading, Modal, Panels, Persona, Quote, Rating, Scroll More, TOC, Tags, Tooltip (23–47) |
| Forms | Forms/Contact (14), Consent & Feedback (16) | Autocomplete, Checkbox, Date Picker, Editor, Multiselect, OTP, Radio, Slider, Switch, Tag Input, Upload, Voice Input (48–59) |
| Data | Metric (17) | Chart, Export, Selection, Sort, Tables (60–64) |
| Add-ons | — | Accessibility (65) |
| Utilities | Share (15), Cookies (16), Numbers (17) | Content Placeholder, Copy, Divider, Expandable Content, Hidden, Request, Saudi Cities, Truncate Text (66–73) |
| Templates | (patterns referenced) | 12 DGA page templates (74–85) |
| Examples | — | 5 full-page demos (86–90) |
| Events | — | Foundation Day, Hajj (91–92) |
| Repo-level systems | (perf harness noted) | Doc-site data layer & i18n, Perf harness (93–94) |

---

## Foundations

### Guide 18 — Design Tokens

**Component Name:** Design Tokens

**1. Component Description:**
The four-tier token system behind every visual decision: palette (`--colors-*`), primitives (spacing/radii/typography/shell dimensions), semantic roles (background/text/border/icon), and component dials. Documentation: `components/tokens.md`; tiers live one-file-per-tier in `_sass/tokens/` + `_sass/themes/_dga.scss`.

**2. Build Skill Guide:**
1. Read `components/tokens.md` and the token hierarchy in `CLAUDE.md` (palette → primitives → semantic → component; knobs vs. tokens).
2. Consume semantic tokens in components; reference the palette directly only when no meaning matches; never write raw hex in a component.
3. Mint a component token only when design retunes just that component (strict dial-or-DGA-mandate bar); route its value by meaning.
4. Keep families complete; dark-mode blocks live at the bottom of the same tier file.
5. Consumer overrides go through `--component-*` knobs with `--_x: var(--x, default)` — never re-bind a global token inside a component file.

**3. Data Input & Customization Questions (for User):**
- **Palette source:** What is your institution's official color ramp (primary/secondary/tertiary/neutral)? Provide the full 25–950 ramp or a single OKLCH seed (Guide 20), not one-off hex values.
- **Semantic mapping:** Which brand colors map to which roles (primary surface vs. accent vs. text-on-color)? Confirm dark-mode variants.
- **Status colors:** Do your success/info/warning/error conventions differ from the fixed NDS ramp, or stay as shipped (recommended)?
- **Component dials:** Which components genuinely need an institutional dial (nav height, radius preference) and what are the target values?
- **Documentation:** Which tokens appear in your institutional token reference (subset) vs. the full public surface?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** This is the *only* sanctioned re-branding surface — point the four brand slots at your ramp and every component re-resolves in light and dark. Do not hand-replace colors per component (fragments the system, breaks dark mode). Status colors and base white/black stay fixed.
- **Sustainability Considerations:** Tokens are CSS custom properties — zero runtime cost; consuming tokens instead of literals keeps compiled output small and themeable.
- **Accessibility Notes:** Semantic tokens encode AA pairings by role; keep role meanings stable so on-color and status text contrast holds in every theme.

---

### Guide 19 — Icons

**Component Name:** Icons

**1. Component Description:**
Two icon layers: the HugeIcons Stroke Rounded **content font** (`<i class="hgi hgi-stroke hgi-{name}">`) for content, and an **inline UI set** (`<i class="nds-icon nds-hgi-{name}">`) painted via mask-image so chrome never waits for a font. Catalog: `components/icons.md`; glyph list `_sass/_hgiRoundedStroke.scss`; UI list `UI_ICONS` in `scripts/generate-icons-scss.mjs`.

**2. Build Skill Guide:**
1. Choose the layer by context: content/docs → `hgi hgi-stroke hgi-{name}`; component/chrome → `nds-icon nds-hgi-{name}`.
2. **Never guess a name** — verify with the anchored grep against the font file (content) or `UI_ICONS` (UI) before writing any `<i>`.
3. Add a new UI icon only through `scripts/add-icon.mjs` (the `nds-add-icon` skill): token + alias inserted alphabetically; mirror into `_data/content/icons.yml`.
4. Update the HGI font via the `nds-hgi-font-update` skill (fetch CDN CSS, compare, rebuild rules, replace woff2, verify no FOUT).
5. Decorative icons get `aria-hidden="true"`; meaningful icons pair with text or `aria-label`.

**3. Data Input & Customization Questions (for User):**
- **Icon inventory:** Which icons does your content need (per service, per category)? Provide the exact HGI names (verified) or the topic to select the glyph.
- **Custom glyphs:** Any bespoke marks (brand logos, entity seals) to add as custom UI icons (`--class` override, `brand-*`/`logo-*` prefixes) rather than HGI lookalikes?
- **Brand marks:** Which icons are brand marks that must stay original (app-store logos, partner seals) and never be re-tinted?
- **Catalog:** Which icons appear in your institutional icon catalog, with which Arabic/English labels?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Icons inherit `currentColor` — institutional color flows to identity elements automatically. Do not colorize decorative icons; status icons keep the fixed status tokens.
- **Sustainability Considerations:** UI icons are inline mask-image SVGs (no font request on the critical path); the HGI sheet loads deferred only where content icons are used. Inline SVG beats any bitmap.
- **Accessibility Notes:** `aria-hidden="true"` on decorative icons; never rely on an icon alone — pair with text or `aria-label`; custom SVG marks use `role="img"` + accessible name where meaningful.

---

### Guide 20 — Themes

**Component Name:** Themes

**1. Component Description:**
The theming system: keep the DGA default, enable dark mode, or re-brand via an OKLCH seed palette, a predefined theme, or a full stylesheet theme — all from `data-theme`/`data-brand` attributes, no rebuild. Documentation: `components/themes.md`; registry `_data/themes.yml` + `_sass/themes/_register.scss`.

**2. Build Skill Guide:**
1. Read `components/themes.md` (dark mode, seed themes, stylesheet themes, brand switcher).
2. Choose the mechanism: OKLCH seed (full ramp from a few colors), predefined theme (registered in `_register.scss`), or stylesheet theme (own CSS file overriding tokens, loaded render-blocking to avoid a DGA→brand flash).
3. Wire the switcher: `data-theme-value` buttons + `data-theme-css`/`data-theme-js` for stylesheet themes; persistence via `localStorage['nds-theme']`/`['nds-brand']` with the pre-paint FOUC guard (`_includes/head-inline-scripts.html`).
4. Dark mode: `:root[data-theme~="dark"]` blocks in the semantic/component tier files re-bind tokens — no per-component dark CSS.
5. Event packs (Foundation Day, Hajj) are drop-in themes: applied by one attribute, removed when the event ends.

**3. Data Input & Customization Questions (for User):**
- **Identity palette:** What are your 1–3 seed colors for the brand ramp, and which hues should NOT appear (e.g., no gold on a health ministry)?
- **Dark mode:** Ship dark mode by default (recommended), opt-in only, or not at all? Which images/logos need dark variants (`nds-oncolor`)?
- **Theme surface:** Which variants appear in the switcher (default + N predefined + your brand), with what ar/en labels?
- **Seasonal packs:** Which national occasions need event re-skins, and what are the asset/copy requirements per pack?
- **Exclusions:** Pages where the switcher must be hidden (transactional flows)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Themes re-point the brand slots only — one mechanism, every component follows, dark mode preserved. Your color appears where the design already uses brand color, nowhere else.
- **Sustainability Considerations:** Seed themes ship in the critical bundle (no extra request); stylesheet themes load one small file only when chosen; no duplicated style sheets.
- **Accessibility Notes:** Dark mode must hold AA everywhere (the token re-bind does this); the switch is a labeled, keyboard-operable control; the persisted choice applies pre-paint (no flash); honor `prefers-color-scheme` on first visit.

---

## UI group

### Guide 23 — Avatar

**Component Name:** Avatar

**1. Component Description:**
Represents a user or entity with an image, initials, or icon across sizes and shapes. Used in the header user action, persona blocks, and team/comment contexts.

**2. Build Skill Guide:**
1. Read `components/avatar.md` (sizes, shapes, fallback rules).
2. Markup: `div.nds-avatar` (or `span`) with an `img` (explicit dimensions, `alt`) or an initials/icon fallback; choose the size modifier and shape (circle default).
3. Image failure falls back to initials — supply the initials data in markup.
4. Place inside the nav actions (user menu), persona, or content as the design dictates.

**3. Data Input & Customization Questions (for User):**
- **User imagery:** What image do users/entities have (photo, logo)? Dimensions and alt-text conventions?
- **Initials fallback:** What initials algorithm applies (first+last name, Arabic ordering) and what text renders when no image is set?
- **Contexts:** Where do avatars appear (nav user menu, team pages, comments) and what size per context?
- **Dynamic source:** Do avatars come from a user directory/API (which field is the image URL)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The initials fallback may carry the institutional color on a brand-tint background; photos stay unaltered. Avatars are identity *of the person*, not the institution.
- **Sustainability Considerations:** Tiny compressed images or SVG initials (zero weight); explicit dimensions (no CLS); lazy-load below the fold.
- **Accessibility Notes:** `alt` describes the person/entity (empty `alt` when decorative beside a name); initials fallback is text; focus states on interactive avatars.

---

### Guide 24 — Buttons

**Component Name:** Buttons

**1. Component Description:**
The interaction workhorse: primary, secondary, secondary-outline, neutral, subtle, danger, and on-color variants in multiple sizes, with icon and icon-only forms. A base component with high fan-in (forms, cards, nav, alerts all compose it).

**2. Build Skill Guide:**
1. Read `components/button.md` and the canonical `_sass/components/_buttons.scss` (the reference "clean" component).
2. Choose variant by hierarchy: one primary per view; secondary for alternatives; subtle for quiet actions; danger for destructive; on-color on dark surfaces.
3. Markup: `<button class="nds-btn nds-primary">` (or `a.nds-btn` for links) with `<span class="nds-label">`; icons via `i.nds-icon`; `nds-icon-only` + `aria-label` for icon buttons.
4. Sizes `nds-sm/md/lg/xl`; modifiers `nds-full`, `nds-menu-btn`, `nds-indicator`, `nds-circle`, `nds-external`.
5. Disabled states: `disabled`/`[data-state~="disabled"]` with the recognized disabled affordance (never remove the `cursor`/`pointer-events` idiom — DEAD-06).
6. Audit with `/nds-css-audit _sass/components/_buttons.scss` and `/nds-js-audit` on any button behavior.

**3. Data Input & Customization Questions (for User):**
- **Action inventory:** What actions does each page need (label + destination/behavior)? Which is the primary action per view?
- **Hierarchy:** Which variant/size communicates each action's priority (primary CTA vs. secondary vs. link-style)?
- **Icons:** Which buttons carry leading/trailing icons, and which are icon-only (with accessible names)?
- **Dynamic states:** Which buttons have loading, cooldown (Guide 28), or disabled states driven by data (form validity, API state)?
- **External actions:** Which buttons open external destinations and need the external-link affordance?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Primary buttons are the flagship identity element — institutional color at full saturation is correct *here* (small interactive surface). Secondary/outline/subtle stay neutral; danger stays red. One primary per view keeps the accent proportionate.
- **Sustainability Considerations:** Text + SVG icons only; shared base component (no duplicated CSS per variant); focus styles via mixins.
- **Accessibility Notes:** Real `<button>`/`<a>` semantics; visible focus ring on the brand token; labels never "click here"; icon-only buttons carry `aria-label`; AA contrast on all variants incl. on-color.

---

### Guide 25 — Chips

**Component Name:** Chips

**1. Component Description:**
Interactive selection/filter/categorization elements: removable chips, applied-filter chips, and static tag-like chips. Composed by tag input, multiselect, and the toolbar's applied-filters row.

**2. Build Skill Guide:**
1. Read `components/chips.md` and `_sass/components/_chips.scss`.
2. Markup: `div.nds-chips` container of `span.nds-chip` items (label + optional remove button with aria-label).
3. Applied-filter chips (Guide 13): rendered by the filter component; each chip removable, removal re-runs the filter.
4. States: default, removable, selected; status-tinted variants where the chip carries a category meaning.
5. Chips inside form fields (tag input, multiselect) — the field owns removal behavior.

**3. Data Input & Customization Questions (for User):**
- **Chip inventory:** Which selections/categories render as chips (filter facets, selected options, entered tags)? What is the label source?
- **Removal semantics:** What should removal trigger (uncheck a filter, remove a tag, deselect) and what happens to dependent state?
- **Chip counts:** Do any chips display counts ("Category (12)") and where do they come from?
- **Empty state:** What happens when the last chip is removed (empty copy, hint)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Selected/active chips may take a brand-tint (brand-50 fill + brand-700 text); neutral chips stay gray. Never saturate the whole chip row.
- **Sustainability Considerations:** Text + tiny SVG close glyph; lightweight spans; removal reuses existing lists (no page re-render).
- **Accessibility Notes:** Remove buttons have accessible names; chip rows announce removal (live region); selected state visible beyond color; keyboard-operable removal.

---

### Guide 26 — Code

**Component Name:** Code

**1. Component Description:**
Code display with syntax highlighting, copy functionality, line numbers, and expandable panels — used throughout the documentation pages and developer-facing content.

**2. Build Skill Guide:**
1. Read `components/code.md` and the doc-page pattern in `components/alert.md` (code tabs).
2. Markup: `div.nds-code` (optionally `nds-expandable`) with `div.nds-code-action` (copy button `button.nds-btn.nds-subtle.nds-copy`) and `<code class="lang-{html|js|css}">` content.
3. On doc pages, code-tab content is **entity-encoded** (`&lt;`/`&gt;`/`&amp;`) so it renders literally.
4. Long examples (>15 lines) wrap in `nds-expandable` with `div.nds-expandable-content`.
5. Copy behavior: `NDS.Copy` wires the button (checkmark feedback + screen-reader announcement).

**3. Data Input & Customization Questions (for User):**
- **Code samples:** Which samples belong in your docs/help content, and which languages must be highlighted?
- **Copy accuracy:** Is code-tab copy guaranteed verbatim from the live demo (the doc contract), or do you maintain snippets separately with a review process?
- **Line numbers:** Which samples need line numbers (tutorials) vs. plain snippets?
- **Expansion:** Which samples exceed ~15 lines and need the expandable wrapper?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Code surfaces stay neutral/terminal-toned; the syntax palette is fixed (readability over brand). Only the copy-button hover may take the brand color.
- **Sustainability Considerations:** Syntax highlighting is CSS-class-based (deferred, not on the critical path); samples are text — negligible weight; expandable keeps long samples off first paint.
- **Accessibility Notes:** Code is real text (selectable, screen-reader readable); copy announces "copied"; expand/collapse is a labeled control; AA contrast on code text.

---

### Guide 27 — Content Switcher

**Component Name:** Content Switcher

**1. Component Description:**
A segmented control that toggles between content sections in the same space — a compact alternative to tabs for 2–4 mutually exclusive views (list/grid, EN/AR preview, year/quarter).

**2. Build Skill Guide:**
1. Read `components/content-switcher.md` (segments + panels).
2. Markup: a segment list of buttons with pressed/selected state plus corresponding content panels; active segment and panel stay in sync.
3. Choose switcher vs. tabs: switcher for few, short-label views; tabs for richer titled panels.
4. Keep the default active segment server-rendered so first paint is correct with JS deferred.

**3. Data Input & Customization Questions (for User):**
- **View inventory:** Which views does your content switch between (List/Grid, EN/AR preview, Year/Quarter)?
- **Labels:** What are the exact short labels (≤ 2 words) in Arabic and English?
- **Default view:** Which view is default, and is it data-driven (URL param, user pref)?
- **Content mapping:** What renders in each panel, and does any panel depend on dynamic data?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The active segment's fill/underline takes the institutional color; inactive segments stay neutral. One accent at a time.
- **Sustainability Considerations:** Text-only; hidden panels stay in the DOM (no re-fetch when switching); default state server-rendered (no flash).
- **Accessibility Notes:** Real buttons with pressed/selected state announced; panels associated (aria-controls); keyboard-operable; content readable without JS.

---

### Guide 28 — Cooldown Button

**Component Name:** Cooldown Button

**1. Component Description:**
A button that holds a loading state, optionally fires a success toast, and runs a live countdown before re-enabling — for rate-limiting resend/retry actions (OTP resend, verification retries, re-downloads).

**2. Build Skill Guide:**
1. Read `components/cooldown-button.md` and `_js/nds-cooldown-button.js`.
2. Markup: `button.nds-btn` with cooldown configuration attributes (duration, label templates); the component manages the countdown label, disabled state, and re-enable.
3. Optional success toast: the component no-ops if `NDS.Alert` is absent (annotated soft dependency — JSD-08) — keep the annotation.
4. The countdown must be announced (not just visual); the button stays keyboard-operable when re-enabled.
5. Audit with `/nds-js-audit nds-cooldown-button.js`.

**3. Data Input & Customization Questions (for User):**
- **Cooldown actions:** Which actions need rate-limiting (OTP resend, retry, re-download) and what is the exact duration per action?
- **Label copy:** What are the countdown label templates in ar/en ("Resend in 0:30" → "Resend")?
- **Success feedback:** Should a success toast appear after the action fires, and what message?
- **Trigger source:** Per-click, per-request, or server-instructed cooldown (returned "try again in Ns")?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The button follows standard variants (primary for the action); the countdown state may render subtle/neutral. No extra branding.
- **Sustainability Considerations:** One lightweight timer component (no animation library); server-instructed cooldowns prevent retry floods (saves requests/energy).
- **Accessibility Notes:** Countdown announced via live region; disabled state communicated beyond color (label shows the countdown); re-enabled button regains focus appropriately.

---

### Guide 29 — Definition List

**Component Name:** Definition List

**1. Component Description:**
A labeled value-pair list (title + description, or `dt`/`dd`) used for feature grids, capability lists, sideinfo metadata, and the Built-in Features sections of doc pages.

**2. Build Skill Guide:**
1. Read `components/definition-list.md` and the `.nds-doc-features` modifier in `_sass/components/_definition-list.scss`.
2. Markup: `dl.nds-definition-list` (modifiers `nds-divided`, `nds-grid`) of `div.nds-definition-item` → `dt`/`dd` (or `span.nds-item-title` + `p.nds-item-desc`) with leading icons.
3. Grid knobs: `--max-col/--mid-col/--min-col`, `--dl-icon-size`, `--row-gap`, `--col-gap`; docs pages use `.nds-doc-features` (no inline styles).
4. Feature-grid usage (Part 1, Guide 09): wrap items in cards for the "Who It's For" pattern.

**3. Data Input & Customization Questions (for User):**
- **Term/value pairs:** What label→value pairs does each list carry (service metadata, feature capabilities, entity details)? Provide the authoritative values.
- **Feature lists:** What are the feature names and one-line descriptions, with which icons?
- **Column layout:** How many columns at desktop/tablet/mobile (even counts 4/6/8 for 2-col grids)?
- **Dividers:** Which lists need `nds-divided` separators vs. open spacing?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Leading icons (featured-icon circles) may take the brand tint per Guide 09; labels/values stay neutral. The list is content, not identity.
- **Sustainability Considerations:** Text-only; SVG icons; one-line descriptions keep rows light; reuse the same item markup across lists.
- **Accessibility Notes:** Semantic `dl`/`dt`/`dd` (or titled items with proper headings); icons `aria-hidden`; icon never the sole meaning carrier; AA contrast on muted value text.

---

### Guide 30 — Drawer

**Component Name:** Drawer

**1. Component Description:**
A vertical list container for sidebar navigation, submenus, quick links, and inline notifications, with compact/expanded layouts that adapt across breakpoints. It is the internal engine of the Side Menu (Guide 05).

**2. Build Skill Guide:**
1. Read `components/drawer.md` (and its use inside `ui-shell/sidemenu.md`).
2. Markup: `nav.nds-drawer` (modifiers `nds-divided`, `nds-full-height`) → `ul.nds-drawer-list` of flat `li` links and accordion `li` groups (button + nested `ul`, optional `li.nds-drawer-group` for a third level).
3. State: `data-state="active"` on the current item (parents auto-expand on init); `aria-expanded` on group toggles; `data-state="open"` managed by JS.
4. Overflow: wrap the list in `.nds-scroll-more` so long trees scroll with edge fades and a "show more" button.
5. Audit with `/nds-js-audit nds-drawer.js` (init-active-states reads server-rendered `data-state` — a documented JSD-01 carve-out).

**3. Data Input & Customization Questions (for User):**
- **List content:** What items belong in each drawer (section links, submenu groups, notifications)? Provide labels + targets.
- **Grouping:** Which items group under accordion parents, and which groups carry counts?
- **Depth:** Do you need the three-level grouped pattern, or is two levels sufficient?
- **Expanded state:** Which groups should start expanded (e.g., the section containing the current page)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The active-item indicator and hover states take the institutional color (Guide 05); the container, dividers, and counts stay neutral.
- **Sustainability Considerations:** Text-only list; overflow detection uses pooled observers (one per component); hidden submenus stay in the DOM (no re-fetch on expand).
- **Accessibility Notes:** Toggle buttons carry `aria-expanded`; active item marked in markup for screen readers; full keyboard navigation; focus containment when the drawer opens as an overlay.

---

### Guide 31 — Dropmenu

**Component Name:** Dropmenu

**1. Component Description:**
A toggle-activated overlay menu for actions, navigation links, or filter controls — the most reused interactive primitive (share, theme switcher, brand switcher, filters, user menu, rating).

**2. Build Skill Guide:**
1. Read `components/dropmenu.md` and the `CLAUDE.md` dropmenu rules (portal-safe `nds-{component}-menu` identifiers, shared styling, knobs on the wrapper).
2. Markup: `div.nds-dropmenu` → trigger `button.nds-btn.nds-dropmenu-trigger` (`aria-expanded`, `aria-controls`) → `div.nds-dropmenu-menu[hidden]` of `button.nds-btn.nds-subtle.nds-dropmenu-item` items, optional footer with actions.
3. Give every menu its identifier class (`nds-{component}-menu`) so styling survives portaling; use `data-portal` only when the menu must escape an `overflow` ancestor.
4. Behavior: `NDS.Dropmenu` — outside-click close, Escape, focus management, one-open-at-a-time; item click closes unless `data-no-auto-close`.
5. Audit with `/nds-js-audit nds-dropmenu.js` (lifecycle pair `toggle()` + `open()`/`close()` — PERSONA 3.4/3.1 exemplar).

**3. Data Input & Customization Questions (for User):**
- **Menu inventory:** Which menus exist (share, theme, filter, user, language, per-page actions)? What are the exact items (label + action/URL) per menu?
- **Trigger labels:** What label/icon does each trigger carry, and what is its accessible name?
- **Behavioral needs:** Which items should NOT auto-close on click (`data-no-auto-close` — filter checkboxes, copy-link with confirmation)?
- **Portal cases:** Which menus live inside `overflow`-clipped containers and need `data-portal`?
- **Keyboard/mobile:** Do any menus need custom shortcuts or a mobile bottom-sheet treatment?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The menu surface stays white/neutral; the trigger and item hover/active states take the institutional color; the selected item may carry a brand checkmark. Menus are utilities — no saturation.
- **Sustainability Considerations:** Small DOM, hidden via attribute (no injection cost); one shared component implementation; portaling moves nodes, never duplicates them.
- **Accessibility Notes:** `aria-expanded`/`aria-controls` on triggers; focus moves in and returns on close; Escape + outside click close; items are real buttons with descriptive labels.

---

### Guide 32 — Empty

**Component Name:** Empty

**1. Component Description:**
A drop-in placeholder that fills empty containers with an icon and a localized message, adapting its markup to match the parent element (list, table row, or block).

**2. Build Skill Guide:**
1. Read `components/empty.md` and `_js/nds-empty.js`.
2. The component stamps `.nds-empty` into an empty container with the configured icon + localized message.
3. Place on: empty search/filter results, empty notifications, empty tables/lists, initial states of dynamic panels.
4. Combine with a recovery action where useful ("Clear filters" / "Refresh" button inside the empty state).

**3. Data Input & Customization Questions (for User):**
- **Empty-state copy:** For every empty container, what icon + message should appear in Arabic and English?
- **Recovery actions:** Which empty states offer a recovery action (reset filters, refresh, browse all) and what is its label/destination?
- **Data-driven detection:** How is "empty" determined per container (zero items after filter, no notifications, no results)?
- **Localization:** Are messages in your translation system, and do they adapt per locale?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The empty-state icon may take a muted brand tint on a brand-50 circle; the message stays neutral gray. Empty states are quiet by design.
- **Sustainability Considerations:** Tiny text + one SVG icon, injected only when a container is actually empty (no cost on full states).
- **Accessibility Notes:** The message is announced when it appears (live region where dynamic); icon `aria-hidden`; recovery action is a real button/link.

---

### Guide 33 — Featured Icons

**Component Name:** Featured Icons

**1. Component Description:**
Icon chips that give card headers and section accents their visual anchor: a circular (or rounded) container with an icon, in multiple sizes, optionally tinted.

**2. Build Skill Guide:**
1. Read `components/featured-icons.md` and `_sass/components/_featured-icons.scss`.
2. Markup: `span.nds-featured-icon` (modifiers `nds-circle`, sizes `nds-sm…nds-xl`) containing a content icon (`hgi hgi-stroke hgi-{name}`).
3. Usage: card header icon slot (Guide 09), section-head shapes, empty-state icons, list item marks.
4. Verify every icon name with the anchored grep before authoring.

**3. Data Input & Customization Questions (for User):**
- **Icon per context:** Which icon represents each card/section/feature (verified HGI names)?
- **Size mapping:** What size fits each context (card headers vs. section shapes vs. inline)?
- **Tint policy:** Which icons sit on brand-tinted circles vs. neutral ones (per Guide 09's proportion rule)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The tinted circle (brand-50/100 fill with brand-600 icon) is the sanctioned identity accent; full saturation only on tiny glyphs. Keep the majority neutral.
- **Sustainability Considerations:** SVG glyphs only; shared component CSS; icons inherit color (no per-instance image assets).
- **Accessibility Notes:** `aria-hidden="true"` on decorative icons; when the icon carries meaning (a category), pair with text or an accessible label.

---

### Guide 34 — Feedback Icons

**Component Name:** Feedback Icons

**1. Component Description:**
Status icons (success/info/warning/error) used inside alerts, form feedback, and status messages. The color-by-status token system picks the right tint automatically.

**2. Build Skill Guide:**
1. Read `components/feedback-icons.md` and `_sass/components/_feedback-icons.scss`.
2. Markup: `span.nds-feedback` → `span.nds-feedback-icon` with an icon; the status variant (via `data-status` on the parent alert or a modifier) drives the fill.
3. Do not hand-pick status colors — the component resolves them from status tokens (fixed, never re-branded).
4. Use in alerts (Guide 10), form validation messages, and toast feedback.

**3. Data Input & Customization Questions (for User):**
- **Icon mapping:** Which glyph represents each status in your convention (check for success, info mark, warning triangle, error circle)?
- **Placement:** Where do status icons appear (alert icon slots, form field errors, toasts)?
- **Custom statuses:** Any status meanings beyond the four (e.g., "pending" neutral) and which icon/tint should they use?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Status colors are fixed — never recolor to brand (a brand-colored "error" breaks meaning). The neutral/pending variant takes neutral gray, not brand.
- **Sustainability Considerations:** SVG glyphs; shared styles; icons `aria-hidden` (text carries meaning) — no duplicated per-status markup.
- **Accessibility Notes:** Icon is decorative — the message text must carry the status; where the icon is the only signal, add `role="img"` + label; status announced in dynamic contexts.

---

### Guide 35 — Floating Action Button (FAB)

**Component Name:** Floating Action Button (FAB)

**1. Component Description:**
Pins to a viewport edge for a primary or persistent action, stacks with other FABs on the same edge, and — when it opens a panel — follows that panel to its edge. Used by the accessibility panel toggle.

**2. Build Skill Guide:**
1. Read `components/fab.md` and `_js/nds-fab.js`.
2. Markup: `button.nds-btn.nds-primary.nds-circle.nds-fab` with `data-fab-pos` and, when opening a panel, `data-panel-toggle`/`aria-controls`; starts `hidden` and is routed into its dock by the component.
3. Choose the action: a primary page action (help, chat) or a settings toggle (accessibility).
4. Stacking: multiple FABs auto-stack on the shared edge — declare order, not positions.
5. Audit with `/nds-js-audit nds-fab.js` (sub-concern latches `runtimeSet` — PERSONA 5 carve-out exemplar).

**3. Data Input & Customization Questions (for User):**
- **FAB actions:** Which persistent actions justify a FAB (accessibility panel, help/chat, quick apply)? One primary FAB per page at most, plus the a11y FAB.
- **Icon & label:** What icon (and accessible name) does each FAB carry? Does any show a text label at wide widths?
- **Panel pairing:** Which FABs open a panel (accessibility, notifications) and to which edge does the panel slide?
- **Page exclusions:** Which pages hide the FAB(s)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The FAB is a small circular surface — the primary FAB may take full brand saturation (a deliberate, contained accent). Icon on-color white; no other coloring.
- **Sustainability Considerations:** One small SVG; hidden until routed (no paint cost pre-init); stacking avoids overlapping floats (less DOM, no z-index wars).
- **Accessibility Notes:** Labeled button; `aria-expanded`/`aria-controls` when opening a panel; focus returns on close; never obscures keyboard focus or content.

---

### Guide 36 — Image Popup Viewer (IPV)

**Component Name:** Image Popup Viewer (IPV)

**1. Component Description:**
A full-screen image viewer for inspecting photos and illustrations with zoom, pan, and gallery navigation — opened from a thumbnail or image link.

**2. Build Skill Guide:**
1. Read `components/ipv.md` and `_js/nds-ipv.js`.
2. Wire triggers: image links/thumbnails carry the IPV trigger attribute; the viewer opens full-screen with zoom/pan controls and prev/next in galleries.
3. Modal-like lifecycle (`open()`/`close()`, focus trap, backdrop, Escape/scroll lock) — PERSONA 3.1 exemplar.
4. Provide high-resolution source images; thumbnails stay small and lazy.
5. Audit with `/nds-js-audit nds-ipv.js`.

**3. Data Input & Customization Questions (for User):**
- **Image set:** Which images open in the viewer (photos, documents, infographics)? Provide source files at viewable resolution plus thumbnails.
- **Galleries:** Which groups form galleries and what is the navigation order?
- **Captions:** Do images need captions/alt text inside the viewer, and where does the text come from?
- **Zoom policy:** Do any images need restricted zoom (scans, sensitive documents)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The viewer chrome stays neutral/dark; the close button is subtle. No branding inside the viewer — the image is the content.
- **Sustainability Considerations:** Small lazy webp thumbnails; the full image loads only on open (on-demand); zoom is CSS-transform-based (no re-fetch).
- **Accessibility Notes:** Full keyboard control; focus trapped and returned on close; images have alt text; dialog role; reduced-motion transitions.

---

### Guide 37 — Link

**Component Name:** Link

**1. Component Description:**
Styled links for inline references, calls to action, and external destinations within body text, alerts, and content areas — including the `nds-external` affordance (CSS `::after` badge, driven by the viewport-aware Link behavior).

**2. Build Skill Guide:**
1. Read `components/link.md` and `_js/nds-link.js` (the JSA-01 CSS-visible viewport-partition exemplar: visible links tagged synchronously, off-screen links via `NDS.onIntersect` to avoid CLS).
2. Markup: `a.nds-link` (inline text); `a.nds-link.nds-color` for doc references; `a.nds-btn.nds-*` for link-styled buttons; `nds-external` on new-tab links.
3. External links: `target="_blank"` + `rel="noopener noreferrer"`; the `::after` badge is CSS — never hand-add an icon per link.
4. Link colors come from tokens (`--link-*`); never hardcode.

**3. Data Input & Customization Questions (for User):**
- **Link inventory:** Which text phrases link where (internal pages, external resources)? Provide label → destination per block.
- **External policy:** Which destinations open in a new tab (external sites, PDFs) and which stay in-page?
- **Icon needs:** Which links carry a leading icon (download, external, mailto)?
- **Dynamic links:** Which links are data-driven (service URLs, document downloads) and what is the field/schema?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Inline links are identity elements — the institutional link color (brand-600/700 with dark variant) is the sanctioned accent; the external badge inherits currentColor. Do not recolor surrounding text.
- **Sustainability Considerations:** Text + one CSS pseudo-element badge (no image, no per-link markup); the viewport partition avoids CLS on long link lists.
- **Accessibility Notes:** Link text describes the destination; external links announced; focus-visible rings; `rel="noopener"` on every `target="_blank"`.

---

### Guide 38 — Loading

**Component Name:** Loading

**1. Component Description:**
A versatile loading spinner for indicating in-progress states across any element — buttons, panels, full-page loads, and content regions.

**2. Build Skill Guide:**
1. Read `components/loading.md` and `_sass/components/_loading.scss`.
2. Markup: the spinner element with a size modifier; place inside buttons (with label swap), panels (centered), or as a full-region placeholder.
3. Use semantic loading state: `aria-busy="true"` on the container while loading; the spinner is decorative.
4. Pair with Empty (Guide 32) for the full state machine: loading → empty → content.

**3. Data Input & Customization Questions (for User):**
- **Loading states:** Which interactions show loading (form submit, filter apply, fetch regions)? What size per context?
- **Label copy:** Which buttons swap their label during loading ("Submit" → "Submitting…") in ar/en?
- **Duration policy:** At what expected durations do you show a spinner vs. nothing (instant actions need no spinner)?
- **Error handling:** What happens if loading fails (timeout copy, retry action — Guide 71 Request)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The spinner may use the institutional color (a small, motion-only accent). Keep the animation standard (reduced-motion respected).
- **Sustainability Considerations:** CSS-only spinner (no GIF/SVG assets, no JS animation loop); hidden when not loading (zero paint cost).
- **Accessibility Notes:** `aria-busy` on containers; spinner `aria-hidden` (progress via label/live region); reduced-motion renders a static indicator.

---

### Guide 39 — Modal

**Component Name:** Modal

**1. Component Description:**
Focuses the user on a single task or decision with an overlay dialog that must be addressed before continuing — confirmations, forms-in-dialog, image/details views.

**2. Build Skill Guide:**
1. Read `components/modal.md` (the overlay-pattern reference) and `_js/nds-modal.js`.
2. Markup: trigger with `data-modal-target` → modal container with `role="dialog"`/`aria-modal="true"`, `aria-labelledby` (title), header/body/footer, close button; `hidden` by default.
3. Behavior: `NDS.Modal` handles focus trap (`NDS.trapFocus`), backdrop (`NDS.Backdrop`), scroll lock, Escape, outside-click close; one modal open at a time.
4. Keep modal content server-rendered in the markup (progressive enhancement).
5. Use for confirmations, single-task forms, embedded details — not long content (use a Panel) or primary navigation.
6. Audit with `/nds-js-audit nds-modal.js` (PERSONA 3.1 exemplar: `open()`/`close()`, `NDS.State`, backdrop API).

**3. Data Input & Customization Questions (for User):**
- **Dialog inventory:** Which interactions use a modal (confirm delete, terms acceptance, login, details)? Provide trigger label + dialog title + body + action buttons per dialog.
- **Action semantics:** What are the confirm/cancel labels and behaviors (destructive confirmations need explicit copy)?
- **Form dialogs:** Which modals embed forms, and do they follow the Forms guide's validation contract?
- **Focus/labels:** What is the accessible title per dialog, and which element receives focus on open?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The modal card stays white/neutral; the primary action button and title accent may take the institutional color. The overlay stays neutral-dark. Modals are task surfaces, not brand moments.
- **Sustainability Considerations:** Content is server-rendered in the DOM (no fetch to open); one shared implementation for all dialogs.
- **Accessibility Notes:** Focus trap with return-to-trigger; `aria-modal` + labelled dialog; Escape and backdrop close; scroll lock; reduced-motion transitions; fully keyboard-operable.

---

### Guide 40 — Panels

**Component Name:** Panels

**1. Component Description:**
A content-agnostic surface that slides in from any viewport edge for settings, filters, details, notifications, or secondary content — revealed on demand without leaving the page. The accessibility panel and notification trays are built on it.

**2. Build Skill Guide:**
1. Read `components/panels.md` and `_js/nds-panels.js`.
2. Markup: `aside.nds-panel` with `data-panel-side="end|start"`, `hidden` by default; header (title + close), body, optional footer; toggled by a button with `aria-controls`/`aria-expanded`.
3. Choose panel over modal: long/secondary content, settings, persistent context — panels don't block the page the way modals do.
4. Behavior: slide-in + backdrop, scroll-lock policy per use, pooled resize handling (`NDS.onResize` unsubscribe bridge — PERSONA 6 exemplar).
5. Audit with `/nds-js-audit nds-panels.js`.

**3. Data Input & Customization Questions (for User):**
- **Panel inventory:** Which secondary surfaces become panels (accessibility settings, notifications, filters, help)? Provide title, content, and edge per panel.
- **Toggle points:** Which triggers open each panel (FAB, nav action, inline button), and what are their accessible names?
- **Content sources:** Which panels hold dynamic content (notifications feed, filter facets) and what is the data source/refresh policy?
- **Dismissal:** Close on backdrop click, Escape, or both — per panel?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Panel surface neutral; the header title may carry a small brand accent; primary actions follow button rules. Utility surfaces.
- **Sustainability Considerations:** Content server-rendered (no fetch to open); pooled resize observers released on close; no media inside unless needed.
- **Accessibility Notes:** Toggle `aria-expanded`/`aria-controls`; focus moves in and returns on close; Escape/backdrop close; scroll-lock policy; full keyboard path.

---

### Guide 41 — Persona

**Component Name:** Persona

**1. Component Description:**
An identity block presenting a person's name, role, and supporting detail with an optional avatar and action row — used in navigation user menus, profile pages, team directories, and quote attribution.

**2. Build Skill Guide:**
1. Read `components/persona.md` and `_sass/components/_persona.scss`.
2. Markup: `div.nds-persona` → avatar (Guide 23) + text block (name, role, optional detail) + optional action row.
3. Size/alignment variants per context: compact (nav user), standard (profiles), with actions (directories).
4. Pair with the drawer (user menu), header actions (Guide 02), and quote attribution (Guide 42).

**3. Data Input & Customization Questions (for User):**
- **Person data:** For each persona (current user, team members, officials), what is the name, role/title, and supporting detail (department, email, phone)?
- **Avatar:** Which image (or initials fallback) per person, and alt text?
- **Actions:** Which actions belong in the action row (view profile, sign out, contact, edit)? Labels + destinations.
- **Contexts:** Where do personas appear (nav user menu, about page, team directory) and what variant per context?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The avatar's initials circle may carry the brand tint (Guide 23); role text stays neutral; action buttons follow button rules. The persona represents the person, not the brand.
- **Sustainability Considerations:** Tiny avatar images or SVG initials; text-only details; shared component CSS.
- **Accessibility Notes:** Names/roles are real text; avatar alt or empty-alt-with-adjacent-name; action buttons have descriptive labels; focus states on interactive rows.

---

### Guide 42 — Quote

**Component Name:** Quote

**1. Component Description:**
A semantic quotation block for surfaced, attributed content with decorative icon marks, an optional title, and persona-based attribution.

**2. Build Skill Guide:**
1. Read `components/quote.md` and `_includes/quote.html`.
2. Markup: `blockquote.nds-quote` with decorative quote mark, the quote text, optional title, and attribution via the persona pattern.
3. Use for testimonials, official statements, highlighted guidance — not regular paragraphs.
4. Keep quotes genuine and attributed; no fabricated attribution.

**3. Data Input & Customization Questions (for User):**
- **Quote content:** Which quotes appear (testimonials, official statements, guidance)? Provide exact wording, source name, and role/title.
- **Attribution:** Which quotes carry persona attribution (avatar + name + role) vs. plain text ("The Ministry of X")?
- **Titles:** Which quotes have a title line?
- **Placement:** On which pages/sections do quotes appear, and how many per page?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The decorative quote mark and attribution accent may take the institutional color; the quote text stays neutral. One quiet accent.
- **Sustainability Considerations:** Text + one SVG mark; no imagery; concise quotes (2–3 sentences).
- **Accessibility Notes:** Real `blockquote` semantics; attribution is text; quote marks decorative (`aria-hidden`); readable without the persona avatar.

---

### Guide 43 — Rating

**Component Name:** Rating

**1. Component Description:**
A star-based input and display component for collecting user feedback or showing aggregate scores (reviews, services, satisfaction). Appears in the sub-hero meta (display) and interactive vote menus (input).

**2. Build Skill Guide:**
1. Read `components/rating.md` and `_js/nds-rating.js`.
2. Display markup: `div.nds-rating.nds-xs` with `data-rating="4.5"` and star spans (`aria-hidden`); the numeric value is real text alongside (`span.nds-total-rate`).
3. Input markup: stars as `button.nds-rating-star` with `aria-label="N star(s)"`; selection via `data-state` tokens; submit via the surrounding menu/form.
4. Star rendering (full/half/empty) is CSS from the numeric value — no images.
5. Audit with `/nds-js-audit nds-rating.js`.

**3. Data Input & Customization Questions (for User):**
- **Rating displays:** Which pages show aggregate ratings? What is the value source (score + vote count) and update cadence?
- **Rating inputs:** Where do users vote (service satisfaction, content helpfulness) and what is the scale (1–5)?
- **Vote handling:** Where do votes go (REST, analytics, CRM), what is the thank-you message, and how do you prevent double-voting?
- **Localization:** What are the "N stars" labels and "X votes" phrasing in ar/en?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Filled stars may take the institutional color (small, contained accent); empty stars stay neutral gray.
- **Sustainability Considerations:** Stars are CSS-rendered (no star images); text values only; one small vote request (no polling).
- **Accessibility Notes:** Display: value is real text, stars decorative; input: real buttons with `aria-label`s, state announced; keyboard operable; feedback announced.

---

### Guide 44 — Scroll More

**Component Name:** Scroll More

**1. Component Description:**
A general-purpose overflow wrapper that auto-detects its scroll axis, fades the edges of clipped content, and shows a sticky button to scroll through the rest. Used in nav tab lists, drawers, and long horizontal menus.

**2. Build Skill Guide:**
1. Read `components/scroll-more.md` and `_js/nds-scroll-more.js` (the RAF-throttled scroll + pooled ResizeObserver exemplar).
2. Markup: `div.nds-scroll-more` wrapping the scrollable content (`.nds-scroll-more-content`) + the show-more button; the button appears only when content actually clips.
3. Works on horizontal (tab lists) and vertical (drawer) axes — auto-detected.
4. Edge fades are CSS; the button scrolls by one container viewport.

**3. Data Input & Customization Questions (for User):**
- **Wrapper inventory:** Which long lists/tab rows need the wrapper (nav tabs, drawer menus, horizontal link rows)?
- **Button copy:** What label/aria-label does the show-more button carry in ar/en (icon-only acceptable with label)?
- **Step size:** One container-width/height per click, or a custom step?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The show-more button may take the brand color at small size (subtle icon button); the fades stay neutral.
- **Sustainability Considerations:** One pooled ResizeObserver per component; RAF-throttled scroll (no per-frame work); button hidden until overflow exists (zero cost on short lists).
- **Accessibility Notes:** The button is a real control with an accessible name; keyboard users can tab to content; reduced-motion respected.

---

### Guide 45 — Table of Contents (TOC)

**Component Name:** Table of Contents (TOC)

**1. Component Description:**
A navigable outline that auto-builds from a page's headings and keeps the current section highlighted as the reader scrolls — typically hosted in the Side Info column of content pages.

**2. Build Skill Guide:**
1. Read `components/toc.md` and `_js/nds-toc.js`; see it in the Content Template.
2. The TOC container lives in the sideinfo (or content start); `NDS.Toc` builds the list from headings (configured level range), generates anchors, and highlights the in-view section via intersection observation.
3. Configuration: heading range (h2–h3), scroll offset, container scope.
4. Pair with `ui-shell/sideinfo.md` (Guide 06); `nds-sideinfo nds-sm/md` for link lists.

**3. Data Input & Customization Questions (for User):**
- **Heading scope:** Which pages host a TOC, and which heading levels should it include (h2 only, or h2–h3)?
- **Page structure:** Do your content pages expose stable heading IDs, or must the TOC generate them?
- **Labels:** What is the TOC heading label ("On this page" / "Contents") in ar/en?
- **Sticky behavior:** Should the TOC stick while scrolling (Guide 06's `nds-sticky`), and on which page types?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The current-section item and hover states take the institutional color; the rest stays neutral. A quiet, functional accent.
- **Sustainability Considerations:** Built from existing headings (no duplicate content); intersection-based highlighting (no scroll-listener churn); text-only.
- **Accessibility Notes:** A nav list with links to heading targets; current-section state announced/marked beyond color; keyboard navigable.

---

### Guide 46 — Tags

**Component Name:** Tags

**1. Component Description:**
Small status/category labels (version badges, categories, statuses) used in card tags rows, hero meta, drawer counts, and doc pages. Distinct from interactive Chips (Guide 25) — tags are non-interactive metadata.

**2. Build Skill Guide:**
1. Read `components/tags.md` and `_sass/components/_tags.scss`.
2. Markup: `span.nds-tag` (style modifiers `nds-gray`, `nds-blue`, `nds-green`, `nds-red`; sizes `nds-xs/nds-sm/nds-md`; `nds-rounded`) with `span.nds-label` inside; optional leading icon.
3. Use status-tinted tags for meaning (new, updated, deprecated); gray for neutral metadata.
4. In card grids, tags are the facet carriers (`data-filter="category|tech|since"` — Guide 13).

**3. Data Input & Customization Questions (for User):**
- **Tag vocabulary:** What tags exist in your content (categories, versions, statuses, tech) — the exact labels in ar/en?
- **Color mapping:** Which tags use which tint (blue = category, green = updated, red = deprecated, gray = neutral)?
- **Data source:** Are tags derived from content metadata (CMS taxonomy, version fields) or hand-authored per card?
- **Icon usage:** Which tags carry a leading icon (clock for "updated")?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** One tag family (e.g., your primary category tag) may use the brand tint; the rest keep the fixed palette. Never recolor all tags to brand.
- **Sustainability Considerations:** Text + optional tiny SVG icon; shared component CSS; tags are spans (no interactive weight unless chips).
- **Accessibility Notes:** Tag text is real text; when a tag is the only status signal, surrounding text states the meaning; AA contrast on tinted labels.

---

### Guide 47 — Tooltip

**Component Name:** Tooltip

**1. Component Description:**
A click-activated balloon revealing contextual guidance, definitions, or hints next to the term it relates to — with opt-in hover activation, a status-colored icon chip, and smart viewport positioning.

**2. Build Skill Guide:**
1. Read `components/tooltip.md` and `_js/nds-tooltip.js`.
2. Markup: trigger with `nds-tooltip`/`nds-term` + `data-tooltip-message` and optional `data-tooltip-hover` (delay for opt-in hover).
3. Behavior: `NDS.Tooltip` (delegating to `NDS.Dropmenu` lifecycle — PERSONA 3.1 passthrough) positions via `NDS.flipPosition`, portals, and manages open/close + Escape.
4. Use for definitions and short guidance — never critical instructions (content must exist without it).
5. Audit with `/nds-js-audit nds-tooltip.js`.

**3. Data Input & Customization Questions (for User):**
- **Term inventory:** Which terms/controls need tooltips, and what is the exact help text per tooltip in ar/en?
- **Trigger mode:** Click only vs. click + hover (with delay) per tooltip?
- **Icon chips:** Do any tooltips carry a status-colored icon chip, and what does it signal?
- **Placement:** Any terms whose balloon must pin to a specific edge?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The balloon stays neutral; the info icon chip uses the fixed info blue (status), not brand. Trigger hover states follow link/button rules.
- **Sustainability Considerations:** Balloon content is a `data-*` attribute (no hidden DOM copies); positioning is pooled (`flipPosition`, no per-tooltip scroll listeners); text-only.
- **Accessibility Notes:** Click-activation (hover opt-in, never sole); Escape closes; content available to screen readers; focus stays on the trigger (tooltips are not dialogs).

---

## Forms group

### Guide 48 — Autocomplete

**Component Name:** Autocomplete

**1. Component Description:**
A remote typeahead search input with keyboard navigation, result highlighting, and debounced API fetching — for service search, city/region selection (Saudi Cities dataset), and entity lookup.

**2. Build Skill Guide:**
1. Read `components/autocomplete.md` and `_js/nds-autocomplete.js` (the size-capped fetch + abort exemplar: in-flight requests abort on new keystrokes).
2. Markup: text input with autocomplete configuration (endpoint, min characters, debounce, result field mapping); results list rendered by the component.
3. Configure: min-char threshold, debounce delay, max results, request size cap, keyboard navigation (arrows, Enter, Escape), matched-text highlight.
4. Wire the data source: your API or the bundled `saudi-cities.json` (Guide 72).
5. Audit with `/nds-js-audit nds-autocomplete.js`.

**3. Data Input & Customization Questions (for User):**
- **Data source:** Which endpoint serves suggestions? What is the request/response schema (query param; result fields: id, label_ar, label_en)?
- **Match behavior:** Minimum characters before fetching, debounce delay, and max results?
- **Display fields:** Which fields show in results (ar/en labels, subtext), and what value submits (id vs. label)?
- **Offline/local data:** Do any inputs use the Saudi Cities dataset instead of an API — which fields?
- **Empty/error states:** What copy appears for no-results, request failure, or a hung endpoint (Guide 71)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Input, dropdown, and results stay neutral; the selected/highlighted row and focus ring take the institutional color. One accent at a time.
- **Sustainability Considerations:** Debounced fetching (no request per keystroke), size-capped responses, aborted superseded requests (no wasted bandwidth), text-only results.
- **Accessibility Notes:** Input labeled; results list has listbox role with `aria-selected`/`aria-activedescendant`; full keyboard navigation; loading/empty/error states announced.

---

### Guide 49 — Checkbox

**Component Name:** Checkbox

**1. Component Description:**
Multi-selection input controls with clear visual states and accessibility support — for filters, consent, selections, and option groups.

**2. Build Skill Guide:**
1. Read `components/checkbox.md` and `_sass/components/_checkbox.scss`.
2. Markup: custom-styled checkbox pairing the native `input[type="checkbox"]` with the styled visual; label associated via `for`/`id`.
3. States: unchecked/checked/indeterminate, disabled, invalid; state via `data-state` tokens (`NDS.State`).
4. Groups: checkbox groups with group labels; selection counting via the Selection component (Guide 62).
5. Audit with `/nds-css-audit _sass/components/_checkbox.scss` (TOK-06 radio/checkbox/switch cluster exemplar).

**3. Data Input & Customization Questions (for User):**
- **Option inventory:** Which checkbox groups exist (filters, consent, permissions)? Provide option labels (ar/en) and values.
- **Default state:** Which boxes start checked (consent pre-checks are legally sensitive — confirm policy), unchecked, or indeterminate?
- **Validation:** Which boxes are required (terms acceptance) and what is the error pattern?
- **Submission:** What field names/values submit per group (native array for multi-select)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The checked fill and focus ring take the institutional color; unchecked/disabled states stay neutral. Small, functional accent.
- **Sustainability Considerations:** Pure CSS over the native input (no images, no icon per state); native input preserved (no JS-only rendering).
- **Accessibility Notes:** Native input retained; labels associated; errors linked (`aria-describedby`); indeterminate announced where supported; focus-visible rings.

---

### Guide 50 — Date Picker

**Component Name:** Date Picker

**1. Component Description:**
An interactive calendar for selecting dates with support for both Gregorian and Hijri calendars — for appointments, deadlines, birth dates, and service eligibility.

**2. Build Skill Guide:**
1. Read `components/date-picker.md` (a reference doc) and `_js/nds-date-picker.js` (the two-phase `cleanup()`/`destroy()` lifecycle exemplar).
2. Markup: input + calendar popover; configuration via `data-calendar="gregorian|hijri"` and min/max constraints.
3. Behavior: `NDS.DatePicker` — calendar navigation (month/year), keyboard (arrows, Home/End, Enter, Escape), selection commits to the input, localization (ar/en; Hijri via API/Intl).
4. Constraints: min/max dates, disabled days (weekends/holidays) per policy.
5. Audit with `/nds-js-audit nds-date-picker.js` (JSD-01 vocab carve-out, PERSONA 6 two-phase exemplar).

**3. Data Input & Customization Questions (for User):**
- **Calendar choice:** Which fields use Gregorian, which Hijri, and which offer both? Default per locale?
- **Constraints:** Valid ranges per field (birth dates 18+, appointments within 90 days)? Which days are disabled (weekends, holidays list)?
- **Format:** Display/input format per locale (DD/MM/YYYY, Arabic-Indic digits) and the submitted value format (ISO)?
- **Defaults:** Which fields pre-fill (today, +7 days) and from what logic?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The selected day and today marker take the institutional color; the calendar surface stays neutral. Range/selection states stay fixed.
- **Sustainability Considerations:** Calendar renders on demand (popover hidden until opened); Hijri data cached locally (24h) with Intl fallback; text-only.
- **Accessibility Notes:** Input labeled; the calendar is a dialog with focus management; full keyboard navigation; `aria-live` for date changes; selected date conveyed in text; localized labels.

---

### Guide 51 — Editor

**Component Name:** Editor

**1. Component Description:**
A rich-text WYSIWYG editor that upgrades a standard textarea, adds a generated, localized toolbar, and converts pasted Word/Google Docs/web content into clean NDS markup — while keeping pasted NDS components intact.

**2. Build Skill Guide:**
1. Read `components/editor.md` and `_js/nds-editor.js` (init expando + fork-annotation exemplars).
2. Markup: a `textarea` marked for upgrade; the editor generates the localized toolbar, wires contenteditable, and syncs back to the textarea/form field.
3. Paste handling: clean Word/Docs/web HTML into NDS-valid markup; preserve pasted NDS component classes.
4. Configure: allowed formats (headings, lists, links, emphasis), toolbar subset, placeholder.
5. Audit with `/nds-js-audit nds-editor.js` (escapeHtml/safeUrl fork annotations are documented carve-outs).

**3. Data Input & Customization Questions (for User):**
- **Editor contexts:** Where do rich-text inputs occur (content authoring, announcements, descriptions)? Which fields use the editor vs. plain inputs?
- **Format policy:** Which formats may authors use (h2–h4, lists, links, emphasis) and which are forbidden (raw HTML, scripts — sanitization policy)?
- **Toolbar localization:** Which toolbar buttons appear in ar/en, and what are the labels?
- **Output handling:** What HTML does the editor output, and is server-side sanitization confirmed?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The toolbar and surface stay neutral; the active formatting state and focus ring take the institutional color. The editor is a tool, not a brand surface.
- **Sustainability Considerations:** Editor JS ships deferred (only where present); paste-cleaning prevents bloated Word HTML (smaller stored content, faster render); no media assets.
- **Accessibility Notes:** The textarea remains a fallback; toolbar buttons are real buttons with labels; focus managed between toolbar and content; keyboard shortcuts documented.

---

### Guide 52 — Multiselect

**Component Name:** Multiselect

**1. Component Description:**
A form field for picking multiple options from grouped lists, with selections shown as removable chips and submitted natively as a checkbox array.

**2. Build Skill Guide:**
1. Read `components/multiselect.md` (a reference doc) and `_js/nds-multiselect.js`.
2. Markup: the field + options (grouped with labels); the component renders the trigger, dropdown list with checkboxes, and the chip row.
3. Configuration: option groups, max selections, search within options, default selections.
4. Submission: selections submit as a native array (hidden checkboxes) — no JS required to submit.
5. Audit with `/nds-js-audit nds-multiselect.js`.

**3. Data Input & Customization Questions (for User):**
- **Option data:** Which multi-select fields exist (services, interests, recipients) and what are the grouped options (label ar/en + value)?
- **Limits:** Maximum selection count per field? Is "select all" allowed?
- **Defaults:** Which options start selected, and is that data-driven (profile preferences)?
- **Search:** Do long option lists need search within the dropdown?
- **Submission:** What field name/value array submits?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Selected chips (Guide 25) may take the brand tint; the dropdown stays neutral; focus rings use the brand token.
- **Sustainability Considerations:** Native checkbox-array submission (works without JS); options render on open (no hidden DOM cost); text-only.
- **Accessibility Notes:** Field label + `aria-describedby` hints; listbox with keyboard navigation; selections announced; chips removable with labeled buttons; errors linked.

---

### Guide 53 — OTP Input

**Component Name:** OTP Input

**1. Component Description:**
A one-time-password input for verification codes with automatic focus management, paste support, and RTL-aware keyboard navigation.

**2. Build Skill Guide:**
1. Read `components/otp.md` and `_js/nds-otp.js` (the `NDS.onDOMAdd` array-arity exemplar).
2. Markup: a group of single-character inputs (length configurable, e.g., 4/6); the component auto-advances focus, supports paste, and handles Backspace/arrows in both directions (RTL-aware).
3. Configuration: code length, input grouping, auto-submit on completion (with your endpoint).
4. Pair with the cooldown resend button (Guide 28) and the forms validation contract.

**3. Data Input & Customization Questions (for User):**
- **Code policy:** OTP length (4/6) and character set (numeric or alphanumeric)?
- **Delivery:** How is the code delivered (SMS/email via your provider) and what is the expiry window?
- **Resend policy:** Resend cooldown duration and max attempts (anti-abuse)?
- **Verification flow:** What happens on success (navigate, unlock) and on failure (error, remaining attempts)?
- **Localization:** Helper/error texts in ar/en ("Enter the 6-digit code sent to 05XX…")?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The active input focus ring and the verify button take the institutional color; error states keep the fixed red.
- **Sustainability Considerations:** Text-only; one request per attempt with cooldown + attempt caps (no floods — saves server/energy).
- **Accessibility Notes:** Group labeled; each input reachable; paste support; errors announced; RTL arrows correct; autocomplete="one-time-code" respected.

---

### Guide 54 — Radio Button

**Component Name:** Radio Button

**1. Component Description:**
Single-selection input controls for mutually exclusive options with clear visual feedback — for payment method, service type, or frequency.

**2. Build Skill Guide:**
1. Read `components/radio.md` and `_sass/components/_radio.scss` (the TOK-06 resolved exemplar: `--radio-primary-*` aliases).
2. Markup: custom-styled radio pairing the native `input[type="radio"]`; label associated; `name` groups the set.
3. States: selected/unselected, disabled, invalid; state via `data-state` tokens.
4. Grouping: fieldset/legend (or group label pattern); order options by likelihood of choice.

**3. Data Input & Customization Questions (for User):**
- **Option inventory:** Which radio groups exist (payment, type, frequency) and what are the options (label ar/en + value)?
- **Default selection:** Which option is pre-selected per group (or none — required choice)?
- **Validation:** Is a choice required, and what is the error message?
- **Dependent fields:** Do any options reveal dependent inputs ("Other" + text) and what are they?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The selected fill and focus ring take the institutional color; unselected/disabled stay neutral.
- **Sustainability Considerations:** Pure CSS over the native input (no images); lightweight groups.
- **Accessibility Notes:** Native input retained; fieldset/legend grouping; errors linked; focus-visible; selected state announced.

---

### Guide 55 — Slider

**Component Name:** Slider

**1. Component Description:**
A range input for selecting a single value or a continuous min–max range from a numeric scale, with proportional sizes and full keyboard control — for budgets, scores, age ranges, and thresholds.

**2. Build Skill Guide:**
1. Read `components/slider.md` and `_sass/components/_slider.scss`.
2. Markup: native `input[type="range"]` styled by the component (single thumb) or the dual-thumb range variant; labels for min/max and current value.
3. Configuration: min, max, step, default value(s), value display (formatting via Numbers, Guide 17), disabled state.
4. The value text is real markup beside the control (never thumb-tip only).

**3. Data Input & Customization Questions (for User):**
- **Slider inventory:** Which inputs are sliders (budget, rating threshold, age)? Provide min/max/step and unit.
- **Range vs. single:** Which are continuous ranges (two thumbs) vs. single value?
- **Defaults:** What are the default values and their data source (profile, saved search)?
- **Value display:** How should the value render ("SAR 500", "5 of 10") and with which digit formatting?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The filled track and thumb take the institutional color; the empty track stays neutral. One accent.
- **Sustainability Considerations:** Native range input (no custom drag logic, no images); value updates are text-only.
- **Accessibility Notes:** Native semantics + labels; keyboard arrows/Home/End; value announced on change; AA contrast for thumb vs. track.

---

### Guide 56 — Switch

**Component Name:** Switch

**1. Component Description:**
A toggle switch for binary choices with clear visual feedback — for settings, notifications, and preferences.

**2. Build Skill Guide:**
1. Read `components/switch.md` and `_sass/components/_switch.scss` (track/thumb token exemplar).
2. Markup: custom-styled switch pairing the native checkbox (or `role="switch"` with `aria-checked`); label associated; state via `data-state` tokens.
3. States: on/off, disabled, pending (async toggle with busy state).
4. Use for settings/preferences — not legal consents (use Checkbox for those).

**3. Data Input & Customization Questions (for User):**
- **Switch inventory:** Which binary settings exist (notifications, dark mode, email alerts)? Provide label + default per switch.
- **Persistence:** Are states persisted (local prefs, server settings) — what storage key/endpoint?
- **Async behavior:** Do any switches trigger an immediate API call (pending state + revert on failure)?
- **Localization:** On/off labels (where shown) and confirmation texts in ar/en?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The ON track/thumb take the institutional color; OFF/disabled stay neutral. Small, clear accent.
- **Sustainability Considerations:** Pure CSS over the native control; no images; local persistence where possible (no redundant requests).
- **Accessibility Notes:** Native checkbox semantics (or switch role with `aria-checked`); label associated; state announced; keyboard toggle; focus-visible; pending communicated.

---

### Guide 57 — Tag Input

**Component Name:** Tag Input

**1. Component Description:**
A free-text field that turns typed values into removable chip tags, committing on Enter or comma and submitting natively as an array — for keywords, skills, references, and labels.

**2. Build Skill Guide:**
1. Read `components/taginput.md` and `_js/nds-taginput.js`.
2. Markup: the input + chip container; the component commits on Enter/comma, renders removable chips (Guide 25), and keeps a hidden native array field.
3. Configuration: max tags, allowed pattern, dedupe policy, paste behavior.
4. Combine with suggestions (autocomplete) where tag vocabularies are controlled.

**3. Data Input & Customization Questions (for User):**
- **Tag vocabularies:** Which fields accept free tags? Is there a controlled suggestion list (from where) or fully free text?
- **Limits:** Max tag count and max length per tag?
- **Validation:** Which characters/patterns are allowed (Arabic/English letters) and what is the error message?
- **Submission:** What field name/value array submits, and is dedupe case/locale-insensitive?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Committed chips may take the brand tint; the input focus ring uses the brand token.
- **Sustainability Considerations:** Text-only; lightweight chip spans; hidden native array keeps submission JS-free.
- **Accessibility Notes:** Input labeled; chips removable with labeled buttons; committed tags announced; keyboard (Enter/comma) and paste paths; errors linked.

---

### Guide 58 — Upload

**Component Name:** Upload

**1. Component Description:**
A file uploader with drag-and-drop or compact browse modes that validates and lists selected files, then sends them to your server or with a form submit.

**2. Build Skill Guide:**
1. Read `components/upload.md` and `_js/nds-upload.js` (the re-armed `dragAbortController` exemplar).
2. Markup: the dropzone (or browse button) + file list; the component validates each file (type, size, count), renders the list with remove controls, and submits via your endpoint or the enclosing form.
3. Configuration: accepted types, max size, max count, multiple vs. single, drag states, progress display.
4. Server contract: confirm endpoint, multipart field name, and size limits match client validation.

**3. Data Input & Customization Questions (for User):**
- **File policy:** What types and size limits apply per field (PDF ≤ 5 MB, images ≤ 2 MB)? Max count?
- **Purpose mapping:** Which forms accept uploads (documents, photos, attachments) — required vs. optional?
- **Storage/endpoint:** Where do files go? Endpoint, field name, auth/nonce requirement?
- **Feedback copy:** Messages for size/type violations, progress, and success/failure in ar/en?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The dropzone border/focus state and the upload button take the institutional color; file rows stay neutral; error rows keep fixed red.
- **Sustainability Considerations:** Client-side validation prevents wasted uploads (bandwidth/energy); files upload once; CSS dropzone (no heavy drag-drop library).
- **Accessibility Notes:** The dropzone is also a real file input (keyboard-accessible); rows have labeled remove buttons; progress/status announced; drag-drop is a bonus, never the only path.

---

### Guide 59 — Voice Input

**Component Name:** Voice Input

**1. Component Description:**
An auto-wired voice-to-text button that lets users dictate into a text field, with automatic Arabic/English language detection, audio feedback tones, and an `isSupported()` gate for unsupported browsers.

**2. Build Skill Guide:**
1. Read `components/voice-input.md` and `_js/nds-voice-input.js`.
2. Markup: a mic button beside a text input; the component wires recognition (Web Speech API), detects the input's language (ar/en), plays start/stop tones, and inserts the transcript.
3. Gate: render the button only when `isSupported()` passes.
4. Configure: language detection mode, interim vs. final results, timeout behavior.

**3. Data Input & Customization Questions (for User):**
- **Use contexts:** Which fields offer voice input (search, messages, long descriptions)? Is it beneficial for your audience?
- **Language policy:** Match the page locale, offer both ar/en, or auto-detect?
- **Fallback:** What happens on unsupported browsers (button hidden or "not supported" state)?
- **Privacy:** Is voice processed on-device or sent to a service — what notice accompanies the mic button?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The mic button (subtle/icon-only) and its active recording state may take the institutional color; idle stays neutral.
- **Sustainability Considerations:** On-device recognition where available (no server round-trip per utterance); the button renders only where supported (no dead UI).
- **Accessibility Notes:** Accessible name on the mic button; recording state announced; transcripts land in the labeled input; keyboard operable; privacy notice accessible.

---

## Data group

### Guide 60 — Chart

**Component Name:** Chart

**1. Component Description:**
Data visualization with bar, line, pie, and donut charts rendered as pure SVG with built-in theming (tokens), tooltips, and responsive sizing — for dashboards, KPIs, and reports.

**2. Build Skill Guide:**
1. Read `components/chart.md` (the API-heavy reference doc) and `_js/nds-chart.js`.
2. Usage: `NDS.Chart.create({...})` with chart type, data series, labels, and options; the SVG renders inline (no canvas, no external library).
3. Configuration: type, data structure, colors (from tokens — status + brand), tooltips, legend, axes, responsive behavior.
4. Accessibility: every chart ships with a data table or textual summary (the SVG is supplementary).
5. Audit with `/nds-js-audit nds-chart.js` (`renderAbortController` exemplar).

**3. Data Input & Customization Questions (for User):**
- **Chart inventory:** Which metrics need charts, and which type fits each (comparison → bar, trend → line, share → pie/donut)?
- **Data source:** Where does chart data come from (API, database, export)? What is the schema (labels, series, values) and refresh cadence?
- **Formatting:** How should values format (Numbers/currency — Guide 17) and which locale digits?
- **Color usage:** Which series use brand vs. status vs. neutral colors (max 1–2 brand series per chart)?
- **Fallback data:** What table/text summary accompanies each chart for non-visual access?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** One primary series may use the institutional color; comparison series use neutral/status ramps. Do not render every series in brand — charts stay readable.
- **Sustainability Considerations:** Pure SVG (no chart-library payload, no canvas); server-rendered data where possible; charts render once on intersection (no idle animation loops).
- **Accessibility Notes:** Every chart has a data table or textual equivalent; tooltips are supplementary; color is not the sole differentiator (patterns/labels); reduced-motion respected.

---

### Guide 61 — Export

**Component Name:** Export

**1. Component Description:**
A declarative download utility that turns any table, card list, or marked-up container into CSV, Excel, or print-ready PDF, with selection and pagination support.

**2. Build Skill Guide:**
1. Read `components/export.md` and `_js/nds-export.js` (programmatic-API namespace — bracket console form exemplar).
2. Usage: mark the source container + trigger buttons (`NDS.Export` API: `csv`/`xls`/`pdf`); the utility reads the DOM, respects current selection (Guide 62) and pagination, and downloads.
3. Configuration: formats offered, filename pattern, column mapping, RTL/print handling for PDF.
4. Server fallback: for large datasets, provide a server-side export endpoint as the scalable path.

**3. Data Input & Customization Questions (for User):**
- **Exportable surfaces:** Which tables/lists offer export (service lists, reports, dashboards)? Which formats per surface?
- **Scope:** Export current filters/selection/pagination (what's shown) or always the full dataset?
- **Column policy:** Which columns export (all or a subset)? Any sensitive columns excluded?
- **File naming:** What filename pattern (e.g., `services-report-2026-08-01.csv`) and locale (ar/en headers)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Export buttons follow button rules (secondary/outline); the PDF header may carry a small brand mark per document policy. Data stays unadorned.
- **Sustainability Considerations:** Client-side export for small datasets (no server load); server-side for large ones (one request); generated files are text/compressed.
- **Accessibility Notes:** Export buttons labeled; the exported file duplicates accessible on-page data (the table remains the accessible source).

---

### Guide 62 — Selection

**Component Name:** Selection

**1. Component Description:**
A selected-items counter for tables, card grids, and checkbox lists, feeding "5 selected of 48" record widgets that swap in automatically while a selection is active.

**2. Build Skill Guide:**
1. Read `components/selection.md` and `_js/nds-selection.js` (re-armable `_controller` init exemplar).
2. Markup: the selection widget container + the checkbox list/table it observes; the component counts selections, renders "N selected of M", and offers bulk actions.
3. Configuration: scope selector, bulk actions list, count formatting, auto-show/hide.
4. Pair with Tables row selection (Guide 64) and Export scope (Guide 61).

**3. Data Input & Customization Questions (for User):**
- **Selection surfaces:** Which tables/lists support selection (records, services, users)? What is the item count source?
- **Bulk actions:** Which appear when items are selected (delete, export, change status, send)? Labels + confirmation policy (destructive needs confirm).
- **Count format:** How do counts render ("5 selected of 48", Arabic-Indic digits) and what happens at "all selected"?
- **Persistence:** Does selection survive pagination/sorting or reset?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The selection bar's accent (count highlight, bulk primary button) takes the institutional color; the bar stays neutral.
- **Sustainability Considerations:** Counts derive from existing state (no re-query); the widget renders only while a selection exists.
- **Accessibility Notes:** Count announced on change (live region); bulk actions labeled; destructive actions confirm; selection visible beyond color.

---

### Guide 63 — Sort

**Component Name:** Sort

**1. Component Description:**
A DOM-reorder engine for lists, grids, and tables: pass an accessor, wire your triggers, and `NDS.Sort` handles type detection, direction cycles, accessibility attributes, and URL persistence.

**2. Build Skill Guide:**
1. Read `components/sort.md` and `_js/nds-sort.js`.
2. Usage: mark sortable columns/controls with accessors; `NDS.Sort` reorders the DOM, cycles direction (asc → desc → none), stamps `aria-sort`, and persists in the URL.
3. Configuration: accessor per column, default sort, type detection (numeric/date/string, locale-aware for ar), URL param name.
4. Combine with the Toolbar/Gallery (Guide 13) and Tables (Guide 64).

**3. Data Input & Customization Questions (for User):**
- **Sortable surfaces:** Which lists/tables are sortable, and which columns (label + accessor + type)?
- **Default sort:** What is the default order per surface (newest, alphabetical, relevance) — data-driven?
- **Locale handling:** How should Arabic strings sort (locale-aware collation) and mixed digits behave?
- **Persistence:** Should the sort survive reload via URL, and what parameter name?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The active sort indicator (arrow/underline) takes the institutional color; inactive triggers stay neutral.
- **Sustainability Considerations:** DOM reorder (no re-fetch, no re-render); type detection avoids per-row work; URL persistence is cheap.
- **Accessibility Notes:** `aria-sort` on headers; sort triggers are buttons with labels; direction announced; focus not lost on reorder.

---

### Guide 64 — Tables

**Component Name:** Tables

**1. Component Description:**
Structured data presentation with built-in sorting, row selection, responsive scrolling, and pagination for datasets of any size — the backbone of directories, dashboards, and administrative views.

**2. Build Skill Guide:**
1. Read `components/tables.md` and `_js/nds-tables.js` (index-space hygiene + `instance.valid` exemplars).
2. Markup: `table.nds-table` (modifier `nds-responsive` for horizontal scroll) with proper `thead`/`tbody`.
3. Features: sorting (Guide 63), row selection (Guide 62), pagination (Guide 13), sticky header where useful, empty state (Guide 32), loading state (Guide 38).
4. Data: server-rendered rows (or fetched with a loading state); every cell is real text.
5. Audit with `/nds-js-audit nds-tables.js` and `/nds-css-audit _sass/components/_tables.scss`.

**3. Data Input & Customization Questions (for User):**
- **Table inventory:** Which datasets render as tables (services, transactions, users, KPIs)? Provide column definitions (label ar/en, accessor, type).
- **Row data:** What is the row source (API, database, CMS)? Row-count scale and pagination size?
- **Interactions:** Which columns are sortable, which rows selectable, and what row actions exist (view, edit, delete — with confirmations)?
- **Responsive policy:** For wide tables, horizontal scroll or card-reflow on mobile (component policy)?
- **Empty/error states:** What copy for zero rows or fetch failure?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The selected-row tint (brand-50), sort indicator, and pagination active state take the institutional color; zebra/borders stay neutral; status cells keep fixed status colors.
- **Sustainability Considerations:** Server-side pagination for large datasets (one page of DOM); text-only cells; sorting/selection on the rendered page (no re-fetch); responsive scroll avoids duplicating the table.
- **Accessibility Notes:** Real `<table>` semantics with `th`/`scope`; `aria-sort` on sortable headers; selection announced; readable without JS; focus management for row actions.

---

## Add-ons

### Guide 65 — Accessibility Panel

**Component Name:** Accessibility Panel

**1. Component Description:**
A site-wide floating panel that lets visitors apply accessibility presets, tune typography, and switch visual filters, with every choice persisted across pages. It is the opt-in add-on (`assets/css/nds-accessibility.*` + `_js/nds-accessibility.js` + the FAB toggle).

**2. Build Skill Guide:**
1. Read `components/accessibility.md` and `_includes/accessibility-panel.html`; enable via `accessibility: true`.
2. Markup: the FAB toggle (`data-accessibility-toggle`, `aria-controls`) + `aside.nds-accessibility-panel[hidden]` (a Panel, Guide 40) with tiles: font-size ladder (`--user-font-scale`), dyslexia font, contrast filters, text spacing.
3. Behavior: `NDS.Accessibility` applies presets as `[data-a11y]`-driven CSS overrides + persisted localStorage; the pre-paint guard applies saved presets before first paint.
4. Localization: panel strings via `NDS.i18n` (ar/en JSON) — see Guide 93.
5. Audit with `/nds-js-audit nds-accessibility.js` (safeMerge exemplars — JSS-06).

**3. Data Input & Customization Questions (for User):**
- **Preset set:** Which presets do you ship (font scale steps, dyslexia font, contrast modes, text spacing)? Any institution-specific presets?
- **Labels:** What are the tile labels and descriptions in ar/en?
- **Persistence policy:** Local only, or synced to a user profile (which endpoint)?
- **Defaults:** Default state (all off) — does any preset need to be on by default?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The FAB follows Guide 35; the panel surface stays neutral. Preset accent states may use the brand color at small scale. Accessibility is functional, not brand.
- **Sustainability Considerations:** The add-on loads only when enabled (separate deferred bundle — no cost for the default experience); presets are CSS variable overrides (no duplicated stylesheets).
- **Accessibility Notes:** The panel meets the standards it provides: keyboard-operable tiles, announced states, focus management, AA contrast in every preset, reduced-motion respected. Every preset must hold contrast (the acceptance test).

---

## Layout group

### Guide 21 — Block

**Component Name:** Block

**1. Component Description:**
A lightweight content-grouping primitive used inside a section body to separate titled sub-groups of paragraphs, lists, tables, and other flow content without starting a new section.

**2. Build Skill Guide:**
1. Read `layout/block.md` and `_sass/layout/_block.scss`.
2. Markup: `div.nds-block` inside a section body, with an optional `h3.nds-block-title`; multiple blocks stack with consistent spacing.
3. Use when a section has several titled sub-groups; use a new Section when the group needs its own full-width identity/background.
4. Nest flow content (paragraphs, lists, tables, alerts, code) freely inside a block.

**3. Data Input & Customization Questions (for User):**
- **Block inventory:** Which page regions split into titled blocks (guidelines, sub-sections of a service page)? Titles + content per block?
- **Heading hierarchy:** What level do block titles use (h3 under a section h2) — does it fit your page structure?
- **Ordering:** What is the logical order of blocks within each section?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Block titles stay neutral (text-display); an optional title rule may take a muted brand tint. Blocks are quiet structure.
- **Sustainability Considerations:** Pure layout CSS (no assets); content is flow text.
- **Accessibility Notes:** Heading structure preserved (h3 within h2 sections); no ARIA needed for static grouping.

---

### Guide 22 — Flex

**Component Name:** Flex

**1. Component Description:**
A lightweight CSS-only utility for quick alignment, direction, and wrapping fixes on ad-hoc elements, with inline custom-property overrides for gap, justify-content, and align-items.

**2. Build Skill Guide:**
1. Read `layout/flex.md` and `_sass/layout/_flex.scss`.
2. Markup: `div.nds-flex` with modifier classes (`nds-row`/`nds-col`, `nds-wrap`, alignment helpers) and optional inline custom properties.
3. Use for one-off layouts (button rows, meta lines, icon+text pairs); prefer the Grid (Guide 08) for structured multi-column layouts.
4. Keep flex utilities out of component internals — components own their layout.

**3. Data Input & Customization Questions (for User):**
- **Ad-hoc layouts:** Which one-off arrangements need flex (action rows, tag clusters, icon+label pairs)? Alignment/gap per case?
- **Responsive behavior:** Do any flex rows need to wrap/stack at breakpoints (is the Grid a better fit)?
- **Semantic grouping:** Are any flex rows actually lists that should use `ul`/`li` semantics?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** None — flex is structure; color comes from content components.
- **Sustainability Considerations:** Zero assets, zero JS; tiny CSS utilities.
- **Accessibility Notes:** Flex ordering must not change the DOM/reading order; semantic elements stay real.

---

## Utilities group

### Guide 66 — Content Placeholder

**Component Name:** Content Placeholder

**1. Component Description:**
A dashed stand-in that marks where real content belongs — for templates, prototypes, and demos where the final component has not been dropped in yet.

**2. Build Skill Guide:**
1. Read `utilities/content-placeholder.md`.
2. Markup: `div.nds-content-placeholder` (dashed border, optional label) placed where content will go.
3. Use only in development/demo contexts — never ship to production.
4. Replace with real content before launch; keep a checklist of placeholder locations.

**3. Data Input & Customization Questions (for User):**
- **Placeholder inventory:** Which areas of templates/demos are placeholders awaiting real content (hero text, card grids, tables)?
- **Label copy:** What label does each placeholder carry ("Service description goes here") in ar/en?
- **Removal check:** Who owns the pre-launch sweep to replace every placeholder?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Placeholders stay neutral/dashed — no brand color (temporary scaffolding).
- **Sustainability Considerations:** Zero assets; removed before production (no shipped weight).
- **Accessibility Notes:** Placeholders in live demos are clearly marked; production never ships placeholder text.

---

### Guide 67 — Copy

**Component Name:** Copy

**1. Component Description:**
A clipboard utility that turns any button into a one-click copy control with checkmark feedback, visible label swap, and screen-reader announcement.

**2. Build Skill Guide:**
1. Read `utilities/copy.md` and `_js/nds-copy.js`.
2. Markup: `button.nds-btn.nds-subtle.nds-copy` (copy icon, `aria-label`) — the component reads the target (code block, URL, or `data-copy` value), copies, swaps icon/label, and announces.
3. Configuration: `data-label`/`data-message` for success feedback ("Link Copied!", "Code copied").
4. Used by Code (Guide 26) and Share (Guide 15) automatically.

**3. Data Input & Customization Questions (for User):**
- **Copy targets:** Which elements offer copy (code samples, share links, reference IDs)? What is copied verbatim?
- **Feedback copy:** What success label/message per context in ar/en?
- **Fallback:** On browsers without the clipboard API, what fallback applies?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The copy button stays subtle; the success checkmark may take a muted brand/green tone. Utility, not identity.
- **Sustainability Considerations:** Tiny JS; no assets; clipboard writes are free.
- **Accessibility Notes:** Accessible name; success announced via live region; focus retained; keyboard operable.

---

### Guide 68 — Divider

**Component Name:** Divider

**1. Component Description:**
A utility for separating content sections with a horizontal or vertical rule, optionally framing a label, and adapting to the parent's writing direction.

**2. Build Skill Guide:**
1. Read `utilities/divider.md` and `_base.scss` (`.nds-divider`).
2. Markup: `<hr class="nds-divider">` (or `div.nds-divider` with content for the labeled variant); sizes `nds-md…nds-4xl`; vertical variant via writing-mode.
3. Use for: section breaks, footer separator, dropmenu dividers, labeled separators ("OR", "More links").
4. Color comes from the divider token — never hardcode.

**3. Data Input & Customization Questions (for User):**
- **Divider inventory:** Where do dividers appear (sections, footers, menus)? Any labeled dividers (what text)?
- **Spacing:** Which spacing size suits each context?
- **Direction:** Which contexts need vertical dividers (RTL/LTR aware)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Dividers stay on the neutral divider token; labeled text stays muted. Never brand-colored separators — they are structure.
- **Sustainability Considerations:** Pure CSS, zero assets.
- **Accessibility Notes:** `hr` semantics preserved; labeled dividers are static text, not headings.

---

### Guide 69 — Expandable Content

**Component Name:** Expandable Content

**1. Component Description:**
Height-constrained containers that reveal additional content on demand, with automatic overflow detection and a toggle button that appears only when content exceeds the limit.

**2. Build Skill Guide:**
1. Read `utilities/expandable-content.md` and `_js/nds-expandable.js`.
2. Markup: `div.nds-expandable` wrapping `div.nds-expandable-content`; the component measures overflow and shows the toggle only when clipping occurs.
3. Configuration: collapsed height/line limit, expand/collapse labels.
4. Used by long code samples (Guide 26) and long descriptions.

**3. Data Input & Customization Questions (for User):**
- **Expandable regions:** Which long content blocks collapse (code samples, terms text, long descriptions)? Collapsed limit?
- **Label copy:** Expand/collapse labels in ar/en ("Show more" / "Show less")?
- **Default state:** Should any region start expanded (accessibility-critical content must NOT collapse)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The toggle (subtle link/button) may use the brand link color; the container stays neutral.
- **Sustainability Considerations:** One overflow measurement on init (pooled, no scroll listeners); collapsed content renders once (no hidden duplication).
- **Accessibility Notes:** Real button with `aria-expanded`/`aria-controls`; content reachable without JS; reduced-motion respected.

---

### Guide 70 — Hidden

**Component Name:** Hidden

**1. Component Description:**
CSS-only visibility utilities that honor the native `hidden` attribute over any display value and hide elements inside exact viewport ranges via `data-hidden` (mobile/tablet/desktop tokens, space-separated to combine).

**2. Build Skill Guide:**
1. Read `utilities/hidden.md`.
2. Usage: `data-hidden="sm md"` hides below 960px; `data-hidden="sm"` below 600px; the `sr` token keeps content visually hidden but screen-reader available.
3. Stamp `data-hidden` on topbar widgets, nav action labels, and responsive-only elements (Guides 01–02).
4. Never override the native `hidden` attribute (the utility honors it by design).

**3. Data Input & Customization Questions (for User):**
- **Responsive visibility:** Which elements hide at which breakpoints (widgets, labels, decorative content)? Exact tokens per element?
- **Accessible labels:** Which icon-only elements use `sr` to keep their accessible name?
- **Print behavior:** Any elements that should hide in print?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** None — visibility is structure.
- **Sustainability Considerations:** CSS-only (no JS resize polling); hidden content stays in the DOM (no re-insertion cost).
- **Accessibility Notes:** `sr` text remains available to screen readers; hidden content is not focusable; avoid hiding interactive elements that need keyboard access.

---

### Guide 71 — Request

**Component Name:** Request

**1. Component Description:**
A fetch wrapper that applies a timeout, a response size cap, and a status check to every call, then hands back parsed JSON or raw text — the sanctioned way to make network calls so a hung endpoint or oversized response cannot stall the UI.

**2. Build Skill Guide:**
1. Read `utilities/request.md` and `_js/nds-core.js` (the helper surface).
2. Replace bare `fetch` calls with the wrapper in all component/data code; pass timeout, size cap, and expected response type.
3. Handle failures: surface timeout/size/HTTP-error states with Empty (Guide 32) or Alert (Guide 10).
4. Pair with Autocomplete (Guide 48) and Chart (Guide 60) data loads.

**3. Data Input & Customization Questions (for User):**
- **Endpoint inventory:** Which endpoints does your site call (search, weather, cities, services, charts)? Timeout and size limits per endpoint?
- **Error policy:** What happens per failure type (timeout → retry with copy; 500 → friendly error)? Messages in ar/en?
- **Caching:** Which responses cache locally (weather 15 min, cities 30 days, Hijri 24 h) — your equivalents?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Error/empty states follow Guides 10/32 (fixed status colors); no brand color in failure UI.
- **Sustainability Considerations:** Timeouts + size caps prevent runaway connections (bandwidth/energy); caching reduces repeat requests; aborted superseded requests save the network.
- **Accessibility Notes:** Loading/error states announced; retry actions labeled; failures never leave a blank region.

---

### Guide 72 — Saudi Cities

**Component Name:** Saudi Cities

**1. Component Description:**
A bundled JSON dataset of 132 Saudi Arabian cities across all 13 administrative regions, with bilingual (English + Arabic) names — drop into autocomplete inputs, region selectors, or any address flow.

**2. Build Skill Guide:**
1. Read `utilities/saudi-cities.md` and the dataset `assets/data/saudi-cities.json`.
2. Wire into Autocomplete (Guide 48) or a region/city select; display the locale-appropriate name (ar/en) with region grouping.
3. Extend by adding entries (neighborhoods, new municipalities) following the existing schema.

**3. Data Input & Customization Questions (for User):**
- **Geographic scope:** Does the 132-city dataset cover your needs, or do you need additions (neighborhoods, governorates)? Which entries (ar/en names, region)?
- **Selection behavior:** Which fields use the dataset (address forms, service areas, search filters)? What value submits (city ID, ar name, en name)?
- **Grouping:** Should options group by region (13 regions)?
- **Updates:** Who maintains the dataset and how often are cities added?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** None — data, not identity.
- **Sustainability Considerations:** One bundled JSON (tiny, gzip-friendly), served once and cached; no geocoding API calls when the dataset covers the need.
- **Accessibility Notes:** The picker is a labeled control with keyboard navigation; bilingual names are in the data; no reliance on placeholder text.

---

### Guide 73 — Truncate Text

**Component Name:** Truncate Text

**1. Component Description:**
A single-class CSS utility that clips overflowing text with an ellipsis, supporting both single-line and configurable multi-line truncation on any element.

**2. Build Skill Guide:**
1. Read `utilities/truncate-text.md`.
2. Add the truncate class to the element (`span.nds-truncate`); multi-line variant via a configurable line count.
3. Use for: card titles, digital-stamp labels, breadcrumb tails, table cells, persona names.
4. Truncation is visual only — keep the full text available (title or accessible alternative) where meaning would be lost.

**3. Data Input & Customization Questions (for User):**
- **Truncation targets:** Which elements truncate (long titles, labels, addresses)? Max line count per context?
- **Full-text access:** Is the full value available on hover (`title`) or via an accessible alternative?
- **Locale behavior:** Do Arabic strings truncate acceptably (RTL-aware), or do labels need manual shortening?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** None — text rendering.
- **Sustainability Considerations:** Pure CSS (zero JS, zero assets).
- **Accessibility Notes:** Full text remains in the DOM (screen readers); interactive truncated links keep their full accessible name; ellipsis never truncates meaning-critical prefixes.

---

## Page Templates (the 12 DGA templates)

### Guide 74 — Service Template

**Component Name:** Service Template

**1. Component Description:**
A comprehensive digital-service page: sub hero with service context, service overview, eligibility/requirements, steps (stepper), fees/duration metadata (sideinfo), documents, and a prominent apply CTA.

**2. Build Skill Guide:**
1. Read `templates/service-template.md`; compose from Guides 03–09, 12, 14, 17, 06.
2. Structure: sub hero (`nds-aside` optional) → content layout with main article (overview, requirements, steps) + sideinfo (definition-list metadata, documents, quick actions).
3. CTAs: primary "Apply/Start Service" + secondary actions; status tags (available, maintenance).
4. Steps via Stepper (Guide 17); related services via card grid (Guide 09).

**3. Data Input & Customization Questions (for User):**
- **Service data:** For each service: name, description, eligibility criteria, required documents, fees, duration, channel (online/office). Which fields are authoritative from your service catalog?
- **Steps:** The exact service steps in order (apply → verify → pay → receive)?
- **Metadata:** What fee/duration/beneficiaries values populate the sideinfo definition list?
- **Status:** What service status (available/suspended/maintenance) and where does it come from (live system or manual)?
- **CTA policy:** The apply URL/flow per service — does the button change per status?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** One primary apply CTA per service takes the brand color; the stepper's current step and status tags follow Guides 17/46. The page body stays neutral.
- **Sustainability Considerations:** Text-first content; document links (not embedded PDFs where possible); SVG icons; server-rendered service data (no fetch waterfall); one CTA.
- **Accessibility Notes:** Heading hierarchy (h1 service name → h2 sections); steps are a real list with current-step text; fees/duration are text; every CTA describes the action.

---

### Guide 75 — Form Template

**Component Name:** Form Template

**1. Component Description:**
A multi-step form page guiding users through input fields with a progress indicator — including all essential input types (text, select, date, checkbox, upload) and validation.

**2. Build Skill Guide:**
1. Read `templates/form-template.md`; compose from Guides 14, 17 (stepper), 48–59 (controls), 06 (sideinfo stepper on desktop).
2. Structure: sub hero → form container with step stepper → field groups per step → navigation (back/next, submit on final) → validation + success state.
3. Multi-step state: current step from URL/session; validation per step before advancing; data held client-side until submit.
4. Sideinfo: step tracker on desktop (radial on mobile).

**3. Data Input & Customization Questions (for User):**
- **Step inventory:** What are the steps and the fields per step (labels, types, required flags, hints)?
- **Validation rules:** Exact rules per field (formats, ranges, file types) — reuse Guide 14's contract.
- **Progress data:** How is progress derived (step index), and what labels mark completed/current/upcoming?
- **Submission:** What happens on final submit (endpoint, success page, receipt) and how is partial data persisted (draft save)?
- **Localization:** Full ar/en copy for labels, hints, errors, buttons, and the success message.

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The primary continue/submit buttons and current-step marker take the brand color; completed steps a muted tint; errors fixed red.
- **Sustainability Considerations:** Client-side validation prevents failed submissions (saves requests); steps render sequentially; no media; one submit request.
- **Accessibility Notes:** Step stepper announced; errors focus the first invalid field; each field labeled + `aria-describedby`; progress in text; keyboard-complete flow.

---

### Guide 76 — Contact Us Template

**Component Name:** Contact Us Template

**1. Component Description:**
A contact page combining contact information (channels, hours, locations), a contact form, and an emergency-contacts sideinfo card.

**2. Build Skill Guide:**
1. Read `templates/contact-us-template.md`; compose from Guides 06, 14, 10 (alerts), 46 (tags).
2. Structure: sub hero → content layout: main (contact form + channel info) + sideinfo (emergency contacts card, hours).
3. Include: phone/mailto links, physical addresses, service hours, social links, and the form (Guide 14).

**3. Data Input & Customization Questions (for User):**
- **Contact data:** Official phone(s) (`tel:`), email(s) (`mailto:`), addresses, hours, and the emergency-contacts list with labels.
- **Form fields:** Which fields (name, contact method, subject, message) with validation rules and destinations?
- **Channel policy:** Which inquiries route to which channel (form → ticket, phone → hotline, chat → platform)?
- **Response promise:** Stated response-time SLA and the acknowledgment message after submit?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The primary submit button and the emergency-card accent take the brand color; contact rows stay neutral.
- **Sustainability Considerations:** Text-only contact rows (tel/mailto — no images); one small form POST; no map embeds unless genuinely needed.
- **Accessibility Notes:** Contact links describe the channel ("Call 920 000 000"); form per Guide 14; emergency content is text; hours marked up as data.

---

### Guide 77 — Content Template

**Component Name:** Content Template

**1. Component Description:**
The standard long-form content page: heading hierarchy (h3/h4), ordered and unordered lists, body text, hyperlinks, rich media (images/video), a TOC, and sideinfo.

**2. Build Skill Guide:**
1. Read `templates/content-template.md`; compose from Guides 03, 06, 45 (TOC), 26 (code), 37 (links), 46 (tags).
2. Structure: sub hero → content layout: main article (prose blocks) + sideinfo (TOC, metadata).
3. Content model: headings h2–h4 with IDs for the TOC; lists, blockquotes, tables, images (alt), videos (lazy, no autoplay).
4. Metadata: last-updated line, category tags, share widget.

**3. Data Input & Customization Questions (for User):**
- **Article content:** What is the actual body content per page (sections, lists, media)? Provide it in your CMS/IA structure.
- **Media:** Which images (with alt) and videos belong, with captions? Any downloadable attachments (links, not embeds)?
- **TOC scope:** Which heading levels feed the TOC (h2–h3)?
- **Metadata:** What category tags, author/owner, and last-updated data display per page?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Inline links, the TOC current item, and the share trigger take the brand color; body text stays neutral. Prose is unadorned.
- **Sustainability Considerations:** Compressed webp images with explicit dimensions; videos lazy-load and never autoplay; text-first; TOC built from existing headings.
- **Accessibility Notes:** Clean heading hierarchy; images alt'd; links descriptive; media captioned/transcribed; TOC is a nav list.

---

### Guide 78 — Help & Support Template

**Component Name:** Help & Support Template

**1. Component Description:**
A support hub listing support channels (hotline, chat, email, branches) with search over help topics — guiding users to the right channel for their need.

**2. Build Skill Guide:**
1. Read `templates/help-support-template.md`; compose from Guides 09 (channel cards), 13 (search), 12 (FAQ accordion), 46 (tags).
2. Structure: sub hero → channel cards (icon + title + description + action) → searchable help topics (toolbar/gallery) → FAQ accordion → escalation CTA.

**3. Data Input & Customization Questions (for User):**
- **Channel data:** Which support channels exist (hotline, chat, email, branches)? For each: title, description, hours, action label/destination.
- **Help topics:** What topics appear in the searchable directory (title, description, category tags, URL)?
- **FAQ set:** Which questions/answers populate the accordion (Guide 12)?
- **Escalation:** What CTA appears when topics don't resolve the need (contact form link)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Channel card icons may take the brand tint (Guide 09); the primary CTA and active search accents use brand color.
- **Sustainability Considerations:** Text + SVG icons; client-side search over rendered topics; FAQ accordion deferred.
- **Accessibility Notes:** Channel cards are links with descriptive text; search labeled; FAQ per Guide 12; hours/tel data are text.

---

### Guide 79 — About The Entity Template

**Component Name:** About The Entity Template

**1. Component Description:**
An entity landing page: mission/vision, leadership personas, organizational overview, strategic pillars, and contact/quick links — the destination of the homepage "About" entry.

**2. Build Skill Guide:**
1. Read `templates/about-entity-template.md`; compose from Guides 03, 09, 41 (personas), 42 (quote), 46 (tags).
2. Structure: sub hero → about intro (mission/vision) → strategic pillars/features grid → leadership (persona cards) → official quote/statement → quick links + contact block.

**3. Data Input & Customization Questions (for User):**
- **Entity data:** Official entity name (ar/en), mission and vision statements, establishment info, strategic goals/pillars with descriptions.
- **Leadership:** For each leader: name, role/title, bio, avatar (or initials), any contact/action links. Who approves this content?
- **Quote/statement:** Any official statement to feature (with attribution)?
- **Quick links:** Which high-traffic destinations belong (services, contact, media center)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** This page may carry the strongest identity accent: the hero surface (brand gradient) and the pillars' featured icons take the brand palette; leadership cards stay neutral. One deep surface, rest quiet.
- **Sustainability Considerations:** Tiny/compressed avatars (or initials SVG); text-first mission/vision; no heavy media; server-rendered.
- **Accessibility Notes:** Persona names/roles are text; leadership cards keyboard-reachable; heading hierarchy per section; quote is semantic blockquote.

---

### Guide 80 — FAQ Template

**Component Name:** FAQ Template

**1. Component Description:**
A FAQ page organizing common questions by category with the accordion component, optional search, and contact escalation.

**2. Build Skill Guide:**
1. Read `templates/faq-template.md`; compose from Guides 12 (accordion), 13 (search), 10 (alert), 14 (contact CTA).
2. Structure: sub hero → optional search over questions → category sections of accordion items → still-need-help alert/CTA.

**3. Data Input & Customization Questions (for User):**
- **FAQ data:** The full question/answer set (ar/en), each with a category and optional related link. Who maintains accuracy?
- **Categories:** What category groups organize the questions (ordering within groups)?
- **Search scope:** Should search match questions, answers, or both — over the rendered page or an API?
- **Escalation:** What "didn't find your answer" CTA (contact form, hotline) and its copy?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Accordion open indicators and the primary CTA take the brand color; the rest neutral.
- **Sustainability Considerations:** Native accordion primitives; concise answers (2–3 sentences); client-side search; deferred behavior bundle.
- **Accessibility Notes:** Accordion per Guide 12; search labeled; h2 categories with h3 questions; answers readable without JS.

---

### Guide 81 — e-Participation Template

**Component Name:** e-Participation Template

**1. Component Description:**
A public-consultation page: ongoing consultations/polls (cards), participation forms, results/statistics, and how-participation-works guidance — supporting citizen engagement.

**2. Build Skill Guide:**
1. Read `templates/e-participation-template.md`; compose from Guides 09, 14 (forms/polls), 60 (charts), 12 (explainers), 46 (status tags).
2. Structure: sub hero → active consultations grid (status tags + deadlines) → participation form/poll per consultation → published results (charts) → how-it-works steps/accordion.

**3. Data Input & Customization Questions (for User):**
- **Consultation data:** Which consultations are live/upcoming/closed (title, description, deadline, status, link)?
- **Participation forms:** What do participants submit (poll options, open comments, attachments) with validation rules?
- **Results:** Which consultations publish results (chart data + summary text), and when?
- **Identity policy:** Does participation require login/national ID — auth path and privacy statement?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Live-consultation featured icons and the primary "Participate" CTA take the brand color; status tags stay fixed.
- **Sustainability Considerations:** Text-first cards; SVG charts with data tables; single form submissions; server-rendered results.
- **Accessibility Notes:** Deadlines are real text; forms per Guide 14; charts per Guide 60 (with data tables); keyboard-complete participation paths.

---

### Guide 82 — Social Media Template

**Component Name:** Social Media Template

**1. Component Description:**
A page aggregating the entity's official social channels and latest posts, with embed/feed placeholders and channel links.

**2. Build Skill Guide:**
1. Read `templates/social-media-template.md`; compose from Guides 07 (footer icons), 09 (channel cards), 10 (notice).
2. Structure: sub hero → channel grid (icon + handle + followers + link per platform) → latest posts section (embeds or curated cards) → follow CTA.

**3. Data Input & Customization Questions (for User):**
- **Channel data:** Which platforms does your institution officially use? For each: handle, display name, profile URL, icon.
- **Feed approach:** Official embeds (heavy) or curated cards (lightweight, editorial)? Which do you prefer and why?
- **Content policy:** What is the official-accounts policy (who may post, verification statement)?
- **CTA:** What follow/share actions appear, and any disclaimer about unofficial accounts?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Channel icons stay brand-neutral (official glyphs); follow buttons use the secondary-outline variant with brand hover. One accent.
- **Sustainability Considerations:** Curated cards are text + tiny SVG (recommended); official embeds are heavy third-party scripts — lazy-load them below the fold if required.
- **Accessibility Notes:** Channel links have descriptive aria-labels; embeds carry captions/alternatives; icons never the only channel identifier.

---

### Guide 83 — KPIs Template

**Component Name:** KPIs Template

**1. Component Description:**
A data dashboard layout combining KPI counter tiles, pie/donut/line/bar charts, and responsive tables to report portal traffic and service performance.

**2. Build Skill Guide:**
1. Read `templates/kpis-template.md`; compose from Guides 17 (metric tiles), 60 (charts), 64 (tables), 62 (selection), 61 (export), 38 (loading).
2. Structure: sub hero → KPI tile row (4–6 metrics) → charts section (SVG + data tables) → performance table (sortable/paginated) → export/refresh controls.

**3. Data Input & Customization Questions (for User):**
- **KPI set:** Which metrics headline the dashboard (visits, services, satisfaction, completion)? Label, value, unit, period?
- **Chart data:** Which charts (type + series + labels) present which metrics, from which source, with what refresh cadence?
- **Table data:** Which dataset fills the performance table (columns, sort keys, row count, pagination size)?
- **Export/access:** Who may export (roles) and which formats?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** KPI icons and one primary chart series take the brand color; other series use neutral/status ramps. The dashboard reads at a glance.
- **Sustainability Considerations:** Server-rendered numbers (no fetch waterfall); SVG charts (no chart-library payload); pagination caps DOM; refresh on demand (no auto-polling unless required).
- **Accessibility Notes:** Every KPI is text with a label; every chart has a data table; tables per Guide 64; loading/empty states announced; reduced-motion counters.

---

### Guide 84 — Search Template

**Component Name:** Search Template

**1. Component Description:**
A search results page: search input, result list (services, pages, content) with relevance and filters, pagination, and a no-results state with suggestions.

**2. Build Skill Guide:**
1. Read `templates/search-template.md`; compose from Guides 13 (toolbar/gallery), 09 (result cards), 32 (empty), 46 (tags).
2. Structure: sub hero (with the search box) → filters (category/service type) → results grid/list (title + snippet + tags + link) → pagination → no-results empty state.

**3. Data Input & Customization Questions (for User):**
- **Search backend:** What powers search (site search API, Google CSE, database)? Query/response schema (results, total, facets)?
- **Result fields:** Which fields render per result (title, snippet, category, URL, thumbnail)? Snippet length?
- **Facets:** Which filters narrow results (category, audience, type) — static or computed from results?
- **No-results:** What empty-state copy and suggestion set (popular queries, clear-filters action)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The search button, active facet, and pagination active state take the brand color; result snippets stay neutral.
- **Sustainability Considerations:** Debounced queries (no request per keystroke); server-side result pagination (one page of DOM); snippets truncated via CSS (Guide 73).
- **Accessibility Notes:** Search input labeled; results announced ("N results for X"); result links descriptive; pagination per Guide 13; no-results state is text + action.

---

### Guide 85 — 404 Template

**Component Name:** 404 Template

**1. Component Description:**
The "page not found" view: the 404 illustration, a clear message, and a return-home action plus helpful links.

**2. Build Skill Guide:**
1. Read `templates/404-template.md` and `404.html` (the flat hero variant).
2. Markup: `section.nds-404.nds-hero-section.nds-sub.nds-flat` → illustration (`img`, width/height set) → title + description → "Back to Home" primary button (+ optional popular-links row).
3. Wire the 404 permalink so every unknown route lands here.

**3. Data Input & Customization Questions (for User):**
- **Message copy:** What title/description in ar/en ("Something went wrong" / "We couldn't find that page")? Any institutional tone adjustments?
- **Illustration:** Use the bundled 404 SVG or your own (alt text, dimensions)?
- **Helpful links:** Which popular destinations appear under the back-home button (services, contact, search)?
- **Tracking:** Do you log 404s (for fixing broken links) and where?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The back-home primary button takes the brand color; the illustration stays neutral (or subtly brand-tinted). Quiet recovery page.
- **Sustainability Considerations:** SVG illustration (tiny); text-only; no extra assets.
- **Accessibility Notes:** Real 404 page (status code + title); message is text; button is a real link; helpful links descriptive.

---

## Examples (full-page demos)

### Guide 86 — Registration (Example)

**Component Name:** Registration (Example)

**1. Component Description:**
A full registration flow demo ("Create your account"): multi-step form with identity fields, OTP verification, password rules, and success state.

**2. Build Skill Guide:**
1. Read `examples/registration.md`; compose from Guides 14, 53 (OTP), 28 (cooldown), 17 (stepper), 10 (alerts).
2. Steps: account details → identity verification (OTP with cooldown resend) → review/terms → success.
3. Validation per step; session state across steps; the success state offers next actions.

**3. Data Input & Customization Questions (for User):**
- **Flow steps:** What is your real registration sequence (fields per step, order)?
- **Identity data:** Which identity fields (national ID, phone, email) and their validation (per Guide 14)?
- **OTP/verification:** Delivery provider, code length, cooldown, expiry, attempts.
- **Terms:** Which consents/terms are required and how are they presented?
- **Success:** What happens post-registration (dashboard, activation email, next steps)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The step indicator and primary CTAs take the brand color; verification/error states stay fixed.
- **Sustainability Considerations:** Text-only fields; one OTP request cycle with cooldowns (no floods); server-rendered steps.
- **Accessibility Notes:** Full keyboard flow; OTP per Guide 53; errors focus the first invalid field; success announced.

---

### Guide 87 — Services List (Example)

**Component Name:** Services List (Example)

**1. Component Description:**
A government-services directory demo: search + filter + pagination over service cards, with service categories and status tags.

**2. Build Skill Guide:**
1. Read `examples/services-list.md`; compose from Guides 13 (toolbar/gallery), 09 (cards), 46 (tags), 32 (empty).
2. Structure: sub hero → toolbar (search, category filter, applied chips) → service card grid (icon, title, description, status tag, action) → pagination → empty state.

**3. Data Input & Customization Questions (for User):**
- **Service catalog:** The full service list (title ar/en, description, category, status, URL) and its source.
- **Facets:** Which categories/filters apply, and are tags derived from the catalog?
- **Card actions:** What action per card (Open service, Apply) and per status?
- **Pagination:** Items per page (6/9/12) and default sort.

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Card featured icons (brand tint) + primary card action (brand) — per Guides 09/33; status tags fixed.
- **Sustainability Considerations:** Client-side filter over rendered cards; server-rendered first page; text + SVG icons.
- **Accessibility Notes:** Search labeled; results announced; card links descriptive; pagination per Guide 13; empty state text + action.

---

### Guide 88 — Faculty (Example)

**Component Name:** Faculty (Example)

**1. Component Description:**
A faculty-member profile demo: persona block, biography, credentials, publications list, and contact actions.

**2. Build Skill Guide:**
1. Read `examples/faculty.md`; compose from Guides 41 (persona), 09 (credential cards), 26 (code/lists), 06 (sideinfo).
2. Structure: sub hero → persona header (avatar, name, role) → bio sections → credentials grid → publications list → sideinfo (contact, office hours).

**3. Data Input & Customization Questions (for User):**
- **Profile data:** Name, role, degrees, publications (title, year, venue/link), office/contact info per member.
- **Avatars:** Photo or initials; alt text.
- **Sections:** Which sections belong (biography, research, teaching, publications) and their content?
- **Contact:** Which actions (email, office hours, profile link)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Persona avatar initials and the primary contact button take the brand color; bio text neutral.
- **Sustainability Considerations:** Tiny avatar; text-first publication lists (links, not PDF embeds).
- **Accessibility Notes:** Persona data is text; publication links descriptive; clean heading hierarchy.

---

### Guide 89 — Program (Example)

**Component Name:** Program (Example)

**1. Component Description:**
An academic-program page demo: program overview, curriculum/plan, admission requirements, and apply CTA with sideinfo.

**2. Build Skill Guide:**
1. Read `examples/program.md`; compose from Guides 09 (cards), 64 (curriculum table), 06 (sideinfo), 46 (tags), 03 (hero).
2. Structure: sub hero → program overview + highlights → curriculum table/plan → admission requirements → sideinfo (duration, credits, fees) → apply CTA.

**3. Data Input & Customization Questions (for User):**
- **Program data:** Name, degree level, duration, credits, language of instruction, fees.
- **Curriculum:** Courses by semester/year (code, title, credits) — table source.
- **Requirements:** Admission criteria list (with any document links).
- **CTA:** Apply URL/flow and any application deadlines.

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Program icon accent + primary apply CTA take the brand color; the curriculum table stays neutral.
- **Sustainability Considerations:** Text + SVG; curriculum is a real table (accessible, lightweight).
- **Accessibility Notes:** Table per Guide 64; deadlines are text; CTA descriptive; clean heading hierarchy.

---

### Guide 90 — Console (Example)

**Component Name:** Console (Example)

**1. Component Description:**
An admin-console demo: dashboard chrome (header, sidemenu), KPI tiles, charts, data tables with selection/sort/export, and panels.

**2. Build Skill Guide:**
1. Read `examples/console-demo.md`; compose from Guides 02, 05 (sidemenu), 17, 60, 64, 62, 61, 40 (panels), 30 (drawer).
2. Structure: header (user persona) → content layout with sidemenu → KPI row → charts → tables (sort/select/export) → notification panel.

**3. Data Input & Customization Questions (for User):**
- **Console scope:** Which administrative views exist (overview, users, services, reports) and their menu structure?
- **KPI/chart/table data:** The same data questions as Guides 83/60/64 for the console context.
- **User actions:** Which row actions (view, edit, delete, approve) with confirmation policies?
- **Roles:** Which roles see which views/actions (access control), and how is the user persona derived?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The active sidemenu item, KPI accents, and primary row actions take the brand color; the console surface stays dense but neutral.
- **Sustainability Considerations:** Paginated tables; SVG charts; client-side sort/select on the rendered page; panel content on demand.
- **Accessibility Notes:** Sidemenu per Guide 05; tables per Guide 64; row actions labeled; selection count announced (Guide 62); keyboard-complete admin flow.

---

## Events

### Guide 91 — Foundation Day (Event Theme)

**Component Name:** Foundation Day (Event Theme)

**1. Component Description:**
A seasonal event pack that re-skins the whole site for Saudi Foundation Day: themed palette, hero artwork, banners, and event-specific copy — applied as a drop-in theme and removed when the event ends.

**2. Build Skill Guide:**
1. Read `events/foundation-day.md` and `_sass/themes/_foundation-day.scss` + the event assets under `assets/events/foundation_day/`.
2. Apply: the event theme re-points brand/event tokens (single attribute/stylesheet); hero slides, banners, and section art swap to the event visuals; optional theme JS adds event interactions.
3. Removal: drop the theme and the site restores the default — verify no residual assets/copy.
4. Accessibility/contrast: event colors must hold the same AA pairings (test both modes).

**3. Data Input & Customization Questions (for User):**
- **Occasion data:** Which national occasions does your institution observe (Foundation Day, Hajj, National Day)? Dates and duration of each activation?
- **Theme assets:** Which palette seed/colors, hero images, banners, and icons ship per occasion (webp/SVG, alt text)?
- **Copy:** What event-specific text (banners, greetings, notices) applies, in ar/en?
- **Activation policy:** Who activates/deactivates the pack, on which schedule, and are there pages where it must NOT apply (transactional flows)?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** The event pack re-tints the brand slots (one mechanism, every component follows); institutional identity must remain recognizable — event colors complement, never replace, your primary identity; status colors stay fixed.
- **Sustainability Considerations:** Few compressed event assets (webp/SVG); one stylesheet + a handful of images only while active; removed cleanly afterward (no dead weight).
- **Accessibility Notes:** Event hero text holds AA over event imagery (overlay tuned); banners have text alternatives; the pack never alters focus rings or reduces contrast.

---

### Guide 92 — Hajj (Event Theme)

**Component Name:** Hajj (Event Theme)

**1. Component Description:**
The Hajj-season event pack: themed palette, dark hero artwork (LTR/RTL variants), service-section artwork, and seasonal copy — the same drop-in theme mechanism as Foundation Day.

**2. Build Skill Guide:**
1. Read `events/hajj.md` and `_sass/themes/_hajj.scss` + assets under `assets/events/Hajj/` (incl. `darkhero`/`darkhero_ltr`).
2. Directional assets: hero art ships RTL and LTR variants — pick per `dir`.
3. Apply/remove per the same discipline as Guide 91; verify the event JS initializes only while the pack is active.

**3. Data Input & Customization Questions (for User):**
- **Occasion scope:** Which Hajj-season services/content does the pack highlight (pilgrim services, permits, guidance)?
- **Artwork:** Which hero/service/banner images (with RTL+LTR variants) and their alt text?
- **Copy:** What seasonal notices and service descriptions apply (ar/en)?
- **Activation:** Schedule and owner of activation/deactivation; pages excluded from the theme?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** Same as Guide 91 — slot re-tinting only; identity preserved; fixed palette untouched.
- **Sustainability Considerations:** Dark hero variants are single webps (no duplicate client-side color processing); the pack loads only during the season.
- **Accessibility Notes:** Both direction variants tested for text readability; contrast in the dark palette verified against AA; interactive elements keep visible focus.

---

## Repository-level systems

### Guide 93 — Doc-Site Data Layer & i18n

**Component Name:** Doc-Site Data Layer & i18n

**1. Component Description:**
The data-driven documentation systems: YAML content collections (`_data/content/*.yml`) feeding landing grids, the sidemenu registry (`_data/sidemenu/sidemenu.yml`) as the system map, and the i18n layer (`assets/i18n/{ar,en}.json` + `NDS.i18n`) for runtime localization.

**2. Build Skill Guide:**
1. Every new page/collection registers in `_data/sidemenu/sidemenu.yml` and the matching `_data/content/*.yml` (match an existing neighbor's key schema exactly).
2. Component docs carry `since`/`updated`/`last_edit` front matter (GMT+3) per CLAUDE.md.
3. Runtime strings live in `assets/i18n/{component}/ar|en.json`; components load them via `NDS.i18n.load` with baked English defaults and fallback.
4. The component gallery (Guide 13) reads the content collections — keep item schemas stable.

**3. Data Input & Customization Questions (for User):**
- **Content collections:** Which directories does your institution maintain (services, components, guides, events)? What is the item schema per collection (title, description, icon, url, tags)?
- **Sidemenu map:** What is your site's navigation tree (groups + children) mirroring the real IA?
- **Translation coverage:** Which UI strings and content need ar/en (and any additional locales)? Who owns translation review?
- **Versioning metadata:** Do your docs track since/updated versions, and what release stamp feeds them?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** None — this is data plumbing; any color comes from the components rendering the data.
- **Sustainability Considerations:** YAML/JSON collections are tiny and gzip-friendly; i18n files load per-component (only the active locale); no content duplication.
- **Accessibility Notes:** Localized strings announced correctly (lang attribute); translations never truncate meaning; fallback locales prevent blank UI.

---

### Guide 94 — Performance Harness (repo-level)

**Component Name:** Performance Harness

**1. Component Description:**
The repo's calibrated measurement tooling: gzip-served builds driven in headless Chrome under slow-4G + 6.6× CPU on a mobile viewport, reporting real LCP/FCP/reveal with optional main-thread tracing and CLS monitoring (`/nds-perf` skill).

**2. Build Skill Guide:**
1. Run after any change affecting the critical path: build, then `node .claude/skills/nds-perf/measure-lcp.mjs [pages] [--runs=3]`.
2. Compare medians (local vs. local, remote vs. remote); trust real numbers over Lighthouse's simulated LCP (~2× overestimate on this site).
3. Use `--trace` to attribute main-thread time (culprit script frames) and `--monitor` to find CLS sources — diagnostics only, not regression medians.
4. Rebuild unminified (debug config) for readable names when tracing; restore minified afterward.

**3. Data Input & Customization Questions (for User):**
- **Budget:** What are your LCP/FCP/CLS budgets per page type (e.g., home LCP < 2.5 s mobile)? What is the acceptance process for regressions?
- **Page set:** Which pages are in the regression suite (home, a service page, a docs page, the gallery)?
- **Environment:** Do you test against the local build, staging deploy, or both (real TTFB)?
- **Ownership:** Who runs perf checks per release, and where are results recorded?

**4. Green Architecture & Brand Identity Integration (if applicable):**
- **Brand Color Integration Strategy:** None — measurement.
- **Sustainability Considerations:** This harness is the green-architecture enforcement tool: gzip serving mirrors production; budget gates stop bloated assets; every byte saved is energy saved on low-bandwidth devices.
- **Accessibility Notes:** Perf budgets protect assistive-tech users on low-end devices (INP/LCP are accessibility concerns); keep the mobile throttle in the acceptance criteria.

---

## Closing — repository-wide Green Architecture checklist (additions)

In addition to Part 1's checklist, every build across the repo must confirm:

- [ ] New component/utility/page registered in `_data/sidemenu/sidemenu.yml` + the matching content collection (the system map stays complete).
- [ ] All runtime strings localized through the i18n layer (ar default, en fallback) — no hardcoded UI copy in JS.
- [ ] All network calls go through the Request wrapper (timeout + size cap + status check) with a caching policy per endpoint.
- [ ] All new behavior ships through the loader/bundle system with lifecycle canon (`init`/`reinit`/`create`, `{ signal }` teardown, `data-nds-<name>-initialized`) and passes `/nds-js-audit`.
- [ ] All new SCSS consumes tokens, passes `/nds-css-audit`, and holds the RTL-first logical-properties contract.
- [ ] Any page on the critical path passes `/nds-perf` against the institutional budget; event packs and themes add no permanent weight.
- [ ] Institutional identity flows through the four token tiers only — no per-component hex, no repainting of fixed/status surfaces, dark mode verified for every accent.
- [ ] Every data-driven surface has its loading → empty → error → content states defined (Guides 32/38/71) and announced.
- [ ] Content is lean by policy: concise copy, compressed webp/SVG assets, explicit dimensions, lazy loading except the single LCP element, no autoplay media.
