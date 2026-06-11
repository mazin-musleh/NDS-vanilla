# Puppeteer Behavior Test — playbook for the per-file review agent

Phase 6's review agent uses this to **actually drive the fixed component in a real
browser** instead of handing the user a "test 1/2/3" checklist. Re-running the rule
catalog proves the bad pattern is gone; this proves the component still works.

The review agent runs the static review **and** this behavior test in the same
spawn, then reports both. A behavior-test failure is a regression — it blocks the
clean per-file summary exactly like a static-review regression.

---

## Environment (already provisioned in this repo)

- **Driver:** `puppeteer-core` (in `node_modules/` — confirm with `node -e "require('puppeteer-core')"`).
  `puppeteer-core` ships **no** bundled browser, so an `executablePath` is **required**.
- **Browser executablePath**, first that exists:
  1. `C:\Program Files\Google\Chrome\Application\chrome.exe`
  2. `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
  3. `C:\Program Files\Microsoft\Edge\Application\msedge.exe`
- **Dev server:** `bundle exec jekyll serve` on **http://localhost:4002**.
  Reuse a running server (`curl -s -o /dev/null -w "%{http_code}" http://localhost:4002`
  → `200`). If none is up, the user's "test the fix with Puppeteer" request is the
  explicit authorization to start one — launch it in the background, wait until the
  port answers `200`, and leave it running for the rest of the batch (don't restart
  per file). After a `_js/` fix you already ran `ruby _plugins/js_processor.rb`, and
  jekyll regenerates the bundle copy under `_site/` on the next request, so a reused
  server still serves the rebundled JS — no restart needed.

## Surface selection (where to drive the component)

Pick the first reachable surface; the served URL mirrors the source path:

1. `components/{name}.md` → `http://localhost:4002/components/{name}.html` — the live demo + every variant. Preferred: it exercises real markup.
2. `examples/*.md` that embed the component → the example's served URL.
3. `playground.html` → drop the canonical markup (from the component doc's `<code class="lang-html code">` block) onto the playground and drive that.
4. **No headless-reachable surface** (UI-shell pieces — `header`, `footer`, `mainnav`, `theme`, `fontLoading` — or an interaction that can't be reproduced without a real user gesture the browser blocks): do **not** fake a pass. Report `behavior: "not-headless-testable"`, name why, and fall back to emitting the per-rule user checklist for that rule only.

Never use `file://` — NDS fetches (i18n JSON, autocomplete) fail under CORS there (see project memory). Always go through `http://localhost:4002`.

## What every test must capture

- **Console errors / pageerrors** — the cheapest regression signal. A typo in injected setup (`new AbortController()`, renamed field, observer scaffolding) throws a `ReferenceError`/`TypeError` during init; everything after it silently stops binding. Subscribe before `goto`:
  ```js
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  ```
- **The rule's specific interaction** — drive it, then assert the expected DOM/behavior. Map the rule to a scenario from the "Behavior regression verification (per rule)" table in `SKILL.md` (that table is the scenario source — automate the row, don't print it). Examples:
  - JSD-01 → trigger each state transition, assert `data-state` token set via `NDS.State.get(el)`.
  - JSP-06 / JSD-09 → exercise one click **and** one keyboard path, then open/close the component ~20× and assert the listener count or detached-node count didn't grow.
  - JSS-01 / JSA-12 → render every variant, snapshot `outerHTML`, paste `<img src=x onerror=...>` as the user value and assert it renders as literal text (no `alert`).
  - JSS-03 → assert the rendered `<a>` carries `rel` containing `noopener`.

## Run shape

Write a throwaway ESM script to `c:\tmp\nds-pup-{name}.mjs`, run it with `node`, parse its single-line JSON verdict, then delete it.

```js
import puppeteer from 'puppeteer-core';
const EXE = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
             'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
             'C:/Program Files/Microsoft/Edge/Application/msedge.exe']
            .find(p => (await import('fs')).existsSync(p));
const browser = await puppeteer.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));
await page.goto('http://localhost:4002/components/{name}.html', { waitUntil: 'networkidle2' });
// ── per-rule interaction + assertions via page.$eval / page.evaluate / page.click ──
const result = { /* per-rule pass flags */ };
await browser.close();
console.log(JSON.stringify({ consoleErrors: errors, result }));
```

(`headless: false` is fine for debugging a flaky assertion locally, but default to `true` for the batch.)

## Performance measurement (before/after)

For a **perf fix** (any actionable JSP finding, or a JSA perf finding with a headless-measurable metric), don't just confirm it still works — **quantify the improvement** with a before/after measurement so the per-file summary carries a real number, not an estimate.

**Two passes, same scenario.** The "before" pass runs against the pre-fix bundle (Phase 5 step 0, *before* the edit); the "after" pass runs against the rebundled fix. Drive the *identical* scripted scenario both times (same event count, same cycle count, same viewport) so the delta is attributable to the fix alone. Run each pass 3× and take the median — single runs are noisy.

**Pick the metric that matches the rule** (don't measure wall-clock when the fix targets something else):

| Rule(s) | Metric | How to capture |
|---|---|---|
| JSP-01, JSP-02, JSP-07 (resize/scroll/debounce throttle) | Handler invocation count + scripting time during a fixed event burst | `page.evaluateOnNewDocument` to install a counter the real handler increments, OR wrap and count; dispatch a fixed burst (e.g. 100 `scroll`/`resize`/`input` events), read the count. Throttled fix → far fewer invocations for the same burst. |
| JSP-03, JSP-04, JSP-05 (observer pooling) | Live observer-instance count | `evaluateOnNewDocument` to wrap `IntersectionObserver`/`ResizeObserver`/`MutationObserver` constructors with a global counter; load the page, read the count. Pooled fix → constant count regardless of element count. |
| JSP-06, JSP-08, JSP-09, JSD-09, JSA-03 (leaks / unbounded growth) | JS heap + detached-node count across N create→destroy (or open→close) cycles | CDP `Performance.getMetrics` → `JSHeapUsedSize`; run ~20 cycles with a forced GC (`HeapProfiler.collectGarbage` via CDP) between measure points. Leak fix → flat heap instead of monotonic growth. |
| JSP-10, JSA-01 (eager IIFE / blocking init loops) | Long-task time / init duration | `PerformanceObserver({type:'longtask'})` installed via `evaluateOnNewDocument`; sum long-task duration through load. Or `performance.measure` around the init mark. Fix → lower total blocking time. |
| JSA-02, JSD-06 (layout thrashing) | Forced `LayoutCount` / `RecalcStyleCount` | CDP `Performance.enable` then `Performance.getMetrics` before and after driving the interaction; diff `LayoutCount` and `RecalcStyleCount`. Batched-reads fix → fewer forced layouts for the same interaction. |
| JSA-06 (unaborted fetch) | Concurrent in-flight requests during a typeahead burst | Count `page.on('request')` minus `requestfinished`/`requestfailed` at peak while firing rapid `input` events. Abort fix → at most 1 in flight. |

**CDP metrics snippet:**
```js
const cdp = await page.target().createCDPSession();
await cdp.send('Performance.enable');
const read = async () => Object.fromEntries(
  (await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
const before = await read();
// ... drive the interaction ...
const after = await read();
const dLayout = after.LayoutCount - before.LayoutCount;
const dHeap   = after.JSHeapUsedSize - before.JSHeapUsedSize;
```

**Honesty clause.** If the fix's benefit isn't reliably measurable headless (a pooling win that only shows at element counts the demo page doesn't reach; a scheduling-primitive swap like JSA-04 whose effect is sub-millisecond; a fix dominated by run-to-run noise larger than the delta), say so: report `perf: "structural — not micro-benchmarkable headless"` and state the qualitative benefit in one line. Never invent a percentage. A measured "no significant change (within noise)" is a valid, honest result — surface it rather than massaging the scenario until a number appears.

## Output contract (back to the per-file summary)

Return one block per rule tested:

- `PASS` — interaction reproduced, assertions held, `consoleErrors` empty. One line: what was driven + the asserted result.
- `FAIL` — assertion broke or `consoleErrors` non-empty. Quote the failing assertion / error text. **This is a regression** → the agent's overall verdict is "regression found," the clean summary is withheld, the batch pauses.
- `not-headless-testable` — no reachable surface or browser-blocked gesture. State why; emit the per-rule user checklist as the fallback for that rule.

For a **perf fix**, add a `perf` line per measured rule: the metric, the before number, the after number, and the delta (e.g. `JSP-02 perf: scroll-handler invocations over 100 events — before 100, after 7 (−93%)` or `JSA-02 perf: forced LayoutCount for one open — before 14, after 3`). Use `perf: "structural — not micro-benchmarkable headless"` (with the one-line qualitative benefit) or `perf: "no significant change (within noise)"` when honest measurement yields no clean delta. The behavior `PASS`/`FAIL` verdict is independent of the perf delta — a fix can be functionally correct (`PASS`) while showing a within-noise perf delta; report both.

## Hygiene

- One browser per script run; always `browser.close()` in a `try/finally` (even on assertion failure), and delete the `c:\tmp\nds-pup-*.mjs` scratch file after.
- Leave the dev server running across the batch; if you started it, stop it only at batch end (`stop`/last file) or note that it's still running.
- Keep each script focused on the rules that fired in **this** file — don't sweep the whole component surface.
