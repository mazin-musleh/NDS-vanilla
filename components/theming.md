---
layout: page
title: Theming
hero_title: Theming - National Design System
hero_description: Re-brand the entire design system by overriding a small set of colour slots. DGA is the built-in default and fallback; your theme layers on top — globally or scoped to a subtree — with no component CSS changes.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- How it works -->
<section id="themingHow" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">How theming works</h2>
            <p class="nds-section-description">Every colour in the system resolves through three layers: component tokens → semantic tokens → brand <strong>slots</strong> (<code class="nds-inline-code lang-css">--colors-{primary,secondary,tertiary}-{25…950}</code>). For a site-wide rebrand, override the slots at <code class="nds-inline-code lang-css">:root</code> — the whole layer is computed there, so every component, semantic token and dark-mode step re-resolves to your brand with no component CSS changes. The DGA brand ships in the base as the default, so anything your theme does not set stays DGA. To rebrand only a subtree, override the tokens components <em>read</em> under <code class="nds-inline-code lang-html">[data-brand]</code> (slot overrides do not propagate past <code class="nds-inline-code lang-css">:root</code> — see below).</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Override the slots</span>
                    </span>
                    <p class="nds-item-desc">The public theming surface is the brand slots. Set them at <code class="nds-inline-code lang-css">:root</code> and the cascade does the rest — buttons, links, chips, ratings, borders, icons and focus rings all follow.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">DGA is the fallback</span>
                    </span>
                    <p class="nds-item-desc">The default brand is baked into the base. With no theme file the system renders pure DGA; a theme only overrides what it declares.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-moon-02"></i>
                        <span class="nds-label">Dark mode for free</span>
                    </span>
                    <p class="nds-item-desc">Dark mode re-selects lighter <em>steps</em> of the same slots, so a theme that supplies a full ramp gets a correct dark palette automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-grid"></i>
                        <span class="nds-label">Global or scoped</span>
                    </span>
                    <p class="nds-item-desc">Override slots at <code class="nds-inline-code lang-css">:root</code> for one brand site-wide; to brand a subtree or switch at runtime, override the consumed component tokens under <code class="nds-inline-code lang-html">[data-brand="…"]</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Live scoped demo -->
<section id="themingScopedDemo" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Live brand switcher</h2>
            <p class="nds-section-description">Pick a brand — the switcher sets <code class="nds-inline-code lang-html">data-brand</code> on the <code class="nds-inline-code lang-html">&lt;html&gt;</code> element, so the whole page re-skins in real time. Each brand here is just <strong>three seed colours</strong> (<code class="nds-inline-code lang-css">--brand-primary/secondary/tertiary</code>); one shared OKLCH derivation expands them into the full slot ramp at <code class="nds-inline-code lang-css">:root[data-brand]</code>, and every component follows — exactly like the dark-mode toggle. Even the neutral <strong>grays</strong> pick up a faint cool (corporate) / warm (sunset) tint mixed from the brand. The <strong>success</strong> tag stays green throughout: status colours are universal, not brand. (Relative-colour browsers only; others keep DGA. To re-skin a <em>subtree</em> instead of the whole page, override the consumed component tokens under <code class="nds-inline-code lang-html">[data-brand]</code> — slots only propagate from <code class="nds-inline-code lang-css">:root</code>; see <a class="nds-color" href="#themingContract">The contract</a>.)</p>
        </div>
        <div class="nds-section-body">
            <!-- Demo brand defs + switcher styles live in _sass/_showcase.scss (Theming demo). -->
            <!-- The switcher <script> at the end of this section toggles data-brand on <html>. -->
            <div class="nds-demo-card">
                <div class="demo-header"><div class="demo-label">Brand preview</div></div>
                <div class="demo-container">
                    <div class="theming-switch" role="group" aria-label="Choose a brand for the preview">
                        <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theming-brand="" aria-pressed="true">Default (DGA)</button>
                        <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theming-brand="corporate" aria-pressed="false">Corporate</button>
                        <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theming-brand="sunset" aria-pressed="false">Sunset</button>
                        <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-theming-brand="crimson" aria-pressed="false">Crimson (hex)</button>
                    </div>
                    <div id="themingPreview">
                        <div class="state-demo" style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;">
                            <button class="nds-btn nds-primary">Primary action</button>
                            <a href="#themingScopedDemo" class="nds-link nds-primary">A themed link</a>
                            <button class="nds-chip nds-primary nds-rounded"><span class="nds-label">Primary chip</span></button>
                            <span class="nds-tag nds-green nds-sm">Success</span>
                        </div>
                    </div>
                </div>
            </div>
            <script>
            (function(){
                var root = document.documentElement;
                var KEY = 'nds-brand';   // persists the chosen brand, like the dark-mode toggle
                var btns = document.querySelectorAll('[data-theming-brand]');
                // The pre-paint script in head-inline-scripts.html already applied the
                // saved brand to <html>; here we just keep the buttons + storage in sync.
                function sync(brand){
                    btns.forEach(function(x){
                        x.setAttribute('aria-pressed', x.getAttribute('data-theming-brand') === brand ? 'true' : 'false');
                    });
                }
                sync(root.getAttribute('data-brand') || '');
                btns.forEach(function(b){
                    b.addEventListener('click', function(){
                        var brand = b.getAttribute('data-theming-brand');
                        if (brand) { root.setAttribute('data-brand', brand); }
                        else { root.removeAttribute('data-brand'); }
                        try { if (brand) localStorage.setItem(KEY, brand); else localStorage.removeItem(KEY); } catch (e) {}
                        sync(brand);
                    });
                });
            })();
            </script>
        </div>
    </div>
</section>

<!-- Quick start -->
<section id="themingQuickStart" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Full branding — authored hex</h2>
            <p class="nds-section-description">For a real, complete brand, author the colour ramps as hex and load them on top of the base. This is the <strong>full-control path</strong>: exact, contrast-checked values with the widest browser support — what a production brand should ship. (For a quick brand from just a few seeds, see <a class="nds-color" href="#themingSeed">Auto themes</a> below.)</p>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">1 — Define the brand slots</h3>
                <p>Override the slots for each family. Only <code class="nds-inline-code lang-css">--colors-primary-600</code> is shown trimmed here; supply the full <code class="nds-inline-code lang-css">25…950</code> ramp (plus the <code class="nds-inline-code lang-css">-alpha-*</code> tints) for light <em>and</em> dark to resolve well.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">
:root {
  /* Primary ramp (13 steps) */
  --colors-primary-25:  #f5f6ff;
  /* …50,100,200,300,400,500,500-alpha-10… */
  --colors-primary-600: #4f46e5;   /* brand anchor */
  /* …700,800,900,950… */

  /* Primary brand-tint alpha ramp (chips, table-selection, autocomplete, footer) */
  --colors-primary-alpha-10: #4f46e51a;   /* …20,30,40,50,60,70,80,90 */

  /* Repeat for --colors-secondary-* and --colors-tertiary-* */

  /* Deep brand surface for hero + footer (does not auto-derive — set it) */
  --background-brand-strong: var(--colors-primary-900);
}</code>
                </div>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">2a — Load it (drop-in CSS, no build)</h3>
                <p>NDS ships as compiled CSS. Save your slot block as <code class="nds-inline-code lang-css">assets/css/nds-brand-<em>acme</em>.min.css</code> and point the config at it. The build links it <strong>render-blocking before paint</strong> so brand colours never flash from DGA. Leave it empty for pure DGA.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-yaml code">
# _config.yml
brand: acme   # → loads assets/css/nds-brand-acme.min.css</code>
                </div>
                <p>Consuming the bundle directly (no Jekyll)? Add the same stylesheet to your <code class="nds-inline-code lang-html">&lt;head&gt;</code> <em>after</em> the NDS critical CSS and <em>before</em> the main CSS, as a normal blocking <code class="nds-inline-code lang-html">&lt;link rel="stylesheet"&gt;</code> — never a deferred/async load (it would flash).</p>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">2b — Load it (SCSS, for source forks)</h3>
                <p>Forking the source? Copy the authored-hex full-brand template — <code class="nds-inline-code lang-css">_sass/brands/_theme-template.scss</code> (a complete sample brand with every slot filled in) — to <code class="nds-inline-code lang-css">_sass/brands/_&lt;brand&gt;.scss</code>, replace the hex with yours, and compile it to its own entry point.</p>
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
@use 'brands/acme';</code>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Seed-based / OKLCH -->
<section id="themingSeed" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Auto themes — predefined brands (seeds)</h2>
            <p class="nds-section-description">Set one seed colour per family and let NDS derive the whole ramp — the <strong>auto path</strong>, used to ship <strong>predefined brands</strong> from just a few seeds (it's exactly what the live switcher above does). It uses <strong>OKLCH</strong> relative colour (perceptually-uniform lightness, unlike HSL). Trade-off: needs a modern browser (older engines fall back to DGA) and derived steps aren't contrast-guaranteed — so for a real, full brand, prefer <a class="nds-color" href="#themingQuickStart">authored hex</a> above.</p>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Derive a ramp from a seed</h3>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-scss code">
// _sass/brands/_acme.scss
@use 'oklch-template' as oklch;

:root { --brand-primary:#3538cd; --brand-secondary:#0e7090; --brand-tertiary:#6938ef; }

@supports (color: oklch(from white l c h)) {
  :root {
    @include oklch.brand-ramp('primary',   '--brand-primary');
    @include oklch.brand-ramp('secondary', '--brand-secondary');
    @include oklch.brand-ramp('tertiary',  '--brand-tertiary', 500);
    @include oklch.brand-alpha('primary',  '--brand-primary');
    @include oklch.brand-alpha('tertiary', '--brand-tertiary');
  }
}</code>
                </div>
                <p>Plain CSS (no Sass)? Each step is <code class="nds-inline-code lang-css">oklch(from var(--brand-primary) &lt;L&gt; calc(c * &lt;scale&gt;) h)</code> — hold the hue, scale the chroma, step the lightness; the 600 step is the seed itself.</p>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Caveats</h3>
                <ul>
                    <li><strong>Browser support.</strong> Relative-colour syntax is ~Chrome&nbsp;119 / Safari&nbsp;16.4 / Firefox&nbsp;128 (mid-2024). The <code class="nds-inline-code lang-css">@supports</code> gate makes the fallback automatic — older engines keep the DGA base (or any hex you set first), so ship a hex fallback block before it if you must support them.</li>
                    <li><strong>Verify contrast.</strong> Derived steps are not contrast-guaranteed. Check WCAG (4.5:1 text, 3:1 UI) for <code class="nds-inline-code lang-css">primary-600</code> on white and on-colour text on <code class="nds-inline-code lang-css">primary-600</code> before shipping.</li>
                </ul>
            </div>

        </div>
    </div>
</section>

<!-- Override points + dark -->
<section id="themingOverridePoints" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Theme override points</h2>
            <p class="nds-section-description">A few brand surfaces are kept frozen to DGA's compliant values rather than auto-derived from the slots, so the default brand never drifts. Set these explicitly in your theme to re-brand them.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Token</th><th>What it controls</th><th>How to re-brand</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-css">--background-brand-strong</code></td><td>Deep brand surface behind the hero + footer. Both default to it; override <code class="nds-inline-code lang-css">--background-hero</code> or <code class="nds-inline-code lang-css">--background-footer</code> to set each individually.</td><td>Set to your brand's deep tone (e.g. <code class="nds-inline-code lang-css">var(--colors-primary-900)</code>).</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">--bullet-background-active</code>, <code class="nds-inline-code lang-css">--controls-primary-checked</code>, <code class="nds-inline-code lang-css">--background-footer</code></td><td>Dark-mode primary accents (swiper bullets, checkboxes/radios, footer wash). DGA draws these from its status-green ramp in dark.</td><td>Override inside <code class="nds-inline-code lang-css">:root[data-theme="dark"]</code> to point at <code class="nds-inline-code lang-css">--colors-primary-*</code> / <code class="nds-inline-code lang-css">--colors-primary-alpha-*</code>.</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Dark mode &amp; accessibility</h3>
                <ul>
                    <li>Brand and light/dark are independent axes: brand rides on the slots, <a class="nds-color" href="{{ 'components/dark-mode' | relative_url }}">dark mode</a> picks lighter steps of those slots. A themed page in dark mode resolves correctly with no extra work beyond the override points above.</li>
                    <li>High-contrast accessibility mode re-maps semantic tokens through the same slots, so themed links and borders pick up the brand while the mono surfaces stay intentionally brand-invariant.</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- The contract -->
<section id="themingContract" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">The contract</h2>
            <p class="nds-section-description">Override the public surface; treat the private layer as implementation detail.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Layer</th><th>Tokens</th><th>Override?</th></tr></thead>
                    <tbody>
                        <tr><td>Brand slots (primary surface)</td><td><code class="nds-inline-code lang-css">--colors-{primary,secondary,tertiary}-{25…950}</code>, <code class="nds-inline-code lang-css">--colors-primary-500-alpha-10</code>, <code class="nds-inline-code lang-css">--colors-{primary,tertiary}-alpha-{10…100}</code></td><td>Yes — primary path.</td></tr>
                        <tr><td>Seeds (quick path)</td><td><code class="nds-inline-code lang-css">--brand-primary</code>, <code class="nds-inline-code lang-css">--brand-secondary</code>, <code class="nds-inline-code lang-css">--brand-tertiary</code></td><td>Yes — feeds the OKLCH helper.</td></tr>
                        <tr><td>Semantic &amp; component tokens</td><td><code class="nds-inline-code lang-css">--background-*</code>, <code class="nds-inline-code lang-css">--text-*</code>, <code class="nds-inline-code lang-css">--border-*</code>, <code class="nds-inline-code lang-css">--button-*</code>, <code class="nds-inline-code lang-css">--link-*</code>, …</td><td>Optional for surgical tweaks — and <strong>required</strong> for scoped <code class="nds-inline-code lang-html">[data-brand]</code> theming, since raw slots only resolve at <code class="nds-inline-code lang-css">:root</code>.</td></tr>
                        <tr><td>Private</td><td><code class="nds-inline-code lang-css">--_*</code> working variables</td><td>No — implementation detail.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
