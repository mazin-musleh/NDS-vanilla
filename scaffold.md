---
layout: page
title: Page Scaffold
hero_title: Page Front Matter Reference
hero_description: A complete reference of all available front matter variables for NDS pages
breadcrumb: ["Layout"]
lang: en
direction: ltr
exclude_showcase: true
---

<!-- Required Variables -->
<section id="required" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Required Variables</h2>
            <p class="nds-section-description">Every page must include these front matter variables.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Required</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>layout</td>
                                <td>string</td>
                                <td>Page template. One of: page, home, post, empty, minimal, cardView, dashboard</td>
                            </tr>
                            <tr>
                                <td>title</td>
                                <td>string</td>
                                <td>Page title. Shown in browser tab as title | site.title</td>
                            </tr>
                            <tr>
                                <td>lang</td>
                                <td>string</td>
                                <td>Language code. Sets html lang attribute. Values: en, ar. Default: en</td>
                            </tr>
                            <tr>
                                <td>direction</td>
                                <td>string</td>
                                <td>Text direction. Sets html dir attribute. Values: ltr, rtl. Default: ltr</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-required" id="tab-required">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-required" aria-labelledby="tab-required">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
---
layout: page
title: My Page Title
lang: en
direction: ltr
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Hero Section Variables -->
<section id="hero" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Hero Section</h2>
            <p class="nds-section-description">Variables that control the hero banner displayed at the top of every page.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Hero</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>hero_title</td>
                                <td>string</td>
                                <td>Main heading inside the hero section. Falls back to site.hero_title</td>
                            </tr>
                            <tr>
                                <td>hero_description</td>
                                <td>string</td>
                                <td>Subtitle/description below the hero title. Falls back to site.hero_description</td>
                            </tr>
                            <tr>
                                <td>hero_style</td>
                                <td>string</td>
                                <td>Hero display style. Values: flat, aside. Applied as class on .nds-hero-section</td>
                            </tr>
                            <tr>
                                <td>hero_image</td>
                                <td>string</td>
                                <td>Path to hero background image (home layout). Falls back to site.hero_image</td>
                            </tr>
                            <tr>
                                <td>hero_image_small</td>
                                <td>string</td>
                                <td>Small version of hero image for responsive srcset (600w). Falls back to site.hero_image_small</td>
                            </tr>
                            <tr>
                                <td>hero_image_sub</td>
                                <td>string</td>
                                <td>Background image for sub-page hero sections. Falls back to site.hero_image_sub</td>
                            </tr>
                            <tr>
                                <td>hero_tags</td>
                                <td>array</td>
                                <td>Inline tag data for hero meta section. Each item: {label, style, icon, modifiers}. Overrides data file tags</td>
                            </tr>
                            <tr>
                                <td>hero_actions</td>
                                <td>array</td>
                                <td>Inline action buttons for hero. Each item: {label, url, style, icon, icon_position, target, aria_label}. Overrides data file</td>
                            </tr>
                            <tr>
                                <td>hero_sliders</td>
                                <td>array</td>
                                <td>Inline slider data for home hero carousel. Each item: {title, description, src, src_small, url, overlay, position}</td>
                            </tr>
                            <tr>
                                <td>heroaction</td>
                                <td>string</td>
                                <td>Name of the data file for hero actions/tags. E.g. heroaction-service loads _data/heroaction-service.yml. Default: heroaction</td>
                            </tr>
                            <tr>
                                <td>herosliders</td>
                                <td>string</td>
                                <td>Name of the data file for hero sliders. E.g. herosliders-about loads _data/herosliders-about.yml. Default: herosliders</td>
                            </tr>
                            <tr>
                                <td>hide_share_page</td>
                                <td>boolean</td>
                                <td>Set true to hide the "Share Page" dropdown button in the hero section</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-hero" id="tab-hero">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hero" aria-labelledby="tab-hero">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
---
hero_title: My Page - National Design System
hero_description: A brief description of this page
hero_style: flat
heroaction: heroaction-service
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Navigation Variables -->
<section id="navigation" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Navigation</h2>
            <p class="nds-section-description">Variables that control breadcrumb and side menu navigation.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Navigation</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>breadcrumb</td>
                                <td>array</td>
                                <td>Breadcrumb trail. Simple: ["Components"]. With URLs: [["Parent", "/url"]]. Current page title is appended automatically</td>
                            </tr>
                            <tr>
                                <td>breadcrumb_root</td>
                                <td>string</td>
                                <td>Override the root breadcrumb label. Default: "Home" (en) / "الرئيسية" (ar)</td>
                            </tr>
                            <tr>
                                <td>breadcrumb_root_url</td>
                                <td>string</td>
                                <td>Override the root breadcrumb URL. Default: /</td>
                            </tr>
                            <tr>
                                <td>sidemenu</td>
                                <td>string</td>
                                <td>Name of an alternate side menu data file. E.g. college-sidemenu loads _data/college-sidemenu.yml. Default: sidemenu</td>
                            </tr>
                            <tr>
                                <td>hideSidemenu</td>
                                <td>boolean</td>
                                <td>Set true to hide side navigation (page layout only). Removes wSideMenu class from layout</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-nav" id="tab-nav">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-nav" aria-labelledby="tab-nav">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
# Simple breadcrumb
---
breadcrumb: ["Components"]
---

# Breadcrumb with custom URLs
---
breadcrumb:
  - ["Faculty", "/faculty"]
  - ["Programs", "/programs"]
---

# Custom side menu
---
sidemenu: college-sidemenu
---

# No side menu
---
hideSidemenu: true
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Layout & Body Variables -->
<section id="layout-vars" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Layout & Body</h2>
            <p class="nds-section-description">Variables that control CSS classes on the body and main layout container.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Layout</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>body_class</td>
                                <td>string</td>
                                <td>Extra CSS class(es) on the body element. E.g. fullWidth</td>
                            </tr>
                            <tr>
                                <td>layout_class</td>
                                <td>string</td>
                                <td>Extra CSS class(es) on .nds-content-layout. Common values: nds-middle, toEdge, wSideInfo, topSubMenu</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-layout-vars" id="tab-layout-vars">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-layout-vars" aria-labelledby="tab-layout-vars">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
# Centered layout (login, 404)
---
layout: minimal
layout_class: nds-middle
---

# Edge-to-edge with side info
---
layout: page
layout_class: toEdge wSideInfo
---

# Full-width body
---
body_class: fullWidth
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Custom Assets Variables -->
<section id="assets" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom Assets</h2>
            <p class="nds-section-description">Load additional CSS or JavaScript files on a per-page basis.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Assets</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>custom_css</td>
                                <td>array</td>
                                <td>Additional CSS files to load with deferred preload. Paths relative to site root</td>
                            </tr>
                            <tr>
                                <td>custom_js</td>
                                <td>array</td>
                                <td>Additional JavaScript files to load with defer. Paths relative to site root</td>
                            </tr>
                            <tr>
                                <td>css_files</td>
                                <td>array</td>
                                <td>Alias for additional CSS files (used in some component pages)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-assets" id="tab-assets">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-assets" aria-labelledby="tab-assets">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
---
custom_css:
  - assets/css/nds-accordion.css
  - assets/css/nds-datepicker.css
custom_js:
  - assets/js/nds-charts.min.js
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Behavior Flags -->
<section id="flags" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Behavior Flags</h2>
            <p class="nds-section-description">Boolean flags that toggle page-level behavior.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Flags</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>exclude_showcase</td>
                                <td>boolean</td>
                                <td>Set true to skip loading nds-showcase.min.js. Use on pages that don't need demo toggle functionality</td>
                            </tr>
                            <tr>
                                <td>hide_share_page</td>
                                <td>boolean</td>
                                <td>Set true to hide the share page dropdown in the hero section</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-flags" id="tab-flags">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-flags" aria-labelledby="tab-flags">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
---
exclude_showcase: true
hide_share_page: true
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Post-Specific Variables -->
<section id="post" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Post-Specific</h2>
            <p class="nds-section-description">Variables used only with the post layout.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Post</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>date</td>
                                <td>date</td>
                                <td>Publication date in Jekyll format. E.g. 2025-01-15</td>
                            </tr>
                            <tr>
                                <td>author</td>
                                <td>string</td>
                                <td>Author name displayed on the post</td>
                            </tr>
                            <tr>
                                <td>hero_image</td>
                                <td>string</td>
                                <td>Featured image path for the post hero</td>
                            </tr>
                            <tr>
                                <td>hero_image_pos</td>
                                <td>string</td>
                                <td>CSS object-position for the hero image. E.g. 50% 30%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-post" id="tab-post">
                                <span class="nds-tab-label">YAML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-post" aria-labelledby="tab-post">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
---
layout: post
title: Article Title
date: 2025-01-15
author: Digital Government Authority
hero_image: assets/img/article-hero.webp
hero_image_pos: 50% 30%
hero_style: flat
lang: ar
direction: rtl
breadcrumb: ["News"]
---
</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Full Examples -->
<section id="examples" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Full Page Examples</h2>
            <p class="nds-section-description">Complete front matter blocks for common page types.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Component Page</div>
                </div>
                <div class="demo-container noBg">
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-ex-component" id="tab-ex-component">
                                    <span class="nds-tab-label">YAML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ex-component" aria-labelledby="tab-ex-component">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
<code class="lang-html code">
---
layout: page
title: Buttons
hero_title: Button Components - National Design System
hero_description: A comprehensive collection of button styles
breadcrumb: ["Components"]
lang: en
direction: ltr
---
</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Arabic Page (RTL)</div>
                </div>
                <div class="demo-container noBg">
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-ex-arabic" id="tab-ex-arabic">
                                    <span class="nds-tab-label">YAML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ex-arabic" aria-labelledby="tab-ex-arabic">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
<code class="lang-html code">
---
layout: page
title: الخدمات الإلكترونية
hero_title: الخدمات الإلكترونية
hero_description: استعرض جميع الخدمات المتاحة
breadcrumb: ["الخدمات"]
lang: ar
direction: rtl
---
</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Minimal / Login</div>
                </div>
                <div class="demo-container noBg">
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-ex-minimal" id="tab-ex-minimal">
                                    <span class="nds-tab-label">YAML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ex-minimal" aria-labelledby="tab-ex-minimal">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
<code class="lang-html code">
---
layout: minimal
title: Login
layout_class: nds-middle
exclude_showcase: true
lang: en
direction: ltr
---
</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Dashboard</div>
                </div>
                <div class="demo-container noBg">
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-ex-dashboard" id="tab-ex-dashboard">
                                    <span class="nds-tab-label">YAML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ex-dashboard" aria-labelledby="tab-ex-dashboard">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
<code class="lang-html code">
---
layout: dashboard
title: Dashboard
body_class: fullWidth
layout_class: topSubMenu
hero_title: Dashboard Overview
hero_description: Monitor your key metrics
breadcrumb: ["Dashboard"]
lang: en
direction: ltr
exclude_showcase: true
---
</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Layout Comparison -->
<section id="layouts" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Available Layouts</h2>
            <p class="nds-section-description">Quick reference for each layout template and what it provides.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Layouts</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Layout</th>
                                <th>Header</th>
                                <th>Hero</th>
                                <th>Side Menu</th>
                                <th>Footer</th>
                                <th>Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>home</td>
                                <td>Yes</td>
                                <td>Main (slider)</td>
                                <td>No</td>
                                <td>Yes</td>
                                <td>Landing / homepage</td>
                            </tr>
                            <tr>
                                <td>page</td>
                                <td>Yes</td>
                                <td>Sub</td>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>Standard documentation / content pages</td>
                            </tr>
                            <tr>
                                <td>post</td>
                                <td>Yes</td>
                                <td>Sub</td>
                                <td>No</td>
                                <td>Yes</td>
                                <td>News articles / blog posts</td>
                            </tr>
                            <tr>
                                <td>cardView</td>
                                <td>Yes</td>
                                <td>Sub</td>
                                <td>No</td>
                                <td>Yes</td>
                                <td>Card-based content (services, portals)</td>
                            </tr>
                            <tr>
                                <td>dashboard</td>
                                <td>Yes</td>
                                <td>Sub</td>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>Admin dashboards with side menu</td>
                            </tr>
                            <tr>
                                <td>empty</td>
                                <td>Yes</td>
                                <td>No</td>
                                <td>No</td>
                                <td>Yes</td>
                                <td>Custom full-control pages</td>
                            </tr>
                            <tr>
                                <td>minimal</td>
                                <td>No</td>
                                <td>No</td>
                                <td>No</td>
                                <td>No</td>
                                <td>Login, registration, 404</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
