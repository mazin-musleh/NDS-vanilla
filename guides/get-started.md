---
layout: page
title: Get Started
since: "1.6.0"
updated: "1.7.x"   # the template release this guide's content is aligned with; bump to the dev line only when content drifts to describe unreleased template changes
last_edit: "09/08/2026 - 11:47 PM"
lang: en
direction: ltr
hero_title: Get Started with NDS
hero_style: nds-flat
hero_tags:
  - label: Beta
    style: nds-yellow
hero_description: "A complete workflow for installing NDS, building UI with an AI coding agent, verifying the result, and keeping the system current."
breadcrumb: ["Guides"]
layout_class: nds-wSideInfo
sidemenu_mode: false
---

<section id="getStartedGuide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-md nds-sticky nds-top" aria-label="On this page">
            <nav class="nds-toc" aria-label="Table of contents" style="--toc-skeleton-rows: 17"
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
                <p>How the agent-driven workflow works, what it provides, and how the instruction system supports it.</p>

                <p>The recommended way to build with NDS is through an AI coding agent. NDS provides the reference material and instructions the agent needs to work consistently: canonical markup to copy, machine-readable catalogs to search, readable source behind every bundle, and a rule set that defines how NDS is used.</p>
                <p><strong>The <a class="nds-color" href="{{ 'guides/integration-quality' | relative_url }}">NDS IQ</a> (Integration Quality) instructions</strong> are derived from the components' internal logic: initialization lifecycles, event surfaces, state cascades, and dependency graphs. They are then hardened through real migration work with AI agents, with verified failures feeding new rules and regression cases.</p>
                <p><strong>NDS IQ gives the agent:</strong></p>
                <ul>
                    <li>Seven hard rules covering markup, styling, libraries, and porting.</li>
                    <li>A defined workflow: inventory, plan, build, verify.</li>
                    <li>A plan file (<code class="nds-inline-code lang-html">NDS-PLAN.md</code>) that carries decisions, page status, and open questions between sessions.</li>
                    <li>A source reference, so canonical markup gets copied rather than invented.</li>
                </ul>
                <div class="nds-alert nds-card nds-color" data-status="info" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Validated with Claude Code</span>
                            <p class="nds-alert-description">The workflow has been built and validated end to end with Claude Code. The instructions are agent-agnostic and are intended for capable local agents, but the full workflow has not been exercised with every agent; behavior may vary outside the validated setup.</p>
                        </div>
                    </div>
                </div>
                <p><strong>The workflow depends on two core inputs:</strong></p>
                <ol>
                    <li><strong>The NDS template</strong>: stored locally as a read-only reference for the agent to inspect and copy from.</li>
                    <li><strong>The NDS IQ instructions</strong>: installed once and referenced from the agent's instruction file.</li>
                </ol>
                <p>Both are configured once. After that, development proceeds gate by gate by default. Progress is recorded in an <code class="nds-inline-code lang-html">NDS-PLAN.md</code> file at the project root, allowing each new session to continue from the previous state.</p>

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
                <h2 id="template">1. Template</h2>
                <p>The authoritative source for components, markup, design tokens, and runtime assets. Treat it as read-only: inspect and copy from it, never modify it, and replace the entire folder when upgrading.</p>

                <h3 id="download">Download and Extract</h3>
                <ol>
                    <li><strong>Download</strong> <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                    <li><strong>Extract</strong> the archive into a gitignored <code class="nds-inline-code lang-html">.nds/</code> folder at the project root. This is the canonical location: the instruction file records the path and is committed, so the same project-relative path works across machines. A custom location, such as a sibling directory or shared extract, works only where that location exists and must be an explicit developer choice.</li>
                    <li><strong>Record</strong> the path. The archive contains one top-level <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}</code> folder. Rename it to <code class="nds-inline-code lang-html">nds-vanilla-template</code>, removing the version, so <code class="nds-inline-code lang-html">NDS_ROOT</code> points to <code class="nds-inline-code lang-html">.nds/nds-vanilla-template/</code>. The path is correct when <code class="nds-inline-code lang-html">NDS_ROOT/_site/</code> exists directly inside it. Keeping the folder name version-free allows future upgrades to replace its contents without changing the anchor.</li>
                </ol>
                <h3 id="structure">Template Structure</h3>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
README.md       - Overview and entry-point documentation
NDS-IQ.md       - The NDS IQ instructions, offline copy (see section 2)
_site/          - Compiled documentation site and runtime assets
_source/        - Uncompiled JS/SCSS source, doc and page sources, catalogs
CHANGELOG.md    - Release history and migration notes
LICENSE         - License terms
                    </code>
                </div>
                <p>The <code class="nds-inline-code lang-html">_site/</code> directory has two roles:</p>
                <ul>
                    <li><strong>Reference documentation</strong>: component pages at <code class="nds-inline-code lang-html">_site/components/*.html</code> containing the canonical markup the agent copies.</li>
                    <li><strong>Runtime assets</strong>: static CSS, JavaScript, fonts, and icons at <code class="nds-inline-code lang-html">_site/assets/</code> to be copied into your project.</li>
                </ul>

                <h2 id="setup">2. Setup</h2>
                <p>A single setup prompt starts the process: the agent installs NDS IQ, asks for the required paths, and prepares the initial plan for your review.</p>

                <h3 id="instructions-block">Setup Prompt</h3>
                <p>Give the agent the prompt below as the first turn of a fresh session. It downloads <code class="nds-inline-code lang-html">NDS-IQ.md</code> to the project root, then follows the installation steps defined in that file: adding the anchor to the agent instruction file and collecting the two required paths. From that point, NDS IQ controls the setup flow.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Download this file raw to `NDS-IQ.md` at this project's root, with curl or an equivalent HTTP client. Never a web-fetch tool: those re-render what they fetch and save a corrupt copy.
https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md

The saved file must start with `# NDS IQ`. If it does not, the response was not downloaded as raw content: delete the file and retry with a real HTTP client.

Then read it from top to bottom and follow it. Everything after the download is defined by the file itself.
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
                            <span class="nds-alert-title">Fresh session only:</span>
                            <p class="nds-alert-description">Use this as the first turn of a fresh session, never in the middle of an existing task. Existing conversation context can compete with the setup instructions and cause the agent to treat installation as a one-off task rather than establishing the project configuration.</p>
                        </div>
                    </div>
                </div>
                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">First-run tip:</span>
                            <p class="nds-alert-description">The first run works well in <strong>plan mode</strong>, or your agent's equivalent read-only planning mode. The agent inventories the project without making changes, presents project-wide decisions as structured questions, and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> only after you approve.</p>
                        </div>
                    </div>
                </div>
                <p><strong>Two pieces are added to the project:</strong></p>
                <ol>
                    <li><code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, committed as the full rulebook. It contains no project-specific values, so every project uses the same copy and updates replace the file as a whole.</li>
                    <li>A short <strong>anchor</strong> added to the agent instruction file. It contains the two project paths and one instruction: read <code class="nds-inline-code lang-html">NDS-IQ.md</code> before NDS work starts. It has no version and does not need updating.</li>
                </ol>
                <p>The agent instruction file is <code class="nds-inline-code lang-html">CLAUDE.md</code> for Claude Code, <code class="nds-inline-code lang-html">AGENTS.md</code> for Cursor and Codex.</p>
                <p>Only the anchor is loaded on every turn. The rulebook is read <strong>on demand, once per session</strong>, when NDS work starts, so the rulebook costs nothing on non-UI days.</p>
                <p>The URL tracks the latest published revision. On later sessions, NDS IQ's upgrade workflow checks the installed revision and handles any required update against the template.</p>
                <h3 id="paths">Paths</h3>
                <p>The anchor declares two paths as placeholders. During installation, the agent asks for the actual values and writes them into the two declaration lines. Until those values are set, NDS IQ blocks NDS work rather than guessing at a location. For a manual installation, those two lines are the only project-specific edits: <code class="nds-inline-code lang-html">NDS-IQ.md</code> is never edited, and any <code class="nds-inline-code lang-html">/path/to/…</code> inside it is instructional.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory from section 1.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where your application serves static assets (e.g. <code class="nds-inline-code lang-html">public/assets/</code>, <code class="nds-inline-code lang-html">wwwroot/</code>). If it does not exist, the agent creates it during the first asset copy.</td></tr>
                    </tbody>
                </table>
                <p>This configuration is one-time only. Future sessions load the agent instruction file automatically, and its anchor directs them to the rulebook.</p>
                <h3 id="plan-review">Plan Review</h3>
                <p>Once the paths are set, the agent inventories the project and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> at the project root as a markdown table containing the page, route, legacy libraries, NDS target, and status. It stops for your review; no implementation begins until you approve the plan.</p>
                <p>The review covers project-wide decisions only: the asset URL prefix, the porting strategy for an existing UI, how to handle prior NDS work, direction and locale, and build pacing. Page-level questions are deferred to each page's build session, so the initial review does not front-load every implementation detail.</p>
                <p>The plan carries state between AI sessions because sessions do not share chat memory. Every subsequent session reads it before proposing work and updates it as progress changes.</p>
                <h3 id="manual-install">Manual Install (optional)</h3>
                <p>To install manually, or to inspect exactly what the agent installs, use the complete rulebook below. Save it as <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, then add the anchor — its exact text is in the file's own <em>Install and upgrade this file</em> section — to the agent instruction file with the two project paths filled in. <strong>Copy the file exactly as written.</strong> A paraphrase can appear equivalent while silently omitting rules required later in the build.</p>
                <p>The template zip also contains <code class="nds-inline-code lang-html">NDS_ROOT/NDS-IQ.md</code>, matched to that template release. Use it when the offline copy is preferred over the latest published revision.</p>
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

                <h2 id="sessions">3. Build</h2>
                <p>How implementation proceeds after the plan is approved.</p>

                <p>Work requests do not require special wording, because the anchor routes every UI task through NDS IQ before work begins. A request does not need to name components, provide markup, or describe the verification process. Those decisions belong to NDS IQ. The developer provides the application context, desired outcome, content, data, and constraints; the instruction system determines how the work is carried out within NDS.</p>

                <h3 id="agent-drives">Pacing</h3>
                <p>After plan approval, the agent drives the workflow: it proposes the next step, and you approve, correct, or redirect it. Choose the pacing when prompted. Claude Code's plan mode enables this during plan review; other setups may not, so state the preferred pacing explicitly. There are two options:</p>
                <ul>
                    <li><strong>Gate by gate (default)</strong>: when a step completes, the agent proposes the next step from the plan's build order: assets, then chrome, then pages one at a time. Each page gate follows a fixed loop:
                        <ol>
                            <li>Open with the page-scoped questions parked in that page's plan row.</li>
                            <li>Build.</li>
                            <li>Verify in the browser.</li>
                            <li>Update the row's status.</li>
                            <li>Stop for your go.</li>
                        </ol>
                    </li>
                    <li><strong>One continuous run</strong>: the agent answers its own questions from NDS IQ's defaults (existing shape, data scale, hero rules), verifies each page in the browser as it builds, and delivers a single report at the end. Every decision made by default and every check it could not run is listed there, not buried.</li>
                </ul>
                <p><strong>Regardless of pacing, these requirements still apply:</strong></p>
                <ul>
                    <li>The chrome must render and verify before any page: NDS styling is active, icons are visible, there is no unstyled flash on load, and the console is free of errors and <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                    <li>Row statuses move only through the four defined values, and only your confirmation can mark a row <code class="nds-inline-code lang-html">Built and Verified</code>.</li>
                </ul>
                <h3 id="verification">Browser Verification</h3>
                <p>Before a page can be marked built, the agent verifies it in the browser in two passes:</p>
                <ul>
                    <li><strong>Behavioral</strong>: load the page, scan the console for <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings, then run <code class="nds-inline-code lang-js">NDS.Init.audit()</code> for silent failures such as unregistered icons or unclaimed filter/pagination containers. It also exercises the page's wired interactions: submit, filter, advance a step. Required fields are tested empty one component type at a time because validation behavior differs by component.</li>
                    <li><strong>Visual</strong>: check desktop and mobile widths for unstyled flashes on load, missing gaps, mis-nested wrappers, dark-mode issues, and whether the page reads as a coherent design. A page based on a template or example is compared side by side with its corresponding built copy in the template folder, which serves as the visual reference.</li>
                </ul>
                <p>The agent does not claim a page verified from source inspection alone.</p>
                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Agent can't verify in the browser?</span>
                            <p class="nds-alert-description">Either pacing still works. The agent produces a per-page verification checklist instead of claiming browser verification; you provide the final sign-off from those checklists.</p>
                        </div>
                    </div>
                </div>
                <h3 id="resuming">Resuming</h3>
                <p>A new session has no chat memory, but the plan provides the project state. Use one line to resume:</p>
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
                <p>Implementation is complete when every entry in <code class="nds-inline-code lang-html">NDS-PLAN.md</code> is marked <code class="nds-inline-code lang-html">Built and Verified</code>. Rows still marked <code class="nds-inline-code lang-html">Awaiting Verification</code> require your confirmation: either the agent produced a checklist because browser access was unavailable, or it self-verified during continuous pacing and its report is awaiting sign-off.</p>
                <h3 id="legacy-cleanup">Retiring Legacy Libraries</h3>
                <p>If an existing UI was replaced through parallel files, the legacy pages may remain live and continue to depend on their existing libraries. Removing a legacy library is an invasive change and remains your decision, not the agent's. The agent reports when no ported page depends on a library, and you approve its removal (NDS IQ rules #6 and #7).</p>

                <h3 id="findings-report">Reporting Findings</h3>
                <p>The agent can record an NDS gap in an optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code> at the project root. A gap is a missing method or event, canonical markup that contradicts a rule, misleading documentation, or a reproducible component bug. Each entry records the NDS version, instructions version, and component, with a minimal generic reproduction. The file contains no project-private information, so it can be shared as-is.</p>
                <p>Review the report and send it to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>, or share it privately with the maintainer. Verified findings feed future revisions of the system and its instructions.</p>

                <h2 id="upgrade">4. Upgrade</h2>
                <p>When a new NDS version is published, use the prompt below. The agent handles the upgrade. It replaces the contents of the template folder, so <code class="nds-inline-code lang-html">NDS_ROOT</code> continues to point to the same location. It then runs the NDS IQ upgrade workflow — version comparison, runtime replacement, and changelog review — and reports the resulting changes.</p>
                <p>The final step updates the rules themselves. If a newer revision of <code class="nds-inline-code lang-html">NDS-IQ.md</code> is available, the agent replaces the installed file as a whole — no merging or partial patches. The anchor is never changed, so the two project paths survive every update.</p>

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
                <h3 id="update-rules">Rules Update</h3>
                <p>New rule revisions can be published between template releases. To update the rules without upgrading the template, use:</p>
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
                <p>The agent compares the installed and published revisions and replaces the file only when a newer revision exists. One guard applies: if the runtime is behind the latest template release, the agent proposes the full template upgrade instead, with the rules update included.</p>

            </article>
        </div>
    </div>
</section>
