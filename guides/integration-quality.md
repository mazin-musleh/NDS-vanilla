---
layout: page
title: NDS IQ
since: "1.7.0"
updated: "1.7.x"
last_edit: "11/08/2026 - 10:54 PM"
lang: en
direction: ltr
hero_title: NDS IQ
hero_style: nds-flat
hero_tags:
  - label: Beta
    style: nds-yellow
hero_description: "The instruction system that gives AI agents a consistent way to build with NDS: how it is engineered, tested, versioned, and kept current in a project."
breadcrumb: ["Guides"]
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
                <p>What NDS IQ is, how it is structured, and where it lives in a project.</p>

                <p><strong>NDS IQ (Integration Quality)</strong> is the instruction system that gives AI agents a consistent way to build with NDS. It covers the full workflow: installing the runtime, porting or building pages, verifying the result in the browser, and upgrading the project.</p>
                <p>It installs as two pieces. The rules live in <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, while a short <strong>anchor</strong> is added to the project's agent instruction file (<code class="nds-inline-code lang-html">CLAUDE.md</code> or <code class="nds-inline-code lang-html">AGENTS.md</code>). The anchor defines the two paths the system needs and tells each session to read the rules before NDS work begins. Only the anchor is loaded on every turn; the rules are read <strong>on demand, once per session</strong>, so a project pays for the full instruction set only on the days it builds UI.</p>
                <p>This separation keeps the rules file universal: every project uses the same copy, while project-specific values remain in the anchor. When the rules change, the installed file is replaced as a whole rather than edited in place.</p>
                <p>Installation, the workflow, and the complete rule text are covered in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>. This page focuses on the system itself: how it is built, tested, versioned, and kept current.</p>

                <h2 id="how-built">How It Is Built</h2>
                <p>Every rule comes from three sources: component internals, real migrations, and regression testing.</p>

                <h3 id="from-source">From the Source Outward</h3>
                <p>The rules start with the components themselves: initialization lifecycles, event surfaces, state cascades, and dependencies between components. Anything an agent should not have to guess — markup structure, API shapes, or attribute contracts — is defined explicitly. What can be safely derived is left to the agent.</p>
                <h3 id="hardened">Hardened by Real Migrations</h3>
                <p>Revisions are driven by <strong>evidence, not speculation</strong>. NDS is used in real adoption and migration work with AI agents, and failures observed in those projects become candidates for new rules. A finding is added only after it is verified against the source. Issues that turn out to be agent noise are discarded rather than turned into rules.</p>
                <h3 id="tested">Tested per Revision</h3>
                <p>The rules should not depend on a high-end model to be interpreted correctly. Before a revision is published, a scenario suite replays real failure cases against fresh agents on the baseline model tier the rules support. A new rule goes through a <strong>fail, fix, pass loop</strong>: the failure is reproduced against the existing text, the rule is added, and the same scenario must pass against the revised text. Passing scenarios remain in the suite as regression checks for future revisions.</p>
                <div class="nds-alert nds-card nds-color" data-status="success" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">A reliable baseline across AI models</span>
                            <p class="nds-alert-description">NDS IQ is built to help AI agents produce consistent results across models, rather than relying on the capabilities of the most advanced model available. <strong>Claude Sonnet</strong> is the validated baseline for NDS IQ, providing a reliable level of performance for any project. More capable models can build on this baseline with greater accuracy and reasoning.</p>
                        </div>
                    </div>
                </div>

                <h2 id="governs">What It Governs</h2>
                <p>A map of the system. The complete rule text lives in the Get Started guide.</p>

                <p>Seven hard rules:</p>
                <ol>
                    <li><strong>Read-only template</strong>: nothing under the NDS reference folder is ever edited.</li>
                    <li><strong>No minified reads</strong>: minified bundles are opaque; use the readable source shipped beside them.</li>
                    <li><strong>Canonical markup</strong>: component HTML is copied from the documentation, never invented.</li>
                    <li><strong>Sections and primitives</strong>: page content is composed through the NDS layout system.</li>
                    <li><strong>Knobs and tokens first</strong>: styling uses custom properties before selector overrides.</li>
                    <li><strong>No legacy libraries</strong>: NDS and vanilla JS replace the legacy jQuery-era stack.</li>
                    <li><strong>Approved porting strategy</strong>: replacing an existing UI begins with a plan approved by the developer.</li>
                </ol>
                <p>The rules are supported by a <strong>workflow</strong> (inventory, plan, build, verify) and a <strong>plan file</strong> (<code class="nds-inline-code lang-html">NDS-PLAN.md</code>) that carries state between sessions, allowing a new session to continue from where the previous one stopped.</p>

                <h2 id="revisions">Revision History</h2>
                <p>The rules are versioned independently of the template. The revision number reports how mature the rule set is, and its sub-1.0 form marks the system as beta.</p>

                <p>The current revision is stamped in the file's own heading (<code class="nds-inline-code lang-html">instructions v{{ _iq_v }}</code>) and shown on the green chip beside the rendered copy below. The number is an indicator for the reader only: no check, gate, or upgrade step compares it. An update check compares the <strong>content</strong> of the installed file against the published file, and any difference means a newer revision exists. The anchor has no version because it does not change between revisions.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th data-align="center">Revision</th><th>Highlights</th></tr></thead>
                    <tbody>
                        <tr><td>v0.1</td><td>Shipped with template 1.6.0, before revision stamps were introduced. A copy whose heading carries no version came from this revision.</td></tr>
                        <tr><td>v0.2</td><td>First stamped revision: porting strategy, chrome coverage, plan discipline, and the findings report file.</td></tr>
                        <tr><td>v0.3</td><td>Conformance triage for pre-existing NDS work, plan lifecycle, update checks, and dual block-refresh paths.</td></tr>
                        <tr><td>v0.4</td><td>Introduced the NDS IQ name, greenfield project handling, the spike rule, JS wiring facts, and the menu portal fact.</td></tr>
                        <tr><td>v0.5</td><td>From two field cycles: the zip's top-level folder, runtime-banner-first installs, the 1.6.0 template requirement, checking for existing automation before falling back to a verification checklist, raw-file fetch discipline, the project's own globals as legacy UI, clean resets over inherited attempts, and image geometry on swapped assets.</td></tr>
                        <tr><td>v0.6</td><td>Stale NDS instructions in the agent file join the prior attempt's footprint: superseded block copies, hand-written conventions, and leftover notes, all proposed for removal through the plan.</td></tr>
                        <tr><td>v0.7</td><td>New install model: the rules move out of the agent file into <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root and are read on demand, with a version-free anchor left behind. Rewritten for that model. JS wiring reads the per-component banner shipped in each source file; page and component markup route to the raw documentation, template, and example sources in <code class="nds-inline-code lang-html">_source/</code>.</td></tr>
                        <tr><td>v0.8</td><td>Version gates removed: the rules became version-agnostic. They no longer require a minimum template version, and <code class="nds-inline-code lang-html">_source/</code> is populated from the matching release tag. The update check compares file content, and a first-line check catches a corrupt download. The revision number became a display indicator. Also added: a catalog check before any native element or hand-built control, a Content-Security-Policy check at install, and an adoption sweep of each release's Added, Changed, and Fixed notes during an upgrade.</td></tr>
                    </tbody>
                </table>

                <h2 id="staying-current">Staying Current</h2>
                <p>How a new revision is delivered to an installed project.</p>

                <p>Two paths deliver updates:</p>
                <ul>
                    <li><strong>Template upgrade</strong>: the matching revision rides along, as the last step of the upgrade workflow.</li>
                    <li><strong>Standalone update</strong>: on ask, the agent fetches the latest revision straight from the repository, even between template releases.</li>
                </ul>
                <p>Both paths follow the same process: compare the installed file with the published one, and replace the installed file as a whole when the two differ. There is no merging, partial patching, or manual editing of an installed copy. The anchor is never changed, so an update <strong>does not overwrite local configuration</strong> — the project-specific paths remain there while the rules file is replaced. The agent handles the process; the upgrade prompt in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a> is the interface.</p>

                <h2 id="compatibility">Compatibility</h2>
                <p>Agent-agnostic by design, validated end to end with Claude Code.</p>

                <p>The rules assume a capable local coding agent with file access and a shell, but do not depend on a specific vendor. Claude Code is the reference agent used to build and validate the system; other agents follow the same instruction set. The rules work with any template release. An older release may lack a piece the current revision names, most often the per-file JS banners added in template 1.7.0. The rules then read the component's documentation source and its JavaScript source instead. The agent reports the gap and proposes the upgrade, and the developer decides.</p>

                <h2 id="the-instructions">The Instructions</h2>
                <p>The complete rulebook, rendered from the same source shipped with the template. The installation flow is covered in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

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
                <p>Adoption findings close the loop created by real migrations.</p>

                <p>When adoption reveals a real NDS gap — a missing method, misleading documentation, or a reproducible bug — the agent records it in an optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code> at the project root. The report is written to contain <strong>nothing project-private</strong>, so it can be shared safely. Verified findings sent to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a> can become a rule or source fix in a later revision, closing the same feedback loop that produced most of the rules on this page. Details are covered under Reporting Findings in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

            </article>
        </div>
    </div>
</section>
