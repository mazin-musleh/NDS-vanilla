---
layout: page
title: Swiper
hero_title: Swiper - National Design System
hero_description: "A responsive carousel/slider component with CSS scroll-snap, RTL/LTR support, and keyboard
navigation"
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
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
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-prev nds-swiper-button-prev"
                                aria-label="Previous slide"></button>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-next nds-swiper-button-next"
                                aria-label="Next slide"></button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                &lt;div class="nds-swiper"&gt;
                                    &lt;div class="nds-swiper-wrapper"&gt;
                                        &lt;div class="nds-swiper-slide"&gt;
                                            &lt;!-- Slide content --&gt;
                                        &lt;/div&gt;
                                        &lt;div class="nds-swiper-slide"&gt;
                                            &lt;!-- Slide content --&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
                                    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-oncolor nds-prev nds-swiper-button-prev" aria-label="Previous slide"&gt;&lt;/button&gt;
                                    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-oncolor nds-next nds-swiper-button-next" aria-label="Next slide"&gt;&lt;/button&gt;
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
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-prev nds-swiper-button-prev"
                                aria-label="Previous slide"></button>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-next nds-swiper-button-next"
                                aria-label="Next slide"></button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                &lt;div class="nds-swiper"&gt;
                                    &lt;div class="nds-swiper-wrapper"&gt;
                                        &lt;div class="nds-swiper-slide"&gt;
                                            &lt;img data-src="image1.jpg" alt="Description"
                                                style="width: 100%; height: 450px; object-fit: cover;"&gt;
                                        &lt;/div&gt;
                                        &lt;div class="nds-swiper-slide"&gt;
                                            &lt;img data-src="image2.jpg" data-srcset="small.jpg 600w, large.jpg 1200w" alt="Description"&gt;
                                        &lt;/div&gt;
                                        &lt;!-- More slides... --&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
                                    &lt;button class="nds-prev nds-swiper-button-prev" aria-label="Previous slide"&gt;...&lt;/button&gt;
                                    &lt;button class="nds-next nds-swiper-button-next" aria-label="Next slide"&gt;...&lt;/button&gt;
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
                            <div class="nds-swiper-navigation">
                                <div class="nds-swiper-buttons">
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev nds-swiper-button-prev" type="button" aria-label="Previous slide"></button>
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next nds-swiper-button-next" type="button" aria-label="Next slide"></button>
                                </div>
                                <div class="nds-swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                &lt;div class="nds-swiper" slides-max="4" slides-mid="3" slides-min="1"&gt;
                                    &lt;div class="nds-swiper-wrapper"&gt;
                                        &lt;div class="nds-swiper-slide"&gt;
                                            &lt;div class="nds-card nds-stroke nds-shadow"&gt;
                                                &lt;div class="nds-card-content"&gt;
                                                    &lt;h4 class="nds-card-title"&gt;Card 1&lt;/h4&gt;
                                                    &lt;p class="nds-card-description"&gt;Content&lt;/p&gt;
                                                &lt;/div&gt;
                                            &lt;/div&gt;
                                        &lt;/div&gt;
                                        &lt;!-- More slides... --&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-swiper-navigation"&gt;
                                        &lt;div class="nds-swiper-buttons"&gt;
                                            &lt;button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev nds-swiper-button-prev" type="button" aria-label="Previous slide"&gt;&lt;/button&gt;
                                            &lt;button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next nds-swiper-button-next" type="button" aria-label="Next slide"&gt;&lt;/button&gt;
                                        &lt;/div&gt;
                                        &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
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
                            <div class="nds-swiper-navigation">
                                <div class="nds-swiper-buttons">
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev nds-swiper-button-prev" type="button" aria-label="Previous slide"></button>
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next nds-swiper-button-next" type="button" aria-label="Next slide"></button>
                                </div>
                                <div class="nds-swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                &lt;div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="40"&gt;
                                    &lt;div class="nds-swiper-wrapper"&gt;
                                        &lt;div class="nds-swiper-slide"&gt;
                                            &lt;!-- Slide content --&gt;
                                        &lt;/div&gt;
                                        &lt;!-- More slides... --&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-swiper-navigation"&gt;
                                        &lt;div class="nds-swiper-buttons"&gt;
                                            &lt;button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev nds-swiper-button-prev" type="button" aria-label="Previous slide"&gt;&lt;/button&gt;
                                            &lt;button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next nds-swiper-button-next" type="button" aria-label="Next slide"&gt;&lt;/button&gt;
                                        &lt;/div&gt;
                                        &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
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

<!-- Built-in Features -->
<section id="swiperFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-zap"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">nds-swiper</code> on the page initializes automatically on load with no setup code required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-scroll-horizontal"></i>
                        <span class="nds-label">Native Scroll-Snap</span>
                    </span>
                    <p class="nds-item-desc">Slides snap into place using CSS scroll-snap, giving smooth drag-to-scroll on desktop and natural swipe gestures on touch devices.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Responsive Breakpoints</span>
                    </span>
                    <p class="nds-item-desc">Three-tier slide counts (<code class="nds-inline-code lang-html">slides-max</code>, <code class="nds-inline-code lang-html">slides-mid</code>, <code class="nds-inline-code lang-html">slides-min</code>) adjust the visible slides at 960px and 600px breakpoints.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-02"></i>
                        <span class="nds-label">Lazy Loading</span>
                    </span>
                    <p class="nds-item-desc">Images with <code class="nds-inline-code lang-html">data-src</code> or <code class="nds-inline-code lang-html">data-srcset</code> load automatically as slides approach the viewport, reducing initial page weight.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Arrow keys navigate between slides, Home jumps to the first, and End to the last. All keys are direction-aware for RTL layouts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
                        <span class="nds-label">Peek Preview</span>
                    </span>
                    <p class="nds-item-desc">Set a <code class="nds-inline-code lang-html">peek</code> value in pixels to reveal partial adjacent slides, signaling that more content is available.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-play-circle"></i>
                        <span class="nds-label">Visibility Handling</span>
                    </span>
                    <p class="nds-item-desc">Swipers inside hidden containers like tabs or modals re-measure and render correctly when they become visible.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-touch-01"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Access any swiper instance via <code class="nds-inline-code lang-js">element._ndsSwiper</code> to call <code class="nds-inline-code lang-js">slideTo()</code>, <code class="nds-inline-code lang-js">prev()</code>, <code class="nds-inline-code lang-js">next()</code>, or <code class="nds-inline-code lang-js">destroy()</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="swiperGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the swiper for <strong>horizontally browsable collections</strong> like featured services, image galleries, or card carousels where showing everything at once would overwhelm the layout</li>
                    <li>Use the <strong>hero variant</strong> (<code class="nds-inline-code lang-html">nds-hero</code>) for full-width banner sliders with background images or gradient slides at the top of a page</li>
                    <li>Use <code class="nds-inline-code lang-html">data-src</code> and <code class="nds-inline-code lang-html">data-srcset</code> for <strong>lazy loading</strong> images rather than standard <code class="nds-inline-code lang-html">src</code> to reduce initial page weight</li>
                    <li>Do not use swiper for content that should be visible all at once. Use <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">Grid</a> for static card layouts or <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switchable content panels</li>
                    <li>Do not place interactive form controls inside slides. Keep slide content to display elements: text, images, cards, and links</li>
                    <li>Add <code class="nds-inline-code lang-html">peek="40"</code> when the slide count exceeds the visible slots, giving users a visual cue that more content is available</li>
                    <li>Set <code class="nds-inline-code lang-html">hidden</code> on the <code class="nds-inline-code lang-html">nds-swiper</code> element for multi-slide swipers to prevent a flash of unstyled content before JS initializes</li>
                    <li>Keep slide heights consistent within a swiper. Mix uneven heights and the tallest slide will define the row height for all others</li>
                    <li>Always include <code class="nds-inline-code lang-html">aria-label</code> on navigation buttons with clear directional text like "Previous slide" and "Next slide"</li>
                    <li>For <strong>full-width section breakouts</strong>, place the swiper inside a <code class="nds-inline-code lang-html">nds-section-body nds-max-width</code> container so it can span beyond the content padding</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-hero</code></td><td>Full-width single-slide hero mode with overlay navigation and centered pagination</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>Adjusts pagination bullets and navigation for dark/image backgrounds</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">slides-max="3"</code></td><td>Slides visible at large breakpoint (viewport >= 960px). Default: 1</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">slides-mid="2"</code></td><td>Slides visible at medium breakpoint (600px to 959px). Default: 1</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">slides-min="1"</code></td><td>Slides visible at small breakpoint (viewport < 600px). Default: 1</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">peek="40"</code></td><td>Pixels of adjacent slides to reveal. Only applies when there are multiple pages. Default: 0</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">hidden</code></td><td>Prevents flash of unstyled content. The swiper removes it after initialization</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--swiper-gap</code></td><td>var(--spacing-xl)</td><td>Gap between slides</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--swiper-peek</code></td><td>0px</td><td>Peek amount (set by JS from peek attribute)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--swiper-padding</code></td><td>0px</td><td>Container inline padding (auto-set for full-width sections)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--swiper-slides</code></td><td>1</td><td>Current slides per view (set by JS from breakpoint calculation)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--swiper-total</code></td><td>1</td><td>Total number of slides (set by JS)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>All <code class="nds-inline-code lang-html">nds-swiper</code> elements initialize automatically. Access an instance via <code class="nds-inline-code lang-js">element._ndsSwiper</code>.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-js code">
// ── Access instance ──
const swiper = document.querySelector('.nds-swiper')._ndsSwiper;

// ── Navigation ──
swiper.slideTo(2);       // Scroll to slide at index 2 (animated)
swiper.slideTo(0, false); // Jump to first slide (no animation)
swiper.prev();           // Go to previous page
swiper.next();           // Go to next page

// ── Cleanup ──
swiper.destroy();        // Remove listeners, pagination, and reset state

// ── Factory ──
const el = document.querySelector('.my-swiper');
const instance = NDS.Swiper.create(el); // Create and initialize a new instance

// ── Re-initialize all swipers ──
NDS.Swiper.init();       // Finds and initializes all uninitialized .nds-swiper elements
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>