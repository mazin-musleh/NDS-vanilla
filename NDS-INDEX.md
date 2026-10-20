# NDS index

The NDS IQ rules name no files. This index maps each need to this release's files. Paths are relative to `NDS_ROOT`: `_source/` holds the doc and code sources, and `_site/` is the built site.

## Install

- **Version:** the opening comment of `_site/assets/js/nds-main.min.js` and `_site/assets/css/nds-main.min.css` reads `Version:`.
- **Runtime:** copy `_site/assets/` into `NDS_ASSETS` whole, every subfolder included. Never copy `_site/docs-assets/`: it serves the docs site. The one exception is an event skin the dev wants, with its script.
- **Images:** a template's photos are in `_site/docs-assets/`, which serves the docs site, so they are not in `NDS_ASSETS`. A hero the project has no image for keeps the hero canon's `img/riyadhcenter_IQ.webp` and its `_md` and `_sm` sizes, which ship in `NDS_ASSETS`. Any other photo slot the project has no image for takes `img/placeholder.svg` from `NDS_ASSETS`, with a plan checkbox for the dev's photo. A signed-in person's avatar with no photo takes initials, never the placeholder: the avatar icon marks the guest. A project with no logo keeps the Main Navigation and Footer canons' `img/palm_swords.svg`, with the project's name in `.nds-brand-name` and a plan checkbox for the dev's logo. Never use the photo placeholder as a logo, and never draw one.
- **Sources:** from this release tag's source zip, copy these into `_source/`: the folders `_js`, `_sass`, `foundations`, `components`, `utilities`, `layout`, `ui-shell`, `core`, `guides`, `templates`, `examples`, `_data/content`, and the file `_data/catalog.yml`.
- **Release notes:** `CHANGELOG.md`.

## Read a doc page

Foundation, component, layout, shell, utility and core docs live in `_source/<folder>/<name>.md`. Each page has the same sections: Overview, Markup, Variants, Behavior, Built-in Features, Best Practices, API, Related.

- **Canon:** each `<script type="text/html" data-canon>` block. Copy the block's body. The `<script>` tag around it is doc packaging and never ships. A block with `data-lang="js"` or `data-lang="css"` holds code for a real script or stylesheet.
- **Escaped canon:** a block with `data-escaped` holds Liquid output. Copy its code from the capture block just above it.
- **Options:** the Variants table (Group, Option, Markup, On element, Use). Add an option's Markup on the element it names. The table is hidden on the site and visible in the `.md`.
- **Live demos:** the demo card and the builder preview on a doc page.
- **JS API:** the banner at the top of each JS file the doc names under `_source/_js/`: Rides, Methods, Events, Hooks, Gotchas. Most components load after the page shows: until then a call loads the component and returns a Promise of its result, so `await` a call whose result you use.
- **Whole pages:** `_source/examples/*.md` and `_source/templates/*.md` hold a page's content as plain HTML. Their front matter builds the rest: the Front Matter table in `_source/layout/page-layout.md` maps each key to its markup, and the hero's keys are in `_source/ui-shell/hero.md`. A Liquid loop repeats one block: its body is the markup, and its fields take the project's content.

## Need → file

| Need | Read |
|---|---|
| Which component, example, or template fits | `use_when` in `_source/_data/catalog.yml`: every library page, template, example and event pack. Each entry's `url` names its folder, and the folder is its shelf (the file's header gives the rule). |
| The head, CSP | `_source/ui-shell/head.md`: Usage, Parts, and the API's Content Security Policy and Inline Knobs sections |
| Page shapes, layout classes, framework apps | `_source/layout/page-layout.md`: the Overview table, Best Practices, and the API's Front Matter section |
| Sections and spacing | `_source/layout/section.md`, `_source/layout/grid.md`, `_source/layout/flex.md`, `_source/layout/block.md` |
| Chrome parts | the pages in `_source/ui-shell/` |
| Forms and validation | `_source/components/form.md` |
| Tokens, knobs, dark mode | `_source/foundations/tokens.md` (Override Scope), `_source/_sass/tokens/_semantic.scss`, `_source/_sass/tokens/_components.scss`, the palette in `_source/_sass/themes/_dga.scss`. A component's knobs: its doc's API, CSS Custom Properties. |
| Icons (the icon catalog) | `_source/foundations/icons.md`. The inline names: `_source/_data/content/icons.yml`. Font icon names have no list: the audit names one the font lacks |
| Page code that waits for components at load, content that changes after load, framework views | `_source/core/init.md` |
| Requests, dates, text and languages | `_source/core/request.md`, `_source/core/date.md`, `_source/core/i18n.md`, and the banners of `_source/_js/nds-core.js` and `_source/_js/nds-date.js` |
| Renamed and removed names | `_source/_data/migrations.yml`: one row per name, with its fix. `_source/guides/migration.md` explains the columns |

## Page shapes

- **Head:** the canon in `_source/ui-shell/head.md`. Its asset URLs end in `?ver=` and the Liquid value `site.asset_ver`: write the runtime's `Version:` there, such as `?ver=2.0.0`, so an upgrade fetches the new files.
- **Body:** each shape is a canon in `_source/layout/page-layout.md`: standard page, home, article, minimal, console, side menu, side info. The comments in a shape's header and footer name where those parts come from.
- The Overview table there names the chrome of each shape (`full`, `minimal`, `console`) and a live page that uses it.

## View the built site

Each doc, example and template has a built page at the same path under `_site/`, such as `_site/components/card.html`: the visual reference for a page you build. Serve `_site/` with a static HTTP server and open its pages by URL.

## Verify

`nds-verify.mjs`, at this folder's root, runs both browser passes on your pages: `node nds-verify.mjs <config.json>`. Its header gives the config: each page, its built reference page, and each state with its setup (a URL, cookies, a request made to fail, a script to run). It needs Node 18 or later and Chrome or Edge, and installs nothing. For each state, at desktop and mobile width, in light and dark, it checks `window.innerWidth`, runs the audit, collects console errors, and writes a sheet that shows the state under the reference, which takes the state's language and direction, so an Arabic page compares with a right-to-left reference. It exits 1 on any finding. After a fix, re-check only the pages it touched with `--only`. You still inspect every sheet and exercise the behavior. If it cannot run (no Node 18, no Chrome or Edge), run both passes as the rules' Verify section says.

## Audit

- `NDS.Init.audit()`, in the browser console of a loaded page, runs every check and prints each finding with its fix. `NDS.Audit.run({ group: 'migration' })` runs one group.
- `window.NDSInitConfig = { enableLogging: true }`, set before the NDS scripts, runs the audit after load.
- The checks and what they cannot see: `_source/core/audit.md`, the API's Rules section and the Behavior's Limits section.

## Upgrade

- **Migration notes:** the `### Migrating from` sections in `CHANGELOG.md`.
- **Migration check:** the audit's `migration` group, `NDS.Audit.run({ group: 'migration' })`.

## Legacy libraries

Examples, not a complete list: any other UI library is legacy too. Find its replacement by its job in the catalog's `use_when` lines.

| Legacy | NDS |
|---|---|
| Select2 | Custom Select, Autocomplete, Multiselect |
| Summernote, TinyMCE, CKEditor, Quill | Editor |
| jTable, DataTables | Tables, with Sort, Filter, Pagination, Export |
| Font Awesome | Icons (HGI) |
| Bootstrap | the layout primitives: Grid, Flex, Block |
| jQuery | vanilla JS and the NDS APIs |
