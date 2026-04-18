# NDS — National Design System (Vanilla)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/github/deployments/mazin-musleh/NDS-vanilla/github-pages?label=pages)](https://mazin-musleh.github.io/NDS-vanilla/)
[![Last commit](https://img.shields.io/github/last-commit/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/commits/main)
[![Issues](https://img.shields.io/github/issues/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/issues)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)

An open-source, vanilla implementation of Saudi Arabia's National Design System. Production-ready HTML, CSS, and JavaScript built from scratch with zero external dependencies.

### → [**Live demo & full documentation**](https://mazin-musleh.github.io/NDS-vanilla/)

Quick links:
[Components](https://mazin-musleh.github.io/NDS-vanilla/#components) ·
[Example pages](https://mazin-musleh.github.io/NDS-vanilla/#compliance) ·
[Architecture](https://mazin-musleh.github.io/NDS-vanilla/#architecture) ·
[Download](https://github.com/mazin-musleh/NDS-vanilla/releases/latest) ·
[Report issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose)

---

## Who is this for?

- **Government and public-sector teams** building digital services that need to follow the official DGA design specifications.
- **Agencies and contractors** delivering Saudi government or semi-government sites on deadlines, without framework overhead.
- **Freelancers** shipping client sites quickly with a polished component library and page templates out of the box.
- **Students and fresh graduates** learning core HTML, CSS, and vanilla JavaScript from a readable production-grade codebase.
- **Teachers and trainers** using real components, page templates, and patterns as study cases for web-development courses, bootcamps, or workshops.

> **Important:** The default visual identity — design tokens, colors, logos, and the digital-stamp component — is **exclusive to Saudi Arabia government entities**. Any non-government use must replace these with the adopting organization's own identity before deploying. See [Attribution & disclaimer](#attribution--disclaimer) below.

## How should I use this?

| Your goal | What to do |
|---|---|
| **Try the demo** | Visit the [live site](https://mazin-musleh.github.io/NDS-vanilla/) — no setup needed. |
| **Build a site using NDS** | Download the [release zip](https://github.com/mazin-musleh/NDS-vanilla/releases/latest) — compiled HTML, CSS, and JavaScript ready to drop into your project. No Git or build step. |
| **Extend or customize NDS itself** | Fork the repo so your copy stays linked to upstream, then clone your fork and follow the Quick start below. Pull future updates with `git pull upstream main`. |
| **Report a bug or request a feature** | [Open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose). |

## Quick start

**Requirements:** Ruby 3.x + Bundler. Node.js 20+ only if editing `_js/` source.

### 1. Install Ruby + Bundler

**Windows** — install [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/) (3.x + Devkit), then:

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
bundle exec jekyll serve          # http://localhost:4002/NDS-vanilla/
```

### Other commands

```bash
bundle exec jekyll build          # production build to _site/
ruby _plugins/js_processor.rb     # rebuild assets/js/*.min.js after any _js/ change
npm install                       # installs Terser (needed by the JS processor)
```

### Troubleshooting

- **`cannot load such file -- webrick`** — Ruby 3.x removed it from stdlib. Run `bundle install`, then use `bundle exec jekyll serve` (not plain `jekyll serve`).
- **Port 4002 in use** — `bundle exec jekyll serve --port 4050`.
- **Terser errors** — run `npm install` first so `node_modules/terser` exists.

## Using with Claude Code

Project-specific skills under [.claude/skills/](.claude/skills/) help with doc pages, example pages, demo content, JS auditing, icon management, and font refreshes. Project conventions are in [CLAUDE.md](CLAUDE.md). No configuration required — Claude Code builds up permissions through normal approval prompts.

## Contributing

**PRs are currently not accepted** while v1 stabilizes. Please [open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose) to report a bug or request a feature. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Report vulnerabilities privately via the [Security tab](https://github.com/mazin-musleh/NDS-vanilla/security) or email ``. See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2025-2026 Mazin Musleh.

## Attribution & disclaimer

Based on the public Saudi DGA design specifications published on Figma. This is an independent community implementation. **Not affiliated with, endorsed by, or maintained by the Digital Government Authority (DGA) or the Government of Saudi Arabia.**

**The default visual identity is reserved for Saudi Arabia government entities.** If you are not a Saudi government organization, you must replace the following before deploying:

- **Logos and marks** — `assets/img/dga-logo.svg`, `dga-logo-icon.svg`, `2030-vision.svg`, and `palm_swords.svg` are official government trademarks.
- **Design tokens** — the default color, typography, and spacing tokens in `_sass/` are the DGA-defined identity; re-theme them to your own brand via the 3-tier token system.
- **Digital-stamp component** — the DGA digital-stamp in the top bar is a Saudi government compliance feature; remove it or replace with your own equivalent.
- **Copy** — `.gov.sa` email domains, "Digital Government Authority" labels, and Saudi-specific demo content throughout `_data/` and demo pages.

Keeping these defaults on a non-government site misrepresents your project as an official Saudi government service, which is not permitted.

## Author

**Mazin Musleh** — Frontend Developer · [LinkedIn](https://www.linkedin.com/in/mazin-musleh/)
