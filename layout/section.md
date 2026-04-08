---
layout: page
title: Section
hero_title: Section Layout - National Design System
hero_description: A structured container for organizing page content into titled blocks with optional actions, images, color themes, and full-width breakout areas.
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
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Section Structure</div>
                    </div>
                    <div class="demo-container nds-noBg">
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
│   ├── div.nds-section-head         (flex:1, title + desc + meta)
│   │   ├── div.nds-section-action   (optional float, must be first child)
│   │   │                            Modifiers: .nds-minimal (icon-only on mobile) | .nds-wrap (allow wrap)
│   │   ├── h2.nds-section-title
│   │   ├── div.nds-section-meta
│   │   └── p.nds-section-description
│   ├── div.nds-section-action       (optional, auto width. Add .nds-nowrap to keep inline on mobile)
│   └── div.nds-section-body      (full row below)
│       └── div.nds-content-block    (optional content grouping)
│           ├── h3.nds-block-title   (optional)
│           └── p, ul, ol, img...    (direct content)
└── div.nds-section-body.nds-full-width  (outside wrapper for breakout)
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
            <h2 class="nds-section-title">Tier 1: Minimal (No Wrapper)</h2>
            <p class="nds-section-description">Simplest usage: title, description, and content as direct children of the section grid. No wrapper needed.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <h2 class="nds-section-title">Section Title</h2>
                                <p class="nds-section-description">Section description goes here. Used for simple sections with only a title and content.</p>
                                <div class="nds-section-body">
                                    <p>Section content area.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
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
    <p class="nds-section-description">Section description goes here. Used for simple sections with only a title and content.</p>
    <div class="nds-section-body">
        <p>Section content area.</p>
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
    </div>
</section>

<!-- Tier 2: Standard with Wrapper -->
<section id="tier2" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 2: Standard (With Wrapper)</h2>
            <p class="nds-section-description">Wrapper groups head and content with consistent gap spacing. Used for most sections.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
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
                                    <div class="nds-section-body">
                                        <p>Section content area.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
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
            <p class="nds-section-description">Description text wrapped with content inside a section wrapper.</p>
        </div>
        <div class="nds-section-body">
            <p>Section content area.</p>
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
    </div>
</section>

<!-- Tier 3: With Action -->
<section id="tier3" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 3: With Action</h2>
            <p class="nds-section-description">Action buttons sit beside the head on desktop and drop to full-row below on tablet and smaller.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
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
                                            <span class="nds-label">View All</span>
                                        </a>
                                    </div>
                                    <div class="nds-section-body">
                                        <p>News cards or content goes here.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
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
            <p class="nds-section-description">Stay up to date with the latest updates and announcements.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="nds-label">View All</span>
            </a>
        </div>
        <div class="nds-section-body">
            <p>News cards or content goes here.</p>
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
    </div>
</section>

<!-- Float Action -->
<section id="float-action" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Float Action</h2>
            <p class="nds-section-description">Place the action as the <strong>first child</strong> inside the section head. It floats to the inline-end, letting the title and description text wrap around it. Not compatible with .nds-center or .nds-horizontal layouts. Add <strong>.nds-minimal</strong> to hide button labels on mobile (icon-only) or <strong>.nds-wrap</strong> to allow items to wrap.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-minimal", ".nds-section-head > .nds-section-action", "floatMod"]'>
                                <span class="nds-label">Minimal</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-wrap", ".nds-section-head > .nds-section-action", "floatMod"]'>
                                <span class="nds-label">Wrap</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <div class="nds-section-action">
                                            <a href="#" class="nds-btn nds-primary" aria-label="View All">
                                                <i class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i>
                                                <span class="nds-label">View All</span>
                                            </a>
                                        </div>
                                        <h2 class="nds-section-title">Section Title</h2>
                                        <p class="nds-section-description">The action button floats to the inline-end corner while the title and description text wrap around it naturally. This creates a compact layout without the action taking its own flex row.</p>
                                    </div>
                                    <div class="nds-section-body">
                                        <p>Section content area.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-float" id="tab-float">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-float" aria-labelledby="tab-float">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action">
                <a href="#" class="nds-btn nds-primary" aria-label="View All">
                    <i class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i>
                    <span class="nds-label">View All</span>
                </a>
            </div>
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">The action button floats to the inline-end corner while the title and description text wrap around it naturally. This creates a compact layout without the action taking its own flex row.</p>
        </div>
        <div class="nds-section-body">
            <p>Section content area.</p>
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
    </div>
</section>

<!-- Dual Action -->
<section id="dual-action" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dual Action</h2>
            <p class="nds-section-description">A section can have both a float action inside the head and a standard action outside. The outside action automatically wraps to a full row when a float action is present.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section nds-ghost">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <div class="nds-section-action">
                                            <a href="#" class="nds-btn nds-subtle">
                                                <i class="hgi hgi-stroke hgi-share-01"></i>
                                                <span class="nds-label">Share</span>
                                            </a>
                                        </div>
                                        <h2 class="nds-section-title">Section Title</h2>
                                        <p class="nds-section-description">Float action in the head, standard action outside for secondary controls.</p>
                                    </div>
                                    <div class="nds-section-action">
                                        <a href="#" class="nds-btn nds-primary">
                                            <span class="nds-label">View All</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-secondary-outline">
                                            <span class="nds-label">Download</span>
                                        </a>
                                    </div>
                                    <div class="nds-section-body">
                                        <p>Section content area.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-dual" id="tab-dual">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-dual" aria-labelledby="tab-dual">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section nds-ghost">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action">
                <a href="#" class="nds-btn nds-subtle">
                    <i class="hgi hgi-stroke hgi-share-01"></i>
                    <span class="nds-label">Share</span>
                </a>
            </div>
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">Float action in the head, standard action outside for secondary controls.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="nds-label">View All</span>
            </a>
            <a href="#" class="nds-btn nds-secondary-outline">
                <span class="nds-label">Download</span>
            </a>
        </div>
        <div class="nds-section-body">
            <p>Section content area.</p>
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
    </div>
</section>

<!-- nds-nowrap Modifier -->
<section id="nowrap" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Action Wrapping: nds-nowrap</h2>
            <p class="nds-section-description">By default, the standard action wraps to a full row on mobile. Add .nds-nowrap to keep it inline.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section nds-ghost">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Section Title</h2>
                                        <p class="nds-section-description">The action stays inline on all breakpoints.</p>
                                    </div>
                                    <div class="nds-section-action nds-nowrap">
                                        <a href="#" class="nds-btn nds-primary nds-sm">
                                            <span class="nds-label">Action</span>
                                        </a>
                                    </div>
                                    <div class="nds-section-body">
                                        <p>Resize the browser to mobile width. The action stays beside the head.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-nowrap" id="tab-nowrap">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-nowrap" aria-labelledby="tab-nowrap">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<section class="nds-content-section nds-ghost">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Title</h2>
            <p class="nds-section-description">The action stays inline on all breakpoints.</p>
        </div>
        <div class="nds-section-action nds-nowrap">
            <a href="#" class="nds-btn nds-primary nds-sm">
                <span class="nds-label">Action</span>
            </a>
        </div>
        <div class="nds-section-body">
            <p>Resize the browser to mobile width. The action stays beside the head.</p>
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
    </div>
</section>

<!-- Tier 4: With Image -->
<section id="tier4" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 4: With Image</h2>
            <p class="nds-section-description">Image, head, and action form a flex row. Content takes full row below.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
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
                                            <span class="nds-label">Contact</span>
                                        </a>
                                    </div>
                                    <div class="nds-section-body">
                                        <p>Profile details and content goes here.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
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
                <span class="nds-label">Contact</span>
            </a>
        </div>
        <div class="nds-section-body">
            <p>Profile details and content goes here.</p>
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
    </div>
</section>

<!-- Tier 5: Full-Width Content -->
<section id="tier5" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 5: Full-Width Content</h2>
            <p class="nds-section-description">Content lives outside the wrapper and uses .nds-full-width to break out of the content column into edge-to-edge layout. Wrapper holds head + action only.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Related Services</h2>
                                        <p class="nds-section-description">Explore other government digital services that may be relevant to you.</p>
                                    </div>
                                    <div class="nds-section-action">
                                        <a href="#" class="nds-btn nds-primary">
                                            <span class="nds-label">View All</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="nds-section-body nds-full-width">
                                    <div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="40" hidden>
                                        <div class="nds-swiper-wrapper">
                                            {% for service in site.data.content.services limit:6 %}
                                            <div class="nds-swiper-slide">
                                                <div class="nds-card nds-stroke">
                                                    <div class="nds-card-header">
                                                        <div class="nds-card-featured-icon">
                                                            <span class="nds-featured-icon nds-circle nds-xl">
                                                                {{ service.icon }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="nds-card-content">
                                                        <div class="nds-card-text">
                                                            <h3 class="nds-card-title nds-truncate">{{ service.title }}</h3>
                                                            <span class="nds-card-description nds-truncate">{{ service.description }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="nds-card-actions">
                                                        <a href="#" class="nds-btn nds-secondary-outline nds-lg" aria-label="Service Details">
                                                            <span class="nds-label">Details</span>
                                                        </a>
                                                        <a href="#" class="nds-btn nds-primary nds-lg nds-trail-icon" aria-label="Get Started">
                                                            <span class="nds-label">Get Started</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {% endfor %}
                                        </div>
                                        <div class="nds-swiper-navigation">
                                            <div class="nds-swiper-buttons">
                                                <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-swiper-button-prev" type="button" aria-label="Previous slide"><i class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                                                <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-swiper-button-next" type="button" aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                                            </div>
                                            <div class="nds-swiper-pagination"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier5" id="tab-tier5">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-tier5" aria-labelledby="tab-tier5">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                <code class="lang-html code">
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Related Services</h2>
            <p class="nds-section-description">Explore other government digital services that may be relevant to you.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="nds-label">View All</span>
            </a>
        </div>
    </div>
    <div class="nds-section-body nds-full-width">
        <div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="40" hidden>
            <div class="nds-swiper-wrapper">
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-xl">
                                    <i class="hgi hgi-stroke hgi-user-id-verification nds-icon"></i>
                                </span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <h3 class="nds-card-title nds-truncate">Identity Verification</h3>
                                <span class="nds-card-description nds-truncate">Verify your national identity and obtain digital certificates.</span>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline nds-lg"><span class="nds-label">Details</span></a>
                            <a href="#" class="nds-btn nds-primary nds-lg nds-trail-icon"><span class="nds-label">Get Started</span></a>
                        </div>
                    </div>
                </div>
                <!-- more slides... -->
            </div>
            <div class="nds-swiper-navigation">
                <div class="nds-swiper-buttons">
                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-swiper-button-prev" type="button" aria-label="Previous slide"><i class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-swiper-button-next" type="button" aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                </div>
                <div class="nds-swiper-pagination"></div>
            </div>
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
        </div>
    </div>
</section>

<!-- Tier 6: Horizontal Layout -->
<section id="tier6" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 6: Horizontal Layout</h2>
            <p class="nds-section-description">Add .nds-horizontal to a section to switch the wrapper from flex to a two-column grid layout on desktop (head start, content end).</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-content-section", "sectionLayout"]'>
                                <span class="nds-label">Center</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section nds-horizontal">
                                <div class="nds-section-wrapper nds-grid">
                                    <div class="nds-section-head col-sm-12 col-lg-5">
                                        <h2 class="nds-section-title">Side by Side</h2>
                                        <p class="nds-section-description">Head and content are displayed in a horizontal grid on desktop screens.</p>
                                        <div class="nds-section-action">
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">View All</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="nds-section-body col-sm-12 col-lg-7">
                                        <img src="https://placehold.co/600x400/e2e8f0/475569?text=Content+Image" alt="Placeholder image" style="border-radius: var(--radius-lg); width: 100%;">
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
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
    <div class="nds-section-wrapper nds-grid">
        <div class="nds-section-head col-sm-12 col-lg-5">
            <h2 class="nds-section-title">Side by Side</h2>
            <p class="nds-section-description">Head and content are displayed in a horizontal grid on desktop screens.</p>
            <div class="nds-section-action">
                <a href="#" class="nds-btn nds-primary">
                    <span class="nds-label">View All</span>
                </a>
            </div>
        </div>
        <div class="nds-section-body col-sm-12 col-lg-7">
            <img src="https://placehold.co/600x400/e2e8f0/475569?text=Content+Image" alt="Placeholder image" style="border-radius: var(--radius-lg); width: 100%;">
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
    </div>
</section>

<!-- Content Block -->
<section id="content-block" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Block</h2>
            <p class="nds-section-description">Group content inside a section using .nds-content-block. Add an optional .nds-block-title for titled blocks. Content goes directly inside, no extra wrappers needed.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Variant</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-neutral", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-primary", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-gradient-green", ".nds-content-section", "sectionColor"], ["nds-oncolor", ".nds-btn", "sectionColor", "add"]]'>
                                            <span class="nds-label">Gradient Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-brand", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Brand</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-ghost", ".nds-content-section", "sectionColor"]'>
                                            <span class="nds-label">Ghost</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section">
                                <div class="nds-section-body">
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
                                        <p>Blocks without a title work too. The title is optional.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
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
<section class="nds-content-section">
    <div class="nds-section-body">
        <div class="nds-content-block">
            <h3 class="nds-block-title">Block Title</h3>
            <p>First paragraph of content inside the block.</p>
            <p>Second paragraph to demonstrate spacing.</p>
        </div>
        <div class="nds-content-block">
            <h3 class="nds-block-title">Another Block</h3>
            <ul>
                <li>List items work inside content blocks</li>
                <li>With automatic padding and spacing</li>
            </ul>
        </div>
        <div class="nds-content-block">
            <p>Blocks without a title work too. The title is optional.</p>
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
    </div>
</section>

<!-- Built-in Features -->
<section id="sectionFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01 nds-icon"></i>
                        <span class="nds-label">Progressive Tiers</span>
                    </span>
                    <p class="nds-item-desc">Start with a minimal title and body, then layer in wrappers, actions, images, and full-width breakouts as the layout demands.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board nds-icon"></i>
                        <span class="nds-label">Color Themes</span>
                    </span>
                    <p class="nds-item-desc">Apply primary, neutral, brand, gradient, or ghost backgrounds with a single class. Text colors adapt automatically to maintain contrast.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-02 nds-icon"></i>
                        <span class="nds-label">Horizontal Layout</span>
                    </span>
                    <p class="nds-item-desc">Switch to a side-by-side grid with <code class="nds-inline-code lang-html">nds-horizontal</code> for sections where the head and content sit next to each other on desktop.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-move-02 nds-icon"></i>
                        <span class="nds-label">Float and Dual Actions</span>
                    </span>
                    <p class="nds-item-desc">Place actions beside the title as a float, outside the head as a standard row, or both at once for primary and secondary controls.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-expand-01 nds-icon"></i>
                        <span class="nds-label">Full-Width Breakout</span>
                    </span>
                    <p class="nds-item-desc">Content marked with <code class="nds-inline-code lang-html">nds-full-width</code> breaks out of the content column to span edge-to-edge, ideal for carousels and media.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-font nds-icon"></i>
                        <span class="nds-label">Fluid Typography</span>
                    </span>
                    <p class="nds-item-desc">Title and description sizes scale smoothly between mobile and desktop using clamp-based tokens, with every value overridable through CSS custom properties.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="sectionGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use sections as the <strong>primary building block</strong> for all page content. Every distinct content area on a page should be wrapped in its own <code class="nds-inline-code lang-html">nds-content-section</code></li>
                    <li>Use <strong>Tier 2 (with wrapper)</strong> as the default starting point. Only drop to Tier 1 for truly minimal sections that need no action or image</li>
                    <li>Use <strong>full-width breakout</strong> for content that benefits from edge-to-edge display: carousels, <a class="nds-color" href="{{ 'components/swiper' | relative_url }}">Swiper</a> components, wide image galleries, or full-bleed media</li>
                    <li>Use <strong>horizontal layout</strong> for marketing-style sections where a text block and visual sit side by side, like feature highlights or call-to-action blocks</li>
                    <li>Do not use sections for small inline UI elements. Use <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Cards</a> for self-contained content items, or <a class="nds-color" href="{{ 'components/accordion' | relative_url }}">Accordion</a> for collapsible groups</li>
                    <li>Do not nest <code class="nds-inline-code lang-html">nds-content-section</code> inside another <code class="nds-inline-code lang-html">nds-content-section</code>. Use <code class="nds-inline-code lang-html">nds-content-block</code> to subdivide content within a section</li>
                    <li>Choose <strong>float action</strong> when the action is secondary and the title area has room. Choose <strong>standard action</strong> when the action buttons are prominent and should have their own row on mobile</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-nowrap</code> to the action container only when the action is compact (a single small button) and should stay inline at all breakpoints</li>
                    <li>Use color themes sparingly. Reserve <code class="nds-inline-code lang-html">nds-primary</code> and <code class="nds-inline-code lang-html">nds-gradient-green</code> for hero-level emphasis, and <code class="nds-inline-code lang-html">nds-brand</code> or <code class="nds-inline-code lang-html">nds-ghost</code> for subtle visual separation between adjacent sections</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Centers all section content (head, action, body) in a column layout</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-horizontal</code></td><td>Switches the wrapper to a two-column grid on desktop (head start, content end)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-primary</code></td><td>Dark green background with on-color text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-green</code></td><td>Dark green background with on-color text (alias for nds-primary)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-gradient-green</code></td><td>Diagonal gradient background, direction-aware (flips for RTL/LTR)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Dark neutral background with on-color text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-brand</code></td><td>Light brand background with inset shadow, adapts for dark mode</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ghost</code></td><td>Removes all background, border, and shadow (transparent section)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-full-width</code></td><td>On <code class="nds-inline-code lang-html">nds-section-body</code>: breaks out of content column to span edge-to-edge</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-breakout</code></td><td>On <code class="nds-inline-code lang-html">nds-section-body</code>: wider than content column but not full-width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-minimal</code></td><td>On float action: hides button labels on mobile (icon-only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-wrap</code></td><td>On float action: allows action to wrap below the title on mobile instead of floating</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-nowrap</code></td><td>On standard action: keeps action inline at all breakpoints instead of wrapping to full row</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-noBg</code></td><td>Removes section background, border, and shadow (alias for nds-ghost)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive nds-striped" style="--min-width:600px;">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--section-bg</code></td><td>var(--background-default)</td><td>Section background color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-shadow</code></td><td>none</td><td>Section box shadow</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-border</code></td><td>none</td><td>Section border</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-border-radius</code></td><td>0</td><td>Section border radius</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-title-color</code></td><td>var(--text-display)</td><td>Title text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-subtitle-color</code></td><td>var(--text-secondary-paragraph)</td><td>Subtitle text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-description-color</code></td><td>var(--text-default)</td><td>Description text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-text-color</code></td><td>inherit</td><td>General text color inside section</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-padding-block</code></td><td>var(--spacing-5xl)</td><td>Vertical padding shorthand (top and bottom)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-padding-block-start</code></td><td>var(--section-padding-block)</td><td>Top padding override</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-padding-block-end</code></td><td>var(--section-padding-block)</td><td>Bottom padding override</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-margin-block-start</code></td><td>0</td><td>Top margin</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-margin-block-end</code></td><td>0</td><td>Bottom margin</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-col-gap</code></td><td>var(--spacing-xl)</td><td>Column gap between head and action in the wrapper</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-row-gap</code></td><td>var(--spacing-4xl)</td><td>Row gap between wrapper children</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-title-FS</code></td><td>var(--nds-display-clamp-md-FS)</td><td>Title font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-title-LH</code></td><td>var(--nds-display-clamp-md-LH)</td><td>Title line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-title-MB</code></td><td>var(--nds-display-clamp-md-MB)</td><td>Title bottom margin</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-subtitle-FS</code></td><td>var(--nds-text-clamp-lg-FS)</td><td>Subtitle font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-subtitle-LH</code></td><td>var(--nds-text-clamp-lg-LH)</td><td>Subtitle line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-subtitle-MB</code></td><td>var(--section-title-MB)</td><td>Subtitle bottom margin</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-description-FS</code></td><td>var(--nds-text-clamp-lg-FS)</td><td>Description font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-description-LH</code></td><td>var(--nds-text-clamp-lg-LH)</td><td>Description line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-description-MB</code></td><td>var(--spacing-2xl)</td><td>Description bottom margin</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-shape-size</code></td><td>var(--section-title-FS)</td><td>Size of decorative shape in the title</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--section-image-MB</code></td><td>var(--spacing-2xl)</td><td>Image bottom margin (outside wrapper)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-FS</code></td><td>var(--nds-text-xl-FS)</td><td>Content block title font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-LH</code></td><td>var(--nds-text-xl-LH)</td><td>Content block title line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-FW</code></td><td>600</td><td>Content block title font weight</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-MB</code></td><td>var(--spacing-lg)</td><td>Content block title bottom margin</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-color</code></td><td>var(--text-display)</td><td>Content block title color</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>