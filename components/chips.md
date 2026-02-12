---
layout: page
title: Chips
hero_title: Chip Components - National Design System
hero_description: Interactive elements for tags, categories, selections, and filtering
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Chip Types Overview -->
<section id="chipTypesOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Chip Styles</h2>
            <p class="nds-section-description">Interactive chip components with different styles and states</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Primary Chip</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-rounded", ".nds-chip", "chips", "roundedToggle"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-add-01 icon\"></i>", ".nds-chip", "chipIcon", "content-prepend"]'>
                                <span class="label">Toggle Icon</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-chip", "chipSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-chip", "chipSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-chip", "chipSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-chip nds-primary nds-rounded">
                                <span class="label">Default</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" data-state="hover">
                                <span class="label">Hovered</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded pressed">
                                <span class="label">Pressed</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded selected">
                                <span class="label">Selected</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" data-state="focused">
                                <span class="label">Focused</span>
                            </button>
                            <button class="nds-chip nds-primary nds-rounded" disabled>
                                <span class="label">Disabled</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-primary-1" id="tab-primary-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-primary-1"
                                aria-labelledby="tab-primary-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-chip nds-primary">
                                      <span class="label">Item</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Chip</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-rounded", ".nds-chip", "chips", "roundedToggle"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-add-01 icon\"></i>", ".nds-chip", "chipIcon", "content-prepend"]'>
                                <span class="label">Toggle Icon</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-chip", "chipSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-chip", "chipSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-chip", "chipSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-chip nds-neutral nds-rounded">
                                <span class="label">Default</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded" data-state="hover">
                                <span class="label">Hovered</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded pressed">
                                <span class="label">Pressed</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded selected">
                                <span class="label">Selected</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded" data-state="focused">
                                <span class="label">Focused</span>
                            </button>
                            <button class="nds-chip nds-neutral nds-rounded" disabled>
                                <span class="label">Disabled</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-neutral-1" id="tab-neutral-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-neutral-1"
                                aria-labelledby="tab-neutral-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-chip nds-neutral nds-rounded">
                                      <span class="label">Category</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">On-Color Chip</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-rounded", ".nds-chip", "chips", "roundedToggle"]'>
                                <span class="label">Rounded</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["<i class=\"hgi hgi-stroke hgi-add-01 icon\"></i>", ".nds-chip", "chipIcon", "content-prepend"]'>
                                <span class="label">Toggle Icon</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-chip", "chipSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-chip", "chipSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-chip", "chipSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-chip nds-primary nds-oncolor nds-rounded">
                                <span class="label">Default</span>
                            </button>
                            <button class="nds-chip nds-primary nds-oncolor nds-rounded" data-state="hover">
                                <span class="label">Hovered</span>
                            </button>
                            <button class="nds-chip nds-primary nds-oncolor nds-rounded pressed">
                                <span class="label">Pressed</span>
                            </button>
                            <button class="nds-chip nds-primary nds-oncolor nds-rounded selected">
                                <span class="label">Selected</span>
                            </button>
                            <button class="nds-chip nds-primary nds-oncolor nds-rounded" data-state="focused">
                                <span class="label">Focused</span>
                            </button>
                            <button class="nds-chip nds-primary nds-oncolor nds-rounded" disabled>
                                <span class="label">Disabled</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-oncolor-1" id="tab-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-oncolor-1"
                                aria-labelledby="tab-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-chip nds-primary nds-oncolor nds-rounded">
                                      <span class="label">On Color</span>
                                    </button>
                                </code>
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
            <p class="nds-section-description">Best practices for using chip components</p>
        </div>
        <div class="nds-section-content">
            <div class="guidelines-grid">
                <div class="guideline-item">
                    <h3>When to Use</h3>
                    <ul>
                        <li>Filtering and selection interfaces</li>
                        <li>Tagging and categorization</li>
                        <li>Input tokens and removable items</li>
                        <li>Multiple choice selections</li>
                        <li>Status indicators with interaction</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Style Selection</h3>
                    <ul>
                        <li><strong>Primary:</strong> Main categories and selected filters</li>
                        <li><strong>Neutral:</strong> Secondary categories and unselected items</li>
                        <li><strong>On-Color:</strong> Chips on colored or dark backgrounds</li>
                        <li><strong>Removable:</strong> User-added tags that can be deleted</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Interaction States</h3>
                    <ul>
                        <li><strong>Default:</strong> Normal chip appearance</li>
                        <li><strong>Hover:</strong> Mouse over interaction</li>
                        <li><strong>Pressed:</strong> Active click state</li>
                        <li><strong>Selected:</strong> Chosen/active chip</li>
                        <li><strong>Focused:</strong> Keyboard navigation focus</li>
                        <li><strong>Disabled:</strong> Non-interactive state</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Accessibility</h3>
                    <ul>
                        <li>Always include proper ARIA labels</li>
                        <li>Use semantic button elements for interactive chips</li>
                        <li>Ensure focus indicators are visible</li>
                        <li>Support keyboard navigation</li>
                        <li>Provide clear removal confirmation when needed</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>