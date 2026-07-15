---
layout: page
title: Tokens
hero_title: Tokens - National Design System
hero_description: "Every CSS custom property behind NDS: the color palette, primitive scales, semantic meanings, and component dials you can reference and override to retheme the system without forking its SCSS."
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.2.0"
updated: "1.3.0"
last_edit: "03/07/2026 - 03:06 AM"
---

<!-- Version notice -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-inline" data-status="info" role="alert">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">Version {{ site.version }}</span>
                        <p class="nds-alert-description">This reference is generated from the design-token source of National Design System {{ site.version }}. Names and values reflect the current release and refresh automatically on every build.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Token hierarchy -->
<section id="tokensHierarchy" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Token Hierarchy</h2>
            <p class="nds-section-description">NDS tokens are layered in four tiers. Always reference the highest tier that carries the meaning you need: a component token before a semantic one, a semantic token before a raw value. Higher tiers resolve down to lower ones, so a single re-theme or dark-mode switch cascades everywhere. To retheme the whole system from a few seed colors, see <a class="nds-color" href="{{ 'components/themes' | relative_url }}">Themes</a>.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board"></i>
                        <span class="nds-label">Color Palette</span>
                    </span>
                    <p class="nds-item-desc">The raw <code class="nds-inline-code lang-css">--colors-*</code> values: brand slots, neutrals, status hues, and alpha ramps. Names carry no meaning, only shade. Never edited directly: re-theming regenerates the brand slots from seed colors.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cube"></i>
                        <span class="nds-label">Primitive Scales</span>
                    </span>
                    <p class="nds-item-desc">The dimension vocabulary: named spacing, radius, and typography sizes such as <code class="nds-inline-code lang-css">--spacing-xl</code> and <code class="nds-inline-code lang-css">--radius-md</code>, each carrying its value directly. The size names are the entire scale.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tags"></i>
                        <span class="nds-label">Semantic Tokens</span>
                    </span>
                    <p class="nds-item-desc">One name per meaning, system-wide: backgrounds, text, borders, icons, form-control surfaces, and shadows. Dark mode and re-themes re-bind this layer, so everything that references it adapts automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Component Tokens</span>
                    </span>
                    <p class="nds-item-desc">Per-component dials named <code class="nds-inline-code lang-css">--{component}-{property}-{variant}-{state}</code>. Override one to retune a single component everywhere without touching the shared meanings other components consume.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Naming grammar -->
<section id="tokensGrammar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Naming Grammar</h2>
            <p class="nds-section-description">Token names are contracts: they state what a value is for, never what color or shade it happens to be. Every name follows one of two patterns, built from a fixed vocabulary. The one sanctioned number is the opacity step in alpha families (<code class="nds-inline-code lang-css">--colors-green-alpha-10</code> is a 10% wash), matching the palette's own alpha convention.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Patterns</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Tier</th><th>Pattern</th><th>Example</th></tr></thead>
                    <tbody>
                        <tr><td>Semantic</td><td><code class="nds-inline-code lang-css">--{property}-{role}-{modifier}-{state}</code></td><td><code class="nds-inline-code lang-css">--text-oncolor-primary</code>, <code class="nds-inline-code lang-css">--background-error-light</code></td></tr>
                        <tr><td>Component</td><td><code class="nds-inline-code lang-css">--{component}-{property}-{variant}-{state}</code></td><td><code class="nds-inline-code lang-css">--button-background-primary-hovered</code></td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Vocabulary</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-css">light</code></td><td>A tinted wash of the base meaning, for soft surfaces and borders</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">faint</code></td><td>The faintest tint, one step below <code class="nds-inline-code lang-css">light</code>: <code class="nds-inline-code lang-css">faint</code> &lt; <code class="nds-inline-code lang-css">light</code> &lt; solid</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">strong</code></td><td>A deep, emphasized variant of the base meaning</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">oncolor</code></td><td>The element sits on a colored or dark fill, so the value stays legible there in every mode. Always placed last before the state</td></tr>
                        <tr><td><code class="nds-inline-code lang-css">default / hovered / pressed / selected / focused / disabled / checked</code></td><td>The state axis. A name without a state suffix is the resting state; <code class="nds-inline-code lang-css">pressed</code> corresponds to <code class="nds-inline-code lang-css">:active</code></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

{% if site.data.tokens %}
{% for tier in site.data.tokens.tiers %}
<!-- {{ tier.label }} -->
<section id="tokens-{{ tier.id }}" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">{{ tier.label }}</h2>
            <p class="nds-section-description">
                {%- case tier.id -%}
                {%- when 'primitive' -%}The raw value layer: the DGA color palette and the dimension scales. Each named size (<code class="nds-inline-code lang-css">--spacing-xl</code>, <code class="nds-inline-code lang-css">--radius-md</code>) carries its value directly; the size names are the whole scale.
                {%- when 'semantic' -%}The meaning layer. Each token indirects through a primitive, so overriding the palette or switching to dark mode re-resolves every consumer with no component changes.
                {%- when 'component' -%}Per-component tokens, grouped by component. Each consumes a semantic or palette token; override one on a scope to restyle just that component.
                {%- endcase -%}
            </p>
        </div>
        <div class="nds-section-body">
            <div class="nds-tabs nds-code nds-divided">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="{{ tier.label }} categories">
                        {%- for cat in tier.categories %}
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
                            aria-controls="panel-tokens-{{ tier.id }}-{{ cat.id }}" id="tab-tokens-{{ tier.id }}-{{ cat.id }}">
                            <span class="nds-tab-label">{{ cat.label }}</span>
                        </button>
                        {%- endfor %}
                    </nav>
                    <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="nds-tab-content">
                    {%- for cat in tier.categories %}
                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-tokens-{{ tier.id }}-{{ cat.id }}"
                        aria-labelledby="tab-tokens-{{ tier.id }}-{{ cat.id }}"{% unless forloop.first %} hidden{% endunless %}>
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy {{ cat.label }} tokens">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <div class="nds-expandable-content">
                            <code class="lang-css code">:root {
{%- for t in cat.tokens %}
  {{ t.name | escape }}: {{ t.value | escape }};
{%- endfor %}
}</code>
                        </div>
                    </div>
                    {%- endfor %}
                </div>
            </div>
        </div>
    </div>
</section>
{% endfor %}
{% endif %}

<!-- Knobs vs tokens -->
<section id="tokensKnobs" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Knobs vs Tokens</h2>
            <p class="nds-section-description">NDS has two override surfaces with different jobs. Tokens theme the system: defined at <code class="nds-inline-code lang-css">:root</code>, changing one retunes every matching component. Knobs style one element: undefined by default, set inline or on a wrapper, scoped to whatever they cascade into.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th></th><th>Tokens</th><th>Knobs</th></tr></thead>
                    <tbody>
                        <tr><td>Job</td><td>Theme the system or a whole component type</td><td>Style one instance or one region</td></tr>
                        <tr><td>Default</td><td>Defined at <code class="nds-inline-code lang-css">:root</code> by NDS</td><td>Undefined; the component falls back internally</td></tr>
                        <tr><td>Where you set it</td><td><code class="nds-inline-code lang-css">:root</code> or a theme scope</td><td>The element's <code class="nds-inline-code lang-html">style</code> attribute or a wrapper class</td></tr>
                        <tr><td>Examples</td><td><code class="nds-inline-code lang-css">--button-background-primary-default</code>, <code class="nds-inline-code lang-css">--background-card</code></td><td><code class="nds-inline-code lang-css">--btn-size</code>, <code class="nds-inline-code lang-css">--card-width</code>, <code class="nds-inline-code lang-css">--section-padding-block</code></td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy knobs vs tokens example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">/* Knob: this one button renders at 48px */
&lt;button class="nds-btn nds-primary" style="--btn-size: 48px"&gt;Save&lt;/button&gt;

/* Token: every primary button in the app changes fill */
:root { --button-background-primary-default: var(--colors-tertiary-600); }</code>
                </div>
                <p>Each component resolves its knobs through a private variable with a fallback, so an unset knob simply uses the component's default. Every component page lists its knobs in the CSS Custom Properties table of its Usage Guidelines.</p>
            </div>
        </div>
    </div>
</section>

<!-- Dark mode behavior -->
<section id="tokensDark" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dark Mode Behavior</h2>
            <p class="nds-section-description">Dark mode activates with <code class="nds-inline-code lang-html">&lt;html data-theme="dark"&gt;</code> (token-matched, so it composes with theme names like <code class="nds-inline-code lang-html">"dark crimson"</code>). It changes no component CSS: it only re-binds tokens.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <ul>
                    <li>The <strong>semantic layer</strong> flips first: page surfaces, text, borders, icons, and shadows take dark values, and everything consuming them follows</li>
                    <li><strong>Component dials</strong> re-bind where a component needs its own dark correction: checkbox and switch fills darken for white-glyph contrast while radio brightens for its dot-with-border shape</li>
                    <li>The <strong>oncolor family</strong> deliberately does not flip: elements on brand fills keep their contrast in both modes</li>
                    <li>The <strong>palette never changes</strong>: <code class="nds-inline-code lang-css">--colors-neutral-100</code> is the same hex in both modes, which is why components reference meanings, not shades</li>
                </ul>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Overriding with dark in mind</h3>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy dark override example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">/* One value for both modes: override the token once */
:root { --background-card: #fffdf5; }

/* A dark-specific value: re-bind it inside the dark scope */
:root[data-theme~="dark"] { --background-card: #26221a; }</code>
                </div>
                <p>Mode switching, persistence, and the seed-color theme engine are covered on the <a class="nds-color" href="{{ 'components/themes' | relative_url }}">Themes</a> page.</p>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="tokensGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Reference tokens with <code class="nds-inline-code lang-css">var(--token-name)</code>. Never hardcode a hex color, pixel value, or shadow that a token already names</li>
                    <li>Prefer the highest tier that fits: a <strong>component token</strong> over a <strong>semantic token</strong> over a raw <strong>primitive</strong>. The higher the tier, the more a re-theme or dark mode does for you for free</li>
                    <li>Reach for a <strong>primitive</strong> directly only when no semantic token carries the meaning (for example a one-off spacing or radius value)</li>
                    <li>To restyle a single component, override its <code class="nds-inline-code lang-css">--{component}-*</code> token on a scope rather than editing the component's SCSS: <code class="nds-inline-code lang-css">.my-scope { --button-background-primary-default: var(--colors-tertiary-600); }</code></li>
                    <li>To retheme the whole system, override the brand slots (<code class="nds-inline-code lang-css">--colors-primary-*</code> and friends). Semantic and component tokens re-resolve automatically. The <a class="nds-color" href="{{ 'components/themes' | relative_url }}">Themes</a> page generates a full palette from a few seed colors</li>
                    <li>Do not hardcode light-mode values. Dark mode re-binds the <strong>semantic</strong> layer, so a component that references <code class="nds-inline-code lang-css">--text-default</code> flips correctly while one pinned to <code class="nds-inline-code lang-css">--colors-base-black</code> will not</li>
                    <li>Always pair a typography size token with its line-height: <code class="nds-inline-code lang-css">--typo-text-md-FS</code> with <code class="nds-inline-code lang-css">--typo-text-md-LH</code></li>
                    <li>Match spacing by value when reading the scale: <code class="nds-inline-code lang-css">--spacing-xl</code> is 16px, <code class="nds-inline-code lang-css">--spacing-md</code> is 8px</li>
                    <li>Use <strong>knobs</strong> (<code class="nds-inline-code lang-css">--btn-size</code>, <code class="nds-inline-code lang-css">--card-width</code>) for one-off instance styling and <strong>tokens</strong> for theme-wide changes; a knob set on a wrapper styles everything inside it</li>
                    <li>When you override a component token globally, give it a dark value too by re-binding it inside <code class="nds-inline-code lang-css">:root[data-theme~="dark"]</code></li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">How Tokens Resolve</h3>
                <p>Every painted value walks a chain from a knob or component dial down to the palette. Two real chains from the source:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy resolution example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">/* The .nds-primary button fill: knob, component dial, palette */
--btn-bg: var(--button-background-primary-default);             /* knob, set by the variant class */
--button-background-primary-default: var(--colors-primary-600); /* component tier */
--colors-primary-600: #1b8354;                                  /* palette */

/* The checked checkbox fill: dial, shared semantic surface, palette */
--checkbox-primary-checked: var(--controls-primary-checked);    /* component dial */
--controls-primary-checked: var(--colors-primary-600);          /* semantic */</code>
                </div>
                <p>Override any link in the chain and everything above it follows. This reference is generated directly from the token SCSS at build time, so the names and values on this page always match what ships.</p>
            </div>

        </div>
    </div>
</section>
