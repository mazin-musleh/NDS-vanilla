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
            <p class="nds-section-description">Five color variants with outline, rounded, and icon modifiers</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Neutral</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-neutral", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-success", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-info", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-warning", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-error", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-tag", "tagSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "tagSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "tagSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "tagStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "tagShape"]'>
                                <span class="nds-label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-tag-01 icon\"></i>", ".nds-tag", "tagIcon", "content-prepend"]'>
                                <span class="nds-label">Icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-tag nds-neutral">
                                <span class="nds-label">Label</span>
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
  <span class="nds-label">Label</span>
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
                                    <span class="nds-label">Neutral</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-neutral", ".nds-tag", "statusColor"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-success", ".nds-tag", "statusColor"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-info", ".nds-tag", "statusColor"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-warning", ".nds-tag", "statusColor"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-error", ".nds-tag", "statusColor"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-tag", "statusSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "statusSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "statusSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-inverted", ".nds-tag", "statusStyle"]'>
                                <span class="nds-label">Inverted</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-tag", "statusStyle"]'>
                                <span class="nds-label">Ghost</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-tag nds-neutral nds-status">
                                <span class="nds-label">Status</span>
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
  <span class="nds-label">Status</span>
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
                                    <span class="nds-label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-tag", "oncolorSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "oncolorSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "oncolorSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "oncolorStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "oncolorShape"]'>
                                <span class="nds-label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-star icon\"></i>", ".nds-tag", "oncolorIcon", "content-prepend"]'>
                                <span class="nds-label">Icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "oncolorBg"]'>
                                <span class="nds-label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <span class="nds-tag nds-oncolor">
                                <span class="nds-label">On Color</span>
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
  <span class="nds-label">On Color</span>
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
                                    <span class="nds-label">Neutral</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-neutral", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-success", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-info", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-warning", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-error", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-tag", "iconOnlySize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-tag", "iconOnlySize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-tag", "iconOnlySize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "iconOnlyStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "iconOnlyShape"]'>
                                <span class="nds-label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-tag nds-neutral nds-icon-only">
                                <i class="hgi hgi-stroke hgi-tag-01 nds-icon"></i>
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
  <i class="hgi hgi-stroke hgi-tag-01 nds-icon"></i>
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

<!-- Built-in Features -->
<section id="tagFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01 nds-icon"></i>
                        <span class="nds-label">Pure CSS</span>
                    </span>
                    <p class="nds-item-desc">No JavaScript required. Tags render immediately from HTML markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-wrap nds-icon"></i>
                        <span class="nds-label">Auto-truncation</span>
                    </span>
                    <p class="nds-item-desc">Labels truncate to a single line with ellipsis, configurable via --truncate.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors nds-icon"></i>
                        <span class="nds-label">Flexible Color API</span>
                    </span>
                    <p class="nds-item-desc">Set color via class (nds-success), attribute (data-status), or alias (nds-green).</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle nds-icon"></i>
                        <span class="nds-label">Works Anywhere</span>
                    </span>
                    <p class="nds-item-desc">Drop into any component. Works as labels, badges, status indicators, or metadata display.</p>
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
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use tags for categorization, labels, and metadata that users need to scan quickly</li>
                    <li>Use status tags when the state needs a visual indicator beyond just color (the dot reinforces meaning for colorblind users)</li>
                    <li>Choose color by meaning: <strong>neutral</strong> for general labels, <strong>success/error/warning/info</strong> for semantic status</li>
                </ul>
            </div>

        </div>
    </div>
</section>
