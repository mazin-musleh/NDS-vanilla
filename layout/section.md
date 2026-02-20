---
layout: page
title: Section
hero_title: Section Layout - National Design System
hero_description: The section component provides a flexible, progressive structure for organizing page content with optional wrappers, actions, images, and full-width breakouts.
breadcrumb: ["Layout"]
lang: en
direction: ltr
---

<!-- Section Structure Overview -->
<section id="structure" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Hierarchy</h2>
            <p class="nds-section-description">The section component uses a CSS Grid for column placement and a flex wrapper for grouping head, action, image, and content.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Structure</div>
                    </div>
                    <div class="demo-container noBg">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
section.nds-content-section          (CSS Grid: full-width | breakout | content)
├── div.nds-section-wrapper          (Flex row + responsive breakpoints)
│   ├── div.nds-section-image        (optional)
│   ├── div.nds-section-head         (flex:1 — title + desc + meta)
│   │   ├── h2.nds-section-title
│   │   ├── div.nds-section-meta
│   │   └── p.nds-section-description
│   ├── div.nds-section-action       (optional, auto width)
│   └── div.nds-section-content      (full row below)
│       └── div.nds-content-block    (optional content grouping)
│           ├── h3.nds-block-title   (optional)
│           └── p, ul, ol, img...    (direct content)
└── div.nds-section-content.nds-full-width  (outside wrapper for breakout)
                            </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 1: Minimal -->
<section id="tier1" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 1 — Minimal (No Wrapper)</h2>
            <p class="nds-section-description">Simplest usage: title, description, and content as direct children of the section grid. No wrapper needed.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Minimal Section</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-blue", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Blue</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-green", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Green</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Ghost</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <h2 class="nds-section-title">Section Title</h2>
                                <p class="nds-section-description">Section description goes here. Used for simple sections with only a title and content.</p>
                                <div class="nds-section-content">
                                    <p>Section content area.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier1" id="tab-tier1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier1" aria-labelledby="tab-tier1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section">
    <h2 class="nds-section-title">Section Title</h2>
    <p class="nds-section-description">Description text.</p>
    <div class="nds-section-content">
        <!-- Content here -->
    </div>
</section>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 2: Standard with Wrapper -->
<section id="tier2" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 2 — Standard (With Wrapper)</h2>
            <p class="nds-section-description">Wrapper groups head and content with consistent gap spacing. Used for most sections.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Standard Section</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-blue", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Blue</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-green", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Green</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Ghost</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Section Title</h2>
                                        <p class="nds-section-description">Description text wrapped with content inside a section wrapper.</p>
                                    </div>
                                    <div class="nds-section-content">
                                        <p>Section content area.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier2" id="tab-tier2">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier2" aria-labelledby="tab-tier2">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Description text.</p>
        </div>
        <div class="nds-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 3: With Action -->
<section id="tier3" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 3 — With Action</h2>
            <p class="nds-section-description">Action buttons sit beside the head on desktop and drop to full-row below on tablet and smaller.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Section with Action</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-blue", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Blue</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-green", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Green</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Ghost</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Latest News</h2>
                                        <p class="nds-section-description">Stay up to date with the latest updates and announcements.</p>
                                    </div>
                                    <div class="nds-section-action">
                                        <a href="#" class="nds-btn nds-primary">
                                            <span class="label">View All</span>
                                        </a>
                                    </div>
                                    <div class="nds-section-content">
                                        <p>News cards or content goes here.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier3" id="tab-tier3">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier3" aria-labelledby="tab-tier3">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Latest News</h2>
            <p class="nds-section-description">Description text.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">View All</span>
            </a>
        </div>
        <div class="nds-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 4: With Image -->
<section id="tier4" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 4 — With Image</h2>
            <p class="nds-section-description">Image, head, and action form a flex row. Content takes full row below.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Section with Image</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-blue", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Blue</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-green", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Green</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Ghost</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-image">
                                        <div class="nds-avatar">
                                            <i class="hgi hgi-stroke hgi-user"></i>
                                        </div>
                                    </div>
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Faculty Profile</h2>
                                        <p class="nds-section-description">Professor of Computer Science, College of Engineering.</p>
                                    </div>
                                    <div class="nds-section-action">
                                        <a href="#" class="nds-btn nds-primary">
                                            <span class="label">Contact</span>
                                        </a>
                                    </div>
                                    <div class="nds-section-content">
                                        <p>Profile details and content goes here.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier4" id="tab-tier4">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier4" aria-labelledby="tab-tier4">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-image">
            <img src="..." alt="..." />
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Description text.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">Action</span>
            </a>
        </div>
        <div class="nds-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 5: Full-Width Content -->
<section id="tier5" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 5 — Full-Width Content</h2>
            <p class="nds-section-description">Content lives outside the wrapper and uses .nds-full-width to break out of the content column into edge-to-edge layout. Wrapper holds head + action only.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Full-Width Section</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-blue", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Blue</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-green", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Green</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Ghost</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Featured Services</h2>
                                        <p class="nds-section-description">Browse our full catalog of services.</p>
                                    </div>
                                    <div class="nds-section-action">
                                        <a href="#" class="nds-btn nds-primary">
                                            <span class="label">View All</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="nds-section-content nds-full-width">
                                    <p>Full-width content area (e.g., card carousel, swiper)</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier5" id="tab-tier5">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier5" aria-labelledby="tab-tier5">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Description text.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="label">View All</span>
            </a>
        </div>
    </div>
    <div class="nds-section-content nds-full-width">
        <!-- Full-width content (carousel, cards, etc.) -->
    </div>
</section>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 6: Horizontal Layout -->
<section id="tier6" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 6 — Horizontal Layout</h2>
            <p class="nds-section-description">Add .nds-horizontal to a section to switch the wrapper from flex to a two-column grid layout on desktop (head start, content end).</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Horizontal</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-blue", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Blue</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-green", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Green</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                <span class="label">Ghost</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section nds-horizontal">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Side by Side</h2>
                                        <p class="nds-section-description">Head and content are displayed in a horizontal grid on desktop screens.</p>
                                        <div class="nds-section-action">
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="label">View All</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="nds-section-content">
                                        <img src="https://placehold.co/600x400/e2e8f0/475569?text=Content+Image" alt="Placeholder image" style="border-radius: var(--radius-lg); width: 100%;">
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier6" id="tab-tier6">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier6" aria-labelledby="tab-tier6">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section nds-horizontal">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Title</h2>
            <p class="nds-section-description">Description.</p>
            <div class="nds-section-action">
                <a href="#" class="nds-btn nds-primary">
                    <span class="label">View All</span>
                </a>
            </div>
        </div>
        <div class="nds-section-content">
            <img src="..." alt="..." />
        </div>
    </div>
</section>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Content Block -->
<section id="content-block" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Block</h2>
            <p class="nds-section-description">Group content inside a section using .nds-content-block. Add an optional .nds-block-title for titled blocks. Content goes directly inside — no extra wrappers needed.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Content Block with Title</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section nds-ghost">
                                <div class="nds-section-content">
                                    <div class="nds-content-block">
                                        <h3 class="nds-block-title">Block Title</h3>
                                        <p>First paragraph of content inside the block. Paragraphs, lists, and media get automatic styling when inside .nds-content-block.</p>
                                        <p>Second paragraph to demonstrate spacing between content elements.</p>
                                    </div>
                                    <div class="nds-content-block">
                                        <h3 class="nds-block-title">Another Block</h3>
                                        <ul>
                                            <li>List items work inside content blocks</li>
                                            <li>With automatic padding and spacing</li>
                                        </ul>
                                    </div>
                                    <div class="nds-content-block">
                                        <p>Blocks without a title work too — the title is optional.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-contentblock" id="tab-contentblock">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-contentblock" aria-labelledby="tab-contentblock">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-section-content">
    <div class="nds-content-block">
        <h3 class="nds-block-title">Block Title</h3>
        <p>Content goes directly here.</p>
    </div>
    <div class="nds-content-block">
        <p>Block without a title — title is optional.</p>
    </div>
</div>
</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Grid Columns -->
<section id="grid" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Grid Columns</h2>
            <p class="nds-section-description">Every section is a CSS Grid with named columns. Direct children are placed into content, breakout, or full-width tracks.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Grid Placement</div>
                    </div>
                    <div class="demo-container noBg">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
[full-width] | [breakout] | [content] | [breakout] | [full-width]

Default child         → grid-column: content
.nds-breakout         → grid-column: breakout
.nds-full-width       → grid-column: full-width
                            </code>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-grid" id="tab-grid">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid" aria-labelledby="tab-grid">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- Default: content column -->
<div class="nds-section-content">...</div>

<!-- Wider: breakout column -->
<div class="nds-section-content nds-breakout">...</div>

<!-- Edge-to-edge: full-width column -->
<div class="nds-section-content nds-full-width">...</div>
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

<!-- Customization Tokens -->
<section id="tokens" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Customization Tokens</h2>
            <p class="nds-section-description">Override CSS custom properties to customize section appearance without modifying the source.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Visual Tokens</div>
                    </div>
                    <div class="demo-container noBg">
                        <table class="nds-table nds-striped">
                            <thead>
                                <tr>
                                    <th>Token</th>
                                    <th>Default</th>
                                    <th>Scope</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>--section-bg</td>
                                    <td>var(--background-white)</td>
                                    <td>.nds-content-section</td>
                                </tr>
                                <tr>
                                    <td>--section-shadow</td>
                                    <td>none</td>
                                    <td>.nds-content-section</td>
                                </tr>
                                <tr>
                                    <td>--section-border</td>
                                    <td>none</td>
                                    <td>.nds-content-section</td>
                                </tr>
                                <tr>
                                    <td>--section-border-radius</td>
                                    <td>0</td>
                                    <td>.nds-content-section</td>
                                </tr>
                                <tr>
                                    <td>--section-title-FS</td>
                                    <td>clamp(24px, 3vw, 36px)</td>
                                    <td>.nds-content-section, .nds-hero-section</td>
                                </tr>
                                <tr>
                                    <td>--section-title-LH</td>
                                    <td>clamp(30px, 3.67vw, 44px)</td>
                                    <td>.nds-content-section, .nds-hero-section</td>
                                </tr>
                                <tr>
                                    <td>--section-title-MB</td>
                                    <td>clamp(7.5px, 0.9175vw, 11px)</td>
                                    <td>.nds-content-section, .nds-hero-section</td>
                                </tr>
                                <tr>
                                    <td>--section-description-FS</td>
                                    <td>clamp(16px, 1.5vw, 18px)</td>
                                    <td>.nds-content-section, .nds-hero-section</td>
                                </tr>
                                <tr>
                                    <td>--section-description-LH</td>
                                    <td>clamp(24px, 2.17vw, 26px)</td>
                                    <td>.nds-content-section, .nds-hero-section</td>
                                </tr>
                                <tr>
                                    <td>--section-description-MB</td>
                                    <td>var(--spacing-2xl)</td>
                                    <td>.nds-content-section, .nds-hero-section</td>
                                </tr>
                                <tr>
                                    <td>--section-col-gap</td>
                                    <td>var(--spacing-xl)</td>
                                    <td>.nds-section-wrapper</td>
                                </tr>
                                <tr>
                                    <td>--section-row-gap</td>
                                    <td>var(--spacing-xl)</td>
                                    <td>.nds-section-wrapper</td>
                                </tr>
                                <tr>
                                    <td>--block-title-FS</td>
                                    <td>var(--nds-text-xl-FS)</td>
                                    <td>.nds-block-title</td>
                                </tr>
                                <tr>
                                    <td>--block-title-LH</td>
                                    <td>var(--nds-text-xl-LH)</td>
                                    <td>.nds-block-title</td>
                                </tr>
                                <tr>
                                    <td>--block-title-FW</td>
                                    <td>600</td>
                                    <td>.nds-block-title</td>
                                </tr>
                                <tr>
                                    <td>--block-title-MB</td>
                                    <td>var(--spacing-lg)</td>
                                    <td>.nds-block-title</td>
                                </tr>
                                <tr>
                                    <td>--block-title-color</td>
                                    <td>var(--text-display)</td>
                                    <td>.nds-block-title</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SCSS Architecture -->
<section id="scss" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">SCSS Architecture</h2>
            <p class="nds-section-description">The section component is split across 3 focused SCSS files with clear separation of concerns.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">File Structure</div>
                    </div>
                    <div class="demo-container noBg">
                        <table class="nds-table nds-striped">
                            <thead>
                                <tr>
                                    <th>File</th>
                                    <th>Role</th>
                                    <th>Contains</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>_sass/components/_section.scss</td>
                                    <td>Component base</td>
                                    <td>Visual tokens, typography tokens, head, title, description, meta, action, content</td>
                                </tr>
                                <tr>
                                    <td>_sass/layout/_sectionLayout.scss</td>
                                    <td>Layout overrides</td>
                                    <td>Wrapper, cardView, 404, sideInfo, horizontal, striping</td>
                                </tr>
                                <tr>
                                    <td>_sass/layout/_contentLayout.scss</td>
                                    <td>Page layout</td>
                                    <td>CSS Grid system, .nds-content-layout variants, side menu, mobile</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>