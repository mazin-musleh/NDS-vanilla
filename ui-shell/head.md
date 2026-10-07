---
layout: page
title: Document Head
hero_title: Document Head - National Design System
hero_description: The stylesheets and scripts every NDS page loads, so the page paints fast with no flash of unstyled content and no layout shift
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.12.x"
last_edit: "07/10/2026 - 10:20 AM"
---

<section id="headOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Every page carries the same `<head>`: an inline style block (the gate), two stylesheet preloads and one inline script, and the main script goes before `</body>`. The gate draws the shell of the page and hides its content until the main CSS applies. The inline script turns the preloads into stylesheets. The main script starts the components and loads every other file.

The code below is the head this site serves.

The body of the page is on [Page Layout](../layout/page-layout).

</div>
  </div>
</section>

<section id="headMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Copy the head as one block. The JS Library tab holds the main script: put it just before `</body>`. Change only the lines the Parts table marks as per page.

{%- comment %} The <script> below would end a canon, so the code sits in a capture. verify() in mkrelease.py fails the release when its gate or script drifts from the served head. {% endcomment %}
{%- capture head_code %}
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <style>
    /* Colors: the first-paint fills. Edit the fallbacks to match a brand. */
    html[data-theme~=dark] :where(.nds-main-nav .nds-brand.nds-oncolor :is(img,svg)){filter:brightness(0) invert(1)}
    html{background-color:var(--background-body, #f9fafb)}
    html[data-theme~=dark]{background-color:var(--background-body, #111927)}
    :where(.nds-topbar){background-color:var(--background-topbar, #f3f4f6)}
    html[data-theme~=dark] :where(.nds-topbar){background-color:var(--background-topbar, #111927)}
    :where(.nds-main-nav){background-color:var(--background-nav, #fff)}
    html[data-theme~=dark] :where(.nds-main-nav){background-color:var(--background-nav, #1f2a37)}
    :where(.nds-hero-image-wrapper)::before{content:"";position:absolute;inset:0;background:color-mix(in srgb, var(--img-overlay-color, #092a1e) calc(var(--overlay, 0.7) * 100%), transparent);pointer-events:none}

    /* Structure: reserved heights, and the rules that hide the content until the main CSS applies. */
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{overflow-anchor:none}
    html :where(header){display:contents}
    html :where(.nds-topbar){height:40px}
    html :where(.nds-main-nav){height:var(--nds-nav-height, 72px)}
    html .nds-swiper.nds-hero:not([data-nds-swiper-initialized],[data-swiper-preset]) .nds-swiper-slide:not(:first-child){display:none}
    :where(.nds-topbar>*,.nds-main-nav>*,.nds-hero-section .nds-section-action,.nds-content-layout,.nds-user-feedback-section,.nds-footer){visibility:hidden}
    html:not([data-nds-loaded]) main{overflow-x:clip}
    .nds-skip-link:not(:focus){position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}
    :root{--nds-icons-opacity: 0}
    :is(.nds-hidden,[hidden],[data-state~=hidden],[data-filtered]){display:none !important}
    :where(.nds-hero-section){position:relative;height:550px}
    :where(.nds-hero-section.nds-sub){height:auto;min-height:220px}
    :where(.nds-hero-image-wrapper){position:absolute;inset:0}
    :where(.nds-hero-image){width:100%;height:100%;object-fit:cover;display:block}
    :where(.nds-hero-section :is(.nds-section-body,.nds-section-wrapper,.nds-breadcrumb-nav)){visibility:hidden}
  </style>
  <!-- Hero photo only: preload the first slide, with its <source> breakpoints -->
  <link rel="preload" as="image" href="assets/img/hero-sm.webp" media="(max-width: 768px)" fetchpriority="high">
  <link rel="preload" as="image" href="assets/img/hero-md.webp" media="(min-width: 769px) and (max-width: 1646px)" fetchpriority="high">
  <link rel="preload" as="image" href="assets/img/hero.webp" media="(min-width: 1647px)" fetchpriority="high">
  <link rel="preload" href="assets/css/nds.critical.min.css?ver={{ site.asset_ver }}" as="style" fetchpriority="high" data-nds-defer>
  <link rel="preload" href="assets/css/nds-main.min.css?ver={{ site.asset_ver }}" as="style" fetchpriority="low" data-nds-defer="main">
  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg" fetchpriority="low">
  <script>
    (function() {
      var v; try { v = localStorage.getItem('nds-theme'); } catch (e) {}
      if (v) {
        var d = document.documentElement;
        var t = ((d.getAttribute('data-theme') || '') + ' ' + v).split(/\s+/)
          .filter(function (x, i, a) { return x && a.indexOf(x) === i; });
        d.setAttribute('data-theme', t.join(' '));
      }
    })();
    (function () {
      document.querySelectorAll('link[rel="preload"][data-nds-defer]').forEach(function (p) {
        var l = document.createElement('link');
        for (var i = 0; i < p.attributes.length; i++) {
          var a = p.attributes[i];
          if (a.name !== 'rel' && a.name !== 'as') l.setAttribute(a.name, a.value);
        }
        l.rel = 'stylesheet';
        p.removeAttribute('data-nds-defer');
        document.head.appendChild(l);
      });
    })();
  </script>
</head>
{% endcapture %}
{%- capture head_main %}
<script defer src="assets/js/nds-main.min.js?ver={{ site.asset_ver }}"></script>
{% endcapture %}

<script type="text/html" id="head-setup" data-canon data-preview="none" data-escaped data-js="head-main" data-tab-label="Head">
{{ head_code | strip | escape }}
</script>

<script type="text/html" id="head-main" data-canon data-escaped data-tab-label="JS Library">
{{ head_main | strip | escape }}
</script>

</div>
  </div>
</section>

<section id="headParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `<title>` | The page title. Per page | Yes |
| `<style>` (the gate) | The shell's first-paint colors, its reserved heights, and the rules that hide the content. Edit the fallback colors in its Colors group to match a brand | Yes, unless you load the critical CSS as a blocking stylesheet |
| Hero image preloads | The first hero slide, one link per `<source>` in its `<picture>`, with the same media queries. Per page | Only on a page whose hero has a photo |
| Critical CSS preload | `nds.critical.min.css`. `data-nds-defer` marks it for the inline script | Yes |
| Main CSS preload | `nds-main.min.css`. `data-nds-defer="main"` marks it as the sheet the page waits for | Yes |
| Favicon | A placeholder icon. Replace the file with your own | Yes |
| Inline script | The saved theme, applied before the first paint, and the loop that turns each `data-nds-defer` preload into a stylesheet | Yes |
| Main script | `nds-main.min.js`, in the JS Library tab | Yes |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="headBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Gated First Paint
{: .nds-block-title}

The head above is the gated setup. The browser paints the gate's shell at once, while the critical CSS downloads without blocking. Once the main CSS applies, the loader sets `data-nds-loaded` on `<html>`, and the page shows in its final layout. NDS needs JavaScript: without it, no NDS style applies, and the gate keeps the content hidden.

### Blocking Critical CSS
{: .nds-block-title}

Use a blocking stylesheet when a strict Content Security Policy cannot grant a nonce or a hash to the inline style block. Delete the `<style>` block. Replace the critical CSS preload with `<link rel="stylesheet" href="assets/css/nds.critical.min.css?ver=…">`. The first paint waits for that file, and it holds the same gate. Never delete the style block alone: the page then paints raw HTML first, and jumps when the critical CSS lands.

### Framework Navigation
{: .nds-block-title}

The inline script runs once, at page load. The stylesheet links it adds and the `data-nds-loaded` stamp are not in the server HTML. A framework that compares `<head>` with the server HTML on each navigation removes them, while the gate stays, so the page hides itself until a full reload. Turbo, htmx boost and Blazor enhanced navigation work this way. Mark those links and the stamp as permanent, in the way your framework offers. If it removes them anyway, run the stylesheet loop again after each navigation and put the stamp back. Components on a new view are covered on [Refresh](../core/refresh).

</div>
  </div>
</section>

<section id="headFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">No Unstyled Content</span>
          </span>
          <p class="nds-item-desc">The gate hides the content until the main CSS applies. A visitor never sees raw HTML or half-styled components.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-ruler"></i>
            <span class="nds-label">Reserved Layout</span>
          </span>
          <p class="nds-item-desc">The gate gives the top bar, the main navigation and the hero their final heights at first paint. Nothing moves when the styles land.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-moon-02"></i>
            <span class="nds-label">Saved Theme Before Paint</span>
          </span>
          <p class="nds-item-desc">The inline script reads the theme the visitor saved and writes it on <code class="nds-inline-code lang-html">&lt;html&gt;</code> before the first paint. A dark page never flashes light.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-dashboard-speed-01"></i>
            <span class="nds-label">Non-Blocking Styles</span>
          </span>
          <p class="nds-item-desc">Each stylesheet downloads as a preload and applies when it arrives, so no CSS file blocks the first paint. The hero preload starts the largest image before the body is parsed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-package"></i>
            <span class="nds-label">One Script Tag</span>
          </span>
          <p class="nds-item-desc">The main script loads every other bundle and the icon sheets itself, after the page shows. A page needs no tag for them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-security-check"></i>
            <span class="nds-label">Strict CSP</span>
          </span>
          <p class="nds-item-desc">A nonce or a hash can cover a script element, but never an inline event handler. So the head applies its stylesheets with a script, not an <code class="nds-inline-code lang-html">onload</code> attribute.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="headPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Change the `?ver=` value on every NDS upgrade. A stale value serves the old files from the browser cache. The loader adds the main script's `?ver=` to every bundle it loads.
- Keep the head entries in their order. The inline script must come after every `data-nds-defer` preload, because it converts only the preloads above it.
- Keep every NDS stylesheet in one folder, with the file names as shipped. The loader builds the icon and accessibility sheet URLs from the main CSS link, by swapping its file name.
- Never add a tag for `nds-delegated.min.js`, `nds-extras.min.js` or any other bundle. The loader adds each one when the page needs it.
- To defer a stylesheet of your own, give its preload `data-nds-defer`: `<link rel="preload" href="css/site.css" as="style" data-nds-defer>`. The inline script applies it with the others.
- For a default stylesheet theme, add `<link id="nds-theme-stylesheet" rel="stylesheet" href="…">` right after the critical CSS preload, as a blocking stylesheet, so the brand applies before the first paint. See [Themes](../components/themes).

</div>
  </div>
</section>

<section id="headApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Files
{: .nds-block-title #assetFiles}

| File | Holds | Loading |
|---|---|---|
| `nds.critical.min.css` | Tokens, palette, fonts, reset, section layout, hero and the gate | A preload behind the gate, or a blocking stylesheet |
| `nds-main.min.css` | Every component and layout style | A preload. The page shows once it applies |
| `nds-icons.min.css` | UI icons (`nds-icon`) | Added by the loader once the main CSS applies |
| `hgi-rounded-stroke-min.css` | The content icon map (`hgi hgi-stroke`). The icon font face is in the critical CSS | Added by the loader when the page shows |
| `nds-main.min.js` | The loader and the components that paint the first screen | A `defer` script at the end of `<body>` |
| `nds-delegated.min.js`, `nds-extras.min.js`, `nds-editor.min.js`, `nds-chart.min.js`, `nds-code.min.js`, `nds-cookie-consent.min.js` | The other components | Added by the loader after the page shows, when the page holds one of their components |
| `nds-accessibility.min.js` and `nds-accessibility.min.css` | The accessibility panel. See [Accessibility](../components/accessibility) | Added by the loader on the first press of the accessibility button, or at load for a visitor with saved settings |
| `nds-audit.min.js` | The page audit | Added by the first `NDS.Init.audit()` call, or by `enableLogging`. Never on a production page |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-nds-defer` | a `<link rel="preload" as="style">` | The inline script adds a stylesheet link for it, with the same attributes, and removes the mark from the preload |
| `data-nds-defer="main"` | the main CSS preload | The same, and it marks the main CSS. The loader waits for that sheet to apply before it shows the page, and finds the folder of the other NDS sheets from its URL |
| `data-theme` | `<html>` | The inline script adds the theme saved under `nds-theme` in `localStorage` to it, before the first paint. The theme switcher writes that key |
| `data-timezone` | `<html>` | Write it yourself: the site's timezone, as an IANA name such as `Asia/Riyadh`. Without it, NDS uses the visitor's timezone. See [Date](../core/date) |
| `data-date-format` | `<html>` | Write it yourself: the site's date format, such as `DD/MM/YYYY`. Any element can carry its own for the content inside it. See [Date](../core/date) |
| `data-nds-loaded` | `<html>` | The loader sets it once the main CSS has applied, and the page shows. Do not set it yourself |
{: .nds-table .nds-responsive}

The loader's window settings (`NDSInitConfig`, `NDSAssetBase`) are on [Refresh](../core/refresh).

### Content Security Policy
{: .nds-block-title #csp}

A strict policy blocks inline code, so the gate and the inline script each need a nonce or a hash. Prefer a nonce when your server renders each response. Use a hash only on a static host.

| Part | Needs |
|---|---|
| The inline script | A nonce or a hash in `script-src` |
| The gate (`<style>`), unless you load the critical CSS as a blocking stylesheet | A nonce or a hash in `style-src` |
| Every stylesheet and script file | `'self'` |
| The bundles the loader adds | `'self'`, or the nonce: the loader copies the main script's nonce onto each one |
| UI icons (`nds-icon`) | `img-src data:`: each icon is an inline SVG mask |
| A `style` attribute on your markup (`style="--gap: 16px"`) | `'unsafe-inline'`. No nonce or hash covers an attribute, so move the value to a class |
| Trusted Types (`require-trusted-types-for 'script'`) | The policy name `nds` in `trusted-types` |
{: .nds-table .nds-responsive}

A policy that covers it all:

<script type="text/html" id="head-csp" data-canon data-preview="none" data-lang="plaintext">
Content-Security-Policy:
  default-src 'self';
  script-src  'self' 'nonce-YOUR_RANDOM_VALUE';
  style-src   'self' 'nonce-YOUR_RANDOM_VALUE';
  img-src     'self' data:;
  font-src    'self';
</script>

Put the same value on the gate, the inline script and the main script:

{%- capture head_nonce %}
<style nonce="YOUR_RANDOM_VALUE">/* the gate */</style>
<script nonce="YOUR_RANDOM_VALUE">/* the inline script */</script>

<script nonce="YOUR_RANDOM_VALUE" defer src="assets/js/nds-main.min.js?ver=…"></script>
{% endcapture %}

<script type="text/html" id="head-nonce" data-canon data-preview="none" data-escaped>
{{ head_nonce | strip | escape }}
</script>

Your server makes a new random value for each response: a fixed value gives an attacker the same permission as your own code. Under a policy with no `'self'` in `script-src`, the main script needs the value too. Without it, the bundles the loader adds are blocked, and their components never start.

**No server?** Use a hash: the SHA-256 of the bytes between the tags, never the tags, in base64. It covers those bytes exactly, indentation and line endings included. A file saved with CRLF line endings hashes differently from the same file with LF, and a formatter or minifier breaks the match too. When the policy blocks a block, the browser prints the hash it expected in the console error. Add that hash to the policy as `'sha256-…'`. Do it again whenever anything edits the block.

A policy that allows no injected scripts can still run NDS: add each bundle's own `<script>` tag with its nonce or `integrity`. The loader skips a bundle that already has a tag.

### Inline Knobs
{: .nds-block-title}

Under a strict policy, a knob in a `style` attribute never applies, and the only warning is the browser's CSP error. Search your pages for `style="--`, and move each knob to a class in your own stylesheet:

<script type="text/html" id="head-knob" data-canon data-preview="none">
<!-- Before: dead under a strict CSP -->
<div class="nds-block nds-flex nds-col" style="--align: center;">

<!-- After: the same NDS classes, plus one of yours -->
<div class="nds-block nds-flex nds-col signin-stack">
</script>

<script type="text/html" id="head-knob-css" data-canon data-preview="none" data-lang="css">
.signin-stack { --align: center; }
</script>

NDS components are not affected: their scripts set styles through the CSSOM, which no policy blocks.

</div>
  </div>
</section>

<section id="headRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Page Layout](../layout/page-layout): the `<body>` that follows this head.
- [Hero](../ui-shell/hero): the hero `<picture>` that the hero preloads match.
- [Refresh](../core/refresh): components on content that changes after load.
- [Themes](../components/themes): the theme the inline script applies before the first paint.

</div>
  </div>
</section>
