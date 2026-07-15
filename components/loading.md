---
layout: page
title: Loading
hero_title: Loading Component - National Design System
hero_description: A versatile loading spinner for indicating loading states across any element
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.3.0"
last_edit: "02/07/2026 - 09:17 PM"
---

<!-- Loading Overview -->
<section id="loadingOverview" class="nds-content-section nds-demo-section">
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
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-loading-1" id="tab-loading-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-loading-1"
                                aria-labelledby="tab-loading-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
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
                    <div class="demo-container" style="background: var(--colors-primary-600);">
                        <div class="state-demo oncolor-demo">
                            <div class="nds-loading nds-oncolor"
                                style="width: 200px; padding: 16px; border-radius: 8px;">
                                <p style="margin: 0; color: var(--colors-base-white);">Content is dimmed while loading</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-loading-2" id="tab-loading-2">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-loading-2"
                                aria-labelledby="tab-loading-2">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
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

<!-- Neutral Loading -->
<section id="neutralLoading" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Neutral</h2>
            <p class="nds-section-description">Black spinner on light backgrounds, automatically inverts to white in dark mode</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Loading</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-loading nds-neutral"
                                style="width: 200px; padding: 16px; background: var(--background-surface-default); border-radius: 8px; border: 1px solid var(--border-default);">
                                <p style="margin: 0;">Content is dimmed while loading</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-loading-neutral-1" id="tab-loading-neutral-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-loading-neutral-1"
                                aria-labelledby="tab-loading-neutral-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-loading nds-neutral"&gt;
  &lt;p&gt;Content is dimmed while loading&lt;/p&gt;
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
<section id="sizeVariants" class="nds-content-section nds-demo-section">
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
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-sizes-1" id="tab-sizes-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sizes-1"
                                aria-labelledby="tab-sizes-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
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

<!-- Built-in Features -->
<section id="loadingFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">CSS Only</span>
                    </span>
                    <p class="nds-item-desc">No JavaScript required. Add the class or attribute and the spinner renders immediately via CSS <code class="nds-inline-code lang-html">::after</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-dark-mode"></i>
                        <span class="nds-label">Automatic Dark Mode</span>
                    </span>
                    <p class="nds-item-desc">The default spinner inverts to white in dark mode. <code class="nds-inline-code lang-html">nds-neutral</code> follows the same inversion automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mouse-01"></i>
                        <span class="nds-label">Interaction Blocked</span>
                    </span>
                    <p class="nds-item-desc"><code class="nds-inline-code lang-html">pointer-events: none</code> is applied to the loading container, preventing clicks on dimmed content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Skeleton Suppression</span>
                    </span>
                    <p class="nds-item-desc">On skeleton-capable elements (grids, cards, accordions, tabs, tables), the spinner is suppressed and child opacity is restored so the skeleton provides the feedback.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="loadingGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Prefer <code class="nds-inline-code lang-html">data-state="loading"</code> for JS-toggled states; prefer the <code class="nds-inline-code lang-html">nds-loading</code> class when the state is server-rendered or set via a simple class toggle</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-neutral</code> when the spinner appears over a white or light-tinted surface where the default primary-colored spinner would clash</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-oncolor</code> when the container background is always dark (for example, a primary-colored banner); this forces the spinner white regardless of color scheme</li>
                    <li>Do not add <code class="nds-inline-code lang-html">nds-loading</code> directly to <code class="nds-inline-code lang-html">.nds-btn</code>: buttons handle their own loading state and the child-dim rule is already excluded for them</li>
                    <li>On skeleton-capable elements (<code class="nds-inline-code lang-html">.nds-grid</code>, <code class="nds-inline-code lang-html">.nds-card</code>, <code class="nds-inline-code lang-html">.nds-accordion</code>, <code class="nds-inline-code lang-html">.nds-tabs</code>, <code class="nds-inline-code lang-html">tbody</code>), the skeleton IS the visual feedback; the spinner is automatically suppressed by CSS and you do not need to handle it separately</li>
                    <li>Size the spinner to match the container: use <code class="nds-inline-code lang-html">nds-xxs</code> or <code class="nds-inline-code lang-html">nds-xs</code> inside compact components (table cells, small cards) and <code class="nds-inline-code lang-html">nds-xl</code> or <code class="nds-inline-code lang-html">nds-2xl</code> for full-page overlays</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Black spinner on light backgrounds; inverts to white in dark mode</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>Forces a white spinner regardless of color scheme, for use on always-dark backgrounds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xxs</code></td><td>Spinner 20px, border 2px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xs</code></td><td>Spinner 24px, border 2px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Spinner 28px, border 2px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Spinner 32px, border 3px (same as the default)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>Spinner 36px, border 3px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xl</code></td><td>Spinner 40px, border 4px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-2xl</code></td><td>Spinner 44px, border 4px</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-state="loading"</code></td><td>Alternate trigger for the loading state. Equivalent to the <code class="nds-inline-code lang-html">nds-loading</code> class; useful when a component already manages <code class="nds-inline-code lang-html">data-state</code> for other states</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--loading-color</code></td><td><code class="nds-inline-code lang-html">--background-primary</code> (white in dark)</td><td>Spinner arc color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--loading-track</code></td><td><code class="nds-inline-code lang-html">--colors-alpha-black-10</code> (colors-alpha-white-20 in dark)</td><td>Spinner track (background ring) color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--loading-size</code></td><td><code class="nds-inline-code lang-html">32px</code></td><td>Diameter of the spinner</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--loading-border</code></td><td><code class="nds-inline-code lang-html">3px</code></td><td>Stroke width of the spinner ring</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--loading-opacity</code></td><td><code class="nds-inline-code lang-html">0.15</code></td><td>Opacity applied to child elements while loading</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Skeleton Processing State</h3>
                <p>When <code class="nds-inline-code lang-html">nds-loading</code> or <code class="nds-inline-code lang-html">data-state="loading"</code> is applied to the following elements, the spinner (<code class="nds-inline-code lang-html">::after</code>) is suppressed and child opacity is restored to 1. The skeleton styling defined in each component provides the visual feedback instead. <code class="nds-inline-code lang-html">pointer-events: none</code> still applies.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Element</th><th>Notes</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">.nds-grid</code></td><td>Card grids in a loading state show skeleton cards</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-paged-content</code></td><td>Paginated content region; skeleton suppresses spinner during page turns</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">tbody</code>, <code class="nds-inline-code lang-html">.nds-table</code></td><td>Table body and table wrapper; skeleton rows replace the spinner</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-accordion</code></td><td>Accordion panels show skeleton items</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-tabs</code>, <code class="nds-inline-code lang-html">.nds-tab-list</code></td><td>Tab strip and tab panels</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-card</code></td><td>Individual card in a loading state shows a skeleton body</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-definition-list</code></td><td>Definition list</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-stepper</code></td><td>Stepper component</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-breadcrumb-nav</code></td><td>Breadcrumb navigation</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>