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

<!-- Layout rules: a booking on one page, with a live summary beside it.
     - One form in three groups, each an nds-block with a block title over a grid of fields. A flow with steps the
       user moves through is the Form Template's Stepper instead.
     - The free times depend on the day and the branch: ask the server after each change, with the date field in
       its loading state. The times are a Radio row; a taken time is a disabled radio.
     - A day with no free times (closed or full) clears the date and says why, so the form cannot be sent without a time.
     - The summary is the side info column (nds-has-sideinfo). It fills in from the form's change events.
     - After a passing submit, a Status Section replaces the form, first on the page. Cancel asks first, in a Modal. -->

<!-- Booked: the outcome, shown in place of the form -->
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
            <p class="nds-section-description" id="book-done-text">Your booking number is APT-2026-55120. Bring your national ID.</p>
        </div>
        <div class="nds-section-action">
            <!-- Your server sends the .ics file; this demo builds it in the page -->
            <a href="#" id="book-ics" class="nds-btn nds-primary" download="appointment.ics">
                <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                <span class="nds-label">Add to calendar</span>
            </a>
            <button type="button" class="nds-btn nds-secondary-outline" data-modal-target="cancel-modal">
                <span class="nds-label">Cancel appointment</span>
            </button>
        </div>
    </div>
</section>

<!-- The booking: the form in the main column, the summary in the side column -->
<section id="book-details" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <p class="nds-note nds-block" data-status="error"><span class="nds-label">*Required information</span></p>
            <!-- data-ajax: Forms checks every field and stops the POST; send the request from nds:form:valid -->
            <form id="book-form" class="nds-form" data-ajax>
                <div class="nds-block">
                    <h2 class="nds-block-title">Service and branch</h2>
                    <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                        <fieldset class="nds-form-group nds-radio-group" data-required>
                            <legend class="nds-label">Service</legend>
                            <div class="nds-form-container nds-radio">
                                <div class="nds-form-header">
                                    <label for="book-service-id">
                                        <span class="nds-label">Renew a national ID</span>
                                        <span class="nds-info">About 15 minutes</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="radio" id="book-service-id" name="service" value="renew-id" class="nds-radio-input">
                                </div>
                            </div>
                            <div class="nds-form-container nds-radio">
                                <div class="nds-form-header">
                                    <label for="book-service-family">
                                        <span class="nds-label">Issue a family record</span>
                                        <span class="nds-info">About 30 minutes</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="radio" id="book-service-family" name="service" value="family-record" class="nds-radio-input">
                                </div>
                            </div>
                            <div class="nds-form-container nds-radio">
                                <div class="nds-form-header">
                                    <label for="book-service-update">
                                        <span class="nds-label">Update personal details</span>
                                        <span class="nds-info">About 15 minutes</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="radio" id="book-service-update" name="service" value="update-details" class="nds-radio-input">
                                </div>
                            </div>
                        </fieldset>
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
                                            </span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="malqa">
                                            <span class="nds-option-text">
                                                <span class="nds-label">Al Malqa, Riyadh</span>
                                            </span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="naseem">
                                            <span class="nds-option-text">
                                                <span class="nds-label">Al Naseem, Riyadh</span>
                                            </span>
                                        </button>
                                        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="diriyah">
                                            <span class="nds-option-text">
                                                <span class="nds-label">Diriyah</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-block">
                    <h2 class="nds-block-title">Date and time</h2>
                    <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                        <!-- Bookable from today to 30 days ahead; .nds-date-value gives the script and the server one format -->
                        <div class="nds-form-container nds-date-picker" id="book-date-field" data-required>
                            <div class="nds-form-header">
                                <label for="book-date">
                                    <span class="nds-label">Day</span>
                                    <span class="nds-info">Open Sunday to Thursday</span>
                                </label>
                            </div>
                            <div class="nds-form-control">
                                <div class="nds-form-action">
                                    <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle nds-icon-only" aria-label="Open calendar" data-i18n-aria-label="date-picker.open_calendar">
                                        <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <input type="text" id="book-date" class="nds-input nds-date-input" placeholder="DD/MM/YYYY" data-min-date="today" data-max-date="today+30">
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
                        </fieldset>
                    </div>
                </div>

                <div class="nds-block">
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
                                    <span class="nds-info">We text you a reminder the day before</span>
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

                <div class="nds-form-actions">
                    <button type="submit" class="nds-btn nds-primary">
                        <span class="nds-label">Book appointment</span>
                    </button>
                </div>
            </form>
        </div>

        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="Your appointment">
            <!-- Each dd fills in from the form; data-summary names the field it shows -->
            <div class="nds-card nds-stroke nds-shadow">
                <div class="nds-sideinfo-group">
                    <span class="nds-sideinfo-title">Your appointment</span>
                    <dl class="nds-definition-list">
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
    var branchInput = document.getElementById('book-branch');
    var lang = document.documentElement.lang;
    var NOT_CHOSEN = 'Not chosen yet';

    var checkedLabel = function (name) {
      var input = form.querySelector('input[name="' + name + '"]:checked');
      return input ? input.closest('.nds-form-container').querySelector('.nds-label').textContent : '';
    };
    var dayLabel = function (iso) {
      return new Date(iso + 'T00:00').toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    // The summary: every field fires a bubbling change, so one listener fills it
    function showSummary() {
      var values = {
        service: checkedLabel('service'),
        branch: branchInput.value,
        date: dateValue.value && dayLabel(dateValue.value),
        time: checkedLabel('time')
      };
      Object.keys(values).forEach(function (key) {
        document.querySelector('[data-summary="' + key + '"]').textContent = values[key] || NOT_CHOSEN;
      });
      return values;
    }

    // Demo only: a fake server. Closed on Fridays and Saturdays, full on the 7th, 17th and 27th; the rest is a mix.
    function fetchTimes(iso, branch) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var day = new Date(iso + 'T00:00');
          if (day.getDay() === 5 || day.getDay() === 6) return resolve({ closed: true, free: [] });
          var seed = day.getDate() + branch.length;
          var free = Array.prototype.map.call(timeInputs, function (input) { return input.value; })
            .filter(function (time, i) { return day.getDate() % 10 !== 7 && (seed + i * 3) % 4 !== 0; });
          resolve({ closed: false, free: free });
        }, 600);
      });
    }

    // Each new day or branch asks the server again; the date field shows the wait
    var request = 0;
    function loadTimes() {
      times.hidden = true;
      timeInputs.forEach(function (input) { input.checked = false; });
      // Counted first: an answer for a day the user since cleared is dropped too
      var asked = ++request;
      if (!dateValue.value) return showSummary();
      NDS.state.add(dateField, 'loading');
      fetchTimes(dateValue.value, form.elements.branch.value).then(function (answer) {
        if (asked !== request) return;
        NDS.state.remove(dateField, 'loading');
        if (!answer.free.length) {
          // No time to pick: clear the day, so the form asks for another one
          dateInput.value = '';
          // change, as a pick sends it: the picker empties .nds-date-value too
          dateInput.dispatchEvent(new Event('change', { bubbles: true }));
          NDS.Form.setStatus(dateField, 'error', {
            message: answer.closed ? 'We are closed on Fridays and Saturdays. Pick another day.' : 'This day is fully booked. Pick another day.'
          });
        } else {
          timeInputs.forEach(function (input) { input.disabled = answer.free.indexOf(input.value) === -1; });
          NDS.Form.refresh(times);
          times.hidden = false;
        }
        showSummary();
      });
    }

    form.addEventListener('change', function (e) {
      if (e.target === dateValue || e.target === form.elements.branch) loadTimes();
      else showSummary();
    });

    // Book: the form waits on the request, then the outcome replaces the form
    form.addEventListener('nds:form:valid', function (e) {
      var booking = showSummary();
      var time = form.querySelector('input[name="time"]:checked').value;
      e.detail.waitUntil(new Promise(function (resolve) { setTimeout(resolve, 1200); }).then(function () {
        var ref = 'APT-2026-55120';
        document.getElementById('book-done-text').textContent = booking.date + ' at ' + booking.time + ', ' + booking.branch +
          '. Your booking number is ' + ref + '. Bring your national ID.';
        // A 30-minute event in the visitor's own time zone
        var start = dateValue.value.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';
        var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NDS//Booking//EN', 'BEGIN:VEVENT', 'UID:' + ref + '@example.gov.sa',
          'DTSTAMP:' + new Date().toISOString().replace(/[-:]|\.\d+/g, ''), 'DTSTART:' + start, 'DURATION:PT30M',
          'SUMMARY:' + booking.service, 'LOCATION:' + booking.branch, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
        document.getElementById('book-ics').href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
        document.getElementById('book-details').hidden = true;
        var done = document.getElementById('book-done');
        done.hidden = false;
        done.querySelector('.nds-section-title').focus();
      }));
    });

    // Cancel: after the request, back to an empty form
    document.getElementById('cancel-confirm').addEventListener('click', function () {
      form.reset();
      loadTimes();
      document.getElementById('book-done').hidden = true;
      document.getElementById('book-details').hidden = false;
      NDS.Alert.create({ variant: 'info', title: 'Appointment cancelled', description: 'The time is free again. You can book a new one below.', display: 'toast', duration: 4000 });
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
