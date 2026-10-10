---
layout: page
title: Icons
hero_title: Icons - National Design System
hero_description: "HugeIcons Stroke Rounded in two forms: a font with the whole set for page content, and a small set inside the NDS CSS that components show without waiting for the font."
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="icons-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Icons in NDS are HugeIcons Stroke Rounded drawings, plus a few marks drawn for NDS. They come in two forms:

- **Font icons** (`hgi hgi-stroke hgi-{name}`) hold the whole set: {{ site.data.hgi.icons }} icons in one font file, build {{ site.data.hgi.build }}. They are for page content. Find a name on [hugeicons.com](https://hugeicons.com/icons/stroke-rounded).
- **UI icons** (`nds-icon nds-hgi-{name}`) are {{ site.data.content.icons.hgi | size }} of those drawings, copied into the NDS CSS as SVG. Components and page chrome use them. The UI set also holds the custom marks (`nds-icon nds-icon-{name}`), drawn for NDS because HugeIcons does not have them.

NDS keeps its own SVG copies for three reasons:

1. They load faster. They show as soon as the CSS loads, while the font loads after the page shows. A close button or a menu arrow never waits for the font.
2. They stay the same when the font updates.
3. NDS can change a drawing or improve how it looks, such as an arrow that flips with the reading direction.

Pick another component when:

- the icon sits in a tinted circle or square: [Featured Icons](../components/featured-icons)
- the icon shows a status, such as success or error: [Feedback Icons](../components/feedback-icons)

</div>
  </div>
</section>

<section id="icons-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

An icon is one `<i>` element. Where it goes in a component, such as before a label or inside a field, is on that component's page.

<script type="text/html" id="icons-content" data-canon data-variants="icons-variants-table" data-demo-size="24px">
<i class="hgi hgi-stroke hgi-search-01" aria-hidden="true"></i>
</script>
<script type="text/html" id="icons-ui" data-canon>
<i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
</script>

<div class="nds-block">
<h3 class="nds-block-title" id="icons-catalog">UI Icon Catalog</h3>
<p>The {{ site.data.content.icons.hgi | size }} UI icons from HugeIcons. Click a tile to copy its classes. The list is <code class="nds-inline-code lang-js">_data/content/icons.yml</code>.</p>
<div class="nds-grid nds-doc-icons">
{%- for name in site.data.content.icons.hgi %}
<button type="button" class="nds-btn nds-subtle nds-copy" data-copy="nds-icon {{ name }}" data-copy-announce="{{ name }} class copied">
  <i class="nds-icon {{ name }}" aria-hidden="true"></i>
  <span class="nds-label">{{ name }}</span>
</button>
{%- endfor %}
</div>
</div>

<div class="nds-block">
<h3 class="nds-block-title">Custom Marks</h3>
<p>The {{ site.data.content.icons.custom | size }} marks drawn for NDS: the store logos, the riyal symbol, and marks that components paint, such as the avatar placeholder and the checkbox tick. A mark is not the HugeIcons glyph of the same name: <code class="nds-inline-code lang-html">nds-icon-riyal</code> and <code class="nds-inline-code lang-html">hgi-riyal</code> differ.</p>
<div class="nds-grid nds-doc-icons">
{%- for name in site.data.content.icons.custom %}
<button type="button" class="nds-btn nds-subtle nds-copy" data-copy="nds-icon {{ name }}" data-copy-announce="{{ name }} class copied">
  <i class="nds-icon {{ name }}" aria-hidden="true"></i>
  <span class="nds-label">{{ name }}</span>
</button>
{%- endfor %}
</div>
</div>

</div>
  </div>
</section>

<section id="icons-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Change the glyph name to the one you need: a font name from hugeicons.com, or a UI name from the catalog. Size and color go in the icon's `style`, or on a parent: the icon takes both from its text.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Font icon (default) | — | — | An icon from the font, for page content: cards, lists, feature grids and text |
| Structure | UI icon | canon `#icons-ui` | — | An icon from the catalog, for controls and page chrome |
| Glyph | Search (default) | `.nds-hgi-search-01` | `.nds-icon` | A sample glyph. Write the name you need |
| Glyph | Next (hint: Points forward: left in Arabic, right in English) | `.nds-hgi-arrow-next-01` | `.nds-icon` | Points forward: left on an Arabic page, right on an English one |
| Glyph | Back (hint: Points back: right in Arabic, left in English) | `.nds-hgi-arrow-prev-01` | `.nds-icon` | Points back: right on an Arabic page, left on an English one |
| Size | None (default) | — | — | The size of the text around it |
| Size | 32px | `font-size: 32px;` | `i` | A larger icon. Set it on a parent to size the icon and its text together |
| Size | 48px | `font-size: 48px;` | `i` | A large icon on its own, such as in an empty state |
| Color | None (default) | — | — | The color of the text around it |
| Color | Primary | `color: var(--icon-primary);` | `i` | The brand primary color |
| Color | Success | `color: var(--icon-success);` | `i` | A success mark |
| Color | Info | `color: var(--icon-info);` | `i` | An information mark |
| Color | Warning | `color: var(--icon-warning);` | `i` | A warning mark |
| Color | Error | `color: var(--icon-error);` | `i` | An error mark |
{: #icons-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="icons-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Logical Arrows
{: .nds-block-title}

The next and back arrows follow the reading direction. `nds-hgi-arrow-next-01` points left on an Arabic page and right on an English one, and `nds-hgi-arrow-prev-01` points the other way. The `-01` arrows are chevrons, and the `-02` arrows have a shaft. The left, right, up and down arrows always point where their name says.

### Glyph Swap
{: .nds-block-title}

An `nds-icon` draws the glyph set in `--nds-icon`, and each UI icon has a token, `--nds-icon-{name}`. Set `--nds-icon` to a token in your CSS to change the glyph, with no change to the markup. Set it on the icon itself: the icon's own class sets it there, so a value on a parent does not reach it.

<script type="text/html" id="icons-swap" data-canon data-lang="css" data-preview="none">
/* Show the "hide" eye while the toggle is pressed */
.my-toggle[aria-pressed="true"] .nds-icon { --nds-icon: var(--nds-icon-view-off); }
</script>

</div>
  </div>
</section>

<section id="icons-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hard-drive"></i>
            <span class="nds-label">Self-Hosted</span>
          </span>
          <p class="nds-item-desc">The font and the icon CSS ship with NDS and load from your own domain. No request goes to a third party.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-rocket-01"></i>
            <span class="nds-label">Off the Critical Path</span>
          </span>
          <p class="nds-item-desc">The page never waits on an icon to show. The font loads after the page shows, and the UI icon CSS loads right after the main CSS.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eye"></i>
            <span class="nds-label">Flash-Free Rendering</span>
          </span>
          <p class="nds-item-desc">Icons stay hidden until they can paint, so a fallback box never shows. While the font loads, a font icon holds an empty box at its final size, so the layout does not move.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Color and Size Inheritance</span>
          </span>
          <p class="nds-item-desc">An icon is a square one em wide, in the current text color. It matches the text around it with no extra class.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="icons-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the font for icons in content: cards, lists, feature grids and text.
- Use a UI icon in controls and page chrome. Check its name in the catalog first: no other UI names exist. Use the font for any other glyph.
- A font icon works in a button, but a button's success or error status swaps only a UI icon. Use a UI icon in a button that shows a status.
- Write a UI icon as an `<i>` element. Its CSS matches only `i.nds-icon`, so a `<span>` shows nothing.
- Copy a name exactly, with its number: `hgi-arrow-left-01`, not `hgi-arrow-left`. A name that does not exist shows nothing.
- Use the next and back arrows for forward and back. Use the left and right arrows only for a fixed direction, such as a map.
- Size an icon with `font-size`, not `width` and `height`. Let its color come from the text around it.
- Add `aria-hidden="true"` to an icon beside a label. An icon-only control still needs a name for screen readers: its component page shows how.
- Take new font icons from the free Stroke Rounded style only. The other HugeIcons styles need a HugeIcons Pro license.

</div>
  </div>
</section>

<section id="icons-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `hgi-stroke` | `<i>` | Sets the HugeIcons font. Write it with `hgi` before it, as every NDS page does |
| `hgi-{name}` | `i.hgi-stroke` | The glyph: any name in the Stroke Rounded set |
| `nds-icon` | `<i>` | A box one em square that paints the glyph as a mask in the text color |
| `nds-hgi-{name}` | `i.nds-icon` | A UI glyph from HugeIcons. Only the names in the catalog above exist |
| `nds-icon-{name}` | `i.nds-icon` | A mark drawn for NDS, such as `nds-icon-riyal` or `nds-icon-apple`. Two have other names: `nds-pilcrow-left` and `nds-pilcrow-right` |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--nds-icon` | set by the `nds-hgi-` or `nds-icon-` class | The mask an `nds-icon` paints. Set it to a token to change the glyph. See Glyph Swap above |
| `--nds-icon-{name}` | an SVG data URI | One token per UI icon, such as `--nds-icon-view-off`. Use it as the value of `--nds-icon` |
{: .nds-table .nds-responsive}

### License
{: .nds-block-title}

The MIT License permits commercial use, changes and redistribution. The HugeIcons notice ships in the NDS `LICENSE` file, so it goes wherever the icons go. Your pages need no credit line.

| Asset | Source | License |
|---|---|---|
| Stroke Rounded icon font | HugeIcons free set | MIT, Copyright (c) 2025 Hugeicons |
| UI icons from HugeIcons | HugeIcons free set | MIT, Copyright (c) 2025 Hugeicons |
| Marks drawn for NDS | National Design System | MIT, part of NDS |
| Solid, bulk, duotone, twotone and sharp styles | Not included | A [HugeIcons Pro license](https://hugeicons.com/license-agreement) |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="icons-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Button](../components/button): an icon before, after or above the label, and icon-only buttons.
- [Featured Icons](../components/featured-icons): a font icon in a tinted shape.
- [Feedback Icons](../components/feedback-icons): status marks built from UI icons.

</div>
  </div>
</section>
