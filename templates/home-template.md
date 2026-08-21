---
exclude_showcase: true
layout: shell
# `shell` emits the document and the scripts only — no header, hero, content layout or
# footer. This page composes all of them below, so THIS file shows the whole page shape
# in order. It does not show the chrome markup: those are includes.
#
# For the literal markup, read the built twin: _site/templates/home-template.html.
# It is one complete standalone page — doctype through scripts, no Liquid left — and it
# is what ships in the release zip, so it is exactly what a project copies.
# For one region on its own, read its reference: ui-shell/topbar, ui-shell/mainnav,
# ui-shell/footer, ui-shell/head.
title: Home Page Template
lang: en
direction: ltr
---

<header>
    {% include topbar.html %}
    {% include mainnav.html %}
</header>

<main>

    <section class="nds-hero-section">
        <div class="nds-swiper nds-hero nds-middle nds-oncolor nds-full-width" style="--total: 3">
            <div class="nds-swiper-wrapper">
                <div class="nds-swiper-slide nds-content-wrapper">
                    <div class="nds-hero-image-wrapper" style="--overlay: 0.8;">
                        <picture>
                            <source media="(max-width: 768px)" srcset="{{ 'docs-assets/img/home_hero_bg_sm.webp' | relative_url }}">
                            <source media="(max-width: 1646px)" srcset="{{ 'docs-assets/img/home_hero_bg_md.webp' | relative_url }}">
                            <img src="{{ 'docs-assets/img/home_hero_bg.webp' | relative_url }}" class="nds-hero-image" alt="" fetchpriority="high">
                        </picture>
                    </div>
                    <div class="nds-section-body">
                        <h1 class="nds-section-title">Hero Section</h1>
                        <p class="nds-section-description">Here you can add a brief description about the purpose of the portal followed with a call to action button and an image or an illustration on the left hand side.</p>
                        <div class="nds-section-action">
                            <a href="#services" class="nds-btn nds-primary nds-oncolor nds-md">
                                <span class="nds-label">Primary Button</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nds-swiper-slide nds-content-wrapper" hidden>
                    <div class="nds-hero-image-wrapper" style="--overlay: 0.8;">
                        <picture>
                            <source media="(max-width: 768px)" data-srcset="{{ 'docs-assets/img/home_hero_bg_sm.webp' | relative_url }}">
                            <source media="(max-width: 1646px)" data-srcset="{{ 'docs-assets/img/home_hero_bg_md.webp' | relative_url }}">
                            <img data-src="{{ 'docs-assets/img/home_hero_bg.webp' | relative_url }}" class="nds-hero-image" alt="">
                        </picture>
                    </div>
                    <div class="nds-section-body">
                        <h2 class="nds-section-title">Second Slide</h2>
                        <p class="nds-section-description">Each slide carries its own heading, description and call to action. Keep the first slide's heading an h1 and every later one an h2.</p>
                        <div class="nds-section-action">
                            <a href="#services" class="nds-btn nds-primary nds-oncolor nds-md">
                                <span class="nds-label">Primary Button</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nds-swiper-slide nds-content-wrapper" hidden>
                    <div class="nds-hero-image-wrapper" style="--overlay: 0.8;">
                        <picture>
                            <source media="(max-width: 768px)" data-srcset="{{ 'docs-assets/img/home_hero_bg_sm.webp' | relative_url }}">
                            <source media="(max-width: 1646px)" data-srcset="{{ 'docs-assets/img/home_hero_bg_md.webp' | relative_url }}">
                            <img data-src="{{ 'docs-assets/img/home_hero_bg.webp' | relative_url }}" class="nds-hero-image" alt="">
                        </picture>
                    </div>
                    <div class="nds-section-body">
                        <h2 class="nds-section-title">Third Slide</h2>
                        <p class="nds-section-description">Three slides is a sensible ceiling for a home page hero. Past that, visitors rarely reach the later slides.</p>
                        <div class="nds-section-action">
                            <a href="#news" class="nds-btn nds-primary nds-oncolor nds-md">
                                <span class="nds-label">Primary Button</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div class="nds-swiper-navigation" hidden>
                <div class="nds-swiper-buttons">
                    <button class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-prev" type="button" aria-label="Previous slide"></button>
                    <button class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-next" type="button" aria-label="Next slide"></button>
                </div>
                <div class="nds-swiper-pagination"></div>
            </div>
        </div>
    </section>

    <div class="nds-content-layout">
        <div class="nds-main-content nds-stripe">
        <section id="about" class="nds-content-section">
            <div class="nds-section-wrapper">
                <div class="nds-section-head">
                    <div class="nds-section-action">
                        <a href="#" class="nds-btn nds-secondary-outline">
                            <span class="nds-label">Secondary</span>
                        </a>
                    </div>
                    <h2 class="nds-section-title">About us Section</h2>
                    <p class="nds-section-description">Here you can add a brief description about the purpose of the portal
                        followed by a call to action button and an image or an illustration on the left hand side.</p>
                </div>
                <div class="nds-section-body">
                    <div class="nds-block">
                        <div class="nds-grid nds-center" style="--max-col:4;--mid-col:2;--min-col:2;">
                            <div class="nds-card nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value" data-target="1.5M">0</span>
                                        <p class="nds-card-description">Person</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-card nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-plus-sign" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value" data-target="1.5M">0</span>
                                        <p class="nds-card-description">Person</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-card nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-star" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value" data-target="1.5M">0</span>
                                        <p class="nds-card-description">Person</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-card nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-leaf-01" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value" data-target="1.5M">0</span>
                                        <p class="nds-card-description">Person</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="services" class="nds-content-section">
            <div class="nds-section-wrapper">
                <div class="nds-section-head">
                    <div class="nds-section-action">
                        <a href="#" class="nds-btn nds-secondary-outline">
                            <span class="nds-label">View all</span>
                        </a>
                    </div>
                    <h2 class="nds-section-title">Services Section</h2>
                    <p class="nds-section-description">Here you can add a brief description about the purpose of the portal
                        followed by a call to action button and an image or an illustration on the left hand side.</p>
                </div>
                <div class="nds-section-body nds-max-width">
                    <div class="nds-block">
                        <div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="40">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke">
                                        <div class="nds-card-header">
                                            <div class="nds-card-featured-icon">
                                                <span class="nds-featured-icon nds-circle nds-lg">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <span class="nds-card-title">Card Title</span>
                                                <p class="nds-card-description">Card content placeholder text goes here</p>
                                            </div>
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 1</span></span>
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 2</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Tag 3</span></span>
                                            </div>
                                        </div>
                                        <div class="nds-card-actions">
                                            <a href="#" class="nds-btn nds-secondary-outline">
                                                <span class="nds-label">Action</span>
                                            </a>
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Action</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke">
                                        <div class="nds-card-header">
                                            <div class="nds-card-featured-icon">
                                                <span class="nds-featured-icon nds-circle nds-lg">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <span class="nds-card-title">Card Title</span>
                                                <p class="nds-card-description">Card content placeholder text goes here</p>
                                            </div>
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 1</span></span>
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 2</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Tag 3</span></span>
                                            </div>
                                        </div>
                                        <div class="nds-card-actions">
                                            <a href="#" class="nds-btn nds-secondary-outline">
                                                <span class="nds-label">Action</span>
                                            </a>
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Action</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke">
                                        <div class="nds-card-header">
                                            <div class="nds-card-featured-icon">
                                                <span class="nds-featured-icon nds-circle nds-lg">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <span class="nds-card-title">Card Title</span>
                                                <p class="nds-card-description">Card content placeholder text goes here</p>
                                            </div>
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 1</span></span>
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 2</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Tag 3</span></span>
                                            </div>
                                        </div>
                                        <div class="nds-card-actions">
                                            <a href="#" class="nds-btn nds-secondary-outline">
                                                <span class="nds-label">Action</span>
                                            </a>
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Action</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke">
                                        <div class="nds-card-header">
                                            <div class="nds-card-featured-icon">
                                                <span class="nds-featured-icon nds-circle nds-lg">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <span class="nds-card-title">Card Title</span>
                                                <p class="nds-card-description">Card content placeholder text goes here</p>
                                            </div>
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 1</span></span>
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 2</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Tag 3</span></span>
                                            </div>
                                        </div>
                                        <div class="nds-card-actions">
                                            <a href="#" class="nds-btn nds-secondary-outline">
                                                <span class="nds-label">Action</span>
                                            </a>
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Action</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke">
                                        <div class="nds-card-header">
                                            <div class="nds-card-featured-icon">
                                                <span class="nds-featured-icon nds-circle nds-lg">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <span class="nds-card-title">Card Title</span>
                                                <p class="nds-card-description">Card content placeholder text goes here</p>
                                            </div>
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 1</span></span>
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 2</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Tag 3</span></span>
                                            </div>
                                        </div>
                                        <div class="nds-card-actions">
                                            <a href="#" class="nds-btn nds-secondary-outline">
                                                <span class="nds-label">Action</span>
                                            </a>
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Action</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke">
                                        <div class="nds-card-header">
                                            <div class="nds-card-featured-icon">
                                                <span class="nds-featured-icon nds-circle nds-lg">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <span class="nds-card-title">Card Title</span>
                                                <p class="nds-card-description">Card content placeholder text goes here</p>
                                            </div>
                                            <div class="nds-card-tags">
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 1</span></span>
                                                <span class="nds-tag nds-blue nds-sm"><span class="nds-label">Tag 2</span></span>
                                                <span class="nds-tag nds-gray nds-sm"><span class="nds-label">Tag 3</span></span>
                                            </div>
                                        </div>
                                        <div class="nds-card-actions">
                                            <a href="#" class="nds-btn nds-secondary-outline">
                                                <span class="nds-label">Action</span>
                                            </a>
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Action</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-navigation" hidden>
                                <div class="nds-swiper-buttons">
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                                        aria-label="Previous services"></button>
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                                        aria-label="Next services"></button>
                                </div>
                                <div class="nds-swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="news" class="nds-content-section">
            <div class="nds-section-wrapper">
                <div class="nds-section-head">
                    <div class="nds-section-action">
                        <a href="#" class="nds-btn nds-secondary-outline">
                            <span class="nds-label">View all</span>
                        </a>
                    </div>
                    <h2 class="nds-section-title">Articles and News Section</h2>
                    <p class="nds-section-description">Here you can add a brief description about the purpose of the portal.</p>
                </div>
                <div class="nds-section-body">
                    <div class="nds-block">
                        <div class="nds-swiper" slides-max="3" slides-mid="2" slides-min="1" peek="0">
                            <div class="nds-swiper-wrapper">
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image">
                                        <img src="{{ 'docs-assets/img/card_img.webp' | relative_url }}" width="650"
                                            height="371" alt="" loading="lazy" decoding="async">
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">The Title of the News Card in two Lines</span>
                                        <p class="nds-card-description">Here you can include a brief description of the headline
                                            in four lines. Here you can include a brief description of the headline in four
                                            lines.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="nds-label">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image">
                                        <img src="{{ 'docs-assets/img/card_img.webp' | relative_url }}" width="650"
                                            height="371" alt="" loading="lazy" decoding="async">
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">The Title of the News Card in two Lines</span>
                                        <p class="nds-card-description">Here you can include a brief description of the headline
                                            in four lines. Here you can include a brief description of the headline in four
                                            lines.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="nds-label">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image">
                                        <img src="{{ 'docs-assets/img/card_img.webp' | relative_url }}" width="650"
                                            height="371" alt="" loading="lazy" decoding="async">
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">The Title of the News Card in two Lines</span>
                                        <p class="nds-card-description">Here you can include a brief description of the headline
                                            in four lines. Here you can include a brief description of the headline in four
                                            lines.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="nds-label">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image">
                                        <img data-src="{{ 'docs-assets/img/card_img.webp' | relative_url }}" width="650"
                                            height="371" alt="" decoding="async">
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">The Title of the News Card in two Lines</span>
                                        <p class="nds-card-description">Here you can include a brief description of the headline
                                            in four lines. Here you can include a brief description of the headline in four
                                            lines.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="nds-label">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image">
                                        <img data-src="{{ 'docs-assets/img/card_img.webp' | relative_url }}" width="650"
                                            height="371" alt="" decoding="async">
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">The Title of the News Card in two Lines</span>
                                        <p class="nds-card-description">Here you can include a brief description of the headline
                                            in four lines. Here you can include a brief description of the headline in four
                                            lines.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="nds-label">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="nds-swiper-slide">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image">
                                        <img data-src="{{ 'docs-assets/img/card_img.webp' | relative_url }}" width="650"
                                            height="371" alt="" decoding="async">
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">The Title of the News Card in two Lines</span>
                                        <p class="nds-card-description">Here you can include a brief description of the headline
                                            in four lines. Here you can include a brief description of the headline in four
                                            lines.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="nds-label">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="nds-swiper-navigation" hidden>
                                <div class="nds-swiper-buttons">
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                                        aria-label="Previous articles"></button>
                                    <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                                        aria-label="Next articles"></button>
                                </div>
                                <div class="nds-swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="partners" class="nds-content-section">
            <div class="nds-section-wrapper">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">Partner Section</h2>
                </div>
                <div class="nds-section-body">
                    <div class="nds-block">
                        <div class="nds-swiper nds-middle" slides-max="8" slides-mid="4" slides-min="2" peek="0">
                            <div class="nds-swiper-wrapper">
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-swiper-slide">
                                    <div class="nds-card nds-stroke nds-center">
                                        <div class="nds-card-content">
                                            <div class="nds-card-text">
                                                <img src="{{ 'assets/img/palm_swords.svg' | relative_url }}" width="48"
                                                    height="48" alt="" loading="lazy" decoding="async">
                                                <p class="nds-card-description">Platform Logo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-swiper-navigation nds-center" hidden>
                                <div class="nds-swiper-buttons">
                                    <button class="nds-btn nds-subtle nds-icon-only nds-prev" type="button"
                                        aria-label="Previous partners"></button>
                                    <button class="nds-btn nds-subtle nds-icon-only nds-next" type="button"
                                        aria-label="Next partners"></button>
                                </div>
                                <div class="nds-swiper-pagination nds-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="nds-last-edit nds-content-section">
            Last Modified Date: 04/12/2026 - 4:13 PM Saudi Arabia Time
        </section>
        </div>
    </div>
</main>

{% include footer.html %}
{% include cookie-popup.html %}
{% include accessibility-panel.html %}
