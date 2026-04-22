---
layout: page
title: Tabs
hero_title: Tabs - National Design System
hero_description: Group related content into a single surface where users switch between views without leaving the page
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Standard Tabs -->
<section id="tabsStandard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Tabs</h2>
            <p class="nds-section-description">The default text-only tab strip. Reach for this when labels alone are enough to distinguish the panels and you want the broadest layout flexibility across vertical, divider, and card views.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-vertical", ".nds-tabs", "tabLayout"]'>
                                <span class="nds-label">Vertical</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-tabs", "tabSize"]'>
                                <span class="nds-label">Large</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-divided", ".nds-tabs", "addDivider"]'>
                                <span class="nds-label">Divider</span>
                            </button>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Card View</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-tabs", "nds-cardView"]'>
                                            <span class="nds-label">None</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-tabs", "nds-cardView"],["nds-noBg", ".demo-container", "nds-cardView"]]'>
                                            <span class="nds-label">Full Container</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-tab-content", "nds-cardView"],["nds-noBg", ".demo-container", "nds-cardView"]]'>
                                            <span class="nds-label">Content Only</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-tabs" id="tabs-standard-1" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Basic tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tabs-standard-home" id="tab-tabs-standard-home" tabindex="0" data-label="Home">
                                        <span class="nds-label">Home</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-services" id="tab-tabs-standard-services" tabindex="-1"
                                        data-label="Services">
                                        <span class="nds-label">Services</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-about" id="tab-tabs-standard-about" tabindex="-1">
                                        <span class="nds-label">About</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-contact" id="tab-tabs-standard-contact" tabindex="-1">
                                        <span class="nds-label">Contact</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-support" id="tab-tabs-standard-support" tabindex="-1">
                                        <span class="nds-label">Support</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-resources" id="tab-tabs-standard-resources" tabindex="-1">
                                        <span class="nds-label">Resources</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-documentation" id="tab-tabs-standard-documentation" tabindex="-1">
                                        <span class="nds-label">Documentation</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-news" id="tab-tabs-standard-news" tabindex="-1">
                                        <span class="nds-label">News</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-feedback" id="tab-tabs-standard-feedback" tabindex="-1">
                                        <span class="nds-label">Feedback</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-standard-settings" id="tab-tabs-standard-settings" tabindex="-1">
                                        <span class="nds-label">Settings</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-home" aria-labelledby="tab-tabs-standard-home"
                                    tabindex="0">
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Welcome</h3>
                                        <p>Welcome to our platform. Here you'll find the latest updates and important
                                            information about our services and offerings.</p>
                                        <p>This is the main dashboard where users can quickly access key features and get an
                                            overview of their account status.</p>
                                    </div>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Getting Started</h3>
                                        <p>Explore the available services, review your recent activity, or configure your
                                            account preferences from the tabs above.</p>
                                        <ul>
                                            <li>Browse available government services</li>
                                            <li>Track your application status</li>
                                            <li>Manage your profile and notifications</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-services"
                                    aria-labelledby="tab-tabs-standard-services" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Our Services</h3>
                                        <p>We offer a comprehensive range of digital government services designed to make your
                                            life easier.</p>
                                        <ul>
                                            <li>Document Processing</li>
                                            <li>Online Applications</li>
                                            <li>Digital Certificates</li>
                                            <li>Support Services</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-about" aria-labelledby="tab-tabs-standard-about"
                                    aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">About Us</h3>
                                        <p>The National Design System is part of Saudi Arabia's digital transformation
                                            initiative, providing consistent and accessible user experiences across all
                                            government digital services.</p>
                                        <p>Our mission is to create unified, user-friendly interfaces that serve citizens
                                            efficiently and effectively.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-contact" aria-labelledby="tab-tabs-standard-contact"
                                    aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Contact Information</h3>
                                        <p>Get in touch with us through the following channels:</p>
                                        <p><strong>Email:</strong> support@nds.gov.sa</p>
                                        <p><strong>Phone:</strong> 920-000-000</p>
                                        <p><strong>Address:</strong> National Design System, Riyadh, Saudi Arabia</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-support" aria-labelledby="tab-tabs-standard-support"
                                    aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Support Center</h3>
                                        <p>Find help and assistance with our comprehensive support resources.</p>
                                        <ul>
                                            <li>Technical Documentation</li>
                                            <li>FAQ Section</li>
                                            <li>Live Chat Support</li>
                                            <li>Video Tutorials</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-resources"
                                    aria-labelledby="tab-tabs-standard-resources" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Resources</h3>
                                        <p>Access downloadable resources and tools for developers and designers.</p>
                                        <p>Browse our collection of design assets, code snippets, and implementation guides.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-documentation"
                                    aria-labelledby="tab-tabs-standard-documentation" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Documentation</h3>
                                        <p>Comprehensive documentation for the National Design System components and guidelines.</p>
                                        <p>Learn how to implement and customize components according to government standards.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-news" aria-labelledby="tab-tabs-standard-news"
                                    aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Latest News</h3>
                                        <p>Stay updated with the latest announcements and updates from the design system team.</p>
                                        <p>New component releases, feature updates, and important notices are published here.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-feedback"
                                    aria-labelledby="tab-tabs-standard-feedback" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Feedback</h3>
                                        <p>We value your feedback and suggestions for improving the design system.</p>
                                        <p>Submit your ideas, report issues, or share your experience with our components.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-standard-settings"
                                    aria-labelledby="tab-tabs-standard-settings" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Settings</h3>
                                        <p>Configure your preferences and customize your experience with the design system.</p>
                                        <p>Adjust theme settings, language preferences, and accessibility options.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-tabs-standard-code-1" id="tab-tabs-standard-code-1">
                                    <span class="nds-label">HTML</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-tabs-standard-code-1"
                                aria-labelledby="tab-tabs-standard-code-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-tabs" hidden&gt;
    &lt;div class="nds-tab-list-container nds-scroll-more"&gt;
        &lt;nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Basic tab navigation"&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                aria-controls="panel-home" id="tab-home" tabindex="0" data-label="Home"&gt;
                &lt;span class="nds-label"&gt;Home&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-services" id="tab-services" tabindex="-1"
                data-label="Services"&gt;
                &lt;span class="nds-label"&gt;Services&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-about" id="tab-about" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;About&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-contact" id="tab-contact" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;Contact&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-support" id="tab-support" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;Support&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-resources" id="tab-resources" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;Resources&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-documentation" id="tab-documentation" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;Documentation&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-news" id="tab-news" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;News&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-feedback" id="tab-feedback" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;Feedback&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-settings" id="tab-settings" tabindex="-1"&gt;
                &lt;span class="nds-label"&gt;Settings&lt;/span&gt;
            &lt;/button&gt;
        &lt;/nav&gt;
        &lt;button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"&gt;
            &lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
    &lt;div class="nds-tab-content"&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-home" aria-labelledby="tab-home"
            tabindex="0"&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Welcome&lt;/h3&gt;
                &lt;p&gt;Welcome to our platform. Here you'll find the latest updates and important
                    information about our services and offerings.&lt;/p&gt;
                &lt;p&gt;This is the main dashboard where users can quickly access key features and get an
                    overview of their account status.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Getting Started&lt;/h3&gt;
                &lt;p&gt;Explore the available services, review your recent activity, or configure your
                    account preferences from the tabs above.&lt;/p&gt;
                &lt;ul&gt;
                    &lt;li&gt;Browse available government services&lt;/li&gt;
                    &lt;li&gt;Track your application status&lt;/li&gt;
                    &lt;li&gt;Manage your profile and notifications&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-services"
            aria-labelledby="tab-services" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Our Services&lt;/h3&gt;
                &lt;p&gt;We offer a comprehensive range of digital government services designed to make your
                    life easier.&lt;/p&gt;
                &lt;ul&gt;
                    &lt;li&gt;Document Processing&lt;/li&gt;
                    &lt;li&gt;Online Applications&lt;/li&gt;
                    &lt;li&gt;Digital Certificates&lt;/li&gt;
                    &lt;li&gt;Support Services&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-about" aria-labelledby="tab-about"
            aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;About Us&lt;/h3&gt;
                &lt;p&gt;The National Design System is part of Saudi Arabia's digital transformation
                    initiative, providing consistent and accessible user experiences across all
                    government digital services.&lt;/p&gt;
                &lt;p&gt;Our mission is to create unified, user-friendly interfaces that serve citizens
                    efficiently and effectively.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-contact" aria-labelledby="tab-contact"
            aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Contact Information&lt;/h3&gt;
                &lt;p&gt;Get in touch with us through the following channels:&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Email:&lt;/strong&gt; support@nds.gov.sa&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Phone:&lt;/strong&gt; 920-000-000&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Address:&lt;/strong&gt; National Design System, Riyadh, Saudi Arabia&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-support" aria-labelledby="tab-support"
            aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Support Center&lt;/h3&gt;
                &lt;p&gt;Find help and assistance with our comprehensive support resources.&lt;/p&gt;
                &lt;ul&gt;
                    &lt;li&gt;Technical Documentation&lt;/li&gt;
                    &lt;li&gt;FAQ Section&lt;/li&gt;
                    &lt;li&gt;Live Chat Support&lt;/li&gt;
                    &lt;li&gt;Video Tutorials&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-resources"
            aria-labelledby="tab-resources" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Resources&lt;/h3&gt;
                &lt;p&gt;Access downloadable resources and tools for developers and designers.&lt;/p&gt;
                &lt;p&gt;Browse our collection of design assets, code snippets, and implementation guides.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-documentation"
            aria-labelledby="tab-documentation" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Documentation&lt;/h3&gt;
                &lt;p&gt;Comprehensive documentation for the National Design System components and guidelines.&lt;/p&gt;
                &lt;p&gt;Learn how to implement and customize components according to government standards.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-news" aria-labelledby="tab-news"
            aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Latest News&lt;/h3&gt;
                &lt;p&gt;Stay updated with the latest announcements and updates from the design system team.&lt;/p&gt;
                &lt;p&gt;New component releases, feature updates, and important notices are published here.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-feedback"
            aria-labelledby="tab-feedback" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Feedback&lt;/h3&gt;
                &lt;p&gt;We value your feedback and suggestions for improving the design system.&lt;/p&gt;
                &lt;p&gt;Submit your ideas, report issues, or share your experience with our components.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-settings"
            aria-labelledby="tab-settings" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Settings&lt;/h3&gt;
                &lt;p&gt;Configure your preferences and customize your experience with the design system.&lt;/p&gt;
                &lt;p&gt;Adjust theme settings, language preferences, and accessibility options.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
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

<!-- Tabs with Icons -->
<section id="tabsIcons" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">With Leading Icons</h2>
            <p class="nds-section-description">Icons before each label help users scan and identify tabs quickly</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-vertical", ".nds-tabs", "tabLayout"]'>
                                <span class="nds-label">Vertical</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-divided", ".nds-tabs", "addDivider"]'>
                                <span class="nds-label">Divider</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-tab-list", "tabsAlign"]'>
                                <span class="nds-label">Center</span>
                            </button>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Card View</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-tabs", "nds-cardView"]'>
                                            <span class="nds-label">None</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-tabs", "nds-cardView"],["nds-noBg", ".demo-container", "nds-cardView"]]'>
                                            <span class="nds-label">Full Container</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-tab-content", "nds-cardView"],["nds-noBg", ".demo-container", "nds-cardView"]]'>
                                            <span class="nds-label">Content Only</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-tabs" id="tabs-icons-1" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Icon tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tabs-icons-dashboard" id="tab-tabs-icons-dashboard" tabindex="0">
                                        <i class="hgi hgi-stroke hgi-home-05"></i>
                                        <span class="nds-label">Dashboard</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-icons-analytics" id="tab-tabs-icons-analytics" tabindex="-1">
                                        <i class="hgi hgi-stroke hgi-analytics-01"></i>
                                        <span class="nds-label">Analytics</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-tabs-icons-settings" id="tab-tabs-icons-settings" tabindex="-1">
                                        <i class="hgi hgi-stroke hgi-settings-01"></i>
                                        <span class="nds-label">Settings</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-icons-dashboard"
                                    aria-labelledby="tab-tabs-icons-dashboard" tabindex="0">
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Dashboard</h3>
                                        <p>Your main dashboard with key metrics and quick access to important features.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-icons-analytics"
                                    aria-labelledby="tab-tabs-icons-analytics" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Analytics</h3>
                                        <p>Configure your analytics preferences and data visualization options.</p>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="panel-tabs-icons-settings"
                                    aria-labelledby="tab-tabs-icons-settings" aria-hidden="true" tabindex="-1" hidden>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Settings</h3>
                                        <p>Configure your preferences and manage your account settings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-tabs-icons-code-1" id="tab-tabs-icons-code-1">
                                    <span class="nds-label">HTML</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-tabs-icons-code-1"
                                aria-labelledby="tab-tabs-icons-code-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-tabs" hidden&gt;
    &lt;div class="nds-tab-list-container nds-scroll-more"&gt;
        &lt;nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Icon tab navigation"&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                aria-controls="panel-dashboard" id="tab-dashboard" tabindex="0"&gt;
                &lt;i class="hgi hgi-stroke hgi-home-05"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Dashboard&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-analytics" id="tab-analytics" tabindex="-1"&gt;
                &lt;i class="hgi hgi-stroke hgi-analytics-01"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Analytics&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                aria-controls="panel-settings" id="tab-settings" tabindex="-1"&gt;
                &lt;i class="hgi hgi-stroke hgi-settings-01"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Settings&lt;/span&gt;
            &lt;/button&gt;
        &lt;/nav&gt;
        &lt;button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"&gt;
            &lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
    &lt;div class="nds-tab-content"&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-dashboard"
            aria-labelledby="tab-dashboard" tabindex="0"&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Dashboard&lt;/h3&gt;
                &lt;p&gt;Your main dashboard with key metrics and quick access to important features.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-analytics"
            aria-labelledby="tab-analytics" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Analytics&lt;/h3&gt;
                &lt;p&gt;Configure your analytics preferences and data visualization options.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-tab-panel" role="tabpanel" id="panel-settings"
            aria-labelledby="tab-settings" aria-hidden="true" tabindex="-1" hidden&gt;
            &lt;div class="nds-block"&gt;
                &lt;h3 class="nds-block-title"&gt;Settings&lt;/h3&gt;
                &lt;p&gt;Configure your preferences and manage your account settings.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
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
<section id="tabsFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-tabs</code> is on the page. Tab switching, keyboard handling, and scroll behavior attach automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Full Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Arrow keys move between tabs, Home and End jump to first and last, and Enter or Space activates the focused tab.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-flip-horizontal"></i>
                        <span class="nds-label">RTL-Aware Navigation</span>
                    </span>
                    <p class="nds-item-desc">Arrow key direction reverses automatically in RTL layouts so navigation always feels natural to the reading direction.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
                        <span class="nds-label">Overflow Scrolling</span>
                    </span>
                    <p class="nds-item-desc">Long tab lists scroll horizontally with gradient fade indicators, drag-to-scroll, mouse wheel support, and a show-more button.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-left"></i>
                        <span class="nds-label">Vertical Layout</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-vertical</code> for a side-stacked tab list with sticky positioning and vertical indicator bars.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-access"></i>
                        <span class="nds-label">High Contrast and Reduced Motion</span>
                    </span>
                    <p class="nds-item-desc">Enhanced borders appear in high-contrast mode, and all transitions are disabled when the user prefers reduced motion.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-notification-square"></i>
                        <span class="nds-label">Tab Change Events</span>
                    </span>
                    <p class="nds-item-desc">Every tab switch dispatches an <code class="nds-inline-code lang-js">nds:tab:change</code> event with the new and previous tab and panel references.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Switch tabs, query the active panel, or destroy instances through the JS API on <code class="nds-inline-code lang-js">NDS.Tabs</code> or each element's <code class="nds-inline-code lang-js">.ndsTabs</code> property.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="tabsGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use tabs to organize related content that users access one section at a time, such as settings categories, service details, or dashboard views</li>
                    <li>Use tabs for content that benefits from quick comparison, where switching between panels helps users evaluate options without leaving the page</li>
                    <li>Use <strong>vertical tabs</strong> when the tab list is long or when labels need more space, such as multi-step configuration panels or category navigation</li>
                    <li>Do not use tabs for sequential workflows where the user must complete steps in order. Use a <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a> instead</li>
                    <li>Do not use tabs for simple content that fits on one page without segmentation. Unnecessary tabs add interaction cost</li>
                    <li>Choose <strong>card view</strong> when tabs appear inside a content area that already has a background, to visually contain the tab group</li>
                    <li>Add the <strong>divider</strong> modifier when you need a clear visual boundary between the tab list and the panel content</li>
                    <li>Keep tab labels short (one to three words). Long labels cause excessive scrolling in horizontal layouts</li>
                    <li>Add icons to tabs when they represent distinct categories that benefit from visual differentiation, but avoid icons on text-heavy labels where they add clutter</li>
                    <li>Aim for three to seven visible tabs. Beyond that, the overflow scroll mechanism handles the rest, but users may not discover hidden tabs easily</li>
                    <li>Structure tab panel content using <code class="nds-inline-code lang-html">nds-block</code> with <code class="nds-inline-code lang-html">nds-block-title</code> headings. Multiple content blocks per panel create clear visual sections within a single tab</li>
                    <li>Place the most frequently accessed tab first, as it becomes the default active panel on page load</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-vertical</code></td>
                            <td>Switches to a side-stacked vertical tab layout with sticky positioning</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-divided</code></td>
                            <td>Adds a divider line between the tab list and panel content</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-center</code></td>
                            <td>Centers the tab list horizontally within the container</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-lg</code></td>
                            <td>Increases tab button height for a larger touch target</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-card nds-stroke nds-shadow</code></td>
                            <td>Wraps the tab group in a card container with border and shadow</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--scroll-fade</code></td>
                            <td>48px</td>
                            <td>Width of the gradient fade at the edges of an overflowing tab list (set on the inner <code class="nds-inline-code lang-html">.nds-scroll-more</code>)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--btn-indicator-size</code></td>
                            <td>3px</td>
                            <td>Thickness of the active tab indicator bar and divider line</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Tabs</strong> API provides methods to create, switch, and query tab instances. Each initialized <code class="nds-inline-code lang-html">.nds-tabs</code> element stores its instance on the <code class="nds-inline-code lang-js">.ndsTabs</code> DOM property.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Global API ──────────────────────────────────────
NDS.Tabs.init();                // Re-scan page and initialize new .nds-tabs elements
NDS.Tabs.reinit();              // Alias for init(), useful after dynamic content changes
NDS.Tabs.create(container);     // Create and return a new NDSTabs instance for a DOM element

// ── Instance API ────────────────────────────────────
// Access via element.ndsTabs
const tabs = document.querySelector('#myTabs').ndsTabs;

tabs.switchTo(2);               // Switch to the third tab (zero-based index)
tabs.getActiveTabIndex();       // Returns the current active tab index
tabs.getActiveTab();            // Returns the active tab button element
tabs.getActivePanel();          // Returns the active panel element
tabs.destroy();                 // Remove all event listeners and clean up

// ── Custom Event ────────────────────────────────────
// Dispatched on the .nds-tabs container element, bubbles up
document.addEventListener('nds:tab:change', (e) =&gt; {
    e.detail.tabIndex;          // New active tab index (number)
    e.detail.tab;               // New active tab button element
    e.detail.panel;             // New active panel element
    e.detail.previousTab;       // Previously active tab button element
    e.detail.previousPanel;     // Previously active panel element
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
