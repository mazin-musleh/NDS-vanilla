# Contributing to NDS

Thanks for your interest. Issues and pull requests are welcome.

- **Found a bug?** [Open a bug report](https://github.com/mazin-musleh/NDS-vanilla/issues/new?template=bug_report.yml).
- **Got a question or idea?** Use [Discussions](https://github.com/mazin-musleh/NDS-vanilla/discussions).

## Which changes take a PR

**Send a PR directly** for typos, broken links, doc corrections, and obvious bug fixes. No discussion needed.

**Open a [Discussion](https://github.com/mazin-musleh/NDS-vanilla/discussions) first** for anything touching `_sass/`, `_js/`, the design tokens, or adding a component. PRs opened without one are closed unreviewed — not because the idea is unwelcome, but because this codebase has strict conventions (four token tiers, RTL-by-default styling, portal-safe menus, three JS bundle tiers) documented in [CLAUDE.md](CLAUDE.md), and a PR written without them can't be merged however good the idea is. Align on scope first and the code lands.

---

## Filing a useful issue

The faster a maintainer can reproduce the problem, the faster it gets fixed. Every bug report should include:

- **Component**: the affected component name (e.g. `Dropmenu`, `Date Picker`, `Main Navigation`).
- **Direction**: RTL / LTR / Both. This is critical; many bugs are direction-specific.
- **Browser + version**: e.g. Chrome 124, Firefox 125, Safari 17.4 on iOS 17.
- **Reproduction URL**: a live demo page on https://mazin-musleh.github.io/NDS-vanilla/ that shows the problem, if possible.
- **Steps**: what you did, step by step.
- **Expected vs. actual**: what you thought would happen vs. what did happen.

The issue form enforces most of these. Fill it in.

## Running the project locally

**Requirements:** Ruby 3.x, Bundler, Jekyll. Node.js 18+ is required if you edit any file under `_js/` — Terser is invoked by `_plugins/js_processor.rb` to bundle the JS.

```bash
git clone https://github.com/mazin-musleh/NDS-vanilla.git
cd NDS-vanilla
bundle install
npm install                        # installs Terser — only needed if editing _js/
bundle exec jekyll serve           # http://localhost:4002/NDS-vanilla/
ruby _plugins/js_processor.rb      # rebuild assets/js/*.min.js after any _js/ change
```

## Commit style

PR commits should follow the existing history:

```
feat(component): short summary
fix(component): short summary
refactor(component): short summary
docs(component): short summary
```

Examples from the history:

- `feat(empty): parent-adaptive empty-state component with JS reactivity`
- `refactor(mainnav): guard dropdown hover listeners against stacking`
- `docs(code-audit): broaden JSD-04 to cover lang duplication`

Subject line only. No body paragraphs unless the change is unusually complex.

## Code of Conduct

This project follows the [Contributor Covenant v2.1](CODE_OF_CONDUCT.md). By participating, you agree to abide by it.
