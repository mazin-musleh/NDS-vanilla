---
layout: page
title: Events Calendar
hero_title: Events Calendar
hero_description: A ministry's events page, where people browse the week's events and book a seat without leaving the page.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
content_class: nds-stripe
sidemenu_mode: false
last_edit: "25/10/2026 - 01:58 PM"
---

<!-- Layout rules: how an event opens depends on what the user does with it.
     - Users book or act on the event: the rows open ONE shared Panel, filled from the clicked row by the page script below. Never one panel per event.
     - The page is only an agenda: each row is a link (<a href>) to the event's own page, and there is no panel.
     - Users only read a few more details, with no form: one shared Modal works the same way.
     - A real site fills the panel from its server by the event's id. This demo copies the row, plus its data-summary.
     The Calendar IS the events list, by week or month. Do not add a second list of the same events beside it.
     The featured event is a card with a Countdown; its Register button opens the same panel, and data-countdown-hide removes it once the event starts. -->

<!-- Featured event: the Countdown banner card with an image header in place of its icon, plus tags and a Meta line. No Share here: the hero's Share covers the page -->
<section id="featured" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Featured event</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-card nds-stroke nds-horizontal nds-full">
                <div class="nds-card-header">
                    <div class="nds-card-image">
                        <img src="{{ 'assets/img/riyadhcenter.webp' | relative_url }}" alt="The forum's venue in Riyadh" width="1280" height="720">
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-tags">
                        <span class="nds-tag nds-blue nds-sm">
                            <span class="nds-label">Conference</span>
                        </span>
                        <span class="nds-tag nds-gray nds-sm">
                            <span class="nds-label">Free</span>
                        </span>
                    </div>
                    <div class="nds-card-text">
                        <span class="nds-card-title">Digital Government Forum 2026</span>
                        <p class="nds-card-description">Leaders and teams from across government share what they built this year, and what comes next.</p>
                    </div>
                    <span class="nds-meta">
                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>Tue 10 Nov 2026, 9:00 AM</span>
                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>King Abdulaziz Center, Riyadh</span>
                    </span>
                </div>
                <div class="nds-countdown" data-countdown="2026-11-10T09:00" data-countdown-hide="forum-register">
                    <div data-unit="d">
                        <span class="nds-countdown-value">--</span>
                        <span class="nds-countdown-label"></span>
                    </div>
                    <div data-unit="h">
                        <span class="nds-countdown-value">--</span>
                        <span class="nds-countdown-label"></span>
                    </div>
                    <div data-unit="m">
                        <span class="nds-countdown-value">--</span>
                        <span class="nds-countdown-label"></span>
                    </div>
                    <div data-unit="s">
                        <span class="nds-countdown-value">--</span>
                        <span class="nds-countdown-label"></span>
                    </div>
                    <span class="nds-countdown-ended">The forum has started</span>
                </div>
                <div class="nds-card-actions">
                    <button type="button" id="forum-register" class="nds-btn nds-primary" data-panel-toggle="event-panel" data-event="event-forum">
                        <span class="nds-label">Register</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Events calendar: the Calendar with a Filter. Each row is a button that opens the shared booking panel -->
<section id="calendar" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Events calendar</h2>
            <p class="nds-section-description">Pick an event to see its details and book a seat.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-calendar" data-date="2026-10-25" data-view="month">
                <div class="nds-toolbar">
                    <div class="nds-toolbar-start">
                        <p class="nds-calendar-title"></p>
                    </div>
                    <div class="nds-toolbar-end">
                        <div class="nds-dropmenu nds-filter" data-filter-target="event-list">
                            <button class="nds-btn nds-md nds-secondary-outline nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
                                <i class="nds-icon nds-hgi-filter" aria-hidden="true"></i>
                                <span class="nds-label" data-hidden="sm sr" data-i18n="filter.filter">Filter</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <div data-filter="type" data-filter-type="checkbox" data-filter-legend="Type"></div>
                                    <div data-filter="place" data-filter-type="checkbox" data-filter-legend="Place"></div>
                                </div>
                                <div class="nds-dropmenu-footer">
                                    <hr class="nds-divider">
                                    <div class="nds-dropmenu-action">
                                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
                                            <span class="nds-label" data-i18n="filter.reset">Reset</span>
                                        </button>
                                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
                                            <span class="nds-label" data-i18n="filter.apply">Apply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nds-btn-group">
                            <button type="button" class="nds-btn nds-md nds-secondary-outline nds-icon-only" data-calendar-action="prev" aria-label="Previous week" data-i18n-aria-label="calendar.previous_week">
                                <i class="nds-icon nds-hgi-arrow-prev-02" aria-hidden="true"></i>
                            </button>
                            <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-action="today">
                                <span class="nds-label" data-i18n="calendar.today">Today</span>
                            </button>
                            <button type="button" class="nds-btn nds-md nds-secondary-outline nds-icon-only" data-calendar-action="next" aria-label="Next week" data-i18n-aria-label="calendar.next_week">
                                <i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="nds-btn-group nds-calendar-views">
                            <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="grid">
                                <i class="hgi hgi-stroke hgi-grid-view" aria-hidden="true"></i>
                                <span class="nds-label" data-i18n="calendar.grid">Grid</span>
                            </button>
                            <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="rows">
                                <i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"></i>
                                <span class="nds-label" data-i18n="calendar.rows">Rows</span>
                            </button>
                            <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="month">
                                <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                <span class="nds-label" data-i18n="calendar.month">Month</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-filter-applied" data-filter-target="event-list" data-chip-class="nds-primary" hidden>
                        <div class="nds-toolbar-end">
                            <span class="nds-label" data-i18n="filter.applied_filters">Applied Filters:</span>
                            <div class="nds-chips"></div>
                        </div>
                    </div>
                </div>
                <div class="nds-calendar-days" role="group" aria-label="Days" data-i18n-aria-label="calendar.days"></div>
                <div class="nds-drawer nds-divided">
                    <!-- Each row's meta line is time, place, seats, in that order: the page script reads them so.
                         The seats fact takes Meta's status: warning for a few seats left, error for Full. A full event's row has data-full (from the server on a real site) and still opens, to show its details -->
                    <ul id="event-list" class="nds-drawer-list nds-calendar-events" aria-label="Events" data-filter-items="li">
                        <li data-summary="A hands-on day on mapping a service from the user's side, with real service journeys from across government.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-10-25T09:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Workshop</span>
                                        </span>
                                        <span class="nds-label">Service design workshop</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 AM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="In person"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Riyadh, Hall 2</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>8 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-summary="How to find, download and cite the ministry's open datasets, with a live walk through the data portal.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-10-26T13:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Webinar</span>
                                        </span>
                                        <span class="nds-label">Open data for researchers</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>1:00 PM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="Online"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>120 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-full data-summary="Write letters, forms and web pages that people understand on the first read.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-10-27T10:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Workshop</span>
                                        </span>
                                        <span class="nds-label">Plain language for public writers</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>10:00 AM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="In person"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Riyadh, Room 4</span>
                                        <span class="nds-meta-item" data-status="error"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>Full</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-summary="A step-by-step look at applying for, renewing and changing a business license on the e-services portal.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-10-28T18:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Webinar</span>
                                        </span>
                                        <span class="nds-label">Applying for a business license online</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>6:00 PM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="Online"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>300 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-summary="Test a web page with a screen reader the way its users do, and fix what you find.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-10-29T10:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Workshop</span>
                                        </span>
                                        <span class="nds-label">Accessibility testing with screen readers</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>10:00 AM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="In person"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Jeddah, Training Center</span>
                                        <span class="nds-meta-item" data-status="warning"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>3 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-summary="Ask the team behind the new e-services portal anything, from signing in to tracking a request.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-11-03T11:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Webinar</span>
                                        </span>
                                        <span class="nds-label">Questions and answers: the new e-services portal</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>11:00 AM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="Online"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>200 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-summary="Pick the right chart for your numbers, and make it readable in reports and on screen.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-11-08T10:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Workshop</span>
                                        </span>
                                        <span class="nds-label">Data visualization basics</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>10:00 AM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="In person"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Riyadh, Hall 2</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>12 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li id="event-forum" data-summary="Leaders and teams from across government share what they built this year, and what comes next. Talks in the morning, workshops after lunch.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-11-10T09:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Conference</span>
                                        </span>
                                        <span class="nds-label">Digital Government Forum 2026</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 AM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="In person"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>King Abdulaziz Center, Riyadh</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>350 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li data-summary="Simple steps that keep a small business safe online: passwords, phishing, backups and payments.">
                            <button type="button" class="nds-btn nds-subtle" data-panel-toggle="event-panel">
                                <time class="nds-date-tile" datetime="2026-11-11T14:00"></time>
                                <span class="nds-drawer-item">
                                    <span class="nds-drawer-item-head">
                                        <span class="nds-tag" data-filter="type">
                                            <span class="nds-label">Webinar</span>
                                        </span>
                                        <span class="nds-label">Cyber safety for small businesses</span>
                                    </span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>2:00 PM</span>
                                        <span class="nds-meta-item" data-filter="place" data-filter-value="Online"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
                                        <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>150 seats left</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="nds-empty-placeholder nds-calendar-empty">
                    <i class="nds-icon nds-hgi-desert" aria-hidden="true"></i>
                    <span class="nds-empty-message" data-i18n="empty.message">No content to show</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Get updates: a one-field form; a passing submit shows a toast -->
<section id="updates" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Get event updates</h2>
            <p class="nds-section-description">We email you when new events open for booking.</p>
        </div>
        <div class="nds-section-body">
            <form id="updates-form" class="nds-form" data-ajax>
                <div class="nds-form-container" data-required style="--form-width: 360px">
                    <div class="nds-form-header">
                        <label for="updates-email">
                            <span class="nds-label">Email address</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                        <input type="email" id="updates-email" name="email" class="nds-input" placeholder="name@example.com" autocomplete="email">
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
    </div>
</section>

<!-- The one booking panel every event opens. The page script fills it from the clicked row -->
<dialog id="event-panel" class="nds-panel" data-panel-modal aria-labelledby="event-panel-title">
    <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle">
            <i class="hgi hgi-stroke hgi-calendar-03"></i>
        </span>
        <div class="nds-panel-text">
            <span id="event-panel-title" class="nds-panel-title">Event</span>
            <p class="nds-panel-description"><span id="event-type" class="nds-tag nds-sm"><span class="nds-label"></span></span></p>
        </div>
        <div class="nds-panel-action">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close panel" data-i18n-aria-label="panel.close_panel">
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="nds-panel-body">
        <div class="nds-flex nds-col">
            <p id="event-summary"></p>
            <dl class="nds-definition-list nds-grid nds-highlight-value nds-md" style="--max-col: 2;">
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                        <span class="nds-label">Date</span>
                    </dt>
                    <dd id="event-date"></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                        <span class="nds-label">Time</span>
                    </dt>
                    <dd id="event-time"></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
                        <span class="nds-label">Place</span>
                    </dt>
                    <dd id="event-place"></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>
                        <i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>
                        <span class="nds-label">Seats</span>
                    </dt>
                    <dd id="event-seats"></dd>
                </div>
            </dl>
            <hr class="nds-divider">
            <form id="event-booking" class="nds-form" data-ajax>
                <div class="nds-flex nds-col">
                    <!-- In-person events also stream online; an online event hides this choice, and a hidden field is not checked -->
                    <fieldset id="event-attend" class="nds-form-group nds-radio-group">
                        <legend class="nds-label">How will you attend?</legend>
                        <div class="nds-form-container nds-radio">
                            <div class="nds-form-header">
                                <label for="attend-venue">
                                    <span class="nds-label">In person</span>
                                </label>
                            </div>
                            <div class="nds-form-control">
                                <input type="radio" id="attend-venue" name="attend" value="venue" class="nds-radio-input" checked>
                            </div>
                        </div>
                        <div class="nds-form-container nds-radio">
                            <div class="nds-form-header">
                                <label for="attend-stream">
                                    <span class="nds-label">Online stream</span>
                                </label>
                            </div>
                            <div class="nds-form-control">
                                <input type="radio" id="attend-stream" name="attend" value="stream" class="nds-radio-input">
                            </div>
                        </div>
                    </fieldset>
                    <div class="nds-form-container" style="--form-width: 160px">
                        <div class="nds-form-header">
                            <label for="event-seat-count">
                                <span class="nds-label">Seats</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <div class="nds-form-action nds-prefix">
                                <button class="nds-btn nds-secondary nds-md nds-number-decrement nds-icon-only" type="button" aria-label="Decrease value" data-i18n-aria-label="form.decrease_value">
                                    <i class="nds-icon nds-hgi-minus-sign" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" id="event-seat-count" name="seats" class="nds-input nds-center" inputmode="numeric" value="1" min="1" max="4" step="1">
                            <div class="nds-form-action nds-suffix">
                                <button class="nds-btn nds-secondary nds-md nds-number-increment nds-icon-only" type="button" aria-label="Increase value" data-i18n-aria-label="form.increase_value">
                                    <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div id="event-full" class="nds-alert nds-card nds-inline" data-status="warning" hidden>
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">No seats left:</span>
                        <p class="nds-alert-description">This event is full.</p>
                    </div>
                </div>
            </div>
            <div id="event-booked" class="nds-alert nds-card nds-inline" data-status="success" role="alert" hidden>
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">Seat booked:</span>
                        <p class="nds-alert-description">We emailed you the details.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-panel-footer">
        <button type="submit" id="event-book" form="event-booking" class="nds-btn nds-primary nds-full">
            <span class="nds-label">Book a seat</span>
        </button>
        <button type="button" id="event-done" class="nds-btn nds-primary nds-full" data-panel-close hidden>
            <span class="nds-label">Done</span>
        </button>
    </div>
</dialog>

<script>
  function initPage() {
    var form = document.getElementById('event-booking');
    var attend = document.getElementById('event-attend');
    var booked = document.getElementById('event-booked');
    var full = document.getElementById('event-full');
    var bookButton = document.getElementById('event-book');
    var doneButton = document.getElementById('event-done');
    var setText = function (id, text) { document.getElementById(id).textContent = text; };
    var readText = function (el) { return el ? el.textContent.trim() : ''; };

    // ponytail: copies the row; a real site loads the event by its id from the server here
    function fillPanel(row) {
      var tile = row.querySelector('.nds-date-tile');
      var meta = row.querySelectorAll('.nds-meta-item');
      var place = row.querySelector('[data-filter="place"]');
      setText('event-panel-title', readText(row.querySelector('.nds-drawer-item-head > .nds-label')));
      document.querySelector('#event-type .nds-label').textContent = readText(row.querySelector('[data-filter="type"]'));
      setText('event-summary', row.getAttribute('data-summary') || '');
      setText('event-date', NDS.Date.getDayLabel(NDS.Date.readDay(tile.getAttribute('datetime')), { calendar: NDS.Date.getCalendar(tile), locale: tile.closest('[lang]').lang }));
      setText('event-time', readText(meta[0]));
      setText('event-place', readText(meta[1]));
      setText('event-seats', readText(meta[2]));
      attend.hidden = place.getAttribute('data-filter-value') === 'Online';
      // A full event shows why there is nothing to book, never a disabled Book button
      var isFull = row.hasAttribute('data-full');
      form.reset();
      form.hidden = isFull;
      full.hidden = !isFull;
      booked.hidden = true;
      bookButton.hidden = isFull;
      doneButton.hidden = !isFull;
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-panel-toggle="event-panel"]');
      if (!trigger) return;
      var row = trigger.closest('li') || document.getElementById(trigger.getAttribute('data-event'));
      if (row) fillPanel(row);
    });

    // Book: the form waits on the request, then the panel shows the result
    form.addEventListener('nds:form:valid', function (e) {
      e.detail.waitUntil(new Promise(function (resolve) { setTimeout(resolve, 1200); }).then(function () {
        form.hidden = true;
        booked.hidden = false;
        bookButton.hidden = true;
        doneButton.hidden = false;
        doneButton.focus();
      }));
    });

    document.getElementById('updates-form').addEventListener('nds:form:valid', function (e) {
      var updates = e.target;
      e.detail.waitUntil(new Promise(function (resolve) { setTimeout(resolve, 800); }).then(function () {
        updates.reset();
        NDS.Alert.create({ variant: 'success', title: 'Subscribed', description: 'We will email you when new events open.', display: 'toast', duration: 4000 });
      }));
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
