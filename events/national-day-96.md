---
layout: page
title: National Day 96 Theme
hero_title: National Day 96 Theme - National Design System
hero_description: An event skin for Saudi National Day. One script tag adds the event hero slide and the identity decorations, in light and dark mode. Delete the tag to restore the default.
breadcrumb: [["Events", "/events"]]
lang: en
direction: ltr
hero_float_actions:
  class: nds-wrap
  items:
    - label: "Download the pack"
      url: "/docs-assets/events/national_day_96/nds-event-national-day-96.zip"
      style: "nds-primary"
      download: true
    - share
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
                        <p class="nds-alert-description">Pick <strong>National Day 96</strong> from the theme switcher in the top bar: the event slide appears and the section decorations apply. Switch back to undo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Automatic -->
<section id="nd96Apply" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic</h2>
            <p class="nds-section-description">Add one tag to your shared <code class="nds-inline-code lang-html">&lt;head&gt;</code>, after the NDS stylesheets and without <code class="nds-inline-code lang-html">defer</code>. It applies the event stylesheet and the hero slide; remove it when the event ends. Every <code class="nds-inline-code lang-html">data-*</code> below is optional (defaults shown); see the table for each one.</p>
            <p class="nds-section-description">The pack is self-contained. Download the zip, then copy its files into your own assets folder. A template copy already ships them at <code class="nds-inline-code lang-html">docs-assets/events/national_day_96/</code>. The paths below assume <code class="nds-inline-code lang-html">assets/events/national_day_96/</code>. The script finds its own CSS and images relative to itself, so the folder works at any location as long as its contents stay together.</p>
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
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-nd96-apply-1" id="tab-nd96-apply-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nd96-apply-1"
                                    aria-labelledby="tab-nd96-apply-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;script src="/assets/events/national_day_96/nds-theme-national-day-96.min.js"
        data-title-ar="اليوم الوطني السعودي 96"
        data-title-en="Saudi National Day 96"
        data-description-ar="نحتفي بمرور 96 عامًا من العز والفخر لوطننا"
        data-description-en="We celebrate 96 years of glory and pride for our nation."
        data-image="hero_bg.webp"
        data-logo="national_day_logo.svg"&gt;&lt;/script&gt;
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
<section id="nd96Manual" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Manual (no JavaScript)</h2>
            <p class="nds-section-description">No-JS alternative: link the stylesheet for the decorations, and paste the slide markup yourself. Add the CSS link in <code class="nds-inline-code lang-html">&lt;head&gt;</code>, and place the slide as the first child of <code class="nds-inline-code lang-html">.nds-swiper-wrapper</code> (raise the hero's <code class="nds-inline-code lang-css">--total</code> by one). The slide is the standard hero markup with the event photo, so it needs no extra styling. Add the event mark to the footer's existing <code class="nds-inline-code lang-html">.nds-footer-logos</code> strip.</p>
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
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-nd96-manual-1" id="tab-nd96-manual-1">
                                        <span class="nds-tab-label">CSS file</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-nd96-manual-2" id="tab-nd96-manual-2">
                                        <span class="nds-tab-label">Hero markup</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-nd96-manual-3" id="tab-nd96-manual-3">
                                        <span class="nds-tab-label">Footer mark</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-nd96-manual-1"
                                    aria-labelledby="tab-nd96-manual-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;link id="nds-theme-stylesheet" rel="stylesheet"
      href="/assets/events/national_day_96/nds-theme-national-day-96.min.css"&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nd96-manual-2"
                                    aria-labelledby="tab-nd96-manual-2" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-swiper-slide nds-content-wrapper nds-nationalDay"&gt;
  &lt;div class="nds-hero-image-wrapper" style="--overlay:0;"&gt;
    &lt;picture&gt;
      &lt;img src="/assets/events/national_day_96/hero_bg.webp" class="nds-hero-image" alt="" fetchpriority="high"&gt;
    &lt;/picture&gt;
  &lt;/div&gt;
  &lt;div class="nds-section-body"&gt;
    &lt;h1 class="nds-section-title"&gt;اليوم الوطني السعودي 96&lt;/h1&gt;
    &lt;p class="nds-section-description"&gt;نحتفي بمرور 96 عامًا من العز والفخر لوطننا&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-nd96-manual-3"
                                    aria-labelledby="tab-nd96-manual-3" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- add inside the footer's existing .nds-footer-logos strip --&gt;
&lt;img src="/assets/events/national_day_96/national_day_logo.svg"
     width="101" height="40" loading="lazy" alt="Saudi National Day 96"&gt;
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

<!-- Data Attributes -->
<section id="nd96Attributes" class="nds-content-section nds-demo-section">
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
                        <tr><td><code class="nds-inline-code lang-html">data-title-ar</code> / <code class="nds-inline-code lang-html">data-title-en</code></td><td>اليوم الوطني السعودي 96 / Saudi National Day 96</td><td>Slide heading per language.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-description-ar</code> / <code class="nds-inline-code lang-html">data-description-en</code></td><td>نحتفي بمرور 96 عامًا … / We celebrate 96 years …</td><td>Slide description. Empty value hides it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-image</code></td><td><code class="nds-inline-code lang-html">hero_bg.webp</code></td><td>Slide background photo. Empty value drops the photo and keeps the default hero surface.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-logo</code></td><td><code class="nds-inline-code lang-html">national_day_logo.svg</code></td><td>Event mark, added to the footer logo strip. Empty value omits it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-url</code></td><td><code class="nds-inline-code lang-html">(none)</code></td><td>Opt-in button link. Empty (default) means no button; non-https is rejected.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-label-ar</code> / <code class="nds-inline-code lang-html">data-cta-label-en</code></td><td>اليوم الوطني / National Day</td><td>Button label per language (only when <code class="nds-inline-code lang-html">data-cta-url</code> is set).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-icon</code></td><td><code class="nds-inline-code lang-html">(none)</code></td><td>Button icon. Empty omits it.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="nd96Features" class="nds-content-section nds-demo-section">
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
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Palette Stays DGA</span>
                    </span>
                    <p class="nds-item-desc">The pack adds no brand colours. Your existing palette and every component keep their own colours.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-01"></i>
                        <span class="nds-label">Standard Hero Slide</span>
                    </span>
                    <p class="nds-item-desc">The slide is the normal hero markup with the event photo as its background, so it carries no slide-specific CSS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-border-all-01"></i>
                        <span class="nds-label">Section Identity Bars</span>
                    </span>
                    <p class="nds-item-desc">A thin event bar sits under every content section, rotating through three artworks, with a corner vector on even sections.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-award-01"></i>
                        <span class="nds-label">Event Mark in the Footer</span>
                    </span>
                    <p class="nds-item-desc">The mark joins the footer's own logo strip, which already sizes every mark, so it lines up with your existing logos.</p>
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
<section id="nd96Guidelines" class="nds-content-section nds-demo-section">
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
                    <li>Set <code class="nds-inline-code lang-html">data-image</code> to your own event photo when you have one, so the hero matches your campaign.</li>
                    <li>Host the pack folder yourself instead of hotlinking a third-party origin.</li>
                    <li>Plan the removal up front: deleting the one line is the entire decommissioning.</li>
                </ul>
            </div>

        </div>
    </div>
</section>
