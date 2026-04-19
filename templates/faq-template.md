---
layout: page
title: FAQ Template
hero_style: ""
hero_title: FAQs
hero_description: Find answers to common questions about our products, services, and policies.
breadcrumb:
- ["DGA Templates", "/templates"]
lang: en
direction: ltr
sidemenu_mode: false
---
<section id="faqList" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-form-container nds-search-box" data-filter-target="faq-all-items">
            <div class="nds-search-content">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input id="faqSearch" type="text" class="nds-search-input" name="q" autocomplete="off"
                        placeholder="Search">
                    <div class="nds-form-action">
                        <button type="button" class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear">
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-voice-input" aria-label="Voice input">
                            <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <button type="button" class="nds-btn nds-primary nds-search-btn">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label">Search</span>
                </button>
                <div class="nds-dropmenu nds-filter" data-filter-target="faq-all-items">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="tag" data-filter-legend="Tags"
                                data-filter-type="checkbox" data-no-auto-close></div>
                        </div>
                        <div class="nds-dropmenu-footer">
                            <hr class="nds-divider">
                            <div class="nds-dropmenu-action nds-grid">
                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                    data-filter-action="clear" data-no-auto-close>
                                    <span class="nds-label">Reset</span>
                                </button>
                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                    data-filter-action="apply">
                                    <span class="nds-label">Filter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-filter-applied" data-filter-target="faq-all-items" hidden>
                <span class="nds-label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>

        <div class="nds-section-body">
            <div class="nds-tabs nds-divided" id="faq-tabs">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="FAQ categories">
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                            aria-controls="panel-faq-all" id="tab-faq-all" tabindex="0">
                            <span class="nds-label">All</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                            aria-controls="panel-faq-general" id="tab-faq-general" tabindex="-1">
                            <span class="nds-label">General</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                            aria-controls="panel-faq-services" id="tab-faq-services" tabindex="-1">
                            <span class="nds-label">Services</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                            aria-controls="panel-faq-account" id="tab-faq-account" tabindex="-1">
                            <span class="nds-label">Account</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                            aria-controls="panel-faq-technical" id="tab-faq-technical" tabindex="-1">
                            <span class="nds-label">Technical</span>
                        </button>
                    </nav>
                    <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i></button>
                </div>

                <div class="nds-tab-content">

                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-all" aria-labelledby="tab-faq-all" tabindex="0">
                        <div class="nds-accordion nds-lg" id="faq-all-items" data-filter-items=".nds-accordion-item">

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c1">
                                        <span class="nds-accordion-title">What is this FAQ section for?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c1" aria-labelledby="faq-all-h1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>This section answers the most common questions about our services, eligibility, required documents, and how to complete your application online.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="tag">Overview</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c2">
                                        <span class="nds-accordion-title">Where can I find more information?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c2" aria-labelledby="faq-all-h2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Every service page includes a detailed description, required documents, fees, and processing times. You can also visit the Help &amp; Support hub for guided articles.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="tag">Documentation</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c3">
                                        <span class="nds-accordion-title">What does the National Design System include?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c3" aria-labelledby="faq-all-h3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>The system ships design tokens, responsive components, page templates, Arabic/English typography, and accessibility guidelines that match official government services.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="tag">Overview</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label" data-filter="tag">Documentation</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h4">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c4">
                                        <span class="nds-accordion-title">How do I contact support?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c4" aria-labelledby="faq-all-h4">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Reach us through the contact form, unified call center, or live chat. Response times and availability are listed on the Help &amp; Support page.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-green nds-sm"><span class="nds-label" data-filter="tag">Support</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h5">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c5">
                                        <span class="nds-accordion-title">How do I track my application status?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c5" aria-labelledby="faq-all-h5">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Open "My requests" from the account menu. Each request shows its current stage, expected completion date, and any actions pending from your side.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-green nds-sm"><span class="nds-label" data-filter="tag">Digital Services</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h6">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c6">
                                        <span class="nds-accordion-title">Which services are available online?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c6" aria-labelledby="faq-all-h6">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Over 6,000 government services are available digitally through the unified portal, covering civil affairs, licensing, health, education, and business registration.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-green nds-sm"><span class="nds-label" data-filter="tag">Digital Services</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h7">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c7">
                                        <span class="nds-accordion-title">How do I get started?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c7" aria-labelledby="faq-all-h7">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Create an account using your national ID, verify your contact details, and choose the service you need from the homepage to begin a new request.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-yellow nds-sm"><span class="nds-label" data-filter="tag">Getting Started</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h8">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c8">
                                        <span class="nds-accordion-title">How do I reset my password?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c8" aria-labelledby="faq-all-h8">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>On the sign-in screen choose "Forgot password", verify your national ID and the mobile number linked to your account, then set a new password within the sent link.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-red nds-sm"><span class="nds-label" data-filter="tag">Security</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h9">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c9">
                                        <span class="nds-accordion-title">How do I update my profile details?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c9" aria-labelledby="faq-all-h9">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Open the account menu, choose "Profile", and edit your contact details. Changes to legal data such as your name require uploading a supporting document for review.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-yellow nds-sm"><span class="nds-label" data-filter="tag">Getting Started</span></span>
                                                <span class="nds-tag nds-red nds-sm"><span class="nds-label" data-filter="tag">Security</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h10">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c10">
                                        <span class="nds-accordion-title">Can I customize this platform?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c10" aria-labelledby="faq-all-h10">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Yes. Entities can reuse the National Design System components and tokens to match their own branding while preserving accessibility, RTL support, and consistency with official government services.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-purple nds-sm"><span class="nds-label" data-filter="tag">Customization</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h11">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c11">
                                        <span class="nds-accordion-title">Which browsers are supported?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c11" aria-labelledby="faq-all-h11">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>The platform supports the last two major versions of Chrome, Edge, Firefox, and Safari on desktop and mobile. Older browsers may render correctly but are not tested.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-purple nds-sm"><span class="nds-label" data-filter="tag">Compatibility</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-all-h12">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-all-c12">
                                        <span class="nds-accordion-title">Why am I seeing a loading error?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-all-c12" aria-labelledby="faq-all-h12">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Clear your browser cache, disable conflicting extensions, and confirm that your network allows traffic to our government-issued certificate. If the issue persists, contact support with the error code shown.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-purple nds-sm"><span class="nds-label" data-filter="tag">Troubleshooting</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-general" aria-labelledby="tab-faq-general"
                        aria-hidden="true" tabindex="-1" hidden>
                        <div class="nds-accordion nds-lg" id="faq-general-items">

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-gen-h1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-gen-c1">
                                        <span class="nds-accordion-title">What is this FAQ section for?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-gen-c1" aria-labelledby="faq-gen-h1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>This section answers the most common questions about our services, eligibility, required documents, and how to complete your application online.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Overview</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-gen-h2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-gen-c2">
                                        <span class="nds-accordion-title">Where can I find more information?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-gen-c2" aria-labelledby="faq-gen-h2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Every service page includes a detailed description, required documents, fees, and processing times. You can also visit the Help &amp; Support hub for guided articles.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Documentation</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-gen-h3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-gen-c3">
                                        <span class="nds-accordion-title">What does the National Design System include?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-gen-c3" aria-labelledby="faq-gen-h3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>The system ships design tokens, responsive components, page templates, Arabic/English typography, and accessibility guidelines that match official government services.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Overview</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Documentation</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-services" aria-labelledby="tab-faq-services"
                        aria-hidden="true" tabindex="-1" hidden>
                        <div class="nds-accordion nds-lg" id="faq-services-items">

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-srv-h1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-srv-c1">
                                        <span class="nds-accordion-title">How do I contact support?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-srv-c1" aria-labelledby="faq-srv-h1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Reach us through the contact form, unified call center, or live chat. Response times and availability are listed on the Help &amp; Support page.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-green nds-sm"><span class="nds-label">Support</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-srv-h2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-srv-c2">
                                        <span class="nds-accordion-title">How do I track my application status?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-srv-c2" aria-labelledby="faq-srv-h2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Open "My requests" from the account menu. Each request shows its current stage, expected completion date, and any actions pending from your side.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-green nds-sm"><span class="nds-label">Digital Services</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-srv-h3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-srv-c3">
                                        <span class="nds-accordion-title">Which services are available online?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-srv-c3" aria-labelledby="faq-srv-h3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Over 6,000 government services are available digitally through the unified portal, covering civil affairs, licensing, health, education, and business registration.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-green nds-sm"><span class="nds-label">Digital Services</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-account" aria-labelledby="tab-faq-account"
                        aria-hidden="true" tabindex="-1" hidden>
                        <div class="nds-accordion nds-lg" id="faq-account-items">

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-acc-h1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-acc-c1">
                                        <span class="nds-accordion-title">How do I get started?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-acc-c1" aria-labelledby="faq-acc-h1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Create an account using your national ID, verify your contact details, and choose the service you need from the homepage to begin a new request.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-yellow nds-sm"><span class="nds-label">Getting Started</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-acc-h2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-acc-c2">
                                        <span class="nds-accordion-title">How do I reset my password?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-acc-c2" aria-labelledby="faq-acc-h2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>On the sign-in screen choose "Forgot password", verify your national ID and the mobile number linked to your account, then set a new password within the sent link.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-red nds-sm"><span class="nds-label">Security</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-acc-h3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-acc-c3">
                                        <span class="nds-accordion-title">How do I update my profile details?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-acc-c3" aria-labelledby="faq-acc-h3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Open the account menu, choose "Profile", and edit your contact details. Changes to legal data such as your name require uploading a supporting document for review.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-yellow nds-sm"><span class="nds-label">Getting Started</span></span>
                                                <span class="nds-tag nds-red nds-sm"><span class="nds-label">Security</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-technical" aria-labelledby="tab-faq-technical"
                        aria-hidden="true" tabindex="-1" hidden>
                        <div class="nds-accordion nds-lg" id="faq-technical-items">

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-tech-h1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-tech-c1">
                                        <span class="nds-accordion-title">Can I customize this platform?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-tech-c1" aria-labelledby="faq-tech-h1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Yes. Entities can reuse the National Design System components and tokens to match their own branding while preserving accessibility, RTL support, and consistency with official government services.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-purple nds-sm"><span class="nds-label">Customization</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-tech-h2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-tech-c2">
                                        <span class="nds-accordion-title">Which browsers are supported?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-tech-c2" aria-labelledby="faq-tech-h2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>The platform supports the last two major versions of Chrome, Edge, Firefox, and Safari on desktop and mobile. Older browsers may render correctly but are not tested.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-purple nds-sm"><span class="nds-label">Compatibility</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="faq-tech-h3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="faq-tech-c3">
                                        <span class="nds-accordion-title">Why am I seeing a loading error?</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="faq-tech-c3" aria-labelledby="faq-tech-h3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Clear your browser cache, disable conflicting extensions, and confirm that your network allows traffic to our government-issued certificate. If the issue persists, contact support with the error code shown.</p>
                                            <div class="nds-tags">
                                                <span class="nds-tag nds-purple nds-sm"><span class="nds-label">Troubleshooting</span></span>
                                            </div>
                                        </div>
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

<script>
(function () {
    const searchBox = document.querySelector('.nds-search-box[data-filter-target="faq-all-items"]');
    const filterDropmenu = document.querySelector('.nds-filter[data-filter-target="faq-all-items"]');
    const allTabBtn = document.getElementById('tab-faq-all');
    if (!allTabBtn) return;

    function switchToAll() {
        if (allTabBtn.getAttribute('aria-selected') === 'true') return;
        allTabBtn.click();
    }

    const searchInput = document.getElementById('faqSearch');
    if (searchInput) searchInput.addEventListener('input', switchToAll);
    if (searchBox) {
        searchBox.addEventListener('click', function (e) {
            if (e.target.closest('.nds-search-btn, .nds-clear, .nds-voice-input')) switchToAll();
        });
    }
    if (filterDropmenu) {
        filterDropmenu.addEventListener('click', function (e) {
            if (e.target.closest('[data-filter-action="apply"]')) switchToAll();
        });
    }
})();
</script>

<section id="faqFeedback" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-xl">
                            <i class="hgi hgi-stroke hgi-mail-01"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Comments &amp; suggestions</h3>
                        <p class="nds-card-description">For any inquiry or feedback on Government Services, please fill the required information.</p>
                    </div>
                </div>
                <div class="nds-card-actions">
                    <a href="#contact-us" class="nds-btn nds-primary">
                        <span class="nds-label">Contact us</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
