---
layout: page
# layout + layout_class name the page shape: the Front Matter table in layout/page-layout.md maps each key to its markup. This file's body is only the inner content.
title: Account Settings
hero_title: Account settings
hero_description: Your contact details, password, sign-in and notifications, in one place.
hide_share_page: true
breadcrumb:
- ["Examples", "/examples"]
lang: en
direction: ltr
sidemenu_mode: false
---

<!-- Layout rules: a signed-in user's settings.
     - One area per Tab, with an icon (nds-divided): many short groups, each read on its own. The row scrolls on a phone.
     - Inside a panel, each group is an nds-block with a block title.
     - Facts from a government record are a Definition List, not fields: say where to change them.
     - Several fields saved together are a form with a Save button (data-ajax, a toast on success).
     - A Switch applies at once, with no Save button; if the request fails, turn it back and show feedback on the field.
     - Records with the same fields (signed-in devices) are a compact Table, with an action on each row.
     - A destructive action asks first, in a Modal.
     - A signed-in page runs NDS.SessionTimeout.init() (see the script at the end). -->

<section id="account" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-tabs nds-divided">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Account settings">
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="acc-panel-profile" id="acc-tab-profile" tabindex="0">
                            <i class="hgi hgi-stroke hgi-user" aria-hidden="true"></i>
                            <span class="nds-label">Profile</span>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="acc-panel-security" id="acc-tab-security" tabindex="-1">
                            <i class="hgi hgi-stroke hgi-lock-password" aria-hidden="true"></i>
                            <span class="nds-label">Security</span>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="acc-panel-notifications" id="acc-tab-notifications" tabindex="-1">
                            <i class="hgi hgi-stroke hgi-notification-03" aria-hidden="true"></i>
                            <span class="nds-label">Notifications</span>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="acc-panel-account" id="acc-tab-account" tabindex="-1">
                            <i class="hgi hgi-stroke hgi-settings-02" aria-hidden="true"></i>
                            <span class="nds-label">Account</span>
                        </button>
                    </nav>
                    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
                        <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="nds-tab-content">
                    <!-- Profile -->
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-profile" aria-labelledby="acc-tab-profile" tabindex="0">
                        <div class="nds-block">
                            <h2 class="nds-block-title">From your national record</h2>
                            <dl class="nds-definition-list nds-grid nds-highlight-value nds-block" style="--max-col: 2;">
                                <div class="nds-definition-item">
                                    <dt><span class="nds-label">Full name</span></dt>
                                    <dd>Sara Ahmed Al-Otaibi</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt><span class="nds-label">National ID</span></dt>
                                    <dd>1012345672</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt><span class="nds-label">Date of birth</span></dt>
                                    <dd>14 March 1994</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt><span class="nds-label">Nationality</span></dt>
                                    <dd>Saudi</dd>
                                </div>
                            </dl>
                            <p>To change these, visit a civil affairs office with your national ID.</p>
                        </div>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Contact details</h2>
                            <!-- data-ajax: Forms checks every field and stops the POST; send the request from nds:form:valid -->
                            <form id="acc-profile-form" class="nds-form" data-ajax>
                                <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                                    <div class="nds-form-container" data-required>
                                        <div class="nds-form-header">
                                            <label for="acc-email">
                                                <span class="nds-label">Email address</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
                                            <input type="email" id="acc-email" name="email" class="nds-input" value="sara.alotaibi@example.com" autocomplete="email">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear email" hidden>
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-phone" data-required data-format="00 000 0000">
                                        <div class="nds-form-header">
                                            <label for="acc-phone">
                                                <span class="nds-label">Mobile number</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action nds-prefix">
                                                <span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span>
                                                <input type="hidden" name="country-code" value="+966">
                                            </div>
                                            <input type="tel" id="acc-phone" name="phone" class="nds-input" value="512345678" placeholder="5X XXX XXXX" autocomplete="tel-national" inputmode="numeric">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <fieldset class="nds-form-group nds-radio-group nds-horizontal">
                                        <legend class="nds-label">Language of messages</legend>
                                        <div class="nds-form-container nds-radio">
                                            <div class="nds-form-header">
                                                <label for="acc-lang-ar"><span class="nds-label">Arabic</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="radio" id="acc-lang-ar" name="language" value="ar" class="nds-radio-input" checked>
                                            </div>
                                        </div>
                                        <div class="nds-form-container nds-radio">
                                            <div class="nds-form-header">
                                                <label for="acc-lang-en"><span class="nds-label">English</span></label>
                                            </div>
                                            <div class="nds-form-control">
                                                <input type="radio" id="acc-lang-en" name="language" value="en" class="nds-radio-input">
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="nds-form-actions">
                                    <button type="submit" class="nds-btn nds-primary">
                                        <span class="nds-label">Save changes</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Security -->
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-security" aria-labelledby="acc-tab-security" tabindex="-1" hidden>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Change password</h2>
                            <form id="acc-password-form" class="nds-form" data-ajax>
                                <!-- A password manager saves the new password under this account -->
                                <input type="text" name="username" value="1012345672" autocomplete="username" hidden>
                                <div class="nds-grid" style="--min-col: 1; --max-col: 2; --gap: var(--spacing-4xl);">
                                    <div class="nds-form-container" data-required>
                                        <div class="nds-form-header">
                                            <label for="acc-current-password">
                                                <span class="nds-label">Current password</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                            <input type="password" id="acc-current-password" name="current-password" class="nds-input" autocomplete="current-password">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear password" data-i18n-aria-label="password.clear_password" hidden>
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                                <button class="nds-btn nds-subtle nds-toggle-password nds-icon-only" type="button" aria-label="Show password" data-i18n-aria-label="form.show_password">
                                                    <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-password" data-required>
                                        <div class="nds-form-header">
                                            <label for="acc-new-password">
                                                <span class="nds-label">New password</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                            <input type="password" id="acc-new-password" name="new-password" class="nds-input" autocomplete="new-password" minlength="8" aria-describedby="acc-new-password-rules">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" hidden type="button" aria-label="Clear password" data-i18n-aria-label="password.clear_password">
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                                <button class="nds-btn nds-subtle nds-toggle-password nds-icon-only" type="button" aria-label="Show password" data-i18n-aria-label="form.show_password">
                                                    <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="nds-form-footer" data-feedback-target>
                                            <div class="nds-password-rules" id="acc-new-password-rules">
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">At least 8 characters</span>
                                                </span>
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">One number (0-9)</span>
                                                </span>
                                            </div>
                                            <span class="nds-password-status" role="status" aria-live="polite"></span>
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-password" data-required data-password-match="#acc-new-password">
                                        <div class="nds-form-header">
                                            <label for="acc-retype-password">
                                                <span class="nds-label">Retype new password</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                            <input type="password" id="acc-retype-password" name="retype-password" class="nds-input" autocomplete="new-password" aria-describedby="acc-retype-password-rules">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear nds-icon-only" hidden type="button" aria-label="Clear password" data-i18n-aria-label="password.clear_password">
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                                <button class="nds-btn nds-subtle nds-toggle-password nds-icon-only" type="button" aria-label="Show password" data-i18n-aria-label="form.show_password">
                                                    <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="nds-form-footer" data-feedback-target>
                                            <div class="nds-password-rules" id="acc-retype-password-rules">
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="match">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">Matches the new password</span>
                                                </span>
                                            </div>
                                            <span class="nds-password-status" role="status" aria-live="polite"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-actions">
                                    <button type="submit" class="nds-btn nds-primary">
                                        <span class="nds-label">Change password</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Sign-in</h2>
                            <!-- A Switch applies at once: no Save button -->
                            <div class="nds-form-container nds-switch" data-setting>
                                <div class="nds-form-header" data-feedback-target>
                                    <label for="acc-two-step">
                                        <span class="nds-label">Two-step sign-in</span>
                                        <span class="nds-info">A code by text message each time you sign in on a new device</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-switch-toggle">
                                        <input type="checkbox" id="acc-two-step" name="two-step" value="on" class="nds-switch-input" checked>
                                        <div class="nds-switch-track">
                                            <div class="nds-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Signed-in devices</h2>
                            <table class="nds-table nds-compact" id="acc-devices">
                                <thead>
                                    <tr>
                                        <th>Device</th>
                                        <th>Place</th>
                                        <th>Last active</th>
                                        <th class="nds-actions-column">Sign out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Chrome on Windows <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">This device</span></span></td>
                                        <td>Riyadh</td>
                                        <td>Now</td>
                                        <td class="nds-actions-column"></td>
                                    </tr>
                                    <tr>
                                        <td>Safari on iPhone</td>
                                        <td>Riyadh</td>
                                        <td>Yesterday, 9:12 PM</td>
                                        <td class="nds-actions-column">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-sign-out aria-label="Sign out: Safari on iPhone">
                                                <span class="nds-label">Sign out</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>The app on Android</td>
                                        <td>Jeddah</td>
                                        <td>12 October 2026</td>
                                        <td class="nds-actions-column">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-sm" data-sign-out aria-label="Sign out: The app on Android">
                                                <span class="nds-label">Sign out</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Notifications: every Switch applies at once -->
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-notifications" aria-labelledby="acc-tab-notifications" tabindex="-1" hidden>
                        <div class="nds-block">
                            <fieldset class="nds-form-group nds-switch-group" data-setting>
                                <legend class="nds-label">Tell me about</legend>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-notify-requests">
                                            <span class="nds-label">Request updates</span>
                                            <span class="nds-info">A step done, a document needed, a decision</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-notify-requests" name="notify" value="requests" class="nds-switch-input" checked>
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-notify-appointments">
                                            <span class="nds-label">Appointment reminders</span>
                                            <span class="nds-info">The day before each appointment</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-notify-appointments" name="notify" value="appointments" class="nds-switch-input" checked>
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-notify-security">
                                            <span class="nds-label">Security alerts</span>
                                            <span class="nds-info">Always on, to keep your account safe</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-notify-security" name="notify" value="security" class="nds-switch-input" checked disabled>
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-notify-news">
                                            <span class="nds-label">News and new services</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-notify-news" name="notify" value="news" class="nds-switch-input">
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="nds-block">
                            <fieldset class="nds-form-group nds-switch-group nds-horizontal" data-setting>
                                <legend class="nds-label">Send them by</legend>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-channel-email"><span class="nds-label">Email</span></label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-channel-email" name="channel" value="email" class="nds-switch-input" checked>
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-channel-sms"><span class="nds-label">Text message</span></label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-channel-sms" name="channel" value="sms" class="nds-switch-input" checked>
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-form-container nds-switch">
                                    <div class="nds-form-header">
                                        <label for="acc-channel-app"><span class="nds-label">The app</span></label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch-toggle">
                                            <input type="checkbox" id="acc-channel-app" name="channel" value="app" class="nds-switch-input">
                                            <div class="nds-switch-track">
                                                <div class="nds-switch-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <!-- Account -->
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-account" aria-labelledby="acc-tab-account" tabindex="-1" hidden>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Your data</h2>
                            <p class="nds-block">Get a copy of your requests, documents and messages. We email you a link when the file is ready, within 24 hours.</p>
                            <button type="button" class="nds-btn nds-secondary-outline" id="acc-export">
                                <i class="nds-icon nds-hgi-download-04" aria-hidden="true"></i>
                                <span class="nds-label">Ask for my data</span>
                            </button>
                        </div>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Delete account</h2>
                            <p class="nds-block">Your requests and documents are deleted 30 days after you ask. Sign in before then to stop it. Records the law tells us to keep stay with the government body that issued them.</p>
                            <button type="button" class="nds-btn nds-primary nds-destructive" data-modal-target="acc-delete-modal">
                                <span class="nds-label">Delete my account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Delete asks first: it cannot be undone after 30 days -->
<dialog id="acc-delete-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-delete-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle" data-status="error">
                <i class="nds-icon nds-hgi-delete-02" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <div class="nds-card-content">
        <div class="nds-card-text">
            <span class="nds-card-title" id="acc-delete-modal-title">Delete your account?</span>
            <p class="nds-card-description">We sign you out now and delete the account in 30 days. Sign in before then to keep it.</p>
        </div>
    </div>
    <div class="nds-card-actions">
        <button type="button" id="acc-delete-confirm" class="nds-btn nds-primary nds-destructive nds-lg" data-modal-close>
            <span class="nds-label">Delete account</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
            <span class="nds-label">Keep it</span>
        </button>
    </div>
</dialog>

<script>
  function initPage() {
    // Once on every signed-in page, from the shared layout, with your server's idle timeout.
    // Without extend (or a nds:session:extend listener), Stay signed in does not renew the server session: see the Session Timeout page.
    NDS.SessionTimeout.init({ timeout: 900, warn: 120 });

    var toast = function (title, description) {
      NDS.Alert.create({ variant: 'success', title: title, description: description, display: 'toast', duration: 4000 });
    };
    // Demo only: a fake server that answers after a short wait
    var request = function () { return new Promise(function (resolve) { setTimeout(resolve, 800); }); };

    // Saved together: the form waits on the request, then says so
    document.getElementById('acc-profile-form').addEventListener('nds:form:valid', function (e) {
      e.detail.waitUntil(request().then(function () { toast('Contact details saved'); }));
    });
    document.getElementById('acc-password-form').addEventListener('nds:form:valid', function (e) {
      var form = e.target;
      e.detail.waitUntil(request().then(function () {
        form.reset();
        toast('Password changed', 'Use the new password the next time you sign in.');
      }));
    });

    // A switch applies at once. If your request fails, turn it back:
    // input.checked = !input.checked; NDS.Form.refresh(input); NDS.Form.setStatus(input, 'error', { message: '…' });
    document.querySelectorAll('[data-setting]').forEach(function (setting) {
      setting.addEventListener('change', function () {
        request().then(function () { toast('Setting saved'); });
      });
    });

    // Sign out one device: the row leaves once the server confirms
    document.getElementById('acc-devices').addEventListener('click', function (e) {
      var button = e.target.closest('[data-sign-out]');
      if (!button) return;
      // disabled stops a second press while the request runs
      NDS.state.add(button, 'loading');
      button.disabled = true;
      request().then(function () {
        var row = button.closest('tr');
        var device = row.cells[0].textContent.trim();
        // Focus would leave with the row: put it on the Security tab first
        document.getElementById('acc-tab-security').focus();
        row.remove();
        toast('Signed out', device + ' is signed out.');
      });
    });

    document.getElementById('acc-export').addEventListener('click', function () {
      toast('Request received', 'We email you a link within 24 hours.');
    });
    document.getElementById('acc-delete-confirm').addEventListener('click', function () {
      // Your server deletes the session here and sends the user to the signed-out page
      toast('Account set for deletion', 'Sign in within 30 days to keep it.');
    });
  }
  // Runs on a classic load AND when this markup is injected after load (SPA, Turbo, htmx)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
</script>
