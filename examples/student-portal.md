---
layout: page
title: Student Portal
hero_title: Student Portal
hero_description: A student's home page with grades, today's classes, requests, exams and university services in one place.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
content_class: nds-stripe
sidemenu_mode: false
hide_share_page: true
hideFeedback: true
---

<!-- Profile -->
<section id="profile" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-image">
            <div class="nds-avatar">
                <img src="{{ 'docs-assets/img/avatar2.webp' | relative_url }}" alt="Sara Al-Otaibi" width="120" height="120" fetchpriority="high">
            </div>
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sara Al-Otaibi</h2>
            <p class="nds-section-description">Bachelor of Accounting, level 6</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-block" data-status="success" role="alert">
                <span class="nds-feedback nds-alert-icon nds-outline">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">No academic warnings</span>
                        <p class="nds-alert-description">Your record has no warnings or suspensions.</p>
                    </div>
                    <div class="nds-alert-actions">
                        <button type="button" class="nds-btn nds-subtle nds-sm" data-modal-target="standing-modal">
                            <span class="nds-label">Academic standing</span>
                        </button>
                    </div>
                </div>
            </div>
            <dl class="nds-definition-list nds-grid nds-highlight-value nds-sm" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>
                        <span class="nds-label">College</span>
                    </dt>
                    <dd>College of Administrative Sciences</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-teacher" aria-hidden="true"></i>
                        <span class="nds-label">Academic advisor</span>
                    </dt>
                    <dd>Dr. Khalid Al-Harbi</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
                        <span class="nds-label">Campus</span>
                    </dt>
                    <dd>Riyadh, women's campus</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                        <span class="nds-label">Admitted</span>
                    </dt>
                    <dd>Fall 2023</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-mail-01" aria-hidden="true"></i>
                        <span class="nds-label">University email</span>
                    </dt>
                    <dd>s441028467@university.edu.sa</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i>
                        <span class="nds-label">Mobile</span>
                    </dt>
                    <dd><span dir="ltr">+966 55 123 4567</span></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-identity-card" aria-hidden="true"></i>
                        <span class="nds-label">Student ID</span>
                    </dt>
                    <dd>441028467</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-computer" aria-hidden="true"></i>
                        <span class="nds-label">Study mode</span>
                    </dt>
                    <dd>On campus and online</dd>
                </div>
            </dl>
        </div>
    </div>
</section>

<!-- Overview -->
<section id="overview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">My Studies</h2>
            <p class="nds-section-description">Your grades and your progress to the degree.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-col: 2; --min-col: 1;">
                <div class="nds-card nds-stroke">
                    <div class="nds-card nds-full nds-flush" data-status="positive">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-sm">
                                    <i class="hgi hgi-stroke hgi-mortarboard-01" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div class="nds-card-text nds-md">
                                <span class="nds-card-title">Cumulative GPA</span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-metric">
                                <div class="nds-card-metric-info">
                                    <span class="nds-card-metric-value">3.42 / 4</span>
                                    <p class="nds-card-metric-trend">
                                        <i class="nds-icon nds-hgi-trade-up" aria-hidden="true"></i>
                                        <strong>+0.12</strong>
                                        <span class="nds-card-metric-text">since last term</span>
                                    </p>
                                </div>
                                <div class="nds-card-metric-chart">
                                    <div class="nds-chart"
                                        data-chart-type="line"
                                        data-chart-series='[{"name":"GPA","data":[3.05,3.12,3.2,3.18,3.3,3.42]}]'
                                        data-chart-labels='["Term 1","Term 2","Term 3","Term 4","Term 5","Term 6"]'
                                        data-chart-config='{"height":110,"legend":{"show":false},"xaxis":{"show":false},"yaxis":{"show":false},"line":{"smooth":true,"area":true,"dots":true},"grid":{"show":false},"padding":{"top":0,"bottom":0,"left":0,"right":0}}'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="nds-divider">
                    <div class="nds-card nds-full nds-flush" data-status="negative">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle nds-sm">
                                    <i class="hgi hgi-stroke hgi-chart-increase" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div class="nds-card-text nds-md">
                                <span class="nds-card-title">Last term GPA</span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-metric">
                                <div class="nds-card-metric-info">
                                    <span class="nds-card-metric-value">3.28 / 4</span>
                                    <p class="nds-card-metric-trend">
                                        <i class="nds-icon nds-hgi-trade-down" aria-hidden="true"></i>
                                        <strong>-0.21</strong>
                                        <span class="nds-card-metric-text">from the term before</span>
                                    </p>
                                </div>
                                <div class="nds-card-metric-chart">
                                    <div class="nds-chart"
                                        data-chart-type="line"
                                        data-chart-series='[{"name":"Term GPA","data":[3.05,3.2,3.36,3.12,3.49,3.28]}]'
                                        data-chart-labels='["Term 1","Term 2","Term 3","Term 4","Term 5","Term 6"]'
                                        data-chart-config='{"height":110,"legend":{"show":false},"xaxis":{"show":false},"yaxis":{"show":false},"line":{"smooth":true,"area":true,"dots":true},"grid":{"show":false},"padding":{"top":0,"bottom":0,"left":0,"right":0}}'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-sm">
                                <i class="hgi hgi-stroke hgi-graduation-scroll" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="nds-card-text nds-md">
                            <div class="nds-card-corner">
                                <button type="button" class="nds-btn nds-subtle nds-sm" data-modal-target="plan-modal">
                                    <span class="nds-label">Study plan</span>
                                </button>
                            </div>
                            <span class="nds-card-title" id="degree-progress-title">Degree progress</span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-flex nds-col" style="--gap: var(--spacing-2xl);">
                            <div class="nds-flex nds-center">
                                <div class="nds-progress-circle nds-xl" data-value="73" role="progressbar" aria-labelledby="degree-progress-title degree-progress-text">
                                    <svg width="160" height="160" viewBox="0 0 24 24">
                                        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                                        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                    </svg>
                                    <div class="nds-progress-info">
                                        <span class="nds-progress-percentage">
                                            <span class="nds-progress-number"></span>
                                            <span class="nds-progress-symbol">%</span>
                                        </span>
                                        <span class="nds-progress-text" id="degree-progress-text">done</span>
                                    </div>
                                </div>
                            </div>
                            <dl class="nds-definition-list nds-divided nds-highlight-value">
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-library" aria-hidden="true"></i>
                                        <span class="nds-label">Total credit hours</span>
                                    </dt>
                                    <dd>132</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-checkmark-circle-02" aria-hidden="true"></i>
                                        <span class="nds-label">Hours done</span>
                                    </dt>
                                    <dd>96</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                        <span class="nds-label">Hours left</span>
                                    </dt>
                                    <dd>36, about 3 terms</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Today -->
<section id="today" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Today</h2>
            <p class="nds-section-description">Your classes for today and the requests you sent.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-track: 1fr 2fr; --mid-track: 1fr;">
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-sm">
                                <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="nds-card-text nds-md">
                            <div class="nds-card-corner">
                                <a href="#" class="nds-btn nds-subtle nds-sm">
                                    <span class="nds-label">Full timetable</span>
                                    <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                                </a>
                            </div>
                            <span class="nds-card-title">Today's classes</span>
                            <p class="nds-card-description">Three classes, one online.</p>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-stepper nds-vertical nds-dot nds-empty" data-current="1" data-empty-message="No classes today" data-empty-icon="hgi hgi-stroke hgi-calendar-03">
                            <div class="nds-stepper-step">
                                <div class="nds-stepper-base">
                                    <div class="nds-stepper-circle" data-step-text="1"></div>
                                </div>
                                <div class="nds-stepper-content nds-card">
                                    <div class="nds-divider">8:00 – 8:50 AM</div>
                                    <div class="nds-stepper-text">
                                        <span class="nds-stepper-title">ACCT 301 · Managerial Accounting</span>
                                        <span class="nds-stepper-description">Dr. Khalid Al-Harbi · Online</span>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-stepper-step">
                                <div class="nds-stepper-base">
                                    <div class="nds-stepper-circle" data-step-text="2"></div>
                                </div>
                                <div class="nds-stepper-content nds-card">
                                    <div class="nds-divider">10:00 – 11:15 AM</div>
                                    <div class="nds-stepper-text">
                                        <span class="nds-stepper-title">FIN 320 · Corporate Finance</span>
                                        <span class="nds-stepper-description">Dr. Nora Al-Qahtani · Building 3, Room 214</span>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-stepper-step">
                                <div class="nds-stepper-base">
                                    <div class="nds-stepper-circle" data-step-text="3"></div>
                                </div>
                                <div class="nds-stepper-content nds-card">
                                    <div class="nds-divider">1:00 – 2:15 PM</div>
                                    <div class="nds-stepper-text">
                                        <span class="nds-stepper-title">MGT 310 · Organizational Behavior</span>
                                        <span class="nds-stepper-description">Dr. Faisal Al-Dosari · Building 1, Room 108</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-sm">
                                <i class="hgi hgi-stroke hgi-task-01" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="nds-card-text nds-md">
                            <div class="nds-card-corner">
                                <a href="#" class="nds-btn nds-subtle nds-sm">
                                    <span class="nds-label">All requests</span>
                                    <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                                </a>
                            </div>
                            <span class="nds-card-title">My requests</span>
                            <p class="nds-card-description">Two open, two closed.</p>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <table class="nds-table nds-empty" data-empty-message="You have not sent any requests">
                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Reference</th>
                                    <th>Sent</th>
                                    <th data-align="center">Status</th>
                                    <th class="nds-actions-column">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Exam absence excuse</td>
                                    <td>REQ-2026-0412</td>
                                    <td>12/10/2026</td>
                                    <td data-align="center">
                                        <span class="nds-tag nds-sm" data-status="warning">
                                            <span class="nds-label">In review</span>
                                        </span>
                                    </td>
                                    <td class="nds-actions-column">
                                        <a href="#" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Details of REQ-2026-0412">
                                            <i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Change of section</td>
                                    <td>REQ-2026-0398</td>
                                    <td>05/10/2026</td>
                                    <td data-align="center">
                                        <span class="nds-tag nds-sm" data-status="info">
                                            <span class="nds-label">Action needed</span>
                                        </span>
                                    </td>
                                    <td class="nds-actions-column">
                                        <a href="#" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Details of REQ-2026-0398">
                                            <i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Enrollment letter</td>
                                    <td>REQ-2026-0371</td>
                                    <td>28/09/2026</td>
                                    <td data-align="center">
                                        <span class="nds-tag nds-sm" data-status="success">
                                            <span class="nds-label">Done</span>
                                        </span>
                                    </td>
                                    <td class="nds-actions-column">
                                        <a href="#" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Details of REQ-2026-0371">
                                            <i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Course withdrawal</td>
                                    <td>REQ-2026-0355</td>
                                    <td>21/09/2026</td>
                                    <td data-align="center">
                                        <span class="nds-tag nds-sm" data-status="error">
                                            <span class="nds-label">Rejected</span>
                                        </span>
                                    </td>
                                    <td class="nds-actions-column">
                                        <a href="#" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Details of REQ-2026-0355">
                                            <i class="hgi hgi-stroke hgi-view" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="nds-card-actions">
                        <a href="#" class="nds-btn nds-secondary-outline nds-md">
                            <i class="hgi hgi-stroke hgi-add-01" aria-hidden="true"></i>
                            <span class="nds-label">New request</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Coming up -->
<section id="coming-up" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Coming Up</h2>
            <p class="nds-section-description">Your exams and the key dates of the first term, 2026–2027.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-track: 2fr 1fr; --mid-track: 1fr;">
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-sm">
                                <i class="hgi hgi-stroke hgi-task-done-02" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="nds-card-text nds-md">
                            <div class="nds-card-corner">
                                <a href="#" class="nds-btn nds-subtle nds-sm">
                                    <span class="nds-label">Exam timetable</span>
                                    <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                                </a>
                            </div>
                            <span class="nds-card-title">Exams</span>
                            <p class="nds-card-description">Four finals over five days. Your midterms are graded.</p>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-tabs nds-content-switcher nds-sm">
                            <div class="nds-tab-list" role="tablist" aria-label="Exam type">
                                <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="true" aria-controls="exam-finals-panel" id="exam-finals-tab" tabindex="0">
                                    <span class="nds-label">Finals</span>
                                </button>
                                <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="false" aria-controls="exam-midterms-panel" id="exam-midterms-tab" tabindex="-1">
                                    <span class="nds-label">Midterms</span>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel" role="tabpanel" id="exam-finals-panel" aria-labelledby="exam-finals-tab" tabindex="0">
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-hourglass" aria-hidden="true"></i><span class="nds-countdown" data-countdown="2026-12-13T09:00">First exam in <span class="nds-countdown-value" data-unit="d">--</span> days</span></span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>Exam period: 13 – 17 Dec 2026</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Riyadh, women's campus</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-identity-card" aria-hidden="true"></i>Bring your student ID card</span>
                                    </span>
                                    <div class="nds-drawer nds-divided nds-fit nds-breakout">
                                        <ul class="nds-drawer-list nds-empty" aria-label="Final exams" data-empty-message="No final exams this term">
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-12-13">
                                                        <span class="nds-date-tile-weekday">Sun</span>
                                                        <span class="nds-date-tile-day">13</span>
                                                        <span class="nds-date-tile-month">Dec</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-tag" data-status="warning">
                                                                <span class="nds-label">First</span>
                                                            </span>
                                                            <span class="nds-label">ACCT 301 · Managerial Accounting</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 – 11:00 AM, 2 hours</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Exam Hall A-12</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-identity-card" aria-hidden="true"></i>Seat 34</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-12-14">
                                                        <span class="nds-date-tile-weekday">Mon</span>
                                                        <span class="nds-date-tile-day">14</span>
                                                        <span class="nds-date-tile-month">Dec</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-label">FIN 320 · Corporate Finance</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>1:00 – 3:00 PM, 2 hours</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Exam Hall B-04</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-identity-card" aria-hidden="true"></i>Seat 17</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-12-16">
                                                        <span class="nds-date-tile-weekday">Wed</span>
                                                        <span class="nds-date-tile-day">16</span>
                                                        <span class="nds-date-tile-month">Dec</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-tag" data-status="info">
                                                                <span class="nds-label">Online</span>
                                                            </span>
                                                            <span class="nds-label">MGT 310 · Organizational Behavior</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 – 10:30 AM, 90 minutes</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-computer" aria-hidden="true"></i>Online exam portal</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-12-17">
                                                        <span class="nds-date-tile-weekday">Thu</span>
                                                        <span class="nds-date-tile-day">17</span>
                                                        <span class="nds-date-tile-month">Dec</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-label">STAT 201 · Business Statistics</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 – 11:00 AM, 2 hours</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Exam Hall A-07</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-identity-card" aria-hidden="true"></i>Seat 52</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nds-tab-panel" role="tabpanel" id="exam-midterms-panel" aria-labelledby="exam-midterms-tab" tabindex="-1" hidden>
                                    <div class="nds-progress-bar nds-md" data-value="88" role="progressbar" aria-labelledby="midterm-average">
                                        <span class="nds-progress-label" id="midterm-average">Average: 70 of 80 marks, 88%</span>
                                        <div class="nds-progress-track">
                                            <div class="nds-progress-fill"></div>
                                        </div>
                                    </div>
                                    <div class="nds-drawer nds-divided nds-fit nds-breakout">
                                        <ul class="nds-drawer-list nds-empty" aria-label="Midterm results" data-empty-message="No midterm results yet">
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-10-04">
                                                        <span class="nds-date-tile-weekday">Sun</span>
                                                        <span class="nds-date-tile-day">4</span>
                                                        <span class="nds-date-tile-month">Oct</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-label">ACCT 301 · Managerial Accounting</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-checkmark-badge-01" aria-hidden="true"></i>17 of 20</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-percent-square" aria-hidden="true"></i>20% of the final grade</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-10-05">
                                                        <span class="nds-date-tile-weekday">Mon</span>
                                                        <span class="nds-date-tile-day">5</span>
                                                        <span class="nds-date-tile-month">Oct</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-label">FIN 320 · Corporate Finance</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-checkmark-badge-01" aria-hidden="true"></i>18 of 20</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-percent-square" aria-hidden="true"></i>20% of the final grade</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-10-06">
                                                        <span class="nds-date-tile-weekday">Tue</span>
                                                        <span class="nds-date-tile-day">6</span>
                                                        <span class="nds-date-tile-month">Oct</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-label">MGT 310 · Organizational Behavior</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-checkmark-badge-01" aria-hidden="true"></i>16 of 20</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-percent-square" aria-hidden="true"></i>20% of the final grade</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle">
                                                    <time class="nds-date-tile" datetime="2026-10-07">
                                                        <span class="nds-date-tile-weekday">Wed</span>
                                                        <span class="nds-date-tile-day">7</span>
                                                        <span class="nds-date-tile-month">Oct</span>
                                                    </time>
                                                    <span class="nds-drawer-item">
                                                        <span class="nds-drawer-item-head">
                                                            <span class="nds-label">STAT 201 · Business Statistics</span>
                                                        </span>
                                                        <span class="nds-meta">
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-checkmark-badge-01" aria-hidden="true"></i>19 of 20</span>
                                                            <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-percent-square" aria-hidden="true"></i>20% of the final grade</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-sm">
                                <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="nds-card-text nds-md">
                            <div class="nds-card-corner">
                                <a href="#" class="nds-btn nds-subtle nds-sm">
                                    <span class="nds-label">Full calendar</span>
                                    <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                                </a>
                            </div>
                            <span class="nds-card-title">Key dates</span>
                            <p class="nds-card-description">First term, 1448 AH. Course withdrawal is open until 22 Oct.</p>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-scroll-more nds-fit">
                            <div class="nds-scroll-more-content">
                                <div class="nds-drawer nds-divided">
                                    <ul class="nds-drawer-list nds-empty" aria-label="Key dates" data-empty-message="No key dates this term">
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle">
                                                <time class="nds-date-tile" datetime="2026-10-22">
                                                    <span class="nds-date-tile-weekday">Thu</span>
                                                    <span class="nds-date-tile-day">22</span>
                                                    <span class="nds-date-tile-month">Oct</span>
                                                </time>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-tag" data-status="warning">
                                                            <span class="nds-label">Next week</span>
                                                        </span>
                                                        <span class="nds-label">Last day to withdraw from a course</span>
                                                    </span>
                                                    <span class="nds-meta">
                                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-moon-02" aria-hidden="true"></i>11 Jumada I 1448 AH</span>
                                                    </span>
                                                    <span class="nds-description">After this day, a withdrawal counts as a fail.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle">
                                                <time class="nds-date-tile" datetime="2026-11-01">
                                                    <span class="nds-date-tile-weekday">Sun</span>
                                                    <span class="nds-date-tile-day">1</span>
                                                    <span class="nds-date-tile-month">Nov</span>
                                                </time>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-tag" data-status="info">
                                                            <span class="nds-label">Upcoming</span>
                                                        </span>
                                                        <span class="nds-label">Fee installments open</span>
                                                    </span>
                                                    <span class="nds-meta">
                                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-moon-02" aria-hidden="true"></i>21 Jumada I 1448 AH</span>
                                                    </span>
                                                    <span class="nds-description">Split this term's fees into monthly payments.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle">
                                                <time class="nds-date-tile" datetime="2026-11-15">
                                                    <span class="nds-date-tile-weekday">Sun</span>
                                                    <span class="nds-date-tile-day">15</span>
                                                    <span class="nds-date-tile-month">Nov</span>
                                                </time>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-tag" data-status="info">
                                                            <span class="nds-label">Upcoming</span>
                                                        </span>
                                                        <span class="nds-label">Registration opens for the second term</span>
                                                    </span>
                                                    <span class="nds-meta">
                                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-moon-02" aria-hidden="true"></i>5 Jumada II 1448 AH</span>
                                                    </span>
                                                    <span class="nds-description">Pick your courses for the second term in the registration system.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle">
                                                <time class="nds-date-tile" datetime="2026-12-13">
                                                    <span class="nds-date-tile-weekday">Sun</span>
                                                    <span class="nds-date-tile-day">13</span>
                                                    <span class="nds-date-tile-month">Dec</span>
                                                </time>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-tag" data-status="info">
                                                            <span class="nds-label">Upcoming</span>
                                                        </span>
                                                        <span class="nds-label">Final exams start</span>
                                                    </span>
                                                    <span class="nds-meta">
                                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-moon-02" aria-hidden="true"></i>4 Rajab 1448 AH</span>
                                                    </span>
                                                    <span class="nds-description">The final exam period runs for one week.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle">
                                                <time class="nds-date-tile" datetime="2026-12-24">
                                                    <span class="nds-date-tile-weekday">Thu</span>
                                                    <span class="nds-date-tile-day">24</span>
                                                    <span class="nds-date-tile-month">Dec</span>
                                                </time>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-tag" data-status="info">
                                                            <span class="nds-label">Upcoming</span>
                                                        </span>
                                                        <span class="nds-label">Final results out</span>
                                                    </span>
                                                    <span class="nds-meta">
                                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-moon-02" aria-hidden="true"></i>15 Rajab 1448 AH</span>
                                                    </span>
                                                    <span class="nds-description">Your grades show in your academic record.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle">
                                                <time class="nds-date-tile" datetime="2026-12-27">
                                                    <span class="nds-date-tile-weekday">Sun</span>
                                                    <span class="nds-date-tile-day">27</span>
                                                    <span class="nds-date-tile-month">Dec</span>
                                                </time>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-tag" data-status="neutral">
                                                            <span class="nds-label">Break</span>
                                                        </span>
                                                        <span class="nds-label">Mid-year break starts</span>
                                                    </span>
                                                    <span class="nds-meta">
                                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-moon-02" aria-hidden="true"></i>18 Rajab 1448 AH</span>
                                                    </span>
                                                    <span class="nds-description">Classes start again on 10 Jan 2027.</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-subtle nds-md nds-show-more">
                                <span class="nds-label" data-i18n="scroll-more.show_more">Show more</span>
                                <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Quick actions -->
<section id="quick-actions" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Quick Actions</h2>
            <p class="nds-section-description">The tasks students do most, one click away.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 2;">
                <button type="button" class="nds-card nds-stroke" data-modal-target="fees-modal">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle">
                                <i class="hgi hgi-stroke hgi-wallet-01" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Fees and payments</span>
                            <p class="nds-card-description">See what you owe and what you paid.</p>
                        </div>
                    </div>
                </button>
                <button type="button" class="nds-card nds-stroke" data-modal-target="plan-modal">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle">
                                <i class="hgi hgi-stroke hgi-graduation-scroll" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Study plan</span>
                            <p class="nds-card-description">The credit hours you have left, by group.</p>
                        </div>
                    </div>
                </button>
                <button type="button" class="nds-card nds-stroke" data-modal-target="letter-modal">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle">
                                <i class="hgi hgi-stroke hgi-message-edit-01" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Request a letter</span>
                            <p class="nds-card-description">Get an official letter for your employer or a bank.</p>
                        </div>
                    </div>
                </button>
                <a href="#" class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle">
                                <i class="hgi hgi-stroke hgi-printer" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <span class="nds-card-title">Transcript</span>
                            <p class="nds-card-description">Download your grades for every term as a PDF.</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- University systems -->
<section id="systems" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">University Systems</h2>
            <p class="nds-section-description">Open the other systems you use for your studies.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-swiper" style="--max-slides: 5; --mid-slides: 3; --min-slides: 2">
                <div class="nds-swiper-wrapper">
                    <div class="nds-swiper-slide">
                        <a href="#" class="nds-card nds-stroke nds-center">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                        <i class="hgi hgi-stroke hgi-library" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <span class="nds-card-title">Learning platform</span>
                            </div>
                        </a>
                    </div>
                    <div class="nds-swiper-slide">
                        <a href="#" class="nds-card nds-stroke nds-center">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                        <i class="hgi hgi-stroke hgi-presentation-01" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <span class="nds-card-title">Virtual classes</span>
                            </div>
                        </a>
                    </div>
                    <div class="nds-swiper-slide">
                        <a href="#" class="nds-card nds-stroke nds-center">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                        <i class="hgi hgi-stroke hgi-task-done-02" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <span class="nds-card-title">Online exams</span>
                            </div>
                        </a>
                    </div>
                    <div class="nds-swiper-slide">
                        <a href="#" class="nds-card nds-stroke nds-center">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                        <i class="hgi hgi-stroke hgi-mail-01" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <span class="nds-card-title">Student email</span>
                            </div>
                        </a>
                    </div>
                    <div class="nds-swiper-slide">
                        <a href="#" class="nds-card nds-stroke nds-center">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                        <i class="hgi hgi-stroke hgi-book-open-01" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <span class="nds-card-title">Digital library</span>
                            </div>
                        </a>
                    </div>
                    <div class="nds-swiper-slide">
                        <a href="#" class="nds-card nds-stroke nds-center">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-dark nds-lg">
                                        <i class="hgi hgi-stroke hgi-customer-support" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <span class="nds-card-title">IT help desk</span>
                            </div>
                        </a>
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
    </div>
</section>

<!-- Services -->
<section id="services" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Student Services</h2>
            <p class="nds-section-description">Services you can apply for online.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-swiper" style="--max-slides: 3; --mid-slides: 2; --min-slides: 1">
                <div class="nds-swiper-wrapper">
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-lg">
                                        <i class="hgi hgi-stroke hgi-mortarboard-01" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <div class="nds-card-corner">
                                        <span class="nds-tag nds-xs" data-status="success">
                                            <span class="nds-label">Open</span>
                                        </span>
                                    </div>
                                    <span class="nds-card-title">Graduation request</span>
                                    <p class="nds-card-description">Apply to graduate and get your degree certificate once you meet the requirements.</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Academic</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label"><span class="nds-number-format" data-currency="SAR">100</span></span>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="#" class="nds-btn nds-primary nds-md">
                                    <span class="nds-label">Start</span>
                                </a>
                                <a href="#" class="nds-btn nds-secondary-outline nds-md">
                                    <span class="nds-label">Details</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-lg">
                                        <i class="hgi hgi-stroke hgi-file-upload" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <div class="nds-card-corner">
                                        <span class="nds-tag nds-xs" data-status="success">
                                            <span class="nds-label">Open</span>
                                        </span>
                                    </div>
                                    <span class="nds-card-title">Absence excuse</span>
                                    <p class="nds-card-description">Send a medical or official excuse for a missed class or exam.</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Academic</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Free</span>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="#" class="nds-btn nds-primary nds-md">
                                    <span class="nds-label">Start</span>
                                </a>
                                <a href="#" class="nds-btn nds-secondary-outline nds-md">
                                    <span class="nds-label">Details</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke nds-disabled" inert>
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-lg">
                                        <i class="hgi hgi-stroke hgi-wallet-01" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <div class="nds-card-corner">
                                        <span class="nds-tag nds-xs" data-status="neutral">
                                            <span class="nds-label">Closed</span>
                                        </span>
                                    </div>
                                    <span class="nds-card-title">Fee installments</span>
                                    <p class="nds-card-description">Split this term's tuition fees into monthly payments. Opens on 1 Nov 2026.</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-green nds-sm">
                                        <span class="nds-label">Financial</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Free</span>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="#" class="nds-btn nds-primary nds-md">
                                    <span class="nds-label">Start</span>
                                </a>
                                <a href="#" class="nds-btn nds-secondary-outline nds-md">
                                    <span class="nds-label">Details</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-lg">
                                        <i class="hgi hgi-stroke hgi-edit-user-02" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <div class="nds-card-corner">
                                        <span class="nds-tag nds-xs" data-status="success">
                                            <span class="nds-label">Open</span>
                                        </span>
                                    </div>
                                    <span class="nds-card-title">Update personal details</span>
                                    <p class="nds-card-description">Change your mobile number, email or national address.</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Account</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Free</span>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="#" class="nds-btn nds-primary nds-md">
                                    <span class="nds-label">Start</span>
                                </a>
                                <a href="#" class="nds-btn nds-secondary-outline nds-md">
                                    <span class="nds-label">Details</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle nds-lg">
                                        <i class="hgi hgi-stroke hgi-customer-support" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <div class="nds-card-corner">
                                        <span class="nds-tag nds-xs" data-status="success">
                                            <span class="nds-label">Open</span>
                                        </span>
                                    </div>
                                    <span class="nds-card-title">Book an advising session</span>
                                    <p class="nds-card-description">Meet your academic advisor in person or online.</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue nds-sm">
                                        <span class="nds-label">Academic</span>
                                    </span>
                                    <span class="nds-tag nds-gray nds-sm">
                                        <span class="nds-label">Free</span>
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-actions">
                                <a href="#" class="nds-btn nds-primary nds-md">
                                    <span class="nds-label">Start</span>
                                </a>
                                <a href="#" class="nds-btn nds-secondary-outline nds-md">
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
    </div>
</section>

<!-- Academic standing modal -->
<dialog id="standing-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="standing-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle" data-status="success">
                <i class="nds-icon nds-hgi-checkmark-circle-01" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="standing-modal-title">Academic standing</span>
            <p class="nds-card-description">Nothing on your record stops you from registering or graduating.</p>
        </div>
        <dl class="nds-definition-list nds-divided">
            <div class="nds-definition-item">
                <dt><span class="nds-label">Academic warnings</span></dt>
                <dd>None</dd>
            </div>
            <div class="nds-definition-item">
                <dt><span class="nds-label">Registration holds</span></dt>
                <dd>None</dd>
            </div>
            <div class="nds-definition-item">
                <dt><span class="nds-label">Overdue fees</span></dt>
                <dd>None</dd>
            </div>
            <div class="nds-definition-item">
                <dt><span class="nds-label">Disciplinary notes</span></dt>
                <dd>None</dd>
            </div>
        </dl>
    </div>
    <div class="nds-card-actions">
        <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
            <span class="nds-label">Done</span>
        </button>
    </div>
</dialog>

<!-- Study plan modal -->
<dialog id="plan-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="plan-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="hgi hgi-stroke hgi-graduation-scroll" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="plan-modal-title">Study plan</span>
            <p class="nds-card-description">96 of 132 credit hours done. 36 hours left.</p>
        </div>
        <div class="nds-progress-bar nds-md" data-value="89" role="progressbar" aria-labelledby="plan-university">
            <span class="nds-progress-label" id="plan-university">University requirements: 24 of 27 hours</span>
            <div class="nds-progress-track">
                <div class="nds-progress-fill"></div>
            </div>
        </div>
        <div class="nds-progress-bar nds-md" data-value="80" role="progressbar" aria-labelledby="plan-college">
            <span class="nds-progress-label" id="plan-college">College requirements: 24 of 30 hours</span>
            <div class="nds-progress-track">
                <div class="nds-progress-fill"></div>
            </div>
        </div>
        <div class="nds-progress-bar nds-md" data-value="67" role="progressbar" aria-labelledby="plan-major">
            <span class="nds-progress-label" id="plan-major">Major requirements: 42 of 63 hours</span>
            <div class="nds-progress-track">
                <div class="nds-progress-fill"></div>
            </div>
        </div>
        <div class="nds-progress-bar nds-md" data-value="50" role="progressbar" aria-labelledby="plan-electives">
            <span class="nds-progress-label" id="plan-electives">Free electives: 6 of 12 hours</span>
            <div class="nds-progress-track">
                <div class="nds-progress-fill"></div>
            </div>
        </div>
    </div>
    <div class="nds-card-actions">
        <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
            <span class="nds-label">Done</span>
        </button>
    </div>
</dialog>

<!-- Fees modal -->
<dialog id="fees-modal" class="nds-modal nds-card nds-stroke nds-lg" aria-labelledby="fees-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="hgi hgi-stroke hgi-wallet-01" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="fees-modal-title">Fees and payments</span>
            <p class="nds-card-description">First term 2026–2027. Pay the balance before 1 Nov 2026 to keep your registration.</p>
        </div>
        <table class="nds-table nds-empty" data-empty-message="Nothing to pay this term">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Due</th>
                    <th data-align="center">Status</th>
                    <th data-align="end">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tuition, 15 credit hours</td>
                    <td>1 Sep 2026</td>
                    <td>
                        <span class="nds-tag nds-sm" data-status="success">
                            <span class="nds-label">Paid</span>
                        </span>
                    </td>
                    <td><span class="nds-number-format" data-currency="SAR">9000</span></td>
                </tr>
                <tr>
                    <td>Student services fee</td>
                    <td>1 Sep 2026</td>
                    <td>
                        <span class="nds-tag nds-sm" data-status="success">
                            <span class="nds-label">Paid</span>
                        </span>
                    </td>
                    <td><span class="nds-number-format" data-currency="SAR">500</span></td>
                </tr>
                <tr>
                    <td>Second installment</td>
                    <td>1 Nov 2026</td>
                    <td>
                        <span class="nds-tag nds-sm" data-status="warning">
                            <span class="nds-label">Due</span>
                        </span>
                    </td>
                    <td><span class="nds-number-format" data-currency="SAR">4500</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="nds-card-actions">
        <a href="#" class="nds-btn nds-primary nds-lg">
            <span class="nds-label">Pay 4,500 SAR</span>
        </a>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
            <span class="nds-label">Close</span>
        </button>
    </div>
</dialog>

<!-- Letter request modal -->
<dialog id="letter-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="letter-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="hgi hgi-stroke hgi-message-edit-01" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="letter-modal-title">Request a letter</span>
            <p class="nds-card-description">The letter comes to your university email as a PDF with a digital stamp.</p>
        </div>
        <fieldset class="nds-form-group nds-radio-group">
            <legend class="nds-label">Letter type</legend>
            <div class="nds-form-container nds-radio-container">
                <div class="nds-form-header">
                    <label for="letter-enrollment">
                        <span class="nds-label">Enrollment letter</span>
                        <span class="nds-info">Says you are a student this term</span>
                    </label>
                </div>
                <div class="nds-form-control">
                    <input type="radio" id="letter-enrollment" name="letter-type" value="enrollment" class="nds-radio" checked>
                </div>
            </div>
            <div class="nds-form-container nds-radio-container">
                <div class="nds-form-header">
                    <label for="letter-hours">
                        <span class="nds-label">Completed hours</span>
                        <span class="nds-info">Lists the credit hours you passed</span>
                    </label>
                </div>
                <div class="nds-form-control">
                    <input type="radio" id="letter-hours" name="letter-type" value="hours" class="nds-radio">
                </div>
            </div>
            <div class="nds-form-container nds-radio-container">
                <div class="nds-form-header">
                    <label for="letter-graduation">
                        <span class="nds-label">Expected graduation</span>
                        <span class="nds-info">Gives the term you are expected to graduate</span>
                    </label>
                </div>
                <div class="nds-form-control">
                    <input type="radio" id="letter-graduation" name="letter-type" value="graduation" class="nds-radio">
                </div>
            </div>
        </fieldset>
    </div>
    <div class="nds-card-actions">
        <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
            <span class="nds-label">Send request</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
            <span class="nds-label">Cancel</span>
        </button>
    </div>
</dialog>

<!-- Exam support: a FAB that opens a panel of common questions -->
<button type="button" class="nds-btn nds-fab nds-primary nds-circle nds-icon-only" data-panel-toggle="support-panel" aria-label="Exam support" hidden>
    <i class="hgi hgi-stroke hgi-customer-support" aria-hidden="true"></i>
</button>
<dialog id="support-panel" class="nds-panel" data-panel-side="start" aria-label="Exam support">
    <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle">
            <i class="hgi hgi-stroke hgi-customer-support" aria-hidden="true"></i>
        </span>
        <div class="nds-panel-text">
            <span class="nds-panel-title">Exam support</span>
            <p class="nds-panel-description">Answers to the questions students ask most before an exam.</p>
        </div>
        <div class="nds-panel-action">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close panel" data-i18n-aria-label="panels.close_panel">
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="nds-panel-body">
        <nav class="nds-drawer nds-divided" aria-label="Common questions">
            <ul class="nds-drawer-list nds-empty" data-empty-message="No questions yet">
                <li>
                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                        <span class="nds-label">How do I join an online exam?</span>
                        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                        <span class="nds-label">Can I take an exam on a phone or tablet?</span>
                        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                        <span class="nds-label">What if my internet drops during an exam?</span>
                        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                        <span class="nds-label">How do I send an excuse for a missed exam?</span>
                        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="nds-panel-footer">
        <a href="#" class="nds-btn nds-primary nds-full">
            <i class="hgi hgi-stroke hgi-call" aria-hidden="true"></i>
            <span class="nds-label">Call the help desk</span>
        </a>
    </div>
</dialog>
