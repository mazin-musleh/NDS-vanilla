---
layout: page
title: Image Popup Viewer
hero_title: Image Popup Viewer - National Design System
hero_description: A full-screen image viewer for inspecting photos and illustrations with zoom, pan, and gallery navigation
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Gallery -->
<section id="ipvGallery" class="nds-content-section">
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
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-ipv-gallery nds-grid" style="--max-col:4;--mid-col:2;--min-col:1;">
                                <div class="nds-ipv-image-card">
                                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
                                        data-ipv-full="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000"
                                        alt="Mountain Landscape" class="nds-ipv-thumbnail">
                                    <div class="nds-ipv-image-title">Mountain Landscape</div>
                                </div>

                                <div class="nds-ipv-image-card">
                                    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
                                        data-ipv-full="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000"
                                        alt="Forest Road" class="nds-ipv-thumbnail">
                                    <div class="nds-ipv-image-title">Forest Road</div>
                                </div>

                                <div class="nds-ipv-image-card">
                                    <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400"
                                        data-ipv-full="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2000"
                                        alt="Ocean View" class="nds-ipv-thumbnail">
                                    <div class="nds-ipv-image-title">Ocean View</div>
                                </div>

                                <div class="nds-ipv-image-card">
                                    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400"
                                        data-ipv-full="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2000"
                                        alt="Valley Sunrise" class="nds-ipv-thumbnail">
                                    <div class="nds-ipv-image-title">Valley Sunrise</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-ipv-gallery nds-grid" style="--max-col:4;--mid-col:2;--min-col:1;">
    <div class="nds-ipv-image-card">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
            data-ipv-full="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000"
            alt="Mountain Landscape" class="nds-ipv-thumbnail">
        <div class="nds-ipv-image-title">Mountain Landscape</div>
    </div>

    <div class="nds-ipv-image-card">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
            data-ipv-full="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000"
            alt="Forest Road" class="nds-ipv-thumbnail">
        <div class="nds-ipv-image-title">Forest Road</div>
    </div>

    <div class="nds-ipv-image-card">
        <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400"
            data-ipv-full="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2000"
            alt="Ocean View" class="nds-ipv-thumbnail">
        <div class="nds-ipv-image-title">Ocean View</div>
    </div>

    <div class="nds-ipv-image-card">
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400"
            data-ipv-full="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2000"
            alt="Valley Sunrise" class="nds-ipv-thumbnail">
        <div class="nds-ipv-image-title">Valley Sunrise</div>
    </div>
</div>
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
<section id="ipvFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
            <p class="nds-section-description">What you get out of the box with zero configuration</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
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
                    <p class="nds-item-desc">When multiple thumbnails share a gallery container, arrow buttons and keyboard left/right keys navigate between images. An image counter displays the current position.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Controls</span>
                    </span>
                    <p class="nds-item-desc">Full keyboard support: Escape closes the viewer, +/- adjusts zoom, 0 resets the view, H toggles the control UI, and arrow keys navigate between images.</p>
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
                        <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
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
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="ipvGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">When and how to use the image popup viewer effectively</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the image popup viewer for any content where users need to inspect image details: product photos, maps, infographics, architectural plans, or document scans. The zoom and pan controls let users explore at their own pace.</li>
                    <li>Use the gallery layout (<code class="nds-inline-code lang-html">nds-ipv-gallery</code>) to group related images with shared navigation. Users can browse through all images with arrow keys or on-screen buttons without closing and reopening.</li>
                    <li>Use standalone thumbnails outside a gallery when images are independent of each other. Each <code class="nds-inline-code lang-html">nds-ipv-thumbnail</code> opens its own viewer without gallery navigation.</li>
                    <li>Do not use the image popup viewer for decorative or background images that don't benefit from close inspection. Only apply it to images where zoom and detail matter to the user.</li>
                    <li>Do not use this component for modal dialogs with mixed content. Use <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a> instead when you need text, forms, or actions alongside an image.</li>
                    <li>Always provide a <code class="nds-inline-code lang-html">data-ipv-full</code> attribute pointing to a high-resolution version of the image. Without it, the viewer falls back to the thumbnail src, which may look blurry when zoomed.</li>
                    <li>Keep thumbnail images small (400px wide) for fast page load. The full-resolution image loads on demand only when the user opens the viewer.</li>
                    <li>Write descriptive <code class="nds-inline-code lang-html">alt</code> text on every thumbnail. The viewer inherits this for accessibility.</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-ipv-image-title</code> below thumbnails in galleries to give users context before they open the viewer.</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-ipv-full</code></td><td>Set on the thumbnail <code class="nds-inline-code lang-html">&lt;img&gt;</code> to specify the full-resolution image URL loaded when the viewer opens.</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Ipv</strong> API controls initialization and programmatic access. The viewer auto-initializes on page load. For dynamically added thumbnails, call <code class="nds-inline-code lang-js">NDS.Ipv.init()</code> to re-scan the page.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
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
// Escape       Close the viewer
// + or =       Zoom in (1.5x per press)
// -            Zoom out (1.5x per press)
// 0            Reset zoom and position
// H            Toggle UI visibility
// ArrowLeft    Previous image in gallery
// ArrowRight   Next image in gallery
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
