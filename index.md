---
layout: home

lang: en
direction: ltr
exclude_showcase: true

# Bundle sizes shown in the Architecture section (gzipped KB). Update when bundles change:
# gzip -c assets/js/nds-main.min.js | wc -c (and delegated/extras, _site/.../nds.critical.min.css)
bundle_sizes:
  critical_css: 10 # nds.critical.min.css
  core_js: 41 # nds-main.min.js (loads on every page)
  total_js: 133 # main + delegated + extras (full library, demand-loaded)
---

<!-- Implementation Solution -->
<section id="about" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">About The Project</h2>
            <p class="nds-section-description">Why it was built, and what it covers.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <p>The Digital Government Authority (DGA) established a unified design language for Saudi Arabia's government websites and services. The specifications published on <a href="https://www.figma.com/@sdga" target="_blank">Figma</a> provide a clear reference; the challenge is turning that specification into maintainable, production-ready code.</p>
                <p>The DGA's official implementation is a React and Storybook component library covering the core UI components. This project provides the design system in plain HTML, CSS, and JavaScript, together with the component library, layout system, page templates, documentation, and development environment. No frontend framework is required.</p>
                <p>The system is also built for AI-assisted development. Every release ships <a href="{{ '/guides/integration-quality.html' | relative_url }}">NDS IQ</a>, a versioned instruction system that gives AI coding agents a consistent way to build with NDS.</p>
            </div>
            <div class="nds-block">
                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Disclaimer</span>
                            <p class="nds-alert-description">This is an independent community implementation, not affiliated
                                with, endorsed by, or maintained by the Digital Government Authority (DGA) or the Government
                                of Saudi Arabia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Who is this for? -->
<section id="audience" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Who It's For</h2>
            <p class="nds-section-description">Built for teams and individuals delivering, adapting, or learning government-grade web development.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid"
                    style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:32px; --dl-title-FS: var(--typo-text-xl-FS); --row-gap: 24px; --col-gap: 32px;">
                    <div class="nds-definition-item nds-card nds-shadow">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-building-06"></i>
                            <span class="nds-label">Government teams &amp; agencies</span>
                        </span>
                        <p class="nds-item-desc">Delivering DGA-aligned digital services on their existing technology stack.</p>
                    </div>
                    <div class="nds-definition-item nds-card nds-shadow">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-briefcase-01"></i>
                            <span class="nds-label">Freelancers</span>
                        </span>
                        <p class="nds-item-desc">Building client sites with a reusable component library and ready-to-use page templates.</p>
                    </div>
                    <div class="nds-definition-item nds-card nds-shadow">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-mortarboard-02"></i>
                            <span class="nds-label">Students &amp; fresh graduates</span>
                        </span>
                        <p class="nds-item-desc">Learning core HTML, CSS, and vanilla JavaScript
                            from a readable, production-grade codebase.</p>
                    </div>
                    <div class="nds-definition-item nds-card nds-shadow">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-teaching"></i>
                            <span class="nds-label">Teachers &amp; trainers</span>
                        </span>
                        <p class="nds-item-desc">Using real components, page templates, and patterns as practical material for web-development courses, bootcamps, or workshops.</p>
                    </div>
                </div>
            </div>
            <div class="nds-block">
                <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Important</span>
                            <p class="nds-alert-description">The default visual identity is exclusive to Saudi Arabia government entities. It covers design tokens, colors, logos, and the digital-stamp component. Non-government projects must replace these with the adopting organization's own identity before deployment.</p>
                        </div>
                        <div class="nds-alert-actions">
                            <a href="{{ '/components/themes.html' | relative_url }}" class="nds-link">Theming guide</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Compliance Ready -->
<section id="compliance" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Compliance Ready</h2>
            <p class="nds-section-brief">DGA page templates implemented as working code and ready to be adapted for deployment.</p>
            <p class="nds-section-description">Components follow the defined design tokens, typography, spacing, and interaction patterns. The templates below cover common government service screens and can be copied, populated with project content, and adapted for deployment.</p>
        </div>
        <div class="nds-section-body nds-max-width">
            <div class="nds-block">
                <div class="nds-swiper" data-swiper-loop style="--max-slides:3; --mid-slides:2; --min-slides:1; --peek:0px">
                    <div class="nds-swiper-wrapper">
                        {% for tpl in site.data.content.templates %}
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke nds-shadow">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            {{ tpl.icon }}
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">{{ tpl.title }}</span>
                                        <p class="nds-card-description">{{ tpl.description }}</p>
                                    </div>
                                </div>
                                {% if tpl.url %}
                                <div class="nds-card-actions">
                                    <a href="{{ tpl.url | relative_url }}" class="nds-btn nds-primary">
                                        <span class="nds-label">View Template</span>
                                    </a>
                                </div>
                                {% endif %}
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    <div class="nds-swiper-navigation" hidden>
                        <div class="nds-swiper-buttons">
                            <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                                aria-label="Previous template"></button>
                            <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                                aria-label="Next template"></button>
                        </div>
                        <div class="nds-swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Real-World Examples -->
<section id="examples" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Real-World Examples</h2>
            <p class="nds-section-description">{{ site.data.content.examples | size }} composed pages demonstrating NDS components working together in government service contexts.</p>
        </div>
        <div class="nds-section-body  nds-max-width">
            <div class="nds-block">
                <div class="nds-swiper" style="--max-slides:3; --mid-slides:2; --min-slides:1; --peek:40px">
                    <div class="nds-swiper-wrapper">
                        {% for ex in site.data.content.examples %}
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke nds-shadow">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            {{ ex.icon }}
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">{{ ex.title }}</span>
                                        <p class="nds-card-description nds-truncate" style="--truncate: 2;">{{ ex.description }}</p>
                                    </div>
                                    <div class="nds-card-tags">
                                        <span class="nds-tag nds-blue nds-sm">
                                            <span class="nds-label">{{ ex.category }}</span>
                                        </span>
                                        {% for tag in ex.tags %}
                                        <span class="nds-tag nds-gray nds-sm">
                                            <span class="nds-label">{{ tag }}</span>
                                        </span>
                                        {% endfor %}
                                    </div>
                                </div>
                                {% if ex.url %}
                                <div class="nds-card-actions">
                                    <a href="{{ ex.url | relative_url }}" class="nds-btn nds-primary">
                                        <span class="nds-label">View Page</span>
                                    </a>
                                </div>
                                {% endif %}
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    <div class="nds-swiper-navigation" hidden>
                        <div class="nds-swiper-buttons">
                            <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                                aria-label="Previous example"></button>
                            <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                                aria-label="Next example"></button>
                        </div>
                        <div class="nds-swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Event Themes -->
<section id="events" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Event Themes</h2>
            <p class="nds-section-description">Theme packs for national occasions. Each theme can be applied site-wide through a single attribute and removed to restore the default theme.</p>
        </div>
        <div class="nds-section-body  nds-max-width">
            <div class="nds-block">
                <div class="nds-swiper" style="--max-slides:3; --mid-slides:2; --min-slides:1; --peek:20px">
                    <div class="nds-swiper-wrapper">
                        {% for ev in site.data.content.events %}
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke nds-shadow">
                                <div class="nds-card-header">
                                    {% if ev.thumbnail %}
                                    <div class="nds-card-image">
                                        <img data-src="{{ ev.thumbnail | relative_url }}" width="400" height="200"
                                            alt="{{ ev.title }} theme preview" decoding="async">
                                    </div>
                                    {% else %}
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            {{ ev.icon }}
                                        </span>
                                    </div>
                                    {% endif %}
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">{{ ev.title }}</span>
                                        <p class="nds-card-description">{{ ev.description }}</p>
                                    </div>
                                    <div class="nds-card-tags">
                                        <span class="nds-tag nds-blue nds-sm">
                                            <span class="nds-label">{{ ev.category }}</span>
                                        </span>
                                        {% for tag in ev.tags %}
                                        <span class="nds-tag nds-gray nds-sm">
                                            <span class="nds-label">{{ tag }}</span>
                                        </span>
                                        {% endfor %}
                                    </div>
                                </div>
                                {% if ev.theme or ev.url %}
                                <div class="nds-card-actions">
                                    {% if ev.theme %}
                                    {%- assign _tflat = "" | split: "" -%}
                                    {%- for _g in site.data.themes -%}{%- assign _tflat = _tflat | concat: _g.list -%}{%-
                                    endfor -%}
                                    {%- assign _t = _tflat | where: 'value', ev.theme | first -%}
                                    {%- if _t %}
                                    <button type="button" class="nds-btn nds-primary" data-theme-value="{{ _t.value }}"
                                        data-theme-css="{{ _t.css | relative_url }}?ver={{ site.asset_ver }}"
                                        {%- if _t.js %}
                                        data-theme-js="{{ _t.js | relative_url }}?ver={{ site.asset_ver }}"
                                        {% endif %}>
                                        <span class="nds-label">Preview</span>
                                    </button>
                                    {%- endif %}
                                    {% endif %}
                                    {% if ev.url %}
                                    <a href="{{ ev.url | relative_url }}" class="nds-btn nds-secondary-outline">
                                        <span class="nds-label">Details</span>
                                    </a>
                                    {% endif %}
                                </div>
                                {% endif %}
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    <div class="nds-swiper-navigation" hidden>
                        <div class="nds-swiper-buttons">
                            <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                                aria-label="Previous event"></button>
                            <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                                aria-label="Next event"></button>
                        </div>
                        <div class="nds-swiper-pagination"></div>
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
            <h2 class="nds-section-title">Components ({{ site.data.content.components | size }})</h2>
            <p class="nds-section-description">Each with its markup, styling, and JavaScript behavior. All built from scratch.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-toolbar">
                <div class="nds-form-container nds-search-box" data-filter-target="components_list">
                    <div class="nds-search-content">
                        <div class="nds-form-control">
                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                            <input id="componentSearch" type="text" class="nds-search-input" name="search" autocomplete="off"
                                placeholder="Search components...">
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search"><i
                                        class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <button class="nds-btn nds-primary nds-search-btn" type="button">
                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                            <span class="nds-label" data-hidden="sm sr">Search</span>
                        </button>
                    </div>
                </div>
                <div class="nds-dropmenu nds-filter" data-filter-target="components_list">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label" data-hidden="sm sr">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" style="min-width: 300px;" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="category" data-filter-legend="Category" data-filter-type="checkbox"
                                data-no-auto-close></div>
                            <hr class="nds-divider">
                            <div data-filter="tech" data-filter-legend="Technology" data-filter-type="checkbox"
                                data-no-auto-close></div>
                            <hr class="nds-divider">
                            <div data-filter="since" data-filter-legend="Added in" data-filter-type="checkbox"
                                data-filter-accordion data-no-auto-close></div>
                        </div>
                        <div class="nds-dropmenu-footer">
                            <hr class="nds-divider">
                            <div class="nds-dropmenu-action">
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
                <div class="nds-filter-applied" data-filter-target="components_list" hidden>
                    <span class="nds-label">Applied Filters:</span>
                    <div class="nds-chips"></div>
                </div>
            </div>
            <div id="components_list" class="nds-paged-content nds-grid"
                style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">

                {% for comp in site.data.content.components %}
                <div class="nds-page-item nds-card nds-stroke">
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">{{ comp.title }}</span>
                            <p class="nds-card-description">{{ comp.description }}</p>
                        </div>
                        <div class="nds-card-tags">
                            <span class="nds-tag nds-blue nds-sm">
                                <span class="nds-label" data-filter="category">{{ comp.category }}</span>
                            </span>
                            {% for tag in comp.tags %}
                            <span class="nds-tag {{ tag.style | default: 'nds-gray' }} nds-sm">
                                <span class="nds-label" data-filter="tech">{{ tag.name | default: tag }}</span>
                            </span>
                            {% endfor %}
                            {%- assign comp_path = comp.url | split: "#" | first -%}
                            {%- assign comp_page = site.pages | where: "url", comp_path | first -%}
                            {%- if comp_page.since %}
                            {%- comment %} Same dev-target test as _includes/since.html: while the docs run ahead of
                               the release, a page stamped with the in-development target reads "Next release"
                               rather than the 1.4.x placeholder. The label is also the filter facet value. {%- endcomment %}
                            {%- assign _dev_target = site.version | remove: "-dev" %}
                            {%- if comp_page.since == _dev_target and site.version != site.latest_release %}
                            <span class="nds-tag nds-blue nds-sm">
                                <span class="nds-label" data-filter="since">Next release</span>
                            </span>
                            {%- else %}
                            <span class="nds-tag nds-green nds-sm">
                                <span class="nds-label" data-filter="since">v{{ comp_page.since }}</span>
                            </span>
                            {%- endif %}
                            {%- endif %}
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
            <nav class="nds-pagination" data-auto-pagination="components_list" aria-label="Pagination"></nav>
        </div>
    </div>
</section>

<!-- Architecture & Performance -->
<section id="architecture" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action">
                <div class="nds-progress-circle nds-lg" data-num="100" data-max="100">
                    <svg width="120" height="120" viewBox="0 0 24 24">
                        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                    </svg>
                    <div class="nds-progress-info">
                        <span class="nds-progress-out-of">
                            <span class="nds-progress-number"></span>
                            <span class="nds-progress-of"></span>
                        </span>
                        <span class="nds-progress-text">Performance</span>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="nds-section-title">Architecture & Performance</h2>
                <p class="nds-section-description">Built with a performance-first and compatibility approach.</p>
                <p>
                    <a href="https://pagespeed.web.dev/analysis/https-mazin-musleh-github-io-NDS-vanilla/v2nxjcxqob?form_factor=mobile"
                        target="_blank" rel="noopener" class="nds-color">View the PageSpeed Insights report</a>
                </p>
            </div>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid"
                    style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:32px; --dl-title-FS: var(--typo-text-xl-FS); --row-gap: 24px; --col-gap: 32px;">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-plug-socket"></i>
                            <span class="nds-label">Zero Dependencies</span>
                        </span>
                        <p class="nds-item-desc">No Bootstrap, Tailwind, jQuery, or framework runtime. The output is plain HTML, CSS, and JavaScript and can be integrated into existing stacks without introducing a framework dependency.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-cpu-charge"></i>
                            <span class="nds-label">Smart Component Loader</span>
                        </span>
                        <p class="nds-item-desc">A single DOM sweep detects the components present on a page and initializes them in priority tiers: critical components first, followed by the rest during idle time. Deferred and page-specific bundles are loaded only when their components are present, limiting each page to the JavaScript it actually uses.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-arrow-data-transfer-horizontal"></i>
                            <span class="nds-label">RTL/LTR Native</span>
                        </span>
                        <p class="nds-item-desc">Built with CSS Logical Properties from the start. Margins, padding, borders, and positioning adapt to direction without a separate RTL stylesheet or directional overrides. Switch between RTL and LTR with a single HTML attribute.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-paint-brush-01"></i>
                            <span class="nds-label">4-Tier Design Tokens</span>
                        </span>
                        <p class="nds-item-desc">Palette, primitive, semantic, and component tokens are defined as CSS custom properties. Components expose public properties for customization while keeping internal implementation details private.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-paint-board"></i>
                            <span class="nds-label">Theming & Dark Mode</span>
                        </span>
                        <p class="nds-item-desc">Light and dark modes are built in, with support for full re-branding. Generate a palette from a single OKLCH seed color, select a predefined theme, or load a stylesheet theme. Theme selection is controlled through a single HTML attribute and requires no rebuild.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-zap"></i>
                            <span class="nds-label">~{{ page.bundle_sizes.critical_css }} KB Critical CSS (gzipped)</span>
                        </span>
                        <p class="nds-item-desc">Critical styles load immediately, while non-critical styles are deferred and loaded asynchronously without blocking rendering. The build separates critical and non-critical CSS.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layers-01"></i>
                            <span class="nds-label">5-Stage Reveal</span>
                        </span>
                        <p class="nds-item-desc">First paint is divided into five render-safe stages: inline critical skeleton → critical stylesheet → main stylesheet → main JavaScript → icons and font. Each stage either renders correctly or remains hidden, preventing unstyled flashes; icons load last to stay outside the LCP window.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-code-circle"></i>
                            <span class="nds-label">~{{ page.bundle_sizes.core_js }} KB Core JS (gzipped)</span>
                        </span>
                        <p class="nds-item-desc">The full library is ~{{ page.bundle_sizes.total_js }} KB gzipped, but it is not loaded as a single bundle. A lean ~{{ page.bundle_sizes.core_js }} KB core loads on every page, while late-safe and page-specific components are loaded only when their markup is present. A typical page therefore executes only a fraction of the library.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-chart-line-data-01"></i>
                            <span class="nds-label">Web Vitals Compliant</span>
                        </span>
                        <p class="nds-item-desc">100% Google PageSpeed score, with LCP, CLS, and INP passing in the measured test. Performance is tested across desktop and mobile conditions, including fast and limited connections.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-dashboard-speed-01"></i>
                            <span class="nds-label">Sleek Animations</span>
                        </span>
                        <p class="nds-item-desc">GPU-accelerated animations and scheduled rendering keep transitions responsive, including on lower-end devices. Off-screen elements are deferred until needed.</p>
                    </div>
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
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <p>The project uses <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>, a static site generator supported by GitHub Pages. It compiles templates, stylesheets, and data files into static HTML with no external toolchain.</p>
            </div>
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid"
                    style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:32px; --dl-title-FS: var(--typo-text-xl-FS); --row-gap: 24px; --col-gap: 32px;">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-artificial-intelligence-04"></i>
                            <span class="nds-label">AI Integration</span>
                        </span>
                        <p class="nds-item-desc">NDS is designed to work with AI coding agents, with
                            <a href="{{ '/guides/integration-quality.html' | relative_url }}">NDS IQ</a> providing the
                            instructions and <a href="{{ '/guides/get-started.html' | relative_url }}">Get Started</a>
                            guiding the setup and workflow.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-paint-brush-01"></i>
                            <span class="nds-label">Sass Architecture</span>
                        </span>
                        <p class="nds-item-desc">Sass uses a modular file structure with one stylesheet per component. Shared variables, mixins, and design tokens are available across the system. Jekyll compiles and minifies the styles into the final CSS output.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-code"></i>
                            <span class="nds-label">Modular JavaScript</span>
                        </span>
                        <p class="nds-item-desc">Vanilla JavaScript uses one source file per component and is controlled by the component loader. Only components present on a page initialize. A Ruby processor bundles and minifies with <a href="https://terser.org/" target="_blank">Terser</a> into tiered outputs: a lean core plus deferred and page-specific bundles loaded on demand.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layout-03"></i>
                            <span class="nds-label">Liquid Templates</span>
                        </span>
                        <p class="nds-item-desc">Jekyll's built-in template engine supports layouts, includes, partials, loops, conditions, and data binding. Pages are composed from reusable blocks rather than duplicated markup.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-database"></i>
                            <span class="nds-label">YAML-Driven Data</span>
                        </span>
                        <p class="nds-item-desc">YAML files provide structured project data. Menus, navigation, hero content, and site configuration are stored as data and supplied to templates at build time.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-puzzle"></i>
                            <span class="nds-label">Custom Plugins</span>
                        </span>
                        <p class="nds-item-desc">Custom Ruby scripts extend Jekyll's build process for tasks such as JavaScript bundling, HTML compression, and base URL resolution. Each plugin is project-specific and editable.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Get Started -->
<section id="opensource" class="nds-content-section nds-brand">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Get Started</h2>
            <p class="nds-section-description">Everything needed to adopt NDS: download the template, install the agent instructions, build the UI page by page, and stay current with upgrades.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <a href="{{ '/guides/get-started.html' | relative_url }}" class="nds-btn nds-primary">
                    <span class="nds-label">Start Here</span>
                </a>
            </div>
        </div>
    </div>
</section>