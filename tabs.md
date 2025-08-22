---
layout: page
title: Tabs
hero_title: Tab Components - National Design System
hero_description: Interactive tab navigation components with proper ARIA accessibility and content switching
breadcrumb: ["Components", "Tabs"]
lang: en
direction: ltr
---

<!-- Tab Examples Overview -->
<section id="tabsOverview" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tab Navigation</h2>
            <p class="nds-section-description">Interactive tabs for organizing and switching between different content
                sections</p>
        </div>
        <div class="nds-section-content">

            <!-- Basic Tabs Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Tabs</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='[["nds-vertical-tabs", ".nds-tabs", "tabLayout"], ["oneRowContent", ".nds-tab-list", "VerticalTabs"]]'>
                            <span class="label">Vertical</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='[["cardView", ".nds-tabs", "cardView"],["noBg", ".demo-container", "cardView"]]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["withDivider", ".nds-tabs", "addDivider"]'>
                            <span class="label">Divider</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["center", ".nds-tab-list", "tabsAlign"]'>
                            <span class="label">Center</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-tabs" id="basicTabs">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Basic tab navigation">
                                <button class="nds-tab" role="tab" aria-selected="true" aria-controls="panel-home"
                                    id="tab-home" tabindex="0" data-label="Home">
                                    <span class="nds-tab-label">Home</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-services"
                                    id="tab-services" tabindex="-1" data-label="Services">
                                    <span class="nds-tab-label">Services</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-about"
                                    id="tab-about" tabindex="-1">
                                    <span class="nds-tab-label">About</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-contact"
                                    id="tab-contact" tabindex="-1">
                                    <span class="nds-tab-label">Contact</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-support"
                                    id="tab-support" tabindex="-1">
                                    <span class="nds-tab-label">Support</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-resources"
                                    id="tab-resources" tabindex="-1">
                                    <span class="nds-tab-label">Resources</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-documentation" id="tab-documentation" tabindex="-1">
                                    <span class="nds-tab-label">Documentation</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-news"
                                    id="tab-news" tabindex="-1">
                                    <span class="nds-tab-label">News</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-feedback"
                                    id="tab-feedback" tabindex="-1">
                                    <span class="nds-tab-label">Feedback</span>
                                </button>
                                <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-settings"
                                    id="tab-settings" tabindex="-1">
                                    <span class="nds-tab-label">Settings</span>
                                </button>
                                <button class="nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="panel-home" aria-labelledby="tab-home"
                                tabindex="0">
                                <h3>Home Content</h3>
                                <p>Welcome to our platform. Here you'll find the latest updates and important
                                    information about our services and offerings.</p>
                                <p>This is the main dashboard where users can quickly access key features and get an
                                    overview of their account status.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-services"
                                aria-labelledby="tab-services" tabindex="0">
                                <h3>Our Services</h3>
                                <p>We offer a comprehensive range of digital government services designed to make your
                                    life easier.</p>
                                <ul>
                                    <li>Document Processing</li>
                                    <li>Online Applications</li>
                                    <li>Digital Certificates</li>
                                    <li>Support Services</li>
                                </ul>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-about"
                                aria-labelledby="tab-about" tabindex="0">
                                <h3>About Us</h3>
                                <p>The National Design System is part of Saudi Arabia's digital transformation
                                    initiative, providing consistent and accessible user experiences across all
                                    government digital services.</p>
                                <p>Our mission is to create unified, user-friendly interfaces that serve citizens
                                    efficiently and effectively.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-contact"
                                aria-labelledby="tab-contact" tabindex="0">
                                <h3>Contact Information</h3>
                                <p>Get in touch with us through the following channels:</p>
                                <div class="contact-info">
                                    <p><strong>Email:</strong> support@nds.gov.sa</p>
                                    <p><strong>Phone:</strong> 920-000-000</p>
                                    <p><strong>Address:</strong> National Design System, Riyadh, Saudi Arabia</p>
                                </div>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-support"
                                aria-labelledby="tab-support" tabindex="0">
                                <h3>Support Center</h3>
                                <p>Find help and assistance with our comprehensive support resources.</p>
                                <ul>
                                    <li>Technical Documentation</li>
                                    <li>FAQ Section</li>
                                    <li>Live Chat Support</li>
                                    <li>Video Tutorials</li>
                                </ul>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-resources"
                                aria-labelledby="tab-resources" tabindex="0">
                                <h3>Resources</h3>
                                <p>Access downloadable resources and tools for developers and designers.</p>
                                <p>Browse our collection of design assets, code snippets, and implementation guides.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-documentation"
                                aria-labelledby="tab-documentation" tabindex="0">
                                <h3>Documentation</h3>
                                <p>Comprehensive documentation for the National Design System components and guidelines.
                                </p>
                                <p>Learn how to implement and customize components according to government standards.
                                </p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-news" aria-labelledby="tab-news"
                                tabindex="0">
                                <h3>Latest News</h3>
                                <p>Stay updated with the latest announcements and updates from the design system team.
                                </p>
                                <p>New component releases, feature updates, and important notices are published here.
                                </p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-feedback"
                                aria-labelledby="tab-feedback" tabindex="0">
                                <h3>Feedback</h3>
                                <p>We value your feedback and suggestions for improving the design system.</p>
                                <p>Submit your ideas, report issues, or share your experience with our components.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-settings"
                                aria-labelledby="tab-settings" tabindex="0">
                                <h3>Settings</h3>
                                <p>Configure your preferences and customize your experience with the design system.</p>
                                <p>Adjust theme settings, language preferences, and accessibility options.</p>
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
                    <code>&lt;div class="nds-tabs"&gt;
  &lt;div class="nds-tab-list-container"&gt;
    &lt;nav class="nds-tab-list" role="tablist" aria-label="Tab navigation"&gt;
      &lt;button class="nds-tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1"&gt;
        &lt;span class="nds-tab-label"&gt;Tab 1&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2"&gt;
        &lt;span class="nds-tab-label"&gt;Tab 2&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-tab showMore"&gt;&lt;i
        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/nav&gt;
  &lt;/div&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1"&gt;
      Content for tab 1
    &lt;/div&gt;
    &lt;div class="nds-tab-panel hidden" role="tabpanel" id="panel-2" aria-labelledby="tab-2"&gt;
      Content for tab 2
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code>
                </div>
            </div>

            <!-- Tabs with Icons -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Tabs with Icons</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='[["nds-vertical-tabs", ".nds-tabs", "tabLayout"], ["oneRowContent", ".nds-tab-list", "VerticalTabs"]]'>
                            <span class="label">Vertical</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='[["cardView", ".nds-tabs", "cardView"],["noBg", ".demo-container", "cardView"]]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["withDivider", ".nds-tabs", "addDivider"]'>
                            <span class="label">Divider</span>
                        </button>
                        <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                            data-toggler='["center", ".nds-tab-list", "tabsAlign"]'>
                            <span class="label">Center</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-tabs" id="iconTabs">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Icon tab navigation">
                                <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="true"
                                    aria-controls="panel-dashboard" id="tab-dashboard" tabindex="0">
                                    <i class="hgi hgi-stroke hgi-home-05"></i>
                                    <span class="nds-tab-label">Dashboard</span>
                                </button>
                                <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false"
                                    aria-controls="panel-analytics" id="tab-analytics" tabindex="-1">
                                    <i class="hgi hgi-stroke hgi-analytics-01"></i>
                                    <span class="nds-tab-label">Analytics</span>
                                </button>
                                <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false"
                                    aria-controls="panel-settings" id="tab-settings" tabindex="-1">
                                    <i class="hgi hgi-stroke hgi-settings-01"></i>
                                    <span class="nds-tab-label">Settings</span>
                                </button>
                                <button class="nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="panel-dashboard"
                                aria-labelledby="tab-dashboard" tabindex="0">
                                <h3>Dashboard</h3>
                                <p>Your main dashboard with key metrics and quick access to important features.</p>
                                <div class="dashboard-stats">
                                    <div class="stat-card">
                                        <div class="stat-number">2,847</div>
                                        <div class="stat-label">Total Applications</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-number">156</div>
                                        <div class="stat-label">Pending Reviews</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-number">98.2%</div>
                                        <div class="stat-label">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-analytics"
                                aria-labelledby="tab-analytics" tabindex="0">
                                <h3>Analytics</h3>
                                <p>Detailed analytics and reports to help you understand usage patterns and performance
                                    metrics.</p>
                                <p>View comprehensive data about user interactions, system performance, and service
                                    utilization.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-settings"
                                aria-labelledby="tab-settings" tabindex="0">
                                <h3>Settings</h3>
                                <p>Configure your preferences and manage your account settings.</p>
                                <div class="settings-options">
                                    <div class="setting-item">
                                        <label>Language Preference</label>
                                        <select>
                                            <option>العربية</option>
                                            <option>English</option>
                                        </select>
                                    </div>
                                    <div class="setting-item">
                                        <label>Notifications</label>
                                        <input type="checkbox" checked> Enable email notifications
                                    </div>
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
                    <code>&lt;div class="nds-tabs"&gt;
  &lt;div class="nds-tab-list-container"&gt;
    &lt;nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Icon tab navigation"&gt;
      &lt;button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1"&gt;
        &lt;i class="hgi hgi-stroke hgi-home-05"&gt;&lt;/i&gt;
        &lt;span class="nds-tab-label"&gt;Dashboard&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2"&gt;
        &lt;i class="hgi hgi-stroke hgi-analytics-01"&gt;&lt;/i&gt;
        &lt;span class="nds-tab-label"&gt;Analytics&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3"&gt;
        &lt;i class="hgi hgi-stroke hgi-settings-01"&gt;&lt;/i&gt;
        &lt;span class="nds-tab-label"&gt;Settings&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-tab showMore"&gt;&lt;i
        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/nav&gt;
  &lt;/div&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1"&gt;
      Content for dashboard tab
    &lt;/div&gt;
    &lt;div class="nds-tab-panel hidden" role="tabpanel" id="panel-2" aria-labelledby="tab-2"&gt;
      Content for analytics tab
    &lt;/div&gt;
    &lt;div class="nds-tab-panel hidden" role="tabpanel" id="panel-3" aria-labelledby="tab-3"&gt;
      Content for settings tab
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Accessibility Guidelines -->
<section id="tabsAccessibility" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Accessibility Guidelines</h2>
            <p class="nds-section-description">Proper ARIA implementation for accessible tab navigation</p>
        </div>
        <div class="nds-section-content">
            <div class="accessibility-info">
                <h3>Required Elements & ARIA Attributes</h3>
                <ul>
                    <li><code>&lt;nav&gt;</code> - Semantic navigation element for tab list</li>
                    <li><code>role="tablist"</code> - Container for tab buttons</li>
                    <li><code>role="tab"</code> - Individual tab buttons</li>
                    <li><code>role="tabpanel"</code> - Content panels</li>
                    <li><code>aria-selected</code> - Active state of tabs</li>
                    <li><code>aria-controls</code> - Links tab to its panel</li>
                    <li><code>aria-labelledby</code> - Links panel to its tab</li>
                    <li><code>aria-label</code> - Accessible name for tab navigation</li>
                    <li><code>tabindex</code> - Keyboard navigation control</li>
                </ul>

                <h3>Keyboard Navigation</h3>
                <ul>
                    <li><kbd>Left/Right Arrow</kbd> - Navigate between horizontal tabs (reversed in RTL)</li>
                    <li><kbd>Up/Down Arrow</kbd> - Navigate between tabs (primary navigation for vertical tabs)</li>
                    <li><kbd>Tab</kbd> - Move focus to active panel</li>
                    <li><kbd>Enter/Space</kbd> - Activate focused tab</li>
                    <li><kbd>Home</kbd> - Move to first tab</li>
                    <li><kbd>End</kbd> - Move to last tab</li>
                </ul>

                <h3>Horizontal vs Vertical Navigation</h3>
                <ul>
                    <li><strong>Horizontal Tabs:</strong> Use Left/Right arrows (reversed in RTL), Up/Down also work
                    </li>
                    <li><strong>Vertical Tabs:</strong> Use Up/Down arrows only, Left/Right are disabled</li>
                    <li><strong>Home/End:</strong> Always go to first/last tab regardless of orientation</li>
                </ul>

                <h3>RTL Support</h3>
                <ul>
                    <li><strong>Horizontal tabs:</strong> Left/Right arrows reversed for natural RTL navigation</li>
                    <li><strong>Vertical tabs:</strong> Up/Down arrows work the same in both directions</li>
                    <li><strong>Mobile responsive:</strong> Vertical tabs become horizontal on small screens</li>
                </ul>
            </div>
        </div>
    </div>
</section>