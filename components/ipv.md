---
layout: page
title: Image Popup Viewer
hero_title: Image Popup Viewer - National Design System
hero_description: The image popup viewer opens a thumbnail full screen, with zoom, pan and gallery navigation
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "25/10/2026 - 08:31 PM"
---

<section id="ipv-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The image popup viewer (IPV) shows the full image of a thumbnail over the page. A click on any image with `nds-ipv-thumbnail` opens the viewer. The page holds only the thumbnails, each with an optional card and caption. The script builds the viewer: the full image, the zoom and close buttons, the arrows, a counter and a control list.

Pick another component when:

- the image needs text, a form or buttons next to it: [Modal](../components/modal)
- the images slide inside the page: [Swiper](../components/swiper)

</div>
  </div>
</section>

<section id="ipv-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="ipv-gallery" data-canon data-variants="ipv-variants-table" data-demo-width="100%">
<div class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
  <div>
    <div class="nds-ipv-image-card nds-image">
      <img src="../docs-assets/img/home_hero_bg_sm.webp" data-ipv-full="../docs-assets/img/home_hero_bg.webp" alt="Mud-brick palace reflected in rainwater" class="nds-ipv-thumbnail">
    </div>
    <div class="nds-ipv-image-title">Heritage Palace</div>
  </div>
  <div>
    <div class="nds-ipv-image-card nds-image">
      <img src="../assets/img/riyadhcenter.webp" data-ipv-full="../assets/img/riyadhcenter.webp" alt="Riyadh skyline at night" class="nds-ipv-thumbnail">
    </div>
    <div class="nds-ipv-image-title">Riyadh at Night</div>
  </div>
  <div>
    <div class="nds-ipv-image-card nds-image">
      <img src="../docs-assets/events/foundation_day/Hero_thumb.webp" data-ipv-full="../docs-assets/events/foundation_day/Hero_bg.webp" alt="A man in traditional dress among old stone walls" class="nds-ipv-thumbnail">
    </div>
    <div class="nds-ipv-image-title">Foundation Day</div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="ipv-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The zoom badge goes on every `.nds-ipv-image-card` in the markup.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Zoom badge | Zoom badge | `.nds-zoom-badge` | `.nds-ipv-image-card` | A magnifier in the corner of the image. Add it when nothing else shows that the image opens |
{: #ipv-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="ipv-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Auto-initialization</span>
              <p class="nds-card-description">The viewer starts on any page that has an <code class="nds-inline-code lang-html">nds-ipv-thumbnail</code>. A thumbnail added later opens on a click with no call, and <code class="nds-inline-code lang-js">NDS.Ipv.reinit()</code> lets Tab reach it. The viewer itself is built on the first open, so a page where nobody opens an image carries none of it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-zoom-in-area" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Multi-input Zoom</span>
              <p class="nds-card-description">The mouse wheel zooms toward the pointer, and a pinch zooms toward the middle of the two fingers. The zoom buttons zoom by 1.5×. Zoom runs from 10% to 1000%, and a label shows the current value.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-move" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Drag to Pan</span>
              <p class="nds-card-description">Drag the image with the mouse or one finger to move it. A double-click or the reset button returns it to 100% in the center.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-arrow-left-right" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Gallery Navigation</span>
              <p class="nds-card-description">The arrow buttons show the image of the previous or next thumbnail on the page, and a counter shows the position. With one thumbnail on the page, the arrows and the counter are hidden.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-keyboard" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Keyboard Controls</span>
              <p class="nds-card-description">The script adds <code class="nds-inline-code lang-html">tabindex="0"</code> and <code class="nds-inline-code lang-html">role="button"</code> to each thumbnail that has none. Tab reaches a thumbnail, and Enter or Space opens it. The viewer's keys are in the Keyboard table of the API.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-eye" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Distraction-free Mode</span>
              <p class="nds-card-description">The eye button hides the other buttons, the arrows, the counter, the zoom label and the control list. The eye button stays, to bring them back.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-image-02" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Adaptive Image Loading</span>
              <p class="nds-card-description">The page loads the small thumbnail. The viewer loads the full image from <code class="nds-inline-code lang-html">data-ipv-full</code> only when it opens, and shows a spinner until the image arrives.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-focus-point" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Accessible Dialog</span>
              <p class="nds-card-description">The viewer is a modal dialog. Focus moves to its close button and stays inside the viewer. On close, focus returns to the thumbnail that opened it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-translate" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Localized Controls</span>
              <p class="nds-card-description">The button labels and the control list follow the page language. The English is in the script, and the Arabic in the <code class="nds-inline-code">ipv</code> section of <code class="nds-inline-code">assets/i18n/ar.json</code>.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Phone Layout</span>
              <p class="nds-card-description">On phones the buttons sit closer to the edge, and the control list is hidden.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="ipv-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the viewer for images people inspect: photos, maps, plans and scans. Do not use it for decorative images.
- Put `data-ipv-full` on every thumbnail, with the URL of a large image. Without it, the viewer shows the thumbnail, which blurs when zoomed.
- Keep thumbnails small, about 400px wide.
- Put `nds-image` on each `.nds-ipv-image-card`, so the tiles share one shape. Leave it off for your own look: `nds-ipv-thumbnail` adds no style.
- Write `alt` on every thumbnail. The viewer copies it to the full image, and it names the thumbnail for screen readers.
- In a gallery, put a `nds-ipv-image-title` under each image, so people know what it shows before they open it.
- For more than one gallery on a page, give each thumbnail a `data-ipv-gallery` name. The arrows page through the thumbnails with the same name, in page order. Thumbnails without a name form one gallery together.
- Do not add your own click handler to a thumbnail. The viewer already opens on a click, Enter and Space.
- Do not open a modal while the viewer is open. The modal opens on top of the viewer.

</div>
  </div>
</section>

<section id="ipv-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-ipv-thumbnail` | `<img>` | Opens the viewer on a click. It does not size the image: your own styles stay as written. Required |
| `nds-ipv-image-card` | the thumbnail's parent | Holds the zoom badge. With `nds-image`, it crops the thumbnail to one shape: see [Image](../components/image). Optional: a thumbnail without it works the same |
| `nds-zoom-badge` | `.nds-ipv-image-card` | Shows a magnifier in the bottom start corner |
| `nds-ipv-image-title` | an element after the card | A caption under the image. Optional |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-ipv-full` | `img.nds-ipv-thumbnail` | The URL of the image the viewer loads |
| `data-src` | `img.nds-ipv-thumbnail` | The viewer loads this URL when the image has no `data-ipv-full`. With neither, it loads the image's `src` |
| `data-ipv-gallery` | `img.nds-ipv-thumbnail` | A gallery name. The arrows and the counter cover only the thumbnails with the same name |
{: .nds-table .nds-responsive}

### Keyboard
{: .nds-block-title}

| Key | Effect |
|---|---|
| Enter, Space | Opens the viewer on the focused thumbnail |
| Escape | Closes the viewer |
| `+` or `=`, `-` | Zooms in or out by 1.5× |
| `0` | Resets the zoom and the position |
| H | Does what the eye button does |
| Left, Right | Moves to the image on that side of the screen |
| Tab | Moves between the viewer's buttons |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

One viewer serves the whole page. The methods below drive it. The viewer fires no events.

| Method | Effect |
|---|---|
| `NDS.Ipv.init()` | Starts the viewer. The loader calls it when the page has a thumbnail |
| `NDS.Ipv.reinit()` | Gives thumbnails added since the last call `tabindex` and `role`. Call it after you add thumbnails |
| `NDS.Ipv.open(img)` | Opens the viewer on that thumbnail |
| `NDS.Ipv.close()` | Closes the viewer and returns focus to the thumbnail |
| `NDS.Ipv.prev()`, `NDS.Ipv.next()` | Moves to the previous or the next thumbnail in its gallery |
| `NDS.Ipv.resetZoom()` | Resets the zoom and the position |
| `NDS.Ipv.toggleControls()` | Does what the eye button does |
| `NDS.Ipv.destroy()` | Removes the viewer and every listener it added. `NDS.Ipv.init()` starts a new one |
{: .nds-table .nds-responsive}

The full API is in the banner of `_js/nds-ipv.js`.

<script type="text/html" id="ipv-js" data-canon data-lang="js">
NDS.Ipv.open(document.querySelector('.nds-ipv-thumbnail'));

// After you add thumbnails to the page
NDS.Ipv.reinit();
</script>

</div>
  </div>
</section>
