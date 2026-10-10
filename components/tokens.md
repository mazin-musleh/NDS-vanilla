---
layout: page
title: Tokens
hero_title: Tokens - National Design System
hero_description: "The CSS custom properties behind NDS: the color palette, size scales, semantic meanings and component tokens that you read and override in your own CSS"
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.2.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="tokens-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A token is a CSS custom property that NDS defines at `:root`, in four tiers. Semantic tokens read the palette. Component tokens read a semantic or a palette token. A change low in the chain reaches every token that reads it.

- **Palette**: the raw colors, such as `--colors-primary-600`. A theme replaces the four brand ramps. Base, the alphas and the status hues stay fixed.
- **Primitives**: the sizes, such as `--spacing-xl`: spacing, radius, typography, the font, the page shell and the transition.
- **Semantic**: one meaning each, system-wide, such as `--text-error`. The value is a palette token.
- **Component**: one component's own dial, such as `--button-background-primary-default`. The value is a semantic or palette token.

Pick another page when:

- you change the brand colors of the whole site: [Themes](../components/themes)
- you restyle one component: the Tokens table in that component's API
- you style one element of a component: the CSS Custom Properties table in that component's API

</div>
  </div>
</section>

<section id="tokens-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
{% comment %} Agents: each pack is generated at build time by _plugins/tokens_data.rb. Read the names and values in _sass/themes/_dga.scss, _sass/tokens/_primitives.scss, _sass/tokens/_semantic.scss and _sass/tokens/_components.scss. {% endcomment %}
<script type="text/html" id="tokens-brand" data-canon data-generated data-variants="tokens-variants-table" data-js="tokens-brand-css">
{{ site.data.tokens.packs.brand.html }}
</script>
<script type="text/html" id="tokens-brand-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.brand.css }}
</script>
<script type="text/html" id="tokens-fixed" data-canon data-generated data-js="tokens-fixed-css">
{{ site.data.tokens.packs.fixed.html }}
</script>
<script type="text/html" id="tokens-fixed-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.fixed.css }}
</script>
<script type="text/html" id="tokens-spacing" data-canon data-generated data-js="tokens-spacing-css">
{{ site.data.tokens.packs.spacing.html }}
</script>
<script type="text/html" id="tokens-spacing-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.spacing.css }}
</script>
<script type="text/html" id="tokens-radius" data-canon data-generated data-js="tokens-radius-css">
{{ site.data.tokens.packs.radius.html }}
</script>
<script type="text/html" id="tokens-radius-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.radius.css }}
</script>
<script type="text/html" id="tokens-fluid" data-canon data-generated data-js="tokens-fluid-css">
{{ site.data.tokens.packs.fluid.html }}
</script>
<script type="text/html" id="tokens-fluid-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.fluid.css }}
</script>
<script type="text/html" id="tokens-typography" data-canon data-generated data-js="tokens-typography-css">
{{ site.data.tokens.packs.typography.html }}
</script>
<script type="text/html" id="tokens-typography-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.typography.css }}
</script>
<script type="text/html" id="tokens-font" data-canon data-generated data-js="tokens-font-css">
{{ site.data.tokens.packs.font.html }}
</script>
<script type="text/html" id="tokens-font-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.font.css }}
</script>
<script type="text/html" id="tokens-shadow" data-canon data-generated data-js="tokens-shadow-css">
{{ site.data.tokens.packs.shadow.html }}
</script>
<script type="text/html" id="tokens-shadow-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.shadow.css }}
</script>
<script type="text/html" id="tokens-shell" data-canon data-generated data-preview="none" data-js="tokens-shell-css">
{{ site.data.tokens.packs.shell.html }}
</script>
<script type="text/html" id="tokens-shell-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.shell.css }}
</script>
<script type="text/html" id="tokens-background" data-canon data-generated data-preview="none" data-js="tokens-background-css">
{{ site.data.tokens.packs.background.html }}
</script>
<script type="text/html" id="tokens-background-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.background.css }}
</script>
<script type="text/html" id="tokens-text" data-canon data-generated data-preview="none" data-js="tokens-text-css">
{{ site.data.tokens.packs.text.html }}
</script>
<script type="text/html" id="tokens-text-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.text.css }}
</script>
<script type="text/html" id="tokens-border" data-canon data-generated data-preview="none" data-js="tokens-border-css">
{{ site.data.tokens.packs.border.html }}
</script>
<script type="text/html" id="tokens-border-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.border.css }}
</script>
<script type="text/html" id="tokens-icon" data-canon data-generated data-preview="none" data-js="tokens-icon-css">
{{ site.data.tokens.packs.icon.html }}
</script>
<script type="text/html" id="tokens-icon-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.icon.css }}
</script>
<script type="text/html" id="tokens-controls" data-canon data-generated data-preview="none" data-js="tokens-controls-css">
{{ site.data.tokens.packs.controls.html }}
</script>
<script type="text/html" id="tokens-controls-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.controls.css }}
</script>
<script type="text/html" id="tokens-component" data-canon data-generated data-preview="none" data-js="tokens-component-css">
{{ site.data.tokens.packs.component.html }}
</script>
<script type="text/html" id="tokens-component-css" data-canon data-generated data-lang="css">
{{ site.data.tokens.packs.component.css }}
</script>

</div>
  </div>
</section>

<section id="tokens-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Pack | Brand colors (default) (hint: Palette tokens) | — | — | The four brand ramps, which a theme replaces. Read them through a semantic token when one has the meaning |
| Pack | Fixed colors (hint: Palette tokens) | canon `#tokens-fixed` | — | Black, white, the white and black alphas, and the status ramps. A theme does not change them |
| Pack | Spacing (hint: Primitive tokens) | canon `#tokens-spacing` | — | Gaps, padding and margins, on a 4px grid |
| Pack | Radius (hint: Primitive tokens) | canon `#tokens-radius` | — | Corner radius |
| Pack | Typography (hint: Primitive tokens) | canon `#tokens-typography` | — | The fixed sizes: font size (`-FS`) and line height (`-LH`). Use each FS with its LH |
| Pack | Fluid typography (hint: Primitive tokens) | canon `#tokens-fluid` | — | The sizes that grow with the screen width, between a minimum and a maximum. The display sizes add the space below (`-MB`) |
| Pack | Font (hint: Primitive tokens) | canon `#tokens-font` | — | The font family and the four font weights |
| Pack | Shadow (hint: Semantic tokens) | canon `#tokens-shadow` | — | Shadows from `xs` to `3xl`, a top shadow and an inset shadow |
| Pack | Layout & shell (hint: Primitive tokens) | canon `#tokens-shell` | — | The page shell sizes, the content width and the transition |
| Pack | Background (hint: Semantic tokens) | canon `#tokens-background` | — | Surface colors by meaning: page, card, menu, overlay, brand and status fills |
| Pack | Text (hint: Semantic tokens) | canon `#tokens-text` | — | Text colors by meaning: body, display, brand, status, on a colored fill, disabled |
| Pack | Border & focus (hint: Semantic tokens) | canon `#tokens-border` | — | Border colors by meaning, the divider and the focus ring |
| Pack | Icon (hint: Semantic tokens) | canon `#tokens-icon` | — | Icon colors by meaning, with their light fills and rings |
| Pack | Controls (hint: Semantic tokens) | canon `#tokens-controls` | — | The fills that checkbox, radio, switch and slider share |
| Pack | Component (hint: Component tokens) | canon `#tokens-component` | — | Each component's own tokens, under its name. Set them to restyle that component alone. Each component's page lists its own |
{: #tokens-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tokens-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Knobs
{: .nds-block-title}

A knob styles one element, such as `--btn-size`. It is undefined by default, and the component falls back to its own value. Set it in the element's `style` or on a class. A knob set on a wrapper reaches every component inside.

### Resolution Chain
{: .nds-block-title}

A painted value goes down a chain from a knob to the palette. Change any token in the chain, and everything above it follows.

<script type="text/html" id="tokens-chain" data-canon data-lang="css" data-preview="none">
/* The primary button fill: knob, component token, palette */
--btn-bg: var(--button-background-primary-default);             /* knob, set by .nds-primary */
--button-background-primary-default: var(--colors-primary-600); /* component token */
--colors-primary-600: #1b8354;                                  /* palette */

/* The checked checkbox fill: component token, semantic token, palette */
--checkbox-primary-checked: var(--controls-primary-checked);    /* component token */
--controls-primary-checked: var(--colors-primary-600);          /* semantic token */
</script>

### Dark Mode
{: .nds-block-title}

`data-theme="dark"` on `<html>` switches the semantic and component tokens to their dark values. On any other element, it makes that element a dark area: both tiers are declared again on it, with dark values. Some components also have dark rules of their own. Switching and saving the mode is on the [Themes](../components/themes) page.

### Override Scope
{: .nds-block-title}

A token that reads another token takes its value where it is declared. The semantic and component tokens are declared at `:root`, so they read the palette there. A palette token set on a wrapper does not change them. On a wrapper, set the token that the component reads.

To change a token on every page, set it in your own stylesheet, loaded after `nds-main.min.css`. Repeat both NDS selectors: a dark area declares every token again with the NDS values, so a plain `:root` rule does not reach it. Give the override a dark value too, or dark mode shows the NDS one. A pack's code has both rules: copy it and keep only the lines you change.

<script type="text/html" id="tokens-override" data-canon data-lang="css" data-preview="none">
/* Light mode. Dark areas match too, which keeps your value there for a token with no dark value */
:root,
[data-theme~="dark"]:not(:root) {
  --background-card: #fffdf5;
}

/* Dark mode and dark areas. This rule comes last, so a dark area takes its value */
:root[data-theme~="dark"],
[data-theme~="dark"]:not(:root) {
  --background-card: #26221a;
}
</script>

</div>
  </div>
</section>

<section id="tokens-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Fluid Typography</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-css">--typo-display-clamp-*</code> and <code class="nds-inline-code lang-css">--typo-text-clamp-*</code> sizes grow with the screen width, between a minimum and a maximum.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Font Sizing</span>
          </span>
          <p class="nds-item-desc">Every font size and line height multiplies by <code class="nds-inline-code lang-css">--user-font-scale</code>, which the <a href="../components/accessibility">Accessibility</a> panel sets.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-field"></i>
            <span class="nds-label">Phone Padding</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-css">--nds-viewport-padding</code> is 32px, and half of that below 600px.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-bold"></i>
            <span class="nds-label">Weights per Theme</span>
          </span>
          <p class="nds-item-desc">The themes with a font of their own, Cairo or Readex Pro, set the <code class="nds-inline-code lang-css">--font-weight-*</code> tokens one step lower: 300 to 600.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tokens-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use an NDS component before you style an element of your own. Tokens are for the CSS you write.
- Write `var(--token)` for every color, size and shadow. Never write a hex value or a pixel size that a token names.
- In your own CSS, pick a semantic token by its meaning. Do not read a component token because its value matches today: it can change with that component.
- Use a palette token only when no semantic token has the meaning. Take every state of a family from the same tier.
- Pair each font size with its line height: `--typo-text-md-FS` with `--typo-text-md-LH`.
- To restyle one component in one place, set its component tokens on a wrapper. Set every state of the family, or the hover color stays the old one.
- Set palette tokens at `:root` only. On a wrapper, they do not reach the tokens that read them.
- To change the brand colors, use a theme from the [Themes](../components/themes) page: seed colors, or a stylesheet that sets every step of a ramp. Do not change one step of a ramp alone.

</div>
  </div>
</section>

<section id="tokens-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Name Patterns
{: .nds-block-title}

A semantic or component name says what the value is for. It never names a color or a shade number.

| Tier | Pattern | Example |
|---|---|---|
| Semantic | `--{property}-{role}-{modifier}-{state}` | `--text-oncolor-primary`, `--background-error-light` |
| Component | `--{component}-{property}-{variant}-{state}` | `--button-background-primary-hovered` |
{: .nds-table .nds-responsive}

### Name Parts
{: .nds-block-title}

| Part | Meaning |
|---|---|
| `primary`, `secondary`, `tertiary`, `neutral` | The brand and neutral roles |
| `success`, `info`, `warning`, `error` | The status roles. Each has background, text, border and icon tokens |
| `light` | A tint of the base meaning, for soft surfaces and borders |
| `faint` | The lightest tint, one step below `light` |
| `strong` | A deep, stronger form of the base meaning |
| `oncolor` | For an element on a colored or dark fill. It does not change in dark mode. It comes last, before the state |
| `default`, `hovered`, `pressed`, `selected`, `focused`, `disabled`, `checked` | The state. A name with no state is the resting state. `pressed` is the `:active` state |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tokens-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Themes](../components/themes): brand colors from seed colors, dark mode and dark areas.
- [Accessibility](../components/accessibility): the Font Sizing setting behind `--user-font-scale`.
- [Button](../components/button): every button knob, in its API.

</div>
  </div>
</section>
