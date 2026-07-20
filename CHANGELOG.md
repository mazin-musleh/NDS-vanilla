# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.1] - 2026-07-20

### Added
- Editor — image support: insert by URL from a popover (with alt, width, height), click an image to select it for edit-in-place, link wrapping, or removal, plus paste and drag-in uploads through an embedded NDS Upload. `setImageUpload()` configures both modes; the default policy is URL-only, and the `'embed'` upload-URL sentinel opts into base64 embedding behind a 2 MB cap. See `components/editor.md`.
- Editor — link now wraps a whole atom (button, tag, chip, featured icon, avatar, image) as an `<a>` and unwraps it again, never nesting; `data-no-external` opts an atom out. A selection ring marks the selected or remove-armed component, Enter escapes an inline atom, and clicking a textless atom selects it whole.
- Editor — RTL/LTR direction command writing a native `dir` per block, physical alignment (left, right, center, justify), and new pilcrow direction icons.
- Upload — `NDS.Upload.validateFile()` public API for size, type, and MIME validation.
- Upload — a failed upload surfaces the server's JSON `{error}` in the file chip, falling back to `statusText` and then a localized generic message; `nds:upload:error` carries the raw response.

### Changed
- Dropmenu — `.nds-dropmenu-action` owns its layout (flex row, `--spacing-md` gap, children sharing the row equally without crushing their labels). The `nds-grid` pairing is dropped from its canonical markup.
- Upload — in the non-dropbox row layout, `.nds-file-upload`'s form control sizes to its content (`--input-size: fit-content`) instead of a fixed 40px, and the action no longer stretches past its button.

### Fixed
- Dropmenu — a portaled menu now takes its trigger's stacking layer, so a trigger inside a modal or the topbar no longer paints over its own menu.
- Forms — focus and active states reach a control nested under a layout wrapper again (the mainnav and homepage search boxes lost their focus effect).
- Forms — feedback resolves to the owning container, so a nested container's target (the editor's popover fields) no longer claims it.
- Button — `[data-state~="focused"]` paints the focus ring on `.nds-btn`, matching the hover/pressed/selected convention.

### Migrating from v1.4.0

- Replace the built bundles (`nds-main.min.*` and the loader-injected `nds-delegated`/`nds-extras`, plus the `nds-accessibility`/`nds-showcase`/theme bundles).
- Dropmenu — markup still pairing `nds-grid` with `.nds-dropmenu-action` keeps working, but the action bar's `--gap` override is gone, so those buttons now sit at the grid's default `--spacing-2xl` gap. Drop `nds-grid` from the element to get the built-in spacing.

## [1.4.0] - 2026-07-18

### Added
- Editor (Beta) — new rich-text component: a standard NDS textarea upgraded into a contenteditable editing surface with a generated, localized toolbar. Pastes from Word, Google Docs, and the web convert to clean NDS markup, and pasted NDS components stay intact while editing. Ships as beta. See `components/editor.md`.
- Tag Input — new component: free-text tags committed as removable chips while typing, posted natively as an array, with optional autocomplete assist/strict modes. See `components/taginput.md`.
- Toolbar — new unified controls bar above tables, lists, and grids (search, filter, sort, column visibility, pagination). See `components/toolbar.md`.
- Selection count — new component showing the number of selected rows/cards, paired with pagination's new x-of-y record slots.
- Last edit — new component rendering the DGA "last modified" line from a page's `last_edit`.
- Multiselect — options populated from JSON, apply-mode staging (staged or instant commit), and removable chips.
- Date Picker — custom date formats, month/year grid modes, save-to-commit, min/max bounds, and a form-validation bridge.
- Alert — pausable toast timer (hover to hold), corner positions, and copy actions.
- Tables — column-visibility menu with hidden columns persisted across reloads, per-column alignment, and a count badge on the filter/columns triggers.
- Tables — `data-align="center|start|end"` on a `<th>` aligns that whole column, header and body, including rows that arrive later from sorting, filtering, or pagination. See the [Tables doc page](https://mazin-musleh.github.io/NDS-vanilla/components/tables.html).
- Filter — opt-in per-group accordion with an applied-count tag, and a loading spinner on the trigger during form submit.
- Dropmenu — `data-anchor="start|end"` edge alignment with automatic viewport flip.
- Cards — `nds-card-price` product pricing built on the numbers utility.
- Forms — contenteditable elements receive form-control styling (backs the editor surface).
- Hidden — new CSS-only visibility utility: the native `hidden` attribute now wins over any `display` value, and `data-hidden="mobile|tablet|…"` hides an element within exact viewport ranges. See `utilities/hidden.md`.
- Mainnav — `--nds-brand-width` knob on the brand link.
- Side info — background fill and opt-in `nds-sticky-sm/md` pinning.
- Chips / Tags — `.nds-center` list modifier.
- Featured Icons — `nds-subtle` style (flush glyph, no background or padding).
- Versioning — release-anchored version tracking: `since` / `updated` / `last_edit` doc front matter, an index version filter, and "Added in vX" / "Updated in vX" hero tags.
- Critical CSS — `critical_inline: 'minimal'` mode: a self-releasing one-line body hold.
- Icons — documentation page covering both icon layers, a click-to-copy catalog of every inline UI icon, and the license terms. See `components/icons.md`.
- Icons — logical arrows `nds-hgi-arrow-{next,prev}-{01,02}`: they follow reading direction, so one class means forward (or back) in both Arabic and English.
- Icons — cart UI icon; `.nds-icon-checkmark` custom thicker glyph.
- License — third-party notice for the bundled Hugeicons free set (MIT), previously shipped with no attribution.

### Changed
- Flex — promoted to a layout primitive; the default cross-axis alignment changed from `center` to `stretch` (matches the CSS default; override per-container with `--align: center`). `nds-reverse` now also reverses a bare `.nds-flex` (`row-reverse`), not just `.nds-row` / `.nds-col`.
- Forms — `.nds-form` decoupled from the layout flex chain; interactive-state styling and validation scope to a container's own control, so nested containers validate independently.
- Layout — `main` uses `overflow-x: clip` instead of `auto` (auto broke sticky descendants).
- Tables — a single init sentinel, and pagination binds to the `<tbody>` so rows added later still paginate.
- Icons — the literal arrow classes (`nds-hgi-arrow-{left,right}-{01,02}` and the HGI font equivalents) no longer mirror on LTR pages. They now point where their name says, in both directions; direction-aware behavior moved to the new `next`/`prev` classes.
- Icons — the filled status symbols are token-only (`--nds-icon-{alert,cancel,checkmark-solid,disc,help,info}`). Their `nds-hgi-solid-*` classes are removed: each is one layer of a mark the feedback icon composes over a disc, not a standalone icon.
- Icons — the theme-toggle glyph is now `--nds-icon-paint-board`, exposed as `nds-hgi-paint-board`; the chrome alias `.nds-theme` is renamed `.nds-icon-theme`.
- Icons — `nds-hgi-sun-01` removed; the dark-mode toggle uses `nds-hgi-sun-03`, the same sun the weather icons use.

### Fixed
- Dropmenu — skip `[hidden]` items in the keyboard focus walk; flip on the real menu height and never cover the trigger; park the menu before revealing it.
- Forms — an unbounded number input can no longer step past its initial value; native select OS-popup options align with the closed value; `.nds-form-action` stays clickable in readonly; taginput validates at the wrapper, not the typing field.
- Button — loading state keeps its default background.
- Multiselect / Editor — the instance is registered in `init()` so `create()` returns a destroyable instance with hooks.
- Alert — wider icon→content gap.
- Cards — flattened subtitle color; oncolor border shadow.
- Mainnav — brand logo inverts in dark mode.
- Pagination — `nds-md` control sizing below 360px.
- Feedback Icons — inline-flex so the glyph flows inline.
- Digital stamp — z-index so an open stamp covers the content beneath.
- Icons — the theme-toggle glyph hardcoded its fill (`#161616`) instead of `currentColor`, so it ignored `color` and stayed near-black in dark mode.

### Migration

- Multiselect — now a UI layer over a native checkbox group, so the checkboxes *are* the form value. Migrate old markup: add `name="…[]"` to each `<input class="nds-check">`, use `checked` for pre-selection, and remove the hidden CSV carrier inputs (`<input type="hidden" name="…[]">`).
- Flex — `.nds-flex`'s default cross-axis alignment changed from `center` to `stretch`. Containers that relied on the implicit centering now stretch their children; set `--align: center` to restore the previous look.

## [1.3.0] - 2026-07-04

### Added
- Themes — font-weight seeds (`data-seed-weight-{regular,medium,semibold,bold}` / `--font-weight-*`) for inline custom themes whose brand font reads lighter or heavier than IBM Plex at the same nominal weight.
- Tokens — `--button-indicator-*` family (one dial for the active-indicator trio, value-identical across light/dark/HC) and `--border-oncolor` (translucent border on colored fills).
- Dropmenu — trigger stretches to fill a column-flex parent (e.g. a hero action wrap); inline/row contexts unchanged.

### Changed
- Tokens — design-token layer restructured to enforce the four-tier naming grammar: numeric scale rungs replaced by size names, the `--alpha-*` alias tier folded into palette alphas, color-named/shade-numbered semantic tokens renamed, and several component tokens renamed to the property grammar. Component output is unchanged.
- Hero — structural styles (position, inset, sizing) moved from inline markup into blocking-crit CSS; markup now emits only per-instance knobs (`--overlay`, `object-position`). The `--overlay` default is unified to `0.7` in CSS (was `0.20` in CSS vs `0.7` in the template/data).
- Icon — `--icon-primary` now brightens to `primary-400` in dark mode (previously frozen at `primary-600`); primary-colored icons route through it instead of `--text-primary`. A consumer overriding `--icon-primary` globally is now re-bound by NDS in dark theme.
- Drawer — active/selected item label uses `--text-primary-strong` (`primary-700`) for AA contrast on the neutral-100 surface.
- Forms — dark-mode input backgrounds on lighter/darker surfaces shift: `--form-field-background-lighter` → `neutral-700`, `--form-field-background-darker` → `neutral-900`.

### Fixed
- Featured icon — a default `.nds-featured-icon.nds-dark` (no status) filled green in light mode; it now fills the brand color.
- Slider — focus outline and inner ring scale with thumb size instead of hardcoded widths, staying proportional when the thumb is resized.
- Core — scroll restoration uses native `'auto'` (pre-paint restore), killing the reload top-flash; hash URLs and back-forward navigation restore correctly.
- Feedback / Progress — a status-less `.nds-feedback` now renders neutral (info glyph + dark outline brightening) via `var()` defaults; removed a stale progress information-circle override that double-stamped the glyph.

### Migrating from v1.2.0

- Replace the built bundles (`nds-main.min.*` and the loader-injected `nds-delegated`/`nds-extras`, plus the `nds-accessibility`/`nds-showcase`/theme bundles).
- Token overrides — only consumers who **override or reference NDS token custom properties** in their own CSS are affected; classes and component rendering are otherwise unchanged. See the [Token Migration Reference](TOKEN-MIGRATION.md) for the full old→new name map.
- Hero — copied hero markup with inline structural styles still works but those styles are now redundant (CSS owns them); a slide that doesn't stamp `--overlay` now renders at `0.7` (was `0.20`) — stamp an explicit value to pin it.
- Head — v1.2.0 pages shipped an inline critical-gate `<style>` + async-loaded critical `<link>` (preload/`onload` swap + `<noscript>`). A copied `<head>` still works, but the inline snapshot can drift from the 1.3.0 crit file; the canonical, drift-proof setup is a single render-blocking `<link rel="stylesheet" href="assets/css/nds.critical.min.css">` (first paint stays theme/dark-correct). Redundant but harmless if left.

## [1.2.0] - 2026-07-01

### Added
- Slider — new range input component: single value or dual-thumb min–max, full keyboard control (arrows, Home/End, Page Up/Down), proportional sizes, and a `.nds-stacked` layout. See the [Slider doc page](https://mazin-musleh.github.io/NDS-vanilla/components/slider.html).
- Filter — slider/range filter type and a standard `nds-filter-bar` layout. See the [Filter doc page](https://mazin-musleh.github.io/NDS-vanilla/components/filter.html).
- Pagination — `setTotalPages()`, a `page-change` event, id-based binding between a nav and its content via `data-*`, `data-page-url` page links, plus live collapse and auto-refresh when items are added or removed.
- Numbers — `data-unit` on `nds-number-format` appends an arbitrary unit suffix.
- Upload — `NDS.Upload.create(el, options)` for JS configuration (overrides the declarative `data-*`), a built-in fallback file-item template, and opt-in `addFile` validation. See the [Upload doc page](https://mazin-musleh.github.io/NDS-vanilla/components/upload.html).
- IPV (ID/passport input) — added full keyboard accessibility and English/Arabic localization. See the [IPV doc page](https://mazin-musleh.github.io/NDS-vanilla/components/ipv.html).
- Rating — loading skeleton state.
- Progress — circular ring fills when scrolled into view.

### Changed
- Code — syntax highlighter rewritten as a token-stream lexer with embedded-language support and language auto-detection.
- Filter — `data-filter-items` accepts a bare class name, not only a full selector.
- Buttons — `--btn-gap` scales per size; icon-only and minimal-collapse buttons route padding through the `--btn-padding` token; the loading-spinner inset is decoupled from padding so a zero-padding button keeps a correctly sized spinner.
- Upload — event payloads are now uniformly shaped `{file, id, status, progress, error}`.
- Alert — links inside alerts render in the neutral link color instead of being promoted to the primary color.
- Tokens — added `--text-primary-strong` (`primary-700`) for AA-contrast brand text on tinted surfaces; `--text-brand` is now an alias of `--text-primary` (`primary-600`).

### Fixed
- Filter — negative range bounds now decode from the URL and match items correctly.
- Chart — touch page-scroll restored; tap pins the crosshair on line charts.
- Loader — recovers from a transient first-load failure when fetching an injected bundle.
- Date — Hijri dates are built from numeric parts, fixing component and separator ordering.
- Mainnav — dropdown column sizes to its content (`fit-content`).
- Buttons — the indicator on dark/oncolor buttons is brightened to white.
- Progress — `stroke-dashoffset` / `stroke-dasharray` values are correctly unitized.
- Breadcrumb — collapsed-ellipsis loading skeleton renders correctly.
- Tabs — loading-state skeleton spans the full panel width and no longer covers code-block action buttons.
- Featured icon — stays square (`aspect-ratio: 1`) instead of distorting in flex/grid containers.
- Layout — hero stack is vertically centered; main content aligns to the start.
- Layout — `.nds-content-layout` reliably fills the remaining height regardless of how many sections precede it.

### Migrating from v1.1.0

- Replace `nds-main.min.css` and `nds-main.min.js`, plus the loader-injected `nds-delegated.min.js` and `nds-extras.min.js` (the new Slider ships in `nds-delegated`).
- Code-block tabs: if you copied the old tab markup, re-copy it from a doc page — the dead `oneRowContent` class is gone and an overflow `nds-show-more` button now follows the tab `<nav>`. Old markup keeps working; the update just restores the overflow control.
- Upload — if your event handlers read a payload shape other than `{file, id, status, progress, error}`, update them. The declarative `data-*` API is unchanged.

## [1.1.0] - 2026-06-13

### Changed
- Performance — major pass across the loader, head, and components: inlined critical CSS with asynchronous asset loading, lower init-time blocking, and off-screen sections skip rendering. See the [Document Head page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html).
- JavaScript restructured into three bundles — `nds-main.min.js` plus loader-injected `nds-delegated.min.js` and `nds-extras.min.js`. Public API (`NDS.X.method()`) unchanged. See migration.

### Added
- Theming — easily re-brand the template for general (non-DGA) use: predefined + event themes, dark mode, and custom brand palettes. See the [Themes doc page](https://mazin-musleh.github.io/NDS-vanilla/components/themes.html).
- Export — `NDS.Export` for CSV / Excel / PDF download.
- Templates — Social Media and KPIs (DGA).

### Migrating from v1.0.5

- Replace `nds-main.min.css` and `nds-main.min.js`, and ship the two new bundles `nds-delegated.min.js` and `nds-extras.min.js` alongside `nds-main.min.js` — the loader injects them at runtime; without them, deferred components won't load.
- If a component no longer appears, remove its `hidden` attribute — the show/hide system changed.

## [1.0.5] - 2026-05-16

### Added
- Accessibility — new optional site-wide Accessibility Panel: presets, typography tuning (text size, spacing, line-height, font), high-contrast mode, reduced-animations, and dyslexia-friendly fonts (Maqroo, OpenDyslexic). Bilingual (English/Arabic). Ships as a separate `nds-accessibility.min.js` bundle — see the [Accessibility doc page](https://mazin-musleh.github.io/NDS-vanilla/components/accessibility.html).

### Fixed
- Button — long labels grow instead of clipping.
- Link — long links wrap instead of overflowing their container.
- Grid — only the default gap halves at the tablet breakpoint; custom gaps keep their value.
- Scroll-more — vertical show-more button height clamps to its content.

### Changed
- Performance — broad pass across the loader and components: components cold-init (register cheaply, defer measurement until shown), a smaller eager-init burst, shared observers in swiper, cached DOM lookups and delegated hover in mainnav, a debounced resize bus, and deferred topbar widget calls. Lower init-time total blocking time — pages now score 100 for Performance on Google PageSpeed Insights. No markup changes.

### Migrating from v1.0.4

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.5 versions.

## [1.0.4] - 2026-05-04

### Fixed
- Mainnav — hamburger toggler and Persistent Action Buttons now appear correctly on mobile when the page server-renders with `body class="nds-minimal"`. The init was returning early because the body class already matched, leaving `.nds-nav-minimal[hidden]` untoggled.
- Drawer — fit-mode columns now share row space via `flex: 1` instead of collapsing under `height: 100%`.
- Drawer doc — show-more buttons in the drawer doc page now match scroll-more's canonical chrome (correct class list, `type`, `aria-label`, inline CSS-mask icon) so consumers who copy from the docs no longer get an HGI font icon that flashes before font-load.
- Scroll-more — vertical show-more height clamps to its content instead of stretching.

### Changed
- Language switcher — JS module replaced by a tiny inline `<script>` next to the toggle button in the navigation. The previous module flipped direction only and never translated content, which made it misleading. The demo toggle still flips `<html lang/dir>` in place.
- Theme switcher — activated by the loader only when a `[data-theme-toggle]` element exists. Toggle-less pages skip the global click/change listeners entirely. Public API (`NDS.Theme.set/get/toggle`) unchanged.
- Button indicator — bottom and vertical bars on `.nds-indicator` buttons now scale their inset margins with button size instead of a fixed `var(--spacing-md)`, so the indicator looks proportional on small and large buttons alike.

### Migrating from v1.0.3

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.4 versions.

## [1.0.3] - 2026-05-03

### Fixed
- Section — variant/layout demo togglers in the docs were targeting the wrong element due to a broken descendant selector; togglers now hit the demo section.

### Changed
- Footer — restructured for DGA compliance. See the [Footer doc page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/footer.html) for the current markup and class names.
- Section — when `.nds-section-image` precedes `.nds-section-head`, the head now stacks as a column with the image flush below; previously had a margin gap.

### Migrating from v1.0.2

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.3 versions, then re-copy your footer markup from the [Footer doc page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/footer.html) — the old footer structure is no longer supported.

## [1.0.2] - 2026-05-02

### Added
- Metric — new card+chart composite component for KPI tiles.
- Chart — `spotlight`, `padding`, and `direction` options; x-axis labels auto-rotate and decimate when crowded; line charts get a touch-friendly snap crosshair.
- Fonts — IBM Plex Sans Latin1 faces (Regular / Medium / SemiBold / Bold) ship locally so each weight renders truly instead of being synthesized.
- Icons — `trade-up`, `arrow-up-02`, and `arrow-down-02` selectable on the inline icon set.

### Fixed
- Scroll-more — divider always renders; flex children no longer jitter in width on re-bind.
- Components no longer leak listeners on teardown or after being moved into a portal — chart, dropmenu, tooltip, and mainnav release cleanly.
- Lang-switcher — direction toggle reflects live `dir` / `lang` attribute changes.
- Mainnav — drawer and open dropdowns close when a modal opens; `.nds-fit` dropdowns stay clamped inside the viewport on narrow screens.
- Topbar — no flash of the Saudi flag SVG and digital-stamp tab on load; both stay hidden until the loader reveals them.
- Tables, pagination, and console — icon-only sort buttons expose accessible labels.
- Dark theme — `--text-oncolor-primary` corrected for proper contrast.

### Changed
- Buttons — size math reworked; pixel sizes shift slightly.
- Hero swiper — navigation rebuilt: arrow buttons and pagination now group under `.nds-swiper-navigation` (with arrows nested in `.nds-swiper-buttons`); `.nds-swiper-button-prev` / `.nds-swiper-button-next` classes are gone — see migration.
- Hero — slider preloads only on home pages (was preloading on every page); first hero image and FOUC scripts reorder for faster perceived paint elsewhere.
- `NDS.scrollLock` is now a public helper for components that need to lock body scroll.
- Scrollbars — light and dark themes use a unified scrollbar color.

### Migrating from v1.0.1

**Required step**

Replace your bundled `nds-main.min.css` and `nds-main.min.js` (and the matching `assets/fonts/` IBM Plex Sans files, if you self-host) with the v1.0.2 versions.

**Markup updates required in your pages**

- **Hero swiper navigation** — wrap your existing arrow buttons and pagination in two new containers, and drop the `.nds-swiper-button-prev` / `.nds-swiper-button-next` classes. The arrow `<button>` elements keep the same `nds-btn nds-subtle nds-icon-only nds-oncolor` styling classes plus `nds-prev` / `nds-next`; only the surrounding structure and the redundant `swiper-button-*` classes change.

  **Before (v1.0.1):**
  ```html
  <button class="nds-btn nds-subtle nds-oncolor nds-icon-only nds-prev nds-swiper-button-prev"
          aria-label="Previous slide" hidden></button>
  <button class="nds-btn nds-subtle nds-oncolor nds-icon-only nds-next nds-swiper-button-next"
          aria-label="Next slide" hidden></button>
  <div class="nds-swiper-pagination" hidden></div>
  ```

  **After (v1.0.2):**
  ```html
  <div class="nds-swiper-navigation">
      <div class="nds-swiper-buttons">
          <button class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-prev"
                  aria-label="Previous slide" hidden></button>
          <button class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-next"
                  aria-label="Next slide" hidden></button>
      </div>
      <div class="nds-swiper-pagination" hidden></div>
  </div>
  ```

  The slide structure (`.nds-swiper-wrapper > .nds-swiper-slide`) is unchanged.

**Visual shifts to verify (no markup change needed)**

- **Button pixel sizes** shift slightly with the new size math.
- **Hero slider arrow buttons** sit at a different position after the markup update — the swiper-wide arrow rebuild changed how arrows position relative to the slider edges.
- **Card text alignment** — `.nds-card-text` pins to `flex-start`; cards whose copy was centering by inheritance will now left-align.
- **Inline `<i>` icons** align to `text-bottom` so they sit on the text baseline.

## [1.0.1] - 2026-04-28

### Added
- `--typo-text-2xs-FS` / `--typo-text-2xs-LH` — a new smallest step on the type scale; badges and other tight UI chrome migrate to it.
- Filter — "All" radio is auto-prepended so radio filters can be cleared.
- Link — external-link badge is now skipped on icon-only / image-only anchors.

### Fixed
- Service template — rating dropmenu's label + stars now stack (previously rendered on one line — a layout bug in the rate-this-service prompt).
- Link `:visited` / `:focus` colors apply everywhere. Previously gated to `.nds-content-section` only; footer, alert, breadcrumb, side-nav etc. now color on those states.
- `.nds-oncolor` is honored inside content sections (was silently overridden by the primary fallback).
- `.nds-accordion.nds-card` honors the accordion's gap and full width. Previously the card's `var(--_card-gap)` (3xl) leaked over the accordion's `gap: 0`, and the card's 360px default `max-width` capped the accordion. Now spans full width with no gap between items.
- Forms — Chrome a11y warnings silenced: autocomplete hints and field names added.
- Forms — autofill no longer bleeds through inputs, and the focus ring no longer collides with the autofill state.
- Forms — voice-input button no longer stacks click listeners when re-initialized.
- Components reparented to portals preserve state across the move (impacts modals, dropmenus, tooltips, mainnav).
- Footer — standalone `<hr>` divider is visible on the green variant.
- Services-list — Details button points at `service-template` and the trailing-slash 404 is gone.

### Changed
- Hero slider only preloads on the home layout (was preloading on every page).
- First hero image preloads and FOUC-prevention scripts have been reordered for faster perceived paint.
- Inline `<i>` icons align to `text-bottom` so they sit cleanly on the text baseline.
- Footer copyright is bolder (`font-weight: 600`) and reads on the green background without a custom dim color.
- Footer — "Template developed by..." author credit removed from rendering.

### Migrating from v1.0.0

**Required step**

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.1 versions.

**Markup updates required in your pages:** None.

## [1.0.0] - 2026-04-26

### Added
- Initial public release.
- 70+ components across UI, Forms, UI Shell, Plugins, Data, Layout, and Utilities categories.
- RTL/LTR native support via CSS Logical Properties.
- 3-tier design token system (color, semantic, component).
- Smart component loader with on-demand initialization.
- Six example pages: Service, Console, Registration, Academic Profile, Services List, 404.
- Jekyll-based development environment with custom Ruby plugins for JS bundling, HTML compression, and baseurl resolution.
- GitHub Actions workflow for Pages deployment.
- Five project-specific Claude Code skills for contributors.
- MIT license, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY policies.

[Unreleased]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.4.1...HEAD
[1.4.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.5...v1.1.0
[1.0.5]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/mazin-musleh/NDS-vanilla/releases/tag/v1.0.0
