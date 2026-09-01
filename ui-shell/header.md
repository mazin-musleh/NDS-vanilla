---
layout: page
title: Header
hero_title: Header - National Design System
hero_description: The region at the top of every page, where the top bar, the DGA digital stamp panel, and the main navigation compose into one responsive header.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.11.0"
last_edit: "02/09/2026 - 01:16 AM"
---

<!-- Header Structure -->
<section id="headerStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Header Structure</h2>
            <p class="nds-section-description">The header wraps three layers without creating a box of its own: the <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">top bar</a> for government branding and utilities, the main navigation bar, and the expandable <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}#dgaDigitalStamp">DGA digital stamp</a> panel.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Header Structure</div>
                        </div>
                        <div class="demo-container nds-noBg">
                            <div class="nds-code nds-expandable">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
header
&#9500;&#9472;&#9472; div.nds-topbar.nds-content-wrapper
&#9474;   &#9500;&#9472;&#9472; button.nds-digitalStamp-tab
&#9474;   &#9492;&#9472;&#9472; div.nds-topbar-info
&#9474;
&#9500;&#9472;&#9472; div#nds-digitalStamp (expandable panel, hidden by default)
&#9474;   &#9492;&#9472;&#9472; div.nds-content-wrapper
&#9474;       &#9492;&#9472;&#9472; div.nds-digitalStamp-notices
&#9474;           &#9500;&#9472;&#9472; div.nds-digitalStamp-card (notice cards)
&#9474;           &#9474;   &#9500;&#9472;&#9472; div.nds-digitalStamp-icon
&#9474;           &#9474;   &#9492;&#9472;&#9472; div.nds-digitalStamp-content
&#9474;           &#9492;&#9472;&#9472; div.nds-digitalStamp-register
&#9474;
&#9492;&#9472;&#9472; nav.nds-main-nav.nds-content-wrapper
    &#9492;&#9472;&#9472; div.nds-nav-container
        &#9500;&#9472;&#9472; a.nds-brand
        &#9474;   &#9500;&#9472;&#9472; img.nds-brand-logo
        &#9474;   &#9492;&#9472;&#9472; span.nds-brand-name
        &#9474;       &#9492;&#9472;&#9472; span.nds-brand-slogan
        &#9500;&#9472;&#9472; ul.nds-nav-minimal
        &#9474;   &#9492;&#9472;&#9472; li.nds-mainNav-toggler (hamburger button)
        &#9492;&#9472;&#9472; div.nds-collapse#ndsNavCollapse
            &#9492;&#9472;&#9472; div.nds-collapse-content
                &#9500;&#9472;&#9472; ul.nds-nav-primary
                &#9474;   &#9500;&#9472;&#9472; li.nds-nav-item
                &#9474;   &#9474;   &#9492;&#9472;&#9472; a.nds-nav-link
                &#9474;   &#9500;&#9472;&#9472; li.nds-nav-item.nds-dropdown
                &#9474;   &#9474;   &#9500;&#9472;&#9472; a.nds-nav-link
                &#9474;   &#9474;   &#9492;&#9472;&#9472; div.nds-dropdown-menu
                &#9474;   &#9474;       &#9492;&#9472;&#9472; div.nds-dropdown-content.nds-content-wrapper
                &#9474;   &#9492;&#9472;&#9472; div.nds-show-more
                &#9492;&#9472;&#9472; ul.nds-nav-actions
                    &#9492;&#9472;&#9472; li.nds-nav-item
                        &#9492;&#9472;&#9472; a/button.nds-nav-link
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

<!-- Header Parts -->
<section id="headerParts" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Header Parts</h2>
            <p class="nds-section-description">Each layer has its own page, with demos, modifier classes, and its JavaScript API.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <ul>
                    <li><a class="nds-color" href="{{ 'ui-shell/mainnav' | relative_url }}">Main Navigation</a> covers the navigation bar: branding, primary links, dropdown menus, utility actions, and the mobile drawer.</li>
                    <li><a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">Top Bar</a> covers the government branding strip above the navigation, with the date, clock, weather, and dark mode toggle.</li>
                    <li><a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}#dgaDigitalStamp">DGA Digital Stamp</a> covers the expandable verification panel.</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="headerGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>The <code class="nds-inline-code lang-html">&lt;header&gt;</code> element carries <code class="nds-inline-code lang-html">display: contents</code>, so it creates no box of its own. The top bar, the digital stamp panel, and the navigation bar join the page flow directly as siblings.</li>
                    <li>Style the parts, not the wrapper. Background, padding, borders, and sticky behavior belong on <code class="nds-inline-code lang-html">.nds-topbar</code> and <code class="nds-inline-code lang-html">.nds-main-nav</code>. Rules set on <code class="nds-inline-code lang-html">&lt;header&gt;</code> render nothing.</li>
                    <li>This applies to every <code class="nds-inline-code lang-html">&lt;header&gt;</code> on the page, not only the site header. A header element carried in from an existing layout loses its own box, so move that styling to a child element.</li>
                    <li>Keep one header region per page, holding the three layers in the order the structure tree shows.</li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</section>
