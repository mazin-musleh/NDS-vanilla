---
layout: home
title: "NDS - Vanilla National Design System"
description: "An open-source vanilla implementation of Saudi Arabia's National Design System. 52 components in plain HTML, CSS, and JavaScript with zero dependencies."

lang: en
direction: ltr
---

<!-- Implementation Solution -->
<section id="about" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">About The Project</h2>
            <p class="nds-section-description">Why it was built, and what it covers.</p>
        </div>
        <div class="nds-section-content">
            <p>The Digital Government Authority published a <a href="https://www.figma.com/@sdga" target="_blank" class="nds-primary">unified design system on Figma</a> to standardize government digital services. The specifications are clear, but converting them to working code remains a challenge for most teams.</p>
            <p>The official implementation is a <a href="https://dga-nds-story-book-695z8.ondigitalocean.app/" target="_blank" class="nds-primary">React/Storybook component library</a> that covers core UI components. This project provides the same design system in plain HTML, CSS, and JavaScript, with all components, layout system, page templates, documentation, and a full development environment. No framework required.</p>
        </div>
    </div>
</section>

<!-- Open Source -->
<section id="opensource" class="nds-content-section nds-brand">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Open Source</h2>
            <p class="nds-section-description">MIT licensed. Full source code included.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-grid" style="--max-col:3;--mid-col:1;--min-col:1;">
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-package nds-icon"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <h3 class="nds-card-title">Download</h3>
                            <p class="nds-card-description">Compiled HTML, CSS, and JavaScript ready to use. Source files included as reference.</p>
                        </div>
                    </div>
                    <div class="nds-card-actions">
                        <a href="#" class="nds-btn nds-primary nds-external">
                            <span class="nds-label">Download Template</span>
                        </a>
                    </div>
                </div>
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-git-fork nds-icon"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <h3 class="nds-card-title">Fork</h3>
                            <p class="nds-card-description">Full source code with build system, templates, and tooling.</p>
                        </div>
                    </div>
                    <div class="nds-card-actions">
                        <a href="#" class="nds-btn nds-primary nds-external">
                            <span class="nds-label">View Repository</span>
                        </a>
                    </div>
                </div>
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-git-pull-request nds-icon"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <h3 class="nds-card-title">Contribute</h3>
                            <p class="nds-card-description">Report issues, suggest improvements, or submit pull requests on GitHub.</p>
                        </div>
                    </div>
                    <div class="nds-card-actions">
                        <a href="#" class="nds-btn nds-primary nds-external">
                            <span class="nds-label">Open Issues</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Components -->
<section id="components" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Components</h2>
            <p class="nds-section-description">52 components, each with markup, styling, and JavaScript behavior. All built from scratch.</p>
        </div>
        <div class="nds-section-content">
        <div class="nds-section-search nds-filter" data-filter-target="components_list" hidden>
            <div class="nds-form-container nds-search-box">
                <div class="nds-search-content">
                    <div class="nds-form-control">
                        <i class="hgi hgi-stroke hgi-search-01 nds-icon"></i>
                        <input id="componentSearch" type="text" class="nds-search-input" name="search" autocomplete="off"
                            placeholder="Search components...">
                        <div class="nds-form-action">
                            <button class="nds-btn nds-subtle nds-clear" hidden><i
                                    class="hgi hgi-stroke hgi-cancel-01 nds-icon"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-dropmenu">
                <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                    <i class="hgi hgi-stroke hgi-filter nds-icon"></i>
                    <span class="nds-label">Filter</span>
                </button>
                <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                    <div class="nds-dropmenu-scroll">
                        <div data-filter="category" data-filter-legend="Category"
                            data-filter-type="checkbox" data-no-auto-close></div>
                        <hr class="nds-dropmenu-divider">
                        <div data-filter="tech" data-filter-legend="Technology"
                            data-filter-type="checkbox" data-no-auto-close></div>
                    </div>
                    <div class="nds-dropmenu-footer">
                        <hr class="nds-divider">
                        <div class="nds-dropmenu-action nds-grid">
                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                data-filter-action="clear" data-no-auto-close>
                                <span class="nds-label">Reset</span>
                            </button>
                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                data-filter-action="apply">
                                <span class="nds-label">Filter</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-filter-applied" hidden>
                <span class="nds-label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>
        <div id="components_list" class="nds-paged-content nds-grid" hidden
            style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">

            {% for comp in site.data.content.components %}
            <div class="nds-page-item nds-card nds-stroke">
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">{{ comp.title }}</h3>
                        <p class="nds-card-description">{{ comp.description }}</p>
                    </div>
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="nds-label" data-filter="category">{{ comp.category }}</span>
                        </span>
                        {% for tag in comp.tags %}
                        <span class="nds-tag nds-neutral nds-sm">
                            <span class="nds-label" data-filter="tech">{{ tag }}</span>
                        </span>
                        {% endfor %}
                    </div>
                </div>
                {% if comp.url %}
                <div class="nds-card-actions">
                    <a href="{{ comp.url | relative_url }}" class="nds-btn nds-primary">
                        <span class="nds-label">View Docs</span>
                    </a>
                </div>
                {% endif %}
            </div>
            {% endfor %}

        </div>
        <nav class="nds-pagination" data-auto-pagination aria-label="Pagination"></nav>
    </div>
    </div>
</section>

<!-- Compliance Ready -->
<section id="compliance" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Compliance Ready</h2>
            <p class="nds-section-description">Components and page templates built to pass DGA compliance.</p>
        </div>
        <div class="nds-section-content">
            <p>Every component follows the official design tokens, typography, spacing, and interaction patterns. The project includes required page layouts as ready-to-use code, along with additional real-world examples.</p>
        </div>
    </div>
    <div class="nds-section-content nds-full-width">
        <div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="40" hidden>
            <div class="nds-swiper-wrapper">

                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-xl">
                                    <i class="hgi hgi-stroke hgi-dashboard-browsing nds-icon"></i>
                                </span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title">Dashboard</h3>
                                <p class="nds-card-description">Charts, stat cards, and data tables in an analytics layout.</p>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/examples/dashboard-demo.html' | relative_url }}" class="nds-btn nds-primary">
                                <span class="nds-label">View Page</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-xl">
                                    <i class="hgi hgi-stroke hgi-file-validation nds-icon"></i>
                                </span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title">Registration</h3>
                                <p class="nds-card-description">Multi-step form with validation, OTP, file upload, and Hijri date selection.</p>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/examples/registration.html' | relative_url }}" class="nds-btn nds-primary">
                                <span class="nds-label">View Page</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-xl">
                                    <i class="hgi hgi-stroke hgi-menu-square nds-icon"></i>
                                </span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title">Service Page</h3>
                                <p class="nds-card-description">Government digital service with side info, breadcrumbs, and structured content layout.</p>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/examples/service.html' | relative_url }}" class="nds-btn nds-primary">
                                <span class="nds-label">View Page</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-xl">
                                    <i class="hgi hgi-stroke hgi-school nds-icon"></i>
                                </span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title">Academic Profile</h3>
                                <p class="nds-card-description">Faculty and program pages with tabbed content and structured information.</p>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/examples/faculty.html' | relative_url }}" class="nds-btn nds-primary">
                                <span class="nds-label">View Page</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div class="nds-swiper-navigation">
                <div class="nds-swiper-buttons">
                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-swiper-button-prev"
                        type="button" aria-label="Previous slide"><i
                            class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-swiper-button-next"
                        type="button" aria-label="Next slide"><i
                            class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                </div>
                <div class="nds-swiper-pagination"></div>
            </div>
        </div>
    </div>
</section>

<!-- Architecture & Performance -->
<section id="architecture" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Architecture & Performance</h2>
            <p class="nds-section-description">Built with a performance-first and compatibility approach.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:32px; --dl-title-FS: var(--nds-text-xl-FS); --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket nds-icon"></i>
                        <span class="nds-label">Zero Dependencies</span>
                    </span>
                    <p class="nds-item-desc">No Bootstrap, Tailwind, jQuery, or framework runtime. The output is plain HTML, CSS, and JavaScript that works in any environment. No conflicts with existing scripts or stylesheets. Drop it into any project regardless of tech stack.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cpu-charge nds-icon"></i>
                        <span class="nds-label">Smart Component Loader</span>
                    </span>
                    <p class="nds-item-desc">A single DOM sweep on page load detects which components are present and initializes them in priority order. The rest remain idle with zero runtime cost. Resources are only allocated for what the page actually uses.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-data-transfer-horizontal nds-icon"></i>
                        <span class="nds-label">RTL/LTR Native</span>
                    </span>
                    <p class="nds-item-desc">Built with CSS Logical Properties from the start. Margins, paddings, borders, and positions adapt automatically. No separate RTL stylesheet. No overrides. Switch direction with a single HTML attribute.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-brush-01 nds-icon"></i>
                        <span class="nds-label">3-Tier Design Tokens</span>
                    </span>
                    <p class="nds-item-desc">Color tokens, semantic tokens, and component tokens, all defined as CSS custom properties. Each component exposes public properties for customization while keeping internal styles private, no overrides needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-zap nds-icon"></i>
                        <span class="nds-label">~6 KB Critical CSS (gzipped)</span>
                    </span>
                    <p class="nds-item-desc">Critical styles load immediately for instant render. The rest is deferred and loads asynchronously without blocking the page. Styles are split between critical and non-critical at the build level.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code-circle nds-icon"></i>
                        <span class="nds-label">~67 KB Total JS (gzipped)</span>
                    </span>
                    <p class="nds-item-desc">The full component library in a single bundle for better compression, simpler deployment, and minimum requests. Components initialize as needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-chart-line-data-01 nds-icon"></i>
                        <span class="nds-label">Web Vitals Compliant</span>
                    </span>
                    <p class="nds-item-desc">100% Google PageSpeed score. LCP, CLS, and INP all pass. Measured and optimized for real-world conditions. Tested across desktop and mobile on both fast and limited connections.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-dashboard-speed-01 nds-icon"></i>
                        <span class="nds-label">Sleek Animations</span>
                    </span>
                    <p class="nds-item-desc">GPU-accelerated animations with optimized scheduling deliver smooth transitions even on lower-end devices, with a native application feel. Off-screen elements are not rendered until needed.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Development Environment -->
<section id="dev-environment" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Development Environment</h2>
            <p class="nds-section-description">Everything needed to build, modify, and extend the system.</p>
        </div>
        <div class="nds-section-content">
            <p>The project is built on <a href="https://jekyllrb.com/" target="_blank" class="nds-primary">Jekyll</a>, a static site generator natively supported by GitHub Pages. It compiles templates, stylesheets, and data files into static HTML with no external toolchain.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:32px; --dl-title-FS: var(--nds-text-xl-FS); --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-brush-01 nds-icon"></i>
                        <span class="nds-label">Sass Architecture</span>
                    </span>
                    <p class="nds-item-desc">Sass with a modular file structure. Each component has its own stylesheet. Variables, mixins, and design tokens are shared across all files. Jekyll compiles and minifies everything into a single CSS output.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code nds-icon"></i>
                        <span class="nds-label">Modular JavaScript</span>
                    </span>
                    <p class="nds-item-desc">Vanilla JavaScript with one file per component, controlled by a smart loader. Only active components initialize on each page. A Ruby processor bundles and minifies using <a href="https://terser.org/" target="_blank" class="nds-primary">Terser</a>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-03 nds-icon"></i>
                        <span class="nds-label">Liquid Templates</span>
                    </span>
                    <p class="nds-item-desc">Jekyll's built-in template engine. Supports layouts, includes, partials, loops, conditions, and data binding. Pages are composed from reusable blocks with no duplicated markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database nds-icon"></i>
                        <span class="nds-label">YAML-Driven Data</span>
                    </span>
                    <p class="nds-item-desc">YAML files act as a flat-file database for the project. Menus, navigation, hero content, and site configuration are stored as structured data and fed into templates at build time.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle nds-icon"></i>
                        <span class="nds-label">Custom Plugins</span>
                    </span>
                    <p class="nds-item-desc">Custom Ruby scripts that extend Jekyll's build process. Handle JS bundling, HTML compression, baseurl resolution, and more. Each plugin is project-specific and fully editable.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-artificial-intelligence-04 nds-icon"></i>
                        <span class="nds-label">AI Integration</span>
                    </span>
                    <p class="nds-item-desc">Configured for <a href="https://claude.ai/" target="_blank" class="nds-primary">Claude Code</a> AI assistant with custom skills for documentation, content creation, code review, and component auditing. The codebase is structured for effective AI-assisted development.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Get Started -->
<section id="getStarted" class="nds-content-section nds-center">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Get Started</h2>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-lg nds-external">
                <i class="hgi hgi-stroke hgi-github nds-icon"></i>
                <span class="nds-label">View on GitHub</span>
            </a>
            <a href="#" class="nds-btn nds-secondary-outline nds-lg nds-external">
                <span class="nds-label">Download Template</span>
            </a>
        </div>
    </div>
</section>
