---
layout: page
title: Document Head
hero_title: Document Head - National Design System
hero_description: The stylesheets and scripts every NDS page loads so it paints fast, with no flash of unstyled content and no layout shift.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.7.0"
last_edit: "08/08/2026 - 07:22 AM"
---

<!-- Page Setup -->
<section id="pageSetup" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Page Setup</h2>
            <p class="nds-section-description">Put the assets and inline scripts in <code class="nds-inline-code lang-html">&lt;head&gt;</code>, and the main bundle just before <code class="nds-inline-code lang-html">&lt;/body&gt;</code>. The <code class="nds-inline-code lang-html">?ver=</code> query is a cache-busting stamp: change it whenever a bundle changes.</p>
        </div>
        <div class="nds-section-body nds-prose">
            <div class="nds-tabs nds-code nds-divided">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Page setup code">
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-setup-html" id="tab-setup-html">
                            <span class="nds-tab-label">HTML</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false" aria-controls="panel-setup-js" id="tab-setup-js">
                            <span class="nds-tab-label">JavaScript</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false" aria-controls="panel-setup-gate" id="tab-setup-gate">
                            <span class="nds-tab-label">Critical Gate</span>
                        </button>
                    </nav>
                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
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
  &lt;link rel="stylesheet" href="assets/css/nds.critical.min.css?ver={{ site.latest_release }}"&gt;

  &lt;!-- Main CSS — deferred; the inline script applies it, the loader adds the icon sheets after it. --&gt;
  &lt;link rel="preload" href="assets/css/nds-main.min.css?ver={{ site.latest_release }}"
    as="style" fetchpriority="low" data-nds-defer="main"&gt;

  &lt;!-- Accessibility add-on — optional. Drop this and its script to skip the panel. --&gt;
  &lt;link rel="preload" href="assets/css/nds-accessibility.min.css?ver={{ site.latest_release }}"
    as="style" fetchpriority="low" data-nds-defer&gt;

  &lt;!-- Placeholder icon — replace with your own. --&gt;
  &lt;link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg"&gt;

  &lt;!-- Inline script — theme guard + applies the deferred styles. Copy from the JavaScript tab. Keep it last in the head. --&gt;
  &lt;script&gt;/* see the JavaScript tab */&lt;/script&gt;
&lt;/head&gt;

&lt;!-- ...page content... then just before &lt;/body&gt;: --&gt;
&lt;script defer src="assets/js/nds-main.min.js?ver={{ site.latest_release }}"&gt;&lt;/script&gt;
&lt;script defer src="assets/js/nds-accessibility.min.js?ver={{ site.latest_release }}"&gt;&lt;/script&gt;
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

// Turn each marked preload into a real stylesheet link. Same download, no second request.
// Clones every attribute except rel/as, so integrity, crossorigin, and fetchpriority carry over.
(function () {
  document.querySelectorAll('link[rel="preload"][data-nds-defer]').forEach(function (p) {
var l = document.createElement('link');
for (var i = 0; i &lt; p.attributes.length; i++) {
  var a = p.attributes[i];
  if (a.name !== 'rel' &amp;&amp; a.name !== 'as') l.setAttribute(a.name, a.value);
}
l.rel = 'stylesheet';
p.removeAttribute('data-nds-defer');
document.head.appendChild(l);
  });
})();
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
/* Optional. This is step 1 of the gated setup — the two steps are under the tabs. */

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
            <div class="nds-block nds-prose">
                <h3>Two ways to load critical CSS</h3>
                <p>The HTML tab uses a plain stylesheet link. It blocks the first paint until critical CSS arrives, so the first thing on screen already has the real tokens and nothing flashes. This is the simplest setup, and it needs no inline style block.</p>
                <p>The gated setup paints sooner on a slow network. You inline a small style block that draws the page shell, then load critical CSS without blocking. The shell holds the layout until the real styles land. This site runs the gated setup.</p>
                <p>To switch, do both steps.</p>
                <p><strong>Step 1.</strong> Copy the Critical Gate tab into a <code class="nds-inline-code lang-html">&lt;style&gt;</code> block in the head. Put it above the critical CSS link.</p>
                <p><strong>Step 2.</strong> Replace the critical CSS link with this one:</p>
            </div>
            <div class="nds-block">
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-html code">
&lt;link rel="preload" href="assets/css/nds.critical.min.css?ver={{ site.latest_release }}"
  as="style" fetchpriority="high" data-nds-defer&gt;
                    </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <p>Never do step 2 alone. Without the gate the page paints raw HTML first, then jumps when critical CSS lands.</p>
                <p>The gate is an inline style block, so a strict Content Security Policy needs a nonce or a hash for it. See the CSP section below.</p>
            </div>
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
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>File</th><th>Contents</th><th>Loading</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds.critical.min.css</code></td><td>Tokens, reset, fonts, hero, gate</td><td>Render-blocking (or async behind the gate)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-main.min.css</code></td><td>All component and layout styles</td><td>Deferred; gates the page reveal</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icons.min.css</code></td><td>UI icons (<code class="nds-inline-code lang-html">nds-icon</code>)</td><td>Added by the loader once main CSS applies</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">hgi-rounded-stroke-min.css</code></td><td>Content icon font (<code class="nds-inline-code lang-html">hgi hgi-stroke</code>)</td><td>Added by the loader once main CSS applies</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility.min.css</code></td><td>Accessibility panel and its mode overrides</td><td>Deferred, same as main CSS. Optional</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-main.min.js</code></td><td>Loader and all component behavior</td><td><code class="nds-inline-code lang-html">&lt;script defer&gt;</code> before <code class="nds-inline-code lang-html">&lt;/body&gt;</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility.min.js</code></td><td>Accessibility panel behavior</td><td><code class="nds-inline-code lang-html">&lt;script defer&gt;</code> before <code class="nds-inline-code lang-html">&lt;/body&gt;</code>. Optional</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Content Security Policy -->
<section id="csp" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Security Policy</h2>
            <p class="nds-section-description">NDS runs under a strict CSP. One inline script needs your permission. Everything else loads from your own origin and needs nothing.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <p>A strict policy blocks inline code. NDS keeps its inline code to one small script, so you have one thing to allow. You allow it with a <strong>nonce</strong> or with a <strong>hash</strong>. Both work. Pick the one that fits your app.</p>
            </div>
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Part</th><th>What it needs</th></tr></thead>
                    <tbody>
                        <tr><td>Inline script in <code class="nds-inline-code lang-html">&lt;head&gt;</code> (theme guard + deferred stylesheets)</td><td>A nonce or a hash</td></tr>
                        <tr><td>Inline critical gate (<code class="nds-inline-code lang-html">&lt;style&gt;</code>), if you use it</td><td>A nonce or a hash in <code class="nds-inline-code lang-css">style-src</code></td></tr>
                        <tr><td>All stylesheets and script bundles</td><td><code class="nds-inline-code lang-css">'self'</code></td></tr>
                        <tr><td>Icon sheets the loader adds</td><td>Nothing — same origin as your other files</td></tr>
                        <tr><td>UI icons (<code class="nds-inline-code lang-html">nds-icon</code>)</td><td><code class="nds-inline-code lang-css">img-src data:</code> — each icon is an inline SVG mask</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block nds-prose">
                <p>A policy that covers all of it:</p>
            </div>
            <div class="nds-block">
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-plaintext code">
Content-Security-Policy:
  default-src 'self';
  script-src  'self' 'nonce-YOUR_RANDOM_VALUE';
  style-src   'self' 'nonce-YOUR_RANDOM_VALUE';
  img-src     'self' data:;
  font-src    'self';
                    </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <p>Then put the same value on the tag:</p>
            </div>
            <div class="nds-block">
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-html code">
&lt;script nonce="YOUR_RANDOM_VALUE"&gt;/* the head script */&lt;/script&gt;

&lt;script nonce="YOUR_RANDOM_VALUE" defer src="assets/js/nds-main.min.js"&gt;&lt;/script&gt;
                    </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <p>Your server must make a new random value for every response. A fixed value is not a nonce. It gives an attacker the same permission your own code has.</p>
                <p>The main bundle needs the value too. NDS loads two more script files at runtime, and the loader copies the nonce from the main bundle's tag onto them. Without it, a <strong>nonce-only</strong> policy — one with no <code class="nds-inline-code lang-css">'self'</code> in <code class="nds-inline-code lang-css">script-src</code> — blocks those two files, and the components in them never start.</p>
                <p><strong>No server?</strong> Use a hash instead. A hash covers a script by its exact text, so a static host works. Take the SHA-256 of the script's contents, base64 it, and add <code class="nds-inline-code lang-css">'sha256-…'</code> to <code class="nds-inline-code lang-css">script-src</code>. The browser tells you the right value: load the page with the policy on, and the console error prints the hash it expected. Re-do this whenever you edit the script.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3>Why the stylesheets look the way they do</h3>
                <p>Each deferred stylesheet ships as a <code class="nds-inline-code lang-html">rel="preload"</code> link with a <code class="nds-inline-code lang-html">data-nds-defer</code> mark. The preload downloads the file at the right priority without blocking render. The head script then adds a normal stylesheet link for it, which reuses that download. A more common way to defer CSS is an <code class="nds-inline-code lang-html">onload</code> attribute on the link. NDS does not use one, because <strong>a nonce and a hash both cover a script element, and neither can ever cover an inline event handler</strong>. An <code class="nds-inline-code lang-html">onload</code> attribute needs <code class="nds-inline-code lang-css">'unsafe-inline'</code>, which defeats the policy. Moving the same work into a script element is what makes a strict CSP possible.</p>
                <p>The icon sheets load from <code class="nds-inline-code lang-html">nds-main.min.js</code> for the same reason. That file is already allowed by <code class="nds-inline-code lang-css">'self'</code>, so icons need no grant from you at all.</p>
            </div>
        </div>
    </div>
</section>
