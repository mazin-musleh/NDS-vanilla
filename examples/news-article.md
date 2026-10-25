---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: News Article
hero_title: Twelve new service centers open in Riyadh
hero_description: The centers take visitors with no appointment, seven days a week, for people who cannot finish a service online.
hero_tags:
  - label: "Announcement"
    style: "nds-green"
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---

<!-- Layout rules: one news article, as a CMS renders it.
     - The headline and the summary are the hero; the category is a hero tag. The hero's Share shares the article.
     - The article's facts (dates, category, reading time, press contact) are the side info column (nds-has-sideinfo),
       which also keeps the text lines short enough to read.
     - The body is prose (nds-prose), as the CMS writes it: the cover image in a figure with a caption, plain headings
       from h2, a Quote next to the text it supports.
     - Photos people look at closely are a gallery of Image Popup Viewer thumbnails in the prose, each with a title.
     - The author closes the article as a Persona.
     - More news is a Swiper of image cards in a breakout body, each with a Meta line and one link. -->

<section id="news-article" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <article class="nds-prose nds-block">
                <figure>
                    <img src="{{ 'assets/img/riyadhcenter.webp' | relative_url }}" alt="The King Abdullah Financial District in Riyadh at dusk" width="1280" height="720">
                    <figcaption>The first center opened in the King Abdullah Financial District on 20 October.</figcaption>
                </figure>
                <p>Twelve service centers opened across Riyadh this week. Each one serves visitors with no appointment, from 8 AM to 10 PM, seven days a week.</p>
                <p>The centers are for people who start a service online and cannot finish it there: a document that needs a signature, a photo that the system rejects, or a question that needs a person to answer.</p>
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
                <!-- Image Popup Viewer thumbnails, each with a title. The viewer leaves their size to you: one ratio keeps the row even -->
                <div class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
                    <div>
                        <div class="nds-ipv-image-card nds-zoom-badge">
                            <img src="{{ 'docs-assets/img/home_hero_bg_sm.webp' | relative_url }}" data-ipv-full="{{ 'docs-assets/img/home_hero_bg.webp' | relative_url }}" alt="A mud-brick palace beside the Diriyah center" class="nds-ipv-thumbnail" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover;">
                        </div>
                        <div class="nds-ipv-image-title">The Diriyah center</div>
                    </div>
                    <div>
                        <div class="nds-ipv-image-card nds-zoom-badge">
                            <img src="{{ 'assets/img/riyadhcenter3s.webp' | relative_url }}" data-ipv-full="{{ 'assets/img/riyadhcenter.webp' | relative_url }}" alt="Towers of the financial district at night" class="nds-ipv-thumbnail" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover;">
                        </div>
                        <div class="nds-ipv-image-title">The financial district center</div>
                    </div>
                    <div>
                        <div class="nds-ipv-image-card nds-zoom-badge">
                            <img src="{{ 'docs-assets/events/foundation_day/Hero_thumb.webp' | relative_url }}" data-ipv-full="{{ 'docs-assets/events/foundation_day/Hero_bg.webp' | relative_url }}" alt="A visitor in traditional dress at the opening" class="nds-ipv-thumbnail" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover;">
                        </div>
                        <div class="nds-ipv-image-title">The first visitors</div>
                    </div>
                </div>
            </article>

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

        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="Article details">
            <div class="nds-card nds-stroke nds-shadow">
                <dl class="nds-definition-list">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                            <span class="nds-label">Published</span>
                        </dt>
                        <dd><time datetime="2026-10-22">22 October 2026</time></dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-edit-02" aria-hidden="true"></i>
                            <span class="nds-label">Updated</span>
                        </dt>
                        <dd><time datetime="2026-10-23">23 October 2026</time>: the opening hours</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-folder-01" aria-hidden="true"></i>
                            <span class="nds-label">Category</span>
                        </dt>
                        <dd>Announcement</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                            <span class="nds-label">Reading time</span>
                        </dt>
                        <dd>3 minutes</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-mail-01" aria-hidden="true"></i>
                            <span class="nds-label">Press contact</span>
                        </dt>
                        <dd><a href="mailto:media@example.gov.sa">media@example.gov.sa</a></dd>
                    </div>
                </dl>
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
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Passport renewal now takes one day</span>
                                <p class="nds-card-description">A renewed passport is ready the next working day at the office the applicant picks.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                    19 October 2026
                                </span>
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                    2 min read
                                </span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: Passport renewal now takes one day">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">New rules for home businesses</span>
                                <p class="nds-card-description">A home business can now register online with one document and no visit.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                    15 October 2026
                                </span>
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                    4 min read
                                </span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: New rules for home businesses">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Survey: 9 in 10 users rate the portal good</span>
                                <p class="nds-card-description">The yearly survey of 40,000 users found the portal faster and easier to use than last year.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                    8 October 2026
                                </span>
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                    3 min read
                                </span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: Survey: 9 in 10 users rate the portal good">
                                <span class="nds-label">Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">The service portal in sign language</span>
                                <p class="nds-card-description">Twenty of the most used services now have a short sign language video on their page.</p>
                            </div>
                            <span class="nds-meta">
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                    1 October 2026
                                </span>
                                <span class="nds-meta-item">
                                    <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                    2 min read
                                </span>
                            </span>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-secondary-outline" aria-label="Read more: The service portal in sign language">
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
