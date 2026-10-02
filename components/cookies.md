---
layout: page
title: Cookies
hero_title: Cookies - National Design System
hero_description: A consent panel that asks the visitor which cookies to allow, stores the choice by category and sends it to your analytics setup
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "02/10/2026 - 09:37 PM"
---

<section id="cookiesOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The consent panel is a bottom [Panel](../components/panels) on every page. It has three views. The Notice view holds Accept, Reject and Manage Cookies. The Manage view holds one switch for each cookie category. The Done view confirms the choice. You add no markup: the script builds the panel when it is first needed. A trigger button with `data-cookies-toggle` opens it again at any time.

Pick another component when:

- the visitor must decide before they can use the page: [Modal](../components/modal)
- the message is a site notice, not a cookie choice: [Alert](../components/alert)

</div>
  </div>
</section>

<section id="cookiesMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="cookies-trigger" data-canon data-variants="cookiesVariantsTable">
<!-- Nothing to add: the panel is built on every page -->
<!-- Optional: opens the panel again -->
<button type="button" class="nds-btn nds-secondary-outline" data-cookies-toggle>
  <i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i>
  <span class="nds-label">Cookie settings</span>
</button>
</script>
<script type="text/html" id="cookies-manual" data-canon>
<!-- Your own panel. It replaces the built one -->
<template class="nds-panel-template">
  <aside id="ndsCookiesPanel" class="nds-panel nds-cookies" data-panel-side="bottom" data-panel-static aria-label="Cookie settings" hidden>
    <div class="nds-cookies-view" data-cookies-view="notice">
      <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle"><i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i></span>
        <div class="nds-panel-text"><span class="nds-panel-title">Cookies</span></div>
        <div class="nds-panel-action">
          <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="nds-scroll-more">
        <div class="nds-scroll-more-content nds-panel-body nds-flex nds-col">
          <p>Use of Cookies by this site is just to guarantee Ease of Access and better user experience while browsing. Continuation of your browsing acknowledges your approval for Terms and Conditions of this site and its use of Cookies.</p>
          <div class="nds-flex nds-col">
            <button type="button" class="nds-btn nds-primary nds-full" data-cookies-action="accept"><span class="nds-label">Accept</span></button>
            <button type="button" class="nds-btn nds-secondary-outline nds-full" data-cookies-action="reject"><span class="nds-label">Reject</span></button>
            <button type="button" class="nds-btn nds-subtle nds-full" data-cookies-action="manage"><span class="nds-label">Manage Cookies</span></button>
          </div>
        </div>
        <button type="button" class="nds-btn nds-subtle nds-show-more" aria-label="Scroll panel">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="nds-cookies-view" data-cookies-view="manage" hidden>
      <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle"><i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i></span>
        <div class="nds-panel-text"><span class="nds-panel-title">Manage Cookies</span></div>
        <div class="nds-panel-action">
          <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="nds-scroll-more">
        <div class="nds-scroll-more-content nds-panel-body nds-flex nds-col">
          <p>When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device, and is mostly used to make the site work as you expect it to. The information does not usually identify you directly, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. However, blocking some types of cookies may affect your experience of the site and the services we are able to offer.</p>
          <fieldset class="nds-form-group nds-switch-group" aria-label="Cookie types">
            <div class="nds-form-container nds-switch-container">
              <div class="nds-form-header">
                <label for="ndsCookies-necessary"><span class="nds-label">Necessary Cookies</span><span class="nds-info">Always active</span></label>
              </div>
              <div class="nds-form-control">
                <div class="nds-switch">
                  <input type="checkbox" id="ndsCookies-necessary" class="nds-switch-input" data-cookies-category="necessary" checked disabled>
                  <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                </div>
              </div>
            </div>
            <div class="nds-form-container nds-switch-container">
              <div class="nds-form-header">
                <label for="ndsCookies-performance"><span class="nds-label">Performance Cookies</span></label>
              </div>
              <div class="nds-form-control">
                <div class="nds-switch">
                  <input type="checkbox" id="ndsCookies-performance" class="nds-switch-input" data-cookies-category="performance">
                  <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                </div>
              </div>
            </div>
            <div class="nds-form-container nds-switch-container">
              <div class="nds-form-header">
                <label for="ndsCookies-functional"><span class="nds-label">Functional Cookies</span></label>
              </div>
              <div class="nds-form-control">
                <div class="nds-switch">
                  <input type="checkbox" id="ndsCookies-functional" class="nds-switch-input" data-cookies-category="functional">
                  <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                </div>
              </div>
            </div>
            <div class="nds-form-container nds-switch-container">
              <div class="nds-form-header">
                <label for="ndsCookies-targeting"><span class="nds-label">Targeting Cookies</span></label>
              </div>
              <div class="nds-form-control">
                <div class="nds-switch">
                  <input type="checkbox" id="ndsCookies-targeting" class="nds-switch-input" data-cookies-category="targeting">
                  <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                </div>
              </div>
            </div>
          </fieldset>
          <div class="nds-flex nds-col">
            <button type="button" class="nds-btn nds-primary nds-full" data-cookies-action="save"><span class="nds-label">Confirm My Choices</span></button>
            <button type="button" class="nds-btn nds-secondary-outline nds-full" data-cookies-action="reject"><span class="nds-label">Reject All</span></button>
          </div>
        </div>
        <button type="button" class="nds-btn nds-subtle nds-show-more" aria-label="Scroll panel">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="nds-cookies-view" data-cookies-view="done" hidden>
      <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle" data-status="success"><i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i></span>
        <div class="nds-panel-text"><span class="nds-panel-title">Thank you!</span></div>
        <div class="nds-panel-action">
          <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="nds-scroll-more">
        <div class="nds-scroll-more-content nds-panel-body nds-flex nds-col">
          <p role="status">Your response has been successfully recorded. If you wish to modify or change your answer, you can go back by clicking the Undo button.</p>
          <button type="button" class="nds-btn nds-subtle nds-full" data-cookies-action="undo"><span class="nds-label">Undo</span></button>
        </div>
        <button type="button" class="nds-btn nds-subtle nds-show-more" aria-label="Scroll panel">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </aside>
</template>
<!-- Optional: opens the panel again -->
<button type="button" class="nds-btn nds-secondary-outline" data-cookies-toggle>
  <i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i>
  <span class="nds-label">Cookie settings</span>
</button>
</script>
    </div>
  </div>
</section>

<section id="cookiesVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Both structures end with an optional trigger button. The Manual template holds the panel that the script builds, with the English text.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Auto (default) | — | — | Add nothing. The script builds the panel on every page, with the text of the page's language |
| Structure | Manual (hint: Your own text, links or categories) | canon `#cookies-manual` | — | Your own text, links or categories. A `#ndsCookiesPanel` in a `<template class="nds-panel-template">` replaces the built one. Keep `data-cookies-view`, `data-cookies-action` and `data-cookies-category` |
{: #cookiesVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="cookiesBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Auto-open

When no choice is stored, the panel opens on the Notice view after six seconds. It does not move focus, so a keyboard user keeps their place. If another panel is open, it waits until that panel closes.

### Views

Accept allows every category. Reject and Reject All allow only the necessary cookies. Manage Cookies opens the Manage view, where the switches show the stored choice. With no stored choice, every optional switch is off. After a choice, the Done view confirms it. Undo goes back to the Notice view, and the stored choice stays until the visitor makes a new one.

### Close

The close button stores no choice. The panel then does not open by itself for 30 minutes. An outside click does not close the panel. When it closes, focus goes back to the trigger that opened it.

</div>
  </div>
</section>

<section id="cookiesFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-download-04"></i>
            <span class="nds-label">Loaded on Demand</span>
          </span>
          <p class="nds-item-desc">The panel script loads only for a visitor with no stored choice, or on the first trigger press. A returning visitor downloads none of it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Localized Text</span>
          </span>
          <p class="nds-item-desc">The built panel takes its text from <code class="nds-inline-code lang-js">assets/i18n/cookies/{lang}.json</code>. The text loads before the panel shows, so an Arabic page never shows English first.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Consent Signals</span>
          </span>
          <p class="nds-item-desc">Each choice sends <code class="nds-inline-code lang-js">gtag('consent', 'update', …)</code> for every mapped category, so Google tags react without a page reload.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Denied Until Chosen</span>
          </span>
          <p class="nds-item-desc">On every page load, NDS denies each category the visitor did not allow. A visitor who has not chosen yet counts as declined.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eraser"></i>
            <span class="nds-label">Tracker Cleanup</span>
          </span>
          <p class="nds-item-desc">When a category is denied, NDS clears its common trackers on this host and every parent domain. Performance also disables each registered Google Analytics ID.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-floppy-disk"></i>
            <span class="nds-label">Consent Persistence</span>
          </span>
          <p class="nds-item-desc">The choice is saved for 365 days with <code class="nds-inline-code lang-js">SameSite=Lax</code>. On a <code class="nds-inline-code lang-js">file://</code> URL, it is saved in localStorage.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="cookiesPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put a "Cookie settings" trigger in the footer. Visitors expect to change their choice later.
- Set gtag's consent default to `denied` in `<head>`, before gtag.js loads. NDS only sends signals and cannot block a tracker. Its scripts run later, so that default is what stops the first page view from tracking.
- Register each Google Analytics ID with `window.GA_TRACKING_ID` or `data-ga-tracking-id`, before the NDS scripts. Without it, a denial clears the cookies but Google Analytics keeps running.
- Listen for `nds:cookies:consent` to start or stop a tool that NDS does not know, such as a vendor pixel.
- Do not add a second cookie banner. The consent panel is already on every page.
- To change the links or categories, use the Manual structure and edit the whole panel. Keep `data-cookies-view`, `data-cookies-action` and `data-cookies-category`.
- To change only the text, set `window.NDS_I18N.cookies`. The built panel then keeps up with future releases.

</div>
  </div>
</section>

<section id="cookiesApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-cookies-toggle` | any button outside the panel | Opens the panel. `="manage"` opens it on the Manage view |
| `data-cookies-view` | `.nds-cookies-view` | `notice`, `manage` or `done`. The script shows one view at a time |
| `data-cookies-action` | a button in the panel | `accept`, `reject` and `save` store the choice and show the Done view. `manage` shows the Manage view. `undo` goes back to the Notice view |
| `data-cookies-category` | a switch input in the Manage view | The category the switch allows. `necessary` is always allowed |
| `data-ga-tracking-id` | any element | A Google Analytics ID to disable while performance cookies are denied |
| `data-panel-static` | `#ndsCookiesPanel` | An outside click does not close the panel. Keep it on your own panel |
{: .nds-table .nds-responsive}

### Text
{: .nds-block-title}

The built panel reads its text from `assets/i18n/cookies/en.json` and `ar.json`. To use your own text, set `window.NDS_I18N.cookies` before the NDS scripts. It replaces the file, and a key it leaves out shows in English. Copy every key from `en.json`. A Manual panel ignores both.

### Consent Mode Mapping
{: .nds-block-title}

| Category | gtag keys | Cookies cleared when denied |
|---|---|---|
| `necessary` | — (always allowed) | — |
| `performance` | `analytics_storage` | `_ga`, `_gid`, `_gat`, and `window['ga-disable-<id>']` is set |
| `functional` | `functionality_storage`, `personalization_storage` | — |
| `targeting` | `ad_storage`, `ad_user_data`, `ad_personalization` | `_fbp`, `_fbc` |
{: .nds-table .nds-responsive}

A category that is not in this table reaches only `allowed()` and the event.

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Cookies.getConsent()` | `'accepted'`, `'declined'`, `'custom'` (some categories) or `null` (no choice yet) |
| `NDS.Cookies.allowed(category)` | `true` when the visitor allowed the category. `'necessary'` is always `true` |
| `NDS.Cookies.save(choice)` | Stores `true` (all), `false` (none) or an array of categories, applies it and fires the event. Use it from your own consent UI |
| `NDS.Cookies.show(view)` | Opens the panel on `'notice'` (default) or `'manage'` |
| `NDS.Cookies.set(name, value, days)` | Writes a cookie with `path=/` and `SameSite=Lax`. It does not check consent, so use it for necessary values only |
| `NDS.Cookies.get(name)` | Reads a cookie, or `null` |
| `NDS.Cookies.delete(name)` | Removes a cookie on this host and every parent domain |
| `NDS.CookieConsent.open(view, opener)` | Opens the panel. Focus goes back to `opener` when it closes |
| `NDS.CookieConsent.close()` | Closes the panel |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:cookies:consent` | `document` | `{ consent, categories }`. `consent` is the `getConsent()` value. `categories` maps each category to `true` or `false`. Closing the panel is not a choice, so it fires no event |
{: .nds-table .nds-responsive}

The choice is stored in the `cookieConsent` cookie as `accepted`, `declined` or the allowed categories joined with commas. The close button writes `cookieConsentDismissed` for 30 minutes, which is never read as consent. To ask again, call `NDS.Cookies.delete('cookieConsent')`, then `NDS.Cookies.show()`.

Put this script in `<head>`, before the gtag.js tag and the NDS scripts:

<script type="text/html" id="cookies-gtag" data-canon data-lang="js">
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

gtag('consent', 'default', {
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

window.GA_TRACKING_ID = 'G-XXXXXXXXXX'; // or an array of ids

gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');
</script>

Start a tool that NDS does not know only when its category is allowed. Put this in a `defer` script after the NDS scripts:

<script type="text/html" id="cookies-js" data-canon data-lang="js">
if (NDS.Cookies.allowed('performance')) startClarity();

document.addEventListener('nds:cookies:consent', function (e) {
  if (e.detail.categories.performance) {
    startClarity();
  } else {
    NDS.Cookies.delete('_clck');
    NDS.Cookies.delete('_clsk');
  }
});
</script>

The full API is in the banners of `_js/nds-cookies.js` and `_js/nds-cookie-consent.js`.

</div>
  </div>
</section>
