---
layout: page
title: Document Head
hero_title: Document Head - National Design System
hero_description: The stylesheets and scripts every NDS page loads so it paints fast, with no flash of unstyled content and no layout shift.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.11.x"
last_edit: "02/09/2026 - 10:07 PM"
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

  &lt;style&gt;
  /* -- Colors: the first-paint fills. Edit here to re-skin the shell. -- */
  html[data-theme~=dark] :where(.nds-main-nav .nds-brand.nds-oncolor :is(img,svg)){filter:brightness(0) invert(1)}
  html{background-color:var(--background-body, #f9fafb)}
  html[data-theme~=dark]{background-color:var(--background-body, #111927)}
  :where(.nds-topbar){background-color:var(--background-topbar, #f3f4f6)}
  html[data-theme~=dark] :where(.nds-topbar){background-color:var(--background-topbar, #111927)}
  :where(.nds-main-nav){background-color:var(--background-nav, #fff)}
  html[data-theme~=dark] :where(.nds-main-nav){background-color:var(--background-nav, #1f2a37)}
  :where(.nds-hero-image-wrapper)::before{content:"";position:absolute;inset:0;background:color-mix(in srgb, var(--img-overlay-color, #092a1e) calc(var(--overlay, 0.7) * 100%), transparent);pointer-events:none}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  /* -- Layout reservations and gates (structure) -- */
  html :where(header){display:contents}
  html :where(.nds-topbar){height:40px}
  html :where(.nds-main-nav){height:var(--nds-nav-height, 72px)}
  html .nds-swiper.nds-hero:not([data-nds-swiper-initialized],[data-swiper-preset]) .nds-swiper-slide:not(:first-child){display:none}
  :where(.nds-topbar&gt;*,.nds-main-nav&gt;*,.nds-hero-section .nds-section-action,.nds-content-layout,.nds-user-feedback-section,.nds-footer){visibility:hidden}
  html:not([data-nds-loaded]) main{overflow-x:clip}
  :root{--nds-icons-opacity: 0}
  i.hgi-stroke{opacity:0}
  :is(.nds-hidden,[hidden],[data-state~=hidden],[data-filtered]){display:none !important}
  :where(.nds-hero-section){position:relative;height:550px}
  :where(.nds-hero-section.nds-sub){height:auto;min-height:220px}
  :where(.nds-hero-image-wrapper){position:absolute;inset:0}
  :where(.nds-hero-image){width:100%;height:100%;object-fit:cover;display:block}
  :where(.nds-hero-section :is(.nds-section-body,.nds-section-wrapper,.nds-breadcrumb-nav)){visibility:hidden}
  &lt;/style&gt;

  &lt;!-- Hero image — page-specific. Only on a page whose hero carries a photograph.
       The hero image is the LCP element, and the browser finds it late because it sits
       in a &lt;picture&gt; deep in the body. Preload the FIRST slide only, and repeat the
       &lt;source&gt; breakpoints exactly so the browser preloads the same file it will use.
       Drop these three lines on a page with no hero photo. --&gt;
  &lt;link rel="preload" as="image" href="assets/img/hero-sm.webp"
    media="(max-width: 768px)" fetchpriority="high"&gt;
  &lt;link rel="preload" as="image" href="assets/img/hero-md.webp"
    media="(min-width: 769px) and (max-width: 1646px)" fetchpriority="high"&gt;
  &lt;link rel="preload" as="image" href="assets/img/hero.webp"
    media="(min-width: 1647px)" fetchpriority="high"&gt;

  &lt;!-- Critical CSS — non-blocking; the gate above holds the layout until it lands. --&gt;
  &lt;link rel="preload" href="assets/css/nds.critical.min.css?ver={{ site.latest_release }}"
    as="style" fetchpriority="high" data-nds-defer&gt;

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

                </div>
            </div>
            <div class="nds-block nds-prose">
                <h3>The version stamp</h3>
                <p>Change the <code class="nds-inline-code lang-html">?ver=</code> value every time you upgrade NDS. A stale stamp serves the old bundles from the browser cache.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3>Switching to a blocking critical stylesheet</h3>
                <p>The setup above is the gated one, and it is what this site runs. The inline style block draws the page shell so the page paints before critical CSS arrives, and the shell holds the layout until the real styles land. That block is the same shell this site serves, one rule per line so you can edit the colors.</p>
                <p>Use a blocking stylesheet instead when a strict Content Security Policy cannot grant a nonce or a hash for that inline block. Delete the <code class="nds-inline-code lang-html">&lt;style&gt;</code> block, then replace the preload link under it with a plain stylesheet link:</p>
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
&lt;link rel="stylesheet" href="assets/css/nds.critical.min.css?ver={{ site.latest_release }}"&gt;
                    </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <p>It blocks the first paint until critical CSS arrives, so the first thing on screen already has the real tokens and nothing flashes. Never remove the style block on its own: without the gate the page paints raw HTML first, then jumps when critical CSS lands.</p>
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
                        <tr><td><code class="nds-inline-code lang-html">hgi-rounded-stroke-min.css</code></td><td>Content icon glyph map (<code class="nds-inline-code lang-html">hgi hgi-stroke</code>). Its <code class="nds-inline-code lang-html">@font-face</code> ships in the critical file, so this sheet can land late without a full relayout</td><td>Added by the loader at the reveal, after main CSS and the critical pass</td></tr>
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
                <p>A strict policy blocks inline code. NDS keeps its inline code to one small script, so you have one thing to allow. You allow it with a <strong>nonce</strong> or with a <strong>hash</strong>. Prefer the nonce whenever your server renders responses. Use the hash only on a static host: a hash must match the script's bytes exactly, and that match breaks easily.</p>
            </div>
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Part</th><th>What it needs</th></tr></thead>
                    <tbody>
                        <tr><td>Inline script in <code class="nds-inline-code lang-html">&lt;head&gt;</code> (theme guard + deferred stylesheets)</td><td>A nonce or a hash</td></tr>
                        <tr><td>Inline critical gate (<code class="nds-inline-code lang-html">&lt;style&gt;</code>), unless you switched to the blocking stylesheet</td><td>A nonce or a hash in <code class="nds-inline-code lang-css">style-src</code></td></tr>
                        <tr><td>Inline knobs on copied markup (<code class="nds-inline-code lang-html">style="--gap: …"</code>)</td><td>Move the knob to your own class. A <code class="nds-inline-code lang-html">style</code> attribute needs <code class="nds-inline-code lang-css">'unsafe-inline'</code>, and no nonce or hash can cover one</td></tr>
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
                <p>The main bundle needs the value too. The loader adds more script files at runtime, and it copies the nonce from the main bundle's tag onto each one. Without it, a <strong>nonce-only</strong> policy — one with no <code class="nds-inline-code lang-css">'self'</code> in <code class="nds-inline-code lang-css">script-src</code> — blocks them, and the components they carry never start.</p>
                <p><strong>No server?</strong> Use a hash instead. A hash covers the script's contents between the tags, byte for byte — indentation, line endings, everything. A file saved with Windows CRLF line endings hashes differently from the same script saved with LF, and a formatter or minifier that touches the script kills the match too. Hash the contents only, never the tags. Take the SHA-256 of the script's contents, base64 it, and add <code class="nds-inline-code lang-css">'sha256-…'</code> to <code class="nds-inline-code lang-css">script-src</code>. The browser tells you the right value for the bytes it actually served: load the page with the policy on, and the console error prints the hash it expected. Re-do this whenever anything edits the script.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3>Inline knobs under a strict CSP</h3>
                <p>A <code class="nds-inline-code lang-html">style</code> attribute needs <code class="nds-inline-code lang-css">'unsafe-inline'</code>. No nonce and no hash can cover one. So under a strict policy every inline knob is dead: the value never applies, and the only warning is the browser's own CSP violation.</p>
                <p>Find them all. Search your pages for <code class="nds-inline-code lang-html">style="--</code>. Then move each knob to a class in your own stylesheet, which <code class="nds-inline-code lang-css">'self'</code> already allows. The markup keeps its NDS classes; you add one of your own.</p>
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
&lt;!-- Before — dead under a strict CSP. The knob never applies. --&gt;
&lt;div class="nds-block nds-flex nds-col" style="--align: center;"&gt;

&lt;!-- After — same NDS classes, plus one of yours. --&gt;
&lt;div class="nds-block nds-flex nds-col signin-stack"&gt;
                    </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <p>Then set the knob in your stylesheet:</p>
            </div>
            <div class="nds-block">
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-css code">
.signin-stack { --align: center; }
                    </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <p>NDS components are not affected. Their JavaScript sets styles through the CSSOM, which no policy blocks. Only knobs you wrote into a <code class="nds-inline-code lang-html">style</code> attribute need this treatment.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3>Frameworks that re-render the head</h3>
                <p>The head script runs once, at page load. It adds the stylesheet links, and NDS later stamps <code class="nds-inline-code lang-html">data-nds-loaded</code> and <code class="nds-inline-code lang-html">data-nds-fonts-loaded</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code>. None of that is in the server HTML. A framework that diffs the <code class="nds-inline-code lang-html">&lt;head&gt;</code> against the server HTML on navigation removes all of it, while the inline gate stays. The page then hides itself until a full reload. Turbo, htmx boost and Blazor enhanced navigation all work this way.</p>
                <p>Keep those nodes out of the diff: mark the injected links and the two <code class="nds-inline-code lang-html">&lt;html&gt;</code> attributes as permanent, in the way your framework offers. If it removes them anyway, run the deferred-styles loop again after each navigation and put the two stamps back. The component side of a route change is covered in <a class="nds-color" href="{{ 'core/refresh' | relative_url }}">Refresh</a>.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3>Why the stylesheets look the way they do</h3>
                <p>Each deferred stylesheet ships as a <code class="nds-inline-code lang-html">rel="preload"</code> link with a <code class="nds-inline-code lang-html">data-nds-defer</code> mark. The preload downloads the file at the right priority without blocking render. The head script then adds a normal stylesheet link for it, which reuses that download. A more common way to defer CSS is an <code class="nds-inline-code lang-html">onload</code> attribute on the link. NDS does not use one, because <strong>a nonce and a hash both cover a script element, and neither can ever cover an inline event handler</strong>. An <code class="nds-inline-code lang-html">onload</code> attribute needs <code class="nds-inline-code lang-css">'unsafe-inline'</code>, which defeats the policy. Moving the same work into a script element is what makes a strict CSP possible.</p>
                <p>NDS needs JavaScript. The head script is what applies the deferred sheets, so a browser with JavaScript turned off loads no styles and shows a blank page. There is no fallback for this, and it is deliberate: the components need JavaScript to work at all.</p>
                <p>The icon sheets load from <code class="nds-inline-code lang-html">nds-main.min.js</code> for the same reason. That file is already allowed by <code class="nds-inline-code lang-css">'self'</code>, so icons need no grant from you at all.</p>
            </div>
        </div>
    </div>
</section>
