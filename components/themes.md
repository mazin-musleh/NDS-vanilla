---
layout: page
title: Themes
hero_title: Themes - National Design System
hero_description: Light and dark mode plus the colour palette, all driven by one data-theme attribute. Keep the DGA default, toggle dark mode, switch to a built-in theme, or apply your own brand colours at runtime.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
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
                        <div class="demo-label">Live switcher: changes the whole page theme</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div style="display:flex;flex-direction:column;gap:var(--spacing-lg);">
                                <div role="group" aria-label="Choose a theme" style="display:flex;gap:.5rem;flex-wrap:wrap;">
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theme-value="">
                                        <span class="nds-label">Default (DGA)</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theme-value="crimson">
                                        <span class="nds-label">Crimson</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theme-value="corporate">
                                        <span class="nds-label">Corporate</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theme-value="sunset">
                                        <span class="nds-label">Sunset</span>
                                    </button>
                                </div>
                                <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;">
                                    <button class="nds-btn nds-primary">
                                        <span class="nds-label">Primary action</span>
                                    </button>
                                    <a href="#themesSwitcher" class="nds-link nds-primary">Themed link</a>
                                    <button class="nds-chip nds-primary nds-rounded"><span class="nds-label">Theme chip</span></button>
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
                                        aria-controls="panel-themes-switcher-1" id="tab-themes-switcher-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
&lt;!-- Any control with data-theme-value is a switcher item. The empty
     value restores the DGA default; a name applies that theme. --&gt;
&lt;div role="group" aria-label="Choose a theme"&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-sm" data-theme-value=""&gt;
    &lt;span class="nds-label"&gt;Default (DGA)&lt;/span&gt;
  &lt;/button&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-sm" data-theme-value="crimson"&gt;
    &lt;span class="nds-label"&gt;Crimson&lt;/span&gt;
  &lt;/button&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-sm" data-theme-value="corporate"&gt;
    &lt;span class="nds-label"&gt;Corporate&lt;/span&gt;
  &lt;/button&gt;
  &lt;button class="nds-btn nds-secondary-outline nds-sm" data-theme-value="sunset"&gt;
    &lt;span class="nds-label"&gt;Sunset&lt;/span&gt;
  &lt;/button&gt;
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
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-darkbtn-1" id="tab-themes-darkbtn-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-darksw-1" id="tab-themes-darksw-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
            <h2 class="nds-section-title">Themes and Custom Palette</h2>
            <p class="nds-section-description">The bundle ships the DGA default plus three example themes you apply by name with <code class="nds-inline-code lang-html">data-theme</code>. To use your own brand, set a primary seed colour (secondary, tertiary, and a neutral-tint dial are optional) and the <code class="nds-inline-code lang-html">data-palette</code> flag on the root element: the OKLCH engine derives the full ramp and the dark variant for you. The DGA default stays untouched.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Built-in palettes (primary, secondary, tertiary)</div>
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
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);">Saudi green, gold, lavender. Active with no theme token.</p>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#be123c;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#d97706;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#0ea5e9;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">Crimson</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);"><code class="nds-inline-code lang-html">data-theme="crimson"</code></p>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#4338ca;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#0d9488;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#8b5cf6;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">Corporate</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);"><code class="nds-inline-code lang-html">data-theme="corporate"</code></p>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:.5rem;padding:var(--spacing-md);border:1px solid var(--border-neutral-secondary);border-radius:var(--radius-sm);">
                                    <div style="display:flex;gap:.375rem;align-items:center;">
                                        <span style="width:16px;height:16px;border-radius:50%;background:#b45309;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#db2777;flex-shrink:0;"></span>
                                        <span style="width:16px;height:16px;border-radius:50%;background:#f59e0b;flex-shrink:0;"></span>
                                        <strong style="font-size:.875rem;margin-inline-start:.125rem;">Sunset</strong>
                                    </div>
                                    <p style="margin:0;font-size:.8125rem;color:var(--text-neutral-secondary);"><code class="nds-inline-code lang-html">data-theme="sunset"</code></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-builtin" id="tab-themes-builtin">
                                        <span class="nds-tab-label">Built-in</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-themes-custom" id="tab-themes-custom">
                                        <span class="nds-tab-label">Custom palette</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-builtin"
                                    aria-labelledby="tab-themes-builtin">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Apply a built-in theme by name. Combine with the dark token freely. --&gt;
&lt;html data-theme="crimson"&gt;
&lt;html data-theme="dark crimson"&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-custom"
                                    aria-labelledby="tab-themes-custom" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Your own palette: set the seed(s) + data-palette on the root element.
     primary is required; secondary, tertiary, and the neutral-tint dial
     are optional and auto-derive. The engine builds the ramp + dark mode. --&gt;
&lt;html data-palette
      style="--brand-primary: #7c3aed;
             --brand-secondary: #ec4899;
             --neutral-tint: 0.4;"&gt;

&lt;!-- Or from JavaScript: --&gt;
&lt;script&gt;
  const root = document.documentElement;
  root.style.setProperty('--brand-primary', '#7c3aed');
  root.style.setProperty('--neutral-tint', '0.4');
  root.setAttribute('data-palette', '');
&lt;/script&gt;
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
            <p class="nds-section-description">For exact, contrast-checked colours, the widest browser support, or styling beyond colour (custom hero layouts, patterns, injected content), ship a theme as its own stylesheet that overrides the colour tokens at <code class="nds-inline-code lang-css">:root</code>. Point a switcher item's <code class="nds-inline-code lang-html">data-theme-css</code> at it to load on demand, or add a render-blocking <code class="nds-inline-code lang-html">&lt;link&gt;</code> for a single-theme site. An optional behaviour script can inject and tear down DOM content as the theme activates.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stylesheet theme switcher item</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline nds-sm"
                                data-theme-value="foundation-day"
                                data-theme-css="assets/events/foundation_day/nds-theme-foundation-day.min.css"
                                data-theme-js="assets/events/foundation_day/nds-theme-foundation-day.min.js">
                                <span class="nds-label">Foundation Day</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-themes-ss-html" id="tab-themes-ss-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-themes-ss-css" id="tab-themes-ss-css">
                                        <span class="nds-tab-label">Theme CSS</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-themes-ss-js" id="tab-themes-ss-js">
                                        <span class="nds-tab-label">JS Hooks</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-ss-html"
                                    aria-labelledby="tab-themes-ss-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- On a switcher item: data-theme-css is required, data-theme-js optional.
     The switcher loads the stylesheet on activation, unloads it on switch-away. --&gt;
&lt;button class="nds-btn nds-secondary-outline nds-sm"
        data-theme-value="foundation-day"
        data-theme-css="assets/themes/foundation-day.css"
        data-theme-js="assets/themes/foundation-day.js"&gt;
  &lt;span class="nds-label"&gt;Foundation Day&lt;/span&gt;
&lt;/button&gt;

&lt;!-- Single-theme site: link it render-blocking, after the NDS critical CSS
     and before the main CSS. No switcher needed. --&gt;
&lt;link rel="stylesheet" href="assets/themes/foundation-day.css"&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-themes-ss-css"
                                    aria-labelledby="tab-themes-ss-css" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-css code">
/* foundation-day.css: override the colour tokens at :root. Set the full
   13-step ramp + alpha ramp per family, then the brand surfaces. */
:root {
  --colors-primary-25:  #fbf9f8;
  /* ...50, 100, 200, 300, 400, 500, 500-alpha-10... */
  --colors-primary-600: #5b423b;   /* the brand anchor */
  /* ...700, 800, 900, 950, --colors-primary-alpha-10..100... */

  /* Repeat for --colors-secondary-* and --colors-tertiary-* as needed */

  --background-brand-strong: var(--colors-primary-900);
}

/* Correct a token in dark mode at higher specificity if needed */
:root:root[data-theme~="dark"] {
  --background-footer: #231f20;
}
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-themes-ss-js"
                                    aria-labelledby="tab-themes-ss-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-javascript code">
// foundation-day.js: optional behaviour for a stylesheet theme.
// Loaded once on first activation; inject/teardown run as it activates/deactivates.
(function () {
    'use strict';

    function inject() {
        // Add event-specific DOM content here (e.g. a hero slide)
    }
    function teardown() {
        // Remove anything inject() added, to keep the page clean on switch-away
    }

    // Register so the switcher can call inject/teardown at the right moments
    window.__NDS_THEME_HOOKS = window.__NDS_THEME_HOOKS || {};
    window.__NDS_THEME_HOOKS['foundation-day'] = { inject: inject, teardown: teardown };

    // Self-inject if this theme is still active when the script finishes loading.
    // The switcher sets __NDS_THEME_ACTIVE to the active stylesheet theme's value.
    if (window.__NDS_THEME_ACTIVE === 'foundation-day') inject();
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
                    <p class="nds-item-desc">Ship a full theme as its own stylesheet with optional inject and teardown hooks, for bespoke layouts and injected content beyond colour.</p>
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
                    <li>Reach for a <strong>stylesheet theme</strong> when you need exact, contrast-checked colours, support for older browsers, or styling beyond colour (layouts, patterns, injected content)</li>
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
                        <tr><td><code class="nds-inline-code lang-html">data-palette</code> + <code class="nds-inline-code lang-html">--brand-*</code></td><td>Set on the root element to activate the runtime OKLCH ramp from your inline seed variables (<code class="nds-inline-code lang-css">--brand-primary</code> required; <code class="nds-inline-code lang-css">-secondary</code>, <code class="nds-inline-code lang-css">-tertiary</code>, <code class="nds-inline-code lang-css">--neutral-tint</code>, <code class="nds-inline-code lang-css">--nds-font-brand</code> optional). With no flag the page is pure DGA.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-css</code></td><td>Required on a stylesheet-theme switcher item. URL of the theme's CSS file. The switcher injects a <code class="nds-inline-code lang-html">&lt;link&gt;</code> when the theme activates and removes it on deactivation.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-js</code></td><td>Optional on a stylesheet-theme switcher item. URL of a behaviour script loaded once on first activation. The script registers <code class="nds-inline-code lang-js">window.__NDS_THEME_HOOKS[value] = { inject, teardown }</code>.</td></tr>
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
                        <tr><td><code class="nds-inline-code lang-html">--background-brand-strong</code></td><td><code class="nds-inline-code lang-html">--colors-primary-900</code></td><td>Deep brand surface used by the hero and footer.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--img-overlay-color</code></td><td><code class="nds-inline-code lang-html">--colors-neutral-950</code></td><td>Colour of the translucent overlay on hero images.</td></tr>
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
