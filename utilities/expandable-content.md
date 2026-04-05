---
layout: page
title: Expandable Content
hero_title: Expandable Content - National Design System
hero_description: Dynamic content containers with automatic "Show More" functionality when content exceeds height limits
breadcrumb: ["Utilities", "Expandable Content"]
lang: en
direction: ltr
---

<!-- Expandable Content Overview -->
<section id="expandableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Expandable Content Utility</h2>
            <p class="nds-section-description">Automatically adds expand/collapse functionality when content exceeds
                specified height limits</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <!-- Basic Expandable Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Expandable Content</div>
                    <div class="demo-action">
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-expandable" style="--max-height: 200px;">
                            <div class="nds-expandable-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum.</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                    architecto beatae vitae dicta sunt explicabo.</p>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
                                    magnam aliquam quaerat voluptatem.</p>
                            </div>
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
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                    <div class="nds-expandable" style="--max-height: 200px;">
                                        <div class="nds-expandable-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                                qui officia deserunt mollit anim id est laborum.</p>
                                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                                architecto beatae vitae dicta sunt explicabo.</p>
                                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                                                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
                                                magnam aliquam quaerat voluptatem.</p>
                                        </div>
                                    </div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>



            <!-- Expandable Card Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Expandable Card</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-shadow", ".nds-card", "cardVariant"]'>
                            <span class="nds-label">Shadow</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn" data-state="selected"
                            data-toggler='["nds-stroke", ".nds-card", "cardVariant"]'>
                            <span class="nds-label">Stroke</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='[["nds-truncate", ".nds-card-title"],["nds-truncate", ".nds-card-description"], "truncation"]'>
                            <span class="nds-label">Truncate</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-full", ".nds-card", "cardSize"]'>
                            <span class="nds-label">full</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-card nds-stroke nds-expandable" data-state="expandable">
                            <div class="nds-expandable-content" style="--max-height:200px">
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title">Ministry Services Documentation</h3>
                                        <p class="nds-card-description">Complete documentation and guidelines for
                                            all ministry digital services including API references, implementation
                                            guides, best practices for developers, integration specifications,
                                            security protocols, and compliance requirements for government
                                            applications. This comprehensive resource covers everything from basic
                                            setup to advanced configurations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-card-1" id="tab-card-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-card-1"
                            aria-labelledby="tab-card-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                    <div class="nds-card nds-stroke nds-expandable" data-state="expandable">
                                        <div class="nds-expandable-content" style="--max-height:200px">
                                            <div class="nds-card-content">
                                                <div class="nds-card-text">
                                                    <h3 class="nds-card-title">Ministry Services Documentation</h3>
                                                    <p class="nds-card-description">Complete documentation and guidelines for
                                                        all ministry digital services including API references, implementation
                                                        guides, best practices for developers, integration specifications,
                                                        security protocols, and compliance requirements for government
                                                        applications. This comprehensive resource covers everything from basic
                                                        setup to advanced configurations.</p>
                                                </div>
                                            </div>
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

<!-- Usage Guidelines -->
<section id="expandableGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Structure</h3>
                    <ul>
                        <li>Use .nds-expandable as the wrapper container</li>
                        <li>Content must be inside .nds-expandable-content</li>
                        <li>Set custom height with --max-height CSS property</li>
                        <li>Default height limit is 300px if not specified</li>
                    </ul>
                </div>

                <div class="nds-content-block">
                    <h3 class="nds-block-title">Behavior</h3>
                    <ul>
                        <li>Automatically detects when content exceeds height limit</li>
                        <li>Shows "Show More" button only when needed</li>
                        <li>Uses ResizeObserver for responsive height detection</li>
                        <li>Gradient fade effect indicates more content below</li>
                    </ul>
                </div>

                <div class="nds-content-block">
                    <h3 class="nds-block-title">Accessibility</h3>
                    <ul>
                        <li>Proper ARIA attributes (aria-expanded, aria-label)</li>
                        <li>Keyboard navigation support</li>
                        <li>Clear visual indicators for expandable state</li>
                        <li>Semantic button structure</li>
                    </ul>
                </div>

                <div class="nds-content-block">
                    <h3 class="nds-block-title">Customization</h3>
                    <ul>
                        <li>--max-height: Custom height limit (e.g., "200px")</li>
                        <li>JavaScript API for programmatic control</li>
                        <li>Custom events for expand/collapse states</li>
                        <li>Responsive behavior on window resize</li>
                    </ul>
                </div>
        </div>
    </div>
</section>

<!-- JavaScript API -->
<section id="expandableAPI" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript API</h2>
            <p class="nds-section-description">Programmatic control and event handling for expandable content</p>
        </div>
        <div class="nds-section-content">

            <h3>Manual Initialization</h3>
            <p>Create expandable instances programmatically for dynamic content.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript">// Manual initialization
const expandableElement = document.querySelector('#myExpandable');
const expandableInstance = NDS.Expandable.create(expandableElement);

// Reinitialize after dynamic content changes
NDS.Expandable.reinit();</code>
                </div>
            </div>

            <h3>Programmatic Control</h3>
            <p>Control expandable content programmatically using the public API methods.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript">// Get expandable instance
const expandable = document.querySelector('.nds-expandable');
const instance = expandable.ndsExpandableInstance;

// Control expansion state
instance.expandContent();    // Expand content
instance.collapseContent();  // Collapse content
instance.toggleContent();    // Toggle state
instance.recheckHeight();    // Recheck content height

// Get current state
const state = instance.getState();
console.log('Is expanded:', state.isExpanded);
console.log('Has button:', state.hasButton);</code>
                </div>
            </div>

            <h3>Event Handling</h3>
            <p>Listen for expandable events to track user interactions and implement custom behaviors.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript">// Listen for expandable events
document.addEventListener('nds:expandable:expanded', (e) => {
    console.log('Content expanded:', e.detail);
    console.log('Container:', e.detail.container);
    console.log('Button:', e.detail.button);

    // Analytics tracking
    gtag('event', 'content_expanded', {
        'content_type': 'expandable'
    });
});

document.addEventListener('nds:expandable:collapsed', (e) => {
    console.log('Content collapsed:', e.detail);

    // Track collapse events
    gtag('event', 'content_collapsed', {
        'content_type': 'expandable'
    });
});</code>
                </div>
            </div>

        </div>
    </div>
</section>