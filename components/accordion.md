---
layout: page
title: Accordion
hero_title: Accordion - National Design System
hero_description: Collapsible content panels for organizing information in a space-efficient manner
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Accordion Overview -->
<section id="accordionOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Accordion</h2>
            <p class="nds-section-description">Collapsible content panels with smooth animations and full keyboard
                accessibility</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Basic Accordion -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Basic Accordion</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-accordion", "accordionStyle"],["noBg", ".demo-container", "containerBg"]]'>
                                <span class="label">Card View</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-state=always-open", ".nds-accordion", "accordionBehavior", "attr"]'>
                                <span class="label">Always Open</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-lg", ".nds-accordion", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-accordion", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-accordion", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-accordion nds-lg" id="accordion-basic-1">
                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-basic-heading-1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="true" aria-controls="accordion-basic-collapse-1">
                                        <span class="nds-accordion-title">Identity & Records</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-basic-collapse-1"
                                    aria-labelledby="accordion-basic-heading-1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Manage your national identity documents, civil records, and personal
                                                certificates through secure digital services.</p>
                                            <ul>
                                                <li>Identity verification and digital certificates</li>
                                                <li>Passport renewal with home delivery</li>
                                                <li>Birth and marriage certificate requests</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-basic-heading-2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-basic-collapse-2">
                                        <span class="nds-accordion-title">Healthcare & Social</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-basic-collapse-2"
                                    aria-labelledby="accordion-basic-heading-2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Access healthcare enrollment, appointment booking, employment services,
                                                and retirement benefits through a unified platform.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-basic-heading-3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-basic-collapse-3">
                                        <span class="nds-accordion-title">Business & Finance</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-basic-collapse-3"
                                    aria-labelledby="accordion-basic-heading-3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>File taxes, register businesses, apply for building permits, and manage
                                                property transactions online.</p>
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
                                        aria-controls="panel-accordion-basic-1" id="tab-accordion-basic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab showMore" aria-label="Show more"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-accordion-basic-1" aria-labelledby="tab-accordion-basic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-accordion nds-lg" id="my-accordion">
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="heading-1">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="true" aria-controls="collapse-1">
                <span class="nds-accordion-title">Identity & Records</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="collapse-1" aria-labelledby="heading-1">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Manage your national identity documents, civil records,
                        and personal certificates through secure digital services.</p>
                    <ul>
                        <li>Identity verification and digital certificates</li>
                        <li>Passport renewal with home delivery</li>
                        <li>Birth and marriage certificate requests</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="heading-2">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="false" aria-controls="collapse-2">
                <span class="nds-accordion-title">Healthcare & Social</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="collapse-2" aria-labelledby="heading-2">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Access healthcare enrollment, appointment booking,
                        employment services, and retirement benefits.</p>
                </div>
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

                <!-- Accordion with Leading Icons -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Accordion with Leading Icons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-accordion", "accordionStyle"],["noBg", ".demo-container", "containerBg"]]'>
                                <span class="label">Card View</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-state=always-open", ".nds-accordion", "accordionBehavior", "attr"]'>
                                <span class="label">Always Open</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-lg", ".nds-accordion", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-accordion", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-accordion", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-accordion nds-lg" id="accordion-icon-1">
                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-icon-heading-1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="true" aria-controls="accordion-icon-collapse-1">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-user-id-verification"></i>
                                        <span class="nds-accordion-title">Identity & Records</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-icon-collapse-1"
                                    aria-labelledby="accordion-icon-heading-1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Verify your national identity, renew passports, and request birth or
                                                marriage certificates through secure online services.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-icon-heading-2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-icon-collapse-2">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-health"></i>
                                        <span class="nds-accordion-title">Healthcare & Social</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-icon-collapse-2"
                                    aria-labelledby="accordion-icon-heading-2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Enroll in health insurance, book medical appointments, and manage
                                                employment certificates and retirement benefits.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-icon-heading-3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-icon-collapse-3">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-calculator"></i>
                                        <span class="nds-accordion-title">Business & Finance</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-icon-collapse-3"
                                    aria-labelledby="accordion-icon-heading-3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>File tax declarations, register for VAT, apply for business licenses,
                                                and manage property and building permits.</p>
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
                                        aria-controls="panel-accordion-icon-1" id="tab-accordion-icon-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab showMore" aria-label="Show more"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-accordion-icon-1" aria-labelledby="tab-accordion-icon-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-accordion nds-lg" id="icon-accordion">
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="icon-heading-1">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="true" aria-controls="icon-collapse-1">
                <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-user-id-verification"></i>
                <span class="nds-accordion-title">Identity & Records</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="icon-collapse-1" aria-labelledby="icon-heading-1">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Verify your national identity, renew passports,
                        and request birth or marriage certificates.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="icon-heading-2">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="false" aria-controls="icon-collapse-2">
                <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-health"></i>
                <span class="nds-accordion-title">Healthcare & Social</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="icon-collapse-2" aria-labelledby="icon-heading-2">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Enroll in health insurance, book appointments,
                        and manage employment and retirement benefits.</p>
                </div>
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
<section id="accordionGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices, configuration options, and JavaScript API</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">Built-in Features</h3>
                <ul>
                    <li>Smooth CSS grid animations with automatic fallback when users prefer reduced motion</li>
                    <li>Full keyboard navigation — Arrow keys, Home, End, Enter, and Space</li>
                    <li>Auto-initializes when <strong>nds-accordion</strong> is on the page — no JavaScript setup required</li>
                    <li>Programmatic control via public API — open, close, toggle, and query state</li>
                    <li>Custom events fire on show/hide for analytics or dependent UI updates</li>
                    <li>Print-ready — all panels expand automatically so no content is hidden on paper</li>
                    <li>High contrast and screen reader support built into every state</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use accordions to progressively disclose content — show headings first, let users expand what they need</li>
                    <li>Good for FAQs, categorized service lists, and settings panels where users scan then drill down</li>
                    <li>Avoid accordions for content users need to compare side-by-side — use tabs or a flat layout instead</li>
                    <li>Keep accordion titles short and scannable — users decide whether to expand based on the title alone</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
            </div>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript">// Accordions auto-initialize on page load.
// Use NDS.Accordion for dynamic content or programmatic control.

// Reinitialize after adding accordion HTML dynamically
NDS.Accordion.reinit();

// Or create a new instance for a specific accordion
var instance = NDS.Accordion.create(document.querySelector('#my-accordion'));

// Programmatic control via instance
instance.openItem(0);       // Open first item
instance.closeItem(1);      // Close second item
instance.toggleItem(2);     // Toggle third item
instance.closeAll();        // Close all items

// Get currently open items
var openItems = instance.getOpenItems();
// Returns: [{index, button, collapse, isOpen}, ...]

// Access instance from an existing accordion element
var existing = document.querySelector('#my-accordion').ndsAccordionInstance;

// Clean up when removing an accordion from the DOM
instance.destroy();

// Listen for accordion events
document.addEventListener('nds:accordion:shown', function(e) {
    // e.detail: {index, button, collapse, accordion}
    console.log('Opened item:', e.detail.index);
});

document.addEventListener('nds:accordion:hidden', function(e) {
    console.log('Closed item:', e.detail.index);
});</code>
                </div>
            </div>
        </div>
    </div>
</section>
