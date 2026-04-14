---
name: add-nds-icon
description: Add an HGI icon, a raw SVG, or a Figma icon to the inline UI-icon set so it renders as mask-image via `.nds-icon.nds-hgi-{name}`. Use when components or chrome need a new icon that must paint immediately (no font wait, no FOUT). Triggers on "add HGI icon", "inline this SVG as an icon", and "add icon from Figma". Content/demo pages should keep using `<i class="hgi hgi-stroke hgi-NAME">` — the local HGI font handles those automatically.
argument-hint: "<icon-name> [--from-figma <figma-url>] [--from-svg]"
---

# Add UI Icon

Appends one `--nds-icon-{name}` token and one `.nds-hgi-{name}` alias to `_sass/_icons.scss`. The SCSS file is the source of truth and hand-editable; this skill only appends.

## Naming convention for style/type variants

HGI icons come in multiple styles (Stroke, Solid, Bulk, Twotone, Duotone) × types (Rounded, Sharp, Standard). Register each variant under its own kebab name: `{base}-{style}-{type}`. Omit segments that are the default (`stroke`, `rounded`).

Examples for the `user` base:

```
user                           → Stroke + Rounded  (the default — no suffix)
user-sharp                     → Stroke + Sharp
user-standard                  → Stroke + Standard
user-solid                     → Solid + Rounded
user-solid-sharp               → Solid + Sharp
user-bulk                      → Bulk + Rounded
user-twotone                   → Twotone + Rounded
user-duotone                   → Duotone + Rounded
```

Each variant becomes its own token/alias — don't try to combine styles via modifier classes.

Source per variant is independent of the name. Any variant (including the default Stroke+Rounded) can come from npm (Source A), Figma (Source C), or raw SVG (Source B). The npm free package happens to ship only Stroke+Rounded, so other variants most often come from Figma — but that's a supply constraint, not a naming rule.

## Custom (non-HGI) icons — use a different class

For brand marks, logos, or bespoke glyphs that aren't HGI icons, pass `--class` to override the default `.nds-hgi-{name}` alias. The token stays `--nds-icon-{name}` (project-wide convention), only the selector changes.

```bash
node scripts/add-icon.mjs brand-sdaia --class nds-brand-sdaia --stdin < file.svg
# → --nds-icon-brand-sdaia: url(...);
# → .nds-brand-sdaia { --nds-icon: var(--nds-icon-brand-sdaia); }
```

Usage:
```html
<i class="nds-icon nds-brand-sdaia" aria-hidden="true"></i>
```

Suggested name prefixes: `brand-*`, `logo-*`, `illus-*`. Pick something that signals "not an HGI icon" so it doesn't get confused with the stroke/solid/bulk variants above.

## Routing: pick the source of the SVG

### Source A — HGI icon name (most common)

User says e.g. `/add-nds-icon star-circle` or "add the HGI flame icon". The name is kebab-case as shown on hugeicons.com.

```bash
node scripts/add-icon.mjs <name>
```

This pulls the path data from `@hugeicons/core-free-icons` and appends. On failure (missing name), the script exits with `missing icon in @hugeicons/core-free-icons: …`. Suggest the user pick a different name, paste the SVG directly (Source B), or extract from Figma (Source C).

### Source B — raw SVG the user pasted

User pastes `<svg>…</svg>` markup into the chat and asks to turn it into a UI icon. Write the markup to a temp file and pipe via stdin:

```bash
node scripts/add-icon.mjs <name> --stdin < /tmp/<name>.svg
```

The name is chosen by the user (or suggested by you in kebab-case).

### Source C — Figma link or current Figma selection

User provides a Figma URL like `https://www.figma.com/design/…?node-id=3509-301549`, or says "import the selected Figma node" (no nodeId — MCP uses the active selection).

1. **`mcp__figma__get_metadata` first.** This reveals whether the selected node is a component instance with variants. The returned `name` (e.g. `Style=Bulk, Type=Rounded`) tells you exactly which variant the user picked. Skipping this step leads to importing the component's *default* variant instead of the selected one — a real failure mode.
2. `mcp__figma__get_design_context` with the same nodeId — returns the SVG asset URL(s). If the component has multiple variants, the code it returns will branch between several `imgElements*` constants. Match the SVG URL to the variant name from step 1 (e.g. `Style=Bulk` → the branch guarded by `isBulkAndRounded`).
3. `mcp__figma__get_screenshot` to visually confirm the right glyph.
4. `curl -s <svg-url>` to fetch the raw SVG from the Figma MCP's localhost asset server.
5. Pipe through `sed` to replace `var(--fill-0, #XXXXXX)` and `var(--stroke-0, #XXXXXX)` with `currentColor` so the glyph inherits text color through the mask.
6. Pipe the result into `node scripts/add-icon.mjs <name> --stdin`.

One-liner template:
```bash
curl -s <svg-url> | sed "s|var(--fill-0, #[0-9A-Fa-f]*)|currentColor|g; s|var(--stroke-0, #[0-9A-Fa-f]*)|currentColor|g" | node scripts/add-icon.mjs <name> --stdin
```

If the Figma node is a frame with multiple children (background rects, labels, etc.), extract only the icon glyph before piping.

## After any source

1. The script prints `added: {name}` (or `already present, skipped: {name}`).
2. Tell the user to use it in markup / `_js` / YAML:
   ```html
   <i class="nds-icon nds-hgi-{name}" aria-hidden="true"></i>
   ```
3. Mention the `--nds-icon-{name}` token for component-scoped overrides.
4. Remind them to hard-reload the browser (or restart `jekyll serve` if SCSS caching is stale).

## Do NOT

- Edit `_sass/_icons.scss` by hand for net-new icons — use the script so the data URI encoding is correct.
- Add a content-only icon — content icons render via the local HGI font, no registration needed.
- Register mirrored/rotated variants as new tokens. Add them as plain SCSS at the bottom of `_icons.scss` next to the existing `arrow-right-01` / `arrow-up-01` / etc. (reuse another token + `transform`).
