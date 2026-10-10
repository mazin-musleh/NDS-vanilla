---
layout: page
title: User Feedback
hero_title: User Feedback - National Design System
hero_description: A widget at the end of a page that asks the visitor what they think, then opens a short form and confirms the answer
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
hideFeedback: true
---

<section id="user-feedback-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

User feedback is a widget at the end of a page. It asks the visitor what they think, in three steps: a question, a follow-up form, and a success message. The Survey structure asks a Yes or No question about the page. The Rating structure asks for a star score for a service. The widget sits in a form, which it validates and sends on Submit.

Pick another component when:

- the user gives a star score inside a form or a card: [Rating](../components/rating)
- the user reports a problem or sends a request: a form built from [Forms](../components/forms)

</div>
  </div>
</section>

<section id="user-feedback-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="uf-survey" data-canon data-preview="page" data-preview-height="fit" data-form data-variants="user-feedback-variants-table">
<section id="user-feedback" class="nds-user-feedback-section nds-content-section">
  <div class="nds-section-body">
    <form class="nds-form">
      <div class="nds-user-feedback">
        <div class="nds-user-feedback-overview">
          <span class="nds-user-feedback-question">Was this page useful?</span>
          <!-- The script writes the success or error message here -->
          <span class="nds-user-feedback-status" hidden></span>
          <div class="nds-user-feedback-answer-btn">
            <button type="button" class="nds-btn nds-primary nds-md" data-answer="Yes">
              <span class="nds-label">Yes</span>
            </button>
            <button type="button" class="nds-btn nds-primary nds-md" data-answer="No">
              <span class="nds-label">No</span>
            </button>
          </div>
          <span class="nds-user-feedback-statistic">60% of users said Yes from 2843 Feedbacks</span>
          <button type="button" class="nds-user-feedback-close nds-btn nds-secondary-outline nds-md" aria-label="Close feedback" hidden>
            <span class="nds-label">Close</span>
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>
        <div class="nds-user-feedback-details" hidden>
          <div class="nds-user-feedback-options">
            <fieldset class="nds-form-group nds-check-group nds-why-yes" data-min-checked="2" aria-describedby="feedback-yes-hint">
              <legend>
                <span class="nds-label">Please tell us why</span>
              </legend>
              <span class="nds-note" id="feedback-yes-hint">(you can select multiple options)</span>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-yes-relevant"><span class="nds-label">Content is relevant</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-yes-relevant" name="why-yes" value="relevant" class="nds-check">
                </div>
              </div>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-yes-written"><span class="nds-label">It was well written</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-yes-written" name="why-yes" value="well-written" class="nds-check">
                </div>
              </div>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-yes-layout"><span class="nds-label">The layout made it easy to read</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-yes-layout" name="why-yes" value="easy-layout" class="nds-check">
                </div>
              </div>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-yes-other"><span class="nds-label">Something else</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-yes-other" name="why-yes" value="other" class="nds-check">
                </div>
              </div>
              <div class="nds-form-footer" data-feedback-target hidden></div>
            </fieldset>
            <fieldset class="nds-form-group nds-check-group nds-why-no" data-required aria-describedby="feedback-no-hint">
              <legend>
                <span class="nds-label">Please tell us why</span>
              </legend>
              <span class="nds-note" id="feedback-no-hint">(you can select multiple options)</span>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-no-irrelevant"><span class="nds-label">Content is not relevant</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-no-irrelevant" name="why-no" value="not-relevant" class="nds-check">
                </div>
              </div>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-no-inaccurate"><span class="nds-label">Content is not accurate</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-no-inaccurate" name="why-no" value="not-accurate" class="nds-check">
                </div>
              </div>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-no-long"><span class="nds-label">Content is too long</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-no-long" name="why-no" value="too-long" class="nds-check">
                </div>
              </div>
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="feedback-no-other"><span class="nds-label">Something else</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="feedback-no-other" name="why-no" value="other" class="nds-check">
                </div>
              </div>
              <div class="nds-form-footer" data-feedback-target hidden></div>
            </fieldset>
            <fieldset class="nds-form-group nds-radio-group nds-horizontal nds-gender" data-required>
              <legend class="nds-label">I'm</legend>
              <div class="nds-form-container nds-radio-container">
                <div class="nds-form-header">
                  <label for="feedback-gender-male"><span class="nds-label">Male</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="radio" id="feedback-gender-male" name="gender" value="male" class="nds-radio">
                </div>
              </div>
              <div class="nds-form-container nds-radio-container">
                <div class="nds-form-header">
                  <label for="feedback-gender-female"><span class="nds-label">Female</span></label>
                </div>
                <div class="nds-form-control">
                  <input type="radio" id="feedback-gender-female" name="gender" value="female" class="nds-radio">
                </div>
              </div>
              <div class="nds-form-footer" data-feedback-target hidden></div>
            </fieldset>
          </div>
          <div class="nds-user-feedback-comment">
            <div class="nds-form-container nds-textarea">
              <div class="nds-form-header">
                <label for="feedback-comment"><span class="nds-label">Feedback</span></label>
              </div>
              <div class="nds-form-control">
                <textarea id="feedback-comment" name="comment" class="nds-textarea" placeholder="Enter your message..." rows="4"></textarea>
              </div>
              <div class="nds-form-footer" data-feedback-target hidden></div>
            </div>
          </div>
        </div>
        <div class="nds-user-feedback-submit" hidden>
          <span class="nds-user-feedback-agreement">For more information you may review <a href="#">e-participation statement</a> and <a href="#">rules of engagement.</a></span>
          <button class="nds-user-feedback-submit-btn nds-btn nds-primary">
            <span class="nds-label">Submit</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</section>
</script>
<script type="text/html" id="uf-rating" data-canon data-form>
<section id="service-rating" class="nds-user-feedback-section nds-content-section">
  <div class="nds-section-body">
    <form class="nds-form">
      <div class="nds-user-feedback nds-user-feedback-rating">
        <div class="nds-user-feedback-overview">
          <span class="nds-user-feedback-question">This service is rated with an average of <strong>3.9</strong></span>
          <!-- Replaces the question after a submit. The script writes the score -->
          <span class="nds-user-feedback-recap">You rated this service as <strong data-rating-score>(0.0)</strong></span>
          <div class="nds-user-feedback-score">
            <div class="nds-rating nds-md nds-brand" data-rating="3.9">
              <span class="nds-rating-star" aria-hidden="true"></span>
              <span class="nds-rating-star" aria-hidden="true"></span>
              <span class="nds-rating-star" aria-hidden="true"></span>
              <span class="nds-rating-star" aria-hidden="true"></span>
              <span class="nds-rating-star" aria-hidden="true"></span>
            </div>
            <span class="nds-user-feedback-statistic">1544 reviews</span>
          </div>
          <!-- Shows while the form is open -->
          <div class="nds-user-feedback-prompt">
            <span class="nds-user-feedback-title">Tell us what you think of this service</span>
            <p>Please don't include personal or financial information. Your review will be submitted and recorded to improve services.</p>
          </div>
          <!-- The script writes the success or error message here -->
          <span class="nds-user-feedback-status" hidden></span>
          <div class="nds-user-feedback-answer-btn">
            <button type="button" class="nds-btn nds-primary nds-md" data-answer="rate">
              <span class="nds-label">Rate this service</span>
            </button>
          </div>
          <button type="button" class="nds-user-feedback-close nds-btn nds-secondary-outline nds-md" aria-label="Close feedback" hidden>
            <span class="nds-label">Close</span>
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>
        <div class="nds-user-feedback-details" hidden>
          <div class="nds-user-feedback-options">
            <fieldset class="nds-form-group" data-required aria-describedby="service-rating-hint">
              <legend>
                <span class="nds-label">How would you rate this service?</span>
              </legend>
              <span class="nds-note" id="service-rating-hint">Rate your experience from (1) poor to (5) excellent</span>
              <div class="nds-rating nds-md nds-brand" data-rating="0">
                <button class="nds-rating-star" type="button" aria-label="1 star"></button>
                <button class="nds-rating-star" type="button" aria-label="2 stars"></button>
                <button class="nds-rating-star" type="button" aria-label="3 stars"></button>
                <button class="nds-rating-star" type="button" aria-label="4 stars"></button>
                <button class="nds-rating-star" type="button" aria-label="5 stars"></button>
              </div>
              <!-- Sends the score with the form. The script writes it on submit -->
              <input type="hidden" name="rating" value="0" data-rating-value>
              <div class="nds-form-footer" data-feedback-target hidden></div>
            </fieldset>
          </div>
          <div class="nds-user-feedback-comment">
            <div class="nds-form-container nds-textarea">
              <div class="nds-form-header">
                <label for="service-rating-comment"><span class="nds-label">Feedback</span></label>
              </div>
              <div class="nds-form-control">
                <textarea id="service-rating-comment" name="comment" class="nds-textarea" placeholder="Enter your message..." rows="4"></textarea>
              </div>
              <div class="nds-form-footer" data-feedback-target hidden></div>
            </div>
          </div>
        </div>
        <div class="nds-user-feedback-submit" hidden>
          <span class="nds-user-feedback-agreement">For more information you may review <a href="#">e-participation statement</a> and <a href="#">rules of engagement.</a></span>
          <button class="nds-user-feedback-submit-btn nds-btn nds-primary">
            <span class="nds-label">Submit</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</section>
</script>
<script>
// Demo only: the preview forgets each submit, so the next render asks again.
document.addEventListener('nds:userfeedback:submit', function () {
  setTimeout(function () {
    NDS.Cookies.delete('nds-feedback' + location.pathname.replace(/\//g, '_').replace(/\./g, '-'));
  });
});
</script>
    </div>
  </div>
</section>

<section id="user-feedback-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each structure is the whole page section, form included. Submit validates the form, so keep the `<form class="nds-form">`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Survey (default) | — | — | A Yes or No question about the page, with reasons for each answer. Content pages |
| Structure | Rating | canon `#uf-rating` | — | A star score for a service, with a comment. Service pages |
| Statistic | No statistic | remove | `.nds-user-feedback-statistic` | Leave it out when you have no real numbers to show |
| Memory | Ask every visit (hint: No cookie saves the answer) | `[data-no-persist]` | `.nds-user-feedback` | No cookie: the widget asks again on every visit |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #user-feedback-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="user-feedback-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Survey

Yes or No opens the follow-up form with the reasons for that answer: `.nds-why-yes` or `.nds-why-no`. The other fields, such as the comment, show for both answers. Close clears every field and goes back to the question.

### Rating

The widget shows the average score and the review count. The button opens a star rating with a comment. On submit, the script writes the chosen score into the hidden `data-rating-value` input, so the form sends it. It also writes the score into the recap, which replaces the question.

### Submit

After the checks pass, Submit sends the form data to the form's `action` with [NDS.request](../core/request). A spinner shows until the reply. A reply from 200 to 299 shows the success message. Any other reply, or no reply, shows the error message and keeps the form open, so the visitor can send it again. With no `action`, the success message shows at once. The built-in send posts `multipart/form-data` with no custom headers, and ignores the reply body. For JSON or a header, send the data yourself.

### Your Own Request

To send the data another way, listen for `nds:userfeedback:submit` and call `preventDefault()`. Send `e.detail.data`, then call `NDS.UserFeedback.showStatus()` with `'success'` or `'error'`. The messages work as they do for an `action`, but the spinner is yours to show. The example is in the API section.

`e.detail.data` holds each checked box as its own entry with the same name. For a JSON body, read a group with `data.getAll('why-yes')`: `Object.fromEntries()` keeps only the last box.

</div>
  </div>
</section>

<section id="user-feedback-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The loader starts every <code class="nds-inline-code lang-html">.nds-user-feedback</code> on the page. No init call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cookie"></i>
            <span class="nds-label">Submission Memory</span>
          </span>
          <p class="nds-item-desc">After a success, a cookie for the page path is saved for 365 days. On the next visit, the widget shows the success message instead of the question. The cookie is necessary, so it needs no consent.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Bilingual Feedback Messages</span>
          </span>
          <p class="nds-item-desc">The success and error messages follow the page language, Arabic or English.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-task-done-01"></i>
            <span class="nds-label">Form Validation</span>
          </span>
          <p class="nds-item-desc">Submit checks every field rule, such as <code class="nds-inline-code lang-html">data-required</code> and <code class="nds-inline-code lang-html">data-min-checked</code>, before it sends. Focus moves to the first field that fails.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sent"></i>
            <span class="nds-label">Scroll After Submit</span>
          </span>
          <p class="nds-item-desc">When the message shows and the widget is hidden under the sticky navigation, the page scrolls the widget back into view.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Mobile Layout</span>
          </span>
          <p class="nds-item-desc">On phones, each row stacks, and Close moves to the top of the widget.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="user-feedback-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put the widget after the main content, as the last section of the page.
- Use Survey on content pages, where the question is about the page. Use Rating on service pages, where the visitor judges the service.
- Set `action` on the form to your endpoint, or send the data yourself from `nds:userfeedback:submit`. Without either, nothing is sent.
- Leave the widget off task pages, such as a checkout, a multi-step form or a confirmation screen. The visitor's attention belongs on the task.
- Write reasons that fit the page, four to six in each list.
- Remove the statistic when you have no real numbers to show. In Rating, write the real average in the question and in `data-rating`.
- Keep the `.nds-note` after the legend, not inside it. The group's name then stays short, and a screen reader still reads the note through `aria-describedby`.
- Do not make the widget the only way to report a problem. Link to a support form too.
- On a page built with the NDS layouts, the layout adds the Survey. Set `feedback_type: rating` in the front matter for Rating, or `hideFeedback: true` for none. `rating: true` is a different key: the hero's rating menu.

</div>
  </div>
</section>

<section id="user-feedback-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-user-feedback-section` | the page section | Primary top border and the default background |
| `nds-why-yes`, `nds-why-no` | a fieldset in the details | Shows only for the matching answer |
| `nds-user-feedback-statistic` | a span | Hides while the form is open |
| `nds-user-feedback-rating` | `.nds-user-feedback` | The Rating structure. It shows the prompt while the form is open, and the recap after a success |
| `nds-user-feedback-score` | the stars and the review count | Keeps them on one line. Hides while the form is open |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-answer` | an answer button | `Yes` or `No`, with a capital letter, opens the matching reasons. Any other value, such as `rate`, opens the form with no reasons |
| `data-answer` | `.nds-user-feedback` | Set by the script: `yes` or `no`. Close removes it |
| `data-state` | `.nds-user-feedback` | Set by the script: `details` while the form is open, `status` after a success. `status` hides the question and the answer buttons. There is no value at the question step |
| `data-success-message` | `.nds-user-feedback` | Replaces the success message, as plain text, in every language. The default is "Your feedback is submitted!" or «تم استلام ملاحظتك!» |
| `data-error-message` | `.nds-user-feedback` | Replaces the error message, as plain text, in every language. The default is "An error occurred, please try again" or «حدث خطأ، يرجى المحاولة مرة أخرى» |
| `data-no-persist` | `.nds-user-feedback` | No cookie: the widget never shows a saved success and never saves one |
| `data-rating-value` | a hidden input | Receives the chosen score on submit |
| `data-rating-score` | an element in the recap | Shows the chosen score, as `(4.0)` |
| `action`, `method` | the form | Where Submit sends the form data. The default method is `POST` |
{: .nds-table .nds-responsive}

The field rules (`data-required`, `data-min-checked`) and `data-feedback-target` work as on every field. See [Forms](../components/forms).

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--userfeedback-scroll-offset` | `120px` | Space between the sticky navigation and the widget after the scroll. Set it on `.nds-user-feedback` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.UserFeedback.init()` | Starts every `.nds-user-feedback` that is not started. `reinit()` does the same |
| `NDS.UserFeedback.create(el)` | Starts one widget |
| `NDS.UserFeedback.destroy(el)` | Removes the widget's listeners, so `create()` can start it again |
| `NDS.UserFeedback.showStatus(el, status)` | Ends a send that your listener took over: `'success'` (default) or `'error'` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:userfeedback:submit` | `.nds-user-feedback` (bubbles, cancelable) | `{ form, data }`. `data` is the form's `FormData`. It fires after the form passes its checks |
{: .nds-table .nds-responsive}

<script type="text/html" id="uf-js" data-canon data-lang="js">
document.addEventListener('nds:userfeedback:submit', function (e) {
  e.preventDefault();
  var widget = e.target;
  var csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  NDS.request('/api/feedback', {
    method: 'POST',
    body: e.detail.data,
    headers: { 'X-CSRF-Token': csrfToken }
  }).then(function () {
    NDS.UserFeedback.showStatus(widget, 'success');
  }, function () {
    NDS.UserFeedback.showStatus(widget, 'error');
  });
});
</script>

The full API is in the banner of `_js/nds-user-feedback.js`.

</div>
  </div>
</section>

<section id="user-feedback-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Service template](../templates/service-template): the Rating structure at the end of a service page.
- Every page built with the NDS `page` and `console` layouts ends with the Survey structure.

</div>
  </div>
</section>
