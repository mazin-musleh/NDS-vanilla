---
layout: page
title: Password
hero_title: Password - National Design System
hero_description: A password field that checks strength rules as the user types, confirms a retyped password matches, and blocks the form submit until both pass
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.7.0"
last_edit: "18/08/2026 - 01:37 AM"
---

<!-- Strength Rules -->
<section id="passwordRules" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Strength Rules</h2>
            <p class="nds-section-description">Each rule is a chip in the markup. The chip turns green when the value passes and red when it fails, and any failing chip blocks the form submit.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Five built-in rules</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <div class="nds-form-container nds-password">
                                    <div class="nds-form-header">
                                        <label for="password-rules-1">
                                            <span class="nds-label">New password</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                        <input type="password" id="password-rules-1" name="new-password" class="nds-input" autocomplete="new-password" minlength="10" required aria-describedby="password-rules-1-list">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                                                <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="nds-form-footer" data-feedback-target>
                                        <div class="nds-password-rules" id="password-rules-1-list">
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">At least 10 characters</span>
                                            </span>
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">One capital letter (A-Z)</span>
                                            </span>
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="lower">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">One small letter (a-z)</span>
                                            </span>
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">One number (0-9)</span>
                                            </span>
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="special">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">One symbol (! @ # $ %)</span>
                                            </span>
                                        </div>
                                        <span class="nds-password-status" role="status" aria-live="polite"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-password-rules-1" id="tab-password-rules-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-password-rules-1"
                                        aria-labelledby="tab-password-rules-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-password"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="password-rules-1"&gt;
      &lt;span class="nds-label"&gt;New password&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;i class="nds-icon nds-hgi-lock-password" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;input type="password" id="password-rules-1" name="new-password" class="nds-input" autocomplete="new-password" minlength="10" required aria-describedby="password-rules-1-list"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password"&gt;
        &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password"&gt;
        &lt;i class="nds-icon nds-hgi-view-off" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;div class="nds-password-rules" id="password-rules-1-list"&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;At least 10 characters&lt;/span&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;One capital letter (A-Z)&lt;/span&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="lower"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;One small letter (a-z)&lt;/span&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;One number (0-9)&lt;/span&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="special"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;One symbol (! @ # $ %)&lt;/span&gt;
      &lt;/span&gt;
    &lt;/div&gt;
    &lt;span class="nds-password-status" role="status" aria-live="polite"&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Confirm Password -->
<section id="passwordConfirm" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Confirm Password</h2>
            <p class="nds-section-description">Point a second field at the first with <code class="nds-inline-code lang-html">data-password-match</code>. The submit stays blocked until the two values are equal. There are two patterns for showing the result, and both are canonical.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Change password form</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <form class="nds-form" data-ajax>
                                    <label for="password-confirm-user" hidden aria-hidden="true">Username</label>
                                    <input type="text" id="password-confirm-user" autocomplete="username" hidden aria-hidden="true">
                                    <div class="nds-form-container nds-password" data-required>
                                        <div class="nds-form-header">
                                            <label for="password-confirm-1">
                                                <span class="nds-label">New password</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                            <input type="password" id="password-confirm-1" name="new-password" class="nds-input" autocomplete="new-password" minlength="8" required aria-describedby="password-confirm-1-list">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                                <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                                                    <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="nds-form-footer" data-feedback-target>
                                            <div class="nds-password-rules" id="password-confirm-1-list">
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">At least 8 characters</span>
                                                </span>
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">One capital letter (A-Z)</span>
                                                </span>
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">One number (0-9)</span>
                                                </span>
                                            </div>
                                            <span class="nds-password-status" role="status" aria-live="polite"></span>
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-password" data-required data-password-match="#password-confirm-1">
                                        <div class="nds-form-header">
                                            <label for="password-confirm-2">
                                                <span class="nds-label">Retype new password</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                            <input type="password" id="password-confirm-2" name="retype-password" class="nds-input" autocomplete="new-password" required aria-describedby="password-confirm-2-list">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                                </button>
                                                <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                                                    <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="nds-form-footer" data-feedback-target>
                                            <div class="nds-password-rules" id="password-confirm-2-list">
                                                <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="match">
                                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                    <span class="nds-feedback-message">Matches the new password</span>
                                                </span>
                                            </div>
                                            <span class="nds-password-status" role="status" aria-live="polite"></span>
                                        </div>
                                    </div>
                                    <div class="nds-form-actions">
                                        <button type="submit" class="nds-btn nds-primary">
                                            <span class="nds-label">Save password</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-password-confirm-1" id="tab-password-confirm-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-password-confirm-1"
                                        aria-labelledby="tab-password-confirm-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;form class="nds-form" data-ajax&gt;
  &lt;label for="password-confirm-user" hidden aria-hidden="true"&gt;Username&lt;/label&gt;
  &lt;input type="text" id="password-confirm-user" autocomplete="username" hidden aria-hidden="true"&gt;
  &lt;div class="nds-form-container nds-password" data-required&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="password-confirm-1"&gt;
        &lt;span class="nds-label"&gt;New password&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;i class="nds-icon nds-hgi-lock-password" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;input type="password" id="password-confirm-1" name="new-password" class="nds-input" autocomplete="new-password" minlength="8" required aria-describedby="password-confirm-1-list"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password"&gt;
          &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password"&gt;
          &lt;i class="nds-icon nds-hgi-view-off" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer" data-feedback-target&gt;
      &lt;div class="nds-password-rules" id="password-confirm-1-list"&gt;
        &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length"&gt;
          &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
          &lt;span class="nds-feedback-message"&gt;At least 8 characters&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper"&gt;
          &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
          &lt;span class="nds-feedback-message"&gt;One capital letter (A-Z)&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit"&gt;
          &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
          &lt;span class="nds-feedback-message"&gt;One number (0-9)&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
      &lt;span class="nds-password-status" role="status" aria-live="polite"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-password" data-required data-password-match="#password-confirm-1"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="password-confirm-2"&gt;
        &lt;span class="nds-label"&gt;Retype new password&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;i class="nds-icon nds-hgi-lock-password" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;input type="password" id="password-confirm-2" name="retype-password" class="nds-input" autocomplete="new-password" required aria-describedby="password-confirm-2-list"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password"&gt;
          &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password"&gt;
          &lt;i class="nds-icon nds-hgi-view-off" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer" data-feedback-target&gt;
      &lt;div class="nds-password-rules" id="password-confirm-2-list"&gt;
        &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="match"&gt;
          &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
          &lt;span class="nds-feedback-message"&gt;Matches the new password&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
      &lt;span class="nds-password-status" role="status" aria-live="polite"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-actions"&gt;
    &lt;button type="submit" class="nds-btn nds-primary"&gt;
      &lt;span class="nds-label"&gt;Save password&lt;/span&gt;
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/form&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Two Patterns</h3>
                <p><strong>With a match chip.</strong> Use this when the confirm field sits beside strength rules, as the demo above shows. The chip joins the rule list and updates while the user types in either field, so the whole password state reads in one place.</p>
                <p><strong>Without a chip.</strong> Use this when confirm is the only check on the field. Set <code class="nds-inline-code lang-html">data-password-match</code> and ship no rule list. The component still blocks the submit and still shows the mismatch message, because the match test does not depend on chips. This suits a short form where one more chip adds noise.</p>
                <p>Do not add a chip only because the demo has one. Pick the pattern that matches the field's role.</p>
            </div>
        </div>
    </div>
</section>

<!-- Custom Rules -->
<section id="passwordCustomRules" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom Rules</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-rule-pattern</code> to a chip and the regular expression becomes the rule. The chip then counts and gates like a built-in one, with no JavaScript to write.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Rules from regular expressions</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <div class="nds-form-container nds-password">
                                    <div class="nds-form-header">
                                        <label for="password-custom-1">
                                            <span class="nds-label">New password</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
                                        <input type="password" id="password-custom-1" name="new-password" class="nds-input" autocomplete="new-password" minlength="12" required aria-describedby="password-custom-1-list">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
                                                <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="nds-form-footer" data-feedback-target>
                                        <div class="nds-password-rules" id="password-custom-1-list">
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">At least 12 characters</span>
                                            </span>
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="nospace" data-rule-pattern="^\S+$">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">No spaces</span>
                                            </span>
                                            <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="twodigits" data-rule-pattern="\d.*\d">
                                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                                <span class="nds-feedback-message">Two numbers or more</span>
                                            </span>
                                        </div>
                                        <span class="nds-password-status" role="status" aria-live="polite"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-password-custom-1" id="tab-password-custom-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-password-custom-1"
                                        aria-labelledby="tab-password-custom-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-password"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="password-custom-1"&gt;
      &lt;span class="nds-label"&gt;New password&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;i class="nds-icon nds-hgi-lock-password" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;input type="password" id="password-custom-1" name="new-password" class="nds-input" autocomplete="new-password" minlength="12" required aria-describedby="password-custom-1-list"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password"&gt;
        &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password"&gt;
        &lt;i class="nds-icon nds-hgi-view-off" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;div class="nds-password-rules" id="password-custom-1-list"&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;At least 12 characters&lt;/span&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="nospace" data-rule-pattern="^\S+$"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;No spaces&lt;/span&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="twodigits" data-rule-pattern="\d.*\d"&gt;
        &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
        &lt;span class="nds-feedback-message"&gt;Two numbers or more&lt;/span&gt;
      &lt;/span&gt;
    &lt;/div&gt;
    &lt;span class="nds-password-status" role="status" aria-live="polite"&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="passwordFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-plug-socket"></i>
                            <span class="nds-label">Auto-initialization</span>
                        </span>
                        <p class="nds-item-desc">Activates on any form container that carries the nds-password class. Chips start checking on the first keystroke.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-checkmark-badge-01"></i>
                            <span class="nds-label">Five Built-in Rules</span>
                        </span>
                        <p class="nds-item-desc">Length, capital letter, small letter, number, and symbol checks are ready to use. Ship a chip for each rule you want.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-source-code"></i>
                            <span class="nds-label">Rules From Markup</span>
                        </span>
                        <p class="nds-item-desc">A regular expression on a chip becomes a working rule, so a project-specific policy needs no JavaScript.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-equal-sign"></i>
                            <span class="nds-label">Confirm Match</span>
                        </span>
                        <p class="nds-item-desc">A retype field tracks the first field as the user types in either one, so a mismatch shows before submit.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-shield-01"></i>
                            <span class="nds-label">Submit Gating</span>
                        </span>
                        <p class="nds-item-desc">A failing rule or a mismatch blocks the submit through native constraint validation, with a message under the field.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-access"></i>
                            <span class="nds-label">Screen Reader Progress</span>
                        </span>
                        <p class="nds-item-desc">A hidden live region reports how many rules are met, so the chips are not silent to a screen reader.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-dashboard-speed-01"></i>
                            <span class="nds-label">Strength Value in CSS</span>
                        </span>
                        <p class="nds-item-desc">The container carries the number of passing rules, ready to drive a strength bar from a stylesheet.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-api"></i>
                            <span class="nds-label">Programmatic Control</span>
                        </span>
                        <p class="nds-item-desc">Register rules, force a re-check, and read the current result through the JS API.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="passwordGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use this on sign-up, change-password, and password-reset forms, where the user picks a new value and needs to know the policy up front</li>
                    <li>Do not use it on a sign-in form. The user already has a password there, so a plain password field from <a class="nds-color" href="{{ 'components/forms' | relative_url }}">Text Fields</a> is enough</li>
                    <li>Ship one chip per rule the server enforces. A chip the server ignores teaches the user a policy that is not real</li>
                    <li>Keep <code class="nds-inline-code lang-html">minlength</code> on the input. The browser enforces it on its own, so length still blocks the submit if the JavaScript never loads</li>
                    <li>Place <code class="nds-inline-code lang-html">nds-password-rules</code> inside the <code class="nds-inline-code lang-html">data-feedback-target</code> footer, and give every chip <code class="nds-inline-code lang-html">data-permanent</code>. A validation message then takes over that slot and the chips come back when it clears</li>
                    <li>Prefer <code class="nds-inline-code lang-html">data-rule-pattern</code> over <code class="nds-inline-code lang-js">addRule()</code> for a one-off rule, so the expression sits next to the message the user reads</li>
                    <li>Anchor a pattern with <code class="nds-inline-code lang-html">^</code> and <code class="nds-inline-code lang-html">$</code> when the whole value must match. Without anchors the expression matches anywhere in the value</li>
                    <li>Write each chip message as the rule itself, such as "One number (0-9)", not as an error. The chip turns red on its own when the rule fails</li>
                    <li>Give the retype field a match chip. Without it the mismatch only shows at submit</li>
                    <li>Add a hidden username field with <code class="nds-inline-code lang-html">autocomplete="username"</code> above the password fields so password managers save the right credential</li>
                    <li>Do not treat the strength number as a security measure. It counts chips, not how hard the password is to guess</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Structure Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-password</code></td><td>Add to <code class="nds-inline-code lang-html">nds-form-container</code> to opt the field into rule checking and match checking</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-password-rules</code></td><td>Wrapper for the rule chips, placed inside the <code class="nds-inline-code lang-html">data-feedback-target</code> footer. Point the input's <code class="nds-inline-code lang-html">aria-describedby</code> at it. The footer has no layout of its own, so this wrapper owns the chip spacing</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-password-status</code></td><td>Visually hidden live region that receives the rules-met announcement. Optional, but a screen reader gets no live feedback without it</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-password-match</code></td><td>Set on <code class="nds-inline-code lang-html">nds-form-container</code> to a CSS selector for the source input. Makes this field a confirm field. Resolved once at init, so a source field added later needs <code class="nds-inline-code lang-js">NDS.Password.reinit()</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-rule</code></td><td>Set on a chip inside the container. Values: <code class="nds-inline-code lang-html">length</code>, <code class="nds-inline-code lang-html">upper</code>, <code class="nds-inline-code lang-html">lower</code>, <code class="nds-inline-code lang-html">digit</code>, <code class="nds-inline-code lang-html">special</code>, <code class="nds-inline-code lang-html">match</code>. Any other name needs <code class="nds-inline-code lang-html">data-rule-pattern</code> or <code class="nds-inline-code lang-js">addRule()</code>, otherwise the chip stays grey and is never counted</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-rule-pattern</code></td><td>Set on a chip to a regular expression. Overrides a built-in name of the same value. The expression matches anywhere in the value unless you anchor it. An invalid expression logs a warning and leaves the chip inert</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-status</code></td><td>Set on each chip to <code class="nds-inline-code lang-html">neutral</code> in your markup. The component switches it to <code class="nds-inline-code lang-html">success</code> or <code class="nds-inline-code lang-html">error</code> per keystroke. The JavaScript loads after first paint, so a chip without a starting value has no style until then</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-permanent</code></td><td>Set on each chip. A validation message in the same footer hides the chips instead of destroying them, and they return when the message clears. Without it the chips are dismissed for good on the first error</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-password-strength</code></td><td>Written by the component on the container: the number of passing chips, and always <code class="nds-inline-code lang-html">0</code> while the field is empty. Read it in CSS to drive your own strength bar, one rule per level, for example <code class="nds-inline-code lang-html">.nds-password[data-password-strength="5"] .my-strength-bar { width: 100%; }</code>. NDS ships no meter element: the bar is yours</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">minlength</code></td><td>The native HTML attribute on the input. Sets the threshold for the <code class="nds-inline-code lang-html">length</code> rule. Defaults to 8 when absent</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Password</strong> API wires containers, registers rules, and reports the current result. Fields already in the HTML are wired for you. Call <strong>NDS.Password.init()</strong> after adding a field to the page.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
// ── Wire fields added after page load ────────────────
NDS.Password.init();      // scan the page, skip containers already wired
NDS.Password.reinit();    // same as init()

const field = document.querySelector('#signup-password').closest('.nds-form-container');

// ── Wire or unwire one field ─────────────────────────
NDS.Password.create(field);   // returns the instance, or null if it could not wire
NDS.Password.destroy(field);  // unwire, lift the submit block, reset the chips

// ── Force a re-check now ─────────────────────────────
const result = NDS.Password.check(field);
// { strength: 4, allPass: false, rules: { length: true, upper: true, digit: false } }

// ── Read the last result without re-checking ─────────
field.ndsPassword.getStrength();

// ── Register a custom rule ───────────────────────────
// Chips with data-rule="nouser" start counting on the next keystroke.
NDS.Password.addRule('nouser', function (value, ctx) {
    return value.toLowerCase() !== document.querySelector('#username').value.toLowerCase();
});
// ctx.minLength   the input's minlength (8 when the attribute is absent)
// ctx.matchValue  the source field's value, or null when the container
//                 has no data-password-match

// ── React to every keystroke ─────────────────────────
field.addEventListener('nds:password:change', function (e) {
    e.detail.strength;  // number of passing chips, 0 while the field is empty
    e.detail.allPass;   // true when every active chip passes, false while empty
    e.detail.rules;     // { length: true, upper: false, digit: true }
});
// The event carries no password value. Read the input when you need it.
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
