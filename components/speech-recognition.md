---
layout: page
title: Speech Recognition
hero_title: Speech Recognition - National Design System
hero_description: A voice-to-text plugin that lets users dictate into any text input, with automatic language detection for Arabic and English, audio feedback, and a programmatic API for custom integrations.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Overview -->
<section id="speechOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Voice Input on a Form Field</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-voice-input</code> to any action button inside a form container to activate speech-to-text. The button toggles listening on and off, and the transcript is written directly into the input.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Search with Voice Input</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="max-width: 480px; width: 100%;">
                            <div class="nds-form-container nds-search">
                                <div class="nds-form-control-wrapper">
                                    <div class="nds-form-control">
                                        <i class="nds-icon nds-hgi-search-01 nds-form-leading-icon" aria-hidden="true"></i>
                                        <input type="text" id="speech-demo-input-1" class="nds-search-input" name="search"
                                            placeholder="Search services...">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear search" hidden>
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-voice-input" type="button" aria-label="Start voice input">
                                                <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="nds-form-footer" data-feedback-target hidden></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-speech-overview-1" id="tab-speech-overview-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-speech-overview-1"
                                    aria-labelledby="tab-speech-overview-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-search"&gt;
  &lt;div class="nds-form-control-wrapper"&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;i class="nds-icon nds-hgi-search-01 nds-form-leading-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;input type="text" id="search-input-1" class="nds-search-input" name="search"
        placeholder="Search services..."&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear search" hidden&gt;
          &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-voice-input" type="button" aria-label="Start voice input"&gt;
          &lt;i class="nds-icon nds-hgi-mic-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
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
</section>

<!-- Built-in Features -->
<section id="speechFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Any button with <code class="nds-inline-code lang-html">nds-voice-input</code> inside an NDS form container is wired automatically when the form module loads. No extra JS required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-language-circle"></i>
                        <span class="nds-label">Automatic Language Detection</span>
                    </span>
                    <p class="nds-item-desc">Reads the page language at recognition start and sets <code class="nds-inline-code lang-html">ar-SA</code> for Arabic pages or <code class="nds-inline-code lang-html">en-US</code> for English, with no manual configuration needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-voice"></i>
                        <span class="nds-label">Live Interim Transcripts</span>
                    </span>
                    <p class="nds-item-desc">Partial results appear in the field as you speak, styled in italic to distinguish them from committed text. The final transcript replaces them when speech ends.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-volume-high"></i>
                        <span class="nds-label">Audio Feedback Tones</span>
                    </span>
                    <p class="nds-item-desc">A short tone plays when the microphone opens (high pitch), closes (low pitch), or encounters an error (very low pitch), giving clear non-visual feedback during dictation.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-timer-02"></i>
                        <span class="nds-label">30-Second Timeout</span>
                    </span>
                    <p class="nds-item-desc">Listening automatically stops after 30 seconds of inactivity and shows a localized timeout message in the input placeholder, preventing the microphone from staying open indefinitely.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Access <code class="nds-inline-code lang-js">NDS.VoiceRecognition</code> directly to create recognition instances, handle transcript callbacks, and wire voice input to custom UI elements outside the standard form container.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="speechGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use voice input on search fields and long free-text inputs where typing is burdensome. Short, constrained fields like phone numbers, postcodes, or PIN codes are not good candidates.</li>
                    <li>Use <a class="nds-color" href="{{ 'components/forms' | relative_url }}">the search input variant</a> (<code class="nds-inline-code lang-html">nds-search-input</code>) for search fields. It includes the microphone button slot alongside the clear button by design.</li>
                    <li>Do not add voice input to password fields, OTP fields, or other security-sensitive inputs where dictation could expose credentials to bystanders or screen-recording software.</li>
                    <li>Do not add voice input to <code class="nds-inline-code lang-html">&lt;select&gt;</code>, <code class="nds-inline-code lang-html">&lt;textarea&gt;</code>, or read-only inputs. The plugin targets the primary text input inside the form control and relies on setting <code class="nds-inline-code lang-html">.value</code> directly.</li>
                    <li>Always provide a visible microphone icon in the button so users can identify it without reading the <code class="nds-inline-code lang-html">aria-label</code>. Use the <code class="nds-inline-code lang-html">nds-hgi-mic-01</code> UI icon for consistency with the rest of NDS.</li>
                    <li>Graceful degradation is automatic: if the browser does not support the Web Speech API the button is hidden and the input works as a normal text field. Do not write your own feature-detect.</li>
                    <li>The plugin requires microphone permission from the browser. Pair it with a visible permission explanation or tooltip when the feature is prominent in a service flow, so users understand why they are being prompted.</li>
                    <li>In Arabic layouts the plugin sets <code class="nds-inline-code lang-html">lang="ar-SA"</code> on the recognition instance automatically. You do not need to set <code class="nds-inline-code lang-html">dir</code> or <code class="nds-inline-code lang-html">lang</code> on the input itself.</li>
                    <li>For custom integrations using the <code class="nds-inline-code lang-js">VoiceRecognition</code> API directly, always call <code class="nds-inline-code lang-js">isSupported()</code> first and guard the rest of your code behind it.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Error Messages</h3>
                <p>When recognition fails, the plugin sets a localized message as the input placeholder for 3 seconds. These messages are bilingual and chosen automatically by page language.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Error Code</th><th>English Message</th><th>Arabic Message</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">no-speech</code></td><td>No speech detected</td><td>لم يتم اكتشاف صوت</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">not-allowed</code></td><td>Microphone permission required</td><td>مطلوب إذن الميكروفون</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">audio-capture</code></td><td>Microphone access denied</td><td>تم رفض الوصول للميكروفون</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">network</code></td><td>Network error</td><td>خطأ في الشبكة</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">aborted</code></td><td>Voice input cancelled</td><td>تم إلغاء إدخال الصوت</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">language-not-supported</code></td><td>Language not supported</td><td>اللغة غير مدعومة</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.VoiceRecognition</strong> module is exposed for custom integrations. Use it to attach voice input to elements outside the standard NDS form container, or to build custom recording UI with full control over transcript handling.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
const VR = NDS.VoiceRecognition;

// ── Browser support check ─────────────────────────────
if (!VR.isSupported()) {
    // Web Speech API not available — hide mic UI
}

// ── Detected language ────────────────────────────────
// Returns 'ar-SA' on Arabic pages, 'en-US' on English pages
const lang = VR.getLanguage();

// ── Create a recognition instance ────────────────────
// Accepts any SpeechRecognition property as an override
const recognition = VR.create({
    continuous: false,       // stop after first utterance (default)
    interimResults: true,    // stream partial transcripts (default)
    maxAlternatives: 1       // number of alternatives (default)
});

// ── Start listening ───────────────────────────────────
VR.startListening(recognition, {
    onStart: function() {
        // Microphone is open, audio tone plays automatically
    },
    onResult: function(result) {
        // result.final       — committed transcript so far
        // result.interim     — partial transcript in progress
        // result.isFinal     — true when the utterance is complete
        myInput.value = result.isFinal ? result.final : result.interim;
    },
    onError: function(errorCode) {
        // errorCode: 'no-speech' | 'not-allowed' | 'audio-capture'
        //            | 'network' | 'aborted' | 'language-not-supported'
        console.warn('Voice error:', errorCode);
    },
    onEnd: function(finalTranscript) {
        // Called when recognition session ends (normally or on error)
        // finalTranscript — the full committed text
    }
});

// ── Stop listening ────────────────────────────────────
VR.stopListening(recognition);

// ── Audio feedback tones (called automatically by the plugin) ─
VR.audioFeedback.start();   // high-pitch tone — microphone open
VR.audioFeedback.end();     // low-pitch tone  — session ended
VR.audioFeedback.error();   // very low tone   — error occurred
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
