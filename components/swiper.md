---
layout: page
title: Swiper
hero_title: Swiper - National Design System
hero_description: "A responsive carousel/slider component with CSS scroll-snap, RTL/LTR support, and keyboard
navigation"
breadcrumb: ["Components"]
lang: en
direction: rtl
---

<!-- Basic Swiper Demo -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Slider</h2>
            <p class="nds-section-description">A simple slider with navigation buttons and pagination. Uses native CSS
                scroll-snap for smooth, performant sliding.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Slider</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper nds-hero">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="slide-content"
                                        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; padding: 2rem; border-radius: 8px;">
                                        <div style="max-width: 800px; text-align: center;">
                                            <h2
                                                style="color: white; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">
                                                Welcome to Our Platform</h2>
                                            <p
                                                style="color: white; font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;">
                                                Discover innovative solutions for your digital needs</p>
                                            <button class="nds-btn nds-primary nds-lg nds-oncolor">
                                                <span class="nds-label">Get Started</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="slide-content"
                                        style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; padding: 2rem; border-radius: 8px;">
                                        <div style="max-width: 800px; text-align: center;">
                                            <h2
                                                style="color: white; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">
                                                Powerful Features</h2>
                                            <p
                                                style="color: white; font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;">
                                                Built with the latest technology and best practices</p>
                                            <button class="nds-btn nds-primary nds-lg nds-oncolor">
                                                <span class="nds-label">Learn More</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="slide-content"
                                        style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; padding: 2rem; border-radius: 8px;">
                                        <div style="max-width: 800px; text-align: center;">
                                            <h2
                                                style="color: white; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">
                                                Start Your Journey</h2>
                                            <p
                                                style="color: white; font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;">
                                                Join thousands of satisfied users today</p>
                                            <button class="nds-btn nds-primary nds-lg nds-oncolor">
                                                <span class="nds-label">Join Now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-prev"
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-swiper">
                                    <div class="nds-swiper-wrapper">
                                        <div class="nds-swiper-slide">
                                            <!-- Slide content -->
                                        </div>
                                        <div class="nds-swiper-slide">
                                            <!-- Slide content -->
                                        </div>
                                    </div>
                                    <div class="nds-swiper-pagination"></div>
                                    <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-oncolor nds-swiper-button-prev" aria-label="Previous slide">
                                        <i class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-oncolor nds-swiper-button-next" aria-label="Next slide">
                                        <i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i>
                                    </button>
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
</section>

<!-- Image Slider Demo -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Image Slider</h2>
            <p class="nds-section-description">Image slider with lazy loading for optimal performance. Uses
                data-src pattern to defer image loading until slides approach the viewport.
            </p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Image Slider</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper nds-hero">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <img data-src="https://picsum.photos/800/450?random=1" alt="Landscape 1"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img data-src="https://picsum.photos/800/450?random=2" alt="Landscape 2"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img data-src="https://picsum.photos/800/450?random=3" alt="Landscape 3"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img data-src="https://picsum.photos/800/450?random=4" alt="Landscape 4"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img data-src="https://picsum.photos/800/450?random=5" alt="Landscape 5"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-prev"
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-images-1" id="tab-images-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-images-1"
                            aria-labelledby="tab-images-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-swiper">
                                    <div class="nds-swiper-wrapper">
                                        <div class="nds-swiper-slide">
                                            <img data-src="image1.jpg" alt="Description"
                                                style="width: 100%; height: 450px; object-fit: cover;">
                                        </div>
                                        <div class="nds-swiper-slide">
                                            <img data-src="image2.jpg" data-srcset="small.jpg 600w, large.jpg 1200w" alt="Description">
                                        </div>
                                        <!-- More slides... -->
                                    </div>
                                    <div class="nds-swiper-pagination"></div>
                                    <button class="nds-swiper-button-prev" aria-label="Previous slide">...</button>
                                    <button class="nds-swiper-button-next" aria-label="Next slide">...</button>
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
</section>

<!-- Multi-Slide Responsive Demo -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Multi-Slide</h2>
            <p class="nds-section-description">Display multiple slides at once with responsive breakpoints: 4 slides on
                large desktop, 3 on desktop, and 1 on mobile/tablet.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Multiple Slides Per View</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" hidden slides-max="4" slides-mid="3" slides-min="1" peek="0">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 1</h4>
                                            <p class="nds-card-description">Multi-slide example with responsive
                                                breakpoints.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 2</h4>
                                            <p class="nds-card-description">Resize the browser to see responsive
                                                behavior.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 3</h4>
                                            <p class="nds-card-description">Drag or use arrows to navigate.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 4</h4>
                                            <p class="nds-card-description">Native scroll-snap behavior.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 5</h4>
                                            <p class="nds-card-description">Full RTL/LTR support.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 6</h4>
                                            <p class="nds-card-description">Touch and keyboard navigation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev"
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-multi-1" id="tab-multi-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-multi-1"
                            aria-labelledby="tab-multi-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-swiper" slides-max="4" slides-mid="3" slides-min="1">
                                    <div class="nds-swiper-wrapper">
                                        <div class="nds-swiper-slide">
                                            <div class="nds-card nds-stroke nds-shadow">
                                                <div class="nds-card-content">
                                                    <h4 class="nds-card-title">Card 1</h4>
                                                    <p class="nds-card-description">Content</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- More slides... -->
                                    </div>
                                    <div class="nds-swiper-pagination"></div>
                                    <button class="nds-swiper-button-prev">...</button>
                                    <button class="nds-swiper-button-next">...</button>
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
</section>

<!-- Peek Mode Demo -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Peek Mode</h2>
            <p class="nds-section-description">Show partial next/previous slides to indicate more content. Use the
                peek attribute to set the visible amount in pixels.
            </p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Peek Mode (40px)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" hidden slides-max="3" slides-mid="2" slides-min="1" peek="40">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 1</h4>
                                            <p class="nds-card-description">Peek mode shows partial adjacent slides.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 2</h4>
                                            <p class="nds-card-description">Users can see there's more content.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 3</h4>
                                            <p class="nds-card-description">This encourages scrolling/navigation.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 4</h4>
                                            <p class="nds-card-description">Configurable peek amount in pixels.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 5</h4>
                                            <p class="nds-card-description">Works with any slides-per-view.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 6</h4>
                                            <p class="nds-card-description">Last slide in the carousel.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev"
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 nds-icon"></i></button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-peek-1" id="tab-peek-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-peek-1"
                            aria-labelledby="tab-peek-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="40">
                                    <div class="nds-swiper-wrapper">
                                        <div class="nds-swiper-slide">
                                            <!-- Slide content -->
                                        </div>
                                        <!-- More slides... -->
                                    </div>
                                    <div class="nds-swiper-pagination"></div>
                                    <button class="nds-swiper-button-prev">...</button>
                                    <button class="nds-swiper-button-next">...</button>
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
</section>

<!-- Configuration Options -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Configuration Options</h2>
            <p class="nds-section-description">The swiper component supports the following attributes for customization.
            </p>
        </div>
        <div class="nds-section-body">
            <div class="nds-table-container">
                <table class="nds-table">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>slides-max</td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Slides visible on large desktop (≥1280px)</td>
                        </tr>
                        <tr>
                            <td>slides-mid</td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Slides visible on desktop (960px-1279px)</td>
                        </tr>
                        <tr>
                            <td>slides-min</td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Slides visible on mobile/tablet (&lt;960px)</td>
                        </tr>
                        <tr>
                            <td>peek</td>
                            <td>Number</td>
                            <td>0</td>
                            <td>Pixels of adjacent slides to show (peek effect)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Features -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-col:2; --mid-col:2;--min-col:1;">
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-globe-02"></i>
                        <h3 class="nds-card-title">RTL/LTR Support</h3>
                        <p class="nds-card-description">Full bidirectional support with automatic direction detection.
                            Works seamlessly in both Arabic (RTL) and English (LTR) layouts.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-cursor-01"></i>
                        <h3 class="nds-card-title">Native Scroll</h3>
                        <p class="nds-card-description">Uses CSS scroll-snap for smooth, native scrolling behavior.
                            Drag on desktop and swipe on mobile devices.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-grid-01"></i>
                        <h3 class="nds-card-title">Responsive</h3>
                        <p class="nds-card-description">Three-tier responsive breakpoints (max/mid/min) for optimal
                            viewing across all devices.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-keyboard-01"></i>
                        <h3 class="nds-card-title">Keyboard Navigation</h3>
                        <p class="nds-card-description">Full keyboard support with arrow keys, Home, and End.
                            Direction-aware key bindings for RTL/LTR.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Best Practices -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Best Practices</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-card">
                <div class="nds-card-content">
                    <h3>Performance Tips</h3>
                    <ul>
                        <li>Use data-src and data-srcset for lazy loading images (swiper will
                            load them as slides approach the viewport)</li>
                        <li>Use consistent slide heights to avoid layout shifts</li>
                        <li>Leverage CSS scroll-snap for smooth, hardware-accelerated scrolling</li>
                    </ul>

                    <h3>Accessibility</h3>
                    <ul>
                        <li>Always include aria-label on navigation buttons</li>
                        <li>Provide meaningful content in each slide</li>
                        <li>Ensure sufficient color contrast for on-color variants</li>
                    </ul>

                    <h3>Responsive Design</h3>
                    <ul>
                        <li>Use slides-max, slides-mid, slides-min for responsive
                            behavior</li>
                        <li>Test on multiple screen sizes and devices</li>
                        <li>Consider content width when setting slides per view</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>