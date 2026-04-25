---
name: nds-hgi-font-update
description: Update the local HGI stroke-rounded icon font and CSS from the HugeIcons CDN. Downloads the latest font file and rebuilds the icon class SCSS. Use when the CDN publishes new icons or fixes glyphs.
argument-hint: "[optional: CDN URL override]"
---

# Update HGI Icon Font from CDN

## Context

The HGI icon font is served locally (not from CDN) to avoid CORS issues.
It is used **only in content markup** via `<i class="hgi hgi-stroke hgi-*">` — component/chrome icons use the inline `mask-image` tier (`nds-icon nds-hgi-*`) and are unaffected by this skill.

### Files touched

| File | Role |
|------|------|
| `_sass/_hgiRoundedStroke.scss` | `@font-face` + all `.hgi-stroke.hgi-*` icon rules |
| `assets/css/hgi-rounded-stroke-min.scss` | Jekyll wrapper (unchanged) |
| `assets/fonts/hgi-stroke-rounded.woff2` | Binary font file |

## CDN Source

Default: `https://cdn.hugeicons.com/font/hgi-stroke-rounded.css`
Override with `$ARGUMENTS` if a different URL is provided.

## Step 1: Fetch CDN CSS

```bash
curl -sL "<CDN_URL>" -o <TEMP>/hgi-cdn.css
```

## Step 2: Compare Old vs New

Parse the current local `_sass/_hgiRoundedStroke.scss` and the fetched CDN CSS to build two maps: `icon-name → unicode`. Report:

- Total icons (old / new)
- Changed unicode values
- Added icons
- Removed icons

If **nothing changed**, stop here and report "already up to date".

## Step 3: Rebuild `_sass/_hgiRoundedStroke.scss`

Parse icon rules from CDN CSS:

```ruby
matches = cdn_content.scan(/(\.hgi-stroke\.hgi-[a-z0-9-]+:before)\{content:"([^"]+)"\}/)
```

**IMPORTANT**: Keep the local `@font-face` and `.hgi-stroke` base styles — do NOT use the CDN's `@font-face` (it points to CDN URLs). The local header must be:

```scss
@font-face {
  font-family: "hgi-stroke-rounded";
  font-display: swap;
  src: url("../fonts/hgi-stroke-rounded.woff2") format("woff2");
}
.hgi-stroke {
  font-family: "hgi-stroke-rounded" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  display: inline-block;
  font-variant: normal;
  line-height: 1;
  text-rendering: auto;
}
```

Then append all icon rules in formatted style:

```scss
.hgi-stroke.hgi-icon-name:before {
  content: "X";
}
```

## Step 4: Download New Font File

Extract the woff2 URL from the CDN CSS `@font-face` block (typically `hgi-stroke-rounded.woff2?t=TIMESTAMP`). Download from:

```
https://cdn.hugeicons.com/font/hgi-stroke-rounded.woff2?t=<TIMESTAMP>
```

Replace `assets/fonts/hgi-stroke-rounded.woff2`.

## Step 5: Verify

- `bundle exec jekyll serve` — builds without errors
- Content pages with `<i class="hgi hgi-stroke hgi-*">` render icons correctly
- No FOUT (icons hidden briefly then appear) — `nds-fontLoading.js` handles this
