=== NDS ===
Contributors: nds
Requires at least: 6.6
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 0.1.0
License: MIT
License URI: https://opensource.org/licenses/MIT
Tags: block-patterns, block-styles, full-site-editing, rtl-language-support, translation-ready

WordPress block theme port of the National Design System (NDS), the design
system behind Saudi Arabia's digital government. Built from the vanilla
HTML/CSS/JS reference implementation (NDS-vanilla).

== Description ==

NDS is a block-based WordPress theme that ships the DGA design system as a
theme: the full design-token palette in theme.json, RTL-first typography
(IBM Plex Sans Arabic), block styles and patterns for the NDS component
language, and a performance discipline where a page loads only the assets
its blocks use.

Default visual identity (palette, logos, digital stamp) is exclusive to
Saudi Arabia government entities. Non-government use must replace the
identity before deploying (see the source repository's disclaimer).

== Installation ==

1. Upload the `nds-theme` folder to `/wp-content/themes/`, or install the
   zip via Appearance > Themes > Add New.
2. Activate the theme.
3. Go to Appearance > Editor to compose templates and patterns.

== Requirements ==

* WordPress 6.6 or later.
* PHP 7.4 or later.

== Changelog ==

= 0.1.0 =
* Phase 0 scaffold: theme.json (DGA palette, fluid type, spacing, layout),
  block templates, template parts, starter patterns, dark style variation,
  theme chrome JS (dark-mode toggle) and critical CSS shell.
* Phase 1 interactive chrome:
  - Topbar widgets: Hijri/Gregorian date + real-time clock (Intl-based).
  - DGA digital-stamp panel toggle.
  - Cookie consent popup (accept / reject non-essential), persisted.
  - Accessibility panel (font scale, dyslexia font, high contrast,
    text spacing), persisted, with OpenDyslexic faces.
  - User feedback (thumbs up/down) via admin-ajax with nonce + post-meta
    tally.
  - Custom blocks with block hooks: nds/cookie-popup, nds/accessibility,
    nds/user-feedback.
* Phase 2 custom blocks (build-free, plain wp.* globals):
  - nds/hero-slider: dynamic full-width slider (slides array, overlay,
    LCP-first-image handling, lazy data-src, prev/next + pagination,
    keyboard nav).
  - nds/swiper: InnerBlocks-based card carousel (slides-per-view per
    breakpoint, peek, arrows, pagination).
  - nds/tabs + nds/tab: ARIA tabs with keyboard roving.
  - nds/modal: trigger + focus-trapped dialog.
  - nds/component-gallery: searchable, paginated directory of a post type
    (server-rendered page 1, client-side search).
  - front-page.html now composes hero-slider + gallery + patterns.
  - Phase 2 CSS for all new blocks (incl. responsive grid + editor
    placeholders).
* Phase 3 content & data:
  - scripts/export-data.py: exports the Jekyll _data/content collections
    into assets/data/nds-import.json (141 items: components, templates,
    examples, services, FAQs, events).
  - inc/cli.php: `wp nds import <file.json>` WP-CLI command (idempotent,
    --dry-run / --update flags, category/tag/meta mapping).
  - Added CPTs: nds_template, nds_example, nds_faq, nds_event.
  - inc/redirects.php: 301 redirects for legacy .html URLs.
* Phase 4 approval workflow:
  - nds-pending-review post status; publish gate for non-privileged authors.
  - NDS Admin menu: Approval Center (approve/reject + preview) and Audit Log.
  - admin-post approve/reject handlers with nonces + capability checks;
    every transition written to the nds_audit_log post type.
