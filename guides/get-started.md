---
layout: page
title: Get Started
since: "1.6.0"
updated: "1.6.0"   # the template release this guide's content is aligned with; bump to the dev line only when content drifts to describe unreleased template changes
last_edit: "05/08/2026 - 09:48 PM"
lang: en
direction: ltr
hero_title: Get Started with NDS
hero_style: nds-flat
hero_tags:
  - label: Beta
    style: nds-yellow
hero_description: "A complete AI-driven workflow for installing NDS, building your UI page by page, and applying upgrades."
breadcrumb: ["Guides"]
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
                    <h2 class="nds-toc-title nds-truncate">Adoption Path</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>
        <div class="nds-info-content">
            <article class="nds-prose">

                <h2 id="overview">Overview</h2>
                <p>What the agent-driven workflow delivers, and how its instruction system was built.</p>

                <p>The recommended way to build with NDS is through an AI coding agent. NDS ships everything an agent needs to do that work properly: canonical markup to copy, machine-readable catalogs to search, readable source behind every bundle, and a set of instructions that encodes the rules of the system.</p>
                <p><strong>The <a class="nds-color" href="{{ 'guides/integration-quality' | relative_url }}">NDS IQ</a> (Integration Quality) instructions</strong> were engineered from the components' internal logic outward: init lifecycles, event surfaces, state cascades, dependency graphs. They were then hardened by running real migrations with AI agents, adding a rule for each failure the agents hit.</p>
                <p><strong>It gives the agent:</strong></p>
                <ul>
                    <li>Seven hard rules covering markup, styling, libraries, and porting.</li>
                    <li>A workflow to follow: inventory, plan, build, verify.</li>
                    <li>A plan file (<code class="nds-inline-code lang-html">NDS-PLAN.md</code>) that records decisions, page status, and open questions across sessions.</li>
                    <li>A source reference so canonical markup gets copied, not invented.</li>
                </ul>
                <div class="nds-block">
                    <div class="nds-alert nds-card nds-color" data-status="info" role="alert">
                        <span class="nds-feedback nds-alert-icon nds-outline">
                            <span class="nds-feedback-icon">
                                <i class="nds-icon" aria-hidden="true"></i>
                            </span>
                        </span>
                        <div class="nds-alert-content">
                            <div class="nds-alert-text">
                                <span class="nds-alert-title">Tested with Claude Code</span>
                                <p class="nds-alert-description">This guide was built and tested end to end with Claude Code. The instructions are agent-agnostic and should work with any capable local agent, but other agents have not been exercised against the full workflow; their behavior may vary.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p><strong>The system rests on two core inputs:</strong></p>
                <ol>
                    <li><strong>The NDS template</strong>: stored locally as a read-only reference the agent copies from.</li>
                    <li><strong>The NDS IQ instructions</strong>: installed once in the agent's instruction file.</li>
                </ol>
                <p>Both are configured a single time. After that, development proceeds gate by gate by default. Progress lives in an <code class="nds-inline-code lang-html">NDS-PLAN.md</code> file at the project root, so any session can pick up where the last one stopped.</p>

                <div class="nds-block">
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
                                    <li><strong>A local CLI or IDE agent with filesystem access</strong>, such as Claude Code, Cursor, or Codex. Browser-based assistants (claude.ai, ChatGPT Web) cannot read local template directories or write to your project.</li>
                                    <li><strong>An existing application that renders at least one page.</strong> NDS provides the UI layer; it does not scaffold an application.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 id="template">1. Template</h2>
                <p>The authoritative source for components, markup, design tokens, and runtime assets. Treat it as read-only: copy files out of it, never modify it, and replace the entire folder when upgrading.</p>

                <div class="nds-block">
                    <h3 id="download">Download &amp; Extraction</h3>
                    <ol>
                        <li><strong>Download</strong> <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                        <li><strong>Extract</strong> the archive into a gitignored <code class="nds-inline-code lang-html">.nds/</code> folder at the project root. This is the canonical home: the instruction file records the path and is committed, so a project-relative folder works on every machine; a custom location (a sibling directory, a shared extract) works only where it exists and is the dev's explicit exception.</li>
                        <li><strong>Record</strong> the template folder's path. The archive holds one top-level <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}</code> folder; that folder, not the folder you extracted into, becomes your <code class="nds-inline-code lang-html">NDS_ROOT</code>.</li>
                    </ol>
                </div>
                <div class="nds-block">
                    <h3 id="structure">Template Structure</h3>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-markdown">
README.md       - Overview and entry-point documentation
_site/          - Compiled documentation site and runtime assets
_source/        - Uncompiled JS/SCSS source and machine-readable catalogs
CHANGELOG.md    - Release history and migration notes
LICENSE         - License terms
                        </code>
                    </div>
                    <p>The <code class="nds-inline-code lang-html">_site/</code> directory serves two roles:</p>
                    <ul>
                        <li><strong>Reference documentation</strong>: component pages at <code class="nds-inline-code lang-html">_site/components/*.html</code> containing the canonical markup the agent copies.</li>
                        <li><strong>Runtime assets</strong>: static CSS, JavaScript, fonts, and icons at <code class="nds-inline-code lang-html">_site/assets/</code> to be copied into your project.</li>
                    </ul>
                </div>

                <h2 id="rules">2. Setup</h2>
                <p>One prompt runs the whole setup: the agent installs the NDS IQ instructions, asks for paths, then hands back the first plan for your review.</p>

                <div class="nds-block">
                    <h3 id="instructions-block">Setup Prompt</h3>
                    <p>Hand the agent the prompt below as its first turn. It downloads the raw NDS IQ instructions file and installs it verbatim into the agent's instruction file at the project root, creating the file if it doesn't exist, or appending to an existing one. NDS IQ's own setup flow takes over from there.</p>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Download these instructions as a raw file (curl or equivalent, never a web-fetch tool, which re-renders what it fetches) and append them verbatim to this project's agent instructions file. Verify the installed copy's first line starts with `## Design system: NDS Vanilla` (both # intact) and its last line is `&lt;!-- end NDS instructions --&gt;`, then follow the installed instructions; their setup flow starts from whatever state this project is in (existing UI, fresh build, or prior NDS work): https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/nds-ai-instructions.md
                        </code>
                    </div>
                    <div class="nds-block">
                        <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                            <span class="nds-feedback nds-alert-icon">
                                <span class="nds-feedback-icon">
                                    <i class="nds-icon" aria-hidden="true"></i>
                                </span>
                            </span>
                            <div class="nds-alert-content">
                                <div class="nds-alert-text">
                                    <span class="nds-alert-title">Fresh session only:</span>
                                    <p class="nds-alert-description">Paste this as the first turn of a fresh session, never mid-task: an ongoing conversation's context competes with the setup and invites the agent to treat it as a one-off task and skip the install.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-block">
                        <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                            <span class="nds-feedback nds-alert-icon">
                                <span class="nds-feedback-icon">
                                    <i class="nds-icon" aria-hidden="true"></i>
                                </span>
                            </span>
                            <div class="nds-alert-content">
                                <div class="nds-alert-text">
                                    <span class="nds-alert-title">First-run tip:</span>
                                    <p class="nds-alert-description">This first run works well in <strong>plan mode</strong>, or your agent's read-only planning equivalent. The agent inventories read-only, surfaces the project-wide decisions as structured questions, and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> only after you approve.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li><strong>Claude Code</strong>: <code class="nds-inline-code lang-html">CLAUDE.md</code></li>
                        <li><strong>Cursor / Codex</strong>: <code class="nds-inline-code lang-html">AGENTS.md</code></li>
                    </ul>
                    <p>The URL always tracks the latest published revision; on later sessions, NDS IQ's own upgrade workflow handles any drift against your installed template.</p>
                </div>
                <div class="nds-block">
                    <h3 id="paths">Paths</h3>
                    <p>The NDS IQ instructions ship with two paths declared at the top as placeholders. On first install the agent asks you for real values; provide what's below and it writes them into the declaration lines. Installing manually? Edit only those top two lines; any <code class="nds-inline-code lang-html">/path/to/…</code> further down is instructional and stays as-is.</p>
                    <table class="nds-table nds-responsive">
                        <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory from section 1.</td></tr>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where your application serves static assets (e.g. <code class="nds-inline-code lang-html">public/assets/</code>, <code class="nds-inline-code lang-html">wwwroot/</code>). If it does not exist, the agent creates it during the first asset copy.</td></tr>
                        </tbody>
                    </table>
                    <p>One-time only: future sessions load the agent's instruction file automatically at start.</p>
                </div>
                <div class="nds-block">
                    <h3 id="plan-review">Plan Review</h3>
                    <p>Once paths are set, the agent inventories this project and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> at the project root as a markdown table (page, route, legacy libraries, NDS target, status). It stops there for your review; nothing gets built until you approve.</p>
                    <p>The plan carries state between AI sessions, since they do not share chat memory. Every session after the first reads and updates it.</p>
                </div>
                <div class="nds-block">
                    <h3 id="manual-install">Manual Install (optional)</h3>
                    <p>For a manual install, or to read what the agent installs, the full NDS IQ instructions are below. <strong>Copy them exactly as written, all of them.</strong> A paraphrase reads correct but silently drops rules the build depends on later.</p>
<!-- ═══════════════════════ COPY START ═══════════════════════ -->
            <div class="nds-code nds-expandable">
                <span class="nds-code-tags lang-markdown">
                    <span class="nds-tag nds-gray nds-xs nds-code-lang lang-markdown"><span class="nds-label">Markdown</span></span>
                    <span class="nds-tag nds-green nds-xs"><span class="nds-label">IQ v6</span></span>
                </span>
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy NDS IQ instructions">
                        <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-markdown">
{%- capture _instr %}{% include NDS-IQ.md %}{% endcapture %}
{{ _instr | strip | escape }}
                    </code>
                </div>
            </div>
<!-- ═══════════════════════ COPY END ═══════════════════════ -->
                </div>

                <h2 id="sessions">3. Build</h2>
                <p>How work proceeds after the plan is approved.</p>

                <div class="nds-block">
                    <h3 id="agent-drives">Pacing</h3>
                    <p>After plan approval the agent drives: it proposes, you approve, correct, or redirect. Pick your pacing when asked. Claude Code's plan mode raises it during plan review; other setups may not, so state your choice up front. Two options:</p>
                    <ul>
                        <li><strong>Gate by gate (default)</strong>: when a step completes, the agent proposes the next one from the plan's build order: assets, then chrome, then pages one at a time. A page gate runs a fixed loop:
                            <ol>
                                <li>Open with the page-scoped questions parked in that page's plan row.</li>
                                <li>Build.</li>
                                <li>Verify in the browser.</li>
                                <li>Update the row's status.</li>
                                <li>Stop for your go.</li>
                            </ol>
                        </li>
                        <li><strong>One continuous run</strong>: the agent answers its own questions from the guide's defaults (existing shape, data scale, hero rules), verifies each page in the browser as it builds, and delivers a single report at the end. Every decision made by default and every check it could not run is listed there, not buried.</li>
                    </ul>
                    <p><strong>Whichever pace, hold it to these:</strong></p>
                    <ul>
                        <li>The chrome renders and verifies before any page: NDS styling in place, icons visible, no unstyled flash on load, and a console clean of errors and <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                        <li>Row statuses move only through the four exact values, and only your confirmation makes a row <code class="nds-inline-code lang-html">Built and Verified</code>.</li>
                    </ul>
                </div>
                <div class="nds-block">
                    <h3 id="verification">Browser Verification</h3>
                    <p>Before any page is claimed built, the agent verifies it in the browser in two passes:</p>
                    <ul>
                        <li><strong>Behavioral</strong>: load the page, scan the console for <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings, then run <code class="nds-inline-code lang-js">NDS.Init.audit()</code> for silent failures (unregistered icons, unclaimed filter/pagination containers).</li>
                        <li><strong>Visual</strong>: check at desktop and mobile widths for unstyled flashes on load, missing gaps, mis-nested wrappers, dark mode on the content, and the page reading as one design.</li>
                    </ul>
                    <p>The agent won't claim a page verified from reading its code alone.</p>
                    <div class="nds-block">
                        <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                            <span class="nds-feedback nds-alert-icon">
                                <span class="nds-feedback-icon">
                                    <i class="nds-icon" aria-hidden="true"></i>
                                </span>
                            </span>
                            <div class="nds-alert-content">
                                <div class="nds-alert-text">
                                    <span class="nds-alert-title">Agent can't verify in the browser?</span>
                                    <p class="nds-alert-description">Either pacing still works. The agent emits a per-page checklist instead of claiming verification; you sign off from those checklists.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-block">
                    <h3 id="resuming">Resuming</h3>
                    <p>A new session has no chat memory and needs one line; the plan's statuses tell it where things stand:</p>
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
                    <p>Implementation is complete when every entry in <code class="nds-inline-code lang-html">NDS-PLAN.md</code> is marked <code class="nds-inline-code lang-html">Built and Verified</code>. Rows still at <code class="nds-inline-code lang-html">Awaiting Verification</code> need your confirmation: the agent either emitted a checklist (no browser access), or self-verified under continuous pacing (its report awaits your sign-off).</p>
                </div>
                <div class="nds-block">
                    <h3 id="legacy-cleanup">Retiring Legacy Libraries</h3>
                    <p>If you replaced an existing UI via parallel files, the legacy pages remain live and still need their libraries. Removing a legacy library is invasive and is your decision, not the agent's. The agent reports when no ported page depends on a library anymore, and you approve its removal (NDS IQ rules #6 and #7).</p>
                </div>

                <div class="nds-block">
                    <h3 id="findings-report">Reporting Findings</h3>
                    <p>The agent writes to an optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code> at the project root whenever adoption hits an NDS gap: a missing method or event, canonical markup contradicting a rule, a doc that misled, a reproducible component bug. Each entry names the NDS version, instructions version, and component, with a minimal generic repro. Nothing project-private lands in the file, so it stays safe to share as-is.</p>
                    <p>Review it and send it to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>, or privately to the maintainer. Every report feeds the next revision of the system and these instructions.</p>
                </div>

                <h2 id="upgrade">4. Upgrade</h2>
                <p>When a new version of NDS is published, paste the prompt below. The agent handles the whole upgrade: downloads the release into <code class="nds-inline-code lang-html">NDS_ROOT</code>, then runs the upgrade workflow from the NDS IQ instructions (version compare, runtime replace, changelog sweep, its own refresh) and reports every change.</p>

                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Upgrade NDS to the latest release.
                    </code>
                </div>

            </article>
        </div>
    </div>
</section>
