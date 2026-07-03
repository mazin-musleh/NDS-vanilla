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

  &lt;!-- Critical CSS — render-blocking so the real tokens resolve before first paint. --&gt;
  &lt;link rel="stylesheet" href="assets/css/nds.critical.min.css?ver=1.1.0"&gt;

  &lt;!-- Main CSS, deferred. Pulls in the icon sheets once it loads. --&gt;
  &lt;link rel="preload" href="assets/css/nds-main.min.css?ver=1.1.0" as="style"
        onload="this.onload=null;this.rel='stylesheet';window.loadDeferredAssets?loadDeferredAssets():window.__ndsDeferredPending=true"&gt;
  &lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/nds-main.min.css?ver=1.1.0"&gt;&lt;/noscript&gt;
  &lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/nds-icons.min.css?ver=1.1.0"&gt;&lt;/noscript&gt;
  &lt;noscript&gt;&lt;link rel="stylesheet" href="assets/css/hgi-rounded-stroke-min.css?ver=1.1.0"&gt;&lt;/noscript&gt;

  &lt;link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg"&gt;

  &lt;!-- Inline scripts: see the JavaScript tab. --&gt;
  &lt;script&gt;/* theme guard */&lt;/script&gt;
  &lt;script&gt;/* loadDeferredAssets */&lt;/script&gt;
&lt;/head&gt;

&lt;!-- ...page content... then just before &lt;/body&gt;: --&gt;
&lt;script defer src="assets/js/nds-main.min.js?ver=1.1.0"&gt;&lt;/script&gt;
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
  icons.href = 'assets/css/nds-icons.min.css?ver=1.1.0';
  icons.onload = function () { document.documentElement.setAttribute('data-nds-icons-loaded', ''); };
  document.head.appendChild(icons);

  var hgi = document.createElement('link');
  hgi.rel = 'stylesheet';
  hgi.href = 'assets/css/hgi-rounded-stroke-min.css?ver=1.1.0';
  document.head.appendChild(hgi);
}
if (window.__ndsDeferredPending) loadDeferredAssets();
                            </code>
                        </div>
                    </div>

                </div>
            </div>
            <p>The critical CSS loads render-blocking so first paint has the real tokens — theme and dark mode resolve before anything shows, so there's no flash. It's small and high-priority, and caches across pages. The main bundle then loads deferred and gates the page reveal until component styles are ready.</p>
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
                    <tr><td><code class="nds-inline-code lang-html">nds.critical.min.css</code></td><td>Tokens, reset, fonts, hero, fold gate</td><td>Render-blocking</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">nds-main.min.css</code></td><td>All component and layout styles</td><td>Deferred; gates the page reveal</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">nds-icons.min.css</code></td><td>UI icons (<code class="nds-inline-code lang-html">nds-icon</code>)</td><td>Loaded after main CSS</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">hgi-rounded-stroke-min.css</code></td><td>Content icon font (<code class="nds-inline-code lang-html">hgi hgi-stroke</code>)</td><td>Loaded after main CSS</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">nds-main.min.js</code></td><td>Loader and all component behavior</td><td><code class="nds-inline-code lang-html">&lt;script defer&gt;</code> before <code class="nds-inline-code lang-html">&lt;/body&gt;</code></td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>
