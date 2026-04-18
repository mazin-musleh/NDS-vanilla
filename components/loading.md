---
layout: page
title: Loading
hero_title: Loading Component - National Design System
hero_description: A versatile loading spinner for indicating loading states across any element
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Loading Overview -->
<section id="loadingOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Loading Spinner</h2>
            <p class="nds-section-description">Add data-state="loading" or .nds-loading to any container to dim its content and show a centered spinner</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <!-- Default Loading -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Default Loading</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xxs", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">XXS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-md", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-2xl", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">2XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-loading","loadingColor"]'>
                                <span class="nds-label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-loading"
                                style="width: 200px; padding: 16px; background: var(--background-surface-default); border-radius: 8px; border: 1px solid var(--border-default);">
                                <p style="margin: 0;">Content is dimmed while loading</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
&lt;div data-state="loading"&gt;
  &lt;p&gt;Content is dimmed while loading&lt;/p&gt;
&lt;/div&gt;

&lt;!-- Or use class toggle --&gt;
&lt;div class="nds-loading"&gt;
  &lt;p&gt;Content is dimmed while loading&lt;/p&gt;
&lt;/div&gt;
                                </code>
                            </div>
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
                                <span class="nds-label">XXS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-md", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-2xl", ".nds-loading","loadingSize"]'>
                                <span class="nds-label">2XL</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container" style="background: var(--colors-primary-sa-flag-600-primary);">
                        <div class="state-demo oncolor-demo">
                            <div class="nds-loading nds-oncolor"
                                style="width: 200px; padding: 16px; border-radius: 8px;">
                                <p style="margin: 0; color: var(--colors-base-white);">Content is dimmed while loading</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
        <div class="nds-section-body">
            <div class="nds-showcase">
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
    </div>
</section>