---
layout: page
title: Image Popup Viewer
hero_title: Image Popup Viewer - National Design System
hero_description: A full-screen image viewer for inspecting photos and illustrations with zoom, pan, and gallery navigation
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Gallery -->
<section id="ipvGallery" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Image Gallery</h2>
            <p class="nds-section-description">Click any thumbnail to open the full-screen viewer with zoom and navigation controls</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["showZoom", ".nds-ipv-image-card", "ipvZoom"]'>
                                <span class="nds-label">Zoom badge</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-ipv-gallery nds-grid" style="--max-col:4;--mid-col:2;--min-col:1;">
                                <div class="nds-ipv-image-item">
                                    <div class="nds-ipv-image-card showZoom">
                                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
                                            data-ipv-full="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000"
                                            alt="Mountain Landscape" class="nds-ipv-thumbnail">
                                    </div>
                                    <div class="nds-ipv-image-title">Mountain Landscape</div>
                                </div>

                                <div class="nds-ipv-image-item">
                                    <div class="nds-ipv-image-card showZoom">
                                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
                                            data-ipv-full="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000"
                                            alt="Forest Road" class="nds-ipv-thumbnail">
                                    </div>
                                    <div class="nds-ipv-image-title">Forest Road</div>
                                </div>

                                <div class="nds-ipv-image-item">
                                    <div class="nds-ipv-image-card showZoom">
                                        <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400"
                                            data-ipv-full="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2000"
                                            alt="Ocean View" class="nds-ipv-thumbnail">
                                    </div>
                                    <div class="nds-ipv-image-title">Ocean View</div>
                                </div>

                                <div class="nds-ipv-image-item">
                                    <div class="nds-ipv-image-card showZoom">
                                        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400"
                                            data-ipv-full="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2000"
                                            alt="Valley Sunrise" class="nds-ipv-thumbnail">
                                    </div>
                                    <div class="nds-ipv-image-title">Valley Sunrise</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-ipv-gallery-1" id="tab-ipv-gallery-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-ipv-gallery-1"
                                    aria-labelledby="tab-ipv-gallery-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-ipv-gallery nds-grid" style="--max-col:4;--mid-col:2;--min-col:1;"&gt;
    &lt;div class="nds-ipv-image-item"&gt;
        &lt;div class="nds-ipv-image-card showZoom"&gt;
            &lt;img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
                data-ipv-full="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000"
                alt="Mountain Landscape" class="nds-ipv-thumbnail"&gt;
        &lt;/div&gt;
        &lt;div class="nds-ipv-image-title"&gt;Mountain Landscape&lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="nds-ipv-image-item"&gt;
        &lt;div class="nds-ipv-image-card showZoom"&gt;
            &lt;img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
                data-ipv-full="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000"
                alt="Forest Road" class="nds-ipv-thumbnail"&gt;
        &lt;/div&gt;
        &lt;div class="nds-ipv-image-title"&gt;Forest Road&lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="nds-ipv-image-item"&gt;
        &lt;div class="nds-ipv-image-card showZoom"&gt;
            &lt;img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400"
                data-ipv-full="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2000"
                alt="Ocean View" class="nds-ipv-thumbnail"&gt;
        &lt;/div&gt;
        &lt;div class="nds-ipv-image-title"&gt;Ocean View&lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="nds-ipv-image-item"&gt;
        &lt;div class="nds-ipv-image-card showZoom"&gt;
            &lt;img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400"
                data-ipv-full="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2000"
                alt="Valley Sunrise" class="nds-ipv-thumbnail"&gt;
        &lt;/div&gt;
        &lt;div class="nds-ipv-image-title"&gt;Valley Sunrise&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="ipvFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
            <p class="nds-section-description">What you get out of the box with zero configuration</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Any image with the <code class="nds-inline-code lang-html">nds-ipv-thumbnail</code> class becomes clickable and opens in the full-screen viewer. No extra markup or JS calls needed. For dynamically added images, call <code class="nds-inline-code lang-js">NDS.Ipv.init()</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-zoom"></i>
                        <span class="nds-label">Multi-input Zoom</span>
                    </span>
                    <p class="nds-item-desc">Zoom into images using mouse wheel (centered on cursor position), keyboard shortcuts (+/-), pinch-to-zoom on touch devices, or the on-screen zoom buttons. Supports 0.1x to 10x magnification.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-move"></i>
                        <span class="nds-label">Drag to Pan</span>
                    </span>
                    <p class="nds-item-desc">Click and drag on desktop or swipe on touch devices to pan around zoomed images. Double-click or double-tap resets the view to the original position and zoom level.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-left-right"></i>
                        <span class="nds-label">Gallery Navigation</span>
                    </span>
                    <p class="nds-item-desc">Every thumbnail on the page joins one navigable gallery. Arrow buttons and the left/right keys move between images, and a counter shows the current position. Controls hide automatically when a page has only one image.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Controls</span>
                    </span>
                    <p class="nds-item-desc">Thumbnails are reachable with Tab and open with Enter or Space. Inside the viewer, Escape closes, +/- adjusts zoom, 0 resets the view, H toggles the controls, and arrow keys move between images.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-touch-interaction-01"></i>
                        <span class="nds-label">Touch Gestures</span>
                    </span>
                    <p class="nds-item-desc">Pinch-to-zoom with two fingers centers on the gesture midpoint. Single-finger drag pans the image. All gestures work alongside on-screen controls on mobile.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-eye"></i>
                        <span class="nds-label">Distraction-free Mode</span>
                    </span>
                    <p class="nds-item-desc">Press H or tap the toggle button to hide all controls, navigation, and overlays for a clean viewing experience. Toggle again to restore the full UI.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-02"></i>
                        <span class="nds-label">Adaptive Image Loading</span>
                    </span>
                    <p class="nds-item-desc">Thumbnails load at a small size for fast page rendering, then the full-resolution image loads on demand when opened. A loading spinner displays while the full image is fetched.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-focus-point"></i>
                        <span class="nds-label">Accessible Dialog</span>
                    </span>
                    <p class="nds-item-desc">The viewer opens as a focus-trapped dialog: keyboard focus stays within it while open, and returns to the thumbnail you opened it from when it closes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translate"></i>
                        <span class="nds-label">Localized Controls</span>
                    </span>
                    <p class="nds-item-desc">Control labels and on-screen instructions follow the page language automatically, with Arabic and English provided out of the box.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="ipvGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">When and how to use the image popup viewer effectively</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the image popup viewer for any content where users need to inspect image details: product photos, maps, infographics, architectural plans, or document scans. The zoom and pan controls let users explore at their own pace.</li>
                    <li>Every <code class="nds-inline-code lang-html">nds-ipv-thumbnail</code> on a page joins one shared gallery: opening any image lets users move through the rest with the arrow keys or on-screen buttons. Keep related images on the same page so navigation feels coherent.</li>
                    <li>Navigation controls appear only when a page has more than one thumbnail. For a single standalone image, the viewer opens with zoom and pan but no prev/next controls.</li>
                    <li>Do not use the image popup viewer for decorative or background images that don't benefit from close inspection. Only apply it to images where zoom and detail matter to the user.</li>
                    <li>Do not use this component for modal dialogs with mixed content. Use <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a> instead when you need text, forms, or actions alongside an image.</li>
                    <li>Always provide a <code class="nds-inline-code lang-html">data-ipv-full</code> attribute pointing to a high-resolution version of the image. Without it, the viewer falls back to the thumbnail src, which may look blurry when zoomed.</li>
                    <li>Keep thumbnail images small (400px wide) for fast page load. The full-resolution image loads on demand only when the user opens the viewer.</li>
                    <li>Write descriptive <code class="nds-inline-code lang-html">alt</code> text on every thumbnail. The viewer reuses it for the full-size image, and it doubles as the accessible name when users reach the thumbnail by keyboard.</li>
                    <li>Thumbnails are keyboard-operable out of the box: Tab focuses them, Enter or Space opens the viewer, and focus returns to the thumbnail on close. Avoid adding custom click-only handlers that bypass this.</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-ipv-image-title</code> below thumbnails in galleries to give users context before they open the viewer.</li>
                </ul>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-ipv-thumbnail</code></td><td>Required on the <code class="nds-inline-code lang-html">&lt;img&gt;</code> that opens the viewer.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ipv-gallery</code></td><td>Optional grid wrapper for image items. Combine with <code class="nds-inline-code lang-html">nds-grid</code> and the <code class="nds-inline-code lang-html">--max-col</code> / <code class="nds-inline-code lang-html">--mid-col</code> / <code class="nds-inline-code lang-html">--min-col</code> variables to set columns.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ipv-image-item</code></td><td>Optional grid cell grouping an image card with its caption below.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ipv-image-card</code></td><td>Optional frame around the thumbnail; hosts the <code class="nds-inline-code lang-html">showZoom</code> badge.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ipv-image-title</code></td><td>Optional caption placed below the image card.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">showZoom</code></td><td>Add to <code class="nds-inline-code lang-html">nds-ipv-image-card</code> to display a zoom-affordance badge in the corner of the thumbnail.</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-ipv-full</code></td><td>Set on the thumbnail <code class="nds-inline-code lang-html">&lt;img&gt;</code> to specify the full-resolution image URL loaded when the viewer opens.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-src</code></td><td>Fallback full-size source used when <code class="nds-inline-code lang-html">data-ipv-full</code> is absent (supports lazy-loading setups). The thumbnail's own <code class="nds-inline-code lang-html">src</code> is the final fallback.</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Ipv</strong> API controls initialization and programmatic access. The viewer auto-initializes on page load. For dynamically added thumbnails, call <code class="nds-inline-code lang-js">NDS.Ipv.init()</code> to re-scan the page.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript code">
// ── Initialization ──────────────────────────────────
// All thumbnails auto-initialize on page load
NDS.Ipv.init();

// Create and get the viewer instance
var viewer = NDS.Ipv.create();

// Access the existing instance directly
var viewer = window.ndsIPV;

// ── Instance Methods ────────────────────────────────
// Open the viewer for a specific thumbnail element
viewer.open(thumbnailElement);

// Close the viewer
viewer.close();

// Navigate between images in a gallery
viewer.showPrev();
viewer.showNext();

// Reset zoom and pan to defaults
viewer.resetTransform();

// Toggle UI controls visibility (distraction-free mode)
viewer.toggleUI();

// ── Keyboard Shortcuts ──────────────────────────────
// Tab          Move focus to a thumbnail, then Enter or Space opens it
// Escape       Close the viewer (focus returns to the thumbnail)
// + or =       Zoom in (1.5x per press)
// -            Zoom out (1.5x per press)
// 0            Reset zoom and position
// H            Toggle UI visibility
// ArrowLeft    Previous image in gallery
// ArrowRight   Next image in gallery
// Tab is trapped within the viewer while it is open
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
