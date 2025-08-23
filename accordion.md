---
layout: page
title: Accordion
hero_title: Accordion Components - National Design System
hero_description: Collapsible accordion components for organizing content with proper ARIA accessibility and smooth animations
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
            <p class="nds-section-description">Collapsible content panels for organizing information in a space-efficient manner</p>
        </div>
        <div class="nds-section-content">

            <!-- Basic Accordion Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Accordion</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["cardView", ".nds-accordion", "accordionStyle"]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["always-open", ".nds-accordion", "accordionBehavior"]'>
                            <span class="label">Always Open</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-accordion" id="basicAccordion">
                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-services">
                                <button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion" type="button" aria-expanded="true" aria-controls="collapse-services">
                                    <span class="nds-accordion-title">Digital Government Services</span>
                                    <i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"></i>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse show" id="collapse-services" aria-labelledby="heading-services">
                                <div class="nds-accordion-body">
                                    <p>Explore our comprehensive digital government services designed to streamline your interactions with government agencies. From document processing to online applications, we provide secure and efficient digital solutions.</p>
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
                                <button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion collapsed" type="button" aria-expanded="false" aria-controls="collapse-support">
                                    <span class="nds-accordion-title">Support and Documentation</span>
                                    <i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"></i>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-support" aria-labelledby="heading-support">
                                <div class="nds-accordion-body">
                                    <p>Access comprehensive support resources and documentation to help you navigate our services effectively. Our support team is committed to providing you with the assistance you need.</p>
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
                                <button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion collapsed" type="button" aria-expanded="false" aria-controls="collapse-resources">
                                    <span class="nds-accordion-title">Developer Resources</span>
                                    <i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"></i>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-resources" aria-labelledby="heading-resources">
                                <div class="nds-accordion-body">
                                    <p>Access developer tools, APIs, and resources to integrate with our services. Build innovative solutions using our comprehensive development platform.</p>
                                    <p>Available resources include API documentation, code samples, SDKs, and developer support forums.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="code-example">
                    <div class="usage-header">
                        <span>Usage</span>
                        <button class="copy-btn">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <code>&lt;div class="nds-accordion" id="basicAccordion"&gt;
  &lt;div class="nds-accordion-item"&gt;
    &lt;h3 class="nds-accordion-header" id="heading-1"&gt;
      &lt;button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion" type="button" aria-expanded="true" aria-controls="collapse-1"&gt;
        &lt;span class="nds-accordion-title"&gt;Accordion Item #1&lt;/span&gt;
        &lt;i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/h3&gt;
    &lt;div class="nds-accordion-collapse show" id="collapse-1" aria-labelledby="heading-1"&gt;
      &lt;div class="nds-accordion-body"&gt;
        Content for the first accordion item goes here.
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-accordion-item"&gt;
    &lt;h3 class="nds-accordion-header" id="heading-2"&gt;
      &lt;button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion collapsed" type="button" aria-expanded="false" aria-controls="collapse-2"&gt;
        &lt;span class="nds-accordion-title"&gt;Accordion Item #2&lt;/span&gt;
        &lt;i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/h3&gt;
    &lt;div class="nds-accordion-collapse" id="collapse-2" aria-labelledby="heading-2"&gt;
      &lt;div class="nds-accordion-body"&gt;
        Content for the second accordion item goes here.
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code>
                </div>
            </div>

            <!-- Icon Accordion Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Accordion with Leading Icons</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["cardView", ".nds-accordion", "accordionStyle"]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["always-open", ".nds-accordion", "accordionBehavior"]'>
                            <span class="label">Always Open</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-accordion" id="iconAccordion">
                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-account">
                                <button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion" type="button" aria-expanded="true" aria-controls="collapse-account">
                                    <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-user-circle"></i>
                                    <span class="nds-accordion-title">Account Management</span>
                                    <i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"></i>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse show" id="collapse-account" aria-labelledby="heading-account">
                                <div class="nds-accordion-body">
                                    <p>Manage your government account settings, update personal information, and control your privacy preferences. Your account is the central hub for all your government service interactions.</p>
                                    <div class="account-features">
                                        <div class="feature-item">
                                            <i class="hgi hgi-stroke hgi-settings-01"></i>
                                            <span>Profile Settings</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="hgi hgi-stroke hgi-shield-01"></i>
                                            <span>Security Settings</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="hgi hgi-stroke hgi-notification-01"></i>
                                            <span>Notification Preferences</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="nds-accordion-item">
                            <h3 class="nds-accordion-header" id="heading-documents">
                                <button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion collapsed" type="button" aria-expanded="false" aria-controls="collapse-documents">
                                    <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-file-02"></i>
                                    <span class="nds-accordion-title">Document Services</span>
                                    <i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"></i>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-documents" aria-labelledby="heading-documents">
                                <div class="nds-accordion-body">
                                    <p>Access and manage your official documents, request new certificates, and track the status of your applications.</p>
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
                                <button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion collapsed" type="button" aria-expanded="false" aria-controls="collapse-payments">
                                    <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-credit-card-01"></i>
                                    <span class="nds-accordion-title">Payment Services</span>
                                    <i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"></i>
                                </button>
                            </h3>
                            <div class="nds-accordion-collapse" id="collapse-payments" aria-labelledby="heading-payments">
                                <div class="nds-accordion-body">
                                    <p>Make secure payments for government services, view payment history, and set up automatic payments for recurring fees.</p>
                                    <p>We support multiple payment methods including credit cards, bank transfers, and digital wallets, all processed through secure, government-approved payment gateways.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="code-example">
                    <div class="usage-header">
                        <span>Usage</span>
                        <button class="copy-btn">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <code>&lt;div class="nds-accordion" id="iconAccordion"&gt;
  &lt;div class="nds-accordion-item"&gt;
    &lt;h3 class="nds-accordion-header" id="heading-1"&gt;
      &lt;button class="nds-btn nds-btn-subtle nds-btn-menu nds-btn-accordion" type="button" aria-expanded="true" aria-controls="collapse-1"&gt;
        &lt;i class="nds-accordion-leading-icon hgi hgi-stroke hgi-user-circle"&gt;&lt;/i&gt;
        &lt;span class="nds-accordion-title"&gt;Accordion with Icon&lt;/span&gt;
        &lt;i class="nds-accordion-icon hgi hgi-stroke hgi-chevron-down"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/h3&gt;
    &lt;div class="nds-accordion-collapse show" id="collapse-1" aria-labelledby="heading-1"&gt;
      &lt;div class="nds-accordion-body"&gt;
        Content with leading icon accordion item.
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code>
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
                    <li><strong>Default:</strong> Only one panel open at a time with flush styling (no borders/shadows)</li>
                    <li><strong>Always Open:</strong> Multiple panels can be open simultaneously</li>
                    <li><strong>Card View:</strong> Add borders, shadows, and rounded corners for card-like appearance</li>
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