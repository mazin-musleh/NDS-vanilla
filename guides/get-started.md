---
layout: page
title: Get Started
since: "1.6.0"
last_edit: "12/08/2026 - 11:02 PM"
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
                <p>The recommended way to build with NDS is through an AI coding agent. The agent uses the NDS template as its canonical UI reference and <a class="nds-color" href="{{ 'guides/integration-quality' | relative_url }}">NDS IQ</a> as the rules for implementing, porting, and verifying UI.</p>

                <p><strong>NDS IQ provides:</strong></p>
                <ul>
                    <li>Seven rules covering markup, styling, libraries, and porting.</li>
                    <li>A workflow: inventory, plan, build, verify.</li>
                    <li><code class="nds-inline-code lang-html">NDS-PLAN.md</code> to track decisions, page status, and open questions.</li>
                    <li>The NDS template as the source for canonical markup and runtime assets.</li>
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
                            <p class="nds-alert-description">The workflow has been validated end to end with Claude Code. The instructions are agent-agnostic, but behavior may vary with other agents.</p>
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
                                <li><strong>A local CLI or IDE agent with filesystem access</strong>, such as Claude Code, Cursor, or Codex. Browser-based assistants cannot access local template files or modify your project.</li>
                                <li><strong>An existing application</strong> that renders at least one page. NDS provides the UI layer; it does not scaffold an application.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h2 id="template">1. Template</h2>
                <p>The NDS template is the read-only source for components, markup, design tokens, documentation, and runtime assets. Inspect and copy from it; do not modify it. Replace the folder contents when upgrading.</p>

                <h3 id="download">Download and Extract</h3>
                <ol>
                    <li><strong>Download</strong> <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> from the <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a> page.</li>
                    <li><strong>Extract</strong> it into a gitignored <code class="nds-inline-code lang-html">.nds/</code> folder at the project root.</li>
                    <li><strong>Rename</strong> the extracted versioned folder to <code class="nds-inline-code lang-html">nds-vanilla-template</code>. The final path must be <code class="nds-inline-code lang-html">.nds/nds-vanilla-template/</code>, with <code class="nds-inline-code lang-html">_site/</code> directly inside it.</li>
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
NDS-IQ.md       - NDS IQ instructions
_site/          - Compiled documentation and runtime assets
_source/        - Source files and catalogs (added on install)
CHANGELOG.md    - Release history and migration notes
LICENSE         - License terms
                    </code>
                </div>
                <p><code class="nds-inline-code lang-html">_site/</code> contains the canonical component markup under <code class="nds-inline-code lang-html">_site/components/</code> and runtime assets under <code class="nds-inline-code lang-html">_site/assets/</code>.</p>

                <h2 id="setup">2. Setup</h2>
                <p>Run the setup prompt once. It installs NDS IQ, configures the project paths, and creates the initial plan for review.</p>

                <h3 id="instructions-block">Setup Prompt</h3>
                <p>Use this as the first turn of a fresh agent session:</p>
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
                            <span class="nds-alert-title">Setup requirements</span>
                            <p class="nds-alert-description">Run the prompt as the first turn of a fresh session and use an edit-capable mode, since setup creates <code class="nds-inline-code lang-html">NDS-IQ.md</code> and updates the agent instruction file. Approve internet access if requested.</p>
                        </div>
                    </div>
                </div>

                <p>Setup adds:</p>
                <ol>
                    <li><code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root as the full rulebook.</li>
                    <li>An <strong>anchor</strong> in the agent instruction file containing the project paths and instructing the agent to read the rulebook before NDS work.</li>
                </ol>
                <p>Use <code class="nds-inline-code lang-html">CLAUDE.md</code> for Claude Code and <code class="nds-inline-code lang-html">AGENTS.md</code> for Cursor and Codex.</p>

                <h3 id="paths">Paths</h3>
                <p>The anchor declares two project-specific paths. The agent fills both in during setup and asks only when the choice is ambiguous. It confirms the URL your assets are served at before writing the first asset tag. <code class="nds-inline-code lang-html">NDS-IQ.md</code> itself is never edited.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Variable</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>The extracted NDS template directory.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>The directory where the application serves static assets, such as <code class="nds-inline-code lang-html">public/assets/</code> or <code class="nds-inline-code lang-html">wwwroot/</code>.</td></tr>
                    </tbody>
                </table>

                <h3 id="plan-review">Plan Review</h3>
                <p>After setup, the agent inventories the project and creates <code class="nds-inline-code lang-html">NDS-PLAN.md</code>. It records pages, routes, legacy libraries, NDS targets, and status. The agent stops for your review before implementation.</p>
                <p>The initial review covers project-wide decisions such as asset paths, porting strategy, existing NDS work, direction, locale, and build pacing.</p>

                <p>If the plan was not created automatically, run:</p>
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

                <p><code class="nds-inline-code lang-html">NDS-PLAN.md</code> is optional for a single-page trial. Use it when work spans multiple pages or sessions.</p>

                <h3 id="manual-install">Manual Install (optional)</h3>
                <p>For manual installation, save the complete rulebook as <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, then add the anchor to the agent instruction file with the two paths filled in. The anchor's exact text is in the rulebook's own <em>Install and upgrade this file</em> section. Copy the rulebook exactly; do not paraphrase it.</p>
                <p>The template also contains <code class="nds-inline-code lang-html">NDS_ROOT/NDS-IQ.md</code>, matched to the template release.</p>
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
                <p>After you approve the plan, NDS IQ controls the implementation workflow. Your request only needs to provide the desired outcome, content, data, and project constraints.</p>

                <h3 id="agent-drives">Pacing</h3>
                <p>Choose how much control you want over the workflow:</p>
                <ul>
                    <li><strong>Gate by gate (default)</strong>: the agent builds assets, chrome, and pages in order. Each page follows: questions → build → browser verification → status update → stop for approval.</li>
                    <li><strong>One continuous run</strong>: the agent uses NDS IQ defaults, verifies each page, and reports all decisions and incomplete checks at the end.</li>
                </ul>

                <p><strong>Both modes require:</strong></p>
                <ul>
                    <li>The chrome must render and verify before any page is built: NDS styling is active, icons work, there is no unstyled flash, and the console has no errors or <code class="nds-inline-code lang-html">NDS</code>-prefixed warnings.</li>
                    <li>A page can reach <code class="nds-inline-code lang-html">Built and Verified</code> only after verification and your confirmation.</li>
                </ul>

                <h3 id="verification">Browser Verification</h3>
                <p>Every page is verified in two passes:</p>
                <ul>
                    <li><strong>Behavioral</strong>: load the page, check the console, run <code class="nds-inline-code lang-js">NDS.Init.audit()</code>, and exercise the page's wired interactions and validation.</li>
                    <li><strong>Visual</strong>: check desktop and mobile layouts for flashes, spacing, wrapper structure, dark mode, and overall visual consistency. Compare template-based pages with their canonical template reference.</li>
                </ul>
                <p>Source inspection alone is not verification.</p>

                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">No browser access?</span>
                            <p class="nds-alert-description">The agent produces a per-page verification checklist instead of claiming browser verification. You provide the final sign-off.</p>
                        </div>
                    </div>
                </div>

                <h3 id="resuming">Resuming</h3>
                <p>Start a new session with:</p>
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

                <p>Implementation is complete when all plan entries are <code class="nds-inline-code lang-html">Built and Verified</code>. Entries marked <code class="nds-inline-code lang-html">Awaiting Verification</code> still require sign-off.</p>

                <h3 id="legacy-cleanup">Retiring Legacy Libraries</h3>
                <p>Removing legacy libraries is an invasive change and remains your decision. The agent reports when no ported page depends on a library; remove it only after approval.</p>

                <h3 id="findings-report">Reporting Findings</h3>
                <p>Record reproducible NDS gaps in <code class="nds-inline-code lang-html">NDS-REPORT.md</code>. Include the NDS version, instructions version, component, and a minimal generic reproduction.</p>
                <p>Review the report and send verified findings to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a> or the maintainer.</p>

                <h2 id="upgrade">4. Upgrade</h2>
                <p>When a new NDS version is published, run:</p>
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
                <p>The agent replaces the template contents, keeps <code class="nds-inline-code lang-html">NDS_ROOT</code> unchanged, runs the NDS IQ upgrade workflow, reviews the changelog, and reports breaking changes and available features.</p>
                <p>It also replaces <code class="nds-inline-code lang-html">NDS-IQ.md</code> with the latest published revision. The anchor and project paths remain unchanged.</p>

                <h3 id="update-rules">Rules Update</h3>
                <p>To update NDS IQ without upgrading the template, run:</p>
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
                <p>The agent compares the published and installed rulebooks and replaces the installed copy when they differ. If the template is behind the latest release, it reports that separately.</p>

            </article>
        </div>
    </div>
</section>
