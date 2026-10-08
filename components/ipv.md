---
layout: page
title: Image Popup Viewer
hero_title: Image Popup Viewer - National Design System
hero_description: The image popup viewer opens a thumbnail full screen, with zoom, pan and gallery navigation
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "09/10/2026 - 12:45 AM"
---

<section id="ipvOverview" class="nds-content-section nds-doc-overview">
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

<section id="ipvMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="ipv-gallery" data-canon data-variants="ipvVariantsTable" data-demo-width="100%">
<div class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
  <div>
    <div class="nds-ipv-image-card">
      <img src="../docs-assets/img/home_hero_bg_sm.webp" data-ipv-full="../docs-assets/img/home_hero_bg.webp" alt="Mud-brick palace reflected in rainwater" class="nds-ipv-thumbnail">
    </div>
    <div class="nds-ipv-image-title">Heritage Palace</div>
  </div>
  <div>
    <div class="nds-ipv-image-card">
      <img src="../assets/img/riyadhcenter.webp" data-ipv-full="../assets/img/riyadhcenter.webp" alt="Riyadh skyline at night" class="nds-ipv-thumbnail">
    </div>
    <div class="nds-ipv-image-title">Riyadh at Night</div>
  </div>
  <div>
    <div class="nds-ipv-image-card">
      <img src="../docs-assets/events/foundation_day/Hero_thumb.webp" data-ipv-full="../docs-assets/events/foundation_day/Hero_bg.webp" alt="A man in traditional dress among old stone walls" class="nds-ipv-thumbnail">
    </div>
    <div class="nds-ipv-image-title">Foundation Day</div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="ipvVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The zoom badge goes on every `.nds-ipv-image-card` in the markup.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Zoom badge | Zoom badge | `.nds-zoom-badge` | `.nds-ipv-image-card` | A magnifier in the corner of the image. Add it when nothing else shows that the image opens |
{: #ipvVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="ipvFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The viewer starts on any page that has an <code class="nds-inline-code lang-html">nds-ipv-thumbnail</code>. A thumbnail added later opens on a click with no call, and <code class="nds-inline-code lang-js">NDS.Ipv.reinit()</code> lets Tab reach it. The viewer itself is built on the first open, so a page where nobody opens an image carries none of it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-zoom-in-area"></i>
            <span class="nds-label">Multi-input Zoom</span>
          </span>
          <p class="nds-item-desc">The mouse wheel zooms toward the pointer, and a pinch zooms toward the middle of the two fingers. The zoom buttons zoom by 1.5×. Zoom runs from 10% to 1000%, and a label shows the current value.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-move"></i>
            <span class="nds-label">Drag to Pan</span>
          </span>
          <p class="nds-item-desc">Drag the image with the mouse or one finger to move it. A double-click or the reset button returns it to 100% in the center.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-left-right"></i>
            <span class="nds-label">Gallery Navigation</span>
          </span>
          <p class="nds-item-desc">The arrow buttons show the image of the previous or next thumbnail on the page, and a counter shows the position. With one thumbnail on the page, the arrows and the counter are hidden.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Controls</span>
          </span>
          <p class="nds-item-desc">The script adds <code class="nds-inline-code lang-html">tabindex="0"</code> and <code class="nds-inline-code lang-html">role="button"</code> to each thumbnail that has none. Tab reaches a thumbnail, and Enter or Space opens it. The viewer's keys are in the Keyboard table of the API.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eye"></i>
            <span class="nds-label">Distraction-free Mode</span>
          </span>
          <p class="nds-item-desc">The eye button hides the other buttons, the arrows, the counter, the zoom label and the control list. The eye button stays, to bring them back.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-image-02"></i>
            <span class="nds-label">Adaptive Image Loading</span>
          </span>
          <p class="nds-item-desc">The page loads the small thumbnail. The viewer loads the full image from <code class="nds-inline-code lang-html">data-ipv-full</code> only when it opens, and shows a spinner until the image arrives.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-focus-point"></i>
            <span class="nds-label">Accessible Dialog</span>
          </span>
          <p class="nds-item-desc">The viewer is a modal dialog. Focus moves to its close button and stays inside the viewer. On close, focus returns to the thumbnail that opened it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Localized Controls</span>
          </span>
          <p class="nds-item-desc">The button labels and the control list follow the page language. Arabic and English ship in the <code class="nds-inline-code">ipv</code> section of <code class="nds-inline-code">assets/i18n/{lang}.json</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Phone Layout</span>
          </span>
          <p class="nds-item-desc">On phones the buttons sit closer to the edge, and the control list is hidden.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="ipvPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the viewer for images people inspect: photos, maps, plans and scans. Do not use it for decorative images.
- Put `data-ipv-full` on every thumbnail, with the URL of a large image. Without it, the viewer shows the thumbnail, which blurs when zoomed.
- Keep thumbnails small, about 400px wide.
- Write `alt` on every thumbnail. The viewer copies it to the full image, and it names the thumbnail for screen readers.
- In a gallery, put a `nds-ipv-image-title` under each image, so people know what it shows before they open it.
- Every thumbnail on the page is in one gallery, in page order. Leave `nds-ipv-thumbnail` off an image that does not belong in it.
- Do not add your own click handler to a thumbnail. The viewer already opens on a click, Enter and Space.
- Do not open a modal while the viewer is open. The modal opens on top of the viewer.

</div>
  </div>
</section>

<section id="ipvApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-ipv-thumbnail` | `<img>` | Opens the viewer on a click. A block image 200px tall that fills its width and crops to fit. Required |
| `nds-ipv-image-card` | the thumbnail's parent | Holds the zoom badge. Optional: a thumbnail without it looks and works the same |
| `nds-zoom-badge` | `.nds-ipv-image-card` | Shows a magnifier in the bottom start corner |
| `nds-ipv-image-title` | an element after the card | A caption under the image. Optional |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-ipv-full` | `img.nds-ipv-thumbnail` | The URL of the image the viewer loads |
| `data-src` | `img.nds-ipv-thumbnail` | The viewer loads this URL when the image has no `data-ipv-full`. With neither, it loads the image's `src` |
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

One viewer serves the whole page. The viewer fires no events.

| Method | Effect |
|---|---|
| `NDS.Ipv.init()` | Starts the viewer. The loader calls it when the page has a thumbnail |
| `NDS.Ipv.reinit()` | Gives thumbnails added since the last call `tabindex` and `role`. Call it after you add thumbnails |
| `NDS.Ipv.create()` | Starts the viewer and returns it. `window.ndsIPV` holds the same viewer |
| `viewer.open(img)` | Opens the viewer on that thumbnail |
| `viewer.close()` | Closes the viewer and returns focus to the thumbnail |
| `viewer.showPrev()`, `viewer.showNext()` | Moves to the previous or the next thumbnail |
| `viewer.resetTransform()` | Resets the zoom and the position |
| `viewer.toggleUI()` | Does what the eye button does |
| `viewer.destroy()` | Removes the viewer and every listener it added. `NDS.Ipv.init()` starts a new one |
{: .nds-table .nds-responsive}

The full API is in the banner of `_js/nds-ipv.js`.

<script type="text/html" id="ipv-js" data-canon data-lang="js">
var viewer = NDS.Ipv.create();
viewer.open(document.querySelector('.nds-ipv-thumbnail'));

// After you add thumbnails to the page
NDS.Ipv.reinit();
</script>

</div>
  </div>
</section>
