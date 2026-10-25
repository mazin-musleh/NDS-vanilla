---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: News Article
hero_style: "nds-flat"
hero_title: Twelve new service centers open in Riyadh
hero_description: The centers take visitors with no appointment, seven days a week, for people who cannot finish a service online.
# The byline under the headline: published and updated dates, the author, the reading time
hero_meta:
  - icon: "hgi-calendar-03"
    label: "22 October 2026"
    datetime: "2026-10-22T10:00+03:00"
  - icon: "hgi-edit-02"
    label: "Updated 23 October 2026"
    datetime: "2026-10-23T09:30+03:00"
  - icon: "hgi-user"
    label: "Noura Al-Qahtani"
  - icon: "hgi-clock-01"
    label: "3 min read"
# Share sits after the article, as a row of buttons
hide_share_page: true
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---

<!-- Layout rules: one news article, in the order news sites use.
     - Flat hero: the headline, the byline as a Meta line under it (hero_meta: dates with <time datetime>, author,
       reading time), then the summary.
     - The body is one nds-prose element, as the CMS writes it: the lead image in a figure with a caption and its credit,
       a dateline at the start of the first paragraph, headings from h2, a Quote next to the text it supports, and a gallery
       of Image Popup Viewer thumbnails for photos people look at closely.
     - After the body: Share as a row of buttons (the Inline structure), then the author as a Persona.
     - The side info column holds what news sites put beside an article: related news, most read, the press office,
       a one-field email signup and the Media Center's accounts. Each is a group with a title. It is not sticky.
     - More news is a Swiper of image cards in a breakout body, each with a Meta line and one link.
     - The NewsArticle JSON-LD block at the end gives search engines the headline, dates, author and image. -->

<section id="news-article" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <article class="nds-prose nds-block">
                <figure>
                    <img src="{{ 'assets/img/riyadhcenter.webp' | relative_url }}" alt="The King Abdullah Financial District in Riyadh at dusk" width="1280" height="720">
                    <figcaption>The first center opened in the King Abdullah Financial District on 20 October. Photo: Media Center</figcaption>
                </figure>
                <p><strong>Riyadh, 22 October 2026</strong> — Twelve service centers opened across Riyadh this week. Each one serves visitors with no appointment, from 8 AM to 10 PM, seven days a week.</p>
                <p>The centers are for people who start a service online and cannot finish it there: a document that needs a signature, a photo that the system rejects, or a question that needs a person to answer. In their first three days, the centers served more than 9,000 visitors, and the average wait was 11 minutes.</p>
                <h2>What the centers do</h2>
                <p>Staff help with more than 40 services from six government bodies. The most common are:</p>
                <ul>
                    <li>Renewing a national ID or a passport</li>
                    <li>Updating a national address</li>
                    <li>Registering a newborn</li>
                    <li>Checking and paying traffic fines</li>
                </ul>
                <p>Each center has a desk for older visitors and visitors with a disability, with a sign language interpreter on request.</p>
                <figure class="nds-quote">
                    <blockquote class="nds-quote-body">
                        <p class="nds-quote-text">Most people finish their services online. The centers are for everyone else, so that no one is left behind by a screen.</p>
                    </blockquote>
                    <figcaption class="nds-quote-author">
                        <div class="nds-persona nds-sm">
                            <div class="nds-avatar">
                                <img src="{{ 'docs-assets/img/avatar5.webp' | relative_url }}" alt="">
                            </div>
                            <div class="nds-persona-info">
                                <cite class="nds-persona-name">Fatima Al-Harbi</cite>
                                <span class="nds-persona-desc">Director of Service Centers</span>
                            </div>
                        </div>
                    </figcaption>
                </figure>
                <h2>Where to find them</h2>
                <p>The centers are in Olaya, Al Malqa, Al Naseem, Diriyah and eight other districts. The map on the services page shows each address and the wait time now.</p>
                <p>Eight more centers open in Jeddah and Dammam in 2027.</p>
                <h2>Photos from the opening</h2>
                <!-- Image Popup Viewer thumbnails, each with a title; nds-image gives the tiles one shape -->
                <div class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
                    <div>
                        <div class="nds-ipv-image-card nds-image nds-zoom-badge">
                            <img src="{{ 'docs-assets/img/home_hero_bg_sm.webp' | relative_url }}" data-ipv-full="{{ 'docs-assets/img/home_hero_bg.webp' | relative_url }}" alt="A mud-brick palace beside the Diriyah center" class="nds-ipv-thumbnail">
                        </div>
                        <div class="nds-ipv-image-title">The Diriyah center</div>
                    </div>
                    <div>
                        <div class="nds-ipv-image-card nds-image nds-zoom-badge">
                            <img src="{{ 'assets/img/riyadhcenter3s.webp' | relative_url }}" data-ipv-full="{{ 'assets/img/riyadhcenter.webp' | relative_url }}" alt="Towers of the financial district at night" class="nds-ipv-thumbnail">
                        </div>
                        <div class="nds-ipv-image-title">The financial district center</div>
                    </div>
                    <div>
                        <div class="nds-ipv-image-card nds-image nds-zoom-badge">
                            <img src="{{ 'docs-assets/events/foundation_day/Hero_thumb.webp' | relative_url }}" data-ipv-full="{{ 'docs-assets/events/foundation_day/Hero_bg.webp' | relative_url }}" alt="A visitor in traditional dress at the opening" class="nds-ipv-thumbnail">
                        </div>
                        <div class="nds-ipv-image-title">The first visitors</div>
                    </div>
                </div>
            </article>

            <!-- Share after the article: the Inline structure, a row of buttons -->
            <div class="nds-block">
                <h2 class="nds-block-title">Share this article</h2>
                <div class="nds-share">
                    <button class="nds-btn nds-secondary-outline nds-share-x" type="button" aria-label="Share on X" data-i18n-aria-label="share.share_on_x">
                        <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                        <span class="nds-label">X</span>
                    </button>
                    <button class="nds-btn nds-secondary-outline nds-share-linkedin" type="button" aria-label="Share on LinkedIn" data-i18n-aria-label="share.share_on_linkedin">
                        <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                        <span class="nds-label">LinkedIn</span>
                    </button>
                    <button class="nds-btn nds-secondary-outline nds-share-whatsapp" type="button" aria-label="Share on WhatsApp" data-i18n-aria-label="share.share_on_whatsapp">
                        <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
                        <span class="nds-label">WhatsApp</span>
                    </button>
                    <button class="nds-btn nds-secondary-outline nds-share-copy" type="button" aria-label="Copy Link" data-i18n-aria-label="share.copy_link" data-copy-label>
                        <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
                        <span class="nds-label" data-i18n="share.copy_link">Copy Link</span>
                    </button>
                </div>
            </div>

            <!-- The author: a Persona, with the role -->
            <div class="nds-block">
                <div class="nds-persona">
                    <div class="nds-avatar">
                        <img src="{{ 'docs-assets/img/avatar2.webp' | relative_url }}" alt="">
                    </div>
                    <div class="nds-persona-info">
                        <span class="nds-persona-name">Noura Al-Qahtani</span>
                        <span class="nds-persona-role">Media Center editor</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- The Media Center around the article: related and most read news, the press office, email news, accounts.
             Each block is a group with a title; a card is optional. Not sticky: the column is longer than a screen -->
        <aside class="nds-sideinfo" aria-label="More from the Media Center">
            <div class="nds-sideinfo-group">
                <span class="nds-sideinfo-title">Related news</span>
                <div class="nds-drawer nds-divided">
                    <ul class="nds-drawer-list">
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">Wait times at every center, live on the map</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-10-21">21 October 2026</time></span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">Sign language at 20 more services</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-10-01">1 October 2026</time></span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">Book a visit to a center online</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-09-14">14 September 2026</time></span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">2026 plan: 20 centers in three cities</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-02-03">3 February 2026</time></span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Most read this week: links with a reach count -->
            <div class="nds-sideinfo-group">
                <span class="nds-sideinfo-title">Most read this week</span>
                <div class="nds-drawer nds-divided">
                    <ul class="nds-drawer-list">
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">Hajj permits open on the portal</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>48,200 reads</span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">Traffic fines can now be paid in parts</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>31,900 reads</span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-label">New rules for home businesses</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>17,350 reads</span>
                                    </span>
                                </span>
                                <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Press office: each contact with a Copy button, as on the Contact Us template -->
            <div class="nds-sideinfo-group">
                <span class="nds-sideinfo-title">Press office</span>
                <dl class="nds-definition-list">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                            <span class="nds-label">Phone</span>
                        </dt>
                        <dd class="nds-item-action">
                            <a href="tel:+966112345678" class="nds-primary">
                                <span class="nds-label nds-ltr">+966 11 234 5678</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy" data-copy="+966112345678" aria-label="Copy phone number">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                            <span class="nds-label">Email</span>
                        </dt>
                        <dd class="nds-item-action">
                            <a href="mailto:media@example.gov.sa" class="nds-primary">
                                <span class="nds-label">media@example.gov.sa</span>
                            </a>
                            <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy" data-copy="media@example.gov.sa" aria-label="Copy email">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
            <!-- Newsletter: a one-field form -->
            <div class="nds-sideinfo-group">
                <span class="nds-sideinfo-title">News by email</span>
                <form id="news-subscribe" class="nds-form" data-ajax>
                    <div class="nds-form-container" data-required>
                        <div class="nds-form-header">
                            <label for="news-email">
                                <span class="nds-label">Email address</span>
                                <span class="nds-info">One email a week, with the main news</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                            <input type="email" id="news-email" name="email" class="nds-input" placeholder="name@example.com" autocomplete="email">
                            <div class="nds-form-action">
                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear email" hidden>
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nds-form-actions">
                        <button type="submit" class="nds-btn nds-primary">
                            <span class="nds-label">Subscribe</span>
                        </button>
                    </div>
                </form>
            </div>
            <!-- Follow: the Media Center's accounts, as on the Contact Us template -->
            <div class="nds-sideinfo-group">
                <span class="nds-sideinfo-title">Follow the Media Center</span>
                <div class="nds-social-links">
                    <a href="https://x.com/" target="_blank" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on X">
                        <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on LinkedIn">
                        <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                    </a>
                    <a href="https://instagram.com/" target="_blank" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on Instagram">
                        <i class="hgi hgi-stroke hgi-instagram"></i>
                    </a>
                    <a href="https://youtube.com/" target="_blank" class="nds-btn nds-subtle nds-icon-only nds-md" aria-label="Follow us on YouTube">
                        <i class="hgi hgi-stroke hgi-youtube"></i>
                    </a>
                </div>
            </div>
        </aside>
    </div>
</section>

<!-- More news: a Swiper of image cards in a breakout body; each card has one link -->
<section id="more-news" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">More news</h2>
        </div>
    </div>
    <div class="nds-section-body nds-max-width">
        <div class="nds-swiper" style="--max-slides: 3; --mid-slides: 2; --min-slides: 1; --peek: 40px">
            <div class="nds-swiper-wrapper">
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'docs-assets/events/Hajj/hajj_thumb.webp' | relative_url }}" alt="" width="480" height="320" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Hajj permits open on the portal</span>
                                <p class="nds-card-description">Citizens and residents can apply for this season's permit online, with the result in three days.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-10-19">19 October 2026</time></span>
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>2 min read</span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: Hajj permits open on the portal">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'docs-assets/events/national_day_96/nd96_thumb.webp' | relative_url }}" alt="" width="545" height="364" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Service hours over the National Day holiday</span>
                                <p class="nds-card-description">Online services run as usual. Six centers stay open for urgent documents.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-09-18">18 September 2026</time></span>
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>1 min read</span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: Service hours over the National Day holiday">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/riyadhcenter_ai.webp' | relative_url }}" alt="" width="1536" height="550" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">A digital assistant now answers on the portal</span>
                                <p class="nds-card-description">The assistant answers questions about 300 services in Arabic and English, day and night.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-09-02">2 September 2026</time></span>
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>4 min read</span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: A digital assistant now answers on the portal">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'docs-assets/img/home_hero_bg_md.webp' | relative_url }}" alt="" width="1646" height="550" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">The Diriyah center wins a design award</span>
                                <p class="nds-card-description">The jury praised a building that serves visitors in the style of the old town around it.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i><time datetime="2026-08-25">25 August 2026</time></span>
                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>3 min read</span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: The Diriyah center wins a design award">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-swiper-navigation" hidden>
                <div class="nds-swiper-buttons">
                    <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" aria-label="Previous slide" data-i18n-aria-label="swiper.previous_slide"></button>
                    <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" aria-label="Next slide" data-i18n-aria-label="swiper.next_slide"></button>
                </div>
                <div class="nds-swiper-pagination"></div>
            </div>
        </div>
    </div>
</section>

<script>
  function initPage() {
    // Subscribe: the form waits on the request, then says so
    document.getElementById('news-subscribe').addEventListener('nds:form:valid', function (e) {
      var form = e.target;
      e.detail.waitUntil(new Promise(function (resolve) { setTimeout(resolve, 800); }).then(function () {
        form.reset();
        NDS.Alert.create({ variant: 'success', title: 'Subscribed', description: 'The first email arrives on Sunday.', display: 'toast', duration: 4000 });
      }));
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>

<!-- Structured data for search engines (schema.org NewsArticle): the same headline, dates, author and image as the page -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Twelve new service centers open in Riyadh",
  "description": "The centers take visitors with no appointment, seven days a week, for people who cannot finish a service online.",
  "image": [ "{{ 'assets/img/riyadhcenter.webp' | absolute_url }}" ],
  "datePublished": "2026-10-22T10:00+03:00",
  "dateModified": "2026-10-23T09:30+03:00",
  "author": [ { "@type": "Person", "name": "Noura Al-Qahtani" } ]
}
</script>
