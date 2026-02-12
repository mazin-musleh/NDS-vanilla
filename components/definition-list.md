---
layout: page
title: Definition List
hero_title: Definition List Components - National Design System
hero_description: Semantic term-definition components for displaying structured information with icons
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Basic Definition List -->
<section id="definitionListDemo" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Definition List Component</h2>
            <p class="nds-section-description">Semantic HTML component for displaying term-definition pairs with optional icons</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Basic Definition List -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Definition List with Icons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["tableView", ".nds-definition-list", "definitionLayout"]'>
                                <span class="label">Table View</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-divided", ".nds-definition-list", "definitionVariant"]'>
                                <span class="label">Divided</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <dl class="nds-definition-list">
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-user-01 icon"></i>
                                        <span class="label">Full Name:</span>
                                    </dt>
                                    <dd>Ahmed Mohammed Al-Rashid</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-building-02 icon"></i>
                                        <span class="label">Organization:</span>
                                    </dt>
                                    <dd>Ministry of Digital Transformation</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-briefcase-02 icon"></i>
                                        <span class="label">Position:</span>
                                    </dt>
                                    <dd>Senior Digital Services Manager</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-marker-pin-02 icon"></i>
                                        <span class="label">Location:</span>
                                    </dt>
                                    <dd>Riyadh, Saudi Arabia</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-calendar-02 icon"></i>
                                        <span class="label">Join Date:</span>
                                    </dt>
                                    <dd>January 15, 2020</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-flag-01 icon"></i>
                                        <span class="label">Status:</span>
                                    </dt>
                                    <dd>Active</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
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
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-basic-1" aria-labelledby="tab-basic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Basic definition list -->
<dl class="nds-definition-list">
    <div class="nds-definition-item">
        <dt>
            <i class="hgi hgi-stroke hgi-user-01 icon"></i>
            <span class="label">Full Name:</span>
        </dt>
        <dd>Ahmed Mohammed Al-Rashid</dd>
    </div>
    <div class="nds-definition-item">
        <dt>
            <i class="hgi hgi-stroke hgi-building-02 icon"></i>
            <span class="label">Organization:</span>
        </dt>
        <dd>Ministry of Digital Transformation</dd>
    </div>
</dl>

<!-- Table view layout -->
<dl class="nds-definition-list tableView">
    <div class="nds-definition-item">
        <dt>
            <i class="hgi hgi-stroke hgi-user-01 icon"></i>
            <span class="label">Full Name:</span>
        </dt>
        <dd>Ahmed Mohammed Al-Rashid</dd>
    </div>
</dl>

<!-- Divided variant with borders -->
<dl class="nds-definition-list nds-divided">
    <!-- Same structure -->
</dl>

<!-- Divided table view -->
<dl class="nds-definition-list nds-divided tableView">
    <!-- Same structure -->
</dl>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Grid Layout Definition List -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Grid Layout with Cards</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <dl class="nds-definition-list nds-grid" style="--max-col:4;--mid-col:2;--min-col:2;">
                                <div class="nds-definition-item nds-card nds-stroke">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-building-02 icon"></i>
                                        <span class="label">Organization</span>
                                    </dt>
                                    <dd>Ministry of Interior Affairs</dd>
                                </div>
                                <div class="nds-definition-item nds-card nds-stroke">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-layers-01 icon"></i>
                                        <span class="label">Department</span>
                                    </dt>
                                    <dd>Public Services Division</dd>
                                </div>
                                <div class="nds-definition-item nds-card nds-stroke">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-briefcase-02 icon"></i>
                                        <span class="label">Service Type</span>
                                    </dt>
                                    <dd>Digital Identity Services</dd>
                                </div>
                                <div class="nds-definition-item nds-card nds-stroke">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-globe-02 icon"></i>
                                        <span class="label">Service Area</span>
                                    </dt>
                                    <dd>Nationwide Coverage</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-1" id="tab-grid-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-grid-1" aria-labelledby="tab-grid-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Grid layout with cards -->
<dl class="nds-definition-list nds-grid" style="--max-col:4;--mid-col:2;--min-col:2;">
    <div class="nds-definition-item nds-card nds-stroke">
        <dt>
            <i class="hgi hgi-stroke hgi-building-02 icon"></i>
            <span class="label">Organization</span>
        </dt>
        <dd>Ministry of Interior Affairs</dd>
    </div>
    <div class="nds-definition-item nds-card nds-stroke">
        <dt>
            <i class="hgi hgi-stroke hgi-layers-01 icon"></i>
            <span class="label">Department</span>
        </dt>
        <dd>Public Services Division</dd>
    </div>
    <div class="nds-definition-item nds-card nds-stroke">
        <dt>
            <i class="hgi hgi-stroke hgi-briefcase-02 icon"></i>
            <span class="label">Service Type</span>
        </dt>
        <dd>Digital Identity Services</dd>
    </div>
    <div class="nds-definition-item nds-card nds-stroke">
        <dt>
            <i class="hgi hgi-stroke hgi-globe-02 icon"></i>
            <span class="label">Service Area</span>
        </dt>
        <dd>Nationwide Coverage</dd>
    </div>
</dl>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Without Icons -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Definition List Without Icons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["tableView", ".nds-definition-list", "definitionLayout"]'>
                                <span class="label">Table View</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-divided", ".nds-definition-list", "definitionVariant"]'>
                                <span class="label">Divided</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <dl class="nds-definition-list">
                                <div class="nds-definition-item">
                                    <dt><span class="label">Service Name</span></dt>
                                    <dd>Digital Identity Verification and Authentication Platform</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt><span class="label">Service Provider</span></dt>
                                    <dd>National Digital Government Authority (NDGA)</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt><span class="label">Target Users</span></dt>
                                    <dd>All citizens and residents requiring government digital services</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-noicon-1" id="tab-noicon-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-noicon-1" aria-labelledby="tab-noicon-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Definition list without icons -->
<dl class="nds-definition-list">
    <div class="nds-definition-item">
        <dt><span class="label">Service Name</span></dt>
        <dd>Digital Identity Verification and Authentication Platform</dd>
    </div>
    <div class="nds-definition-item">
        <dt><span class="label">Service Provider</span></dt>
        <dd>National Digital Government Authority (NDGA)</dd>
    </div>
</dl>

<!-- Table view without icons -->
<dl class="nds-definition-list tableView">
    <div class="nds-definition-item">
        <dt><span class="label">Service Name</span></dt>
        <dd>Digital Identity Verification and Authentication Platform</dd>
    </div>
</dl>
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

<!-- Usage -->
<section id="definitionListUsage" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage</h2>
            <p class="nds-section-description">How to implement definition list components</p>
        </div>
        <div class="nds-section-content">

            <h3>Component Structure</h3>

            <p>The definition list component uses semantic HTML <strong>&lt;dl&gt;</strong> (definition list) elements with the <strong>.nds-definition-list</strong> class. Each term-definition pair is wrapped in a <strong>.nds-definition-item</strong> container. Terms use the <strong>&lt;dt&gt;</strong> (definition term) element containing an optional icon and a <strong>.label</strong> span. Definitions use the <strong>&lt;dd&gt;</strong> (definition description) element. This semantic structure ensures proper accessibility and screen reader support while providing flexibility for styling.</p>

            <h3>Basic Layout</h3>

            <p>By default, the definition list displays items in a vertical stack with column layout. Each item shows the term above its definition, with appropriate spacing controlled by CSS custom properties. When icons are present in the term, the component automatically adds indentation to the definition to maintain visual alignment. This creates a clean, hierarchical presentation suitable for displaying structured information like user profiles, service details, or organizational information.</p>

            <h3>Table View Layout</h3>

            <p>Add the <strong>.tableView</strong> class to create a two-column layout where terms appear on the left and definitions on the right. This layout uses CSS Grid with subgrid for perfect alignment across all items. The table view works particularly well for compact information displays like contact details, specifications, or metadata. It automatically handles text wrapping in both columns while maintaining consistent alignment. Combine with <strong>.nds-divided</strong> to add borders between items for better visual separation.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html line-numbers">
<!-- Table view layout -->
<dl class="nds-definition-list tableView">
    <div class="nds-definition-item">
        <dt><span class="label">Email:</span></dt>
        <dd>contact@organization.gov.sa</dd>
    </div>
    <div class="nds-definition-item">
        <dt><span class="label">Office:</span></dt>
        <dd>Building 5 - Floor 3 - Office 301</dd>
    </div>
</dl>
                </code>
                </div>
            </div>

            <h3>Divided Variant</h3>

            <p>Add the <strong>.nds-divided</strong> class to enable border separators between definition items. In the default layout, this adds bottom borders with padding to create clear visual separation. In table view, it adds horizontal lines between rows for a traditional table appearance. The last item automatically removes its border to prevent double borders. This variant is useful for long lists of information where visual separation improves scannability.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html line-numbers">
<!-- Divided definition list -->
<dl class="nds-definition-list nds-divided">
    <!-- items -->
</dl>

<!-- Divided table view -->
<dl class="nds-definition-list nds-divided tableView">
    <!-- items -->
</dl>
                </code>
                </div>
            </div>

            <h3>Grid Layout with Cards</h3>

            <p>Combine the definition list with <strong>.nds-grid</strong> to create responsive card layouts. Wrap each <strong>.nds-definition-item</strong> with <strong>.nds-card.nds-stroke</strong> classes to display items as individual cards in a grid. Control the grid behavior using CSS custom properties: <strong>--max-col</strong> for maximum columns on large screens, <strong>--mid-col</strong> for medium screens, and <strong>--min-col</strong> for small screens. This layout works excellently for user profiles, service overviews, or any structured information that benefits from a card-based presentation.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html line-numbers">
<!-- Grid layout with cards -->
<dl class="nds-definition-list nds-grid" style="--max-col:4;--mid-col:2;--min-col:1;">
    <div class="nds-definition-item nds-card nds-stroke">
        <dt>
            <i class="hgi hgi-stroke hgi-building-02 icon"></i>
            <span class="label">Organization</span>
        </dt>
        <dd>Ministry of Interior Affairs</dd>
    </div>
    <!-- More items -->
</dl>
                </code>
                </div>
            </div>

            <h3>Icons in Terms</h3>

            <p>Add icons to terms by including an <strong>&lt;i&gt;</strong> element with icon classes before the label span. The component automatically styles icons with appropriate color and spacing. When icons are present in the default layout, the definition automatically adds left padding to align with the label text, creating a clean visual hierarchy. In table view, icons appear inline with the term label. Icons enhance scannability and provide visual cues for different types of information.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html line-numbers">
<!-- Definition list with icons -->
<dl class="nds-definition-list">
    <div class="nds-definition-item">
        <dt>
            <i class="hgi hgi-stroke hgi-user-01 icon"></i>
            <span class="label">Full Name</span>
        </dt>
        <dd>Ahmed Mohammed Al-Rashid</dd>
    </div>
</dl>
                </code>
                </div>
            </div>

            <h3>Use Cases</h3>

            <p>The definition list component serves multiple use cases across government digital services. Use it for <strong>user profiles</strong> to display personal information including name, organization, position, and contact details. It works well for <strong>service details</strong> showing specifications, features, and metadata. Display <strong>organizational information</strong> in table view for a clean presentation of departments, locations, and hierarchies. The grid layout with cards suits <strong>overview sections</strong> where each piece of information deserves equal visual weight. Use divided variants for <strong>long information lists</strong> where visual separation improves readability.</p>

            <h3>Typography and Styling</h3>

            <p>Terms (<strong>dt</strong> elements) use a larger font size (<strong>--nds-text-clamp-lg-FS</strong>) and bold font weight (600) to establish visual hierarchy. The label text appears in the primary paragraph color while icons use the primary text color for emphasis. Definitions (<strong>dd</strong> elements) use the secondary paragraph color to create contrast with terms. All elements maintain normal line height for optimal readability. The component automatically handles RTL (Arabic) and LTR (English) text directions using CSS logical properties.</p>

            <h3>Accessibility Features</h3>

            <p>The component follows semantic HTML standards using native <strong>&lt;dl&gt;</strong>, <strong>&lt;dt&gt;</strong>, and <strong>&lt;dd&gt;</strong> elements that screen readers properly interpret. This structure provides implicit relationships between terms and definitions without requiring ARIA attributes. The use of semantic elements ensures better indexing by search engines and compatibility with assistive technologies. Color contrast meets WCAG guidelines with primary text on light backgrounds and appropriate secondary text colors for definitions.</p>

            <h3>Responsive Behavior</h3>

            <p>The component adapts seamlessly across device sizes. On mobile devices, table view definitions wrap naturally to maintain readability without horizontal scrolling. Grid layouts automatically adjust column counts based on viewport width using the responsive grid system. The component maintains appropriate spacing and typography across all screen sizes. Icons and text scale proportionally, ensuring consistent visual hierarchy on both small and large screens.</p>

            <h3>Integration with Other Components</h3>

            <p>Definition lists integrate well with other NDS components. Combine with <strong>.nds-card</strong> and <strong>.nds-stroke</strong> for card-based layouts. Use within tab panels to organize complex information hierarchically. Nest inside content sections with appropriate headings for proper document structure. The component works alongside statistical cards, grids, and other layout components to create comprehensive information pages for government services, user profiles, or organizational details.</p>

        </div>
    </div>
</section>
