---
name: nds-event-packs
description: Use when changing or building an event theme pack (seasonal skin such as Hajj) - its JS in _js/events/, SCSS in _sass/themes/events/, images in docs-assets/events/, mkevent.py, the pack zip, or registering a pack in themes.yml, catalog.yml and sidemenu.yml.
---

## Event Theme Packs

A seasonal skin applied by one `<script>` tag. Source is split three ways: the pack
JS in `_js/events/`, its SCSS in `_sass/themes/events/`, and the images plus built
output in `docs-assets/events/<folder>/` (whose `.min.scss` is the Jekyll build
entry). Registered in `_data/themes.yml` (drives the topbar switcher),
`_data/catalog.yml` and `_data/sidemenu/sidemenu.yml`.

**Rebuild the pack after changing its JS, SCSS or images** — `bundle exec jekyll build`,
then `python scripts/mkevent.py <event>`, then build again to publish. `mkevent.py` owns the
pack end to end: it minifies the JS, inlines the compiled CSS, and writes the zip.
`js_processor.rb` skips `_js/events/` on purpose (building packs there blanked their inlined
CSS). Nothing else rebuilds a pack, so it goes stale silently. It verifies what actually breaks a pack:
every CSS `url()` and JS asset default resolves, and each file's magic bytes match
its extension (this caught a PNG named `.svg` and another named `.jpg`).

**The pack runs synchronously in `<head>` on purpose.** It injects the hero slide
during parse, so the slide is in the first paint. Do not defer it into a bundle:
`nds-main.min.js` gates the reveal and the delegated/extras bundles load *after*
it, so a late-injected slide swaps in visibly.
