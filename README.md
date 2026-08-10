# NDS: National Design System (Vanilla)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/github/deployments/mazin-musleh/NDS-vanilla/github-pages?label=pages)](https://mazin-musleh.github.io/NDS-vanilla/)
[![Last commit](https://img.shields.io/github/last-commit/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/commits/main)
[![Issues](https://img.shields.io/github/issues/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/issues)
[![Release](https://img.shields.io/github/v/release/mazin-musleh/NDS-vanilla?display_name=tag&sort=semver)](https://github.com/mazin-musleh/NDS-vanilla/releases/latest)

NDS-vanilla is an independent implementation of the Saudi [Digital Government Authority (DGA)](https://dga.gov.sa/) design specifications, translated into plain HTML, CSS, and JavaScript. The DGA published those specifications as clear and comprehensive [Figma files](https://www.figma.com/@sdga), but its own implementation is a React and Storybook component library, which leaves most teams to translate the specs into working code themselves.

The project provides the complete working system around those specifications: components, layout primitives, page templates, documentation, and a development environment. **No framework is required**, so the compiled output can be used with any application stack — or none at all.

**Highlights:**
- **Framework-free.** Plain HTML, CSS, and JavaScript with zero runtime dependencies. Use it with any stack, or none at all.
- **More than components.** A complete layout system, ready-to-use page templates, live documentation, and a 4-tier design-token system covering palette, primitives, semantic, and component tokens.
- **Compliance-ready templates.** DGA-based page templates are provided as working code, with components aligned to the documented tokens, typography, spacing, and interaction patterns.
- **Performance-first.** A 100% PageSpeed score with Core Web Vitals (LCP, CLS, INP) passing. The smart loader includes only the JavaScript a page needs, with a ~39 KB gzipped core from a ~129 KB full library, supported by ~10 KB of critical CSS.
- **Bilingual and themeable.** RTL (Arabic) by default with full LTR (English) support, light/dark mode, and re-branding through an OKLCH seed, predefined themes, or a stylesheet theme — all controlled from a single HTML attribute without a rebuild.

> **Accessibility:** Components are manually tested against WCAG 2.1 AA. A formal automated audit using axe-core and screen readers is planned for a future release. Known gaps are tracked through issues labeled `accessibility`.

### → [**Live demo & full documentation**](https://mazin-musleh.github.io/NDS-vanilla/)

Quick links:
[Get Started](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html) ·
[Components](https://mazin-musleh.github.io/NDS-vanilla/#components) ·
[Templates](https://mazin-musleh.github.io/NDS-vanilla/#compliance) ·
[Examples](https://mazin-musleh.github.io/NDS-vanilla/#examples) ·
[Architecture](https://mazin-musleh.github.io/NDS-vanilla/#architecture) ·
[llms.txt](https://mazin-musleh.github.io/NDS-vanilla/llms.txt) ·
[Download](https://github.com/mazin-musleh/NDS-vanilla/releases/latest) ·
[Report issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose)

---

## What's included

| Area | What you get |
|---|---|
| **Components** | 90+ UI components — buttons, forms, modals, charts, date pickers (Gregorian + Hijri), panels, navigation, and more. |
| **Layout** | A section model and responsive grid for composing pages. |
| **UI shell** | Header, footer, hero, side menu, top bar, and side-info — the page chrome. |
| **Utilities** | Drop-in helpers: copy, share, number formatting, text truncation, dividers, and more. |
| **Page templates** | A dozen DGA-compliant page templates (service, FAQ, contact, search, KPIs, and others). |
| **Examples** | Full real-world page demos (admin console, registration, services list, and more). |
| **Theming** | Light + dark mode, OKLCH-seed palettes, predefined and stylesheet themes, plus seasonal event packs (Foundation Day, Hajj) — all from one HTML attribute. |

Everything is RTL (Arabic) first with LTR (English) support, with live demos and copy-ready markup throughout the documentation.

## Who is this for?

- **Government teams and delivery partners** building DGA-aligned digital services on their existing stack.
- **Freelancers** building client sites with a ready-made component library and page templates.
- **Students and fresh graduates** learning HTML, CSS, and vanilla JavaScript from a readable, production-oriented codebase.
- **Teachers and trainers** using working components, templates, and patterns as practical examples for courses and workshops.

> **Important:** The default visual identity (design tokens, colors, logos, and the digital-stamp component) is **exclusive to Saudi Arabia government entities**. Any non-government use must replace these with the adopting organization's own identity before deploying — see [Disclaimer](#disclaimer).

## How should I use this?

| Your goal | What to do |
|---|---|
| **Try the demo** | Visit the [live site](https://mazin-musleh.github.io/NDS-vanilla/). No setup needed. |
| **Build a site using NDS** | Download the [release zip](https://github.com/mazin-musleh/NDS-vanilla/releases/latest) with compiled HTML, CSS, JavaScript, NDS IQ instructions, and readable `_source/`. No Git or build step is required. Follow the [Get Started guide](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html). |
| **Extend or customize NDS itself** | Fork the repository, clone your fork, and follow the Quick start below. Pull upstream changes with `git pull upstream main`. |
| **Report a bug or request a feature** | [Open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose). |

## Quick start (local development)

> **For contributors only.** If you just want to use NDS in your project, see *Build a site using NDS* above — no build tools required.

**Requirements:** Ruby 3.x + Bundler to run Jekyll. Node.js 18+ only if you edit `_js/` source (it bundles and minifies with Terser).

### 1. Install Ruby + Bundler

**Windows** — install [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/) (3.x + Devkit), then:

```powershell
gem install bundler
```

**macOS:**

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
gem install bundler
```

**Linux (Debian/Ubuntu):**

```bash
sudo apt install -y ruby-full build-essential zlib1g-dev
gem install bundler
```

**Linux (Fedora/RHEL):**

```bash
sudo dnf install -y ruby ruby-devel @development-tools
gem install bundler
```

### 2. Clone and run

```bash
git clone https://github.com/mazin-musleh/NDS-vanilla.git
cd NDS-vanilla
bundle install
npm install                       # installs Terser — only needed if editing _js/
bundle exec jekyll serve          # http://localhost:4002/NDS-vanilla/
```

The server also binds `0.0.0.0` and prints a LAN URL alongside the localhost URL, allowing you to open the site on another device on the same network. This is useful for checking RTL layouts and touch targets on real hardware.

### Other commands

```bash
bundle exec jekyll build          # production build to _site/
ruby _plugins/js_processor.rb     # rebuild assets/js/*.min.js after any _js/ change
```

### Troubleshooting

- **`cannot load such file -- webrick`**: Ruby 3.x removed it from stdlib. Run `bundle install`, then use `bundle exec jekyll serve` (not plain `jekyll serve`).
- **Port 4002 in use**: `bundle exec jekyll serve --port 4050`.
- **Terser errors**: run `npm install` first so `node_modules/terser` exists.

### Customizing `_config.yml` without merge conflicts

If you fork NDS to re-brand it, keep `_config.yml` unchanged and put your overrides in a second file. Jekyll merges configuration files from left to right, so values in the later file take precedence:

```yaml
# _config.local.yml — your fork's brand overrides
title: "Ministry of X Portal"
brandName: "MOX"
brandLogo: assets/img/mox-logo.svg
brandNameColor: "#0a3d62"
brandSlogan: "Digital Services"
hero_image: assets/img/mox-hero.webp
brand: mox
og_image: assets/img/mox-cover.webp
```

Build with both:

```bash
bundle exec jekyll serve --config _config.yml,_config.local.yml
bundle exec jekyll build --config _config.yml,_config.local.yml
```

**Commit `_config.local.yml` to your fork.** Despite the name, it is shared brand configuration, not a per-machine file, so every development clone and CI job uses the same values. Because upstream NDS does not ship this file, `git pull upstream main` does not conflict with it. Keeping `_config.yml` unchanged also allows upstream changes to `version`, toggles, and defaults to merge cleanly.

## Contributing

Issues are welcome for bugs, feature requests, and feedback. For small fixes such as typos, broken links, and obvious bugs, a PR is fine. For features or larger changes, please [open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose) first to discuss the approach. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidance.

## Using with AI agents

NDS is designed for consistent AI-assisted development across models. The release includes [NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html), a versioned instruction system that provides the baseline for building with NDS. Save it at your project root and point your `AGENTS.md` or `CLAUDE.md` at it; Claude Code, Cursor, Codex, and other agents then read the same file. The [Get Started guide](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html) covers setup, the development workflow, and upgrades.

**Working on NDS itself?** Project conventions live in [AGENTS.md](AGENTS.md), the cross-tool instruction file used by Cursor, Codex, Aider, and other coding agents; [CLAUDE.md](CLAUDE.md) imports it for Claude Code. Claude Code users also get project-specific skills under [.claude/skills/](.claude/skills/) for documentation, JS and CSS audits, performance measurement, icon management, font refreshes, and NDS IQ evaluation. No configuration required.

## Security

Report vulnerabilities privately through the [Security tab](https://github.com/mazin-musleh/NDS-vanilla/security). See [SECURITY.md](SECURITY.md) for the reporting process.

## License

[MIT](LICENSE) © 2025-2026 Mazin Musleh.

## Disclaimer

Based on the public Saudi DGA design specifications published on Figma, this is an independent implementation. **It is not affiliated with, endorsed by, or maintained by the Digital Government Authority (DGA) or the Government of Saudi Arabia.**

**The default visual identity is reserved for Saudi Arabia government entities.** If you are not a Saudi government organization, you must replace the following before deploying:

- **Logos and marks**: [`assets/img/dga-logo-icon.svg`](assets/img/dga-logo-icon.svg), [`2030-vision.svg`](assets/img/2030-vision.svg), and [`palm_swords.svg`](assets/img/palm_swords.svg) are official government trademarks.
- **Design tokens**: the DGA brand identity in [`_sass/themes/_dga.scss`](_sass/themes/_dga.scss) and the foundation typography and spacing primitives in [`_sass/tokens/_primitives.scss`](_sass/tokens/_primitives.scss) are the DGA-defined identity. Re-theme them to your own brand via the 4-tier token system (see [CLAUDE.md](CLAUDE.md#design-tokens-critical)).
- **Digital-stamp component**: the DGA digital-stamp in the top bar ([`_includes/topbar.html`](_includes/topbar.html), styled in [`_sass/components/_DGAdigitalStamp.scss`](_sass/components/_DGAdigitalStamp.scss)) is a Saudi government compliance feature. Remove it or replace it with your own equivalent.
- **Copy**: `.gov.sa` email domains, "Digital Government Authority" labels, and Saudi-specific demo content throughout `_data/` and demo pages.

Keeping these defaults on a non-government site can misrepresent the project as an official Saudi government service and is not permitted.

## Author

**Mazin Musleh** · Frontend Developer · [LinkedIn](https://www.linkedin.com/in/mazin-musleh/)
