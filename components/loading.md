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
    <div class="nds-section-content-container">
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
                                data-toggler='["nds-sm", ".nds-loading:not(.nds-overlay)","loadingSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-loading:not(.nds-overlay)","loadingSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-primary", ".nds-loading:not(.nds-overlay)","loadingColor"]'>
                                <span class="label">Primary</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-loading" style="width: 100px; height: 100px; background: var(--background-surface-default); border-radius: 8px;">
                                <span>Hidden content</span>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
&lt;div class="nds-loading"&gt;
  Content hidden while loading
&lt;/div&gt;
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
                                data-toggler='["nds-sm", ".oncolor-demo .nds-loading","loadingSizeOncolor"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".oncolor-demo .nds-loading","loadingSizeOncolor"]'>
                                <span class="label">LG</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container" style="background: var(--colors-primary-sa-flag-600-primary);">
                        <div class="state-demo oncolor-demo">
                            <div class="nds-loading nds-oncolor" style="width: 100px; height: 100px; border-radius: 8px;">
                                <span>Hidden content</span>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
&lt;div class="nds-loading nds-oncolor"&gt;
  Content hidden while loading
&lt;/div&gt;
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
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Loading Overlay</h2>
            <p class="nds-section-description">Add .nds-overlay to show content behind a dimmed background while loading</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <!-- Light Overlay -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Light Overlay (Default)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".light-overlay-demo .nds-loading","overlaySize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".light-overlay-demo .nds-loading","overlaySize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-primary", ".light-overlay-demo .nds-loading","overlayColor"]'>
                                <span class="label">Primary</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo light-overlay-demo">
                            <div class="nds-loading nds-overlay" style="width: 200px; padding: 16px; background: var(--background-surface-default); border-radius: 8px; border: 1px solid var(--border-default);">
                                <p style="margin: 0;">This content is visible but dimmed behind the loading overlay.</p>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
&lt;div class="nds-loading nds-overlay"&gt;
  &lt;p&gt;Content behind overlay&lt;/p&gt;
&lt;/div&gt;
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dark Overlay -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Dark Overlay</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".dark-overlay-demo .nds-loading","darkOverlaySize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".dark-overlay-demo .nds-loading","darkOverlaySize"]'>
                                <span class="label">LG</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo dark-overlay-demo">
                            <div class="nds-loading nds-overlay nds-dark nds-oncolor" style="width: 200px; padding: 16px; background: var(--background-surface-default); border-radius: 8px; border: 1px solid var(--border-default);">
                                <p style="margin: 0;">This content is visible but dimmed behind the dark loading overlay.</p>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-overlay-2" id="tab-overlay-2">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-overlay-2"
                                aria-labelledby="tab-overlay-2">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-loading nds-overlay nds-dark nds-oncolor"&gt;
  &lt;p&gt;Content behind overlay&lt;/p&gt;
&lt;/div&gt;
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
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Size Variants</h2>
            <p class="nds-section-description">Loading spinners are available in 7 sizes: xxs (20px), xs (24px), sm (28px), md (32px default), lg (36px), xl (40px), 2xl (44px)</p>
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
                                <div class="nds-loading nds-xxs" style="width: 48px; height: 48px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">XXS (20px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-xs" style="width: 52px; height: 52px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">XS (24px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-sm" style="width: 56px; height: 56px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">SM (28px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading" style="width: 60px; height: 60px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">MD (32px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-lg" style="width: 64px; height: 64px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">LG (36px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-xl" style="width: 68px; height: 68px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">XL (40px)</small>
                            </div>
                            <div style="text-align: center;">
                                <div class="nds-loading nds-2xl" style="width: 72px; height: 72px; background: var(--background-surface-default); border-radius: 8px;"></div>
                                <small style="display: block; margin-top: 8px;">2XL (44px)</small>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
&lt;div class="nds-loading nds-xxs"&gt;...&lt;/div&gt;  &lt;!-- 20px --&gt;
&lt;div class="nds-loading nds-xs"&gt;...&lt;/div&gt;   &lt;!-- 24px --&gt;
&lt;div class="nds-loading nds-sm"&gt;...&lt;/div&gt;   &lt;!-- 28px --&gt;
&lt;div class="nds-loading"&gt;...&lt;/div&gt;         &lt;!-- 32px (default) --&gt;
&lt;div class="nds-loading nds-lg"&gt;...&lt;/div&gt;   &lt;!-- 36px --&gt;
&lt;div class="nds-loading nds-xl"&gt;...&lt;/div&gt;   &lt;!-- 40px --&gt;
&lt;div class="nds-loading nds-2xl"&gt;...&lt;/div&gt;  &lt;!-- 44px --&gt;
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
