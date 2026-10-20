---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
hero_style: "nds-aside"
title: Journey Page Template
hero_title: Establishing a Foreign Company Branch
hero_description: The journey enables the investor to open the main branch of a foreign company in the Kingdom of Saudi Arabia. It requires no trade name reservation and no articles of incorporation.
breadcrumb:
- ["DGA Templates", "/templates"]
- ["Life Journeys", "/templates/life-journey-template"]
lang: en
direction: ltr
sidemenu_mode: false
feedback_type: rating
# Demo only: the "Completed" switch in the hero previews both states, with the script at the end of the page.
# Delete both in production; the server renders one state.
hero_float_actions:
  class: nds-minimal
  items:
    - html: >-
        <!-- Demo only: previews both states. Delete in production, with the demo script at the end of the page. -->
        <div class="nds-form-container nds-switch-container nds-stacked" style="align-items: center;">
        <div class="nds-form-header"><label for="journey-done-toggle"><span class="nds-note">Completed</span></label></div>
        <div class="nds-form-control"><div class="nds-switch"><input type="checkbox" id="journey-done-toggle" class="nds-switch-input"><div class="nds-switch-track"><div class="nds-switch-thumb"></div></div></div></div>
        </div>
last_edit: "04/12/2020 - 04:13 PM"
steps:
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
survey:
  - "How would you rate how easy it was to reach the right life journey?"
  - "How would you rate your overall experience of using the life journey?"
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
<section id="journey-details" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <div class="nds-section-wrapper">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">The journey's detailed stages</h2>
                </div>
                <div class="nds-section-body">
                    <!-- data-current is the current step. A number one past the last step shows every step completed. -->
                    <div class="nds-stepper nds-vertical" id="journey-stepper" data-current="1">
                        {% for step in page.steps %}
                        <div class="nds-stepper-step nds-card">
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">{{ step.title }}</span>
                                    <span class="nds-stepper-description">{{ step.description }}</span>
                                </div>
                                <!-- In progress only: the action and the requirements -->
                                {%- if forloop.first %}
                                <div class="nds-stepper-action nds-end" data-journey-progress>
                                    <a href="{{ '/templates/journey-service-template' | relative_url }}" class="nds-btn nds-primary nds-md">
                                        <span class="nds-label">Start service</span>
                                    </a>
                                </div>
                                {%- endif %}
                                <div class="nds-accordion nds-md nds-minimal" data-journey-progress>
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
        <aside class="nds-sideinfo" aria-label="Journey information">
            <!-- In progress -->
            <div class="nds-card nds-stroke nds-shadow nds-horizontal nds-reverse nds-middle" data-journey-progress>
                <div class="nds-card-header">
                    <div class="nds-progress-circle nds-md" data-num="1" data-max="{{ page.steps.size }}" role="progressbar" aria-labelledby="journey-progress-title">
                        <svg width="120" height="120" viewBox="0 0 24 24">
                            <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                            <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                        </svg>
                        <div class="nds-progress-info">
                            <span class="nds-progress-steps"></span>
                        </div>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-title" id="journey-progress-title">Journey in progress</span>
                    </div>
                </div>
            </div>
            <!-- Completed -->
            <div class="nds-card nds-stroke nds-shadow nds-horizontal nds-reverse nds-middle" data-journey-done hidden>
                <div class="nds-card-header">
                    <div class="nds-progress-circle nds-md" data-num="{{ page.steps.size }}" data-max="{{ page.steps.size }}" role="progressbar" aria-labelledby="journey-done-title">
                        <svg width="120" height="120" viewBox="0 0 24 24">
                            <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                            <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                        </svg>
                        <div class="nds-progress-info">
                            <span class="nds-progress-steps"></span>
                        </div>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-title" id="journey-done-title">Journey completed</span>
                    </div>
                </div>
            </div>
            <!-- In progress -->
            <dl class="nds-definition-list nds-card nds-stroke nds-shadow" data-journey-progress>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-user-multiple-02" aria-hidden="true"></i>
                        <span class="nds-label">Target group</span>
                    </dt>
                    <dd>Foreign investors (individuals and companies).</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                        <span class="nds-label">Expected journey duration</span>
                    </dt>
                    <dd>7-14 working days.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-computer-phone-sync" aria-hidden="true"></i>
                        <span class="nds-label">Journey scope</span>
                    </dt>
                    <dd>A journey covering the establishment of a foreign company branch in the Kingdom of Saudi Arabia.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-file-validation" aria-hidden="true"></i>
                        <span class="nds-label">Main requirements</span>
                    </dt>
                    <dd>
                        <ul class="nds-flex nds-col nds-color-primary" style="--gap: var(--spacing-xs);">
                            <li><i class="hgi hgi-stroke hgi-checkmark-circle-02" aria-hidden="true"></i> National ID</li>
                            <li><i class="hgi hgi-stroke hgi-checkmark-circle-02" aria-hidden="true"></i> Email address</li>
                            <li><i class="hgi hgi-stroke hgi-checkmark-circle-02" aria-hidden="true"></i> Mobile number</li>
                        </ul>
                    </dd>
                </div>
            </dl>
            <!-- Completed -->
            <dl class="nds-definition-list nds-card nds-stroke nds-shadow" data-journey-done hidden>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                        <span class="nds-label">Journey start date</span>
                    </dt>
                    <dd>10 July 2026</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-checkmark-circle-02" aria-hidden="true"></i>
                        <span class="nds-label">Journey end date</span>
                    </dt>
                    <dd>13 July 2026</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                        <span class="nds-label">Time taken</span>
                    </dt>
                    <dd>3 days</dd>
                </div>
            </dl>
        </aside>
    </div>
</section>

<section id="related-journeys" class="nds-content-section nds-brand">
    <div class="nds-section-head">
        <h2 class="nds-section-title">Related Journeys</h2>
        <p class="nds-section-description">Suggested journeys related to this one.</p>
    </div>
    <div class="nds-section-body">
        <div class="nds-block nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
            {% for journey in page.related %}
            <div class="nds-card nds-stroke">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-lg">
                            <i class="hgi hgi-stroke {{ journey.icon }}" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <span class="nds-card-title">{{ journey.title }}</span>
                        <p class="nds-card-description">{{ journey.description }}</p>
                    </div>
                </div>
                <div class="nds-card-actions nds-end">
                    <a href="{{ '/templates/life-journey-page-template' | relative_url }}" class="nds-btn nds-secondary nds-icon-only" aria-label="Open {{ journey.title }}">
                        <i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
        <a href="{{ '/templates/life-journey-template' | relative_url }}" class="nds-btn nds-transparent nds-color nds-lg">
            <span class="nds-label">View more journeys</span>
        </a>
    </div>
</section>

<section id="journey-feedback" class="nds-content-section">
    <div class="nds-section-body">
        <div class="nds-card nds-stroke nds-full">
            <div class="nds-card-header">
                <div class="nds-card-featured-icon">
                    <span class="nds-featured-icon nds-circle nds-lg">
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
                <a href="#" class="nds-btn nds-primary nds-lg">
                    <span class="nds-label">Contact us</span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Completed only: the journey survey. Open it when the user enters a completed journey they have not rated -->
<dialog id="journey-survey" class="nds-modal nds-card nds-stroke" aria-labelledby="journey-survey-title">
    <div class="nds-card-header">
        <span class="nds-card-title" id="journey-survey-title">Tell us what you think of this journey</span>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <p class="nds-card-description">Please don't include personal or financial information. Your feedback will be sent and recorded to improve the services.</p>
        </div>
        <form class="nds-form nds-flex nds-col" data-ajax>
            <div class="nds-alert nds-card nds-inline" data-status="info">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <p class="nds-alert-description" id="journey-survey-hint">Rate your experience from (1) poor to (5) excellent</p>
                    </div>
                </div>
            </div>
            {%- for question in page.survey %}
            <fieldset class="nds-form-group" data-required aria-describedby="journey-survey-hint">
                <legend>
                    <span class="nds-label">{{ question }}</span>
                </legend>
                <div class="nds-rating nds-md nds-brand" data-rating="0">
                    <button class="nds-rating-star" type="button" aria-label="1 star"></button>
                    <button class="nds-rating-star" type="button" aria-label="2 stars"></button>
                    <button class="nds-rating-star" type="button" aria-label="3 stars"></button>
                    <button class="nds-rating-star" type="button" aria-label="4 stars"></button>
                    <button class="nds-rating-star" type="button" aria-label="5 stars"></button>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
            </fieldset>
            {%- endfor %}
            <div class="nds-form-container nds-textarea">
                <div class="nds-form-header">
                    <label for="journey-survey-comment"><span class="nds-label">Do you have any suggestions to improve the life journey?</span></label>
                </div>
                <div class="nds-form-control">
                    <textarea id="journey-survey-comment" name="comment" class="nds-textarea" placeholder="Enter your message..." rows="3"></textarea>
                </div>
            </div>
            <p>For more information you may review the <a href="#" class="nds-link">e-participation statement</a> and the <a href="#" class="nds-link">rules of engagement</a>.</p>
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Send</span>
            </button>
        </form>
    </div>
</dialog>

<script>
// Send the scores, then thank the user.
document.getElementById('journey-survey').addEventListener('nds:form:valid', () => {
    NDS.Modal.close();
    NDS.Alert.create({ variant: 'success', title: 'Thank you', description: 'Your rating was sent.', display: 'toast', duration: 4000 });
});
</script>

<script>
// Demo only. In production, the server renders one state: drop [data-journey-done] parts and the survey for a journey in progress,
// and [data-journey-progress] parts for a completed one, and write the stepper's data-current (one past the last step when completed).
// Here the hero's #journey-done-toggle switch flips between the states, and switching it on opens the survey.
// The hub's Completed cards link with ?status=completed, which starts the page completed.
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('journey-done-toggle');
    const stepper = document.getElementById('journey-stepper');
    const total = stepper.querySelectorAll('.nds-stepper-step').length;
    toggle.addEventListener('change', () => {
        const done = toggle.checked;
        document.querySelectorAll('[data-journey-progress]').forEach(el => { el.hidden = done; });
        document.querySelectorAll('[data-journey-done]').forEach(el => { el.hidden = !done; });
        stepper.dataset.current = done ? total + 1 : 1;
        if (done) NDS.Modal.open('journey-survey');
    });
    if (new URLSearchParams(location.search).get('status') === 'completed') {
        toggle.checked = true;
        toggle.dispatchEvent(new Event('change'));
    }
});
</script>
