---
layout: page
title: Tags
hero_title: Tags - National Design System
hero_description: Compact labels for categorization, status indicators, and metadata display
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Variants -->
<section id="tagVariants" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Variants</h2>
            <p class="nds-section-description">Six color variants with outline, inverted, ghost, and rounded modifiers</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">Neutral</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-neutral", ".nds-tag", "tagColor"]'>
                                            <span class="label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-success", ".nds-tag", "tagColor"]'>
                                            <span class="label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-info", ".nds-tag", "tagColor"]'>
                                            <span class="label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-warning", ".nds-tag", "tagColor"]'>
                                            <span class="label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-error", ".nds-tag", "tagColor"]'>
                                            <span class="label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-md", ".nds-tag", "tagSize"]'>
                                            <span class="label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "tagSize"]'>
                                            <span class="label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "tagSize"]'>
                                            <span class="label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "tagStyle"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "tagShape"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-tag-01 icon\"></i>", ".nds-tag", "tagIcon", "content-prepend"]'>
                                <span class="label">Icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-tag nds-neutral">
                                <span class="label">Label</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-variants-1" id="tab-tag-variants-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-variants-1"
                                    aria-labelledby="tab-tag-variants-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<span class="nds-tag nds-neutral">
  <span class="label">Label</span>
</span>
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

<!-- Status -->
<section id="tagStatus" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Status</h2>
            <p class="nds-section-description">Pill-shaped tags with a dot indicator for state representation</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">Neutral</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-neutral", ".nds-tag", "statusColor"]'>
                                            <span class="label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-success", ".nds-tag", "statusColor"]'>
                                            <span class="label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-info", ".nds-tag", "statusColor"]'>
                                            <span class="label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-warning", ".nds-tag", "statusColor"]'>
                                            <span class="label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-error", ".nds-tag", "statusColor"]'>
                                            <span class="label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-md", ".nds-tag", "statusSize"]'>
                                            <span class="label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "statusSize"]'>
                                            <span class="label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "statusSize"]'>
                                            <span class="label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-inverted", ".nds-tag", "statusStyle"]'>
                                <span class="label">Inverted</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-tag", "statusStyle"]'>
                                <span class="label">Ghost</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-tag nds-neutral nds-status">
                                <span class="label">Status</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-status-1" id="tab-tag-status-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-status-1"
                                    aria-labelledby="tab-tag-status-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<span class="nds-tag nds-neutral nds-status">
  <span class="label">Status</span>
</span>
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

<!-- On Color -->
<section id="tagOnColor" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">On Color</h2>
            <p class="nds-section-description">Tags designed for use on colored or dark backgrounds</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-md", ".nds-tag", "oncolorSize"]'>
                                            <span class="label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "oncolorSize"]'>
                                            <span class="label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "oncolorSize"]'>
                                            <span class="label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "oncolorStyle"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "oncolorShape"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-star icon\"></i>", ".nds-tag", "oncolorIcon", "content-prepend"]'>
                                <span class="label">Icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "oncolorBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <span class="nds-tag nds-oncolor">
                                <span class="label">On Color</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-oncolor-1" id="tab-tag-oncolor-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-oncolor-1"
                                    aria-labelledby="tab-tag-oncolor-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<span class="nds-tag nds-oncolor">
  <span class="label">On Color</span>
</span>
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

<!-- Icon Only -->
<section id="tagIconOnly" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Icon Only</h2>
            <p class="nds-section-description">Square tags that display only an icon, hiding the label</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">Neutral</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-neutral", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-success", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-info", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-warning", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-error", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-md", ".nds-tag", "iconOnlySize"]'>
                                            <span class="label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "iconOnlySize"]'>
                                            <span class="label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "iconOnlySize"]'>
                                            <span class="label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "iconOnlyStyle"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "iconOnlyShape"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-tag nds-neutral nds-icon-only">
                                <i class="hgi hgi-stroke hgi-tag-01 icon"></i>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-icononly-1" id="tab-tag-icononly-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-icononly-1"
                                    aria-labelledby="tab-tag-icononly-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<span class="nds-tag nds-neutral nds-icon-only">
  <i class="hgi hgi-stroke hgi-tag-01 icon"></i>
</span>
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

<!-- Tag Group -->
<section id="tagGroup" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tag Group</h2>
            <p class="nds-section-description">Wrap multiple tags in a flex container with consistent spacing</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "groupStyle"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "groupShape"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-tag", "groupSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-group">
                                <span class="nds-tag nds-neutral">
                                    <span class="label">Design</span>
                                </span>
                                <span class="nds-tag nds-info">
                                    <span class="label">Engineering</span>
                                </span>
                                <span class="nds-tag nds-success">
                                    <span class="label">Marketing</span>
                                </span>
                                <span class="nds-tag nds-warning">
                                    <span class="label">Finance</span>
                                </span>
                                <span class="nds-tag nds-error">
                                    <span class="label">Urgent</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-group-1" id="tab-tag-group-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-group-1"
                                    aria-labelledby="tab-tag-group-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-group">
  <span class="nds-tag nds-neutral">
    <span class="label">Design</span>
  </span>
  <span class="nds-tag nds-info">
    <span class="label">Engineering</span>
  </span>
  <span class="nds-tag nds-success">
    <span class="label">Marketing</span>
  </span>
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

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Built-in Features</h3>
                <p>Pure CSS component with no JavaScript required. Tags render immediately from HTML markup with full design token support.</p>
                <ul>
                    <li>Six color variants (neutral, success, info, warning, error, on-color) with light, inverted, and outline sub-styles</li>
                    <li>Three sizes (md, sm, xs) controlled by a single class</li>
                    <li>Status variant with automatic dot indicator and pill shape</li>
                    <li>Ghost variant for borderless, transparent tags</li>
                    <li>Icon support with automatic color theming and icon-only display mode</li>
                    <li>Label truncation via the <strong>--truncate</strong> CSS variable</li>
                    <li>Tag group container with flex wrap and consistent spacing</li>
                    <li>Dark mode support through design tokens</li>
                    <li>RTL-ready with CSS logical properties</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use <strong>default tags</strong> for categorization, labels, and metadata (department, topic, technology)</li>
                    <li>Use <strong>status tags</strong> for state representation (active, pending, approved, rejected) where the dot indicator reinforces the meaning</li>
                    <li>Use <strong>inverted tags</strong> when you need higher contrast or visual prominence</li>
                    <li>Use <strong>outline tags</strong> for a lighter, less prominent appearance</li>
                    <li>Use <strong>ghost tags</strong> for inline labels where background and border would add visual noise</li>
                    <li>Use <strong>on-color tags</strong> when placing tags on colored or dark backgrounds</li>
                    <li>Choose color by meaning: <strong>neutral</strong> for general labels, <strong>success/error/warning/info</strong> for semantic status</li>
                    <li>Wrap related tags in <strong>nds-group</strong> for consistent spacing and flex wrap</li>
                </ul>
            </div>

        </div>
    </div>
</section>
