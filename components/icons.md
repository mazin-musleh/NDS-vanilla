---
layout: page
title: Icons
hero_title: Icons - National Design System
hero_description: "Two icon layers: the HugeIcons Stroke Rounded font for content, and an inline SVG set that components and chrome paint without waiting for a font."
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.4.0"
last_edit: "14/07/2026 - 12:13 AM"
---

<!-- Content icons -->
<section id="iconsContent" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action nds-wrap">
                <a class="nds-btn nds-primary nds-md" href="https://hugeicons.com/icons/stroke-rounded" target="_blank" rel="noopener">
                    <span class="nds-label">Browse the full icon library</span>
                </a>
            </div>
            <h2 class="nds-section-title">Content Icons</h2>
            <p class="nds-section-description">For icons you write into content. The Stroke Rounded font ships with the system, so any glyph it carries works by class name: <code class="nds-inline-code lang-html">hgi hgi-stroke</code> plus <code class="nds-inline-code lang-html">hgi-{name}</code>, where the name is the icon's name on <a class="nds-color" href="https://hugeicons.com/" target="_blank" rel="noopener">hugeicons.com</a>.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-inline nds-block" data-status="warning" role="alert">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">The font trails the catalog</span>
                        <p class="nds-alert-description">The font carries 4,126 glyphs while <a class="nds-color" href="https://hugeicons.com/icons/stroke-rounded" target="_blank" rel="noopener">hugeicons.com</a> lists close to 6,000, so not every icon on the site has a class. If <code class="nds-inline-code lang-html">hgi-{name}</code> renders nothing, pick another icon or use its SVG directly.</p>
                    </div>
                </div>
            </div>
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Font Icon</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <i class="hgi hgi-stroke hgi-search-01" style="font-size: 32px"></i>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-icons-content-1" id="tab-icons-content-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icons-content-1"
                                    aria-labelledby="tab-icons-content-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;i class="hgi hgi-stroke hgi-search-01" style="font-size: 32px"&gt;&lt;/i&gt;</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- UI icons -->
<section id="iconsUI" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">UI Icons</h2>
            <p class="nds-section-description">For icons inside controls and chrome. These are inlined in the stylesheet as SVG masks, so a close button or a validation mark paints with its CSS instead of waiting on the font. The class is <code class="nds-inline-code lang-html">nds-icon</code> plus <code class="nds-inline-code lang-html">nds-hgi-{name}</code>, and only the names in the catalog below exist.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Inline SVG Icon</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <span class="nds-label">Search</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-icons-ui-1" id="tab-icons-ui-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icons-ui-1"
                                    aria-labelledby="tab-icons-ui-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-btn nds-secondary-outline"&gt;
  &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;span class="nds-label"&gt;Search&lt;/span&gt;
&lt;/button&gt;</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- UI icon catalog -->
<section id="iconsCatalog" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">UI Icon Catalog</h2>
            <p class="nds-section-description">The {{ site.data.content.icons.hgi | size | plus: site.data.content.icons.custom.size }} classes the inline layer answers to. Click a tile to copy its class. Some glyphs are drawn for the system, so a name it shares with the font is not the same drawing: <code class="nds-inline-code lang-html">nds-icon-riyal</code> and <code class="nds-inline-code lang-html">hgi-riyal</code> differ.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Interface Glyphs</h3>
                <div class="nds-grid nds-doc-icons">
                    {%- for name in site.data.content.icons.hgi %}
                    <button class="nds-btn nds-subtle nds-copy" data-copy="nds-icon {{ name }}" data-message="{{ name }} class copied">
                        <i class="nds-icon {{ name }}" aria-hidden="true"></i>
                        <span class="nds-label">{{ name }}</span>
                    </button>
                    {%- endfor %}
                </div>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Brand and Bespoke Marks</h3>
                <p>Glyphs outside the HugeIcons set, so they carry an <code class="nds-inline-code lang-html">nds-icon-</code> name: the store logos, the Saudi riyal symbol, and the small marks components paint themselves, such as the avatar placeholder and the checkbox tick.</p>
                <div class="nds-grid nds-doc-icons">
                    {%- for name in site.data.content.icons.custom %}
                    <button class="nds-btn nds-subtle nds-copy" data-copy="nds-icon {{ name }}" data-message="{{ name }} class copied">
                        <i class="nds-icon {{ name }}" aria-hidden="true"></i>
                        <span class="nds-label">{{ name }}</span>
                    </button>
                    {%- endfor %}
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Sizing and color -->
<section id="iconsSizing" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sizing and Color</h2>
            <p class="nds-section-description">Both layers behave like text: an icon is one em square and paints in the current text color, so it matches whatever it sits in. Change either with <code class="nds-inline-code lang-css">font-size</code> and <code class="nds-inline-code lang-css">color</code>, on the icon or on an ancestor.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Inherited Size and Color</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <i class="hgi hgi-stroke hgi-notification-02" style="font-size: 16px"></i>
                            <i class="hgi hgi-stroke hgi-notification-02" style="font-size: 24px"></i>
                            <i class="hgi hgi-stroke hgi-notification-02" style="font-size: 40px; color: var(--icon-primary)"></i>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-icons-sizing-1" id="tab-icons-sizing-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icons-sizing-1"
                                    aria-labelledby="tab-icons-sizing-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;i class="hgi hgi-stroke hgi-notification-02" style="font-size: 16px"&gt;&lt;/i&gt;
&lt;i class="hgi hgi-stroke hgi-notification-02" style="font-size: 24px"&gt;&lt;/i&gt;
&lt;i class="hgi hgi-stroke hgi-notification-02" style="font-size: 40px; color: var(--icon-primary)"&gt;&lt;/i&gt;</code>
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
<section id="iconsFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
            <p class="nds-section-description">What you get from the class alone</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-hard-drive"></i>
                        <span class="nds-label">Self-Hosted</span>
                    </span>
                    <p class="nds-item-desc">The font ships with the system and is served from your own domain. No third-party request, nothing to break if a CDN does.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-rocket-01"></i>
                        <span class="nds-label">Off the Critical Path</span>
                    </span>
                    <p class="nds-item-desc">Icon styles and the font load after the page paints, so content never waits on glyphs.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-eye"></i>
                        <span class="nds-label">Flash-Free Rendering</span>
                    </span>
                    <p class="nds-item-desc">Icons stay hidden until they can paint, so you never see a fallback box or a late shift in the layout.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-exchange-01"></i>
                        <span class="nds-label">Direction-Aware Arrows</span>
                    </span>
                    <p class="nds-item-desc">Use <code class="nds-inline-code lang-html">nds-hgi-arrow-next-01</code> and <code class="nds-inline-code lang-html">nds-hgi-arrow-prev-01</code> for forward and back: they follow reading direction, so one class is correct in Arabic and English. The left and right classes stay literal.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board"></i>
                        <span class="nds-label">Color and Size Inheritance</span>
                    </span>
                    <p class="nds-item-desc">Icons follow the surrounding type and re-tint in dark mode with everything else.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-svg-01"></i>
                        <span class="nds-label">Custom Marks</span>
                    </span>
                    <p class="nds-item-desc">Marks outside HugeIcons, such as the riyal symbol and the store badges, use the same classes.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="iconsGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the <strong>font</strong> (<code class="nds-inline-code lang-html">hgi hgi-stroke hgi-{name}</code>) for content: cards, lists, feature grids, editorial copy</li>
                    <li>Use the <strong>inline set</strong> (<code class="nds-inline-code lang-html">nds-icon nds-hgi-{name}</code>) for controls and chrome, where the icon must paint with the first frame</li>
                    <li>Copy names exactly, numeric suffix included: <code class="nds-inline-code lang-html">hgi-arrow-left-01</code>, not <code class="nds-inline-code lang-html">hgi-arrow-left</code>. A name that does not exist renders nothing</li>
                    <li>For a next or back affordance, use the logical arrows (<code class="nds-inline-code lang-html">nds-hgi-arrow-next-01</code>, <code class="nds-inline-code lang-html">nds-hgi-arrow-prev-01</code>). They mirror on LTR pages, so the same markup reads correctly in both directions. Reach for <code class="nds-inline-code lang-html">arrow-left</code> or <code class="nds-inline-code lang-html">arrow-right</code> only when you mean that literal direction</li>
                    <li>Do not use the inline set for a one-off content icon. It is a fixed list every page carries, while the font already covers the catalog</li>
                    <li>Size with <code class="nds-inline-code lang-css">font-size</code>, not width and height, and let color come from the surrounding text</li>
                    <li>Add <code class="nds-inline-code lang-html">aria-hidden="true"</code> to an icon next to a label. On an icon-only control, put the <code class="nds-inline-code lang-html">aria-label</code> on the control</li>
                    <li>Stay in one style. Only Stroke Rounded ships, and the other styles are not free</li>
                    <li>Using no content icons? Set <code class="nds-inline-code lang-js">use_hgi_font: false</code> in <code class="nds-inline-code lang-js">_config.yml</code> to drop the font from every page</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Icon Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Layer</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">hgi hgi-stroke hgi-{name}</code></td><td>Font</td><td>Any glyph the font carries. <code class="nds-inline-code lang-html">hgi-stroke</code> is the family, <code class="nds-inline-code lang-html">hgi-{name}</code> the glyph</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon nds-hgi-{name}</code></td><td>Inline</td><td>A registered icon painted as an SVG mask. <code class="nds-inline-code lang-html">nds-icon</code> is the one em box, <code class="nds-inline-code lang-html">nds-hgi-{name}</code> the glyph</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon nds-icon-{name}</code></td><td>Inline</td><td>The bespoke marks: <code class="nds-inline-code lang-html">nds-icon-riyal</code>, <code class="nds-inline-code lang-html">nds-icon-quote</code>, <code class="nds-inline-code lang-html">nds-icon-apple</code>, <code class="nds-inline-code lang-html">nds-icon-google-play</code>, <code class="nds-inline-code lang-html">nds-icon-huawei</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-css">--nds-icon</code></td><td>unset</td><td>The mask an <code class="nds-inline-code lang-html">.nds-icon</code> paints. Set it in CSS to swap the glyph without touching the markup</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--nds-icon-{name}</code></td><td>SVG data URI</td><td>One token per inline icon, for example <code class="nds-inline-code lang-css">--nds-icon-eye</code>. Assign one to <code class="nds-inline-code lang-css">--nds-icon</code> rather than pasting an SVG</td></tr>
                    </tbody>
                </table>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy custom property example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">/* Swap the glyph from CSS, no markup change */
.my-toggle[aria-expanded="true"] .nds-icon { --nds-icon: var(--nds-icon-view-off); }</code>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- License -->
<section id="iconsLicense" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">License and Attribution</h2>
            <p class="nds-section-description">The font is the free HugeIcons Stroke Rounded set, under the MIT License. The inline set mixes those glyphs with marks drawn for the system, which are MIT as part of NDS. Commercial use, modification, and redistribution are all permitted; the only condition is that the HugeIcons notice travels with the icons, and it is kept in the <code class="nds-inline-code lang-js">LICENSE</code> file. No credit line is needed on your pages.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">What Ships</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Asset</th><th>Source</th><th>License</th></tr></thead>
                    <tbody>
                        <tr><td>Stroke Rounded icon font</td><td>HugeIcons free set</td><td>MIT, Copyright (c) 2025 Hugeicons</td></tr>
                        <tr><td>Inline icons taken from the font</td><td>HugeIcons free set</td><td>MIT, Copyright (c) 2025 Hugeicons</td></tr>
                        <tr><td>Inline marks drawn for the system</td><td>National Design System</td><td>MIT, part of NDS</td></tr>
                        <tr><td>Solid, bulk, duotone, twotone, sharp styles</td><td>Not included</td><td>Requires a HugeIcons Pro license</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Before You Add an Icon</h3>
                <ul>
                    <li>Take icons from the <strong>free Stroke Rounded</strong> style only. The paid styles carry a different license</li>
                    <li>Download from <a class="nds-color" href="https://hugeicons.com/" target="_blank" rel="noopener">hugeicons.com</a>, which holds the full catalog and every canonical name</li>
                    <li>Pro terms are on the <a class="nds-color" href="https://hugeicons.com/license-agreement" target="_blank" rel="noopener">HugeIcons license agreement</a> page</li>
                    <li>The MIT grant covers using the icons in a product, not repackaging the set as an icon library</li>
                </ul>
            </div>
        </div>
    </div>
</section>
