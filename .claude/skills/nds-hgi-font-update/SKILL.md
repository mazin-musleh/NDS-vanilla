---
name: nds-hgi-font-update
description: Update the local HGI stroke-rounded icon font and CSS from the HugeIcons CDN. Downloads the latest font file and rebuilds the icon class SCSS. Use when the CDN publishes new icons or fixes glyphs.
argument-hint: "(no arguments)"
---

# Update HGI Icon Font from CDN

## Context

The HGI icon font is served locally (not from the CDN) to avoid CORS issues. It is used **only in content markup** via `<i class="hgi hgi-stroke hgi-*">`. Component and chrome icons use the inline `mask-image` tier (`nds-icon nds-hgi-*`) and are unaffected.

**Source:** `https://use.hugeicons.com/font/icons.css`, the icon font hugeicons.com documents. The older `cdn.hugeicons.com/font/hgi-stroke-rounded.css` froze on 2024-07-24; never go back to it. The docs (`components/icons.md`) send readers to hugeicons.com to pick icons, so the font must match that site, redrawn icons included.

### Files touched

| File | Role |
|------|------|
| `_sass/_hgiRoundedStroke.scss` | gate reveal + `.hgi-stroke` base + every `.hgi-stroke.hgi-*` rule + the deprecated-name alias block. NO `@font-face`: that lives in `_sass/_fonts.scss` (crit) |
| `assets/fonts/hgi-stroke-rounded.woff2` | the font file |
| `scripts/hgi-font-update.py` | does the work; holds the `ALIASES` map |
| `_data/hgi.yml` | the version the docs state (CDN build date, icon count). The font itself only says "Version 1.0"; the build stamp is the real version |

## Step 1: Compare

```bash
python scripts/hgi-font-update.py
```

Reports local vs CDN counts, added names, removed names, and any removed name with no alias. Nothing changed: report "already up to date" and stop.

## Step 2: Handle removed names

A name removed upstream breaks existing markup. For each one the script flags `NO ALIAS`:

1. Find its new name (HugeIcons renames rather than deletes; the 2026-09 set spelled digits out: `layout-3-column` → `layout-three-column`).
2. **Confirm by the glyph, not the name:** render the old and new glyphs side by side with fontTools + PIL and look.
3. Add it to `ALIASES` in the script and to the HGI row in `DEPRECATIONS.md`.

## Step 3: Apply

```bash
python scripts/hgi-font-update.py --apply
```

It rewrites the SCSS (keeping our header and family name `hgi-stroke-rounded`, since the loader and `_fonts.scss` key on it) and replaces the woff2. It refuses while any removed name lacks an alias.

## Step 4: Verify

- `grep -rn "hgi-stroke hgi-<removed-name>"` over the repo; move this repo's own markup to the new names.
- `bundle exec jekyll build`, then look at a page of content icons.
- **The font's size moves the icon reveal:** measure an icon page before and after with `nds-perf` (`measure-lcp.mjs` prints `icons` per run). The 2026-09-23 update, 659 KB → 965 KB, moved icons from ~6.5 s to ~8.0 s on slow-4G with no change to LCP.
- `components/icons.md` states the build and icon count from `_data/hgi.yml`, so it updates itself. The SCSS header line carries the same stamp.
