---
layout: page
title: Brands
hero_title: Brands - National Design System
hero_description: A runtime brand switcher that re-skins the entire page by setting a data attribute on the root element — buttons, links, chips, neutral grays, and focus rings all follow. Switch between built-in token brands instantly, or load event brands with their own stylesheet and optional behaviour script.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Brand Switcher -->
<section id="brandsSwitcher" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Brand Switcher</h2>
            <p class="nds-section-description">Any element with a <code class="nds-inline-code lang-html">data-brand-value</code> attribute acts as a brand control. Clicking it stamps <code class="nds-inline-code lang-html">data-brand</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code>, saves the choice to localStorage, and syncs <code class="nds-inline-code lang-html">aria-current</code> on every brand control on the page. Because the brand CSS ships in the critical bundle, the selected brand is already applied before the first paint on return visits — no flash. Pick a brand below and every component on this page updates immediately.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Live switcher — changes the whole page brand</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div style="display:flex;flex-direction:column;gap:var(--spacing-lg);">
                                <div role="group" aria-label="Choose a brand" style="display:flex;gap:.5rem;flex-wrap:wrap;">
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-brand-value="">
                                        <span class="nds-label">Default (DGA)</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-brand-value="crimson">
                                        <span class="nds-label">Crimson</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-brand-value="corporate">
                                        <span class="nds-label">Corporate</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-brand-value="sunset">
                                        <span class="nds-label">Sunset</span>
                                    </button>
                                </div>
                                <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;">
                                    <button class="nds-btn nds-primary">
                                        <span class="nds-label">Primary action</span>
                                    </button>
                                    <a href="#brandsSwitcher" class="nds-link nds-primary">Branded link</a>
                                    <button class="nds-chip nds-primary nds-rounded"><span class="nds-label">Brand chip</span></button>
                                    <span class="nds-tag nds-green nds-sm">Status</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-brands-switcher-1" id="tab-brands-switcher-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-brands-switcher-1"
                                    aria-labelledby="tab-brands-switcher-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;!-- Enable in topbar: add brand_switcher: true to _config.yml --&gt;
&lt;!-- data-portal lifts the menu above the topbar's overflow clip --&gt;
&lt;div class="nds-dropmenu nds-brand-switcher" data-portal&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only nds-dropmenu-trigger"
          aria-label="Choose a brand theme"&gt;
    &lt;i class="nds-icon nds-hgi-highlighter" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu nds-brand-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;!-- Empty value restores the DGA default --&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-brand-value=""&gt;
        &lt;span class="nds-label"&gt;Default (DGA)&lt;/span&gt;
      &lt;/button&gt;
      &lt;!-- Token brand: CSS ships in critical, no extra network request --&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-brand-value="crimson"&gt;
        &lt;span class="nds-label"&gt;Crimson&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-brand-value="corporate"&gt;
        &lt;span class="nds-label"&gt;Corporate&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-brand-value="sunset"&gt;
        &lt;span class="nds-label"&gt;Sunset&lt;/span&gt;
      &lt;/button&gt;
      &lt;!-- Stylesheet brand: loads an external CSS file on first activation --&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item"
              data-brand-value="foundation-day"
              data-brand-css="assets/events/foundation_day/nds-brand-foundation-day.min.css"
              data-brand-js="assets/events/foundation_day/nds-brand-foundation-day.min.js"&gt;
        &lt;span class="nds-label"&gt;Foundation Day&lt;/span&gt;
      &lt;/button&gt;
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

<!-- Token Brands -->
<section id="brandsToken" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Token Brands</h2>
            <p class="nds-section-description">Token brands ship inside the critical CSS bundle as <code class="nds-inline-code lang-css">:root[data-brand]</code> override blocks — no external file to fetch, no flash on activation or return visit. Three built-in token brands expand a primary, secondary, and tertiary seed colour into full ramps at build time using OKLCH. Status colours (green, blue, yellow, red) stay universal across all brands. The DGA base is the default when no <code class="nds-inline-code lang-html">data-brand</code> is set.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Built-in token brands</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:var(--spacing-md);">
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#1b8354;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#dba102;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#80519f;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">DGA (default)</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);">Saudi green primary, gold secondary, lavender tertiary. Active when no <code class="nds-inline-code lang-html">data-brand</code> is set.</p>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#be123c;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#d97706;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#0ea5e9;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">Crimson</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);">Deep rose primary, amber secondary, sky blue tertiary. Activate with <code class="nds-inline-code lang-html">data-brand-value="crimson"</code>.</p>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#4338ca;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#0d9488;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#8b5cf6;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">Corporate</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);">Indigo primary, teal secondary, violet tertiary. Activate with <code class="nds-inline-code lang-html">data-brand-value="corporate"</code>.</p>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#b45309;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#db2777;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#f59e0b;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">Sunset</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);">Amber primary, pink secondary, yellow tertiary. Activate with <code class="nds-inline-code lang-html">data-brand-value="sunset"</code>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-brands-token-1" id="tab-brands-token-1">
                                        <span class="nds-tab-label">YAML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-brands-token-1"
                                    aria-labelledby="tab-brands-token-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-yaml code">
# _config.yml — enable the switcher and set a default token brand
brand_switcher: true
brand: corporate

# _data/brands.yml — register token brands for the switcher
# Token brands: value only, no stylesheet: true
- label: Demo
  list:
    - value: crimson
      label: Crimson
    - value: corporate
      label: Corporate
    - value: sunset
      label: Sunset
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

<!-- Stylesheet Brands -->
<section id="brandsStylesheet" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Stylesheet Brands</h2>
            <p class="nds-section-description">Stylesheet brands load an external CSS file and optional JS on activation, making them ideal for event or seasonal overlays that go beyond colour changes: custom hero layouts, seasonal patterns, footer backgrounds, or injected content. Use token brands for simple recolouring. The brand system fetches the stylesheet once and tears down the JS behaviour on switch-away.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stylesheet brand switcher item</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline nds-sm"
                                data-brand-value="foundation-day"
                                data-brand-css="assets/events/foundation_day/nds-brand-foundation-day.min.css"
                                data-brand-js="assets/events/foundation_day/nds-brand-foundation-day.min.js">
                                <span class="nds-label">Foundation Day</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-brands-ss-html" id="tab-brands-ss-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-brands-ss-yaml" id="tab-brands-ss-yaml">
                                        <span class="nds-tab-label">YAML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-brands-ss-js" id="tab-brands-ss-js">
                                        <span class="nds-tab-label">JS Hooks</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-brands-ss-html"
                                    aria-labelledby="tab-brands-ss-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Stylesheet brand: data-brand-css is required; data-brand-js is optional --&gt;
&lt;button class="nds-btn nds-subtle nds-dropmenu-item"
        data-brand-value="foundation-day"
        data-brand-css="assets/events/foundation_day/nds-brand-foundation-day.min.css"
        data-brand-js="assets/events/foundation_day/nds-brand-foundation-day.min.js"&gt;
  &lt;span class="nds-label"&gt;Foundation Day&lt;/span&gt;
&lt;/button&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-brands-ss-yaml"
                                    aria-labelledby="tab-brands-ss-yaml" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-yaml code">
# _data/brands.yml — register a stylesheet brand
- list:
    - value: foundation-day
      label: Foundation Day
      stylesheet: true
      # Asset paths relative to assets/ (defaults to css/nds-brand-{value}.min.css)
      css: events/foundation_day/nds-brand-foundation-day.min.css
      js:  events/foundation_day/nds-brand-foundation-day.min.js

# _config.yml — optionally set as the site default (loads render-blocking)
brand: foundation-day
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-brands-ss-js"
                                    aria-labelledby="tab-brands-ss-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-javascript code">
// nds-brand-{value}.min.js — optional behaviour for a stylesheet brand
// NDS.Brand loads this once on first activation and calls inject/teardown as needed.
(function () {
    'use strict';

    function inject() {
        // Add event-specific DOM content here, e.g. a hero slide:
        // var swiper = document.querySelector('.nds-hero-section .nds-swiper.nds-hero');
        // if (!swiper) return;
        // swiper.querySelector('.nds-swiper-wrapper').insertBefore(buildSlide(), ...);
    }

    function teardown() {
        // Remove anything inject() added — keep the page clean on switch-away
    }

    // Register so NDS.Brand can call inject/teardown at the right moments
    window.__NDS_BRAND_HOOKS = window.__NDS_BRAND_HOOKS || {};
    window.__NDS_BRAND_HOOKS['foundation-day'] = { inject: inject, teardown: teardown };

    // Auto-inject if this brand is still active when the script finishes loading
    // (guards against the user switching away during the async fetch)
    if (window.NDS &amp;&amp; NDS.Brand &amp;&amp; NDS.Brand.get() === 'foundation-day') inject();
})();
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
<section id="brandsFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates on page load, reads the saved brand from localStorage, and applies it before your first interaction — no manual setup needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database"></i>
                        <span class="nds-label">Brand Persistence</span>
                    </span>
                    <p class="nds-item-desc">The selected brand is saved to localStorage and restored on every page in the site, so the user's choice follows them across visits and navigation.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Zero-Flash Token Brands</span>
                    </span>
                    <p class="nds-item-desc">Token brands ship in the critical CSS bundle and are applied before the page is visible — no colour flash on first load or when returning with a saved brand.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-script"></i>
                        <span class="nds-label">Stylesheet Event Brands</span>
                    </span>
                    <p class="nds-item-desc">Event brands load their own CSS file and an optional JS behaviour script, letting you add seasonal layouts, patterns, and injected content beyond colour changes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shuffle"></i>
                        <span class="nds-label">Instant Switching</span>
                    </span>
                    <p class="nds-item-desc">Switching between token brands is instantaneous — one attribute change on <code class="nds-inline-code lang-html">&lt;html&gt;</code> re-skins every component on the page with no reload.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-moon-02"></i>
                        <span class="nds-label">Dark Mode Compatible</span>
                    </span>
                    <p class="nds-item-desc">Brand and dark mode are independent axes — a branded page in dark mode resolves the correct palette automatically with no extra work.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-refresh"></i>
                        <span class="nds-label">Teardown Hooks</span>
                    </span>
                    <p class="nds-item-desc">Stylesheet brands register <code class="nds-inline-code lang-js">inject</code> and <code class="nds-inline-code lang-js">teardown</code> callbacks so any DOM additions are cleanly removed when switching to another brand.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Get, set, and list brands through <code class="nds-inline-code lang-js">NDS.Brand</code> without interacting with the switcher UI — useful for automated brand selection or onboarding flows.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="brandsGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Add <code class="nds-inline-code lang-yaml">brand_switcher: true</code> to <code class="nds-inline-code lang-yaml">_config.yml</code> to enable the built-in topbar brand dropmenu. It renders items automatically from <code class="nds-inline-code lang-yaml">_data/brands.yml</code></li>
                    <li>Set a site default with <code class="nds-inline-code lang-yaml">brand: corporate</code> in <code class="nds-inline-code lang-yaml">_config.yml</code>. NDS loads its CSS render-blocking so the brand is active from the very first paint</li>
                    <li>Use <strong>token brands</strong> (Crimson, Corporate, Sunset) for always-available recolouring. They cost nothing at runtime and never flash because they ship in the critical bundle</li>
                    <li>Use <strong>stylesheet brands</strong> for seasonal or event overlays that need custom layouts, patterns, or JS behaviour beyond colour changes. Do not use them for simple colour differences — the external CSS fetch introduces a delay on cold activation</li>
                    <li>Every colour in the system resolves through three layers: component tokens, semantic tokens, and brand slots. Override the slots at <code class="nds-inline-code lang-css">:root</code> and the whole cascade re-resolves automatically — no component CSS changes needed</li>
                    <li>DGA is always the baseline and fallback. A brand only overrides what it declares; anything not set stays DGA</li>
                    <li>For subtree branding (a section, not the whole page), override the consumed component tokens directly under <code class="nds-inline-code lang-html">[data-brand="…"]</code>. Raw slot overrides do not propagate past <code class="nds-inline-code lang-css">:root</code></li>
                    <li>Keep the user-facing brand switcher out of production flows unless brand selection is a meaningful product feature. Use <code class="nds-inline-code lang-yaml">brand:</code> in <code class="nds-inline-code lang-yaml">_config.yml</code> to fix the brand instead</li>
                    <li>Keep the <code class="nds-inline-code lang-html">data-brand-value</code> keys in <code class="nds-inline-code lang-yaml">_data/brands.yml</code> in sync with the <code class="nds-inline-code lang-css">[data-brand="…"]</code> selectors in the SCSS — they must match exactly</li>
                    <li>Check WCAG contrast (4.5:1 for text, 3:1 for UI) on <code class="nds-inline-code lang-css">primary-600</code> against white when using the OKLCH auto-ramp. The seed anchors the 600 step exactly, but adjacent steps are perceptual approximations and are not contrast-guaranteed</li>
                    <li>Test all brands in dark mode. Token brands inherit dark mode automatically; stylesheet brands must add their own dark overrides using the doubled <code class="nds-inline-code lang-css">:root:root[data-theme="dark"]</code> pattern to win the cascade specificity</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Site Configuration</h3>
                <p>Enable the topbar brand switcher and set a default brand in <code class="nds-inline-code lang-yaml">_config.yml</code>:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-yaml code">
# Show the brand dropmenu in the topbar
brand_switcher: true

# Set a default brand — loads render-blocking before main CSS
brand: corporate          # token brand — CSS ships in critical
# brand: foundation-day  # stylesheet brand — loads external CSS render-blocking
                    </code>
                </div>
                <p>Register brands in <code class="nds-inline-code lang-yaml">_data/brands.yml</code>. Token brands only need a <code class="nds-inline-code lang-yaml">value</code> and <code class="nds-inline-code lang-yaml">label</code>. Stylesheet brands add <code class="nds-inline-code lang-yaml">stylesheet: true</code> plus asset paths:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-yaml code">
# _data/brands.yml
- list:
    - value: foundation-day
      label: Foundation Day
      stylesheet: true
      css: events/foundation_day/nds-brand-foundation-day.min.css
      js:  events/foundation_day/nds-brand-foundation-day.min.js

- label: Demo
  list:
    - value: crimson
      label: Crimson
    - value: corporate
      label: Corporate
    - value: sunset
      label: Sunset
                    </code>
                </div>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Authoring a Custom Brand</h3>
                <p>For a production brand, author the full colour ramps as hex for exact, contrast-checked values and the widest browser support. Create <code class="nds-inline-code lang-css">_sass/brands/_acme.scss</code> and compile it to its own entry point.</p>
                <p><strong>1 — Define the brand slots.</strong> Override all 13 ramp steps plus the alpha ramp for each family, then set the surface tokens:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">
:root {
  /* Primary ramp — 13 steps */
  --colors-primary-25:  #f5f6ff;
  /* …50, 100, 200, 300, 400, 500, 500-alpha-10… */
  --colors-primary-600: #4f46e5;   /* brand anchor */
  /* …700, 800, 900, 950… */

  /* Primary brand-tint alpha ramp (chips, table-selection, autocomplete, footer) */
  --colors-primary-alpha-10: #4f46e51a;   /* …20, 30, 40, 50, 60, 70, 80, 90 */

  /* Repeat for --colors-secondary-* and --colors-tertiary-* */

  /* Deep brand surfaces — not auto-derived; set them explicitly */
  --background-brand-strong: var(--colors-primary-900);
}
                    </code>
                </div>
                <p><strong>2a — Load it (drop-in CSS, no build).</strong> Save as <code class="nds-inline-code lang-yaml">assets/css/nds-brand-acme.min.css</code> and point the config at it. NDS links it render-blocking before paint so the brand never flashes from DGA:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-yaml code">
# _config.yml
brand: acme   # loads assets/css/nds-brand-acme.min.css render-blocking
                    </code>
                </div>
                <p>Consuming the bundle directly (no Jekyll)? Add the brand stylesheet to your <code class="nds-inline-code lang-html">&lt;head&gt;</code> after the NDS critical CSS and before the main CSS, as a blocking <code class="nds-inline-code lang-html">&lt;link rel="stylesheet"&gt;</code> — never deferred or async.</p>
                <p><strong>2b — Load it (SCSS source fork).</strong> Copy the <code class="nds-inline-code lang-css">_sass/brands/_oklch-template.scss</code> helper, fill in your hex, and compile to its own entry point:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-scss code">
// assets/css/nds-brand-acme.min.scss  (Jekyll front-matter entry)
// ---
// ---
@use 'brands/acme';
                    </code>
                </div>
                <p><strong>OKLCH auto-ramp (quick prototype path).</strong> Derive a full ramp from one seed per family using OKLCH relative colour. Needs Chrome 119+ / Safari 16.4+ / Firefox 128+; older engines keep the DGA base. Not contrast-guaranteed — verify WCAG before shipping a real brand this way:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-scss code">
// _sass/brands/_acme.scss
@use 'oklch-template' as oklch;

:root { --brand-primary: #3538cd; --brand-secondary: #0e7090; --brand-tertiary: #6938ef; }

@supports (color: oklch(from white l c h)) {
  :root {
    @include oklch.brand-ramp('primary',   '--brand-primary');
    @include oklch.brand-ramp('secondary', '--brand-secondary');
    @include oklch.brand-ramp('tertiary',  '--brand-tertiary', 500);
    @include oklch.brand-alpha('primary',  '--brand-primary');
    @include oklch.brand-alpha('tertiary', '--brand-tertiary');
  }
}
                    </code>
                </div>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-brand-value</code></td>
                            <td>Set on any brand switcher item. The value must match the key in <code class="nds-inline-code lang-yaml">_data/brands.yml</code> and the <code class="nds-inline-code lang-css">:root[data-brand="…"]</code> SCSS selector. An empty string restores the DGA default and removes <code class="nds-inline-code lang-html">data-brand</code> from <code class="nds-inline-code lang-html">&lt;html&gt;</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-brand-css</code></td>
                            <td>Required on stylesheet brand items. URL of the brand's CSS file. NDS injects a <code class="nds-inline-code lang-html">&lt;link id="nds-brand-stylesheet"&gt;</code> in <code class="nds-inline-code lang-html">&lt;head&gt;</code> pointing here when the brand activates, and removes it on deactivation.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-brand-js</code></td>
                            <td>Optional on stylesheet brand items. URL of a behaviour script loaded once on first activation. The script should register <code class="nds-inline-code lang-js">window.__NDS_BRAND_HOOKS[value] = { inject, teardown }</code> so NDS can call each at the right moment.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <p>These properties are the public re-brand surface. Set them at <code class="nds-inline-code lang-css">:root</code> for a site-wide brand, or at <code class="nds-inline-code lang-css">:root[data-brand="…"]</code> for a token brand override.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-css">--brand-primary</code></td><td>Seed for the primary colour family (anchors at the 600 step). Used by the OKLCH auto-ramp helper; supply the full <code class="nds-inline-code lang-css">--colors-primary-*</code> ramp directly for authored hex brands.</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--brand-secondary</code></td><td>Seed for the secondary colour family (anchors at the 600 step).</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--brand-tertiary</code></td><td>Seed for the tertiary colour family (anchors at the 500 step).</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--background-brand-strong</code></td><td>Deep brand surface used by the hero and footer. Not auto-derived — set explicitly, e.g. <code class="nds-inline-code lang-css">var(--colors-primary-900)</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--background-brand-light</code></td><td>Light brand surface for sub-hero sections and brand-tinted content areas. Defaults to <code class="nds-inline-code lang-css">var(--colors-primary-25)</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--img-overlay-color</code></td><td>Colour of the translucent overlay on hero images. DGA uses its primary-950 (dark green); token brands default to neutral-950 to avoid over-saturating vivid hues.</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--neutral-tint</code></td><td>Per-brand gray temperature dial (0 = true gray, 1 = max brand-hue tint). The OKLCH neutral ramp uses this to warm or cool the gray scale to match the brand hue.</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--nds-font-brand</code></td><td>Brand typeface stack, e.g. <code class="nds-inline-code lang-css">'Cairo', sans-serif</code>. The accessibility panel's dyslexia-friendly fallback also follows this property. The font must be pre-loaded in <code class="nds-inline-code lang-css">_sass/_fonts.scss</code>.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Override Points</h3>
                <p>A few surfaces are kept at DGA's compliant values rather than auto-derived from the brand slots. Set these explicitly in your brand to re-skin them:</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Token</th><th>What it controls</th><th>How to re-brand</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-css">--background-brand-strong</code></td>
                            <td>Deep surface behind the hero and footer. Both default to it; override <code class="nds-inline-code lang-css">--background-hero</code> or <code class="nds-inline-code lang-css">--background-footer</code> to set them individually.</td>
                            <td>Set to the brand's deep tone, e.g. <code class="nds-inline-code lang-css">var(--colors-primary-900)</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-css">--bullet-background-active</code>, <code class="nds-inline-code lang-css">--controls-primary-checked</code>, <code class="nds-inline-code lang-css">--background-footer</code></td>
                            <td>Dark-mode primary accents (swiper bullets, checkboxes/radios, footer wash). DGA draws these from its status-green ramp in dark mode.</td>
                            <td>Override inside <code class="nds-inline-code lang-css">:root[data-brand][data-theme="dark"]</code> pointing at <code class="nds-inline-code lang-css">--colors-primary-*</code> or <code class="nds-inline-code lang-css">--colors-primary-alpha-*</code>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">The Slot Contract</h3>
                <p>Override the public surface; treat the private layer as implementation detail.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Layer</th><th>Tokens</th><th>Override?</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>Brand slots (primary surface)</td>
                            <td><code class="nds-inline-code lang-css">--colors-{primary,secondary,tertiary}-{25…950}</code>, <code class="nds-inline-code lang-css">--colors-primary-500-alpha-10</code>, <code class="nds-inline-code lang-css">--colors-{primary,tertiary}-alpha-{10…100}</code></td>
                            <td>Yes — primary path.</td>
                        </tr>
                        <tr>
                            <td>Seeds (quick path)</td>
                            <td><code class="nds-inline-code lang-css">--brand-primary</code>, <code class="nds-inline-code lang-css">--brand-secondary</code>, <code class="nds-inline-code lang-css">--brand-tertiary</code></td>
                            <td>Yes — feeds the OKLCH helper.</td>
                        </tr>
                        <tr>
                            <td>Semantic and component tokens</td>
                            <td><code class="nds-inline-code lang-css">--background-*</code>, <code class="nds-inline-code lang-css">--text-*</code>, <code class="nds-inline-code lang-css">--border-*</code>, <code class="nds-inline-code lang-css">--button-*</code>, <code class="nds-inline-code lang-css">--link-*</code>, …</td>
                            <td>Optional for surgical tweaks, and required for scoped <code class="nds-inline-code lang-html">[data-brand]</code> theming since slot overrides only resolve at <code class="nds-inline-code lang-css">:root</code>.</td>
                        </tr>
                        <tr>
                            <td>Private</td>
                            <td><code class="nds-inline-code lang-css">--_*</code> working variables</td>
                            <td>No — implementation detail.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Brand</strong> API provides methods to get and set the active brand programmatically. The switcher markup wires itself automatically via global click delegation — use these methods only when you need to control the brand from JavaScript.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Get the current brand ──────────────────────────────────────
// Returns '' for DGA default, or the active brand value string
const brand = NDS.Brand.get();  // e.g. '' | 'crimson' | 'corporate'

// ── Set a brand ────────────────────────────────────────────────
// Stamps data-brand on &lt;html&gt;, saves to localStorage, syncs aria-current
// Returns true on success, false if the brand is not in the registry
NDS.Brand.set('corporate');   // activate a token brand
NDS.Brand.set('');            // restore DGA default (removes data-brand attribute)

// For stylesheet brands, NDS.Brand.set() also fetches the CSS/JS:
NDS.Brand.set('foundation-day');  // loads data-brand-css + data-brand-js on first call

// ── List available brands ──────────────────────────────────────
// Reads data-brand-value from all matching elements in the DOM
// Returns [] if no switcher markup is on the page
const brands = NDS.Brand.list();  // e.g. ['', 'crimson', 'corporate', 'sunset']

// ── Manual init ────────────────────────────────────────────────
// NDS.Brand auto-inits via the delegated bundle — call init() only
// if you add a brand switcher to the DOM after the bundle has already run
NDS.Brand.init();
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
