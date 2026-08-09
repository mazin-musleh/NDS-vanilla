---
title: Request
---

# Request

The shared fetch wrapper. Use it instead of a hand-written `fetch`, including
for calls to the project's own API.

## NDS.request(url, opts)

Returns `Promise<{data, response}>`. Carries a 15s default timeout and a
response-size cap; errors carry `.status`, `.url`, and a capped `.body`.

<code class="lang-js code">
const { data } = await NDS.request('/api/services', { json: true });
</code>

No XHR, no upload progress, no retry, no cache, no interceptors — it is a fetch
wrapper and nothing more.

Every request gets a visible failure path. Route errors somewhere the user can
see them and exercise that path once during verification.
