---
layout: page
title: Hero
hero_title: Hero - National Design System
hero_description: Full-width page banners for home page sliders and compact sub-page headers, providing a visually consistent entry point that adapts to every level of site hierarchy.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.11.x"
last_edit: "04/09/2026 - 05:35 AM"
---

<!-- Sub Hero -->
<section id="heroSubHero" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sub Hero</h2>
            <p class="nds-section-description">The sub hero sits below the header on every content page and displays the page title and description. The flat variant removes the gradient background for pages where a neutral, image-free header is more appropriate.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Default</div>
                        </div>
                        <div class="demo-container" style="padding: 0; overflow: hidden;">
                            <section class="nds-hero-section nds-sub">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                    <ol class="nds-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#">UI Shell</a></li>
                                        <li aria-current="page">Service Portal</li>
                                    </ol>
                                </nav>
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Service Portal</h2>
                                        <p class="nds-section-description">Access government services, track applications, and manage your digital identity in one place.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-hero-sub-1" id="tab-hero-sub-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hero-sub-1"
                                        aria-labelledby="tab-hero-sub-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;section class="nds-hero-section nds-sub"&gt;
  &lt;nav class="nds-breadcrumb-nav" aria-label="Breadcrumb"&gt;
    &lt;ol class="nds-breadcrumb"&gt;
      &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/parent"&gt;Parent Section&lt;/a&gt;&lt;/li&gt;
      &lt;li aria-current="page"&gt;Current Page&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/nav&gt;
  &lt;div class="nds-section-wrapper"&gt;
    &lt;div class="nds-section-head"&gt;
      &lt;h1 class="nds-section-title"&gt;Service Portal&lt;/h1&gt;
      &lt;p class="nds-section-description"&gt;Access government services, track applications, and manage your digital identity in one place.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Flat</div>
                        </div>
                        <div class="demo-container" style="padding: 0; overflow: hidden;">
                            <section class="nds-hero-section nds-sub nds-flat">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                    <ol class="nds-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#">UI Shell</a></li>
                                        <li aria-current="page">Service Portal</li>
                                    </ol>
                                </nav>
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <div class="nds-section-action nds-minimal">
                                            <div class="nds-share nds-dropmenu">
                                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page">
                                                    <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
                                                    <span class="nds-label">Share Page</span>
                                                </button>
                                                <div class="nds-dropmenu-menu" hidden>
                                                    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
                                                        <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                                                        <span class="nds-label">X</span>
                                                    </button>
                                                    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
                                                        <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                                                        <span class="nds-label">LinkedIn</span>
                                                    </button>
                                                    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
                                                        <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
                                                        <span class="nds-label">WhatsApp</span>
                                                    </button>
                                                    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link"
                                                        data-label="Link Copied!" data-message="Page link copied to clipboard" data-no-auto-close>
                                                        <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
                                                        <span class="nds-label">Copy Link</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 class="nds-section-title">Service Portal</h2>
                                        <p class="nds-section-description">Access government services, track applications, and manage your digital identity in one place.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-hero-flat-1" id="tab-hero-flat-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hero-flat-1"
                                        aria-labelledby="tab-hero-flat-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;section class="nds-hero-section nds-sub nds-flat"&gt;
  &lt;nav class="nds-breadcrumb-nav" aria-label="Breadcrumb"&gt;
    &lt;ol class="nds-breadcrumb"&gt;
      &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/parent"&gt;Parent Section&lt;/a&gt;&lt;/li&gt;
      &lt;li aria-current="page"&gt;Current Page&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/nav&gt;
  &lt;div class="nds-section-wrapper"&gt;
    &lt;div class="nds-section-head"&gt;
      &lt;div class="nds-section-action nds-minimal"&gt;
        &lt;div class="nds-share nds-dropmenu"&gt;
          &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page"&gt;
            &lt;i class="nds-icon nds-hgi-share-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Share Page&lt;/span&gt;
          &lt;/button&gt;
          &lt;div class="nds-dropmenu-menu" hidden&gt;
            &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X"&gt;
              &lt;i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;X&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn"&gt;
              &lt;i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;LinkedIn&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp"&gt;
              &lt;i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;WhatsApp&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link"
                data-label="Link Copied!" data-message="Page link copied to clipboard" data-no-auto-close&gt;
              &lt;i class="nds-icon nds-hgi-link-04" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;Copy Link&lt;/span&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;h1 class="nds-section-title"&gt;Service Portal&lt;/h1&gt;
      &lt;p class="nds-section-description"&gt;Access government services, track applications, and manage your digital identity in one place.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">With Brief</div>
                        </div>
                        <div class="demo-container" style="padding: 0; overflow: hidden;">
                            <section class="nds-hero-section nds-sub">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                    <ol class="nds-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#">UI Shell</a></li>
                                        <li aria-current="page">Digital Identity</li>
                                    </ol>
                                </nav>
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">Digital Identity</h2>
                                        <p class="nds-section-brief">Your unified gateway to all government services</p>
                                        <p class="nds-section-description">Manage your national ID, verify documents, and access personalized services from a single secure account linked to your identity.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-hero-brief-1" id="tab-hero-brief-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hero-brief-1"
                                        aria-labelledby="tab-hero-brief-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;section class="nds-hero-section nds-sub"&gt;
  &lt;nav class="nds-breadcrumb-nav" aria-label="Breadcrumb"&gt;
    &lt;ol class="nds-breadcrumb"&gt;
      &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/parent"&gt;Parent Section&lt;/a&gt;&lt;/li&gt;
      &lt;li aria-current="page"&gt;Digital Identity&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/nav&gt;
  &lt;div class="nds-section-wrapper"&gt;
    &lt;div class="nds-section-head"&gt;
      &lt;h1 class="nds-section-title"&gt;Digital Identity&lt;/h1&gt;
      &lt;p class="nds-section-brief"&gt;Your unified gateway to all government services&lt;/p&gt;
      &lt;p class="nds-section-description"&gt;Manage your national ID, verify documents, and access personalized services from a single secure account linked to your identity.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
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

<!-- With Background Image -->
<section id="heroBgImage" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">With Background Image</h2>
            <p class="nds-section-description">Set the <code class="nds-inline-code lang-html">--hero_image</code> CSS custom property to place a branded photograph behind the sub hero. A CSS mask fades the image from the start edge toward the content area — the background color shows through where the image fades out, so the fade adapts automatically to any theme or color token.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">With Background Image</div>
                        </div>
                        <div class="demo-container" style="padding: 0; overflow: hidden;">
                            <section class="nds-hero-section nds-sub" style="--hero_image: url('{{ '/assets/img/riyadhcenter_ai.webp' | relative_url }}')">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                    <ol class="nds-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        <li aria-current="page">About the Authority</li>
                                    </ol>
                                </nav>
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <h2 class="nds-section-title">About the Authority</h2>
                                        <p class="nds-section-description">The Digital Government Authority leads digital transformation across Saudi government services and establishes national standards.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-hero-bg-1" id="tab-hero-bg-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hero-bg-1"
                                        aria-labelledby="tab-hero-bg-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;section class="nds-hero-section nds-sub" style="--hero_image: url('assets/img/hero.webp')"&gt;
  &lt;nav class="nds-breadcrumb-nav" aria-label="Breadcrumb"&gt;
    &lt;ol class="nds-breadcrumb"&gt;
      &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/parent"&gt;Parent Section&lt;/a&gt;&lt;/li&gt;
      &lt;li aria-current="page"&gt;Current Page&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/nav&gt;
  &lt;div class="nds-section-wrapper"&gt;
    &lt;div class="nds-section-head"&gt;
      &lt;h1 class="nds-section-title"&gt;About the Authority&lt;/h1&gt;
      &lt;p class="nds-section-description"&gt;The Digital Government Authority leads digital transformation across Saudi government services and establishes national standards.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
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

<!-- With Actions -->
<section id="heroActions" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sub Hero with Actions</h2>
            <p class="nds-section-description">The sub hero provides two action slots: a float action placed inline-end inside the heading area for contextual tools such as share or bookmark, and a standard action block below the description for primary calls-to-action.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">With Actions</div>
                        </div>
                        <div class="demo-container" style="padding: 0; overflow: hidden;">
                            <section class="nds-hero-section nds-sub">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                    <ol class="nds-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li aria-current="page">Digital Services Portal</li>
                                    </ol>
                                </nav>
                                <div class="nds-section-wrapper">
                                    <div class="nds-section-head">
                                        <div class="nds-section-action">
                                            <a class="nds-btn nds-secondary-outline" href="#">
                                                <span class="nds-label">Help Center</span>
                                            </a>
                                        </div>
                                        <h2 class="nds-section-title">Digital Services Portal</h2>
                                        <p class="nds-section-description">Browse and apply for government services from one centralized portal available around the clock.</p>
                                    </div>
                                    <div class="nds-section-action">
                                        <a class="nds-btn nds-primary" href="#">
                                            <span class="nds-label">Browse Services</span>
                                        </a>
                                        <a class="nds-btn nds-secondary-outline" href="#">
                                            <span class="nds-label">Learn More</span>
                                        </a>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-hero-actions-1" id="tab-hero-actions-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hero-actions-1"
                                        aria-labelledby="tab-hero-actions-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;section class="nds-hero-section nds-sub"&gt;
  &lt;nav class="nds-breadcrumb-nav" aria-label="Breadcrumb"&gt;
    &lt;ol class="nds-breadcrumb"&gt;
      &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/services"&gt;Services&lt;/a&gt;&lt;/li&gt;
      &lt;li aria-current="page"&gt;Digital Services Portal&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/nav&gt;
  &lt;div class="nds-section-wrapper"&gt;
    &lt;div class="nds-section-head"&gt;
      &lt;!-- Float action: appears inline-end inside the heading area --&gt;
      &lt;div class="nds-section-action"&gt;
        &lt;a class="nds-btn nds-secondary-outline" href="/help"&gt;
          &lt;span class="nds-label"&gt;Help Center&lt;/span&gt;
        &lt;/a&gt;
      &lt;/div&gt;
      &lt;h1 class="nds-section-title"&gt;Digital Services Portal&lt;/h1&gt;
      &lt;p class="nds-section-description"&gt;Browse and apply for government services from one centralized portal available around the clock.&lt;/p&gt;
    &lt;/div&gt;
    &lt;!-- Standard action: appears below the description --&gt;
    &lt;div class="nds-section-action"&gt;
      &lt;a class="nds-btn nds-primary" href="/services"&gt;
        &lt;span class="nds-label"&gt;Browse Services&lt;/span&gt;
      &lt;/a&gt;
      &lt;a class="nds-btn nds-secondary-outline" href="/about"&gt;
        &lt;span class="nds-label"&gt;Learn More&lt;/span&gt;
      &lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
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

<!-- Main Hero Slider -->
<section id="heroMain" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Main Hero Slider</h2>
            <p class="nds-section-description">The main hero is a full-viewport-height banner used on home and hub pages. It wraps a <a class="nds-color" href="{{ 'components/swiper' | relative_url }}">Swiper</a> carousel so multiple slides can rotate with pagination controls. Each slide has its own background image, overlay opacity, and content area.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Main Hero Slider</div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-hero-main-1" id="tab-hero-main-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-hero-main-1"
                                        aria-labelledby="tab-hero-main-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;section class="nds-hero-section"&gt;
  &lt;div class="nds-swiper nds-hero nds-middle nds-oncolor nds-full-width" style="--total: 2"&gt;
    &lt;div class="nds-swiper-wrapper"&gt;

      &lt;!-- First slide: srcset loads eagerly, fetchpriority="high" for LCP --&gt;
      &lt;div class="nds-swiper-slide nds-content-wrapper"&gt;
        &lt;div class="nds-hero-image-wrapper" style="--overlay: 0.8;"&gt;
          &lt;picture&gt;
            &lt;source media="(max-width: 768px)" srcset="assets/img/hero-sm.webp"&gt;
            &lt;source media="(max-width: 1646px)" srcset="assets/img/hero-md.webp"&gt;
            &lt;img src="assets/img/hero.webp" class="nds-hero-image" alt="" fetchpriority="high"&gt;
          &lt;/picture&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-body"&gt;
          &lt;h1 class="nds-section-title"&gt;Welcome to Our Portal&lt;/h1&gt;
          &lt;p class="nds-section-description"&gt;Access government services, information, and resources.&lt;/p&gt;
          &lt;div class="nds-section-action"&gt;
            &lt;a href="/services" class="nds-btn nds-primary nds-oncolor nds-md"&gt;
              &lt;span class="nds-label"&gt;Get Started&lt;/span&gt;
            &lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;!-- Later slides: hidden, and data-srcset/data-src so they load on demand --&gt;
      &lt;div class="nds-swiper-slide nds-content-wrapper" hidden&gt;
        &lt;div class="nds-hero-image-wrapper" style="--overlay: 0.8;"&gt;
          &lt;picture&gt;
            &lt;source media="(max-width: 768px)" data-srcset="assets/img/hero-2-sm.webp"&gt;
            &lt;source media="(max-width: 1646px)" data-srcset="assets/img/hero-2-md.webp"&gt;
            &lt;img data-src="assets/img/hero-2.webp" class="nds-hero-image" alt=""
              style="object-position: 50% 50%;"&gt;
          &lt;/picture&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-body"&gt;
          &lt;h2 class="nds-section-title"&gt;Digital Transformation&lt;/h2&gt;
          &lt;p class="nds-section-description"&gt;Join millions of citizens benefiting from smart government services.&lt;/p&gt;
          &lt;div class="nds-section-action"&gt;
            &lt;a href="/about" class="nds-btn nds-secondary-outline nds-oncolor nds-md"&gt;
              &lt;span class="nds-label"&gt;Learn More&lt;/span&gt;
            &lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

    &lt;/div&gt;
    &lt;div class="nds-swiper-navigation" hidden&gt;
      &lt;div class="nds-swiper-buttons"&gt;
        &lt;button class="nds-btn nds-subtle nds-icon-only nds-prev" type="button"
            aria-label="Previous slide"&gt;&lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-icon-only nds-next" type="button"
            aria-label="Next slide"&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="nds-swiper-pagination"&gt;&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;
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
    </div>
</section>

<!-- Built-in Features -->
<section id="heroFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-image-02"></i>
                            <span class="nds-label">Background Image Support</span>
                        </span>
                        <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">--hero_image</code> on the sub hero to place a branded photograph behind the gradient with no additional markup.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-blend"></i>
                            <span class="nds-label">CSS Mask Image Fade</span>
                        </span>
                        <p class="nds-item-desc">A CSS mask fades the background image to transparent on the content side so the page background color shows through — no gradient color matching needed when the theme or background token changes.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layout-03"></i>
                            <span class="nds-label">Flat Variant</span>
                        </span>
                        <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-flat</code> to switch to a plain page background with no gradient, suited for utility and documentation pages.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-sidebar-right"></i>
                            <span class="nds-label">Aside Layout Mode</span>
                        </span>
                        <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-aside</code> to narrow the hero content area to leave room for a <a class="nds-color" href="{{ 'ui-shell/sideinfo' | relative_url }}">Side Info</a> panel sitting alongside on desktop.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-cursor-01"></i>
                            <span class="nds-label">Dual Action Slots</span>
                        </span>
                        <p class="nds-item-desc">The sub hero has a float action slot inside the heading for contextual tools and a standard action slot below the description for primary calls-to-action.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-flip-horizontal"></i>
                            <span class="nds-label">Bidirectional Mask</span>
                        </span>
                        <p class="nds-item-desc">The mask fade direction flips automatically between RTL (Arabic) and LTR (English), so the image always appears on the correct edge and text remains readable in both directions.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="heroGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the sub hero on every content page as the primary title area. Pair it with the <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a> for complete shell structure</li>
                    <li>Reserve the main hero slider for home pages and top-level hub pages. It occupies 60% of the viewport height and is inappropriate for deep content pages</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-flat</code> on pages where a gradient or brand-colored header would feel heavy, such as documentation pages, search results, and admin interfaces</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-aside</code> only when the page layout also includes a <a class="nds-color" href="{{ 'ui-shell/sideinfo' | relative_url }}">Side Info</a> panel. Without the panel, the narrowed content area looks unbalanced</li>
                    <li>Keep sub hero descriptions to one or two sentences. The hero is an orientation area, not a content section</li>
                    <li>Add action buttons sparingly. One or two calls-to-action in the standard slot is enough. Overcrowding the hero with buttons competes with the page content below</li>
                    <li>For main hero slides, use the float action slot (such as a share button) for tools rather than navigation. Visitors who arrived on the page are past the "where to go" decision</li>
                    <li>Background images on the sub hero should have a clear subject on the start edge (right in RTL, left in LTR) — the mask keeps that edge fully opaque while fading toward the content area</li>
                    <li>Set <code class="nds-inline-code lang-html">fetchpriority="high"</code> on the first main hero slide image. It is the Largest Contentful Paint element on home pages and skipping this degrades Core Web Vitals scores</li>
                    <li>Preload that same first slide image in the page <code class="nds-inline-code lang-html">&lt;head&gt;</code>, one <code class="nds-inline-code lang-html">&lt;link rel="preload" as="image"&gt;</code> per breakpoint. The image sits in a <code class="nds-inline-code lang-html">&lt;picture&gt;</code> deep in the body, so the browser finds it late and the download starts after the page parses. Repeat the <code class="nds-inline-code lang-html">media</code> conditions from the slide's <code class="nds-inline-code lang-html">&lt;source&gt;</code> elements exactly, or the browser preloads one file and then paints another. The preload is page-specific: each page preloads its own hero image, and a page with no hero image carries none of these lines. See <a class="nds-color" href="{{ 'ui-shell/head' | relative_url }}">Head</a> for the block to copy</li>
                    <li>Use <code class="nds-inline-code lang-html">data-src</code> on second and later main hero slides to defer image loading until the slide is about to appear. Add <code class="nds-inline-code lang-html">data-srcset</code> on their <code class="nds-inline-code lang-html">&lt;source&gt;</code> elements too — a plain <code class="nds-inline-code lang-html">srcset</code> there loads straight away and the deferral is lost</li>
                    <li>The canonical main hero carries a photograph. If you do not have one yet, keep the <code class="nds-inline-code lang-html">&lt;picture&gt;</code> and point it at a placeholder image, then replace the file later. A hero with no image is a design choice the project makes on purpose, not the shape to fall back to when an image file is missing</li>
                    <li>Leave <code class="nds-inline-code lang-html">--img-overlay-color</code> alone. It already carries the brand surface color and follows a brand re-tint on its own. Setting it by hand replaces a themeable token with a fixed value, and that hero then stops following the theme</li>
                    <li>Do not use <code class="nds-inline-code lang-html">nds-flat</code> on a main hero. It is a sub hero class and does nothing here</li>
                    <li>Adjust <code class="nds-inline-code lang-html">--overlay</code> per slide on the main hero to match each image's brightness. Dark images need lower values (0.4-0.5), bright outdoor images need higher values (0.6-0.8)</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Applied To</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-sub</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-hero-section</code></td>
                            <td>Compact sub-page variant with gradient background, fit-content height, and reduced typography scale</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-flat</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-hero-section.nds-sub</code></td>
                            <td>Removes the gradient and brand background, rendering the hero on the standard page background color. Sub hero only: the rule is scoped to <code class="nds-inline-code lang-html">.nds-sub</code>, so the class has no effect on the main hero slider. Text inside a flat hero must not carry <code class="nds-inline-code lang-html">nds-oncolor</code>, which would render white on white</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-aside</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-hero-section.nds-sub</code></td>
                            <td>Narrows the hero content area at desktop width to leave room for a Side Info panel alongside</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--hero_image</code></td>
                            <td>none</td>
                            <td>Background image URL for the sub hero. Set as an inline style: <code class="nds-inline-code lang-html">style="--hero_image: url('...')"</code>. The CSS mask fades it automatically.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--hero-mask-angle</code></td>
                            <td><code class="nds-inline-code lang-html">90deg</code> RTL / <code class="nds-inline-code lang-html">270deg</code> LTR</td>
                            <td>Direction of the mask gradient. Auto-set per text direction; override with a fixed angle for a top-to-bottom or diagonal fade.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--hero-mask-from</code></td>
                            <td><code class="nds-inline-code lang-html">0%</code></td>
                            <td>Start position of the fully opaque image edge. Increase to push the visible area inward from the start edge.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--hero-mask-to</code></td>
                            <td><code class="nds-inline-code lang-html">70%</code></td>
                            <td>Point at which the image fully fades out. Decrease for a sharper cut, increase to reveal more of the image behind the content area.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--overlay</code></td>
                            <td><code class="nds-inline-code lang-html">0.7</code></td>
                            <td>Opacity of the dark overlay on the main hero image wrapper. Set on <code class="nds-inline-code lang-html">.nds-hero-image-wrapper</code> via inline style. Range: 0 (transparent) to 1 (fully opaque).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--img-overlay-color</code></td>
                            <td><code class="nds-inline-code lang-html">--colors-primary-950</code></td>
                            <td>Color of that overlay. It is a global token that already follows the active brand, so leave it at its default. Override it on the wrapper only to recolor one slide against the brand, and expect that slide to stay fixed while the rest of the theme changes.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
