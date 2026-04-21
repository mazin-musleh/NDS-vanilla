---
layout: page
title: TOC
hero_title: TOC - National Design System
hero_description: A navigable outline that auto-builds from a page's headings and keeps the reader's current section highlighted as they scroll.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Auto-Populated TOC -->
<section id="tocAutoPopulate" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Auto-Populated</h2>
            <p class="nds-section-description">Point the TOC at an article with <code class="nds-inline-code lang-html">data-toc-source</code> and it builds the list from the headings it finds. Missing heading IDs get slugified automatically so anchors resolve.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Built from <code class="nds-inline-code lang-html">#tocSampleArticle</code> h2/h3/h4 headings</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; gap: var(--spacing-xl); align-items: flex-start; width: 100%;">
                            <nav class="nds-toc" aria-label="Table of contents"
                                data-toc-source="#tocSampleArticle" style="width: 240px; flex-shrink: 0;">
                                <div class="nds-toc-head">
                                    <span class="nds-label">On this page</span>
                                    <h2 class="nds-toc-title nds-truncate">Page Title</h2>
                                </div>
                                <div class="nds-drawer">
                                    <ul class="nds-drawer-list"></ul>
                                </div>
                            </nav>
                            <article id="tocSampleArticle" style="flex: 1; min-width: 0;">
                                <h2 id="toc-demo-intro">Introduction</h2>
                                <p>Overview paragraph describing the page purpose.</p>
                                <h2 id="toc-demo-setup">Setup</h2>
                                <p>Preparing the environment and installing dependencies.</p>
                                <h3 id="toc-demo-requirements">Requirements</h3>
                                <p>What you need before you begin.</p>
                                <h3 id="toc-demo-install">Install</h3>
                                <p>Running the install command.</p>
                                <h4 id="toc-demo-install-mac">macOS</h4>
                                <p>Notes for macOS users.</p>
                                <h4 id="toc-demo-install-win">Windows</h4>
                                <p>Notes for Windows users.</p>
                                <h2 id="toc-demo-usage">Usage</h2>
                                <p>Typical usage patterns.</p>
                                <h2 id="toc-demo-support">Support</h2>
                                <p>Where to go for help.</p>
                            </article>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-toc-auto-1" id="tab-toc-auto-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-toc-auto-1"
                                    aria-labelledby="tab-toc-auto-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;nav class="nds-toc" aria-label="Table of contents"
  data-toc-source="#articleRoot"&gt;
  &lt;div class="nds-toc-head"&gt;
    &lt;span class="nds-label"&gt;On this page&lt;/span&gt;
    &lt;h2 class="nds-toc-title nds-truncate"&gt;Page Title&lt;/h2&gt;
  &lt;/div&gt;
  &lt;div class="nds-drawer"&gt;
    &lt;ul class="nds-drawer-list"&gt;&lt;/ul&gt;
  &lt;/div&gt;
&lt;/nav&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Manual Markup -->
<section id="tocManual" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Manual Markup</h2>
            <p class="nds-section-description">Author the list yourself when the TOC doesn't mirror a page's headings (custom labels, filtered entries, non-heading anchors). Nest <code class="nds-inline-code lang-html">&lt;ul&gt;</code> inside an <code class="nds-inline-code lang-html">&lt;li&gt;</code> for any number of sub-levels.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Three-level TOC, written by hand</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-toc" aria-label="Table of contents" style="width: 240px;">
                                <div class="nds-toc-head">
                                    <span class="nds-label">On this page</span>
                                    <h2 class="nds-toc-title nds-truncate">Page Title</h2>
                                </div>
                                <div class="nds-drawer">
                                    <ul class="nds-drawer-list">
                                        <li>
                                            <a href="#manual-section-1" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-label nds-truncate">Section 1</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#manual-section-2" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-label nds-truncate">Section 2</span>
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#manual-section-2a" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label nds-truncate">Sub A</span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#manual-section-2a1" class="nds-btn nds-subtle nds-indicator">
                                                                <span class="nds-label nds-truncate">Detail one</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#manual-section-2a2" class="nds-btn nds-subtle nds-indicator">
                                                                <span class="nds-label nds-truncate">Detail two</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#manual-section-2b" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label nds-truncate">Sub B</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#manual-section-3" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-label nds-truncate">Section 3</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-toc-manual-1" id="tab-toc-manual-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-toc-manual-1"
                                    aria-labelledby="tab-toc-manual-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;nav class="nds-toc" aria-label="Table of contents"&gt;
  &lt;div class="nds-toc-head"&gt;
    &lt;span class="nds-label"&gt;On this page&lt;/span&gt;
    &lt;h2 class="nds-toc-title nds-truncate"&gt;Page Title&lt;/h2&gt;
  &lt;/div&gt;
  &lt;div class="nds-drawer"&gt;
    &lt;ul class="nds-drawer-list"&gt;
      &lt;li&gt;
        &lt;a href="#manual-section-1" class="nds-btn nds-subtle nds-indicator"&gt;
          &lt;span class="nds-label nds-truncate"&gt;Section 1&lt;/span&gt;
        &lt;/a&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;a href="#manual-section-2" class="nds-btn nds-subtle nds-indicator"&gt;
          &lt;span class="nds-label nds-truncate"&gt;Section 2&lt;/span&gt;
        &lt;/a&gt;
        &lt;ul&gt;
          &lt;li&gt;
            &lt;a href="#manual-section-2a" class="nds-btn nds-subtle nds-indicator"&gt;
              &lt;span class="nds-label nds-truncate"&gt;Sub A&lt;/span&gt;
            &lt;/a&gt;
            &lt;ul&gt;
              &lt;li&gt;
                &lt;a href="#manual-section-2a1" class="nds-btn nds-subtle nds-indicator"&gt;
                  &lt;span class="nds-label nds-truncate"&gt;Detail one&lt;/span&gt;
                &lt;/a&gt;
              &lt;/li&gt;
              &lt;li&gt;
                &lt;a href="#manual-section-2a2" class="nds-btn nds-subtle nds-indicator"&gt;
                  &lt;span class="nds-label nds-truncate"&gt;Detail two&lt;/span&gt;
                &lt;/a&gt;
              &lt;/li&gt;
            &lt;/ul&gt;
          &lt;/li&gt;
          &lt;li&gt;
            &lt;a href="#manual-section-2b" class="nds-btn nds-subtle nds-indicator"&gt;
              &lt;span class="nds-label nds-truncate"&gt;Sub B&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;a href="#manual-section-3" class="nds-btn nds-subtle nds-indicator"&gt;
          &lt;span class="nds-label nds-truncate"&gt;Section 3&lt;/span&gt;
        &lt;/a&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/nav&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="tocFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates on any <code class="nds-inline-code lang-html">.nds-toc</code> element on the page. No manual wiring required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-magic-wand-01"></i>
                        <span class="nds-label">Heading-Driven List</span>
                    </span>
                    <p class="nds-item-desc">Scans the article you point it at and builds the full nested list, slugifying any heading that lacks an <code class="nds-inline-code lang-html">id</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-list-view"></i>
                        <span class="nds-label">Unlimited Depth</span>
                    </span>
                    <p class="nds-item-desc">Each sub-level picks up its own indent and side rail, so deeply nested sections read clearly without extra markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-eye"></i>
                        <span class="nds-label">Active-Section Tracking</span>
                    </span>
                    <p class="nds-item-desc">Highlights the section currently below the sticky nav as the reader scrolls, with the indicator following in real time.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tap-01"></i>
                        <span class="nds-label">Click-to-Scroll</span>
                    </span>
                    <p class="nds-item-desc">Clicking a TOC entry smooth-scrolls the target heading into view beneath the nav, updates the URL hash, and respects reduced-motion preferences.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Create a single instance or reinitialize all TOCs after injecting new content through the <code class="nds-inline-code lang-js">NDS.Toc</code> API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="tocGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Live Example</h3>
                <ul>
                    <li><a class="nds-color" href="{{ 'templates/content-template' | relative_url }}">Content Template</a>: long-form article with an auto-populated TOC in a sticky <a class="nds-color" href="{{ 'ui-shell/sideinfo' | relative_url }}">sideinfo</a> column</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a <strong>TOC</strong> on long-form content (policy pages, documentation, guides) where readers benefit from skimming the structure and jumping around</li>
                    <li>Use <strong>auto-populate</strong> (<code class="nds-inline-code lang-html">data-toc-source</code>) whenever the TOC should mirror the article one-to-one. It stays in sync automatically as headings are added, renamed, or removed</li>
                    <li>Use <strong>manual markup</strong> only when you need labels that differ from the headings, a filtered subset, or anchors that aren't headings</li>
                    <li>Do not place a TOC on short pages where every section is already visible. Use the <a class="nds-color" href="{{ 'components/drawer' | relative_url }}">Drawer</a> for plain navigation or the <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a> for linear multi-step flows instead</li>
                    <li>Place the TOC inside a <a class="nds-color" href="{{ 'layout/section' | relative_url }}">sideinfo</a> column with <code class="nds-inline-code lang-html">nds-sticky</code> so it stays visible as the reader scrolls long content</li>
                    <li>Pick <code class="nds-inline-code lang-html">nds-sm</code> or <code class="nds-inline-code lang-html">nds-md</code> on the surrounding <code class="nds-inline-code lang-html">.nds-sideinfo</code> for compact rails. The default width is tuned for richer sideinfo content, not link lists</li>
                    <li>Keep the TOC to <strong>three levels or fewer</strong>. Deeper trees produce tight indents that are hard to scan and hint at a page that should be split</li>
                    <li>Set <code class="nds-inline-code lang-html">data-toc-levels="h2,h3"</code> to skip h4s if the article uses them for inline emphasis rather than real sub-sections</li>
                    <li>Give every heading a stable, human-readable <code class="nds-inline-code lang-html">id</code>. The auto-slugifier is a fallback, not a substitute for author-chosen anchors</li>
                    <li>Author labels should match the heading text. Invent TOC-only names only when the heading is verbose and the rail cannot truncate cleanly</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-toc-source</code></td><td>CSS selector for the container whose headings should populate the list. Omit for manual markup.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-toc-levels</code></td><td>Comma-separated heading tags to include (default: <code class="nds-inline-code lang-html">h2,h3,h4</code>). Use <code class="nds-inline-code lang-html">h2</code> for a flat TOC or <code class="nds-inline-code lang-html">h2,h3,h4,h5</code> for deeper docs.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Toc</strong> API initializes, re-initializes, and creates TOC instances. Auto-init runs on <code class="nds-inline-code lang-js">DOMContentLoaded</code>; call <code class="nds-inline-code lang-js">NDS.Toc.reinit()</code> after injecting new TOC markup dynamically.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize all TOCs on the page ─────────────────
// Called automatically once. Re-run after injecting new TOC markup.
NDS.Toc.init();
NDS.Toc.reinit();

// ── Create a single TOC instance ────────────────────
// Returns the NDSToc instance (with .active, .entries, .destroy(), etc.)
const toc = document.querySelector('.nds-toc');
const instance = NDS.Toc.create(toc);

// ── Read the currently-active entry ──────────────────
instance.active;           // { link, li, target } | null
instance.entries;          // Array of { link, li, target }

// ── Manually tear down and re-wire ──────────────────
instance.destroy();        // Remove click + scroll listeners, clear state
instance.update();         // Recompute active entry from current scroll
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
