#!/usr/bin/env python3
"""Print the test-machine speed and main-thread numbers behind a PSI permalink.

    python scripts/psi-report.py https://pagespeed.web.dev/analysis/<slug>/<id>

A pagespeed.web.dev permalink embeds the full Lighthouse JSON (mobile + desktop)
as a JS string in the HTML, so no API key or browser is needed. `benchmarkIndex`
is Google's own speed probe of the machine that ran the test: on 2026-09-06 the
same page scored 99 on a 790 machine and 72 on a 262 machine in the same minute.
"""
import json
import re
import sys
import urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0"


def embedded_reports(html):
    """Yield every Lighthouse result embedded as an escaped JS string literal."""
    for m in re.finditer(r'\\"lighthouseVersion\\"', html):
        i = m.start()
        while i > 0 and not (html[i] == '"' and html[i - 1] != "\\"):
            i -= 1
        j = i + 1
        while j < len(html):
            if html[j] == "\\":
                j += 2
                continue
            if html[j] == '"':
                break
            j += 1
        try:
            yield json.loads(json.loads('"' + html[i + 1 : j] + '"'))
        except ValueError:
            continue


def summarize(lhr):
    a = lhr["audits"]
    env = lhr["environment"]
    chrome = re.search(r"Chrome/[\d.]+", env["hostUserAgent"])
    items = lambda k: (a.get(k, {}).get("details") or {}).get("items", [])
    style = next((i["duration"] for i in items("mainthread-work-breakdown") if i["groupLabel"] == "Style & Layout"), 0)
    long_tasks = [round(i["duration"]) for i in items("long-tasks")]
    return {
        "form": lhr["configSettings"]["formFactor"],
        "captured": lhr["fetchTime"][:16].replace("T", " "),
        "chrome": chrome.group(0) if chrome else "?",
        "benchmarkIndex": env["benchmarkIndex"],
        "cpuMult": lhr["configSettings"]["throttling"]["cpuSlowdownMultiplier"],
        "score": round(lhr["categories"]["performance"]["score"] * 100),
        "TBT": a["total-blocking-time"]["displayValue"].replace(" ", " "),
        "LCP": a["largest-contentful-paint"]["displayValue"].replace(" ", " "),
        "style+layout ms": round(style),
        "long tasks ms": long_tasks,
    }


def main(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")
    reports = list(embedded_reports(html))
    if not reports:
        sys.exit("no embedded Lighthouse report found — is this a pagespeed.web.dev/analysis/<slug>/<id> permalink?")
    for r in reports:
        for k, v in summarize(r).items():
            print(f"{k:>16}: {v}")
        print()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
