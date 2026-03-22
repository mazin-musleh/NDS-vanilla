---
layout: page
title: Accordion
hero_title: Accordion - National Design System
hero_description: Collapsible content panels for organizing information in a space-efficient manner
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Overview -->
<section id="accordionOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Overview</h2>
            <p class="nds-section-description">Collapsible content panels with smooth animations and full keyboard accessibility</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-lg", ".nds-accordion", "sizeToggle"]'>
                                            <span class="label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-accordion", "sizeToggle"]'>
                                            <span class="label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-accordion", "sizeToggle"]'>
                                            <span class="label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-accordion", "accordionStyle"],["noBg", ".demo-container", "containerBg"]]'>
                                <span class="label">Card View</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-state=always-open", ".nds-accordion", "accordionBehavior", "attr"]'>
                                <span class="label">Always Open</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-accordion nds-lg" id="accordion-basic-1">
                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-basic-heading-1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="true" aria-controls="accordion-basic-collapse-1">
                                        <span class="nds-accordion-title">Getting Started</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-basic-collapse-1"
                                    aria-labelledby="accordion-basic-heading-1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Overview of the service and how to begin your application.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-basic-heading-2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-basic-collapse-2">
                                        <span class="nds-accordion-title">Requirements</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-basic-collapse-2"
                                    aria-labelledby="accordion-basic-heading-2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Documents and eligibility criteria needed before applying.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-basic-heading-3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-basic-collapse-3">
                                        <span class="nds-accordion-title">Fees & Processing</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-basic-collapse-3"
                                    aria-labelledby="accordion-basic-heading-3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Fee schedule and expected processing times.</p>
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
                <span class="nds-accordion-title">Getting Started</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="collapse-1" aria-labelledby="heading-1">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Overview of the service and how to begin.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="heading-2">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="false" aria-controls="collapse-2">
                <span class="nds-accordion-title">Requirements</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="collapse-2" aria-labelledby="heading-2">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Documents and eligibility criteria needed.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="heading-3">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="false" aria-controls="collapse-3">
                <span class="nds-accordion-title">Fees & Processing</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="collapse-3" aria-labelledby="heading-3">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Fee schedule and expected processing times.</p>
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

<!-- With Leading Icons -->
<section id="accordionIcons" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">With Leading Icons</h2>
            <p class="nds-section-description">Add icons before each title for visual context and faster scanning</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["nds-lg", ".nds-accordion", "iconSizeToggle"]'>
                                            <span class="label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-accordion", "iconSizeToggle"]'>
                                            <span class="label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-accordion", "iconSizeToggle"]'>
                                            <span class="label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-card nds-stroke nds-shadow", ".nds-accordion", "iconAccordionStyle"],["noBg", ".demo-container", "containerBg"]]'>
                                <span class="label">Card View</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-state=always-open", ".nds-accordion", "iconAccordionBehavior", "attr"]'>
                                <span class="label">Always Open</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-accordion nds-lg" id="accordion-icon-1">
                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-icon-heading-1">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="true" aria-controls="accordion-icon-collapse-1">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-home-01"></i>
                                        <span class="nds-accordion-title">Housing</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-icon-collapse-1"
                                    aria-labelledby="accordion-icon-heading-1">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Browse housing programs and check eligibility.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-icon-heading-2">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-icon-collapse-2">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-graduation-scroll"></i>
                                        <span class="nds-accordion-title">Education</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-icon-collapse-2"
                                    aria-labelledby="accordion-icon-heading-2">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Scholarships, transcripts, and certification exams.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="accordion-icon-heading-3">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="accordion-icon-collapse-3">
                                        <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-car-01"></i>
                                        <span class="nds-accordion-title">Vehicles</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="accordion-icon-collapse-3"
                                    aria-labelledby="accordion-icon-heading-3">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>Registration renewal, fines, and driving tests.</p>
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
                <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-home-01"></i>
                <span class="nds-accordion-title">Housing</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="icon-collapse-1" aria-labelledby="icon-heading-1">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Browse housing programs and check eligibility.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="icon-heading-2">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="false" aria-controls="icon-collapse-2">
                <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-graduation-scroll"></i>
                <span class="nds-accordion-title">Education</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="icon-collapse-2" aria-labelledby="icon-heading-2">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Scholarships, transcripts, and certification exams.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-accordion-item">
        <h3 class="nds-accordion-header" id="icon-heading-3">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                aria-expanded="false" aria-controls="icon-collapse-3">
                <i class="nds-accordion-leading-icon hgi hgi-stroke hgi-car-01"></i>
                <span class="nds-accordion-title">Vehicles</span>
            </button>
        </h3>
        <div class="nds-accordion-collapse" id="icon-collapse-3" aria-labelledby="icon-heading-3">
            <div class="nds-accordion-content">
                <div class="nds-accordion-body">
                    <p>Registration renewal, fines, and driving tests.</p>
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
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Built-in Features</h3>
                <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-plug-socket icon"></i>
                            <span class="label">Auto-initialization</span>
                        </span>
                        <p class="nds-item-desc">Activates when .nds-accordion is on the page. No JavaScript setup required.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-motion-01 icon"></i>
                            <span class="label">Smooth Animations</span>
                        </span>
                        <p class="nds-item-desc">CSS grid transitions with automatic fallback when users prefer reduced motion.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-keyboard icon"></i>
                            <span class="label">Keyboard Navigation</span>
                        </span>
                        <p class="nds-item-desc">Arrow keys, Home, End, Enter, and Space for full keyboard control.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-api icon"></i>
                            <span class="label">JavaScript API</span>
                        </span>
                        <p class="nds-item-desc">Public API to open, close, and toggle items. Custom events fire on state change for analytics or dependent UI.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-printer icon"></i>
                            <span class="label">Print-ready</span>
                        </span>
                        <p class="nds-item-desc">All panels expand automatically so no content is hidden on paper.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-eye icon"></i>
                            <span class="label">Accessibility</span>
                        </span>
                        <p class="nds-item-desc">High contrast and screen reader support built into every state.</p>
                    </div>
                </div>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use accordions to progressively disclose content. Show headings first, let users expand what they need</li>
                    <li>Good for FAQs, categorized service lists, and settings panels where users scan then drill down</li>
                    <li>Avoid accordions for content users need to compare side-by-side. Use tabs or a flat layout instead</li>
                    <li>Keep accordion titles short and scannable. Users decide whether to expand based on the title alone</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Accordion</strong> API provides methods to create instances, control panels programmatically, and listen for state changes. For dynamically added accordions, call <strong>NDS.Accordion.reinit()</strong> to initialize new elements.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// Re-scan the page and initialize any new accordions
NDS.Accordion.init();

// Shorthand for init(), use after adding dynamic content
NDS.Accordion.reinit();

// Create and return an instance for a specific element
const instance = NDS.Accordion.create(document.querySelector('#my-accordion'));

// Instance methods
instance.openItem(0);       // Open first item
instance.closeItem(1);      // Close second item
instance.toggleItem(2);     // Toggle third item
instance.closeAll();        // Close all items

// Get currently open items
const openItems = instance.getOpenItems();
// Returns: [{index, button, collapse, isOpen}, ...]

// Access an existing instance from a DOM element
const existing = document.querySelector('#my-accordion').ndsAccordionInstance;

// Clean up when removing an accordion from the DOM
instance.destroy();

// Custom events (both bubble, same detail shape)
document.addEventListener('nds:accordion:shown', (e) => {
    // e.detail: {index, button, collapse, accordion}
    console.log('Opened item:', e.detail.index);
});

document.addEventListener('nds:accordion:hidden', (e) => {
    console.log('Closed item:', e.detail.index);
});
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
