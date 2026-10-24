---
layout: page
title: Training Academy
hero_title: Training Academy
hero_description: A government training center's home page, with four lists that each show their items a different way.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
content_class: nds-stripe
sidemenu_mode: false
last_edit: "24/10/2026 - 11:27 PM"
---

<!-- Layout rules: pick a list's look by how much each item holds.
     - Places to go, an icon and a name each: link cards as navigation tiles, the whole card one link (Course categories). A whole-card link is only for this.
     - Items with several details to compare, such as an image, tags, a rating and a price: full cards with action buttons, in a Swiper when there are more than fit in one row (Featured courses).
     - A short list the user opens one item at a time, newest first: Drawer rows with a Date Tile and a Meta line (Latest announcements). A plain list of page links is a Drawer too, with an arrow on each row.
     - An icon, a title and one line, read at a glance: a Definition List in a grid (Why train with us).
     - Records the user sorts, filters or pages: a Table, as in the Manage Records example. A full catalog with search and filters: the Services List example. -->

<!-- Course categories: link cards as navigation tiles, an icon and a name each -->
<section id="categories" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Course categories</h2>
            <p class="nds-section-description">Browse the courses in each field.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-col: 6; --mid-col: 3; --min-col: 2;">
                <a href="#" class="nds-card nds-stroke nds-center">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                <i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <span class="nds-card-title">Leadership</span>
                    </div>
                </a>
                <a href="#" class="nds-card nds-stroke nds-center">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                <i class="hgi hgi-stroke hgi-computer" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <span class="nds-card-title">Digital skills</span>
                    </div>
                </a>
                <a href="#" class="nds-card nds-stroke nds-center">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                <i class="hgi hgi-stroke hgi-money-bag-02" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <span class="nds-card-title">Finance and budgets</span>
                    </div>
                </a>
                <a href="#" class="nds-card nds-stroke nds-center">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                <i class="hgi hgi-stroke hgi-megaphone-01" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <span class="nds-card-title">Communication</span>
                    </div>
                </a>
                <a href="#" class="nds-card nds-stroke nds-center">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                <i class="hgi hgi-stroke hgi-book-open-01" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <span class="nds-card-title">Languages</span>
                    </div>
                </a>
                <a href="#" class="nds-card nds-stroke nds-center">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                <i class="hgi hgi-stroke hgi-award-01" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <span class="nds-card-title">Quality and excellence</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Featured courses: a Swiper of full cards with an image, a status corner, tags, a rating, a price and actions -->
<section id="courses" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Featured courses</h2>
            <p class="nds-section-description">The courses with the most seats booked this term.</p>
        </div>
    </div>
    <div class="nds-section-body nds-max-width">
        <div class="nds-swiper" style="--max-slides: 3; --mid-slides: 2; --min-slides: 1; --peek: 40px">
            <div class="nds-swiper-wrapper">
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="A trainee reading a data dashboard" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <div class="nds-card-corner">
                                    <span class="nds-tag nds-xs nds-inverted" data-status="warning">
                                        <span class="nds-label">5 seats left</span>
                                    </span>
                                </div>
                                <span class="nds-card-title">Data analysis for decision makers</span>
                                <span class="nds-card-subtitle">5 days · Online</span>
                                <p class="nds-card-description">Read dashboards, test a claim with data, and present the result to leaders.</p>
                            </div>
                            <div class="nds-card-value">
                                <span class="nds-number-format" data-currency="SAR">2400</span>
                            </div>
                            <div class="nds-card-meta">
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Data</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Intermediate</span>
                                    </span>
                                </div>
                                <div class="nds-card-rating">
                                    <div class="nds-rating nds-sm" data-rating="4.7">
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                    </div>
                                    <span class="nds-card-rating-text">(86 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-primary nds-lg">
                                <span class="nds-label">Enroll</span>
                            </a>
                            <a href="#" class="nds-btn nds-secondary-outline nds-lg">
                                <span class="nds-label">Details</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="A project plan on a whiteboard" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Project management basics</span>
                                <span class="nds-card-subtitle">3 days · Jeddah center</span>
                                <p class="nds-card-description">Plan a project, track its risks, and report progress in a weekly update.</p>
                            </div>
                            <div class="nds-card-value">
                                <span class="nds-number-format" data-currency="SAR">1500</span>
                                <s class="nds-number-format" data-currency="SAR">1800</s>
                            </div>
                            <div class="nds-card-meta">
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Management</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Beginner</span>
                                    </span>
                                </div>
                                <div class="nds-card-rating">
                                    <div class="nds-rating nds-sm" data-rating="4.4">
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                    </div>
                                    <span class="nds-card-rating-text">(132 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-primary nds-lg">
                                <span class="nds-label">Enroll</span>
                            </a>
                            <a href="#" class="nds-btn nds-secondary-outline nds-lg">
                                <span class="nds-label">Details</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="A user testing a website with a screen reader" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Accessible digital services</span>
                                <span class="nds-card-subtitle">2 days · Online</span>
                                <p class="nds-card-description">Check a service against WCAG, and fix the problems users meet most often.</p>
                            </div>
                            <div class="nds-card-value">
                                <span class="nds-number-format" data-currency="SAR">900</span>
                            </div>
                            <div class="nds-card-meta">
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Digital</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">All levels</span>
                                    </span>
                                </div>
                                <div class="nds-card-rating">
                                    <div class="nds-rating nds-sm" data-rating="4.9">
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                    </div>
                                    <span class="nds-card-rating-text">(41 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-primary nds-lg">
                                <span class="nds-label">Enroll</span>
                            </a>
                            <a href="#" class="nds-btn nds-secondary-outline nds-lg">
                                <span class="nds-label">Details</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="A trainee writing a service form" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">Writing for government services</span>
                                <span class="nds-card-subtitle">2 days · Riyadh center</span>
                                <p class="nds-card-description">Write clear forms, letters and alerts that users understand the first time.</p>
                            </div>
                            <div class="nds-card-value">
                                <span class="nds-number-format" data-currency="SAR">750</span>
                            </div>
                            <div class="nds-card-meta">
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Communication</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">All levels</span>
                                    </span>
                                </div>
                                <div class="nds-card-rating">
                                    <div class="nds-rating nds-sm" data-rating="4.6">
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                    </div>
                                    <span class="nds-card-rating-text">(58 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-primary nds-lg">
                                <span class="nds-label">Enroll</span>
                            </a>
                            <a href="#" class="nds-btn nds-secondary-outline nds-lg">
                                <span class="nds-label">Details</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nds-swiper-slide">
                    <div class="nds-card nds-stroke">
                        <div class="nds-card-header">
                            <div class="nds-card-image">
                                <img src="{{ 'assets/img/placeholder.svg' | relative_url }}" alt="A manager reviewing a budget sheet" width="1600" height="900" loading="lazy">
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <div class="nds-card-corner">
                                    <span class="nds-tag nds-xs nds-inverted" data-status="info">
                                        <span class="nds-label">New</span>
                                    </span>
                                </div>
                                <span class="nds-card-title">Budget planning for managers</span>
                                <span class="nds-card-subtitle">4 days · Online</span>
                                <p class="nds-card-description">Build a yearly budget, track spending, and explain the gaps to your team.</p>
                            </div>
                            <div class="nds-card-value">
                                <span class="nds-number-format" data-currency="SAR">1900</span>
                            </div>
                            <div class="nds-card-meta">
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Finance</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Intermediate</span>
                                    </span>
                                </div>
                                <div class="nds-card-rating">
                                    <div class="nds-rating nds-sm" data-rating="4.5">
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                        <span class="nds-rating-star"></span>
                                    </div>
                                    <span class="nds-card-rating-text">(23 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-card-actions">
                            <a href="#" class="nds-btn nds-primary nds-lg">
                                <span class="nds-label">Enroll</span>
                            </a>
                            <a href="#" class="nds-btn nds-secondary-outline nds-lg">
                                <span class="nds-label">Details</span>
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

<!-- Latest announcements: Drawer rows, each one link with a Date Tile and a Meta line -->
<section id="announcements" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Latest announcements</h2>
            <p class="nds-section-description">New courses, changes to dates and registration deadlines.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-drawer nds-divided" style="--drawer-gap: var(--spacing-md);">
                <ul class="nds-drawer-list nds-empty" aria-label="Latest announcements" data-empty-message="No announcements yet">
                    <li>
                        <a href="#" class="nds-btn nds-subtle">
                            <time class="nds-date-tile" datetime="2026-10-22">
                                <span class="nds-date-tile-weekday">Thu</span>
                                <span class="nds-date-tile-day">22</span>
                                <span class="nds-date-tile-month">Oct</span>
                            </time>
                            <span class="nds-drawer-item">
                                <span class="nds-drawer-item-head">
                                    <span class="nds-tag" data-status="info">
                                        <span class="nds-label">New</span>
                                    </span>
                                    <span class="nds-label">Data analysis for decision makers opens for registration</span>
                                </span>
                                <span class="nds-meta">
                                    <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>Starts 9 Nov 2026</span>
                                    <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-laptop" aria-hidden="true"></i>Online</span>
                                </span>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nds-btn nds-subtle">
                            <time class="nds-date-tile" datetime="2026-10-19">
                                <span class="nds-date-tile-weekday">Mon</span>
                                <span class="nds-date-tile-day">19</span>
                                <span class="nds-date-tile-month">Oct</span>
                            </time>
                            <span class="nds-drawer-item">
                                <span class="nds-drawer-item-head">
                                    <span class="nds-tag" data-status="warning">
                                        <span class="nds-label">Changed</span>
                                    </span>
                                    <span class="nds-label">Project management basics moves to the Jeddah center</span>
                                </span>
                                <span class="nds-meta">
                                    <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Jeddah center, hall 3</span>
                                    <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>Same dates</span>
                                </span>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nds-btn nds-subtle">
                            <time class="nds-date-tile" datetime="2026-10-14">
                                <span class="nds-date-tile-weekday">Wed</span>
                                <span class="nds-date-tile-day">14</span>
                                <span class="nds-date-tile-month">Oct</span>
                            </time>
                            <span class="nds-drawer-item">
                                <span class="nds-drawer-item-head">
                                    <span class="nds-label">Registration for the winter term closes on 30 November</span>
                                </span>
                                <span class="nds-meta">
                                    <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>Closes 30 Nov 2026, 11:59 PM</span>
                                </span>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Why train with us: Definition List, feature list structure -->
<section id="why" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Why train with us</h2>
            <p class="nds-section-description">Courses built for government teams, taught by people who do the work.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1; --gap: var(--spacing-4xl);">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-certificate-01" aria-hidden="true"></i>
                        <span class="nds-label">Accredited certificates</span>
                    </span>
                    <p class="nds-item-desc">Each course ends with a certificate that counts toward your career record.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-teacher" aria-hidden="true"></i>
                        <span class="nds-label">Expert trainers</span>
                    </span>
                    <p class="nds-item-desc">Trainers come from the agencies that run the services you work on.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-laptop" aria-hidden="true"></i>
                        <span class="nds-label">Online or in class</span>
                    </span>
                    <p class="nds-item-desc">Join from your desk, or at one of our centers in Riyadh, Jeddah and Dammam.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>
                        <span class="nds-label">Team bookings</span>
                    </span>
                    <p class="nds-item-desc">Book a whole course for your department, on dates that suit your team.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-calendar-check-01" aria-hidden="true"></i>
                        <span class="nds-label">New dates every month</span>
                    </span>
                    <p class="nds-item-desc">Most courses run again within four weeks, so a missed date costs little.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mentoring" aria-hidden="true"></i>
                        <span class="nds-label">Follow-up support</span>
                    </span>
                    <p class="nds-item-desc">Ask your trainer questions for 30 days after the course ends.</p>
                </div>
            </div>
        </div>
    </div>
</section>
