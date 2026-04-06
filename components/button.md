---
layout: page
title: Button
hero_title: Button - National Design System
hero_description: Interactive controls for actions, navigation, and form submissions
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Standard -->
<section id="btnStandard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">Six variants across all interaction states</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Primary</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-primary", ".nds-demo", "stdVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-demo", "stdVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo", "stdVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-demo", "stdVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-demo", "stdVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-demo", "stdVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
<button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-demo", "stdSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo", "stdSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo", "stdSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-demo", "stdOncolor"],["dark-bg", ".demo-container", "stdOncolor"]]'>
                                <span class="nds-label">On Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "stdIndicator"]'>
                                <span class="nds-label">Indicator</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary nds-lg nds-demo" data-state="default"><span class="nds-label">Default</span></button>
                            <button class="nds-btn nds-primary nds-lg nds-demo" data-state="hover"><span class="nds-label">Hover</span></button>
                            <button class="nds-btn nds-primary nds-lg nds-demo" data-state="pressed"><span class="nds-label">Pressed</span></button>
                            <button class="nds-btn nds-primary nds-lg nds-demo" data-state="selected"><span class="nds-label">Selected</span></button>
                            <button class="nds-btn nds-primary nds-lg nds-demo" data-state="focused"><span class="nds-label">Focused</span></button>
                            <button class="nds-btn nds-primary nds-lg nds-demo" disabled><span class="nds-label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-standard-1" id="tab-btn-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-standard-1"
                                    aria-labelledby="tab-btn-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-primary">
  <span class="nds-label">Button</span>
</button>
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

<!-- Destructive -->
<section id="btnDestructive" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Destructive</h2>
            <p class="nds-section-description">Red-toned variants for delete, remove, and irreversible actions</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Primary</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-primary", ".nds-demo", "destVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo", "destVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-demo", "destVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-demo", "destVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-demo", "destVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
<button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-demo", "destSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo", "destSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo", "destSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-demo", "destOncolor"],["dark-bg", ".demo-container", "destOncolor"]]'>
                                <span class="nds-label">On Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "destIndicator"]'>
                                <span class="nds-label">Indicator</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary nds-destructive nds-lg nds-demo" data-state="default"><span class="nds-label">Default</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-lg nds-demo" data-state="hover"><span class="nds-label">Hover</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-lg nds-demo" data-state="pressed"><span class="nds-label">Pressed</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-lg nds-demo" data-state="selected"><span class="nds-label">Selected</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-lg nds-demo" data-state="focused"><span class="nds-label">Focused</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-lg nds-demo" disabled><span class="nds-label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-destructive-1" id="tab-btn-destructive-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-destructive-1"
                                    aria-labelledby="tab-btn-destructive-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-primary nds-destructive">
  <span class="nds-label">Delete</span>
</button>
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

<!-- Layout -->
<section id="btnLayout" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Layout</h2>
            <p class="nds-section-description">Content visibility, icon position, shape, and state modifiers</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Primary</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-primary", ".nds-demo", "layoutVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-demo", "layoutVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo", "layoutVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-demo", "layoutVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-demo", "layoutVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-demo", "layoutVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
<button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-demo", "layoutSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo", "layoutSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo", "layoutSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Content</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-demo", "layoutContent"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-icon-only", ".nds-demo", "layoutContent"]'>
                                            <span class="nds-label">Icon Only</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-label-only", ".nds-demo", "layoutContent"]'>
                                            <span class="nds-label">Label Only</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Shape</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-demo", "layoutShape"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-circle", ".nds-demo", "layoutShape"]'>
                                            <span class="nds-label">Circle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-full", ".nds-demo", "layoutShape"]'>
                                            <span class="nds-label">Full Width</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-trail-icon", ".nds-demo", "layoutTrail"]'>
                                <span class="nds-label">Trail Icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-state=loading", ".nds-demo", "layoutLoading", "attr"]'>
                                <span class="nds-label">Loading</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-lg nds-demo">
                            <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            <span class="nds-label">Add Item</span>
                        </button>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-layout-1" id="tab-btn-layout-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-layout-1"
                                    aria-labelledby="tab-btn-layout-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-primary">
  <i class="hgi hgi-stroke hgi-plus-sign"></i>
  <span class="nds-label">Add Item</span>
</button>
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

<!-- Menu Button -->
<section id="btnMenu" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Menu Button</h2>
            <p class="nds-section-description">Dropdown trigger with auto-rotating indicator</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Secondary Outline</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-primary", ".nds-demo", "menuVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-demo", "menuVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo", "menuVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-secondary-outline", ".nds-demo", "menuVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-demo", "menuVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-demo", "menuVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
<button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-demo", "menuSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo", "menuSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo", "menuSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Content</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-demo", "menuContent"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-icon-only", ".nds-demo", "menuContent"]'>
                                            <span class="nds-label">Icon Only</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-label-only", ".nds-demo", "menuContent"]'>
                                            <span class="nds-label">Label Only</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-secondary-outline nds-menu-btn nds-lg nds-demo">
                            <span class="nds-label">Options</span>
                        </button>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-menu-1" id="tab-btn-menu-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-menu-1"
                                    aria-labelledby="tab-btn-menu-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-secondary-outline nds-menu-btn">
  <span class="nds-label">Options</span>
</button>
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

<!-- Button Group -->
<section id="btnGroup" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Button Group</h2>
            <p class="nds-section-description">Grouped buttons with merged borders and shared border radius</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Secondary Outline</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-primary", ".nds-demo", "groupVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-demo", "groupVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo", "groupVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-secondary-outline", ".nds-demo", "groupVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-demo", "groupVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-demo", "groupVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
<button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-demo", "groupSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo", "groupSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo", "groupSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-btn-group">
                            <button class="nds-btn nds-secondary-outline nds-lg nds-demo"><span class="nds-label">Left</span></button>
                            <button class="nds-btn nds-secondary-outline nds-lg nds-demo"><span class="nds-label">Center</span></button>
                            <button class="nds-btn nds-secondary-outline nds-lg nds-demo"><span class="nds-label">Right</span></button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-group-1" id="tab-btn-group-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-group-1"
                                    aria-labelledby="tab-btn-group-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-btn-group">
  <button class="nds-btn nds-secondary-outline nds-lg"><span class="nds-label">Left</span></button>
  <button class="nds-btn nds-secondary-outline nds-lg"><span class="nds-label">Center</span></button>
  <button class="nds-btn nds-secondary-outline nds-lg"><span class="nds-label">Right</span></button>
</div>
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

<!-- Animated Progress -->
<section id="btnProgressAnimated" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Animated Progress</h2>
            <p class="nds-section-description">Circular countdown timer controlled by --progress-duration</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Primary</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-primary", ".nds-progress", "progressVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-progress", "progressVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-progress", "progressVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-progress", "progressVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-progress", "progressVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-progress", "progressVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-progress", "progressSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-progress", "progressSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-progress", "progressSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-circle", ".nds-progress", "progressCircle"]'>
                                <span class="nds-label">Circle</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-action-btn"
                                data-action="reset-progress-duration">
                                <span class="nds-label">Reset</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-icon-only nds-progress nds-lg"
                            style="--progress-duration: 4000ms;" aria-label="Close">
                            <i class="hgi hgi-stroke hgi-cancel-01"></i>
                            <div class="nds-progress-circle" hidden>
                                <svg width="100%" height="100%" viewBox="0 0 24 24">
                                    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
                                    <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-progress-1" id="tab-btn-progress-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-btn-progress-1"
                                    aria-labelledby="tab-btn-progress-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<button class="nds-btn nds-primary nds-icon-only nds-progress"
        style="--progress-duration: 4000ms;"
        aria-label="Close">
  <i class="hgi hgi-stroke hgi-cancel-01"></i>
  <div class="nds-progress-circle" hidden>
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
      <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
              stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
    </svg>
  </div>
</button>
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

<!-- Static Progress -->
<section id="btnProgressStatic" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Static Progress</h2>
            <p class="nds-section-description">Fixed percentage indicator controlled by --progress-value</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Primary</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-primary", ".nds-progress-static", "progressStaticVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-progress-static", "progressStaticVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-progress-static", "progressStaticVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-progress-static", "progressStaticVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-progress-static", "progressStaticVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-transparent", ".nds-progress-static", "progressStaticVariant"]'>
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-progress-static", "progressStaticSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-progress-static", "progressStaticSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-progress-static", "progressStaticSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-circle", ".nds-progress-static", "progressStaticCircle"]'>
                                <span class="nds-label">Circle</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-action-btn"
                                data-action="random-progress-value">
                                <span class="nds-label">Random Value</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-icon-only nds-progress nds-progress-static nds-lg"
                            style="--progress-value: 25;" aria-label="Upload">
                            <i class="hgi hgi-stroke hgi-upload-02"></i>
                            <div class="nds-progress-circle" hidden>
                                <svg width="100%" height="100%" viewBox="0 0 24 24">
                                    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
                                    <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-progress-static-1" id="tab-btn-progress-static-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-btn-progress-static-1"
                                    aria-labelledby="tab-btn-progress-static-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<button class="nds-btn nds-primary nds-icon-only nds-progress nds-progress-static"
        style="--progress-value: 25;"
        aria-label="Upload">
  <i class="hgi hgi-stroke hgi-upload-02"></i>
  <div class="nds-progress-circle" hidden>
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
      <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
              stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
    </svg>
  </div>
</button>
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

<!-- Status Feedback -->
<section id="btnStatus" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Status Feedback</h2>
            <p class="nds-section-description">Contextual color and icon change via data-status attribute</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Success</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-status=success", ".status-demo-btn", "statusToggle", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".status-demo-btn", "statusToggle", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".status-demo-btn", "statusToggle", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".status-demo-btn", "statusToggle", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary status-demo-btn" onclick="this.dataset.status='success';setTimeout(()=>delete this.dataset.status,2000)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                                <span class="nds-label">Copy Link</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-status-1" id="tab-btn-status-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-btn-status-js" id="tab-btn-status-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-status-1"
                                    aria-labelledby="tab-btn-status-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-secondary">
  <i class="hgi hgi-stroke hgi-copy-01"></i>
  <span class="nds-label">Copy Link</span>
</button>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-status-js"
                                    aria-labelledby="tab-btn-status-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// Set status with auto-reset after 2 seconds
function copyAction(button) {
    button.dataset.status = 'success';
    setTimeout(() => delete button.dataset.status, 2000);
}

const btn = document.querySelector('.nds-btn');
btn.addEventListener('click', () => copyAction(btn));
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

<!-- Badge -->
<section id="btnBadge" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Badge</h2>
            <p class="nds-section-description">Notification count overlay on icon buttons</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-icon-only nds-subtle">
                                <i class="hgi hgi-stroke hgi-notification-03"><span class="nds-badge">3</span></i>
                            </button>
                            <button class="nds-btn nds-icon-only nds-subtle">
                                <i class="hgi hgi-stroke hgi-mail-01"><span class="nds-badge">12</span></i>
                            </button>
                            <button class="nds-btn nds-icon-only nds-subtle">
                                <i class="hgi hgi-stroke hgi-shopping-cart-01"><span class="nds-badge">5</span></i>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-btn-badge-1" id="tab-btn-badge-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-btn-badge-1"
                                    aria-labelledby="tab-btn-badge-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-icon-only nds-subtle">
  <i class="hgi hgi-stroke hgi-notification-03">
    <span class="nds-badge">3</span>
  </i>
</button>
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
<section id="btnFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01 nds-icon"></i>
                        <span class="nds-label">Pure CSS</span>
                    </span>
                    <p class="nds-item-desc">No JavaScript required. All variants, sizes, and states render from HTML markup with design tokens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors nds-icon"></i>
                        <span class="nds-label">Six Variants</span>
                    </span>
                    <p class="nds-item-desc">Primary, neutral, secondary, secondary-outline, subtle, and transparent with full state coverage.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01 nds-icon"></i>
                        <span class="nds-label">Three Sizes</span>
                    </span>
                    <p class="nds-item-desc">24px to 40px. Font, icon, and indicator scale proportionally.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-01 nds-icon"></i>
                        <span class="nds-label">Layout Options</span>
                    </span>
                    <p class="nds-item-desc">Lead icon, trail icon, icon-only, label-only, circular, full-width, and loading state.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-eye nds-icon"></i>
                        <span class="nds-label">Accessibility</span>
                    </span>
                    <p class="nds-item-desc">High contrast borders, reduced motion fallback, print styles, and focus-visible ring.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle nds-icon"></i>
                        <span class="nds-label">Composable</span>
                    </span>
                    <p class="nds-item-desc">Combine with destructive, on-color, loading, progress, status, badge, indicator, and groups.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="btnGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use <strong>primary</strong> for the main action on the page. Limit to one per view</li>
                    <li>Use <strong>neutral</strong> for strong secondary actions that need visual weight</li>
                    <li>Use <strong>secondary/outline</strong> for supporting actions alongside a primary button</li>
                    <li>Use <strong>subtle/transparent</strong> for low-emphasis actions like cancel, dismiss, or tertiary options</li>
                    <li>Use <strong>destructive</strong> for delete, remove, or irreversible actions. Pair with a confirmation dialog</li>
                    <li>Use <strong>on-color</strong> variants when placing buttons on colored or dark backgrounds</li>
                    <li>Use <strong>icon-only</strong> for toolbar actions where space is limited. Always include aria-label</li>
                    <li>Use <strong>loading</strong> state after a click to indicate processing. Disable the button to prevent double submissions</li>
                </ul>
            </div>

        </div>
    </div>
</section>
