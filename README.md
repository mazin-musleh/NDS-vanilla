# NDS: National Design System (Vanilla)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/github/deployments/mazin-musleh/NDS-vanilla/github-pages?label=pages)](https://mazin-musleh.github.io/NDS-vanilla/)
[![Last commit](https://img.shields.io/github/last-commit/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/commits/main)
[![Issues](https://img.shields.io/github/issues/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/issues)
[![Release](https://img.shields.io/github/v/release/mazin-musleh/NDS-vanilla?display_name=tag&sort=semver)](https://github.com/mazin-musleh/NDS-vanilla/releases/latest)

The Saudi [Digital Government Authority (DGA)](https://dga.gov.sa/) publishes its design specifications as [Figma files](https://www.figma.com/@sdga). Its own code is a React and Storybook component library.

NDS-vanilla is an independent build of the same design system in plain HTML, CSS, and JavaScript. Plain web code works in any stack: static sites, server-rendered pages, or apps built with React or another framework. It brings no framework or dependencies of its own.

**Highlights:**
- **Framework-free.** Plain HTML, CSS, and JavaScript, with zero runtime dependencies.
- **More than components.** A layout system, page templates, live documentation, and a 4-tier design-token system (palette, primitives, semantic, component).
- **DGA page templates.** Common government service pages as working code, built on the DGA tokens, typography, spacing, and interaction patterns.
- **Fast.** A PageSpeed score of 100, with LCP, CLS, and INP passing. A ~41 KB gzipped core loads on every page; the rest of the ~139 KB library loads only where a page needs it. Critical CSS is ~10 KB.
- **Bilingual and themeable.** Arabic (RTL) first, with full English (LTR) support. Light and dark mode, and re-branding from one OKLCH seed color, a predefined theme, or a stylesheet theme. One HTML attribute switches the theme, with no rebuild.

> **Accessibility:** Components are tested by hand against WCAG 2.1 AA. An automated audit with axe-core and screen readers is planned. Known gaps are tracked in issues labeled `accessibility`.

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
| **Components** | 90+ UI components: buttons, forms, modals, charts, date pickers (Gregorian and Hijri), panels, navigation, and more. |
| **Layout** | A section model and a responsive grid to compose pages. |
| **UI shell** | The page chrome: top bar, header, main navigation, hero, side menu, side info, and footer. |
| **Utilities** | Small helpers: copy, share, number formats, text truncation, dividers, and more. |
| **Page templates** | 16 DGA page templates, such as service, FAQ, contact, search, and KPIs. |
| **Examples** | 12 full pages, such as an admin console, a registration flow, and a services list. |
| **Theming** | Light and dark mode, OKLCH-seed palettes, and predefined or stylesheet themes. |
| **Event themes** | Seasonal skins for Foundation Day, Hajj, and National Day. One script tag applies each one. |

Every page is Arabic (RTL) first, with English (LTR) support. The docs show a live demo and copy-ready markup for each part.

## Who is this for?

- **Government teams and delivery partners** who build DGA-aligned services on their existing stack.
- **Freelancers** who build client sites with a ready component library and page templates.
- **Students and fresh graduates** who learn HTML, CSS, and plain JavaScript from a readable, production-grade codebase.
- **Teachers and trainers** who use real components, templates, and patterns in courses and workshops.

> **Important:** The default visual identity (design tokens, colors, logos, and the digital-stamp component) is **for Saudi Arabia government entities only**. Any other project must replace it with its own identity before it goes live. See the [Disclaimer](#disclaimer).

## How should I use this?

| Your goal | What to do |
|---|---|
| **Try the demo** | Open the [live site](https://mazin-musleh.github.io/NDS-vanilla/). No setup needed. |
| **Build a site with NDS** | Follow the [Get Started guide](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html). |
| **Change or extend NDS itself** | Fork the repository, clone your fork, and follow the Quick start below. Pull upstream changes with `git pull upstream main`. |
| **Report a bug or ask for a feature** | [Open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose). |

## Using with AI agents

[NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html) is a versioned instruction system that gives AI coding agents a consistent way to build with NDS. It lives in this repository, not in the release zip. The Get Started setup prompt downloads it to your project root and points your `AGENTS.md` or `CLAUDE.md` at it. Claude Code, Cursor, Codex, and other agents then read the same file. The [Get Started guide](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html) covers setup, the workflow, and upgrades.

**Working on NDS itself?** The project rules live in [AGENTS.md](AGENTS.md), which Cursor, Codex, Aider, and other agents read. [CLAUDE.md](CLAUDE.md) imports it for Claude Code. Claude Code also gets project skills in [.claude/skills/](.claude/skills/): docs, JS and CSS audits, performance measurement, icons, font updates, and NDS IQ evaluation. No setup is needed.

## Quick start (local development)

> **For contributors only.** To use NDS in your own project, see *Build a site with NDS* above. You need no build tools for that.

**Requirements:** Ruby 3.x and Bundler to run Jekyll. Node.js 18+ only if you edit `_js/` source (Terser bundles and minifies it).

### 1. Install Ruby and Bundler

**Windows:** install [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/) (3.x + Devkit), then run:

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
npm install                       # installs Terser, only needed if you edit _js/
bundle exec jekyll serve          # http://localhost:4002/NDS-vanilla/
```

The server also prints a LAN URL. Open it on a phone on the same network to check RTL layouts and touch targets on real hardware.

### Other commands

```bash
bundle exec jekyll build          # production build to _site/
ruby _plugins/js_processor.rb     # rebuild assets/js/*.min.js after any _js/ change
```

### Troubleshooting

- **`cannot load such file -- webrick`**: Ruby 3.x removed it from the standard library. Run `bundle install`, then use `bundle exec jekyll serve`, not plain `jekyll serve`.
- **Port 4002 in use**: run `bundle exec jekyll serve --port 4050`.
- **Terser errors**: run `npm install` first, so `node_modules/terser` exists.

### Re-brand a fork without merge conflicts

Keep `_config.yml` unchanged. Put your overrides in a second file. Jekyll merges config files from left to right, so the later file wins:

```yaml
# _config.local.yml: your fork's brand overrides
title: "Ministry of X Portal"
brandName: "MOX"
brandLogo: assets/img/mox-logo.svg
brandNameColor: "#0a3d62"
brandSlogan: "Digital Services"
hero_image: assets/img/mox-hero.webp
brand: mox
og_image: assets/img/mox-cover.webp
```

Build with both files:

```bash
bundle exec jekyll serve --config _config.yml,_config.local.yml
bundle exec jekyll build --config _config.yml,_config.local.yml
```

**Commit `_config.local.yml` to your fork.** Despite its name, it holds shared brand settings, so every clone and CI job must use it. Upstream NDS does not ship this file, so `git pull upstream main` never conflicts with it. Upstream changes to `_config.yml` (version, toggles, defaults) also merge cleanly.

## Contributing

Issues are welcome for bugs, feature requests, and feedback. A PR is fine for small fixes such as typos, broken links, and obvious bugs. For a feature or a larger change, [open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose) first so we can agree on the approach. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Report vulnerabilities privately through the [Security tab](https://github.com/mazin-musleh/NDS-vanilla/security). See [SECURITY.md](SECURITY.md) for the process.

## License

[MIT](LICENSE) © 2025-2026 Mazin Musleh.

## Disclaimer

This is an independent implementation, based on the public DGA design specifications on Figma. **It is not affiliated with, endorsed by, or maintained by the Digital Government Authority (DGA) or the Government of Saudi Arabia.**

**The default visual identity is for Saudi Arabia government entities only.** If you are not a Saudi government organization, replace all of the following before you go live:

- **Logos and marks**: [`assets/img/dga-logo-icon.svg`](assets/img/dga-logo-icon.svg), [`2030-vision.svg`](assets/img/2030-vision.svg), and [`palm_swords.svg`](assets/img/palm_swords.svg) are official government trademarks.
- **Design tokens**: the DGA brand in [`_sass/themes/_dga.scss`](_sass/themes/_dga.scss) and the typography and spacing primitives in [`_sass/tokens/_primitives.scss`](_sass/tokens/_primitives.scss) are the DGA identity. Re-theme them to your brand through the 4-tier token system (see [AGENTS.md](AGENTS.md#design-tokens-critical)).
- **Digital-stamp component**: the DGA digital stamp in the top bar ([`_includes/topbar.html`](_includes/topbar.html), styled in [`_sass/components/_DGAdigitalStamp.scss`](_sass/components/_DGAdigitalStamp.scss)) is a Saudi government compliance feature. Remove it, or replace it with your own.
- **Copy**: `.gov.sa` email domains, "Digital Government Authority" labels, and Saudi-specific demo content in `_data/` and the demo pages.

A non-government site that keeps these defaults can look like an official Saudi government service. That is not permitted.

## Author

**Mazin Musleh** · Frontend Developer · [LinkedIn](https://www.linkedin.com/in/mazin-musleh/)
