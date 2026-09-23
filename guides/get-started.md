---
layout: page
title: Get Started
since: "1.6.0"
last_edit: "23/09/2026 - 06:44 PM"
lang: en
direction: ltr
hero_title: Get Started with NDS
hero_style: nds-flat
hero_description: "How to install NDS, build UI with an AI coding agent, verify the result, and upgrade to new releases."
breadcrumb:
  - ["Guides", "/guides"]
layout_class: nds-wSideInfo
sidemenu_mode: false
---

<section id="getStartedGuide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-md nds-sticky nds-top" aria-label="On this page">
            <nav class="nds-toc" aria-label="Table of contents" style="--toc-skeleton-rows: 14"
                data-toc-source="#getStartedGuide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                    <span class="nds-label">On this page</span>
                    <h2 class="nds-toc-title nds-truncate">NDS Integration</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>

        <div class="nds-info-content">
            <article class="nds-prose">

                <h2 id="overview">Overview</h2>
                <p>Build with NDS through an AI coding agent. The agent copies UI from the NDS template and follows <a class="nds-color" href="{{ 'guides/integration-quality' | relative_url }}">NDS IQ</a>, the rules for how to build, port, and verify pages.</p>

                <div class="nds-alert nds-card nds-color" data-status="info" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Validated with Claude Code</span>
                            <p class="nds-alert-description">NDS IQ is validated end to end with Claude Code. It is designed to work with other agents, but results can vary.</p>
                        </div>
                    </div>
                </div>

                <div class="nds-alert nds-card" data-status="info" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Prerequisites</span>
                            <ul class="nds-alert-description">
                                <li><strong>A local AI coding agent</strong> that can read and edit your files, such as Claude Code, Cursor, or Codex. A chat assistant in the browser cannot reach your project.</li>
                                <li><strong>An application that already serves at least one page.</strong> NDS adds the UI layer; it does not create the app.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h2 id="setup">1. Setup</h2>
                <p>Setup runs once. The agent installs NDS IQ, downloads the template, sets the project paths, and writes a plan for you to review.</p>

                <h3 id="instructions-block">Setup Prompt</h3>
                <p>Open a new agent session and paste this prompt:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Download the raw file to `NDS-IQ.md` at the project root using `curl` or another direct HTTP client. Do not use a web-fetch tool: it may save a re-rendered copy.
https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md

Confirm that the file starts with `# NDS IQ`, then read it from top to bottom. This is the project's UI-layer rulebook. All NDS work runs by its rules. Set up NDS IQ in this project as its install section describes.
                    </code>
                </div>

                <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Before you paste</span>
                            <p class="nds-alert-description">Use a mode that lets the agent edit files. Approve internet access if the agent asks for it.</p>
                        </div>
                    </div>
                </div>

                <p>Setup adds three things:</p>
                <ol>
                    <li><code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root. This is the rules file.</li>
                    <li>An <strong>anchor</strong> in <code class="nds-inline-code lang-html">CLAUDE.md</code> (Claude Code) or <code class="nds-inline-code lang-html">AGENTS.md</code> (Cursor, Codex). It holds the project paths and tells the agent to read the rules before NDS work.</li>
                    <li>The <strong>NDS template</strong> in <code class="nds-inline-code lang-html">.nds/</code>. It matches the release your project already runs, or the latest release on a first install.</li>
                </ol>

                <h3 id="paths">Paths</h3>
                <p>The anchor holds two paths. The agent fills in <code class="nds-inline-code lang-html">NDS_ASSETS</code> and asks you only when more than one folder could fit. It confirms the asset URL before it writes the first asset tag.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The template folder. Default: <code class="nds-inline-code lang-html">.nds/</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The folder your app serves static files from, such as <code class="nds-inline-code lang-html">public/assets/</code> or <code class="nds-inline-code lang-html">wwwroot/</code>.</td></tr>
                    </tbody>
                </table>
                <p>Never edit <code class="nds-inline-code lang-html">NDS-IQ.md</code>. Updates replace it as a whole.</p>

                <h3 id="plan-review">Plan Review</h3>
                <p>Next, the agent lists your pages, routes, and old UI libraries in <code class="nds-inline-code lang-html">NDS-PLAN.md</code>. Then it stops and asks all project-wide questions in one message: the asset URL, the porting strategy, what to do with earlier NDS work, CSP (only if your project has one), and the pace.</p>

                <p>If the agent did not write the plan, paste:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Inventory the project and write NDS-PLAN.md for my review.
                    </code>
                </div>

                <p>The plan is required for more than one page. You can skip it for a one-page trial, but then the agent keeps no record between sessions.</p>

                <h3 id="manual-install">Manual Install (optional)</h3>
                <p>Setup does both steps below. Do them by hand only if the agent cannot download files.</p>

                <p><strong>Step 1. Install the template.</strong> Download <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a>. Extract it into a <code class="nds-inline-code lang-html">.nds/</code> folder at the project root, and add that folder to <code class="nds-inline-code lang-html">.gitignore</code>. <code class="nds-inline-code lang-html">_site/</code> must sit directly inside <code class="nds-inline-code lang-html">.nds/</code>, with no version folder between them.</p>
                <p>The template is read-only: copy from it, never change it.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
.nds/
├── README.md          - Overview and entry-point documentation
├── _site/             - Compiled documentation and runtime assets
│   ├── components/    - Canonical component markup
│   └── assets/        - Runtime CSS, JS, fonts, and i18n
├── _source/           - Source files and catalogs (added on install)
├── CHANGELOG.md       - Release history and migration notes
└── LICENSE            - License terms
                    </code>
                </div>

                <p><strong>Step 2. Install the rules.</strong> Save the rules below as <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root. Copy them exactly. Then add the anchor to your agent file and set <code class="nds-inline-code lang-html">NDS_ASSETS</code>. The anchor text is in the rules' <em>Install and upgrade this file</em> section.</p>
{%- capture _instr %}{% include NDS-IQ.md %}{% endcapture %}
{%- assign _iq_parts = _instr | split: 'instructions v' %}
{%- assign _iq_v = _iq_parts[1] | split: ')' | first %}
                <div class="nds-code nds-expandable">
                    <span class="nds-code-tags lang-markdown">
                        <span class="nds-tag nds-gray nds-xs nds-code-lang lang-markdown"><span class="nds-label">Markdown</span></span>
                        <span class="nds-tag nds-green nds-xs"><span class="nds-label">IQ v{{ _iq_v }}</span></span>
                    </span>
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy NDS IQ instructions">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-markdown">
{{ _instr | strip | escape }}
                        </code>
                    </div>
                </div>

                <h2 id="sessions">2. Build</h2>
                <p>Once you approve the plan, ask for what you want: the outcome, the content, the data, and any limits. NDS IQ decides how the agent builds it.</p>

                <h3 id="agent-drives">Pace</h3>
                <p>Pick one:</p>
                <ul>
                    <li><strong>Gate by gate (default)</strong>: the agent builds one page at a time. For each page it asks its questions, builds, checks the page in a browser, updates the plan, and stops for your approval.</li>
                    <li><strong>Whole plan</strong>: the agent builds every page with the default answers. It reports all decisions and open checks at the end.</li>
                </ul>
                <p>Either way, only you can mark a page <code class="nds-inline-code lang-html">Built and Verified</code>.</p>

                <h3 id="verification">Browser Verification</h3>
                <p>The agent checks every page in a browser, twice:</p>
                <ul>
                    <li><strong>Behavior</strong>: it loads the page, reads the console, runs <code class="nds-inline-code lang-js">NDS.Init.audit()</code>, and tries every interaction and form check.</li>
                    <li><strong>Look</strong>: it compares the page with the matching template page at desktop and mobile widths, in light and dark mode.</li>
                </ul>
                <p>Reading the code is not verification.</p>

                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">No browser?</span>
                            <p class="nds-alert-description">The agent first sets up a headless browser of its own. If that fails, it gives you a checklist and names what it could not check.</p>
                        </div>
                    </div>
                </div>

                <h3 id="resuming">Next Session</h3>
                <p>In a new session, paste:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Continue: read NDS-PLAN.md and propose the next step.
                    </code>
                </div>

                <p>The work is done when every page in the plan is <code class="nds-inline-code lang-html">Built and Verified</code>. Pages marked <code class="nds-inline-code lang-html">Awaiting Verification</code> wait for your sign-off.</p>

                <p>Long sessions drift. If the agent skips the plan or asks something the rules already answer, tell it to <strong>follow the IQ</strong>. It reads the rules again and gets back on track.</p>

                <h3 id="legacy-cleanup">Legacy Library Removal</h3>
                <p>NDS pages never load old UI libraries such as jQuery or Bootstrap. The agent does not remove them from your project. That decision is yours.</p>

                <h3 id="findings-report">Findings Report</h3>
                <p>When the agent finds an NDS bug or gap, it writes it in <code class="nds-inline-code lang-html">NDS-REPORT.md</code>. Each entry names the NDS version, the rules version, the component, and a small repro. Review the report, then send real findings to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>.</p>

                <h2 id="upgrade">3. Upgrade</h2>
                <p>When a new release ships, paste:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Upgrade the NDS template to the latest release.
                    </code>
                </div>
                <p>The agent:</p>
                <ul>
                    <li>Replaces the template in <code class="nds-inline-code lang-html">NDS_ROOT</code> and copies the new runtime into <code class="nds-inline-code lang-html">NDS_ASSETS</code>.</li>
                    <li>Reads the changelog's migration notes and fixes the affected pages through the plan.</li>
                    <li>Replaces <code class="nds-inline-code lang-html">NDS-IQ.md</code> with the latest revision.</li>
                    <li>Reports new features you may want.</li>
                </ul>
                <p>Your anchor and paths do not change.</p>

                <h3 id="update-rules">Rules Update</h3>
                <p>To update only the rules, paste:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Update the NDS IQ rules file to the latest revision.
                    </code>
                </div>
                <p>The agent replaces <code class="nds-inline-code lang-html">NDS-IQ.md</code> when the published copy is different. If your template is also behind, it tells you.</p>

            </article>
        </div>
    </div>
</section>
