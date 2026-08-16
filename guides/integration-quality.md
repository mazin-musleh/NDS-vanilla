---
layout: page
title: NDS IQ
since: "1.7.0"
last_edit: "17/08/2026 - 12:34 AM"
lang: en
direction: ltr
hero_title: NDS IQ
hero_style: nds-flat
hero_description: "The instruction system that gives AI agents a consistent way to build with NDS: how it is engineered, tested, versioned, and kept current in a project."
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
                <p><strong>NDS IQ (Integration Quality)</strong> is the instruction system for building with NDS consistently. It covers runtime setup, page implementation, browser verification, porting, and upgrades.</p>
                <p>It installs as two pieces: <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root and a short <strong>anchor</strong> in <code class="nds-inline-code lang-html">CLAUDE.md</code> or <code class="nds-inline-code lang-html">AGENTS.md</code>. The anchor contains the project paths and tells the agent to read the rules before NDS work. The rules are loaded on demand, once per session.</p>
                <p>The rules are universal; project-specific values stay in the anchor. Updates replace <code class="nds-inline-code lang-html">NDS-IQ.md</code> as a whole. Installation and usage are covered in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

                <h2 id="how-built">How It Is Built</h2>
                <h3 id="from-source">From the Source Outward</h3>
                <p>Component lifecycles, events, state, dependencies, markup, APIs, and attribute contracts are defined where agents should not have to guess. Safe-to-derive details are left to the agent.</p>
                <h3 id="hardened">Hardened by Real Migrations</h3>
                <p>Rules are based on <strong>evidence, not speculation</strong>. Failures from real AI-assisted migrations become rule candidates only after verification against the NDS source.</p>
                <h3 id="tested">Tested per Revision</h3>
                <p>Each revision is tested against real failure scenarios on the baseline model tier it supports. New rules follow a <strong>fail, fix, pass</strong> loop, and passing scenarios remain as regression tests.</p>

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
                <p>Seven hard rules define the core constraints:</p>
                <ol>
                    <li><strong>Read-only template</strong>: never edit the NDS reference folder.</li>
                    <li><strong>No minified reads</strong>: use the readable source beside minified bundles.</li>
                    <li><strong>Canonical markup</strong>: copy component HTML from the documentation.</li>
                    <li><strong>Sections and primitives</strong>: compose pages through the NDS layout system.</li>
                    <li><strong>Knobs and tokens first</strong>: use custom properties before selector overrides.</li>
                    <li><strong>No legacy libraries</strong>: NDS and vanilla JS replace the legacy jQuery-era stack.</li>
                    <li><strong>Approved porting strategy</strong>: plan existing-UI replacement before implementation.</li>
                </ol>
                <p>The rules are supported by the <strong>inventory → plan → build → verify</strong> workflow and <code class="nds-inline-code lang-html">NDS-PLAN.md</code>, which carries project state between sessions.</p>

                <h2 id="revisions">Revision History</h2>
                <p>NDS IQ is versioned independently from the template. The revision is shown in the rulebook heading and indicates the maturity of the rule set.</p>
                <p>Updates compare the <strong>content</strong> of the installed and published rulebooks. A difference means a newer revision exists. The anchor has no version because it remains unchanged.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th data-align="center">Revision</th><th>Highlights</th></tr></thead>
                    <tbody>
                        <tr><td>v2.1</td><td>The plan inventory now opens every stylesheet the current UI loads globally and checks it for element-level selectors. Each hit is recorded in the plan, and the porting strategy must say how NDS pages escape it. The plan's open items are now tick boxes, so the dev can scan what is owed at a glance; a plan from an earlier revision converts at its next update.</td></tr>
                        <tr><td>v2.0</td><td>Verification now runs headless-first, so desktop and mobile are one run. The master layout is copied from a built page, guided by the new Page Shell reference, and older templates fall back to their built pages alone. Framework views that mount, re-render, or unmount route to the refresh and destroy docs.</td></tr>
                        <tr><td>v1.0</td><td>Full rewrite, out of beta. The same rules reordered around the work: standing principles, tables for edit kinds, bans, and stop states, and a 40% shorter read. Validated against the complete scenario suite on three model tiers before release.</td></tr>
                        <tr><td>v0.10</td><td>Field-tested on one production project. Set <code class="nds-inline-code lang-html">.nds/</code> as the fixed template home, and added runtime bundle cross-checks, an install-time CSP sweep, a no-browser smoke check for page verification, named bans for copy edits, and source-first fix proposals.</td></tr>
                        <tr><td>v0.9</td><td>Field-tested across three projects. Added safer update handling, stable template paths, source-first guidance, page chrome planning, single-page plan waivers, findings for rule gaps, and Content-Security-Policy guidance.</td></tr>
                        <tr><td>v0.8</td><td>Removed version gates and made the rules version-agnostic. Added content-based updates, source population from matching releases, download checks, catalog checks, CSP checks, and release-note review.</td></tr>
                        <tr><td>v0.7</td><td>Moved the rules into <code class="nds-inline-code lang-html">NDS-IQ.md</code> with a version-free anchor. Added source-based guidance for JavaScript wiring and canonical markup.</td></tr>
                        <tr><td>v0.6</td><td>Added cleanup guidance for stale NDS instructions, superseded blocks, conventions, and notes.</td></tr>
                        <tr><td>v0.5</td><td>Added release-folder handling, runtime-banner-first installs, raw-file fetch discipline, legacy UI guidance, clean resets, and image geometry checks.</td></tr>
                        <tr><td>v0.4</td><td>Introduced the NDS IQ name, greenfield handling, spike guidance, JS wiring facts, and menu portal guidance.</td></tr>
                        <tr><td>v0.3</td><td>Added conformance triage, plan lifecycle, update checks, and block-refresh paths.</td></tr>
                        <tr><td>v0.2</td><td>Added porting strategy, chrome coverage, plan discipline, and the findings report.</td></tr>
                        <tr><td>v0.1</td><td>Initial release with template 1.6.0, before revision stamps were introduced.</td></tr>
                    </tbody>
                </table>

                <h2 id="staying-current">Staying Current</h2>
                <ul>
                    <li><strong>Template upgrade</strong>: updates the matching rules revision as part of the upgrade.</li>
                    <li><strong>Standalone update</strong>: fetches the latest published revision on demand.</li>
                </ul>
                <p>Both paths compare the installed and published files, then replace the rulebook when they differ. There is no merging or partial patching. The anchor and project paths remain unchanged. Use the upgrade prompts in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

                <h2 id="compatibility">Compatibility</h2>
                <p>NDS IQ is agent-agnostic and assumes a capable local coding agent with file and shell access. It is validated end to end with Claude Code.</p>
                <p>The rules work with any template release. If an older release lacks a feature referenced by the current rules, the agent falls back to the relevant documentation and source, reports the gap, and can propose an upgrade.</p>

                <h2 id="the-instructions">The Instructions</h2>
                <p>The complete rulebook is rendered below from the same source shipped with the template.</p>
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

                <h2 id="feeding-back">Feeding the Next Revision</h2>
                <p>Real adoption findings feed future revisions. Record verified NDS gaps, misleading documentation, or reproducible bugs in the optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code>. The report is designed to contain no project-private information.</p>
                <p>Send verified findings to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>. They can become a rule or source fix in a later revision.</p>

            </article>
        </div>
    </div>
</section>
