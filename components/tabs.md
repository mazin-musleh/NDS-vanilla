---
layout: page
title: Tabs
hero_title: Tab Components - National Design System
hero_description: Interactive tab navigation components with proper ARIA accessibility and content switching
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Tab Examples Overview -->
<section id="tabsOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tab Navigation</h2>
            <p class="nds-section-description">Interactive tabs for organizing and switching between different content
                sections</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <!-- Basic Tabs Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Tabs</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-vertical", ".nds-tabs", "tabLayout"]'>
                            <span class="label">Vertical</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-tabs", "cardView"],["noBg", ".demo-container", "cardView"]]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-divided", ".nds-tabs", "addDivider"]'>
                            <span class="label">Divider</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-center", ".nds-tab-list", "tabsAlign"]'>
                            <span class="label">Center</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-tabs" id="basicTabs" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list" role="tablist" aria-label="Basic tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-home" id="tab-home" tabindex="0" data-label="Home">
                                    <span class="label">Home</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-services" id="tab-services" tabindex="-1"
                                    data-label="Services">
                                    <span class="label">Services</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-about" id="tab-about" tabindex="-1">
                                    <span class="label">About</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-contact" id="tab-contact" tabindex="-1">
                                    <span class="label">Contact</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-support" id="tab-support" tabindex="-1">
                                    <span class="label">Support</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-resources" id="tab-resources" tabindex="-1">
                                    <span class="label">Resources</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-documentation" id="tab-documentation" tabindex="-1">
                                    <span class="label">Documentation</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-news" id="tab-news" tabindex="-1">
                                    <span class="label">News</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-feedback" id="tab-feedback" tabindex="-1">
                                    <span class="label">Feedback</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-settings" id="tab-settings" tabindex="-1">
                                    <span class="label">Settings</span>
                                </button>
                            </nav>
                            <button class="nds-btn nds-subtle nds-tab showMore"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                            </button>
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
                            <div class="nds-tab-panel" role="tabpanel" id="panel-services"
                                aria-labelledby="tab-services" aria-hidden="true" tabindex="-1" hidden>
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
                            <div class="nds-tab-panel" role="tabpanel" id="panel-about" aria-labelledby="tab-about"
                                aria-hidden="true" tabindex="-1" hidden>
                                <h3>About Us</h3>
                                <p>The National Design System is part of Saudi Arabia's digital transformation
                                    initiative, providing consistent and accessible user experiences across all
                                    government digital services.</p>
                                <p>Our mission is to create unified, user-friendly interfaces that serve citizens
                                    efficiently and effectively.</p>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-contact" aria-labelledby="tab-contact"
                                aria-hidden="true" tabindex="-1" hidden>
                                <h3>Contact Information</h3>
                                <p>Get in touch with us through the following channels:</p>
                                <div class="contact-info">
                                    <p><strong>Email:</strong> support@nds.gov.sa</p>
                                    <p><strong>Phone:</strong> 920-000-000</p>
                                    <p><strong>Address:</strong> National Design System, Riyadh, Saudi Arabia</p>
                                </div>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-support" aria-labelledby="tab-support"
                                aria-hidden="true" tabindex="-1" hidden>
                                <h3>Support Center</h3>
                                <p>Find help and assistance with our comprehensive support resources.</p>
                                <ul>
                                    <li>Technical Documentation</li>
                                    <li>FAQ Section</li>
                                    <li>Live Chat Support</li>
                                    <li>Video Tutorials</li>
                                </ul>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-resources"
                                aria-labelledby="tab-resources" aria-hidden="true" tabindex="-1" hidden>
                                <h3>Resources</h3>
                                <p>Access downloadable resources and tools for developers and designers.</p>
                                <p>Browse our collection of design assets, code snippets, and implementation guides.</p>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-documentation"
                                aria-labelledby="tab-documentation" aria-hidden="true" tabindex="-1" hidden>
                                <h3>Documentation</h3>
                                <p>Comprehensive documentation for the National Design System components and guidelines.
                                </p>
                                <p>Learn how to implement and customize components according to government standards.
                                </p>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-news" aria-labelledby="tab-news"
                                aria-hidden="true" tabindex="-1" hidden>
                                <h3>Latest News</h3>
                                <p>Stay updated with the latest announcements and updates from the design system team.
                                </p>
                                <p>New component releases, feature updates, and important notices are published here.
                                </p>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-feedback"
                                aria-labelledby="tab-feedback" aria-hidden="true" tabindex="-1" hidden>
                                <h3>Feedback</h3>
                                <p>We value your feedback and suggestions for improving the design system.</p>
                                <p>Submit your ideas, report issues, or share your experience with our components.</p>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-settings"
                                aria-labelledby="tab-settings" aria-hidden="true" tabindex="-1" hidden>
                                <h3>Settings</h3>
                                <p>Configure your preferences and customize your experience with the design system.</p>
                                <p>Adjust theme settings, language preferences, and accessibility options.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-1" id="tab-1">
                                <span class="label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab showMore"><i
                                class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-1"
                            aria-labelledby="tab-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <div class="nds-tabs">
                                    <div class="nds-tab-list-container">
                                        <nav class="nds-tab-list" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                            aria-controls="panel-1" id="tab-1" tabindex="0">
                                            <span class="label">Tab 1</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                            aria-controls="panel-2" id="tab-2" tabindex="-1">
                                            <span class="label">Tab 2</span>
                                        </button>
                                        </nav>
                                        <button class="nds-btn nds-subtle nds-tab showMore">
                                            <i class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                        </button>
                                    </div>
                                    <div class="nds-tab-content">
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-1"
                                            aria-labelledby="tab-1" tabindex="0">
                                        Content for tab 1
                                        </div>
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-2"
                                            aria-labelledby="tab-2" aria-hidden="true" tabindex="-1" hidden>
                                        Content for tab 2
                                        </div>
                                    </div>
                                </div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs with Icons -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Tabs with Icons</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-vertical", ".nds-tabs", "tabLayout"]'>
                            <span class="label">Vertical</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-tabs", "cardView"],["noBg", ".demo-container", "cardView"]]'>
                            <span class="label">Card View</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-divided", ".nds-tabs", "addDivider"]'>
                            <span class="label">Divider</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-center", ".nds-tab-list", "tabsAlign"]'>
                            <span class="label">Center</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="nds-tabs" id="iconTabs" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list" role="tablist" aria-label="Icon tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-dashboard" id="tab-dashboard" tabindex="0">
                                    <i class="hgi hgi-stroke hgi-home-05"></i>
                                    <span class="label">Dashboard</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-analytics" id="tab-analytics" tabindex="-1">
                                    <i class="hgi hgi-stroke hgi-analytics-01"></i>
                                    <span class="label">Analytics</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-settings" id="tab-settings" tabindex="-1">
                                    <i class="hgi hgi-stroke hgi-settings-01"></i>
                                    <span class="label">Settings</span>
                                </button>
                        </nav>
                            <button class="nds-btn nds-subtle nds-tab showMore"><i
                                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                            </button>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="panel-dashboard"
                                aria-labelledby="tab-dashboard" tabindex="0">
                                <h3>Dashboard</h3>
                                <p>Your main dashboard with key metrics and quick access to important features.</p>
                                <div class="dashboard-stats">
                                    <div class="stat-card">
                                        <div class="stat-number nds-number-format nds-counter-value">2,847</div>
                                        <div class="stat-label">Total Applications</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-number nds-number-format nds-counter-value">156</div>
                                        <div class="stat-label">Pending Reviews</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-number"><span class="nds-counter-value">98</span><span
                                                class="suffix">.2%</span></div>
                                        <div class="stat-label">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-analytics"
                                aria-labelledby="tab-analytics" aria-hidden="true" tabindex="-1" hidden>
                                <h3>Analytics</h3>
                                <p>Configure your analytics preferences and data visualization options.</p>

                                <!-- Analytics Period Selection -->
                                <div class="nds-form-container nds-select">
                                    <div class="nds-form-header">
                                        <label class="label" for="analyticsPeriod">Analytics Period</label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="text" id="analyticsPeriod" class="nds-input nds-select-input"
                                            placeholder="Select time period..." value="Last 30 Days" readonly>
                                        <input type="hidden" name="analyticsPeriodValue" class="nds-select-value"
                                            value="30days">

                                        <!-- Custom Dropdown Menu -->
                                        <div class="nds-select-dropdown hidden">
                                            <div class="select-options">
                                                <button type="button" class="nds-btn nds-subtle select-option"
                                                    data-value="">
                                                    <span class="option-text">Select time period...</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle select-option"
                                                    data-value="7days">
                                                    <span class="option-text">Last 7 Days</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle select-option selected"
                                                    data-value="30days">
                                                    <span class="option-text">Last 30 Days</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle select-option"
                                                    data-value="90days">
                                                    <span class="option-text">Last 90 Days</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle select-option"
                                                    data-value="1year">
                                                    <span class="option-text">Last Year</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-form-footer"></div>
                                </div>

                                <!-- Analytics Data Types -->
                                <fieldset>
                                    <legend class="label">Data to Include</legend>
                                    <div class="nds-check-group">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="includeUsers">User Activity</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="includeUsers" name="analyticsData"
                                                    value="users" checked class="nds-check primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="includePerformance">System Performance</label>
                                                <span class="info">Response times, error rates, and system health
                                                    metrics</span>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="includePerformance" name="analyticsData"
                                                    value="performance" checked class="nds-check primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="includeServices">Service Usage</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="includeServices" name="analyticsData"
                                                    value="services" class="nds-check primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="includeErrors">Error Reports</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="includeErrors" name="analyticsData"
                                                    value="errors" class="nds-check primary">
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="nds-tab-panel" role="tabpanel" id="panel-settings"
                                aria-labelledby="tab-settings" aria-hidden="true" tabindex="-1" hidden>
                                <h3>Settings</h3>
                                <p>Configure your preferences and manage your account settings.</p>

                                <!-- Language Preference -->
                                <div class="nds-form-container nds-select">
                                    <div class="nds-form-header">
                                        <label class="label" for="languageSelect">Language Preference</label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="text" id="languageSelect" class="nds-input nds-select-input"
                                            placeholder="Select language..." value="English" readonly>
                                        <input type="hidden" name="languageSelectValue" class="nds-select-value"
                                            value="en">

                                        <!-- Custom Dropdown Menu -->
                                        <div class="nds-select-dropdown hidden">
                                            <div class="select-options">
                                                <button type="button" class="nds-btn nds-subtle select-option"
                                                    data-value="ar">
                                                    <span class="option-text">العربية</span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle select-option selected"
                                                    data-value="en">
                                                    <span class="option-text">English</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-form-footer"></div>
                                </div>

                                <!-- Theme Preference -->
                                <fieldset>
                                    <legend class="label">Theme Preference</legend>
                                    <div class="nds-radio-group">
                                        <div class="nds-form-container nds-radio-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="themeLight">Light Theme</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="radio" id="themeLight" name="themeGroup" value="light"
                                                    checked class="nds-radio primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-radio-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="themeDark">Dark Theme</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="radio" id="themeDark" name="themeGroup" value="dark"
                                                    class="nds-radio primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-radio-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="themeAuto">Auto (System)</label>
                                                <span class="info">Automatically adjusts based on your system
                                                    preferences</span>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="radio" id="themeAuto" name="themeGroup" value="auto"
                                                    class="nds-radio primary">
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <!-- Notification Settings -->
                                <fieldset>
                                    <legend class="label">Notification Settings</legend>
                                    <div class="nds-check-group">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="emailNotifications">Email
                                                    Notifications</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="emailNotifications"
                                                    name="notificationSettings" value="email" checked
                                                    class="nds-check primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="smsNotifications">SMS Notifications</label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="smsNotifications" name="notificationSettings"
                                                    value="sms" class="nds-check primary">
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-header">
                                                <label class="label" for="pushNotifications">Push Notifications</label>
                                                <span class="info">Receive instant notifications in your browser</span>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="pushNotifications"
                                                    name="notificationSettings" value="push" checked
                                                    class="nds-check primary">
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-icons-1" id="tab-icons-1">
                                <span class="label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab showMore"><i
                                class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-icons-1"
                            aria-labelledby="tab-icons-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                <div class="nds-tabs">
                                    <div class="nds-tab-list-container">
                                        <nav class="nds-tab-list" role="tablist" aria-label="Icon tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                            aria-controls="panel-1" id="tab-1" tabindex="0">
                                            <i class="hgi hgi-stroke hgi-home-05"></i>
                                            <span class="label">Dashboard</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                            aria-controls="panel-2" id="tab-2" tabindex="-1">
                                            <i class="hgi hgi-stroke hgi-analytics-01"></i>
                                            <span class="label">Analytics</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                            aria-controls="panel-3" id="tab-3" tabindex="-1">
                                            <i class="hgi hgi-stroke hgi-settings-01"></i>
                                            <span class="label">Settings</span>
                                        </button>
                                        </nav>
                                        <button class="nds-btn nds-subtle nds-tab showMore">
                                            <i class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                        </button>
                                    </div>
                                    <div class="nds-tab-content">
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-1"
                                            aria-labelledby="tab-1" tabindex="0">
                                        Content for dashboard tab
                                        </div>
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-2"
                                            aria-labelledby="tab-2" aria-hidden="true" tabindex="-1" hidden>
                                        Content for analytics tab
                                        </div>
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-3"
                                            aria-labelledby="tab-3" aria-hidden="true" tabindex="-1" hidden>
                                        Content for settings tab
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
</section>

<!-- Accessibility Guidelines -->
<section id="tabsAccessibility" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Accessibility Guidelines</h2>
            <p class="nds-section-description">Proper ARIA implementation for accessible tab navigation</p>
        </div>
        <div class="nds-section-content">
            <div class="accessibility-info">

                <h3>HTML Structure Requirements</h3>
                <dl class="nds-definition-list tableView">
                    <div class="nds-definition-item">
                        <dt><span class="label">&lt;nav&gt; element</span></dt>
                        <dd>Semantic navigation wrapper for the tab list</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">role="tablist"</span></dt>
                        <dd>Applied to the nav element containing tab buttons</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">role="tab"</span></dt>
                        <dd>Applied to each individual tab button</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">role="tabpanel"</span></dt>
                        <dd>Applied to each content panel associated with a tab</dd>
                    </div>
                </dl>

                <h3>Tab Button Attributes</h3>
                <dl class="nds-definition-list tableView">
                    <div class="nds-definition-item">
                        <dt><span class="label">aria-selected="true"</span></dt>
                        <dd>Marks the currently active tab (only one tab should have this)</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">aria-selected="false"</span></dt>
                        <dd>Applied to all inactive tabs</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">aria-controls</span></dt>
                        <dd>Links each tab to its corresponding panel ID</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">aria-label</span></dt>
                        <dd>Provides accessible name for the entire tab navigation</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">tabindex="0"</span></dt>
                        <dd>Applied to active tab to include it in keyboard tab order</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">tabindex="-1"</span></dt>
                        <dd>Applied to inactive tabs to remove them from keyboard tab order</dd>
                    </div>
                </dl>

                <h3>Tab Panel Visibility Pattern</h3>
                <p><strong>Hidden panels require three attributes:</strong></p>
                <dl class="nds-definition-list tableView">
                    <div class="nds-definition-item">
                        <dt><span class="label">aria-hidden="true"</span></dt>
                        <dd>Informs screen readers that the content is hidden and should be ignored</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">hidden</span></dt>
                        <dd>Native HTML boolean attribute that applies display: none</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">tabindex="-1"</span></dt>
                        <dd>Removes hidden panel from keyboard tab order</dd>
                    </div>
                </dl>

                <p><strong>Active panel attributes:</strong></p>
                <dl class="nds-definition-list tableView">
                    <div class="nds-definition-item">
                        <dt><span class="label">No aria-hidden</span></dt>
                        <dd>Omit the attribute entirely (don't use aria-hidden="false")</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">No hidden</span></dt>
                        <dd>Omit the hidden attribute to make the panel visible</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">tabindex="0"</span></dt>
                        <dd>Allows keyboard focus on the visible panel content</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">aria-labelledby</span></dt>
                        <dd>Links the panel back to its corresponding tab button ID</dd>
                    </div>
                </dl>

                <h3>Keyboard Navigation</h3>
                <dl class="nds-definition-list tableView">
                    <div class="nds-definition-item">
                        <dt><span class="label">Left/Right Arrow</span></dt>
                        <dd>Navigate between horizontal tabs (automatically reversed in RTL)</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">Up/Down Arrow</span></dt>
                        <dd>Navigate between tabs (primary navigation for vertical tabs)</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">Tab Key</span></dt>
                        <dd>Move keyboard focus from tabs to the active panel content</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">Enter / Space</span></dt>
                        <dd>Activate the currently focused tab</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">Home</span></dt>
                        <dd>Jump to the first tab (respects RTL in horizontal layouts)</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">End</span></dt>
                        <dd>Jump to the last tab (respects RTL in horizontal layouts)</dd>
                    </div>
                </dl>

                <h3>Layout-Specific Behavior</h3>
                <dl class="nds-definition-list tableView">
                    <div class="nds-definition-item">
                        <dt><span class="label">Horizontal Tabs</span></dt>
                        <dd>Left/Right arrows for navigation (reversed in RTL). Up/Down also work but Left/Right is
                            primary.</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">Vertical Tabs</span></dt>
                        <dd>Up/Down arrows only. Left/Right arrows are disabled in vertical layout.</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">RTL (Arabic)</span></dt>
                        <dd>Horizontal tabs: arrow keys reversed for natural navigation. Vertical tabs: no change.</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt><span class="label">Mobile Responsive</span></dt>
                        <dd>Vertical tabs automatically become horizontal on small screens for better usability.</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</section>