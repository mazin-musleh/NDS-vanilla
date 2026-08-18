---
layout: page
title: Cooldown Button
hero_title: Cooldown Button - National Design System
hero_description: A button behavior that runs a live countdown before re-enabling, for rate-limiting resend, retry, and any action you do not want repeated rapidly.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.8.x"
last_edit: "18/08/2026 - 04:00 PM"
---

<!-- Resend with Loading State -->
<section id="cooldownResend" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Resend with Loading State</h2>
            <p class="nds-section-description">The full featured pattern for OTP, verification email, and password reset flows. The page stamps the loading state for as long as its request actually runs, while the button counts down underneath and comes back with a different label</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Resend Code</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-2xl);">
                                <button type="button" class="nds-btn nds-primary nds-cooldown"
                                    id="cooldown-demo-resend"
                                    data-cooldown="15"
                                    data-cooldown-label="Resend in {s}s"
                                    data-resend-label="Resend">
                                    <span class="nds-label">Send code</span>
                                </button>
                            </div>
                            <script>
                            document.addEventListener('DOMContentLoaded', function() {
                                var btn = document.getElementById('cooldown-demo-resend');
                                // The button owns the throttle and the countdown. The request, its
                                // loading state and its confirmation are the page's, all from here.
                                btn.addEventListener('nds:cooldown:triggered', function() {
                                    NDS.State.add(btn, 'loading');
                                    sendCode()
                                        .then(function() {
                                            NDS.Alert.create({
                                                variant: 'success',
                                                title: 'Verification code sent',
                                                description: 'A new code has been sent to your mobile number.',
                                                display: 'toast', position: 'top', duration: 4000
                                            });
                                        })
                                        .finally(function() {
                                            NDS.State.remove(btn, 'loading');
                                        });
                                });

                                // Stands in for the request this demo has no server for.
                                function sendCode() {
                                    return new Promise(function(resolve) { setTimeout(resolve, 1200); });
                                }
                            });
                            </script>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-cooldown-resend-1" id="tab-cooldown-resend-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                            aria-controls="panel-cooldown-resend-js" id="tab-cooldown-resend-js">
                                            <span class="nds-tab-label">JS API</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
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
        id="cooldown-demo-resend"
        data-cooldown="15"
        data-cooldown-label="Resend in {s}s"
        data-resend-label="Resend"&gt;
  &lt;span class="nds-label"&gt;Send code&lt;/span&gt;
&lt;/button&gt;
                                    </code>
                                    </div>
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-cooldown-resend-js"
                                        aria-labelledby="tab-cooldown-resend-js" hidden>
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-javascript code">// The button owns the throttle and the countdown. The request, its
// loading state and its confirmation are yours, all from this event.
// [data-state~="loading"] hides the label, so the countdown ticks under
// the spinner and is already correct when the state comes off.
var btn = document.getElementById('cooldown-demo-resend');

btn.addEventListener('nds:cooldown:triggered', function() {
    NDS.State.add(btn, 'loading');
    sendCode()
        .then(function() {
            NDS.Alert.create({
                variant: 'success',
                title: 'Verification code sent',
                description: 'A new code has been sent to your mobile number.',
                display: 'toast', position: 'top', duration: 4000
            });
        })
        .finally(function() {
            NDS.State.remove(btn, 'loading');
        });
});
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

<!-- Simple Cooldown -->
<section id="cooldownSimple" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Simple Cooldown</h2>
            <p class="nds-section-description">For rate-limited retry buttons where you just need to prevent rapid repeats without a confirmation step</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
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
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-cooldown-simple-1" id="tab-cooldown-simple-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
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
    </div>
</section>

<!-- Built-in Features -->
<section id="cooldownFeatures" class="nds-content-section nds-demo-section">
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
                        <p class="nds-item-desc">Activates on every <code class="nds-inline-code lang-html">.nds-cooldown</code> on the page and on any element added later. No wiring code required.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-loading-03"></i>
                            <span class="nds-label">Loading State Is Yours</span>
                        </span>
                        <p class="nds-item-desc">The component owns no loading phase, because a fixed timer cannot know how long a response takes. Stamp <code class="nds-inline-code lang-html">data-state="loading"</code> from <code class="nds-inline-code lang-js">nds:cooldown:triggered</code> and clear it when the response lands. The state hides the label, so the countdown ticks under the spinner.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-timer-02"></i>
                            <span class="nds-label">Live Countdown Label</span>
                        </span>
                        <p class="nds-item-desc">Swaps the button label to your template every second, with every <code class="nds-inline-code lang-html">{s}</code> replaced by the seconds remaining, until the cooldown ends.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-notification-square"></i>
                            <span class="nds-label">Confirmation You Control</span>
                        </span>
                        <p class="nds-item-desc">The component fires no toast of its own. Issue your request from <code class="nds-inline-code lang-js">nds:cooldown:triggered</code> and confirm from the response, so a failed send never reports success.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-reload"></i>
                            <span class="nds-label">Post-send Label Swap</span>
                        </span>
                        <p class="nds-item-desc">After the first completed cycle the button can show a different label (for example "Send code" becomes "Resend").</p>
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
    </div>
</section>

<!-- Usage Guidelines -->
<section id="cooldownGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use for <strong>resend flows</strong> where the backend imposes a per-user rate limit (OTP, verification email, password reset) and you want the UI to match that limit exactly</li>
                    <li>Use for <strong>retry buttons</strong> after a failed request, to stop users from hammering an endpoint that is already struggling</li>
                    <li>Show loading with the button's own <code class="nds-inline-code lang-html">data-state="loading"</code>: add it from <code class="nds-inline-code lang-js">nds:cooldown:triggered</code> and remove it when the response lands. Never model the wait with a fixed timer — it is wrong whichever way the real request goes</li>
                    <li>Call <code class="nds-inline-code lang-js">NDS.CooldownButton.reset()</code> when the request fails, so the user can retry at once rather than serving out a cooldown for a call that never reached the server</li>
                    <li>Do not use this component as a generic submit guard for forms. Use a regular disabled state tied to the form's submission lifecycle instead</li>
                    <li>Do not use it for long cooldowns (over a few minutes). The countdown reads as nagging and ties the user to the page. Show a timestamp and refresh-on-load instead</li>
                    <li>Set <code class="nds-inline-code lang-html">data-resend-label</code> when the first action and the repeat action read differently. "Send code" on first use and "Resend" on every cycle after is clearer than leaving "Resend" on a button that has never been clicked</li>
                    <li>Keep countdown templates short. "Resend in 30s" fits; a full sentence does not. The label redraws every second</li>
                    <li>Confirm the send from the response, not from the click. Listen for <code class="nds-inline-code lang-js">nds:cooldown:triggered</code>, issue the request there, and call <a class="nds-color" href="{{ 'components/alert' | relative_url }}">NDS.Alert</a>.create from its success path — with an error variant on the failure path. A confirmation tied to the click reports success even when the request failed</li>
                    <li>Write a concrete confirmation message ("A new code has been sent to your mobile number.") rather than a generic "Success". Users need to know what succeeded</li>
                    <li>Cooldowns under 5 seconds feel abrupt. Cooldowns over 60 seconds should trigger a dedicated "please wait" screen, not a button label</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-cooldown</code></td><td>Seconds to hold the cooldown. Required to opt in. Non-positive values skip the cooldown entirely. Read once at wire time; editing after page load has no effect</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-cooldown-label</code></td><td>Countdown text template. <code class="nds-inline-code lang-html">{s}</code> is replaced by the seconds remaining, every time it appears, so a bilingual label can name it once per language. Default <code class="nds-inline-code lang-html">{s}</code> (number only). This is not printf: a label using <code class="nds-inline-code lang-html">%s</code>, <code class="nds-inline-code lang-html">%d</code>, <code class="nds-inline-code lang-html">{seconds}</code> or a typo never counts down, and logs an <code class="nds-inline-code lang-js">NDS CooldownButton</code> console warning when the button is wired</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-resend-label</code></td><td>Label to restore after the first completed cycle. Omit to keep the initial label across cycles. A mid-loading <code class="nds-inline-code lang-js">reset()</code> always restores the initial label</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Events</h3>
                <p>All events bubble and fire on the button element. Listen for them to wire the request, its confirmation, analytics, and any parallel UI updates around the countdown.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Event</th><th>Fires</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:triggered</code></td><td>Loading ends and the cooldown starts. Issue your request here, and confirm from its response</td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:tick</code></td><td>Every second during the cooldown. <code class="nds-inline-code lang-js">event.detail.remaining</code> is the seconds left, including a first tick at the full duration</td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:cooldown:end</code></td><td>Cooldown completed naturally or <code class="nds-inline-code lang-js">reset()</code> was called. Button is re-enabled and the label is restored</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.CooldownButton</strong> API provides programmatic control for dynamically added buttons and for aborting a cooldown in flight. Auto-initialization handles everything for static markup; no JS call is needed for the common case.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
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

// The send already happened elsewhere — throttle the button
// WITHOUT re-running the request handler on
// nds:cooldown:triggered. tick and end still fire.
NDS.CooldownButton.start(btn, { silent: true });

// Resume a cooldown across a page load: the user has 20 of
// the 30 seconds left. seconds is its own opt-in, so a button
// with no data-cooldown can be driven entirely from JS.
NDS.CooldownButton.start(btn, { seconds: 20, silent: true });

// ── Abort an in-flight cooldown ──────────────────────
// Re-enables the button, clears the tick timer, and restores the
// post-send (data-resend-label) label if set, otherwise the original.
NDS.CooldownButton.reset(btn);

// ── Listen for lifecycle events ──────────────────────
btn.addEventListener('nds:cooldown:triggered', () =&gt; {
    // The countdown just started. Issue the request here — see
    // "Bind the cooldown to a real request" below for the full shape.
});

btn.addEventListener('nds:cooldown:tick', (e) =&gt; {
    console.log('seconds remaining:', e.detail.remaining);
});

btn.addEventListener('nds:cooldown:end', () =&gt; {
    // Button is re-enabled and restored.
});

// ── Bind the cooldown to a real request ──────────────
// The component owns the throttle and the label. The request, its
// loading state and its confirmation are yours — all from one event.
//
// The countdown starts on the click, because that is when the endpoint
// was hit. There is no built-in loading phase: a fixed timer cannot know
// how long a response takes. Stamp the button's own loading state and
// clear it when the response lands, and the state is real.
//
// [data-state~="loading"] hides the label, so the countdown ticks under
// the spinner and is already at the right number when the state comes off.
btn.addEventListener('nds:cooldown:triggered', async () =&gt; {
    NDS.State.add(btn, 'loading');
    try {
        // NDS.request throws on a non-OK status, so a 500 reaches the catch
        // below. Plain fetch resolves on one, reporting a failed resend as
        // though it had worked.
        await NDS.request('/api/resend', { method: 'POST' });
        NDS.Alert.create({
            variant: 'success', title: 'Code sent',
            display: 'toast', position: 'top', duration: 4000
        });
    } catch (err) {
        NDS.Alert.create({
            variant: 'error', title: 'Could not send the code',
            display: 'toast', position: 'top', duration: 0
        });
        // Let the user retry immediately instead of serving out a cooldown
        // for a request that never reached the server.
        NDS.CooldownButton.reset(btn);
    } finally {
        // Always clear it — the component never touches 'loading'.
        NDS.State.remove(btn, 'loading');
    }
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
