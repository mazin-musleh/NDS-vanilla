# NDS Vanilla — Template

A versioned, read-only build of the National Design System (Saudi Arabia). Keep this folder beside your project as a source reference — don't edit it, don't build inside it. Upgrades replace the whole folder.

**Start here:** open the adoption guide at `_site/guides/get-started.html` (or hosted: https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html). It contains the agent-instructions block you paste into your project's `AGENTS.md` / `CLAUDE.md`, and the session playbook for building page by page.

## Layout

- `_site/` — the built documentation site + all assets. Component docs (`_site/components/`) carry the canonical copy-ready markup; `_site/templates/` and `_site/examples/` are full pages to copy.
- `_source/` — readable JS/SCSS source behind the minified bundles, plus machine-readable catalogs in `_source/_data/content/`.
- `CHANGELOG.md` — release history. Read the "Migrating from" sections when upgrading.
- `LICENSE` — license terms.

## Best practices

- Copy what you need OUT of this folder into your project; never point production pages at files in here.
- Never read or edit `*.min.js` / `*.min.css` — the readable source is in `_source/`.
- Copy component markup verbatim from the doc pages; don't invent or adapt it from memory.
- To upgrade: replace this folder with the new release (update your `NDS_ROOT` line if the folder name carries the version), then paste the upgrade prompt from the guide — your agent compares the bundle version banners, replaces the assets under `NDS_ASSETS`, and sweeps your pages per the CHANGELOG's "Migrating from" sections.
