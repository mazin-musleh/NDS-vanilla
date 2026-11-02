---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: Journey Service Page Template
hero_style: "nds-aside"
hero_title: Establishing a Foreign Company Branch
hero_description: The journey enables the investor to open the main branch of a foreign company in the Kingdom of Saudi Arabia. It requires no trade name reservation and no articles of incorporation.
breadcrumb:
- ["DGA Templates", "/templates"]
- ["Life Journeys", "/templates/life-journey-template"]
- ["Establishing a Foreign Company Branch", "/templates/life-journey-page-template"]
lang: en
direction: ltr
sidemenu_mode: false
feedback_type: rating
hero_tags:
  - label: "Entity"
    style: "nds-gray"
  - label: "Journey name"
    style: "nds-green"
  - label: "Platform"
    style: "nds-gray"
hero_float_actions:
  class: nds-wrap
  items:
    - label: "Start journey"
      url: "#"
      style: "nds-primary"
    - share
# The journey's services, the same list as the Journey page.
services:
  - title: "Get the investment registration certificate"
    description: "The journey enables the investor to issue the investment registration certificate, which gives them the legal right to carry out investment activity inside the Kingdom. It is the first step to establish the legal entity."
    requirements: ["National ID or residence permit", "Investor's passport copy"]
  - title: "Register a foreign company branch in the commercial register"
    description: "A service to register the branch of a foreign company in the commercial register, so it can carry out its business formally under the approved laws and regulations."
    requirements: ["Investment registration certificate", "Company articles of incorporation, attested"]
  - title: "Open an establishment file"
    description: "A service to create an official file for the establishment with the relevant government entities, so it can manage its data and start using the operational government services."
    requirements: ["Commercial register number", "National address of the branch"]
  - title: "Register the general manager"
    description: "A service to appoint and register the establishment's general manager officially, link them to the legal entity in the government systems and grant them the permissions required to manage it."
    requirements: ["National ID or residence permit of the manager", "Appointment decision"]
  - title: "Open a bank account"
    description: "A service that lets the establishment open a bank account in its commercial name, to manage its finances, receive payments and make official transactions."
    requirements: ["Commercial register number", "General manager's ID"]
  - title: "Complete the other government registrations"
    description: "A service to complete and link the establishment's accounts with the other government entities, such as Zakat and Human Resources, so it complies with the rules and can use the integrated government journeys."
    requirements: ["Establishment file number", "Bank account details"]
  - title: "Get the sector licenses for the investment activity"
    description: "A service that lets the establishment apply for the sector licenses its investment activity needs, so it can operate formally under the conditions of the regulating entity."
    requirements: ["Investment registration certificate", "Commercial register number"]
procedure:
  - title: "Register and create an account"
    description: "Create an account on the platform and verify your identity."
    requirements: ["National ID or residence permit", "Mobile number"]
  - title: "Choose the establishment type"
    description: "Choose the establishment type and the commercial activity on the Ministry of Commerce platform. Select the procedure below for more details."
    requirements: ["Commercial register number", "Activity code"]
  - title: "Submit the documents"
    description: "Upload the documents required to get the permits."
    requirements: ["Land deed", "Engineering drawings, approved"]
  - title: "Review and approval"
    description: "Wait while the competent entities review the request."
    requirements: ["Request number"]
  - title: "Receive the permits"
    description: "Receive the permits after the request is approved."
    requirements: ["Request number", "Fee payment receipt"]
related:
  - title: "Establishing a Saudi Company Branch"
    description: "Open the main branch of a Saudi company in the Kingdom."
    icon: "hgi-building-03"
  - title: "Starting a Business"
    description: "Register a new business and get its licenses."
    icon: "hgi-briefcase-01"
  - title: "Building Permit Journey"
    description: "Get a building permit, from the design to the final certificate."
    icon: "hgi-building-03"
  - title: "Buying a Home"
    description: "Find, finance and register a home."
    icon: "hgi-home-01"
  - title: "Getting Married"
    description: "Complete the marriage contract and the family documents."
    icon: "hgi-favourite"
  - title: "Having a Baby"
    description: "Register a newborn and get the first documents."
    icon: "hgi-baby-01"
---
<section id="journey-service" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <div class="nds-alert nds-card nds-block" data-status="info">
                <span class="nds-feedback nds-alert-icon nds-outline">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">This journey is part of the Investment journey</span>
                        <p class="nds-alert-description">This journey is one of the investment services. It helps you complete the requirements and procedures needed to invest in the Kingdom.</p>
                    </div>
                    <div class="nds-alert-actions">
                        <a href="#related-journeys" class="nds-link">View all related journeys</a>
                    </div>
                </div>
            </div>
            <div class="nds-tabs nds-block">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Journey details">
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                            aria-controls="panel-steps" id="tab-steps">
                            <span class="nds-label">Steps</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                            aria-controls="panel-terms" id="tab-terms" tabindex="-1">
                            <span class="nds-label">Terms of use</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                            aria-controls="panel-documents" id="tab-documents" tabindex="-1">
                            <span class="nds-label">Required documents</span>
                        </button>
                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                            aria-controls="panel-services" id="tab-services" tabindex="-1">
                            <span class="nds-label">Journey services</span>
                        </button>
                    </nav>
                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="nds-tab-content">
                    <div class="nds-tab-panel" role="tabpanel" id="panel-steps" aria-labelledby="tab-steps">
                        <div class="nds-stepper nds-vertical">
                            {% for step in page.services %}
                            <div class="nds-stepper-step nds-card">
                                <div class="nds-stepper-base">
                                    <div class="nds-stepper-circle"></div>
                                </div>
                                <div class="nds-stepper-content">
                                    <div class="nds-stepper-text">
                                        <span class="nds-stepper-title">{{ step.title }}</span>
                                        <span class="nds-stepper-description">{{ step.description }}</span>
                                    </div>
                                    <div class="nds-accordion nds-minimal">
                                        <div class="nds-accordion-item">
                                            <h3 class="nds-accordion-header">
                                                <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="false" aria-controls="service-{{ forloop.index }}-requirements">
                                                    <span class="nds-accordion-title">Service requirements</span>
                                                </button>
                                            </h3>
                                            <div class="nds-accordion-collapse" id="service-{{ forloop.index }}-requirements">
                                                <div class="nds-accordion-content">
                                                    <div class="nds-accordion-body">
                                                        <ul>
                                                            {%- for requirement in step.requirements %}
                                                            <li>{{ requirement }}</li>
                                                            {%- endfor %}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="panel-terms" aria-labelledby="tab-terms" aria-hidden="true"
                        tabindex="-1" hidden="">
                        <p>Terms of use content goes here</p>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="panel-documents" aria-labelledby="tab-documents" aria-hidden="true"
                        tabindex="-1" hidden="">
                        <p>Required documents content goes here</p>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="panel-services" aria-labelledby="tab-services" aria-hidden="true"
                        tabindex="-1" hidden="">
                        <div class="nds-stepper nds-vertical">
                            {% for step in page.procedure %}
                            <div class="nds-stepper-step">
                                <div class="nds-stepper-base">
                                    <div class="nds-stepper-circle"></div>
                                </div>
                                <div class="nds-stepper-content">
                                    <div class="nds-stepper-text">
                                        <span class="nds-stepper-title">{{ step.title }}</span>
                                        <span class="nds-stepper-description">{{ step.description }}</span>
                                    </div>
                                    <div class="nds-accordion nds-md nds-minimal">
                                        <div class="nds-accordion-item">
                                            <h3 class="nds-accordion-header">
                                                <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="false" aria-controls="step-{{ forloop.index }}-requirements">
                                                    <span class="nds-accordion-title">Service requirements</span>
                                                </button>
                                            </h3>
                                            <div class="nds-accordion-collapse" id="step-{{ forloop.index }}-requirements">
                                                <div class="nds-accordion-content">
                                                    <div class="nds-accordion-body">
                                                        <ul>
                                                            {%- for requirement in step.requirements %}
                                                            <li>{{ requirement }}</li>
                                                            {%- endfor %}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <aside class="nds-sideinfo" aria-label="Journey information">
            <dl class="nds-definition-list nds-card nds-stroke nds-shadow">
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-user-multiple-02" aria-hidden="true"></i>
                        <span class="nds-label">Target group</span>
                    </dt>
                    <dd>Foreign investors (individuals and companies)</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                        <span class="nds-label">Expected journey duration</span>
                    </dt>
                    <dd>7-14 working days</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-computer-phone-sync" aria-hidden="true"></i>
                        <span class="nds-label">Journey channels</span>
                    </dt>
                    <dd>Web and mobile app</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="nds-icon nds-hgi-riyal-circular" aria-hidden="true"></i>
                        <span class="nds-label">Journey cost</span>
                    </dt>
                    <dd>Free</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-credit-card" aria-hidden="true"></i>
                        <span class="nds-label">Payment channels</span>
                    </dt>
                    <dd>mada, STC Pay</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-checkmark-badge-01" aria-hidden="true"></i>
                        <span class="nds-label">Journey level</span>
                    </dt>
                    <dd><a href="#" class="nds-primary"><span class="nds-label">Journey level agreement</span></a></dd>
                </div>
                <div class="nds-divider"></div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-help-circle" aria-hidden="true"></i>
                        <span class="nds-label">Common questions</span>
                    </dt>
                    <dd><a href="#" class="nds-btn nds-transparent nds-color"><span class="nds-label">FAQ</span></a></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="nds-icon nds-hgi-headphones" aria-hidden="true"></i>
                        <span class="nds-label">Customer service</span>
                    </dt>
                    <dd>
                        <address>
                            Phone:
                            <a href="tel:9200343222" class="nds-primary"><span class="nds-label">9200343222</span></a>
                            <br>
                            Email:
                            <a href="mailto:help@company.sa" class="nds-primary"><span class="nds-label">help@company.sa</span></a>
                        </address>
                    </dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-book-open-01" aria-hidden="true"></i>
                        <span class="nds-label">User guide</span>
                    </dt>
                    <dd>
                        <a href="#" class="nds-btn nds-secondary nds-md">
                            <span class="nds-label">Download user guide</span>
                        </a>
                    </dd>
                </div>
                <div class="nds-divider"></div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i>
                        <span class="nds-label">Mobile apps</span>
                    </dt>
                    <dd class="nds-flex">
                        <a class="nds-btn nds-secondary-outline nds-xl nds-icon-only" href="#" target="_blank" aria-label="Apple App Store">
                            <i class="nds-icon nds-icon-apple" aria-hidden="true"></i>
                        </a>
                        <a class="nds-btn nds-secondary-outline nds-xl nds-icon-only" href="#" target="_blank" aria-label="Google Play Store">
                            <i class="nds-icon nds-icon-google-play" aria-hidden="true"></i>
                        </a>
                        <a class="nds-btn nds-secondary-outline nds-xl nds-icon-only" href="#" target="_blank" aria-label="Huawei AppGallery">
                            <i class="nds-icon nds-icon-huawei" aria-hidden="true"></i>
                        </a>
                    </dd>
                </div>
            </dl>
        </aside>
    </div>
</section>

<section id="related-journeys" class="nds-content-section nds-brand">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Related Journeys</h2>
            <p class="nds-section-description">Suggested journeys related to this one.</p>
        </div>
        <div class="nds-section-action">
            <a href="{{ '/templates/life-journey-template' | relative_url }}" class="nds-btn nds-transparent nds-color">
                <span class="nds-label">View all</span>
            </a>
        </div>
    </div>
    <div class="nds-section-body nds-breakout">
        <div class="nds-block">
            <div class="nds-swiper" style="--max-slides:4; --mid-slides:2; --min-slides:1; --peek:40px">
                <div class="nds-swiper-wrapper">
                    {% for journey in page.related %}
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle">
                                        <i class="hgi hgi-stroke {{ journey.icon }}" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <span class="nds-card-title nds-truncate">{{ journey.title }}</span>
                                    <span class="nds-card-description nds-truncate">{{ journey.description }}</span>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-gray"><span class="nds-label">Entity</span></span>
                                    <span class="nds-tag nds-blue"><span class="nds-label">Platform</span></span>
                                    <span class="nds-tag nds-green"><span class="nds-label">Journey</span></span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="{{ '/templates/life-journey-page-template' | relative_url }}" class="nds-btn nds-secondary-outline">
                                    <span class="nds-label">Details</span>
                                </a>
                                <a href="{{ '/templates/journey-service-template' | relative_url }}" class="nds-btn nds-primary">
                                    <span class="nds-label">Start journey</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <div class="nds-swiper-navigation" hidden>
                    <div class="nds-swiper-buttons">
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev"
                            type="button" aria-label="Previous slide" data-i18n-aria-label="swiper.previous_slide"></button>
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next"
                            type="button" aria-label="Next slide" data-i18n-aria-label="swiper.next_slide"></button>
                    </div>
                    <div class="nds-swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="journey-feedback" class="nds-content-section">
    <div class="nds-section-body">
        <div class="nds-card nds-stroke nds-full">
            <div class="nds-card-header">
                <div class="nds-card-featured-icon">
                    <span class="nds-featured-icon nds-circle">
                        <i class="hgi hgi-stroke hgi-comment-01" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            <div class="nds-card-content">
                <div class="nds-card-text">
                    <span class="nds-card-title">Comments and suggestions</span>
                    <p class="nds-card-description">For any inquiry or note about the government journeys, please fill in the required information.</p>
                </div>
            </div>
            <div class="nds-card-actions">
                <a href="#" class="nds-btn nds-primary">
                    <span class="nds-label">Contact us</span>
                </a>
            </div>
        </div>
    </div>
</section>
