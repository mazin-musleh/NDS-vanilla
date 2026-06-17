---
layout: page
title: Tokens
hero_title: Tokens - National Design System
hero_description: "The CSS custom properties behind every NDS component: a three-tier system of primitive, semantic, and component tokens you can reference and override to retheme the system without forking its SCSS."
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
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
            <p class="nds-section-description">NDS tokens are layered in three tiers. Always reference the highest tier that carries the meaning you need: a component token before a semantic one, a semantic token before a raw primitive. Higher tiers resolve down to lower ones, so a single re-theme or dark-mode switch cascades everywhere.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cube"></i>
                        <span class="nds-label">Primitive Tokens</span>
                    </span>
                    <p class="nds-item-desc">Raw, context-free values: the full color palette plus the spacing, sizing, radius, and typography scales. Everything else resolves down to these. Reference them directly only when no semantic token fits.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tags"></i>
                        <span class="nds-label">Semantic Tokens</span>
                    </span>
                    <p class="nds-item-desc">Meaning-based aliases like background, text, border, icon, and shadow that point at primitives. Re-theming and dark mode re-bind these, so components that reference them adapt automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Component Tokens</span>
                    </span>
                    <p class="nds-item-desc">Per-component knobs named <code class="nds-inline-code lang-css">--{component}-{property}-{variant}-{state}</code>. Each resolves through a semantic or palette token. Override one to restyle a single component without touching the rest.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board"></i>
                        <span class="nds-label">Theming & Dark Mode</span>
                    </span>
                    <p class="nds-item-desc">Override the brand slots to retheme the whole system, or let dark mode re-bind the semantic layer. See <a class="nds-color" href="{{ 'components/themes' | relative_url }}">Themes</a> for the seed-palette engine and stylesheet themes.</p>
                </div>
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
                {%- when 'primitive' -%}The raw value layer: the DGA color palette and the dimension scales. Numeric rungs (<code class="nds-inline-code lang-css">--spacing-4</code>) feed the named sizes (<code class="nds-inline-code lang-css">--spacing-xl</code>) that components actually consume.
                {%- when 'semantic' -%}The meaning layer. Each token indirects through a primitive, so overriding the palette or switching to dark mode re-resolves every consumer with no component changes.
                {%- when 'component' -%}Per-component tokens, grouped by component. Each consumes a semantic or palette token; override one on a scope to restyle just that component.
                {%- endcase -%}
            </p>
        </div>
        <div class="nds-section-body">
            <div class="nds-tabs nds-code nds-divided">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="{{ tier.label }} categories">
                        {%- for cat in tier.categories %}
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
                            aria-controls="panel-tokens-{{ tier.id }}-{{ cat.id }}" id="tab-tokens-{{ tier.id }}-{{ cat.id }}">
                            <span class="nds-tab-label">{{ cat.label }}</span>
                        </button>
                        {%- endfor %}
                    </nav>
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
                    <li>Match spacing by value when reading the scale: <code class="nds-inline-code lang-css">--spacing-xl</code> is 16px, <code class="nds-inline-code lang-css">--spacing-md</code> is 8px. Use the named sizes, not the numeric rungs, in component code</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">How Tokens Resolve</h3>
                <p>A component token points at a semantic token, which points at a palette primitive. Following one chain end to end:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy resolution example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">--button-background-primary-default: var(--colors-primary-600); /* component */
--background-primary:                var(--colors-primary-600); /* semantic  */
--colors-primary-600:                #1b8354;                   /* primitive */</code>
                </div>
                <p>Override the primitive and both the semantic and component tokens shift with it. This reference is generated directly from the token SCSS at build time, so the names and values above always match what ships.</p>
            </div>

        </div>
    </div>
</section>
