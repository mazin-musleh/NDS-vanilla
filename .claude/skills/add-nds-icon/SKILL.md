---
name: add-nds-icon
description: Add one or more HGI icons to the inline UI-icon set so they render as mask-image via `.nds-icon.nds-hgi-{name}`. Use when components or chrome need a new icon that must paint immediately (no font wait, no FOUT). Content/demo pages should keep using `<i class="hgi hgi-stroke hgi-NAME">` — the local HGI font handles those automatically.
argument-hint: "<icon-name> [<icon-name> ...]"
---

# Add UI Icon

Adds each HGI icon name to `UI_ICONS` in `scripts/generate-icons-scss.mjs`, regenerates `_sass/_icons.scss`, and verifies the icons exist in `@hugeicons/core-free-icons`.

## Inputs

`$ARGUMENTS` is a whitespace-separated list of kebab-case HGI icon names (as shown on hugeicons.com — for example `star-circle`, `award-03`, `flame`). One or more. No prefix.

If `$ARGUMENTS` is empty, ask the user which icon name(s) they want.

## Step 1: Validate each name against the npm package

For each name, check that `node_modules/@hugeicons/core-free-icons/dist/esm/{PascalCase}Icon.js` exists. The conversion is kebab-to-Pascal per word (e.g. `star-circle` → `StarCircleIcon`).

If a name is missing, report it and skip it. Do not proceed to Step 2 for that name.

Example check (Node one-liner):

```bash
node -e "
const fs=require('fs'),path=require('path');
const names=process.argv.slice(1);
const dir='node_modules/@hugeicons/core-free-icons/dist/esm';
const toPascal=n=>n.split('-').map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join('')+'Icon';
for(const n of names){
  const f=path.join(dir,toPascal(n)+'.js');
  console.log(n,fs.existsSync(f)?'OK':'MISSING');
}
" <icon-name> <icon-name> ...
```

## Step 2: Insert into `UI_ICONS`

Edit `scripts/generate-icons-scss.mjs`. The `UI_ICONS` array is grouped by section (pseudo-element, chrome, data-driven, JS-injected, sort). New icons go in a **"manually added"** section at the end of the array, sorted alphabetically within that section.

If the section does not yet exist, add it:

```js
  // manually added
  'flame', 'star-circle',
```

Never add an icon that is already present (deduplicate by checking the array first).

## Step 3: Regenerate the SCSS

```bash
node scripts/generate-icons-scss.mjs
```

Expected output: `wrote .../_sass/_icons.scss (XX KB, N UI icons)` where N has grown by the number of new icons.

## Step 4: Report usage

For each successfully added icon, print the usage snippet:

```
<i class="nds-icon nds-hgi-{name}" aria-hidden="true"></i>
```

And the `--nds-icon-{name}` token name for anyone wanting a component-scoped override.

## Step 5: Suggest rebuild

Remind the user to hard-reload the browser (or restart `jekyll serve` if incremental caching is stale).

## Failure modes

- **Missing from free package**: suggest the user either pick a different name from hugeicons.com or — if the icon is content-only — use `<i class="hgi hgi-stroke hgi-{name}">` in markup (the local HGI font covers the full library).
- **Already in `UI_ICONS`**: report as "already present, skipped" and still print the usage snippet.
- **`@hugeicons/core-free-icons` not installed**: run `npm install` first (it is in `devDependencies`).

## Do NOT

- Create SVG files in `assets/icon/hgi/` — the generator reads from npm directly; there is no on-disk SVG folder.
- Edit `_sass/_icons.scss` by hand — it is auto-generated.
- Add a content-only icon to `UI_ICONS` — content icons render via the HGI font, no registration needed.
