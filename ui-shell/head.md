---
layout: page
title: Document Head
hero_title: Document Head - National Design System
hero_description: The stylesheets and scripts every NDS page loads so it paints fast, with no flash of unstyled content and no layout shift.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Page Setup -->
<section id="pageSetup" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Page Setup</h2>
            <p class="nds-section-description">Put the assets and inline scripts in <code class="nds-inline-code lang-html">&lt;head&gt;</code>, and the main bundle just before <code class="nds-inline-code lang-html">&lt;/body&gt;</code>. The <code class="nds-inline-code lang-html">?ver=</code> query is a cache-busting stamp: change it whenever a bundle changes.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-tabs nds-code nds-divided">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Page setup code">
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-setup-html" id="tab-setup-html">
                            <span class="nds-tab-label">HTML</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-setup-js" id="tab-setup-js">
                            <span class="nds-tab-label">JavaScript</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-setup-gate" id="tab-setup-gate">
                            <span class="nds-tab-label">Critical Gate</span>
                        </button>
                    </nav>
                    <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="nds-tab-content">

                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-setup-html" aria-labelledby="tab-setup-html">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <div class="nds-expandable-content">
                            <code class="lang-html code">
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Page Title&lt;/title&gt;

  &lt;!-- Critical CSS — render-blocking, so first paint has the real tokens (no flash). --&gt;
  &lt;link rel="stylesheet" href="assets/css/nds.critical.min.css?ver=1.3.0"&gt;

  &lt;!-- Main CSS — deferred; loads the icon sheets once it applies. --&gt;
  &lt;link rel="preload" href="assets/css/nds-main.min.css?ver=1.3.0" as="style"
        onload="this.onload=null;this.rel='stylesheet';window.loadDeferredAssets?loadDeferredAssets():window.__ndsDeferredPending=true"&gt;
  &lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/nds-main.min.css?ver=1.3.0"&gt;&lt;/noscript&gt;
  &lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/nds-icons.min.css?ver=1.3.0"&gt;&lt;/noscript&gt;
  &lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/hgi-rounded-stroke-min.css?ver=1.3.0"&gt;&lt;/noscript&gt;

  &lt;link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg"&gt;

  &lt;!-- Inline scripts — theme guard (no light-to-dark flip) + loadDeferredAssets. Copy from the JavaScript tab. --&gt;
  &lt;script&gt;/* theme guard + loadDeferredAssets — see the JavaScript tab */&lt;/script&gt;
&lt;/head&gt;

&lt;!-- ...page content... then just before &lt;/body&gt;: --&gt;
&lt;script defer src="assets/js/nds-main.min.js?ver=1.3.0"&gt;&lt;/script&gt;
                            </code>
                        </div>
                    </div>

                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-setup-js" aria-labelledby="tab-setup-js" hidden>
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <div class="nds-expandable-content">
                            <code class="lang-javascript code">
// Apply the saved theme before first paint (no light-to-dark flip).
(function () {
  var v = localStorage.getItem('nds-theme');
  if (v) {
    var d = document.documentElement;
    var t = ((d.getAttribute('data-theme') || '') + ' ' + v).split(/\s+/)
      .filter(function (x, i, a) { return x &amp;&amp; a.indexOf(x) === i; });
    d.setAttribute('data-theme', t.join(' '));
  }
})();

// Load the icon sheets after main CSS, so they stay out of the LCP window.
function loadDeferredAssets() {
  var icons = document.createElement('link');
  icons.rel = 'stylesheet';
  icons.href = 'assets/css/nds-icons.min.css?ver=1.3.0';
  icons.onload = function () { document.documentElement.setAttribute('data-nds-icons-loaded', ''); };
  document.head.appendChild(icons);

  var hgi = document.createElement('link');
  hgi.rel = 'stylesheet';
  hgi.href = 'assets/css/hgi-rounded-stroke-min.css?ver=1.3.0';
  document.head.appendChild(hgi);
}
if (window.__ndsDeferredPending) loadDeferredAssets();
                            </code>
                        </div>
                    </div>

                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-setup-gate" aria-labelledby="tab-setup-gate" hidden>
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <div class="nds-expandable-content">
                            <code class="lang-css code">
/* Optional inline critical gate — paste into an inline &lt;style&gt; in &lt;head&gt;, */
/* then load the critical CSS async (see the note under the tabs). */

/* ── Colors — the FCP skeleton's fills; edit here to re-skin first paint. ── */
html { background-color: var(--background-body, #f9fafb); }
html[data-theme~=dark] { background-color: var(--background-body, #111927); }
:where(.nds-topbar) { background-color: var(--background-topbar, #f3f4f6); }
html[data-theme~=dark] :where(.nds-topbar) { background-color: var(--background-topbar, #111927); }
:where(.nds-main-nav) { background-color: var(--background-nav, #fff); }
html[data-theme~=dark] :where(.nds-main-nav) { background-color: var(--background-nav, #1f2a37); }
:where(.nds-hero-image-wrapper)::before { content: ""; position: absolute; inset: 0; background: color-mix(in srgb, var(--img-overlay-color, #092a1e) calc(var(--overlay, 0.7) * 100%), transparent); pointer-events: none; }

/* ── Layout reservations + gates (structure) ── */
html :where(header) { display: contents; }
html :where(.nds-topbar) { height: 40px; }
html :where(.nds-main-nav) { height: var(--nds-nav-height, 72px); }
html .nds-swiper.nds-hero:not([data-nds-swiper-initialized]) .nds-swiper-slide:not(:first-child) { display: none; }
:where(.nds-topbar &gt; *, .nds-main-nav &gt; *, .nds-hero-section .nds-section-action, .nds-content-layout, .nds-user-feedback-section, .nds-accessibility-toggle, .nds-footer) { visibility: hidden; }
html:not([data-nds-loaded]) main { overflow-x: clip; }
:root { --nds-icons-opacity: 0; }
i.hgi-stroke { opacity: 0; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:is(.nds-hidden, [hidden], [data-state~=hidden], [data-filtered]) { display: none !important; }
:where(.nds-hero-section) { position: relative; height: 550px; }
:where(.nds-hero-section.nds-sub) { height: auto; min-height: 220px; }
:where(.nds-hero-image-wrapper) { position: absolute; inset: 0; }
:where(.nds-hero-image) { width: 100%; height: 100%; object-fit: cover; display: block; }
:where(.nds-hero-section :is(.nds-section-body, .nds-section-wrapper, .nds-breadcrumb-nav)) { visibility: hidden; }
                            </code>
                        </div>
                    </div>

                </div>
            </div>
            <p>The HTML tab loads critical CSS <strong>render-blocking</strong> — the simplest setup, and first paint already carries the real tokens so there's no flash. <strong>The inline gate is optional.</strong> For a non-blocking first paint (better FCP on slow networks), drop the inline <code class="nds-inline-code lang-html">&lt;style&gt;</code> gate from the Critical Gate tab into <code class="nds-inline-code lang-html">&lt;head&gt;</code> and swap the render-blocking critical <code class="nds-inline-code lang-html">&lt;link&gt;</code> for the async version:</p>
            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                        <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html code">
&lt;link rel="preload" href="assets/css/nds.critical.min.css?ver=1.3.0" as="style"
      onload="this.onload=null;this.rel='stylesheet'"&gt;
&lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/nds.critical.min.css?ver=1.3.0"&gt;&lt;/noscript&gt;
                    </code>
                </div>
            </div>
            <p>The gate hides above-the-fold chrome until styles land, so async loading never flashes.</p>
        </div>
    </div>
</section>

<!-- Asset Files -->
<section id="assetFiles" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Asset Files</h2>
            <p class="nds-section-description">What each bundle holds and how it loads.</p>
        </div>
        <div class="nds-section-body">
            <table class="nds-table nds-responsive">
                <thead><tr><th>File</th><th>Contents</th><th>Loading</th></tr></thead>
                <tbody>
                    <tr><td><code class="nds-inline-code lang-html">nds.critical.min.css</code></td><td>Tokens, reset, fonts, hero, gate</td><td>Render-blocking (or async behind the gate)</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">nds-main.min.css</code></td><td>All component and layout styles</td><td>Deferred; gates the page reveal</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">nds-icons.min.css</code></td><td>UI icons (<code class="nds-inline-code lang-html">nds-icon</code>)</td><td>Loaded after main CSS</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">hgi-rounded-stroke-min.css</code></td><td>Content icon font (<code class="nds-inline-code lang-html">hgi hgi-stroke</code>)</td><td>Loaded after main CSS</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">nds-main.min.js</code></td><td>Loader and all component behavior</td><td><code class="nds-inline-code lang-html">&lt;script defer&gt;</code> before <code class="nds-inline-code lang-html">&lt;/body&gt;</code></td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>
