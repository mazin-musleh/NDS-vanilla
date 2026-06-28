---
layout: page
title: Hajj Theme
hero_title: Hajj Theme - National Design System
hero_description: A welcome skin for the Hajj season. One script tag re-skins the site with a gold-brown brand palette and adds a hero slide with the Saudi-font title, a logo, and a direction-aware background, in light and dark mode. Delete the tag to restore the default.
breadcrumb: [["Events", "/events"]]
lang: en
direction: ltr
---

<!-- Live preview notice -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-inline" data-status="info" role="note">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">Preview it live</span>
                        <p class="nds-alert-description">Pick <strong>Hajj</strong> from the theme switcher in the top bar: the event slide appears and the section decorations apply. Switch back to undo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Automatic -->
<section id="hajjApply" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic</h2>
            <p class="nds-section-description">Add one tag to your shared <code class="nds-inline-code lang-html">&lt;head&gt;</code>, after the NDS stylesheets and without <code class="nds-inline-code lang-html">defer</code>. It applies the event stylesheet and the hero slide; remove it when the season ends. Every <code class="nds-inline-code lang-html">data-*</code> below is optional (defaults shown); see the table for each one.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">One tag applies everything</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-hajj-apply-1" id="tab-hajj-apply-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-hajj-apply-1"
                                    aria-labelledby="tab-hajj-apply-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;script src="/assets/events/Hajj/nds-theme-hajj.min.js"
        data-title-ar="خلق رحلة روحانية خالدة"
        data-title-en="Creating a Lasting Spiritual Journey"
        data-description-ar="رؤيتنا خلق رحلة روحانية خالدة تفوق تطلعات ضيوف الرحمن"
        data-description-en="Our vision is to create a lasting spiritual journey that exceeds the expectations of the Guests of the Most Merciful."
        data-logo="hayyakom.svg"&gt;&lt;/script&gt;
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

<!-- Manual (no JavaScript) -->
<section id="hajjManual" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Manual (no JavaScript)</h2>
            <p class="nds-section-description">No-JS alternative: link the stylesheet for the decorations, and paste the slide markup yourself. Add the CSS link in <code class="nds-inline-code lang-html">&lt;head&gt;</code>, and place the slide as the first child of <code class="nds-inline-code lang-html">.nds-swiper-wrapper</code> (raise the hero's <code class="nds-inline-code lang-css">--total</code> by one). The background flips for direction automatically.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">No-JS setup: stylesheet link and slide markup</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-hajj-manual-1" id="tab-hajj-manual-1">
                                        <span class="nds-tab-label">CSS file</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-hajj-manual-2" id="tab-hajj-manual-2">
                                        <span class="nds-tab-label">Hero markup</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hajj-manual-1"
                                    aria-labelledby="tab-hajj-manual-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;link id="nds-theme-stylesheet" rel="stylesheet"
      href="/assets/events/Hajj/nds-theme-hajj.min.css"&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-hajj-manual-2"
                                    aria-labelledby="tab-hajj-manual-2" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-swiper-slide nds-content-wrapper nds-hajj"&gt;
  &lt;div class="nds-section-body"&gt;
    &lt;img src="/assets/events/Hajj/hayyakom.svg" class="nds-hajj-logo" alt="حياكم"&gt;
    &lt;h1 class="nds-section-title"&gt;خلق رحلة روحانية خالدة&lt;/h1&gt;
    &lt;p class="nds-section-description"&gt;رؤيتنا خلق رحلة روحانية خالدة تفوق تطلعات ضيوف الرحمن&lt;/p&gt;
  &lt;/div&gt;
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

<!-- Data Attributes -->
<section id="hajjAttributes" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Data Attributes</h2>
            <p class="nds-section-description">All go on the <code class="nds-inline-code lang-html">&lt;script&gt;</code> tag, all optional. Asset values take a bare filename (resolved against the pack folder) or a full <code class="nds-inline-code lang-html">https</code> URL.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-title-ar</code> / <code class="nds-inline-code lang-html">data-title-en</code></td><td>خلق رحلة روحانية خالدة / Creating a Lasting Spiritual Journey</td><td>Slide heading per language (rendered in the Saudi font).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-description-ar</code> / <code class="nds-inline-code lang-html">data-description-en</code></td><td>رؤيتنا خلق رحلة روحانية خالدة … / Our vision is to create a lasting spiritual journey …</td><td>Slide description. Empty value hides it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-logo</code></td><td><code class="nds-inline-code lang-html">hayyakom.svg</code></td><td>Top-start logo. Empty value omits it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-url</code></td><td><code class="nds-inline-code lang-html">(none)</code></td><td>Opt-in button link. Empty (default) means no button; non-https is rejected.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-label-ar</code> / <code class="nds-inline-code lang-html">data-cta-label-en</code></td><td>منصة نسك / Nusuk Platform</td><td>Button label per language (only when <code class="nds-inline-code lang-html">data-cta-url</code> is set).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-icon</code></td><td><code class="nds-inline-code lang-html">(none)</code></td><td>Button icon. Empty omits it.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="hajjFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">One-Tag Activation</span>
                    </span>
                    <p class="nds-item-desc">One script tag applies the stylesheet, root marker, and hero slide. No build, no markup edits.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board"></i>
                        <span class="nds-label">Gold-Brown Brand Palette</span>
                    </span>
                    <p class="nds-item-desc">A single seed derives the full primary ramp on DGA's lightness curve, with neutral grays — flowing into light and dark automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-font"></i>
                        <span class="nds-label">Saudi-Font Title</span>
                    </span>
                    <p class="nds-item-desc">The hero heading renders in the official Saudi typeface; the rest of the page keeps IBM Plex Sans Arabic.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mirror"></i>
                        <span class="nds-label">Direction-Aware Background</span>
                    </span>
                    <p class="nds-item-desc">The hero background swaps between an RTL and an LTR artwork automatically with the page direction.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translate"></i>
                        <span class="nds-label">Bilingual Content</span>
                    </span>
                    <p class="nds-item-desc">Each string has Arabic and English values; the pack picks one from the page <code class="nds-inline-code lang-html">lang</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-exchange-01"></i>
                        <span class="nds-label">Theme Switcher Integration</span>
                    </span>
                    <p class="nds-item-desc">The same pack plugs into the <a class="nds-color" href="{{ 'components/themes' | relative_url }}">theme switcher</a>: loads on demand, applies on selection, tears down on switch-away.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="hajjGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use an event pack for a <strong>temporary, site-wide skin</strong> tied to an occasion. For a permanent brand colour, use a <a class="nds-color" href="{{ 'components/themes' | relative_url }}">custom palette or stylesheet theme</a> instead.</li>
                    <li>Add the tag to your shared <code class="nds-inline-code lang-html">&lt;head&gt;</code> on <strong>every page</strong>, not just the home page, so the decorations stay consistent.</li>
                    <li>Override <code class="nds-inline-code lang-html">data-cta-url</code> to your own landing page so analytics stay on your domain.</li>
                    <li>Host the pack folder yourself instead of hotlinking a third-party origin.</li>
                    <li>Plan the removal up front: deleting the one line is the entire decommissioning.</li>
                </ul>
            </div>

        </div>
    </div>
</section>
