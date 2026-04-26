---
layout: page
title: Language Switcher
hero_title: Language Switcher - National Design System
hero_description: A language and direction switcher that supports a two-language toggle button or a multi-language dropmenu, persists the choice in a cookie, and animates the transition using the View Transition API.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Toggle Button -->
<section id="langSwitcherButton" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Toggle Button</h2>
            <p class="nds-section-description">An icon button placed in the navigation bar. Add <code class="nds-inline-code lang-html">data-lang-toggle</code> to wire it to the switcher. The label span inside gets its text updated automatically whenever the language changes.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Language Toggle Button</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-icon-only" data-lang-toggle aria-label="Switch language">
                                <i class="nds-icon nds-hgi-translation" aria-hidden="true"></i>
                                <span class="nds-label">English</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-lang-button-1" id="tab-lang-button-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-lang-button-1"
                                    aria-labelledby="tab-lang-button-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-btn nds-subtle nds-icon-only"
        data-lang-toggle
        aria-label="Switch language"&gt;
  &lt;i class="nds-icon nds-hgi-translation" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;span class="nds-label"&gt;English&lt;/span&gt;
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

<!-- Multi-Language Selector -->
<section id="langSwitcherMulti" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Multi-Language Selector</h2>
            <p class="nds-section-description">When three or more languages are needed, use a dropmenu picker instead of a toggle. Add <code class="nds-inline-code lang-html">data-lang-toggle</code> to the <code class="nds-inline-code lang-html">.nds-dropmenu</code> wrapper and <code class="nds-inline-code lang-html">data-lang-value</code> on each item. The switcher marks the active language and updates the trigger label automatically.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Language Picker</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu" data-lang-toggle>
                                <button class="nds-btn nds-subtle nds-dropmenu-trigger" aria-label="Switch language">
                                    <i class="nds-icon nds-hgi-translation" aria-hidden="true"></i>
                                    <span class="nds-label">English</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-lang-value="en">
                                        <span class="nds-label">English</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-lang-value="fr">
                                        <span class="nds-label">Français</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-lang-value="ar">
                                        <span class="nds-label">العربية</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-lang-value="fa" data-lang-dir="rtl">
                                        <span class="nds-label">فارسی</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-lang-value="ur" data-lang-dir="rtl">
                                        <span class="nds-label">اردو</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-lang-multi-1" id="tab-lang-multi-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-lang-multi-1"
                                    aria-labelledby="tab-lang-multi-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-dropmenu" data-lang-toggle&gt;
  &lt;button class="nds-btn nds-subtle nds-dropmenu-trigger"
          aria-label="Switch language"&gt;
    &lt;i class="nds-icon nds-hgi-translation" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;English&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-indicator"
            data-lang-value="en"&gt;
      &lt;span class="nds-label"&gt;English&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-indicator"
            data-lang-value="fr"&gt;
      &lt;span class="nds-label"&gt;Français&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-indicator"
            data-lang-value="ar"&gt;
      &lt;span class="nds-label"&gt;العربية&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-indicator"
            data-lang-value="fa" data-lang-dir="rtl"&gt;
      &lt;span class="nds-label"&gt;فارسی&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-indicator"
            data-lang-value="ur" data-lang-dir="rtl"&gt;
      &lt;span class="nds-label"&gt;اردو&lt;/span&gt;
    &lt;/button&gt;
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

<!-- FOUC Prevention -->
<section id="langSwitcherFouc" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">FOUC Prevention</h2>
            <p class="nds-section-description">A small blocking inline script placed in <code class="nds-inline-code lang-html">&lt;head&gt;</code> reads the cookie and sets <code class="nds-inline-code lang-html">lang</code> and <code class="nds-inline-code lang-html">dir</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code> before the first paint. Without it, pages briefly render in the wrong direction on load.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Inline Head Script</h3>
                <p>Add this script as early as possible in <code class="nds-inline-code lang-html">&lt;head&gt;</code>, before any stylesheets.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-javascript code">
(function() {
    var m = document.cookie.match(/(?:^|;\s*)preferred-language=(\w+)/);
    if (m) {
        var lang = m[1];
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
})();</code>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="langSwitcherFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-star"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates on page load, reads the stored preference, and wires every <code class="nds-inline-code lang-html">data-lang-toggle</code> button and dropmenu on the page via event delegation. No re-initialization is needed when buttons are injected dynamically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cookie"></i>
                        <span class="nds-label">Cookie Persistence</span>
                    </span>
                    <p class="nds-item-desc">Saves the chosen language to the <code class="nds-inline-code lang-js">preferred-language</code> cookie with a one-year expiry so the preference survives navigation and browser restarts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-reload"></i>
                        <span class="nds-label">Direction Slide Animation</span>
                    </span>
                    <p class="nds-item-desc">Uses the View Transition API to slide the new direction in from the reading edge: RTL slides from the right, LTR from the left. Instant swap on browsers without support.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translation"></i>
                        <span class="nds-label">Live Direction Switching</span>
                    </span>
                    <p class="nds-item-desc">Updates <code class="nds-inline-code lang-html">lang</code> and <code class="nds-inline-code lang-html">dir</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code> instantly, flipping the entire page layout between RTL and LTR without a reload.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-browser"></i>
                        <span class="nds-label">FOUC Prevention</span>
                    </span>
                    <p class="nds-item-desc">A blocking inline script in <code class="nds-inline-code lang-html">&lt;head&gt;</code> sets the correct direction before the first paint, so pages never flash the wrong layout on load.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Read or write cookies and re-trigger initialization from JavaScript at any time using <code class="nds-inline-code lang-js">NDS.LangSwitcher.getCookie()</code>, <code class="nds-inline-code lang-js">setCookie()</code>, and <code class="nds-inline-code lang-js">init()</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="langSwitcherGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Place the toggle button in the <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a> or <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">Top Bar</a> so it is reachable from every page without scrolling</li>
                    <li>Any number of elements with <code class="nds-inline-code lang-html">data-lang-toggle</code> can coexist on the same page. The switcher uses event delegation and updates every toggle's label text on each switch</li>
                    <li>Always include the FOUC prevention inline script in <code class="nds-inline-code lang-html">&lt;head&gt;</code> before any stylesheets so users never see a direction flash on initial load</li>
                    <li>Write layout styles using CSS logical properties (<code class="nds-inline-code lang-html">margin-inline-start</code>, <code class="nds-inline-code lang-html">padding-inline</code>, <code class="nds-inline-code lang-html">inset-inline-start</code>) so they auto-adapt when <code class="nds-inline-code lang-html">dir</code> changes, without needing separate RTL overrides</li>
                    <li>Use the <code class="nds-inline-code lang-html">?lang=ar</code> or <code class="nds-inline-code lang-html">?lang=en</code> URL parameter to deep-link to a specific language. The switcher reads it on load, updates the cookie, and removes the parameter from the URL automatically</li>
                    <li>Do not rely on the cookie alone for content translation. The switcher controls layout direction only. For translated body copy, use a server-side i18n approach with separate page versions</li>
                    <li>Test both directions whenever you add a new layout or component. Logical properties handle most cases, but transforms, gradients, and absolute positioning may need <code class="nds-inline-code lang-html">:root[dir="rtl"]</code> overrides</li>
                    <li>Do not call <code class="nds-inline-code lang-js">NDS.LangSwitcher.init()</code> more than once per page load. The <code class="nds-inline-code lang-js">_initDone</code> guard prevents duplicate initialization, but the URL-parameter cleanup only runs on the first call</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-lang-toggle</code></td>
                            <td>Button or <code class="nds-inline-code lang-html">.nds-dropmenu</code> wrapper</td>
                            <td>Wires the element to the switcher. On a plain button, toggles between <code class="nds-inline-code lang-html">ar</code> and <code class="nds-inline-code lang-html">en</code>. On a dropmenu wrapper, enables item-based selection.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-lang-value="ar"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu-item</code></td>
                            <td>The language code this item selects. Any BCP 47 language tag is accepted (<code class="nds-inline-code lang-html">en</code>, <code class="nds-inline-code lang-html">ar</code>, <code class="nds-inline-code lang-html">fr</code>, <code class="nds-inline-code lang-html">zh</code>, etc.).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-lang-dir="rtl"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-dropmenu-item</code></td>
                            <td>Overrides the default direction for a language. Only needed for RTL languages other than Arabic (e.g. <code class="nds-inline-code lang-html">ur</code>, <code class="nds-inline-code lang-html">he</code>). Omit for LTR languages and Arabic, which is RTL by default.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">URL Parameter</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Parameter</th><th>Values</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">?lang=</code></td>
                            <td>Any language code (<code class="nds-inline-code lang-html">ar</code>, <code class="nds-inline-code lang-html">en</code>, <code class="nds-inline-code lang-html">fr</code>, etc.)</td>
                            <td>Forces a specific language on load. The switcher reads the value, saves it to the cookie, and cleans the parameter from the URL with <code class="nds-inline-code lang-js">replaceState</code>. Useful for sharing links that open in a specific language.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.LangSwitcher</strong> module initializes automatically on page load. Use the public API to read or set language preferences from your own scripts.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── init() is idempotent — safe to call but no-op after first run ────
// Event delegation handles dynamically injected [data-lang-toggle]
// elements automatically. Re-calling init() is not needed for new buttons.
NDS.LangSwitcher.init();

// ── Read a cookie value ───────────────────────────────
const lang = NDS.LangSwitcher.getCookie('preferred-language');
// Returns 'ar', 'en', or null if not yet set

// ── Write a cookie value ──────────────────────────────
// name  — cookie name
// value — cookie value string
// days  — expiry in days
NDS.LangSwitcher.setCookie('preferred-language', 'ar', 365);
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
