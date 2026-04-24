---
layout: page
title: User Feedback
hero_title: User Feedback - National Design System
hero_description: A stepped satisfaction survey that captures Yes or No responses, follows up with contextual detail questions based on the answer, and remembers submissions per page so returning visitors see confirmation instead of being asked again.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
hideFeedback: true
---

<!-- Overview -->
<section id="userFeedbackOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feedback Survey</h2>
            <p class="nds-section-description">The widget starts with a Yes/No question. Selecting an answer reveals a tailored follow-up form specific to that choice, then submission replaces the form with a confirmation message.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Page Satisfaction Survey</div>
                    </div>
                    <div class="demo-container" style="padding: 0;">
                        <div class="state-demo">
                            {% include user-feedback.html %}
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-uf-overview-1" id="tab-uf-overview-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-uf-overview-1"
                                    aria-labelledby="tab-uf-overview-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;section id="user-feedback" class="nds-user-feedback-section nds-content-section"&gt;
  &lt;div class="nds-section-body"&gt;
    &lt;form class="nds-form" action="/submit" method="POST"&gt;
      &lt;div class="nds-user-feedback"&gt;

        &lt;!-- Step 1: Question --&gt;
        &lt;div class="nds-user-feedback-overview"&gt;
          &lt;span class="nds-user-feedback-question"&gt;Was this page useful?&lt;/span&gt;
          &lt;span class="nds-user-feedback-status" hidden&gt;&lt;/span&gt;
          &lt;div class="nds-user-feedback-answer-btn"&gt;
            &lt;button type="button" class="nds-btn nds-primary nds-md" data-answer="Yes" aria-label="Yes"&gt;
              &lt;span class="nds-label"&gt;Yes&lt;/span&gt;
            &lt;/button&gt;
            &lt;button type="button" class="nds-btn nds-primary nds-md" data-answer="No" aria-label="No"&gt;
              &lt;span class="nds-label"&gt;No&lt;/span&gt;
            &lt;/button&gt;
          &lt;/div&gt;
          &lt;span class="nds-user-feedback-statistic"&gt;60% of users said Yes from 2843 Feedbacks&lt;/span&gt;
          &lt;button type="button" class="nds-user-feedback-close nds-btn nds-secondary-outline nds-md"
              aria-label="Close feedback" hidden&gt;
            &lt;span class="nds-label"&gt;Close&lt;/span&gt;
            &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/button&gt;
        &lt;/div&gt;

        &lt;!-- Step 2: Follow-up details (JS shows/hides) --&gt;
        &lt;div class="nds-user-feedback-details" hidden&gt;
          &lt;div class="nds-user-feedback-options"&gt;

            &lt;!-- Shown when data-answer="yes" --&gt;
            &lt;fieldset class="nds-form-group nds-check-group nds-why-yes" data-min-checked="2"&gt;
              &lt;legend&gt;
                &lt;span class="nds-label"&gt;Please tell us why&lt;/span&gt;
                &lt;span class="nds-note"&gt;(you can select multiple options)&lt;/span&gt;
              &lt;/legend&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-yes-relevant"&gt;&lt;span class="nds-label"&gt;Content is relevant&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-yes-relevant" name="why-yes" value="relevant" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-yes-written"&gt;&lt;span class="nds-label"&gt;It was well written&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-yes-written" name="why-yes" value="well-written" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-yes-layout"&gt;&lt;span class="nds-label"&gt;The layout made it easy to read&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-yes-layout" name="why-yes" value="easy-layout" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-yes-other"&gt;&lt;span class="nds-label"&gt;Something else&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-yes-other" name="why-yes" value="other" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
            &lt;/fieldset&gt;

            &lt;!-- Shown when data-answer="no" --&gt;
            &lt;fieldset class="nds-form-group nds-check-group nds-why-no" data-required&gt;
              &lt;legend&gt;
                &lt;span class="nds-label"&gt;Please tell us why&lt;/span&gt;
                &lt;span class="nds-note"&gt;(you can select multiple options)&lt;/span&gt;
              &lt;/legend&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-no-irrelevant"&gt;&lt;span class="nds-label"&gt;Content is not relevant&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-no-irrelevant" name="why-no" value="not-relevant" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-no-inaccurate"&gt;&lt;span class="nds-label"&gt;Content is not accurate&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-no-inaccurate" name="why-no" value="not-accurate" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-no-long"&gt;&lt;span class="nds-label"&gt;Content is too long&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-no-long" name="why-no" value="too-long" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-no-other"&gt;&lt;span class="nds-label"&gt;Something else&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="checkbox" id="feedback-no-other" name="why-no" value="other" class="nds-check"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
            &lt;/fieldset&gt;

            &lt;!-- Gender (always shown in details step) --&gt;
            &lt;fieldset class="nds-form-group nds-radio-group nds-rowView nds-gender" data-required&gt;
              &lt;legend class="nds-label"&gt;I'm&lt;/legend&gt;
              &lt;div class="nds-form-container nds-radio-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-gender-male"&gt;&lt;span class="nds-label"&gt;Male&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="radio" id="feedback-gender-male" name="gender" value="male" class="nds-radio"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-container nds-radio-container"&gt;
                &lt;div class="nds-form-header"&gt;
                  &lt;label for="feedback-gender-female"&gt;&lt;span class="nds-label"&gt;Female&lt;/span&gt;&lt;/label&gt;
                &lt;/div&gt;
                &lt;div class="nds-form-control"&gt;
                  &lt;input type="radio" id="feedback-gender-female" name="gender" value="female" class="nds-radio"&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
            &lt;/fieldset&gt;

          &lt;/div&gt;

          &lt;!-- Free-text comment --&gt;
          &lt;div class="nds-user-feedback-comment"&gt;
            &lt;div class="nds-form-container nds-textarea"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="feedback-comment"&gt;&lt;span class="nds-label"&gt;Feedback&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;textarea id="feedback-comment" name="comment" class="nds-textarea"
                    placeholder="Enter your message..." rows="4"&gt;&lt;/textarea&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Step 3: Submit row (JS shows/hides) --&gt;
        &lt;div class="nds-user-feedback-submit" hidden&gt;
          &lt;span class="nds-user-feedback-agreement"&gt;
            For more information you may review &lt;a href="#"&gt;e-participation statement&lt;/a&gt;
            and &lt;a href="#"&gt;rules of engagement.&lt;/a&gt;
          &lt;/span&gt;
          &lt;button class="nds-user-feedback-submit-btn nds-btn nds-primary" data-answer="submit" aria-label="Submit"&gt;
            &lt;span class="nds-label"&gt;Submit&lt;/span&gt;
          &lt;/button&gt;
        &lt;/div&gt;

      &lt;/div&gt;
    &lt;/form&gt;
  &lt;/div&gt;
&lt;/section&gt;
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
</section>

<!-- Built-in Features -->
<section id="userFeedbackFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates on every <code class="nds-inline-code lang-html">.nds-user-feedback</code> element on the page. All click handlers and state transitions wire up without any JavaScript calls.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-flow"></i>
                        <span class="nds-label">Guided Answer Flow</span>
                    </span>
                    <p class="nds-item-desc">Clicking Yes or No reveals a tailored follow-up form for that answer, hiding the other branch. Closing resets the entire widget back to the initial question state.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cookie"></i>
                        <span class="nds-label">Submission Memory</span>
                    </span>
                    <p class="nds-item-desc">Saves a cookie keyed to the current page path for 365 days. Returning visitors see the confirmation message instead of being presented the survey again.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translate"></i>
                        <span class="nds-label">Bilingual Feedback Messages</span>
                    </span>
                    <p class="nds-item-desc">Reads the page language from the <code class="nds-inline-code lang-html">lang</code> attribute and delivers success and error messages in Arabic or English automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-task-done-01"></i>
                        <span class="nds-label">Form Validation</span>
                    </span>
                    <p class="nds-item-desc">Uses <code class="nds-inline-code lang-html">data-required</code> and <code class="nds-inline-code lang-html">data-min-checked</code> on fieldsets to validate before submission. Inline error messages surface directly below the failing field.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-bottom"></i>
                        <span class="nds-label">Page Section Wrapper</span>
                    </span>
                    <p class="nds-item-desc">The <code class="nds-inline-code lang-html">nds-user-feedback-section</code> class on the enclosing section applies a primary-color top border and neutral background for standard bottom-of-page placement.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="userFeedbackGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Include the widget via <code class="nds-inline-code lang-html">{% raw %}{% include user-feedback.html %}{% endraw %}</code>. It is automatically rendered at the bottom of every <code class="nds-inline-code lang-html">page</code> layout unless <code class="nds-inline-code lang-html">hideFeedback: true</code> is set in the page front matter</li>
                    <li>Use <code class="nds-inline-code lang-html">hideFeedback: true</code> on transactional pages such as checkout flows, multi-step forms, or confirmation screens where user attention should remain on the task</li>
                    <li>Tailor the <code class="nds-inline-code lang-html">.nds-why-yes</code> and <code class="nds-why-no">.nds-why-no</code> checkbox options in the include to match the type of content on the page</li>
                    <li>Keep both checkbox lists to four to six options. Long lists reduce completion rates and produce noisier data</li>
                    <li>Do not use this as the only feedback channel for critical issues. The widget collects qualitative signals, not bug reports. Pair it with a link to a dedicated support form</li>
                    <li>Connect your data collection endpoint via the form's <code class="nds-inline-code lang-html">action</code> attribute or by intercepting the submit event before the component's handler runs, since the component itself does not make a network request</li>
                    <li>Use <code class="nds-inline-code lang-html">data-success-message</code> and <code class="nds-inline-code lang-html">data-error-message</code> on the <code class="nds-inline-code lang-html">.nds-user-feedback</code> element only when the built-in bilingual defaults do not match your page's tone</li>
                    <li>The <code class="nds-inline-code lang-html">.nds-user-feedback-statistic</code> span is optional. Remove it if you do not have real satisfaction data to display</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-answer="Yes|No"</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-btn</code> (answer buttons)</td>
                            <td>Tells the JS which follow-up branch to reveal. Must be exactly <code class="nds-inline-code lang-html">Yes</code> or <code class="nds-inline-code lang-html">No</code> (capitalized).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-required</code></td>
                            <td><code class="nds-inline-code lang-html">fieldset</code></td>
                            <td>Marks a checkbox or radio group as required. At least one option must be selected before submission proceeds.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-min-checked="N"</code></td>
                            <td><code class="nds-inline-code lang-html">fieldset</code></td>
                            <td>Requires at least N checkboxes to be selected. Used on the yes branch to encourage multiple selections.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-feedback-target</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-form-footer</code></td>
                            <td>Marks the element where NDS.Forms injects inline validation error messages for that field group.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-success-message</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-user-feedback</code></td>
                            <td>Overrides the default success message. Defaults to "Your feedback is submitted!" (English) or "تم استلام ملاحظتك!" (Arabic).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-error-message</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-user-feedback</code></td>
                            <td>Overrides the default error message. Defaults to "An error occurred, please try again" (English) or "حدث خطأ، يرجى المحاولة مرة أخرى" (Arabic).</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The component auto-initializes on page load. Call <code class="nds-inline-code lang-js">NDS.UserFeedback.init()</code> again after dynamically adding a widget to the DOM.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-javascript line-numbers">
// Re-initialize after dynamically inserting a .nds-user-feedback element
NDS.UserFeedback.init();

// The component depends on two other modules:
// - NDS.Feedback  — renders the inline success/error confirmation message
// - NDS.Cookies   — persists submission state per page path for 365 days
// Both are included in the standard NDS bundle and initialize automatically.
</code>
                </div>
            </div>

        </div>
    </div>
</section>
