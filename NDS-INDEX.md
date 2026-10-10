# NDS index

The NDS IQ rules name no files. This index maps each need to this release's files. Paths are relative to `NDS_ROOT`: `_source/` holds the doc and code sources, and `_site/` is the built site.

## Install

- **Version:** the opening comment of `_site/assets/js/nds-main.min.js` and `_site/assets/css/nds-main.min.css` reads `Version:`.
- **Runtime:** copy `_site/assets/` into `NDS_ASSETS` whole, every subfolder included. Never copy `_site/docs-assets/`: it serves the docs site. The one exception is an event skin the dev wants, with its script.
- **Images:** a template's photos are in `docs-assets/`, so they do not ship. A photo slot the project has no image for takes `img/placeholder.svg` from `NDS_ASSETS`, with a plan checkbox for the dev's photo.
- **Sources:** from this release tag's source zip, copy these folders into `_source/`: `_js`, `_sass`, `components`, `utilities`, `layout`, `ui-shell`, `core`, `templates`, `examples`, `_data/content`.
- **Release notes:** `CHANGELOG.md`.

## Read a doc page

Component, layout, shell, utility and core docs live in `_source/<folder>/<name>.md`. Each page has the same sections: Overview, Markup, Variants, Behavior, Built-in Features, Best Practices, API, Related.

- **Canon:** each `<script type="text/html" data-canon>` block. Copy the block's body. The `<script>` tag around it is doc packaging and never ships. A block with `data-lang="js"` or `data-lang="css"` holds code for a real script or stylesheet.
- **Escaped canon:** a block with `data-escaped` holds Liquid output. Copy its code from the capture block just above it.
- **Options:** the Variants table (Group, Option, Markup, On element, Use). Add an option's Markup on the element it names. The table is hidden on the site and visible in the `.md`.
- **Live demos:** the demo card and the builder preview on a doc page.
- **JS API:** the banner at the top of each JS file the doc names under `_source/_js/`: Rides, Methods, Events, Hooks, Gotchas. Most components load after the page shows: until then a call loads the component and returns a Promise of its result, so `await` a call whose result you use.
- **Whole pages:** `_source/examples/*.md` and `_source/templates/*.md` hold a page's content as plain HTML. Their front matter builds the rest: the Front Matter table in `_source/layout/page-layout.md` maps each key to its markup, and the hero's keys are in `_source/ui-shell/hero.md`. A Liquid loop repeats one block: its body is the markup, and its fields take the project's content.

## Need → file

| Need | Read |
|---|---|
| Which component, example, or template fits | `use_when` in `_source/_data/content/components.yml`, `_source/_data/content/examples.yml`, `_source/_data/content/templates.yml`. Each entry's `url` names its folder. |
| The head, CSP | `_source/ui-shell/head.md`: Usage, Parts, and the API's Content Security Policy and Inline Knobs sections |
| Page shapes, layout classes, framework apps | `_source/layout/page-layout.md`: the Overview table, Best Practices, and the API's Front Matter section |
| Sections and spacing | `_source/layout/section.md`, `_source/layout/grid.md`, `_source/layout/flex.md`, `_source/layout/block.md` |
| Chrome parts | the pages in `_source/ui-shell/` |
| Forms and validation | `_source/components/forms.md` |
| Tokens, knobs, dark mode | `_source/components/tokens.md` (Override Scope), `_source/_sass/tokens/_semantic.scss`, `_source/_sass/tokens/_components.scss`, the palette in `_source/_sass/themes/_dga.scss`. A component's knobs: its doc's API, CSS Custom Properties. |
| Icons | `_source/components/icons.md`. The inline names: `_source/_data/content/icons.yml`. Font icon names have no list: the audit names one the font lacks |
| Content that changes after load, framework views | `_source/core/refresh.md` |
| Requests, dates, text and languages | `_source/core/request.md`, `_source/core/date.md`, `_source/core/i18n.md`, and the banner of `_source/_js/nds-core.js` |
| Renamed and removed names | `_source/core/migration.md` |

## Page shapes

- **Head:** the canon in `_source/ui-shell/head.md`. Its asset URLs end in `?ver=` and the Liquid value `site.asset_ver`: write the runtime's `Version:` there, such as `?ver=2.0.0`, so an upgrade fetches the new files.
- **Body:** each shape is a canon in `_source/layout/page-layout.md`: standard page, home, article, minimal, console, side menu, side info. The comments in a shape's header and footer name where those parts come from.
- The Overview table there names the chrome of each shape (`full`, `minimal`, `console`) and a live page that uses it.

## View the built site

Each doc, example and template has a built page at the same path under `_site/`, such as `_site/components/cards.html`: the visual reference for a page you build. Serve `_site/` with a static HTTP server and open its pages by URL.

## Audit

- `NDS.Init.audit()`, in the browser console of a loaded page, runs every check and prints each finding with its fix. `NDS.Audit.run({ group: 'migration' })` runs one group.
- `window.NDSInitConfig = { enableLogging: true }`, set before the NDS scripts, runs the audit after load.
- The checks and what they cannot see: `_source/core/audit.md`, the API's Rules section and the Behavior's Limits section.

## Upgrade

- **Migration notes:** the `### Migrating from` sections in `CHANGELOG.md`.
- **Migration check:** the audit's `migration` group, `NDS.Audit.run({ group: 'migration' })`.

## Legacy libraries

Common legacy libraries and their NDS replacements in this release.

| Legacy | NDS |
|---|---|
| Select2 | autocomplete, multiselect |
| Summernote, TinyMCE | editor |
| jTable, DataTables | tables, with sort, filter, pagination, export |
| Font Awesome | HGI icons |
| Bootstrap | the layout primitives: grid, flex, block |
| jQuery | vanilla JS and the NDS APIs |

The catalogs' `use_when` lines name more.
