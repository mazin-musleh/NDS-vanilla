---
layout: page
title: Page Shell
hero_title: Page Shell - National Design System
hero_description: "The body structure every NDS page is built on, covering the chrome regions, the content layout grid, and the classes that switch between page shapes."
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.8.0"
updated: "1.8.0"
last_edit: "17/08/2026 - 11:53 PM"
---

<!-- Page Shell Anatomy -->
<section id="shellAnatomy" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Page Shell Anatomy</h2>
            <p class="nds-section-description">Every NDS page shares one body structure: the chrome regions around a single content layout grid that holds the page sections. Do not write this structure by hand. Copy the full body of a built page whose shape matches yours, then swap the content. The <a class="nds-color" href="#pageShapes">shapes table</a> names the source page for each shape.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-html code">
body                                          (console pages add .nds-full-width)
&#9500;&#9472;&#9472; header                                    (top bar + main navigation, see Header)
&#9500;&#9472;&#9472; main
&#9474;   &#9500;&#9472;&#9472; section.nds-hero-section.nds-sub      (page hero; the home shape uses the hero slider)
&#9474;   &#9492;&#9472;&#9472; div.nds-content-layout                (shape and modifier classes go here)
&#9474;       &#9500;&#9472;&#9472; aside.nds-sidemenu                (side menu; requires .nds-wSideMenu, first child)
&#9474;       &#9492;&#9472;&#9472; div.nds-main-content
&#9474;           &#9500;&#9472;&#9472; section.nds-content-section    (page sections, repeated)
&#9474;           &#9492;&#9472;&#9472; ...
&#9492;&#9472;&#9472; footer.nds-footer                         (see Footer)
                        </code>
                    </div>
                </div>
                <p>Each chrome region has its own reference: <a class="nds-color" href="{{ 'ui-shell/head' | relative_url }}">Head</a>, <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a>, <a class="nds-color" href="{{ 'ui-shell/hero' | relative_url }}">Hero</a>, and <a class="nds-color" href="{{ 'ui-shell/footer' | relative_url }}">Footer</a>. This page covers what sits between them: <code class="nds-inline-code lang-html">nds-content-layout</code> and the classes that shape it.</p>
            </div>
        </div>
    </div>
</section>

<!-- Page Shapes -->
<section id="pageShapes" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Page Shapes</h2>
            <p class="nds-section-description">Four shapes cover the system. Pick the row that matches your page and copy its source page as the starting point.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <table class="nds-table nds-responsive nds-striped" style="--min-width:700px;">
                    <thead>
                        <tr>
                            <th>Shape</th>
                            <th>Structure</th>
                            <th>Copy from</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Home</td>
                            <td>Bare <code class="nds-inline-code lang-html">nds-content-layout</code>, no side column. The hero slider is the first child of <code class="nds-inline-code lang-html">main</code>.</td>
                            <td><a class="nds-color" href="{{ '/' | relative_url }}">Home page</a></td>
                        </tr>
                        <tr>
                            <td>Content page</td>
                            <td><code class="nds-inline-code lang-html">nds-content-layout</code> with the sub hero first in <code class="nds-inline-code lang-html">main</code>. Add <code class="nds-inline-code lang-html">nds-wSideMenu</code> and the aside for a side menu, or <code class="nds-inline-code lang-html">nds-cardView</code> for card-style sections.</td>
                            <td><a class="nds-color" href="{{ 'examples/services-list' | relative_url }}">Services List</a>; <a class="nds-color" href="{{ 'examples/program' | relative_url }}">Program</a> for card view with a side menu; any documentation page on this site, this one included, for a plain side menu</td>
                        </tr>
                        <tr>
                            <td>Minimal</td>
                            <td><code class="nds-inline-code lang-html">nds-content-layout nds-content-wrapper nds-middle</code>, no chrome at all: no header, footer, or hero. <code class="nds-inline-code lang-html">body</code> carries <code class="nds-inline-code lang-html">nds-page-bg</code> and its background knobs. Content centers in the viewport.</td>
                            <td><a class="nds-color" href="{{ 'examples/sign-in' | relative_url }}">Sign in</a></td>
                        </tr>
                        <tr>
                            <td>Console</td>
                            <td><code class="nds-inline-code lang-html">nds-content-layout nds-wSideMenu</code> plus <code class="nds-inline-code lang-html">nds-full-width</code> on <code class="nds-inline-code lang-html">body</code>. The hero moves inside <code class="nds-inline-code lang-html">nds-main-content</code> so it sits beside the side menu.</td>
                            <td><a class="nds-color" href="{{ 'examples/console-demo' | relative_url }}">Admin Console</a></td>
                        </tr>
                    </tbody>
                </table>
                <p>Every <a class="nds-color" href="{{ 'templates/' | relative_url }}">DGA template</a> uses the content page shape with the side menu off. Contact Us, Content, Form, and Service add <a class="nds-color" href="#sideColumns">side info</a>. The 404 template is the one exception: it ships its own centered wrapper with no content layout.</p>
            </div>
        </div>
    </div>
</section>

<!-- Side Menu and Side Info -->
<section id="sideColumns" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Side Menu and Side Info</h2>
            <p class="nds-section-description">Both are toggles on top of a shape, not shapes of their own. They attach at different levels: the side menu is a layout column, side info lives inside the content.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Side Menu</h3>
                <p><code class="nds-inline-code lang-html">nds-wSideMenu</code> on the layout creates a two-column grid on desktop and shows the <code class="nds-inline-code lang-html">aside.nds-sidemenu</code> placed as its first child. Without the class, the layout hides any direct <code class="nds-inline-code lang-html">aside</code> child, so the two always ship together. On mobile the grid collapses to one column and the menu becomes a compact control. Add <code class="nds-inline-code lang-html">nds-top</code> to the aside to render it as a bar above the content instead of a column. The aside's own markup is on the <a class="nds-color" href="{{ 'ui-shell/sidemenu' | relative_url }}">Side Menu</a> page.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-html code">
div.nds-content-layout.nds-wSideMenu
&#9500;&#9472;&#9472; aside.nds-sidemenu           (first child; markup on the Side Menu page)
&#9492;&#9472;&#9472; div.nds-main-content
                        </code>
                    </div>
                </div>
            </div>
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Side Info</h3>
                <p><code class="nds-inline-code lang-html">nds-wSideInfo</code> goes on the layout, but the aside is not a layout child. It sits inside the content, in a section marked <code class="nds-inline-code lang-html">nds-sideinfo-section</code>, beside the text it tracks. The aside's own markup is on the <a class="nds-color" href="{{ 'ui-shell/sideinfo' | relative_url }}">Side Info</a> page, and the <a class="nds-color" href="{{ 'templates/content-template' | relative_url }}">Content template</a> ships the full arrangement.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-html code">
div.nds-content-layout.nds-wSideInfo
&#9492;&#9472;&#9472; div.nds-main-content
    &#9492;&#9472;&#9472; section.nds-content-section.nds-sideinfo-section
        &#9492;&#9472;&#9472; div.nds-section-body
            &#9500;&#9472;&#9472; aside.nds-sideinfo.nds-md.nds-sticky.nds-top
            &#9474;   &#9492;&#9472;&#9472; nav.nds-toc          (table of contents)
            &#9492;&#9472;&#9472; div.nds-info-content      (the page content)
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="pageShellFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-sidebar-left"></i>
                            <span class="nds-label">Responsive Side Column</span>
                        </span>
                        <p class="nds-item-desc">The side menu holds a fixed-width column on desktop and collapses into a compact menu control on mobile, with no extra classes.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-distribute-horizontal-center"></i>
                            <span class="nds-label">Centered Content Width</span>
                        </span>
                        <p class="nds-item-desc">Content is capped at the system max width and centered, with the same responsive gutter the chrome uses.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-arrow-expand-01"></i>
                            <span class="nds-label">Edge-to-Edge Switch</span>
                        </span>
                        <p class="nds-item-desc">One class on <code class="nds-inline-code lang-html">body</code> widens the top bar, navigation, content, and footer together for console pages.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layers-01"></i>
                            <span class="nds-label">Section Striping</span>
                        </span>
                        <p class="nds-item-desc">Sections alternate background color automatically in plain layouts, skipping colored and status sections.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-dashboard-square-01"></i>
                            <span class="nds-label">Card View</span>
                        </span>
                        <p class="nds-item-desc">One layout class renders each section as a raised card, sized and spaced for record and profile pages.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-arrow-data-transfer-horizontal"></i>
                            <span class="nds-label">Direction Aware</span>
                        </span>
                        <p class="nds-item-desc">The shell is built on logical properties, so the same markup lays out correctly in RTL and LTR.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="pageShellGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Start every page by <strong>copying the shell of a built page</strong> whose shape matches, then swap the content. A hand-assembled shell tends to lose the wrapper classes that carry width, centering, and background behavior</li>
                    <li>Keep <strong>one</strong> <code class="nds-inline-code lang-html">nds-content-layout</code> per page and put all page content inside <code class="nds-inline-code lang-html">nds-main-content</code>, structured as <a class="nds-color" href="{{ 'layout/section' | relative_url }}">sections</a>. Never nest one content layout inside another</li>
                    <li>An <code class="nds-inline-code lang-html">aside.nds-sidemenu</code> shows only when the layout carries <code class="nds-inline-code lang-html">nds-wSideMenu</code>. Without the class the layout hides any direct aside child, so a menu that does not appear usually means the class is missing</li>
                    <li>Use the <strong>console shape</strong> for admin and back-office pages. <code class="nds-inline-code lang-html">nds-full-width</code> on <code class="nds-inline-code lang-html">body</code> is the single switch, and the hero moves inside <code class="nds-inline-code lang-html">nds-main-content</code> so it sits beside the side menu</li>
                    <li>Card view keeps its gutters and card gaps under <code class="nds-inline-code lang-html">nds-full-width</code> by design: the page widens around the cards without flattening them</li>
                    <li>Use the <strong>minimal shape</strong> for sign in, OTP, and other focused flows. <code class="nds-inline-code lang-html">nds-middle</code> centers the content in the viewport, and the footer is omitted</li>
                    <li>Side info is content-level, not a layout column. Keep the aside inside its <code class="nds-inline-code lang-html">nds-sideinfo-section</code> next to the text it tracks</li>
                    <li>Text-heavy pages can flatten the page hero with <code class="nds-inline-code lang-html">nds-flat</code> on the hero section. See <a class="nds-color" href="{{ 'ui-shell/hero' | relative_url }}">Hero</a> for the hero's own variants</li>
                </ul>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Framework Wrappers</h3>
                <p>React, Vue, and Angular add elements the shell does not expect. The shell styles direct children, so one extra element in the wrong place breaks the layout. Two places matter.</p>
                <p><strong>The mount root.</strong> A framework mounts into an element inside <code class="nds-inline-code lang-html">body</code>, such as <code class="nds-inline-code lang-html">&lt;div id="root"&gt;</code>. That element sits between <code class="nds-inline-code lang-html">body</code> and the chrome. <code class="nds-inline-code lang-html">body</code> is a vertical flex column, and <code class="nds-inline-code lang-html">main</code> grows to fill the space left over. A mount root breaks that chain, so the footer sits in the middle of the page when the content is short. Give the mount root <code class="nds-inline-code lang-css">display: contents</code>, or pass the same flex rules through it. Nothing else in the shell depends on that position: chrome width, content width, section width, striping, and the side menu are all unaffected.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-css code">
/* The mount root disappears from the layout.
   The id depends on the stack: #root, #app, app-root. */
#root { display: contents; }

/* Or, when the app styles, measures, or positions the mount root itself. */
#root { flex: 1; display: flex; flex-direction: column; }
                    </code>
                </div>
                <p><strong>Wrappers inside the layout.</strong> Return a fragment from a component, so the sections land where the shell expects them. A plain <code class="nds-inline-code lang-html">div</code> inside <code class="nds-inline-code lang-html">nds-content-layout</code> takes the side menu's grid column, and the page then collapses to the width of that column. A plain <code class="nds-inline-code lang-html">div</code> inside <code class="nds-inline-code lang-html">nds-main-content</code> sets no width of its own, so narrow content such as a sign-in form pulls away from the page edges. Sections set their own full width, which is why the wrapper is the part that breaks.</p>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Applies to</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-wSideMenu</code></td><td>layout</td><td>Two-column grid on desktop; required for the side menu aside to show</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-wSideInfo</code></td><td>layout</td><td>Marks the side info arrangement; the aside itself sits inside the content section</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-cardView</code></td><td>layout</td><td>Renders each section as a raised card with tighter titles and spacing</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-content-wrapper</code></td><td>layout</td><td>Applies the standard page gutter directly to the layout (minimal shape)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-middle</code></td><td>layout</td><td>Full viewport height with content centered vertically and horizontally</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-post</code></td><td>layout</td><td>Removes the first section's top padding, for article-style pages</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-full-width</code></td><td><code class="nds-inline-code lang-html">body</code></td><td>Edge-to-edge chrome and content for console pages; card view keeps its gutters</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-top</code></td><td><code class="nds-inline-code lang-html">aside.nds-sidemenu</code></td><td>Renders the side menu as a bar above the content instead of a column</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-flat</code></td><td>hero section</td><td>Removes the hero background and shadow for text-heavy pages</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive nds-striped" style="--min-width:600px;">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--layout-min-height</code></td><td>400px</td><td>Minimum height of the content area</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--layout-gap</code></td><td>0</td><td>Gap between the side column and the content</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--main-padding-block</code></td><td>0</td><td>Vertical padding on <code class="nds-inline-code lang-html">nds-main-content</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--main-padding-inline</code></td><td>0</td><td>Horizontal padding on <code class="nds-inline-code lang-html">nds-main-content</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--main-gap</code></td><td>0</td><td>Gap between sections inside <code class="nds-inline-code lang-html">nds-main-content</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-sidemenu-width</code></td><td>260px</td><td>Side column width (global token)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-content-MaxWidth</code></td><td>1280px</td><td>Content max width (global token; <code class="nds-inline-code lang-html">nds-full-width</code> sets it to 100%)</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
