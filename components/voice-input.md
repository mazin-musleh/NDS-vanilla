---
layout: page
title: Voice Input
hero_title: Voice Input - National Design System
hero_description: A voice input button types what the user says into a text field, in the page language
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 11:59 PM"
---

<section id="voice-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Voice input is a microphone (mic) button for a text field. The user clicks it and speaks. The browser's speech recognition (the Web Speech API) writes the words into the field. The button sits in the field's action area, next to the clear button. It can also sit anywhere on the page and name its field.

Pick another component when:

- the field takes a fixed format, such as a phone number, a postcode or an ID: a plain text field in [Forms](../components/forms)

</div>
  </div>
</section>

<section id="voice-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="voice-field" data-canon data-variants="voice-variants-table" data-demo-width="400px">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="voice-search">
      <span class="nds-label">Search services</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
    <input type="text" id="voice-search" name="search" placeholder="Search services...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear search" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-voice-input nds-icon-only" type="button" aria-label="Start voice input" aria-pressed="false">
        <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="voice-textarea" data-canon>
<div class="nds-form-container nds-textarea">
  <div class="nds-form-header">
    <label for="voice-message">
      <span class="nds-label">Describe your request</span>
    </label>
  </div>
  <div class="nds-form-control">
    <textarea id="voice-message" class="nds-textarea" name="message" rows="4" placeholder="Enter your message..."></textarea>
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-voice-input nds-icon-only" type="button" aria-label="Start voice input" aria-pressed="false">
        <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="voice-search-box" data-canon>
<div class="nds-form-container nds-search-box">
  <div class="nds-search-content">
    <div class="nds-form-control">
      <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
      <input type="text" id="voice-query" class="nds-search-input" name="q" placeholder="Search..." aria-label="Search">
      <div class="nds-form-action">
        <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear search" hidden>
          <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
        <button class="nds-btn nds-subtle nds-voice-input nds-icon-only" type="button" aria-label="Start voice input" aria-pressed="false">
          <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <button class="nds-btn nds-primary nds-search-btn" type="button">
      <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
      <span class="nds-label" data-hidden="sm sr">Search</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="voice-linked" data-canon>
<div class="nds-flex" style="--align: flex-end;">
  <div class="nds-form-container">
    <div class="nds-form-header">
      <label for="voice-comment">
        <span class="nds-label">Comments</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="text" id="voice-comment" name="comment" placeholder="Add a comment...">
    </div>
  </div>
  <button class="nds-btn nds-secondary-outline nds-icon-only nds-voice-input" type="button" data-voice-target="voice-comment" aria-label="Start voice input" aria-pressed="false">
    <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
  </button>
</div>
</script>
    </div>
  </div>
</section>

<section id="voice-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Search field (default) | — | — | A field with a search icon, a clear button and the voice button. The most common use |
| Structure | Text area | canon `#voice-textarea` | — | Long free text, such as a message. Each dictation adds at the caret |
| Structure | Search box | canon `#voice-search-box` | — | A search field with a Search button, at the top of a results page |
| Structure | Linked button | canon `#voice-linked` | — | The button sits outside the field and names it in `data-voice-target` |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #voice-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="voice-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Linked Button
{: .nds-block-title}

A button inside `.nds-form-control` dictates into that field's input or text area. A button anywhere else names its field in `data-voice-target`. The script finds the field on each click, so the field can load after the button. While the mic is open, the button's icon does not change color: the `listening` state is on the field's container, and the button is outside it.

</div>
  </div>
</section>

<section id="voice-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto Start</span>
          </span>
          <p class="nds-item-desc">The loader starts voice input when the page has a <code class="nds-inline-code lang-html">nds-voice-input</code> button. One click listener on the document serves every button, including buttons added later.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-language-circle"></i>
            <span class="nds-label">Page Language</span>
          </span>
          <p class="nds-item-desc">Each time the mic opens, the script reads <code class="nds-inline-code lang-html">lang</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code>. Recognition uses Arabic (<code class="nds-inline-code lang-html">ar-SA</code>) when it is <code class="nds-inline-code lang-html">ar</code>, and English (<code class="nds-inline-code lang-html">en-US</code>) for any other value. The field needs no <code class="nds-inline-code lang-html">lang</code> of its own.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-voice"></i>
            <span class="nds-label">Live Transcript</span>
          </span>
          <p class="nds-item-desc">Words show in the field while the user speaks. They go in at the caret, or over the selected text, and the rest of the text stays. A field the user was not in takes them at the end. The final text fires <code class="nds-inline-code lang-js">input</code> and <code class="nds-inline-code lang-js">change</code>, so a form treats it like typed text.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Mic State</span>
          </span>
          <p class="nds-item-desc">While the mic is open, the button has <code class="nds-inline-code lang-html">aria-pressed="true"</code> and the label "Stop voice input". A mic icon inside the field cycles color. The field gets the focus.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-volume-high"></i>
            <span class="nds-label">Audio Tones</span>
          </span>
          <p class="nds-item-desc">A high tone plays when the mic opens, a low tone when it closes, and a lower tone on an error.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-timer-02"></i>
            <span class="nds-label">Time Limit</span>
          </span>
          <p class="nds-item-desc">The mic closes 30 seconds after it opens, and the field shows a timeout message. It also closes when the button is removed from the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>
            <span class="nds-label">Error Messages</span>
          </span>
          <p class="nds-item-desc">An error shows under the field for 4 seconds, in the page language, and screen readers announce it. On a browser without speech recognition, a click shows a "not supported" message and the field still takes typed text.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="voice-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use voice input on search fields and long free-text fields. Typing these takes the most effort.
- Never add it to a password, OTP or other secret field. People near the user can hear what they say.
- Do not point it at a read-only field or a `<select>`. A read-only field still takes the text, and a `<select>` loses its choice.
- Write `aria-label="Start voice input"` and `aria-pressed="false"` on the button.
- Keep the `nds-hgi-mic-01` icon as an `<i>` directly inside the button. The color animation styles only that element.
- The browser asks for permission to use the mic the first time. When voice input is a main part of a service, say why in the info text.
- To hide voice input on a browser without speech recognition, remove the button when `NDS.VoiceInput.isSupported()` returns `false`. The JavaScript example below does this.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="voice-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-voice-target` | `.nds-voice-input` | The `id`, `name` or `data-name` of the field to dictate into. With it, the button can sit anywhere on the page |
| `data-target` | `.nds-voice-input` | The same as `data-voice-target`. The script reads it only when `data-voice-target` is absent |
| `aria-pressed` | `.nds-voice-input` | Write `false` at page load. The script sets `true` when the mic opens, and `false` when it closes |
| `aria-label` | `.nds-voice-input` | Write "Start voice input" at page load. The script sets "Stop voice input" when the mic opens. When it closes, the script sets "Start voice input" with the language name, such as "Start voice input (English)". Both labels are in the page language |
| `data-name` | the target `input` or `textarea` | The script matches the `data-voice-target` value against it when no `id` or `name` matches |
| `data-state~="listening"` | `.nds-form-container` of the target field | The script adds it when the mic opens, and removes it when the mic closes. It makes the mic icon cycle color |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.VoiceInput.init()` | Adds one click listener to the document for every voice button. The loader calls it on load. A second call does nothing |
| `NDS.VoiceInput.reinit()` | The same as `init()` |
| `NDS.VoiceInput.isSupported()` | Returns `true` when the browser has speech recognition |
{: .nds-table .nds-responsive}

Voice input fires no events of its own. When the final text lands, the field fires `input` and `change`. The full API is in the banner of `_js/nds-voice-input.js`.

<script type="text/html" id="voice-js" data-canon data-lang="js">
// Remove the buttons on a browser without speech recognition
if (!NDS.VoiceInput.isSupported()) {
  document.querySelectorAll('.nds-voice-input').forEach(function (button) {
    button.remove();
  });
}

// A dictation fires change, like typed text
document.getElementById('voice-search').addEventListener('change', function (e) {
  console.log(e.target.value);
});
</script>

### Messages
{: .nds-block-title}

The script shows these under the field for 4 seconds, in the page language. They are neutral, so the field is not marked invalid. While one shows, it takes the place of the field's validation message, which comes back after.

| Code | English | Arabic |
|---|---|---|
| `no-speech` | No speech detected | لم يتم اكتشاف صوت |
| `not-allowed` | Microphone permission required | مطلوب إذن الميكروفون |
| `audio-capture` | Microphone access denied | تم رفض الوصول للميكروفون |
| `network` | Network error | خطأ في الشبكة |
| `aborted` | Voice input cancelled | تم إلغاء إدخال الصوت |
| `language-not-supported` | Language not supported | اللغة غير مدعومة |
| `timeout` | Voice input timed out | انتهت مهلة إدخال الصوت |
| `unsupported` | Voice input is not supported in this browser | إدخال الصوت غير مدعوم في هذا المتصفح |
| Any other code | Voice input error | خطأ في إدخال الصوت |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="voice-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Search Template](../templates/search-template): a search box with clear and voice buttons above the results.
- [FAQ Template](../templates/faq-template): a search box that filters the questions. A click on the voice button also opens the All tab.
- [Services List](../examples/services-list): a search box with suggestions that filters the service cards.
- [Main Navigation](../ui-shell/mainnav): the site search panel has a voice button.

</div>
  </div>
</section>
