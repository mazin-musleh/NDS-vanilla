---
name: update-icon-font
description: Update the local HGI stroke-rounded icon font and CSS from the HugeIcons CDN. Downloads the latest font file, rebuilds the icon class SCSS, and remaps any changed unicode content values in component SCSS files. Use when icons break or display wrong glyphs after a CDN update.
argument-hint: "[optional: CDN URL override]"
---

# Update HGI Icon Font from CDN

## CDN Source

Default: `https://cdn.hugeicons.com/font/hgi-stroke-rounded.css`
Override with `$ARGUMENTS` if a different URL is provided.

## Step 1: Fetch CDN CSS

```bash
curl -sL "https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" -o <TEMP>/hgi-cdn.css
```

Format the minified CSS into separate lines (one rule per line):

```bash
sed 's/}\./}\n./g' <TEMP>/hgi-cdn.css > <TEMP>/hgi-formatted.css
```

## Step 2: Build Old-to-New Unicode Mapping

Before replacing the SCSS, build a mapping of icon names to their OLD content values from the current file:

```
git show HEAD:_sass/_hgiRoundedStroke.scss
```

Parse both old and new CSS to create: `icon-name -> old-unicode -> new-unicode`

## Step 3: Replace `_sass/_hgiRoundedStroke.scss`

Generate the new file using Ruby (available in this Jekyll project):

```ruby
# Parse CDN CSS for icon rules
matches = cdn_content.scan(/(\.hgi-stroke\.hgi-[a-z0-9-]+:before)\{content:"([^"]+)"\}/)
```

**IMPORTANT**: Keep the custom local `@font-face` and `.hgi-stroke` base styles — do NOT use the CDN's `@font-face` (it references CDN URLs). The local header must be:

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

Extract the woff2 URL from the CDN CSS `@font-face` declaration. It's typically a relative URL like `hgi-stroke-rounded.woff2?t=TIMESTAMP`. Download from:

```
https://cdn.hugeicons.com/font/hgi-stroke-rounded.woff2?t=<TIMESTAMP>
```

Replace `assets/fonts/hgi-stroke-rounded.woff2`.

## Step 5: Find and Remap Hardcoded Unicode Content Values

Some component SCSS files use hardcoded `content: "..."` with icon font unicode characters in `::before`/`::after` pseudo-elements. These need remapping when unicode values change.

### 5a: Find all affected files dynamically

Search for any SCSS file (excluding `_hgiRounded*`) that references `hgi-stroke-rounded` font-family:

```bash
grep -rn 'font-family.*hgi-stroke-rounded' _sass/ --include="*.scss" | grep -v "_hgiRounded"
```

Then for each file found, extract the hardcoded `content` values nearby:

```bash
grep -rn 'content:.*"[^\s]"' _sass/ --include="*.scss" | grep -v "_hgiRounded"
```

This catches ALL files with hardcoded icon unicode — no hardcoded list needed.

### 5b: Remap each value

For each hardcoded `content: "X"` found:

1. Look up `X` in the OLD `_hgiRoundedStroke.scss` (from `git show HEAD:_sass/_hgiRoundedStroke.scss`) to find which icon name it maps to
2. Look up that icon name in the NEW `_hgiRoundedStroke.scss` to get the new unicode value
3. If old value equals new value, skip it (no change needed)
4. If old value is not found in the old SCSS, it may already be correct for the new font — verify by checking if it exists in the new SCSS

### 5c: Verify no old values remain

After all replacements, confirm no stale values exist:

```ruby
# Collect all old unicode values that changed, then search component files
old_values.each do |char|
  # Search all SCSS except _hgiRounded* files
  # Any match = missed replacement
end
```

## Step 6: Verify

- Run `bundle exec jekyll serve`
- Check key components visually: buttons (dropdown arrows), breadcrumb (separators), checkbox (checkmark), stepper (completed), feedback icons (status icons), forms (select arrows, password eye)
- Confirm no FOUT (Chinese characters flash) — `nds-fontLoading.js` handles this via `opacity: 0` until font loads
