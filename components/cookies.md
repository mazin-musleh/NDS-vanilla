---
layout: page
title: Cookie Consent
hero_title: Cookie Consent - National Design System
hero_description: A privacy-compliant consent banner, built on the Cards component, that captures the user's cookie preferences, gates analytics and marketing cookies on decline, and can be re-opened from any trigger for ongoing settings control.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Overview -->
<section id="cookiesOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Overview</h2>
            <p class="nds-section-description">A fixed bottom banner by default, with an optional compact desktop card and a programmatic entry point for re-opening</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-compact", ".nds-cookie-popup.demo-preview", "cookieLayout"]'>
                                <span class="nds-label">Compact on desktop</span>
                            </button>
                            <button class="nds-btn nds-primary demo-action-btn" data-action="cookie-show">
                                <span class="nds-label">Show real popup</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="min-height: 360px; padding: 0;">
                            <div class="nds-cookie-popup nds-card demo-preview" style="position: relative; inset: auto; animation: none;">
                                <div class="nds-card-header">
                                    <span class="nds-featured-icon nds-circle">
                                        <i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i>
                                    </span>
                                    <button class="nds-close nds-btn nds-subtle" aria-label="Close">
                                        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title">Cookies</h3>
                                        <p class="nds-card-description">This website uses cookies to ensure ease of use and provide an enhanced browsing experience. By continuing to browse this site, you acknowledge and accept the use of cookies.</p>
                                    </div>
                                    <div class="nds-cookie-popup-links">
                                        <a href="/terms-and-conditions">Terms &amp; Conditions</a>
                                        <span>|</span>
                                        <a href="/privacy-policy">Privacy Policy</a>
                                    </div>
                                    <div class="nds-card-actions">
                                        <button class="nds-btn nds-primary nds-full" data-accept-title="Accepted" data-accept-message="Cookies have been accepted">
                                            <span class="nds-label">Accept</span>
                                        </button>
                                        <button class="nds-btn nds-secondary nds-full" data-decline-title="Declined" data-decline-message="Optional cookies have been declined">
                                            <span class="nds-label">Decline</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-cookies-overview-1" id="tab-cookies-overview-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-cookies-overview-1"
                                    aria-labelledby="tab-cookies-overview-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-cookie-popup nds-card" id="ndsCookiesPopup" hidden&gt;
  &lt;div class="nds-card-header"&gt;
    &lt;span class="nds-featured-icon nds-circle"&gt;
      &lt;i class="nds-icon nds-hgi-cookie" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;
    &lt;button id="ndsCookiesCloseBtn" class="nds-close nds-btn nds-subtle" aria-label="Close"&gt;
      &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-text"&gt;
      &lt;h3 class="nds-card-title" id="ndsCookiesTitle"&gt;Cookies&lt;/h3&gt;
      &lt;p class="nds-card-description" id="ndsCookiesContent"&gt;This website uses cookies to ensure ease of use and provide an enhanced browsing experience. By continuing to browse this site, you acknowledge and accept the use of cookies.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-cookie-popup-links"&gt;
      &lt;a href="/terms-and-conditions" id="ndsCookiesTermsLink"&gt;Terms &amp;amp; Conditions&lt;/a&gt;
      &lt;span&gt;|&lt;/span&gt;
      &lt;a href="/privacy-policy" id="ndsCookiesPrivacyLink"&gt;Privacy Policy&lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-actions"&gt;
    &lt;button class="nds-btn nds-primary nds-full" id="ndsCookiesAcceptBtn"
      data-accept-title="Accepted" data-accept-message="Cookies have been accepted"&gt;
      &lt;span class="nds-label"&gt;Accept&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary nds-full" id="ndsCookiesDeclineBtn"
      data-decline-title="Declined" data-decline-message="Optional cookies have been declined"&gt;
      &lt;span class="nds-label"&gt;Decline&lt;/span&gt;
    &lt;/button&gt;
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
</section>

<!-- Built-in Features -->
<section id="cookiesFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Opens two seconds after first load when no consent is stored. Re-visits skip the banner until you clear the saved preference.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-floppy-disk"></i>
                        <span class="nds-label">Consent Persistence</span>
                    </span>
                    <p class="nds-item-desc">Saves the choice for 365 days with SameSite=Lax, and falls back to localStorage when the site runs from a file:// URL.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">Analytics Gating</span>
                    </span>
                    <p class="nds-item-desc">On decline, clears _ga, _gid, _gat, _fbp, _fbc cookies and sets the Google Analytics ga-disable flag for every configured tracking ID.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">gtag Consent Signals</span>
                    </span>
                    <p class="nds-item-desc">Emits gtag('consent', 'update', ...) with granted or denied values on every decision, so downstream Google tags react immediately without a page reload.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-align-box-middle-center"></i>
                        <span class="nds-label">Compact Layout</span>
                    </span>
                    <p class="nds-item-desc">Adding nds-compact re-centers the banner as a capped-width card on tablet and up, staying full-width on mobile.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-toggle-on"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Call NDS.Cookies.show() from any trigger (footer link, settings button) to re-open the banner after a decision has been made.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="cookiesGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Let the component auto-open on the first visit. A 2000 ms delay keeps the banner from fighting with first-paint content, and the saved consent means return visitors never see it again unnecessarily</li>
                    <li>Add a persistent "Cookie Settings" link in the footer that calls <code class="nds-inline-code lang-js">NDS.Cookies.show()</code>. Consent is a reversible decision, and users expect to find the control later without digging</li>
                    <li>Choose <code class="nds-inline-code lang-html">nds-compact</code> for desktop-first products where the bottom banner would cover a fixed footer, chatbot, or data table. The compact card sits above content as a floating dialog rather than a bar</li>
                    <li>Keep the body text to one or two sentences. Lead with the "why", then link to the Terms and Privacy pages for the full policy. Users skim, not read, consent banners</li>
                    <li>Always include both <strong>Terms &amp; Conditions</strong> and <strong>Privacy Policy</strong> links. Regulations in most jurisdictions require them to be reachable at the moment of consent, not only after. The bundled include points to <code class="nds-inline-code lang-html">/terms-and-conditions</code> and <code class="nds-inline-code lang-html">/privacy-policy</code>; override <code class="nds-inline-code lang-html">_includes/cookie-popup.html</code> if your site uses different paths</li>
                    <li>Wire <strong>Accept</strong> as the primary button and <strong>Decline</strong> as the secondary. This matches user expectation and keeps keyboard focus order predictable</li>
                    <li>Register your Google Analytics property ID through <code class="nds-inline-code lang-js">window.GA_TRACKING_ID</code> (string or array) or a <code class="nds-inline-code lang-html">data-ga-tracking-id</code> attribute so Decline can set the <code class="nds-inline-code lang-js">ga-disable-&lt;ID&gt;</code> flag. Without a registered ID, Decline still clears the cookies but GA keeps running</li>
                    <li>Treat the close (<strong>&times;</strong>) button as "decide later", not "decline". It hides the banner for the current page load without writing a consent value, so the popup re-appears on the next visit</li>
                    <li>Do not use this banner as a blocking gate. The page must remain readable and interactive behind it. For mandatory decisions (age gates, payment confirmations) use the <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a> component with a backdrop instead</li>
                    <li>Do not stack multiple cookie banners on the same page. The component is already included in the site layout, so you do not need to add it to individual pages</li>
                    <li>Custom toast strings are used verbatim when set via the data attributes. Set both Arabic and English variants per page (or leave the attribute off to inherit the language-aware default, which keys on <code class="nds-inline-code lang-js">NDS.isArabic</code>)</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-card</code></td><td>Required. The popup composes on <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Cards</a> for background, padding, radius, and typography. Keep it on the root element</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-compact</code></td><td>Re-centers the banner as a capped-width floating card on tablet and larger viewports. Mobile behavior is unchanged (full-width bottom bar). Do not confuse with card's <code class="nds-inline-code lang-html">nds-center</code>, which centers card content, not the card itself</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-accept-title</code></td><td>Set on <code class="nds-inline-code lang-html">#ndsCookiesAcceptBtn</code> to override the toast title shown after Accept. Falls back to a language-aware default (EN: "Accepted", AR: "تم القبول")</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-accept-message</code></td><td>Set on <code class="nds-inline-code lang-html">#ndsCookiesAcceptBtn</code> to override the toast description after Accept</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-decline-title</code></td><td>Set on <code class="nds-inline-code lang-html">#ndsCookiesDeclineBtn</code> to override the toast title shown after Decline</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-decline-message</code></td><td>Set on <code class="nds-inline-code lang-html">#ndsCookiesDeclineBtn</code> to override the toast description after Decline</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-ga-tracking-id</code></td><td>Set on any element to register a Google Analytics tracking ID that should be disabled when the user declines. Multiple IDs are supported (one per element)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Required Element IDs</h3>
                <p>The JS wires events and updates text by ID, so renaming or removing these on your copy of the markup will break the component. If you translate the banner server-side, edit the text nodes inside these IDs but keep the IDs themselves intact.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>ID</th><th>Required on</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">#ndsCookiesPopup</code></td><td>Root <code class="nds-inline-code lang-html">.nds-cookie-popup</code> container. Target of <code class="nds-inline-code lang-js">NDS.Cookies.show()</code> and the <code class="nds-inline-code lang-html">hidden</code> attribute toggle</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">#ndsCookiesAcceptBtn</code></td><td>Primary Accept button. Also the selector the loader watches to know when to initialize</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">#ndsCookiesDeclineBtn</code></td><td>Secondary Decline button</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">#ndsCookiesCloseBtn</code></td><td>Close (&times;) button. Dismisses the popup without persisting a consent value</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Cookies</strong> namespace exposes both the consent lifecycle and a generic cookie read/write utility. <strong>NDS.Cookies.init()</strong> is called automatically by the loader, so most integrations only need <strong>show</strong>, <strong>getConsent</strong>, and the cookie helpers. Consent is persisted in a cookie named <code class="nds-inline-code lang-js">cookieConsent</code> for 365 days (or in <code class="nds-inline-code lang-js">localStorage</code> under <code class="nds-inline-code lang-js">nds_cookieConsent</code> when the site is served from <code class="nds-inline-code lang-js">file://</code>).</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Re-open the banner ───────────────────────────────
// Removes the `hidden` attribute from #ndsCookiesPopup.
// Works at any time, regardless of whether consent was
// previously saved. Useful for a footer "Cookie Settings"
// link or an in-app preferences screen.
NDS.Cookies.show();

// ── Read the current consent state ───────────────────
// Returns 'accepted' | 'declined' | null (no decision yet).
const state = NDS.Cookies.getConsent();

// ── Reset consent and re-prompt ──────────────────────
// There is no dedicated reset method; clear the cookie
// and call show() to re-ask the user.
NDS.Cookies.delete('cookieConsent');
NDS.Cookies.show();

// ── Set a functional cookie ──────────────────────────
// Essential cookies do not require consent. Use this for
// user-preference flags, dismissed banners, etc.
// Cookies are written with SameSite=Lax and path=/.
NDS.Cookies.set('my-preference', 'value', 30); // name, value, days

// ── Read a cookie by name ────────────────────────────
const value = NDS.Cookies.get('my-preference');

// ── Delete a cookie ──────────────────────────────────
// Clears both the root-domain and host-only variants.
NDS.Cookies.delete('my-preference');

// ── Register a Google Analytics property ID ──────────
// Set before nds-main.min.js loads (e.g. in &lt;head&gt;).
// String or array; Decline sets window['ga-disable-&lt;ID&gt;'] = true
// for every registered ID and emits gtag('consent', 'update', …).
window.GA_TRACKING_ID = 'G-XXXXXXXXXX';
// or
window.GA_TRACKING_ID = ['G-AAA', 'G-BBB'];

// ── Re-initialize after dynamic markup (rare) ────────
// Only needed if the banner markup was injected after load.
// Re-binds click handlers to the four required IDs.
NDS.Cookies.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
