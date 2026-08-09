---
layout: page
title: Get Started
since: "1.6.0"
updated: "1.7.x"   # the template release this guide's content is aligned with; bump to the dev line only when content drifts to describe unreleased template changes
last_edit: "09/08/2026 - 09:46 PM"
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
            <nav class="nds-toc" aria-label="Table of contents" style="--toc-skeleton-rows: 18"
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
                <p><strong>The system rests on two core inputs:</strong></p>
                <ol>
                    <li><strong>The NDS template</strong>: stored locally as a read-only reference the agent copies from.</li>
                    <li><strong>The NDS IQ instructions</strong>: installed once in the agent's instruction file.</li>
                </ol>
                <p>Both are configured a single time. After that, development proceeds gate by gate by default. Progress lives in an <code class="nds-inline-code lang-html">NDS-PLAN.md</code> file at the project root, so any session can pick up where the last one stopped.</p>

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
                <p>The authoritative source for components, markup, design tokens, and runtime assets. Treat it as read-only: copy files out of it, never modify it, and replace the entire folder when upgrading.</p>

                <h3 id="download">Download &amp; Extraction</h3>
                <ol>
                    <li><strong>Download</strong> <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                    <li><strong>Extract</strong> the archive into a gitignored <code class="nds-inline-code lang-html">.nds/</code> folder at the project root. This is the canonical home: the instruction file records the path and is committed, so a project-relative folder works on every machine; a custom location (a sibling directory, a shared extract) works only where it exists and is the dev's explicit exception.</li>
                    <li><strong>Record</strong> the path. The archive holds one top-level <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}</code> folder. Rename it to <code class="nds-inline-code lang-html">nds-vanilla-template</code>, dropping the version, so your <code class="nds-inline-code lang-html">NDS_ROOT</code> is <code class="nds-inline-code lang-html">.nds/nds-vanilla-template/</code>. The path is right when <code class="nds-inline-code lang-html">NDS_ROOT/_site/</code> sits directly inside it. Dropping the version is what lets every later upgrade replace the folder's contents without changing your anchor.</li>
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
                <p>The <code class="nds-inline-code lang-html">_site/</code> directory serves two roles:</p>
                <ul>
                    <li><strong>Reference documentation</strong>: component pages at <code class="nds-inline-code lang-html">_site/components/*.html</code> containing the canonical markup the agent copies.</li>
                    <li><strong>Runtime assets</strong>: static CSS, JavaScript, fonts, and icons at <code class="nds-inline-code lang-html">_site/assets/</code> to be copied into your project.</li>
                </ul>

                <h2 id="setup">2. Setup</h2>
                <p>One prompt runs the whole setup: the agent installs NDS IQ, asks for paths, then hands back the first plan for your review.</p>

                <h3 id="instructions-block">Setup Prompt</h3>
                <p>Hand the agent the prompt below as its first turn. It downloads the NDS IQ rules file to your project root, then follows the install steps inside that file: adding a short anchor to your agent instruction file and asking you for the two paths. NDS IQ's own setup flow takes over from there.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Download this file raw to `NDS-IQ.md` at this project's root, with curl or an equivalent HTTP client. Never a web-fetch tool: those re-render what they fetch and save a corrupt copy.
https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md

The saved file must start with `# NDS IQ`. If it does not, the fetch mangled it: delete it and retry with a real client.

Then read it top to bottom and follow it. Everything after the download is the file's job.
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
                            <p class="nds-alert-description">Paste this as the first turn of a fresh session, never mid-task: an ongoing conversation's context competes with the setup and invites the agent to treat it as a one-off task and skip the install.</p>
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
                            <p class="nds-alert-description">This first run works well in <strong>plan mode</strong>, or your agent's read-only planning equivalent. The agent inventories read-only, surfaces the project-wide decisions as structured questions, and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> only after you approve.</p>
                        </div>
                    </div>
                </div>
                <p><strong>Two pieces land in your project:</strong></p>
                <ol>
                    <li><code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, committed. The full rulebook. It holds no project-specific values, so every project's copy is identical and an update is a whole-file replace.</li>
                    <li>A short <strong>anchor</strong> added to your agent instruction file. It carries your two paths and one instruction: read <code class="nds-inline-code lang-html">NDS-IQ.md</code> before NDS work starts. It has no version, so it never needs updating.</li>
                </ol>
                <p>The agent instruction file is <code class="nds-inline-code lang-html">CLAUDE.md</code> for Claude Code, <code class="nds-inline-code lang-html">AGENTS.md</code> for Cursor and Codex.</p>
                <p>Only the anchor loads on every turn. The rulebook is read on demand, once per session, when NDS work starts, so non-UI days cost nothing.</p>
                <p>The URL always tracks the latest published revision; on later sessions, NDS IQ's own upgrade workflow handles any drift against your installed template.</p>
                <h3 id="paths">Paths</h3>
                <p>The anchor declares two paths, and ships them as placeholders. On first install the agent asks you for real values; provide what's below and it writes them into the anchor's two declaration lines. Until they are set, NDS IQ blocks NDS work rather than guessing at a folder. Installing manually? Those two lines are the only thing you edit — <code class="nds-inline-code lang-html">NDS-IQ.md</code> itself is never edited, and any <code class="nds-inline-code lang-html">/path/to/…</code> inside it is instructional.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory from section 1.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where your application serves static assets (e.g. <code class="nds-inline-code lang-html">public/assets/</code>, <code class="nds-inline-code lang-html">wwwroot/</code>). If it does not exist, the agent creates it during the first asset copy.</td></tr>
                    </tbody>
                </table>
                <p>One-time only: future sessions load the agent's instruction file automatically at start, and its anchor points them at the rulebook.</p>
                <h3 id="plan-review">Plan Review</h3>
                <p>Once paths are set, the agent inventories this project and writes <code class="nds-inline-code lang-html">NDS-PLAN.md</code> at the project root as a markdown table (page, route, legacy libraries, NDS target, status). It stops there for your review; nothing gets built until you approve.</p>
                <p>The review raises project-wide decisions only: the asset URL prefix, the porting strategy for an existing UI, what to do with any prior NDS work, direction and locale, and your build pacing. Page-level questions wait for that page's own build session, so a large plan does not front-load them all on you.</p>
                <p>The plan carries state between AI sessions, since they do not share chat memory. Every session after the first reads and updates it.</p>
                <h3 id="manual-install">Manual Install (optional)</h3>
                <p>To install by hand, or to read what the agent installs, the full rulebook is below. Save it as <code class="nds-inline-code lang-html">NDS-IQ.md</code> at your project root, then add the anchor — its exact text is in the file's own <em>Install and upgrade this file</em> section — to your agent instruction file with your two paths filled in. <strong>Copy the file exactly as written, all of it.</strong> A paraphrase reads correct but silently drops rules the build depends on later.</p>
                <p>The template zip carries the same file at <code class="nds-inline-code lang-html">NDS_ROOT/NDS-IQ.md</code>, matched to that release. Use it when you want the offline copy instead of the latest.</p>
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
                <p>How work proceeds after the plan is approved.</p>

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
                    <li><strong>One continuous run</strong>: the agent answers its own questions from NDS IQ's defaults (existing shape, data scale, hero rules), verifies each page in the browser as it builds, and delivers a single report at the end. Every decision made by default and every check it could not run is listed there, not buried.</li>
                </ul>
                <p><strong>Whichever pace, hold it to these:</strong></p>
                <ul>
                    <li>The chrome renders and verifies before any page: NDS styling in place, icons visible, no unstyled flash on load, and a console clean of errors and <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                    <li>Row statuses move only through the four exact values, and only your confirmation makes a row <code class="nds-inline-code lang-html">Built and Verified</code>.</li>
                </ul>
                <h3 id="everyday-asks">Everyday Asks</h3>
                <p>Work requests need no special words: the anchor sends every UI ask through NDS IQ before work starts. Spend your words on the task instead — the page, the content, the data, what must not change. That detail is what the agent cannot infer:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Port our About page (Views/Home/About.cshtml) to NDS. Keep all current text and the two team photos. Drop the old org-chart image — it is outdated.
                    </code>
                </div>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Add a Settings page at /settings: a profile form (name, email, phone), notification toggles per channel (email, SMS), and a delete-account action that asks for confirmation. It saves through our existing POST /api/settings endpoint.
                    </code>
                </div>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy prompt">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
On mobile the dashboard header wraps to two lines and the search box overflows the viewport. Fix it. Do not change the desktop layout.
                    </code>
                </div>
                <p>Notice what the asks never mention: which NDS components to use, what markup to write, how to verify. That side comes from the rules on every ask — a plan row, canonical markup, a browser check — whether the prompt names it or not.</p>
                <h3 id="verification">Browser Verification</h3>
                <p>Before any page is claimed built, the agent verifies it in the browser in two passes:</p>
                <ul>
                    <li><strong>Behavioral</strong>: load the page, scan the console for <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings, then run <code class="nds-inline-code lang-js">NDS.Init.audit()</code> for silent failures (unregistered icons, unclaimed filter/pagination containers). The agent also exercises what the page wires: submit, filter, advance a step. Required fields get tested empty one component type at a time, since each type validates through different code.</li>
                    <li><strong>Visual</strong>: check at desktop and mobile widths for unstyled flashes on load, missing gaps, mis-nested wrappers, dark mode on the content, and the page reading as one design. A page built from a template or example is compared side by side against that page's built copy in the template folder, which serves as the visual spec.</li>
                </ul>
                <p>The agent won't claim a page verified from reading its code alone.</p>
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
                <h3 id="legacy-cleanup">Retiring Legacy Libraries</h3>
                <p>If you replaced an existing UI via parallel files, the legacy pages remain live and still need their libraries. Removing a legacy library is invasive and is your decision, not the agent's. The agent reports when no ported page depends on a library anymore, and you approve its removal (NDS IQ rules #6 and #7).</p>

                <h3 id="findings-report">Reporting Findings</h3>
                <p>The agent writes to an optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code> at the project root whenever adoption hits an NDS gap: a missing method or event, canonical markup contradicting a rule, a doc that misled, a reproducible component bug. Each entry names the NDS version, instructions version, and component, with a minimal generic repro. Nothing project-private lands in the file, so it stays safe to share as-is.</p>
                <p>Review it and send it to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>, or privately to the maintainer. Every report feeds the next revision of the system and these instructions.</p>

                <h2 id="upgrade">4. Upgrade</h2>
                <p>When a new version of NDS is published, paste the prompt below. The agent handles the whole upgrade: replaces the contents of your template folder, so <code class="nds-inline-code lang-html">NDS_ROOT</code> keeps pointing at the same path, then runs the upgrade workflow from NDS IQ (version compare, runtime replace, changelog sweep) and reports every change.</p>
                <p>The last step updates the rules themselves. If a newer revision of <code class="nds-inline-code lang-html">NDS-IQ.md</code> is published, the agent replaces your copy whole: no merging, no partial patches. Your anchor is never touched, so the two paths survive every update.</p>

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
                <p>New revisions of the rules can ship between template releases. To pick one up without a template upgrade, paste:</p>
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
                <p>The agent compares versions and replaces the file whole, only when a newer revision exists. One guard applies: if your runtime is behind the latest release, the agent proposes the full upgrade instead, and the rules ride it.</p>

            </article>
        </div>
    </div>
</section>
