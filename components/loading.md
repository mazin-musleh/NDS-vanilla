---
layout: page
title: Loading
hero_title: Loading Component - National Design System
hero_description: A versatile loading spinner and overlay system for indicating loading states across any element
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Loading Overview -->
<section id="loadingOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Loading Spinner</h2>
            <p class="nds-section-description">Add .nds-loading to any element to show a centered loading spinner</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <!-- Default Loading -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Default Loading</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xxs", ".nds-loading","loadingSize"]'>
                                <span class="label">XXS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-loading","loadingSize"]'>
                                <span class="label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-loading","loadingSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-loading","loadingSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-loading","loadingSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-loading","loadingSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-2xl", ".nds-loading","loadingSize"]'>
                                <span class="label">2XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-loading","loadingColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-loading"
                                style="width: 100px; height: 100px; background: var(--background-surface-default); border-radius: 8px;">
                                <span>Hidden content</span>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-loading-1" id="tab-loading-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-loading-1"
                                aria-labelledby="tab-loading-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-loading">
  Content hidden while loading
</div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- On-color Loading -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">On-color Loading (Dark Background)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xxs", ".nds-loading","loadingSize"]'>
                                <span class="label">XXS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-loading","loadingSize"]'>
                                <span class="label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-loading","loadingSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-loading","loadingSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-loading","loadingSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-loading","loadingSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-2xl", ".nds-loading","loadingSize"]'>
                                <span class="label">2XL</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container" style="background: var(--colors-primary-sa-flag-600-primary);">
                        <div class="state-demo oncolor-demo">
                            <div class="nds-loading nds-oncolor"
                                style="width: 100px; height: 100px; border-radius: 8px;">
                                <span>Hidden content</span>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-loading-2" id="tab-loading-2">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-loading-2"
                                aria-labelledby="tab-loading-2">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <div class="nds-loading nds-oncolor">
                                    Content hidden while loading
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

<!-- Overlay Section -->
<section id="overlaySection" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Loading Overlay</h2>
            <p class="nds-section-description">Add .nds-overlay to show content behind a dimmed background while loading
            </p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <!-- Light Overlay -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Light Overlay (Default)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xxs", ".nds-loading","loadingSize"]'>
                                <span class="label">XXS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-loading","loadingSize"]'>
                                <span class="label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-loading","loadingSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-loading","loadingSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-loading","loadingSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-loading","loadingSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-2xl", ".nds-loading","loadingSize"]'>
                                <span class="label">2XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-loading","overlayColor"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-dark", ".nds-loading","overlayColor"]'>
                                <span class="label">Dark</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo light-overlay-demo">
                            <div class="nds-loading nds-overlay"
                                style="width: 200px; padding: 16px; background: var(--background-surface-default); border-radius: 8px; border: 1px solid var(--border-default);">
                                <p style="margin: 0;">This content is visible but dimmed behind the loading overlay.</p>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-overlay-1" id="tab-overlay-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-overlay-1"
                                aria-labelledby="tab-overlay-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <div class="nds-loading nds-overlay">
                                        <p>Content behind overlay</p>
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

<!-- Size Variants -->
<section id="sizeVariants" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Size Variants</h2>
            <p class="nds-section-description">Loading spinners are available in 7 sizes: xxs (20px), xs (24px), sm
                (28px), md (32px default), lg (36px), xl (40px), 2xl (44px)</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">All Sizes</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="gap: 24px; flex-wrap: wrap;">
                            <div style="text-align: center;">
                                <div class="nds-loading nds-xxs"
                                    style="width: 48px; height: 48px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">XXS (20px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-xs"
                                    style="width: 52px; height: 52px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">XS (24px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-sm"
                                    style="width: 56px; height: 56px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">SM (28px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading"
                                    style="width: 60px; height: 60px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">MD (32px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-lg"
                                    style="width: 64px; height: 64px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">LG (36px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-xl"
                                    style="width: 68px; height: 68px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">XL (40px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-2xl"
                                    style="width: 72px; height: 72px; background: var(--background-surface-default); border-radius: 8px;">
                                </div>
                                <small style="display: block; margin-top: 8px;">2XL (44px)</small>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-sizes-1" id="tab-sizes-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sizes-1"
                                aria-labelledby="tab-sizes-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <div class="nds-loading nds-xxs">...</div>  <!-- 20px -->
                                    <div class="nds-loading nds-xs">...</div>   <!-- 24px -->
                                    <div class="nds-loading nds-sm">...</div>   <!-- 28px -->
                                    <div class="nds-loading">...</div>         <!-- 32px (default) -->
                                    <div class="nds-loading nds-lg">...</div>   <!-- 36px -->
                                    <div class="nds-loading nds-xl">...</div>   <!-- 40px -->
                                    <div class="nds-loading nds-2xl">...</div>  <!-- 44px -->
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>