---
layout: page
title: Get Started
since: "1.6.0"
updated: "1.6.x"
last_edit: "03/08/2026 - 03:07 AM"
lang: en
direction: ltr
hero_title: Get Started with NDS
hero_style: nds-flat
hero_tags:
  - label: Beta
    style: nds-yellow
hero_description: "Everything needed to adopt NDS in a project: download the template, install the agent instructions, build the UI page by page, and stay current with upgrades."
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
            <article>

                <h2 id="overview" class="nds-section-title">Overview</h2>
                <p class="nds-section-description">What the agent-driven workflow delivers, and how its instruction system was built.</p>

                <p>The canonical way to build with NDS is through an AI coding agent. NDS ships everything an agent needs to do that work properly: canonical markup to copy, machine-readable catalogs to search, readable source behind every bundle, and an instruction block that encodes the rules of the system.</p>
                <p><strong>The instruction block</strong> was engineered from the components' internal logic outward: init lifecycles, event surfaces, state cascades, dependency graphs. It was then hardened by running real migrations with AI agents and encoding every point of failure they surfaced.</p>
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
                <p><strong>The system rests on two permanent inputs:</strong></p>
                <ol>
                    <li><strong>The NDS template</strong>: stored locally as a read-only reference the agent copies from.</li>
                    <li><strong>The NDS instructions</strong>: installed once in the agent's instruction file.</li>
                </ol>
                <p>Both are configured a single time. After that, development proceeds gate by gate by default, with progress tracked in an <code class="nds-inline-code lang-html">NDS-PLAN.md</code> file at the project root, so any session can continue where the last one stopped without relying on conversation history.</p>

                <div class="nds-block">
                    <div class="nds-alert nds-card" data-status="info" role="alert">
                        <span class="nds-feedback nds-alert-icon nds-outline">
                            <span class="nds-feedback-icon">
                                <i class="nds-icon" aria-hidden="true"></i>
                            </span>
                        </span>
                        <div class="nds-alert-content">
                            <div class="nds-alert-text">
                                <span class="nds-alert-title">Prerequisite</span>
                                <p class="nds-alert-description">This workflow requires a local CLI or IDE agent with filesystem access, such as Claude Code, Cursor, or Codex. Browser-based assistants (claude.ai, ChatGPT Web) cannot read local template directories or write to your project.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 id="template" class="nds-section-title">1. The Template</h2>
                <p class="nds-section-description">The authoritative source for components, markup, design tokens, and runtime assets. Treat it as read-only: copy files out of it, never modify it, and replace the entire folder when upgrading.</p>

                <div class="nds-block">
                    <h3 id="download" class="nds-block-title">Download &amp; Extraction</h3>
                    <ol>
                        <li><strong>Download</strong> <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                        <li><strong>Extract</strong> the archive into a gitignored <code class="nds-inline-code lang-html">.nds/</code> folder at the project root (the default), or anywhere the agent can access: a sibling directory or a shared development location.</li>
                        <li><strong>Record</strong> this path. It becomes your <code class="nds-inline-code lang-html">NDS_ROOT</code>.</li>
                    </ol>
                </div>
                <div class="nds-block">
                    <h3 id="structure" class="nds-block-title">Template Structure</h3>
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

                <h2 id="rules" class="nds-section-title">2. Rules &amp; Instructions</h2>
                <p class="nds-section-description">The agent loads its instruction file at the beginning of every session. Install the NDS instructions once and they apply automatically to every future session.</p>

                <div class="nds-block">
                    <h3 id="instructions-block" class="nds-block-title">Instruction Block</h3>
                    <p>Copy the block below into the agent's instruction file at the project root; create the file if it does not exist, or append the block to the end of an existing one as its own section. <strong>Copy it exactly as written, all of it.</strong> Do not summarize, shorten, or rewrite it: the block itself is the deliverable of this step, not a restatement of its meaning. A paraphrase reads correct but silently drops rules the build depends on later. This holds doubly when an agent performs the setup.</p>
                    <ul>
                        <li><strong>Claude Code</strong>: <code class="nds-inline-code lang-html">CLAUDE.md</code></li>
                        <li><strong>Cursor / Codex</strong>: <code class="nds-inline-code lang-html">AGENTS.md</code></li>
                    </ul>
<!-- ═══════════════════════ COPY START ═══════════════════════ -->
            <div class="nds-code nds-expandable">
                <span class="nds-code-tags lang-markdown">
                    <span class="nds-tag nds-gray nds-xs nds-code-lang lang-markdown"><span class="nds-label">Markdown</span></span>
                    <span class="nds-tag nds-green nds-xs"><span class="nds-label">v2</span></span>
                </span>
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy instructions block">
                        <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-markdown">
{%- capture _instr %}{% include nds-ai-instructions.md %}{% endcapture %}
{{ _instr | strip | escape }}
                    </code>
                </div>
            </div>
<!-- ═══════════════════════ COPY END ═══════════════════════ -->
                </div>
                <div class="nds-block">
                    <h3 id="paths" class="nds-block-title">Path Configuration</h3>
                    <p>Set the two paths on the declaration lines at the top of the instruction block you just copied into the agent's file. <strong>Edit those two lines only</strong>; the <code class="nds-inline-code lang-html">/path/to/…</code> appearing further down the block is part of the agent's own instructions and stays as-is. Windows paths work with forward slashes (<code class="nds-inline-code lang-html">C:/projects/…</code>):</p>
                    <table class="nds-table nds-responsive">
                        <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory from step 1.</td></tr>
                            <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where your application serves static assets (e.g. <code class="nds-inline-code lang-html">public/assets/</code>, <code class="nds-inline-code lang-html">wwwroot/</code>). If it does not exist, the agent creates it during the first asset copy.</td></tr>
                        </tbody>
                    </table>
                    <p>Save the file. Future sessions load it automatically at start; the current session already has the block in context from pasting it.</p>
                </div>
                <h2 id="sessions" class="nds-section-title">3. Build Flow</h2>
                <p class="nds-section-description">AI sessions do not share memory: the planning prompt creates <code class="nds-inline-code lang-html">NDS-PLAN.md</code> at the project root, and every session after reads and updates it before changing anything. The plan, not a schedule of sessions, drives the work.</p>

                <div class="nds-block">
                    <h3 id="planning" class="nds-block-title">Start: the Planning Prompt</h3>
                    <ul>
                        <li><strong>Prerequisite</strong>: your application must already exist and render at least one page. NDS provides the UI layer; it does not scaffold an application.</li>
                        <li><strong>Claude Code tip</strong>: this prompt runs well in <strong>plan mode</strong>. The agent inventories read-only, surfaces the project-wide decisions as structured questions, and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> only after you approve (a harmless reorder of the workflow's write-then-review: same gate, the file just lands post-approval).</li>
                    </ul>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Inventory this project: identify routes, layout components, shared partials, existing pages, and current UI libraries. Map every existing page to an NDS target using the composition cascade (DGA template, example, or custom). If replacing an existing UI, propose a porting strategy appropriate for this stack (rule #7).

Output the results into NDS-PLAN.md at the project root as a markdown table with the columns: Page, Route, Legacy Libraries, NDS Target, Status.

Then stop for my review. Build nothing until I approve the plan. Raise only project-wide decisions with the plan (asset URL prefix, porting strategy, direction/locale, build pacing); note page-scoped questions in the page's row instead, to be asked when that page is built.
                        </code>
                    </div>
                    <p>Review the plan before continuing: the agent will not build anything until you approve it.</p>
                </div>
                <div class="nds-block">
                    <h3 id="agent-drives" class="nds-block-title">After Approval: the Agent Drives</h3>
                    <p>No more prompts to paste. The plan is the itinerary and your replies are the throttle: the agent proposes, you approve, correct, or redirect. Pacing is one of the decisions raised at plan review, with two options:</p>
                    <ul>
                        <li><strong>Gate by gate (default)</strong>: when a step completes, the agent proposes the next one from the plan's build order: assets, then chrome, then pages one at a time. A page gate runs a fixed loop: open with the page-scoped questions parked in that page's plan row, build, verify in the browser, update the row's status, stop for your go.</li>
                        <li><strong>One continuous run</strong>: the agent answers its own questions from the guide's defaults (existing shape, data scale, hero rules), verifies each page as it builds, and delivers a single report at the end. Every decision made by default and every check it could not run is listed there, not buried.</li>
                    </ul>
                    <p><strong>Whichever pace, hold it to these:</strong></p>
                    <ul>
                        <li>The chrome renders and verifies before any page is built: NDS styling in place, icons visible, no unstyled flash on load, and a console clean of errors and <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                        <li>Every page is verified in the browser before the next one starts. A page the agent could not verify is handed to you as a checklist, never claimed.</li>
                        <li>Row statuses move only through the four exact values, and only your confirmation makes a row <code class="nds-inline-code lang-html">Built and Verified</code>.</li>
                    </ul>
                </div>
                <div class="nds-block">
                    <h3 id="resuming" class="nds-block-title">Resuming in a Fresh Session</h3>
                    <p>A new session has no chat memory and needs one line; the plan's statuses tell it where things stand:</p>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
Continue the NDS work: read NDS-PLAN.md and propose the next step.
                        </code>
                    </div>
                    <p>Implementation is complete when every entry in <code class="nds-inline-code lang-html">NDS-PLAN.md</code> is marked <code class="nds-inline-code lang-html">Built and Verified</code>. Rows left at <code class="nds-inline-code lang-html">Awaiting Verification</code> are yours to clear: either the agent had no browser and emitted a checklist, or it verified the page itself during a one-continuous run and your review of its report is the missing confirmation.</p>
                </div>
                <div class="nds-block">
                    <h3 id="legacy-cleanup" class="nds-block-title">Retiring Legacy Libraries</h3>
                    <p>If you replaced an existing UI via parallel files, the legacy pages remain live and still need their libraries. Removing a legacy library is invasive and is your decision, not the agent's. The agent reports when no ported page depends on a library anymore, and you approve its removal (rules #6 and #7).</p>
                </div>

                <div class="nds-block">
                    <h3 id="findings-report" class="nds-block-title">Reporting Findings</h3>
                    <p>The instructions let the agent keep an optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code> at the project root, collecting what the adoption surfaced about NDS itself: a missing method or event, canonical markup contradicting a rule, a doc that misled, a reproducible component bug. Entries reference NDS versions and components with generic reproductions only — the file carries no project-private information, so it is safe to share as-is.</p>
                    <p>Review it and send it to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>, or privately to the maintainer. Every report feeds the next revision of the system and these instructions.</p>
                </div>

                <h2 id="upgrade" class="nds-section-title">4. Upgrades &amp; Maintenance</h2>
                <p class="nds-section-description">When a new version of NDS is published, replace the template folder and let the agent apply the migration.</p>

                <ol>
                    <li>Download and extract the latest release, replacing your existing <code class="nds-inline-code lang-html">NDS_ROOT</code> folder (as in section 1).</li>
                    <li>If the directory path changed due to versioning, update <code class="nds-inline-code lang-html">NDS_ROOT</code> in your instruction file (<code class="nds-inline-code lang-html">CLAUDE.md</code> / <code class="nds-inline-code lang-html">AGENTS.md</code>), or just tell the agent the new path; the instructions require it to update the declaration lines itself.</li>
                    <li>Run the upgrade prompt below.</li>
                </ol>
                    <div class="nds-code">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                                <i class="nds-icon nds-hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-prompt">
The NDS template folder has been replaced with a new release. Run the upgrade workflow from the NDS instructions: compare the two version banners, replace the runtime under NDS_ASSETS, read the Migrating sections in NDS_ROOT/CHANGELOG.md between the two versions, and sweep the NDS pages for the breaking changes they list. Then refresh the NDS instructions block in this instruction file: if the version in its "Design system: NDS Vanilla" heading is older than the block in NDS_ROOT/_site/guides/get-started.html (no version counts as older), replace the whole block from that heading through the "end NDS instructions" marker with the new one, keeping this project's NDS_ROOT and NDS_ASSETS declaration values. Report every change you make.
                        </code>
                    </div>

            </article>
        </div>
    </div>
</section>
