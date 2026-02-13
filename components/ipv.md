---
layout: page
title: Image Popup Viewer
hero_title: Image Popup Viewer - National Design System
hero_description: A powerful image viewer component with zoom, pan, and pinch-to-zoom capabilities
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Image Popup Viewer Overview -->
<section id="imagePopupViewerOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Image Popup Viewer</h2>
            <p class="nds-section-description">Interactive image viewer with advanced zoom and pan controls for detailed
                image inspection</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Gallery Example</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-ipv-gallery">
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
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-gallery-1" id="tab-gallery-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-gallery-1"
                            aria-labelledby="tab-gallery-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-ipv-gallery"&gt;
  &lt;div class="nds-ipv-image-card"&gt;
    &lt;img src="thumbnail.jpg"
         data-ipv-full="full-size.jpg"
         alt="Image Description"
         class="nds-ipv-thumbnail"&gt;
    &lt;div class="nds-ipv-image-title"&gt;Image Title&lt;/div&gt;
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
</section>

<!-- Features Section -->
<section id="imagePopupFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Features</h2>
            <p class="nds-section-description">Powerful capabilities for image viewing and interaction</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-feature-grid">
                <div class="nds-feature-item">
                    <i class="hgi hgi-stroke hgi-zoom-in"></i>
                    <h3>Zoom Controls</h3>
                    <p>Mouse wheel zoom, pinch-to-zoom on touch devices, and dedicated zoom buttons</p>
                </div>
                <div class="nds-feature-item">
                    <i class="hgi hgi-stroke hgi-move"></i>
                    <h3>Pan & Drag</h3>
                    <p>Click and drag to pan around zoomed images with smooth gestures</p>
                </div>
                <div class="nds-feature-item">
                    <i class="hgi hgi-stroke hgi-mobile-01"></i>
                    <h3>Touch Support</h3>
                    <p>Full touch gesture support including pinch-to-zoom and drag to pan</p>
                </div>
                <div class="nds-feature-item">
                    <i class="hgi hgi-stroke hgi-keyboard"></i>
                    <h3>Keyboard Shortcuts</h3>
                    <p>ESC to close, +/- for zoom, H to toggle UI, 0 to reset</p>
                </div>
                <div class="nds-feature-item">
                    <i class="hgi hgi-stroke hgi-eye"></i>
                    <h3>UI Toggle</h3>
                    <p>Hide/show controls for distraction-free viewing</p>
                </div>
                <div class="nds-feature-item">
                    <i class="hgi hgi-stroke hgi-loading-02"></i>
                    <h3>Loading States</h3>
                    <p>Visual feedback while images are loading</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Instructions -->
<section id="imagePopupUsage" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Instructions</h2>
            <p class="nds-section-description">How to implement and use the image popup viewer</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-usage-panel">
                <h3>Keyboard Controls</h3>
                <ul>
                    <li><kbd>ESC</kbd> - Close the popup viewer</li>
                    <li><kbd>+</kbd> or <kbd>=</kbd> - Zoom in</li>
                    <li><kbd>-</kbd> - Zoom out</li>
                    <li><kbd>0</kbd> - Reset zoom and position</li>
                    <li><kbd>H</kbd> - Toggle UI visibility</li>
                </ul>
            </div>

            <div class="nds-usage-panel">
                <h3>Mouse Controls</h3>
                <ul>
                    <li><strong>Scroll</strong> - Zoom in/out at cursor position</li>
                    <li><strong>Click & Drag</strong> - Pan around the image</li>
                    <li><strong>Double Click</strong> - Reset zoom and position</li>
                </ul>
            </div>

            <div class="nds-usage-panel">
                <h3>Touch Controls</h3>
                <ul>
                    <li><strong>Pinch</strong> - Zoom in/out</li>
                    <li><strong>Drag</strong> - Pan around the image</li>
                    <li><strong>Double Tap</strong> - Reset zoom and position</li>
                </ul>
            </div>

            <div class="nds-usage-panel">
                <h3>Implementation</h3>
                <ol>
                    <li>Add the class nds-ipv-thumbnail to your thumbnail images</li>
                    <li>Use data-ipv-full attribute for the full-size image URL</li>
                    <li>The popup overlay is automatically created by the JavaScript</li>
                    <li>No additional markup needed - just add the thumbnail class!</li>
                </ol>
            </div>
        </div>
    </div>
</section>

<!-- Popup overlay is automatically created by nds-ipv.js -->

<style>
    .nds-feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-lg);
    }

    .nds-feature-item {
        padding: var(--spacing-lg);
        background: var(--background-neutral-50);
        border-radius: var(--border-radius-md);
        text-align: center;
    }

    .nds-feature-item i {
        font-size: 32px;
        color: var(--colors-primary-sa-flag-600-primary);
        margin-bottom: var(--spacing-md);
    }

    .nds-feature-item h3 {
        font-size: var(--nds-text-lg-FS);
        line-height: var(--nds-text-lg-LH);
        font-weight: 600;
        color: var(--text-primary-default);
        margin-bottom: var(--spacing-sm);
    }

    .nds-feature-item p {
        font-size: var(--nds-text-sm-FS);
        line-height: var(--nds-text-sm-LH);
        color: var(--text-neutral-600);
    }

    .nds-usage-panel {
        background: var(--background-neutral-50);
        border-radius: var(--border-radius-md);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
    }

    .nds-usage-panel h3 {
        font-size: var(--nds-text-lg-FS);
        line-height: var(--nds-text-lg-LH);
        font-weight: 600;
        color: var(--text-primary-default);
        margin-bottom: var(--spacing-md);
    }

    .nds-usage-panel ul,
    .nds-usage-panel ol {
        margin-left: var(--spacing-lg);
    }

    .nds-usage-panel li {
        margin-bottom: var(--spacing-sm);
        color: var(--text-neutral-700);
    }

    .nds-usage-panel kbd {
        background: var(--background-neutral-100);
        border: 1px solid var(--border-neutral-default);
        border-radius: 4px;
        padding: 2px 8px;
        font-family: monospace;
        font-size: var(--nds-text-sm-FS);
    }

    .nds-usage-panel code {
        background: var(--background-neutral-100);
        border-radius: 4px;
        padding: 2px 6px;
        font-family: monospace;
        font-size: var(--nds-text-sm-FS);
        color: var(--colors-primary-sa-flag-700);
    }
</style>

<!-- IPV is now included in nds-main.min.js bundle -->