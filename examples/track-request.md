---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
layout_class: nds-has-sideinfo
title: Track My Request
hero_title: Request 2026-118204
hero_description: Renew a commercial license. See where your request is, and what you need to do next.
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
# A request page is private: no Share. The page closes with the service rating strip, after the last edit line; the demo script shows it once the request has an answer.
feedback_type: rating
# Demo only: the "State" select in the hero previews the four states, with the script at the end of the page.
# Delete both in production; the server renders one state.
hero_float_actions:
  class: nds-minimal
  items:
    - html: >-
        <!-- Demo only: previews the four states. Delete in production, with the demo script at the end of the page. -->
        <div class="nds-form-container nds-select nds-md">
        <div class="nds-form-header"><label for="request-state-demo"><span class="nds-label">State</span></label></div>
        <div class="nds-form-control"><select id="request-state-demo" class="nds-input">
        <option value="action" selected>Action needed</option>
        <option value="review">In review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        </select></div>
        </div>
last_edit: "25/10/2026 - 04:48 PM"
---

<!-- Layout rules: one request the user already sent.
     - Its history is a Timeline (a vertical dot Stepper, newest on top). A flow the user is filling in is a Stepper; dated items with no order are Drawer rows.
     - The user must act: a warning Alert at the top of the main column, with the action right under it (here an Upload and Send). Never send them to another page to do it.
     - No action needed: an info Alert that says what happens next and when.
     - A final answer: a Status Section with data-status (success or error), first on the page, above the history. The history stays.
     - A finished service: the User Feedback rating closes the page, after the last edit line (feedback_type: rating).
     - The summary is the side info column (nds-has-sideinfo), and Print prints it alone (data-print-target).
     - A signed-in page runs NDS.SessionTimeout.init() (see the script at the end). -->

<!-- Approved: the outcome, first on the page -->
<section id="request-approved" class="nds-content-section nds-status-section" data-status="success" hidden>
    <div class="nds-section-wrapper">
        <div class="nds-section-icon">
            <span class="nds-feedback nds-ring">
                <span class="nds-feedback-icon">
                    <i class="nds-icon" aria-hidden="true"></i>
                </span>
            </span>
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title">Your license is renewed</h2>
            <p class="nds-section-description">Commercial license 1010-445566 is valid until 26 October 2027. We emailed you a copy.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                <span class="nds-label">Download license</span>
            </a>
            <a href="#" class="nds-btn nds-secondary-outline">
                <span class="nds-label">My requests</span>
            </a>
        </div>
    </div>
</section>

<!-- Rejected: the outcome, first on the page, with the reason and the way forward -->
<section id="request-rejected" class="nds-content-section nds-status-section" data-status="error" hidden>
    <div class="nds-section-wrapper">
        <div class="nds-section-icon">
            <span class="nds-feedback nds-ring">
                <span class="nds-feedback-icon">
                    <i class="nds-icon" aria-hidden="true"></i>
                </span>
            </span>
        </div>
        <div class="nds-section-head">
            <h2 class="nds-section-title">Your request was not approved</h2>
            <p class="nds-section-description">The national ID does not match the owner in the commercial register. Apply again with the owner's national ID.</p>
        </div>
        <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary">
                <span class="nds-label">Apply again</span>
            </a>
            <a href="#" class="nds-btn nds-secondary-outline">
                <span class="nds-label">Contact support</span>
            </a>
        </div>
    </div>
</section>

<!-- Details: what to do now and the history in the main column, the summary in the side column -->
<section id="request-details" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <div class="nds-info-content">
            <!-- Action needed: the Alert says what and by when; the action sits right under it -->
            <div id="request-action" class="nds-block">
                <!-- No close button: the request waits on this -->
                <div class="nds-alert nds-card nds-block" data-status="warning" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Upload a clearer copy of your national ID</span>
                            <p class="nds-alert-description">The copy you sent is hard to read. Send a new one by 1 November 2026, or the request closes.</p>
                        </div>
                    </div>
                </div>
                <form id="request-upload" class="nds-form" data-ajax>
                    <!-- Upload as you go: the file goes to data-upload-url as soon as it is picked, and Send waits until it is done -->
                    <div class="nds-form-container nds-upload" id="request-id-upload" data-state="dropbox" data-required data-max-file-size="2097152" data-allowed-types="jpg,jpeg,png,pdf" data-upload-url="/requests/2026-118204/documents" data-auto-upload="true">
                        <div class="nds-form-header">
                            <label for="request-id-copy">
                                <span class="nds-label">National ID copy</span>
                                <span class="nds-info">Up to 2 MB, in JPG, PNG or PDF</span>
                            </label>
                        </div>
                        <div class="nds-form-control">
                            <input type="file" id="request-id-copy" name="id-copy" class="nds-file-input">
                            <div class="nds-upload-zone">
                                <i class="hgi hgi-stroke hgi-file-upload nds-upload-icon" aria-hidden="true"></i>
                                <div class="nds-upload-text">
                                    <span class="nds-drop-hint" data-i18n="upload.drag_drop">Drag and drop files here to upload</span>
                                </div>
                                <div class="nds-upload-hint">Up to 2 MB, in JPG, PNG or PDF</div>
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
                    <div class="nds-form-actions">
                        <button type="submit" class="nds-btn nds-primary">
                            <span class="nds-label">Send</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- In review: nothing to do; say what happens next and when -->
            <div id="request-review" class="nds-alert nds-card nds-block" data-status="info" hidden>
                <span class="nds-feedback nds-alert-icon nds-outline">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">We are reviewing your request</span>
                        <p class="nds-alert-description">A decision usually takes up to 5 working days. We email you when it is ready.</p>
                    </div>
                </div>
            </div>

            <div class="nds-section-wrapper nds-block">
                <div class="nds-section-head">
                    <h2 class="nds-section-title">Request history</h2>
                </div>
                <div class="nds-section-body">
                    <!-- Written oldest first; nds-reverse shows the newest on top. data-current is the step in progress, and one past the last shows them all done.
                         The page script sets it, and the Decision step's text, per state; your server writes them. -->
                    <div class="nds-stepper nds-vertical nds-dot nds-reverse" id="request-timeline" data-current="3">
                        <div class="nds-stepper-step">
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-divider">18 October 2026</div>
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">Request submitted</span>
                                    <span class="nds-stepper-description">Reference 2026-118204</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-stepper-step">
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-divider">19 October 2026</div>
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">Under review</span>
                                    <span class="nds-stepper-description">Commercial licensing department</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-stepper-step">
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-divider">21 October 2026</div>
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">Changes requested</span>
                                    <span class="nds-stepper-description">Upload a clearer copy of the national ID</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-stepper-step" id="request-step-updated" hidden>
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-divider">25 October 2026</div>
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">Documents updated</span>
                                    <span class="nds-stepper-description">A new copy of the national ID was sent</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-stepper-step" id="request-step-decision">
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-divider">Pending</div>
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">Decision</span>
                                    <span class="nds-stepper-description">Up to 5 working days</span>
                                </div>
                            </div>
                        </div>
                        <div class="nds-stepper-step" id="request-step-issued">
                            <div class="nds-stepper-base">
                                <div class="nds-stepper-circle"></div>
                            </div>
                            <div class="nds-stepper-content">
                                <div class="nds-divider">Next</div>
                                <div class="nds-stepper-text">
                                    <span class="nds-stepper-title">License issued</span>
                                    <span class="nds-stepper-description">Sent to your email after approval</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="Request summary">
            <!-- A direct child card takes the side column's look. Print prints the card alone; data-hidden="print" keeps its buttons off the paper -->
            <div id="request-summary" class="nds-card nds-stroke nds-shadow">
                <dl class="nds-definition-list">
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-information-circle" aria-hidden="true"></i>
                            <span class="nds-label">Status</span>
                        </dt>
                        <dd><span id="request-status-tag" class="nds-tag" data-status="warning"><span class="nds-label">Action needed</span></span></dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
                            <span class="nds-label">Reference</span>
                        </dt>
                        <dd>2026-118204</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-briefcase-02" aria-hidden="true"></i>
                            <span class="nds-label">Service</span>
                        </dt>
                        <dd>Renew a commercial license</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                            <span class="nds-label">Submitted</span>
                        </dt>
                        <dd>18 October 2026</dd>
                    </div>
                    <div class="nds-definition-item">
                        <dt>
                            <i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>
                            <span class="nds-label">Department</span>
                        </dt>
                        <dd>Commercial licensing</dd>
                    </div>
                </dl>
                <div class="nds-card-actions" data-hidden="print">
                    <button type="button" class="nds-btn nds-secondary-outline nds-md" data-print-target="request-summary">
                        <i class="nds-icon nds-hgi-printer" aria-hidden="true"></i>
                        <span class="nds-label">Print summary</span>
                    </button>
                    <a href="#" class="nds-btn nds-subtle nds-md">
                        <span class="nds-label">Contact support</span>
                    </a>
                </div>
            </div>
        </aside>
    </div>
</section>

<script>
  function initPage() {
    // Once on every signed-in page, from the shared layout, with your server's idle timeout.
    // Without extend (or a nds:session:extend listener), Stay signed in does not renew the server session: see the Session Timeout page.
    NDS.SessionTimeout.init({ timeout: 900, warn: 120 });

    var timeline = document.getElementById('request-timeline');
    var tag = document.getElementById('request-status-tag');
    var decision = document.getElementById('request-step-decision');
    var setText = function (el, selector, text) { el.querySelector(selector).textContent = text; };

    // ponytail: the server renders one state; this demo switches all four in place
    var STATES = {
      action: { current: 3, tag: ['warning', 'Action needed'], date: 'Pending', title: 'Decision', note: 'Up to 5 working days' },
      review: { current: 5, tag: ['info', 'In review'], date: 'Pending', title: 'Decision', note: 'Up to 5 working days', updated: true },
      approved: { current: 7, tag: ['success', 'Approved'], date: '27 October 2026', title: 'Approved', note: 'License 1010-445566', updated: true, done: true },
      rejected: { current: 7, tag: ['error', 'Not approved'], date: '27 October 2026', title: 'Not approved', note: 'The ID does not match the register owner', updated: true, done: true, noLicense: true }
    };

    function showState(name) {
      var state = STATES[name];
      document.getElementById('request-action').hidden = name !== 'action';
      document.getElementById('request-review').hidden = name !== 'review';
      document.getElementById('request-approved').hidden = name !== 'approved';
      document.getElementById('request-rejected').hidden = name !== 'rejected';
      document.getElementById('service-rating').hidden = !state.done;
      document.getElementById('request-step-updated').hidden = !state.updated;
      document.getElementById('request-step-issued').hidden = !!state.noLicense;
      setText(decision, '.nds-divider', state.date);
      setText(decision, '.nds-stepper-title', state.title);
      setText(decision, '.nds-stepper-description', state.note);
      tag.setAttribute('data-status', state.tag[0]);
      setText(tag, '.nds-label', state.tag[1]);
      timeline.setAttribute('data-current', state.current);
      document.getElementById('request-state-demo').value = name;
    }

    document.getElementById('request-state-demo').addEventListener('change', function (e) {
      showState(e.target.value);
    });
    // The rating strip comes from the layout, so the starting state hides it here
    showState(document.getElementById('request-state-demo').value);

    // Demo only: a fake server, as on the Upload page. Your server takes the file at data-upload-url.
    document.addEventListener('nds:upload:ready', function (e) {
      if (e.target.id !== 'request-id-upload') return;
      var upload = e.detail.instance;
      e.target.addEventListener('nds:upload:start', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = event.detail.fileData.id, progress = 0;
        upload.setFileStatus(id, 'uploading', { progress: 0 });
        var timer = setInterval(function () {
          progress += 10;
          if (!upload.setFileProgress(id, progress)) return clearInterval(timer);
          if (progress < 100) return;
          clearInterval(timer);
          setTimeout(function () { upload.setFileStatus(id, 'complete'); }, 1000);
        }, 200);
      });
    });

    // Send: the form waits on the request, then the request moves on to review
    document.getElementById('request-upload').addEventListener('nds:form:valid', function (e) {
      e.detail.waitUntil(new Promise(function (resolve) { setTimeout(resolve, 1200); }).then(function () {
        showState('review');
        NDS.Alert.create({ variant: 'success', title: 'Document sent', description: 'Your request is back in review.', display: 'toast', duration: 4000 });
      }));
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
