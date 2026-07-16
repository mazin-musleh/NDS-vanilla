---
layout: page
title: Tags
hero_title: Tags - National Design System
hero_description: Compact labels for categorization, status indicators, and metadata display
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.4.0"
last_edit: "28/06/2026 - 01:27 PM"
---

<!-- Variants -->
<section id="tagVariants" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Variants</h2>
            <p class="nds-section-description">Five color variants with outline, rounded, and icon modifiers</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Gray</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-gray", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Gray</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-green", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-blue", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Blue</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-yellow", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Yellow</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-red", ".nds-tag", "tagColor"]'>
                                            <span class="nds-label">Red</span>
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
                                data-toggler='["nds-inverted", ".nds-tag", "tagStyle"]'>
                                <span class="nds-label">Inverted</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-tag", "tagStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ghost", ".nds-tag", "tagStyle"]'>
                                <span class="nds-label">Ghost</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-rounded", ".nds-tag", "tagShape"]'>
                                <span class="nds-label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-tag-01\"></i>", ".nds-tag", "tagIcon", "content-prepend"]'>
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
                            <span class="nds-tag nds-gray">
                                <span class="nds-label">Label</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-variants-1" id="tab-tag-variants-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-variants-1"
                                    aria-labelledby="tab-tag-variants-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tag nds-gray"&gt;
  &lt;span class="nds-label"&gt;Label&lt;/span&gt;
&lt;/span&gt;
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
<section id="tagStatus" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Status</h2>
            <p class="nds-section-description">Pill-shaped tags with a dot indicator for state representation</p>
        </div>
        <div class="nds-section-body">
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
                                            data-toggler='["data-status=neutral", ".nds-tag", "statusColor", "attr"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-tag", "statusColor", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-tag", "statusColor", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-tag", "statusColor", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-tag", "statusColor", "attr"]'>
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
                            <span class="nds-tag" data-status="neutral">
                                <span class="nds-label">Status</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-status-1" id="tab-tag-status-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-status-1"
                                    aria-labelledby="tab-tag-status-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tag" data-status="neutral"&gt;
  &lt;span class="nds-label"&gt;Status&lt;/span&gt;
&lt;/span&gt;
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
<section id="tagOnColor" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">On Color</h2>
            <p class="nds-section-description">Tags designed for use on colored or dark backgrounds</p>
        </div>
        <div class="nds-section-body">
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
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-star\"></i>", ".nds-tag", "oncolorIcon", "content-prepend"]'>
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
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-oncolor-1" id="tab-tag-oncolor-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-oncolor-1"
                                    aria-labelledby="tab-tag-oncolor-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tag nds-oncolor"&gt;
  &lt;span class="nds-label"&gt;On Color&lt;/span&gt;
&lt;/span&gt;
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
<section id="tagIconOnly" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Icon Only</h2>
            <p class="nds-section-description">Square tags that display only an icon, hiding the label</p>
        </div>
        <div class="nds-section-body">
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
                                            data-toggler='["nds-gray", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Gray</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-green", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Green</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-blue", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Blue</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-yellow", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Yellow</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-red", ".nds-tag", "iconOnlyColor"]'>
                                            <span class="nds-label">Red</span>
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
                            <span class="nds-tag nds-gray nds-icon-only">
                                <i class="hgi hgi-stroke hgi-tag-01"></i>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-tag-icononly-1" id="tab-tag-icononly-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tag-icononly-1"
                                    aria-labelledby="tab-tag-icononly-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tag nds-gray nds-icon-only"&gt;
  &lt;i class="hgi hgi-stroke hgi-tag-01"&gt;&lt;/i&gt;
&lt;/span&gt;
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
<section id="tagGroup" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tag Group</h2>
            <p class="nds-section-description">Wrap multiple tags in .nds-tags for automatic flex-wrap layout with consistent gap</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-tags">
                                <span class="nds-tag nds-gray"><span class="nds-label">Design</span></span>
                                <span class="nds-tag nds-blue"><span class="nds-label">Development</span></span>
                                <span class="nds-tag nds-green"><span class="nds-label">Approved</span></span>
                                <span class="nds-tag nds-yellow"><span class="nds-label">In Review</span></span>
                                <span class="nds-tag nds-red"><span class="nds-label">Blocked</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-tags-group-1" id="tab-tags-group-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tags-group-1"
                                    aria-labelledby="tab-tags-group-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-tags"&gt;
  &lt;span class="nds-tag nds-gray"&gt;&lt;span class="nds-label"&gt;Design&lt;/span&gt;&lt;/span&gt;
  &lt;span class="nds-tag nds-blue"&gt;&lt;span class="nds-label"&gt;Development&lt;/span&gt;&lt;/span&gt;
  &lt;span class="nds-tag nds-green"&gt;&lt;span class="nds-label"&gt;Approved&lt;/span&gt;&lt;/span&gt;
  &lt;span class="nds-tag nds-yellow"&gt;&lt;span class="nds-label"&gt;In Review&lt;/span&gt;&lt;/span&gt;
  &lt;span class="nds-tag nds-red"&gt;&lt;span class="nds-label"&gt;Blocked&lt;/span&gt;&lt;/span&gt;
&lt;/div&gt;
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
<section id="tagFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Pure CSS</span>
                    </span>
                    <p class="nds-item-desc">No JavaScript required. Tags render immediately from HTML markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-wrap"></i>
                        <span class="nds-label">Auto-truncation</span>
                    </span>
                    <p class="nds-item-desc">Labels are forced to a single line via <code class="nds-inline-code lang-html">white-space: nowrap</code>. The tag itself uses <code class="nds-inline-code lang-html">min-width: fit-content</code> so it grows to fit its content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Flexible Color API</span>
                    </span>
                    <p class="nds-item-desc">Set color via class (nds-green) for normal tags, or data-status attribute for status indicators.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Works Anywhere</span>
                    </span>
                    <p class="nds-item-desc">Drop into any component. Works as labels, badges, status indicators, or metadata display.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use tags for categorization, labels, and metadata that users need to scan quickly</li>
                    <li>Use status tags when the state needs a visual indicator beyond just color (the dot reinforces meaning for colorblind users)</li>
                    <li>Choose color by meaning: <strong>neutral</strong> for general labels, <strong>success/error/warning/info</strong> for semantic status</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th><th>Combinable with</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-inverted</code></td><td>Solid filled background using the full-strength color token. Requires a color class or <code class="nds-inline-code lang-html">data-status</code></td><td>Color class, <code class="nds-inline-code lang-html">data-status</code>, <code class="nds-inline-code lang-html">nds-rounded</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-outline</code></td><td>Transparent background with full-strength border. Requires a color class or <code class="nds-inline-code lang-html">data-status</code></td><td>Color class, <code class="nds-inline-code lang-html">data-status</code>, <code class="nds-inline-code lang-html">nds-rounded</code>, <code class="nds-inline-code lang-html">nds-oncolor</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ghost</code></td><td>Transparent background and border with neutral text. Usable without a color class or status</td><td>Color class, <code class="nds-inline-code lang-html">data-status</code>, <code class="nds-inline-code lang-html">nds-rounded</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-rounded</code></td><td>Pill shape via <code class="nds-inline-code lang-html">border-radius: 999px</code></td><td>All variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon-only</code></td><td>Square aspect ratio, hides the label, sized to tag height</td><td>All variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>White-on-color styling for use on colored or dark backgrounds</td><td><code class="nds-inline-code lang-html">nds-outline</code>, <code class="nds-inline-code lang-html">nds-rounded</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--tag-bg</code></td><td><code class="nds-inline-code lang-html">--tag-background-neutral-light</code></td><td>Tag background color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-text</code></td><td><code class="nds-inline-code lang-html">--tag-text-neutral</code></td><td>Label text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-border</code></td><td><code class="nds-inline-code lang-html">--tag-border-neutral-light</code></td><td>Border color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-icon</code></td><td><code class="nds-inline-code lang-html">--tag-icon-neutral</code></td><td>Icon and status dot color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-height</code></td><td><code class="nds-inline-code lang-html">32px</code></td><td>Tag height (also drives icon-only width via aspect-ratio)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-fs</code></td><td><code class="nds-inline-code lang-html">--typo-text-md-FS</code></td><td>Font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-padding-inline</code></td><td><code class="nds-inline-code lang-html">--spacing-xl</code></td><td>Horizontal padding</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tag-dot-size</code></td><td><code class="nds-inline-code lang-html">10px</code></td><td>Diameter of the status dot indicator</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
