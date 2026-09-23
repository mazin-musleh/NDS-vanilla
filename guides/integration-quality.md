---
layout: page
title: NDS IQ
since: "1.7.0"
last_edit: "23/09/2026 - 05:18 PM"
lang: en
direction: ltr
hero_title: NDS IQ
hero_style: nds-flat
hero_description: "The instruction system AI coding agents use to build with NDS: how it is made, tested, versioned, and updated."
breadcrumb:
  - ["Guides", "/guides"]
layout_class: nds-wSideInfo
sidemenu_mode: false
---

{%- capture _instr %}{% include NDS-IQ.md %}{% endcapture %}
{%- assign _iq_parts = _instr | split: 'instructions v' %}
{%- assign _iq_v = _iq_parts[1] | split: ')' | first %}
<section id="ndsIqGuide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-md nds-sticky nds-top" aria-label="On this page">
            <nav class="nds-toc" aria-label="Table of contents" style="--toc-skeleton-rows: 11"
                data-toc-source="#ndsIqGuide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                    <span class="nds-label">On this page</span>
                    <h2 class="nds-toc-title nds-truncate">NDS IQ</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>
        <div class="nds-info-content">
            <article class="nds-prose">

                <h2 id="overview">Overview</h2>
                <p><strong>NDS IQ (Integration Quality)</strong> is the instruction system that AI coding agents use to build with NDS. It covers runtime setup, page builds, browser verification, porting, and upgrades.</p>
                <p>It installs as two pieces: <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root and a short <strong>anchor</strong> in <code class="nds-inline-code lang-html">CLAUDE.md</code> or <code class="nds-inline-code lang-html">AGENTS.md</code>. The anchor holds the project paths and tells the agent to read the rules before NDS work. The agent reads the rules once per session, when NDS work starts.</p>
                <p>The rules file is the same in every project. Project values, such as paths, live only in the anchor. The <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a> covers installation and use.</p>

                <h2 id="how-built">How It Is Built</h2>
                <h3 id="from-source">Source First</h3>
                <p>The NDS source defines what an agent must not guess: component markup, APIs, events, state, lifecycles, and attribute contracts. The rules tell the agent where to read each one. The agent works out the rest.</p>
                <p>When an agent gets something wrong, the fix goes into the source first: a doc page, an example, or a catalog entry. A new rule is added only when the source cannot carry the fix.</p>
                <h3 id="hardened">Field Evidence</h3>
                <p>Each rule starts from a <strong>real failure</strong>: a mistake an agent made on a real project. The failure becomes a rule candidate only after it is checked against the NDS source.</p>
                <h3 id="tested">Scenario Tests</h3>
                <p>Each real failure becomes a test scenario. A new rule must follow a <strong>fail, fix, pass</strong> loop: the scenario fails without the rule and passes with it. Passed scenarios stay in the suite, so a later edit cannot quietly break an older rule. Each revision is tested on the validated baseline model.</p>

                <div class="nds-alert nds-card nds-color" data-status="success" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Validated baseline</span>
                            <p class="nds-alert-description"><strong>Claude Sonnet</strong> is the validated baseline for NDS IQ. The rules are designed to produce consistent results across capable AI models.</p>
                        </div>
                    </div>
                </div>

                <h2 id="governs">What It Governs</h2>
                <p>Seven hard rules set the core limits:</p>
                <ol>
                    <li><strong>Read-only template</strong>: never edit the NDS template folder.</li>
                    <li><strong>No minified reads</strong>: read the source files, never the minified bundles.</li>
                    <li><strong>Canonical markup</strong>: copy component markup from the NDS docs; never invent it.</li>
                    <li><strong>Sections and primitives</strong>: build every page from NDS sections and layout primitives.</li>
                    <li><strong>Knobs and tokens first</strong>: style with NDS custom properties before any CSS override.</li>
                    <li><strong>No legacy libraries</strong>: NDS and plain JavaScript replace libraries such as jQuery, Bootstrap, and Select2.</li>
                    <li><strong>Approved porting strategy</strong>: agree how to replace existing UI before the first file changes.</li>
                </ol>
                <p>The agent applies these rules through one workflow: <strong>inventory → plan → build → verify</strong>. <code class="nds-inline-code lang-html">NDS-PLAN.md</code> records decisions and page status, so the next session can continue the work.</p>

                <h2 id="revisions">Revision History</h2>
                <p>NDS IQ is versioned independently from the template. The revision number in the rulebook heading changes once per published revision. The table lists published revisions only, so some numbers are skipped.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th data-align="center">Revision</th><th>Highlights</th></tr></thead>
                    <tbody>
                        <tr><td>v3.1</td><td>The runtime script tags now come from the built page, not a list of file names. The rules stay correct on templates that load the accessibility panel on demand, and on older ones that still ship its tag.</td></tr>
                        <tr><td>v3.0</td><td>A 34% shorter read, organized around the work. The agent picks a work mode first, and each phase has entry and exit checks. A new table sets who decides what: the existing UI owns the content, the backend owns the data rules, and NDS owns the structure. The existing UI never limits NDS features, so a missing search or filter is added by default. Mobile checks set the page viewport, not the browser window. A page with an unmet check stays <code class="nds-inline-code lang-html">In Progress</code>.</td></tr>
                        <tr><td>v2.2</td><td>Better support for apps that render in the browser, such as React or Vue apps. The mount element and every layout class must be correct in the first HTML, before the framework runs. Every page sets both language and direction. When the agent's context is summarized, the agent reads the rules again. A matched source keeps all its parts.</td></tr>
                        <tr><td>v2.1</td><td>Fewer questions, more defaults. The install, the full chrome, and the bilingual locale ship as they are. The plan review asks every project-wide question in one message. The plan tracks open items as checkboxes. The inventory checks old stylesheets for global rules that would change NDS pages.</td></tr>
                        <tr><td>v2.0</td><td>Verification runs in a headless browser first, so one run covers desktop and mobile. The agent copies the master layout whole from a built page, with the new Page Shell reference as its guide. Older templates use their built pages alone. Framework views that mount, re-render, or unmount now point to the refresh and destroy docs.</td></tr>
                        <tr><td>v1.0</td><td>Full rewrite, out of beta. The same rules, reordered around the work, with tables for allowed edits, bans, and stop points. A 40% shorter read. Validated against the full scenario suite on three model tiers before release.</td></tr>
                        <tr><td>v0.10</td><td>Field-tested on one production project. <code class="nds-inline-code lang-html">.nds/</code> became the fixed template folder. Added a check that the runtime bundles match, a Content Security Policy (CSP) check at install, a smoke check for pages when no browser is available, a list of forbidden edits to copied markup, and source-first fix proposals.</td></tr>
                        <tr><td>v0.9</td><td>Field-tested on three projects. Added safer updates, stable template paths, source-first guidance, chrome in the plan, a one-page waiver for the plan, findings for rule gaps, and CSP guidance.</td></tr>
                        <tr><td>v0.8</td><td>Removed version checks, so the rules work with any release. Added content-based updates, source files from the matching release, download checks, catalog checks, CSP checks, and a changelog review.</td></tr>
                        <tr><td>v0.7</td><td>Moved the rules into their own file, <code class="nds-inline-code lang-html">NDS-IQ.md</code>, with an anchor that names no version. Added source-based guidance for page JavaScript and canonical markup.</td></tr>
                        <tr><td>v0.6</td><td>Added steps to remove old NDS instructions, replaced blocks, conventions, and notes from a project.</td></tr>
                        <tr><td>v0.5</td><td>Added support for release folders, installs that read the runtime version first, a safe download of the raw rules file, legacy UI guidance, clean resets, and image size checks.</td></tr>
                        <tr><td>v0.4</td><td>Introduced the NDS IQ name. Added support for new projects and single-page trials, JavaScript facts, and guidance for menus that move to <code class="nds-inline-code lang-html">&lt;body&gt;</code>.</td></tr>
                        <tr><td>v0.3</td><td>Added a check of earlier NDS work against the current rules, plan status rules, update checks, and a way to refresh the rules.</td></tr>
                        <tr><td>v0.2</td><td>Added the porting strategy, full chrome coverage, plan rules, and the findings report.</td></tr>
                        <tr><td>v0.1</td><td>First release, with template 1.6.0. Revision numbers did not exist yet.</td></tr>
                    </tbody>
                </table>

                <h2 id="staying-current">Updates</h2>
                <ul>
                    <li><strong>Template upgrade</strong>: also replaces the rulebook with the latest published revision.</li>
                    <li><strong>Standalone update</strong>: fetches the latest published revision on demand.</li>
                </ul>
                <p>Both paths compare the <strong>content</strong> of the installed and published rulebooks. A difference means a newer revision exists, and the agent replaces the whole file. There is no merging or partial patching. The anchor has no version, so it and the project paths stay unchanged. Use the upgrade prompts in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

                <h2 id="compatibility">Compatibility</h2>
                <p>NDS IQ is designed for any AI coding agent that runs locally and can read files and run shell commands. It is validated end to end with Claude Code.</p>
                <p>The rules are written to work with any template release. If an older release lacks a feature the rules name, the agent uses that release's own docs and source instead. It reports the gap and can propose an upgrade.</p>

                <h2 id="the-instructions">The Instructions</h2>
                <p>The complete rulebook appears below, built from its source in the repository.</p>
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

                <h2 id="feeding-back">Feedback</h2>
                <p>Findings from real projects shape the next revision. The agent records NDS gaps, misleading docs, and reproducible bugs in the optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code>. The report is designed to contain no private project information.</p>
                <p>Review the report, then send the findings to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>. Each finding becomes a source fix, or a rule when the source cannot carry it.</p>

            </article>
        </div>
    </div>
</section>
