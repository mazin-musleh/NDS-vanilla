---
layout: page
title: Session Timeout
hero_title: Session Timeout - National Design System
hero_description: A warning that opens before an idle session ends, counts down the time left, and lets the user stay signed in
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "08/10/2026 - 01:56 PM"
---

<section id="sessionTimeoutOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Session Timeout warns a signed-in user before their session ends for lack of use, and lets them extend it. This meets WCAG 2.2.1, Timing Adjustable. It is a [Modal](../components/modal) with `data-session-*` attributes and a [Countdown](../components/countdown) inside. The script times the session, opens the modal, and starts the countdown.

Pick another component when:

- the page shows a deadline, such as the day applications close: [Countdown](../components/countdown)
- the user must confirm an action they started: [Modal](../components/modal)

</div>
  </div>
</section>

<section id="sessionTimeoutMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="session-timeout-modal" data-canon data-variants="sessionTimeoutVariantsTable" data-preview="run" data-run-label="Start a session">
<div id="session-warning" class="nds-modal nds-card nds-stroke nds-sm nds-center" data-status="warning" data-session-timeout="30" data-session-warn="25" data-session-ended="session-ended" role="alertdialog" aria-modal="true" aria-labelledby="session-warning-title" aria-describedby="session-warning-desc session-warning-countdown" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-xl nds-circle">
        <i class="nds-icon nds-hgi-alert-circle" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="session-warning-title">Your session is about to end</span>
      <p class="nds-card-description" id="session-warning-desc">You have not used the page for a while. When the time runs out, you are signed out and lose any data you have not saved.</p>
      <span class="nds-card-number"><span class="nds-countdown" id="session-warning-countdown" data-countdown=""><span class="nds-countdown-value" data-unit="m">--</span>:<span class="nds-countdown-value" data-unit="s">--</span></span></span>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">Stay signed in</span>
    </button>
    <a class="nds-btn nds-secondary-outline nds-lg" href="#">
      <span class="nds-label">Sign out</span>
    </a>
  </div>
</div>
<template class="nds-modal-template">
  <div id="session-ended" class="nds-modal nds-card nds-stroke nds-sm nds-center" data-status="error" data-modal-static role="alertdialog" aria-modal="true" aria-labelledby="session-ended-title" aria-describedby="session-ended-desc" aria-hidden="true" hidden>
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon nds-xl nds-circle">
          <i class="nds-icon nds-hgi-cancel-circle" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" id="session-ended-title">Your session has ended</span>
        <p class="nds-card-description" id="session-ended-desc">You were signed out because the page was not used. Sign in again to continue.</p>
      </div>
    </div>
    <div class="nds-card-actions">
      <a class="nds-btn nds-primary nds-lg" href="#">
        <span class="nds-label">Sign in</span>
      </a>
    </div>
  </div>
</template>
</script>
<script type="text/html" id="session-timeout-redirect" data-canon>
<div id="session-warning-redirect" class="nds-modal nds-card nds-stroke nds-sm nds-center" data-status="warning" data-session-timeout="30" data-session-warn="25" data-session-logout="#" role="alertdialog" aria-modal="true" aria-labelledby="session-warning-redirect-title" aria-describedby="session-warning-redirect-desc session-warning-redirect-countdown" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-xl nds-circle">
        <i class="nds-icon nds-hgi-alert-circle" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="session-warning-redirect-title">Your session is about to end</span>
      <p class="nds-card-description" id="session-warning-redirect-desc">You have not used the page for a while. When the time runs out, you are signed out and lose any data you have not saved.</p>
      <span class="nds-card-number"><span class="nds-countdown" id="session-warning-redirect-countdown" data-countdown=""><span class="nds-countdown-value" data-unit="m">--</span>:<span class="nds-countdown-value" data-unit="s">--</span></span></span>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">Stay signed in</span>
    </button>
    <a class="nds-btn nds-secondary-outline nds-lg" href="#">
      <span class="nds-label">Sign out</span>
    </a>
  </div>
</div>
</script>
<script data-demo-script>
// Demo only, on the page and in each screen. The Run button counts down the demo session, and
// every extension restarts it. Run after an ended session starts a new one: only the first session
// modal on a page works. This page has no sign-in page, so Sign in closes the ended modal.
(function () {
  var card = function () { return document.querySelector('[data-preview-of="session-timeout-modal"]') || document; };
  var run = function () { return card().querySelector('[data-run]'); };
  var held = function () { return card().querySelector('[data-demo-held]'); };
  var count = function () {
    var modal = held().querySelector('[data-session-timeout]');
    if (!modal) return;
    NDS.CooldownButton.reset(run());
    run().setAttribute('data-cooldown-label', 'Session ends in {s} s');
    NDS.CooldownButton.start(run(), { seconds: +modal.getAttribute('data-session-timeout'), silent: true });
  };
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-run]') === run()) {
      if (held().firstChild) { NDS.Init.destroy(held()); held().innerHTML = ''; }
      setTimeout(count);
    }
    if (e.target.closest('[data-run-clear]') && card().contains(e.target)) NDS.CooldownButton.reset(run());
    if (e.target.closest('[id^="session-ended"] a')) { e.preventDefault(); NDS.Modal.close(); }
  }, true);
  document.addEventListener('nds:session:extend', count);
  // Redirect: a real page leaves for data-session-logout here. The demo stays and says so.
  document.addEventListener('nds:session:end', function (e) {
    if (!e.target.hasAttribute('data-session-logout')) return;
    e.preventDefault();
    NDS.Modal.close();
    NDS.Alert.create({ variant: 'info', title: 'Signed out', description: 'A real page now goes to the data-session-logout URL.', display: 'toast', duration: 5000 });
  });
})();
</script>

    </div>
  </div>
</section>

<section id="sessionTimeoutVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the warning modal, the `.nds-modal` with `data-session-timeout`. The markup carries the Test timing. 15 minutes is two rows: write both attributes.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Ended modal (default) | — | — | At the end, a static error modal opens with a Sign in link. The page stays where it is |
| Structure | Redirect (hint: Go to the logout URL at the end) | canon `#session-timeout-redirect` | — | At the end, the page goes to the `data-session-logout` URL. For a service with personal data, where the page must not stay on screen |
| Timing | Test (default) (hint: 30 seconds, warning after 5) | — | — | A 30-second session with the warning at 25 seconds left, to try the flow. Replace both values with your server's before you ship |
| Timing | 15 minutes | `[data-session-timeout="900"]` | `.nds-modal[data-session-timeout]` | The session ends after 15 minutes with no use, and the warning opens 2 minutes before. Match `data-session-timeout` to the server |
| Timing | 15 minutes | `[data-session-warn="120"]` | `.nds-modal[data-session-timeout]` | The second row of 15 minutes |
{: #sessionTimeoutVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sessionTimeoutBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Timing
{: .nds-block-title}

The session ends `data-session-timeout` seconds after its last renewal, the way the server counts it. The clock starts when the script starts, right after the page loads. The warning opens `data-session-warn` seconds before the end, and its countdown starts at the time left. A user who closes the warning in any way extends the session.

### Keep-Alive Request
{: .nds-block-title}

With `data-session-extend`, the script sends a POST to that URL each time the session is extended. A `401` or `403` answer ends the session at once. Any other failure keeps the old deadline, so the warning comes back in time. Without the attribute, renew the session yourself in the `nds:session:extend` event. A failed renewal is then yours to handle: on a `401`, send the user to sign in.

### Session End
{: .nds-block-title}

At the end, the script fires `nds:session:end`. With `data-session-logout`, the page then goes to that URL. Without it, the modal that `data-session-ended` names opens. Call `preventDefault()` on the event to do neither.

</div>
  </div>
</section>

<section id="sessionTimeoutFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The loader starts Session Timeout on any page with a <code class="nds-inline-code lang-html">data-session-timeout</code> modal. You write no script.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-pointer-01"></i>
            <span class="nds-label">Activity Renewal</span>
          </span>
          <p class="nds-item-desc">A click, a tap, a key or the mouse wheel renews the session while the warning is closed. It renews at most once a minute, or more often in a short session. A user who keeps working never sees the warning.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-computer-phone-sync"></i>
            <span class="nds-label">Shared Across Tabs</span>
          </span>
          <p class="nds-item-desc">Tabs of the same service share one deadline in <code class="nds-inline-code lang-js">localStorage</code>. Work in one tab keeps every tab signed in, and a renewal in one tab closes the warning in the others.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-focus-point"></i>
            <span class="nds-label">Focus Without a Ring</span>
          </span>
          <p class="nds-item-desc">The timer opens the warning, not the user, so focus goes to the modal itself and no focus ring shows. Tab shows the ring, and Enter presses Stay signed in.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sleeping"></i>
            <span class="nds-label">Sleep and Return</span>
          </span>
          <p class="nds-item-desc">The script checks the deadline again when a hidden tab shows, when the computer wakes, and when the browser restores the page from its history. A session that ended meanwhile ends at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-timer-02"></i>
            <span class="nds-label">WCAG Time Check</span>
          </span>
          <p class="nds-item-desc">A <code class="nds-inline-code lang-html">data-session-warn</code> under 20 seconds logs a console warning. WCAG 2.2.1 gives the user at least 20 seconds to extend.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sessionTimeoutPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write the server's idle timeout into `data-session-timeout` from the server. A wrong value warns too late or too early. The `30` and `25` in the markup above are test values.
- Give the user time to act. Keep `data-session-warn` at 120 seconds or more on a page with a long form.
- Put the modal once in the layout of signed-in pages, never on public pages. Only the first one on a page works.
- Keep `data-countdown=""` on the countdown. The script starts it when the warning opens.
- Make Sign out a plain link to your logout URL.
- If your keep-alive needs a CSRF token, leave out `data-session-extend` and renew the session in `nds:session:extend`.
- Call `NDS.SessionTimeout.reset()` after a request of your own renews the session, such as an autosave.
- Save the user's unsaved form data in `nds:session:end`, so it is there after they sign in again.
- On a shared domain, give each service with its own sign-in its own `data-session-key`.
- On an Arabic page, translate the text only. The countdown reads `02:03` left to right by itself, in Latin digits.

</div>
  </div>
</section>

<section id="sessionTimeoutApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The card parts, statuses and `nds-center` are on the [Cards](../components/cards) page. The modal attributes are on the [Modal](../components/modal) page.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-session-timeout` | `.nds-modal` | Makes the modal the session warning. The value is the server's idle timeout in seconds. It must be above `data-session-warn`, or the script logs a console warning and does not start |
| `data-session-warn` | `.nds-modal[data-session-timeout]` | Seconds before the end at which the warning opens. Default `120` |
| `data-session-extend` | `.nds-modal[data-session-timeout]` | A URL the script sends a POST to each time the session is extended. It sends cookies only to a URL on the same site |
| `data-session-logout` | `.nds-modal[data-session-timeout]` | A URL the page goes to at the end. It wins over `data-session-ended` |
| `data-session-ended` | `.nds-modal[data-session-timeout]` | The id of the modal that opens at the end. The modal may sit in a `<template class="nds-modal-template">` |
| `data-session-key` | `.nds-modal[data-session-timeout]` | The name under which tabs share the deadline in `localStorage`. Default: the `data-session-extend` URL, or one name for the whole site when there is none |
| `data-countdown=""` | the `.nds-countdown` inside the warning | Keeps the countdown still until the warning opens. The script then starts it at the time left |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.SessionTimeout.init()` | Starts the first `.nds-modal[data-session-timeout]` on the page. The loader calls it |
| `NDS.SessionTimeout.extend()` | Extends the session now: it fires `nds:session:extend` and sends the keep-alive request |
| `NDS.SessionTimeout.reset()` | Starts the deadline again from now, with no event and no request. Call it after a request of your own renews the session. It closes an open warning |
| `NDS.SessionTimeout.destroy(root)` | Stops the timers and listeners when `root` holds the modal. `NDS.Init.destroy(view)` calls it for you |
{: .nds-table .nds-responsive}

All events bubble.

| Event | Fired on | Detail |
|---|---|---|
| `nds:session:extend` | `.nds-modal[data-session-timeout]`, each time the session is extended | `{ reason }`: `activity`, `confirm` (the user closed the warning) or `api` (`extend()`) |
| `nds:session:end` | `.nds-modal[data-session-timeout]`, once, at the end | None. Cancelable: `preventDefault()` stops the redirect and the ended modal |
{: .nds-table .nds-responsive}

<script type="text/html" id="session-timeout-js" data-canon data-lang="js">
// The keep-alive needs a CSRF token: data-session-extend is left out, and the page renews here.
document.addEventListener('nds:session:extend', () => {
  fetch('/keepalive', { method: 'POST', headers: { 'X-CSRF-Token': csrfToken } });
});

// The autosave request renewed the session on the server.
autosave().then(() => NDS.SessionTimeout.reset());

// Keep the draft, so it is there after the user signs in again.
document.addEventListener('nds:session:end', () => {
  localStorage.setItem('application-draft', JSON.stringify(readForm()));
});
</script>

The full API is in the banner of `_js/nds-session-timeout.js`.

</div>
  </div>
</section>
