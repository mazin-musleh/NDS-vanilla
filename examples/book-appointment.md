---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: Book an Appointment
hero_title: Book an Appointment
hero_description: Pick a service, a branch and a free time, then confirm. It takes about two minutes.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---

<!-- Layout rules: a booking on one page, in the order booking sites use (what, where, when, who), with a live summary beside it.
     - One form in three groups, each an nds-block with a block title over a grid of fields. A flow with steps the user moves
       through is the Form Template's Stepper instead.
     - Each group shows once the one before it is done: Date and time after a service and a branch, Your details after a time.
       A hidden field is not checked, so the Book button shows only once a time is picked.
     - The service and the branch sit side by side. The service is an Autocomplete over a list loaded once (data-fetch="once"):
       a click shows every service (data-min-chars="0"), typing filters them, and only a pick counts (data-strict). The script
       keeps the picked item for its code and length. The branch is a Custom Select whose options give the address (nds-description).
     - The free times depend on the service, the branch and the day: ask the server after each change, with the date field in its loading state.
       The times are one Radio row (nds-horizontal) beside the day, in the branch's time zone, named in the date field's info; a taken time is a disabled radio.
     - Days that can't be booked are off in the calendar, and typed ones fail: closed weekdays in the markup (data-disabled-weekdays),
       fully booked days from the server for the service and branch (data-disabled-dates). A day that fills up after the pick clears and says why.
     - On a signed-in page, the name and the ID come from the account: show them as a Definition List, never as fields.
     - The summary is the side info column (nds-has-sideinfo), filled from the form's change events. It holds the Book button
       (form="book-form"). Without nds-top it sits under the form on a phone, so Book comes after the last field.
     - After a passing submit, a Status Section goes first on the page, with the booking number, Add to calendar and directions.
       The form gives way to what to bring; the summary stays, with the booking number, Change and Cancel.
     - Change brings the form back with the booking in it and keeps the booking number. Cancel asks first, in a Modal.
     - The script's two server calls (free times, booking) are demo fakes: their comments give the request and the answer. -->

<!-- Booked: the outcome, first on the page -->
<section id="book-done" class="nds-content-section nds-status-section" data-status="success" hidden>
    <div class="nds-section-wrapper">
        <div class="nds-section-icon">
            <span class="nds-feedback nds-ring">
                <span class="nds-feedback-icon">
                    <i class="nds-icon" aria-hidden="true"></i>
                </span>
            </span>
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title" tabindex="-1">Your appointment is booked</h2>
            <p class="nds-section-description" id="book-done-text">Your booking number is APT-2026-55120. We sent it to your mobile, and we remind you the day before.</p>
        </div>
        <div class="nds-section-action">
            <!-- Your server sends the .ics file; this demo builds it in the page -->
            <a href="#" id="book-ics" class="nds-btn nds-primary" download="appointment.ics">
                <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                <span class="nds-label">Add to calendar</span>
            </a>
            <a href="#" id="book-directions" class="nds-btn nds-secondary-outline" target="_blank" rel="noopener">
                <i class="hgi hgi-stroke hgi-directions-01" aria-hidden="true"></i>
                <span class="nds-label">Get directions</span>
            </a>
        </div>
    </div>
</section>

<!-- The booking: the form (then what to bring) in the main column, the summary in the side column -->
<section id="book-details" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <div id="book-start">
                <p class="nds-note nds-block" data-status="error"><span class="nds-label">*Required information</span></p>
                <!-- data-ajax: Forms checks every field and stops the POST; send the request from nds:form:valid -->
                <form id="book-form" class="nds-form" data-ajax>
                    <div class="nds-block">
                        <h2 class="nds-block-title">Service and branch</h2>
                        <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                            <!-- Autocomplete: data-min-chars="0" shows every service on a click or Down Arrow, and typing filters the list.
                                 The row template adds how long each takes under its name. data-strict accepts only a service picked from it -->
                            <div class="nds-form-container" id="book-service-field" data-url="../docs-assets/data/appointment-services.json" data-name="Title" data-fetch="once" data-min-chars="0" data-strict data-required data-empty-message="No matching services">
                                <div class="nds-form-header">
                                    <label for="book-service">
                                        <span class="nds-label">Service</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                    <input type="text" id="book-service" name="service" class="nds-input" autocomplete="on" placeholder="Choose or type a service">
                                    <div class="nds-form-action">
                                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <!-- Each row: data-field takes that field of the result, as text -->
                                <template class="nds-autocomplete-row">
                                    <span class="nds-label" data-field="Title"></span>
                                    <span class="nds-meta">
                                        <span class="nds-meta-item">
                                            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                            <span data-field="Duration"></span>
                                        </span>
                                    </span>
                                </template>
                            </div>
                            <!-- The field shows the branch name only; the address is the option's second line -->
                            <div class="nds-form-container nds-select" data-required>
                                <div class="nds-form-header">
                                    <label for="book-branch">
                                        <span class="nds-label">Branch</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="book-branch" class="nds-input nds-select-input" placeholder="Choose a branch" readonly>
                                    <input type="hidden" name="branch" class="nds-select-value">
                                    <div class="nds-select-dropdown" hidden>
                                        <div class="nds-select-options">
                                            <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="olaya">
                                                <span class="nds-option-text">
                                                    <span class="nds-label">Olaya, Riyadh</span>
                                                    <span class="nds-description">Olaya Street, near Kingdom Centre</span>
                                                </span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="malqa">
                                                <span class="nds-option-text">
                                                    <span class="nds-label">Al Malqa, Riyadh</span>
                                                    <span class="nds-description">King Fahd Road, Al Malqa</span>
                                                </span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="naseem">
                                                <span class="nds-option-text">
                                                    <span class="nds-label">Al Naseem, Riyadh</span>
                                                    <span class="nds-description">Hassan Bin Thabit Street, Al Naseem</span>
                                                </span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="diriyah">
                                                <span class="nds-option-text">
                                                    <span class="nds-label">Diriyah</span>
                                                    <span class="nds-description">King Abdulaziz Road, Diriyah</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Shown once a service and a branch are picked: they set which times are free -->
                    <div class="nds-block" id="book-when" hidden>
                        <h2 class="nds-block-title" id="book-when-title" tabindex="-1">Date and time</h2>
                        <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                            <!-- Bookable from today to 30 days ahead; .nds-date-value gives the script and the server one format -->
                            <div class="nds-form-container nds-date-picker" id="book-date-field" data-required>
                                <div class="nds-form-header">
                                    <label for="book-date">
                                        <span class="nds-label">Day</span>
                                        <span class="nds-info">Open Sunday to Thursday, 8 AM to 2 PM, Riyadh time</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-form-action">
                                        <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle nds-icon-only" aria-label="Open calendar" data-i18n-aria-label="date-picker.open_calendar">
                                            <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <input type="text" id="book-date" class="nds-input nds-date-input" placeholder="DD/MM/YYYY" data-min-date="today" data-max-date="today+30" data-disabled-weekdays="fri sat">
                                    <input type="hidden" class="nds-date-value" name="date" data-date-format="YYYY-MM-DD" data-calendar="gregory">
                                </div>
                            </div>
                            <!-- The free times of the picked day: shown once the server answers; a taken time is disabled -->
                            <fieldset class="nds-form-group nds-radio-group nds-horizontal" id="book-time" data-required hidden>
                                <legend class="nds-label">Time</legend>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-0800"><span class="nds-label">8:00 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-0800" name="time" value="08:00" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-0830"><span class="nds-label">8:30 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-0830" name="time" value="08:30" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-0900"><span class="nds-label">9:00 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-0900" name="time" value="09:00" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-0930"><span class="nds-label">9:30 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-0930" name="time" value="09:30" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1000"><span class="nds-label">10:00 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1000" name="time" value="10:00" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1030"><span class="nds-label">10:30 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1030" name="time" value="10:30" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1100"><span class="nds-label">11:00 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1100" name="time" value="11:00" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1130"><span class="nds-label">11:30 AM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1130" name="time" value="11:30" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1200"><span class="nds-label">12:00 PM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1200" name="time" value="12:00" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1230"><span class="nds-label">12:30 PM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1230" name="time" value="12:30" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1300"><span class="nds-label">1:00 PM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1300" name="time" value="13:00" class="nds-radio-input"></div>
                                </div>
                                <div class="nds-form-container nds-radio">
                                    <div class="nds-form-header"><label for="book-time-1330"><span class="nds-label">1:30 PM</span></label></div>
                                    <div class="nds-form-control"><input type="radio" id="book-time-1330" name="time" value="13:30" class="nds-radio-input"></div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <!-- Shown once a time is picked. A guest booking asks who is coming; a signed-in page shows these from the account instead, as a Definition List -->
                    <div class="nds-block" id="book-who" hidden>
                        <h2 class="nds-block-title">Your details</h2>
                        <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                            <div class="nds-form-container" data-required>
                                <div class="nds-form-header">
                                    <label for="book-name">
                                        <span class="nds-label">Full name</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="book-name" name="name" class="nds-input" placeholder="Enter your full name" autocomplete="name">
                                    <div class="nds-form-action">
                                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-form-container nds-national-id" data-required>
                                <div class="nds-form-header">
                                    <label for="book-national-id">
                                        <span class="nds-label">National ID or Iqama number</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="book-national-id" name="national-id" class="nds-input" placeholder="1XXXXXXXXX" inputmode="numeric" maxlength="10" autocomplete="off">
                                    <div class="nds-form-action">
                                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-form-container nds-phone" data-required data-format="00 000 0000">
                                <div class="nds-form-header">
                                    <label for="book-phone">
                                        <span class="nds-label">Mobile number</span>
                                        <span class="nds-info">We text you the booking, and a reminder the day before</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-form-action nds-prefix">
                                        <span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span>
                                        <input type="hidden" name="country-code" value="+966">
                                    </div>
                                    <input type="tel" id="book-phone" name="phone" class="nds-input" placeholder="5X XXX XXXX" autocomplete="tel-national" inputmode="numeric">
                                    <div class="nds-form-action">
                                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-form-container nds-textarea">
                                <div class="nds-form-header">
                                    <label for="book-note">
                                        <span class="nds-label">Note for the staff</span>
                                        <span class="nds-info">Such as a wheelchair or a sign language interpreter</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <textarea id="book-note" name="note" class="nds-textarea" placeholder="Write your note" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Booked: what the user needs on the day, in place of the form -->
            <div id="book-next" class="nds-block" hidden>
                <h2 class="nds-block-title">Before you come</h2>
                <div class="nds-prose">
                    <ul>
                        <li>Bring your original national ID or Iqama. A photo or a copy is not accepted.</li>
                        <li>Come 10 minutes early, and show your booking number at the front desk.</li>
                        <li>If you are more than 15 minutes late, the time goes to the next person.</li>
                        <li>If you cannot come, change or cancel the appointment here.</li>
                    </ul>
                </div>
            </div>
        </div>

        <aside class="nds-sideinfo nds-sticky" aria-label="Your appointment">
            <!-- Each dd fills in from the form; data-summary names the field it shows -->
            <div class="nds-card nds-stroke nds-shadow">
                <div class="nds-sideinfo-group">
                    <span class="nds-sideinfo-title">Your appointment</span>
                    <dl class="nds-definition-list">
                        <!-- Shown once the booking is made, and kept while the user changes it -->
                        <div class="nds-definition-item" id="book-ref-row" hidden>
                            <dt>
                                <i class="hgi hgi-stroke hgi-ticket-01" aria-hidden="true"></i>
                                <span class="nds-label">Booking number</span>
                            </dt>
                            <dd id="book-ref"></dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt>
                                <i class="hgi hgi-stroke hgi-briefcase-02" aria-hidden="true"></i>
                                <span class="nds-label">Service</span>
                            </dt>
                            <dd data-summary="service">Not chosen yet</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt>
                                <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
                                <span class="nds-label">Branch</span>
                            </dt>
                            <dd data-summary="branch">Not chosen yet</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt>
                                <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                <span class="nds-label">Day</span>
                            </dt>
                            <dd data-summary="date">Not chosen yet</dd>
                        </div>
                        <div class="nds-definition-item">
                            <dt>
                                <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
                                <span class="nds-label">Time</span>
                            </dt>
                            <dd data-summary="time">Not chosen yet</dd>
                        </div>
                    </dl>
                    <p id="book-hint">Pick a time to book.</p>
                </div>
                <!-- form= ties the button to the form from outside it; Enter in a field presses it too -->
                <div class="nds-card-actions" id="book-submit" hidden>
                    <button type="submit" form="book-form" class="nds-btn nds-primary">
                        <span class="nds-label">Book appointment</span>
                    </button>
                </div>
                <div class="nds-card-actions" id="book-manage" hidden>
                    <button type="button" id="book-change" class="nds-btn nds-secondary-outline nds-md">
                        <i class="nds-icon nds-hgi-edit-02" aria-hidden="true"></i>
                        <span class="nds-label">Change</span>
                    </button>
                    <button type="button" class="nds-btn nds-subtle nds-md" data-modal-target="cancel-modal">
                        <span class="nds-label">Cancel appointment</span>
                    </button>
                </div>
            </div>
        </aside>
    </div>
</section>

<!-- Cancel asks first: it frees the time for someone else -->
<dialog id="cancel-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="cancel-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle" data-status="error">
                <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="cancel-modal-title">Cancel the appointment?</span>
            <p class="nds-card-description">The time goes back on the list for others. You can book again at any time.</p>
        </div>
    </div>
    <div class="nds-card-actions">
        <button type="button" id="cancel-confirm" class="nds-btn nds-primary nds-destructive nds-lg" data-modal-close>
            <span class="nds-label">Cancel appointment</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
            <span class="nds-label">Keep it</span>
        </button>
    </div>
</dialog>

<script>
  function initPage() {
    var form = document.getElementById('book-form');
    var dateField = document.getElementById('book-date-field');
    var dateInput = document.getElementById('book-date');
    var dateValue = dateField.querySelector('.nds-date-value');
    var times = document.getElementById('book-time');
    var timeInputs = times.querySelectorAll('input');
    var serviceField = document.getElementById('book-service-field');
    var serviceInput = document.getElementById('book-service');
    var branchInput = document.getElementById('book-branch');
    var whenBlock = document.getElementById('book-when');
    var whoBlock = document.getElementById('book-who');
    var lang = document.documentElement.lang;
    var NOT_CHOSEN = 'Not chosen yet';
    // The service picked from the list, { Code, Title, Minutes }: typed text is not a pick
    var service = null;
    // The booking number once the server gives one; a change keeps it
    var bookingRef = '';
    // 'new', 'booked' or 'change': see showView()
    var view = 'new';

    // Your server, in three calls. Demo only: each answers from the page after a short wait.
    // GET /appointments/full-days?service=renew-id&branch=olaya → ['2026-11-07', '2026-11-17']: fully booked on the 7th, 17th and 27th
    function fetchFullDays(service, branch) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var days = [], day = new Date();
          var pad = function (n) { return String(n).padStart(2, '0'); };
          for (var i = 0; i <= 31; i++, day.setDate(day.getDate() + 1)) {
            if (day.getDate() % 10 === 7) days.push(day.getFullYear() + '-' + pad(day.getMonth() + 1) + '-' + pad(day.getDate()));
          }
          resolve(days);
        }, 300);
      });
    }
    // GET /appointments/times?service=renew-id&branch=olaya&date=2026-11-01 → { free: ['08:00', '09:30'] }: a mix of free times
    function fetchTimes(service, branch, iso) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var day = new Date(iso + 'T00:00');
          var seed = day.getDate() + branch.length + service.length;
          var free = Array.prototype.map.call(timeInputs, function (input) { return input.value; })
            .filter(function (time, i) { return (seed + i * 3) % 4 !== 0; });
          resolve({ free: free });
        }, 600);
      });
    }
    // POST /appointments with the form's fields, and ref when the user changes a booking → { ref: 'APT-2026-55120' }
    function sendBooking(fields, ref) {
      return new Promise(function (resolve) {
        setTimeout(function () { resolve({ ref: ref || 'APT-2026-55120' }); }, 1200);
      });
    }

    var checkedLabel = function (name) {
      var input = form.querySelector('input[name="' + name + '"]:checked');
      return input ? input.closest('.nds-form-container').querySelector('.nds-label').textContent : '';
    };
    var dayLabel = function (iso) {
      return new Date(iso + 'T00:00').toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };
    var branchAddress = function () {
      var option = form.querySelector('.nds-select-option[data-value="' + form.elements.branch.value + '"]');
      return option.querySelector('.nds-label').textContent + ', ' + option.querySelector('.nds-description').textContent;
    };

    // The summary: every field fires a bubbling change, so one listener fills it, and shows the next group
    function showSummary() {
      var values = {
        service: service ? service.Title + ', about ' + service.Minutes + ' minutes' : '',
        branch: branchInput.value,
        date: dateValue.value && dayLabel(dateValue.value),
        time: checkedLabel('time')
      };
      Object.keys(values).forEach(function (key) {
        document.querySelector('[data-summary="' + key + '"]').textContent = values[key] || NOT_CHOSEN;
      });
      whenBlock.hidden = !(values.service && values.branch);
      // Your details stay once shown, so a new time keeps what the user typed
      if (values.time) whoBlock.hidden = false;
      // A hidden field is not checked: no Book button until there is a time to check
      document.getElementById('book-submit').hidden = !values.time || view === 'booked';
      document.getElementById('book-hint').hidden = !!values.time || view === 'booked';
      return values;
    }

    // Three views: a new booking, a booking made, and a booking the user is changing
    function showView(next) {
      view = next;
      var booked = view === 'booked';
      document.getElementById('book-done').hidden = !booked;
      document.getElementById('book-next').hidden = !booked;
      document.getElementById('book-manage').hidden = !booked;
      document.getElementById('book-start').hidden = booked;
      document.getElementById('book-ref-row').hidden = view === 'new';
      showSummary();
    }

    // Each new service, branch or day asks the server again; the date field shows the wait
    var request = 0;
    function loadTimes() {
      times.hidden = true;
      timeInputs.forEach(function (input) { input.checked = false; });
      // Counted first: an answer for a day the user since cleared is dropped too
      var asked = ++request;
      // No time now, so no Book button while the server answers
      showSummary();
      if (!service || !form.elements.branch.value || !dateValue.value) return;
      NDS.state.add(dateField, 'loading');
      fetchTimes(service.Code, form.elements.branch.value, dateValue.value).then(function (answer) {
        if (asked !== request) return;
        NDS.state.remove(dateField, 'loading');
        if (!answer.free.length) {
          // Filled up since the full days were read: clear the day, so the form asks for another one
          dateInput.value = '';
          // change, as a pick sends it: the picker empties .nds-date-value too
          dateInput.dispatchEvent(new Event('change', { bubbles: true }));
          NDS.Form.setStatus(dateField, 'error', {
            message: 'This day is fully booked. Pick another day.'
          });
        } else {
          timeInputs.forEach(function (input) { input.disabled = answer.free.indexOf(input.value) === -1; });
          NDS.Form.refresh(times);
          times.hidden = false;
        }
        showSummary();
      });
    }

    // Fully booked days turn off in the calendar: the picker follows data-disabled-dates as it changes
    function loadFullDays() {
      if (!service || !form.elements.branch.value) return dateInput.removeAttribute('data-disabled-dates');
      fetchFullDays(service.Code, form.elements.branch.value).then(function (days) {
        dateInput.setAttribute('data-disabled-dates', days.join(', '));
      });
    }

    form.addEventListener('change', function (e) {
      if (e.target === form.elements.branch) loadFullDays();
      if (e.target === dateValue || e.target === form.elements.branch) loadTimes();
      else showSummary();
    });

    // A pick from the list sets the service; typing over it, or the clear button, drops it
    serviceField.addEventListener('nds:autocomplete:select', function (e) {
      service = e.detail.item;
      loadFullDays();
      loadTimes();
    });
    serviceInput.addEventListener('input', function () {
      if (service && serviceInput.value.trim() !== service.Title) {
        service = null;
        loadFullDays();
        loadTimes();
      }
    });

    // Your server sends the .ics file; this demo builds one. Riyadh has no daylight saving, so +03:00 always holds.
    function calendarFile(ref) {
      var start = new Date(dateValue.value + 'T' + form.elements.time.value + ':00+03:00');
      var stamp = function (date) { return date.toISOString().replace(/[-:]|\.\d+/g, ''); };
      var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NDS//Booking//EN', 'BEGIN:VEVENT', 'UID:' + ref + '@example.gov.sa',
        'DTSTAMP:' + stamp(new Date()), 'DTSTART:' + stamp(start), 'DURATION:PT' + service.Minutes + 'M',
        'SUMMARY:' + service.Title, 'LOCATION:' + branchAddress(), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      return URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    }

    // Book: the form waits on the request, then the outcome goes first on the page
    form.addEventListener('nds:form:valid', function (e) {
      // The field holds the service's name; the server takes its code
      var fields = new FormData(form);
      fields.set('service', service.Code);
      e.detail.waitUntil(sendBooking(fields, bookingRef).then(function (answer) {
        bookingRef = answer.ref;
        document.getElementById('book-ref').textContent = answer.ref;
        document.getElementById('book-done-text').textContent = 'Your booking number is ' + answer.ref +
          '. We sent it to +966 ' + form.elements.phone.value + ', and we remind you the day before.';
        document.getElementById('book-ics').href = calendarFile(answer.ref);
        document.getElementById('book-directions').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(branchAddress());
        showView('booked');
        document.querySelector('#book-done .nds-section-title').focus();
      }));
    });

    // Change: the form comes back with the booking in it; the time is picked again
    document.getElementById('book-change').addEventListener('click', function () {
      showView('change');
      loadTimes();
      document.getElementById('book-when-title').focus();
    });

    // Cancel: after the request, back to an empty form
    document.getElementById('cancel-confirm').addEventListener('click', function () {
      bookingRef = '';
      service = null;
      form.reset();
      whoBlock.hidden = true;
      loadTimes();
      showView('new');
      NDS.Alert.create({ variant: 'info', title: 'Appointment cancelled', description: 'The time is free again. You can book a new one below.', display: 'toast', duration: 4000 });
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
