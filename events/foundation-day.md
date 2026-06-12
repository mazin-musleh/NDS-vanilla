---
layout: page
title: Foundation Day Theme
hero_title: Foundation Day Theme - National Design System
hero_description: A ready-made event theme for Saudi Founding Day. One script tag re-skins the site with the heritage brown palette and adds a bilingual hero slide. Delete the tag to restore the default.
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
                        <p class="nds-alert-description">Pick <strong>Foundation Day</strong> from the theme switcher in the top bar: the site re-skins and the event slide appears. Switch back to undo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Automatic -->
<section id="fdayApply" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic</h2>
            <p class="nds-section-description">Add one tag to your shared <code class="nds-inline-code lang-html">&lt;head&gt;</code>, after the NDS stylesheets and without <code class="nds-inline-code lang-html">defer</code>. It applies the palette and the hero slide; remove it when the event ends. Every <code class="nds-inline-code lang-html">data-*</code> below is optional (defaults shown); see the table for each one.</p>
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
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-fday-apply-1" id="tab-fday-apply-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-fday-apply-1"
                                    aria-labelledby="tab-fday-apply-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;script src="/assets/events/foundation_day/nds-theme-foundation-day.min.js"
        data-title-ar="يوم بدينا"
        data-title-en="Our Story"
        data-description-ar="تأسيس نعتز به، ومستقبل نصنعه"
        data-description-en="A founding we cherish, a future we shape"
        data-image="https://cdn.example.sa/img/founding-hero-2026.webp"
        data-cta-url="https://www.foundingday.sa/"
        data-cta-label-ar="منصة يوم التأسيس"
        data-cta-label-en="Foundation Day Platform"
        data-cta-icon="founding-icon.svg"&gt;&lt;/script&gt;
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
<section id="fdayManual" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Manual (no JavaScript)</h2>
            <p class="nds-section-description">No-JS alternative: link the stylesheet for the palette, and paste the slide markup yourself. Add the CSS link in <code class="nds-inline-code lang-html">&lt;head&gt;</code>, and place the slide as the first child of <code class="nds-inline-code lang-html">.nds-swiper-wrapper</code> (raise the hero's <code class="nds-inline-code lang-css">--total</code> by one).</p>
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
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-fday-manual-1" id="tab-fday-manual-1">
                                        <span class="nds-tab-label">CSS file</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-fday-manual-2" id="tab-fday-manual-2">
                                        <span class="nds-tab-label">Hero markup</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-fday-manual-1"
                                    aria-labelledby="tab-fday-manual-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;link id="nds-theme-stylesheet" rel="stylesheet"
      href="/assets/events/foundation_day/nds-theme-foundation-day.min.css"&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-fday-manual-2"
                                    aria-labelledby="tab-fday-manual-2" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-swiper-slide nds-content-wrapper nds-foundingDay"&gt;
  &lt;div class="nds-hero-image-wrapper nds-full-width" style="--overlay:0;position:absolute;inset:0;"&gt;
    &lt;picture&gt;
      &lt;img src="/assets/events/foundation_day/Hero_bg.webp" class="nds-hero-image" alt=""
           style="width:100%;height:100%;object-fit:cover;display:block;" fetchpriority="high"&gt;
    &lt;/picture&gt;
  &lt;/div&gt;
  &lt;div class="nds-section-body nds-full-width" style="position:relative;z-index:3;"&gt;
    &lt;div class="nds-block nds-content-wrapper"&gt;
      &lt;div&gt;
        &lt;h1 class="nds-section-title"&gt;يوم بدينا&lt;/h1&gt;
        &lt;p class="nds-section-description"&gt;تأسيس نعتز به، ومستقبل نصنعه&lt;/p&gt;
        &lt;div class="nds-section-action"&gt;
          &lt;a class="nds-btn nds-primary nds-oncolor" href="https://www.foundingday.sa/"
             target="_blank" rel="noopener noreferrer"&gt;
            &lt;img src="/assets/events/foundation_day/founding-icon.svg" class="nds-icon" width="24" height="24" alt=""&gt;
            &lt;span class="nds-label"&gt;منصة يوم التأسيس&lt;/span&gt;
          &lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
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
<section id="fdayAttributes" class="nds-content-section nds-demo-section">
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
                        <tr><td><code class="nds-inline-code lang-html">data-title-ar</code> / <code class="nds-inline-code lang-html">data-title-en</code></td><td>يوم بدينا / Our Story</td><td>Slide heading per language.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-description-ar</code> / <code class="nds-inline-code lang-html">data-description-en</code></td><td>تأسيس نعتز به، ومستقبل نصنعه / A founding we cherish, a future we shape</td><td>Slide description. Empty value hides it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-image</code></td><td><code class="nds-inline-code lang-html">Hero_bg.webp</code></td><td>Background photo. Empty value uses the brown background variant.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-url</code></td><td><code class="nds-inline-code lang-html">https://www.foundingday.sa/</code></td><td>Button link. Empty removes the button; non-https is rejected.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-label-ar</code> / <code class="nds-inline-code lang-html">data-cta-label-en</code></td><td>منصة يوم التأسيس / Foundation Day Platform</td><td>Button label per language.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cta-icon</code></td><td><code class="nds-inline-code lang-html">founding-icon.svg</code></td><td>Button icon. Empty omits it.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="fdayFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">One script tag applies the palette, root marker, and hero slide. No build, no markup edits.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Zero-Flash First Paint</span>
                    </span>
                    <p class="nds-item-desc">Placed in the head, the stylesheet resolves before first paint, so the default colours never flash.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-01"></i>
                        <span class="nds-label">Configurable Hero Slide</span>
                    </span>
                    <p class="nds-item-desc">Set the slide title, description, photo, and CTA with <code class="nds-inline-code lang-html">data-*</code> attributes; defaults when omitted.</p>
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
                        <i class="hgi hgi-stroke hgi-delete-02"></i>
                        <span class="nds-label">Clean Removal</span>
                    </span>
                    <p class="nds-item-desc">Delete the tag and the palette, token, and slide are gone on the next load.</p>
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
<section id="fdayGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use an event pack for a <strong>temporary, site-wide skin</strong> tied to an occasion. For a permanent brand colour, use a <a class="nds-color" href="{{ 'components/themes' | relative_url }}">custom palette or stylesheet theme</a> instead.</li>
                    <li>Add the tag to your shared <code class="nds-inline-code lang-html">&lt;head&gt;</code> on <strong>every page</strong>, not just the home page, so the palette stays consistent.</li>
                    <li>Override <code class="nds-inline-code lang-html">data-cta-url</code> to your own landing page so analytics stay on your domain.</li>
                    <li>Host the pack folder yourself instead of hotlinking a third-party origin.</li>
                    <li>Plan the removal up front: deleting the one line is the entire decommissioning.</li>
                </ul>
            </div>

        </div>
    </div>
</section>
