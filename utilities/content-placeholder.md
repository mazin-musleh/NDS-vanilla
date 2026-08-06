---
layout: page
title: Content Placeholder
hero_title: Content Placeholder - National Design System
hero_description: A dashed stand-in that marks where real content belongs, for templates, prototypes, and demos where the final component has not been dropped in yet
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.5.0"
updated: "1.5.0"
last_edit: "25/07/2026 - 10:45 PM"
---

<!-- Content Placeholder -->
<section id="placeholderOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Placeholder</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-content-placeholder</code> to any empty region to mark it as a slot waiting for a real component. The text inside is yours, so the instruction can be written in any language.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                        <span class="nds-label">Size: Default</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["", ".nds-content-placeholder", "placeholderSize"]' data-trigger-label="Default">
                                                <span class="nds-label">Default</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-sm", ".nds-content-placeholder", "placeholderSize"]' data-trigger-label="Small">
                                                <span class="nds-label">Small</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", ".nds-content-placeholder", "placeholderSize"]' data-trigger-label="Large">
                                                <span class="nds-label">Large</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <div class="nds-content-placeholder">
                                    <span>Swap with content component</span>
                                    <span>استبدل هذا العنصر بأي عنصر آخر</span>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-placeholder-default-1" id="tab-placeholder-default-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-placeholder-default-1"
                                        aria-labelledby="tab-placeholder-default-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;div class="nds-content-placeholder"&gt;
    &lt;span&gt;Swap with content component&lt;/span&gt;
    &lt;span&gt;استبدل هذا العنصر بأي عنصر آخر&lt;/span&gt;
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
    </div>
</section>

<!-- Built-in Features -->
<section id="placeholderFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-code"></i>
                            <span class="nds-label">CSS-Only</span>
                        </span>
                        <p class="nds-item-desc">One class, no JavaScript, no initialization. Delete the class and the region is back to normal.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-square-arrow-expand-01"></i>
                            <span class="nds-label">Fills Its Region</span>
                        </span>
                        <p class="nds-item-desc">Stretches to a parent that has a height, such as a panel body, and falls back to a 120px floor when the parent is content-sized.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-paint-board"></i>
                            <span class="nds-label">Brand and Theme Aware</span>
                        </span>
                        <p class="nds-item-desc">Border, tint, and text read from the brand color tokens, so the marker retints with a custom theme and stays legible in dark mode.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-puzzle"></i>
                            <span class="nds-label">Your Own Label</span>
                        </span>
                        <p class="nds-item-desc">The text lives in your markup, so you can name the component that belongs there and write the line in any language or direction.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="placeholderGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use it in a page template to mark a region the consumer replaces with a real component, so the layout can be reviewed before the content exists</li>
                    <li>Use it inside a surface whose content is still being designed, such as a <a class="nds-color" href="{{ 'components/panels' | relative_url }}">Panel</a> body, a <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a>, or a <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Card</a>, so reviewers see the surface at its real size</li>
                    <li>Name the component that belongs there in the label instead of writing "content here". A specific instruction survives the handover to whoever fills the template in</li>
                    <li>Do not ship it on a live page. It is a scaffolding marker for work in progress, not a state a user should ever see</li>
                    <li>Do not use it when a region is legitimately empty at runtime, for example a list with no results. Use the <a class="nds-color" href="{{ 'components/empty' | relative_url }}">Empty</a> state instead</li>
                    <li>Do not use it while content is being fetched. Use <a class="nds-color" href="{{ 'components/loading' | relative_url }}">Loading</a> skeletons, which match the shape of the content that is arriving</li>
                    <li>Give the parent a height when the placeholder should fill it. In a content-sized parent it settles at its 120px floor</li>
                    <li>Keep the label to a line or two. The region is sized by the layout around it, not by the text inside it</li>
                    <li>Add a second line in another language when the template is handed to a bilingual team. Each line is centered on its own, so mixed scripts stack cleanly</li>
                    <li>Override <code class="nds-inline-code lang-html">--placeholder-FS</code> when a placeholder sits in an unusually large or small region and the default label reads out of proportion. Set <code class="nds-inline-code lang-html">--placeholder-LH</code> alongside it so the two lines keep their rhythm</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Drops the label to the 2xs type ladder for tight regions, without hand-setting the size knobs</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>Lifts the label to the sm type ladder for large regions</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--placeholder-FS</code></td><td><code class="nds-inline-code lang-html">var(--typo-text-xs-FS)</code></td><td>Label font size. Set it on the placeholder, or on an ancestor to retune every placeholder inside</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--placeholder-LH</code></td><td><code class="nds-inline-code lang-html">var(--typo-text-xs-LH)</code></td><td>Label line height. Pair it with any <code class="nds-inline-code lang-html">--placeholder-FS</code> override</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
