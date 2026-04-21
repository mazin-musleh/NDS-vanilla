---
layout: page
title: Chips
hero_title: Chips - National Design System
hero_description: Interactive elements for selections, filtering, and categorization
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Standard -->
<section id="chipStandard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">Two color variants across all interaction states</p>
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
                                            data-toggler='["nds-primary", ".nds-chip", "chipVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-chip", "chipVariant"]'>
                                            <span class="nds-label">Neutral</span>
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
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-chip", "chipSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-chip", "chipSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-chip", "chipSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-rounded", ".nds-chip", "chipRounded"]'>
                                <span class="nds-label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-chip", "chipOncolor"],["dark-bg", ".demo-container", "chipOncolor"]]'>
                                <span class="nds-label">On Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-add-01\"></i>", ".nds-chip", "chipIcon", "content-prepend"]'>
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
                            <button class="nds-chip nds-primary nds-rounded" data-state="default">
                                <span class="nds-label">Default</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" data-state="hover">
                                <span class="nds-label">Hover</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" data-state="pressed">
                                <span class="nds-label">Pressed</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" data-state="selected">
                                <span class="nds-label">Selected</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded focus" data-state="focused">
                                <span class="nds-label">Focused</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" disabled>
                                <span class="nds-label">Disabled</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chip-standard-1" id="tab-chip-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chip-standard-1"
                                    aria-labelledby="tab-chip-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-chip nds-primary nds-rounded"&gt;
  &lt;span class="nds-label"&gt;Label&lt;/span&gt;
&lt;/button&gt;
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

<!-- Chip Group -->
<section id="chipGroup" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Chip Group</h2>
            <p class="nds-section-description">Wrap multiple chips for consistent spacing and flow layout</p>
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
                        <div class="nds-chips">
                            <button class="nds-chip nds-primary nds-rounded" data-state="selected">
                                <span class="nds-label">All</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded">
                                <span class="nds-label">Category A</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded">
                                <span class="nds-label">Category B</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded">
                                <span class="nds-label">Category C</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded">
                                <span class="nds-label">Category D</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chip-group-1" id="tab-chip-group-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chip-group-1"
                                    aria-labelledby="tab-chip-group-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-chips"&gt;
  &lt;button class="nds-chip nds-primary nds-rounded" data-state="selected"&gt;
    &lt;span class="nds-label"&gt;All&lt;/span&gt;
  &lt;/button&gt;
  &lt;button class="nds-chip nds-neutral nds-rounded"&gt;
    &lt;span class="nds-label"&gt;Category A&lt;/span&gt;
  &lt;/button&gt;
  &lt;button class="nds-chip nds-neutral nds-rounded"&gt;
    &lt;span class="nds-label"&gt;Category B&lt;/span&gt;
  &lt;/button&gt;
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
<section id="chipFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Pure CSS</span>
                    </span>
                    <p class="nds-item-desc">No JavaScript required. All variants, sizes, and states render from HTML markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-01"></i>
                        <span class="nds-label">Interactive States</span>
                    </span>
                    <p class="nds-item-desc">Hover, pressed, selected, focused, and disabled with focus-visible ring.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-more-horizontal"></i>
                        <span class="nds-label">Label Truncation</span>
                    </span>
                    <p class="nds-item-desc">Labels auto-truncate with ellipsis, configurable via --truncate.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Composable</span>
                    </span>
                    <p class="nds-item-desc">Combine with icons, rounded shape, on-color variant, and chip groups.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="chipGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use chips for interactive selections like filters, categories, and multi-select options</li>
                    <li>Use <strong>primary</strong> for emphasis and <strong>neutral</strong> for standard options. Selected state is handled by the selected class</li>
                    <li>For non-interactive labels and metadata display, use tags instead</li>
                    <li>Group related chips together for filter bars, category selectors, and multi-select inputs</li>
                    <li>Add leading icons when the chip represents a category with a recognizable symbol</li>
                </ul>
            </div>

        </div>
    </div>
</section>
