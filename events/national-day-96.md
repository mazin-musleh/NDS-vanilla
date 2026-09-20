---
layout: page
title: National Day 96 Theme
hero_title: National Day 96 Theme - National Design System
hero_description: An event skin for Saudi National Day. One script tag adds the official six-slide event hero and the identity decorations, in light and dark mode. Delete the tag to restore the default.
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
                        <p class="nds-alert-description">Pick <strong>National Day 96</strong> from the theme switcher in the top bar: the six-slide hero appears and the section decorations apply. Switch back to undo.</p>
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
            <p class="nds-section-description">One tag in your shared <code class="nds-inline-code lang-html">&lt;head&gt;</code>, after the NDS stylesheets, without <code class="nds-inline-code lang-html">defer</code>. Pick the hero type with <code class="nds-inline-code lang-html">data-type</code>. Delete the tag to end the event. The script carries the pack's CSS, so the tag is the only asset you add to the page. You need the <code class="nds-inline-code lang-html">.min.css</code> file only for the no-script setup below, or when you want to override a rule.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Type 2 is the default; add data-type="1" for the single slide</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-nd96-apply-1" id="tab-nd96-apply-1">
                                        <span class="nds-tab-label">Type 2 — six slides</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-nd96-apply-2" id="tab-nd96-apply-2">
                                        <span class="nds-tab-label">Type 1 — one slide</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-nd96-apply-3" id="tab-nd96-apply-3">
                                        <span class="nds-tab-label">Type 1 with overrides</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-nd96-apply-1"
                                    aria-labelledby="tab-nd96-apply-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;script src="/assets/events/national_day_96/nds-theme-national-day-96.min.js"&gt;&lt;/script&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-nd96-apply-2"
                                    aria-labelledby="tab-nd96-apply-2" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;script src="/assets/events/national_day_96/nds-theme-national-day-96.min.js" data-type="1"&gt;&lt;/script&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nd96-apply-3"
                                    aria-labelledby="tab-nd96-apply-3" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;script src="/assets/events/national_day_96/nds-theme-national-day-96.min.js"
        data-type="1"
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
            <div class="nds-block nds-prose">
                <ul>
                    <li><strong>Type 2</strong> (default): the official campaign hero. Six slides, each with its own card, colour and typed word, moving on by themselves. Your own hero slides step aside while the pack is on and return when it is removed. The content is fixed.</li>
                    <li><strong>Type 1</strong>: one plain slide with the event photo, added in front of your own slides. The title, description, image and button attributes in the table below apply to it.</li>
                    <li><strong>Files</strong>: download the zip and copy its files into your own assets folder. The script finds its CSS and images next to itself, so the folder works at any path as long as it stays together. The paths above assume <code class="nds-inline-code lang-html">assets/events/national_day_96/</code>.</li>
                    <li><strong>Older NDS</strong>: works on releases before deck mode too (tested on 1.9.0; the swiper hooks it uses exist since 1.4.0). Before 1.12.0 the swiper has no loop, so the arrows stop at the ends while the cards, auto-advance and drag still wrap.</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Manual (no JavaScript) -->
<section id="nd96Manual" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Manual (no JavaScript)</h2>
            <p class="nds-section-description">Both hero types work without the script: link the stylesheet and paste the markup yourself. Add the CSS link in <code class="nds-inline-code lang-html">&lt;head&gt;</code>. Add the event mark to the footer's existing <code class="nds-inline-code lang-html">.nds-footer-logos</code> strip.</p>
            <p class="nds-section-description"><strong>Type 1</strong> adds one slide to your existing hero. Place it as the first child of <code class="nds-inline-code lang-html">.nds-swiper-wrapper</code> and raise the hero's <code class="nds-inline-code lang-css">--total</code> by one. It is the standard hero markup with the event photo, so it needs no extra styling.</p>
            <p class="nds-section-description"><strong>Type 2</strong> replaces the hero with the card deck. Write the cards in slide order and the <a class="nds-color" href="{{ 'components/swiper' | relative_url }}#swiperDeck">deck mode</a> places them — no per-card attributes. Pick the campaign colour with one <code class="nds-inline-code lang-html">nds-nd96-&lt;name&gt;</code> class on the section: heritage, courage, ambition, generosity, kindness or vision.</p>
            <p class="nds-section-description">The script is what adds the typed word, the colour change on every slide, and the automatic advance. Without it the hero keeps one colour and the word is plain text.</p>
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
                                        <span class="nds-tab-label">Type 1 slide</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-nd96-manual-4" id="tab-nd96-manual-4">
                                        <span class="nds-tab-label">Type 2 hero</span>
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
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nd96-manual-4"
                                    aria-labelledby="tab-nd96-manual-4" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;section class="nds-hero-section nds-nd96 nds-nd96-heritage"&gt;
  &lt;div class="nds-swiper nds-hero nds-oncolor nds-deck" style="--total: 6"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;
      &lt;div class="nds-swiper-slide nds-content-wrapper nds-nd96-slide"&gt;
        &lt;div class="nds-section-body"&gt;
          &lt;h1 class="nds-section-title"&gt;عِزّنا &lt;span class="nds-nd96-typed"&gt;إرثنا&lt;/span&gt;&lt;/h1&gt;
          &lt;p class="nds-section-description"&gt;…&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;!-- one slide per card, same order, each later one hidden --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-deck"&gt;
      &lt;button type="button" class="nds-swiper-card" aria-label="عِزّنا إرثنا"&gt;
        &lt;img src="/assets/events/national_day_96/card_heritage.webp" alt="" fetchpriority="high"&gt;
      &lt;/button&gt;
      &lt;!-- card_courage · card_ambition · card_generosity · card_kindness · card_vision --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-navigation nds-center" hidden&gt;
      &lt;div class="nds-swiper-buttons"&gt;
        &lt;button class="nds-btn nds-subtle nds-icon-only nds-prev" aria-label="Previous slide"&gt;&lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-icon-only nds-next" aria-label="Next slide"&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="nds-swiper-pagination nds-md"&gt;&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
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
            <p class="nds-section-description">All go on the <code class="nds-inline-code lang-html">&lt;script&gt;</code> tag, all optional. Only <code class="nds-inline-code lang-html">data-type</code> and <code class="nds-inline-code lang-html">data-logo</code> apply to type 2; the rest shape the type 1 slide. Asset values take a bare filename (resolved against the pack folder) or a full <code class="nds-inline-code lang-html">https</code> URL.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-type</code></td><td><code class="nds-inline-code lang-html">2</code></td><td>Hero type. <code class="nds-inline-code lang-html">2</code> is the official six-slide hero with its fixed campaign content. <code class="nds-inline-code lang-html">1</code> is one plain slide; the title, description, image and button attributes below apply to it only.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-title-ar</code> / <code class="nds-inline-code lang-html">data-title-en</code></td><td>اليوم الوطني السعودي 96 / Saudi National Day 96</td><td>Type 1 slide heading per language.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-description-ar</code> / <code class="nds-inline-code lang-html">data-description-en</code></td><td>نحتفي بمرور 96 عامًا … / We celebrate 96 years …</td><td>Type 1 slide description. Empty value hides it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-image</code></td><td><code class="nds-inline-code lang-html">hero_bg.webp</code></td><td>Type 1 slide background photo. Empty value drops the photo and keeps the default hero surface.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-logo</code></td><td><code class="nds-inline-code lang-html">national_day_logo.svg</code></td><td>Event mark, added to the footer logo strip. Empty value omits it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-url</code></td><td><code class="nds-inline-code lang-html">(none)</code></td><td>Type 1 opt-in button link. Empty (default) means no button; non-https is rejected.</td></tr>
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
                    <p class="nds-item-desc">One script tag applies the stylesheet it carries, the root marker, and the hero slide. No build, no markup edits.</p>
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
                        <span class="nds-label">Official Six-Slide Hero</span>
                    </span>
                    <p class="nds-item-desc">The campaign hero on the swiper's deck mode: six slides, each with its own card, colour and typed word, moving on by themselves. Type 1 keeps one plain slide with the event photo instead.</p>
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
                    <p class="nds-item-desc">Each string has Arabic and English values; the pack picks one from the page direction: <code class="nds-inline-code lang-html">dir="rtl"</code> reads Arabic, anything else English.</p>
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
