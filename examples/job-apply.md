---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: Job Apply
hero_title: Senior Data Analyst
hero_description: Ministry of Economy and Planning, Riyadh. Read about the role, then apply on this page.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
last_edit: "25/10/2026 - 05:46 PM"
---

<!-- Layout rules: one job post, with its application on the same page.
     - The job's facts are the side info column (nds-has-sideinfo); the hero's Share shares the post, so the card has none.
     - The main column stacks its parts with nds-block: the role in prose, then the form. One long form is split into
       groups, each an nds-block with a block title over a grid of fields. A flow with steps the user moves through is
       the Form Template's Stepper instead.
     - Pick each field by the kind of answer, as each field's own page says:
       one choice from a few options, all visible: Radio. One choice from a longer list: Custom Select.
       Several choices from a fixed list: Multiselect. Free values the user types: Tag Input.
       A rough range: a range Slider. An exact number: a number field. A day: Date Picker.
       Formatted text: Editor. Plain text: Textarea. A file: Upload. An agreement: one Checkbox.
     - After a passing submit, a Status Section replaces the page content, first on the page. -->

<!-- Sent: the outcome, shown in place of the job and the form -->
<section id="job-applied" class="nds-content-section nds-status-section" data-status="success" hidden>
    <div class="nds-section-wrapper">
        <div class="nds-section-icon">
            <span class="nds-feedback nds-ring">
                <span class="nds-feedback-icon">
                    <i class="nds-icon" aria-hidden="true"></i>
                </span>
            </span>
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title" tabindex="-1">Application sent</h2>
            <p class="nds-section-description">Your reference is JOB-2026-40917. We email you when the review ends, usually within 15 working days.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="nds-label">My applications</span>
            </a>
            <a href="#" class="nds-btn nds-secondary-outline">
                <span class="nds-label">More jobs</span>
            </a>
        </div>
    </div>
</section>

<!-- The job and the application: the role and the form in the main column, the facts in the side column -->
<section id="job-details" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <div class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">About the role</h2>
                </div>
                <div class="nds-section-body nds-prose">
                    <p>Join the team that turns national economic data into reports the public and decision makers use every week. You will own the data behind three national dashboards.</p>
                    <h3>What you will do</h3>
                    <ul>
                        <li>Clean, join and check data from more than 20 government sources.</li>
                        <li>Build and maintain dashboards in Power BI.</li>
                        <li>Write short, plain-language notes on what the numbers show.</li>
                    </ul>
                    <h3>What you need</h3>
                    <ul>
                        <li>A bachelor's degree in statistics, economics, computer science or a related field.</li>
                        <li>At least 5 years of work with data, including SQL.</li>
                        <li>Clear written Arabic and English.</li>
                    </ul>
                </div>
            </div>

            <div id="apply" class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">Apply for this job</h2>
                    <p class="nds-note" data-status="error"><span class="nds-label">*Required information</span></p>
                </div>
                <div class="nds-section-body">
                    <!-- data-ajax: Forms checks every field and stops the POST; send the request from nds:form:valid -->
                    <form id="job-form" class="nds-form" data-ajax>
                        <div class="nds-block">
                            <h3 class="nds-block-title">About you</h3>
                            <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                                <div class="nds-form-container" data-required>
                                    <div class="nds-form-header">
                                        <label for="job-name">
                                            <span class="nds-label">Full name</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="text" id="job-name" name="name" class="nds-input" placeholder="Enter your full name" autocomplete="name">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container" data-required>
                                    <div class="nds-form-header">
                                        <label for="job-email">
                                            <span class="nds-label">Email address</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                                        <input type="email" id="job-email" name="email" class="nds-input" placeholder="name@example.com" autocomplete="email">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear email" hidden>
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container nds-formatted nds-phone" data-required data-format="00 000 0000">
                                    <div class="nds-form-header">
                                        <label for="job-phone">
                                            <span class="nds-label">Mobile number</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-form-action nds-prefix">
                                            <span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span>
                                            <input type="hidden" name="country-code" value="+966">
                                        </div>
                                        <input type="tel" id="job-phone" name="phone" class="nds-input" placeholder="5X XXX XXXX" autocomplete="tel-national" inputmode="numeric">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- A day: Date Picker; data-min-date="today": a start date is never in the past -->
                                <div class="nds-form-container nds-date-picker" data-required>
                                    <div class="nds-form-header">
                                        <label for="job-start">
                                            <span class="nds-label">Available from</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-form-action">
                                            <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle nds-icon-only" aria-label="Open calendar" data-i18n-aria-label="date-picker.open_calendar">
                                                <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        <input type="text" id="job-start" name="start-date" class="nds-input nds-date-input" placeholder="DD/MM/YYYY" data-min-date="today">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="nds-block">
                            <h3 class="nds-block-title">Your experience</h3>
                            <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                                <!-- One choice from a longer list: Custom Select -->
                                <div class="nds-form-container nds-select" data-required>
                                    <div class="nds-form-header">
                                        <label for="job-degree">
                                            <span class="nds-label">Highest degree</span>
                                            <span class="nds-info">Your last completed degree</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="text" id="job-degree" class="nds-input nds-select-input" placeholder="Choose a degree" readonly>
                                        <input type="hidden" name="degree" class="nds-select-value">
                                        <div class="nds-select-dropdown" hidden>
                                            <div class="nds-select-options">
                                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="diploma">
                                                    <span class="nds-option-text">
                                                        <span class="nds-label">Diploma</span>
                                                    </span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="bachelor">
                                                    <span class="nds-option-text">
                                                        <span class="nds-label">Bachelor's degree</span>
                                                    </span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="master">
                                                    <span class="nds-option-text">
                                                        <span class="nds-label">Master's degree</span>
                                                    </span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="doctorate">
                                                    <span class="nds-option-text">
                                                        <span class="nds-label">Doctorate</span>
                                                    </span>
                                                </button>
                                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="other">
                                                    <span class="nds-option-text">
                                                        <span class="nds-label">Other</span>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- A rough range: a range Slider; Stacked, as a currency value is wide -->
                                <div class="nds-form-container nds-slider-container nds-slider-range nds-stacked">
                                    <div class="nds-form-header">
                                        <label>
                                            <span class="nds-label">Expected monthly salary</span>
                                            <span class="nds-info">Drag either thumb to set the lowest and highest amount</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <output class="nds-slider-value nds-slider-value-min nds-number-format" data-currency="SAR">18000</output>
                                        <div class="nds-slider-track">
                                            <input type="range" name="salary-min" class="nds-slider nds-slider-min" min="10000" max="50000" step="1000" value="18000" aria-label="Lowest salary">
                                            <input type="range" name="salary-max" class="nds-slider nds-slider-max" min="10000" max="50000" step="1000" value="28000" aria-label="Highest salary">
                                        </div>
                                        <output class="nds-slider-value nds-slider-value-max nds-number-format" data-currency="SAR">28000</output>
                                    </div>
                                </div>
                                <!-- Several choices from a fixed list: Multiselect -->
                                <div class="nds-form-container nds-multiselect" data-multiselect-name="skills" data-required>
                                    <div class="nds-form-header">
                                        <label>
                                            <span class="nds-label">Skills</span>
                                            <span class="nds-info">Pick all that apply</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                                            <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
                                                <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                                <span class="nds-label">Select</span>
                                            </button>
                                            <div class="nds-dropmenu-menu" hidden>
                                                <div class="nds-dropmenu-scroll">
                                                    <fieldset class="nds-form-group nds-checkbox-group nds-dropmenu-group" data-no-auto-close>
                                                        <legend class="nds-label">Languages</legend>
                                                        <div class="nds-form-container nds-checkbox">
                                                            <div class="nds-form-header">
                                                                <label for="job-skill-sql"><span class="nds-label">SQL</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="job-skill-sql" class="nds-checkbox-input" name="skills[]" value="sql" data-label="SQL">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-checkbox">
                                                            <div class="nds-form-header">
                                                                <label for="job-skill-python"><span class="nds-label">Python</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="job-skill-python" class="nds-checkbox-input" name="skills[]" value="python" data-label="Python">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-checkbox">
                                                            <div class="nds-form-header">
                                                                <label for="job-skill-r"><span class="nds-label">R</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="job-skill-r" class="nds-checkbox-input" name="skills[]" value="r" data-label="R">
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <hr class="nds-divider">
                                                    <fieldset class="nds-form-group nds-checkbox-group nds-dropmenu-group" data-no-auto-close>
                                                        <legend class="nds-label">Tools</legend>
                                                        <div class="nds-form-container nds-checkbox">
                                                            <div class="nds-form-header">
                                                                <label for="job-skill-powerbi"><span class="nds-label">Power BI</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="job-skill-powerbi" class="nds-checkbox-input" name="skills[]" value="power-bi" data-label="Power BI">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-checkbox">
                                                            <div class="nds-form-header">
                                                                <label for="job-skill-tableau"><span class="nds-label">Tableau</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="job-skill-tableau" class="nds-checkbox-input" name="skills[]" value="tableau" data-label="Tableau">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-checkbox">
                                                            <div class="nds-form-header">
                                                                <label for="job-skill-excel"><span class="nds-label">Excel</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="job-skill-excel" class="nds-checkbox-input" name="skills[]" value="excel" data-label="Excel">
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                                        <span class="nds-multiselect-placeholder">Select your skills</span>
                                    </div>
                                </div>
                                <!-- Free values the user types: Tag Input -->
                                <div class="nds-form-container nds-taginput" data-taginput-name="certifications">
                                    <div class="nds-form-header">
                                        <label for="job-certifications">
                                            <span class="nds-label">Certifications</span>
                                            <span class="nds-info">Type one, then press Enter</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="text" id="job-certifications" placeholder="Add a certification">
                                    </div>
                                </div>
                                <!-- One choice from a few options, all visible: Radio -->
                                <fieldset class="nds-form-group nds-radio-group" data-required>
                                    <legend class="nds-label">Work arrangement</legend>
                                    <div class="nds-form-container nds-radio">
                                        <div class="nds-form-header">
                                            <label for="job-work-site">
                                                <span class="nds-label">On site</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <input type="radio" id="job-work-site" name="arrangement" value="site" class="nds-radio-input">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-radio">
                                        <div class="nds-form-header">
                                            <label for="job-work-hybrid">
                                                <span class="nds-label">Hybrid</span>
                                                <span class="nds-info">Two days a week from home</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <input type="radio" id="job-work-hybrid" name="arrangement" value="hybrid" class="nds-radio-input">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-radio">
                                        <div class="nds-form-header">
                                            <label for="job-work-remote">
                                                <span class="nds-label">Remote</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <input type="radio" id="job-work-remote" name="arrangement" value="remote" class="nds-radio-input">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                        <div class="nds-block">
                            <h3 class="nds-block-title">Your application</h3>
                            <div class="nds-grid" style="--min-col: 1; --max-col: 1; --gap: var(--spacing-4xl);">
                                <!-- Formatted text: Editor, with a short toolbar for a letter; the full set is for page content -->
                                <div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | ul ol">
                                    <div class="nds-form-header">
                                        <label for="job-letter"><span class="nds-label">Cover letter</span></label>
                                    </div>
                                    <div class="nds-form-control">
                                        <textarea class="nds-textarea" name="cover-letter" id="job-letter" placeholder="Tell us why you want this role"></textarea>
                                    </div>
                                </div>
                                <!-- A file that goes with the form: Upload with no data-upload-url; single keeps one CV -->
                                <div class="nds-form-container nds-upload" id="job-cv-upload" data-state="dropbox single" data-required data-max-file-size="5242880" data-allowed-types="pdf">
                                    <div class="nds-form-header">
                                        <label for="job-cv">
                                            <span class="nds-label">CV</span>
                                            <span class="nds-info">One PDF, up to 5 MB</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="file" id="job-cv" class="nds-file-input">
                                        <div class="nds-upload-zone">
                                            <i class="hgi hgi-stroke hgi-file-upload nds-upload-icon" aria-hidden="true"></i>
                                            <div class="nds-upload-text">
                                                <span class="nds-drop-hint" data-i18n="upload.drag_drop">Drag and drop files here to upload</span>
                                            </div>
                                            <div class="nds-upload-hint">One PDF, up to 5 MB</div>
                                        </div>
                                        <div class="nds-form-action">
                                            <button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn">
                                                <i class="hgi hgi-stroke hgi-folder-01" aria-hidden="true"></i>
                                                <span class="nds-label" data-i18n="upload.browse_files">Browse Files</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="nds-file-list" aria-live="polite"></div>
                                </div>
                                <!-- An agreement: one Checkbox -->
                                <div class="nds-form-container nds-checkbox" data-required>
                                    <div class="nds-form-header" data-feedback-target>
                                        <label for="job-consent">
                                            <span class="nds-label">The information I gave is correct</span>
                                            <span class="nds-info">A wrong answer can end the application</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="checkbox" id="job-consent" name="consent" value="accepted" class="nds-checkbox-input">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="nds-form-actions">
                            <button type="submit" class="nds-btn nds-primary">
                                <span class="nds-label">Send application</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="Job facts">
            <div class="nds-card nds-stroke nds-shadow">
                <dl class="nds-definition-list">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
                            <span class="nds-label">Location</span>
                        </dt>
                        <dd>Riyadh, on site or hybrid</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-briefcase-02" aria-hidden="true"></i>
                            <span class="nds-label">Contract</span>
                        </dt>
                        <dd>Full time, permanent</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-money-bag-02" aria-hidden="true"></i>
                            <span class="nds-label">Salary</span>
                        </dt>
                        <dd>SAR 18,000 to 26,000 a month</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
                            <span class="nds-label">Reference</span>
                        </dt>
                        <dd>MEP-DA-2026-14</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-hourglass" aria-hidden="true"></i>
                            <span class="nds-label">Closes</span>
                        </dt>
                        <!-- At zero, the sentence says so, and data-countdown-hide removes the way to apply -->
                        <dd><span class="nds-countdown" data-countdown="2026-11-15T23:59" data-countdown-hide="job-apply-link apply">
                            In <span class="nds-countdown-value" data-unit="d">--</span> days and <span class="nds-countdown-value" data-unit="h">--</span> hours, on 15 November 2026.
                            <span class="nds-countdown-ended">Applications closed on 15 November 2026.</span>
                        </span></dd>
                    </div>
                </dl>
                <div class="nds-card-actions">
                    <a href="#apply" id="job-apply-link" class="nds-btn nds-primary nds-full">
                        <span class="nds-label">Apply now</span>
                    </a>
                </div>
            </div>
        </aside>
    </div>
</section>

<script>
  function initPage() {
    // Send: the form waits on the request, then the outcome replaces the page content
    document.getElementById('job-form').addEventListener('nds:form:valid', function (e) {
      // Your request: the form fields, plus the CV from NDS.Upload's getAllFiles(), as the Upload page shows
      e.detail.waitUntil(new Promise(function (resolve) { setTimeout(resolve, 1200); }).then(function () {
        document.getElementById('job-details').hidden = true;
        var applied = document.getElementById('job-applied');
        applied.hidden = false;
        applied.querySelector('.nds-section-title').focus();
      }));
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
