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
            <h2 class="nds-section-title">Basic Swiper</h2>
            <p class="nds-section-description">A simple swiper with single card per slide, navigation arrows, and
                pagination bullets.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Single Slide</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["darkBg", ".demo-container", "containerBg"]'>
                            <span class="label">Dark bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-swiper" speed="500" loop="true">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card">
                                        <div class="nds-card-content">
                                            <h3 class="nds-card-title">Slide 1</h3>
                                            <p class="nds-card-description">This is the first slide with a card
                                                component.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card">
                                        <div class="nds-card-content">
                                            <h3 class="nds-card-title">Slide 2</h3>
                                            <p class="nds-card-description">This is the second slide with a card
                                                component.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card">
                                        <div class="nds-card-content">
                                            <h3 class="nds-card-title">Slide 3</h3>
                                            <p class="nds-card-description">This is the third slide with a card
                                                component.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card">
                                        <div class="nds-card-content">
                                            <h3 class="nds-card-title">Slide 4</h3>
                                            <p class="nds-card-description">This is the fourth slide with a card
                                                component.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-pagination"></div>
                            <button class="nds-swiper-button-prev" aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button class="nds-swiper-button-next" aria-label="Next slide"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
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
                            <code class="lang-html code">&lt;div class="nds-swiper" speed="500" loop="true"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;
        &lt;div class="nds-swiper-slide"&gt;
            &lt;div class="nds-card"&gt;
                &lt;div class="nds-card-content"&gt;
                    &lt;h3 class="nds-card-title"&gt;Slide 1&lt;/h3&gt;
                    &lt;p class="nds-card-description"&gt;Content here&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- More slides... --&gt;
    &lt;/div&gt;
    &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;button class="nds-swiper-button-prev" aria-label="Previous slide"&gt;&lt;/button&gt;
    &lt;button class="nds-swiper-button-next" aria-label="Next slide"&gt;&lt;/button&gt;
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
                            <button class="nds-swiper-button-prev" aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button class="nds-swiper-button-next" aria-label="Next slide"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
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
    &lt;button class="nds-swiper-button-prev"&gt;&lt;/button&gt;
    &lt;button class="nds-swiper-button-next"&gt;&lt;/button&gt;
&lt;/div&gt;</code>
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
                            <button class="nds-swiper-button-prev" aria-label="Previous slide"><i
                                    class="hgi hgi-stroke hgi-arrow-right-01 icon"></i></button>
                            <button class="nds-swiper-button-next" aria-label="Next slide"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 icon"></i></button>
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
    &lt;button class="nds-swiper-button-prev"&gt;&lt;/button&gt;
    &lt;button class="nds-swiper-button-next"&gt;&lt;/button&gt;
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
            <div class="nds-grid">
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