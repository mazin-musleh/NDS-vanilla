# Contributing to NDS

Thanks for your interest. Issues and pull requests are welcome.

- **Found a bug?** [Open a bug report](https://github.com/mazin-musleh/NDS-vanilla/issues/new?template=bug_report.yml).
- **Want a feature or new component?** [Open a feature request](https://github.com/mazin-musleh/NDS-vanilla/issues/new?template=feature_request.yml) first, before writing code.
- **Small fix (typo, broken link, obvious bug)?** Send a PR directly.
- **Got a question or idea?** Use [Discussions](https://github.com/mazin-musleh/NDS-vanilla/discussions).

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

**Requirements:** Ruby 3.x, Bundler, Jekyll. Node.js only if you're modifying `scripts/add-icon.mjs` or rebuilding the JS bundles (Terser is invoked by `_plugins/js_processor.rb`).

```bash
git clone https://github.com/mazin-musleh/NDS-vanilla.git
cd NDS-vanilla
bundle install
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
