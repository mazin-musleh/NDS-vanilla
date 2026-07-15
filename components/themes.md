---
layout: page
title: Themes
hero_title: Themes - National Design System
hero_description: Keep the DGA default, switch on dark mode, or make the system your own. Define a brand palette from a few seed colours with the OKLCH engine, or ship a full stylesheet theme that overrides the design tokens.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.3.0"
last_edit: "03/07/2026 - 05:43 PM"
---

<!-- Experimental notice (dark mode) -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">Experimental</span>
                        <p class="nds-alert-description">Dark mode is currently in an experimental phase and is not guaranteed to meet DGA compliance standards. Use in production at your own discretion.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Theme Switcher -->
<section id="themesSwitcher" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Theme Switcher</h2>
            <p class="nds-section-description">Everything lives in one attribute on the root element: <code class="nds-inline-code lang-html">data-theme</code> is a space-separated token list holding the mode (<code class="nds-inline-code lang-html">dark</code>, with light as the default) and an optional theme name, so <code class="nds-inline-code lang-html">data-theme="dark crimson"</code> is dark mode on the Crimson palette. Give any control a <code class="nds-inline-code lang-html">data-theme-value</code> and it becomes a switcher: clicking it writes that theme token into <code class="nds-inline-code lang-html">data-theme</code> (keeping the dark token), saves the choice, and syncs <code class="nds-inline-code lang-html">aria-current</code>. Pick a theme and every component below updates.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <span class="nds-label">Theme</span>
                                </button>
                                <div class="nds-dropmenu-menu nds-theme-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="">
                                            <span class="nds-label">Default (DGA)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="crimson">
                                            <span class="nds-label">Crimson</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="corporate">
                                            <span class="nds-label">Corporate</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="sunset">
                                            <span class="nds-label">Sunset</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle nds-icon-only" data-theme-toggle aria-pressed="false" aria-label="Toggle dark mode">
                                <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary">
                                <span class="nds-label">Primary action</span>
                            </button>
                            <a href="#themesSwitcher" class="nds-link nds-primary">Themed link</a>
                            <button class="nds-chip nds-primary nds-rounded"><span class="nds-label">Theme chip</span></button>
                            <span class="nds-tag nds-green nds-sm">Status</span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-switcher-1" id="tab-themes-switcher-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-switcher-1"
                                    aria-labelledby="tab-themes-switcher-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-dropmenu"&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger"&gt;
    &lt;span class="nds-label"&gt;Theme&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu nds-theme-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value=""&gt;
        &lt;span class="nds-label"&gt;Default (DGA)&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="crimson"&gt;
        &lt;span class="nds-label"&gt;Crimson&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="corporate"&gt;
        &lt;span class="nds-label"&gt;Corporate&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="sunset"&gt;
        &lt;span class="nds-label"&gt;Sunset&lt;/span&gt;
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
</section>

<!-- Dark Mode -->
<section id="themesDark" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dark Mode</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-theme-toggle</code> to any button or switch and it is wired automatically: the click flips the <code class="nds-inline-code lang-html">dark</code> token (keeping any active theme), persists the choice, swaps the moon and sun icon, and plays a circular reveal. Dark works on every palette.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Button toggle</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-icon-only" data-theme-toggle aria-pressed="false" aria-label="Toggle dark mode">
                                <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-darkbtn-1" id="tab-themes-darkbtn-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-darkbtn-1"
                                    aria-labelledby="tab-themes-darkbtn-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-btn nds-subtle nds-icon-only"
        data-theme-toggle aria-pressed="false" aria-label="Toggle dark mode"&gt;
  &lt;i class="nds-icon nds-hgi-moon-02" aria-hidden="true"&gt;&lt;/i&gt;
&lt;/button&gt;</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Switch toggle (settings pages)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-switch-container" data-theme-toggle>
                                <div class="nds-form-header" data-feedback-target>
                                    <label for="themes-dark-switch-1">
                                        <span class="nds-label">Dark Mode</span>
                                        <span class="nds-info">Switch between light and dark themes</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-switch nds-neutral">
                                        <input type="checkbox" id="themes-dark-switch-1" class="nds-switch-input" role="switch" aria-label="Dark mode">
                                        <div class="nds-switch-track">
                                            <div class="nds-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-darksw-1" id="tab-themes-darksw-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-darksw-1"
                                    aria-labelledby="tab-themes-darksw-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-switch-container" data-theme-toggle&gt;
  &lt;div class="nds-form-header" data-feedback-target&gt;
    &lt;label for="dark-switch"&gt;
      &lt;span class="nds-label"&gt;Dark Mode&lt;/span&gt;
      &lt;span class="nds-info"&gt;Switch between light and dark themes&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-switch nds-neutral"&gt;
      &lt;input type="checkbox" id="dark-switch" class="nds-switch-input" role="switch" aria-label="Dark mode"&gt;
      &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Themes and Custom Palette -->
<section id="themesPalette" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom Palette</h2>
            <p class="nds-section-description">Define a complete theme from one to three seed colours. The OKLCH engine derives every ramp step from your seed with CSS relative colour, <code class="nds-inline-code lang-css">oklch(from var(--brand-primary) L C H)</code>: it keeps the seed's hue, sets a perceptually-even lightness, and scales the chroma, so the ramp stays balanced for any colour. Set the seeds plus the <code class="nds-inline-code lang-html">data-palette</code> flag on the root element and the full light palette, the brand-tint alphas, a temperature-matched neutral scale, and the dark variant are all generated. Without the flag the page stays on the frozen DGA default. The engine needs CSS relative colour (Chrome 119, Safari 16.4, Firefox 128; mid-2024); older browsers fall back to the DGA default, so ship a stylesheet theme if you must brand them.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <span class="nds-label">Palette</span>
                                </button>
                                <div class="nds-dropmenu-menu nds-theme-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="">
                                            <span class="nds-label">DGA (default)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-theme-value="violet" data-seed-primary="#7c3aed" data-seed-secondary="#ec4899" data-seed-tint="0.4">
                                            <span class="nds-label">Custom (Violet)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle nds-icon-only" data-theme-toggle aria-pressed="false" aria-label="Toggle dark mode">
                                <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary">
                                <span class="nds-label">Primary action</span>
                            </button>
                            <a href="#themesPalette" class="nds-link nds-primary">Themed link</a>
                            <button class="nds-chip nds-primary nds-rounded"><span class="nds-label">Theme chip</span></button>
                            <span class="nds-tag nds-green nds-sm">Status</span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-html" id="tab-themes-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-themes-css" id="tab-themes-css">
                                        <span class="nds-tab-label">CSS</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-themes-js" id="tab-themes-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-html"
                                    aria-labelledby="tab-themes-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Seeds inline on the root element --&gt;
&lt;html data-palette style="--brand-primary: #7c3aed; --brand-secondary: #ec4899; --neutral-tint: 0.4;"&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-css"
                                    aria-labelledby="tab-themes-css" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-css code">
/* Add data-palette to &lt;html&gt;; only --brand-primary is required. */
:root[data-palette] {
  --brand-primary:   #7c3aed;
  --brand-secondary: #ec4899;
  --neutral-tint:    0.4;
}
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-js"
                                    aria-labelledby="tab-themes-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// Set the seeds, then flip the data-palette flag.
const root = document.documentElement;
root.style.setProperty('--brand-primary', '#7c3aed');
root.style.setProperty('--brand-secondary', '#ec4899');
root.style.setProperty('--neutral-tint', '0.4');
root.setAttribute('data-palette', '');
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

<!-- Stylesheet Themes -->
<section id="themesStylesheet" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Stylesheet Themes</h2>
            <p class="nds-section-description">For exact, contrast-checked colours, the widest browser support, or styling beyond colour (custom hero layouts, patterns, injected content), ship a theme as its own stylesheet that overrides the colour tokens at <code class="nds-inline-code lang-css">:root</code>. In production you load it server-side as a render-blocking <code class="nds-inline-code lang-html">&lt;link&gt;</code> after the NDS critical CSS. Override the full set of themeable tokens below; the semantic and component tokens re-resolve from them.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Override the colour tokens in your own stylesheet</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-ss-css" id="tab-themes-ss-css">
                                        <span class="nds-tab-label">Theme CSS</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-themes-ss-html" id="tab-themes-ss-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-ss-css"
                                    aria-labelledby="tab-themes-ss-css">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-css code">
/* DGA values shown; replace with your brand ramp. Status + base stay on DGA. */
:root {
  /* Primary ramp (anchor your brand colour at the 600 step) */
  --colors-primary-25:  #f7fdf9;
  --colors-primary-50:  #f3fcf6;
  --colors-primary-100: #dff6e7;
  --colors-primary-200: #b8eacb;
  --colors-primary-300: #88d8ad;
  --colors-primary-400: #54c08a;
  --colors-primary-500: #25935f;
  --colors-primary-600: #1b8354;
  --colors-primary-700: #166a45;
  --colors-primary-800: #14573a;
  --colors-primary-900: #104631;
  --colors-primary-950: #092a1e;
  /* Brand-tint alphas (chips, table selection, footer) */
  --colors-primary-alpha-10: #1b835419;
  --colors-primary-alpha-20: #1b835433;
  --colors-primary-alpha-30: #1b83544c;
  --colors-primary-alpha-40: #1b835466;
  --colors-primary-alpha-50: #1b83547f;
  --colors-primary-alpha-60: #1b835499;
  --colors-primary-alpha-70: #1b8354b2;
  --colors-primary-alpha-80: #1b8354cc;
  --colors-primary-alpha-90: #1b8354e5;

  /* Secondary ramp */
  --colors-secondary-25:  #fffef7;
  --colors-secondary-50:  #fffef2;
  --colors-secondary-100: #fffce6;
  --colors-secondary-200: #fcf3bd;
  --colors-secondary-300: #fae996;
  --colors-secondary-400: #f7d54d;
  --colors-secondary-500: #f5bd02;
  --colors-secondary-600: #dba102;
  --colors-secondary-700: #b87b02;
  --colors-secondary-800: #945c01;
  --colors-secondary-900: #6e3c00;
  --colors-secondary-950: #472400;

  /* Tertiary ramp (anchor at the 500 step) */
  --colors-tertiary-25:  #fefcff;
  --colors-tertiary-50:  #f9f5fa;
  --colors-tertiary-100: #f2e9f5;
  --colors-tertiary-200: #e1cce8;
  --colors-tertiary-300: #ccadd9;
  --colors-tertiary-400: #a57bba;
  --colors-tertiary-500: #80519f;
  --colors-tertiary-600: #6d428f;
  --colors-tertiary-700: #532d75;
  --colors-tertiary-800: #3d1d5e;
  --colors-tertiary-900: #281047;
  --colors-tertiary-950: #16072e;
  --colors-tertiary-alpha-10: #80519f19;
  --colors-tertiary-alpha-20: #80519f33;

  /* Neutral ramp (grayscale; adds 750 + 850 steps) */
  --colors-neutral-25:  #fcfcfd;
  --colors-neutral-50:  #f9fafb;
  --colors-neutral-100: #f3f4f6;
  --colors-neutral-200: #e5e7eb;
  --colors-neutral-300: #d2d6db;
  --colors-neutral-400: #9da4ae;
  --colors-neutral-500: #6c727e;
  --colors-neutral-600: #4d5761;
  --colors-neutral-700: #384250;
  --colors-neutral-750: #2b3643;
  --colors-neutral-800: #1f2a37;
  --colors-neutral-850: #18212f;
  --colors-neutral-900: #111927;
  --colors-neutral-950: #0c111b;

  /* Deep brand surfaces (hero / footer / image overlay) */
  --background-primary-strong: var(--colors-primary-900);
  --background-primary-light:  var(--colors-primary-50);
  --img-overlay-color:       var(--colors-neutral-950);
}

/* Dark-mode corrections; double the :root if this sheet loads first. */
:root:root[data-theme~="dark"] {
  --background-card:   #1f2a37;
  --background-footer: #0c111b;
}
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-ss-html"
                                    aria-labelledby="tab-themes-ss-html" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;link rel="stylesheet" href="assets/themes/my-brand.css"&gt;
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
<section id="themesFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Toggles and switchers wire themselves: drop in <code class="nds-inline-code lang-html">data-theme-toggle</code> or <code class="nds-inline-code lang-html">data-theme-value</code> controls and they work, no setup code.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database"></i>
                        <span class="nds-label">Preference Persistence</span>
                    </span>
                    <p class="nds-item-desc">The chosen mode and theme are saved to <code class="nds-inline-code lang-js">localStorage</code> and restored on every page, so the choice follows the user across visits.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Zero-Flash</span>
                    </span>
                    <p class="nds-item-desc">A saved mode or theme re-applies before the page is visible, so there is no colour flash on first load or return visit.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-sparkles"></i>
                        <span class="nds-label">Circular Reveal Animation</span>
                    </span>
                    <p class="nds-item-desc">Switching mode or theme expands the new look outward from the clicked control in a circular ripple, with an instant swap where View Transitions are unsupported.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-moon-02"></i>
                        <span class="nds-label">Light and Dark</span>
                    </span>
                    <p class="nds-item-desc">A built-in dark mode that works on every palette, with an automatic moon and sun icon swap on any toggle control.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-color-picker"></i>
                        <span class="nds-label">Custom Palettes</span>
                    </span>
                    <p class="nds-item-desc">Set one to three seed colours and a neutral-tint dial; the OKLCH engine derives the full ramp and the dark variant. Dark follows the seeds with no extra work.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-script"></i>
                        <span class="nds-label">Stylesheet Themes</span>
                    </span>
                    <p class="nds-item-desc">Ship a full theme as its own stylesheet that overrides the colour tokens at the root, for bespoke palettes and visuals beyond the generated ramp.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Read or flip the mode with <code class="nds-inline-code lang-js">NDS.Theme.get/set/toggle</code>, or apply a custom palette by setting <code class="nds-inline-code lang-css">--brand-*</code> and the <code class="nds-inline-code lang-html">data-palette</code> flag.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="themesGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Most government sites need no setup: the DGA default is active out of the box. Add theming only when you need dark mode or your own brand colours</li>
                    <li>Place a dark-mode button toggle in the <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">Top Bar</a> so it is reachable from every page; use the switch toggle on settings or preferences pages</li>
                    <li>Reach for a <strong>custom palette</strong> (<code class="nds-inline-code lang-html">data-palette</code> + <code class="nds-inline-code lang-css">--brand-primary</code>) when you want your brand colour fast and dark mode handled for you</li>
                    <li>Reach for a <strong>stylesheet theme</strong> when you need exact, contrast-checked colours, support for older browsers, or styling beyond colour (layouts, patterns, injected content); in production load it server-side as a render-blocking <code class="nds-inline-code lang-html">&lt;link&gt;</code>, rather than injecting at runtime</li>
                    <li>Use <code class="nds-inline-code lang-js">NDS.Theme.toggle()</code> / <code class="nds-inline-code lang-js">NDS.Theme.set()</code> for mode changes instead of writing <code class="nds-inline-code lang-html">data-theme</code> by hand, so the active theme token is preserved</li>
                    <li>Reference semantic tokens (<code class="nds-inline-code lang-css">--background-card</code>, <code class="nds-inline-code lang-css">--text-default</code>) in your own component CSS so it follows both mode and theme automatically</li>
                    <li>Do not hardcode colours in your CSS: hardcoded values respond to neither dark mode nor themes</li>
                    <li>For a custom palette, check WCAG contrast (4.5:1 text, 3:1 UI) on your primary against white. The seed anchors the 600 step exactly, but the derived steps are perceptual approximations and are not contrast-guaranteed</li>
                    <li>Scope your own dark overrides with <code class="nds-inline-code lang-css">:root[data-theme~="dark"]</code>: the word selector matches even when a theme token is also present, such as <code class="nds-inline-code lang-html">"dark crimson"</code></li>
                    <li>Test every component in both modes and across your themes whenever you add a surface</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-toggle</code></td><td>Place on any button or switch container to register it as a dark-mode toggle. Keeps <code class="nds-inline-code lang-html">aria-pressed</code>, the moon and sun icon, and the checkbox state in sync. Flips only the <code class="nds-inline-code lang-html">dark</code> token, preserving any active theme.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme</code></td><td>Set on the root element. A space-separated token list: the mode (<code class="nds-inline-code lang-html">dark</code>; light is the default, no token) plus an optional theme name. Matched per token by the <code class="nds-inline-code lang-css">~=</code> word selector, so they coexist.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-value</code></td><td>Set on a switcher item. On click the matching theme token is written into <code class="nds-inline-code lang-html">data-theme</code> (preserving the dark token), the choice is saved, and <code class="nds-inline-code lang-html">aria-current</code> syncs. An empty string restores the DGA default.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-palette</code> + <code class="nds-inline-code lang-html">--brand-*</code></td><td>Set on the root element to activate the runtime OKLCH ramp from your inline seed variables (<code class="nds-inline-code lang-css">--brand-primary</code> required; <code class="nds-inline-code lang-css">-secondary</code>, <code class="nds-inline-code lang-css">-tertiary</code>, <code class="nds-inline-code lang-css">--neutral-tint</code>, <code class="nds-inline-code lang-css">--nds-font-brand</code>, <code class="nds-inline-code lang-css">--font-weight-{regular,medium,semibold,bold}</code> optional). With no flag the page is pure DGA.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-seed-*</code></td><td>Place on a switcher item (alongside <code class="nds-inline-code lang-html">data-theme-value</code>) to apply a custom palette on click: <code class="nds-inline-code lang-html">data-seed-primary</code> (required), plus optional <code class="nds-inline-code lang-html">data-seed-secondary</code>, <code class="nds-inline-code lang-html">data-seed-tertiary</code>, <code class="nds-inline-code lang-html">data-seed-tint</code>, <code class="nds-inline-code lang-html">data-seed-font</code>, <code class="nds-inline-code lang-html">data-seed-weight-{regular,medium,semibold,bold}</code> (for a brand font that reads lighter or heavier than IBM Plex at the same nominal weight). The switcher sets the matching <code class="nds-inline-code lang-css">--brand-*</code> seeds plus <code class="nds-inline-code lang-html">data-palette</code>, then persists the palette so it restores on the next visit.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-css</code></td><td>On a switcher item, the URL of a stylesheet theme's CSS, so a live multi-theme picker can load it on demand and unload it on switch-away. A single-theme production site links the stylesheet server-side instead.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-js</code></td><td>On a switcher item (alongside <code class="nds-inline-code lang-html">data-theme-css</code>), the URL of a JS event-pack for a stylesheet theme. Loaded once on first activation and re-executed on each switch-in so the theme can wire its own behaviour. Read by <code class="nds-inline-code lang-js">nds-theme.js</code> at both click-time and reconciliation.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <p>Set these on the root element (with <code class="nds-inline-code lang-html">data-palette</code>) for a custom palette, or at <code class="nds-inline-code lang-css">:root</code> in a stylesheet theme.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--brand-primary</code></td><td>DGA green</td><td>Seed for the primary colour family (anchors at the 600 step). Drives the OKLCH ramp.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--brand-secondary</code></td><td>derived</td><td>Seed for the secondary family. Auto-derived from primary if omitted.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--brand-tertiary</code></td><td>derived</td><td>Seed for the tertiary family (anchors at the 500 step). Auto-derived if omitted.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--neutral-tint</code></td><td><code class="nds-inline-code lang-html">1</code></td><td>Gray temperature dial (0 = true gray). Warms or cools the gray scale toward the primary hue.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-font-brand</code></td><td>IBM Plex Sans Arabic</td><td>Theme typeface stack, e.g. <code class="nds-inline-code lang-css">'Cairo', sans-serif</code>. The font must be loaded by the page.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--font-weight-regular</code></td><td><code class="nds-inline-code lang-html">400</code></td><td>Regular weight for the theme font. Set per-theme in <code class="nds-inline-code lang-css">_register.scss</code> when the brand font reads lighter than IBM Plex at the same nominal weight (corporate and sunset themes use 300).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--font-weight-medium</code></td><td><code class="nds-inline-code lang-html">500</code></td><td>Medium weight for the theme font.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--font-weight-semibold</code></td><td><code class="nds-inline-code lang-html">600</code></td><td>Semibold weight for the theme font.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--font-weight-bold</code></td><td><code class="nds-inline-code lang-html">700</code></td><td>Bold weight for the theme font.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--background-primary-strong</code></td><td><code class="nds-inline-code lang-html">--colors-primary-900</code></td><td>Deep brand surface used by the hero and footer.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--background-primary-light</code></td><td><code class="nds-inline-code lang-html">--colors-primary-25</code></td><td>Light brand surface token set by the OKLCH ramp and also by full-override themes (such as Hajj). Used for subtle tinted backgrounds.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--img-overlay-color</code></td><td><code class="nds-inline-code lang-html">--colors-primary-950</code></td><td>Colour of the translucent overlay on hero images.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--colors-*</code></td><td>DGA palette</td><td>The full colour ramps (primary, secondary, tertiary, neutral, status). Override these directly in a stylesheet theme for exact values.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Theme</strong> module initializes automatically and owns both axes. Use it to read or flip the dark and light mode; predefined themes are applied by the switcher (or by writing the <code class="nds-inline-code lang-html">data-theme</code> token), and a custom palette by setting the seeds plus <code class="nds-inline-code lang-html">data-palette</code>.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Dark / light MODE ──────────────────────────────────────────
NDS.Theme.get();              // 'light' | 'dark'  (reads the mode token)
NDS.Theme.set('dark');        // no animation origin (center of screen)
NDS.Theme.set('light', el);   // circular reveal originating from an element
NDS.Theme.toggle(el);         // flip mode, preserving the active theme token
NDS.Theme.init();             // re-init after injecting new toggles/switchers

// ── Apply a custom palette ─────────────────────────────────────
// Set the seeds (primary required; the rest auto-derive) + the flag that
// gates the runtime OKLCH ramp. The whole palette and dark mode re-resolve.
const root = document.documentElement;
root.style.setProperty('--brand-primary', '#7c3aed');
root.style.setProperty('--neutral-tint', '0.4');
root.setAttribute('data-palette', '');

// ── Restore the DGA default ────────────────────────────────────
['--brand-primary', '--brand-secondary', '--brand-tertiary', '--neutral-tint']
  .forEach(p =&gt; root.style.removeProperty(p));
root.removeAttribute('data-palette');   // frozen DGA palette takes over
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
