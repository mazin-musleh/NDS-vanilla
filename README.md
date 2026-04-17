# NDS — National Design System (Vanilla)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/github/deployments/mazin-musleh/NDS-vanilla/github-pages?label=pages)](https://mazin-musleh.github.io/NDS-vanilla/)
[![Last commit](https://img.shields.io/github/last-commit/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/commits/main)
[![Issues](https://img.shields.io/github/issues/mazin-musleh/NDS-vanilla)](https://github.com/mazin-musleh/NDS-vanilla/issues)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)

An open-source vanilla implementation of Saudi Arabia's National Design System. 56 components in plain HTML, CSS, and JavaScript with zero runtime dependencies.

**[Live Demo](https://mazin-musleh.github.io/NDS-vanilla/)** · **[Download Template](https://github.com/mazin-musleh/NDS-vanilla/releases/latest)** · **[Report Issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose)**

---

## About

The Digital Government Authority (DGA) published a [unified design system on Figma](https://www.figma.com/@sdga) to standardize government digital services. The specifications are clear, but converting them to working code remains a challenge for most teams.

The official implementation is a [React/Storybook component library](https://dga-nds-story-book-695z8.ondigitalocean.app/) that covers core UI components. This project provides the same design system in plain HTML, CSS, and JavaScript, with all components, layout system, page templates, documentation, and a full development environment. No framework required.

## Compliance ready

Every component follows the official design tokens, typography, spacing, and interaction patterns. The project includes required page layouts as ready-to-use code, along with additional real-world examples:

- **[Service Page](https://mazin-musleh.github.io/NDS-vanilla/examples/service.html)** — government digital service with side info, breadcrumbs, and structured content layout
- **[Console](https://mazin-musleh.github.io/NDS-vanilla/examples/console-demo.html)** — admin console with charts, transactions, and team directory
- **[Registration](https://mazin-musleh.github.io/NDS-vanilla/examples/registration.html)** — multi-step form with validation, OTP, file upload, and Hijri date selection
- **[Academic Profile](https://mazin-musleh.github.io/NDS-vanilla/examples/faculty.html)** — faculty and program pages with tabbed content and structured information
- **[Services List](https://mazin-musleh.github.io/NDS-vanilla/examples/services-list.html)** — filterable government services catalog with search and category filters
- **[404 Page](https://mazin-musleh.github.io/NDS-vanilla/examples/404.html)** — custom error page with illustration and back-to-home action

## Components

56 components, each with markup, styling, and JavaScript behavior. All built from scratch.

| Category | Components |
|---|---|
| **UI** (26) | Accordion, Alert, Avatar, Breadcrumb, Buttons, Cards, Chips, Code, Definition List, Drawer, Dropmenu, Empty, Featured Icons, Feedback Icons, Hero, Image Popup Viewer, Loading, Modal, Pagination, Progress, Rating, Scroll More, Stepper, Swiper, Tabs, Tags |
| **Forms** (11) | Text Inputs, Selects, Textareas, Checkbox, Radio, Switch, OTP Input, File Upload, Autocomplete, Filter, User Feedback |
| **UI Shell** (5) | Top Bar, Main Navigation, DGA Digital Stamp, Side Menu, Footer |
| **Plugins** (6) | Date Picker (Hijri + Gregorian), Speech Recognition, Weather Widget, Clock, Cookie Consent, Share |
| **Data** (2) | Tables, Chart |
| **Layout** (2) | Section, Grid |
| **Utilities** (4) | Truncate Text, Divider, Expandable Content, Numbers |

## Architecture & performance

| Feature | Details |
|---|---|
| **Zero dependencies** | No Bootstrap, Tailwind, jQuery, or framework runtime. Plain HTML, CSS, and JavaScript that works in any environment. Drop it into any project regardless of tech stack. |
| **Smart component loader** | A single DOM sweep on page load detects which components are present and initializes them in priority order. The rest remain idle with zero runtime cost. |
| **RTL/LTR native** | Built with CSS Logical Properties from the start. Margins, paddings, borders, and positions adapt automatically. No separate RTL stylesheet. |
| **3-tier design tokens** | Color, semantic, and component tokens as CSS custom properties. Each component exposes public properties for customization while keeping internal styles private. |
| **~6 KB critical CSS (gzipped)** | Critical styles load immediately for instant render. The rest is deferred and loads asynchronously without blocking the page. |
| **~67 KB total JS (gzipped)** | The full component library in a single bundle for better compression, simpler deployment, and minimum requests. |
| **Web Vitals compliant** | 100% Google PageSpeed score. LCP, CLS, and INP all pass. Measured across desktop and mobile on fast and limited connections. |
| **GPU-accelerated animations** | Smooth transitions even on lower-end devices. Off-screen elements are not rendered until needed. |

## How should I use this?

Pick the path that matches your goal:

| Your goal | What to do |
|---|---|
| **Just try it out / run the demo locally** | `git clone` this repo and follow the Quick start below. |
| **Use as a starting point for your own site** | Pick one — see the table below. |
| **Report a bug or request a feature** | [Open an issue](https://github.com/mazin-musleh/NDS-vanilla/issues/new/choose) — no clone or fork needed. |

### Adopting the template — two ways

| Method | What you get | Best for |
|---|---|---|
| **Fork** (GitHub button) | A full copy under your account, linked to upstream. Can pull future updates with `git pull upstream main`. | You want to keep tracking upstream changes and pull in bug fixes or new components over time. |
| **Download release zip** | A static download — no Git, no GitHub account needed. | You just want the compiled site / assets and plan to drop them into an existing project. |

After forking, `git clone` your fork the same way the Quick start below shows.

## Development environment

Built on [Jekyll](https://jekyllrb.com/), a static site generator natively supported by GitHub Pages. It compiles templates, stylesheets, and data files into static HTML with no external toolchain.

### Quick start

**Requirements**

| Tool | Version | Required for |
|---|---|---|
| Ruby | 3.x | Jekyll build (required) |
| Bundler | latest | Gem install (required) |
| Node.js | 20+ | Only if modifying `_js/` source or running `scripts/add-icon.mjs`. The compiled `.min.js` files are committed — if you only serve the site, you can skip Node. |

#### 1. Install Ruby + Bundler

**Windows** — use [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/) (pick the latest 3.x + Devkit). After install, open a new terminal:

```powershell
ruby -v
gem install bundler
```

**macOS** — use Homebrew:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
gem install bundler
```

**Linux (Debian/Ubuntu)**:

```bash
sudo apt update
sudo apt install -y ruby-full build-essential zlib1g-dev
gem install bundler
```

**Linux (Fedora/RHEL)**:

```bash
sudo dnf install -y ruby ruby-devel @development-tools
gem install bundler
```

#### 2. (Optional) Install Node.js

Only if you plan to edit files under `_js/` or run the icon-adder script.

- Download the LTS installer from https://nodejs.org, or
- Use [nvm](https://github.com/nvm-sh/nvm) / [fnm](https://github.com/Schniz/fnm) and install Node 20+.

#### 3. Clone and run

```bash
git clone https://github.com/mazin-musleh/NDS-vanilla.git
cd NDS-vanilla

bundle install                    # installs Jekyll + plugin gems (first run only)
bundle exec jekyll serve          # dev server at http://localhost:4002/NDS-vanilla/
```

Open http://localhost:4002/NDS-vanilla/ in a browser. Jekyll watches the source tree — save any file and the page rebuilds.

#### Other commands

```bash
bundle exec jekyll build          # production build to _site/
ruby _plugins/js_processor.rb     # rebuild assets/js/*.min.js after any _js/ change (needs Node + Terser)
npm install                       # install Terser (first time only, before running the JS processor)
```

#### Troubleshooting

- **`bundle: command not found`** — Bundler didn't install to your `PATH`. Run `gem env gemdir` and add `<that path>/bin` to `PATH`.
- **`jekyll serve` fails with `cannot load such file -- webrick`** — Ruby 3.x removed Webrick from the stdlib, but it's already in `Gemfile`. Make sure you ran `bundle install`, then use `bundle exec jekyll serve` (not plain `jekyll serve`).
- **Port 4002 already in use** — edit `port:` in `_config.yml` or pass `bundle exec jekyll serve --port 4050`.
- **Terser errors when running `js_processor.rb`** — run `npm install` first so `node_modules/terser` exists.

### Architecture

| Layer | Details |
|---|---|
| **Sass** | Modular `@use`-based file structure. Each component has its own stylesheet. Variables, mixins, and design tokens are shared. Jekyll compiles and minifies into a single CSS output. |
| **JavaScript** | Vanilla JavaScript, one file per component, controlled by a smart loader. Only active components initialize per page. A Ruby processor bundles and minifies with [Terser](https://terser.org/). |
| **Liquid templates** | Jekyll's built-in template engine. Supports layouts, includes, partials, loops, conditions, and data binding. |
| **YAML-driven data** | YAML files act as a flat-file database. Menus, navigation, hero content, and site configuration are stored as structured data and fed into templates at build time. |
| **Custom plugins** | Ruby scripts that extend Jekyll's build process. Handle JS bundling, HTML compression, baseurl resolution. Each plugin is project-specific and fully editable. |

## Using with Claude Code

The repository ships with project-specific skills under [.claude/skills/](.claude/skills/) that help contributors work with Claude Code on NDS-specific tasks — adding documentation pages, creating example pages, seeding demo content, auditing JS code quality, adding icons, and refreshing the icon font. Project conventions are documented in [CLAUDE.md](CLAUDE.md).

No configuration required. Claude Code builds up your local permission settings over the first few sessions as you approve common actions.

## Contributing

**PRs are currently not accepted.** We're in an issues-only period while v1 stabilizes. Please open an issue to report a bug, suggest a component, or propose an enhancement. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Security

Report vulnerabilities privately via GitHub's "Report a vulnerability" button or email ``. See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2025-2026 Mazin Musleh.

## Attribution & disclaimer

Based on the public Saudi DGA design specifications published on Figma. This is an independent community implementation. **Not affiliated with, endorsed by, or maintained by the Digital Government Authority (DGA) or the Government of Saudi Arabia.**

Government logos (DGA, Saudi Vision 2030, palm-swords emblem) included in `assets/img/` for template demonstration are trademarks of their respective owners. Replace them with your organization's own marks before deploying under your own brand.

## Author

**Mazin Musleh** — Frontend Developer
[LinkedIn](https://www.linkedin.com/in/mazin-musleh/)
