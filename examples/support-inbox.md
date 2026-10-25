---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
title: Support Inbox
hero_title: Messages
hero_description: Messages about your requests and appointments, and your questions to the support team.
hide_share_page: true
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---

<!-- Layout rules: a signed-in user's messages, read and written like letters (not a chat).
     - Inbox and Sent are Tabs. The Inbox label carries the unread count, so the screen and a screen reader say the same.
     - Each message is a Drawer row (a button) with a featured icon, a New tag while unread, a preview line and a Meta line.
     - Every row opens ONE shared Panel that a small page script fills from the row; a real site loads the message by its id.
       Opening a message marks it read.
     - A message people can answer has a reply form in the panel; an automatic one says where to ask instead.
     - New message opens a second Panel with the form. Its Upload is the Button mode: one field in a longer form.
     - An empty list is an Empty placeholder (nds-empty) with a message that says why.
     - A signed-in page runs NDS.SessionTimeout.init() (see the script at the end). -->

<section id="inbox" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-toolbar nds-block">
                <div class="nds-toolbar-row">
                    <div class="nds-toolbar-end">
                        <button type="button" class="nds-btn nds-primary nds-md" data-panel-toggle="compose-panel">
                            <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
                            <span class="nds-label">New message</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="nds-tabs nds-divided" id="inbox-tabs">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Messages">
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="inbox-panel-received" id="inbox-tab-received" tabindex="0">
                            <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                            <span class="nds-label">Inbox (2)</span>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="inbox-panel-sent" id="inbox-tab-sent" tabindex="-1">
                            <i class="hgi hgi-stroke hgi-sent" aria-hidden="true"></i>
                            <span class="nds-label">Sent</span>
                        </button>
                    </nav>
                    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
                        <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="nds-tab-content">
                    <div class="nds-tab-panel" role="tabpanel" id="inbox-panel-received" aria-labelledby="inbox-tab-received" tabindex="0">
                        <!-- Newest first. data-body and data-attachment stand in for the message the server sends; data-no-reply marks an automatic message, data-sent one the user wrote -->
                        <div class="nds-drawer nds-divided">
                            <ul class="nds-drawer-list" id="inbox-list" aria-label="Received messages">
                                <li data-status="warning" data-unread data-body="We need a clearer copy of your national ID to finish request 2026-118204. Upload it from the request page by 1 November 2026, or the request closes. Reply here if you have a question.">
                                    <button type="button" class="nds-btn nds-subtle" data-panel-toggle="message-panel">
                                        <span class="nds-featured-icon nds-sm">
                                            <i class="hgi hgi-stroke hgi-alert-02" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-drawer-item">
                                            <span class="nds-drawer-item-head">
                                                <span class="nds-tag" data-status="info"><span class="nds-label">New</span></span>
                                                <span class="nds-label">Document needed for your request</span>
                                            </span>
                                            <span class="nds-description">We need a clearer copy of your national ID.</span>
                                            <span class="nds-meta">
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>Commercial licensing</span>
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>Today, 9:40 AM</span>
                                            </span>
                                        </span>
                                    </button>
                                </li>
                                <li data-status="info" data-unread data-no-reply data-attachment="appointment.ics" data-body="Your appointment to renew a national ID is on Monday 26 October 2026 at 8:30 AM, at the Olaya branch. Your booking number is APT-2026-55120. Bring your national ID.">
                                    <button type="button" class="nds-btn nds-subtle" data-panel-toggle="message-panel">
                                        <span class="nds-featured-icon nds-sm">
                                            <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-drawer-item">
                                            <span class="nds-drawer-item-head">
                                                <span class="nds-tag" data-status="info"><span class="nds-label">New</span></span>
                                                <span class="nds-label">Your appointment is booked</span>
                                            </span>
                                            <span class="nds-description">Monday 26 October 2026 at 8:30 AM, Olaya branch.</span>
                                            <span class="nds-meta">
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>Service centers</span>
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>Yesterday, 6:15 PM</span>
                                            </span>
                                        </span>
                                    </button>
                                </li>
                                <li data-status="neutral" data-body="The fee to renew a passport is 300 riyals for 5 years, or 600 riyals for 10 years. You pay it online before you send the request. Reply here if you have another question.">
                                    <button type="button" class="nds-btn nds-subtle" data-panel-toggle="message-panel">
                                        <span class="nds-featured-icon nds-sm">
                                            <i class="hgi hgi-stroke hgi-customer-support" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-drawer-item">
                                            <span class="nds-drawer-item-head">
                                                <span class="nds-label">Re: The passport fee</span>
                                            </span>
                                            <span class="nds-description">The fee to renew a passport is 300 riyals for 5 years.</span>
                                            <span class="nds-meta">
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>Support team</span>
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>20 October 2026</span>
                                            </span>
                                        </span>
                                    </button>
                                </li>
                                <li data-status="success" data-no-reply data-attachment="license-1010-445566.pdf" data-body="Commercial license 1010-445566 is renewed and valid until 26 October 2027. The license is attached to this message.">
                                    <button type="button" class="nds-btn nds-subtle" data-panel-toggle="message-panel">
                                        <span class="nds-featured-icon nds-sm">
                                            <i class="hgi hgi-stroke hgi-checkmark-circle-01" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-drawer-item">
                                            <span class="nds-drawer-item-head">
                                                <span class="nds-label">Your license is renewed</span>
                                            </span>
                                            <span class="nds-description">Commercial license 1010-445566 is valid until 26 October 2027.</span>
                                            <span class="nds-meta">
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>Commercial licensing</span>
                                                <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>18 October 2026</span>
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="inbox-panel-sent" aria-labelledby="inbox-tab-sent" tabindex="-1" hidden>
                        <div class="nds-drawer nds-divided">
                            <!-- The placeholder shows while the list holds no items, and leaves on its own when one is added -->
                            <ul class="nds-drawer-list nds-empty" id="sent-list" aria-label="Sent messages" data-empty-message="You have not sent a message yet"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- One panel for every message: the script fills it from the row -->
<dialog id="message-panel" class="nds-panel" data-panel-modal aria-labelledby="message-panel-title">
    <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle">
            <i class="hgi hgi-stroke hgi-mail-01"></i>
        </span>
        <div class="nds-panel-text">
            <span id="message-panel-title" class="nds-panel-title">Message</span>
            <p class="nds-panel-description" id="message-from"></p>
        </div>
        <div class="nds-panel-action">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close panel" data-i18n-aria-label="panel.close_panel">
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="nds-panel-body">
        <div class="nds-flex nds-col">
            <p id="message-text"></p>
            <a href="#" id="message-attachment" class="nds-btn nds-secondary-outline" download>
                <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                <span class="nds-label">Attachment</span>
            </a>
            <hr class="nds-divider">
            <form id="reply-form" class="nds-form" data-ajax>
                <div class="nds-form-container nds-textarea" data-required>
                    <div class="nds-form-header">
                        <label for="reply-text">
                            <span class="nds-label">Your reply</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <textarea id="reply-text" name="reply" class="nds-textarea" placeholder="Write your reply" rows="4"></textarea>
                    </div>
                </div>
            </form>
            <div id="message-no-reply" class="nds-alert nds-card nds-inline" data-status="info">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <p class="nds-alert-description">This message was sent automatically. To ask about it, send a new message.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="nds-panel-footer">
        <button type="submit" id="reply-send" form="reply-form" class="nds-btn nds-primary nds-full">
            <span class="nds-label">Send reply</span>
        </button>
    </div>
</dialog>

<!-- New message: the form in a panel -->
<dialog id="compose-panel" class="nds-panel" data-panel-modal aria-labelledby="compose-panel-title">
    <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle">
            <i class="hgi hgi-stroke hgi-mail-edit-01"></i>
        </span>
        <div class="nds-panel-text">
            <span id="compose-panel-title" class="nds-panel-title">New message</span>
            <p class="nds-panel-description">The support team answers within two working days.</p>
        </div>
        <div class="nds-panel-action">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close panel" data-i18n-aria-label="panel.close_panel">
                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="nds-panel-body">
        <form id="compose-form" class="nds-form" data-ajax>
            <div class="nds-flex nds-col">
                <div class="nds-form-container nds-select" data-required>
                    <div class="nds-form-header">
                        <label for="compose-topic">
                            <span class="nds-label">Topic</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <input type="text" id="compose-topic" class="nds-input nds-select-input" placeholder="Choose a topic" readonly>
                        <input type="hidden" name="topic" class="nds-select-value">
                        <div class="nds-select-dropdown" hidden>
                            <div class="nds-select-options">
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="request">
                                    <span class="nds-option-text">
                                        <span class="nds-label">A request I sent</span>
                                    </span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="appointment">
                                    <span class="nds-option-text">
                                        <span class="nds-label">An appointment</span>
                                    </span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="payment">
                                    <span class="nds-option-text">
                                        <span class="nds-label">A payment</span>
                                    </span>
                                </button>
                                <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="other">
                                    <span class="nds-option-text">
                                        <span class="nds-label">Something else</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-form-container">
                    <div class="nds-form-header">
                        <label for="compose-reference">
                            <span class="nds-label">Request number</span>
                            <span class="nds-info">If the message is about a request</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <input type="text" id="compose-reference" name="reference" class="nds-input" placeholder="Such as 2026-118204" inputmode="numeric">
                        <div class="nds-form-action">
                            <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="nds-form-container nds-textarea" data-required>
                    <div class="nds-form-header">
                        <label for="compose-text">
                            <span class="nds-label">Message</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <textarea id="compose-text" name="message" class="nds-textarea" placeholder="Write your message" rows="5"></textarea>
                    </div>
                </div>
                <!-- One field in a longer form: the Button mode, sent with the form (no data-upload-url) -->
                <div class="nds-form-container nds-upload" data-max-file-size="2097152" data-allowed-types="jpg,jpeg,png,pdf">
                    <div class="nds-form-header">
                        <label for="compose-files">
                            <span class="nds-label">Attachments</span>
                            <span class="nds-info">Up to 2 MB each, in JPG, PNG or PDF</span>
                        </label>
                    </div>
                    <div class="nds-form-control">
                        <input type="file" id="compose-files" multiple class="nds-file-input">
                        <div class="nds-form-action">
                            <button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn">
                                <i class="hgi hgi-stroke hgi-folder-01" aria-hidden="true"></i>
                                <span class="nds-label" data-i18n="upload.browse_files">Browse Files</span>
                            </button>
                        </div>
                    </div>
                    <div class="nds-file-list" aria-live="polite"></div>
                </div>
            </div>
        </form>
    </div>
    <div class="nds-panel-footer">
        <button type="submit" form="compose-form" class="nds-btn nds-primary nds-full">
            <span class="nds-label">Send message</span>
        </button>
    </div>
</dialog>

<script>
  function initPage() {
    // Once on every signed-in page, from the shared layout, with your server's idle timeout.
    // Without extend (or a nds:session:extend listener), Stay signed in does not renew the server session: see the Session Timeout page.
    NDS.SessionTimeout.init({ timeout: 900, warn: 120 });

    var inboxTab = document.getElementById('inbox-tab-received');
    var replyForm = document.getElementById('reply-form');
    var composeForm = document.getElementById('compose-form');
    var attachment = document.getElementById('message-attachment');
    var noReply = document.getElementById('message-no-reply');
    var replyFooter = document.getElementById('reply-send').closest('.nds-panel-footer');
    var replyTo = '';
    var readText = function (el) { return el ? el.textContent.trim() : ''; };
    var request = function () { return new Promise(function (resolve) { setTimeout(resolve, 1000); }); };
    var showUnread = function () {
      var count = document.querySelectorAll('#inbox-list [data-unread]').length;
      inboxTab.querySelector('.nds-label').textContent = count ? 'Inbox (' + count + ')' : 'Inbox';
    };

    // ponytail: copies the row; a real site loads the message by its id from the server here
    function fillPanel(row) {
      var meta = row.querySelectorAll('.nds-meta-item');
      var file = row.getAttribute('data-attachment');
      var sent = row.hasAttribute('data-sent');
      var canReply = !sent && !row.hasAttribute('data-no-reply');
      replyTo = readText(row.querySelector('.nds-drawer-item-head > .nds-label'));
      document.getElementById('message-panel-title').textContent = replyTo;
      document.getElementById('message-from').textContent = readText(meta[0]) + ', ' + readText(meta[1]);
      document.getElementById('message-text').textContent = row.getAttribute('data-body');
      attachment.hidden = !file;
      attachment.querySelector('.nds-label').textContent = file || '';
      replyForm.reset();
      replyForm.hidden = !canReply;
      replyFooter.hidden = !canReply;
      noReply.hidden = canReply || sent;
      // Opened: the message is read. Your server marks it read too.
      if (row.hasAttribute('data-unread')) {
        row.removeAttribute('data-unread');
        row.querySelector('.nds-drawer-item-head > .nds-tag').remove();
        showUnread();
      }
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-panel-toggle="message-panel"]');
      if (trigger) fillPanel(trigger.closest('li'));
    });

    // Sent: a new message or a reply joins the Sent list, and its placeholder leaves on its own
    function addSent(title, text) {
      var row = document.createElement('li');
      row.setAttribute('data-status', 'neutral');
      row.setAttribute('data-sent', '');
      row.setAttribute('data-body', text);
      row.innerHTML = '<button type="button" class="nds-btn nds-subtle" data-panel-toggle="message-panel">' +
        '<span class="nds-featured-icon nds-sm"><i class="hgi hgi-stroke hgi-sent" aria-hidden="true"></i></span>' +
        '<span class="nds-drawer-item"><span class="nds-drawer-item-head"><span class="nds-label"></span></span>' +
        '<span class="nds-description"></span><span class="nds-meta">' +
        '<span class="nds-meta-item"><i class="hgi hgi-stroke hgi-user" aria-hidden="true"></i>You</span>' +
        '<span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>Just now</span></span></span></button>';
      row.querySelector('.nds-drawer-item-head > .nds-label').textContent = title;
      row.querySelector('.nds-description').textContent = text;
      document.getElementById('sent-list').prepend(row);
    }

    replyForm.addEventListener('nds:form:valid', function (e) {
      var text = document.getElementById('reply-text').value;
      e.detail.waitUntil(request().then(function () {
        addSent('Re: ' + replyTo.replace(/^Re: /, ''), text);
        NDS.Panel.close('message-panel');
        NDS.Alert.create({ variant: 'success', title: 'Reply sent', description: 'The answer arrives in your inbox.', display: 'toast', duration: 4000 });
      }));
    });

    composeForm.addEventListener('nds:form:valid', function (e) {
      var topic = document.getElementById('compose-topic').value;
      var text = document.getElementById('compose-text').value;
      e.detail.waitUntil(request().then(function () {
        addSent(topic, text);
        composeForm.reset();
        NDS.Panel.close('compose-panel');
        document.getElementById('inbox-tabs').ndsTabs.goTo(1);
        NDS.Alert.create({ variant: 'success', title: 'Message sent', description: 'The support team answers within two working days.', display: 'toast', duration: 4000 });
      }));
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
