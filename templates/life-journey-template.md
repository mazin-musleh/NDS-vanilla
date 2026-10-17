---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
title: Life Journeys Template
hero_title: Life Journeys
hero_description: A life journey puts the government services for one life event, such as starting a business or building a home, in one place and in order.
breadcrumb:
- ["DGA Templates", "/templates"]
lang: en
direction: ltr
sidemenu_mode: false
# Demo only: the "First visit" switch in the hero previews both modes, with the script at the end of the page.
# Delete both in production; the server renders one mode.
hero_float_actions:
  class: nds-minimal
  items:
    - html: >-
        <div class="nds-form-container nds-switch-container nds-stacked" style="align-items: center;">
        <div class="nds-form-header" data-feedback-target><label for="first-visit-toggle"><span class="nds-note">First visit</span></label></div>
        <div class="nds-form-control"><div class="nds-switch"><input type="checkbox" id="first-visit-toggle" class="nds-switch-input"><div class="nds-switch-track"><div class="nds-switch-thumb"></div></div></div></div>
        </div>
last_edit: "04/12/2020 - 04:13 PM"
current:
  - title: "Starting a Business"
    step: 2
    steps: 4
  - title: "Having a Baby"
    step: 3
    steps: 5
  - title: "Getting Married"
    step: 1
    steps: 4
# Journeys the user has not started. Current and completed journeys are not listed here.
journeys:
  - title: "Building a Home"
    icon: "hgi-building-03"
  - title: "Buying a Home"
    icon: "hgi-home-01"
  - title: "Getting Housing Support"
    icon: "hgi-money-receive-square"
  - title: "Hiring Employees"
    icon: "hgi-user-add-01"
  - title: "Opening a New Branch"
    icon: "hgi-store-01"
  - title: "Importing Goods"
    icon: "hgi-delivery-truck-01"
  - title: "Buying a Car"
    icon: "hgi-car-01"
  - title: "Traveling Abroad"
    icon: "hgi-airplane-01"
  - title: "Renewing a Passport"
    icon: "hgi-passport-01"
  - title: "Studying at University"
    icon: "hgi-graduation-scroll"
  - title: "Starting a Farm"
    icon: "hgi-plant-02"
  - title: "Retiring from Work"
    icon: "hgi-briefcase-01"
completed:
  - title: "Getting a Driving License"
    steps: 3
  - title: "Enrolling a Child in School"
    steps: 3
  - title: "Getting a Job"
    steps: 4
---
{% capture journey_steps %}<div class="nds-stepper nds-block nds-center nds-xl nds-static nds-icons nds-vertical-sm">
    <div class="nds-stepper-step">
        <div class="nds-stepper-base">
            <div class="nds-stepper-circle"><i class="hgi hgi-stroke hgi-cursor-magic-selection-02" aria-hidden="true"></i></div>
        </div>
        <div class="nds-stepper-content">
            <div class="nds-stepper-text">
                <span class="nds-stepper-title">Choose the life journey</span>
                <span class="nds-stepper-description">that fits your need</span>
            </div>
        </div>
    </div>
    <div class="nds-stepper-step">
        <div class="nds-stepper-base">
            <div class="nds-stepper-circle"><i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i></div>
        </div>
        <div class="nds-stepper-content">
            <div class="nds-stepper-text">
                <span class="nds-stepper-title">Browse all the services</span>
                <span class="nds-stepper-description">related to the journey</span>
            </div>
        </div>
    </div>
    <div class="nds-stepper-step">
        <div class="nds-stepper-base">
            <div class="nds-stepper-circle"><i class="hgi hgi-stroke hgi-file-verified" aria-hidden="true"></i></div>
        </div>
        <div class="nds-stepper-content">
            <div class="nds-stepper-text">
                <span class="nds-stepper-title">Complete your steps in order</span>
                <span class="nds-stepper-description">until you reach your goal</span>
            </div>
        </div>
    </div>
</div>{% endcapture %}
<section id="journeys" class="nds-content-section">
    <div class="nds-section-body">
        <!-- First visit only -->
        <div class="nds-alert nds-card nds-block" data-status="info" data-journeys-first>
            <span class="nds-feedback nds-alert-icon nds-outline">
                <span class="nds-feedback-icon">
                    <i class="nds-icon" aria-hidden="true"></i>
                </span>
            </span>
            <div class="nds-alert-content">
                <div class="nds-alert-text nds-block">
                    <span class="nds-alert-title">How life journeys work</span>
                    <p class="nds-alert-description">We grouped all the government services for one goal into a single journey, to help you complete every step from one place, in a clear order.</p>
                </div>
                {{ journey_steps }}
                <div class="nds-alert-actions">
                    <button type="button" class="nds-btn nds-subtle nds-sm" data-modal-target="journeys-intro">
                        <span class="nds-label">Learn more about life journeys</span>
                        <i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="nds-tabs nds-lined nds-block">
            <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Life journeys">
                    <!-- Returning user only -->
                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-current" id="tab-current" data-journeys-returning tabindex="-1">
                        <span class="nds-label">My Current Journeys</span>
                    </button>
                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-all" id="tab-all" tabindex="0">
                        <span class="nds-label">All Journeys</span>
                    </button>
                    <!-- Returning user only -->
                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-completed" id="tab-completed" data-journeys-returning tabindex="-1">
                        <span class="nds-label">My Completed Journeys</span>
                    </button>
                </nav>
                <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
                    <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
            </div>
            <div class="nds-tab-content">
                <!-- Returning user only -->
                <div class="nds-tab-panel nds-flush-inline" role="tabpanel" id="panel-current" aria-labelledby="tab-current" tabindex="-1" hidden>
                    <div id="current-list" class="nds-paged-content nds-grid" style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">
                        {% for journey in page.current %}
                        <div class="nds-page-item nds-card nds-stroke nds-horizontal nds-reverse">
                            <div class="nds-card-header">
                                <div class="nds-progress-circle nds-md" data-num="{{ journey.step }}" data-max="{{ journey.steps }}" role="progressbar" aria-labelledby="current-{{ forloop.index }}-title">
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
                                    <span class="nds-card-title" id="current-{{ forloop.index }}-title">{{ journey.title }}</span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="{{ '/templates/life-journey-page-template' | relative_url }}" class="nds-btn nds-secondary-outline nds-lg" aria-label="{{ journey.title }} details">
                                    <span class="nds-label">View Details</span>
                                </a>
                                <a href="{{ '/templates/journey-service-template' | relative_url }}" class="nds-btn nds-primary nds-lg" aria-label="Continue {{ journey.title }}">
                                    <span class="nds-label">Continue Journey</span>
                                </a>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    <nav class="nds-pagination" data-auto-pagination="current-list" aria-label="Pagination" data-i18n-aria-label="pagination.pagination"></nav>
                </div>
                <div class="nds-tab-panel nds-flush-inline" role="tabpanel" id="panel-all" aria-labelledby="tab-all" tabindex="0">
                    <div id="all-list" class="nds-paged-content nds-grid" style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">
                        {% for journey in page.journeys %}
                        <div class="nds-page-item nds-card nds-stroke">
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
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="{{ '/templates/life-journey-page-template' | relative_url }}" class="nds-btn nds-secondary-outline nds-lg" aria-label="{{ journey.title }} details">
                                    <span class="nds-label">View Details</span>
                                </a>
                                <a href="{{ '/templates/journey-service-template' | relative_url }}" class="nds-btn nds-primary nds-lg" aria-label="Start {{ journey.title }}">
                                    <span class="nds-label">Start Journey</span>
                                </a>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    <nav class="nds-pagination" data-auto-pagination="all-list" aria-label="Pagination" data-i18n-aria-label="pagination.pagination"></nav>
                </div>
                <!-- Returning user only -->
                <div class="nds-tab-panel nds-flush-inline" role="tabpanel" id="panel-completed" aria-labelledby="tab-completed" tabindex="-1" hidden>
                    <div id="completed-list" class="nds-paged-content nds-grid" style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">
                        {% for journey in page.completed %}
                        <div class="nds-page-item nds-card nds-stroke nds-horizontal nds-reverse">
                            <div class="nds-card-header">
                                <div class="nds-progress-circle nds-md" data-num="{{ journey.steps }}" data-max="{{ journey.steps }}" role="progressbar" aria-labelledby="completed-{{ forloop.index }}-title">
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
                                    <span class="nds-card-title" id="completed-{{ forloop.index }}-title">{{ journey.title }}</span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="{{ '/templates/life-journey-page-template' | relative_url }}?status=completed" class="nds-btn nds-secondary-outline nds-lg" aria-label="{{ journey.title }} details">
                                    <span class="nds-label">View Details</span>
                                </a>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    <nav class="nds-pagination" data-auto-pagination="completed-list" aria-label="Pagination" data-i18n-aria-label="pagination.pagination"></nav>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- First visit only: the intro modal, opened by the script below. "Learn more" also opens it.
     Three slides, one shown at a time; the footer buttons move between them (script after the modal). -->
<dialog id="journeys-intro" class="nds-modal nds-card nds-stroke nds-lg" aria-labelledby="journeys-intro-title-1">
    <div class="nds-card-header">
        <span class="nds-card-title" id="journeys-intro-title-1" data-journeys-slide-title>Life Journeys: An Easier Way to Complete Your Services</span>
        <span class="nds-card-title" id="journeys-intro-title-2" data-journeys-slide-title hidden>An Integrated Journey for Easier Completion</span>
        <span class="nds-card-title" id="journeys-intro-title-3" data-journeys-slide-title hidden>How do you use Life Journeys?</span>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content nds-scroll-more">
        <div class="nds-scroll-more-content">
            <div data-journeys-slide>
                <div class="nds-block nds-prose">
                    <p>Government services related to a single goal are now grouped into life journeys, to help you reach and complete all the services you need easily, from one place.</p>
                    <p><strong>Example: Student School Registration Journey</strong></p>
                    <p>Instead of searching for each service separately, the journey brings together all the services a parent needs to register their child, such as:</p>
                    <ul>
                        <li>Notifying the parent that the student is eligible for school registration.</li>
                        <li>Choosing the school based on the national address.</li>
                        <li>Filling in the student's information.</li>
                        <li>Completing the registration online.</li>
                        <li>Registration by the parent or the school principal.</li>
                    </ul>
                </div>
                <img class="nds-block" style="border-radius: var(--radius-md);" src="{{ '/assets/img/journy_students.webp' | relative_url }}" width="764" height="199" alt="" loading="lazy">
            </div>
            <div data-journeys-slide hidden>
                <div class="nds-block nds-prose">
                    <p>Before, reaching your goal meant moving between several platforms to complete the services. Now, life journeys bring all the services related to your goal into one journey, for a smoother experience from start to finish.</p>
                </div>
                <div class="nds-block nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1; --gap: var(--spacing-4xl);">
                    <div class="nds-flex nds-col">
                        <span class="nds-btn nds-neutral nds-circle nds-full"><span class="nds-label">Current State</span></span>
                        <div class="nds-grid" style="--max-track: auto 1fr; --col-gap: var(--spacing-xl); --align: stretch;">
                            <div class="nds-flex nds-col" style="--justify: space-around; --gap: 0;">
                                <strong>Platform (1):</strong>
                                <strong>Platform (2):</strong>
                                <strong>Platform (3):</strong>
                            </div>
                            <!-- Each bar sits in the middle of its third of the height, so the labels beside it line up at any size -->
                            <svg viewBox="0 0 275 171" role="img" aria-label="Current state: the services are spread over three platforms, and you move between them.">
                                <defs><g id="journeys-mark-current"><circle r="9" fill="currentColor" opacity=".4"/><path d="M-3-3 3 3M3-3-3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></g></defs>
                                <g fill="currentColor" opacity=".15">
                                    <rect y="9" width="275" height="39" rx="8"/>
                                    <rect y="66" width="275" height="39" rx="8"/>
                                    <rect y="123" width="275" height="39" rx="8"/>
                                </g>
                                <path d="M246 37.5V76.5M238.9 91 180.1 137M164 142.5H109M100 133.5V94.5M91 85.5H36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                                <use href="#journeys-mark-current" x="27" y="28.5"/><use href="#journeys-mark-current" x="100" y="28.5"/><use href="#journeys-mark-current" x="173" y="28.5"/><use href="#journeys-mark-current" x="246" y="28.5"/><use href="#journeys-mark-current" x="27" y="85.5"/><use href="#journeys-mark-current" x="100" y="85.5"/><use href="#journeys-mark-current" x="173" y="85.5"/><use href="#journeys-mark-current" x="246" y="85.5"/><use href="#journeys-mark-current" x="27" y="142.5"/><use href="#journeys-mark-current" x="100" y="142.5"/><use href="#journeys-mark-current" x="173" y="142.5"/><use href="#journeys-mark-current" x="246" y="142.5"/>
                            </svg>
                        </div>
                    </div>
                    <div class="nds-flex nds-col">
                        <span class="nds-btn nds-primary nds-circle nds-full"><span class="nds-label">Target State</span></span>
                        <p class="nds-center nds-color-primary"><strong>An integrated journey through one platform</strong></p>
                        <svg viewBox="0 0 420 39" role="img" aria-label="Target state: all the services in one journey, on one platform.">
                            <defs><g id="journeys-mark-target"><circle r="9" fill="currentColor" opacity=".4"/><path d="M-3-3 3 3M3-3-3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></g></defs>
                            <rect x="69" width="282" height="39" rx="8" fill="currentColor" opacity=".15"/>
                            <g class="nds-color-primary">
                                <path d="M105 19.5H160M178 19.5H233M251 19.5H306" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <use href="#journeys-mark-target" x="96" y="19.5"/><use href="#journeys-mark-target" x="169" y="19.5"/><use href="#journeys-mark-target" x="242" y="19.5"/><use href="#journeys-mark-target" x="315" y="19.5"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="nds-block nds-alert nds-card nds-inline" data-status="info">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <p class="nds-alert-description">Each ✕ mark, in the current and the target state, is a service you need to reach your goal.</p>
                        </div>
                    </div>
                </div>
                <div class="nds-block nds-prose">
                    <h3>What will you gain?</h3>
                    <ul>
                        <li>All the services related to your goal, in one place.</li>
                        <li>Smooth movement between the journey's steps, with no search across platforms.</li>
                        <li>The next step at every stage, until you complete your journey.</li>
                        <li>A connected experience that helps you reach your goal easily.</li>
                    </ul>
                </div>
            </div>
            <div data-journeys-slide hidden>
                <div class="nds-block nds-prose">
                    <p>Start by choosing the life journey that fits your need. Then browse all the services related to it in one place, and follow the journey's steps until you easily complete your goal.</p>
                </div>
                {{ journey_steps }}
            </div>
        </div>
        <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only nds-show-more">
            <span class="nds-label" data-i18n="scroll-more.show_more">Show more</span>
            <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-actions nds-reverse">
        <button type="button" class="nds-btn nds-primary nds-lg nds-full" data-journeys-slide-to="next">
            <span class="nds-label">Next</span>
        </button>
        <button type="button" class="nds-btn nds-primary nds-lg nds-full" data-modal-close hidden>
            <span class="nds-label">Close</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg nds-full" data-journeys-slide-to="previous" hidden>
            <span class="nds-label">Previous</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg nds-full" data-modal-close>
            <span class="nds-label">Skip</span>
        </button>
    </div>
</dialog>

<script>
// The intro slides: each slide has its title in the header. Next and Previous move one slide; Skip shows on the first slide only, Close on the last.
// The modal starts on slide 1 every time it opens.
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('journeys-intro');
    const slides = modal.querySelectorAll('[data-journeys-slide]');
    const scroller = modal.querySelector('.nds-scroll-more-content');
    const titles = modal.querySelectorAll('[data-journeys-slide-title]');
    const [next, close, previous, skip] = modal.querySelectorAll('.nds-card-actions .nds-btn');
    let at = 0;
    const show = i => {
        at = i;
        slides.forEach((slide, n) => { slide.hidden = n !== i; });
        scroller.scrollTop = 0;
        titles.forEach((title, n) => { title.hidden = n !== i; });
        modal.setAttribute('aria-labelledby', titles[i].id);
        const last = i === slides.length - 1;
        next.hidden = last;
        close.hidden = !last;
        previous.hidden = i === 0;
        skip.hidden = i !== 0;
    };
    next.addEventListener('click', () => { show(at + 1); (next.hidden ? close : next).focus(); });
    previous.addEventListener('click', () => { show(at - 1); (previous.hidden ? next : previous).focus(); });
    modal.addEventListener('nds:modal:closed', () => show(0));
});
</script>

<script>
// Demo only. In production, the server renders one mode: drop [data-journeys-first] parts for a returning user,
// drop [data-journeys-returning] parts on a first visit, and open the intro modal on a first visit only.
// Here the first load counts as the first visit, and the hero's #first-visit-toggle switch flips between the modes.
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('first-visit-toggle');
    const apply = first => {
        document.querySelectorAll('[data-journeys-first]').forEach(el => { el.hidden = !first; });
        document.querySelectorAll('[data-journeys-returning]').forEach(el => { el.hidden = first; });
        if (first) document.getElementById('tab-all').click();
    };
    const first = !NDS.cache.get('life_journeys_intro');
    NDS.cache.set('life_journeys_intro', 1, 525600);
    toggle.checked = first;
    apply(first);
    if (first) NDS.Modal.open('journeys-intro');
    toggle.addEventListener('change', () => {
        apply(toggle.checked);
        if (toggle.checked) NDS.Modal.open('journeys-intro');
    });
});
</script>
