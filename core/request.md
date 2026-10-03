---
layout: page
title: Request
hero_title: Request - National Design System
hero_description: A fetch wrapper that adds a timeout, a response size cap and an error on a failed status, then returns the body as JSON or text
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.6.0"
updated: "1.12.0"
last_edit: "03/10/2026 - 11:54 PM"
---

<section id="requestOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

`NDS.request(url, options)` calls `fetch` and returns a promise of `{ isJson, data }`. It handles the response only. Your code builds the request, shows the loading state and writes the result into the page.

It is in the main bundle, so every page has it, with no init call. Every NDS component that loads data uses it, except File Upload.

Pick another component when:

- the user uploads a file and needs a progress bar: [File Upload](../components/upload)

</div>
  </div>
</section>

<section id="requestMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Read JSON from an endpoint. A failed status rejects the promise, so a 404 reaches the `catch`.

<script type="text/html" id="request-read" data-canon data-lang="js">
async function loadServices() {
  try {
    const { data } = await NDS.request('/api/services', { json: true });
    renderServices(data);
  } catch (error) {
    if (error.status === 404) return showEmptyState();
    showError();
  }
}
</script>

Cancel a search when a newer search replaces it.

<script type="text/html" id="request-cancel" data-canon data-lang="js">
let controller;

async function search(term) {
  if (controller) controller.abort();
  controller = new AbortController();
  const { signal } = controller;

  setLoading(true);
  try {
    const { data } = await NDS.request(`/api/search?q=${encodeURIComponent(term)}`, { signal, json: true });
    renderResults(data);
  } catch (error) {
    // A newer search aborted this one.
    if (error.name === 'AbortError') return;
    showError();
  } finally {
    // A newer search owns the loading state: clear it only from the latest one.
    if (controller.signal === signal) setLoading(false);
  }
}
</script>

</div>
  </div>
</section>

<section id="requestFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clock-01"></i>
            <span class="nds-label">Timeout by Default</span>
          </span>
          <p class="nds-item-desc">A request aborts after 15 seconds unless you set <code class="nds-inline-code lang-js">timeout</code>. When a server never answers, the promise rejects with a <code class="nds-inline-code lang-js">TimeoutError</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">Response Size Cap</span>
          </span>
          <p class="nds-item-desc">The body is read as a stream and cancelled once it passes <code class="nds-inline-code lang-js">maxBytes</code>. When the <code class="nds-inline-code lang-js">Content-Length</code> header is already over the cap, the body is refused unread.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cancel-01"></i>
            <span class="nds-label">Combined Abort Signals</span>
          </span>
          <p class="nds-item-desc">Your <code class="nds-inline-code lang-js">signal</code> and the timeout control the same request. Either one aborts it, and the error name says which.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-source-code"></i>
            <span class="nds-label">JSON or Text</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-js">Content-Type</code> header decides how the body is read. <code class="nds-inline-code lang-js">json: true</code> parses it as JSON whatever the header says.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-alert-circle"></i>
            <span class="nds-label">Errors With a Status</span>
          </span>
          <p class="nds-item-desc">A failed status rejects with an error that holds the HTTP code, the URL and the start of the response body.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sliders-horizontal"></i>
            <span class="nds-label">Fetch Options</span>
          </span>
          <p class="nds-item-desc">Every other option goes to <code class="nds-inline-code lang-js">fetch</code> unchanged, such as <code class="nds-inline-code lang-js">method</code>, <code class="nds-inline-code lang-js">headers</code>, <code class="nds-inline-code lang-js">body</code> and <code class="nds-inline-code lang-js">credentials</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-browser"></i>
            <span class="nds-label">Older Safari</span>
          </span>
          <p class="nds-item-desc">Safari before 17.4 has no <code class="nds-inline-code lang-js">AbortSignal.any</code>. There, <code class="nds-inline-code lang-js">NDS.request</code> combines the signals itself, and the error names stay the same.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="requestPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use `NDS.request` wherever you would call `fetch` to read a response.
- Pass `json: true` when you know the endpoint returns JSON. Some servers label JSON as `text/plain`, and `data` is then a string.
- Raise `maxBytes` for an HTML fragment. A full page of markup can pass 1 MB.
- Set `timeout: 0` only for a connection that stays open on purpose, such as a long poll.
- Branch on `error.status` and `error.name`, not on the message. Only the size error needs its message.
- Ignore an `AbortError` in the `catch`. It comes from your own `abort()` call, so the user saw no failure.
- Log `error.body` with the status. It shows what the server said.
- For a fallback value instead of an error on a failed status, wrap the call: `const optional = (url, opts) => NDS.request(url, opts).catch(err => err.status ? null : Promise.reject(err));`
- Write retry, caching or interceptors in your own code: `NDS.request` has none. The browser's HTTP cache still works, as it does for `fetch`.
- Check that a request is safe to send twice before you retry it. A form submission may not be.

</div>
  </div>
</section>

<section id="requestApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Options
{: .nds-block-title}

| Option | Default | Effect |
|---|---|---|
| `timeout` | `15000` | Milliseconds before the request aborts with a `TimeoutError`. `0` turns the timeout off |
| `maxBytes` | `1048576` (1 MB) | The largest response body, in bytes. A larger body rejects the promise |
| `json` | the `Content-Type` header | `true` parses the body as JSON, and `false` returns it as text. Without it, the body is parsed only when `Content-Type` holds `application/json` |
| `signal` | none | Your own `AbortSignal`. It aborts the request together with the timeout: the first one to fire wins |
| any other option | — | Passed to `fetch` unchanged, such as `method`, `headers`, `body`, `credentials` and `cache`. A JSON `body` needs `JSON.stringify()` and its own `Content-Type` header, as with `fetch` |
{: .nds-table .nds-responsive}

### Result
{: .nds-block-title}

| Property | Holds |
|---|---|
| `isJson` | `true` when the body was parsed as JSON |
| `data` | The parsed JSON, or the body as text. An empty body gives `''`, also with `json: true` |
{: .nds-table .nds-responsive}

### Failures
{: .nds-block-title}

The promise rejects with an error. Tell the failures apart by these tests:

| Failure | Test | Detail |
|---|---|---|
| A status outside 200 to 299 | `error.status` is set | `status` is the HTTP code, and `url` is the URL you passed. `body` holds up to 512 characters of the response, or `undefined` when they cannot be read |
| Timeout | `error.name === 'TimeoutError'` | The request passed `timeout` |
| Your signal aborted | `error.name === 'AbortError'` | The name is `AbortError` only when you call `abort()` with no reason. A reason you pass to `abort()` becomes the error |
| Body too large | `error.message === 'Response too large'` | The `Content-Length` header, or the body read so far, passed `maxBytes` |
| Network failure | `error.name === 'TypeError'` | `fetch` got no response: the network is down, or the browser blocked the request |
| Invalid JSON | `error.name === 'SyntaxError'` | The body was parsed as JSON and was not valid JSON |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.request(url, options)` | Sends the request. Returns a promise of `{ isJson, data }` |
{: .nds-table .nds-responsive}

<script type="text/html" id="request-api-js" data-canon data-lang="js">
// Post a form and read the HTML fragment it returns.
// A page of markup can pass 1 MB, so raise the cap to 4 MB.
const form = document.querySelector('#search-form');
const { data } = await NDS.request(form.action, {
  method: 'POST',
  body: new FormData(form),
  maxBytes: 4194304
});
// data holds the HTML as text.
</script>

The full API is in the banner of `_js/nds-core.js`, and in the comment above `NDS.request` there.

</div>
  </div>
</section>

<section id="requestRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Filter](../components/filter): the `nds:filterFormAjax` event lets you send the search yourself. Its `rollback()` puts the chips, the badge and the URL back when your request fails.
- [User Feedback](../components/user-feedback): Submit sends the form with `NDS.request`.
- [Cooldown Button](../components/cooldown-button): a resend request that resets the cooldown when it fails.
- [Autocomplete](../components/autocomplete): loads its results with `NDS.request`.

</div>
  </div>
</section>
