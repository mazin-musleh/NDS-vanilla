---
layout: page
title: Cooldown Button
hero_title: Cooldown Button - National Design System
hero_description: A button behavior that holds a loading state, fires an optional success toast, and runs a live countdown before re-enabling, for rate-limiting resend, retry, and any action you do not want repeated rapidly.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Resend with Success Toast -->
<section id="cooldownResend" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Resend with Success Toast</h2>
            <p class="nds-section-description">The full featured pattern for OTP, verification email, and password reset flows where the user needs explicit confirmation the action happened before the cooldown starts counting</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Resend Code</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                            <button type="button" class="nds-btn nds-primary nds-cooldown"
                                data-cooldown="30"
                                data-cooldown-loading="3"
                                data-cooldown-label="Resend in {s}s"
                                data-resend-label="Resend"
                                data-sent-title="Verification code sent"
                                data-sent-message="A new code has been sent to your mobile number.">
                                <span class="nds-label">Send code</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-cooldown-resend-1" id="tab-cooldown-resend-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-cooldown-resend-1"
                                    aria-labelledby="tab-cooldown-resend-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button type="button" class="nds-btn nds-primary nds-cooldown"
        data-cooldown="30"
        data-cooldown-loading="3"
        data-cooldown-label="Resend in {s}s"
        data-resend-label="Resend"
        data-sent-title="Verification code sent"
        data-sent-message="A new code has been sent to your mobile number."&gt;
  &lt;span class="nds-label"&gt;Send code&lt;/span&gt;
&lt;/button&gt;
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

<!-- Simple Cooldown -->
<section id="cooldownSimple" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Simple Cooldown</h2>
            <p class="nds-section-description">For rate-limited retry buttons where you just need to prevent rapid repeats without a confirmation step</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Retry</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                            <button type="button" class="nds-btn nds-secondary nds-cooldown"
                                data-cooldown="10"
                                data-cooldown-label="Try again in {s}s">
                                <span class="nds-label">Try again</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-cooldown-simple-1" id="tab-cooldown-simple-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-cooldown-simple-1"
                                    aria-labelledby="tab-cooldown-simple-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button type="button" class="nds-btn nds-secondary nds-cooldown"
        data-cooldown="10"
        data-cooldown-label="Try again in {s}s"&gt;
  &lt;span class="nds-label"&gt;Try again&lt;/span&gt;
&lt;/button&gt;
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
<section id="cooldownFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates on every <code class="nds-inline-code lang-html">.nds-cooldown</code> on the page and on any element added later. No wiring code required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-loading-03"></i>
                        <span class="nds-label">Optional Loading Phase</span>
                    </span>
                    <p class="nds-item-desc">Holds the button in the standard <code class="nds-inline-code lang-html">data-state="loading"</code> style for the configured number of seconds before the countdown starts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-timer-02"></i>
                        <span class="nds-label">Live Countdown Label</span>
                    </span>
                    <p class="nds-item-desc">Swaps the button label to your template every second, with <code class="nds-inline-code lang-html">{s}</code> replaced by the seconds remaining, until the cooldown ends.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-notification-square"></i>
                        <span class="nds-label">Built-in Success Toast</span>
                    </span>
                    <p class="nds-item-desc">Fires a success toast at the bottom of the viewport when the cooldown begins if <code class="nds-inline-code lang-html">data-sent-title</code> or <code class="nds-inline-code lang-html">data-sent-message</code> is set.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-reload"></i>
                        <span class="nds-label">Post-send Label Swap</span>
                    </span>
                    <p class="nds-item-desc">After the first completed cycle the button can show a different label (for example "Send code" becomes "Resend"). Abort during the loading phase keeps the original label.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Trigger the cycle from JS, abort a cooldown in flight, and hook four lifecycle events to wire your own side effects around the built-in behavior.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="cooldownGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use for <strong>resend flows</strong> where the backend imposes a per-user rate limit (OTP, verification email, password reset) and you want the UI to match that limit exactly</li>
                    <li>Use for <strong>retry buttons</strong> after a failed request, to stop users from hammering an endpoint that is already struggling</li>
                    <li>Use the optional loading phase to model a real network round trip: set <code class="nds-inline-code lang-html">data-cooldown-loading</code> to an estimate of the request duration, or trigger <code class="nds-inline-code lang-js">NDS.CooldownButton.reset()</code> from your response handler once the real request resolves</li>
                    <li>Do not use this component as a generic submit guard for forms. Use a regular disabled state tied to the form's submission lifecycle instead</li>
                    <li>Do not use it for long cooldowns (over a few minutes). The countdown reads as nagging and ties the user to the page. Show a timestamp and refresh-on-load instead</li>
                    <li>Set <code class="nds-inline-code lang-html">data-resend-label</code> when the first action and the repeat action read differently. "Send code" on first use and "Resend" on every cycle after is clearer than leaving "Resend" on a button that has never been clicked</li>
                    <li>Keep countdown templates short. "Resend in 30s" fits; a full sentence does not. The label redraws every second</li>
                    <li>Pair the built-in toast with a concrete confirmation message ("A new code has been sent to your mobile number.") rather than a generic "Success". Users need to know what succeeded</li>
                    <li>For custom toast variants, positions, or multi-step actions, skip <code class="nds-inline-code lang-html">data-sent-*</code> and listen for <code class="nds-inline-code lang-js">nds:cooldown:triggered</code>. Call <a class="nds-color" href="{{ 'components/alert' | relative_url }}">NDS.Alert</a>.create yourself with the full option set</li>
                    <li>Duration values under 5 seconds feel abrupt and may not give the toast time to be read. Duration values over 60 seconds should trigger a dedicated "please wait" screen, not a button label</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-cooldown</code></td><td>Seconds to hold the cooldown. Required to opt in. Non-positive values skip the cooldown entirely. Read once at wire time; editing after page load has no effect</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cooldown-loading</code></td><td>Seconds to hold the loading state before the countdown begins. Default <code class="nds-inline-code lang-html">0</code>, which skips the loading phase. Read once at wire time</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cooldown-label</code></td><td>Countdown text template. <code class="nds-inline-code lang-html">{s}</code> is replaced by the seconds remaining. Default <code class="nds-inline-code lang-html">{s}</code> (number only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-resend-label</code></td><td>Label to restore after the first completed cycle. Omit to keep the initial label across cycles. A mid-loading <code class="nds-inline-code lang-js">reset()</code> always restores the initial label</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-sent-title</code></td><td>Title of the success toast fired when the cooldown begins. Either this or <code class="nds-inline-code lang-html">data-sent-message</code> must be present for a toast to appear</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-sent-message</code></td><td>Description of the success toast fired when the cooldown begins. Toast uses variant <code class="nds-inline-code lang-html">success</code>, position <code class="nds-inline-code lang-html">bottom</code>, duration <code class="nds-inline-code lang-html">4000ms</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Events</h3>
                <p>All events bubble and fire on the button element. Listen for them to add custom behavior (analytics, alternate toasts, parallel UI updates) without replacing the built-in flow.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Event</th><th>Fires</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:loading</code></td><td>Loading phase begins. Skipped when <code class="nds-inline-code lang-html">data-cooldown-loading</code> is <code class="nds-inline-code lang-html">0</code> or absent</td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:triggered</code></td><td>Loading ends and the cooldown starts. The built-in toast (if configured) fires right after this. Best hook for custom toasts or analytics</td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:tick</code></td><td>Every second during the cooldown. <code class="nds-inline-code lang-js">event.detail.remaining</code> is the seconds left, including a first tick at the full duration</td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:end</code></td><td>Cooldown completed naturally or <code class="nds-inline-code lang-js">reset()</code> was called. Button is re-enabled and the label is restored</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.CooldownButton</strong> API provides programmatic control for dynamically added buttons and for aborting a cooldown in flight. Auto-initialization handles everything for static markup; no JS call is needed for the common case.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Auto-initialization ──────────────────────────────
// Every .nds-cooldown on the page is wired on page load.
// Elements added to the DOM later are wired automatically.
// Call init() manually only if you disabled the loader.
NDS.CooldownButton.init();

// ── Trigger the cycle programmatically ───────────────
// Useful when the cooldown should start from a flow other
// than the button's own click (e.g. after a form submit).
const btn = document.querySelector('#my-resend-btn');
NDS.CooldownButton.start(btn);

// ── Abort an in-flight cooldown ──────────────────────
// Re-enables the button, clears timers, restores label.
// During loading phase: restores the original label.
// During cooldown: restores the post-send (data-resend-label)
// label if set, otherwise the original.
NDS.CooldownButton.reset(btn);

// ── Listen for lifecycle events ──────────────────────
btn.addEventListener('nds:cooldown:triggered', () =&gt; {
    // Loading is done and the cooldown just started.
    // Fire a custom toast, log an analytics event, etc.
});

btn.addEventListener('nds:cooldown:tick', (e) =&gt; {
    console.log('seconds remaining:', e.detail.remaining);
});

btn.addEventListener('nds:cooldown:end', () =&gt; {
    // Button is re-enabled and restored.
});

// ── Bind the cooldown to a real request ──────────────
// Start the loading phase on click, then reset() early
// when the response arrives so the user is not blocked
// by a fake delay when the real one was shorter.
btn.addEventListener('click', async () =&gt; {
    try {
        await fetch('/api/resend', { method: 'POST' });
        // success: let the cooldown run as configured
    } catch (err) {
        // on failure, abort so the user can retry immediately
        NDS.CooldownButton.reset(btn);
    }
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
