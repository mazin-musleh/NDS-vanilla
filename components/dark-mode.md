---
layout: page
title: Dark Mode
hero_title: Dark Mode - National Design System
hero_description: A built-in theme system that switches every page surface between light and dark palettes, with automatic preference persistence and a smooth circular reveal animation.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Experimental notice -->
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

<!-- Button Toggle -->
<section id="darkModeButton" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Button Toggle</h2>
            <p class="nds-section-description">An icon button that can be placed in any layout. Add <code class="nds-inline-code lang-html">data-theme-toggle</code> to any button and it gets wired up automatically. The icon swaps between moon and sun to reflect the active theme.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Dark Mode Toggle Button</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-icon-only" data-theme-toggle aria-pressed="false" aria-label="Toggle dark mode">
                                <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-darkmode-button-1" id="tab-darkmode-button-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-darkmode-button-1"
                                    aria-labelledby="tab-darkmode-button-1">
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
            </div>
        </div>
    </div>
</section>

<!-- Switch Toggle -->
<section id="darkModeSwitch" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Switch Toggle</h2>
            <p class="nds-section-description">A labeled switch for settings and preferences pages where users configure account options. Place <code class="nds-inline-code lang-html">data-theme-toggle</code> on the switch container and the checkbox state stays in sync with the active theme.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Dark Mode Switch</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-switch-container" data-theme-toggle>
                                <div class="nds-form-header" data-feedback-target>
                                    <label for="darkmode-switch-1">
                                        <span class="nds-label">Dark Mode</span>
                                        <span class="nds-info">Switch between light and dark themes</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-switch nds-neutral">
                                        <input type="checkbox" id="darkmode-switch-1" class="nds-switch-input" role="switch" aria-label="Dark mode">
                                        <div class="nds-switch-track">
                                            <div class="nds-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-darkmode-switch-1" id="tab-darkmode-switch-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-darkmode-switch-1"
                                    aria-labelledby="tab-darkmode-switch-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-switch-container" data-theme-toggle&gt;
  &lt;div class="nds-form-header" data-feedback-target&gt;
    &lt;label for="darkmode-switch-1"&gt;
      &lt;span class="nds-label"&gt;Dark Mode&lt;/span&gt;
      &lt;span class="nds-info"&gt;Switch between light and dark themes&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-switch nds-neutral"&gt;
      &lt;input type="checkbox" id="darkmode-switch-1" class="nds-switch-input" role="switch" aria-label="Dark mode"&gt;
      &lt;div class="nds-switch-track"&gt;
        &lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;
      &lt;/div&gt;
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

<!-- Built-in Features -->
<section id="darkModeFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates on page load and syncs all toggle elements to the stored theme without any configuration code.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-hard-drive"></i>
                        <span class="nds-label">Preference Persistence</span>
                    </span>
                    <p class="nds-item-desc">Saves the chosen theme to <code class="nds-inline-code lang-js">localStorage</code> under the key <code class="nds-inline-code lang-js">nds-theme</code> so the preference survives page reloads and navigation.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-sparkles"></i>
                        <span class="nds-label">Circular Reveal Animation</span>
                    </span>
                    <p class="nds-item-desc">Uses the View Transition API to expand the new theme outward from the toggle button in a circular ripple. Instant swap on browsers without support.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-moon-02"></i>
                        <span class="nds-label">Automatic Icon Swap</span>
                    </span>
                    <p class="nds-item-desc">Any <code class="nds-inline-code lang-html">.nds-icon</code> inside a toggle element switches between the sun and moon glyphs to reflect the active theme.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Token-based Theming</span>
                    </span>
                    <p class="nds-item-desc">Every color is a semantic token. Custom dark overrides target <code class="nds-inline-code lang-html">:root[data-theme="dark"]</code> in plain CSS, so they apply automatically when the theme switches.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Read or change the active theme from JavaScript at any time using <code class="nds-inline-code lang-js">NDS.Theme.get()</code>, <code class="nds-inline-code lang-js">NDS.Theme.set()</code>, and <code class="nds-inline-code lang-js">NDS.Theme.toggle()</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="darkModeGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Place the button toggle in the <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">Top Bar</a> so it is reachable from every page without scrolling</li>
                    <li>Use the switch toggle in settings or preferences pages alongside other binary options such as notifications and language selection</li>
                    <li>Add <code class="nds-inline-code lang-html">data-theme-toggle</code> to one top-level element per toggle control. Do not nest two elements with that attribute inside each other</li>
                    <li>Do not wire up a custom click handler to control the theme. Use <code class="nds-inline-code lang-js">NDS.Theme.set()</code> when you need programmatic control instead</li>
                    <li>Always include <code class="nds-inline-code lang-html">aria-label</code> on a button toggle and a linked <code class="nds-inline-code lang-html">&lt;label&gt;</code> on a switch toggle so screen reader users understand the control</li>
                    <li>Write dark overrides using <code class="nds-inline-code lang-html">:root[data-theme="dark"] .your-selector { ... }</code> in your stylesheet. Keep them next to the base styles for the same element so they are easy to find and update</li>
                    <li>Always reference semantic tokens (e.g. <code class="nds-inline-code lang-html">--background-card</code>, <code class="nds-inline-code lang-html">--text-default</code>) in component styles. Components that use hardcoded colors will not respond to the theme toggle</li>
                    <li>Test both themes whenever you add a new component or page surface. Dark mode is fully supported in the design system and components are expected to look correct in both states</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-toggle</code></td><td>Place on any button or switch container to register it as a theme toggle. The JS binds the click handler and keeps <code class="nds-inline-code lang-html">aria-pressed</code>, icon classes, and checkbox state in sync automatically.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Adding Dark Overrides</h3>
                <p>Scope any custom styles to dark mode using the <code class="nds-inline-code lang-html">:root[data-theme="dark"]</code> selector in plain CSS.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">
.my-component {
    background: var(--background-card);
    color: var(--text-default);
}

:root[data-theme="dark"] .my-component {
    background: var(--colors-neutral-800);
}</code>
                </div>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Theme</strong> module initializes automatically on page load. Use the public API to read or change the theme from your own scripts.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Read the current theme ───────────────────────────
const theme = NDS.Theme.get(); // 'light' | 'dark'

// ── Set a specific theme ─────────────────────────────
NDS.Theme.set('dark');             // no animation origin (center of screen)
NDS.Theme.set('light', buttonEl);  // circular reveal originating from button

// ── Toggle between light and dark ────────────────────
NDS.Theme.toggle();           // no animation origin
NDS.Theme.toggle(buttonEl);   // circular reveal from button center

// ── Re-initialize after dynamic HTML ─────────────────
// Call after injecting new [data-theme-toggle] elements into the DOM
NDS.Theme.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
