---
layout: page
title: Tabs
hero_title: Tab Components - National Design System
hero_description: Interactive tab navigation components with proper ARIA accessibility and content switching functionality
hero_image: /assets/img/sliderShapeGray.svg
breadcrumb: ["Components", "Tabs"]
lang: en
direction: ltr
---

<!-- Tab Examples Overview -->
<section id="tabsOverview" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tab Navigation</h2>
            <p class="nds-section-description">Interactive tabs for organizing and switching between different content sections</p>
        </div>
        <div class="nds-section-content">
            
            <!-- Basic Tabs Example -->
            <div class="nds-demo-card">
                <div class="demo-label">Basic Tabs</div>
                <div class="demo-container">
                    <div class="nds-tabs" id="basicTabs">
                        <nav class="nds-tab-list" role="tablist" aria-label="Basic tab navigation">
                            <button class="nds-tab" role="tab" aria-selected="true" aria-controls="panel-home" id="tab-home" tabindex="0">
                                <span class="nds-tab-label">Home</span>
                            </button>
                            <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-services" id="tab-services" tabindex="-1">
                                <span class="nds-tab-label">Services</span>
                            </button>
                            <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-about" id="tab-about" tabindex="-1">
                                <span class="nds-tab-label">About</span>
                            </button>
                            <button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-contact" id="tab-contact" tabindex="-1">
                                <span class="nds-tab-label">Contact</span>
                            </button>
                        </nav>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="panel-home" aria-labelledby="tab-home" tabindex="0">
                                <h3>Home Content</h3>
                                <p>Welcome to our platform. Here you'll find the latest updates and important information about our services and offerings.</p>
                                <p>This is the main dashboard where users can quickly access key features and get an overview of their account status.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-services" aria-labelledby="tab-services" tabindex="0">
                                <h3>Our Services</h3>
                                <p>We offer a comprehensive range of digital government services designed to make your life easier.</p>
                                <ul>
                                    <li>Document Processing</li>
                                    <li>Online Applications</li>
                                    <li>Digital Certificates</li>
                                    <li>Support Services</li>
                                </ul>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-about" aria-labelledby="tab-about" tabindex="0">
                                <h3>About Us</h3>
                                <p>The National Design System is part of Saudi Arabia's digital transformation initiative, providing consistent and accessible user experiences across all government digital services.</p>
                                <p>Our mission is to create unified, user-friendly interfaces that serve citizens efficiently and effectively.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-contact" aria-labelledby="tab-contact" tabindex="0">
                                <h3>Contact Information</h3>
                                <p>Get in touch with us through the following channels:</p>
                                <div class="contact-info">
                                    <p><strong>Email:</strong> support@digital.gov.sa</p>
                                    <p><strong>Phone:</strong> 920-000-000</p>
                                    <p><strong>Address:</strong> Digital Government Authority, Riyadh, Saudi Arabia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="code-example">
                    <div class="usage-header">
                        <span>Usage</span>
                        <button class="copy-btn" onclick="copyTabHTML(this)">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <pre><code>&lt;div class="nds-tabs"&gt;
  &lt;nav class="nds-tab-list" role="tablist" aria-label="Tab navigation"&gt;
    &lt;button class="nds-tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1"&gt;
      &lt;span class="nds-tab-label"&gt;Tab 1&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2"&gt;
      &lt;span class="nds-tab-label"&gt;Tab 2&lt;/span&gt;
    &lt;/button&gt;
  &lt;/nav&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1"&gt;
      Content for tab 1
    &lt;/div&gt;
    &lt;div class="nds-tab-panel hidden" role="tabpanel" id="panel-2" aria-labelledby="tab-2"&gt;
      Content for tab 2
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
                </div>
            </div>

            <!-- Tabs with Icons -->
            <div class="nds-demo-card">
                <div class="demo-label">Tabs with Icons</div>
                <div class="demo-container">
                    <div class="nds-tabs" id="iconTabs">
                        <nav class="nds-tab-list" role="tablist" aria-label="Icon tab navigation">
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="true" aria-controls="panel-dashboard" id="tab-dashboard" tabindex="0">
                                <i class="hgi hgi-stroke hgi-home-05"></i>
                                <span class="nds-tab-label">Dashboard</span>
                            </button>
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-analytics" id="tab-analytics" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-analytics-01"></i>
                                <span class="nds-tab-label">Analytics</span>
                            </button>
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-settings" id="tab-settings" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-settings-01"></i>
                                <span class="nds-tab-label">Settings</span>
                            </button>
                        </nav>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="panel-dashboard" aria-labelledby="tab-dashboard" tabindex="0">
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
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-analytics" aria-labelledby="tab-analytics" tabindex="0">
                                <h3>Analytics</h3>
                                <p>Detailed analytics and reports to help you understand usage patterns and performance metrics.</p>
                                <p>View comprehensive data about user interactions, system performance, and service utilization.</p>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-settings" aria-labelledby="tab-settings" tabindex="0">
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
            </div>

            <!-- Vertical Tabs -->
            <div class="nds-demo-card">
                <div class="demo-label">Vertical Tabs</div>
                <div class="demo-container">
                    <div class="nds-tabs nds-tabs-vertical" id="verticalTabs">
                        <nav class="nds-tab-list" role="tablist" aria-label="Vertical tab navigation" aria-orientation="vertical">
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="true" aria-controls="panel-profile" id="tab-profile" tabindex="0">
                                <i class="hgi hgi-stroke hgi-user-01"></i>
                                <span class="nds-tab-label">Profile Settings</span>
                            </button>
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-security" id="tab-security" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-lock-01"></i>
                                <span class="nds-tab-label">Security & Privacy</span>
                            </button>
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-notifications" id="tab-notifications" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-notification-02"></i>
                                <span class="nds-tab-label">Notifications</span>
                            </button>
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-billing" id="tab-billing" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-credit-card-01"></i>
                                <span class="nds-tab-label">Billing & Payment</span>
                            </button>
                            <button class="nds-tab nds-tab-with-icon" role="tab" aria-selected="false" aria-controls="panel-support" id="tab-support" tabindex="-1">
                                <i class="hgi hgi-stroke hgi-help-circle"></i>
                                <span class="nds-tab-label">Help & Support</span>
                            </button>
                        </nav>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel" role="tabpanel" id="panel-profile" aria-labelledby="tab-profile" tabindex="0">
                                <h3>Profile Settings</h3>
                                <p>Manage your personal information and account preferences.</p>
                                <div class="settings-options">
                                    <div class="setting-item">
                                        <label>Display Name</label>
                                        <input type="text" value="Ahmed Al-Rashid" />
                                    </div>
                                    <div class="setting-item">
                                        <label>Email Address</label>
                                        <input type="email" value="ahmed@example.com" />
                                    </div>
                                    <div class="setting-item">
                                        <label>Phone Number</label>
                                        <input type="tel" value="+966 50 123 4567" />
                                    </div>
                                </div>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-security" aria-labelledby="tab-security" tabindex="0">
                                <h3>Security & Privacy</h3>
                                <p>Configure your security settings and privacy preferences.</p>
                                <div class="settings-options">
                                    <div class="setting-item">
                                        <label>Two-Factor Authentication</label>
                                        <input type="checkbox" checked> Enable 2FA for enhanced security
                                    </div>
                                    <div class="setting-item">
                                        <label>Login Notifications</label>
                                        <input type="checkbox" checked> Notify me of new login attempts
                                    </div>
                                    <div class="setting-item">
                                        <label>Data Sharing</label>
                                        <input type="checkbox"> Allow data sharing for service improvement
                                    </div>
                                </div>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-notifications" aria-labelledby="tab-notifications" tabindex="0">
                                <h3>Notification Preferences</h3>
                                <p>Choose how and when you want to receive notifications.</p>
                                <div class="settings-options">
                                    <div class="setting-item">
                                        <label>Email Notifications</label>
                                        <input type="checkbox" checked> Receive email updates
                                    </div>
                                    <div class="setting-item">
                                        <label>SMS Notifications</label>
                                        <input type="checkbox"> Receive SMS alerts
                                    </div>
                                    <div class="setting-item">
                                        <label>Push Notifications</label>
                                        <input type="checkbox" checked> Enable browser notifications
                                    </div>
                                </div>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-billing" aria-labelledby="tab-billing" tabindex="0">
                                <h3>Billing & Payment</h3>
                                <p>Manage your payment methods and billing information.</p>
                                <div class="contact-info">
                                    <p><strong>Current Plan:</strong> Premium Subscription</p>
                                    <p><strong>Next Billing:</strong> March 15, 2024</p>
                                    <p><strong>Payment Method:</strong> •••• •••• •••• 1234</p>
                                </div>
                            </div>
                            <div class="nds-tab-panel hidden" role="tabpanel" id="panel-support" aria-labelledby="tab-support" tabindex="0">
                                <h3>Help & Support</h3>
                                <p>Get assistance and find answers to common questions.</p>
                                <div class="contact-info">
                                    <p><strong>Documentation:</strong> <a href="#">View User Guide</a></p>
                                    <p><strong>Contact Support:</strong> support@digital.gov.sa</p>
                                    <p><strong>Phone Support:</strong> 920-000-000</p>
                                    <p><strong>Live Chat:</strong> Available 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="code-example">
                    <div class="usage-header">
                        <span>Usage</span>
                        <button class="copy-btn" onclick="copyTabHTML(this)">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <pre><code>&lt;div class="nds-tabs nds-tabs-vertical"&gt;
  &lt;nav class="nds-tab-list" role="tablist" aria-label="Vertical navigation" aria-orientation="vertical"&gt;
    &lt;button class="nds-tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1"&gt;
      &lt;span class="nds-tab-label"&gt;Tab 1&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2"&gt;
      &lt;span class="nds-tab-label"&gt;Tab 2&lt;/span&gt;
    &lt;/button&gt;
  &lt;/nav&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1"&gt;
      Content for tab 1
    &lt;/div&gt;
    &lt;div class="nds-tab-panel hidden" role="tabpanel" id="panel-2" aria-labelledby="tab-2"&gt;
      Content for tab 2
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
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
                    <li><strong>Horizontal Tabs:</strong> Use Left/Right arrows (reversed in RTL), Up/Down also work</li>
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

<script>
function copyTabHTML(button) {
    const codeBlock = button.closest('.code-example').querySelector('code');
    const text = codeBlock.textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyFeedback(button);
    }
}

function showCopyFeedback(button) {
    const original = button.innerHTML;
    button.innerHTML = '<i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>';
    button.style.color = 'var(--color-success-default, #10b981)';
    
    setTimeout(() => {
        button.innerHTML = original;
        button.style.color = '';
    }, 2000);
}

// Listen for tab changes
document.addEventListener('nds:tab:change', function(e) {
    console.log('Tab changed:', e.detail);
});
</script>