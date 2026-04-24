# NDS: National Design System (Vanilla)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/github/deployments/mazin-musleh/NDS-vanilla/github-pages?label=pages)](https://mazin-musleh.github.io/NDS-vanilla/)
[![Last commit](https://img.shields.io/github/last-commit/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/commits/main)
[![Issues](https://img.shields.io/github/issues/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/issues)
[![Release](https://img.shields.io/github/v/release/mazin-musleh/NDS-vanilla?display_name=tag&sort=semver)](https://github.com/mazin-musleh/NDS-vanilla/releases/latest)

Credit to the [Digital Government Authority (DGA)](https://dga.gov.sa/) for its outstanding work in unifying Saudi Arabia's government websites and services under a single, coherent design language. The specifications published on [Figma](https://www.figma.com/@sdga) are clear and comprehensive; however, translating them into working code remains a challenge for most teams.

The DGA's official implementation is a React and Storybook component library that covers the core UI components. This project provides the same design system in plain HTML, CSS, and JavaScript, and includes all components, a layout system, page templates, documentation, and a complete development environment. No framework is required.

**Highlights:**
- **Framework-free.** Plain HTML, CSS, and JavaScript. Works with any stack, or no stack at all.
- **More than components.** Includes the layout system, page templates, documentation, and fully customizable.
- **Compliance-ready out of the box.** Official DGA page templates, converted into live, working code and ready for deployment. Every component adheres to the official design tokens, typography, spacing, and interaction patterns.

### → [**Live demo & full documentation**](https://mazin-musleh.github.io/NDS-vanilla/)

Quick links:
[Components](https://mazin-musleh.github.io/NDS-vanilla/#components) ·
[Templates](https://mazin-musleh.github.io/NDS-vanilla/#compliance) ·
[Examples](https://mazin-musleh.github.io/NDS-vanilla/#examples) ·
[Architecture](https://mazin-musleh.github.io/NDS-vanilla/#architecture) ·
[Download](https://github.com/mazin-musleh/NDS-vanilla/releases/latest) ·
[Report issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose)

---

## Who is this for?

- **Government teams and the agencies delivering for them**, building DGA-compliant digital services on whatever stack they already use.
- **Freelancers** shipping client sites quickly with a polished component library and page templates out of the box.
- **Students and fresh graduates** learning core HTML, CSS, and vanilla JavaScript from a readable production-grade codebase.
- **Teachers and trainers** using real components, page templates, and patterns as study cases for web-development courses, bootcamps, or workshops.

> **Important:** The default visual identity (design tokens, colors, logos, and the digital-stamp component) is **exclusive to Saudi Arabia government entities**. Any non-government use must replace these with the adopting organization's own identity before deploying. See [Disclaimer](#disclaimer) below.

## How should I use this?

| Your goal | What to do |
|---|---|
| **Try the demo** | Visit the [live site](https://mazin-musleh.github.io/NDS-vanilla/). No setup needed. |
| **Build a site using NDS** | Download the [release zip](https://github.com/mazin-musleh/NDS-vanilla/releases/latest). Compiled HTML, CSS, and JavaScript ready to drop into your project. No Git or build step. |
| **Extend or customize NDS itself** | Fork the repo so your copy stays linked to upstream, then clone your fork and follow the Quick start below. Pull future updates with `git pull upstream main`. |
| **Report a bug or request a feature** | [Open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose). |

## Quick start (local development)

> **For contributors only.** If you just want to use NDS in your project, see *Build a site using NDS* in the table above. No build tools required.

**Dev-environment requirements:** Ruby 3.x + Bundler to run Jekyll. Node.js 20+ only if editing `_js/` source.

### 1. Install Ruby + Bundler

**Windows**: install [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/) (3.x + Devkit), then:

```powershell
gem install bundler
```

**macOS**:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
gem install bundler
```

**Linux (Debian/Ubuntu)**:

```bash
sudo apt install -y ruby-full build-essential zlib1g-dev
gem install bundler
```

**Linux (Fedora/RHEL)**:

```bash
sudo dnf install -y ruby ruby-devel @development-tools
gem install bundler
```

### 2. Clone and run

```bash
git clone https://github.com/mazin-musleh/NDS-vanilla.git
cd NDS-vanilla
bundle install
npm install                       # installs Terser (only needed if editing _js/)
bundle exec jekyll serve          # http://localhost:4002/NDS-vanilla/
```

### Other commands

```bash
bundle exec jekyll build          # production build to _site/
ruby _plugins/js_processor.rb     # rebuild assets/js/*.min.js after any _js/ change
```

### Troubleshooting

- **`cannot load such file -- webrick`**: Ruby 3.x removed it from stdlib. Run `bundle install`, then use `bundle exec jekyll serve` (not plain `jekyll serve`).
- **Port 4002 in use**: `bundle exec jekyll serve --port 4050`.
- **Terser errors**: run `npm install` first so `node_modules/terser` exists.

## Contributing

Issues are welcome for bugs, feature requests, and feedback. For small fixes (typos, broken links, obvious bugs), a PR is fine. For features or larger changes, please [open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose) first to discuss the approach. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Using with Claude Code

Project-specific skills under [.claude/skills/](.claude/skills/) help with doc pages, example pages, demo content, JS auditing, site-wide content review, icon management, and font refreshes. Project conventions are in [CLAUDE.md](CLAUDE.md). No configuration required; Claude Code builds up permissions through normal approval prompts.

## Security

Report vulnerabilities privately via the [Security tab](https://github.com/mazin-musleh/NDS-vanilla/security) or email ``. See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2025-2026 Mazin Musleh.

## Disclaimer

Based on the public Saudi DGA design specifications published on Figma. This is an independent community implementation. **Not affiliated with, endorsed by, or maintained by the Digital Government Authority (DGA) or the Government of Saudi Arabia.**

**The default visual identity is reserved for Saudi Arabia government entities.** If you are not a Saudi government organization, you must replace the following before deploying:

- **Logos and marks**: [`assets/img/dga-logo.svg`](assets/img/dga-logo.svg), [`dga-logo-icon.svg`](assets/img/dga-logo-icon.svg), [`2030-vision.svg`](assets/img/2030-vision.svg), and [`palm_swords.svg`](assets/img/palm_swords.svg) are official government trademarks.
- **Design tokens**: the default color, typography, and spacing tokens in [`_sass/_variables.scss`](_sass/_variables.scss) and [`_sass/_variables-dga.scss`](_sass/_variables-dga.scss) are the DGA-defined identity. Re-theme them to your own brand via the 3-tier token system (see [CLAUDE.md](CLAUDE.md#design-tokens-critical)).
- **Digital-stamp component**: the DGA digital-stamp in the top bar ([`_includes/topbar.html`](_includes/topbar.html), styled in [`_sass/components/_DGAdigitalStamp.scss`](_sass/components/_DGAdigitalStamp.scss)) is a Saudi government compliance feature. Remove it or replace with your own equivalent.
- **Copy**: `.gov.sa` email domains, "Digital Government Authority" labels, and Saudi-specific demo content throughout `_data/` and demo pages.

Keeping these defaults on a non-government site misrepresents your project as an official Saudi government service, and is not permitted.

## Author

**Mazin Musleh** · Frontend Developer · [LinkedIn](https://www.linkedin.com/in/mazin-musleh/)
