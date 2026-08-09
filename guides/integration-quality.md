---
layout: page
title: NDS IQ
since: "1.6.x"
updated: "1.7.x"
last_edit: "09/08/2026 - 10:08 PM"
lang: en
direction: ltr
hero_title: NDS IQ
hero_style: nds-flat
hero_tags:
  - label: Beta
    style: nds-yellow
hero_description: "The instruction system that governs AI agents building with NDS: how it is engineered, tested, versioned, and kept current in your project."
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
                <p>What NDS IQ is and where it lives in a project.</p>

                <p><strong>NDS IQ (Integration Quality)</strong> is the instruction system that governs AI agents building with NDS. It drives the whole lifecycle: installing the runtime, porting or building pages, verifying them in the browser, and upgrading.</p>
                <p>It installs as two pieces. The rules live in <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, and a short <strong>anchor</strong> goes into the project's agent instruction file (<code class="nds-inline-code lang-html">CLAUDE.md</code> or <code class="nds-inline-code lang-html">AGENTS.md</code>). The anchor declares the two paths that configure everything, and tells every session to read the rules before NDS work starts. Only the anchor loads on every turn; the rules are read <strong>on demand, once per session</strong>, so a project pays for them on the days it builds UI.</p>
                <p>That split is what makes the rules file universal: every project's copy is byte-identical, because the only per-project values live in the anchor. A rules update is a whole-file replace, never an edit.</p>
                <p>Installation, the workflow, and the full rule text live in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>. This page explains the system itself: how it is built, tested, versioned, and kept current.</p>

                <h2 id="how-built">How It Is Built</h2>
                <p>Three sources feed every rule: component internals, real migrations, and regression tests.</p>

                <h3 id="from-source">From the Source Outward</h3>
                <p>The rules start where the components are defined: init lifecycles, event surfaces, state cascades, and the dependency graph between components. What an agent must never guess (markup structure, API shapes, attribute contracts) is written down as law; what it can safely derive is left to the agent.</p>
                <h3 id="hardened">Hardened by Real Migrations</h3>
                <p>Revisions are driven by <strong>evidence, not speculation</strong>. NDS runs real adoption and migration projects with AI agents, and each failure an agent hits becomes a candidate rule. A finding earns its sentence only after verification against the source: reported gaps that turn out to be agent noise are dropped, not codified.</p>
                <h3 id="tested">Tested per Revision</h3>
                <p>The rules must not depend on a strong model to be read correctly. Before a revision publishes, a scenario suite replays real failure cases against fresh agents on the weakest model tier the rules serve. A new rule goes through a <strong>fail, fix, pass loop</strong>: the failure is reproduced against the old text, the rule lands, and the same scenario must pass against the new text. Passing scenarios stay in the suite as regression tripwires for every later edit.</p>
                <div class="nds-alert nds-card nds-color" data-status="success" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">Validated on the weakest tier</span>
                            <p class="nds-alert-description">Every revision is tested against Claude Sonnet, the lowest model tier these rules support. A rule that only a strong model reads correctly counts as a bug in the file, not a limit of the agent. Before each release the same suite runs across three tiers. Your agent does not need to be the strongest one to get the same result.</p>
                        </div>
                    </div>
                </div>

                <h2 id="governs">What It Governs</h2>
                <p>A map of the system. The letter of every rule lives in the Get Started guide.</p>

                <p>Seven hard rules:</p>
                <ol>
                    <li><strong>Read-only template</strong>: nothing under the NDS reference folder is ever edited.</li>
                    <li><strong>No minified reads</strong>: bundles are opaque; readable source ships beside them.</li>
                    <li><strong>Canonical markup</strong>: component HTML is copied from the docs, never invented.</li>
                    <li><strong>Sections and primitives</strong>: all page content composes from the NDS layout system.</li>
                    <li><strong>Knobs and tokens first</strong>: styling goes through custom properties before any selector override.</li>
                    <li><strong>No legacy libraries</strong>: NDS plus vanilla JS replaces the jQuery-era stack.</li>
                    <li><strong>Approved porting strategy</strong>: replacing an existing UI starts with a plan the developer approves.</li>
                </ol>
                <p>Around the rules sits a <strong>workflow</strong> (inventory, plan, build, verify) and a <strong>plan file</strong> (<code class="nds-inline-code lang-html">NDS-PLAN.md</code>) that carries state between sessions, so any session can pick up where the last one stopped.</p>

                <h2 id="revisions">Revision History</h2>
                <p>The rules version independently of the template: a plain integer, bumped once per published revision.</p>

                <p>The current revision is stamped in the file's own heading (<code class="nds-inline-code lang-html">instructions v{{ _iq_v }}</code>) and on the green chip beside the rendered copy below. An installed copy compares its stamp against the published one during upgrades to know when an update is due. The anchor carries no version: it never needs updating.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Revision</th><th>Template</th><th>Highlights</th></tr></thead>
                    <tbody>
                        <tr><td>v1</td><td>1.6.0</td><td>Shipped with the 1.6.0 template, before the version stamp existed. An installed heading with no version reads as v1.</td></tr>
                        <tr><td>v2</td><td>1.6.0</td><td>First stamped revision: porting strategy machinery, chrome coverage, plan discipline, the findings report file.</td></tr>
                        <tr><td>v3</td><td>1.6.0</td><td>Conformance triage for pre-existing NDS work, plan lifecycle, the update check, dual block-refresh paths.</td></tr>
                        <tr><td>v4</td><td>1.6.0</td><td>The NDS IQ name. Greenfield projects, the spike rule, JS wiring facts, the menu portal fact.</td></tr>
                        <tr><td>v5</td><td>1.6.0</td><td>From two field cycles: the zip's top-level folder, runtime-banner-first installs, the 1.6.0 template floor, hunting existing automation before falling back to a verification checklist, raw-file fetch discipline, the project's own globals as legacy UI, clean resets over inherited attempts, and image geometry on swapped assets.</td></tr>
                        <tr><td>v6</td><td>1.6.0</td><td>Stale NDS instructions in the agent file join the prior attempt's footprint: a superseded block copy, hand-written conventions, leftover notes, all proposed for removal with the plan.</td></tr>
                        <tr><td>v7</td><td>1.7.0</td><td>New install model: the rules move out of the agent file into <code class="nds-inline-code lang-html">NDS-IQ.md</code> at the project root, read on demand, with a version-free anchor left behind. Rewritten for that job. JS wiring reads the per-component banner the template now ships in every source file; page and component markup route to the raw doc, template, and example sources in <code class="nds-inline-code lang-html">_source/</code>.</td></tr>
                    </tbody>
                </table>

                <h2 id="staying-current">Staying Current</h2>
                <p>How a new revision reaches an installed project.</p>

                <p>Two paths deliver updates:</p>
                <ul>
                    <li><strong>Template upgrade</strong>: the matching revision rides along, as the last step of the upgrade workflow.</li>
                    <li><strong>Standalone update</strong>: on ask, the agent fetches the latest revision straight from the repository, even between template releases.</li>
                </ul>
                <p>Both paths do the same thing: compare the installed file's heading against the published one, and replace the file whole when it is behind. No merging, no partial patches, no surgery on an installed copy. The anchor is never touched, so an update <strong>never loses local configuration</strong> — the two paths live there, not in the file being replaced. The agent handles all of it; the upgrade prompt in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a> is the whole interface.</p>
                <p>Projects still running a pasted v6 block migrate on their next refresh: the old raw URL now serves a pointer that carries them to the file-and-anchor model, then the pasted block is deleted.</p>

                <h2 id="compatibility">Compatibility</h2>
                <p>Agent-agnostic by design, exercised end to end with Claude Code.</p>

                <p>The rules assume a capable local coding agent with file access and a shell: nothing in them is specific to one vendor. Claude Code is the reference agent the system is built and tested with; other agents follow the same text. The Revision History table names the template release each revision is validated against, and that release is also its floor. A revision reads artifacts its own template introduced — v7 reads the per-file JS banners and the raw page sources that template 1.7.0 added — so on an older template the rules mandate the upgrade before driving any NDS work.</p>

                <h2 id="the-instructions">The Instructions</h2>
                <p>The complete rulebook, rendered from the same source the template ships. Installation flow lives in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

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
                <p>Adoption findings close the loop that migrations open.</p>

                <p>When adoption hits a real NDS gap (a missing method, a doc that misled, a reproducible bug), the agent records it in an optional <code class="nds-inline-code lang-html">NDS-REPORT.md</code> at the project root, written to contain <strong>nothing project-private</strong> so it stays safe to share. Sent to <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>, each verified finding becomes a rule or a fix in a later revision: the same loop that produced most of the rules on this page. Details under Reporting Findings in the <a class="nds-color" href="{{ 'guides/get-started' | relative_url }}">Get Started guide</a>.</p>

            </article>
        </div>
    </div>
</section>
