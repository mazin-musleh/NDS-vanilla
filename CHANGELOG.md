# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.11.0] - 2026-09-02

### Added
- **National Day 96 event theme** — the third event pack, applied by one `<script>` tag. It keeps the DGA palette and the standard hero slide markup, swaps in the event photo, rotates three artworks through the section identity bars, and adds the event mark to the footer strip. See the [National Day 96](https://mazin-musleh.github.io/NDS-vanilla/events/national-day-96.html) page.
- **`NDS.fromTemplate(id)` and the `nds:template:ready` event** — the helper finds an id asleep in a `<template>`, stamps the content into place and wakes it through `NDS.Init.refresh`, which now matches the stamped root itself and not only its descendants. The event fires on `document` after the arrivals are wired, so page JS that looks a templated surface up at load has a cue instead of bailing silently. See the [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html) page.
- **Modals and panels open from a `<template>`** — wrap the markup in `<template class="nds-modal-template">` or `.nds-panel-template` and the open and toggle paths stamp it in on first use. The template class keeps the loader's presence gate true on a page whose only instances are templated. See the [Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html) and [Panels](https://mazin-musleh.github.io/NDS-vanilla/components/panels.html) pages.
- **Dropmenu takes a lazy authored menu** — a wrapper whose menu ships in its own `<template>` child is skipped at scan; the first trigger click stamps the markup, runs the untouched constructor on real DOM and opens. This is opt-in, not canon: it covers only menus dropmenu alone drives. See the [Dropmenu](https://mazin-musleh.github.io/NDS-vanilla/components/dropmenu.html) page.
- **`nds:cookies:consent`** — fires on Accept and Reject with `detail.consent`, so a tool NDS knows nothing about can gate on the choice inside the same page view. Dismissing is not a choice and fires nothing. See the [Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html) page.
- **Stepper `nds-xs` and `nds-md`, and text knobs in front of the variant** — `--stepper-title-FS`/`-LH` and `--stepper-description-FS`/`-LH` set a large label beside a small ring. See the [Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html) page.
- **`--card-image-width`** — a row card's image asks for the width it wants instead of stretching to the line. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **`--brand-logo-height`** — the brand logo height is a knob, 40px by default, in the nav too. See the [Header](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/header.html) page.
- **Every event pack has a download zip** and a download button on its doc page.

### Changed
- **The cookies banner denies by default.** Closing it with the X writes `cookieConsentDismissed` for 30 minutes and applies the same denial as Reject, without recording a consent value — the popup used to return on every page load. The load-time check now denies for anything but a stored `accepted`, and accepting clears the `ga-disable` flags so it takes effect without a reload. See the [Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html) page.
- **`.nds-card-price` becomes `.nds-card-value`** — the pattern is a value line, a price or a rate or a size, and only the name said money. The old class rides along as an alias. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **A row card sizes off its header** — the header hugs its content, which is right for an avatar or a featured icon that carries its own size. A single container query on the card decides the line break, since nothing in flexbox can tell that a line wrapped. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **Radial stepper text is sized per variant, off the type ladder.** The old clamps were keyed to `--stepper-size` and written in raw px, so the default 64px ring rendered a 14.4px title and a 10.9px description, and `--user-font-scale` never reached them. `nds-lg` is now 80px, not 96px. The ring gap goes flat per variant. See the [Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html) page.
- **The sideinfo aside is a bare track; the content carries the surface.** `.nds-sideinfo` owned both the column geometry and the card surface, so a consumer could not style the companion content without fighting the track. Border, radius, shadow and padding now route to `&.nds-card, > .nds-card`, and the background became the `--card-bg` knob. The old aside-as-card pairing renders unchanged. See the [Side Info](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sideinfo.html) page.
- **The accessibility panel ships inert in a `<template>`** and stamps in when it is armed — about 190 DOM nodes off every page for a visitor who never opens it. A saved all-defaults state deletes its own `localStorage` key so it stops arming the boot for nothing. Bare `<aside>` markup keeps working. See the [Accessibility](https://mazin-musleh.github.io/NDS-vanilla/components/accessibility.html) page.
- **The image viewer builds its overlay on first open** — about 50 nodes, the control listeners and the i18n fetch now wait for the first thumbnail click, so a gallery page nobody opens carries none of it. The overlay moves from z-index 1000 to the backdrop tier at 1100; it is the dimming layer and sat under the topbar. See the [Image Viewer](https://mazin-musleh.github.io/NDS-vanilla/components/ipv.html) page.
- **The base `.nds-icon` rule is zero-specificity.** The icons sheet loads after main CSS, so `i.nds-icon`'s 1em won every tie and `.nds-avatar i` rendered a third of the size it asked for. `:where()` makes it a default a component can override.
- **The shipped SVG and raster assets are smaller** — `assets/` drops from 37K to 18K gzipped, the Foundation Day and Hajj packs from 279K to 51K, and the National Day rasters are WebP. Every file was checked by rendering it before and after, so nothing draws differently.
- **FAQ accordion bodies take `nds-prose`.** See the [FAQ Template](https://mazin-musleh.github.io/NDS-vanilla/templates/faq-template.html) page.
- **The home template's hero swiper drops `nds-middle`** — that modifier centres the nav on the slide, where it overlaps the slide text. It suits a textless slider, or slides with centred text.

### Fixed
- **A component built with `create()` is now registered.** The constructor owns `el.nds{Name}`, so every expando-routed surface reaches it — pagination's public `destroy()` could not tear one down at all. Covers pagination, expandable, tabs and tables.
- **Multiselect validation reads a portaled menu.** Re-validation fires while the menu is open, and a multiselect in a modal, drawer or table cell has portaled it to `<body>` by then, so the walk found 0 of 2 ticked boxes and reported `checked: 0` through the validation payload.
- **Pagination survives a portaled ellipsis menu.** Four paths assumed the menu never leaves the wrapper: both click handlers read the page off `e.target`, which is the wrapper on the re-dispatch; `setActivePage` lost the active page once the menu closed; the lazy-range lookup returned null and let a builder guard fail open; and a discarded wrapper stranded its menu at `<body>`. A standalone `.nds-pagination-list` root also releases its paged-content skeleton now.
- **Nested tabs and accordions keep their own parts.** Both slots hold arbitrary consumer content, so an outer controller claimed a nested instance's parts, and the two lists interleave differently — `tabs[i]` and `panels[i]` desynchronized. Every derivation routes through one containment guard.
- **Dropmenu select mode only claims its own items.** A nested sub-dropmenu's item click wrote the child's value into the parent's hidden input, relabelled its trigger and fired `nds:dropmenu:selected` with the wrong item.
- **Dropmenu stops leaking on Arrow keys** — `open()` re-entered and overwrote its subscription handles, so `close()` released only the last pair. Thirty pooled subscribers were stranded over ten open cycles.
- **A dropmenu closed twice fires one `nds:dropmenu:closed`.** A second close re-armed the transition handle over a live one, so both fired.
- **A hero swiper re-measures its scroll step when the slides reveal.** A hero that inits off-screen measured the step from a hidden slide and cached the wrapper's inline padding instead of the slide stride, so the nav read at-end one slide early.
- **The mainnav show-more no longer flashes on the desktop-to-minimal flip.** A discrete `visibility` transition keeps an element painted for its duration, long enough to ride the closed drawer's transform to the top of the viewport.
- **`nds-truncate` caps a breadcrumb crumb at 45ch.**
- **A top-anchored toast sits under the real header.** The offset reads `NDS.stickyHeaderBottom()`, so a page with a topbar and no main nav stops falling back to a 72px nav height it does not have — measured 32px too low.
- **Password rule chips route through `NDS.Status`** instead of writing `dataset.status` raw.
- **An event pack's hero slide is an `<h2>`.** Every pack injected its title as an `<h1>`, so a themed page carried two.
- **Reinit and refresh restore post-init state** — mainnav reinit re-runs under a kept root, `Filter.refresh` re-detects the search box and re-stamps its container, forms pair `aria-describedby` with the feedback message, a reopened modal no longer self-closes, the loader kicks the icon font fetch when its sheet applies, and `Chart.reinit` redraws a wiped root. From an SPA adopter's report.
- **Core's grid scan runs when the bundle loads late.** It waited on `DOMContentLoaded`, which a bundle injected after load — an SPA host — never sees.
- **The stepper's look-ahead line is blank during the skeleton** — its radial colour rule outranked the skeleton bar's transparent-text rule.
- **The stranded form-field status border tokens are gone.** `--form-field-border-success`, `-warning` and `-info` survived the reduction to error and help, and nothing read them, so setting one had no effect.

### Documentation
- **[Side Menu](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sidemenu.html)** — `nds-drawer-group` is dropped. It appears in no SCSS or JS; third-level group headers are styled structurally, which the Drawer page already documents as "no class needed". This site's own drawer opts into `nds-lined`, so a consumer copying the rendered DOM gets a rail the sample here does not show.
- **[Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html)** — NDS signals consent, it does not block anything. The banner runs deferred, after the consumer's head snippet, and the consumer's Consent Mode default is what stops the first page view.
- **[Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html)** — bind `nds:template:ready` on `document`, reach an instance by its `el.nds{Name}` property, and the head-diffing framework note.
- **[Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html)** — where `nds-middle` puts the arrows on a hero. Neither the modifier table nor Best Practices said.
- **[Accordion](https://mazin-musleh.github.io/NDS-vanilla/components/accordion.html)** — the collapse panel is role-less on purpose; naming a generic div fails an ARIA audit.
- **[Chart](https://mazin-musleh.github.io/NDS-vanilla/components/chart.html)** and **[Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html)** — `chart.render()` and the modal's `data-state` are documented paths now.
- **[Sign In](https://mazin-musleh.github.io/NDS-vanilla/examples/sign-in.html)** and **[Registration](https://mazin-musleh.github.io/NDS-vanilla/examples/registration.html)** — the auth shells are reworked: the logo is a `.nds-brand` home link, the language switch is an icon-only button in the first card header, field errors stay inline through `setStatus`, and a server rejection is created on demand with `NDS.Alert.create` instead of a hardcoded block.
- **Page-script samples take a `readyState` guard** across the component, example and template pages — the sample runs when a router injects the markup after load, instead of waiting for a `DOMContentLoaded` that already fired.
- **[Event pages](https://mazin-musleh.github.io/NDS-vanilla/events/national-day-96.html)** — the bare `<script>` tag leads as the canonical install, since every value has a default. The override form keeps its own tab.

### Migrating from v1.10.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **The cookies banner now denies by default.** Before this release, a visitor with no stored choice was not denied. If you relied on that, set your own Consent Mode default in your head snippet — NDS signals the choice, it does not block the tool.
- **`--form-field-border-success`, `--form-field-border-warning` and `--form-field-border-info` are removed.** Nothing read them, so a value set on one never applied. `--border-success`, `--border-warning` and `--border-info` are still there.

## [1.10.0] - 2026-08-25

### Added
- **Status Section** — an outcome message as a whole page or as one section: not found, submitted, failed. `data-status` colours the title and the feedback chip, and `.nds-section-icon` takes a chip or an illustration. Both 404 templates move onto it; `.nds-404` stays as an alias. See the [Status Section](https://mazin-musleh.github.io/NDS-vanilla/layout/status-section.html) page.
- **The neutral hue takes both `.nds-gray` and `.nds-neutral`** on tags, alerts and featured icons. Featured icons take the colour classes as canon, the way tags already do. See the [Featured Icons](https://mazin-musleh.github.io/NDS-vanilla/components/featured-icons.html) and [Tags](https://mazin-musleh.github.io/NDS-vanilla/components/tags.html) pages.

### Changed
- **Running text no longer caps at `--paragraph-max-width`** — the cap sized the whole box, not the text, so an image inside a `<p>` stopped sitting centred. `.nds-section-title` takes the cap instead, with the `.nds-full` escape. See the [Prose](https://mazin-musleh.github.io/NDS-vanilla/layout/prose.html) page.
- **Tags drop their neutral rung** — it restated the base defaults. No colour changes, and an author's own `--tag-bg` now wins on a plain tag. See the [Tags](https://mazin-musleh.github.io/NDS-vanilla/components/tags.html) page.

### Fixed
- **The mainnav's first menu open no longer stalls** — `display: none` kept the menus out of the render tree, so the first open paid layout and paint inside the interaction window. Closed menus now hide with `visibility`.
- **Section, card and alert variants no longer clobber their own public knobs** — a variant rule on the component root wrote the documented `--section-*` or `--card-*` knob, so a consumer who set it on that element lost. Variants now retune a private `-base` name.
- **A plain alert's title takes the text colour, not the status tint** — the reset wrote the public knob, where `initial` falls through to the base. Dark mode too.
- **Featured icons keep their status colour in dark mode** — the `.nds-dark` rules keyed on `[data-status]` alone, so `.nds-dark.nds-green` fell back to the primary hue. `critical` joins the error row.
- **A hero slider emits one `<h1>` per page** — every slide emitted one. Slides after the first now emit `<h2>`.
- **`nds-truncate` clamps the current-page breadcrumb** — the list item's `flex` outranked the zero-specificity `:where(.nds-truncate)`.
- **A bare image in prose gets the sibling gap** — direct children only, so a `<figure>` keeps its caption.

### Documentation
- **[Breadcrumb](https://mazin-musleh.github.io/NDS-vanilla/components/breadcrumb.html)** — truncation is for the current-page crumb; on a middle crumb the `::after` arrow pulls into the clamp box.
- **[Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html)** — NDS needs JavaScript, with no `noscript` fallback by design. The stale v1.3.0 note points to its v1.7.0 replacement.
- **[Prose](https://mazin-musleh.github.io/NDS-vanilla/layout/prose.html)** — `img` joins the structure tree.
- **v1.4.0's migration heading is now `### Migrating from v1.3.0`** — the only one of 18 that missed the heading NDS IQ searches for, so an upgrade run never saw its steps. Its two missing notes are back.

### Migrating from v1.9.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **A hero slider's slides after the first take `<h2>`, not `<h1>`.** Change hand-authored slide content. Semantic only, nothing moves.

## [1.9.0] - 2026-08-22

### Added
- **Home Page Template** — the official DGA home composition on a new `shell` layout: a main hero slider, an About row with counting figures, a Services card deck, a news deck, a partner logo strip and the last-modified line. The `shell` layout emits the document and the scripts only, so the page source shows the whole page shape in order instead of an inner fragment. See the [Home Page Template](https://mazin-musleh.github.io/NDS-vanilla/templates/home-template.html) and [Page Shell](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html) pages.
- **Swiper `nds-middle`** — the arrows leave the navigation row and flank the slides at their vertical centre, with the bullets hidden. Tablet and up only: below 601px every rule drops and the normal row returns, so a phone falls back to a known layout instead of a special case. On `nds-hero` the arrows overlay at the viewport padding and the bullets pin bottom-centre. See the [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) page.
- **Modal `data-modal-static`** — drops ESC and backdrop-click closing, so `[data-modal-close]` is the only way out. This is the contract `data-panel-static` already gives a panel. A centred status modal demo shows the shape. See the [Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html) page.
- **Card padding knobs per axis** — `--card-padding-block` and `--card-padding-inline` each fall back to `--card-padding`, so a variant retunes one axis without overwriting both. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **Dropmenu portals itself when an ancestor clips it** — the test is vertical clipping, not fixed-position trapping, so a menu inside a scrolling wrapper escapes on its own. `data-portal` forces the move and `data-no-portal` refuses it, for a wrapper whose CSS or DOM walks need the menu to stay a descendant. See the [Dropmenu](https://mazin-musleh.github.io/NDS-vanilla/components/dropmenu.html) page.
- **`nds-audit.min.js`, an on-demand audit bundle** — the debug checks left the main bundle. It is never auto-injected: the loader pulls it when `enableLogging` schedules the post-init sweep, or on the first `NDS.Init.audit()` call, so a production page that never asks for it downloads zero bytes of it. That first call returns a promise while the bundle loads. Three checks ship with it — a nav link that should be marked current, a stepper control that fights its form's submit, and a framework wrapper that breaks the shell's layout chain. See the [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html) page.
- **NDS IQ v3.0** — the rulebook is restructured around work modes, an authority table and phase gates, and is about a third shorter than v2.2. See [NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Cooldown Button dropped the two states it could not observe. BREAKING.** `data-sent-title` and `data-sent-message` raised a "sent" toast on the click, so a failed request showed success beside the caller's own error toast. `data-cooldown-loading` held a spinner for a fixed count that matched no real response, and under the documented wiring it delayed the send. Both are gone, and the `nds:cooldown:loading` event with them. The page now owns the request, its `data-state="loading"` and its confirmation, all from one event. See the [Cooldown Button](https://mazin-musleh.github.io/NDS-vanilla/components/cooldown-button.html) page.
- **Section striping is opt-in** — `.nds-main-content` takes `.nds-stripe` to tint alternating sections, and `.nds-odd` beside it flips which parity carries the tint. Striping used to be on by default for every plain layout, so a page that wanted flat sections had no way out. The opt-in also retires the `.nds-wSideMenu` exclusion, so an author who asks for stripes gets them at every width. See the [Section](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html) page.
- **Statistic card numbers inherit their weight** — the number is 48px and reads heavy on its own, so the medium-weight declaration is removed rather than lowered. This affects every statistic card.
- **The template zip no longer ships `NDS-IQ.md`.** The rules file versions independently of the template, so a copy frozen at the release cut goes stale as soon as the next revision lands, and a runner that finds two copies has to work out which one wins. Install it from raw main, which is the source the file's own Install section already tells you to compare against.

### Fixed
- **Dropmenu flips against the space it actually has** — the sticky-nav ceiling was applied to menus that paint over the nav, so inside a modal a tall menu measured the space above it about 120px short, stayed down, and ran off the viewport with room to spare above it. The date-picker calendar clipping off the bottom of the viewport was the visible case. A menu that fits neither side now clamps and scrolls instead of overflowing, and the calendar re-places when it switches to the month or year grid.
- **Pagination reads its ellipsis items portal-aware** — a pagination inside a modal or a scrolling wrapper now portals its menu to `<body>`, which a plain descendant walk cannot reach.
- **Zebra striping counts visible rows only** — hidden rows kept their parity, so a filtered or paged table striped in blocks. The hide set mirrors the canonical one rather than patching filter and pagination alone.
- **An emptied `.nds-nav-actions` drops out of the mainnav layout** — the row kept its border after it lost its last item.
- **A centred card centres its text block and its header** — `.nds-center` reached the children but not `.nds-card-text` itself, and the header stayed pinned to the start because the `.nds-close` space-between rule sits later in source at equal specificity.
- **Stepper stops cancelling form submits** — a submit-typed control inside a form is handed to that form: no `preventDefault`, no move. `data-stepper-control` stays an unconditional mover, and a gated step is driven by `NDS.Stepper.next()` from whatever knows the answer. See the [Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html) page.
- **`.nds-grid` no longer stretches to its parent's height** — the row tracks already sized themselves, so the stretched box only added trailing height when the parent was taller than the content.
- **A persona's info column centres against the avatar** — it sat top-aligned whenever the avatar was the taller of the two.
- **A countdown label with no `{s}` placeholder warns** — the label rendered frozen with nothing to say why.

### Documentation
- **[Page Shell](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html)** — the console modifier's reach (inert outside `nds-*` regions, no per-route toggle), the three `--bg-*` knobs, an `nds-page-bg` row, and the `shell` layout in the shape table.
- **[Section](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html)** — the `nds-full-width` breakout row, a meaning that was documented nowhere.
- **[Block](https://mazin-musleh.github.io/NDS-vanilla/layout/block.html)** — `nds-block` is a spacing unit, not a content grouping primitive. It sets width and `margin-block-end` only, so the class belongs straight on a stepper, a tab set or a table rather than on a wrapper around them.
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — the custom-select ranking now sits at the Native Select demo instead of 730 lines below it, and `nds-select` and `nds-textarea` have Modifier Classes rows naming what breaks without them.
- **[Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html)** — all three advance paths, and horizontal paired with radial on small screens.
- **[Document Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html)** and **[Hero](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/hero.html)** — the hero image preload is in the canonical head block, with the breakpoint-matching rule beside it. The hero sample matches the slider in the Home Page Template, and the photo-free recipe is replaced: keep the `<picture>` and point it at a placeholder rather than hand-setting a semantic token.
- **[Main Navigation](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html)** — the `current` and `active` `data-state` meanings are separate rows.
- **[Tags](https://mazin-musleh.github.io/NDS-vanilla/components/tags.html)** — the Tag Group example shows labels, not states. It demoed Approved / In Review / Blocked on colour classes, which contradicts the page's own rule that a state takes `data-status`.
- **[Filter](https://mazin-musleh.github.io/NDS-vanilla/components/filter.html)** — `getInstance` and `getByTarget` hand back a promise until the delegated bundle lands; resolve through `whenReady` instead.
- **[Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html)** — when `nds-card-meta` is needed, and when a bare `nds-card-tags` is enough.
- **[Manage Records](https://mazin-musleh.github.io/NDS-vanilla/examples/manage-records.html)** — the port is split by what touches data: filtering, sorting, pagination, export, column visibility and per-page are client-side and port as they are; create, edit, delete and the expandable rows read and write.
- **[Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html)** and **[Chart](https://mazin-musleh.github.io/NDS-vanilla/components/chart.html)** — two wrong token values and a stale palette claim corrected.
- **The primary colour family is described by role, not by hue,** across eleven pages. A brand palette is themeable, so naming its shade in prose dates the page.

### Migrating from v1.8.1
- Replace the runtime: copy `_site/assets/` over your assets folder. It carries one new file, `nds-audit.min.js`.
- **Cooldown Button: remove `data-sent-title`, `data-sent-message` and `data-cooldown-loading`, and stop listening for `nds:cooldown:loading`.** The attributes are inert and the event never fires. Move the confirmation into your own handler on `nds:cooldown:triggered`, which is where the request goes out, and set `data-state="loading"` on the button yourself while it is in flight. The component never sets or clears that state.
- **Add `.nds-stripe` to `.nds-main-content` if you relied on automatic section striping.** Without it every section renders flat. Add `.nds-odd` beside it to tint the other parity.

## [1.8.1] - 2026-08-18

### Added
- **`NDS.Init.audit()` reports `lang` and `dir` disagreement** — `NDS.isRTL` reads `dir` alone, so `<html lang="ar">` with no `dir` runs every direction-aware component left to right under Arabic content, with nothing else reporting it.
- **NDS IQ v2.2** — client-rendered apps get proper coverage, direction and language are a required pair, a compacted context counts as a new session, and a matched source ships all its members. See [NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Field status is error and help only** — a field's outline and its message are error signals, so `setStatus` now folds `success`, `warning` and `info` to neutral on both the container and the feedback it creates. Existing calls still run; they render neutral. See the [Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html) page.
- **The feedback slot is opt-in, not required** — `setStatus` inserts into the container when no `data-feedback-target` exists, so an empty hidden slot is scaffolding rather than a requirement. The empty slots were removed from canonical markup; populated slots and header placements stay.

### Fixed
- **Filter and Pagination no longer drop the URL hash** — all three URL writers rebuilt the address from path and query alone, so the first filter change or page click wiped the route of a hash-routed app.
- **Filter reclaims a target id from a detached instance** — a view unmounted without `NDS.Init.destroy()` left its instance holding the `data-filter-target` id, so every remount was skipped and the region stayed hidden. A detached instance is now destroyed, the id freed, and one warning names the missing teardown.
- **Inline styles removed from shipped JS** — four components wrote a custom property through a `style` attribute, which a strict Content-Security-Policy blocks. Pagination's page menu could not scroll past its first window, the editor's remove menu lost its indent, and toast progress never animated. All four now write through the CSSOM. See [Document Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) for the policy notes.
- **OTP digits paint their status** — an OTP group set to error left its digit boxes neutral while the message rendered.

### Documentation
- **[Page Shell](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html)** — framework wrappers and modifier timing: what a mount element and per-component wrappers do to the shell's layout, and why a layout-affecting class must be in the initial HTML.
- **[Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html)** — the framework-view lifecycle contract: `refresh` on mount, `destroy` on unmount, no readiness check and no polling.
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — server-rendered errors: the loop that sets a status per field and focuses the first invalid one, including the fieldset case a group cannot focus.
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — where feedback goes: the slot is opt-in, and a hidden target shows and hides itself.
- **[Password](https://mazin-musleh.github.io/NDS-vanilla/components/password.html)** — both confirm patterns: with a match chip beside strength rules, and chipless when confirm is the only check.

### Migrating from v1.8.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **Field status calls that used `success`, `warning` or `info` now render neutral.** The calls still run and nothing breaks; if a field relied on a green or amber outline, move that signal to page-level copy or an [Alert](https://mazin-musleh.github.io/NDS-vanilla/components/alert.html).
- **If you copied a form's canonical markup with an empty hidden `data-feedback-target` element, you may remove it.** Leaving it in place is harmless — it renders nothing and feedback still lands there.

## [1.8.0] - 2026-08-16

### Added
- **`NDS.Init.destroy(container)`** — the teardown mirror of `refresh`. It releases every component instance inside a container before that container is removed and returns the count, so a framework can free NDS state on unmount. Teardown restores a relocated node as well: a docked FAB returns to the element that authored it, a portaled dropmenu returns to its wrapper, and an open modal releases its backdrop and scroll lock, so a view removed mid-open cannot strand an overlay the app is unable to dismiss. Five components gained their own `destroy()` so the walk can reach them — see the [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html), [FAB](https://mazin-musleh.github.io/NDS-vanilla/components/fab.html), [Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html), [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html), [Table of Contents](https://mazin-musleh.github.io/NDS-vanilla/components/toc.html) and [Side Info](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sideinfo.html) pages.
- **Main Navigation** — `reinit()` recovers a nav that mounted after the deferred bundle ran. It is registered as a `refresh` hook and acts only when the node actually changed. Before this, a framework that rendered the chrome late left every reference null for the session: CSS painted the nav, nothing worked, and no warning appeared. See the [Main Navigation page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html).
- **Main Navigation page** — the nav is now its own reference instead of a section inside Document Header.
- **Page Shell reference** — names the page shapes, the wrapper classes each one carries, how the side menu and side info nest, and which built page to copy for each shape. See the [Page Shell page](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html).
- **NDS IQ v2.0** — §Build copies the page skeleton from a built page instead of writing it from prose, and routes to the Page Shell reference. §Verify is headless-first: one browser sets its own viewport, so the desktop and mobile passes are the same run. See the [Integration Quality guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Document Head** — the gated critical-CSS setup is now the default HTML tab, so anyone copying canon gets it without reading the prose first. The blocking `<link>` sits below it as the swap to make when a strict CSP cannot grant the inline block a nonce or hash. See the [Document Head page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html).
- **Side Menu, Document Header** — both now name the layout parent an aside needs, `nds-wSideMenu` on `.nds-content-layout`, without which the layout hides the aside. The Jekyll front-matter steps drop to site notes: a consumer project has no front matter. See the [Side Menu page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sidemenu.html).
- **Hero, Main Navigation** — the Jekyll-only sections open with a site note, so a consumer knows the mechanism is this site's and not the system's.

### Fixed
- **Chart** — `initCharts` claimed any `.nds-chart` carrying `data-chart-type` even when the series comes from `NDS.Chart.create`, then threw while building the legend. It fires on plain init, so a chart built through `create` on a marked element has never worked.
- **Filter** — `whenReady` now fires for sibling surfaces that were already ready when init ran.
- **Tables** — `nds-responsive` is documented as what it is: a legacy marker with no effect. Every table is wrapped in the horizontal-scroll container automatically, with or without the class, and the modifier row still credited the class with the wrap. See the [Tables page](https://mazin-musleh.github.io/NDS-vanilla/components/tables.html).
- **Block** — the doc claimed every block establishes a named CSS container. It does not. `container-type` is opt-in through `.nds-cq`, deliberately not on every block, because a container traps `position: fixed` descendants such as modals and dropmenus. See the [Block page](https://mazin-musleh.github.io/NDS-vanilla/layout/block.html).
- **Documentation markup** — a block sweep had wrapped each definition item and each demo card in its own `.nds-block`. Definition lists lost every divider, because the item became the only child of its wrapper and `:last-child` matched every time. Showcases doubled the gap between demo cards. Four tables carried a `<div>` between `<table>` and `<thead>`, which the browser hoists out of the table.

### Migrating from v1.7.2
- Replace `assets/css/` and `assets/js/` with the new bundles.

## [1.7.2] - 2026-08-15

### Added
- **NDS IQ v1.0** — the consumer rules leave beta, rewritten whole: an agent-timeline structure, five standing principles, and tables for the sanctioned edit kinds, the bans, and the states that are reported rather than resolved. 69.6K → 41.4K characters, then 40.4K after the first gated trim. See the [Integration Quality guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).
- **Filter** — every active criteria now reaches the server. Criteria that no control carries, such as a range filter's encoded value, are written into `.nds-filter-hidden-inputs` on each submit and keyed like the URL param, so AJAX and native GET both send them. See the [Filter page](https://mazin-musleh.github.io/NDS-vanilla/components/filter.html).

### Changed
- **Grid, Card, Scroll-more** — public knob resets drop to zero specificity through `:where()`, so a consumer stylesheet class wins whatever the load order. Before this, the deferred main CSS re-inserted at the end of `<head>` and beat any single-class consumer rule, and an external knob sheet lost every knob.
- **Docs** — `data-status` on [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) and [Featured Icons](https://mazin-musleh.github.io/NDS-vanilla/components/featured-icons.html) declares the state the element is in, not a colour: it renders as the matching variant, but a tint with no state belongs on the colour class. Cards' modifier and data-attribute tables now name the element each entry sits on. [Sort](https://mazin-musleh.github.io/NDS-vanilla/components/sort.html) names who owns row order once the server pages the rows, and [Document Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) covers inline knobs under a strict CSP.

### Fixed
- **Icon fonts** — icons no longer stay invisible when every glyph of the family starts hidden, for example inside an unselected tab panel. The browser never began the fetch, so no load event fired and the miss became permanent. The fetch is now forced once on expiry.
- **Tabs** — a horizontal strip's own `--scroll-padding: 0` opt-out applies again, dropping an unintended 4px end padding.
- **Filter** — `setFilterValues` and `setSearchValue` re-fetch in AJAX form mode. They previously repainted the chips, badge, and URL from new criteria without submitting, so the page stated a filter the results were never filtered by. A run of setters coalesces into one request.
- **Filter** — the dropmenu Clear button zeroes the search box, and the change event carries a snapshot.
- **Filter** — controls outside the submitting form are associated with it, so their criteria are no longer dropped silently.
- **Counter** — a target written with grouping separators, such as `3,742`, counts to 3742 instead of 3.
- **Code** — a markdown table row inside a prose block keeps its authored line instead of wrapping into what looks like a new row.
- **Examples** — loading buttons stay clickable and abort on cancel.

### Migrating from v1.7.1
- Replace `assets/css/` and `assets/js/` with the new bundles.
- **Filter in AJAX form mode now sends criteria your handler did not receive before.** A range filter, and any other control the component renders without a name, arrives as a hidden input keyed like its URL param. If your endpoint rejects or logs unknown parameters, accept these before upgrading.
- **Knob resets dropped to zero specificity.** If you relied on an NDS knob reset beating your own class, your class now wins instead. Check any stylesheet that sets `--gap`, `--max-col`, or another public knob on Grid, Card, or Scroll-more.

## [1.7.1] - 2026-08-12

### Added
- Custom select — an option can now carry a description line under its label, plus free decoration such as an icon or a coloured dot. The canonical shape nests `.nds-label` inside `.nds-option-text`, with an optional `.nds-description` beside it. Flat options keep working unchanged: the label reader falls back to the option text's own content, so the trigger never shows the description glued to the label. See the [Forms doc page](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html#customSelect).
- **FAQ template** — each tab's accordion paginates, five entries per page.
- **NDS IQ v0.8** — the consumer rules became version-agnostic. They no longer require a minimum template version, `_source/` is populated from the matching release tag, the update check compares file content with a first-line check that catches a corrupt download, and the revision number is now a display indicator. Also adds a catalog check before any native element or hand-built control, a Content-Security-Policy check at install, and an adoption sweep of each release's Added, Changed, and Fixed notes during an upgrade. See the [NDS IQ guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Alert, Card, Definition List** — running text caps at `--paragraph-max-width`, so long copy keeps a readable line length.
- **Dropmenu** — menus render a thin scrollbar. A classic bar is most of a compact menu's width, and `max-content` sizing ignores it, so items overflowed and clipped.
- **Date Picker** — the dropdown no longer reserves a scrollbar gutter; the thin scrollbar above replaces it.
- **JS source banners** — Filter and Tables now document the DOM shape their generators emit (`_buildFilterInput()` and `buildRow()`), so hand-written filter options and column-menu rows match what the component builds. Filter also documents `data-filter-submit` form mode and its two-line markup.
- **Docs** — Pagination and Autocomplete cross-reference [Toolbar](https://mazin-musleh.github.io/NDS-vanilla/components/toolbar.html). Pagination states that the container and item markers are canonical for every mode, and cross-references `nds-empty` from its server-pagination section.

### Fixed
- **Accordion** — `destroy()` releases the container backref and the init stamp, so `create()` and `init()` rebuild the accordion instead of handing back a dead controller.
- **Button** — a disabled button inside a button group no longer keeps an enabled-coloured inner seam.
- **Forms** — the `.nds-prefix` and `.nds-suffix` radius override is scoped to `.nds-btn`, so it no longer reaches other prefix content.
- **Foundation Day theme** — the mobile section-title override is scoped to its slide instead of the whole page.
- **Filter banner** — corrected: `refresh()` skips form-mode filters whether or not they carry `data-ajax`. A `data-filter-submit` form without `data-ajax` is server-driven too, and re-scanning it would rebuild the options from the rendered rows and drop the applied filter.
- **Release zip** — the bundled `NDS-IQ.md` copy ships with LF line endings.

### Migrating from v1.7.0

- Replace all runtime assets: copy `_site/assets/` from the release zip over `NDS_ASSETS/`. Every file carries the new version banner, so overwrite everything rather than merging.

## [1.7.0] - 2026-08-10

### Added
- **Password** — new component: a password field that checks strength rules on every keystroke, confirms a retyped password matches, and blocks submit until both pass. Rule chips take a built-in rule, a `data-rule-pattern` regex, or a rule registered with `NDS.Password.addRule()`; `data-password-strength` on the container is the CSS hook for a strength meter. See the [Password doc page](https://mazin-musleh.github.io/NDS-vanilla/components/password.html).
- **NDS.Init.refresh** — one call after a list mutates: `NDS.Init.refresh(container)` tells every live component that the container's contents changed, so filters, counters, sorting, and row controls follow the new rows. It walks the loader registry, so a component updates because it is registered, not because the caller remembered it. See the [Refresh doc page](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html).
- **Prose** — new layout layer: a classless flowing-content region for editor and CMS output. `.nds-prose` styles bare headings, paragraphs, lists, blockquotes, tables, and `<hr>` with no per-element classes. See the [Prose doc page](https://mazin-musleh.github.io/NDS-vanilla/layout/prose.html).
- **NDS IQ v0.7** — the consumer rules ship as a file, not a pasted block. `NDS-IQ.md` sits at the zip top level and on raw main, and the agent reads it on demand, once a session. Only a small anchor with the project's two paths goes into the project's own instruction file. See the [NDS IQ guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).
- **JS source banners** — every runtime JS file opens with a public-surface banner listing its methods, events, hooks, and gotchas, so the `_source/` copy answers API questions without a full read. The release build fails on a missing or drifted banner.
- Release zip — `_source/` now carries the raw page sources for docs, templates, and examples (`components/`, `utilities/`, `layout/`, `ui-shell/`, `core/`, `templates/`, `examples/`) beside the JS and SCSS.
- Catalogs — every entry in `components.yml`, `templates.yml`, and `examples.yml` carries `use_when`, the job the entry does in the words developers use.
- Examples — Sign In: national single sign-on with a credentials fallback, captcha on a cooldown refresh, delivery-method choice, one-time code, change password, change mobile, and sign out. See the [Sign In example](https://mazin-musleh.github.io/NDS-vanilla/examples/sign-in.html).
- Examples — Manage Records: a CRUD screen built on table sub-rows, with create, edit, delete, bulk delete, and CSV export. See the [Manage Records example](https://mazin-musleh.github.io/NDS-vanilla/examples/manage-records.html).
- Examples — Faculty CV: a long-form profile with stacked wrappers on one card, a reversed vertical stepper as a career timeline, and a paginated publication list. See the [Faculty CV example](https://mazin-musleh.github.io/NDS-vanilla/examples/faculty-cv.html).
- Filter — `NDS.Filter.refresh(root)` re-resolves items and regenerates auto filters after the DOM changes. A refresh holds the user's page; a real criteria change still resets to page 1.
- Selection — `NDS.Selection.refresh()` recounts every selection target.
- Sort — `NDS.Sort.refresh()` re-runs the active sort after items arrive.
- Sort — a selector string that matches in the document but not inside the root now warns once, instead of silently sorting nothing.
- Custom select — `NDS.CustomSelect.setValue(el, value)` and `NDS.CustomSelect.clear(el)`. Both work before the menu is built and while it is portaled open; `setValue` returns `false` for an unknown value, so display and submit value never diverge.
- Dropmenu — `NDS.Dropmenu.destroy(element)` is now public, so a consumer discarding a wrapper has a supported teardown.
- Autocomplete — `data-strict`: typed text must match a picked suggestion, enforced at submit through a hidden nameless value carrier. The submitted form data does not change.
- Stepper — `nds-cardView` cards each step's content in vertical layout and the whole widget in radial. `--stepper-gap`, `--stepper-card-lift`, and `--stepper-content-width` are real knobs a consumer stylesheet can win against.
- Stepper — a divider used as a step label, aligned to the circle centre through `--divider-lift`.
- Divider — `nds-start` and `nds-end` drop one flanking line so the label sits flush. `--divider-line-start` and `--divider-line-end` cap either line.
- Section — `--section-wrapper-gap` sets the space between stacked wrappers in one section. See the [Section doc page](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html).
- Buttons — `.nds-btn.nds-col` stacks the icon above the label and fills its slot.
- Code — `.nds-code-tags`, an authored chip strip beside the language tag.
- Tags — `--tag-label-max` dials the label cap; a long label truncates instead of escaping its container.
- Scroll more — `--scroll-padding` pads the scroll end so the last child's border and focus ring are not clipped.
- Table of contents — `--toc-skeleton-rows` reserves the auto-populated list height and a loading skeleton fills it until init.
- Hero — the sub hero can carry a portrait beside its title, separate from the existing background image (`hero_avatar` on the Jekyll sources in `_source/`).

### Changed
- Events — the five remaining legacy event names now follow `nds:<component>:<verb>`, matching multiselect, filter, pagination, and dropmenu. Listeners on the old names stop firing; see Migrating below.
- Document Head — deferred stylesheets ship as `data-nds-defer` preloads that one head script converts to real links. The inline `onload` handlers are gone, so a nonce or hash can grant the head script; the `<noscript>` fallbacks are gone with them. The icon sheets load from `nds-main.min.js` and need no CSP grant, and the `use_hgi_font` config key is removed. A head kept from 1.6.0 still works — the loader falls back to the stylesheet filename and skips any icon sheet the head already added — so re-copying the head is an improvement, not a migration step.
- Prose — `.nds-section-body` no longer styles bare prose. Prose surfaces opt in with `.nds-prose`, and component internals get nothing by default; the list rhythm, sub-list spacing, and `ol` marker cycle move into the prose layer, so `.nds-prose` and the editor match.
- Prose — paragraph flow moves to `--spacing-xl`, headings are restated as multiples of that gap, and running text caps at `--paragraph-max-width`. Tables, code, and demos keep the full column.
- Cards — canonical markup keeps `.nds-card-actions` a sibling of `.nds-card-content`, so a long form scrolls without taking its buttons out of reach. Actions nested inside the content still work; a modal pins them.
- Utilities — `nds-note` is a standalone utility with the four status tints. `nds-required-notice` stays as the legacy alias.
- Utilities — `nds-center-sm`, `-md`, `-lg`, and `-xl` are removed.
- Toolbar — `.nds-bar-text` and `.nds-results-count` read the primary paragraph colour, and a toolbar inside `.nds-sub` takes a tighter default bottom margin.
- Mainnav — the desktop nav container gap widens from `lg` to `4xl`. Mobile stays at `lg`.
- Focus — the reset ring folds into `:where()`, so a component box-shadow overrides it on source order. A focused link gains padding for the outline without shifting the text around it.
- Code — the light-mode syntax property colour moves to blue-700 for stronger contrast on cards, and the prompt lexer colours a full URL as one token.
- Password ships in the delegated bundle. Chips are server-rendered neutral, and init recovers any keystroke typed before the bundle lands.
- Filter — `NDS.Filter.create()` now registers exactly like the loader path: init stamp, backref, target registry, and the ready event.
- Date picker — panel listeners hang off a per-open `AbortController`, and the instance-lifetime ones off the instance controller.

### Fixed
- Icon font — the load budget is measured from the download, not from init, so the HGI icon font no longer times out and leaves every content icon invisible for the life of the page. Under slow-4G the sheet landed well past the old 15s deadline.
- Sort — the original order is snapshotted on first apply, not at init, so items that arrive late can still be restored. Reset no longer re-attaches a deleted row.
- Sort — triggers authored inside a portaled dropmenu resolve through the portal-aware walk, so the trigger icon keeps tracking the active sort.
- Filter — every control inside a portaled menu stays reachable to `refresh()`, the live sort-trigger getter, the count slot, and the accordion count tags.
- Filter — the "All" radio is restored when a chip is cleared and when `setFilterValues()` empties a group. A radio option whose own value holds commas now matches on URL replay.
- Filter — all four `nds:filterForm*` events and the relayed `nds:formValid` / `nds:formInvalid` bubble, so a form-level listener fires.
- Filter — `showNoResultsAlert()` is guarded against a missing filter target, which is the normal shape in form and AJAX modes.
- Filter and Sort — an AJAX swap no longer leaves the sort engine rooted on the replaced container, and the swapped-in container is stamped so it is not held hidden.
- Accordion — a group built after the first pass wires its header, and the toggle index resolves at click time so a late item cannot misdirect earlier buttons.
- Date picker — the hour cycle is pinned, so 00:00 to 00:59 Riyadh no longer reads as a day forward and break "today", the Today button, and the year window.
- Date picker — closing one picker no longer wipes every other picker's conversion memo, and `destroy()` releases the two lifecycle listeners it used to leave behind.
- Tables — row checkboxes are read live, so rows created or deleted at runtime enter the counts and `nds:table:selection` reports them. `selectedIndexes` reports DOM order, as the doc page already stated, and a table that starts empty and gains rows still wires up.
- Export — a sub-row's nested table no longer walks up to the outer paged container and exports zero rows.
- Forms — a required custom select validates through its hidden value carrier, instead of passing whatever it held.
- Forms — `type="number"` inside an NDS field no longer paints the browser's spin buttons.
- Forms — the clear button hands focus back to the field it emptied instead of dropping it to `<body>`.
- Autocomplete — a programmatic `input` dispatch triggers the fetch, and an autocomplete outside a forms-managed container fetches at all.
- Buttons — a cooldown button reserves the widest of its three labels from first paint, so the box no longer resizes under the user's finger.
- Hero — the sub-hero background image no longer creates a stacking context that traps overflowing content, so an open dropmenu paints above the section below.
- Layout — the side-info flex rule is scoped to its own section body, so nested wrappers keep their block layout. Wrapper spacing no longer relies on margin collapsing.
- Table of contents — no entry reads as active until a heading is reached, and the auto-populated list reserves its height so the article does not jump on mobile.
- Scroll more — the scroll end is padded, so the last item's border and focus ring are not clipped. Tab strips opt out.
- Content switcher — the panel drops its inline padding, since the strip is `fit-content` and there is no edge to align to. A panel that is itself a card keeps its own gutter.
- Loader — injected bundles go into the body, not the head. Injection is post-reveal, so a body-tail script is the right slot.
- Tags — a label wider than its card or cell truncates instead of overflowing.
- Modal — actions that consumer markup still nests inside the scrolling content are pinned, so a long form cannot push them out of reach.
- High contrast — the sub-hero image suppression follows the image to its new pseudo-element.

### Migrating from v1.6.0

- Replace all runtime assets: copy `_site/assets/` from the release zip over `NDS_ASSETS/`. Every file carries the new version banner, so overwrite everything rather than cherry-picking the changed bundles.
- Events — five legacy names now carry the `nds:` prefix. Listeners on the old names stop firing. Rename them: `selectChange` → `nds:customselect:change`, `ratingChange` → `nds:rating:change`, `nds-modal-opened` / `nds-modal-closed` → `nds:modal:opened` / `nds:modal:closed`, `nds-digitalStamp-opened` / `nds-digitalStamp-closed` → `nds:digitalStamp:opened` / `nds:digitalStamp:closed`, and `switchChange` → `nds:switchChange`.
- Prose — `.nds-section-body` no longer styles bare `<p>`, `<ul>`, `<ol>`, `<table>`, or `<pre>`. Add `nds-prose` to the wrapper that holds them, or wrap them in `<div class="nds-block nds-prose">`. Component internals are unaffected.
- `.nds-card-form` is removed, along with the `.nds-card > .nds-form` flex override. A `<form class="nds-form">` inside a card stays `display: contents`, so the card's own column reaches `.nds-card-content` directly. Replace `.nds-card-form` with `.nds-card-meta` where you used it as a column wrapper.
- `.nds-center-sm`, `.nds-center-md`, `.nds-center-lg`, and `.nds-center-xl` are removed. Write the media query in your own stylesheet; `.nds-center` is unchanged.
- NDS IQ — the rules are no longer a block pasted into your agent instruction file. Save `NDS-IQ.md` at your project root and replace the pasted block with the anchor. Delete everything from the old block's `## Design system: NDS Vanilla` heading through its `<!-- end NDS instructions -->` marker; the anchor and the full steps are in the file's "Install and upgrade this file" section. The rules require template 1.7.0 or later.

## [1.6.0] - 2026-08-02

### Added
- **Content Switcher** — new component: DGA segmented control built on tabs. See the [Content Switcher doc page](https://mazin-musleh.github.io/NDS-vanilla/components/content-switcher.html).
- **Get Started guide** — hosted adoption workflow with an agent instruction block, replacing the in-zip integration docs. See the [Get Started guide](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html).
- **NDS.request** — a fetch wrapper with a 15s default timeout, a response-size cap, and errors carrying `.status`, `.url`, and a capped `.body`. See the [Request doc page](https://mazin-musleh.github.io/NDS-vanilla/core/request.html).
- Tables — expandable sub-rows.
- Pagination — windowed lazy ellipsis picker, URL sync, and a jump-to-page field.
- Pagination — `data-pagination-no-scroll` opts a nav out of the page-change scroll; `NDS.Pagination.scrollToContent()` runs it manually.
- Tabs — `sm` size rung; `--btn-size` drives the real button height.
- Code — prompt highlighting, markdown highlighting, language tag, roomier action bar, expandable/scrollable blocks, and a `--code-bg` knob for prose blocks.
- Toolbar — `.nds-bar-text` as the canonical class for a bar's text item.
- Tags — `data-status="critical"` alias for `error`.
- Visibility — canonical `sm/md/lg` tokens for `data-hidden`.
- Copy — the flash window is inert to keyboard and mouse.
- Release zip — ships `_source/` (readable JS/SCSS + machine-readable catalogs) alongside the compiled `_site/`.

### Changed
- Assets — files consumed only by the doc site moved into `docs-assets/`; the consumer runtime stays under `assets/`.
- Layout — edge-to-edge chrome and content driven from `body.nds-full-width`, no per-layout modifier.
- Layout — prose list spacing, indent, and markers reworked for a cleaner rhythm.
- Buttons — dark `secondary` keeps its alpha wash by default; solid dark is opt-in.
- Panels — sheet corner radius and tighter mobile header.
- Editor — image popover scroll capped at 70svh.
- Drawer — `sm` size variant removed.
- Toolbar — default bottom gap widened to `4xl`.
- Autocomplete — regex hoisted, DOM writes batched, clicks delegated, items cached.
- Backdrop — default `blur(2px)` fallback removed.
- Code — the syntax highlighter moved off the critical path into the extras bundle.
- Core — `onAttrChange` checks watched attrs before running `matches()`.

### Fixed
- Pagination — paged tables in background tabs initialize when the tab is activated.
- Alert — card alert descriptions read in the primary paragraph color.
- Dropmenu — close and delayed-open state settles during destroy; own-element walks scope to the instance; auto-populated rows opt into search and wire the clear button.
- Editor — component delete, cut, and paste no longer corrupt the document.
- Forms — the actions row's top margin is zero when it leads the form.
- Expandable — the clamp is preserved on unmeasured panels.
- Chips — numeric labels no longer clip mid-glyph.
- Backdrop — stack ownership tracked so nested owners restore correctly on unstack.
- Layout — trailing space dropped from `content-layout` class; empty body class attribute suppressed when unset.
- JS lifecycle — pagination teardown, stepper reinit, and loader diagnostics + debug audits corrected.

### Migrating from v1.5.0

- Replace all runtime assets: copy `_site/assets/` from the release zip over `NDS_ASSETS/`. Every file carries the new version banner, so overwrite everything rather than cherry-picking the changed bundles.

## [1.5.0] - 2026-07-25

### Added
- Panels — new component: a slide-in surface on any side plus top and bottom sheets, with an optional modal backdrop and focus trap. See the [Panels doc page](https://mazin-musleh.github.io/NDS-vanilla/components/panels.html).
- Floating Action Button — new component: FABs that dock themselves by `data-fab-pos`, in a size ladder, grouped clusters, and edge thumbs that ride their panel open. See the [FAB doc page](https://mazin-musleh.github.io/NDS-vanilla/components/fab.html).
- Content placeholder — new utility: a dashed slot marker for a region awaiting a real component. See the [Content placeholder doc page](https://mazin-musleh.github.io/NDS-vanilla/utilities/content-placeholder.html).
- Dropmenu — `data-search` adds a search box that filters items, diacritic-insensitive.
- Dropmenu — `nds-center` centers item labels.
- Dropmenu — component-owned menus carry a `.nds-{component}-menu` class that survives portaling.
- Pagination — `data-per-page-target="<id>"` turns any dropmenu into a per-page picker.
- Pagination — `data-pagination-no-scroll` opts a nav out of the page-change scroll; `NDS.Pagination.scrollToContent()` runs it manually.
- Buttons — `nds-vertical` stacks a button group.
- Tabs — `--tab-panel-padding`, `--tab-panel-padding-inline` and `--tab-panel-padding-block` knobs.
- Forms — `data-state="loading"` on a form container, group or control renders the spinner shell. See the [Forms doc page](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html).
- Alert — toasts ship with a shadow and stroke by default.
- Upload — `--upload-background-dropbox-default`, `--upload-background-dropbox-active` and `--upload-background-file-item` tokens.
- Editor — toolbar menus portal out of a clipping ancestor.
- Tokens — the reference page now covers the app-shell, transition and font-weight tiers.

### Changed
- Tokens — one file per tier (`tokens/_primitives`, `_semantic`, `_components`), each with its dark block colocated. Compiled output is unchanged.
- Tokens — nine spacing dials moved off `:root` onto their components: `--tooltip-padding`, `--tooltip-gap`, `--table-cell-padding-block`, `--table-cell-padding-inline`, `--tab-button-gap`, `--tab-button-padding-block`, `--tab-button-padding-inline`, `--stepper-indicator-gap`, `--stepper-text-padding`. Setting them works as before.
- Accessibility — the panel and FAB are now the shared Panels and FAB components, and the 500 ms open delay is gone.
- Cards — wider header gap, and titles top-pad to sit level with a leading avatar or icon. Modal inherits both.
- Buttons — dark `secondary` reads its own colour family instead of the shared alpha wash, restoring its hover feedback.
- Autocomplete — `setLoading()` uses the shared form loading state.
- Modal — only the card content scrolls; header and actions stay pinned.
- Hero — tighter bottom padding on the flat sub-hero.

### Fixed
- Buttons — the group seam is visible on `secondary` and takes the right colour on outline.
- Dropmenu — percentage widths survive portaling instead of blowing up to viewport width.
- Custom select — options still select once the menu portals.
- Tables — sorting no longer tears apart a table nested in a cell.
- Tabs — loading cards keep the tab skeleton, the divided vertical indicator sits level, and an overflowing centered list stays scroll-reachable.
- Scroll more — horizontal overflow is detected when the wrapper sets `align-items`.
- Hero — the sub-hero's background image no longer paints behind an ancestor.
- Mainnav — the brand no longer stretches across the nav row.
- Featured icons — `oncolor` reaches an inline `<svg>`.
- Editor — loose top-level text gets a paragraph so alignment, direction and headings apply to it; pasted whitespace collapses.
- Form template — the pinned stepper strip sits flush under the nav on mobile.
- Tokens — `--border-neutral-light` is defined in light mode; `--background-surface-elevated` and `-sunken` gain dark rebinds.
- JS lifecycle — listeners release through `AbortController`, fixing dropmenu re-init after `destroy()`, taginput's `create()`/`destroy()` pairing, and date-picker leaving orphan menus behind.
- SEO — `sitemap.xml` emits `lastmod` from each page's `last_edit`.
- Docs — index grids tag unreleased components "Next release"; the FAB and IPV cards are findable by abbreviation.

### Migrating from v1.4.1

- Replace the built bundles (`nds-main.min.*` and the loader-injected `nds-delegated`/`nds-extras`, plus the `nds-accessibility`/`nds-showcase`/theme bundles).
- Accessibility panel — reworked onto the shared Panels and FAB components. Copy the new markup from the [Accessibility doc page](https://mazin-musleh.github.io/NDS-vanilla/components/accessibility.html).

## [1.4.1] - 2026-07-20

### Added
- Editor — image support: insert by URL from a popover (with alt, width, height), click an image to select it for edit-in-place, link wrapping, or removal, plus paste and drag-in uploads through an embedded NDS Upload. `setImageUpload()` configures both modes; the default policy is URL-only, and the `'embed'` upload-URL sentinel opts into base64 embedding behind a 2 MB cap. See the [Editor doc page](https://mazin-musleh.github.io/NDS-vanilla/components/editor.html).
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
- Editor (Beta) — new rich-text component: a standard NDS textarea upgraded into a contenteditable editing surface with a generated, localized toolbar. Pastes from Word, Google Docs, and the web convert to clean NDS markup, and pasted NDS components stay intact while editing. Ships as beta. See the [Editor doc page](https://mazin-musleh.github.io/NDS-vanilla/components/editor.html).
- Tag Input — new component: free-text tags committed as removable chips while typing, posted natively as an array, with optional autocomplete assist/strict modes. See the [Tag Input doc page](https://mazin-musleh.github.io/NDS-vanilla/components/taginput.html).
- Toolbar — new unified controls bar above tables, lists, and grids (search, filter, sort, column visibility, pagination). See the [Toolbar doc page](https://mazin-musleh.github.io/NDS-vanilla/components/toolbar.html).
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
- Hidden — new CSS-only visibility utility: the native `hidden` attribute now wins over any `display` value, and `data-hidden="mobile|tablet|…"` hides an element within exact viewport ranges. See the [Hidden doc page](https://mazin-musleh.github.io/NDS-vanilla/utilities/hidden.html).
- Mainnav — `--nds-brand-width` knob on the brand link.
- Side info — background fill and opt-in `nds-sticky-sm/md` pinning.
- Chips / Tags — `.nds-center` list modifier.
- Featured Icons — `nds-subtle` style (flush glyph, no background or padding).
- Versioning — release-anchored version tracking: `since` / `updated` / `last_edit` doc front matter, an index version filter, and "Added in vX" / "Updated in vX" hero tags.
- Critical CSS — `critical_inline: 'minimal'` mode: a self-releasing one-line body hold.
- Icons — documentation page covering both icon layers, a click-to-copy catalog of every inline UI icon, and the license terms. See the [Icons doc page](https://mazin-musleh.github.io/NDS-vanilla/components/icons.html).
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

### Migrating from v1.3.0

- Multiselect — now a UI layer over a native checkbox group, so the checkboxes *are* the form value. Migrate old markup: add `name="…[]"` to each `<input class="nds-check">`, use `checked` for pre-selection, and remove the hidden CSV carrier inputs (`<input type="hidden" name="…[]">`).
- Flex — `.nds-flex`'s default cross-axis alignment changed from `center` to `stretch`. Containers that relied on the implicit centering now stretch their children; set `--align: center` to restore the previous look.
- Hidden — `.hidden`, `.nds-desktop-only` and `.nds-mobile-only` are removed. Replace them with `data-hidden="mobile"` / `data-hidden="tablet"` / `data-hidden="desktop"`, or the native `hidden` attribute for an always-hidden element. See the [Hidden doc page](https://mazin-musleh.github.io/NDS-vanilla/utilities/hidden.html).
- Topbar, Mainnav, Search and Toolbar — breakpoint hiding moved out of the stylesheets and onto `data-hidden` stamps in the markup. The old rules are deleted, so copied chrome markup keeps every widget visible at every width until you re-copy it. Take the current markup from the [Topbar](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/topbar.html) and [Main Navigation](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html) doc pages, or add the stamps yourself.

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
- Token overrides — only consumers who **override or reference NDS token custom properties** in their own CSS are affected; classes and component rendering are otherwise unchanged. See the [Token Migration Reference](https://github.com/mazin-musleh/NDS-vanilla/blob/main/TOKEN-MIGRATION.md) for the full old→new name map.
- Hero — copied hero markup with inline structural styles still works but those styles are now redundant (CSS owns them); a slide that doesn't stamp `--overlay` now renders at `0.7` (was `0.20`) — stamp an explicit value to pin it.
- Head — v1.2.0 pages shipped an inline critical-gate `<style>` + async-loaded critical `<link>` (preload/`onload` swap + `<noscript>`). A copied `<head>` still works, but the inline snapshot can drift from the 1.3.0 crit file; the canonical, drift-proof setup is a single render-blocking `<link rel="stylesheet" href="assets/css/nds.critical.min.css">` (first paint stays theme/dark-correct). Redundant but harmless if left. **Superseded in 1.7.0** — every sheet now ships as a `data-nds-defer` preload that one head script converts to a real link; copy the current head from the [Document Head doc page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) rather than following this note.

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

[Unreleased]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.9.0...HEAD
[1.9.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.7.2...v1.8.0
[1.7.2]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.4.1...v1.5.0
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
