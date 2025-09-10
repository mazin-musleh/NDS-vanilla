---
layout: page
title: Accordion
hero_title: Accordion Components - National Design System
hero_description: "Collapsible accordion components for organizing content with proper ARIA accessibility and smooth
animations"
breadcrumb: ["Components", "Accordion"]
lang: en
direction: ltr
css_files:
- "assets/css/nds-accordion.css"
---

<!-- Accordion Examples Overview -->
<section id="accordionOverview" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Accordion Navigation</h2>
            <p class="nds-section-description">Collapsible content panels for organizing information in a
                space-efficient manner</p>
        </div>
        <div class="nds-section-content">

            <!-- Basic Accordion Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Accordion</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='[["cardView", ".nds-accordion", "accordionStyle"],["noBg", ".demo-container", "containerBg"]]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["always-open", ".nds-accordion", "accordionBehavior"]'>
                            <span class="label">Always Open</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-lg", ".nds-accordion-btn", "sizeToggle"]'>
                            <span class="label">LG</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                            data-toggler='["nds-md", ".nds-accordion-btn", "sizeToggle"]'>
                            <span class="label">MD</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-sm", ".nds-accordion-btn", "sizeToggle"]'>
                            <span class="label">SM</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-accordion" id="basicAccordion">
                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-services">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                    aria-expanded="true" aria-controls="collapse-services">
                                    <span class="nds-accordion-title">Digital Government Services</span>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse show" id="collapse-services"
                                aria-labelledby="heading-services">
                                <div class="nds-accordion-body">
                                    <p>Explore our comprehensive digital government services designed to streamline your
                                        interactions with government agencies. From document processing to online
                                        applications, we provide secure and efficient digital solutions.</p>
                                    <ul>
                                        <li>Online permit applications</li>
                                        <li>Digital certificate issuance</li>
                                        <li>Tax filing and payment systems</li>
                                        <li>Citizen service portals</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-support">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn collapsed"
                                    type="button" aria-expanded="false" aria-controls="collapse-support">
                                    <span class="nds-accordion-title">Support and Documentation</span>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-support" aria-labelledby="heading-support">
                                <div class="nds-accordion-body">
                                    <p>Access comprehensive support resources and documentation to help you navigate our
                                        services effectively. Our support team is committed to providing you with the
                                        assistance you need.</p>
                                    <div class="support-options">
                                        <div class="support-item">
                                            <strong>Help Center:</strong> Browse our extensive knowledge base
                                        </div>
                                        <div class="support-item">
                                            <strong>Live Chat:</strong> Get immediate assistance from our support team
                                        </div>
                                        <div class="support-item">
                                            <strong>Email Support:</strong> Submit detailed inquiries via email
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-resources">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn collapsed"
                                    type="button" aria-expanded="false" aria-controls="collapse-resources">
                                    <span class="nds-accordion-title">Developer Resources</span>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-resources"
                                aria-labelledby="heading-resources">
                                <div class="nds-accordion-body">
                                    <p>Access developer tools, APIs, and resources to integrate with our services. Build
                                        innovative solutions using our comprehensive development platform.</p>
                                    <p>Available resources include API documentation, code samples, SDKs, and developer
                                        support forums.</p>
                                </div>
                            </div>
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
                            <button class="nds-btn nds-subtle nds-tab showMore"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                                <div class="nds-accordion" id="basicAccordion">
                                  <div class="nds-accordion-item">
                                    <h3 class="nds-accordion-header" id="heading-1">
                                      <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button" aria-expanded="true" aria-controls="collapse-1">
                                        <span class="nds-accordion-title">Accordion Item #1</span>
                                      </button>
                                    </h3>
                                    <div class="nds-accordion-collapse show" id="collapse-1" aria-labelledby="heading-1">
                                      <div class="nds-accordion-body">
                                        Content for the first accordion item goes here.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="nds-accordion-item">
                                    <h3 class="nds-accordion-header" id="heading-2">
                                      <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn collapsed" type="button" aria-expanded="false" aria-controls="collapse-2">
                                        <span class="nds-accordion-title">Accordion Item #2</span>
                                      </button>
                                    </h3>
                                    <div class="nds-accordion-collapse" id="collapse-2" aria-labelledby="heading-2">
                                      <div class="nds-accordion-body">
                                        Content for the second accordion item goes here.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Icon Accordion Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Accordion with Leading Icons</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='[["cardView", ".nds-accordion", "accordionStyle"],["noBg", ".demo-container", "containerBg"]]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["always-open", ".nds-accordion", "accordionBehavior"]'>
                            <span class="label">Always Open</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-lg", ".nds-accordion-btn", "sizeToggle"]'>
                            <span class="label">LG</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                            data-toggler='["nds-md", ".nds-accordion-btn", "sizeToggle"]'>
                            <span class="label">MD</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-sm", ".nds-accordion-btn", "sizeToggle"]'>
                            <span class="label">SM</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-accordion" id="iconAccordion">
                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-account">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                    aria-expanded="true" aria-controls="collapse-account">
                                    <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-user-circle"></i>
                                    <span class="nds-accordion-title">Account Management</span>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse show" id="collapse-account"
                                aria-labelledby="heading-account">
                                <div class="nds-accordion-body">
                                    <p>Manage your government account settings, update personal information, and control
                                        your privacy preferences. Your account is the central hub for all your
                                        government service interactions.</p>
                                    <div class="account-features">
                                        <div class="nds-btn nds-secondary-outline feature-item">
                                            <i class="hgi hgi-stroke hgi-settings-01"></i>
                                            <span>Profile Settings</span>
                                        </div>
                                        <div class="nds-btn nds-secondary-outline feature-item">
                                            <i class="hgi hgi-stroke hgi-shield-01"></i>
                                            <span>Security Settings</span>
                                        </div>
                                        <div class="nds-btn nds-secondary-outline feature-item">
                                            <i class="hgi hgi-stroke hgi-notification-01"></i>
                                            <span>Notification Preferences</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-documents">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn collapsed"
                                    type="button" aria-expanded="false" aria-controls="collapse-documents">
                                    <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-file-02"></i>
                                    <span class="nds-accordion-title">Document Services</span>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-documents"
                                aria-labelledby="heading-documents">
                                <div class="nds-accordion-body">
                                    <p>Access and manage your official documents, request new certificates, and track
                                        the status of your applications.</p>
                                    <ul>
                                        <li>Birth and marriage certificates</li>
                                        <li>Business licenses and permits</li>
                                        <li>Educational transcripts and diplomas</li>
                                        <li>Health and vaccination records</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-payments">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn collapsed"
                                    type="button" aria-expanded="false" aria-controls="collapse-payments">
                                    <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-credit-card-pos"></i>
                                    <span class="nds-accordion-title">Payment Services</span>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-payments"
                                aria-labelledby="heading-payments">
                                <div class="nds-accordion-body">
                                    <p>Make secure payments for government services, view payment history, and set up
                                        automatic payments for recurring fees.</p>
                                    <p>We support multiple payment methods including credit cards, bank transfers, and
                                        digital wallets, all processed through secure, government-approved payment
                                        gateways.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-icons-1" id="tab-icons-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                            <button class="nds-btn nds-subtle nds-tab showMore"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icons-1"
                            aria-labelledby="tab-icons-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-accordion" id="iconAccordion">
                                  <div class="nds-accordion-item">
                                    <h3 class="nds-accordion-header" id="heading-1">
                                      <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button" aria-expanded="true" aria-controls="collapse-1">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-user-circle"></i>
                                        <span class="nds-accordion-title">Accordion with Icon</span>
                                      </button>
                                    </h3>
                                    <div class="nds-accordion-collapse show" id="collapse-1" aria-labelledby="heading-1">
                                      <div class="nds-accordion-body">
                                        Content with leading icon accordion item.
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
</section>

<!-- Accessibility Guidelines -->
<section id="accordionAccessibility" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Accessibility Guidelines</h2>
            <p class="nds-section-description">Proper ARIA implementation for accessible accordion navigation</p>
        </div>
        <div class="nds-section-content">
            <div class="accessibility-info">
                <h3>Required Elements & ARIA Attributes</h3>
                <ul>
                    <li><code>&lt;button&gt;</code> - Clickable accordion trigger</li>
                    <li><code>aria-expanded</code> - Indicates if accordion panel is open/closed</li>
                    <li><code>aria-controls</code> - Links button to its collapsible panel</li>
                    <li><code>aria-labelledby</code> - Links panel to its header button</li>
                    <li><code>type="button"</code> - Prevents form submission if inside forms</li>
                    <li><code>id</code> attributes - Required for proper ARIA relationships</li>
                </ul>

                <h3>Keyboard Navigation</h3>
                <ul>
                    <li><kbd>Tab</kbd> - Move focus between accordion buttons</li>
                    <li><kbd>Enter/Space</kbd> - Toggle focused accordion panel</li>
                    <li><kbd>Home</kbd> - Move focus to first accordion button</li>
                    <li><kbd>End</kbd> - Move focus to last accordion button</li>
                    <li><kbd>Up/Down Arrow</kbd> - Navigate between accordion buttons (optional)</li>
                </ul>

                <h3>Behavior Modes</h3>
                <ul>
                    <li><strong>Default:</strong> Only one panel open at a time with flush styling (no borders/shadows)
                    </li>
                    <li><strong>Always Open:</strong> Multiple panels can be open simultaneously</li>
                    <li><strong>Card View:</strong> Add borders, shadows, and rounded corners for card-like appearance
                    </li>
                </ul>

                <h3>Best Practices</h3>
                <ul>
                    <li><strong>Semantic Headers:</strong> Use appropriate heading levels (h2, h3, etc.)</li>
                    <li><strong>Descriptive Titles:</strong> Make accordion titles clear and meaningful</li>
                    <li><strong>Loading States:</strong> Indicate when content is being loaded</li>
                    <li><strong>Icon Consistency:</strong> Use consistent chevron/arrow icons for visual cues</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- JavaScript Documentation Section -->
<section id="accordionJavaScript" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript Integration</h2>
            <p class="nds-section-description">Complete accordion functionality with automatic initialization and
                programmatic control</p>
        </div>

        <div class="nds-section-content">
            <h3>Automatic Initialization</h3>
            <p>Accordions initialize automatically on page load. Just add the HTML structure with the .nds-accordion
                class.</p>

            <div class="nds-code">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-html">// Accordions initialize automatically on page load
// Just add the HTML structure with .nds-accordion class

<div class="nds-accordion">
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header">
      <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" 
              aria-expanded="false" aria-controls="panel-1">
        <span class="nds-accordion-title">Panel Title</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="panel-1">
      <div class="nds-accordion-body">
        Panel content goes here...
      </div>
    </div>
  </div>
</div></code>
            </div>

            <h3>Dynamic Content Handling</h3>
            <p>After adding accordion HTML dynamically, reinitialize to activate new accordions.</p>

            <div class="nds-code">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript">// After adding accordion HTML dynamically
document.getElementById('container').innerHTML = accordionHTML;

// Reinitialize to activate new accordions
NDSAccordion.reinit();

// Or initialize a specific accordion
const newAccordion = document.querySelector('#newAccordion');
const instance = NDSAccordion.create(newAccordion);</code>
            </div>

            <h3>Programmatic Control</h3>
            <p>Control accordion programmatically using the public API methods.</p>

            <div class="nds-code">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript">// Get accordion instance
const accordion = document.querySelector('.nds-accordion');
const instance = accordion.ndsAccordionInstance;

// Control specific items
instance.openItem(0);      // Open first item
instance.closeItem(1);     // Close second item  
instance.toggleItem(2);    // Toggle third item
instance.closeAll();       // Close all items

// Get current state
const openItems = instance.getOpenItems();
console.log(`${openItems.length} items are currently open`);</code>
            </div>

            <h3>Event Handling</h3>
            <p>Listen for accordion events to track user interactions and implement custom behaviors.</p>

            <div class="nds-code">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript">// Listen for accordion events
document.addEventListener('nds:accordion:shown', (e) => {
    console.log('Accordion item opened:', e.detail.index);
    console.log('Button:', e.detail.button);
    console.log('Panel:', e.detail.collapse);
    
    // Analytics tracking
    gtag('event', 'accordion_open', {
        'accordion_title': e.detail.button.textContent.trim()
    });
});

document.addEventListener('nds:accordion:hidden', (e) => {
    console.log('Accordion item closed:', e.detail.index);
    
    // Track close events
    gtag('event', 'accordion_close', {
        'accordion_title': e.detail.button.textContent.trim()  
    });
});</code>
            </div>

            <div class="accessibility-info">
                <h3>JavaScript Features</h3>
                <ul>
                    <li><strong>Automatic Initialization:</strong> All accordions initialize on page load automatically
                    </li>
                    <li><strong>Dynamic Content Support:</strong> Call <code>NDSAccordion.reinit()</code> after adding
                        new accordions</li>
                    <li><strong>Keyboard Navigation:</strong> Full ARIA-compliant keyboard support built-in</li>
                    <li><strong>Animation Control:</strong> Respects <code>prefers-reduced-motion</code> user
                        preferences</li>
                    <li><strong>Event System:</strong> Custom events for <code>shown</code> and <code>hidden</code>
                        states</li>
                    <li><strong>Public API:</strong> Programmatic control methods for all accordion operations</li>
                </ul>

                <h3>Configuration Options</h3>
                <ul>
                    <li><code>.always-open</code> class - Allow multiple panels open simultaneously</li>
                    <li><code>.cardView</code> class - Apply card styling with borders and shadows</li>
                    <li><code>aria-expanded="true"</code> - Set initial open state for specific panels</li>
                    <li><code>--nds-transition-speed</code> - CSS custom property to control animation speed</li>
                </ul>

                <h3>Browser Support</h3>
                <ul>
                    <li><strong>Modern Browsers:</strong> Chrome 60+, Firefox 60+, Safari 12+, Edge 79+</li>
                    <li><strong>Mobile:</strong> iOS Safari 12+, Chrome Mobile 60+</li>
                    <li><strong>Accessibility:</strong> Compatible with all major screen readers</li>
                    <li><strong>Performance:</strong> Optimized for smooth animations and minimal reflows</li>
                </ul>
            </div>
        </div>
    </div>
</section>