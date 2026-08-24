---
name: nds-perf
description: Measure real page performance for NDS pages (local builds or remote https URLs) using the repo's calibrated throttled-Chrome harness — LCP, FCP, reveal-gate timing, and with --trace a main-thread breakdown (style/layout/script self-time, culprit script frames, long tasks) — instead of hand-writing a Puppeteer script each time. Builds (if needed), gzip-serves the site like GitHub Pages, drives headless Chrome under slow-4G + 6.6× CPU on a mobile viewport, names the actual LCP element, and reports per-run values + median. Use for "measure LCP", "test LCP", "measure INP", "why is this component slow to respond", "interaction latency", "check page speed", "measure performance of <page>", "did this change regress LCP", "what's the LCP on mobile", "measure the live site", "profile the main thread", "what's blocking the main thread", "find long tasks". For the Lighthouse LAB score (the simulated 0–100), see the "Lighthouse lab score" section below — but trust this harness's real numbers over lantern's simulated LCP, which over-estimates ~2× on this site.
argument-hint: "[page-paths-or-urls…] [--runs=N] [--no-throttle] [--dir=PATH]"
---

# NDS Performance Measurement

Measure real LCP/FCP/reveal for `$ARGUMENTS` (page paths relative to the site root, or full `https://` URLs for remote pages like the live deploy; omit for the local home page).

This skill wraps the calibrated measurement harness used to verify every perf change in this repo, so the script never has to be rewritten. Three committed scripts live beside this file:
- `measure-lcp.mjs` — self-contained: starts its own gzip server, drives Chrome under the calibrated throttle, names the LCP element, prints per-run + median, tears down.
- `measure-inp.mjs` — the interaction sibling: loads a page, settles, clicks the selectors you name, reports each interaction's INP and the style/layout/script/paint split of the click window. See [Measuring INP](#measuring-inp-interaction-latency).
- `gz-serve.mjs` — standalone gzip static server (used by the script; also handy to keep a server up for a manual Lighthouse run).

## Why this and not `jekyll serve` + DevTools

Three traps this harness avoids — all have produced wrong answers before:
1. **`jekyll serve` ships assets uncompressed** → inflates transfer-bound metrics ~4×. This harness gzips text assets at level 9, mirroring GitHub Pages.
2. **Lighthouse default `throttlingMethod:"simulate"` (lantern) over-estimates LCP ~2×** on this site (it reports ~6 s while the real paint is ~1.4 s). This harness uses *applied* throttling via CDP and a real `PerformanceObserver`, so the number is what a device actually experiences.
3. **Calibration is machine-specific**: slow-4G network + **6.6×** CPU (not Lighthouse's 4×), mobile 412×915 @ DPR 2.6, cold browser per run, cache disabled, median of 3. Do not change these without re-deriving — see memory `project_crit_gate_si_lcp_measured`.

## Steps

1. **Build the site** (the script reads a built dir, default `_site`):
   ```bash
   bundle exec jekyll build
   ```
   Skip if `_site` is already current for what you're measuring. To compare a change, build the baseline to one dir and the change to another (e.g. `-d _site-after`) and run the script against each with `--dir`.

2. **Run the measurement** from the project root (so `puppeteer-core` resolves):
   ```bash
   # home page, 3 runs, calibrated throttle
   node .claude/skills/nds-perf/measure-lcp.mjs

   # specific pages (paths relative to the baseurl root; NO leading slash)
   node .claude/skills/nds-perf/measure-lcp.mjs components/ components/forms.html

   # against a different build dir, more runs, or unthrottled
   node .claude/skills/nds-perf/measure-lcp.mjs --dir=_site-after --runs=5
   node .claude/skills/nds-perf/measure-lcp.mjs --no-throttle

   # remote page (full URL, measured as-is — no build or local server needed)
   node .claude/skills/nds-perf/measure-lcp.mjs https://mazin-musleh.github.io/NDS-vanilla/
   ```
   > **Home page = pass no path.** Don't pass a bare `/` — Git Bash rewrites it to a Windows path (the script guards against it, but just omit it).
   > **Remote runs**: the emulated throttle stacks on the real network (real TTFB, slightly slower numbers than local) — compare remote medians to remote, local to local.

3. **Read the output.** Each run prints `ttfb | FCP | reveal | LCP <element>`; a `median LCP` line follows per page. The element label (`<img> name.webp` or `<p> .class`) tells you *what* the LCP is — image-hero pages are image-LCP, text-hero/doc pages are usually `.nds-section-description`. Pipe through `grep -vE 'could not be terminated|no running instance'` to drop harmless Windows process-kill noise.

## Flags

| flag | default | meaning |
|---|---|---|
| `--dir=PATH` | `_site` | built site directory to serve |
| `--runs=N` | `3` | runs per page (median reported) |
| `--no-throttle` | off | unthrottled (CPU 1×, no network shaping) |
| `--cpu=N` | `6.6` | override CPU slowdown multiplier |
| `--baseurl=PREFIX` | `/NDS-vanilla` | site baseurl prefix |
| `--chrome=PATH` | auto | Chrome path (else `CHROME_PATH` env, then common locations) |
| `--trace` | off | per-run main-thread breakdown (script/style-layout/paint/parse/gc self-time), **culprits** (top script frames by self + forced time), and long tasks ≥50ms with the longest task's dominant child — parsed from a DevTools trace. Tracing adds overhead — use it to diagnose *where* time goes, not for regression medians |
| `--monitor` | off | inject `_includes/perf-monitor.html` into the page (no `perf_monitor: true` rebuild needed; works on remote URLs): **CLS with shifting elements named**, LoAF long tasks with per-script forced-layout attribution, reflow hotspots, FPS drops. Wraps DOM globals — perturbs timing like `--trace`; diagnosis only |

### Attributing main-thread time to scripts/functions (`--trace`)

The `culprits` line names the script frames that own the time: `self` = the function's own JS, `forced` = the style/layout/paint work it triggered (e.g. `initializeContainer@nds-main.min.js:1:48211 1.9s (forced 1.7s)`). The longest long task also names its dominant child (`Layout 610ms ← t@nds-main.min.js:1:48211`).

Bundles are minified, so function names are usually mangled — the `file:line:col` still locates the code (grep the offset, or map it back to `_js/`). For **readable names**, rebuild unminified first:
1. Set `debug: true` in `_config.yml`, then `ruby _plugins/js_processor.rb && bundle exec jekyll build`.
2. Measure with `--trace`.
3. **Restore `debug: false` and rerun both commands** — the bundles are committed artifacts; leave them minified (verify with `git status`).

Unminified bundles are ~3–4× larger, so use those runs to identify *who*, not to read absolute numbers — re-measure minified for magnitudes.

### CLS and on-page diagnostics (`--monitor`)

`--monitor` injects the repo's perf-monitor overlay ([_includes/perf-monitor.html](../../../_includes/perf-monitor.html)) headlessly and scrapes `__ndsPerf.data()` after the run. Per run you get `monitor: CLS 0.0000 · DOM 1234 · FPS min N` plus the monitor's problem lines: layout shifts **with the shifting element named**, LoAF long tasks with per-script `forced-layout` attribution, and reflow hotspots. This is the harness's only CLS source — use it to verify a change didn't introduce shifts (e.g. the content-visibility adoption). Pick `--trace` for *where main-thread time goes*, `--monitor` for *CLS sources + which script forced layout*; both perturb timing, so neither belongs in regression medians.

## Measuring INP (interaction latency)

LCP is a load metric; a component that paints fast can still take half a second to respond to a tap. `measure-inp.mjs` measures that, on the same calibration:

```bash
# a component's primary interaction, low-end phone
node .claude/skills/nds-perf/measure-inp.mjs   --url=http://localhost:4002/NDS-vanilla/components/modal.html   --click="[data-modal-open]" --cpu=20

# a sequence — each --click fires in order and is reported separately
node .claude/skills/nds-perf/measure-inp.mjs --url=... --click=".open" --click=".close"

# isolate third-party cost on a live consumer site
node .claude/skills/nds-perf/measure-inp.mjs --url=https://example.gov.sa/   --click="button.nds-nav-link[aria-expanded]" --block="*clarity*"
```

Per click it prints the INP median, one run's **input delay / processing / presentation** split, and the click window as **script + style (xN) + layout (xN) + paint**. Read the split before optimising: `processing` near zero with a large `presentation` means the handler is fine and the render is the cost, and a high style count means something is invalidating style repeatedly (an attribute written on `<body>`, a class toggled in several separate frames).

`--cpu=20` is the low-end-device proxy; the calibrated `6.6` is a mid-range phone. Anchors: **good <=200ms, poor >500ms.**

Flags beyond the shared ones: `--url=` (required), `--click=SEL` (repeatable), `--settle=MS` before the first click (default 4000), `--wait=MS` after each (default 2500), `--reduced` (emulate `prefers-reduced-motion` — isolates transition cost), `--block=PATTERN` (repeatable).

**Two traps this script exists to avoid.** Anchor clicks are `preventDefault`ed so a navigation can't tear the page down mid-measurement. And it never uses `setRequestInterception` — that silently suppresses every event-timing entry, so `interactionCount` reads 0 and a broken rig looks like a fast page. The script asserts `interactionCount > 0` and shouts if not; do not trust a run that warns.

## Lighthouse lab score (optional, separate concern)

The 0–100 PSI/Lighthouse score uses lantern simulation and won't match this harness's real LCP. To reproduce it locally, keep a server up and point `npx lighthouse` at it:
```bash
node .claude/skills/nds-perf/gz-serve.mjs _site 4100 &   # serves http://localhost:4100/NDS-vanilla/
npx -y lighthouse "http://localhost:4100/NDS-vanilla/" --quiet \
  --chrome-flags="--headless=new" --only-categories=performance \
  --form-factor=mobile --screenEmulation.mobile \
  --output=json --output-path=lh.json
# then read .audits.metrics.details.items[0].observed* for the REAL paint vs the simulated LCP
```
When lantern shows a scary LCP, check the report's `observed*` metrics (or this harness) before believing it. The PSI anonymous API quota is shared and exhaustible; `npx lighthouse` against the live deploy is the fallback.
