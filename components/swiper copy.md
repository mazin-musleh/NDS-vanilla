---
layout: page
title: Swiper
hero_title: Swiper - National Design System
hero_description: "A responsive carousel/slider component with full RTL/LTR support, seamless infinite loop, drag/swipe
interaction and keyboard navigation"
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Basic Swiper Demo -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Hero Slider</h2>
            <p class="nds-section-description">A full-width hero slider with autoplay and loop mode. Perfect for
                showcasing key content, announcements, or promotional banners with call-to-action buttons.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Hero Slider</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" speed="700" loop="true" autoplay="5000">
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
                                                <span class="label">Get Started</span>
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
                                                <span class="label">Learn More</span>
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
                                                <span class="label">Join Now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-prev"
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
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
                            <code class="lang-html code">&lt;div class="nds-swiper" speed="700" loop="true" autoplay="5000"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;
        &lt;div class="nds-swiper-slide"&gt;
            &lt;div class="slide-content" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; padding: 2rem; border-radius: 8px;"&gt;
                &lt;div style="max-width: 800px; text-align: center;"&gt;
                    &lt;h2 style="color: white; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;"&gt;Welcome to Our Platform&lt;/h2&gt;
                    &lt;p style="color: white; font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;"&gt;Discover innovative solutions&lt;/p&gt;
                    &lt;button class="nds-btn nds-primary nds-lg nds-oncolor"&gt;
                        &lt;span class="label"&gt;Get Started&lt;/span&gt;
                    &lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- More slides... --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-oncolor nds-swiper-button-prev" aria-label="Previous slide"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-right-01 icon"&gt;&lt;/i&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-oncolor nds-swiper-button-next" aria-label="Next slide"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-left-01 icon"&gt;&lt;/i&gt;
    &lt;/button&gt;
&lt;/div&gt;</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Image Slider with Lazy Loading Demo -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Image Slider</h2>
            <p class="nds-section-description">Image slider with lazy loading for optimal performance. Images are loaded
                only when needed, improving page load speed.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Image Slider with Lazy Loading</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" speed="500" ui="1">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <img src="https://picsum.photos/800/450?random=1" alt="Landscape 1" loading="lazy"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img src="https://picsum.photos/800/450?random=2" alt="Landscape 2" loading="lazy"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img src="https://picsum.photos/800/450?random=3" alt="Landscape 3" loading="lazy"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img src="https://picsum.photos/800/450?random=4" alt="Landscape 4" loading="lazy"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                                <div class="nds-swiper-slide">
                                    <img src="https://picsum.photos/800/450?random=5" alt="Landscape 5" loading="lazy"
                                        style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;">
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-prev"
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button
                                class="nds-btn nds-subtle nds-icon-only nds-xl nds-circle nds-oncolor nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
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
                            <code class="lang-html code">&lt;div class="nds-swiper" speed="500" loop="true"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;
        &lt;div class="nds-swiper-slide"&gt;
            &lt;img src="image1.jpg"
                 alt="Description"
                 loading="lazy"
                 style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;"&gt;
        &lt;/div&gt;
        &lt;div class="nds-swiper-slide"&gt;
            &lt;img src="image2.jpg"
                 alt="Description"
                 loading="lazy"
                 style="width: 100%; height: 450px; object-fit: cover; border-radius: 8px;"&gt;
        &lt;/div&gt;
        &lt;!-- More slides... --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev" aria-label="Previous slide"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-right-01 icon"&gt;&lt;/i&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next" aria-label="Next slide"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-left-01 icon"&gt;&lt;/i&gt;
    &lt;/button&gt;
&lt;/div&gt;</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Multi-Slide Responsive Demo -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Multi-Slide</h2>
            <p class="nds-section-description">Display multiple slides at once with responsive breakpoints: 4 slides on
                large desktop, 3 on desktop, 2 on tablet, and 1 on mobile.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Multiple Slides Per View</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" speed="500" loop="false" slides-max="4" slides-mid="3" slides-min="1">
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
                                            <p class="nds-card-description">Seamless infinite loop.</p>
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
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev "
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
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
                            <code class="lang-html code">&lt;div class="nds-swiper" speed="500" loop="true"
     slides-max="4" slides-mid="3" slides-min="1"&gt;
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
    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev "&gt;&lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"&gt;&lt;/button&gt;
&lt;/div&gt;</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Peek Mode Demo -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Peek Mode - Show Partial Slides</h2>
            <p class="nds-section-description">Use the <code>peek</code> attribute (in pixels) to show parts of adjacent
                slides on both sides. Works with single or multiple slides per view.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Multi-Slide with Peek (16px)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" speed="500" loop="false" slides-max="3" slides-mid="2" slides-min="1"
                            peek="16">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 1</h4>
                                            <p class="nds-card-description">16px peek shows parts of adjacent slides.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 2</h4>
                                            <p class="nds-card-description">Creates a preview effect for navigation.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 3</h4>
                                            <p class="nds-card-description">Works with loop and responsive breakpoints.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 4</h4>
                                            <p class="nds-card-description">Helps users understand more content exists.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <h4 class="nds-card-title">Card 5</h4>
                                            <p class="nds-card-description">Great for product carousels.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev "
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
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
                            <code class="lang-html code">&lt;!-- Multi-slide with 16px peek --&gt;
&lt;div class="nds-swiper" speed="500" loop="true"
     slides-max="3" slides-mid="2" slides-min="1" peek="16"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;
        &lt;div class="nds-swiper-slide"&gt;
            &lt;div class="nds-card"&gt;...&lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- More slides... --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;button class="nds-swiper-button-prev"&gt;&lt;/button&gt;
    &lt;button class="nds-swiper-button-next"&gt;&lt;/button&gt;
&lt;/div&gt;

&lt;!-- Peek Attribute --&gt;
&lt;!-- peek="16" shows 16px of adjacent slides on each side --&gt;
&lt;!-- Value in pixels (e.g., peek="30", peek="80") --&gt;
&lt;!-- Works with single or multiple slides per view --&gt;</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Auto-play Demo -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Auto-play Swiper</h2>
            <p class="nds-section-description">Automatically advance slides every 3 seconds. Hover to pause, drag or
                click to restart.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">With Auto-play</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" speed="800" loop="true" autoplay="3000" slides-max="3" slides-mid="2"
                            slides-min="1">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <span class="nds-tag nds-primary nds-sm">Auto-play</span>
                                            <h4 class="nds-card-title">Feature 1</h4>
                                            <p class="nds-card-description">Advances every 3 seconds</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <span class="nds-tag nds-primary nds-sm">Auto-play</span>
                                            <h4 class="nds-card-title">Feature 2</h4>
                                            <p class="nds-card-description">Hover to pause</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <span class="nds-tag nds-primary nds-sm">Auto-play</span>
                                            <h4 class="nds-card-title">Feature 3</h4>
                                            <p class="nds-card-description">Drag to control</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-shadow">
                                        <div class="nds-card-content">
                                            <span class="nds-tag nds-primary nds-sm">Auto-play</span>
                                            <h4 class="nds-card-title">Feature 4</h4>
                                            <p class="nds-card-description">Infinite loop</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev "
                                aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"
                                aria-label="Next slide"><i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-autoplay-1" id="tab-autoplay-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-autoplay-1"
                            aria-labelledby="tab-autoplay-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">&lt;div class="nds-swiper" speed="800" loop="true" autoplay="3000"
     slides-max="3" slides-mid="2" slides-min="1"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;
        &lt;div class="nds-swiper-slide"&gt;
            &lt;!-- Slide content --&gt;
        &lt;/div&gt;
        &lt;!-- More slides... --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-prev "&gt;&lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-xl nds-swiper-button-next"&gt;&lt;/button&gt;
&lt;/div&gt;</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Configuration Options -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Configuration Options</h2>
            <p class="nds-section-description">The swiper component supports various attributes for customization.</p>
        </div>
        <div class="nds-section-content">
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
                            <td><code>speed</code></td>
                            <td>Number</td>
                            <td>500</td>
                            <td>Transition speed in milliseconds</td>
                        </tr>
                        <tr>
                            <td><code>loop</code></td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Enable seamless infinite loop</td>
                        </tr>
                        <tr>
                            <td><code>autoplay</code></td>
                            <td>Number</td>
                            <td>0</td>
                            <td>Auto-advance delay in milliseconds (0 = disabled)</td>
                        </tr>
                        <tr>
                            <td><code>slides-max</code></td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Slides visible on large desktop (≥1280px)</td>
                        </tr>
                        <tr>
                            <td><code>slides-mid</code></td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Slides visible on desktop (960px-1279px)</td>
                        </tr>
                        <tr>
                            <td><code>slides-min</code></td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Slides visible on mobile/tablet (&lt;960px)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Features -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Features</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-grid" style="--max-col:2; --mid-col:2;--min-col:1;">
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-globe-02"></i>
                        <h3 class="nds-card-title">RTL/LTR Support</h3>
                        <p class="nds-card-description">Full bidirectional support with automatic direction detection.
                            Works
                            seamlessly in both Arabic (RTL) and English (LTR) layouts.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-repeat-04"></i>
                        <h3 class="nds-card-title">Seamless Loop</h3>
                        <p class="nds-card-description">Infinite loop with no empty slides. Uses slide cloning for
                            smooth
                            transitions between first and last slides.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-cursor-01"></i>
                        <h3 class="nds-card-title">Drag & Swipe</h3>
                        <p class="nds-card-description">Interactive drag on desktop and swipe on mobile devices. Visual
                            feedback during drag with smooth animations.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-grid-01"></i>
                        <h3 class="nds-card-title">Responsive</h3>
                        <p class="nds-card-description">Three-tier responsive breakpoints (max/mid/min) for optimal
                            viewing
                            across all devices.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-keyboard-01"></i>
                        <h3 class="nds-card-title">Keyboard Navigation</h3>
                        <p class="nds-card-description">Full keyboard support with arrow keys, Home, and End.
                            Direction-aware
                            key bindings for RTL/LTR.</p>
                    </div>
                </div>
                <div class="nds-card">
                    <div class="nds-card-content">
                        <i class="hgi hgi-stroke hgi-check-circle"></i>
                        <h3 class="nds-card-title">Accessible</h3>
                        <p class="nds-card-description">ARIA labels, screen reader announcements, and keyboard focus
                            management for full accessibility.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Best Practices -->
<section class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Best Practices</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-card">
                <div class="nds-card-content">
                    <h3>Performance Tips</h3>
                    <ul>
                        <li>Use <code>loop="true"</code> for seamless infinite scrolling</li>
                        <li>Set appropriate transition <code>speed</code> (300-800ms recommended)</li>
                        <li>Limit <code>autoplay</code> to 3000ms or more for better UX</li>
                        <li>Use consistent slide heights to avoid layout shifts</li>
                    </ul>

                    <h3>Accessibility</h3>
                    <ul>
                        <li>Always include <code>aria-label</code> on navigation buttons</li>
                        <li>Provide meaningful content in each slide</li>
                        <li>Avoid autoplay speeds faster than 3 seconds</li>
                        <li>Ensure sufficient color contrast for on-color variants</li>
                    </ul>

                    <h3>Responsive Design</h3>
                    <ul>
                        <li>Use <code>slides-max</code>, <code>slides-mid</code>, <code>slides-min</code> for responsive
                            behavior</li>
                        <li>Test on multiple screen sizes and devices</li>
                        <li>Ensure touch targets are at least 44px for mobile</li>
                        <li>Consider content width when setting slides per view</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>