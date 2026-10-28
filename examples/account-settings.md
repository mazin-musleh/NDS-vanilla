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

<!-- Layout rules: a signed-in user's own account, read first and changed one thing at a time.
     - One area per Tab with an icon (nds-divided); the row scrolls on a phone. A tab with two groups gives each an nds-block with a block title.
     - Each group is a Definition List (nds-divided): a label, the current value under it, and a Change button.
       No field shows until the user asks.
     - Facts from a government record have no Change button: a note says where to change them.
     - Change opens a small Modal with that one setting, as a form (data-ajax) with Save and Cancel. The row shows the new value once the server confirms.
     - A new email or mobile number is confirmed with a code sent to it: the field's Modal sends the code, a second Modal takes it (OTP, with a Cooldown resend).
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
                        <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="acc-panel-data" id="acc-tab-data" tabindex="-1">
                            <i class="hgi hgi-stroke hgi-database-01" aria-hidden="true"></i>
                            <span class="nds-label">Your data</span>
                        </button>
                    </nav>
                    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
                        <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="nds-tab-content">
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-profile" aria-labelledby="acc-tab-profile" tabindex="0">
                        <div class="nds-block">
                            <h2 class="nds-block-title">Your details</h2>
                            <dl class="nds-definition-list nds-divided nds-block">
                                    <div class="nds-definition-item">
                                        <dt>Full name</dt>
                                        <dd>Sara Ahmed Al-Otaibi</dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>National ID</dt>
                                        <dd>1012345672</dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>Date of birth</dt>
                                        <dd>14 March 1994</dd>
                                    </div>
                            </dl>
                            <p>These come from your national record. To change them, visit a civil affairs office with your national ID.</p>
                        </div>
                        <div class="nds-block">
                            <h2 class="nds-block-title">Contact</h2>
                            <dl class="nds-definition-list nds-divided nds-block">
                                    <div class="nds-definition-item">
                                        <dt>Email</dt>
                                        <dd>
                                            <div class="nds-item-action">
                                                <span id="acc-email-value">sara.alotaibi@example.com</span>
                                                <button type="button" class="nds-btn nds-subtle nds-md" data-modal-target="acc-email-modal" aria-label="Change email"><span class="nds-label">Change</span></button>
                                            </div>
                                        </dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>Mobile</dt>
                                        <dd>
                                            <div class="nds-item-action">
                                                <span id="acc-mobile-value">+966 51 234 5678</span>
                                                <button type="button" class="nds-btn nds-subtle nds-md" data-modal-target="acc-mobile-modal" aria-label="Change mobile"><span class="nds-label">Change</span></button>
                                            </div>
                                        </dd>
                                    </div>
                                    <div class="nds-definition-item">
                                        <dt>Language of messages</dt>
                                        <dd>
                                            <div class="nds-item-action">
                                                <span id="acc-language-value">Arabic</span>
                                                <button type="button" class="nds-btn nds-subtle nds-md" data-modal-target="acc-language-modal" aria-label="Change language of messages"><span class="nds-label">Change</span></button>
                                            </div>
                                        </dd>
                                    </div>
                            </dl>
                        </div>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-security" aria-labelledby="acc-tab-security" tabindex="-1" hidden>
                        <dl class="nds-definition-list nds-divided">
                            <div class="nds-definition-item">
                                <dt>Password</dt>
                                <dd>
                                    <div class="nds-item-action">
                                        <span id="acc-password-value">Last changed 12 August 2026</span>
                                        <button type="button" class="nds-btn nds-subtle nds-md" data-modal-target="acc-password-modal" aria-label="Change password"><span class="nds-label">Change</span></button>
                                    </div>
                                </dd>
                            </div>
                            <div class="nds-definition-item">
                                <dt>Two-step sign-in</dt>
                                <dd>Always on: a code to your mobile each time you sign in</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-notifications" aria-labelledby="acc-tab-notifications" tabindex="-1" hidden>
                        <dl class="nds-definition-list nds-divided">
                            <div class="nds-definition-item">
                                <dt>Request updates</dt>
                                <dd>
                                    <div class="nds-item-action">
                                        <span id="acc-notify-value">Email and text message</span>
                                        <button type="button" class="nds-btn nds-subtle nds-md" data-modal-target="acc-notify-modal" aria-label="Change how you get request updates"><span class="nds-label">Change</span></button>
                                    </div>
                                </dd>
                            </div>
                            <div class="nds-definition-item">
                                <dt>Security alerts</dt>
                                <dd>Always sent, by text message</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="nds-tab-panel" role="tabpanel" id="acc-panel-data" aria-labelledby="acc-tab-data" tabindex="-1" hidden>
                        <dl class="nds-definition-list nds-divided">
                            <div class="nds-definition-item">
                                <dt>A copy of your data</dt>
                                <dd>
                                    <div class="nds-item-action">
                                        <span>We email you a link within 24 hours</span>
                                        <button type="button" class="nds-btn nds-subtle nds-md" id="acc-export"><span class="nds-label">Ask for a copy</span></button>
                                    </div>
                                </dd>
                            </div>
                            <div class="nds-definition-item">
                                <dt>Delete account</dt>
                                <dd>
                                    <div class="nds-item-action">
                                        <span>Deleted 30 days after you ask</span>
                                        <button type="button" class="nds-btn nds-subtle nds-destructive nds-md" data-modal-target="acc-delete-modal"><span class="nds-label">Delete</span></button>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<dialog id="acc-email-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-email-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="acc-email-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-title" id="acc-email-modal-title">Change email</span>
                <p class="nds-card-description">We send a code to the new address to check it is yours.</p>
            </div>
            <div class="nds-form-container" data-required>
                <div class="nds-form-header">
                    <label for="acc-new-email">
                        <span class="nds-label">New email address</span>
                    </label>
                </div>
                <div class="nds-form-control">
                    <input type="email" id="acc-new-email" name="email" class="nds-input" autocomplete="email">
                    <div class="nds-form-action">
                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear email" hidden>
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="nds-card-actions">
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Send code</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</dialog>

<dialog id="acc-mobile-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-mobile-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="acc-mobile-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-title" id="acc-mobile-modal-title">Change mobile number</span>
                <p class="nds-card-description">We send a code by text message to the new number to check it is yours.</p>
            </div>
            <div class="nds-form-container nds-formatted nds-phone" data-required data-format="00 000 0000">
                <div class="nds-form-header">
                    <label for="acc-new-phone">
                        <span class="nds-label">New mobile number</span>
                    </label>
                </div>
                <div class="nds-form-control">
                    <div class="nds-form-action nds-prefix">
                        <span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span>
                        <input type="hidden" name="country-code" value="+966">
                    </div>
                    <input type="tel" id="acc-new-phone" name="phone" class="nds-input" placeholder="5X XXX XXXX" autocomplete="tel-national" inputmode="numeric">
                    <div class="nds-form-action">
                        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="nds-card-actions">
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Send code</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</dialog>

<!-- One code step for both email and mobile: the script says where the code went -->
<dialog id="acc-code-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-code-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="acc-code-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text nds-center">
                <span class="nds-card-title" id="acc-code-modal-title">Enter the code</span>
                <p class="nds-card-description">We sent a 4-digit code to <strong id="acc-code-destination">the new address</strong>.</p>
            </div>
            <fieldset class="nds-form-group nds-otp-group nds-md nds-center" data-required>
                <legend><span class="nds-label">Verification code</span></legend>
                <div class="nds-otp">
                    <div class="nds-form-container nds-otp-container">
                        <div class="nds-form-control">
                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code" aria-label="Digit 1 of 4">
                        </div>
                    </div>
                    <div class="nds-form-container nds-otp-container">
                        <div class="nds-form-control">
                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 2 of 4">
                        </div>
                    </div>
                    <div class="nds-form-container nds-otp-container">
                        <div class="nds-form-control">
                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 3 of 4">
                        </div>
                    </div>
                    <div class="nds-form-container nds-otp-container">
                        <div class="nds-form-control">
                            <input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 4 of 4">
                        </div>
                    </div>
                </div>
                <input type="hidden" class="nds-otp-value" name="one-time-code">
            </fieldset>
            <div class="nds-center">
                <p class="nds-note">Didn't receive the code?</p>
                <button type="button" class="nds-btn nds-subtle nds-cooldown" id="acc-code-resend" data-cooldown="30" data-cooldown-label="Resend in {s}s" data-resend-label="Resend">
                    <span class="nds-label">Resend code</span>
                </button>
            </div>
        </div>
        <div class="nds-card-actions">
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Confirm</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</dialog>

<dialog id="acc-language-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-language-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="nds-icon nds-hgi-translation" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="acc-language-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-title" id="acc-language-modal-title">Language of messages</span>
                <p class="nds-card-description">The language of the emails and text messages we send you.</p>
            </div>
            <fieldset class="nds-form-group nds-radio-group">
                <legend class="nds-label">Language</legend>
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
        <div class="nds-card-actions">
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Save</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</dialog>

<dialog id="acc-password-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-password-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="acc-password-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-title" id="acc-password-modal-title">Change password</span>
                <p class="nds-card-description">Use at least 8 characters, with one number.</p>
            </div>
            <!-- A password manager saves the new password under this account -->
            <input type="text" name="username" value="1012345672" autocomplete="username" hidden>
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
        <div class="nds-card-actions">
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Change password</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</dialog>

<dialog id="acc-notify-modal" class="nds-modal nds-card nds-stroke nds-sm" aria-labelledby="acc-notify-modal-title">
    <div class="nds-card-header">
        <div class="nds-card-featured-icon">
            <span class="nds-featured-icon nds-circle">
                <i class="nds-icon nds-hgi-notification-02" aria-hidden="true"></i>
            </span>
        </div>
        <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>
    <form id="acc-notify-form" class="nds-form" data-ajax>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-title" id="acc-notify-modal-title">Request updates</span>
                <p class="nds-card-description">A step done, a document needed or a decision on one of your requests.</p>
            </div>
            <fieldset class="nds-form-group nds-checkbox-group">
                <legend class="nds-label">Send them by</legend>
                <div class="nds-form-container nds-checkbox">
                    <div class="nds-form-header">
                        <label for="acc-channel-email"><span class="nds-label">Email</span></label>
                    </div>
                    <div class="nds-form-control">
                        <input type="checkbox" id="acc-channel-email" name="channel" value="email" class="nds-checkbox-input" checked>
                    </div>
                </div>
                <div class="nds-form-container nds-checkbox">
                    <div class="nds-form-header">
                        <label for="acc-channel-sms"><span class="nds-label">Text message</span></label>
                    </div>
                    <div class="nds-form-control">
                        <input type="checkbox" id="acc-channel-sms" name="channel" value="sms" class="nds-checkbox-input" checked>
                    </div>
                </div>
                <div class="nds-form-container nds-checkbox">
                    <div class="nds-form-header">
                        <label for="acc-channel-app"><span class="nds-label">The app</span></label>
                    </div>
                    <div class="nds-form-control">
                        <input type="checkbox" id="acc-channel-app" name="channel" value="app" class="nds-checkbox-input">
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="nds-card-actions">
            <button type="submit" class="nds-btn nds-primary nds-lg">
                <span class="nds-label">Save</span>
            </button>
            <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                <span class="nds-label">Cancel</span>
            </button>
        </div>
    </form>
</dialog>

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
    // Demo only: a fake server that answers after a short wait, and takes any code
    var request = function () { return new Promise(function (resolve) { setTimeout(resolve, 800); }); };
    var setValue = function (id, text) { document.getElementById(id).textContent = text; };
    var checkedLabels = function (form) {
      return Array.prototype.map.call(form.querySelectorAll('input:checked'), function (input) {
        return form.querySelector('label[for="' + input.id + '"]').textContent.trim();
      });
    };
    // Each form saves through its own request, closes its Modal, then shows the result
    var onSave = function (formId, save) {
      document.getElementById(formId).addEventListener('nds:form:valid', function (e) {
        var form = e.target;
        e.detail.waitUntil(request().then(function () { save(form); }));
      });
    };

    // A new email or mobile: send a code, then ask for it in the code Modal
    var pending = null;
    var askForCode = function (form, change) {
      pending = change;
      setValue('acc-code-destination', change.value);
      form.closest('dialog').addEventListener('nds:modal:closed', function () {
        form.reset();
        NDS.Modal.open('acc-code-modal');
      }, { once: true });
      NDS.Modal.close();
    };
    onSave('acc-email-form', function (form) {
      askForCode(form, { row: 'acc-email-value', value: form.elements.email.value, title: 'Email changed' });
    });
    onSave('acc-mobile-form', function (form) {
      askForCode(form, { row: 'acc-mobile-value', value: '+966 ' + form.elements.phone.value, title: 'Mobile number changed' });
    });
    onSave('acc-code-form', function (form) {
      setValue(pending.row, pending.value);
      NDS.Modal.close();
      form.reset();
      toast(pending.title);
    });
    document.getElementById('acc-code-resend').addEventListener('nds:cooldown:start', function () {
      request().then(function () { toast('Code sent', 'A new code is on its way.'); });
    });

    onSave('acc-language-form', function (form) {
      setValue('acc-language-value', checkedLabels(form)[0]);
      NDS.Modal.close();
      toast('Language saved');
    });
    onSave('acc-password-form', function (form) {
      setValue('acc-password-value', 'Last changed today');
      NDS.Modal.close();
      form.reset();
      toast('Password changed', 'Use the new password the next time you sign in.');
    });
    onSave('acc-notify-form', function (form) {
      var channels = checkedLabels(form);
      setValue('acc-notify-value', channels.length ? channels.map(function (name, i) { return i ? name.toLowerCase() : name; }).join(' and ') : 'Off');
      NDS.Modal.close();
      toast('Notifications saved');
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
