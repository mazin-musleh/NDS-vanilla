# Contributing to NDS

Thanks for your interest. Issues are welcome. Pull requests are not accepted.

- **Found a bug?** [Open a bug report](https://github.com/mazin-musleh/NDS-vanilla/issues/new?template=bug_report.yml).
- **Got a question or idea?** Use [Discussions](https://github.com/mazin-musleh/NDS-vanilla/discussions).

## Pull requests

NDS takes no pull requests. A PR is closed without review. To suggest a change, open an issue or a Discussion, and the maintainer makes the change.

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

## Code of Conduct

This project follows the [Contributor Covenant v2.1](CODE_OF_CONDUCT.md). By participating, you agree to abide by it.
