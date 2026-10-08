---
layout: page
title: Session Timeout
hero_title: Session Timeout - National Design System
hero_description: A warning that opens before an idle session ends, counts down the time left, and lets the user stay signed in
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "2.0.0"
updated: "2.0.0"
last_edit: "09/10/2026 - 12:45 AM"
---

<section id="sessionTimeoutOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Session Timeout warns a signed-in user before their session ends with no activity, and lets them extend it. WCAG 2.2.1, Timing Adjustable, asks for this warning. You add no markup. One `NDS.SessionTimeout.init()` call times the session. The script builds a warning [Modal](../components/modal) with a [Countdown](../components/countdown) in it, and the ended modal.

Connect it to your server in one of two ways, as [Session Renewal](#sessionTimeoutBehavior) shows.

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
<script type="text/html" id="session-timeout-demo" data-canon data-code="none">
<button type="button" class="nds-btn nds-primary nds-md" data-session-demo data-cooldown-label="Session ends in {s} s">
  <span class="nds-label">Start a session</span>
</button>
</script>
<script data-demo-script>
// Demo only, on the page and in each screen. Start begins a 30-second session with the warning at
// 25 seconds left, and every extension restarts the count. This page has no sign-in page, so Sign in
// closes the ended modal.
(function () {
  var count = function (btn) {
    NDS.CooldownButton.reset(btn);
    NDS.CooldownButton.start(btn, { seconds: 30, silent: true });
  };
  // The page and its screens share localStorage, as tabs do, so two demos would warn together. One runs at a time.
  var stopOthers = function () {
    var wins = [top].concat(Array.prototype.map.call(top.document.querySelectorAll('.nds-doc-screen'), function (f) { return f.contentWindow; }));
    wins.forEach(function (w) {
      if (w === window || !w || !w.NDS || !w.NDS.SessionTimeout || w.NDS.SessionTimeout.__ndsStub) return;
      w.NDS.SessionTimeout.destroy();
      var b = w.document.querySelector('[data-session-demo]');
      if (b) w.NDS.CooldownButton.reset(b);
    });
  };
  if (window !== top) stopOthers();
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-session-demo]');
    if (btn) {
      stopOthers();
      NDS.SessionTimeout.destroy();
      NDS.SessionTimeout.init({ timeout: 30, warn: 25 });
      count(btn);
    }
    if (e.target.closest('#ndsSessionEnded a')) { e.preventDefault(); NDS.Modal.close(); }
  });
  document.addEventListener('nds:session:extend', function () {
    var btn = document.querySelector('[data-session-demo]');
    if (btn) count(btn);
  });
})();
</script>
<script type="text/html" id="session-timeout-init" data-canon data-lang="js">
// Once on every signed-in page. The values come from your server.
NDS.SessionTimeout.init({
  timeout: 900,
  warn: 120,
  extend: '/session/keepalive',
  logout: '/logout'
});
</script>

    </div>
  </div>
</section>

<section id="sessionTimeoutBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Session Renewal
{: .nds-block-title}

Each extension must renew the session on the server. Use one of these two ways:

- **The `extend` option.** The script sends a POST to that URL. A `401` or a redirect to a sign-in page ends the session at once. Any other failure keeps the old deadline, so the warning comes back in time. The request carries cookies but no CSRF token, so a server that asks for one answers `403`.
- **Your own request.** Leave out `extend` and send the request in the `nds:session:extend` event. Use it when your server needs a CSRF token or other headers. When the server says the session is gone, call `NDS.SessionTimeout.end()`.

### Timing
{: .nds-block-title}

The session ends `timeout` seconds after its last renewal, the way the server counts it. The warning opens `warn` seconds before the end, and its countdown starts at the time left. A user who closes the warning in any way extends the session.

The clock starts when `init()` runs, because the request that served the page renewed the session. If your server renews it only on some requests, pass the seconds left as `left`.

### Session End
{: .nds-block-title}

At the end, the script fires `nds:session:end`. With `logout`, the page then goes to that URL. Without it, the ended modal opens. Call `preventDefault()` on the event to do neither. The warning then closes, and the next step is yours. If the user goes back to the page after the redirect, the script goes to the logout URL again.

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
            <span class="nds-label">Built Modals</span>
          </span>
          <p class="nds-item-desc">The script builds the warning and the ended modal when each first opens, with the text of the page's language.</p>
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
          <p class="nds-item-desc">A <code class="nds-inline-code lang-js">warn</code> under 20 seconds logs a console warning. WCAG 2.2.1 gives the user at least 20 seconds to extend.</p>
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

- Pass the server's idle timeout as `timeout`, from the server. A wrong value warns too late or too early.
- Give the user time to act. Keep `warn` at 120 seconds or more on a page with a long form.
- Call `init()` once on every signed-in page, such as in the script of the shared layout. Never call it on a public page.
- In a single-page app, call `init()` after sign-in and `destroy()` at sign-out.
- Call `NDS.SessionTimeout.reset()` after a request of your own renews the session, such as an autosave. In a single-page app, call it from the response hook of your HTTP client.
- On a page with personal data, send the `Cache-Control: no-store` header. The browser then does not keep the page, so the Back button cannot show it again after the session ends.
- Save the user's unsaved form data in `nds:session:end`, so it is there after they sign in again. Use `sessionStorage`, not `localStorage`: on a shared computer, `localStorage` keeps the data after the user leaves.
- When two services with their own sign-in share one site, such as `/service-a` and `/service-b`, give each its own `key`.

</div>
  </div>
</section>

<section id="sessionTimeoutApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Text
{: .nds-block-title}

The modals read their text from the `session-timeout` section of `assets/i18n/en.json` and `ar.json`. To change some of it, set `window.NDS_I18N['session-timeout']` before the NDS scripts: each key you set replaces that text, and the rest keep the pack's text. See [Internationalization](../core/i18n). On an Arabic page, the countdown still reads `02:03` left to right, in Latin digits.

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.SessionTimeout.init(options)` | Starts timing the session |
| `NDS.SessionTimeout.extend()` | Extends the session now: it fires `nds:session:extend` and sends the keep-alive request |
| `NDS.SessionTimeout.reset()` | Starts the deadline again from now, with no event and no request. Call it after a request of your own renews the session. It closes an open warning, and it restarts an ended session, such as after the user signs in again on the same page |
| `NDS.SessionTimeout.end()` | Ends the session now. Call it when your own request finds the session gone |
| `NDS.SessionTimeout.destroy()` | Stops the timers and listeners, and closes an open session modal |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `timeout` | — | Required. The server's idle timeout, in seconds. It must be above `warn`, or the script logs a console warning and does not start |
| `warn` | `120` | Seconds before the end at which the warning opens |
| `left` | `timeout` | Seconds left in the session when the server rendered the page |
| `extend` | — | A URL the script sends a POST to each time the session is extended. It sends cookies only to a URL on the same origin |
| `logout` | — | A URL the page goes to at the end. The warning shows a Sign out link to it only with this option |
| `signin` | this page | The URL of the Sign in link in the ended modal. With the default, your server sends the signed-out user from this page to sign in |
| `key` | the `extend` URL | The name under which tabs share the deadline in `localStorage`. Without `extend`, every page on the same origin shares one name |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:session:extend` | `document`, each time the session is extended | `{ reason }`: `activity`, `confirm` (the user closed the warning) or `api` (`extend()`) |
| `nds:session:end` | `document`, once, at the end | None. Cancelable: `preventDefault()` stops the redirect and the ended modal |
{: .nds-table .nds-responsive}

<script type="text/html" id="session-timeout-js" data-canon data-lang="js">
// The keep-alive needs a CSRF token: extend is left out, and the page renews here.
document.addEventListener('nds:session:extend', async () => {
  const res = await fetch('/keepalive', { method: 'POST', headers: { 'X-CSRF-Token': csrfToken }, redirect: 'manual' });
  // A 401 or a redirect to the sign-in page: the session is gone.
  if (res.status === 401 || res.type === 'opaqueredirect') NDS.SessionTimeout.end();
});

// The autosave request renewed the session on the server.
autosave().then(() => NDS.SessionTimeout.reset());

// Keep the draft in this tab, so it is there after the user signs in again.
document.addEventListener('nds:session:end', () => {
  sessionStorage.setItem('application-draft', JSON.stringify(readForm()));
});
</script>

The full API is in the banner of `_js/nds-session-timeout.js`.

</div>
  </div>
</section>
