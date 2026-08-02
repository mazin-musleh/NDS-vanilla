---
layout: page
title: Request
hero_title: Request - National Design System
hero_description: A fetch wrapper that applies a timeout, a response size cap, and a status check to every call, then hands back parsed JSON or raw text. Use it anywhere you would reach for fetch so a hung endpoint or an oversized response cannot leave your UI stuck.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.6.0"
updated: "1.6.0"
last_edit: "29/07/2026 - 03:35 PM"
---

<!-- Overview -->
<section id="requestOverview" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
      <p class="nds-section-description"><code class="nds-inline-code lang-js">NDS.request()</code> ships in the main bundle and is available on every page. It owns the part of a request that is easy to get wrong: aborting on time, refusing a response that is too large, throwing on a non-OK status, and deciding whether the body is JSON. Every component in the system that fetches goes through it.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clock-01"></i>
            <span class="nds-label">Timeout by default</span>
          </span>
          <p class="nds-item-desc">Every call aborts after 15 seconds unless you set your own. A stalled endpoint surfaces as a rejection instead of a spinner that never stops.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">Response size cap</span>
          </span>
          <p class="nds-item-desc">Bodies are streamed and cancelled the moment they pass <code class="nds-inline-code lang-js">maxBytes</code>, so an unexpectedly huge response is refused rather than parsed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cancel-01"></i>
            <span class="nds-label">Abort composition</span>
          </span>
          <p class="nds-item-desc">Pass your own <code class="nds-inline-code lang-js">signal</code> and it is combined with the timeout, so a superseding request and an expiry both cancel cleanly through one channel.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-source-code"></i>
            <span class="nds-label">JSON or text, decided for you</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-js">Content-Type</code> header picks the branch, and <code class="nds-inline-code lang-js">json: true</code> forces parsing when you know the endpoint better than its headers do.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-alert-circle"></i>
            <span class="nds-label">Errors you can branch on</span>
          </span>
          <p class="nds-item-desc">Failures carry <code class="nds-inline-code lang-js">status</code> and <code class="nds-inline-code lang-js">name</code>, so retry logic never has to match on a message string.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sliders-horizontal"></i>
            <span class="nds-label">Every fetch option still works</span>
          </span>
          <p class="nds-item-desc">Anything you would pass to <code class="nds-inline-code lang-js">fetch</code>, including <code class="nds-inline-code lang-js">method</code>, <code class="nds-inline-code lang-js">headers</code>, <code class="nds-inline-code lang-js">body</code>, and <code class="nds-inline-code lang-js">credentials</code>, is forwarded untouched.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Basic Example -->
<section id="requestExample" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Example</h2>
      <p class="nds-section-description">The default shape: read JSON, render on success, branch on <code class="nds-inline-code lang-js">error.status</code> for known failure modes.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Read JSON from an endpoint</div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided">
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                    aria-controls="panel-request-basic-1" id="tab-request-basic-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-request-basic-1"
                  aria-labelledby="tab-request-basic-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-js code">
try {
  const { data } = await NDS.request('/api/services', { json: true });
  renderServices(data);
} catch (error) {
  if (error.status === 404) return showEmptyState();
  showError();
}
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

<!-- Options -->
<section id="requestOptions" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Options</h2>
      <p class="nds-section-description">Four options belong to the helper. Everything else in the object is handed to <code class="nds-inline-code lang-js">fetch</code> as-is, so any option <code class="nds-inline-code lang-js">fetch</code> supports now or gains later works without a change here. The trade is a shared name space: these four names are ones <code class="nds-inline-code lang-js">fetch</code> can never use, which is why they stay deliberately outside its vocabulary.</p>
    </div>
    <div class="nds-section-body">
      <table class="nds-table nds-responsive">
        <thead><tr><th>Option</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code class="nds-inline-code lang-js">timeout</code></td><td>15000</td><td>Milliseconds before the request aborts. Set <code class="nds-inline-code lang-js">0</code> to opt out entirely, for a long poll or a stream.</td></tr>
          <tr><td><code class="nds-inline-code lang-js">maxBytes</code></td><td>1048576</td><td>Ceiling on the response body, in bytes. Raise it for HTML fragments, which run larger than JSON payloads.</td></tr>
          <tr><td><code class="nds-inline-code lang-js">json</code></td><td>sniffed</td><td>Forces the JSON branch on or off. Without it the <code class="nds-inline-code lang-js">Content-Type</code> header decides. Pass <code class="nds-inline-code lang-js">true</code> when the endpoint returns JSON but the host may mislabel it.</td></tr>
          <tr><td><code class="nds-inline-code lang-js">signal</code></td><td>none</td><td>Your own <code class="nds-inline-code lang-js">AbortSignal</code>, combined with the timeout rather than replacing it.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Result -->
<section id="requestResult" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Result and Failures</h2>
      <p class="nds-section-description">A resolved call returns an object, so it can grow new fields later without breaking callers. A rejected call throws an <code class="nds-inline-code lang-js">Error</code> you can classify without reading its message.</p>
    </div>
    <div class="nds-section-body">
      <table class="nds-table nds-responsive">
        <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code class="nds-inline-code lang-js">isJson</code></td><td>boolean</td><td>Whether the body was treated as JSON.</td></tr>
          <tr><td><code class="nds-inline-code lang-js">data</code></td><td>object | string</td><td>Parsed JSON, or the raw text when it is not JSON. An empty body yields an empty string.</td></tr>
        </tbody>
      </table>
      <table class="nds-table nds-responsive">
        <thead><tr><th>Failure</th><th>How to detect it</th></tr></thead>
        <tbody>
          <tr><td>Non-OK status</td><td><code class="nds-inline-code lang-js">error.status</code> holds the HTTP code, <code class="nds-inline-code lang-js">error.url</code> the request URL, and <code class="nds-inline-code lang-js">error.body</code> a best-effort slice of the response body (first ~512 bytes, <code class="nds-inline-code lang-js">undefined</code> if the read failed). Surface it in the toast or log so the operator sees what the server actually said.</td></tr>
          <tr><td>Timeout reached</td><td><code class="nds-inline-code lang-js">error.name === 'TimeoutError'</code></td></tr>
          <tr><td>Aborted by your signal</td><td><code class="nds-inline-code lang-js">error.name === 'AbortError'</code>. Usually means a newer request replaced this one, so most callers stay silent here.</td></tr>
          <tr><td>Over <code class="nds-inline-code lang-js">maxBytes</code></td><td>Neither a status nor a recognised name is present.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Usage -->
<section id="requestUsage" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
      <p class="nds-section-description">Two more shapes cover the rest: a read a later interaction can cancel, and a read whose failure has to leave the page consistent.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">

        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Cancel a request that a newer one replaces</div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided">
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                    aria-controls="panel-request-abort-1" id="tab-request-abort-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-request-abort-1"
                  aria-labelledby="tab-request-abort-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-js code">
let controller;

async function search(term) {
  if (controller) controller.abort();
  controller = new AbortController();
  const { signal } = controller;

  setLoading(true);
  try {
    const { data } = await NDS.request(`/api/search?q=${encodeURIComponent(term)}`,
                                       { signal, json: true });
    renderResults(data);
  } catch (error) {
    // A newer search aborted this one. It owns the loading state now,
    // so clearing it here would kill a spinner that is still needed.
    if (error.name === 'AbortError') return;
    showError();
  } finally {
    if (controller.signal === signal) setLoading(false);
  }
}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Leave the page consistent when a request fails</div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided">
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                    aria-controls="panel-request-rollback-1" id="tab-request-rollback-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-request-rollback-1"
                  aria-labelledby="tab-request-rollback-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-js code">
// Taking over Filter's AJAX submission. Chips, badge and URL params are
// already committed when this fires, so a failed request has to put them
// back: otherwise they describe results that were never rendered.
filterEl.addEventListener('nds:filterFormAjax', (e) =&gt; {
  e.preventDefault();

  const params = new URLSearchParams(new FormData(e.detail.form));

  NDS.request(`/api/search?${params}`, { json: true })
    .then(({ data }) =&gt; renderResults(data.Records))
    .catch(() =&gt; e.detail.rollback());
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

<!-- Usage Guidelines -->
<section id="requestGuidelines" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
    </div>
    <div class="nds-section-body">

      <div class="nds-block">
        <h3 class="nds-block-title">Best Practices</h3>
        <ul>
          <li>Reach for it wherever you would call <code class="nds-inline-code lang-js">fetch</code> to read a response. The guards it adds are the ones every caller eventually needs and rarely writes.</li>
          <li>Pass <code class="nds-inline-code lang-js">json: true</code> whenever you know the endpoint returns JSON. Static hosts and misconfigured servers label JSON as <code class="nds-inline-code lang-js">text/plain</code> often enough that trusting the header silently hands you a string.</li>
          <li>Raise <code class="nds-inline-code lang-js">maxBytes</code> for HTML fragments. The default suits JSON payloads, and a full page of markup can legitimately exceed it.</li>
          <li>Treat <code class="nds-inline-code lang-js">AbortError</code> as silent. It means a newer request replaced this one, so showing an error would report a failure the user did not experience.</li>
          <li>Branch on <code class="nds-inline-code lang-js">error.status</code> and <code class="nds-inline-code lang-js">error.name</code>, never on the message text. Messages change; those two do not.</li>
          <li>Guard whatever you release in a <code class="nds-inline-code lang-js">finally</code> block. When a superseding request has already taken over the loading state, clearing it there hides a spinner that is still needed.</li>
          <li>Do not use it for uploads that need progress events. Those require <code class="nds-inline-code lang-js">XMLHttpRequest</code>, which is what <a class="nds-color" href="{{ 'components/upload' | relative_url }}">Upload</a> uses.</li>
          <li>Best-effort widget that wants a fallback instead of a throw on non-OK? A one-line wrapper at the call site is enough — no option needed here: <code class="nds-inline-code lang-js">const optional = (url, opts) =&gt; NDS.request(url, opts).catch(err =&gt; err.status ? null : Promise.reject(err));</code></li>
          <li>Do not wrap it in a retry helper without checking the request is safe to repeat. A filter or form submission may not be idempotent.</li>
          <li>Set <code class="nds-inline-code lang-js">timeout: 0</code> only for a connection meant to stay open. Every ordinary request is better off failing than hanging.</li>
        </ul>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">What it does not do</h3>
        <p>The helper owns the response contract and nothing else, which keeps it predictable across every component that calls it. It does not manage loading state, apply a response to the DOM, or build the request for you. It adds no retry, no caching, and no interceptors: pass <code class="nds-inline-code lang-js">cache: 'default'</code> through to <code class="nds-inline-code lang-js">fetch</code> and the browser HTTP cache handles repeat reads.</p>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <p>Available on every page as part of the main bundle. No initialization required.</p>
        <div class="nds-tabs nds-code nds-divided">
          <div class="nds-tab-list-container nds-scroll-more">
            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
              <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                aria-controls="panel-request-api-1" id="tab-request-api-1">
                <span class="nds-tab-label">JS API</span>
              </button>
            </nav>
            <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
            </button>
          </div>
          <div class="nds-tab-content">
            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-request-api-1"
              aria-labelledby="tab-request-api-1">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                  <i class="nds-icon nds-hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-js code">
NDS.request(url, options) → Promise&lt;{ isJson, data }&gt;

// options
//   timeout   number   ms before abort (default 15000, 0 disables)
//   maxBytes  number   response ceiling in bytes (default 1048576)
//   json      boolean  force the JSON branch (default: sniff Content-Type)
//   signal    AbortSignal  your own signal, combined with the timeout
//   ...rest   forwarded to fetch (method, headers, body, credentials, cache, …)

// resolves
//   isJson    boolean  whether the body was treated as JSON
//   data      object | string  parsed JSON, or raw text

// rejects
//   error.status              HTTP code on a non-OK response
//                             (error.url and error.body — first ~512 bytes of the
//                             response body, undefined if the read failed — set too)
//   error.name 'TimeoutError' the timeout elapsed
//   error.name 'AbortError'   your signal aborted, usually a superseding request
//   neither                   the response exceeded maxBytes

// POST a form and read an HTML fragment back
const { isJson, data } = await NDS.request('/api/search', {
  method: 'POST',
  body: new FormData(form),
  maxBytes: 4194304
});
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
